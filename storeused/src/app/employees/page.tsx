"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    TableProvider,
    TableHeader,
    TableHeaderGroup,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableColumnHeader,
    type ColumnDef
} from "@/components/kibo-ui/table";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toastManager } from "@/components/ui/toast";

type Employee = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    created_at: string;
    avatar_url?: string;
};

export default function EmployeesPage() {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        role: "Employee",
        status: "Active"
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("/api/employees");
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            }
        } catch (error) {
            console.error("Failed to fetch employees", error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toastManager.add({
                    title: "Employee created",
                    description: `${formData.name} has been added to the team.`,
                    type: "success",
                });
                setIsDialogOpen(false);
                setFormData({ name: "", email: "", role: "Employee", status: "Active" });
                fetchEmployees();
            } else {
                const error = await response.json();
                toastManager.add({
                    title: "Error",
                    description: error.error || "Failed to create employee",
                    type: "error",
                });
            }
        } catch (error) {
            toastManager.add({
                title: "Error",
                description: "An unexpected error occurred",
                type: "error",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const columns: ColumnDef<Employee>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => <TableColumnHeader column={column} title="Employee" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={row.original.avatar_url} alt={row.original.name} />
                        <AvatarFallback>{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.original.name}</span>
                        <span className="text-xs text-muted-foreground">{row.original.email}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "role",
            header: ({ column }) => <TableColumnHeader column={column} title="Role" />,
            cell: ({ row }) => (
                <Badge variant="outline">{row.original.role}</Badge>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => (
                <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>
                    {row.original.status}
                </Badge>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                        <p className="text-muted-foreground">Manage your team members and their permissions.</p>
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger className={buttonVariants({ variant: "default" })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Employee
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Employee</DialogTitle>
                                <DialogDescription>
                                    Add a new member to your team. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4 px-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={formData.role}
                                            onValueChange={(value) => setFormData({ ...formData, role: String(value || "Employee") })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Admin">Admin</SelectItem>
                                                <SelectItem value="Editor">Editor</SelectItem>
                                                <SelectItem value="Viewer">Viewer</SelectItem>
                                                <SelectItem value="Employee">Employee</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => setFormData({ ...formData, status: value as "Active" | "Inactive" })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Saving..." : "Save changes"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Team Members</CardTitle>
                        <CardDescription>A list of all users with access to the dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TableProvider columns={columns} data={employees}>
                            <TableHeader>
                                {({ headerGroup }) => (
                                    <TableHeaderGroup headerGroup={headerGroup} key={headerGroup.id}>
                                        {({ header }) => <TableHead header={header} key={header.id} />}
                                    </TableHeaderGroup>
                                )}
                            </TableHeader>
                            <TableBody>
                                {({ row }) => (
                                    <TableRow key={row.id} row={row}>
                                        {({ cell }) => <TableCell cell={cell} key={cell.id} />}
                                    </TableRow>
                                )}
                            </TableBody>
                        </TableProvider>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

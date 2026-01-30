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
import { Button } from "@/components/ui/button";
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

type Employee = {
    id: string;
    name: string;
    email: string;
    role: string;
    status: "Active" | "Inactive";
    created_at: string;
    avatar_url?: string;
};

const mockEmployees: Employee[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Admin",
        status: "Active",
        created_at: new Date().toISOString(),
        avatar_url: "",
    },
    {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Editor",
        status: "Active",
        created_at: new Date().toISOString(),
    },
];

export default function EmployeesPage() {
    const [employees] = React.useState<Employee[]>(mockEmployees);

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
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>
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

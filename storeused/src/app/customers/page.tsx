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
import { Badge } from "@/components/ui/badge";
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
import { getCustomers, type Customer } from "@/lib/api/customers";
import { Loader2, Users, Search, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/base/input/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
} from "@/components/ui/empty";
import Image from "next/image";

export default function CustomersPage() {
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchCustomers() {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                if (errorMessage.includes('does not exist')) {
                    setError("Database tables not found. Please run the SQL schema in your Supabase Dashboard.");
                } else {
                    setError("Failed to fetch customers.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    const columns: ColumnDef<Customer>[] = [
        {
            accessorKey: "full_name",
            header: ({ column }) => <TableColumnHeader column={column} title="Customer" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={row.original.avatar_url || ""} alt={row.original.full_name || "User"} />
                        <AvatarFallback>{(row.original.full_name || row.original.email || "U").slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium">{row.original.full_name || "Unnamed Customer"}</span>
                        <span className="text-xs text-muted-foreground">{row.original.email}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => <TableColumnHeader column={column} title="Joined" />,
            cell: ({ row }) => format(new Date(row.original.created_at), "MMM d, yyyy"),
        },
        {
            accessorKey: "order_count",
            header: ({ column }) => <TableColumnHeader column={column} title="Orders" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">{row.original.order_count}</Badge>
                    <span className="text-xs text-muted-foreground">orders</span>
                </div>
            ),
        },
        {
            accessorKey: "total_spend",
            header: ({ column }) => <TableColumnHeader column={column} title="Total Spend" />,
            cell: ({ row }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.original.total_spend),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                    </Button>
                </div>
            ),
        }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                        <p className="text-muted-foreground">Detailed overview of your customer base and their activity.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none z-10" />
                            <Input
                                type="search"
                                placeholder="Search customers..."
                                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Directory</CardTitle>
                        <CardDescription>
                            A list of all registered customers and their interaction history.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                                <Users className="h-12 w-12 text-muted-foreground opacity-20" />
                                <div className="max-w-[400px]">
                                    <p className="font-medium text-destructive">{error}</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Make sure you have created the `profiles` table in your Supabase dashboard.
                                    </p>
                                </div>
                                <Button size="lg" onClick={() => window.location.reload()}>Retry</Button>
                            </div>
                        ) : customers.length === 0 ? (
                            <Empty className="py-24">
                                <EmptyMedia>
                                    <div className="relative size-40 opacity-90 transition-opacity hover:opacity-100">
                                        <Image
                                            src="/images/banana-empty.png"
                                            alt="No customers"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </EmptyMedia>
                                <EmptyHeader>
                                    <EmptyTitle>No customers found</EmptyTitle>
                                    <EmptyDescription>
                                        Your customer directory is currently empty. When users sign up, they will appear here.
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <TableProvider columns={columns} data={customers}>
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
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}

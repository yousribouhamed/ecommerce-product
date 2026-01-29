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
import { getOrders, type Order } from "@/lib/api/orders";
import { format } from "date-fns";
import { ArrowLeft, Loader2, Package, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/base/input/input";

export default function OrdersPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (err: any) {
                // Fallback for development if tables don't exist yet
                if (err.message?.includes('does not exist')) {
                    setError("Database tables not found. Please run the SQL schema in your Supabase Dashboard.");
                } else {
                    setError("Failed to fetch orders.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => <TableColumnHeader column={column} title="Order ID" />,
            cell: ({ row }) => (
                <Link href={`/orders/${row.original.id}`} className="font-medium text-primary hover:underline">
                    {row.original.id.slice(0, 8).toUpperCase()}
                </Link>
            ),
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
            cell: ({ row }) => format(new Date(row.original.created_at), "MMM d, yyyy"),
        },
        {
            accessorKey: "status",
            header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.original.status;
                const variant =
                    status === 'Delivered' ? 'success' :
                        status === 'Shipped' ? 'info' :
                            status === 'Processing' ? 'warning' :
                                status === 'Cancelled' ? 'destructive' : 'default';
                return <Badge variant={variant}>{status}</Badge>;
            },
        },
        {
            accessorKey: "total_amount",
            header: ({ column }) => <TableColumnHeader column={column} title="Total" />,
            cell: ({ row }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.original.total_amount),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <Button variant="ghost" size="lg" render={
                    <Link href={`/orders/${row.original.id}`}>View Details</Link>
                } />
            ),
        }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                        <p className="text-muted-foreground">Manage and track your customer orders.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none z-10" />
                            <Input
                                type="search"
                                placeholder="Search orders..."
                                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>
                            A list of your most recent orders and their current status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : error ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                                <Package className="h-12 w-12 text-muted-foreground opacity-20" />
                                <div className="max-w-[400px]">
                                    <p className="font-medium text-destructive">{error}</p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Make sure you have created the `orders` table in your Supabase dashboard using the `supabase/schema.sql` file.
                                    </p>
                                </div>
                                <Button size="lg" onClick={() => window.location.reload()}>Retry</Button>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
                                <Package className="h-12 w-12 text-muted-foreground opacity-20" />
                                <p className="font-medium">No orders found</p>
                                <p className="text-sm text-muted-foreground">When customers buy products, they will appear here.</p>
                            </div>
                        ) : (
                            <TableProvider columns={columns} data={orders}>
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

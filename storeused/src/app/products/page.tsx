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
import { getProducts, type Product } from "@/lib/api/products";
import { Loader2, Package, Plus, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/base/input/input";
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
} from "@/components/ui/empty";
import Image from "next/image";

export default function ProductsPage() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err: any) {
                if (err.message?.includes('does not exist')) {
                    setError("Database tables not found. Please run the SQL schema in your Supabase Dashboard.");
                } else {
                    setError("Failed to fetch products.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => <TableColumnHeader column={column} title="Product" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                        {row.original.image_url ? (
                            <img src={row.original.image_url} alt={row.original.name} className="h-full w-full object-cover" />
                        ) : (
                            <Package className="h-6 w-6 text-muted-foreground/40" />
                        )}
                    </div>
                    <div>
                        <div className="font-medium">{row.original.name}</div>
                        <div className="text-xs text-muted-foreground">{row.original.category}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: ({ column }) => <TableColumnHeader column={column} title="Price" />,
            cell: ({ row }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.original.price),
        },
        {
            accessorKey: "stock_quantity",
            header: ({ column }) => <TableColumnHeader column={column} title="Stock" />,
            cell: ({ row }) => {
                const stock = row.original.stock_quantity;
                const variant = stock <= 0 ? 'destructive' : stock <= 10 ? 'warning' : 'success';
                return (
                    <div className="flex items-center gap-2">
                        <Badge variant={variant}>{stock}</Badge>
                        <span className="text-xs text-muted-foreground">in stock</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "is_active",
            header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => (
                <Badge variant={row.original.is_active ? "success" : "secondary"}>
                    {row.original.is_active ? "Active" : "Draft"}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <Button variant="ghost" size="lg" render={
                    <Link href={`/products/${row.original.id}`}>Edit</Link>
                } />
            ),
        }
    ];

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-muted-foreground">Manage your storefront inventory and catalogs.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center">
                            <Search className="absolute left-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 pointer-events-none z-10" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                        <Button size="lg" render={
                            <Link href="/products/new">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Product
                            </Link>
                        } />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventory</CardTitle>
                        <CardDescription>
                            A detailed list of all your products and their current availability.
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
                                        Make sure you have created the `products` table in your Supabase dashboard.
                                    </p>
                                </div>
                                <Button size="lg" onClick={() => window.location.reload()}>Retry</Button>
                            </div>
                        ) : products.length === 0 ? (
                            <Empty className="py-24">
                                <EmptyMedia>
                                    <div className="relative size-40 opacity-90 transition-opacity hover:opacity-100">
                                        <Image
                                            src="/images/banana-empty.png"
                                            alt="No products"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </EmptyMedia>
                                <EmptyHeader>
                                    <EmptyTitle>No products found</EmptyTitle>
                                    <EmptyDescription>
                                        Your inventory is currently empty. Start by adding your first product to the store.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Button size="lg" render={
                                        <Link href="/products/new">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Product
                                        </Link>
                                    } />
                                </EmptyContent>
                            </Empty>
                        ) : (
                            <TableProvider columns={columns} data={products}>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderById, type Order } from "@/lib/api/orders";
import { format } from "date-fns";
import { ArrowLeft, Loader2, Package, Truck, CreditCard, MapPin, Calendar } from "lucide-react";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [order, setOrder] = React.useState<Order | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchOrder() {
            try {
                const data = await getOrderById(id);
                setOrder(data);
            } catch (err: any) {
                setError("Order not found or database error.");
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </DashboardLayout>
        );
    }

    if (error || !order) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <Package className="h-12 w-12 text-muted-foreground opacity-20" />
                    <h2 className="text-2xl font-bold">Order Not Found</h2>
                    <p className="text-muted-foreground">We couldn&apos;t find the order with ID {id?.slice(0, 8)}.</p>
                    <Button size="lg" render={
                        <Link href="/orders">Back to Orders</Link>
                    } />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-6 py-2">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="lg" className="h-10 w-10 p-0" render={
                        <Link href="/orders">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                    } />
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
                            <Badge variant={
                                order.status === 'Delivered' ? 'success' :
                                    order.status === 'Shipped' ? 'default' :
                                        order.status === 'Processing' ? 'warning' :
                                            order.status === 'Cancelled' ? 'destructive' : 'default'
                            }>
                                {order.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(order.created_at), "MMMM d, yyyy 'at' h:mm a")}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-6 lg:grid-cols-4 lg:gap-8">
                    <div className="md:col-span-4 lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {order.order_items?.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 p-4">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                                                {item.product_image ? (
                                                    <img src={item.product_image} alt={item.product_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Package className="h-8 w-8 text-muted-foreground/40" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{item.product_name}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}</p>
                                                <p className="text-sm text-muted-foreground">Total: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2 border-t bg-muted/50 p-4">
                                <div className="flex w-full justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total_amount)}</span>
                                </div>
                                <div className="flex w-full justify-between text-sm font-bold border-t pt-2 mt-2">
                                    <span>Total Amount</span>
                                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total_amount)}</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Truck className="h-4 w-4" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1 text-muted-foreground">
                                    <p className="text-foreground font-medium">Customer</p>
                                    <p>User ID: {order.user_id.slice(0, 8)}...</p>
                                    <div className="mt-2 pt-2 border-t">
                                        <p className="text-foreground font-medium flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            Address
                                        </p>
                                        <p>{order.shipping_address?.street || "No address provided"}</p>
                                        <p>{order.shipping_address?.city}, {order.shipping_address?.state}</p>
                                        <p>{order.shipping_address?.zip}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Payment Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <div className="grid gap-1 text-muted-foreground">
                                    <div className="flex justify-between">
                                        <span>Status</span>
                                        <Badge variant="outline" className="text-[10px] uppercase py-0">{order.payment_status || "Pending"}</Badge>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                        <span>Method</span>
                                        <span className="text-foreground">Credit Card</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

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
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    ShoppingCart,
    Users,
    ArrowUpRight,
    MousePointer2,
    Package
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 py-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-muted-foreground">Track your store performance and sales trends.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="lg">Download Report</Button>
                        <Button size="lg">Share Insights</Button>
                    </div>
                </div>

                {/* Top Metrics */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-emerald-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <div className="flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <p className="text-xs text-emerald-500">+20.1% <span className="text-muted-foreground ml-1">from last month</span></p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Sales Volume</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <ShoppingCart className="h-4 w-4 text-blue-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <div className="flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <p className="text-xs text-emerald-500">+12% <span className="text-muted-foreground ml-1">from last month</span></p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Customers</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                                <Users className="h-4 w-4 text-violet-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <div className="flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <p className="text-xs text-emerald-500">+19% <span className="text-muted-foreground ml-1">from last month</span></p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                                <MousePointer2 className="h-4 w-4 text-orange-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3.4%</div>
                            <div className="flex items-center gap-1 mt-1">
                                <TrendingDown className="h-3 w-3 text-rose-500" />
                                <p className="text-xs text-rose-500">-2% <span className="text-muted-foreground ml-1">from last month</span></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-full lg:col-span-4">
                        <CardHeader>
                            <CardTitle>Performance Overview</CardTitle>
                            <CardDescription>Visual trend of revenue and sales for the current period.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px] flex items-end gap-2 px-6">
                            {/* Mock Chart Visualization with CSS bars */}
                            {[40, 65, 45, 90, 65, 85, 100, 75, 55, 60, 80, 70].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                    <div
                                        className="w-full bg-primary/20 rounded-t-sm group-hover:bg-primary transition-colors cursor-pointer relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-10">
                                            ${(h * 150).toLocaleString()}
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground hidden sm:block">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="col-span-full lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Top Categories</CardTitle>
                            <CardDescription>Performance by product group.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-6">
                            <div className="space-y-4">
                                {[
                                    { label: "Electronics", val: 65, color: "bg-blue-500" },
                                    { label: "Home & Kitchen", val: 48, color: "bg-emerald-500" },
                                    { label: "Fashion", val: 32, color: "bg-violet-500" },
                                    { label: "Beauty", val: 15, color: "bg-orange-500" },
                                ].map((item) => (
                                    <div key={item.label} className="space-y-1.5">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">{item.label}</span>
                                            <span className="text-muted-foreground">{item.val}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${item.color} transition-all duration-500`}
                                                style={{ width: `${item.val}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    Inventory Health
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg border p-3 flex flex-col gap-1">
                                        <span className="text-xs text-muted-foreground">In Stock</span>
                                        <span className="text-xl font-bold">1,204</span>
                                    </div>
                                    <div className="rounded-lg border p-3 border-rose-500/20 bg-rose-500/5 flex flex-col gap-1">
                                        <span className="text-xs text-rose-500 font-medium">Out of Stock</span>
                                        <span className="text-xl font-bold text-rose-500">12</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

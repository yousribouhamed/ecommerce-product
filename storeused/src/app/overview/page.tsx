"use client";

import * as React from "react";
import {
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Users,
    CreditCard,
    Activity,
    MoreVertical,
    Phone,
    Store,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import Link from "next/link";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import KiboTableExample from "@/components/kibo-table-example";
import { DesignSystemTable } from "@/components/design-system-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Calendar as CalendarIcon, Download01 } from "@untitledui/icons";
import { faker } from "@faker-js/faker";
import { OverviewSkeleton } from "@/components/overview-skeleton";
import { Popover, PopoverTrigger, PopoverPopup } from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import ButtonShapeTabs from "@/components/ui/button-shape-tabs";
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
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
    EmptyMedia,
} from "@/components/ui/empty";
import Image from "next/image";

const revenueInsight = `+${faker.number.float({ min: 5, max: 25, fractionDigits: 1 })}% vs last month`;

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        description: "+20.1% from last month",
        icon: DollarSign,
        trend: "up",
    },
    {
        title: "Subscriptions",
        value: "+2350",
        description: "+180.1% from last month",
        icon: Users,
        trend: "up",
    },
    {
        title: "Sales",
        value: "+12,234",
        description: "+19% from last month",
        icon: CreditCard,
        trend: "up",
    },
];

const recentOrders = [
    {
        id: "ORD-7392",
        wilaya: "Algiers",
        customer: {
            name: "Liam Johnson",
            email: "liam@example.com",
            avatar: "/avatars/01.png",
            initials: "LJ",
            phone: "+1 (555) 555-0123",
        },
        product: "Wireless Headphones",
        amount: "$299.00",
        status: "Delivered",
        date: "2023-06-23",
    },
    {
        id: "ORD-7393",
        wilaya: "Oran",
        customer: {
            name: "Olivia Smith",
            email: "olivia@example.com",
            avatar: "/avatars/02.png",
            initials: "OS",
            phone: "+1 (555) 555-0124",
        },
        product: "Smart Watch",
        amount: "$150.00",
        status: "Not Reachable",
        date: "2023-06-24",
    },
    {
        id: "ORD-7394",
        wilaya: "Constantine",
        customer: {
            name: "Noah Williams",
            email: "noah@example.com",
            avatar: "/avatars/03.png",
            initials: "NW",
            phone: "+1 (555) 555-0125",
        },
        product: "Mechanical Keyboard",
        amount: "$89.00",
        status: "Return",
        date: "2023-06-25",
    },
    {
        id: "ORD-7395",
        wilaya: "Annaba",
        customer: {
            name: "Emma Brown",
            email: "emma@example.com",
            avatar: "/avatars/04.png",
            initials: "EB",
            phone: "+1 (555) 555-0126",
        },
        product: "Gaming Mouse",
        amount: "$49.00",
        status: "On the way",
        date: "2023-06-26",
    },
    {
        id: "ORD-7396",
        wilaya: "Setif",
        customer: {
            name: "James Wilson",
            email: "james@example.com",
            avatar: "/avatars/05.png",
            initials: "JW",
            phone: "+1 (555) 555-0127",
        },
        product: "27\" Monitor",
        amount: "$399.00",
        status: "Delivered",
        date: "2023-06-27",
    },
    // Generate more data for pagination testing
    ...Array.from({ length: 10 }).map((_, i) => ({
        id: `ORD-739${7 + i}`,
        wilaya: ["Algiers", "Oran", "Constantine", "Annaba", "Setif"][i % 5],
        customer: {
            name: `Test User ${i + 1}`,
            email: `test${i + 1}@example.com`,
            avatar: `/avatars/0${(i % 5) + 1}.png`,
            initials: `TU`,
            phone: "+1 (555) 555-0000",
        },
        product: ["Wireless Headphones", "Smart Watch", "Mechanical Keyboard", "Gaming Mouse", "27\" Monitor"][i % 5],
        amount: ["$299.00", "$150.00", "$89.00", "$49.00", "$399.00"][i % 5],
        status: ["Delivered", "Not Reachable", "Return", "On the way", "Delivered"][i % 5],
        date: "2023-06-28",
    })),
];

export default function DashboardPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedStatus, setSelectedStatus] = React.useState("All");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const now = today(getLocalTimeZone());
    const [dateRange, setDateRange] = React.useState<{ start: DateValue; end: DateValue } | null>({
        start: now.subtract({ days: 30 }),
        end: now,
    });

    const filteredOrders = React.useMemo(() => {
        if (selectedStatus === "All") return recentOrders;
        return recentOrders.filter((order) => order.status === selectedStatus);
    }, [selectedStatus]);

    const paginatedOrders = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // Reset to first page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedStatus]);

    const recentOrdersColumns: ColumnDef<typeof recentOrders[0]>[] = [
        {
            accessorKey: "wilaya",
            header: ({ column }) => <TableColumnHeader column={column} title="Wilaya" />,
            cell: ({ row }) => <div className="font-medium text-foreground">{row.original.wilaya}</div>,
        },
        {
            accessorKey: "customer",
            header: ({ column }) => <TableColumnHeader column={column} title="Customer" />,
            cell: ({ row }) => (
                <p className="text-sm font-medium leading-none">
                    {row.original.customer.name}
                </p>
            ),
        },
        {
            accessorKey: "product",
            header: ({ column }) => <TableColumnHeader column={column} title="Product" />,
            cell: ({ row }) => row.original.product,
        },
        {
            accessorKey: "date",
            header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
            cell: ({ row }) => {
                const date = new Date(row.original.date);
                return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.original.status;
                const variant =
                    status === 'Delivered' ? 'success' :
                        status === 'On the way' ? 'default' :
                            status === 'Not Reachable' ? 'destructive' :
                                status === 'Return' ? 'warning' : 'outline';
                return <Badge variant={variant}>{status}</Badge>;
            },
        },
        {
            accessorKey: "customer.phone",
            header: ({ column }) => <TableColumnHeader column={column} title="Phone" />,
            cell: ({ row }) => <div className="text-muted-foreground">{row.original.customer.phone}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const status = row.original.status;
                if (status === 'Not Reachable') {
                    return (
                        <Button variant="ghost" size="icon" className="ml-auto text-foreground" render={
                            <a href={`tel:${row.original.customer.phone}`}>
                                <Phone className="size-4" />
                                <span className="sr-only">Call</span>
                            </a>
                        } />
                    );
                }
                return (
                    <Button variant="ghost" size="sm" className="ml-auto">
                        View
                    </Button>
                );
            },
        }
    ];

    React.useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const salesColumns: ColumnDef<typeof recentOrders[0]>[] = [
        {
            accessorKey: "product",
            header: ({ column }) => <TableColumnHeader column={column} title="Product" />,
            cell: ({ row }) => (
                <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                        {row.original.product}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {row.original.id}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: "amount",
            header: ({ column }) => <TableColumnHeader column={column} title="Price" className="text-right justify-end" />,
            cell: ({ row }) => <div className="font-medium text-right">{row.original.amount}</div>,
        }
    ];

    const formatDateRange = () => {
        if (!dateRange) return "Select date range";
        const formatDate = (date: DateValue) => {
            return `${date.month}/${date.day}`;
        };
        return `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`;
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <OverviewSkeleton />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-4 py-2">
                {/* Banner Section */}
                <section className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 md:p-8 text-primary-foreground shadow-lg border border-white/5">
                    {/* Background Image with Fill Behavior */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/banner.png"
                            alt="Banner background"
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {/* Dark Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-bold md:text-4xl text-white">Good morning, John!</h1>
                        <p className="mt-2 text-zinc-300">
                            Your store is doing great today. You&apos;ve made <span className="font-semibold text-white underline decoration-2 underline-offset-4">$1,284.00</span> in sales so far.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button size="lg" variant="secondary" className="gap-2" render={
                                <Link href="/store" target="_blank">
                                    <Store className="size-4" />
                                    Preview Store
                                </Link>
                            } />
                            <Button size="lg" variant="secondary">View Reports</Button>
                            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm">Manage Inventory</Button>
                        </div>
                    </div>
                </section>

                {/* Button Group */}
                <div className="flex justify-end">
                    <ButtonGroup selectedKeys={[]}>
                        <Popover>
                            <PopoverTrigger>
                                <ButtonGroupItem id="date-range" iconLeading={CalendarIcon} className="!rounded-r-none !rounded-l-lg border-r-0">
                                    {formatDateRange()}
                                </ButtonGroupItem>
                            </PopoverTrigger>
                            <PopoverPopup className="w-auto p-0">
                                <RangeCalendar
                                    value={dateRange ? {
                                        start: new CalendarDate(dateRange.start.year, dateRange.start.month, dateRange.start.day),
                                        end: new CalendarDate(dateRange.end.year, dateRange.end.month, dateRange.end.day)
                                    } : null}
                                    onChange={(range) => {
                                        if (range) {
                                            setDateRange({
                                                start: range.start,
                                                end: range.end
                                            });
                                        }
                                    }}
                                />
                            </PopoverPopup>
                        </Popover>
                        <ButtonGroupItem id="export" iconLeading={Download01} className="!rounded-l-none !rounded-r-lg">
                            Export
                        </ButtonGroupItem>
                    </ButtonGroup>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat) => (
                        <Card key={stat.title} className="overflow-hidden rounded-[12px]">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className="flex items-center gap-2">
                                    <stat.icon className="size-4 text-muted-foreground" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="mt-2">
                                    <StatusBadge
                                        status="Active"
                                        content={stat.description}
                                        shape="pill"
                                        badgeStyle="filled with borders"
                                        trend={stat.trend as "up" | "down"}
                                        className="h-6"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Orders Section */}
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                    <Card className="lg:col-span-5 min-w-0">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>
                                    Review and manage your most recent customer purchases.
                                </CardDescription>
                            </div>
                            <Button size="lg" className="ml-auto gap-1" render={
                                <Link href="/orders">
                                    View All
                                    <ArrowUpRight className="size-4" />
                                </Link>
                            } />
                        </CardHeader>
                        {/* Button Shape Tabs */}
                        <div className="px-6 mb-4">
                            <ButtonShapeTabs
                                tabs={["All", "Delivered", "Not Reachable", "Return", "On the way"]}
                                defaultTab="All"
                                onTabChange={setSelectedStatus}
                            />
                        </div>
                        <CardContent>
                            {paginatedOrders.length > 0 ? (
                                <div className="overflow-x-auto w-full">
                                    <TableProvider columns={recentOrdersColumns} data={paginatedOrders}>
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
                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-end space-x-2 py-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                            >
                                                Previous
                                            </Button>
                                            <div className="text-sm font-medium">
                                                Page {currentPage} of {totalPages}
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Empty className="py-12">
                                    <EmptyMedia>
                                        <div className="relative size-32 opacity-90 transition-opacity hover:opacity-100">
                                            <Image
                                                src="/images/banana-empty.png"
                                                alt="Empty state"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </EmptyMedia>
                                    <EmptyHeader>
                                        <EmptyTitle>No orders found</EmptyTitle>
                                        <EmptyDescription>
                                            We couldn&apos;t find any orders matching your criteria. Try adjusting your filters.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Button variant="outline" onClick={() => setSelectedStatus("All")}>
                                            Reset Filters
                                        </Button>
                                    </EmptyContent>
                                </Empty>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 min-w-0">
                        <CardHeader>
                            <CardTitle>Sales</CardTitle>
                            <CardDescription>
                                Recent sales and revenue overview.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentOrders.length > 0 ? (
                                <div className="overflow-x-auto w-full">
                                    <TableProvider columns={salesColumns} data={recentOrders.slice(0, 5)}>
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
                                </div>
                            ) : (
                                <Empty className="py-8">
                                    <EmptyMedia>
                                        <div className="relative size-24 opacity-80">
                                            <Image
                                                src="/images/banana-empty.png"
                                                alt="Empty state"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </EmptyMedia>
                                    <EmptyHeader>
                                        <EmptyTitle className="text-lg">No Sales Data</EmptyTitle>
                                        <EmptyDescription>
                                            You haven&apos;t made any sales yet.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" size="lg" className="w-full">View All Sales</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

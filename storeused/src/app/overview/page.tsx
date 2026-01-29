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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
];

export default function DashboardPage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedStatus, setSelectedStatus] = React.useState("All");
    const now = today(getLocalTimeZone());
    const [dateRange, setDateRange] = React.useState<{ start: DateValue; end: DateValue } | null>({
        start: now.subtract({ days: 30 }),
        end: now,
    });

    const filteredOrders = React.useMemo(() => {
        if (selectedStatus === "All") return recentOrders;
        return recentOrders.filter((order) => order.status === selectedStatus);
    }, [selectedStatus]);

    const recentOrdersColumns: ColumnDef<typeof recentOrders[0]>[] = [
        {
            accessorKey: "wilaya",
            header: ({ column }) => <TableColumnHeader column={column} title="Wilaya" />,
            cell: ({ row }) => <div className="font-medium text-primary">{row.original.wilaya}</div>,
        },
        {
            accessorKey: "customer",
            header: ({ column }) => <TableColumnHeader column={column} title="Customer" />,
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                        <AvatarImage src={row.original.customer.avatar} />
                        <AvatarFallback>{row.original.customer.initials}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                        <p className="text-sm font-medium leading-none">
                            {row.original.customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {row.original.customer.email}
                        </p>
                    </div>
                </div>
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
                        <Button variant="ghost" size="icon" className="ml-auto text-black" render={
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
            header: ({ column }) => <TableColumnHeader column={column} title="Price" />,
            cell: ({ row }) => <div className="font-medium">{row.original.amount}</div>,
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
                <section className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-lg">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-bold md:text-4xl">Good morning, John!</h1>
                        <p className="mt-2 text-primary-foreground/80">
                            Your store is doing great today. You've made <span className="font-semibold text-primary-foreground underline decoration-2 underline-offset-4">$1,284.00</span> in sales so far.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Button size="lg" variant="secondary" className="gap-2" render={
                                <Link href="/store" target="_blank">
                                    <Store className="size-4" />
                                    Preview Store
                                </Link>
                            } />
                            <Button size="lg" variant="secondary">View Reports</Button>
                            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10 text-primary-foreground">Manage Inventory</Button>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
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
                    <Card className="lg:col-span-5">
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
                            <TableProvider columns={recentOrdersColumns} data={filteredOrders}>
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

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Sales</CardTitle>
                            <CardDescription>
                                Recent sales and revenue overview.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
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

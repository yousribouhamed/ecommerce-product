"use client";

import {
    Archive,
    BarChartSquare02,
    CheckDone01,
    CurrencyDollarCircle,
    Grid03,
    HomeLine,
    LayoutAlt01,
    LineChartUp03,
    MessageChatCircle,
    NotificationBox,
    Package,
    PieChart03,
    Rows01,
    Settings01,
    Star01,
    User01,
    Users01,
    UsersPlus,
} from "@untitledui/icons";
import { FeaturedCardProgressBar } from "@/components/application/app-navigation/base-components/featured-cards";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { BadgeWithDot } from "@/components/base/badges/badges";

const navItemsSimple: NavItemType[] = [
    {
        label: "Home",
        href: "/",
        icon: HomeLine,
        items: [
            { label: "Overview", href: "/", icon: Grid03 },
            { label: "Products", href: "/products", icon: Package },
            { label: "Orders", href: "/orders", icon: CurrencyDollarCircle },
            { label: "Customers", href: "/customers", icon: Users01 },
        ],
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: BarChartSquare02,
        items: [
            { label: "Overview", href: "/", icon: Grid03 },
            { label: "Notifications", href: "#", icon: NotificationBox, badge: 10 },
            { label: "Analytics", href: "/analytics", icon: LineChartUp03 },
            { label: "Saved reports", href: "#", icon: Star01 },
        ],
    },
    {
        label: "Projects",
        href: "/projects",
        icon: Rows01,
        items: [
            { label: "View all", href: "#", icon: Rows01 },
            { label: "Personal", href: "#", icon: User01 },
            { label: "Team", href: "#", icon: Users01 },
            { label: "Shared with me", href: "#", icon: UsersPlus },
            { label: "Archive", href: "#", icon: Archive },
        ],
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: CheckDone01,
        badge: 10,
    },
    {
        label: "Reporting",
        href: "/analytics",
        icon: PieChart03,
    },
    {
        label: "Users",
        href: "/customers",
        icon: Users01,
    },
];

export const SidebarNavigationSimpleDemo = () => (
    <SidebarNavigationSimple
        items={navItemsSimple}
        footerItems={[
            {
                label: "Settings",
                href: "#",
                icon: Settings01,
            },
            {
                label: "Support",
                href: "#",
                icon: MessageChatCircle,
                badge: (
                    <BadgeWithDot color="success" type="modern" size="sm">
                        Online
                    </BadgeWithDot>
                ),
            },
            {
                label: "Open in browser",
                href: "https://www.untitledui.com/",
                icon: LayoutAlt01,
            },
        ]}
        featureCard={
            <FeaturedCardProgressBar
                title="Used space"
                description="Your team has used 80% of your available space. Need more?"
                confirmLabel="Upgrade plan"
                progress={80}
                className="hidden md:flex"
                onDismiss={() => { }}
                onConfirm={() => { }}
            />
        }
    />
);

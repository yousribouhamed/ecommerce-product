"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
    HomeLine,
    ShoppingCart01,
    Package,
    Users01,
    BarChartSquare02,
    Settings01,
    ShieldTick,
    HelpCircle,
    LayoutAlt01,
    MessageChatCircle,
} from "@untitledui/icons";
import { FeaturedCardProgressBar } from "@/components/application/app-navigation/base-components/featured-cards";
import type { NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";

const navItems: NavItemType[] = [
    {
        label: "Overview",
        href: "/overview",
        icon: HomeLine,
    },
    {
        label: "Orders",
        href: "/orders",
        icon: ShoppingCart01,
    },
    {
        label: "Products",
        href: "/products",
        icon: Package,
    },
    {
        label: "Customers",
        href: "/customers",
        icon: Users01,
    },
    {
        label: "Analytics",
        href: "/analytics",
        icon: BarChartSquare02,
    },
];

const footerNavItems: NavItemType[] = [
    {
        label: "Settings",
        href: "#",
        icon: Settings01,
    },
    {
        label: "Security",
        href: "#",
        icon: ShieldTick,
    },
    {
        label: "Support",
        href: "/support",
        icon: MessageChatCircle,
    },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen w-full bg-background">
            <SidebarNavigationSimple
                activeUrl={pathname}
                items={navItems}
                footerItems={footerNavItems}
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
            <main className="flex flex-1 flex-col overflow-auto">
                <div className="p-4 pt-16 lg:pt-4">
                    {children}
                </div>
            </main>
        </div>
    );
}

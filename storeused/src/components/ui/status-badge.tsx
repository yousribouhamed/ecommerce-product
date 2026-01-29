"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const statusBadgeVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[12px] font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            status: {
                Active: "text-foreground",
                Inactive: "text-muted-foreground",
                Pending: "text-foreground",
            },
            shape: {
                pill: "rounded-full",
                rectangle: "rounded-[4px]",
            },
            badgeStyle: {
                outline: "bg-background border border-border",
                filled: "bg-muted",
                "filled with borders": "bg-success/10 border border-success/20 text-success-foreground dark:text-success",
            },
        },
        defaultVariants: {
            status: "Active",
            shape: "pill",
            badgeStyle: "outline",
        },
    }
);

const dotVariants = cva("shrink-0 size-1.5 rounded-full", {
    variants: {
        status: {
            Active: "bg-success",
            Inactive: "bg-muted-foreground/30",
            Pending: "bg-warning",
        },
    },
    defaultVariants: {
        status: "Active",
    },
});

export interface StatusBadgeProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "style">,
    VariantProps<typeof statusBadgeVariants> {
    content?: string;
    trend?: "up" | "down" | "neutral";
}

function StatusBadge({
    className,
    status,
    shape,
    badgeStyle,
    trend,
    content = "Status",
    ...props
}: StatusBadgeProps) {
    const renderIcon = () => {
        if (trend === "up") return <ArrowUpRight className="size-3 text-success-foreground dark:text-success" />;
        if (trend === "down") return <ArrowDownRight className="size-3 text-destructive-foreground dark:text-destructive" />;
        return <div className={dotVariants({ status })} />;
    };

    // Use red background for down trends
    const effectiveBadgeStyle = trend === "down" ? undefined : badgeStyle;
    const trendClassName = trend === "down" ? "bg-destructive/10 border border-destructive/20 text-destructive-foreground dark:text-destructive" : "";

    return (
        <div
            className={cn(
                statusBadgeVariants({ status, shape, badgeStyle: effectiveBadgeStyle, className }),
                "px-2 py-1",
                trendClassName
            )}
            {...props}
        >
            {renderIcon()}
            <span className="leading-none">{content}</span>
        </div>
    );
}

export { StatusBadge, statusBadgeVariants };

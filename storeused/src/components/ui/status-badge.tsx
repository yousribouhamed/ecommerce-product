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
                Active: "text-[#22292f]",
                Inactive: "text-[#22292f]",
                Pending: "text-[#22292f]",
            },
            shape: {
                pill: "rounded-full",
                rectangle: "rounded-[4px]",
            },
            badgeStyle: {
                outline: "bg-white border border-[#d5dde2]",
                filled: "bg-[#f4f7f9]",
                "filled with borders": "bg-[#e7f6ec] border border-[#10a949]/20",
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
            Active: "bg-[#10a949]",
            Inactive: "bg-[#e2e8f0]",
            Pending: "bg-[#f59e0b]",
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
        if (trend === "up") return <ArrowUpRight className="size-3 text-[#10a949]" />;
        if (trend === "down") return <ArrowDownRight className="size-3 text-[#f04438]" />;
        return <div className={dotVariants({ status })} />;
    };

    // Use red background for down trends
    const effectiveBadgeStyle = trend === "down" ? undefined : badgeStyle;
    const trendClassName = trend === "down" ? "bg-[#fef3f2] border border-[#f04438]/20" : "";

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

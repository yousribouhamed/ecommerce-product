"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    selectedKeys?: string[];
    children: React.ReactNode;
}

export interface ButtonGroupItemProps extends React.ComponentProps<typeof Button> {
    id: string;
    iconLeading?: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

export function ButtonGroup({
    selectedKeys = [],
    children,
    className,
    ...props
}: ButtonGroupProps) {
    return (
        <div
            className={cn(
                "inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5",
                className
            )}
            role="group"
            {...props}
        >
            {children}
        </div>
    );
}

export function ButtonGroupItem({
    id,
    iconLeading: IconLeading,
    children,
    className,
    ...props
}: ButtonGroupItemProps) {
    return (
        <Button
            variant="outline"
            size="default"
            className={cn(
                "h-11 rounded-none first:rounded-l-lg last:rounded-r-lg border-[#D0D5DD] bg-white hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-brand-500 text-[#344054] font-medium px-4",
                className
            )}
            {...props}
        >
            {IconLeading && <IconLeading className="mr-2 h-5 w-5" />}
            {children}
        </Button>
    );
}

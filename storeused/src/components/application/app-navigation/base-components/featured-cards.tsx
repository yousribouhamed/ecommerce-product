"use client";

import type { ReactNode } from "react";
import { X } from "@untitledui/icons";
import { Progress, ProgressIndicator, ProgressTrack } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FeaturedCardProgressBarProps {
    title: string;
    description: string;
    confirmLabel: string;
    progress: number;
    onDismiss?: () => void;
    onConfirm?: () => void;
    className?: string;
}

export const FeaturedCardProgressBar = ({
    title,
    description,
    confirmLabel,
    progress,
    onDismiss,
    onConfirm,
    className,
}: FeaturedCardProgressBarProps) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20",
                className
            )}
        >
            <div className="flex flex-col gap-1">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                        {title}
                    </h3>
                    {onDismiss && (
                        <button
                            type="button"
                            onClick={onDismiss}
                            className="rounded-md p-0.5 text-orange-500 hover:bg-orange-100 dark:text-orange-400 dark:hover:bg-orange-900/40"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-200">
                    {description}
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <Progress value={progress}>
                    <ProgressTrack className="bg-orange-200 dark:bg-orange-900/40">
                        <ProgressIndicator className="bg-orange-600 dark:bg-orange-500" />
                    </ProgressTrack>
                </Progress>
            </div>

            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onDismiss}
                    className="text-sm font-semibold text-orange-700 hover:text-orange-800 dark:text-orange-200 dark:hover:text-orange-100"
                >
                    Dismiss
                </button>
                <button
                    type="button"
                    onClick={onConfirm}
                    className="text-sm font-semibold text-orange-900 hover:text-orange-950 dark:text-orange-100 dark:hover:text-white"
                >
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};

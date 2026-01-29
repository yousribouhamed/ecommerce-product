"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function OverviewSkeleton() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between space-y-2">
                <Skeleton className="h-8 w-48" />
            </div>

            {/* Banner Skeleton */}
            <Skeleton className="h-32 w-full rounded-xl" />

            {/* Button Group Skeleton */}
            <div className="flex gap-3">
                <Skeleton className="h-11 w-40 rounded-lg" />
                <Skeleton className="h-11 w-28 rounded-lg" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="overflow-hidden rounded-[12px]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4 rounded" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-6 w-40 rounded-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Chart Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Skeleton className="h-[300px] w-full" />
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-3 w-2/3" />
                                    </div>
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table Skeleton */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {/* Table Header */}
                        <div className="flex gap-4 pb-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-4 flex-1" />
                            ))}
                        </div>
                        {/* Table Rows */}
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4 py-3">
                                {[...Array(5)].map((_, j) => (
                                    <Skeleton key={j} className="h-4 flex-1" />
                                ))}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

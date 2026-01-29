"use client";

import * as React from "react";
import { CalendarDate } from "@internationalized/date";
import {
    RangeCalendar as AriaRangeCalendar,
    CalendarGrid,
    CalendarCell,
    Heading,
    Button,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarGridBody,
} from "react-aria-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function RangeCalendar(props: React.ComponentProps<typeof AriaRangeCalendar<CalendarDate>>) {
    return (
        <AriaRangeCalendar {...props} className={cn("p-3", props.className)}>
            <header className="flex items-center justify-between pb-4">
                <Button slot="previous" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Heading className="text-sm font-medium" />
                <Button slot="next" className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent hover:bg-accent hover:text-accent-foreground">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </header>
            <CalendarGrid className="border-collapse">
                <CalendarGridHeader>
                    {(day) => (
                        <CalendarHeaderCell className="w-9 text-center text-sm font-normal text-muted-foreground">
                            {day}
                        </CalendarHeaderCell>
                    )}
                </CalendarGridHeader>
                <CalendarGridBody>
                    {(date) => (
                        <CalendarCell
                            date={date}
                            className={({ isSelected, isOutsideMonth, isHovered }) =>
                                cn(
                                    "h-9 w-9 rounded-md text-center text-sm font-normal",
                                    "hover:bg-accent hover:text-accent-foreground",
                                    "focus:bg-accent focus:text-accent-foreground outline-none",
                                    isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                                    isOutsideMonth && "text-muted-foreground opacity-50"
                                )
                            }
                        />
                    )}
                </CalendarGridBody>
            </CalendarGrid>
        </AriaRangeCalendar>
    );
}

"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button" // Assuming Button component exists, else use standard button
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"

// Dummy data to match the screenshot structure
const data = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    col1: "Insert Title",
    col2: "Insert Title",
    col3: "Insert Title",
    col4: "Insert Title",
    col5: "Insert Title",
    status: i === 0 || i === 1 ? "success" : null, // First two rows have status
    toggle: i === 1 || i === 3, // 2nd and 4th rows have toggles on
    col7: "Insert Title",
}))

export function DesignSystemTable() {
    return (
        <div className="w-full overflow-hidden bg-background">
            <Table className="border-separate border-spacing-0">
                <TableHeader>
                    <TableRow className="bg-[#ECEFF2] hover:bg-[#ECEFF2]">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <TableHead key={i} className="h-12 font-medium text-muted-foreground first:rounded-l-[8px] last:rounded-r-[8px]">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                    Label
                                    <ChevronsUpDown className="h-4 w-4" />
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="[&_td]:border-b [&_td]:border-[#D5DDE2] [&_tr:last-child_td]:border-b-0">
                    {data.map((row, i) => (
                        <TableRow key={i} className="hover:bg-muted/5">
                            <TableCell className="font-medium text-foreground py-4">{row.col1}</TableCell>
                            <TableCell className="text-foreground py-4">{row.col2}</TableCell>
                            <TableCell className="text-foreground py-4">{row.col3}</TableCell>
                            <TableCell className="text-foreground py-4">{row.col4}</TableCell>
                            <TableCell className="text-foreground py-4">{row.col5}</TableCell>
                            <TableCell className="py-4">
                                {row.status ? (
                                    <Badge variant="success" shape="pill">
                                        Status
                                    </Badge>
                                ) : (
                                    <span className="text-foreground">Insert Title</span>
                                )}
                            </TableCell>
                            <TableCell className="text-foreground py-4">
                                {row.toggle !== undefined ? (
                                    row.toggle || i === 3 || i === 1 ? (
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Mixed content column based on screenshot: some have text, some toggles */}
                                            {/* Row 2 and 4 have toggles in the screenshot in the last col/second to last */}
                                            {/* Wait, looking at screenshot, the toggle is in the 6th column? or 7th? */}
                                            {/* Screenshot: Col 1-5 are text. Col 6 is status (row1,2) or text. Col 7 is text (row1) or toggle (row2) or text. */}
                                            {/* Actually row 2 has status in col 6 AND toggle in col 7? No, toggle looks like it's in col 7. */}

                                            {/* Let's strictly follow the screenshot logic roughly */}
                                            {(i === 1 || i === 3) ? <Switch defaultChecked /> : "Insert Title"}
                                        </div>
                                    ) : "Insert Title"
                                ) : "Insert Title"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                </Button>
                <div className="text-sm text-muted-foreground font-medium">
                    Page <span className="text-foreground">1</span> of <span className="text-foreground">10</span>
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                </Button>
            </div>
        </div>
    )
}

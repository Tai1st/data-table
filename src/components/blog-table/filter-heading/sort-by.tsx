"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Item } from "@radix-ui/react-dropdown-menu"

const items = [
    {
        label: 'Name',
        value: 'name'
    },
    {
        label: 'created Date',
        value: 'created_at'
    },
    {
        label: 'created By',
        value: 'created_by'
    }
];

export function SortBy() {
    const [sortBy, setSortBy] = React.useState("created_at")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                <div
                    className="flex items-center space-x-1">
                    <p
                        className="text-sm font-bold"
                    >
                        Sort By:
                    </p>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary font-semibold"
                    >
                        {items.find((item) => item.value === sortBy)?.label}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort table by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    {items.map(item => <DropdownMenuRadioItem value={item.value}
                        key={item.value}
                    >
                        {item.label}
                    </DropdownMenuRadioItem>)}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SortBy

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import FiltersFrom from "./filters-from"

const FilterDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
      <Button
      variant="outline"
      >
       Filters
       <SlidersHorizontal className="ml-2 h-4 w-4" />
    </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            You Can apply filters from this drawer.And data will automatically updated
          </SheetDescription>
        </SheetHeader>
            <FiltersFrom/>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
export default FilterDrawer

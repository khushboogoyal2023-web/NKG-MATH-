import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-card rounded-3xl border border-violet-100 dark:border-violet-900/50 shadow-xs select-none", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-heading font-black text-foreground tracking-wide",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 border-violet-200 dark:border-violet-800 rounded-lg text-foreground cursor-pointer"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between",
        head_cell:
          "text-violet-600 dark:text-violet-400 rounded-md w-8 font-body font-black text-[0.75rem] uppercase tracking-wider text-center",
        row: "flex w-full mt-1.5 justify-between",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-violet-50 dark:[&:has([aria-selected])]:bg-violet-950/30",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl"
            : "[&:has([aria-selected])]:rounded-xl"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-body font-bold text-xs rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/40 text-foreground transition-all cursor-pointer aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-violet-600 text-white hover:bg-violet-700 focus:bg-violet-600 focus:text-white dark:bg-violet-500 dark:hover:bg-violet-600 font-black shadow-xs shadow-violet-500/20 rounded-xl!",
        day_today: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 font-black rounded-xl",
        day_outside:
          "day-outside text-muted-foreground/40 aria-selected:bg-violet-50/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground/30 opacity-40 pointer-events-none",
        day_range_middle:
          "aria-selected:bg-violet-50 aria-selected:text-violet-900 dark:aria-selected:bg-violet-950/20 dark:aria-selected:text-violet-300 rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4 text-foreground", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4 text-foreground", className)} {...props} />
        ),
      }}
      ...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }

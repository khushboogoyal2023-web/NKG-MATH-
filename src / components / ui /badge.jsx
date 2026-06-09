import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs font-body font-black transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 select-none uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-violet-600 text-white shadow-xs hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600",
        secondary:
          "border-transparent bg-amber-500 text-white shadow-xs hover:bg-amber-600",
        destructive:
          "border-transparent bg-red-500 text-white shadow-xs hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline: "border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-xl text-sm font-bold text-foreground/80 transition-all hover:bg-violet-50 hover:text-violet-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:pointer-events-none disabled:opacity-40 data-[state=on]:bg-violet-600 data-[state=on]:text-white dark:data-[state=on]:bg-violet-500 data-[state=on]:shadow-md [&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0 cursor-pointer select-none active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border-2 border-violet-100 dark:border-violet-900/50 bg-transparent shadow-xs hover:bg-violet-50 hover:text-violet-900",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-8 px-2 min-w-8 rounded-lg text-xs",
        lg: "h-12 px-4 min-w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

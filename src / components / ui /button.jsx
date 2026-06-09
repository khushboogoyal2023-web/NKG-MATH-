import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-body font-black transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95 cursor-pointer select-none tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-violet-600 text-white shadow-md hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 shadow-violet-500/10",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
        outline:
          "border-2 border-violet-200 bg-transparent text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:hover:bg-violet-950/30",
        secondary:
          "bg-amber-500 text-white shadow-sm hover:bg-amber-600",
        ghost: "text-foreground hover:bg-muted",
        link: "text-violet-600 dark:text-violet-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 rounded-xl px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

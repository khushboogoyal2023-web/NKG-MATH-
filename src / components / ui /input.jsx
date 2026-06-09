import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border-2 border-violet-200 dark:border-violet-900 bg-card px-3.5 py-2 text-sm sm:text-base font-medium text-foreground shadow-xs transition-all placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:border-violet-600 dark:focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-40 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground select-none",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

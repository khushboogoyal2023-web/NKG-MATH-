import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border-2 border-violet-200 dark:border-violet-900 bg-card px-3.5 py-2.5 text-sm font-medium text-foreground shadow-xs placeholder:text-muted-foreground/60 focus-visible:outline-hidden focus-visible:border-violet-600 dark:focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-40 font-body transition-all",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }

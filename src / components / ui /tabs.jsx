import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-950/40 p-1 text-muted-foreground border border-violet-100/50 dark:border-violet-900/20",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold text-foreground/70 ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/20 disabled:pointer-events-none disabled:opacity-40 data-[state=active]:bg-violet-600 data-[state=active]:text-white dark:data-[state=active]:bg-violet-500 data-[state=active]:shadow-md cursor-pointer select-none active:scale-98",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/20",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

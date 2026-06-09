import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

// 1. Accordion Item - इसे हल्का राउंडेड और पैडेड कार्ड लुक दिया गया है
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "border-b border-violet-100 dark:border-violet-900/40 last:border-b-0 transition-colors", 
      className
    )}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

// 2. Accordion Trigger - फॉन्ट को बोल्ड, प्रॉमिनेंट और फोकस-फ्रेंडली बनाया गया है
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-3.5 px-1 text-sm font-body font-black text-foreground transition-all hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:rounded-lg text-left [&[data-state=open]>svg]:rotate-180 [&[data-state=open]]:text-violet-600 dark:[data-state=open]:text-violet-400 select-none",
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" 
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// 3. Accordion Content - इनर पैडिंग और टेक्स्ट रीडेबिलिटी को सुधारा गया है
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn(
      "pb-4 pt-1 px-1 font-body font-medium text-muted-foreground/90 text-[13px] sm:text-sm leading-relaxed", 
      className
    )}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

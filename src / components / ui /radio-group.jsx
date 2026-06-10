import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root className={cn("grid gap-2.5 font-body select-none", className)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full border-2 border-violet-300 dark:border-violet-800 bg-card text-violet-600 dark:text-violet-400 shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/20 data-[state=checked]:border-violet-600 dark:data-[state=checked]:border-violet-500 disabled:cursor-not-allowed disabled:opacity-40 transition-all cursor-pointer scale-100 data-[state=checked]:scale-105",
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-violet-600 dark:fill-violet-400 text-violet-600 dark:text-violet-400" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>)
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

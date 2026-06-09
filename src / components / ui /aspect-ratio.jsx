import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

// forwardRef का उपयोग करके इसे और अधिक मजबूत बनाया गया है
const AspectRatio = React.forwardRef(({ ...props }, ref) => (
  <AspectRatioPrimitive.Root ref={ref} {...props} />
))

AspectRatio.displayName = "AspectRatio"

export { AspectRatio }

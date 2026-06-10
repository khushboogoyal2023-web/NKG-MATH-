"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col text-foreground font-body select-none",
      className
    )}
    {...props} />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-1.5 items-center justify-center bg-violet-100/80 dark:bg-violet-950/30 transition-colors data-[resize-handle-state=hover]:bg-violet-300 dark:data-[resize-handle-state=hover]:bg-violet-800 data-[resize-handle-state=drag]:bg-violet-400 dark:data-[resize-handle-state=drag]:bg-violet-700 cursor-col-resize after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-violet-500/20 data-[panel-group-direction=vertical]:h-1.5 data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:cursor-row-resize data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-2 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}>
    {withHandle && (
      <div
        className="z-10 flex h-5 w-3.5 items-center justify-center rounded-md border border-violet-200 dark:border-violet-800 bg-card shadow-xs text-violet-500/80">
        <GripVertical className="h-3 w-3 stroke-[2.5]" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

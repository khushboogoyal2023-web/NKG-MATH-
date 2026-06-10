import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-xl bg-violet-100 dark:bg-violet-900/30", className)}
      {...props} />)
  );
}

export { Skeleton }

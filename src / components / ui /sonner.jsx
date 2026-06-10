"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-violet-100 dark:group-[.toaster]:border-violet-900/50 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl font-body select-none",
          description: "group-[.toast]:text-muted-foreground/80 font-medium text-xs",
          actionButton:
            "group-[.toast]:bg-violet-600 group-[.toast]:text-white dark:group-[.toast]:bg-violet-500 font-bold rounded-lg cursor-pointer",
          cancelButton:
            "group-[.toast]:bg-violet-50 group-[.toast]:text-violet-900 dark:group-[.toast]:bg-violet-950/40 dark:group-[.toast]:text-violet-300 font-bold rounded-lg cursor-pointer",
        },
      }}
      {...props} />)
  );
}

export { Toaster }

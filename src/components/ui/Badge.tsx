import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-zinc-900 text-white border-transparent dark:bg-zinc-100 dark:text-zinc-900",
    secondary: "bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    accent: "bg-indigo-50 text-indigo-700 border-indigo-100 font-medium dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
    warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
    destructive: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60",
    outline: "border-zinc-300 text-zinc-700 bg-transparent dark:border-zinc-700 dark:text-zinc-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

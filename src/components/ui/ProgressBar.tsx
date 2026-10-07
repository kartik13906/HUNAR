import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  indicatorClassName?: string;
  showLabel?: boolean;
  height?: "xs" | "sm" | "md";
}

export function ProgressBar({
  value,
  max = 100,
  className,
  indicatorClassName,
  showLabel = false,
  height = "sm",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const heights = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2.5",
  };

  return (
    <div className={cn("w-full flex flex-col gap-1", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800",
          heights[height]
        )}
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            "bg-indigo-500 dark:bg-indigo-500",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono tabular-nums text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

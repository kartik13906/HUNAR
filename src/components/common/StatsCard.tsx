import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatsCard({
  label,
  value,
  subtext,
  icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all", className)}>
      <CardContent className="p-5 flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-mono">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  "text-xs font-semibold px-1.5 py-0.5 rounded",
                  trend.isPositive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                    : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtext && <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-0.5">{subtext}</p>}
        </div>
        {icon && (
          <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-2.5 text-zinc-700 dark:text-zinc-300 shrink-0">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

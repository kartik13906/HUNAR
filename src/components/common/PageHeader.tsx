import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800 mb-8 transition-colors",
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {badge && (
          <Badge variant="accent" className="mb-1 text-xs">
            {badge}
          </Badge>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}

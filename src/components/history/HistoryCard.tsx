import React from "react";
import { EvaluationResult, PerformanceLabel } from "@/types";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

interface HistoryCardProps {
  evaluation: EvaluationResult;
  onSelect?: (evaluation: EvaluationResult) => void;
}

export function HistoryCard({ evaluation, onSelect }: HistoryCardProps) {
  const getBadgeVariant = (label: PerformanceLabel) => {
    switch (label) {
      case "Mastery":
      case "Strong Understanding":
        return "success";
      case "Good Understanding":
        return "accent";
      case "Moderate Understanding":
        return "warning";
      default:
        return "destructive";
    }
  };

  const scoreColor =
    evaluation.score >= 8.5
      ? "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800/60"
      : evaluation.score >= 7.5
      ? "text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-300 dark:bg-indigo-950/60 dark:border-indigo-800/60"
      : "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/60 dark:border-amber-800/60";

  return (
    <Card className="hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Main Info */}
          <div className="space-y-1.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {evaluation.articleCategory}
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-400">
                <Calendar className="h-3 w-3" />
                {formatDate(evaluation.completedAt)}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                {evaluation.wordCount} words recalled
              </span>
            </div>

            <h3 className="font-semibold text-base sm:text-lg text-zinc-950 dark:text-zinc-50 truncate">
              {evaluation.articleTitle}
            </h3>

            <div className="flex items-center gap-2 pt-0.5">
              <Badge
                variant={getBadgeVariant(evaluation.performanceLabel)}
                className="text-[11px] font-semibold"
              >
                {evaluation.performanceLabel}
              </Badge>
            </div>
          </div>

          {/* Score & Action */}
          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
            <div
              className={`flex items-baseline gap-1 px-3 py-1.5 rounded-lg border font-mono ${scoreColor}`}
            >
              <span className="text-xl font-bold">{evaluation.score.toFixed(1)}</span>
              <span className="text-xs opacity-70">/10</span>
            </div>

            {onSelect ? (
              <button
                type="button"
                onClick={() => onSelect(evaluation)}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/60 transition-colors"
              >
                <span>View Rubric</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href={`/results?id=${evaluation.id}`}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/60 transition-colors"
              >
                <span>View Rubric</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sneak peek of feedback */}
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
          &ldquo;{evaluation.feedback}&rdquo;
        </div>
      </CardContent>
    </Card>
  );
}

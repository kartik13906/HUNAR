import React from "react";
import { ScoreRing } from "./ScoreRing";
import { PerformanceLabel } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface ScoreCardProps {
  score: number;
  performanceLabel: PerformanceLabel;
  articleCategory: string;
}

export function ScoreCard({
  score,
  performanceLabel,
  articleCategory,
}: ScoreCardProps) {
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

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Evaluation Result
            </span>
            <span className="text-zinc-300">•</span>
            <Badge variant="secondary" className="text-xs">
              {articleCategory}
            </Badge>
          </div>

          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Your Comprehension Score
          </h2>

          <div className="flex items-baseline justify-center sm:justify-start gap-2">
            <span className="font-mono text-4xl sm:text-5xl font-black tracking-tight text-zinc-950">
              {score.toFixed(1)}
            </span>
            <span className="text-lg font-semibold text-zinc-400 font-mono">
              / 10
            </span>
          </div>

          <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
            <Badge
              variant={getBadgeVariant(performanceLabel)}
              className="text-xs font-semibold px-3 py-1"
            >
              {performanceLabel}
            </Badge>
            <span className="text-xs text-zinc-500">
              Assessed via Active Recall
            </span>
          </div>
        </div>

        {/* Circular / Ring Score Indicator */}
        <div className="flex flex-col items-center justify-center p-2 shrink-0">
          <ScoreRing score={score} size={110} strokeWidth={9} />
          <span className="text-[11px] font-medium text-zinc-400 mt-2">
            Weighted Rubric Score
          </span>
        </div>
      </div>
    </div>
  );
}

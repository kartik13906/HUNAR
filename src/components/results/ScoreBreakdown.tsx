import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScoreBreakdown as IScoreBreakdown } from "@/types";
import { BarChart3 } from "lucide-react";

interface ScoreBreakdownProps {
  breakdown: IScoreBreakdown;
}

export function ScoreBreakdown({ breakdown }: ScoreBreakdownProps) {
  const criteria = [
    { label: "Main Idea", value: breakdown.mainIdea, desc: "Grasp of core argument" },
    { label: "Key Concepts", value: breakdown.keyConcepts, desc: "Coverage of essential points" },
    { label: "Accuracy", value: breakdown.accuracy, desc: "Factual and contextual fidelity" },
    { label: "Completeness", value: breakdown.completeness, desc: "Breadth of recalled elements" },
  ];

  return (
    <Card className="border-zinc-200/90">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-700">
            <BarChart3 className="h-3.5 w-3.5" />
          </div>
          <CardTitle className="text-base font-semibold text-zinc-900">
            Score Breakdown
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {criteria.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-zinc-100 bg-zinc-50/60 p-3.5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-zinc-800 block">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-zinc-600 block">
                    {item.desc}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-bold text-zinc-900">
                    {item.value}
                  </span>
                  <span className="text-[11px] text-zinc-600 font-mono">/10</span>
                </div>
              </div>

              <ProgressBar
                value={item.value * 10}
                max={100}
                indicatorClassName={
                  item.value >= 8.5
                    ? "bg-emerald-600"
                    : item.value >= 7.5
                    ? "bg-indigo-600"
                    : "bg-amber-500"
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

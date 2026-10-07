import React from "react";
import { Check, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface ConceptListProps {
  strengths: string[];
  missed: string[];
}

export function ConceptList({ strengths, missed }: ConceptListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* What You Understood Card */}
      <Card className="border-emerald-200/80 bg-gradient-to-b from-white to-emerald-50/20 dark:border-emerald-900/60 dark:from-zinc-900 dark:to-emerald-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300 text-emerald-800">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <CardTitle className="text-base font-semibold text-emerald-950 dark:text-emerald-200">
              What You Understood
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3" role="list">
            {strengths.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 mt-0.5">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* What You Missed Card */}
      <Card className="border-amber-200/80 bg-gradient-to-b from-white to-amber-50/20 dark:border-amber-900/60 dark:from-zinc-900 dark:to-amber-950/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950 dark:text-amber-300 text-amber-800">
              <AlertCircle className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <CardTitle className="text-base font-semibold text-amber-950 dark:text-amber-200">
              What You Missed
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3" role="list">
            {missed.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 mt-0.5 font-bold text-xs">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

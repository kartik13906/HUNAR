import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Sparkles } from "lucide-react";

interface FeedbackCardProps {
  feedback: string;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card className="border-indigo-100 bg-gradient-to-b from-white to-indigo-50/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-100 text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <CardTitle className="text-base font-semibold text-zinc-900">
              AI Feedback
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Semantic Synthesis
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed font-sans">
          {feedback}
        </p>
      </CardContent>
    </Card>
  );
}

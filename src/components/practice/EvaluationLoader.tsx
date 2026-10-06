"use client";

import React, { useEffect, useState } from "react";
import { Brain, CheckCircle } from "lucide-react";

interface EvaluationLoaderProps {
  articleTitle: string;
}

const EVALUATION_STEPS = [
  "Parsing student explanation...",
  "Comparing recall with key technical concepts...",
  "Scoring accuracy, main idea, and depth...",
  "Generating synthesized comprehension feedback..."
];

export function EvaluationLoader({ articleTitle }: EvaluationLoaderProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIdx((prev) => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full max-w-xl mx-auto my-12 rounded-2xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-sm text-center space-y-8"
    >
      {/* Central subtle icon indicator */}
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        {/* Soft pulse background ring */}
        <div className="absolute inset-0 rounded-full bg-indigo-50 animate-ping opacity-35" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
          <Brain className="h-8 w-8 stroke-[1.8] animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
          Evaluating your understanding...
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto line-clamp-1">
          Analyzing recall for &ldquo;{articleTitle}&rdquo;
        </p>
      </div>

      {/* Progressive evaluation steps */}
      <div className="max-w-sm mx-auto space-y-2.5 text-left border-t border-zinc-100 pt-6">
        {EVALUATION_STEPS.map((step, idx) => {
          const isDone = idx < currentStepIdx;
          const isCurrent = idx === currentStepIdx;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                isDone
                  ? "text-zinc-700 font-medium"
                  : isCurrent
                  ? "text-indigo-700 font-semibold"
                  : "text-zinc-400 opacity-60"
              }`}
            >
              {isDone ? (
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <div className="h-4 w-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-zinc-300 shrink-0" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-[11px] text-zinc-400">
        AI Evaluation Framework v2.4 • Semantic Similarity &amp; Concept Coverage
      </div>
    </div>
  );
}

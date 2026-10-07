"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { WordCounter } from "./WordCounter";
import { countWords } from "@/lib/utils";
import { PenLine, Sparkles, AlertCircle, HelpCircle } from "lucide-react";
import { Article } from "@/types";

interface AnswerEditorProps {
  article: Article;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function AnswerEditor({
  article,
  value,
  onChange,
  onSubmit,
  isSubmitting = false,
}: AnswerEditorProps) {
  const [validationError, setValidationError] = useState<string | null>(null);

  const words = countWords(value);
  const characters = value.length;
  const MIN_REQUIRED_WORDS = 15;
  const RECOMMENDED_WORDS = 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (words < MIN_REQUIRED_WORDS) {
      setValidationError(
        `Please elaborate further on your understanding (current: ${words} words, minimum: ${MIN_REQUIRED_WORDS} words required for meaningful AI evaluation).`
      );
      return;
    }
    setValidationError(null);
    onSubmit();
  };

  const handleFillSample = () => {
    let sample = "";
    if (article.id === "edge-computing-modern-apps") {
      sample =
        "Edge computing moves computational resources and data processing closer to the physical location of the user and device, instead of relying exclusively on central cloud data centers. This cuts down round-trip network latency from tens of milliseconds down to under five milliseconds, which is crucial for real-time services like autonomous vehicles and surgical robots. Rather than sending all raw sensor logs over the internet, edge nodes can preprocess and analyze data locally.";
    } else if (article.id === "attention-mechanisms-deep-learning") {
      sample =
        "Recurrent neural networks faced an information bottleneck because they compressed entire sequential inputs into a single hidden vector. Attention mechanisms revolutionized this by providing soft dynamic weights across all input positions. The Transformer then replaced recurrence with multi-head self-attention using queries, keys, and values, enabling full GPU parallelization despite quadratic scaling complexity.";
    } else {
      sample =
        "The text discusses the core theoretical mechanisms and architectural shifts involved in this domain. Key principles involve moving from rigid centralized architectures to adaptive, distributed processes that maximize operational efficiency while managing computational constraints.";
    }
    onChange(sample);
    setValidationError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto space-y-6">
      {/* Header Prompt */}
      <div className="space-y-2 rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-6 sm:p-8 shadow-xs transition-colors">
        <div className="inline-flex items-center gap-2 rounded-md bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <PenLine className="h-3.5 w-3.5" />
          <span>Active Recall Phase</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Now explain what you understood.
        </h2>

        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Write the main idea and important concepts in your own words. Do not
          worry about using the exact wording from the article.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Topic: {article.category}
          </span>
          <span>•</span>
          <span className="italic truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      {/* Writing Container */}
      <div className="rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
        <div className="space-y-1">
          <label
            htmlFor="student-response"
            className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
          >
            Your Explanation
          </label>
          <div className="relative">
            <textarea
              id="student-response"
              rows={9}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                if (validationError && countWords(e.target.value) >= MIN_REQUIRED_WORDS) {
                  setValidationError(null);
                }
              }}
              placeholder="Explain the article in your own words..."
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 p-4 text-base text-zinc-900 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 leading-relaxed font-sans resize-y min-h-[220px]"
              autoFocus
            />
          </div>
        </div>

        {/* Word and Character Counter */}
        <WordCounter
          words={words}
          characters={characters}
          minRecommendedWords={RECOMMENDED_WORDS}
        />

        {/* Validation Error Message */}
        {validationError && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 p-3 text-xs text-rose-700 dark:text-rose-300 font-medium"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Actions */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center justify-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium hover:underline py-1.5"
            title="Auto-fill a realistic student response for rapid testing"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Quick fill demo answer</span>
          </button>

          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full sm:w-auto shadow-sm text-sm sm:text-base font-semibold"
          >
            Evaluate My Understanding
          </Button>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 dark:border-zinc-800 dark:bg-zinc-900/60 p-4 text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-3">
        <HelpCircle className="h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">Recall Guidelines</p>
          <p>
            Aim for conceptual clarity. Focus on: (1) what problem the article introduces,
            (2) how the mechanism works, and (3) any trade-offs or constraints highlighted by the author.
          </p>
        </div>
      </div>
    </form>
  );
}

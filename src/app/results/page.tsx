"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ScoreCard } from "@/components/results/ScoreCard";
import { ConceptList } from "@/components/results/ConceptList";
import { FeedbackCard } from "@/components/results/FeedbackCard";
import { ScoreBreakdown } from "@/components/results/ScoreBreakdown";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import {
  RotateCcw,
  History as HistoryIcon,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { MOCK_ARTICLES } from "@/data/articles";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evaluationId = searchParams.get("id");

  const {
    latestEvaluation,
    evaluationsHistory,
    resetPractice,
    currentArticle,
  } = useApp();

  const [showUserAnswer, setShowUserAnswer] = useState(false);

  // Look up evaluation by ID if requested in URL, else fallback to latestEvaluation or first item
  const evaluation = evaluationId
    ? evaluationsHistory.find((e) => e.id === evaluationId) || latestEvaluation
    : latestEvaluation || evaluationsHistory[0];

  if (!evaluation) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          No Evaluation Found
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          You haven&apos;t completed a practice session yet. Start reading an
          article to generate an AI comprehension evaluation.
        </p>
        <Link href="/practice">
          <Button variant="primary">Start Practice Session</Button>
        </Link>
      </div>
    );
  }

  const handleTryAnotherArticle = () => {
    // Cycle to a different article
    const nextArticle =
      MOCK_ARTICLES.find((a) => a.id !== evaluation.articleId) ||
      MOCK_ARTICLES[0];
    resetPractice(nextArticle);
    router.push("/practice");
  };

  const handleRetakeSame = () => {
    const sameArticle =
      MOCK_ARTICLES.find((a) => a.id === evaluation.articleId) || currentArticle;
    resetPractice(sameArticle);
    router.push("/practice");
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] dark:bg-zinc-950 py-8 sm:py-12 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb & Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <Link href="/history" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                History
              </Link>
              <span>/</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                Evaluation Report
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-zinc-50">
              {evaluation.articleTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1 font-mono">
              <Clock className="h-3.5 w-3.5" />
              {evaluation.wordCount} words recalled
            </span>
            <span>•</span>
            <span>{formatDate(evaluation.completedAt)}</span>
          </div>
        </div>

        {/* 1. Score Card with Circular / Ring Indicator */}
        <ScoreCard
          score={evaluation.score}
          performanceLabel={evaluation.performanceLabel}
          articleCategory={evaluation.articleCategory}
        />

        {/* 2. Concepts Breakdown: What You Understood & What You Missed */}
        <ConceptList
          strengths={evaluation.strengths}
          missed={evaluation.missed}
        />

        {/* 3. AI Feedback */}
        <FeedbackCard feedback={evaluation.feedback} />

        {/* 4. Score Breakdown */}
        <ScoreBreakdown breakdown={evaluation.breakdown} />

        {/* Optional Expandable: Review Student Submitted Text */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setShowUserAnswer(!showUserAnswer)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors rounded-xl"
            aria-expanded={showUserAnswer}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Review Your Submitted Explanation ({evaluation.wordCount} words)
              </span>
            </div>
            {showUserAnswer ? (
              <ChevronUp className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            )}
          </button>
          {showUserAnswer && (
            <CardContent className="pt-0 pb-4 px-4 border-t border-zinc-100 dark:border-zinc-800">
              <blockquote className="rounded-lg bg-zinc-50 dark:bg-zinc-950 p-4 text-sm text-zinc-800 dark:text-zinc-200 font-serif leading-relaxed border-l-2 border-indigo-500">
                &ldquo;{evaluation.userAnswer}&rdquo;
              </blockquote>
            </CardContent>
          )}
        </Card>

        {/* Action Buttons as requested: "Try Another Article", "View History" */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={handleTryAnotherArticle}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-semibold"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              <span>Try Another Article</span>
            </Button>
            <Button
              onClick={handleRetakeSame}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              <span>Re-attempt Article</span>
            </Button>
          </div>

          <Link href="/history" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto font-medium"
            >
              <HistoryIcon className="h-4 w-4 mr-2 text-zinc-500 dark:text-zinc-400" />
              <span>View History</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Loading evaluation report...</div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

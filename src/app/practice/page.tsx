"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { evaluateComprehension } from "@/services/mockApi";
import { ArticleReader } from "@/components/practice/ArticleReader";
import { ReadingTimer } from "@/components/practice/ReadingTimer";
import { AnswerEditor } from "@/components/practice/AnswerEditor";
import { EvaluationLoader } from "@/components/practice/EvaluationLoader";
import { ArticleSelector } from "@/components/practice/ArticleSelector";
import { RotateCcw, Layers } from "lucide-react";

export default function PracticePage() {
  const router = useRouter();
  const {
    currentArticle,
    practicePhase,
    setPracticePhase,
    remainingTime,
    setRemainingTime,
    studentAnswer,
    setStudentAnswer,
    addEvaluation,
    resetPractice,
    selectArticleAndStart,
  } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showArticlePicker, setShowArticlePicker] = useState(false);

  // Called when countdown reaches 0
  const handleTimerExpire = () => {
    setPracticePhase("answering");
  };

  // Called if student clicks "I'm Done Reading" before timer expires
  const handleFinishReadingEarly = () => {
    setPracticePhase("answering");
  };

  // Handles final answer submission
  const handleSubmitAnswer = async () => {
    setIsSubmitting(true);
    setPracticePhase("submitting");

    const timeSpent = currentArticle.readingTimeSeconds - remainingTime;

    try {
      // Call mock evaluation API (with realistic 1.8s delay)
      const evaluation = await evaluateComprehension(
        currentArticle,
        studentAnswer,
        timeSpent > 0 ? timeSpent : currentArticle.readingTimeSeconds
      );

      // Save evaluation to context & localStorage
      addEvaluation(evaluation);
      setPracticePhase("completed");

      // Navigate to results page
      router.push("/results");
    } catch (err) {
      console.error("Evaluation error:", err);
      setIsSubmitting(false);
      setPracticePhase("answering");
    }
  };

  const handleRestart = () => {
    resetPractice(currentArticle);
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] dark:bg-zinc-950 py-8 sm:py-12 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Practice Top Navigation / Utility Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Practice Session</span>
            <span>/</span>
            <span className="capitalize font-medium text-indigo-600 dark:text-indigo-400">
              {practicePhase === "reading"
                ? "Reading Phase"
                : practicePhase === "answering"
                ? "Active Recall Phase"
                : practicePhase === "submitting"
                ? "Evaluation"
                : "Complete"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {practicePhase === "reading" && (
              <button
                type="button"
                onClick={() => setShowArticlePicker(!showArticlePicker)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
              >
                <Layers className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>{showArticlePicker ? "Hide Papers" : "Change Article"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
              title="Reset practice with initial timer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Collapsible Article Picker (Reading Phase only) */}
        {showArticlePicker && practicePhase === "reading" && (
          <div className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/80 mb-6 transition-colors">
            <ArticleSelector
              currentArticleId={currentArticle.id}
              onSelectArticle={(art) => {
                selectArticleAndStart(art.id);
                setShowArticlePicker(false);
              }}
            />
          </div>
        )}

        {/* =========================================================================
            PHASE 1: READING PHASE
            Shows Category, Title, Reading Timer, Progress Indicator, Article Container
            ========================================================================= */}
        {practicePhase === "reading" && (
          <div className="space-y-6">
            {/* Top Bar with Category, Title, Reading Timer, and Progress */}
            <div className="space-y-4">
              <ReadingTimer
                initialSeconds={currentArticle.readingTimeSeconds}
                remainingSeconds={remainingTime}
                onTick={(newTime) => setRemainingTime(newTime)}
                onTimerEnd={handleTimerExpire}
                onFinishEarly={handleFinishReadingEarly}
                isRunning={practicePhase === "reading"}
              />
            </div>

            {/* Reading Container with comfortable typography */}
            <ArticleReader
              article={currentArticle}
              onFinishReading={handleFinishReadingEarly}
            />
          </div>
        )}

        {/* =========================================================================
            PHASE 2: COMPREHENSION / ACTIVE RECALL PHASE
            CRITICAL: The article is completely replaced. It is NOT visible or blurred.
            ========================================================================= */}
        {practicePhase === "answering" && (
          <AnswerEditor
            article={currentArticle}
            value={studentAnswer}
            onChange={(val) => setStudentAnswer(val)}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
          />
        )}

        {/* =========================================================================
            PHASE 3: SUBMITTING / EVALUATION STATE
            Subtle, clean, intellectual evaluation loader
            ========================================================================= */}
        {practicePhase === "submitting" && (
          <EvaluationLoader articleTitle={currentArticle.title} />
        )}
      </div>
    </div>
  );
}

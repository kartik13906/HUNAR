"use client";

import React, { useState } from "react";
import { Article } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Type } from "lucide-react";

interface ArticleReaderProps {
  article: Article;
  onFinishReading: () => void;
}

export function ArticleReader({ article, onFinishReading }: ArticleReaderProps) {
  const [fontSize, setFontSize] = useState<"standard" | "large">("standard");

  const totalWords = article.content.reduce(
    (acc, p) => acc + p.split(/\s+/).filter(Boolean).length,
    0
  );

  return (
    <article className="w-full max-w-3xl mx-auto animate-fade-in">
      {/* ── Article header ──────────────────────────────────── */}
      <header className="mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <Badge variant="accent" className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1">
            {article.category}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 divide-x divide-zinc-200 dark:divide-zinc-800">
            <span className="tabular-nums">{totalWords.toLocaleString()} words</span>
            <span className="pl-3">{article.difficulty}</span>
            <button
              type="button"
              onClick={() => setFontSize(s => s === "standard" ? "large" : "standard")}
              className="pl-3 inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
              title="Toggle reading font size"
              aria-label={`Switch to ${fontSize === "standard" ? "large" : "standard"} text`}
            >
              <Type className="h-3.5 w-3.5" />
              <span className="font-medium">{fontSize === "standard" ? "Aa" : "Aa+"}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight mb-3">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-zinc-500 dark:text-zinc-400">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{article.author}</span>
          <span aria-hidden className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="italic">{article.source}</span>
        </div>
      </header>

      {/* ── Reading body ─────────────────────────────────────── */}
      <div
        className={[
          "rounded-2xl border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900 transition-colors",
          "px-7 py-8 sm:px-12 sm:py-12",
          "shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-none",
          "font-serif text-zinc-800 dark:text-zinc-200 space-y-[1.5em]",
          fontSize === "large"
            ? "text-[1.1rem] leading-[1.9] sm:text-[1.15rem]"
            : "text-[1.0rem] leading-[1.8] sm:text-[1.05rem]",
        ].join(" ")}
      >
        {article.content.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-justify hyphens-auto text-zinc-800 dark:text-zinc-200"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── Footer: protocol reminder + done button ─────────── */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 px-5 py-4 transition-colors">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
            Active Recall Protocol
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            When the timer expires, this article will disappear. Absorb the key arguments and relationships.
          </p>
        </div>
        <Button
          onClick={onFinishReading}
          variant="primary"
          size="md"
          className="shrink-0 w-full sm:w-auto"
        >
          I&apos;m Done Reading
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

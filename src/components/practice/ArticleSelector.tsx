"use client";

import React from "react";
import { Article } from "@/types";
import { MOCK_ARTICLES } from "@/data/articles";
import { Badge } from "@/components/ui/Badge";
import { Clock, Check } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface ArticleSelectorProps {
  currentArticleId: string;
  onSelectArticle: (article: Article) => void;
}

export function ArticleSelector({
  currentArticleId,
  onSelectArticle,
}: ArticleSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Select Reading Article
        </label>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {MOCK_ARTICLES.length} available papers
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MOCK_ARTICLES.map((art) => {
          const isSelected = art.id === currentArticleId;

          return (
            <button
              key={art.id}
              type="button"
              onClick={() => onSelectArticle(art)}
              className={`text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col justify-between gap-3 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600 dark:border-indigo-500 dark:bg-indigo-950/40 dark:ring-indigo-500 shadow-xs"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/60"
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={isSelected ? "accent" : "secondary"} className="text-[10px]">
                    {art.category}
                  </Badge>
                  {isSelected && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-white">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs line-clamp-2 leading-snug">
                  {art.title}
                </h4>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="h-3 w-3" />
                  {formatTime(art.readingTimeSeconds)}
                </span>
                <span>{art.difficulty}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

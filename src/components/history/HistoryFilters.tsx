"use client";

import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export type HistorySortOption = "date-desc" | "date-asc" | "score-desc" | "score-asc";

interface HistoryFiltersProps {
  topics: string[];
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  sortBy: HistorySortOption;
  onSortChange: (sort: HistorySortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HistoryFilters({
  topics,
  selectedTopic,
  onTopicChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs transition-colors">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by article title or keyword..."
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 pl-9 pr-3 py-1.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Topic filter dropdown */}
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <select
            value={selectedTopic}
            onChange={(e) => onTopicChange(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            aria-label="Filter by Topic"
          >
            <option value="ALL">All Topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by dropdown */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as HistorySortOption)}
            className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:border-indigo-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-600"
            aria-label="Sort Order"
          >
            <option value="date-desc">Date (Newest first)</option>
            <option value="date-asc">Date (Oldest first)</option>
            <option value="score-desc">Score (Highest first)</option>
            <option value="score-asc">Score (Lowest first)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

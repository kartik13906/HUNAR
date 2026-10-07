"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { HistoryCard } from "@/components/history/HistoryCard";
import { HistoryFilters } from "@/components/history/HistoryFilters";
import { Button } from "@/components/ui/Button";
import {
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  LayoutGrid,
  Table as TableIcon,
  Plus,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export default function HistoryPage() {
  const { evaluationsHistory } = useApp();

  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "score-desc" | "score-asc"
  >("date-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Unique topics
  const topics = useMemo(() => {
    const set = new Set(evaluationsHistory.map((e) => e.articleCategory));
    return Array.from(set);
  }, [evaluationsHistory]);

  // Filtered & sorted history items
  const filteredHistory = useMemo(() => {
    let result = [...evaluationsHistory];

    if (selectedTopic !== "ALL") {
      result = result.filter((e) => e.articleCategory === selectedTopic);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.articleTitle.toLowerCase().includes(q) ||
          e.articleCategory.toLowerCase().includes(q) ||
          e.feedback.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "date-desc") {
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
      if (sortBy === "date-asc") {
        return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
      }
      if (sortBy === "score-desc") {
        return b.score - a.score;
      }
      if (sortBy === "score-asc") {
        return a.score - b.score;
      }
      return 0;
    });

    return result;
  }, [evaluationsHistory, selectedTopic, sortBy, searchQuery]);

  // Overall progress statistics calculations
  const totalCompleted = evaluationsHistory.length;
  const averageScore =
    totalCompleted > 0
      ? (
          evaluationsHistory.reduce((sum, item) => sum + item.score, 0) /
          totalCompleted
        ).toFixed(1)
      : "0.0";

  const highPerformers = evaluationsHistory.filter((e) => e.score >= 8.0).length;
  const strongRate =
    totalCompleted > 0 ? Math.round((highPerformers / totalCompleted) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#FCFCFD] dark:bg-zinc-950 py-8 sm:py-12 transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <PageHeader
          badge="Learning Analytics"
          title="Evaluation History"
          description="Review previous active recall assessments, analyze score trajectory, and identify conceptual strengths across disciplines."
          actions={
            <Link href="/practice">
              <Button variant="primary" size="md">
                <Plus className="h-4 w-4 mr-1.5" />
                <span>New Session</span>
              </Button>
            </Link>
          }
        />

        {/* Small Overall Progress Section requested in requirements */}
        <section aria-label="Overall Progress" className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Overall Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              label="Average Score"
              value={`${averageScore} / 10`}
              subtext="Across all evaluated sessions"
              trend={{ value: "+0.4 vs baseline", isPositive: true }}
              icon={<Award className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />}
            />
            <StatsCard
              label="Articles Completed"
              value={totalCompleted}
              subtext="Academic technical papers"
              icon={<BookOpen className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />}
            />
            <StatsCard
              label="Comprehension Rate"
              value={`${strongRate}%`}
              subtext="Scored 8.0 or higher"
              trend={{ value: "Strong Retention", isPositive: true }}
              icon={<CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
            />
            <StatsCard
              label="Active Topics"
              value={topics.length}
              subtext="Distinct scientific domains"
              icon={<TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
            />
          </div>
        </section>

        {/* Filter and Search Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Session History ({filteredHistory.length})
            </h2>
            <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode("cards")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "cards"
                    ? "bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-50 shadow-2xs"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                aria-label="Card view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === "table"
                    ? "bg-white dark:bg-zinc-700 text-zinc-950 dark:text-zinc-50 shadow-2xs"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
                aria-label="Table view"
              >
                <TableIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <HistoryFilters
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* History List or Table */}
        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              No matching evaluation records found for this query or topic.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedTopic("ALL");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : viewMode === "cards" ? (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <HistoryCard key={item.id} evaluation={item} />
            ))}
          </div>
        ) : (
          /* Table View alternative */
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="px-5 py-3.5">
                      Article Title
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Topic
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Score
                    </th>
                    <th scope="col" className="px-4 py-3.5">
                      Performance
                    </th>
                    <th scope="col" className="px-5 py-3.5 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filteredHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-medium text-zinc-950 dark:text-zinc-100">
                        {item.articleTitle}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-400">
                        <Badge variant="secondary" className="text-[10px]">
                          {item.articleCategory}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        {formatDate(item.completedAt)}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                        {item.score.toFixed(1)} / 10
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                          {item.performanceLabel}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <Link
                          href={`/results?id=${item.id}`}
                          className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

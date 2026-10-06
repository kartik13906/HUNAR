"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PageHeader } from "@/components/common/PageHeader";
import { StatsCard } from "@/components/common/StatsCard";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  ArrowRight,
  Target,
  Sparkles,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { studentProfile, evaluationsHistory } = useApp();

  const articlesCompleted = evaluationsHistory.length;

  const averageScore =
    articlesCompleted > 0
      ? (
          evaluationsHistory.reduce((acc, curr) => acc + curr.score, 0) /
          articlesCompleted
        ).toFixed(1)
      : "0.0";

  const bestScore =
    articlesCompleted > 0
      ? Math.max(...evaluationsHistory.map((e) => e.score)).toFixed(1)
      : "0.0";

  // Recent activity: top 4 recent evaluations
  const recentActivity = evaluationsHistory.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FCFCFD] py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <PageHeader
          badge="Undergraduate Scholar"
          title="Student Profile"
          description="Track your active recall performance trajectory, academic milestones, and recent comprehension evaluations."
          actions={
            <Link href="/practice">
              <Button variant="primary" size="md">
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          }
        />

        {/* Profile Card */}
        <Card className="border-zinc-200/90 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 h-24" />
          <CardContent className="px-6 pb-6 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 mb-4">
              {/* Avatar circle */}
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white border-4 border-white shadow-md text-indigo-700 font-bold text-2xl font-mono">
                {studentProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-xs">
                  Active Scholar
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {studentProfile.academicYear}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
                {studentProfile.name}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-zinc-400" />
                  {studentProfile.institution}
                </span>
                <span>•</span>
                <span>{studentProfile.fieldOfStudy}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                  Member since {studentProfile.joinedDate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Stats Section requested: Articles completed, Average score, Best score */}
        <section aria-label="Student Statistics" className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Performance Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              label="Articles Completed"
              value={articlesCompleted}
              subtext="Peer-reviewed technical readings"
              icon={<BookOpen className="h-5 w-5 text-indigo-600" />}
            />
            <StatsCard
              label="Average Score"
              value={`${averageScore} / 10`}
              subtext="Normalized comprehension metric"
              trend={{ value: "+0.3 trend", isPositive: true }}
              icon={<Award className="h-5 w-5 text-indigo-700" />}
            />
            <StatsCard
              label="Best Score"
              value={`${bestScore} / 10`}
              subtext="Peak active recall performance"
              trend={{ value: "Mastery Level", isPositive: true }}
              icon={<Sparkles className="h-5 w-5 text-emerald-600" />}
            />
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Recent Activity
            </h2>
            <Link
              href="/history"
              className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              View Full History →
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card
                key={activity.id}
                className="hover:border-zinc-300 transition-colors"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {activity.articleCategory}
                      </Badge>
                      <span className="text-[11px] text-zinc-600">
                        {formatDate(activity.completedAt)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-zinc-950">
                      {activity.articleTitle}
                    </h3>
                    <p className="text-xs text-zinc-600 line-clamp-1 max-w-lg">
                      &ldquo;{activity.feedback}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="flex items-baseline gap-1 font-mono text-sm font-bold px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-900 border border-zinc-200">
                      <span>{activity.score.toFixed(1)}</span>
                      <span className="text-xs text-zinc-600">/10</span>
                    </div>
                    <Link
                      href={`/results?id=${activity.id}`}
                      className="p-1.5 text-zinc-400 hover:text-zinc-700"
                      title="View Evaluation"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Academic Routine / Daily Goals Card */}
        <Card className="border-zinc-200/90 bg-zinc-50/60">
          <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900">
                <Target className="h-4 w-4 text-indigo-600" />
                <span>Daily Practice Objective</span>
              </div>
              <p className="text-xs text-zinc-600 max-w-md">
                Consistent 10-minute active recall routines have been shown to
                triple retention after 30 days compared to single cram sessions.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Daily Goal Met Today</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

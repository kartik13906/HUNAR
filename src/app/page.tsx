"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Award,
  Timer,
  CheckCircle,
  Sparkles,
  BarChart,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export default function HomePage() {
  const steps = [
    {
      step: "01",
      title: "Read",
      subtitle: "Timed Academic Exposure",
      description:
        "Absorb an undergraduate-level technical paper under a real countdown timer. Practice focused, active reading without skimming or distractions.",
      icon: <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      step: "02",
      title: "Recall",
      subtitle: "The Article Disappears",
      description:
        "Once time expires, the text vanishes. You explain the core thesis, supporting arguments, and technical nuances entirely from active memory.",
      icon: <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      step: "03",
      title: "Get Evaluated",
      subtitle: "Instant AI Rubric Score",
      description:
        "Receive a 1–10 comprehension score, highlighting exactly what key concepts you mastered and what subtle nuances you missed.",
      icon: <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    },
  ];

  const features = [
    {
      icon: <Timer className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Timed Reading",
      description:
        "Strict temporal exposure trains working memory and simulates university examination conditions.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      title: "AI-Powered Evaluation",
      description:
        "Semantic concept extraction parses your free-text recall for conceptual fidelity, not rote regurgitation.",
    },
    {
      icon: <BarChart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      title: "1–10 Comprehension Score",
      description:
        "Multidimensional scoring breakdown covering Main Idea, Key Concepts, Accuracy, and Completeness.",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Personalized Feedback",
      description:
        "Targeted breakdown detailing exactly what you understood alongside blind spots you missed.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-zinc-200/80 dark:border-zinc-800 bg-gradient-to-b from-white via-zinc-50/40 to-white dark:from-zinc-950 dark:via-zinc-900/40 dark:to-zinc-950 transition-colors">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Subtle Top Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/70 dark:border-indigo-800/80 dark:bg-indigo-950/70 px-3.5 py-1 text-xs font-semibold text-indigo-900 dark:text-indigo-200 shadow-2xs">
            <GraduationCap className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Designed for Academic & Technical Literacy</span>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
              Read. Understand. <br className="hidden sm:inline" />
              <span className="text-indigo-700 dark:text-indigo-400 underline decoration-indigo-200 dark:decoration-indigo-900 decoration-4 underline-offset-8">
                Prove It.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
              Build stronger comprehension by reading focused technical
              content, explaining it in your own words, and receiving instant
              feedback.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/practice" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="primary"
                className="w-full sm:w-auto px-8 text-base shadow-md font-semibold"
              >
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/about" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-7 text-base font-medium"
              >
                <span>How It Works</span>
              </Button>
            </Link>
          </div>

          {/* Active Recall Journey Banner / Interactive Preview */}
          <div className="pt-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-4 sm:p-6 shadow-sm text-left transition-colors">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                    Active Recall Cycle
                  </span>
                </div>
                <Badge variant="accent" className="text-[11px]">
                  Standard 150s Protocol
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3 border border-zinc-100 dark:border-zinc-800 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                    1. Read Article
                  </span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug">
                    Deep focused reading while the 02:30 clock counts down.
                  </p>
                </div>
                <div className="rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 p-3 border border-indigo-100 dark:border-indigo-900/60 space-y-1">
                  <span className="font-semibold text-indigo-950 dark:text-indigo-100 block">
                    2. Write From Memory
                  </span>
                  <p className="text-indigo-900/70 dark:text-indigo-300 text-[11px] leading-snug">
                    Article vanishes. Write what you understood in your words.
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3 border border-zinc-100 dark:border-zinc-800 space-y-1">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 block">
                    3. AI Evaluation
                  </span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug">
                    Instant 8.4/10 scoring with identified strengths & blind spots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-20 md:py-24 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
              The Cognitive Science Protocol
            </h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Three steps to genuine comprehension
            </p>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Passive re-reading creates the illusion of competence. Forced
              active recall creates durable neural representations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <Card
                key={item.step}
                className="relative overflow-hidden border-zinc-200/90 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800/80 transition-all hover:shadow-sm"
              >
                <div className="absolute top-4 right-4 text-3xl font-black font-mono text-zinc-100 dark:text-zinc-800/60 select-none">
                  {item.step}
                </div>
                <CardContent className="p-6 sm:p-7 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {item.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features / Statistics Section */}
      <section className="py-20 md:py-24 bg-zinc-50/60 dark:bg-zinc-900/40 border-b border-zinc-200/80 dark:border-zinc-800 transition-colors">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 dark:text-indigo-400">
              Core Capabilities
            </h2>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Engineered for academic precision
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Built to evaluate conceptual comprehension rather than superficial
              keyword matching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="rounded-xl border border-zinc-200/90 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-5 space-y-3 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/60">
                  {feat.icon}
                </div>
                <h4 className="font-semibold text-base text-zinc-950 dark:text-zinc-50">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-zinc-100 dark:divide-zinc-800 transition-colors">
            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                150s
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Standard Reading Window</p>
            </div>
            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                1–10
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Calibrated Rubric Scale</p>
            </div>
            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-zinc-50">
                4 Criteria
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Multi-dimensional Scoring</p>
            </div>
            <div className="space-y-1 pt-2 sm:pt-0">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                100%
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Free Recall Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-zinc-950 transition-colors">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-900 p-8 sm:p-12 text-center text-white space-y-6 shadow-md">
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to test your comprehension?
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 dark:text-zinc-300 leading-relaxed">
                Take on an article on edge computing, neural attention, or
                cognitive science right now.
              </p>
            </div>
            <div>
              <Link href="/practice">
                <Button
                  size="lg"
                  className="bg-white text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 font-semibold px-8"
                >
                  <span>Start Practice Session</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

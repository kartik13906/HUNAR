import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Brain,
  Clock,
  CheckCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <PageHeader
          badge="Pedagogy & Architecture"
          title="About ComprehendAI"
          description="Evidence-based active recall testing designed to calibrate and elevate technical reading comprehension for undergraduate scholars."
          actions={
            <Link href="/practice">
              <Button variant="primary" size="md">
                <span>Start Practice</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          }
        />

        {/* Section 1: What is ComprehendAI? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <BookOpen className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              What is ComprehendAI?
            </h2>
          </div>
          <Card className="border-zinc-200/90">
            <CardContent className="p-6 sm:p-8 space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
              <p>
                <strong>ComprehendAI</strong> is an academic assessment tool engineered
                to measure how deeply students absorb complex technical and scientific
                writing. Unlike conventional multiple-choice tests that rely on recognition
                memory, ComprehendAI enforces <em>free recall</em>—requiring students to
                articulate the core ideas in their own natural words without access to
                the original text.
              </p>
              <p>
                The platform addresses a pervasive dilemma in higher education: students often
                read assigned scientific literature passively, believing they understand
                the material when they merely recognize familiar vocabulary. By combining
                timed reading windows with immediate blind synthesis, ComprehendAI exposes
                conceptual gaps and accelerates genuine cognitive retention.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: How It Works */}
        <section id="how-it-works" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <Clock className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Phase 1: Timed Reading
              </span>
              <h3 className="font-semibold text-base text-zinc-950">
                Focused Exposure
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                You read a curated peer-reviewed or technical excerpt under a strict
                countdown (typically 150 seconds). External aids and text copy are
                discouraged.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Phase 2: Text Removal
              </span>
              <h3 className="font-semibold text-base text-zinc-950">
                Blind Synthesis
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                The moment the timer elapses, the source text disappears completely.
                You are challenged to explain what you understood in your own words.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-5 space-y-2">
              <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Phase 3: Rubric Analysis
              </span>
              <h3 className="font-semibold text-base text-zinc-950">
                Diagnostic Feedback
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                The AI evaluation engine matches your recall against the key causal
                nodes of the text, issuing an objective score and highlighting blind spots.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Why Comprehension Matters */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <Brain className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Why Comprehension Matters
            </h2>
          </div>
          <Card className="border-zinc-200/90">
            <CardContent className="p-6 sm:p-8 space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed">
              <p>
                In the era of automated summarizers and large language models, the human
                capacity for deep reading and independent conceptual synthesis is more vital
                than ever. Research in cognitive psychology (notably the <em>Testing Effect</em>,
                Roediger &amp; Karpicke, 2006) demonstrates that:
              </p>
              <ul className="space-y-2.5 pl-2">
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                  <CheckCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Effortful retrieval strengthens memory traces:</strong> The act
                    of generating an explanation consolidates synaptic connectivity far more
                    effectively than repetitive highlighting or passive rereading.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                  <CheckCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Calibrates metacognition:</strong> Students frequently suffer
                    from the &ldquo;illusion of explanatory depth&rdquo;—assuming they understand
                    how edge computing or attention mechanisms operate until forced to explain
                    them without reference material.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800">
                  <CheckCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fosters higher-order critical thinking:</strong> Transitioning
                    from passive ingestion to active production enables undergraduate students
                    to tackle advanced research literature and senior thesis work.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Section 4: How AI Evaluation Works */}
        <section id="scoring" className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              How AI Evaluation Works
            </h2>
          </div>
          <Card className="border-zinc-200/90">
            <CardContent className="p-6 sm:p-8 space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed">
              <p>
                Rather than calculating exact word overlap or penalizing students for using
                synonyms, the evaluation framework assesses semantic coverage across four
                standardized dimensions:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-100 space-y-1">
                  <span className="font-semibold text-zinc-950 text-sm block">
                    1. Main Idea (25%)
                  </span>
                  <p className="text-xs text-zinc-600">
                    Did the student successfully capture the central thesis and overriding
                    objective of the author?
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-100 space-y-1">
                  <span className="font-semibold text-zinc-950 text-sm block">
                    2. Key Concepts (35%)
                  </span>
                  <p className="text-xs text-zinc-600">
                    How many of the essential secondary mechanisms, architectures, or
                    corollaries were identified?
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-100 space-y-1">
                  <span className="font-semibold text-zinc-950 text-sm block">
                    3. Conceptual Accuracy (25%)
                  </span>
                  <p className="text-xs text-zinc-600">
                    Are the causal assertions and technical explanations factually sound and
                    free from hallucinated claims?
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-4 border border-zinc-100 space-y-1">
                  <span className="font-semibold text-zinc-950 text-sm block">
                    4. Completeness &amp; Nuance (15%)
                  </span>
                  <p className="text-xs text-zinc-600">
                    Did the response recognize trade-offs, edge cases, and boundary conditions
                    acknowledged in the paper?
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500 pt-2 italic">
                Note: In this frontend preview, evaluation is performed against pre-calibrated
                semantic vectors and deterministic rubrics simulating the forthcoming LLM/Jev
                pipeline.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Bottom CTA */}
        <div className="pt-4 text-center">
          <Link href="/practice">
            <Button size="lg" variant="primary" className="px-8 font-semibold">
              <span>Experience Active Recall Now</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/70 text-zinc-600 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-700 text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-900">
                Comprehend<span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
              An evidence-based learning platform testing true understanding of
              academic literature through timed exposure and immediate active recall.
            </p>
            <p className="text-xs text-zinc-600">
              Designed for undergraduate students in STEM and social sciences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-indigo-600 transition-colors">
                  Practice Session
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-indigo-600 transition-colors">
                  Evaluation History
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-indigo-600 transition-colors">
                  Latest Results
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Pedagogy
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-indigo-600 transition-colors">
                  About ComprehendAI
                </Link>
              </li>
              <li>
                <Link href="/about#active-recall" className="hover:text-indigo-600 transition-colors">
                  The Testing Effect
                </Link>
              </li>
              <li>
                <Link href="/about#scoring" className="hover:text-indigo-600 transition-colors">
                  Evaluation Rubric
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-indigo-600 transition-colors">
                  Student Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
          <p>© {new Date().getFullYear()} ComprehendAI. Academic Research & Demonstration Project.</p>
          <div className="flex items-center gap-6">
            <span>Timed Reading</span>
            <span>•</span>
            <span>Immediate Recall</span>
            <span>•</span>
            <span>Automated Feedback</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

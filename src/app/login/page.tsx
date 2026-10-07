"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Mail,
  Lock,
  GraduationCap,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/practice";
  const urlError = searchParams.get("error");

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(urlError);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }

        router.push(redirectTo);
        router.refresh();
      } else {
        // Sign Up with ONLY email, password, and field of study
        if (!fieldOfStudy.trim()) {
          setErrorMessage("Please enter your Field of Study");
          setIsLoading(false);
          return;
        }

        const username = email.split("@")[0];
        const trimmedField = fieldOfStudy.trim();

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              field_of_study: trimmedField,
              name: username,
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }

        // If user is returned and session exists (email confirmation disabled in Supabase):
        if (data.session) {
          // As a failsafe, ensure the profile row is saved in profiles table
          try {
            await supabase.from("profiles").upsert({
              id: data.user?.id,
              email: email.trim(),
              name: username,
              field_of_study: trimmedField,
              institution: "Independent Scholar",
              academic_year: "Self-Paced",
              target_daily_practice: 1,
            });
          } catch (profileErr) {
            console.warn("Profile table update note:", profileErr);
          }

          router.push(redirectTo);
          router.refresh();
        } else {
          // If email confirmation is required by Supabase:
          setSuccessMessage(
            "Account created! Please check your email to confirm your account, then log in."
          );
          setMode("signin");
          setIsLoading(false);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#FCFCFD] dark:bg-zinc-950 transition-colors">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-lg p-1 transition-opacity hover:opacity-85 focus-visible:outline-none"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white shadow-md">
              <BookOpen className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Comprehend<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                Active Recall
              </span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {mode === "signin"
              ? "Sign in to access your practice history and saved evaluations"
              : "Register to track your comprehension trajectory across articles"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "signin"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === "signup"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card Form */}
        <Card className="border-zinc-200/90 dark:border-zinc-800 shadow-md">
          <CardContent className="p-6">
            {errorMessage && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field of Study: Only shown on registration */}
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <label
                    htmlFor="fieldOfStudy"
                    className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                  >
                    Field of Study <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      type="text"
                      required
                      placeholder="e.g. Computer Science, Medicine, Psychology"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                      className="block w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Your focus area helps tailor comprehension insights.
                  </p>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 dark:text-zinc-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full justify-center"
                  variant="primary"
                  size="md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span>{mode === "signin" ? "Signing in..." : "Creating account..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === "signin" ? "Sign In" : "Register"}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FCFCFD] dark:bg-zinc-950">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

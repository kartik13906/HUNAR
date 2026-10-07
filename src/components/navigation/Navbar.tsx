"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, ArrowRight, LogOut, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { useApp } from "@/context/AppContext";

const PUBLIC_NAV_ITEMS = [
  { label: "Home",  href: "/" },
  { label: "About", href: "/about" },
];

const AUTH_NAV_ITEMS = [
  { label: "Home",     href: "/" },
  { label: "Practice", href: "/practice" },
  { label: "History",  href: "/history" },
  { label: "About",    href: "/about" },
  { label: "Profile",  href: "/profile" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, studentProfile, signOut, isLoadingAuth } = useApp();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Non-registered / unauthenticated users only see Home and About
  const navItems = user ? AUTH_NAV_ITEMS : PUBLIC_NAV_ITEMS;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/95 transition-colors">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-0">
        {/* ─── Brand logo ─────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg p-1 -ml-1 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm">
            <BookOpen className="h-4 w-4 stroke-[2.2]" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Comprehend<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </span>
            <span className="hidden sm:block text-[9.5px] font-medium uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 mt-0.5">
              Active Recall
            </span>
          </div>
        </Link>

        {/* ─── Desktop nav ────────────────────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-0.5"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                isActive(item.href)
                  ? "text-indigo-700 bg-indigo-50 dark:text-indigo-300 dark:bg-indigo-950/60"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* ─── Desktop CTA & Theme Toggle ────────────────────── */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />

          {!isLoadingAuth && (
            <>
              {user ? (
                <>
                  <div className="flex items-center gap-2 pl-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 px-2.5 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                        {(studentProfile.name || user.email || "U")[0].toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{studentProfile.fieldOfStudy}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => signOut()}
                      title="Sign Out"
                      className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:text-zinc-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href="/practice"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2",
                      "text-xs font-semibold text-white tracking-wide",
                      "shadow-sm shadow-indigo-200/60 dark:shadow-none",
                      "hover:bg-indigo-700 active:bg-indigo-800 active:scale-[0.97]",
                      "dark:bg-indigo-600 dark:hover:bg-indigo-500",
                      "transition-all duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    )}
                  >
                    Start Practice
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5",
                      "text-xs font-semibold text-zinc-700 dark:text-zinc-200 tracking-wide",
                      "hover:bg-zinc-50 dark:hover:bg-zinc-700",
                      "transition-all duration-150"
                    )}
                  >
                    <UserIcon className="h-3.5 w-3.5" />
                    Sign In
                  </Link>

                  <Link
                    href="/login"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2",
                      "text-xs font-semibold text-white tracking-wide",
                      "shadow-sm shadow-indigo-200/60 dark:shadow-none",
                      "hover:bg-indigo-700 active:bg-indigo-800 active:scale-[0.97]",
                      "dark:bg-indigo-600 dark:hover:bg-indigo-500",
                      "transition-all duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    )}
                  >
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* ─── Mobile Menu Toggle & ThemeToggle ───────────────── */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mobileMenuOpen
              ? <X className="h-5 w-5" aria-hidden />
              : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* ─── Mobile menu ────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-zinc-100 bg-white px-4 pt-3 pb-5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 animate-fade-in-fast"
        >
          <nav className="flex flex-col gap-0.5" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5",
                  "text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"
                    aria-hidden
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 px-4 py-2.5 text-sm font-medium text-rose-700 dark:text-rose-400 hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out ({user.email})
                </button>

                <Link
                  href="/practice"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-[0.98] transition-all"
                >
                  Start Practice Session
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 active:scale-[0.98] transition-all"
              >
                <UserIcon className="h-4 w-4" />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

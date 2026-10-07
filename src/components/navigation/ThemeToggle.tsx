"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme, Theme } from "@/context/ThemeContext";
import { Sun, Moon, Laptop, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "light", label: "Light", icon: <Sun className="h-4 w-4 text-amber-500" /> },
    { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4 text-indigo-400" /> },
    { value: "system", label: "System", icon: <Laptop className="h-4 w-4 text-zinc-400" /> },
  ];

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current theme: ${theme}. Change theme`}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded-lg p-2 text-sm font-medium transition-colors",
          "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
          "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        )}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4 text-indigo-400" />
        ) : (
          <Sun className="h-4 w-4 text-amber-500" />
        )}
        <ChevronDown className="h-3 w-3 text-zinc-400" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-1.5 w-36 rounded-xl border p-1 shadow-lg z-50 animate-fade-in-fast",
            "border-zinc-200 bg-white text-zinc-900",
            "dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {options.map((opt) => {
            const isSelected = theme === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                role="menuitem"
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors",
                  isSelected
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 font-semibold"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                {opt.icon}
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

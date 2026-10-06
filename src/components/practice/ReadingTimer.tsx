"use client";

import React, { useEffect } from "react";
import { Timer, AlertCircle, FastForward } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ReadingTimerProps {
  initialSeconds: number;
  remainingSeconds: number;
  onTick: (seconds: number) => void;
  onTimerEnd: () => void;
  isRunning?: boolean;
  onFinishEarly?: () => void;
}

export function ReadingTimer({
  initialSeconds,
  remainingSeconds,
  onTick,
  onTimerEnd,
  isRunning = true,
  onFinishEarly,
}: ReadingTimerProps) {
  useEffect(() => {
    if (!isRunning) return;
    if (remainingSeconds <= 0) {
      onTimerEnd();
      return;
    }
    const interval = setInterval(() => {
      onTick(Math.max(0, remainingSeconds - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, remainingSeconds, onTick, onTimerEnd]);

  const isLowTime = remainingSeconds <= 30 && remainingSeconds > 0;
  const isCritical = remainingSeconds <= 10 && remainingSeconds > 0;
  const percentRemaining = Math.max(
    0,
    Math.min(100, (remainingSeconds / initialSeconds) * 100)
  );

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border px-5 py-3.5",
        "transition-all duration-300",
        isCritical
          ? "border-rose-200 bg-rose-50/80"
          : isLowTime
          ? "border-amber-200 bg-amber-50/60"
          : "border-zinc-200 bg-white"
      )}
      role="timer"
      aria-live="polite"
      aria-label={`Reading time remaining: ${formatTime(remainingSeconds)}`}
    >
      {/* Left: icon + time display */}
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl shrink-0 transition-colors",
            isCritical
              ? "bg-rose-100 text-rose-700 animate-timer-alert"
              : isLowTime
              ? "bg-amber-100 text-amber-700"
              : "bg-zinc-100 text-zinc-600"
          )}
          aria-hidden
        >
          <Timer className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-zinc-400 leading-none mb-1">
            Reading Time
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "font-mono text-2xl font-bold tabular-nums tracking-tight leading-none",
                isCritical
                  ? "text-rose-700"
                  : isLowTime
                  ? "text-amber-700"
                  : "text-zinc-900"
              )}
            >
              {formatTime(remainingSeconds)}
            </span>
            {/* Thin linear progress indicator beneath time */}
            <div className="flex-1 min-w-[60px] max-w-[120px]">
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-zinc-200"
                role="progressbar"
                aria-valuenow={Math.round(percentRemaining)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    isCritical ? "bg-rose-500" : isLowTime ? "bg-amber-500" : "bg-indigo-500"
                  )}
                  style={{ width: `${percentRemaining}%` }}
                />
              </div>
            </div>
          </div>
          {isLowTime && (
            <p
              className={cn(
                "mt-1 text-[10px] font-medium flex items-center gap-1",
                isCritical ? "text-rose-600" : "text-amber-600"
              )}
            >
              <AlertCircle className="h-3 w-3 shrink-0" aria-hidden />
              {isCritical ? "Article disappearing soon…" : "Less than 30 seconds remaining"}
            </p>
          )}
        </div>
      </div>

      {/* Right: Finish Early button */}
      {onFinishEarly && (
        <button
          type="button"
          onClick={onFinishEarly}
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2",
            "text-xs font-semibold transition-all duration-150 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
            isLowTime
              ? "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              : "border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
          )}
          title="Skip to comprehension phase now"
        >
          <FastForward className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
          <span className="hidden sm:inline">Done reading</span>
          <span className="sm:hidden">Done</span>
        </button>
      )}
    </div>
  );
}

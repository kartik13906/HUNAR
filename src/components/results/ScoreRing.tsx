import React from "react";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number; // 0 to 10
  size?: number; // diameter in px
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
}

export function ScoreRing({
  score,
  size = 120,
  strokeWidth = 9,
  className,
  showText = true,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Score is out of 10
  const progressRatio = Math.max(0, Math.min(10, score)) / 10;
  const strokeDashoffset = circumference - progressRatio * circumference;

  // Color selection based on score
  const getStrokeColor = (s: number) => {
    if (s >= 8.5) return "stroke-emerald-600 dark:stroke-emerald-500";
    if (s >= 7.5) return "stroke-indigo-600 dark:stroke-indigo-500";
    if (s >= 6.0) return "stroke-amber-600 dark:stroke-amber-400";
    return "stroke-rose-600 dark:stroke-rose-500";
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
        aria-hidden="true"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-zinc-100 dark:text-zinc-800"
          fill="none"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out fill-none", getStrokeColor(score))}
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 leading-none">
            {score.toFixed(1)}
          </span>
          <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">
            / 10
          </span>
        </div>
      )}
    </div>
  );
}

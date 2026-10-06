import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WordCounterProps {
  words: number;
  characters: number;
  minRecommendedWords?: number;
  className?: string;
}

export function WordCounter({
  words,
  characters,
  minRecommendedWords = 35,
  className,
}: WordCounterProps) {
  const meetsMinimum = words >= minRecommendedWords;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-xs",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono font-medium text-zinc-700">
          <strong className="text-zinc-950 text-sm">{words}</strong>{" "}
          {words === 1 ? "word" : "words"}
        </span>
        <span className="text-zinc-300">•</span>
        <span className="text-zinc-500 font-mono">
          {characters} {characters === 1 ? "char" : "chars"}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {meetsMinimum ? (
          <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
            <CheckCircle2 className="h-3 w-3" />
            Recommended length met ({minRecommendedWords}+ words)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded text-[11px]">
            <AlertCircle className="h-3 w-3 text-zinc-400" />
            Recommended min: {minRecommendedWords} words
          </span>
        )}
      </div>
    </div>
  );
}

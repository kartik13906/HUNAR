import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      "inline-flex items-center justify-center font-semibold rounded-xl",
      "transition-all duration-150 ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "select-none cursor-pointer",
      "active:scale-[0.97]",
    ].join(" ");

    const variants: Record<string, string> = {
      primary:
        "bg-indigo-600 text-white shadow-sm " +
        "hover:bg-indigo-700 active:bg-indigo-800 " +
        "shadow-indigo-200/50 " +
        "dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:active:bg-indigo-700 dark:shadow-none",
      secondary:
        "bg-zinc-100 text-zinc-800 " +
        "hover:bg-zinc-200 active:bg-zinc-300 " +
        "dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 dark:active:bg-zinc-600",
      outline:
        "border border-zinc-200 bg-white text-zinc-700 " +
        "hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900 " +
        "active:bg-zinc-100 shadow-xs " +
        "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 " +
        "dark:hover:bg-zinc-800 dark:hover:border-zinc-600 dark:hover:text-zinc-100 dark:active:bg-zinc-700",
      ghost:
        "text-zinc-600 " +
        "hover:text-zinc-900 hover:bg-zinc-100 " +
        "active:bg-zinc-200 " +
        "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 dark:active:bg-zinc-700",
      destructive:
        "bg-rose-600 text-white shadow-sm " +
        "hover:bg-rose-700 active:bg-rose-800 " +
        "dark:bg-rose-600 dark:hover:bg-rose-500 dark:active:bg-rose-700",
      subtle:
        "bg-indigo-50 text-indigo-700 " +
        "hover:bg-indigo-100 active:bg-indigo-200 " +
        "dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/80 dark:active:bg-indigo-900",
    };

    const sizes: Record<string, string> = {
      sm:   "h-8 px-3 text-xs gap-1.5",
      md:   "h-10 px-4 text-sm gap-2",
      lg:   "h-11 px-6 text-sm gap-2 tracking-wide",
      icon: "h-9 w-9 p-0 shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

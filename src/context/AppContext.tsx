"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Article, EvaluationResult, StudentProfile } from "@/types";
import { DEFAULT_ARTICLE, MOCK_ARTICLES } from "@/data/articles";
import { INITIAL_EVALUATIONS_HISTORY } from "@/data/evaluations";
import { MOCK_STUDENT_PROFILE } from "@/data/profile";

export type PracticePhase = "reading" | "answering" | "submitting" | "completed";

interface AppContextType {
  currentArticle: Article;
  setCurrentArticle: (article: Article) => void;
  practicePhase: PracticePhase;
  setPracticePhase: (phase: PracticePhase) => void;
  remainingTime: number;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  studentAnswer: string;
  setStudentAnswer: (answer: string) => void;
  latestEvaluation: EvaluationResult | null;
  setLatestEvaluation: (evaluation: EvaluationResult | null) => void;
  evaluationsHistory: EvaluationResult[];
  addEvaluation: (result: EvaluationResult) => void;
  studentProfile: StudentProfile;
  resetPractice: (article?: Article) => void;
  selectArticleAndStart: (articleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  HISTORY: "comprehend_eval_history_v1",
  LATEST_EVAL: "comprehend_latest_eval_v1",
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentArticle, setCurrentArticle] = useState<Article>(DEFAULT_ARTICLE);
  const [practicePhase, setPracticePhase] = useState<PracticePhase>("reading");
  const [remainingTime, setRemainingTime] = useState<number>(DEFAULT_ARTICLE.readingTimeSeconds);
  const [studentAnswer, setStudentAnswer] = useState<string>("");

  // Initialize from localStorage cleanly via lazy initializer
  const [latestEvaluation, setLatestEvaluation] = useState<EvaluationResult | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.LATEST_EVAL);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn("Could not parse latest evaluation from localStorage:", e);
      }
    }
    return INITIAL_EVALUATIONS_HISTORY[0] || null;
  });

  const [evaluationsHistory, setEvaluationsHistory] = useState<EvaluationResult[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.warn("Could not parse history from localStorage:", e);
      }
    }
    return INITIAL_EVALUATIONS_HISTORY;
  });

  const [studentProfile] = useState<StudentProfile>(MOCK_STUDENT_PROFILE);

  // Sync evaluationsHistory to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(evaluationsHistory));
    } catch (e) {
      console.warn("Could not save history to localStorage:", e);
    }
  }, [evaluationsHistory]);

  // Sync latestEvaluation to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !latestEvaluation) return;
    try {
      localStorage.setItem(STORAGE_KEYS.LATEST_EVAL, JSON.stringify(latestEvaluation));
    } catch (e) {
      console.warn("Could not save latest evaluation to localStorage:", e);
    }
  }, [latestEvaluation]);

  const addEvaluation = (result: EvaluationResult) => {
    setLatestEvaluation(result);
    setEvaluationsHistory((prev) => [result, ...prev]);
  };

  const resetPractice = (newArticle?: Article) => {
    const article = newArticle || currentArticle;
    setCurrentArticle(article);
    setPracticePhase("reading");
    setRemainingTime(article.readingTimeSeconds);
    setStudentAnswer("");
  };

  const selectArticleAndStart = (articleId: string) => {
    const found = MOCK_ARTICLES.find((a) => a.id === articleId) || DEFAULT_ARTICLE;
    resetPractice(found);
  };

  return (
    <AppContext.Provider
      value={{
        currentArticle,
        setCurrentArticle,
        practicePhase,
        setPracticePhase,
        remainingTime,
        setRemainingTime,
        studentAnswer,
        setStudentAnswer,
        latestEvaluation,
        setLatestEvaluation,
        evaluationsHistory,
        addEvaluation,
        studentProfile,
        resetPractice,
        selectArticleAndStart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

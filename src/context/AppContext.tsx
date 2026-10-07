"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
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
  addEvaluation: (result: EvaluationResult) => Promise<void>;
  studentProfile: StudentProfile;
  resetPractice: (article?: Article) => void;
  selectArticleAndStart: (articleId: string) => void;
  // Supabase Auth Integration
  user: User | null;
  isAuthenticated: boolean;
  isLoadingAuth: boolean;
  signOut: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  HISTORY: "comprehend_eval_history_v1",
  LATEST_EVAL: "comprehend_latest_eval_v1",
};

interface EvaluationRow {
  id: string;
  article_id: string;
  article_title: string;
  article_category: string;
  completed_at: string;
  user_answer: string;
  word_count: number;
  time_spent_seconds: number;
  score: number | string;
  performance_label: EvaluationResult["performanceLabel"];
  strengths: string[];
  missed: string[];
  feedback: string;
  breakdown: EvaluationResult["breakdown"];
}

interface ProfileRow {
  id: string;
  email?: string;
  name?: string;
  field_of_study?: string;
  institution?: string;
  academic_year?: string;
  avatar_url?: string;
  joined_date?: string;
  target_daily_practice?: number;
}

const mapRowToEvaluation = (row: EvaluationRow): EvaluationResult => ({
  id: row.id,
  articleId: row.article_id,
  articleTitle: row.article_title,
  articleCategory: row.article_category,
  completedAt: row.completed_at,
  userAnswer: row.user_answer,
  wordCount: row.word_count,
  timeSpentSeconds: row.time_spent_seconds,
  score: Number(row.score),
  performanceLabel: row.performance_label,
  strengths: row.strengths || [],
  missed: row.missed || [],
  feedback: row.feedback || "",
  breakdown: row.breakdown || {
    mainIdea: 0,
    keyConcepts: 0,
    accuracy: 0,
    completeness: 0,
  },
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [currentArticle, setCurrentArticle] = useState<Article>(DEFAULT_ARTICLE);
  const [practicePhase, setPracticePhase] = useState<PracticePhase>("reading");
  const [remainingTime, setRemainingTime] = useState<number>(DEFAULT_ARTICLE.readingTimeSeconds);
  const [studentAnswer, setStudentAnswer] = useState<string>("");

  const [latestEvaluation, setLatestEvaluation] = useState<EvaluationResult | null>(null);
  const [evaluationsHistory, setEvaluationsHistory] = useState<EvaluationResult[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(MOCK_STUDENT_PROFILE);

  // Load user data from Supabase
  const loadUserData = useCallback(async (currentUser: User) => {
    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .maybeSingle();

      const pRow = profileData as ProfileRow | null;

      if (!profileError && pRow) {
        setStudentProfile({
          name: pRow.name || currentUser.email?.split("@")[0] || "Scholar",
          email: pRow.email || currentUser.email || "",
          fieldOfStudy: pRow.field_of_study || currentUser.user_metadata?.field_of_study || "General Studies",
          institution: pRow.institution || "Independent Scholar",
          academicYear: pRow.academic_year || "Self-Paced",
          avatarUrl: pRow.avatar_url || "",
          joinedDate: pRow.joined_date
            ? new Date(pRow.joined_date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Recently",
          targetDailyPractice: pRow.target_daily_practice ?? 1,
        });
      } else {
        // Fallback to auth metadata if profile not created yet
        const fieldOfStudy = currentUser.user_metadata?.field_of_study || "General Studies";
        setStudentProfile({
          name: currentUser.user_metadata?.name || currentUser.email?.split("@")[0] || "Scholar",
          email: currentUser.email || "",
          fieldOfStudy,
          institution: "Independent Scholar",
          academicYear: "Self-Paced",
          avatarUrl: "",
          joinedDate: new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          targetDailyPractice: 1,
        });
      }

      // 2. Fetch Evaluations from Supabase
      const { data: evalData, error: evalError } = await supabase
        .from("evaluations")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("completed_at", { ascending: false });

      if (!evalError && evalData) {
        const mapped = (evalData as EvaluationRow[]).map(mapRowToEvaluation);
        setEvaluationsHistory(mapped);
        if (mapped.length > 0) {
          setLatestEvaluation(mapped[0]);
        }
      }
    } catch (err) {
      console.warn("Could not fetch user data from Supabase:", err);
    }
  }, [supabase]);

  // Auth state listener
  useEffect(() => {
    let mounted = true;

    async function getInitialUser() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            await loadUserData(session.user);
          } else {
            setUser(null);
            // Default demo data for guests browsing publicly
            setStudentProfile(MOCK_STUDENT_PROFILE);
            setEvaluationsHistory(INITIAL_EVALUATIONS_HISTORY);
            setLatestEvaluation(INITIAL_EVALUATIONS_HISTORY[0] || null);
          }
          setIsLoadingAuth(false);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (mounted) setIsLoadingAuth(false);
      }
    }

    getInitialUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(session.user);
        await loadUserData(session.user);
      } else {
        setUser(null);
        setStudentProfile(MOCK_STUDENT_PROFILE);
        setEvaluationsHistory([]);
        setLatestEvaluation(null);
      }
      setIsLoadingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, loadUserData]);

  // Sync to localStorage as client cache
  useEffect(() => {
    if (typeof window === "undefined" || !user) return;
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(evaluationsHistory));
    } catch (e) {
      console.warn("Could not save history to localStorage:", e);
    }
  }, [evaluationsHistory, user]);

  useEffect(() => {
    if (typeof window === "undefined" || !latestEvaluation || !user) return;
    try {
      localStorage.setItem(STORAGE_KEYS.LATEST_EVAL, JSON.stringify(latestEvaluation));
    } catch (e) {
      console.warn("Could not save latest evaluation to localStorage:", e);
    }
  }, [latestEvaluation, user]);

  const addEvaluation = async (result: EvaluationResult) => {
    setLatestEvaluation(result);
    setEvaluationsHistory((prev) => [result, ...prev]);

    if (user) {
      try {
        await supabase.from("evaluations").insert({
          id: result.id,
          user_id: user.id,
          article_id: result.articleId,
          article_title: result.articleTitle,
          article_category: result.articleCategory,
          completed_at: result.completedAt,
          user_answer: result.userAnswer,
          word_count: result.wordCount,
          time_spent_seconds: result.timeSpentSeconds,
          score: result.score,
          performance_label: result.performanceLabel,
          strengths: result.strengths,
          missed: result.missed,
          feedback: result.feedback,
          breakdown: result.breakdown,
        });
      } catch (err) {
        console.error("Failed to save evaluation to Supabase:", err);
      }
    }
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

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setEvaluationsHistory([]);
    setLatestEvaluation(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      localStorage.removeItem(STORAGE_KEYS.LATEST_EVAL);
      window.location.href = "/login";
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await loadUserData(user);
    }
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
        user,
        isAuthenticated: !!user,
        isLoadingAuth,
        signOut,
        refreshUserData,
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

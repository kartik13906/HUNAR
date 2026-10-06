export interface Article {
  id: string;
  title: string;
  category: string;
  readingTimeSeconds: number; // e.g. 150 seconds (02:30)
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  author: string;
  source: string;
  content: string[]; // array of paragraphs for optimal reading layout
  keyConcepts: string[];
}

export interface ScoreBreakdown {
  mainIdea: number;      // 0 - 10
  keyConcepts: number;   // 0 - 10
  accuracy: number;      // 0 - 10
  completeness: number;  // 0 - 10
}

export type PerformanceLabel =
  | "Mastery"
  | "Strong Understanding"
  | "Good Understanding"
  | "Moderate Understanding"
  | "Needs Review";

export interface EvaluationResult {
  id: string;
  articleId: string;
  articleTitle: string;
  articleCategory: string;
  completedAt: string;
  userAnswer: string;
  wordCount: number;
  timeSpentSeconds: number;
  score: number; // 0 - 10, e.g. 8.4
  performanceLabel: PerformanceLabel;
  strengths: string[];
  missed: string[];
  feedback: string;
  breakdown: ScoreBreakdown;
}

export interface StudentProfile {
  name: string;
  email: string;
  institution: string;
  fieldOfStudy: string;
  academicYear: string;
  avatarUrl?: string;
  joinedDate: string;
  targetDailyPractice: number;
}

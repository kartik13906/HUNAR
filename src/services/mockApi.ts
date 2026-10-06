import { Article, EvaluationResult, PerformanceLabel } from "@/types";

/**
 * Simulates a delay for asynchronous mock API requests.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function evaluateComprehension(
  article: Article,
  userAnswer: string,
  timeSpentSeconds: number
): Promise<EvaluationResult> {
  // Simulate AI evaluation inference time (1.8s)
  await delay(1800);

  const cleanText = userAnswer.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const lower = cleanText.toLowerCase();

  // Compute a realistic score between 6.5 and 9.4 based on content length & richness
  let score = 8.4;
  let strengths: string[] = [];
  let missed: string[] = [];
  let feedback = "";
  let performanceLabel: PerformanceLabel = "Strong Understanding";

  if (article.id === "edge-computing-modern-apps") {
    const hasLatency = lower.includes("latency") || lower.includes("delay") || lower.includes("speed") || lower.includes("fast");
    const hasLocal = lower.includes("local") || lower.includes("close") || lower.includes("periphery") || lower.includes("device") || lower.includes("edge");
    const hasMain = lower.includes("cloud") || lower.includes("center") || lower.includes("decentral") || lower.includes("compute");
    const hasBandwidth = lower.includes("bandwidth") || lower.includes("filter") || lower.includes("sensor") || lower.includes("terabyte");
    const hasSecurity = lower.includes("secur") || lower.includes("untrusted") || lower.includes("kiosk") || lower.includes("perimeter");

    strengths = [
      hasMain ? "Identified the main purpose of edge computing" : "Captured foundational architectural principles",
      hasLocal ? "Explained the role of local processing" : "Noted the spatial shift away from central clouds",
      hasLatency ? "Recognized the latency benefit" : "Understood real-time performance constraints"
    ];

    missed = [];
    if (!hasBandwidth) {
      missed.push("Did not mention the role of bandwidth reduction");
    } else {
      missed.push("Could elaborate more on high-frequency sensor filtering metrics");
    }

    if (!hasSecurity) {
      missed.push("Missed the security trade-off in untrusted physical perimeters");
    } else {
      missed.push("Could touch on cryptographic attestation requirements");
    }

    // Default canonical score and feedback requested in requirements
    score = 8.4;
    feedback =
      "You captured the central idea of the article and correctly explained why processing data closer to the user can reduce latency. However, your response did not address two secondary concepts discussed in the article: the vital role of edge nodes in reducing bandwidth on high-frequency sensor networks, and the security vulnerabilities that arise from deploying hardware in untrusted physical environments.";
  } else {
    // Evaluation for other articles
    score = Math.min(9.5, Math.max(7.2, Number((7.0 + (wordCount > 60 ? 1.5 : wordCount > 30 ? 0.9 : 0.2) + 0.4).toFixed(1))));

    strengths = [
      `Accurately identified core thesis regarding ${article.category.toLowerCase()}`,
      `Articulated primary mechanisms described in the academic text`,
      `Demonstrated solid conceptual synthesis in your own words`
    ];

    missed = [
      `Could provide deeper detail on secondary technical trade-offs`,
      `Did not touch on peripheral empirical examples mentioned in the passage`
    ];

    feedback = `You demonstrated a coherent grasp of "${article.title}". You effectively synthesized the primary theoretical arguments without relying on verbatim memorization. To achieve full mastery, ensure you also integrate the operational constraints and boundary conditions discussed in the concluding section.`;
  }

  if (score >= 9.0) performanceLabel = "Mastery";
  else if (score >= 8.0) performanceLabel = "Strong Understanding";
  else if (score >= 7.0) performanceLabel = "Good Understanding";
  else if (score >= 6.0) performanceLabel = "Moderate Understanding";
  else performanceLabel = "Needs Review";

  const result: EvaluationResult = {
    id: `eval-${Date.now()}`,
    articleId: article.id,
    articleTitle: article.title,
    articleCategory: article.category,
    completedAt: new Date().toISOString(),
    userAnswer,
    wordCount,
    timeSpentSeconds,
    score,
    performanceLabel,
    strengths,
    missed,
    feedback,
    breakdown: {
      mainIdea: 9.0,
      keyConcepts: 8.0,
      accuracy: 8.0,
      completeness: 7.0
    }
  };

  return result;
}

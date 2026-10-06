import { EvaluationResult } from "@/types";

export const INITIAL_EVALUATIONS_HISTORY: EvaluationResult[] = [
  {
    id: "eval-edge-001",
    articleId: "edge-computing-modern-apps",
    articleTitle: "How Edge Computing Changes Modern Applications",
    articleCategory: "Technology",
    completedAt: "2026-10-06T14:22:00Z",
    userAnswer:
      "Edge computing moves computational resources and data processing closer to the physical location of the user and device, instead of relying exclusively on central cloud data centers. This significantly cuts down round-trip network latency from tens of milliseconds down to under five milliseconds, which is crucial for real-time services like autonomous vehicles and surgical robots. Rather than sending all raw sensor logs over the internet, edge nodes can preprocess and analyze data locally.",
    wordCount: 75,
    timeSpentSeconds: 142,
    score: 8.4,
    performanceLabel: "Strong Understanding",
    strengths: [
      "Identified the main purpose of edge computing and decentralization",
      "Explained the role of local processing near endpoint devices",
      "Recognized the vital latency benefit for real-time applications"
    ],
    missed: [
      "Did not mention the role of bandwidth reduction and cost savings on factory floors",
      "Missed the security trade-offs of physical exposure in untrusted environments"
    ],
    feedback:
      "You captured the central idea of the article and correctly explained why processing data closer to the user can reduce latency. However, your response did not address two secondary concepts discussed in the article: the bandwidth reduction role on high-frequency sensor networks and the heightened security vulnerability of distributed hardware in untrusted physical perimeters.",
    breakdown: {
      mainIdea: 9.0,
      keyConcepts: 8.0,
      accuracy: 8.5,
      completeness: 7.2
    }
  },
  {
    id: "eval-nn-002",
    articleId: "attention-mechanisms-deep-learning",
    articleTitle: "Attention Mechanisms and the Evolution of Sequence Models",
    articleCategory: "AI/ML",
    completedAt: "2026-10-04T10:15:00Z",
    userAnswer:
      "Before attention, recurrent neural networks had a bottleneck where long sequences had to be compressed into a single hidden vector, causing information loss. Attention solved this by letting the model look back at all previous tokens and assign soft weights. Transformers took this further with self-attention using queries, keys, and values, enabling full parallel training without loops. However, computing attention scales quadratically with length.",
    wordCount: 68,
    timeSpentSeconds: 150,
    score: 8.9,
    performanceLabel: "Strong Understanding",
    strengths: [
      "Clearly articulated the fixed-length information bottleneck in RNNs",
      "Correctly described Transformer Query-Key-Value projections and parallelization",
      "Identified the quadratic computational complexity constraint"
    ],
    missed: [
      "Could elaborate on the emerging alternatives to quadratic scaling (state space models)",
      "Did not mention multi-head attention versus single attention"
    ],
    feedback:
      "Excellent synthesis of neural attention fundamentals. You concisely bridged the historical shift from sequential recurrent bottlenecks to parallel Transformer self-attention, and accurately recalled the computational bottleneck of quadratic scaling with sequence length.",
    breakdown: {
      mainIdea: 9.5,
      keyConcepts: 9.0,
      accuracy: 9.0,
      completeness: 8.0
    }
  },
  {
    id: "eval-neuro-003",
    articleId: "neuroscience-sleep-memory-consolidation",
    articleTitle: "Synaptic Plasticity and Sleep-Dependent Memory Consolidation",
    articleCategory: "Neuroscience",
    completedAt: "2026-10-02T16:40:00Z",
    userAnswer:
      "Sleep helps consolidate memories through a two-stage process involving the hippocampus as a short-term buffer and the neocortex as long-term storage. During deep sleep, sharp wave ripples replay memories at accelerated speeds to transfer them to the cortex. Sleep also downscales synapses to save metabolic energy and prevent neural saturation.",
    wordCount: 54,
    timeSpentSeconds: 135,
    score: 8.1,
    performanceLabel: "Strong Understanding",
    strengths: [
      "Accurately mapped the dual-system architecture between hippocampus and neocortex",
      "Explained the role of high-frequency sharp-wave ripples during slow-wave sleep",
      "Mentioned the Synaptic Homeostasis Hypothesis and energy preservation"
    ],
    missed: [
      "Did not mention protection against retroactive interference from waking experiences",
      "Could describe coordination with sleep spindles and neocortical slow oscillations"
    ],
    feedback:
      "Strong grasp of the neurobiological mechanisms underlying sleep-dependent consolidation. Your explanation of sharp-wave replay and synaptic pruning is scientifically sound and reflects the primary findings of the text.",
    breakdown: {
      mainIdea: 8.5,
      keyConcepts: 8.0,
      accuracy: 8.5,
      completeness: 7.5
    }
  },
  {
    id: "eval-econ-004",
    articleId: "behavioral-economics-choice-architecture",
    articleTitle: "Choice Architecture and Heuristic Biases in Consumer Decision Making",
    articleCategory: "Economics",
    completedAt: "2026-09-28T11:05:00Z",
    userAnswer:
      "Humans are not purely rational utility maximizers due to bounded rationality. Choice architecture influences how people choose through defaults. For example, automatic opt-out drastically increases retirement plan enrollment. Also, giving too many choices causes paralysis, and companies sometimes use dark patterns.",
    wordCount: 46,
    timeSpentSeconds: 120,
    score: 7.8,
    performanceLabel: "Good Understanding",
    strengths: [
      "Differentiated classical utility maximization from bounded rationality",
      "Highlighted the dramatic efficacy of status quo opt-out defaults",
      "Noted the paradox of choice and decision fatigue"
    ],
    missed: [
      "Could have expanded further on the ethical boundary between nudges and dark patterns",
      "Brief answer could have included more nuance on cognitive metabolics"
    ],
    feedback:
      "Good, concise summary of the core principles of choice architecture. You grasped the impact of defaults and choice overload well, although expanding slightly on the theoretical distinctions would demonstrate even deeper comprehension.",
    breakdown: {
      mainIdea: 8.5,
      keyConcepts: 7.5,
      accuracy: 8.0,
      completeness: 7.0
    }
  }
];

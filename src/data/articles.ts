import { Article } from "@/types";

export const MOCK_ARTICLES: Article[] = [
  {
    id: "edge-computing-modern-apps",
    title: "How Edge Computing Changes Modern Applications",
    category: "Technology",
    readingTimeSeconds: 150, // 02:30
    difficulty: "Intermediate",
    author: "Dr. Elena Vance, Distributed Systems Review",
    source: "Journal of Cloud and Edge Architectures (2025)",
    keyConcepts: [
      "Decentralization of compute resources",
      "Latency reduction via physical proximity",
      "Bandwidth optimization by filtering data at the periphery",
      "Security trade-offs in distributed physical perimeters",
      "Edge-to-cloud hybrid orchestration"
    ],
    content: [
      "For the past fifteen years, the prevailing architectural paradigm has concentrated compute and storage within massive centralized hyperscale data centers. While this cloud-centric model offered unprecedented economies of scale and simplified deployment operations, it introduced an unavoidable physical barrier: latency governed by the speed of light across wide-area networks. For emerging real-time workloads such as autonomous vehicular telemetry, surgical robotics, and interactive augmented reality, a round-trip delay of even eighty milliseconds is unacceptable.",
      "Edge computing addresses this fundamental constraint by redistributing computation, storage, and preliminary data processing away from centralized clouds toward the topological periphery of the network—near cell towers, local gateways, or within the endpoint devices themselves. By processing sensory payloads closer to their originating sources, edge architectures routinely truncate response times from tens of milliseconds to sub-five-millisecond thresholds.",
      "Beyond latency alleviation, edge nodes act as intelligent bandwidth filters. A single connected factory floor generates terabytes of raw high-frequency sensor readings per hour; transmitting every raw byte across public transit backhauls is cost-prohibitive and ecologically inefficient. Edge nodes aggregate, sanitize, and run lightweight inference models locally, forwarding only anomalies and distilled analytical summaries back to central repositories.",
      "However, decentralization introduces severe security and operational challenges. Centralized cloud data centers benefit from fortified physical perimeters and homogeneous cryptographic bastions. In contrast, edge micro-servers reside in untrusted, physically accessible environments—traffic poles, retail kiosks, and industrial conduits. Securing these remote endpoints demands zero-trust identity frameworks, encrypted enclave memory, and automated over-the-air firmware attestation."
    ]
  },
  {
    id: "attention-mechanisms-deep-learning",
    title: "Attention Mechanisms and the Evolution of Sequence Models",
    category: "AI/ML",
    readingTimeSeconds: 150,
    difficulty: "Advanced",
    author: "Prof. Marcus Thorne",
    source: "Foundations of Neural Information Processing (2025)",
    keyConcepts: [
      "Bottleneck problem in fixed-length RNN context vectors",
      "Soft alignment and dynamic weighting",
      "Transformer self-attention calculation (Q, K, V matrices)",
      "Parallelization advantages over sequential recurrence",
      "Quadratic computational complexity with sequence length"
    ],
    content: [
      "Traditional recurrent neural networks (RNNs) and Long Short-Term Memory networks (LSTMs) operated sequentially, updating a hidden internal state vector token by token. In sequence transduction tasks like machine translation, this architecture forced the entire semantic essence of an arbitrarily long input sentence through a fixed-size information bottleneck, causing performance to degrade sharply on long-range dependencies.",
      "The introduction of attention mechanisms radically altered this dynamic. Rather than compressing an entire sequence into a single static representation, attention enables the model to inspect all intermediate token representations dynamically. At each generation step, the network computes a set of soft alignment scores, distributing attention weights over the input tokens based on their semantic relevance to the current token being decoded.",
      "The Transformer architecture codified this concept into Multi-Head Self-Attention, entirely eliminating recurrent loops. By projecting input embeddings into distinct Query, Key, and Value subspaces, the model computes pairwise dot-product interactions across all tokens simultaneously. This architectural shift enabled massive parallelization across distributed GPUs, unlocking training scales previously inconceivable with sequential architectures.",
      "Nonetheless, standard self-attention incurs an \(O(N^2)\) computational and memory footprint relative to sequence length \(N\). In modern foundational models ingesting contextual windows exceeding one hundred thousand tokens, this quadratic scaling poses a major hardware impediment, spurring intense research into sparse attention approximations, state-space representations, and linear recurrent alternatives."
    ]
  },
  {
    id: "neuroscience-sleep-memory-consolidation",
    title: "Synaptic Plasticity and Sleep-Dependent Memory Consolidation",
    category: "Neuroscience",
    readingTimeSeconds: 150,
    difficulty: "Intermediate",
    author: "Dr. Sarah Lin, Cognitive Neuroscience Institute",
    source: "Neurological Reviews Quarterly (2025)",
    keyConcepts: [
      "Two-stage memory model: Hippocampus and Neocortex",
      "Sharp-wave ripples during slow-wave sleep (SWS)",
      "Synaptic Homeostasis Hypothesis (SHY)",
      "Reactivation of spatial and episodic neural ensembles",
      "Protective role against retroactive interference"
    ],
    content: [
      "Human memory is not a static recording etched permanently upon acquisition; it undergoes a dynamic, protracted transformation termed systems consolidation. Contemporary cognitive neuroscience models this through a dual-system framework: the hippocampus acts as a fast-learning, temporary buffer for episodic impressions, while the neocortical mantle serves as a slow-learning, distributed repository for long-term schema integration.",
      "During slow-wave sleep (SWS), the brain orchestrates a synchronized dialogue between these anatomical structures. High-frequency hippocampal oscillations, known as sharp-wave ripples, replay the exact firing sequences of neuronal ensembles activated during prior wakefulness. These replay bursts occur at roughly twenty times their waking speed and are temporally coordinated with neocortical slow oscillations and thalamocortical sleep spindles.",
      "This synchronized replay progressively transfers synaptic traces from labile hippocampal circuits into durable neocortical networks. Simultaneously, the Synaptic Homeostasis Hypothesis posits that sleep promotes widespread synaptic downscaling, pruning non-essential dendritic connections to preserve metabolic budget and prevent neural saturation.",
      "Without adequate sleep architecture, newly formed memories remain trapped in fragile temporary stores, leaving them acutely vulnerable to catastrophic retroactive interference when new waking experiences compete for identical hippocampal representations."
    ]
  },
  {
    id: "behavioral-economics-choice-architecture",
    title: "Choice Architecture and Heuristic Biases in Consumer Decision Making",
    category: "Economics",
    readingTimeSeconds: 150,
    difficulty: "Beginner",
    author: "Prof. Arthur Pendelton",
    source: "Journal of Behavioral Economics & Policy (2025)",
    keyConcepts: [
      "Bounded rationality vs classical utility maximization",
      "Default effect (status quo bias) in decision architecture",
      "Choice overload and decision paralysis",
      "Salience and framing effects",
      "Ethical nudging versus predatory dark patterns"
    ],
    content: [
      "Classical microeconomic theory presupposes the existence of Homo economicus—a perfectly rational agent who maximizes subjective expected utility by methodically evaluating all available permutations against consistent internal preferences. Over four decades of empirical behavioral experiments, however, have demonstrated that human cognitive resources are bounded, relying on mental shortcuts and heuristics that yield systematic decision deviations.",
      "A central pillar of behavioral intervention is choice architecture: the deliberate design of environments in which people make choices. Because cognitive effort is metabolically costly, decision makers exhibit pronounced status quo bias. In retirement savings programs and organ donation registries, merely transitioning from an opt-in structure to an automatic opt-out default increases participation rates by over forty percentage points without restricting consumer freedom.",
      "Furthermore, the paradox of choice demonstrates that expanding available options often backfires. While consumers initially express a preference for expansive assortments, empirical studies show that excessive options trigger cognitive fatigue, heightened regret anxiety, and eventual decision paralysis, ultimately depressing conversion rates.",
      "As digital platforms increasingly govern consumer commerce, the ethical demarcation between benevolent 'nudges' that assist individuals in achieving their declared goals and predatory 'dark patterns' that exploit heuristic biases for corporate extraction has emerged as a paramount regulatory dilemma."
    ]
  }
];

export const DEFAULT_ARTICLE = MOCK_ARTICLES[0];

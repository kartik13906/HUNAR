# ComprehendAI — Active Recall & Technical Reading Assessment

ComprehendAI is a modern educational web application designed for undergraduate students in STEM and social sciences to test and train deep reading comprehension of academic literature.

## Pedagogical Workflow

```
[ READ ARTICLE ] → [ TIMER EXPIRES (150s) ] → [ ARTICLE DISAPPEARS ] → [ FREE RECALL WRITING ] → [ AI RUBRIC EVALUATION ] → [ SCORES & FEEDBACK ]
```

Based on cognitive science and the *Testing Effect* (Roediger & Karpicke, 2006), the application replaces passive re-reading with active recall under temporal constraints.

---

## Key Features

1. **Focused Academic Reader**:
   - Clean serif typography with calibrated line height and measure (`max-w-3xl`).
   - Font size adjustment toggle (Standard / Large).
   - Word count and academic citation metadata.

2. **Temporal Exposure Engine**:
   - Live 150-second countdown timer decremented every second.
   - Dynamic progress bar with low-time warning when <30 seconds remain.
   - Early completion toggle (`I'm Done Reading`) for accelerated workflows.
   - Complete physical removal of the article once time expires to eliminate scanning.

3. **Active Recall Phase**:
   - Spacious textarea with autofocus.
   - Live word and character counting with minimum threshold validation.
   - "Quick fill demo answer" button for rapid end-to-end evaluation testing.

4. **Calibrated AI Evaluation Rubric**:
   - Visual SVG circular score ring.
   - Categorized strengths (*What You Understood*) and gaps (*What You Missed*).
   - Synthesized AI feedback paragraph.
   - 4-part dimensional breakdown:
     - Main Idea (9/10)
     - Key Concepts (8/10)
     - Accuracy (8/10)
     - Completeness (7/10)

5. **Learning History Dashboard**:
   - Historical attempt tracking with card and table toggle views.
   - Multi-criteria filtering by Topic (Technology, AI/ML, Neuroscience, Economics).
   - Multi-criteria sorting by Date (Newest/Oldest) and Score (Highest/Lowest).
   - Overall progress metrics: Average Score, Articles Completed, Retention Rate.

6. **Student Profile**:
   - Student academic metadata (institution, major, year, streak).
   - Peak score, average score, and recent activity log.

---

## Route Structure

- `/`: Product landing page with hero, cognitive protocol steps, features, and metrics.
- `/practice`: Focused reading environment, real countdown timer, text removal, recall editor, and evaluation loader.
- `/results`: Comprehension score dashboard, circular ring, strengths, missed concepts, AI feedback, and score breakdown.
- `/history`: Learning history with filters, sorting, search, and progress metrics.
- `/about`: Pedagogical foundations, the testing effect, and evaluation rubric details.
- `/profile`: Student profile, progress stats, and activity feed.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict type checking)
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui design patterns & Lucide React icons
- **State & Storage**: React Context with automatic `localStorage` synchronization
- **Mock Layer**: Async `services/mockApi.ts` simulating the upcoming LLM/Jev inference backend

---

## Development & Production Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm run start -p 3000

# Lint codebase
npm run lint
```

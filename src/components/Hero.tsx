import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Copy,
  Check,
  Layers,
  Code2,
  BarChart3,
} from 'lucide-react';
import { PROFILE, type LiveCodingStats } from '../data/portfolioData';

interface HeroProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
  stats: LiveCodingStats | null;
  statsLoading: boolean;
}

const RAG_CODE_SNIPPET = `// Intervora & RAG Evaluation Pipeline
const retriever = vectorStore.asRetriever({
  searchType: "mmr",
  k: 6,
});

export async function evaluateCandidateResponse(
  question: string,
  transcript: string,
  resumeContext: string[]
) {
  const groundedDocs = await retriever.invoke(question);
  return llm.generateStructuredFeedback({
    question,
    transcript,
    context: [...resumeContext, ...groundedDocs],
    rubric: ["correctness", "complexity", "clarity"],
  });
}`;

export function Hero({
  theme,
  onToggleTheme,
  onOpenResume,
  stats,
  statsLoading,
}: HeroProps) {
  const [workbenchTab, setWorkbenchTab] = useState<'visual' | 'code' | 'metrics'>('visual');
  const [imageError, setImageError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(RAG_CODE_SNIPPET);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const totalSolved = stats?.leetcode.totalSolved ?? 892;
  const contestRating = stats?.leetcode.contestRating ?? 1733;
  const publicRepos = stats?.github.publicRepos ?? 21;

  return (
    <section id="top" className="relative pt-8 pb-16 sm:pt-12 sm:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Utility Strip: Clean unboxed metadata + Theme Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {PROFILE.statusLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>B.Tech CSE, PSIT Kanpur</span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.location}</span>
          </div>

          <div
            role="group"
            aria-label="Color theme toggle"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800"
          >
            <button
              type="button"
              onClick={() => theme === 'dark' && onToggleTheme()}
              aria-pressed={theme === 'light'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                theme === 'light'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Light
            </button>
            <button
              type="button"
              onClick={() => theme === 'light' && onToggleTheme()}
              aria-pressed={theme === 'dark'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-zinc-800 text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              Dark
            </button>
          </div>
        </div>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch pt-10 lg:pt-14">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-gradient-to-b from-zinc-100 to-zinc-200 shrink-0 flex items-center justify-center">
                  {!photoError ? (
                    <img
                      src={PROFILE.photoUrl}
                      alt="Pragya Mishra portrait"
                      referrerPolicy="no-referrer"
                      onError={() => setPhotoError(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <span className="font-display text-base font-bold text-zinc-700">PM</span>
                  )}
                </div>
                <div>
                  <p className="font-display text-sm sm:text-base font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    PRAGYA MISHRA
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Computer Science Engineering · AI &amp; Full-Stack Development
                  </p>
                </div>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] text-zinc-950 dark:text-zinc-50 mb-6">
                {PROFILE.roleHeadline}
              </h1>

              <p className="text-base sm:text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl mb-8">
                {PROFILE.shortIntro}
              </p>
            </div>

            <div>
              {/* Primary & Secondary Action Row */}
              <div className="flex flex-wrap items-center gap-3 mb-7">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090B]"
                >
                  View My Projects
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </a>
              </div>

              {/* Clean Profile Links */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/{PROFILE.githubHandle}</span>
                </a>
                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive AI & Engineering Workbench */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="flex-1 flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] overflow-hidden shadow-sm">
              {/* Workbench Mode Tabs */}
              <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
                <div className="flex items-center gap-1" role="tablist" aria-label="Workbench view">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={workbenchTab === 'visual'}
                    onClick={() => setWorkbenchTab('visual')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      workbenchTab === 'visual'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-50'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Architecture
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={workbenchTab === 'code'}
                    onClick={() => setWorkbenchTab('code')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      workbenchTab === 'code'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-50'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    RAG Pipeline
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={workbenchTab === 'metrics'}
                    onClick={() => setWorkbenchTab('metrics')}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      workbenchTab === 'metrics'
                        ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-50'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Live Stats
                  </button>
                </div>
              </div>

              {/* Workbench Viewport */}
              <div className="flex-1 flex flex-col min-h-[280px]">
                {workbenchTab === 'visual' && (
                  <div className="relative flex-1 flex flex-col">
                    {!imageError ? (
                      <div className="relative flex-1 min-h-[240px] bg-zinc-950 overflow-hidden">
                        <img
                          src={PROFILE.heroImage}
                          alt="Layered translucent obsidian glass architecture with cobalt optical nodes representing AI and software engineering systems"
                          referrerPolicy="no-referrer"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4">
                          <p className="text-xs font-medium text-zinc-200">
                            Applied Generative AI · Retrieval Systems · Full-Stack Engineering
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-900 text-center">
                        <Layers className="w-8 h-8 text-blue-400 mb-3" />
                        <p className="text-sm font-medium text-zinc-200">
                          Intelligent Systems Architecture
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                          Generative AI · RAG Pipelines · Full-Stack Web
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {workbenchTab === 'code' && (
                  <div className="flex-1 flex flex-col bg-zinc-950 text-zinc-200 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-zinc-400">
                        rag-evaluator.ts
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded transition-colors cursor-pointer"
                      >
                        {copiedCode ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-zinc-300 flex-1">
                      <code>{RAG_CODE_SNIPPET}</code>
                    </pre>
                  </div>
                )}

                {workbenchTab === 'metrics' && (
                  <div className="flex-1 p-5 flex flex-col justify-between bg-white dark:bg-[#111115]">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Verified Platform Snapshot</span>
                        <span className="font-mono">
                          {statsLoading
                            ? 'Refreshing...'
                            : stats?.source === 'live' || stats?.source === 'cached'
                              ? 'Live API'
                              : 'Snapshot'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            LeetCode Solved
                          </div>
                          <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50 mt-1">
                            {totalSolved}
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Contest Rating
                          </div>
                          <div className="font-mono text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400 mt-1">
                            {contestRating}
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            GitHub Repos
                          </div>
                          <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50 mt-1">
                            {publicRepos}
                          </div>
                        </div>
                        <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Academic CGPA
                          </div>
                          <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50 mt-1">
                            8.9
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                      Difficulty split: {stats?.leetcode.easySolved ?? 343} Easy ·{' '}
                      {stats?.leetcode.mediumSolved ?? 415} Medium ·{' '}
                      {stats?.leetcode.hardSolved ?? 134} Hard
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Metric Row Below Hero Split */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 border-y border-zinc-200 dark:border-zinc-800/80 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-zinc-800/80">
          <div className="py-5 pr-4 lg:pr-6">
            <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
              {totalSolved}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              LeetCode Problems Solved
            </div>
          </div>

          <div className="py-5 px-0 sm:px-4 lg:px-6">
            <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
              {contestRating}
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              LeetCode Contest Rating
            </div>
          </div>

          <div className="py-5 pr-4 lg:px-6">
            <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
              8.9 / 10
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              B.Tech CSE CGPA · PSIT
            </div>
          </div>

          <div className="py-5 pl-0 sm:pl-4 lg:pl-6">
            <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
              {publicRepos}+
            </div>
            <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Public GitHub Repositories
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

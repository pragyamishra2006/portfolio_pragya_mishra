import { useEffect } from 'react';
import { ExternalLink, Printer, X } from 'lucide-react';
import {
  PROFILE,
  EDUCATION,
  SKILL_CATEGORIES,
  FEATURED_PROJECTS,
  type LiveCodingStats,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  stats: LiveCodingStats | null;
}

export function ResumeModal({ open, onClose, stats }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const solvedCount = stats?.leetcode.totalSolved ?? 892;
  const rating = stats?.leetcode.contestRating ?? 1733;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60">
          <div>
            <h3
              id="resume-modal-title"
              className="font-display text-base font-bold text-zinc-950 dark:text-zinc-50"
            >
              Resume — {PROFILE.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Engineering summary &amp; verified PDF link
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Open Resume PDF
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Summary Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
          <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <h4 className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50">
              {PROFILE.name}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              {PROFILE.location} · {PROFILE.email} · github.com/{PROFILE.githubHandle} · leetcode.com/u/
              {PROFILE.leetcodeHandle}
            </p>
          </div>

          <div>
            <h5 className="font-display text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Education
            </h5>
            <div className="space-y-2">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="flex flex-wrap justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {e.institution}
                    </span>{' '}
                    — {e.degree}
                  </div>
                  <div className="font-mono text-zinc-500 dark:text-zinc-400">
                    {e.period} · {e.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-display text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Technical Skills
            </h5>
            <div className="space-y-1.5 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {cat.title}:
                  </span>{' '}
                  <span>{cat.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-display text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Selected Projects
            </h5>
            <div className="space-y-3">
              {FEATURED_PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {proj.name}
                    </span>
                    <span className="font-mono text-zinc-500 dark:text-zinc-400">
                      {proj.techStack.slice(0, 4).join(' · ')}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">{proj.solution}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-display text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-2">
              Coding &amp; Achievements
            </h5>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>
                — LeetCode ({PROFILE.leetcodeHandle}): {solvedCount} problems solved, {rating} contest
                rating.
              </li>
              <li>— HackerRank: 5-Star Python &amp; 5-Star Problem Solving.</li>
              <li>— HCLTech Campus Ambassador (selected among 8,000+ applicants) · Amazon HackOn 6.0 · Pro-Tech Hackathon Finalist.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

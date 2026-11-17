import { Code, Github, Terminal, ArrowUpRight, RefreshCw } from 'lucide-react';
import { PROFILE, type LiveCodingStats } from '../data/portfolioData';

interface CodingProfilesSectionProps {
  stats: LiveCodingStats | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function CodingProfilesSection({
  stats,
  loading,
  error,
  onRefresh,
}: CodingProfilesSectionProps) {
  const lc = stats?.leetcode;
  const gh = stats?.github;

  const total = lc?.totalSolved ?? 892;
  const easy = lc?.easySolved ?? 343;
  const medium = lc?.mediumSolved ?? 415;
  const hard = lc?.hardSolved ?? 134;

  const easyPct = total > 0 ? Math.round((easy / total) * 100) : 38;
  const mediumPct = total > 0 ? Math.round((medium / total) * 100) : 47;
  const hardPct = Math.max(0, 100 - easyPct - mediumPct);

  const sourceLabel =
    stats?.source === 'live'
      ? 'Live API verified'
      : stats?.source === 'cached'
        ? 'Live API (cached)'
        : 'Verified snapshot';

  return (
    <section
      id="coding-profiles"
      className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              05. Competitive Programming &amp; Open Source
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Problem Solving &amp; Coding Profiles
            </h2>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{sourceLabel}</span>
            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg transition-colors disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Syncing...' : 'Refresh Stats'}
            </button>
          </div>
        </div>

        {error && (
          <div
            role="status"
            className="mb-6 px-4 py-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-800 dark:text-amber-300"
          >
            {error} Showing last verified statistics.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LeetCode Card */}
          <a
            href={PROFILE.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] hover:border-blue-500/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-zinc-950 dark:text-zinc-50">
                      LeetCode
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      @{PROFILE.leetcodeHandle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800/80">
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                    {total}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Problems Solved
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">
                    {lc?.contestRating ?? 1733}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Contest Rating
                  </div>
                </div>
              </div>

              {/* Difficulty Breakdown Bar */}
              <div className="mt-4">
                <div className="h-2 w-full rounded-full overflow-hidden flex bg-zinc-100 dark:bg-zinc-900">
                  <div
                    style={{ width: `${easyPct}%` }}
                    className="bg-emerald-500"
                    title={`Easy: ${easy}`}
                  />
                  <div
                    style={{ width: `${mediumPct}%` }}
                    className="bg-amber-500"
                    title={`Medium: ${medium}`}
                  />
                  <div
                    style={{ width: `${hardPct}%` }}
                    className="bg-rose-500"
                    title={`Hard: ${hard}`}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono tabular-nums text-zinc-600 dark:text-zinc-400 mt-2.5">
                  <span>Easy {easy}</span>
                  <span>Medium {medium}</span>
                  <span>Hard {hard}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>
                {lc?.contestsAttended ?? 11} Contests · Top {(lc?.topPercentage ?? 11.94).toFixed(1)}%
              </span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                View Profile
              </span>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] hover:border-blue-500/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900/10 dark:bg-zinc-100/10 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-zinc-950 dark:text-zinc-50">
                      GitHub
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      @{PROFILE.githubHandle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800/80">
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                    {gh?.publicRepos ?? 21}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Public Repositories
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                    TS · Py · JS
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Primary Stack
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
                {gh?.bio ||
                  'Computer Science Student | AI/ML & Full-Stack Developer | DSA | Building AI-powered solutions.'}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>AI, RAG &amp; Full-Stack Repositories</span>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                View Profile
              </span>
            </div>
          </a>

          {/* HackerRank Card */}
          <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-zinc-950 dark:text-zinc-50">
                      HackerRank
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      5-Star Track Record
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 dark:border-zinc-800/80">
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                    5★
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Python Badge
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                    5★
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Problem Solving
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
                Earned gold 5-star certifications in Python and Problem Solving through foundational
                algorithmic, data structure, and language proficiency tracks.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>Manually verified achievement</span>
              <a
                href="https://www.hackerrank.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                HackerRank
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

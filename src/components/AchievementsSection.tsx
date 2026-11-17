import { Award } from 'lucide-react';
import { ACHIEVEMENTS, type LiveCodingStats } from '../data/portfolioData';

interface AchievementsSectionProps {
  stats: LiveCodingStats | null;
}

export function AchievementsSection({ stats }: AchievementsSectionProps) {
  const solvedCount = stats?.leetcode.totalSolved ?? 892;
  const contestRating = stats?.leetcode.contestRating ?? 1733;
  const topPct = stats?.leetcode.topPercentage ?? 11.94;

  const items = ACHIEVEMENTS.map((item) => {
    if (item.id === 'leetcode-milestone') {
      return {
        ...item,
        description: `Solved ${solvedCount} Data Structures & Algorithms problems across dynamic programming, graphs, trees, and greedy paradigms with a ${contestRating} contest rating (top ${topPct.toFixed(1)}% globally).`,
      };
    }
    return item;
  });

  return (
    <section
      id="achievements"
      className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              04. Achievements &amp; Experience
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Milestones, Hackathons &amp; Leadership
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Verified recognitions, finalists &amp; certifications</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <article
              key={item.id}
              className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {item.type}
                  </span>
                  <span className="font-mono tabular-nums">{item.period}</span>
                </div>

                <h3 className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-50 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {item.organization}
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 mt-3">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

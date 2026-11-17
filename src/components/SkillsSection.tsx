import { useState } from 'react';
import {
  Code2,
  Layout,
  Server,
  BrainCircuit,
  Database,
  Wrench,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const CATEGORY_ICONS: Record<string, typeof Code2> = {
  programming: Code2,
  frontend: Layout,
  backend: Server,
  aiml: BrainCircuit,
  databases: Database,
  tools: Wrench,
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const visibleCategories =
    activeCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === activeCategory);

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              02. Technical Skills
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Core Engineering Stack
            </h2>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter technical skills by category"
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800 self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              All
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Clean 3-Column Interactive Architectural Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCategories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] || Code2;
            return (
              <div
                key={category.id}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {category.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                      {category.items.length}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mb-5">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-2 gap-x-4 gap-y-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill}
                      className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate"
                      title={skill}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

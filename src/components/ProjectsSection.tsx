import { useState, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  X,
  FolderGit2,
} from 'lucide-react';
import {
  FEATURED_PROJECTS,
  type ProjectItem,
  type LiveCodingStats,
} from '../data/portfolioData';

interface ProjectsSectionProps {
  stats: LiveCodingStats | null;
}

const FILTER_OPTIONS: Array<'All' | ProjectItem['category']> = [
  'All',
  'AI & RAG',
  'Full-Stack & DevTools',
  'GIS & Remote Sensing',
];

function ProjectImage({
  src,
  alt,
  title,
  className,
}: {
  src: string;
  alt: string;
  title: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-zinc-900 text-zinc-300 p-6 text-center ${className || ''}`}
      >
        <FolderGit2 className="w-7 h-7 text-blue-400 mb-2" />
        <span className="font-display text-sm font-semibold">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function ProjectsSection({ stats }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'All' | ProjectItem['category']>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [showMoreRepos, setShowMoreRepos] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredProjects =
    filter === 'All'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === filter);

  const flagship = filteredProjects.find((p) => p.isFlagship);
  const secondaryProjects = filteredProjects.filter((p) => !p.isFlagship);
  const recentRepos = stats?.github.recentRepos ?? [];

  return (
    <section
      id="projects"
      className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              03. Featured Projects
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Selected Engineering Work
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter featured projects"
            className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800 self-start md:self-auto"
          >
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={filter === option}
                onClick={() => setFilter(option)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === option
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {option === 'All' ? 'All Projects' : option}
              </button>
            ))}
          </div>
        </div>

        {/* Flagship Project Spotlight (Intervora AI) */}
        {flagship && (
          <article className="mb-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 relative min-h-[240px] bg-zinc-950 overflow-hidden">
                <ProjectImage
                  src={flagship.imageUrl}
                  alt={flagship.imageAlt}
                  title={flagship.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                    <span>{flagship.statusLabel}</span>
                    <span aria-hidden="true" className="text-zinc-400">
                      ·
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {flagship.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {flagship.name}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-300 mt-2">
                    {flagship.tagline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Problem Statement
                      </h4>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {flagship.problemStatement}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                        Engineered Solution
                      </h4>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {flagship.solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      Key Capabilities
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      {flagship.keyFeatures.map((feat) => (
                        <li key={feat} className="leading-relaxed">
                          — {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {flagship.techStack.join(' · ')}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {flagship.githubUrl && (
                      <a
                        href={flagship.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub Repo
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(flagship)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect Architecture
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Secondary Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryProjects.map((project) => (
            <article
              key={project.id}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] overflow-hidden flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-150"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-zinc-950 overflow-hidden">
                  <ProjectImage
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    title={project.name}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
                    {project.statusLabel}
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 mt-2">
                    {project.tagline}
                  </p>

                  <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-200">
                        Problem:{' '}
                      </span>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.problemStatement}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-200">
                        Solution:{' '}
                      </span>
                      <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.solution}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                <div className="font-mono text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {project.techStack.join(' · ')}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">
                        Concept / Prototype
                      </span>
                    )}

                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-600/10 rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        Live Demo
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Live GitHub Repositories Explorer */}
        {recentRepos.length > 0 && (
          <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
                  Additional Public Repositories
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Includes RAG systems, security tools, and backend experiments from GitHub.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowMoreRepos((prev) => !prev)}
                aria-expanded={showMoreRepos}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {showMoreRepos ? (
                  <>
                    Hide Repositories
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Browse {recentRepos.length} Repositories
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

            {showMoreRepos && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] hover:border-blue-500/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100 truncate">
                          {repo.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      </div>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-3">
                        {repo.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/70 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span>{repo.language || 'Repository'}</span>
                      <span>{repo.homepage ? 'Includes Live Demo' : 'GitHub Source'}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Architecture Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
              <ProjectImage
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt}
                title={selectedProject.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/70 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {selectedProject.statusLabel} · {selectedProject.category}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50 mt-1"
                >
                  {selectedProject.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1.5">
                  {selectedProject.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Problem Statement
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {selectedProject.problemStatement}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
                    Solution Architecture
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  Key Features
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {selectedProject.keyFeatures.map((feat) => (
                    <li key={feat}>— {feat}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {selectedProject.techStack.join(' · ')}
                </div>

                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub Repository
                    </a>
                  )}
                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Live Demo
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState } from 'react';
import { GraduationCap, Compass } from 'lucide-react';
import { EDUCATION, CURRENTLY_EXPLORING, PROFILE } from '../data/portfolioData';

export function AboutAndEducation() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 border-b border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Left: About Me & Currently Exploring */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <p className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                01. About Me
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-5">
                Engineering practical intelligence from fundamentals to deployment.
              </h2>

              <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl">
                <p>
                  I am a B.Tech Computer Science and Engineering student at{' '}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Pranveer Singh Institute of Technology, Kanpur
                  </span>{' '}
                  with an academic CGPA of{' '}
                  <span className="font-mono font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                    8.9
                  </span>
                  . My engineering focus sits at the intersection of software architecture,
                  algorithmic problem solving, and applied Artificial Intelligence.
                </p>
                <p>
                  I enjoy building end-to-end systems where backend reliability meets intelligent
                  automation—spanning{' '}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Generative AI
                  </span>
                  ,{' '}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Large Language Models (LLMs)
                  </span>
                  , and{' '}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Retrieval-Augmented Generation (RAG)
                  </span>{' '}
                  pipelines alongside full-stack web applications and strong{' '}
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Data Structures &amp; Algorithms
                  </span>{' '}
                  fundamentals.
                </p>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
              <div className="flex items-center gap-2 mb-5">
                <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Currently Exploring
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CURRENTLY_EXPLORING.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115]"
                  >
                    <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mt-1.5">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Portrait & Education Timeline */}
          <div id="education" className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115] overflow-hidden">
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-100 to-zinc-200 flex items-center justify-center overflow-hidden">
                {!photoError ? (
                  <img
                    src={PROFILE.photoUrl}
                    alt="Pragya Mishra, B.Tech Computer Science Engineering student at PSIT Kanpur"
                    referrerPolicy="no-referrer"
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="font-display text-3xl font-bold text-zinc-600">
                    Pragya Mishra
                  </span>
                )}
              </div>
              <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {PROFILE.name}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  PSIT Kanpur · B.Tech CSE
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  Education
                </h3>
              </div>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <article
                  key={edu.degree}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111115]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    <span className="font-mono tabular-nums">{edu.period}</span>
                    <span className="font-mono font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                      {edu.score}
                    </span>
                  </div>

                  <h4 className="font-display text-base font-semibold text-zinc-950 dark:text-zinc-50">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                    {edu.institution}
                    <span className="text-zinc-400 dark:text-zinc-500"> · </span>
                    <span className="text-zinc-500 dark:text-zinc-400">{edu.location}</span>
                  </p>

                  {edu.highlights.length > 0 && idx === 0 && (
                    <ul className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/70 space-y-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {edu.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

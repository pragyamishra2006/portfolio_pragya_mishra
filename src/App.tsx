import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAndEducation } from './components/AboutAndEducation';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { CodingProfilesSection } from './components/CodingProfilesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import type { LiveCodingStats } from './data/portfolioData';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('pragya-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [resumeOpen, setResumeOpen] = useState(false);
  const [stats, setStats] = useState<LiveCodingStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('pragya-theme', theme);
    } catch {
      // Storage unavailable
    }
  }, [theme]);

  const loadCodingStats = useCallback(async (forceRefresh = false) => {
    setStatsLoading(true);
    setStatsError(null);
    try {
      const res = await fetch(`/api/coding-stats${forceRefresh ? '?refresh=true' : ''}`);
      if (!res.ok) {
        throw new Error('Failed to load coding statistics.');
      }
      const data = (await res.json()) as LiveCodingStats;
      setStats(data);
    } catch {
      setStatsError('Could not reach live coding profile APIs.');
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCodingStats(false);
  }, [loadCodingStats]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      <main>
        <Hero
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenResume={() => setResumeOpen(true)}
          stats={stats}
          statsLoading={statsLoading}
        />

        <AboutAndEducation />

        <SkillsSection />

        <ProjectsSection stats={stats} />

        <AchievementsSection stats={stats} />

        <CodingProfilesSection
          stats={stats}
          loading={statsLoading}
          error={statsError}
          onRefresh={() => loadCodingStats(true)}
        />

        <ContactSection />
      </main>

      <Footer theme={theme} onToggleTheme={toggleTheme} />

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        stats={stats}
      />
    </div>
  );
}

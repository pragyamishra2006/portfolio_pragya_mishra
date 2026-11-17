import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';

interface LeetCodeDifficultyStat {
  difficulty: string;
  count: number;
}

interface CodingStatsResponse {
  source: 'live' | 'cached' | 'snapshot';
  updatedAt: string;
  leetcode: {
    username: string;
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number | null;
    contestRating: number | null;
    contestsAttended: number | null;
    topPercentage: number | null;
    liveVerified: boolean;
  };
  github: {
    username: string;
    publicRepos: number;
    followers: number;
    bio: string;
    avatarUrl: string;
    liveVerified: boolean;
    recentRepos: Array<{
      name: string;
      url: string;
      homepage: string | null;
      description: string | null;
      language: string | null;
      stars: number;
      updatedAt: string;
    }>;
  };
}

const SNAPSHOT_STATS: Omit<CodingStatsResponse, 'source' | 'updatedAt'> = {
  leetcode: {
    username: 'pragyamishra08',
    totalSolved: 892,
    easySolved: 343,
    mediumSolved: 415,
    hardSolved: 134,
    ranking: 51747,
    contestRating: 1733,
    contestsAttended: 11,
    topPercentage: 11.94,
    liveVerified: false,
  },
  github: {
    username: 'pragyamishra2006',
    publicRepos: 21,
    followers: 0,
    bio: 'Computer Science Student | AI/ML & Full-Stack Developer | DSA | Building AI-powered solutions',
    avatarUrl: 'https://avatars.githubusercontent.com/u/218106478?v=4',
    liveVerified: false,
    recentRepos: [
      {
        name: 'Intervora',
        url: 'https://github.com/pragyamishra2006/Intervora',
        homepage: null,
        description:
          'Intervora is an AI-powered career preparation platform that helps students and developers prepare for technical interviews through AI mock interviews, resume analysis, coding-profile integration, and personalized skill insights.',
        language: 'TypeScript',
        stars: 0,
        updatedAt: '2026-09-20T15:30:27Z',
      },
      {
        name: 'TrustForge-GitHub-Repository-Authenticity-Analyzer',
        url: 'https://github.com/pragyamishra2006/TrustForge-GitHub-Repository-Authenticity-Analyzer',
        homepage: 'https://trust-forge-git-hub-repository-auth.vercel.app',
        description:
          'An AI-powered platform that analyzes GitHub repositories to assess code authenticity, detect potential plagiarism or copied content, and generate trust insights.',
        language: 'TypeScript',
        stars: 0,
        updatedAt: '2026-09-26T10:49:02Z',
      },
      {
        name: 'Averra-AI-Intelligent-Agriculture-Crop-Monitoring-Platform',
        url: 'https://github.com/pragyamishra2006/Averra-AI-Intelligent-Agriculture-Crop-Monitoring-Platform',
        homepage: 'https://averra-ai-intelligent-agriculture-c.vercel.app',
        description:
          'Averra AI is an AI-powered agriculture platform that uses satellite imagery, machine learning, and data-driven insights to monitor crop health and detect agricultural risks.',
        language: 'JavaScript',
        stars: 0,
        updatedAt: '2026-09-27T09:55:26Z',
      },
      {
        name: 'supply-chain-rag',
        url: 'https://github.com/pragyamishra2006/supply-chain-rag',
        homepage: null,
        description:
          'A retrieval-augmented generation app for supply chain documents, using FastAPI, ChromaDB, local embeddings, and Groq (Llama 3.3 70B) for grounded Q&A with citations.',
        language: 'Python',
        stars: 0,
        updatedAt: '2026-08-16T10:07:49Z',
      },
      {
        name: 'InterviewGPT',
        url: 'https://github.com/pragyamishra2006/InterviewGPT',
        homepage: null,
        description:
          'Retrieval-Augmented Generation (RAG) based interview preparation platform enabling students to upload notes and receive contextual answers and mock interviews.',
        language: 'Python',
        stars: 0,
        updatedAt: '2026-07-10T04:33:46Z',
      },
      {
        name: 'Paytm-Rakshak-AI',
        url: 'https://github.com/pragyamishra2006/Paytm-Rakshak-AI',
        homepage: null,
        description:
          'AI-powered payment safety assistant that analyzes suspicious messages, links, and screenshots to generate an explainable fraud risk score.',
        language: 'JavaScript',
        stars: 0,
        updatedAt: '2026-11-14T18:17:02Z',
      },
    ],
  },
};

let statsCache: { data: CodingStatsResponse; expiresAt: number } | null = null;
const CACHE_TTL_MS = 10 * 60 * 1000;

async function fetchLeetCodeStats() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PragyaMishraPortfolio/1.0',
      },
      body: JSON.stringify({
        query: `query {
          matchedUser(username: "pragyamishra08") {
            username
            profile { ranking }
            submitStats: submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
          }
          userContestRanking(username: "pragyamishra08") {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
        }`,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;
    const payload = (await res.json()) as {
      data?: {
        matchedUser?: {
          username?: string;
          profile?: { ranking?: number };
          submitStats?: { acSubmissionNum?: LeetCodeDifficultyStat[] };
        };
        userContestRanking?: {
          attendedContestsCount?: number;
          rating?: number;
          topPercentage?: number;
        };
      };
    };

    const user = payload?.data?.matchedUser;
    if (!user?.submitStats?.acSubmissionNum) return null;

    const byDiff = new Map(user.submitStats.acSubmissionNum.map((item) => [item.difficulty, item.count]));
    const contest = payload?.data?.userContestRanking;

    return {
      username: user.username || 'pragyamishra08',
      totalSolved: byDiff.get('All') ?? SNAPSHOT_STATS.leetcode.totalSolved,
      easySolved: byDiff.get('Easy') ?? SNAPSHOT_STATS.leetcode.easySolved,
      mediumSolved: byDiff.get('Medium') ?? SNAPSHOT_STATS.leetcode.mediumSolved,
      hardSolved: byDiff.get('Hard') ?? SNAPSHOT_STATS.leetcode.hardSolved,
      ranking: user.profile?.ranking ?? null,
      contestRating: contest?.rating ? Math.round(contest.rating) : null,
      contestsAttended: contest?.attendedContestsCount ?? null,
      topPercentage: contest?.topPercentage ?? null,
      liveVerified: true,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchGitHubStats() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const headers: Record<string, string> = {
      'User-Agent': 'PragyaMishraPortfolio/1.0',
      Accept: 'application/vnd.github+json',
    };
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/pragyamishra2006', { headers, signal: controller.signal }),
      fetch('https://api.github.com/users/pragyamishra2006/repos?per_page=100&sort=updated', {
        headers,
        signal: controller.signal,
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as {
      login?: string;
      public_repos?: number;
      followers?: number;
      bio?: string;
      avatar_url?: string;
    };
    const repos = (await reposRes.json()) as Array<{
      name: string;
      html_url: string;
      homepage: string | null;
      description: string | null;
      language: string | null;
      stargazers_count: number;
      fork: boolean;
      updated_at: string;
    }>;

    const nonForkRepos = Array.isArray(repos) ? repos.filter((r) => !r.fork && r.description) : [];

    return {
      username: user.login || 'pragyamishra2006',
      publicRepos: user.public_repos ?? SNAPSHOT_STATS.github.publicRepos,
      followers: user.followers ?? 0,
      bio: user.bio || SNAPSHOT_STATS.github.bio,
      avatarUrl: user.avatar_url || SNAPSHOT_STATS.github.avatarUrl,
      liveVerified: true,
      recentRepos: nonForkRepos.slice(0, 12).map((r) => ({
        name: r.name,
        url: r.html_url,
        homepage: r.homepage || null,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count,
        updatedAt: r.updated_at,
      })),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.get('/api/coding-stats', async (req, res) => {
    const forceRefresh = req.query.refresh === 'true';
    const now = Date.now();

    if (!forceRefresh && statsCache && statsCache.expiresAt > now) {
      res.json({ ...statsCache.data, source: 'cached' });
      return;
    }

    const [leetcode, github] = await Promise.all([fetchLeetCodeStats(), fetchGitHubStats()]);

    const hasLive = Boolean(leetcode || github);
    const response: CodingStatsResponse = {
      source: hasLive ? 'live' : 'snapshot',
      updatedAt: new Date().toISOString(),
      leetcode: leetcode || SNAPSHOT_STATS.leetcode,
      github: github || SNAPSHOT_STATS.github,
    };

    if (hasLive) {
      statsCache = { data: response, expiresAt: now + CACHE_TTL_MS };
    }

    res.json(response);
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const body = req.body as {
        name?: string;
        email?: string;
        subject?: string;
        message?: string;
      };

      const name = (body?.name || '').trim();
      const email = (body?.email || '').trim();
      const subject = (body?.subject || '').trim();
      const message = (body?.message || '').trim();

      if (name.length < 2 || name.length > 120) {
        res.status(400).json({ ok: false, error: 'Please provide your name (at least 2 characters).' });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) || email.length > 160) {
        res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
        return;
      }

      if (subject.length < 3 || subject.length > 200) {
        res.status(400).json({ ok: false, error: 'Please enter a concise subject (3–200 characters).' });
        return;
      }

      if (message.length < 10 || message.length > 4000) {
        res.status(400).json({ ok: false, error: 'Please include a message (at least 10 characters).' });
        return;
      }

      const inquiryId = `INQ-${Date.now().toString(36).toUpperCase()}`;
      const receivedAt = new Date().toISOString();

      const dataDir = path.join(__dirname, 'data');
      const inquiriesPath = path.join(dataDir, 'inquiries.json');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      let existing: Array<Record<string, string>> = [];
      if (fs.existsSync(inquiriesPath)) {
        try {
          const raw = fs.readFileSync(inquiriesPath, 'utf-8');
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) existing = parsed;
        } catch {
          existing = [];
        }
      }

      existing.push({
        id: inquiryId,
        name,
        email,
        subject,
        message,
        receivedAt,
      });

      fs.writeFileSync(inquiriesPath, JSON.stringify(existing, null, 2), 'utf-8');

      let deliveryMode: 'email+stored' | 'stored' = 'stored';
      const resendKey = process.env.RESEND_API_KEY;
      const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'pragya.mishra.0806@gmail.com';

      if (resendKey) {
        try {
          const mailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'Portfolio Contact <onboarding@resend.dev>',
              to: [recipientEmail],
              reply_to: email,
              subject: `[Portfolio] ${subject}`,
              text: `Reference: ${inquiryId}\nFrom: ${name} (${email})\nReceived: ${receivedAt}\n\n${message}`,
            }),
          });
          if (mailRes.ok) {
            deliveryMode = 'email+stored';
          }
        } catch {
          // Stored locally on server even if optional email forwarder fails
        }
      }

      res.status(201).json({
        ok: true,
        id: inquiryId,
        receivedAt,
        deliveryMode,
      });
    } catch {
      res.status(500).json({
        ok: false,
        error: 'Unable to record your message right now. Please reach out directly via email.',
      });
    }
  });

  if (IS_PROD) {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

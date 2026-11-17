export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: 'AI & RAG' | 'Full-Stack & DevTools' | 'GIS & Remote Sensing';
  isFlagship?: boolean;
  statusLabel: string;
  problemStatement: string;
  solution: string;
  techStack: string[];
  keyFeatures: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface AchievementItem {
  id: string;
  period: string;
  type:
    | 'Leadership'
    | 'Finalist'
    | 'Participation'
    | 'Certification'
    | 'Competitive Programming'
    | 'Recognition';
  title: string;
  organization: string;
  description: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  highlights: string[];
}

export interface LiveCodingStats {
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

export const PROFILE = {
  name: 'Pragya Mishra',
  roleHeadline: 'Building Intelligent Solutions Through Code, AI & Innovation.',
  shortIntro:
    'Computer Science Engineering student passionate about solving real-world problems through software engineering, artificial intelligence, and intelligent applications.',
  statusLabel: 'Open to Internship Opportunities',
  location: 'Kanpur, India',
  email: 'pragya.mishra.0806@gmail.com',
  githubUrl: 'https://github.com/pragyamishra2006',
  githubHandle: 'pragyamishra2006',
  linkedinUrl: 'https://www.linkedin.com/in/pragya-mishra-4923a333/',
  leetcodeUrl: 'https://leetcode.com/u/pragyamishra08/',
  leetcodeHandle: 'pragyamishra08',
  hackerrankNote: '5-Star Python & 5-Star Problem Solving',
  resumeUrl: 'https://drive.google.com/file/d/1-K4BEhuftpF60Crs35KthaxCZfXj9iMk/view?usp=sharing',
  heroImage: '/src/assets/images/hero_ai_architecture_1794936711243.jpg',
  photoUrl: '/assets/aistudio/Pragya_Mishra_Photo_a544ef89.jpeg',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Core languages for algorithmic problem solving and system implementation.',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Accessible, responsive interfaces built with modern component architectures.',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'RESTful services, authentication pipelines, and server-side business logic.',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    description: 'LLM orchestration, semantic retrieval pipelines, and applied ML workflows.',
    items: [
      'Generative AI',
      'LangChain',
      'RAG',
      'ChromaDB',
      'HuggingFace Embeddings',
      'Machine Learning',
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    description: 'Relational schemas, document stores, and real-time cloud persistence.',
    items: ['MySQL', 'MongoDB', 'Firebase'],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    description: 'Version control, Unix workflows, and rapid AI prototyping environments.',
    items: ['Git', 'GitHub', 'Linux', 'Streamlit'],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'intervora-ai',
    name: 'Intervora AI',
    tagline: 'Flagship AI-powered interview preparation and career readiness platform.',
    category: 'AI & RAG',
    isFlagship: true,
    statusLabel: 'Flagship Project · Full-Stack & GenAI',
    problemStatement:
      'Students preparing for software engineering roles juggle disconnected tools for mock interviews, resume feedback, ATS keyword alignment, and coding profile evaluation.',
    solution:
      'Built a unified full-stack AI preparation workspace that combines realistic mock interview simulations, resume and ATS compatibility analysis, personalized feedback reports, and multi-platform coding profile insights.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Generative AI', 'Tailwind CSS'],
    keyFeatures: [
      'AI-powered technical and behavioral mock interviews with structured feedback',
      'Resume parsing with ATS compatibility checks and role-targeted improvement suggestions',
      'Personalized interview follow-up recommendations grounded in candidate skills',
      'Unified coding profile integration aggregating LeetCode and GitHub activity',
    ],
    githubUrl: 'https://github.com/pragyamishra2006/Intervora',
    imageUrl: '/src/assets/images/project_intervora_ai_1794936711985.jpg',
    imageAlt: 'Isometric technical visualization representing Intervora AI interview and resume analysis platform',
  },
  {
    id: 'github-ai-analyzer',
    name: 'GitHub AI Analyzer (TrustForge)',
    tagline: 'Intelligent GitHub repository evaluation and developer authenticity insights.',
    category: 'Full-Stack & DevTools',
    statusLabel: 'Developer Tooling · Live Demo Available',
    problemStatement:
      'Reviewers, recruiters, and open-source maintainers spend significant manual effort assessing repository structure, code quality signals, and contributor consistency across large codebases.',
    solution:
      'Engineered an AI-assisted GitHub analysis platform that inspects repository metadata, commit history, code structure, and developer activity to generate structured quality and authenticity reports.',
    techStack: ['TypeScript', 'React', 'GitHub API', 'Generative AI', 'REST APIs'],
    keyFeatures: [
      'Automated GitHub profile and repository metadata analysis',
      'Code quality and repository structure indicators for faster technical review',
      'Developer activity and commit pattern visualization',
      'AI-generated actionable recommendations and explainable repository insights',
    ],
    githubUrl:
      'https://github.com/pragyamishra2006/TrustForge-GitHub-Repository-Authenticity-Analyzer',
    liveDemoUrl: 'https://trust-forge-git-hub-repository-auth.vercel.app',
    imageUrl: '/src/assets/images/project_trustforge_github_1794936713208.jpg',
    imageAlt: 'Dependency graph and code integrity matrix visualization for GitHub AI Analyzer',
  },
  {
    id: 'finagent',
    name: 'FinAgent – AI-Powered Financial Intelligence Platform',
    tagline:
      'AI-powered financial intelligence system for document-grounded market research, risk analysis, and decision support.',
    category: 'AI & RAG',
    statusLabel: 'Financial AI · Intelligent Systems',
    problemStatement:
      'Evaluating financial statements, market filings, and economic indicators requires manually cross-referencing dense unstructured documents with quantitative metrics.',
    solution:
      'Architected an AI-powered financial intelligence workflow combining Retrieval-Augmented Generation (RAG) and LLM reasoning to synthesize financial documents, surface risk signals, and generate structured analytical insights.',
    techStack: ['Python', 'Generative AI', 'LangChain', 'RAG', 'ChromaDB', 'React'],
    keyFeatures: [
      'Document-grounded financial Q&A over reports and market filings',
      'Automated extraction and synthesis of key financial ratios and metrics',
      'Risk signal identification and structured executive summary generation',
      'Interactive query workflow designed for fast, transparent financial research',
    ],
    imageUrl: '/src/assets/images/project_finagent_ai_1794937207895.jpg',
    imageAlt:
      'Isometric analytical visualization representing FinAgent AI-powered financial intelligence platform',
  },
  {
    id: 'agrisphere-ai',
    name: 'AgriSphere AI (Averra)',
    tagline: 'AI-powered agricultural intelligence for crop monitoring and farming decision support.',
    category: 'GIS & Remote Sensing',
    statusLabel: 'Applied AI & GIS · Live Demo Available',
    problemStatement:
      'Delayed crop stress identification and fragmented environmental telemetry make it harder for growers to respond early to agricultural risks.',
    solution:
      'Developed an interactive agricultural intelligence interface integrating crop monitoring dashboards, geospatial mapping, weather context, and AI-assisted diagnostic insights.',
    techStack: ['React', 'JavaScript', 'Leaflet GIS', 'Recharts', 'Node.js', 'Express.js'],
    keyFeatures: [
      'Interactive geospatial field mapping powered by Leaflet',
      'Crop health and environmental trend visualizations using Recharts',
      'AI-assisted crop stress analysis and weather-aware insights',
      'Downloadable field assessment summaries for record keeping',
    ],
    githubUrl:
      'https://github.com/pragyamishra2006/Averra-AI-Intelligent-Agriculture-Crop-Monitoring-Platform',
    liveDemoUrl: 'https://averra-ai-intelligent-agriculture-c.vercel.app',
    imageUrl: '/src/assets/images/project_agrisphere_crop_1794936713689.jpg',
    imageAlt: 'Top-down multispectral agricultural field visualization with crop health grid overlays',
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'leetcode-milestone',
    period: '2025 — Present',
    type: 'Competitive Programming',
    title: 'Consistent Algorithmic Problem Solving on LeetCode',
    organization: 'LeetCode (pragyamishra08)',
    description:
      'Solved 890+ Data Structures & Algorithms problems across dynamic programming, graphs, trees, and greedy paradigms with a 1700+ contest rating (top ~12% globally).',
  },
  {
    id: 'hcltech-ambassador',
    period: '2026',
    type: 'Leadership',
    title: 'HCLTech Campus Ambassador',
    organization: 'HCLTech',
    description:
      'Selected as an HCLTech Campus Ambassador from 8,000+ applicants nationwide, leading peer technical outreach and career readiness initiatives on campus.',
  },
  {
    id: 'hcl-et-masterclass',
    period: '2026',
    type: 'Certification',
    title: 'AI Skills for the Future Masterclass',
    organization: 'HCLTech & The Economic Times',
    description:
      'Completed an intensive industry masterclass focused on applied Artificial Intelligence, Generative AI engineering workflows, and modern software systems.',
  },
  {
    id: 'amazon-hackon',
    period: '2025',
    type: 'Participation',
    title: 'Amazon HackOn 6.0 Participant',
    organization: 'Amazon',
    description:
      'Participated in Amazon’s national engineering hackathon, collaborating under tight timelines on scalable architecture and algorithmic problem solving.',
  },
  {
    id: 'pro-tech-finalist',
    period: '2024',
    type: 'Finalist',
    title: 'Pro-Tech Hackathon Finalist',
    organization: 'Pro-Tech Hackathon (200+ Teams)',
    description:
      'Advanced to the finalist stage among 200+ competing teams by engineering a Python-based AI Voice Assistant capable of automating multi-step desktop and web tasks.',
  },
  {
    id: 'hackerrank-stars',
    period: '2024 — Present',
    type: 'Competitive Programming',
    title: 'HackerRank 5-Star Achievement',
    organization: 'HackerRank',
    description:
      'Earned 5-Star gold badges in both Python and Problem Solving through sustained algorithmic and language-proficiency practice.',
  },
  {
    id: 'college-tech-expo',
    period: '2024',
    type: 'Recognition',
    title: 'College Tech Expo Showcase',
    organization: 'PSIT Kanpur',
    description:
      'Demonstrated a real-time Computer Vision Hand Detection System to an audience of 300+ students and faculty members.',
  },
] as AchievementItem[];

export const EDUCATION: EducationItem[] = [
  {
    period: '2024 — Present',
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Pranveer Singh Institute of Technology (PSIT)',
    location: 'Kanpur, Uttar Pradesh',
    score: 'CGPA: 8.9 / 10',
    highlights: [
      'Core coursework: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks.',
      'Active builder in Generative AI, RAG systems, and full-stack software engineering projects.',
    ],
  },
  {
    period: '2024',
    degree: 'Class XII — ISC (Science & Mathematics)',
    institution: 'Dr. Virendra Swarup Education Centre',
    location: 'Kanpur, Uttar Pradesh',
    score: '90.2%',
    highlights: ['Strong foundation in Mathematics, Computer Science, and analytical reasoning.'],
  },
  {
    period: '2022',
    degree: 'Class X — ICSE',
    institution: 'Dr. Virendra Swarup Education Centre',
    location: 'Kanpur, Uttar Pradesh',
    score: '92.8%',
    highlights: ['Distinction across STEM and foundational computing subjects.'],
  },
];

export const CURRENTLY_EXPLORING = [
  {
    title: 'Advanced DSA & Problem Solving',
    detail: 'Graph algorithms, segment trees, bitmask DP, and timed contest optimization.',
  },
  {
    title: 'LLM Application Development',
    detail: 'Structured tool-calling, prompt evaluation harnesses, and latency-aware inference.',
  },
  {
    title: 'AI Agents & RAG Systems',
    detail: 'Hybrid retrieval, semantic chunking, citation grounding, and vector indexing.',
  },
  {
    title: 'Scalable Backend Architecture',
    detail: 'Modular API design, caching layers, rate limiting, and clean data modeling.',
  },
  {
    title: 'Cloud Technologies',
    detail: 'Containerized deployments, serverless runtime patterns, and managed cloud services.',
  },
  {
    title: 'Production-Ready Software Engineering',
    detail: 'Type-safe end-to-end contracts, error boundaries, observability, and testing.',
  },
];

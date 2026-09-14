/**
 * Single source of truth for sitewide canonical facts, roles, and entities.
 */

export const PROFILE = {
  name: 'Vijayrajkumar',
  alternateName: 'Vijayrajkumar R',
  mainTitle: 'Chief Operating Officer & Co-Founder',
  shortTitle: 'COO & Co-Founder',
  city: 'Chennai',
  state: 'Tamil Nadu',
  country: 'India',
  location: 'Chennai, Tamil Nadu, India',
  base: 'Chennai, Tamil Nadu, India · On-site',
  email: 'vijaykumarunfounded@gmail.com',
  responseSla: '< 48 hours',
  shortBio:
    'Chennai-based Chief Operating Officer and venture builder operating across gig marketplaces, operational execution, and AI context infrastructure.',
  authorBio:
    'Vijayrajkumar is a Chennai-based Chief Operating Officer & Co-Founder at Unfounded, Ziggers, and LoopMemory, operating across gig marketplaces and AI context infrastructure.'
};

export const CURRENT_ROLES = [
  {
    company: 'Unfounded',
    role: 'Chief Operating Officer & Co-Founder',
    scope: 'Venture Studio Core',
    description: 'Incubating parallel high-conviction tech ventures through rapid prototyping and go-to-market execution.',
    link: '/about/'
  },
  {
    company: 'Ziggers',
    role: 'Chief Operating Officer & Co-Founder',
    scope: 'Local Gig-Economy Marketplace',
    description: 'Replacing informal WhatsApp hiring with geo-fenced worker check-ins and milestone escrow settlements.',
    link: '/ventures/ziggers/',
    external: 'https://www.ziggers.in/'
  },
  {
    company: 'LoopMemory',
    role: 'Chief Operating Officer & Co-Founder',
    scope: 'AI Context & Memory Infrastructure',
    description: 'Hierarchical memory layer for autonomous AI agents, eliminating multi-turn context rot and reducing token overhead.',
    link: '/ventures/loopmemory/',
    external: 'https://www.loopmemory.in/'
  }
];

export const KEY_PROOF_POINTS = [
  {
    metric: '< 5%',
    label: 'Worker No-Show Rate',
    context: 'Ziggers geo-fenced check-in vs. 40%+ on unorganized WhatsApp channels'
  },
  {
    metric: '< 2 Hrs',
    label: 'Escrow Settlement Time',
    context: 'Instant shift payouts vs. standard 15-30 day industry delays'
  },
  {
    metric: '68%',
    label: 'Prompt Token Reduction',
    context: 'LoopMemory hierarchical context triples vs. raw chat dumps'
  },
  {
    metric: '< 80ms',
    label: 'Memory Retrieval Latency',
    context: 'Semantic graph traversal across 50,000+ extracted facts'
  }
];

export const EDUCATION = [
  {
    degree: 'B.Sc. in Defence & Strategic Studies',
    institution: 'SRM Institute of Science and Technology (SRMIST)',
    period: '2023–2026',
    focus: 'Geopolitics, grand strategy, conflict dynamics, deterrence theory, and game theory.'
  },
  {
    degree: 'Master of Arts (MA) in Hindi Literature',
    institution: 'Dakshina Bharat Hindi Prachar Sabha',
    period: '2016–2021',
    focus: 'Linguistic morphology, literary history, dialectic analysis, and cross-cultural communication.'
  }
];

export const SOCIAL_LINKS = [
  {
    platform: 'LinkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vijayraj-kumar-3042b43a3/'
  },
  {
    platform: 'X',
    label: 'X (Twitter)',
    href: 'https://x.com/bigboy00106926'
  },
  {
    platform: 'GitHub',
    label: 'GitHub',
    href: 'https://github.com/vijayisking18vk-pixel'
  },
  {
    platform: 'Instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/vijayrajkumar_5405/'
  },
  {
    platform: 'Facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61580836342430'
  }
];

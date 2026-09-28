import { LeadMagnetData } from '@/types/lead-magnet';

export const DEFAULT_LEAD_MAGNET: LeadMagnetData = {
  id: 'viral-templates-101',
  category: 'VIRAL CONTENT FRAMEWORKS',
  title: '101 Winning Viral Templates That Get Results',
  subtitle: 'Proven hook, story, and thread formulas engineered from 100M+ organic impressions.',
  coverImage: '/assets/viral-templates-preview.svg',
  coverAspect: '4/3',
  previewBadge: 'Previewing: strategy, templates & examples',
  insideBullets: [
    'The 7 High-Converting Hook Archetypes with fill-in-the-blank starter prompts',
    'Visual Story Frameworks that hold attention past the 15-second drop-off mark',
    'Deconstructed teardowns of the 12 most viral LinkedIn and X posts of the year',
  ],
  buttonText: 'Access the templates',
  socialProof: '12,400+ downloads · Verified content · Updated 2026',
  copyright: '© 2026 Sahil Bloom. Distributed via Lead Magnet.',
  creator: {
    name: 'Sahil Bloom',
    eyebrow: 'Published by',
    avatar: '/assets/sahil-creator.svg',
    handle: '@sahilbloom',
    role: 'Founder & Author of The 5 Types of Wealth',
  },
  fileName: '101-Winning-Viral-Templates-Sahil-Bloom.pdf',
  fileSize: '4.8 MB',
  pagesCount: 48,
};

export const PRESET_LEAD_MAGNETS: Record<string, LeadMagnetData> = {
  'viral-templates-101': DEFAULT_LEAD_MAGNET,
  'system-design-cheatsheet': {
    id: 'system-design-cheatsheet',
    category: 'SOFTWARE ARCHITECTURE',
    title: 'Distributed System Design Primer & Cheatsheet',
    subtitle: 'Battle-tested scalability patterns, consensus tradeoffs, and real-world microservice blueprints.',
    coverImage: '/assets/system-design-preview.svg',
    coverAspect: '4/3',
    previewBadge: 'Previewing: architecture diagrams & cheat sheets',
    insideBullets: [
      '24 Step-by-step interview blueprints: Rate limiters, distributed caches, and geo-replicated databases',
      'The CAP theorem and consensus decision matrix for high-throughput production workloads',
      'Production incident post-mortems from top engineering teams with mitigation playbooks',
    ],
    buttonText: 'Get the architecture blueprints',
    socialProof: '28,900+ engineers enrolled · Production verified · Updated 2026',
    copyright: '© 2026 Alex Xu. Distributed via Lead Magnet.',
    creator: {
      name: 'Alex Xu',
      eyebrow: 'Published by',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      handle: '@alexxubyte',
      role: 'Author of System Design Interview series',
    },
    fileName: 'System-Design-Primer-2026.pdf',
    fileSize: '8.2 MB',
    pagesCount: 64,
  },
  'micro-saas-blueprint': {
    id: 'micro-saas-blueprint',
    category: 'BOOTSTRAPPING & REVENUE',
    title: 'Zero to $10k/mo Micro-SaaS Launchpad',
    subtitle: 'The no-BS playbook to validate, build, and market software without venture capital.',
    coverImage: '/assets/viral-templates-preview.svg',
    coverAspect: '4/3',
    previewBadge: 'Previewing: pricing tiers, launch checklist & scripts',
    insideBullets: [
      'The 4-hour validation framework: How to pre-sell software before writing a single line of code',
      'Cold outreach and organic distribution scripts that closed first 50 paying customers',
      'Stripe pricing & packaging templates optimized for annual billing and low churn',
    ],
    buttonText: 'Download the SaaS blueprint',
    socialProof: '9,150+ bootstrappers · Actionable frameworks · Updated 2026',
    copyright: '© 2026 Arvid Kahl. Distributed via Lead Magnet.',
    creator: {
      name: 'Arvid Kahl',
      eyebrow: 'Published by',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      handle: '@arvidkahl',
      role: 'Bootstrapped Founder & Author of The Embedded Entrepreneur',
    },
    fileName: 'Micro-SaaS-Launchpad-2026.pdf',
    fileSize: '5.4 MB',
    pagesCount: 52,
  },
};

/**
 * Downloads a synthesized demo PDF/Document so the user can immediately
 * verify the lead magnet file delivery experience.
 */
export function triggerSimulatedDownload(leadMagnet: LeadMagnetData, recipientName: string) {
  const content = `%PDF-1.4
% Lead Magnet Demo Document: ${leadMagnet.title}
% Prepared specifically for: ${recipientName || 'Valued Creator'}
% Delivery Timestamp: ${new Date().toISOString()}

============================================================
${leadMagnet.title.toUpperCase()}
============================================================
${leadMagnet.subtitle}

Curated by: ${leadMagnet.creator.name} (${leadMagnet.creator.handle})
Category: ${leadMagnet.category}
Verification: ${leadMagnet.socialProof}

INSIDE THIS DOSSIER:
${leadMagnet.insideBullets.map((b, i) => `${i + 1}. ${b}`).join('\n')}

---
EXCERPT FROM CHAPTER 1:
"The foundation of any viral content loop is psychological tension:
1. Break an established intuition with verifiable data.
2. Present a clean, reproducible framework.
3. Provide immediate operational utility that readers can apply in < 5 minutes."

[Full 48-page editorial dossier included in this download bundle]
${leadMagnet.copyright}
`;

  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = leadMagnet.fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

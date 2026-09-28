export type LayoutVariantId =
  | 'field-guide'
  | 'split-screen'
  | 'minimal-center'
  | 'dark-editorial'
  | 'magazine';

export interface CreatorProfile {
  name: string;
  eyebrow: string;
  avatar: string;
  handle: string;
  role: string;
}

export interface LeadMagnetData {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  coverImage: string;
  coverAspect: string;
  previewBadge: string;
  insideBullets: string[];
  buttonText: string;
  socialProof: string;
  copyright: string;
  creator: CreatorProfile;
  fileName: string;
  fileSize: string;
  pagesCount: number;
}

export interface LeadSubmission {
  id: string;
  name: string;
  email: string;
  timestamp: string;
  variant: LayoutVariantId;
  resourceId: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  fork: boolean;
  homepage: string | null;
  updated_at: string;
  created_at: string;
  archived: boolean;
}

export interface SiteConfig {
  nickname: string;
  tagline: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  bio: string;
  siteUrl: string;
  siteLanguage: string;
  homeTitle: string;
  titleSuffix: string;
  ogImageUrl: string;
  faviconPath: string;
  heroAriaLabel: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  techStackTitle: string;
  reposTitle: string;
  featuredBadge: string;
  demoLinkText: string;
  errorAuth: string;
  errorAuthLinkText: string;
  errorAuthLinkHref: string;
  errorRateLimit: string;
  errorGeneric: string;
  emptyRepos: string;
  footerTagline: string;
  footerCopyright: string;
  skipToContentText: string;
}

export interface TechStackConfig {
  categories: {
    order: string[];
    labels: Record<string, string>;
  };
  items: TechStackItem[];
}

export interface TechStackItem {
  name: string;
  icon: string;
  category: string;
  color: string;
}

export interface RepoOverride {
  description?: string;
  featured?: boolean;
  topics?: string[];
  displayOrder?: number;
}

export interface ReposConfig {
  exclude: string[];
  featured: string[];
  overrides: Record<string, RepoOverride>;
  maxDisplay: number;
}

export interface TransformedRepo {
  name: string;
  description: string;
  url: string;
  demoUrl: string | null;
  language: string;
  topics: string[];
  stars: number;
  updatedAt: string;
  isFeatured: boolean;
  displayOrder: number;
}

export interface GitHubAPIError {
  status: number;
  message: string;
  isRateLimited: boolean;
  isAuthError: boolean;
}

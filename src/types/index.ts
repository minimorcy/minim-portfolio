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
  /** Show the GitHub repos section */
  showGithubRepos: boolean;
  reposTitle: string;
  labsUrl: string;
  labsTitle: string;
  labsSubtitle?: string;
  labsCtaText: string;
  labsVisitText: string;
  labsLiveText: string;
  labsSoonText: string;
  /** Show apps with status "soon" in the portfolio */
  labsShowSoon: boolean;
  /** Slugs from the MînîM Labs feed to hide in the portfolio */
  labsExclude: string[];
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

export type TechContext = "work" | "personal";

export interface TechStackConfig {
  contexts: {
    work: { label: string; subtitle?: string };
    personal: { label: string; subtitle?: string };
    shared: { label: string; subtitle?: string };
  };
  items: TechStackItem[];
}

export interface TechStackItem {
  name: string;
  /** Simple Icons slug; without it a monogram is rendered */
  icon?: string;
  color?: string;
  context: TechContext[];
  /** Short usage note shown under the name */
  note?: string;
  /** false renders the item as a small secondary chip. Default: true */
  featured?: boolean;
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

export interface LabsApp {
  name: string;
  slug: string;
  url: string;
  description: { es: string; en: string };
  status: "live" | "soon";
  stack: string[];
  /** Result of the server-side health check (live apps only) */
  isUp: boolean;
}

export interface GitHubAPIError {
  status: number;
  message: string;
  isRateLimited: boolean;
  isAuthError: boolean;
}

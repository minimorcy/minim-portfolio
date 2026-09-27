import type { Localized } from '../i18n/utils';

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
  tagline: Localized;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  bio: Localized;
  siteUrl: string;
  homeTitle: Localized;
  titleSuffix: string;
  ogImageUrl: string;
  faviconPath: string;
  heroAriaLabel: Localized;
  ctaPrimaryText: Localized;
  ctaPrimaryHref: string;
  ctaSecondaryText: Localized;
  ctaLinkedinText: Localized;
  techStackTitle: Localized;
  /** Show the GitHub repos section */
  showGithubRepos: boolean;
  reposTitle: Localized;
  labsUrl: string;
  labsTitle: Localized;
  labsSubtitle?: Localized;
  labsCtaText: Localized;
  labsVisitText: Localized;
  labsLiveText: Localized;
  labsBuildingText: Localized;
  labsSoonText: Localized;
  /** Show apps with status "soon" in the portfolio */
  labsShowSoon: boolean;
  /** Slugs from the MînîM Labs feed to hide in the portfolio */
  labsExclude: string[];
  featuredBadge: Localized;
  demoLinkText: Localized;
  errorAuth: Localized;
  errorAuthLinkText: Localized;
  errorAuthLinkHref: string;
  errorRateLimit: Localized;
  errorGeneric: Localized;
  emptyRepos: Localized;
  footerTagline: Localized;
  footerCopyright: Localized;
  skipToContentText: Localized;
  languageSwitcherLabel: Localized;
}

export type TechContext = "work" | "personal";

export interface TechStackConfig {
  contexts: {
    work: { label: Localized; subtitle?: Localized };
    personal: { label: Localized; subtitle?: Localized };
    shared: { label: Localized; subtitle?: Localized };
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
  note?: Localized;
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

export interface FeaturedProject {
  name: Localized;
  summary: Localized;
  stack?: string[];
  /** Path under /public, e.g. "/projects/my-app.png" */
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  /** Shows the "private code" badge */
  private?: boolean;
  /** Online but still being built: shows the "under construction" badge */
  building?: boolean;
}

export interface FeaturedProjectsConfig {
  title: Localized;
  subtitle?: Localized;
  privateLabel: Localized;
  buildingLabel: Localized;
  demoLabel: Localized;
  repoLabel: Localized;
  projects: FeaturedProject[];
}

export interface LabsApp {
  name: string;
  slug: string;
  url: string;
  description: { es: string; en: string };
  /** "building": online but still under construction */
  status: "live" | "building" | "soon";
  stack: string[];
  /** Result of the server-side health check (online apps only) */
  isUp: boolean;
}

export interface GitHubAPIError {
  status: number;
  message: string;
  isRateLimited: boolean;
  isAuthError: boolean;
}

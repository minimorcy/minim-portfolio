import { GITHUB_TOKEN } from 'astro:env/server';
import type {
  GitHubRepo,
  TransformedRepo,
  ReposConfig,
  GitHubAPIError,
} from '../types';

const CACHE_TTL_MS = 600_000;
const API_VERSION = '2026-03-10';

const cache = new Map<string, { data: GitHubRepo[]; timestamp: number }>();

function buildError(
  status: number,
  message: string,
  rateLimitReset?: string | null
): GitHubAPIError {
  const isAuthError = status === 401;
  const isRateLimited = status === 403;

  if (isRateLimited && rateLimitReset) {
    const resetSeconds = parseInt(rateLimitReset, 10);
    const retryAfterMinutes = Math.ceil((resetSeconds * 1000 - Date.now()) / 60000);
    return {
      status,
      message: `${message} — retry after ${retryAfterMinutes} min`,
      isRateLimited: true,
      isAuthError: false,
    };
  }

  return {
    status,
    message,
    isRateLimited,
    isAuthError,
  };
}

export async function fetchGithubRepos(
  username: string
): Promise<{ repos: GitHubRepo[]; error: GitHubAPIError | null }> {
  const cacheKey = `repos:${username}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return { repos: cached.data, error: null };
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100`;

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': API_VERSION,
      },
    });
  } catch {
    return {
      repos: [],
      error: buildError(0, 'Network error reaching GitHub API'),
    };
  }

  if (!response.ok) {
    const rateLimitReset = response.headers.get('x-ratelimit-reset');
    let message: string;

    switch (response.status) {
      case 401:
        message = 'Invalid or missing GitHub token';
        break;
      case 403:
        message = 'GitHub API rate limit exceeded';
        break;
      case 500:
      case 502:
        message = 'GitHub server error — try again later';
        break;
      default:
        message = `GitHub API error: ${response.status} ${response.statusText}`;
    }

    return {
      repos: [],
      error: buildError(response.status, message, rateLimitReset),
    };
  }

  let rawRepos: unknown;
  try {
    rawRepos = await response.json();
  } catch {
    return {
      repos: [],
      error: buildError(0, 'Failed to parse GitHub API response'),
    };
  }

  if (!Array.isArray(rawRepos)) {
    return {
      repos: [],
      error: buildError(0, 'Unexpected GitHub API response format'),
    };
  }

  const repos: GitHubRepo[] = rawRepos.map((r: unknown) => {
    const repo = r as Record<string, unknown>;
    return {
      id: Number(repo.id),
      name: String(repo.name),
      description: repo.description === null ? null : String(repo.description),
      html_url: String(repo.html_url),
      language: repo.language === null ? null : String(repo.language),
      topics: Array.isArray(repo.topics) ? repo.topics.map((t) => String(t)) : [],
      stargazers_count: Number(repo.stargazers_count),
      fork: Boolean(repo.fork),
      homepage: repo.homepage === null ? null : String(repo.homepage),
      updated_at: String(repo.updated_at),
      created_at: String(repo.created_at),
      archived: Boolean(repo.archived),
    };
  });

  cache.set(cacheKey, { data: repos, timestamp: Date.now() });
  return { repos, error: null };
}

export function transformRepos(
  rawRepos: GitHubRepo[],
  config: ReposConfig
): TransformedRepo[] {
  const filtered = rawRepos.filter(
    (r) =>
      r.fork === false &&
      r.archived === false &&
      !config.exclude.includes(r.name)
  );

  const mapped = filtered.map((r) => {
    const override = config.overrides[r.name] ?? {};
    const description =
      override.description ??
      r.description ??
      `A ${r.language || 'code'} project`;
    const demoUrl = r.homepage || null;
    const topics = override.topics ?? r.topics ?? [];
    const isFeatured =
      config.featured.includes(r.name) || override.featured === true;
    const displayOrder = override.displayOrder ?? 999;

    return {
      name: r.name,
      description,
      url: r.html_url,
      demoUrl,
      language: r.language || 'Unknown',
      topics,
      stars: r.stargazers_count,
      updatedAt: r.updated_at,
      isFeatured,
      displayOrder,
    };
  });

  const sorted = mapped.sort((a, b) => {
    if (a.displayOrder !== b.displayOrder) {
      return a.displayOrder - b.displayOrder;
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const maxDisplay = config.maxDisplay ?? 8;
  return sorted.slice(0, maxDisplay);
}

export async function getPortfolioRepos(
  username: string,
  config: ReposConfig
): Promise<{ repos: TransformedRepo[]; error: GitHubAPIError | null }> {
  try {
    const { repos: rawRepos, error: fetchError } = await fetchGithubRepos(username);

    if (fetchError) {
      return { repos: [], error: fetchError };
    }

    const transformed = transformRepos(rawRepos, config);
    return { repos: transformed, error: null };
  } catch {
    return {
      repos: [],
      error: buildError(0, 'Unexpected error while loading portfolio repos'),
    };
  }
}

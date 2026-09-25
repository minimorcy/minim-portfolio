import type { LabsApp } from '../types';

const CACHE_TTL_MS = 300_000;
const TIMEOUT_MS = 3_000;
const HEADERS = { 'User-Agent': 'minim-portfolio (+https://minim-labs.app)' };

let cache: { data: LabsApp[]; timestamp: number } | null = null;

type RawApp = Omit<LabsApp, 'isUp'>;

function parseApp(value: unknown): RawApp | null {
  const app = value as Record<string, unknown>;
  const description = app?.description as Record<string, unknown> | undefined;
  if (
    typeof app?.name !== 'string' ||
    typeof app.slug !== 'string' ||
    typeof app.url !== 'string' ||
    !app.url.startsWith('https://') ||
    typeof description?.es !== 'string' ||
    (app.status !== 'live' && app.status !== 'soon')
  ) {
    return null;
  }

  return {
    name: app.name,
    slug: app.slug,
    url: app.url,
    description: {
      es: description.es,
      en: typeof description.en === 'string' ? description.en : description.es,
    },
    status: app.status,
    stack: Array.isArray(app.stack) ? app.stack.map(String) : [],
  };
}

async function isReachable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: HEADERS,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.headers.get('cf-mitigated')) {
      console.warn(`[labs] ${url} blocked by Cloudflare (cf-mitigated: ${response.headers.get('cf-mitigated')})`);
    }
    // Anything below 500 means the server is answering (some reject HEAD with 405).
    // 403 is excluded because it's what Cloudflare returns when it challenges the request.
    const isUp = response.status < 500 && response.status !== 403;
    if (!isUp) console.warn(`[labs] ${url} not reachable: HTTP ${response.status}`);
    return isUp;
  } catch (error) {
    console.warn(`[labs] ${url} not reachable:`, error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Loads the public app feed from MînîM Labs and checks which live apps respond.
 * Never throws: on any failure it returns an empty list so the section hides itself.
 */
export async function getLabsApps(labsUrl: string): Promise<LabsApp[]> {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL_MS) {
    return cache.data;
  }

  const data = await loadApps(labsUrl);
  // Failures are cached too, so a down feed doesn't add a timeout to every request
  cache = { data, timestamp: Date.now() };
  return data;
}

async function loadApps(labsUrl: string): Promise<LabsApp[]> {
  try {
    const response = await fetch(new URL('/projects.json', labsUrl), {
      headers: HEADERS,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn(`[labs] feed returned HTTP ${response.status} (cf-mitigated: ${response.headers.get('cf-mitigated') ?? 'no'})`);
      return [];
    }

    const body = (await response.json()) as { apps?: unknown };
    if (!Array.isArray(body.apps)) return [];

    const apps = body.apps.map(parseApp).filter((app): app is RawApp => app !== null);

    return await Promise.all(
      apps.map(async (app) => ({
        ...app,
        isUp: app.status === 'live' ? await isReachable(app.url) : false,
      }))
    );
  } catch (error) {
    console.warn('[labs] feed not reachable:', error instanceof Error ? error.message : error);
    return [];
  }
}

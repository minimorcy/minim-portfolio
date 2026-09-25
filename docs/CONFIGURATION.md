# Configuration reference

All site content is managed through JSON files in `src/config/`. Edit these files to personalize the portfolio without touching component code.

| File | Purpose |
|------|---------|
| `site.json` | All text content: profile, hero, sections, errors, footer, a11y |
| `tech-stack.json` | Technologies displayed on the site, split by context (work / personal) |
| `featured-projects.json` | Hand-written case studies (public or private) |
| `repos-config.json` | GitHub repo filtering, featured repos, display overrides |

### site.json — All Text Content

All visible strings in the portfolio are defined here, grouped by category.

#### Profile

| Field | Type | Description |
|-------|------|-------------|
| `nickname` | `string` | Display name with glitch effect |
| `tagline` | `string` | Subtitle shown below the name |
| `bio` | `string` | About-me paragraph |
| `githubUsername` | `string` | GitHub username for API queries |
| `githubUrl` | `string` | Profile link to GitHub |
| `linkedinUrl` | `string` | Profile link to LinkedIn |

#### Site / SEO

| Field | Type | Description |
|-------|------|-------------|
| `siteUrl` | `string` | Canonical site URL |
| `siteLanguage` | `string` | HTML `lang` attribute |
| `homeTitle` | `string` | `<title>` for the home page |
| `titleSuffix` | `string` | Suffix appended to page titles |
| `ogImageUrl` | `string` | Open Graph image URL |
| `faviconPath` | `string` | Path to favicon file |

#### Hero Section

| Field | Type | Description |
|-------|------|-------------|
| `heroAriaLabel` | `string` | `aria-label` for the hero section |
| `ctaPrimaryText` | `string` | Primary CTA button label |
| `ctaPrimaryHref` | `string` | Primary CTA link target (external URLs open in a new tab) |
| `ctaSecondaryText` | `string` | GitHub button label |
| `ctaLinkedinText` | `string` | LinkedIn button label |

#### Section Titles & Badges

| Field | Type | Description |
|-------|------|-------------|
| `techStackTitle` | `string` | Heading for the tech stack section |
| `showGithubRepos` | `boolean` | Show the GitHub repos section |
| `reposTitle` | `string` | Heading for the repos section |
| `featuredBadge` | `string` | Badge text for featured repos |
| `demoLinkText` | `string` | Label for demo/external links |

#### Live apps (MînîM Labs)

| Field | Type | Description |
|-------|------|-------------|
| `labsUrl` | `string` | Hub base URL. The feed is read from `<labsUrl>/projects.json` |
| `labsTitle` / `labsSubtitle` | `string` | Section heading and subtitle |
| `labsCtaText` / `labsVisitText` | `string` | "See all" button and per-card link labels |
| `labsLiveText` / `labsSoonText` | `string` | Status badge labels |
| `labsShowSoon` | `boolean` | Show apps with status `soon` |
| `labsExclude` | `string[]` | Slugs from the feed to hide |

#### Error Messages

| Field | Type | Description |
|-------|------|-------------|
| `errorAuth` | `string` | Auth error message |
| `errorAuthLinkText` | `string` | Link text inside auth error |
| `errorAuthLinkHref` | `string` | Link target inside auth error |
| `errorRateLimit` | `string` | Rate-limit error message |
| `errorGeneric` | `string` | Generic API error message |
| `emptyRepos` | `string` | Message when no repos match filters |

#### Footer

| Field | Type | Description |
|-------|------|-------------|
| `footerTagline` | `string` | Short tagline in the footer |
| `footerCopyright` | `string` | Copyright/credit line |

#### Accessibility

| Field | Type | Description |
|-------|------|-------------|
| `skipToContentText` | `string` | Skip-to-content link text |

### tech-stack.json — Technology Stack

The stack opens with a highlighted **core** block (technologies used both at work and at home), which branches into two columns: **work** and **personal projects**.

| Field | Type | Description |
|-------|------|-------------|
| `contexts.work` | `{ label, subtitle? }` | Heading and subtitle of the work column |
| `contexts.personal` | `{ label, subtitle? }` | Heading and subtitle of the personal column |
| `contexts.shared` | `{ label, subtitle? }` | Heading of the highlighted "core" block shown first (technologies used in both) |
| `items` | `TechStackItem[]` | Array of technology items |

Each item in `items` has:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Technology display name |
| `context` | `("work" \| "personal")[]` | Where you use it. Both values → shown in the core block |
| `icon` | `string` | (Optional) Simple Icons slug. Without it, a monogram with the first two letters is rendered |
| `color` | `string` | (Optional) Hex brand color |
| `note` | `string` | (Optional) Short usage note shown under the name |
| `featured` | `boolean` | (Optional, default `true`) `false` renders the item as a small chip below the main grid |

#### Adding a technology

```json
{ "name": "Laravel", "icon": "laravel", "color": "#FF2D20", "context": ["work"] }
```

Use `"featured": false` for secondary technologies so the main grid stays short.

### featured-projects.json — Featured projects

Hand-written case studies, so private projects can be shown too. The section is hidden while `projects` is empty. The file contains an `_ejemplo` entry with every field — copy it into `projects`.

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Project name |
| `summary` | `string` | Problem → what you did → result, in one or two sentences |
| `stack` | `string[]` | (Optional) Technologies |
| `image` | `string` | (Optional) Path under `public/`, e.g. `/projects/my-app.png` (cropped to 16:9) |
| `demoUrl` / `repoUrl` | `string` | (Optional) Links |
| `private` | `boolean` | (Optional) Shows the "private code" badge |

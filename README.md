# &lt;MînîM /&gt; Portfolio

Fast personal portfolio built with Astro 5+ hybrid rendering, showcasing curated GitHub repositories with a "Dark Tech with AI Soul" aesthetic. Features a glitch-effect nickname, JSON-managed tech stack, and secure GitHub API integration.

## Tech Stack

- **Astro 5+** — Hybrid SSR (static pages + server-rendered API routes)
- **Tailwind CSS** — Utility-first styling
- **@astrojs/node** — Node.js server adapter
- **TypeScript** — Type-safe development

## Quick Start

```bash
# Clone the repository
git clone https://github.com/minimorcy/portfolio-minim.git
cd portfolio-minim

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your GitHub PAT

# Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Customization

All site content is managed through JSON files in `src/config/`. Edit these files to personalize the portfolio without touching component code.

| File | Purpose |
|------|---------|
| `site.json` | All text content: profile, hero, sections, errors, footer, a11y |
| `tech-stack.json` | Technologies displayed on the site, split by context (work / personal) |
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
| `ctaPrimaryHref` | `string` | Primary CTA link target |
| `ctaSecondaryText` | `string` | Secondary CTA button label |

#### Section Titles & Badges

| Field | Type | Description |
|-------|------|-------------|
| `techStackTitle` | `string` | Heading for the tech stack section |
| `reposTitle` | `string` | Heading for the repos section |
| `featuredBadge` | `string` | Badge text for featured repos |
| `demoLinkText` | `string` | Label for demo/external links |

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

## Token Setup

The portfolio uses the GitHub API to fetch repository data. You need a Personal Access Token (PAT) to authenticate requests.

See [docs/PAT-GUIDE.md](docs/PAT-GUIDE.md) for step-by-step instructions.

## Deployment

The portfolio is designed for deployment on CapRover (Docker-based PaaS).

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for CapRover setup, GitHub auto-deploy, and manual Dockerfile build instructions.

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
| `tech-stack.json` | Technologies displayed on the site (name, icon, color, category) |
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

#### Experience Section

| Field | Type | Description |
|-------|------|-------------|
| `experienceTitle` | `string` | Heading for the experience narrative section |
| `proBadgeAria` | `string` | Accessibility label for the PRO badge |

### tech-stack.json — Technology Stack

| Field | Type | Description |
|-------|------|-------------|
| `categories.order` | `string[]` | Display order of category keys |
| `categories.labels` | `Record<string, string>` | Human-readable labels for each category |
| `items` | `TechStackItem[]` | Array of technology items |

Each item in `items` has:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Technology display name |
| `icon` | `string` | Simple Icons slug for the icon |
| `color` | `string` | Hex color for the icon |
| `category` | `string` | Key matching one of `categories.order` |
| `level` | `string` | (Optional) Proficiency level: `core`, `familiar`, or `touched`. Affects visual rendering via CSS filter. |
| `pro` | `boolean` | (Optional) If `true`, displays a "PRO" badge indicating professional/work experience without public repos. |

**Levels**: `core` items render at full color, `familiar` items are desaturated, `touched` items are grayscale. Items without a `level` default to `core` behavior.

#### Adding a New Category

To add a new category (e.g., "DevOps"):

1. Add to `categories.order`:
   ```json
   "order": ["languages", "frontend", "backend", "devops", "ia", "tools"]
   ```
2. Add to `categories.labels`:
   ```json
   "labels": { ..., "devops": "DevOps" }
   ```
3. Add items with `"category": "devops"` to the `items` array.

### experience.json — Experience Narrative

| Field | Type | Description |
|-------|------|-------------|
| `groups` | `ExperienceGroup[]` | Array of 3 intensity groups: `daily`, `project`, `explored` |

Each group has:

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | One of: `daily`, `project`, `explored` |
| `items` | `ExperienceItem[]` | Technologies in this group |

Each item in `items` has:

| Field | Type | Description |
|-------|------|-------------|
| `name` | `string` | Technology display name |
| `note` | `string` | Brief context/usage description |
| `icon` | `string` | (Optional) Simple Icons slug |
| `color` | `string` | (Optional) Hex color for the icon |

**Groups**: `daily` is expanded by default (everyday tools), `project` and `explored` are collapsed (click to expand). Items without an `icon` field render as text-only.

## Token Setup

The portfolio uses the GitHub API to fetch repository data. You need a Personal Access Token (PAT) to authenticate requests.

See [docs/PAT-GUIDE.md](docs/PAT-GUIDE.md) for step-by-step instructions.

## Deployment

The portfolio is designed for deployment on CapRover (Docker-based PaaS).

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for CapRover setup, GitHub auto-deploy, and manual Dockerfile build instructions.

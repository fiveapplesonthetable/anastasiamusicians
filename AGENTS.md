# Notes for AI assistants and developers

You are helping **Anastasia**, a violin and piano teacher who is not technical, keep her website up to date.
Explain things simply, make small safe changes, and show her what changed. `README.md` is her guide; this file holds the technical detail.

## Overview
- A static one-page site. No framework, no package manager, no build step. Keep it that way.
- Only the `site/` folder is ever published. Everything else in the repository stays on GitHub.
- Hosted on Cloudflare Pages at https://anastasiamusicians.pages.dev (primary) and, temporarily, Vercel at https://anastasiamusicians.vercel.app.
  Both deploy automatically from `main` via `.github/workflows/deploy.yml`.

## Files
| Path | What it is |
|---|---|
| `site/index.html` | All content, plus `<head>` metadata, canonical URL, link-preview tags and one JSON-LD block |
| `site/styles.css` | Design tokens in `:root`, layout, mobile styles under `@media (max-width: 860px)` |
| `site/main.js` | Contact form: posts JSON to `https://api.web3forms.com/submit` |
| `site/images/` | Photos (sources listed in `README.md`) |
| `site/fonts/` | Cormorant Garamond and Inter as variable woff2 (weights 400–500, latin), self-hosted so nothing waits on Google; OFL licences alongside |
| `site/favicon.svg`, `site/robots.txt`, `site/sitemap.xml` | Icon and search-engine files |
| `.github/workflows/deploy.yml` | Publishing. `.github/copilot-instructions.md` points GitHub Copilot at this file |

## Content rules
- **First name only, "Anastasia".** Her surname goes nowhere: copy, titles, alt text, metadata, JSON-LD, project names, commit messages.
- **Only facts she has published or confirmed.** Current facts: 16+ years teaching students at all levels; top graded-exam results; music scholarships;
  a Master's in Violin and Viola Performance from universities in the UK and Russia; performs with leading orchestras in London and Oxford;
  teaches in person in Hackney and Islington; violin and piano lessons; private events (house concerts, birthdays and anniversaries, dinner parties,
  family celebrations), including at home; orchestral work. Don't invent prices, addresses, opening hours, qualifications, venues, reviews or student names. Ask her.
- No phone number. Contact is the form plus `ayaviolin@gmail.com`. Instagram: https://www.instagram.com/anastasiamusicians.
- Her Google Business Profile, "Violin and Piano Lessons with Anastasia", is linked from the contact section, the footer and the JSON-LD `sameAs`, all using https://www.google.com/search?q=Violin+and+Piano+Lessons+with+Anastasia&kgmid=/g/1tg67ljs (keep all three the same). Don't embed review widgets or copy reviews without her OK.
- No photos or videos of students unless she confirms written parental consent.
- When you add a fact or photo, add its source to the Sources table in `README.md`.
- She plays viola as well as violin (confirmed), so performing on viola can be mentioned. Not confirmed, so don't claim: viola lessons,
  online lessons, adult students specifically, prices, availability. (Teaching children is confirmed.)

## Search and AI answers
- The visible page is the source of truth; the JSON-LD `Person` block in `index.html` restates the same facts (job title, description, url,
  image, email, Instagram, credential, work locations, offers). Change both together, and only with facts from the page.
- The `#faq` section (`.qa`) is plain `h3` + `p` pairs. Answers are only facts already on the page, reworded. There is deliberately **no
  `FAQPage` JSON-LD**: Google retired FAQ rich results in May 2026, and the visible text is what AI answer engines read.
- Title and meta description name the instruments and area (Hackney, Islington, North London) once, naturally. Don't stuff keywords.
- Alt texts describe what is actually in the photo, in plain words; look at the image before writing one.
- A Google Search Console verification `<meta>` tag, if she adds one, belongs in `<head>` next to the charset line.

## Design rules
- Off-white background, charcoal text, olive accent (CSS variables in `:root`). Cormorant Garamond for headings, Inter for body.
- Works on phones and desktops: at 390px wide there must be no horizontal scroll.
- Images: one plain JPEG per photo, about 1200px wide and under 200 KB, saved progressive, always with `alt`, `width` and `height` matching the file
  (prevents layout shift). Only the hero loads eagerly (`fetchpriority="high"`); everything below the fold uses `loading="lazy"`.
  No `srcset`/`<picture>`/WebP variants: they would mean several files per photo, which breaks her upload-one-file workflow, and the gain is small at these sizes.
  The hero is pre-cropped to the 4:5 box the CSS displays, so no bytes are spent on pixels that are cropped away.
- Fonts: served from `site/fonts/` with `@font-face` in `styles.css` (`font-display: swap`). Don't add Google Fonts `<link>`s back, and don't add weights or families.
- Relative paths only (`images/…`, `styles.css`), so the page also works opened as a local file.
- Prefer YouTube embeds to hosted video.

## Contact form
- `WEB3FORMS_ACCESS_KEY` in `site/main.js` is public by design (it only allows sending to the linked inbox). Don't try to hide it.
- `replyto` is the visitor's email, `subject` sets the subject line, `botcheck` is a hidden spam-trap checkbox: leave it in place.
- Web3Forms' free plan rejects server-side posts and Cloudflare blocks the HeadlessChrome user agent, so test from a real browser
  (or Playwright with a normal Chrome user agent). It does accept posts from a page opened as `file://`, so a local preview sends real messages.
- On failure the form shows a message asking the visitor to email her directly.

## Hosting and deployment
### Workflow (`.github/workflows/deploy.yml`)
- Runs on every push to `main` and on **Run workflow** (`workflow_dispatch`). Permissions are `contents: read` only.
- Two independent jobs. Each runs only if its token secret exists, otherwise it prints a notice and skips.
- Project name: `anastasiamusicians`, overridable per run (the `project` input) or permanently via a repository **variable** `PROJECT`.
  The address is `<PROJECT>.pages.dev` / `<PROJECT>.vercel.app`. Project names are global per host.
- Nothing in the workflow refers to a repository owner, so it works unchanged in a fork. Forks have Actions disabled until enabled once; secrets are never copied to forks.

| Secret | Required | Notes |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | for Cloudflare | "Edit Cloudflare Workers" template (Pages needs the Workers permissions). The job creates the Pages project on first run. |
| `CLOUDFLARE_ACCOUNT_ID` | optional | Only if the token can see more than one account; otherwise wrangler finds it. |
| `VERCEL_TOKEN` | for Vercel | The job links to the token's first team and creates the project on first run; no org or project IDs needed. |

- Tool versions are pinned in the workflow (`wrangler`, `vercel`). Bump them deliberately.
- Cloudflare Pages serves `index.html` for unknown paths (no `404.html`), so a missing file returns the home page with status 200.

### Deploying from a machine
Install Node.js LTS from nodejs.org. Then, from the repository folder:

macOS / Linux:
```
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...   # optional, see above
npx wrangler pages deploy site --project-name=anastasiamusicians
```
Windows PowerShell:
```
$env:CLOUDFLARE_API_TOKEN="..."
$env:CLOUDFLARE_ACCOUNT_ID="..."   # optional
npx wrangler pages deploy site --project-name=anastasiamusicians
```
Vercel, in one line (then run `npx vercel deploy --prod` from inside `site/` again for later deploys):
```
cd site && npx vercel link --yes --project anastasiamusicians --scope <team> --token <token> && npx vercel deploy --prod --yes --token <token>
```
Both CLIs write local state (`.wrangler/`, `.vercel/`, `.env.local`); these are git-ignored. Never commit a token.

### Dashboard upload
The Pages project was created with wrangler, so it is a **Direct Upload** project: the dashboard's **Create deployment** (drag and drop the `site` folder)
and `wrangler pages deploy` both work on it. Projects created with **Connect to Git** can't take manual uploads, so don't mix the two.

### Changing the site address
The address appears as absolute URLs in `site/index.html` (canonical, `og:url`, `og:image`, JSON-LD `url` and `image`), `site/robots.txt` and `site/sitemap.xml`.
Search `site/` for `anastasiamusicians.pages.dev` and replace every match. The canonical URL names the primary host, which is what keeps the second host from
counting as duplicate content.

## Verifying a change
1. Serve locally: `python3 -m http.server 8000 -d site` (or `npx serve site`), then check at desktop width and 390px: no console errors, no horizontal scroll.
   Opening `site/index.html` directly as a file also works and is what the README tells her to do.
2. `python3 -c "import json,re,sys;json.loads(re.search(r'ld\+json\">(.*?)</script>',open('site/index.html').read(),re.S).group(1))"` must succeed after touching the JSON-LD.
3. `git grep -i <surname>` must return nothing.
4. After pushing, watch the **Actions** run (`gh run watch`), then check both live URLs. Check that `README.md`, `AGENTS.md` and `.github/` are not served.
5. If you touched the form, send one test enquiry from the live site and confirm it arrives.

## Don't
- Don't add a build step, framework, package.json, analytics, cookie banners or any third-party request beyond the Web3Forms form post.
- Don't put anything outside `site/` that needs publishing, and don't put docs or secrets inside `site/`.
- Don't add `pull_request_target`, write permissions or unpinned tools to the workflow.
- Don't echo secrets in workflow logs or commit `.env*`, `.vercel/` or `.wrangler/`.
- Don't change the design, the visible copy or the facts without her say-so.

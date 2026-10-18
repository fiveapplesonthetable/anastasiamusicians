# Notes for AI assistants (and developers)

You are helping **Anastasia**, a violin and piano teacher who is not technical, keep her website up to date.
Explain things simply, make small, safe changes and show her what changed.

## The site
- A static, single page: `index.html` (content), `styles.css`, `main.js` (contact form) and `images/`. There is no build step, framework or package manager. Keep it that way.
- It is hosted on Vercel, project `anastasiamusicians`. Pushing to `main` deploys automatically (`.github/workflows/deploy.yml`). To deploy by hand, run `vercel deploy --prod`.
- The contact form posts JSON from the browser to `https://formsubmit.co/ajax/<FORM_EMAIL>`, and FormSubmit emails the message on.
  - `FORM_EMAIL` is the constant at the top of `main.js`.
  - The visitor's `email` field becomes the Reply-To, and `_subject` sets the subject line.
  - `_honey` is a hidden spam trap. Leave it in place.
  - FormSubmit needs a one-time **activation per page URL** (Origin/Referer). The first submission from a new domain triggers an "Activate FormSubmit" email to `FORM_EMAIL`, and nothing is delivered until she clicks it. Remind her whenever the domain changes.
  - A successful response has `success: "true"`, as a string.

## Content rules (important)
- **Use her first name only, "Anastasia".** Don't add her surname anywhere: copy, titles, alt text, metadata, project names or commit messages.
- **Only state facts she has published or told you.** The bio wording comes from her original site: 16+ years teaching students at all levels; top exam results; music scholarships; a Master's in Violin and Viola Performance from universities in the UK and Russia; performing with leading orchestras in London and Oxford. Don't invent locations, prices, qualifications, venues, reviews or student names. If something is missing, ask her.
- Lessons offered: **violin and piano**. Private events (including at home) and orchestral work are also offered.
- Don't add a phone number. Contact is the form plus `ayaviolin@gmail.com` only.
- Never publish photos or videos of students (children) unless she confirms written parental consent.

## Design rules
- Minimal and calm: an off-white background, charcoal text and an olive-green accent (CSS variables in `:root` in `styles.css`). Cormorant Garamond for headings, Inter for body text.
- The page must work on phones and desktops. At 390px wide there must be no horizontal scrolling, and the mobile styles are under `@media (max-width: 860px)` in `styles.css`.
- Keep images reasonably small, under about 300 KB each and around 1200–2000px wide. Always set `alt`, `width` and `height`.
- Prefer YouTube embeds over hosting video files.
- If the domain changes, update the `og:url` and `og:image` URLs in `index.html`, and remind her to activate FormSubmit for the new address.
- When you add a fact or photo, add its source to the Sources table in `README.md`.

## Checking a change
1. Serve it locally with `python3 -m http.server 8000` and check at desktop and phone widths.
2. After deploying, open the live URL and send one test enquiry if you touched the form.

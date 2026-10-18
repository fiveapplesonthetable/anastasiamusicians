# Anastasia's website

A one-page site for violin and piano lessons, private events and orchestral work, with a contact form.
Nothing to install, nothing to pay for: the site is free to host, and every change is published automatically.

**Live site:** https://anastasiamusicians.pages.dev

1. [What's in this folder](#whats-in-this-folder)
2. [Editing the site](#editing-the-site)
3. [Publishing](#publishing)
4. [The contact form](#the-contact-form)
5. [Taking it over yourself](#taking-it-over-yourself-fork-it-and-own-it)
6. [Using your own domain](#using-your-own-domain-optional)
7. [Getting found on Google and AI search](#getting-found-on-google-and-ai-search)
8. [Sources](#sources)

## What's in this folder

| | |
|---|---|
| `site/` | **The website.** This folder, and only this folder, is published. |
| `site/index.html` | All the words and the page layout |
| `site/styles.css` | Colours, fonts and spacing |
| `site/main.js` | The contact form |
| `site/images/` | The photos |
| `README.md` | This guide |
| `AGENTS.md` | Technical notes for AI assistants and helpers |
| `.github/` | The automatic publishing |

## Editing the site

Everything can be done on github.com in the browser. Each saved change ("commit") is published within about a minute.

### Change some text
1. Open `site/index.html` and click the **pencil icon** (Edit).
2. Find the sentence with Ctrl+F (Windows) or Cmd+F (Mac).
3. Change only the words **between** the tags. In `<h3>Violin</h3>`, change only `Violin`.
4. Click **Commit changes**.

| Section | Search for |
|---|---|
| Top menu and Instagram icon | `<header>` |
| Opening section with the main photo | `class="hero"` |
| Lessons | `id="lessons"` |
| About | `id="about"` |
| Private events | `id="events"` |
| Orchestral | `class="orchestral` |
| Common questions | `id="faq"` |
| Contact form | `id="contact"` |
| Reviews (quotes from Google) | `id="reviews"` |
| Bottom line (email, Instagram, Google reviews) | `<footer>` |

### Change or add a photo
1. Shrink the photo first, so the page stays fast: open squoosh.app (free, nothing to install), drop the photo in, set the width
   to about 1200 pixels under **Resize**, and click the download button. Aim for a file under 200 KB.
2. Open `site/images/` and choose **Add file → Upload files**. Use a short name with no spaces, such as `concert-2026.jpg`.
3. In `site/index.html`, find the old photo name (for example `images/portrait.jpg`) and replace it with the new one.
4. Update the `alt="…"` text next to it so it briefly describes the new photo, and the `width="…" height="…"` to the new photo's size in pixels.

| Photo | Where it appears |
|---|---|
| `images/portrait.jpg` | Top of the page (also used in link previews) |
| `images/sofa-portrait.jpg` | About |
| `images/at-home.jpg` | Private events |
| `images/orchestra.jpg` | Orchestral |

### Add a video
Upload it to YouTube, click **Share → Embed**, and paste the code into `site/index.html` where it should appear.
Video files uploaded to the site itself make it slow.

### Change a review quote
In `site/index.html`, find `id="reviews"`. Each quote sits between `<blockquote>` and `</blockquote>`, with the name underneath.
Copy the new quote exactly from Google (shorten it only with "…"), and write the name as first name plus initial, such as `Claire M.`.

### Colours and fonts
At the top of `site/styles.css`. For example, `--olive: #556036;` is the green used for buttons.

### Editing with Copilot (optional)
On github.com, open the repository and click the **Copilot** icon at the top of the page to chat. Ask in plain English, for example
*"Change the Violin lesson text to: All levels, from first notes to diploma."* or *"Replace the main photo with images/concert.jpg."*
Copilot proposes the change; read it, then commit it. It is published like any other edit.
Copilot has a free plan with monthly limits and paid plans; see github.com/features/copilot/plans. The repository already contains the rules it should follow (`AGENTS.md`).

### Preview before publishing
1. On the repository page, click **Code → Download ZIP**, then unzip it. Windows: right-click the ZIP → **Extract All**. Mac: double-click the ZIP.
2. Open the `site` folder and double-click `index.html`. Windows hides file extensions, so it may show as just **index** with a browser icon;
   if it opens in the wrong program, right-click → **Open with** → Chrome or Edge. Mac: double-click, or right-click → **Open With** → Safari or Chrome.

The page then looks exactly as it will online. The contact form in the preview is real: it sends messages too.

## Publishing

### Automatic
Every commit on GitHub publishes the site within about a minute. To watch it happen, open the **Actions** tab.
A green tick means it's live; a red cross means something went wrong, and clicking it shows what.

### By hand (drag and drop, no GitHub needed)
1. Get the files: **Code → Download ZIP** on the repository page, then unzip (see Preview above).
2. Log in at dash.cloudflare.com and go to **Workers & Pages → anastasiamusicians → Create deployment**.
3. Drag the `site` folder from File Explorer (Windows) or Finder (Mac) into the browser window and confirm the deployment.

## The contact form

Messages are emailed by **Web3Forms** (web3forms.com) to the inbox linked to the site's access key, with a subject like
`Website enquiry: Lessons from Jane Smith`. Pressing **Reply** answers the person who wrote.

- The access key is `WEB3FORMS_ACCESS_KEY` at the top of `site/main.js`. It is meant to be public: it can only *send* a message to the inbox, nothing else.
- To change the inbox, get a new key on web3forms.com for the new address and paste it into `site/main.js`.
- Messages not arriving? Check **Spam** and **Promotions** in Gmail.
- If Web3Forms is ever down, the form asks visitors to email ayaviolin@gmail.com directly.

## Taking it over yourself ("fork it and own it")

Fork the repository into your own GitHub account; from then on, your copy is the real site and this one is no longer needed.
Secrets are never copied to a fork, so you add only your own, and the old ones never apply to you.

1. Create an account at github.com.
2. Open https://github.com/fiveapplesonthetable/anastasiamusicians and click **Fork → Create fork**.
3. In your fork, open the **Actions** tab and click **I understand my workflows, go ahead and enable them** (forks have them off by default).
4. Add the secret for the host you choose, Cloudflare or Vercel (below). Secrets live under **Settings → Secrets and variables → Actions → New repository secret**.
5. Put your Web3Forms key in `site/main.js` (below).
6. Commit any change, or open **Actions → Deploy → Run workflow**, and the site is published.

**Site name:** the site is called `anastasiamusicians` on the host, so its address is `anastasiamusicians.pages.dev` (Cloudflare) or
`anastasiamusicians.vercel.app` (Vercel). A name can only exist once per host, so the old copy must be deleted first (ask), or pick another
name: under **Settings → Secrets and variables → Actions → Variables**, add a variable `PROJECT` with the new name.

(The alternative is for the current owner to transfer the repository to you: **Settings → General → Transfer ownership**. Everything else is the same.)

### Cloudflare (recommended)
Free for business sites. Sign up at dash.cloudflare.com, then create a token:
**My Profile → API Tokens → Create Token → "Edit Cloudflare Workers" → Use template → Account Resources: your account, Zone Resources: All zones → Continue to summary → Create Token.**
Copy the token (it is shown only once) and add it as a GitHub secret named `CLOUDFLARE_API_TOKEN`. Done.

### Vercel (the simple alternative)
Sign up at vercel.com, then **Account Settings → Tokens → Create**, copy the token and add it as a GitHub secret named `VERCEL_TOKEN`. Done.
Note that Vercel's free plan is officially for non-commercial use only.

### Web3Forms key
On web3forms.com, enter **ayaviolin@gmail.com** and a free access key is emailed to you. In your fork, open `site/main.js`, click the pencil,
paste the key into `WEB3FORMS_ACCESS_KEY` and click **Commit changes**. Then send yourself a test message from the live site.

## Using your own domain (optional)

The site works without one. A domain such as `anastasiamusicians.uk` looks more professional and costs about £5–10 a year.
The domain currently points at the old Squarespace site.

1. In Cloudflare: **Workers & Pages → anastasiamusicians → Custom domains → Set up a custom domain**, enter `www.anastasiamusicians.uk` and follow the steps.
   Cloudflare shows a **CNAME** record to add where the domain is managed (Squarespace: **Settings → Domains → DNS settings**), plus a forward
   from `anastasiamusicians.uk` to `https://www.anastasiamusicians.uk`.
   Simplest long term: move the domain itself to Cloudflare, so domain and site live in one free account.
2. In `site/`, replace every `anastasiamusicians.pages.dev` with the new address (it appears in `index.html`, `robots.txt` and `sitemap.xml`). Commit.
3. Send a test message from the new address, then cancel the Squarespace website plan (keep the domain).

## Getting found on Google and AI search

The site is ready for search: a clear title and description, plain text with the words people search for, a questions section, and a small block
of facts in the form Google and AI assistants read. For a local teacher, what matters most happens **off** the site. Checklist, in order of impact:

### 1. Google Business Profile (free, about 15 minutes)
This is what appears on Google Maps and in "violin teacher near me" searches, and what AI assistants quote for local recommendations.

**You already have one**, called *Violin and Piano Lessons with Anastasia*. Go to business.google.com, open it and check each item below. The most important thing is to change
the **Website** to `https://anastasiamusicians.pages.dev`, because it probably still points to the old Squarespace site. Then
update the description, categories and photos.

**New profile:**
1. Go to business.google.com and sign in with a Google account.
2. Business name: `Violin and Piano Lessons with Anastasia`.
3. Category: type **Music instructor** and choose it. Then add **Piano instructor** as a second category, and if typing "violin" offers a violin category, add that too.
4. When asked for an address, say you **don't** have a shop customers visit and that you serve customers at their location, then add the service areas **Hackney** and **Islington**.
5. Website: `https://anastasiamusicians.pages.dev`. Email: ayaviolin@gmail.com. Leave the phone number empty.
6. Description, copy and paste:
   > Violin and piano lessons for all levels in Hackney and Islington, North London, with Anastasia. Over sixteen years of teaching experience, from a beginner's first notes to top graded-exam results and music scholarships. Every lesson is tailored to the student. Anastasia holds a Master's degree in Violin and Viola Performance from universities in the UK and Russia and performs with leading orchestras in London and Oxford. Also available to play live violin at private events, including in your home. Get in touch through the website or by email.
7. Add the photos from `site/images/` and complete the verification Google asks for (a video or a postcard).

### 2. Ask for Google reviews
Reviews are the strongest signal for Google and for AI answers. In your Business Profile, find **Ask for reviews** and copy the link, then send this to a few parents or students:
> Hi [name], I hope [student] is enjoying the [violin/piano] lessons. If you have a minute, a short Google review would help other families find me: [link]. Thank you so much, Anastasia

### 3. Say the same thing everywhere
Use the same name, website address and email on Google, Instagram and Nextdoor.
- **Instagram bio**, copy and paste, and put `https://anastasiamusicians.pages.dev` in the website field:
  > Violin & piano lessons in Hackney & Islington, North London. All levels, graded exams & scholarships. Live violin for private events.
- **Nextdoor** (your existing business page "Violin and Piano Lessons in Hackney and Islington"): add the website address and the email, and use the Business Profile description above.

### 4. Tell Google and Bing about the site (optional, 10 minutes)
This gets the site indexed faster and shows you which searches bring visitors. Bing also feeds ChatGPT and Microsoft Copilot.
1. Go to search.google.com/search-console, choose **URL prefix**, enter `https://anastasiamusicians.pages.dev/` and click **Continue**.
2. Under **HTML tag**, copy the line that starts `<meta name="google-site-verification"`. On GitHub, edit `site/index.html`, paste it on its own line
   just below `<meta charset="utf-8">`, and commit. Wait a minute for it to publish, then click **Verify**.
3. In Search Console, open **Sitemaps**, enter `sitemap.xml` and click **Submit**.
4. Go to bing.com/webmasters, sign in, and choose **Import** from Google Search Console. That copies the site and sitemap in one step.

### 5. Let the old site go
Once you are happy with this site, close the Squarespace website (keep the domain if you want it), so that two sites aren't competing for the same searches.

## Sources

All facts and photos come from Anastasia's own published material, or were confirmed with her:

| What | Source |
|---|---|
| Bio, teaching experience, degree, orchestras, email | Her original site, anastasiamusicians.uk (Squarespace) |
| Lessons offered: violin and piano | Her original site ("Violin and Piano Lessons with Anastasia") |
| Private events, including at home; graded exams; teaching children; plays viola; the list of occasions | Confirmed with Anastasia |
| Google Business Profile ("Violin and Piano Lessons with Anastasia") | Her own Google review link |
| Review quotes; teaching adults | Her public Google reviews (5.0 stars, 11 reviews, October 2026) |
| Teaching in Hackney and Islington | Her Nextdoor business page, "Violin and Piano Lessons in Hackney and Islington" |
| `images/portrait.jpg` | Her original site |
| `images/sofa-portrait.jpg`, `images/at-home.jpg`, `images/orchestra.jpg` | Her Instagram, [@anastasiamusicians](https://www.instagram.com/anastasiamusicians) |

The Instagram photos are compressed copies; the full-size originals would look sharper.

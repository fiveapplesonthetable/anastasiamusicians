# Anastasia — violin and piano lessons website

**Live site:** https://anastasiamusicians.pages.dev (Cloudflare Pages)
**Also live, temporarily:** https://anastasiamusicians.vercel.app (Vercel, to be retired; see [Hosting](#hosting))
**Old site (Squarespace):** https://www.anastasiamusicians.uk. This site replaces it.

A simple, one-page website: lessons, about, private events, orchestral work and a contact form.
There is no database, no visitor login and nothing to install. Hosting is free on Cloudflare Pages.

```
index.html        all the words and the page layout
styles.css        colours, fonts and spacing
main.js           the contact form
images/           the photos
favicon.svg       the small "A" icon in the browser tab
AGENTS.md         rules for anyone (or any AI assistant) editing the site
.github/workflows/deploy.yml   publishes the site automatically
```

---

## Making a change (no software needed)

Every change saved on GitHub is **published automatically** within about a minute.

### Change some text
1. On GitHub, open `index.html` and click the **pencil icon** (Edit).
2. Find the sentence with Ctrl+F / Cmd+F.
3. Change only the words **between** the tags. For example, in `<h3>Violin</h3>`, change only `Violin`.
4. Click **Commit changes**. The live site updates shortly after.

### Change or add a photo
1. Open the `images/` folder and choose **Add file → Upload files**. Use a short name with no spaces,
   such as `concert-2026.jpg`. Photos about 1200–2000 pixels wide look sharp and still load quickly.
2. Edit `index.html`, find the old photo name (for example `images/portrait.jpg`) and replace it with the new one.
3. Update the `alt="…"` text next to it to briefly describe the photo, for blind visitors and Google.

| Photo file | Where it appears |
|---|---|
| `images/portrait.jpg` | Top of the page |
| `images/sofa-portrait.jpg` | About section |
| `images/at-home.jpg` | Private events section |
| `images/orchestra.jpg` | Orchestral section |

### Add a short video
Upload it to YouTube, then use **Share → Embed** and paste the code into `index.html` where it should appear.
Uploading big video files to the site itself makes it slow.

### Colours and fonts
These are at the top of `styles.css`. For example, `--olive: #556036;` is the green used for buttons.

### Where things are in `index.html`

| Section | Search for |
|---|---|
| Top menu and Instagram icon | `<header>` |
| Opening section with the main photo | `class="hero"` |
| Lessons | `id="lessons"` |
| About | `id="about"` |
| Private events | `id="events"` |
| Orchestral | `class="orchestral` |
| Contact form | `id="contact"` |
| Bottom line (email, Instagram) | `<footer>` |

---

## The contact form

When someone fills in the form, a service called **Web3Forms** (web3forms.com) emails the message
to the inbox linked to the site's access key. The email subject looks like
`Website enquiry: Lessons from Jane Smith`. Pressing **Reply** answers the person who wrote.

- **Free plan:** this covers a small teaching site's enquiries comfortably. See web3forms.com for current limits and paid plans.
- **The access key** is `WEB3FORMS_ACCESS_KEY` at the top of `main.js`. It is **meant to be public**.
  The form runs in the visitor's browser, so every visitor's browser has to see the key. Hiding it in a
  private repo wouldn't help. The key only allows *sending* a message to her inbox: nobody can read past
  enquiries, change settings or learn her email address with it. The worst misuse is spam, which the
  hidden spam trap in the form helps to block.
- **To change where messages go:** log in to web3forms.com and change the email for this key,
  or create a new key for the new address and paste it into `main.js`.
- **Messages not arriving?** Check the Gmail **Spam** and **Promotions** tabs.
- If the service is ever down, the form asks visitors to email `ayaviolin@gmail.com` directly.

---

## Handing the site over to Anastasia

The site is set up so that she can own everything, for free, in about 20 minutes. It needs three free
accounts, two secrets and one key.

1. **GitHub account:** she signs up at github.com. Then move this repo to her: in this repo, go to
   **Settings → General → Danger Zone → Transfer ownership** and enter her username.
   Transferring is better than forking: it keeps the history, and the automatic publishing just works.
   If she forks it instead, she has to switch on the **Actions** tab in her fork once.
2. **Cloudflare account (hosting):** she signs up at dash.cloudflare.com.
   - **Create the token:** go to **My Profile → API Tokens → Create Token**, find the **"Edit Cloudflare Workers"**
     template and click **Use template**. Set **Account Resources** to her account and **Zone Resources** to
     **All zones**, then click **Continue to summary → Create Token**. Copy the token, which is shown only once.
   - **Account ID:** on the **Workers & Pages** page, it's shown on the right.
   - **Free the site address:** delete the old `anastasiamusicians` Pages project in the current Cloudflare
     account, so that `anastasiamusicians.pages.dev` becomes available for her account.
3. **GitHub secrets:** in her repo, go to **Settings → Secrets and variables → Actions → New repository secret**.
   Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`, and delete any old secrets (`VERCEL_*` and the
   previous `CLOUDFLARE_*`).
4. **Web3Forms key (contact form):** on web3forms.com, she enters **ayaviolin@gmail.com** to get a free access key
   by email. She pastes it into `WEB3FORMS_ACCESS_KEY` at the top of `main.js` and clicks **Commit changes**.
5. **Publish and check:** that commit publishes the site. The Cloudflare project is created automatically
   on the first run, which can be followed on the **Actions** tab. Then she opens
   https://anastasiamusicians.pages.dev and sends herself a test message.

That's it. Vercel isn't needed. Each host only publishes if its secrets are present, so with only the
Cloudflare secrets set, the Vercel step quietly skips.

---

## Hosting

The site is published to **Cloudflare Pages** (free, project `anastasiamusicians`). During the changeover it
is also published to **Vercel**. Every change pushed to `main` goes to both automatically, through
`.github/workflows/deploy.yml`. The two hosts deploy independently, so if one fails the other still updates.

### Do we need a domain?
No. **anastasiamusicians.pages.dev** works on its own, for free, forever. A custom domain such as
`anastasiamusicians.uk` just looks a little more professional and costs about £5–10 a year. It's her choice.

### How the deploy tokens are kept secret
Publishing needs a Cloudflare token (and, for now, a Vercel token). These are stored as **encrypted
GitHub repository secrets** under **Settings → Secrets and variables → Actions**:

| Secret | What it is |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare token allowed to deploy Pages and Workers |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account the project lives in |
| `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` | Vercel deploy access (remove when Vercel is retired) |

- Nobody can view a secret after it is saved, not even the repo owner. It can only be replaced.
- GitHub hides secrets in the Action logs.
- **Forks never get the secrets.** Anyone can copy this public repo, but only people with write access to
  *this* repo can publish to her site.
- If a token is ever leaked, delete it in Cloudflare (or Vercel), create a new one and update the secret.

### Retiring Vercel (once happy with Cloudflare)
1. Delete the three `VERCEL_*` secrets in GitHub. The Vercel step then skips itself automatically.
2. In Vercel, open the `anastasiamusicians` project and go to **Settings → Advanced → Delete Project**.
3. Optionally, tidy up by deleting the `vercel:` job in `.github/workflows/deploy.yml` and the `.vercelignore` file.

Vercel's free plan doesn't allow commercial sites (including ones advertising paid lessons), which is
the main reason for moving.

### Using her own domain (anastasiamusicians.uk), optional
The domain currently points at the old Squarespace site.

- **Recommended, `www` plus a redirect:**
  1. In Cloudflare, go to **Workers & Pages → anastasiamusicians → Custom domains → Set up a custom domain**,
     enter `www.anastasiamusicians.uk` and follow the steps. Cloudflare shows a **CNAME** record
     pointing to `anastasiamusicians.pages.dev`.
  2. In Squarespace, go to **Settings → Domains → anastasiamusicians.uk → DNS settings**. Remove the
     Squarespace records for `www`, add that CNAME, and add a Squarespace domain forward from
     `anastasiamusicians.uk` to `https://www.anastasiamusicians.uk`.
- **Simplest long term:** move the domain itself to Cloudflare. Cloudflare sells domains at cost, so
  domain, hosting and DNS all live in one free account, and the bare `anastasiamusicians.uk` works
  directly. For a `.uk` domain, Cloudflare (or any new registrar) gives you an **IPS tag**, and Squarespace
  switches the domain to that tag. See Squarespace's help page on transferring a `.uk` domain away.

After either option:
1. Change the two `https://anastasiamusicians.pages.dev` addresses in the `og:url` and `og:image` lines
   of `index.html` to the new domain. These control link previews in WhatsApp and similar apps.
2. Send a test message from the form.
3. Cancel the Squarespace **website** plan. Keep the **domain** subscription until the domain has been transferred.

---

## For developers

- Run it locally with `python3 -m http.server 8000`, then open http://localhost:8000.
- There is no build step and there are no dependencies. Please keep it that way.
  See `AGENTS.md` for the content and design rules.
- To deploy by hand, run `npx wrangler pages deploy <folder> --project-name=anastasiamusicians`.
  Use a folder holding only the site files, as the workflow builds.

---

## Sources

All facts and photos come from Anastasia's own published material, or were confirmed with her:

| What | Source |
|---|---|
| Bio, teaching experience, degree, orchestras, email | Her original site, anastasiamusicians.uk (Squarespace) |
| Lessons offered: violin and piano | Her original site ("Violin and Piano Lessons with Anastasia") |
| Private events, including at home | Confirmed with Anastasia |
| Graded exams, the list of private-event occasions | Confirmed with Anastasia |
| Teaching in Hackney and Islington | Her Nextdoor business page, "Violin and Piano Lessons in Hackney and Islington" |
| `images/portrait.jpg` | Her original site |
| `images/sofa-portrait.jpg`, `images/at-home.jpg`, `images/orchestra.jpg` | Her Instagram, [@anastasiamusicians](https://www.instagram.com/anastasiamusicians) |

The Instagram photos are compressed copies. Replacing them with the full-size originals will make them look sharper.

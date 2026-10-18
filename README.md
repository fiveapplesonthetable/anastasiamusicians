# Anastasia — violin and piano lessons website

**Live site:** https://anastasiamusicians.vercel.app
**Old site (Squarespace):** https://www.anastasiamusicians.uk. This site replaces it.

A simple, one-page website: lessons, about, private events, orchestral work and a contact form.
There is no database, no visitor login and nothing to install. It is hosted free on Vercel.

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

When someone fills in the form, a free service called **FormSubmit** (formsubmit.co) emails the
message to **ayaviolin@gmail.com**. The email subject looks like
`Website enquiry: Lessons from Jane Smith`. Pressing **Reply** answers the person who wrote.

- **First time on a new web address:** FormSubmit sends one email titled
  *"Action Required: Activate FormSubmit on …"*. Open it and click **Activate Form**.
  Until then, the form shows "Sorry, something went wrong", and visitors are asked to email directly.
  This happens **once per web address**, so it happens again after moving to `anastasiamusicians.uk`.
- **Messages not arriving?** Check the Gmail **Spam** and **Promotions** tabs.
- **To change the email address:** change `FORM_EMAIL` at the top of `main.js` and the
  `ayaviolin@gmail.com` addresses in `index.html` and `main.js`. Then activate it as above.

---

## Moving the domain (anastasiamusicians.uk) to this site

The domain currently points at the old Squarespace site. Pointing it here takes a few minutes of work,
plus up to a day for the change to spread. Transferring the domain away from Squarespace is not required.

1. **Vercel:** open the `anastasiamusicians` project, go to **Settings → Domains → Add**, and add both
   `anastasiamusicians.uk` and `www.anastasiamusicians.uk`. Vercel then shows the DNS records to create,
   usually an **A record** for `@` and a **CNAME** for `www`. Use exactly the values Vercel shows.
2. **Squarespace:** go to **Settings → Domains → anastasiamusicians.uk → DNS settings**. Delete the
   Squarespace default records for `@` and `www`, then add the records from step 1.
3. Wait until Vercel shows both domains as **Valid** (usually within an hour, at most about 48 hours).
4. In `index.html`, change the two `https://anastasiamusicians.vercel.app` addresses in the
   `og:url` and `og:image` lines to `https://anastasiamusicians.uk`. These control link previews in WhatsApp and similar apps.
5. Send one test message from the form at the new address, then click **Activate Form** in the email that arrives.
6. Cancel the Squarespace **website** plan. Keep the **domain** subscription, which is billed separately,
   unless you transfer the domain.

**Optional, to stop paying Squarespace for the domain:** transfer it to a cheaper registrar such as
Cloudflare, Porkbun or Namecheap. For `.uk` domains, the new registrar gives you an **IPS tag**,
and Squarespace changes the domain to that tag (see Squarespace's help page on transferring a
`.uk` domain away). Then repeat step 2 at the new registrar.

---

## For developers

- Run it locally with `python3 -m http.server 8000`, then open http://localhost:8000.
  The form only sends from activated web addresses, not from localhost.
- Deploying: pushing to `main` runs `.github/workflows/deploy.yml`, which deploys to Vercel with the
  `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` repository secrets.
  To deploy by hand, run `vercel deploy --prod`.
- There is no build step and there are no dependencies. Please keep it that way. See `AGENTS.md` for the content and design rules.

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

# Anastasia — violin and piano lessons website

Live site: **https://anastasiamusicians.vercel.app**

A simple, one-page website: lessons, about, private events, orchestral work and a contact form.
Everything is in **one file, `index.html`**, plus the photos in the `images/` folder.
There is no database, no login for visitors and nothing to install.

---

## How the contact form works

When someone fills in the form, a free service called **FormSubmit** (formsubmit.co) emails the
message to **ayaviolin@gmail.com**. The email subject looks like
`Website enquiry: Lessons from Jane Smith`. Pressing **Reply** answers the person who wrote.

- **First time on a new web address:** FormSubmit sends one email titled
  *"Action Required: Activate FormSubmit on …"*. Open it and click **Activate Form**.
  Until then, the form shows "Sorry, something went wrong", and visitors are asked to email directly.
  This happens once per web address, for example again after moving to `anastasiamusicians.uk`.
- **Messages not arriving?** Check the Gmail **Spam** and **Promotions** tabs.
- **To change the email address:** in `index.html`, search for `FORM_EMAIL` and change the address
  in quotes. Also change the two `ayaviolin@gmail.com` links shown on the page. Then activate it as above.

---

## Changing things

### Change some text
1. Open `index.html` and find the sentence (Ctrl+F / Cmd+F).
2. Change only the words **between** the `<` `>` tags. For example, in
   `<h3>Violin</h3>`, change only `Violin`.
3. Save and publish (see below).

### Change or add a photo
1. Put the new photo in the `images/` folder. Use a short name with no spaces, such as `concert-2026.jpg`.
   Photos about 1200–2000 pixels wide look sharp and still load quickly.
2. In `index.html`, find the old photo name (for example `images/portrait.jpg`) and replace it with the new one.
3. Update the `alt="…"` text next to it to briefly describe the photo, for blind visitors and Google.

| Photo file | Where it appears |
|---|---|
| `images/portrait.jpg` | Top of the page |
| `images/sofa-portrait.jpg` | About section |
| `images/at-home.jpg` | Private events section |
| `images/orchestra.jpg` | Orchestral section |

### Add a short video
The easiest way is to upload the video to YouTube, then use **Share → Embed** and paste the code
into `index.html` where it should appear. Uploading big video files to the site itself makes it slow.

### Colours and fonts
These are at the top of `index.html`, under `:root`. For example, `--olive: #556036;` is the green used for buttons.

---

## Publishing changes

The site is hosted for free on **Vercel**. To publish after editing, from this folder run:

```
vercel deploy --prod
```

You need to be logged in to the Vercel account that owns the `anastasiamusicians` project.
To preview the site on your own computer first, run `python3 -m http.server 8000` in this
folder, then open http://localhost:8000 in a browser.

### Using her own domain (anastasiamusicians.uk)
1. In Vercel: **Project → Settings → Domains → Add** `anastasiamusicians.uk` and `www.anastasiamusicians.uk`.
2. Vercel shows one or two DNS records. Add them where the domain is managed
   (currently Squarespace: **Domains → DNS settings**).
3. After it works, cancel the old Squarespace website plan. Keep the domain registration itself, or transfer it.
4. Send one test message from the form so the activation email arrives, then click **Activate Form**.

---

## What's where in `index.html`

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

Getting help from an AI assistant? Point it at `AGENTS.md`, which explains the rules for this site.

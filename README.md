# Galata Mangistu — Video Editor Portfolio

A production-ready, static video-editor portfolio site built with plain
HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no
database, no paid server required.

---

## 1. How to run it locally

You don't need to install anything to look at the site, but browsers
block some features (like loading portfolio-data.js) when you just
double-click index.html, so run a tiny local server instead:

**Option A — VS Code**
Install the "Live Server" extension, right-click `index.html`, choose
"Open with Live Server".

**Option B — Python** (already installed on most Macs/Linux, and on
Windows if you've installed Python)
```bash
cd path/to/this/folder
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option C — Node**
```bash
npx serve .
```

---

## 2. How to add a portfolio project

Open **`portfolio-data.js`**. Every project is one object inside the
`PROJECTS` array, and the file has detailed comments at the top explaining
each field. Quick version:

1. Copy an existing project object (the whole `{ ... }` block).
2. Paste it into the array and give it a unique `id`.
3. Fill in the title, category, description, etc.

You never need to edit `index.html` to add a project — the grid, filters,
and detail pages all update automatically.

## 3. How to replace a portfolio video

In `portfolio-data.js`, on that project, set:
```js
videoType: "mp4",      // or "youtube" or "vimeo"
videoUrl:  "assets/videos/your-file.mp4"   // or a YouTube/Vimeo ID or URL
```
Leaving `videoType: ""` shows the thumbnail with no play button — nothing
looks broken, it just means "no video yet."

## 4. How to replace a thumbnail

Put your image file in `assets/images/`, then set on that project:
```js
thumbnail: "assets/images/project-01.jpg"
```

## 5. How to delete a project

In `portfolio-data.js`, delete that project's entire `{ ... }` object
(including the trailing comma) from the `PROJECTS` array.

## 6. How to reorder projects

Projects display in the order they appear in the `PROJECTS` array. Cut and
paste an object to move it.

## 7. How to change your name

Open **`config.js`** and edit `SITE_CONFIG.name`. Also update the `<title>`
and meta tags near the top of `index.html` (they exist as plain HTML so
search engines and link previews can read them before any JavaScript runs).

## 8. How to change your email

In `config.js`, set:
```js
email: "hello@example.com"
```
Leave it as `""` to hide the "Email Me" button everywhere on the site.

## 9. How to change your WhatsApp number

In `config.js`, set:
```js
whatsapp: "251912345678"   // digits only — country code, no "+", no spaces
```
This also powers the pre-filled message in `whatsappMessage`, which you can
edit or shorten. Leave `whatsapp` as `""` to hide the WhatsApp button.

## 10. How to change your social links

In `config.js`, set `linkedin`, `instagram`, and `youtube` to your full
profile URLs. Any left as `""` are automatically hidden — no broken links.

## 11. How to configure the showreel

In `config.js`, under `SITE_CONFIG.showreel`:
```js
showreel: {
  type: "youtube",                 // "mp4" | "youtube" | "vimeo" | ""
  url: "your-video-id-or-url",
  poster: "assets/images/showreel-poster.jpg",
  orientation: "horizontal"        // or "vertical"
}
```
Leave `type: ""` to keep the "Add your showreel" placeholder.

## 12. How to deploy to GitHub

1. Create a new repository on GitHub (don't initialize it with a README).
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

## 13. How to deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Click **Add new site → Import an existing project**.
3. Choose GitHub and select your repository.
4. Build settings: leave the build command **empty** and set the publish
   directory to `.` (the repository root) — this is also set for you in
   `netlify.toml`.
5. Click **Deploy site**. Netlify will give you a `*.netlify.app` URL, and
   redeploy automatically every time you push to GitHub.
6. Once you know your final URL, update `siteUrl` in `config.js` and the
   canonical/Open Graph URLs near the top of `index.html`.

## 14. How to enable Netlify form notifications

The contact form is already built to work with Netlify Forms — no extra
code needed. After your first deploy:

1. In the Netlify dashboard, open your site → **Forms**. You should see a
   form named "contact" listed after your first deploy (Netlify detects it
   automatically from the `data-netlify="true"` attribute in `index.html`).
2. Go to **Forms → Settings and usage → Form notifications**.
3. Click **Add notification → Email notification**, and enter the email
   address where you want to receive new submissions.

That's it — no backend, database, or third-party form service required.

---

## Project structure

```
/
├── index.html            Page structure/markup only
├── style.css              All styling
├── script.js               All site logic (rendering, filtering, routing, forms)
├── config.js               Your name, contact info, social links, showreel — EDIT THIS
├── portfolio-data.js       Your portfolio projects — EDIT THIS
├── netlify.toml            Tells Netlify to publish the repo root (no build step)
├── assets/
│   ├── images/             Thumbnails, portrait, showreel poster, social image
│   └── videos/              Self-hosted .mp4 files, if any
└── README.md               This file
```

## Where you'll add your information

| What | Where |
|---|---|
| Name, email, WhatsApp, socials, showreel | `config.js` |
| Portfolio projects and videos | `portfolio-data.js` |
| `<title>` / meta description / canonical URL | Top of `index.html` |
| Portrait photo | About section in `index.html` (swap the placeholder `<div>` for an `<img>`, see the comment there) |
| Thumbnails & self-hosted videos | `assets/images/` and `assets/videos/` |

## A note on project management

This is a static site with no backend, so there's no admin dashboard for
managing projects — you'll add, edit, and reorder projects by editing
`portfolio-data.js` directly, as described above. The file is written and
commented to make that as close to "copy, paste, fill in the blanks" as
possible.

If down the road you want a real visual dashboard instead of editing a JS
file, a free headless CMS (like Netlify's git-based CMS options, or a
service like Decap CMS) can be layered on top of this exact file structure
without a rewrite — happy to set that up separately if you want it, but it
isn't included here since it wasn't part of the current scope.

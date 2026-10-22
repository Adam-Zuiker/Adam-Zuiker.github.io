# Robotics Portfolio

A simple, static portfolio site. No build tools or installs needed.

## Viewing it

Double-click `index.html` to open it in your browser.

## Editing content

**All text lives in [`content.js`](content.js).** Open it, change the text inside the quotes, save, and refresh the browser.

| What you want to change          | Where in `content.js`   |
|----------------------------------|-------------------------|
| Name, title, tagline, email      | `SITE`                  |
| GitHub / LinkedIn / other links  | `SITE.links`            |
| Bio, skills, education, jobs     | `ABOUT`                 |
| Projects                         | `PROJECTS`              |

### Adding a project

1. Copy an existing `{ ... },` block inside `PROJECTS`.
2. Paste it at the end of the list.
3. Give it a new unique `id` (lowercase, dashes, no spaces) and edit the fields.
4. Set `featured: true` if you also want it on the home page.

### Writing project descriptions

A project's `description` is a list of paragraphs. Each paragraph goes in its own quotes, followed by a comma:

```js
description: [
  "First paragraph.",
  "## A Subheading",
  "Another paragraph under that subheading.",
],
```

- Start a line with `## ` to make it a subheading.
- Don't use backticks or Markdown like `**bold**`. They break the page or show up as literal symbols.
- To put a double quote inside your text, write it as `\"`. Apostrophes are fine as-is.

### Adding images, résumé, or videos

- Put images in `images/` and reference them like `image: "images/my-robot.jpg"`.
- Put your résumé PDF in `files/` and set `resume: "files/resume.pdf"`.
- For a video file (`.mp4`, `.webm`, or `.mov`), put it in `videos/` and set `video: "videos/my-demo.mp4"`.
  Keep it under ~50 MB if you plan to host on GitHub. For anything larger, use YouTube.
- For a YouTube video, click **Share → Embed** on YouTube and copy the `src` link
  (looks like `https://www.youtube.com/embed/abc123`) into the project's `video` field.

Any field left as `""` or `[]` is simply hidden.

### Common mistakes

If the page goes blank after an edit, it's usually a typo in `content.js`:
- a missing comma between items or projects
- a missing closing quote `"`, bracket `]`, or brace `}`
- an apostrophe is fine inside `"double quotes"`, but a `"` inside text needs to be written as `\"`

## Changing colors

Edit the variables at the top of [`css/style.css`](css/style.css) (e.g. `--accent`).

## Publishing (free) with GitHub Pages

1. Create a GitHub repository named `your-username.github.io`.
2. Upload all files in this folder to it.
3. In the repo, go to **Settings → Pages**, set the source to the `main` branch, and save.
4. Your site will be live at `https://your-username.github.io` within a minute or two.

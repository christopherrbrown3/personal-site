# Christopher Brown — Astro redesign

This directory contains the next version of [christopherbrown.io](https://christopherbrown.io). It is intentionally isolated from the current root-level GitHub Pages site while the redesign is in progress.

## Local development

```sh
npm install
npm run dev
```

The standard preview URL is `http://localhost:4321/`.

## Content

- Writing lives in `src/content/writing/` as Markdown or MDX.
- Projects live in `src/content/projects/` as Markdown.
- Both collections are defined and validated in `src/content.config.ts`.
- Set `draft: true` to keep a writing entry out of page generation and RSS.
- Set `example: true` to show the visible placeholder-writing notice.

To start a real post, copy `templates/writing.md` into `src/content/writing/`, give it a URL-friendly filename, and place an optional hero image in `src/assets/writing/`. Remove the `hero` and `heroAlt` fields together when a post does not need an image. The matching project starter is `templates/project.md`.

## Checks

```sh
npm run check
npm run build
npm run preview
```

The repository workflow only checks this branch and pull requests. It does **not** deploy the redesign.

## Launch later

The Astro configuration already uses `https://christopherbrown.io` as its site URL, and the static output contains `CNAME`, the sitemap, RSS, and root-relative routes for the custom domain. A ready-to-enable Pages workflow lives at `deployment/github-pages.yml`; it is deliberately outside `.github/workflows`, so GitHub cannot run it before approval.

When the redesign is approved:

1. Archive the current root site on a permanent branch/tag.
2. Move the contents of `site-v2/` to the repository root (or adjust the Pages workflow working directory).
3. Move `deployment/github-pages.yml` to `.github/workflows/deploy-pages.yml` and change the repository Pages source to GitHub Actions.
4. Verify the Pages custom domain remains `christopherbrown.io` and HTTPS is enforced.
5. Merge only after a final production build and link check.

No DNS move is needed, and this branch does not change the current production site.

The committed production restore point is `archive/pre-astro-2026-08-30`.

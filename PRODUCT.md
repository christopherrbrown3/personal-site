# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro with static output, Markdown/MDX content collections, and GitHub Pages deployment at the apex custom domain `christopherbrown.io`.

## Users

The primary audience is people who encounter Chris through his writing, software, professional network, or shared interests and want to understand who he is and explore what he makes. Recruiters and professional peers may visit, but the site is not organized around a job search.

## Product Purpose

`christopherbrown.io` is Chris's durable personal corner of the internet: first a living personal blog, then a place to introduce himself, share small software and hardware projects, and keep a deliberately condensed professional background. Success means the homepage feels current and personally authored, new writing is effortless to publish, and projects appear as part of Chris's ongoing interests rather than as a portfolio pitch.

## Positioning

The site connects Chris's real life as a husband, dad, software builder, technical leader, coffee enthusiast, and habitual technology-rabbit-hole follower. Recent writing, notes, and what Chris is doing lately provide the organizing rhythm; projects and professional background support that living record rather than defining it.

## Operating Context

- Readers may arrive at the homepage, an individual post, or a project link.
- The homepage should answer “what is Chris thinking about and doing lately?” before “what has Chris shipped?”
- Chris should be able to publish by adding a Markdown or MDX file with straightforward frontmatter.
- Long technical walkthroughs, shorter notes, personal reflections, and project stories should coexist without forcing every post into one format.
- The growing archive should be visible by date and topic so the site feels accumulated over time rather than periodically redesigned from scratch.
- Projects should be reusable content entries with screenshots, live links, source links, and room to grow.
- The site is maintained in Git and published as static files through GitHub Pages.

## Capabilities and Constraints

- Preserve the existing production site and root Pages setup until Chris explicitly approves launch.
- Preserve the apex domain and existing DNS location; no registrar or DNS move is required.
- Keep the initial site free to host and free of Cloudflare or other runtime dependencies.
- Produce static HTML/CSS with minimal client JavaScript.
- Provide homepage, About, Projects, Writing, individual post, RSS, sitemap, canonical metadata, Open Graph metadata, favicon support, semantic HTML, visible keyboard focus, and strong phone layouts.
- Writing entries may include an optional local hero image and descriptive alt text in frontmatter. Astro should validate and optimize those images, while image-less posts must remain first-class.
- Leave room for durable living pages such as `Now`, `Uses`, or a reading list without requiring them for the first launch.
- Known project material includes HomeTeam, Iced Coffee Calculator, BeerMe, World Clock, and home-lab/infrastructure experiments.
- Chris recently changed jobs. The new employer and role are deliberately undecided and must not be invented from the older résumé site.
- Chris has a set of playful illustrated self-portraits originally made for a presentation: waving, sitting, presenting, gardening, and flying a paper airplane. Use these as occasional personal punctuation—not a mascot system or a cartoon theme. Do not use the Octocat pose; the site is Chris's and should not imply GitHub affiliation.
- A future personal photograph may appear near the introduction, but the composition must work without one.
- Projects must not dominate the first viewport or make the homepage read like a portfolio.
- Use Chris's current warm, casual portrait at the top of the homepage. Decorate its frame with small color or illustration details rather than making it look like a corporate headshot.
- Avoid a date gutter or staggered indentation in the writing feed; titles, excerpts, and metadata should share a clear left edge.
- Avoid repeating a permanent text column beside a permanent image column. Use a compact editorial hierarchy on desktop: one clearly featured story, followed by two equal secondary stories. Every image keeps a 16:9 ratio; stories with the same role use identical geometry and typography. Create variety through crops, real artwork, restrained annotations, and color. Phones use a simple full-width image-then-story sequence.

## Brand Commitments

- Use the name Christopher Brown in global identity and Chris in conversational copy.
- Voice: personal, simple, warm, thoughtful, lightly nerdy, plainspoken, and confident without self-promotion.
- The experience should feel fun, light, and easy. Favor breathing room and an inviting reading rhythm over engineered layouts, rigid section systems, or high information density.
- Small photographs, screenshots, and illustrated Chris poses can appear throughout the page as editorial punctuation. Favor genuine existing artifacts over generic decorative stock art.
- Use restrained color pops and subtle motion for warmth: gentle image drift, hover tilt, or small reveal details are welcome when they remain calm and honor `prefers-reduced-motion`.
- The site should feel like a personal publication and workshop, not a résumé, generic startup portfolio, dashboard, bento grid, fake terminal, retro-computer concept, or thought-leadership funnel.
- Avoid credential walls, excessive cards, borders, gradients, animation, shadows, and rounded rectangles.
- Personality should come from writing, real projects, screenshots or photography, typography, and small details.
- The user named `leerob.com`, `paco.me`, `tomcritchlow.com`, `cassidoo.co`, `maggieappleton.com`, and `sive.rs` as quality references, not templates to copy.
- Scott Hanselman, Scott Guthrie, Ron Forbes, and Werner Vogels are editorial references for practical technical depth, personal voice, durable archives, topic breadth, and a long-running publishing habit—not visual templates.

## Evidence on Hand

- Current production source and professional copy: `index.html` and the live `https://christopherbrown.io/` site.
- Existing portrait: `hero.png`.
- Current résumé artifact: `resume.pdf`; professional details may be useful but may be stale after the job change.
- Existing browser icon: `favicon.ico`.
- Verified custom domain file: `CNAME` containing `christopherbrown.io`.
- Public project repositories and real project media on GitHub under `christopherrbrown3`, including HomeTeam, BeerMe, Iced Coffee Calculator, and World Clock.
- Original illustrated Chris assets are in `/Users/chris/Downloads/ChatGPT Image Aug 3, 2026…` and `/Users/chris/Downloads/ChatGPT Image Aug 4, 2026…`; transparent-background exports exist for the waving, sitting, presenting/gardening, Octocat, and paper-plane poses.
- Public patent links and older career history appear in the incumbent site. Claims beyond those sources must not be fabricated.

## Product Principles

1. Lead with the person and a living stream of writing; let projects and work history reveal the résumé indirectly.
2. Prefer a few specific, real artifacts over exhaustive professional claims.
3. Make publishing a file-based habit, not a CMS project.
4. Keep the website legible, fast, accessible, and pleasant on a phone.
5. Keep launch reversible: the current site remains intact until the v2 is explicitly approved.
6. Design for the hundredth post, not only the first three placeholders.

## Accessibility & Inclusion

Use semantic landmarks and headings, keyboard-visible focus states, descriptive alternative text, sufficient contrast, comfortable reading measures, large enough interactive targets, and reduced-motion support for any nonessential motion.

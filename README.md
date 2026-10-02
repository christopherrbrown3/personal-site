# Christopher Brown

[Visit christopherbrown.io](https://christopherbrown.io/)

The homepage is plain HTML, CSS, and JavaScript. GitHub Pages builds it with
Jekyll so the rotating illustration catalog stays automatic.

The root `index.html` also works when opened directly from the filesystem for
quick local previews.

## Landing-page illustrations

Add or remove files in `images/landing/`; no manifest or code change is needed.
PNG, JPG, JPEG, WebP, AVIF, GIF, and SVG files are supported, and filenames
can be anything. Commit and push the folder change so GitHub Pages can rebuild
the catalog.

Each image is contained within the same responsive stage. On load, the page
automatically contains its intrinsic dimensions, so new artwork does not need a
special CSS rule or filename.

## Résumé

The Résumé link opens `resume.html` in a native dialog with a persistent PDF
download button. It also works as a standalone page when opened directly or
when JavaScript is unavailable. Escape, the close button, and a click outside
the dialog return to the homepage; reduced-motion preferences are respected.

`resume.html` and `resume.pdf` were imported together from
`christopherrbrown3/resume-customizer`, folder `customized-resumes/Personal Website`,
revision `63c1734f2d0b808a16c2208b54f38df7cdfccab2` (September 2026 edition).
Both files now include GitHub Foundations, earned October 1, 2026, alongside
the other selected credentials in plain text. Every credential displays its
issue month and year; AWS dates come from the issued badges on Credly.
The selected credentials include AWS Incident Response Demonstrated, issued
April 2026. The AWS experience section includes AWSome Awards All-Star
recognition from March 2026. The expired Solutions Architect credential has
been removed. The PDF keeps the supplied two-page layout. The HTML retains
embedding support, local download links, and the same email obfuscation used
on the homepage.
Update both files together when the resume changes, sync
`site-v2/public/resume.pdf`, and bump their cache versions
in `index.html`, `script.js`, and `resume.html`.

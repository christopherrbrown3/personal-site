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

## Blog link

The open-book link visits `https://blog.christopherbrown.io/` in the same tab.
Its burnt-orange icon uses the same hover lift as the other links. Navigation
uses a normal link with no page transition or delay.

## Résumé

The Résumé link opens `resume.html` in a native dialog with a persistent PDF
download button. It also works as a standalone page when opened directly or
when JavaScript is unavailable. Escape, the close button, and a click outside
the dialog return to the homepage; reduced-motion preferences are respected.

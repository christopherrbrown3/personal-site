# Christopher Brown — personal site

Static GitHub Pages site for [christopherbrown.io](https://christopherbrown.io/).

See [`REVIEW.md`](REVIEW.md) for the current narrative, page structure, and review prompts.

## Preview this branch

From the repository root:

```bash
python3 -m http.server 4187 --bind 0.0.0.0
```

Then open [http://127.0.0.1:4187/](http://127.0.0.1:4187/) on this computer. A device on the same network can use this computer’s local network address with port `4187`.

## Design direction

The site uses a warm editorial style with large type, a simple portrait, restrained color, and generous space. The writing is plain, specific, and evidence-led.

The employer-facing story centers on three things:

- leading technical teams through difficult customer problems;
- building AI tools that make real work easier;
- helping people and organizations grow.

Earlier design explorations remain under [`concepts/`](concepts/README.md).

## Résumé

The linked [`resume.pdf`](resume.pdf) is a focused two-page leadership résumé. Regenerate it after résumé copy changes with:

```bash
PYTHONPATH=/tmp/codex-pdf python3 scripts/generate_resume.py
```

The generator requires `reportlab` and `pypdf`, and also writes an archival copy to `output/pdf/`.

## Review checklist

- The introduction is understandable in a quick scan.
- Every major claim is supported by a concrete example or number.
- Public claims come from Christopher’s saved professional materials.
- Customer identities and private metrics are excluded.
- Harvard credentials are described as Harvard Business School Online.
- The live site remains unchanged until this branch is explicitly merged.

# Christopher Brown — personal site

Static GitHub Pages site for [christopherbrown.io](https://christopherbrown.io/).

See [`REVIEW.md`](REVIEW.md) for desktop/mobile previews, positioning rationale, recruiter feedback, and the full validation summary.

## Preview this branch

From the repository root:

```bash
python3 -m http.server 4187 --bind 127.0.0.1
```

Then open [http://127.0.0.1:4187/](http://127.0.0.1:4187/).

## Redesign direction

The production proposal combines:

- the editorial structure and executive restraint of the **Executive Editorial** concept;
- the approachable portrait presence of **Human Leadership**;
- the evidence rows and operating-model precision of **Systems Ledger**.

The employer-facing narrative is intentionally narrow: enterprise customer engineering and post-sales operations leadership, differentiated by applied AI operations, strategic-account trust, and talent systems.

Earlier concept explorations and screenshots remain under [`concepts/`](concepts/README.md).

## Résumé

The linked [`resume.pdf`](resume.pdf) is a focused two-page customer-engineering and post-sales leadership résumé. Regenerate it after copy changes with:

```bash
PYTHONPATH=/tmp/codex-pdf python3 scripts/generate_resume.py
```

The generator requires `reportlab` and `pypdf`, and also writes an archival copy to `output/pdf/`.

## Review checklist

- Hero establishes Christopher's exact leadership lane within ten seconds.
- Public claims use the saved LinkedIn profile as the primary source.
- Customer identities, ambiguous P&amp;L implications, citizenship, clearance, and private metrics are excluded.
- Harvard credentials are described as **Harvard Business School Online**.
- The live site remains unchanged until this branch is explicitly merged.

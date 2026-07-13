# Plain-language redesign review

This branch contains the revised employer-focused site. The live site on `main` is unchanged.

## What changed

The page now leads with one simple idea:

> I help technical teams do their best work.

The rest of the site supports that statement with specific evidence. Abstract phrases such as “operating model,” “enterprise trust,” and “AI-enabled transformation” have been removed from the main narrative.

## Design direction

The visual system is deliberately quiet:

- one warm neutral background;
- deep green type with a restrained rust accent;
- a large editorial headline and simple portrait treatment;
- generous space between ideas;
- thin rules instead of boxes, badges, or decorative UI;
- short sections that each answer one question.

## Page flow

1. **Introduction** — who Christopher is, what he does, and his current role
2. **Four facts** — 15+ years, team growth, AI adoption, and two patents
3. **Three stories** — incident learning, useful AI tools, and team growth
4. **How I work** — listen, make decisions clear, and leave the team stronger
5. **Experience** — the path from software development to AWS leadership
6. **More about me** — writing, teaching, patents, and education
7. **Contact** — a direct invitation to talk

## Recruiter lens

The strongest evidence from the earlier executive-recruiter review remains visible:

- exact current title and employer;
- 15+ years across engineering, cloud, and enterprise support;
- growth from 7 to 30+ Technical Account Managers;
- AI tools used by thousands and training delivered to hundreds;
- two issued U.S. patents;
- clear career progression and continued education.

The difference is tone: those facts now carry the story without layers of business language around them.

## Local review

From the repository root:

```bash
python3 -m http.server 4187 --bind 0.0.0.0
```

Open [http://127.0.0.1:4187/](http://127.0.0.1:4187/) on this computer, or use the computer’s local network address from another device on the same network.

## Review prompts

- Does the first screen sound like Christopher rather than a corporate profile?
- Can each work story be understood without knowing AWS terminology?
- Do the facts feel confident without overselling?
- Is there anything important that now feels too understated?
- Would a hiring leader know why to start a conversation?

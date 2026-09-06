# Melo

Melo is a monorepo of small static experiences organized into a few durable
category sites:

| Category | Source | Production URL |
| --- | --- | --- |
| Home | `sites/home` | [melo.ink](https://melo.ink) |
| Kids | `sites/kids` | [kids.melo.ink](https://kids.melo.ink) |
| Travel | `sites/travel` | [travel.melo.ink](https://travel.melo.ink) |
| Dev | `sites/dev` | [dev.melo.ink](https://dev.melo.ink) |
| Tools | `sites/tools` | [tools.melo.ink](https://tools.melo.ink) |

Each top-level directory under `sites/` is one self-contained Netlify deployment.
Individual experiences are pages below their category, such as
`sites/kids/hindi` → `kids.melo.ink/hindi/`. Adding another experience normally
requires only a new folder and a card on the category page—not another Netlify
project, certificate, or DNS record.

## Local development

Serve the site you are changing as the web root. For example:

```bash
python3 -m http.server 8888 --directory sites/kids
```

Then open `http://localhost:8888`. Do not open the HTML files directly because
some sites fetch HTML fragments and JSON at runtime.

Validate the entire repository with:

```bash
node scripts/validate-sites.mjs
```

## Deployment

Each category is a separate Netlify project connected to this repository. A push
to `main` deploys the affected category from its corresponding `sites/<category>`
publish directory. The home site owns the apex domain and keeps redirects from
the original path-based URLs.

## Add another experience

1. Pick the closest category: `kids`, `travel`, `dev`, or `tools`.
2. Add a self-contained `sites/<category>/<slug>` directory.
3. Add a card to that category's `index.html` and update relevant documentation.
4. Run `node scripts/validate-sites.mjs` and test with the category directory as
   the local web root.

Create a new category subdomain only when several planned experiences do not fit
any existing category. Public Melo pages must never contain private family data,
credentials, reservations, or account-connected information without real access
control.

See `AGENTS.md` and `docs/architecture.md` for implementation details.

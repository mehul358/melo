# Melo

Melo is a monorepo of small, independently deployed static sites:

| Site | Source | Production URL |
| --- | --- | --- |
| Home | `sites/home` | [melo.ink](https://melo.ink) |
| Hindi Fun | `sites/hindi` | [hindi.melo.ink](https://hindi.melo.ink) |
| Lisbon Trip | `sites/lisbon` | [lisbon.melo.ink](https://lisbon.melo.ink) |
| Portugal for Kids | `sites/portugal-kids` | [portugal-kids.melo.ink](https://portugal-kids.melo.ink) |

Each directory under `sites/` is a self-contained deployable unit with its own
HTML, JavaScript, styles, assets, and Netlify configuration. There is no shared
runtime or mandatory package-install step.

## Local development

Serve the site you are changing as the web root. For example:

```bash
python3 -m http.server 8888 --directory sites/hindi
```

Then open `http://localhost:8888`. Do not open the HTML files directly because
some sites fetch HTML fragments and JSON at runtime.

Validate the entire repository with:

```bash
node scripts/validate-sites.mjs
```

## Deployment

Each site is a separate Netlify project connected to this repository. A push to
`main` deploys the affected site from its corresponding `sites/<name>` publish
directory. The home site owns the apex domain and permanently redirects the old
path-based URLs to the new subdomains.

## Add another microsite

1. Add a self-contained `sites/<slug>` directory.
2. Add it to `scripts/validate-sites.mjs` and the home page.
3. Create a Netlify project that publishes the directory.
4. Attach `<slug>.melo.ink` to that project and add its DNS record.
5. Add a redirect from the old path only when a legacy URL exists.

See `AGENTS.md` and `docs/architecture.md` for implementation details.

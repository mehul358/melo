# Melo project instructions

## Purpose and structure

This repository hosts static experiences under a small set of durable `melo.ink`
category domains. Each top-level directory below `sites/` is a deployable web root:

- `sites/home`: launcher at `melo.ink`.
- `sites/kids`: learning, games, and activities at `kids.melo.ink`.
- `sites/travel`: public guides and travel helpers at `travel.melo.ink`.
- `sites/dev`: hobby software and experiments at `dev.melo.ink`.
- `sites/tools`: assistants, automations, task tools, and utilities at
  `tools.melo.ink`.

Experiences live below a category path, for example `sites/kids/hindi` is served
at `kids.melo.ink/hindi/`. Do not introduce runtime references between category
directories. A category owns all of its HTML, CSS, JavaScript, data, icons, and
media. Put genuinely reusable development resources in a separate package only
when there is a concrete need.

## Stack and development

The sites use static HTML, CSS, and browser JavaScript. Some libraries are loaded
from public CDNs. No package installation or compile step is currently required.

Serve the affected microsite as the web root, for example:

```bash
python3 -m http.server 8888 --directory sites/kids
```

Run `node scripts/validate-sites.mjs` before committing. Do not open the HTML
files directly because the Hindi app fetches fragments and JSON over HTTP.

## Adding a public experience

When a project from another task or repository should become part of Melo:

1. Choose the closest stable category (`kids`, `travel`, `dev`, or `tools`) and a
   lowercase feature slug.
2. Add a self-contained `sites/<category>/<slug>` directory. Use relative local
   URLs so it works below that path. If the user explicitly wants a separate
   source repository, keep it separate and document how the category consumes it.
3. Add the experience to the category launcher and relevant product documentation.
4. Run the repository validator, serve `sites/<category>` as the local web root,
   and test the feature at `/<slug>/`.
5. Merge through the normal GitHub review flow. The category's existing Netlify
   project deploys it automatically; no Netlify or DNS update is required.

Create a new category only when multiple planned experiences form a durable area
that does not fit the existing taxonomy. A new category requires a Git-linked
Netlify project, `<category>.melo.ink`, a Namecheap CNAME, and HTTPS verification.

## Engineering rules

- Work on a focused branch rather than directly on `main`.
- Preserve the static-first architecture unless a task explicitly requires a
  build system or backend.
- Prefer relative local URLs that remain inside the current category or feature.
- Never commit secrets or private family data.
- Keep keyboard access, visible focus, semantic HTML, readable contrast, and
  useful labels when changing UI.
- Validate affected external services and check the browser console.

## Speech behavior

The Hindi and Portugal-for-Kids experiences use the Web Speech API. Voice discovery is
asynchronous, browser support differs, and Safari/iOS may return no voices until
after user interaction. Test Chrome, Firefox, Safari, Edge, and mobile behavior
when changing speech logic.

## Completion criteria

1. Run the repository validator and JavaScript syntax checks.
2. Serve each affected site over HTTP and exercise its local resources.
3. Test relevant speech, persistence, Firebase, map, or weather behavior.
4. Inspect console and network errors at desktop and mobile widths.
5. Review the final diff and report remaining manual checks.

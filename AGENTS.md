# Melo project instructions

## Purpose and structure

This repository hosts independent static microsites under the `melo.ink`
domain. Each directory below `sites/` must work as its own web root:

- `sites/home`: launcher at `melo.ink`.
- `sites/hindi`: Hindi learning games at `hindi.melo.ink`.
- `sites/portugal-kids`: children's Portugal guide at
  `portugal-kids.melo.ink`.

Do not introduce runtime references between microsite directories. A site owns
all of its HTML, CSS, JavaScript, data, icons, and media. Put genuinely reusable
development resources in a separate package only when there is a concrete need.

## Stack and development

The sites use static HTML, CSS, and browser JavaScript. Some libraries are loaded
from public CDNs. No package installation or compile step is currently required.

Serve the affected microsite as the web root, for example:

```bash
python3 -m http.server 8888 --directory sites/hindi
```

Run `node scripts/validate-sites.mjs` before committing. Do not open the HTML
files directly because the Hindi app fetches fragments and JSON over HTTP.

## Adding a public microsite

When a project from another task or repository should become part of Melo:

1. Choose a stable lowercase slug and add a self-contained `sites/<slug>` web
   root. If the user explicitly wants a separate source repository, keep it
   separate and add only its launcher link and deployment documentation here.
2. Add the site to `scripts/validate-sites.mjs`, the home launcher, and the
   architecture documentation.
3. Create a Git-linked Netlify project named `melo-<slug>` and configure its
   publish directory or external repository.
4. Assign `<slug>.melo.ink` to that Netlify project.
5. Add the Namecheap CNAME record `<slug>` pointing to the project's
   `*.netlify.app` hostname.
6. Verify DNS, strict HTTPS, the site content, and the home-page link.

Netlify and DNS need this setup only once per microsite. Subsequent pushes to
the configured production branch deploy automatically.

## Engineering rules

- Work on a focused branch rather than directly on `main`.
- Preserve the static-first architecture unless a task explicitly requires a
  build system or backend.
- Prefer relative local URLs that remain inside the current microsite.
- Never commit secrets or private family data.
- Keep keyboard access, visible focus, semantic HTML, readable contrast, and
  useful labels when changing UI.
- Validate affected external services and check the browser console.

## Speech behavior

The Hindi and Portugal-for-Kids sites use the Web Speech API. Voice discovery is
asynchronous, browser support differs, and Safari/iOS may return no voices until
after user interaction. Test Chrome, Firefox, Safari, Edge, and mobile behavior
when changing speech logic.

## Completion criteria

1. Run the repository validator and JavaScript syntax checks.
2. Serve each affected site over HTTP and exercise its local resources.
3. Test relevant speech, persistence, Firebase, map, or weather behavior.
4. Inspect console and network errors at desktop and mobile widths.
5. Review the final diff and report remaining manual checks.

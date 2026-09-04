# Architecture

## Overview

Netlify deploys each directory under `sites/` as an independent static project.
There is no compile step or application server.

```text
melo.ink                 ← sites/home
hindi.melo.ink           ← sites/hindi
portugal-kids.melo.ink   ← sites/portugal-kids
```

## Applications

### Hindi learning app

`sites/hindi/index.html` loads styling and behavior from within the same site.
The script fetches local HTML fragments and JSON data and
uses `localStorage` for scores and selected speech voices. Text-to-speech uses the
browser Web Speech API.

### Portugal for kids

`sites/portugal-kids/index.html` loads React and ReactDOM UMD bundles from a CDN. Its
components and pages are plain JavaScript files attached to the browser global
scope. It uses the Web Speech API and fetches public weather data from Open-Meteo.

## External services

- Netlify: three independent projects, deploy previews, TLS, and production hosting.
- Namecheap: apex and subdomain DNS records.
- Open-Meteo: public weather data for the children's Portugal guide.
- Google Fonts and public CDNs: runtime UI dependencies.

## Security boundaries

No secret may be embedded in client code. Private values belong in local `.env.local`
files or Netlify environment variables, depending on where they are consumed.

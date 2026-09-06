# Architecture

## Overview

Netlify deploys each top-level directory under `sites/` as an independent static
category project. Experiences below a category are ordinary paths in the same
deployment. There is no compile step or application server.

```text
melo.ink                 ← sites/home
kids.melo.ink            ← sites/kids
  /hindi/                ← sites/kids/hindi
  /portugal/             ← sites/kids/portugal
travel.melo.ink          ← sites/travel
dev.melo.ink             ← sites/dev
tools.melo.ink           ← sites/tools
```

## Applications

### Hindi learning app

`sites/kids/hindi/index.html` loads styling and behavior from within the same
feature directory.
The script fetches local HTML fragments and JSON data and
uses `localStorage` for scores and selected speech voices. Text-to-speech uses the
browser Web Speech API.

### Portugal for kids

`sites/kids/portugal/index.html` loads React and ReactDOM UMD bundles from a CDN.
Its components and pages are plain JavaScript files attached to the browser global
scope. It uses the Web Speech API and fetches public weather data from Open-Meteo.

## Category boundaries

- `kids`: learning, games, stories, and activities designed for children.
- `travel`: public destination guides, maps, and non-sensitive travel helpers.
- `dev`: software projects, code experiments, and public agent or AI prototypes.
- `tools`: assistants, task managers, automations, and focused lifestyle utilities.

A feature uses a path inside the closest category. Add a category only when a new
durable area has multiple likely features and meaningfully different deployment or
security needs. A private family portal is not a public category; it needs real
authentication and a separate security design first.

## External services

- Netlify: five independent category projects, deploy previews, TLS, and production hosting.
- Namecheap: one apex record plus four durable category CNAME records.
- Open-Meteo: public weather data for the children's Portugal guide.
- Google Fonts and public CDNs: runtime UI dependencies.

## Security boundaries

No secret may be embedded in client code. Private values belong in local `.env.local`
files or Netlify environment variables, depending on where they are consumed.

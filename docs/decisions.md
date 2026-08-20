# Decisions

This lightweight log records architectural choices that agents should preserve
unless a task explicitly revisits them.

## 2026-08-19: Keep the repository static-first

The apps remain plain static files with browser JavaScript and CDN dependencies.
This avoids a package install and build pipeline for a small personal site. Add a
build system only when a specific requirement justifies its ongoing complexity.

## 2026-08-19: One monorepo, independent subdomain deployments

The GitHub repository is named `melo`. Each `sites/<slug>` directory is a
self-contained Netlify project. The apex hosts the launcher and microsites use
subdomains instead of path proxies. This keeps deployments, storage, cookies,
service workers, headers, and failures isolated.

## 2026-08-19: GitHub and Netlify define the deployment flow

Branches and pull requests are the review boundary. Netlify Deploy Previews are the
staging environment, and merging to `main` triggers production. Manual production
deploys are exceptional and require explicit user intent.

## 2026-08-19: Share agent instructions

`AGENTS.md` is the canonical engineering handbook. `GEMINI.md` imports it so Codex
and Gemini receive the same project rules.

## Existing: Browser storage for local preferences and progress

The Hindi app and portions of the Lisbon planner use `localStorage`. Preserve stored
key compatibility unless a change includes an intentional migration.

## Existing: Firestore for Lisbon shared state

The Lisbon planner uses Firebase's browser SDK and Firestore. The Firebase client
configuration is public by design. Authorization and privacy depend on Firestore
rules and the application's data model, not on hiding client configuration.

## Existing: Web Speech API for audio

Speech features use browser-provided voices. Implementations must tolerate delayed
voice discovery and browsers that require user interaction before speech is available.

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

The Hindi app uses `localStorage`. Preserve stored key compatibility unless a change
includes an intentional migration.

## 2026-09-03: Remove the private Lisbon planner

The Lisbon trip planner contained private family and booking details, so it is not
part of the public Melo repository or deployment set. Personal itinerary tools must
use a private repository and enforce access control before they are hosted.

## Existing: Web Speech API for audio

Speech features use browser-provided voices. Implementations must tolerate delayed
voice discovery and browsers that require user interaction before speech is available.

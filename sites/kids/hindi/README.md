# Hindi Fun!

Hindi-learning experience served at `kids.melo.ink/hindi/`.

## Local development

Serve this directory over HTTP so the JSON and HTML component requests work:

```sh
python3 -m http.server 8000 --directory sites/kids
```

Then open <http://localhost:8000/>. Add `?splash=false` to skip the intro video.

## Netlify

Connect this repository to a Netlify site with:

- Category publish directory: `sites/kids`
- Feature path: `/hindi/`
- Build command: none
- Publish directory: `.`

The app uses browser-provided Web Speech APIs. Voice availability varies by browser and may require user interaction on iOS.

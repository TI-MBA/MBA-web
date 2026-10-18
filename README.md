# MBA web

Web app of the Maracatu Baque Alagoano: members see their presences and payments; admins manage finance, roll call
and members. Vue 3 (Vue CLI), Bulma, axios.

- Live: https://mba-web.ti-baquealagoano.workers.dev (Cloudflare, free plan)
- API: [MbaApi](https://github.com/gabe351/MbaApi) on AWS Lambda — hosting overview, diagram and runbooks in its
  [docs/infrastructure.md](https://github.com/gabe351/MbaApi/blob/main/docs/infrastructure.md)

## Develop

Requires Node.js 20.

```bash
npm install
npm run serve     # http://localhost:8080, hot reload
npm run build     # production build into dist/
```

The development server calls the **production** API (see below). The API allows browser requests from
`http://localhost:*`.

## Configuration

| Variable | Where | Meaning |
|---|---|---|
| `VUE_APP_API_URL` | `.env.production` (`npm run build`), `.env.development` (`npm run serve`) | Base URL of the API, ending in `/api` |

These files are committed on purpose: the API URL is public. Never put secrets in them — everything in a `VUE_APP_*`
variable ends up in the JavaScript sent to browsers. To override locally without committing, use `.env.local`.

## Hosting (Cloudflare)

The site is a Cloudflare Worker with static assets, connected to this GitHub repository:

| Setting (Cloudflare → Workers & Pages → `mba-web` → Settings → Build) | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` (reads `wrangler.jsonc`) |
| Variable | `NODE_VERSION` = `20` |

Every push to the production branch builds and publishes `dist/`. `wrangler.jsonc` serves unknown paths with
`index.html` (`not_found_handling: single-page-application`) so reloading any Vue Router page works. If a build
needs to be re-run without code changes, push an empty commit (`git commit --allow-empty`).

**New site address?** Add it to the API's allowed CORS origins (`CorsAllowedOrigins` in the API's `template.yaml`)
and redeploy the API, otherwise login fails with a CORS error in the browser console.

## Roles

Screens are shown according to the user's `adminLevel` (0 member, 1 admin, 2 finance, 3 roll call, 4 mastery), via the
guards in `src/router.js`. This only hides screens: the API itself does not check roles yet.

## Legacy

Until 2026 the site ran on Heroku (`baque-alagoano`, with an Express server). Heroku's automatic deploys from `main`
are turned off; the old Heroku site keeps its last version until it is shut down.

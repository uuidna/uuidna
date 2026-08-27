---
title: Deploy
description: How uuidna is deployed and how to run your own — Cloudflare Workers Assets behind an edge worker that self-licenses uuidna.com and redirects every other unlicensed domain to the license. Fork, wrangler deploy, verify by recomputation.
---

# Deploy <Badge type="tip" text="Cloudflare" />

> The site is static assets behind one edge worker — reproducible, and it verifies itself.

## How uuidna.com runs

The canonical site is **Cloudflare Workers Assets**: `npm run docs:build` produces `docs/.vitepress/dist` (the
stock VitePress outDir — the site source is `docs/`, the config `docs/.vitepress/config.ts`), and
[`worker.js`](https://github.com/uuidna/uuidna/blob/main/worker.js) runs in front of it — the worker answers first. The
worker does two things — self-license the first-party wildcard and redirect everything else to the
[license](/license), and serve the [trial CRUD](/trials) at `/trials` (opt-in, encrypted storage). One command:

```bash
wrangler deploy
```

The deploy runs the build, uploads the assets, and publishes the worker. That is exactly how this page reached you.

## Run your own

```bash
git clone https://github.com/uuidna/uuidna && cd uuidna
npm install
npm run docs:build      # produces docs/.vitepress/dist
wrangler deploy         # your Cloudflare account
```

A deployment on any domain that is **not** `*.uuidna.{com,net,org}` and holds no license is **redirected to
uuidna.com/license** — that is the worker's rule, not a suggestion. To run licensed, the terms trace back to the
[canonical license](/license): non-commercial reuse is free with attribution; commercial deployments CNAME their own
domain to a `[contract-uuid].uuidna.org` subdomain. The domain *is* the contract's address.

## The gate before the publish

The npm package ships only behind the [seven-dimension audit](/tests): `npm run gate-all` (same chain as
`scripts.audit`, concurrent checks · Lean re-verified across every wing · the ten-dimension fusion census · MCP
contract · provenance · citations · sorry-free · tests · determinism) — and, in CI, the version guards and npm's
signed provenance attestation. A failing gate fails the publish, never production. A fresh checkout has no `dist/`;
**gate-all compiles first**, so a tag gate cannot fail `MODULE_NOT_FOUND` on `one-writer`. Cut a version with
`npm run release-cut` (dry) or `npm run release-cut -- --push` (annotated tag → `release.yml`). Live edge delivery
is `npm run ship`.

```bash
npm run gate-all    # the whole release gate (hexbit speed — full coverage)
npm run release-cut -- --push   # spin/account/next verify + annotated tag (derive via reconcile)
npm run ship        # contribute-first · wrangler · live proof
```

## Cloudflare DNS / TLS (automated)

Do **not** click these in the dashboard as the primary path — `npm run cf:zone` hardens every zone/worker this
repo owns (uuidna.com / .net / .org / perma.family and any other apex bound to the `uuidna` worker):

1. Attach `www.<apex>` as a Workers custom domain (kills 522 when DNS is proxied but nothing is bound).
2. PATCH zone setting **Always Use HTTPS** on (needs Zone Settings:Edit on the API token).
3. Upsert a Dynamic Redirect Rule `www → https://apex` (needs Dynamic Redirect:Edit; optional — the worker also 301s).

The edge worker itself 301s `http → https` and `www → apex` for every host that reaches it, so the live surface
is correct even when wrangler OAuth is only `zone:read`. Paste a token with the scopes `cf:zone` prints when a
write is refused (`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`), then re-run. `npm run ship` calls `cf:zone`
after the worker ships.

## Verify, don't trust

Whatever is deployed, you can recompute it:

```bash
npm run lean        # re-verify every theorem `by decide`, sorry-free
npm run gate-all    # the whole release gate (hexbit speed — full coverage)
```

Same source in, same receipts out — what a deployment serves is [the uuidna cluster](/publications/uuidna) and the
conserved coins ([`two_coins`](/theorem/two_coins)) behind it. See the [Guides](/guides) for the rest.
Integrity, not truth.

## The landing

Local landings run through one command — the push loop folded (2026-08-23, after seven hand-walked gates):

```bash
npm run land
```

`land` heals with `develop`'s taught cures only, derives the tree to its fixed point, commits what the drain
owns, and walks the gate — looping on taught denials, **stopping honestly on an untaught one** with the
GAP+FIX printed verbatim for a human. `--no-verify` appears nowhere in it: the gate is the teacher, and the
loop exists to attend, not to skip class. The one-writer lock guards the whole loop (a second writer is
refused with the holder named; the holder's own children pass — ancestry, not trust).

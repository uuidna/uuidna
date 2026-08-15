---
title: Deploy
description: How uuidna is deployed and how to run your own — Cloudflare Workers Assets behind an edge worker that self-licenses uuidna.com and redirects every other unlicensed domain to the license. Fork, wrangler deploy, verify by recomputation.
---

# Deploy <Badge type="tip" text="Cloudflare" />

> The site is static assets behind one edge worker — reproducible, and it verifies itself.

## How uuidna.com runs

The canonical site is **Cloudflare Workers Assets**: `npm run docs:build` produces `docs/.vitepress/dist` (the
stock VitePress outDir — the site source is `docs/`, the config `docs/.vitepress/config.ts`), and
[`worker.js`](https://github.com/uuidna/uuidna/blob/main/worker.js) runs in front of it (`run_worker_first`). The
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

The npm package ships only behind the [seven-dimension audit](/tests): `npm run audit` (build · Lean re-verified
sorry-free · provenance · tests · determinism) — and, in CI, the version guards and npm's signed provenance
attestation. A failing audit fails the publish, never production.

## Verify, don't trust

Whatever is deployed, you can recompute it:

```bash
npm run lean        # re-verify every theorem `by decide`, sorry-free
npm run audit       # the whole release gate
```

Same source in, same receipts out — what a deployment serves is [the uuidna cluster](/publications/uuidna) and the
conserved coins ([`two_coins`](/theorem/two_coins)) behind it. See the [Guides](/guides) for the rest.
Integrity, not truth.

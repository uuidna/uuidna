# @uuidna/edge

The deployment surface of uuidna: the Cloudflare bindings audit (symmetric-only posture, committed config — not the live edge), the one navigable site graph (`canonicalOrder`, `nextOf`, `gaps` — no next-gap, no orphan), quantum SEO, the theorem renderers, the serializer contract of a content-addressed document, and the profile / social cards the site serves.

```ts
import { auditCloudflareBindings, canonicalOrder, gaps, quantumSeo, renderTheorem, documentAddress } from '@uuidna/edge'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The worker itself (`worker.js` + `wrangler.toml`) stays at the repo root where the CI deploy reads it; the implementation lives in the root `src/` (sealed by the determinism gates); this package re-exports exactly the edge surface.

## Honest scope

The bindings audit audits the COMMITTED config, not the live edge; SEO here is recomputable, honest discoverability and never manipulates a ranking. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

## What this replaces — and what it honestly does not

Reaching for an SEO plugin, a sitemap generator, and a social-cards package? This surface derives all three from
the sealed ledger instead of hand-kept lists: canonical URLs folded to one home, per-page descriptions drawn from
each theorem's own Lean statement, schema.org JSON-LD citing real proofs, and the one navigable site graph (every
page reachable, checked at the gate — a dead link fails the build). **The honest boundary:** it optimises for
honest discovery of *sealed* content — it will not stuff keywords, cloak, or claim rankings, and it audits the
committed Cloudflare config, never the live edge (deployment stays the platform's own Git integration).

---
title: Theories
description: External theories run through uuidna's involutionary refusion reactor — SEALED, REFUTED or UNVERIFIED, and the refused ones recycled with a develop plan. uuidna reveals whether a theory carries a recomputable proof; it does not insult belief.
aside: false
---

<script setup>
import { data } from '../.vitepress/theories.data'
const cls = (v) => v === 'SEALED' ? 'v-sealed' : v === 'REFUTED' ? 'v-refuted' : 'v-unverified'
</script>

# Theories <Badge type="tip" :text="`${data.sealed} sealed · ${data.recycled} recycled`" />

**External theories, run through the reactor.** uuidna does **not** say a theory is false. It reveals whether the
theory carries a **recomputable proof** — and it recycles the rest. Each claim gets one of three verdicts:

- **SEALED** — a decidable test holds, so the claim is proven arithmetic (recomputable by anyone).
- **REFUTED** — it cites a proof that is **not** in the ledger (a fabricated citation, the one decidably-false thing).
- **UNVERIFIED** — it cites no proof. This is **not** "false" — it is *revealed as unbacked*, held open, not censored.

Nothing refused is waste. The **involutionary refusion reactor** feeds every UNVERIFIED and REFUTED claim back with a
**develop plan** — the next aspect that would seal its honest kernel. "Refuted" holds "re-fuse": refusal starts the
next fusion. The same digits numerology fetishises are **SEALED** when a test holds and **UNVERIFIED** when they are
only a claim — that boundary *is* the difference between uuidna and mysticism.

<section v-for="(c, i) in data.cells" :key="i" class="tcell">
  <p class="tclaim"><span class="vbadge" :class="cls(c.verdict)">{{ c.verdict }}</span> {{ c.claim }}</p>
  <p class="tnote">{{ c.note }}</p>
  <div v-if="c.verdict !== 'SEALED'" class="trecycle">
    <strong>Recycle → the next aspect:</strong>
    <ul><li v-for="(s, j) in c.develop" :key="j">{{ s }}</li></ul>
  </div>
  <p class="taddr"><code>{{ c.address }}</code></p>
</section>

The whole run folds to one superposition uuid — the first segment is the identity handle: <code>{{ data.handle }}</code>
· full <code>{{ data.superposition }}</code>. Recompute it with `uuidna_reactor` over the same claims, or challenge your
own with the MCP tool. **Integrity, not truth** — the reactor proves a recomputable fold and an honest next, never a
verdict on belief.

<style scoped>
.tcell { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: .9rem 1.1rem; margin: 1rem 0; background: var(--vp-c-bg-soft); }
.tclaim { margin: 0 0 .3rem; font-weight: 600; }
.tnote { margin: .2rem 0; color: var(--vp-c-text-2); font-size: .9rem; }
.trecycle { margin: .5rem 0 .2rem; font-size: .88rem; }
.trecycle ul { margin: .3rem 0 0; padding-left: 1.1rem; }
.trecycle li { margin: .15rem 0; color: var(--vp-c-text-2); }
.taddr { margin: .4rem 0 0; font-size: .74rem; opacity: .7; }
.vbadge { display: inline-block; padding: .1rem .5rem; border-radius: 999px; font-size: .72rem; font-weight: 700; letter-spacing: .03em; margin-right: .4rem; vertical-align: middle; }
.v-sealed { background: var(--vp-c-green-soft); color: var(--vp-c-green-1); }
.v-refuted { background: var(--vp-c-red-soft); color: var(--vp-c-red-1); }
.v-unverified { background: var(--vp-c-yellow-soft); color: var(--vp-c-yellow-1); }
</style>

---
title: Theories
description: External theories run through uuidna's involutionary refusion reactor — one answer, VERIFIED or UNVERIFIED, all else void — and the unverified recycled with a develop plan. uuidna verifies; it never refutes, and it does not insult belief.
aside: false
---

<script setup>
import { data } from '../.vitepress/theories.data'
const cls = (v) => v === 'VERIFIED' ? 'v-sealed' : 'v-unverified'
</script>

# Theories <Badge type="tip" :text="`${data.verified} verified · ${data.unverified} recycled`" />

**External theories, run through the reactor.** uuidna does **not** say a theory is false. It gives **one answer,
and only one of two** — and it recycles the rest:

- **VERIFIED** — a decidable test holds (or it cites a sealed Lean theorem), so the claim is proven arithmetic, recomputable by anyone.
- **UNVERIFIED** — everything else. This is **not** "false" — it is *revealed as unbacked*, held open, not censored. A citation to a proof that is not in the ledger verifies nothing, so it too is UNVERIFIED, never refuted.

uuidna **verifies; it never refutes** — calling a claim false is an overclaim it cannot decide. Nothing refused is
waste: the **involutionary refusion reactor** feeds every UNVERIFIED claim back with a **develop plan** — the next
aspect that would verify its honest kernel. The same digits numerology fetishises are **VERIFIED** when a test holds
and **UNVERIFIED** when they are only a claim — that boundary *is* the difference between uuidna and mysticism.

<section v-for="(c, i) in data.cells" :key="i" class="tcell">
  <p class="tclaim"><span class="vbadge" :class="cls(c.verdict)">{{ c.verdict }}</span> {{ c.claim }}</p>
  <p class="tnote">{{ c.note }}</p>
  <div v-if="c.verdict !== 'VERIFIED'" class="trecycle">
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

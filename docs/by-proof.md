---
title: By proof
aside: false
---

<script setup>
import { data } from './.vitepress/proof.data'
</script>

# By proof <Badge type="tip" :text="`${data.groups.length} principles`" />

**The same pages, organised by what they rest on instead of what they are for.** The sidebar groups by PURPOSE —
where a reader goes looking. This groups by PROOF — the principle most of a page's cited theorems belong to,
computed from the citations themselves, not authored. It is the page-level twin of [Topics](/topics), which does
the same for theorems by skill.

Two axes, both real. The sidebar answers *where do I find the licence*; this answers *what does the licence stand
on*. Collapsing them into one would file [the licence](/license) under the cipher principle, because its text
cites a cipher theorem — true, and useless for finding it. So both are kept.

The grouping is a fold, so it is order-invariant by the same law the ledger folds everything else with
([`merkle_sort_invariant`](/theorem/merkle_sort_invariant)) — the pages may arrive in any order and the receipt is
the same. And a page sharing a principle with another is no evidence they are related: a small pool of facts
collides at the rate pigeonhole dictates ([`collisions_under_one`](/theorem/collisions_under_one)).

A page with **no** sealed citation appears in neither list here: it rests on nothing to group by, and saying so is
more honest than inventing a home for it. Every grouping folds to its own address, and the whole view folds to one
root — change a page's citations and the root moves.

<div v-for="g in data.groups" :key="g.address" class="proof-group">
  <h2>{{ g.principle }} <Badge type="info" :text="`${g.pages.length}`" /></h2>
  <p class="proof-meta">skill <code>{{ g.skill }}</code> · <code>{{ g.address.slice(0, 8) }}</code></p>
  <ul>
    <li v-for="p in g.pages" :key="p.route">
      <a :href="p.route">{{ p.text }}</a>
      <span class="proof-cites">{{ p.cites }} sealed {{ p.cites === 1 ? 'citation' : 'citations' }}</span>
    </li>
  </ul>
</div>

---

**{{ data.grouped }} pages grouped across {{ data.groups.length }} principles**, folded to `{{ data.root }}`.
Recompute it: the address of each group folds its principle with the routes it holds, and the root folds the
groups — order-invariant, so the same site always returns the same receipt.

<style scoped>
.proof-group { margin: 1.5rem 0; }
.proof-meta { color: var(--vp-c-text-2); font-size: 0.85em; margin: 0.2rem 0 0.5rem; }
.proof-cites { color: var(--vp-c-text-3); font-size: 0.85em; margin-left: 0.5rem; }
</style>

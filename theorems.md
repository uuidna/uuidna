---
title: Theorems
aside: false
---

<script setup>
import { data } from './.vitepress/ledger.data'
</script>

# Theorems <Badge type="tip" :text="`${data.total} Lean-proven`" />

**The collection of proven Lean theorems** — every one authored in `lean/*.lean`, proven `by decide` (Lean 4.33.0,
no Mathlib), verified sorry-free by `npm run lean`, and organised by computing principle: the 8×8 core generates,
then the ring ℤ/9, the rosette ℤ/7, and the derived, discovered and applied layers. Use the search box (top right)
to filter by any text; open any theorem for its detailed proof. Lean is the single source — the recomputation-only
capabilities (FNV address, gate, crypto) are **tools**, not theorems.

<section v-for="g in data.groups" :key="g.name" class="psec">
  <h2>{{ g.name }} <Badge type="tip" :text="String(g.count)" /></h2>
  <p class="psec-blurb">{{ g.blurb }}</p>
  <p class="psec-fold">layer fold <code>{{ g.fold }}</code></p>
  <ul class="tlist">
    <li v-for="t in g.theorems" :key="t.key">
      <a :href="`/theorem/${t.key}`">{{ t.name }}</a>
      <code class="tstmt">{{ t.statement }}</code>
    </li>
  </ul>
</section>

The whole set folds to one receipt on [/trial](/trial); open propositions are held on [/undecided](/undecided).

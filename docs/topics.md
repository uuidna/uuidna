---
title: Topics
aside: false
---

<script setup>
import { data } from '../.vitepress/ledger.data'
</script>

# Topics <Badge type="tip" :text="`${data.skillGroups.length} skills`" />

**The discussion topics, computed by the theorem skill axis** — mined from the theorem keys, not hand-authored.
Each topic gathers every theorem that carries that skill, folded (order-invariant) to its own receipt. This view is
**public and stripped of sensitive data by construction**: the trial holds only `by decide` theorems and their
content-addresses — nothing secret is ever in it (see [The Navigator](/captain/navigator) and the security posture).
Every theorem links to its page, where the full statement, the `by decide` proof and the source are displayed.

<section v-for="g in data.skillGroups" :key="g.skill" class="psec">
  <h2>{{ g.skill }} <Badge type="tip" :text="String(g.count)" /></h2>
  <p class="psec-fold">topic fold <code>{{ g.fold }}</code></p>
  <ul class="tlist">
    <li v-for="t in g.theorems" :key="t.key">
      <a :href="`/theorem/${t.key}`">{{ t.name }}</a>
      <code class="tstmt">{{ t.statement }}</code>
    </li>
  </ul>
</section>

The same theorems, organised by computing principle instead, are on [/theorems](/theorems); the whole set folds to one
receipt on [/trial](/trial). A theorem computes in Lean, or it is not a theorem.

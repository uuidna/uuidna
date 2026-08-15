---
title: Topics
aside: false
---

<script setup>
import { data } from './.vitepress/ledger.data'
</script>

# Topics <Badge type="tip" :text="`${data.skillGroups.length} skills`" />

**The discussion topics, computed by the theorem skill axis** — mined from the theorem keys, not hand-authored.
Each topic gathers every theorem that carries that skill, folded (order-invariant) to its own receipt. This view is
**public and stripped of sensitive data by construction**: the trial holds only `by decide` theorems and their
content-addresses — nothing secret is ever in it (see [The Navigator](/captain#the-navigators-charter) and the security posture).
Every theorem links to its page, where the full statement, the `by decide` proof and the source are displayed.

<nav class="topic-index">
  <a v-for="g in data.skillGroups" :key="g.skill" :href="'#skill-' + g.skill" class="topic-chip">{{ g.skill }} <span class="chip-n">{{ g.count }}</span></a>
</nav>

<section v-for="g in data.skillGroups" :key="g.skill" class="psec">
  <h2 :id="'skill-' + g.skill">{{ g.skill }} <Badge type="tip" :text="String(g.count)" /></h2>
  <p class="psec-fold">topic fold <Handle :uuid="g.fold" /></p>
  <ul class="tlist">
    <li v-for="t in g.theorems" :key="t.key">
      <a :href="`/theorem/${t.key}`">{{ t.name }}</a>
      <code class="tstmt">{{ t.statement }}</code>
    </li>
  </ul>
</section>

The same theorems, organised by computing principle instead, are on [/theorems](/theorems), on seven ℤ/7 rays on
[/rosetta](/rosetta), and the whole set folds to one receipt on [/trials](/trials). To walk them in learning order,
[the school](/school) rides the doubling orbit from the core. A theorem computes in Lean, or it is not a theorem.

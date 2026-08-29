---
title: Theorems
description: "The sealed Lean 4 theorem ledger — every proof by decide, axiom-free. Browse by principle or skill; each claim cites its proof."
aside: false
---

<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'
import { dims } from './.vitepress/theme/dimensions'

// This URL is the sequence monograph. Members arrive in frontmatter.axis (SSG) — one copy, no Lean
// proofs, not tripled into principle/skill bags. Filter is a reading of THIS monograph, not a second app.
const { frontmatter } = useData()
const axis = computed(() => frontmatter.value.axis || {
  total: 0, members: [], order: [], publicationByPrinciple: {}, skills: [], trialReceipt: '',
})
const q = ref('')
const principle = ref('')     // '' = all
const skill = ref('')         // '' = all
// aura is a shared DIMENSION (see theme/dimensions.ts) — this button and the ◈ dimensions control are the same
// toggle, one source of truth, persisted in this browser only.
const aura = computed({ get: () => dims.aura, set: (v) => { dims.aura = v } })

const shown = computed(() => {
  const needle = q.value.trim().toLowerCase()
  return axis.value.members.filter((t) =>
    (!principle.value || t.principle === principle.value) &&
    (!skill.value || t.skill === skill.value) &&
    (!needle || (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(needle)))
})
// Counts on each facet reflect the OTHER active filters, so a reader sees how many land in each before clicking.
const principleFacets = computed(() =>
  axis.value.order.map((name) => ({ name, n: axis.value.members.filter((t) => t.principle === name &&
    (!skill.value || t.skill === skill.value) &&
    (!q.value.trim() || (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q.value.trim().toLowerCase()))).length })))
const skillFacets = computed(() =>
  axis.value.skills.map((s) => ({ s, n: axis.value.members.filter((t) => t.skill === s &&
    (!principle.value || t.principle === principle.value) &&
    (!q.value.trim() || (t.key + ' ' + t.name + ' ' + t.statement).toLowerCase().includes(q.value.trim().toLowerCase()))).length })))
const activePublication = computed(() => principle.value ? axis.value.publicationByPrinciple[principle.value] : null)
// the rail shows the USABLE combinations of the filtered list — only principles a click can still reach (n > 0);
// the active principle always stays visible (its own way back). Clear the filter and the rest return: an involution,
// nothing destroyed.
const usablePrinciples = computed(() => principleFacets.value.filter((f) => f.n > 0 || principle.value === f.name))
const clearAll = () => { q.value = ''; principle.value = ''; skill.value = '' }
</script>

# Theorems <Badge type="tip" :text="`${axis.total} Lean-proven`" />

**Every proven Lean theorem — filter it, then read its proof.** Each is authored in `lean/*.lean`, proven `by decide`
(Lean 4.33.0, no Mathlib), verified sorry-free by `npm run lean`. Filter by **principle** (the derivation wing) or
**skill** (the capability), narrow by text, and open any theorem for its proof. Each principle's **publication** is its
audited prose. Lean is the single source; the recomputation-only capabilities (address, gate, crypto) are tools, not theorems.
Each theorem's **aura** is its content-address folded to an A432 hue at build time — deterministic, the same theorem
always glows the same colour; the badge digit is its ℤ/7 rosette ray. Artistic decoration, not physics. To walk the
set in learning order, [the school](/school) rides the doubling orbit out from [the core](/publications/core). The boundary is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught ([drift_is_named_or_caught](/theorem/drift_is_named_or_caught)).

<div class="filt">
  <input class="filt-q" v-model="q" placeholder="filter by text — key, statement, description…" />
  <button class="filt-aura" :class="{ on: aura }" @click="aura = !aura">✨ aura</button>
  <button v-if="q || principle || skill" class="filt-clear" @click="clearAll">clear ✕</button>
</div>

<div class="tpage">
<div class="tmain">

<div class="filt-row">
  <strong class="filt-lbl">skill</strong>
  <button class="chip" :class="{ on: !skill }" @click="skill = ''">all</button>
  <button v-for="f in skillFacets" :key="f.s" class="chip" :class="{ on: skill === f.s, dim: f.n === 0 }" @click="skill = skill === f.s ? '' : f.s">{{ f.s }} <span class="chip-n">{{ f.n }}</span></button>
</div>

<p class="filt-count">
  <strong>{{ shown.length }}</strong> of {{ axis.total }} shown{{ principle ? ` · principle ${principle}` : '' }}{{ skill ? ` · skill ${skill}` : '' }}.
  <a v-if="activePublication" :href="activePublication">Read the {{ principle }} publication →</a>
</p>

<ul class="tlist tlist-flat" :class="{ 'tlist-aura': aura }">
  <li v-for="t in shown" :key="t.key" :style="aura ? { borderLeftColor: t.aura.hsl } : null">
    <span v-if="aura" class="tray" :style="{ backgroundColor: t.aura.hsl }" :title="`proposition (address) — ray ${t.aura.ray} · ${t.aura.hsl}`">{{ t.aura.ray }}</span>
    <span v-if="aura" class="tray tray-line" :style="{ backgroundColor: t.lineAura.hsl }" :title="`exact Lean line (lineAddress) — ray ${t.lineAura.ray} · ${t.lineAura.hsl}`">{{ t.lineAura.ray }}</span>
    <a :href="`/theorem/${t.key}`">{{ t.name }}</a>
    <code class="tstmt">{{ t.statement }}</code>
    <span class="tmeta">{{ t.principle }} · {{ t.skill }}</span>
  </li>
</ul>

<p v-if="shown.length === 0" class="filt-empty">No theorem matches — <a @click="clearAll">clear the filters</a>.</p>

</div>

<aside class="trail" aria-label="principles">
  <strong class="trail-lbl">principle · {{ usablePrinciples.length }} usable</strong>
  <button class="chip" :class="{ on: !principle }" @click="principle = ''">all <span class="chip-n">{{ axis.total }}</span></button>
  <button v-for="f in usablePrinciples" :key="f.name" class="chip" :class="{ on: principle === f.name }" @click="principle = principle === f.name ? '' : f.name">{{ f.name }} <span class="chip-n">{{ f.n }}</span></button>
</aside>

</div>

The whole set folds to one order-invariant receipt: <Handle :uuid="axis.trialReceipt" />. Re-verify every proof with `npm run lean`.
The same theorems grouped by skill are on [/topics](/topics); each principle's publication is on [/publications](/publications).

<style scoped>
/* the cluster facet is the RIGHT RAIL — the 60+ derivation chips stand aside as a sticky vertical index,
   the theorem list keeps the middle. Below 1100px the rail folds back above the list (chips wrap). */
.tpage { display: grid; grid-template-columns: minmax(0, 1fr) 15.5rem; gap: 1.6rem; align-items: start; }
.trail { position: sticky; top: calc(var(--vp-nav-height) + 1.2rem); display: flex; flex-direction: column; align-items: stretch; gap: .3rem; max-height: calc(100vh - var(--vp-nav-height) - 2.4rem); overflow-y: auto; padding: .2rem .2rem .8rem; }
.trail .chip { text-align: left; }
.trail-lbl { color: var(--vp-c-text-2); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; padding: .1rem .2rem; }
@media (max-width: 1100px) {
  .tpage { display: block; }
  .trail { position: static; flex-direction: row; flex-wrap: wrap; align-items: center; max-height: none; overflow: visible; margin: .35rem 0; }
  .trail .chip { text-align: center; }
  .trail-lbl { flex: 0 0 3.5rem; }
}
.filt { display: flex; gap: .5rem; align-items: center; margin: 1rem 0 .5rem; }
.filt-q { flex: 1; padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: .95rem; }
.filt-clear { padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); cursor: pointer; white-space: nowrap; }
.filt-aura { padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); cursor: pointer; white-space: nowrap; opacity: .55; }
.filt-aura.on { opacity: 1; border-color: var(--vp-c-brand-1); color: var(--vp-c-text-1); }
.filt-row { display: flex; flex-wrap: wrap; gap: .35rem; align-items: center; margin: .35rem 0; }
.filt-lbl { flex: 0 0 3.5rem; color: var(--vp-c-text-2); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; }
.chip { padding: .28rem .6rem; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; font-size: .82rem; line-height: 1.2; transition: all .12s; }
.chip:hover { border-color: var(--vp-c-brand-1); }
.chip.on { background: var(--vp-c-brand-1); color: var(--vp-c-bg); border-color: var(--vp-c-brand-1); }
.chip.dim { opacity: .38; }
.chip-n { opacity: .7; font-variant-numeric: tabular-nums; font-size: .78em; }
.chip.on .chip-n { opacity: .85; }
.filt-count { margin: .8rem 0 .4rem; color: var(--vp-c-text-2); }
.filt-count a { margin-left: .5rem; font-weight: 600; }
.tlist-flat { list-style: none; padding: 0; }
.tlist-flat li { padding: .4rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.tlist-aura li { border-left: 4px solid transparent; padding-left: .6rem; }
.tray { display: inline-flex; align-items: center; justify-content: center; width: 1.35rem; height: 1.35rem; border-radius: 50%; margin-right: .45rem; color: white; font-size: .72rem; font-weight: 700; vertical-align: middle; }
/* the line-content badge rides beside the proposition badge — smaller and square (vs. the circle), so two
   genuinely different colours (address vs lineAddress) read as two different things, not one repeated. */
.tray-line { width: 1.1rem; height: 1.1rem; border-radius: 3px; font-size: .62rem; }
.tlist-flat li > a { font-weight: 600; }
.tstmt { display: inline-block; margin-left: .5rem; font-size: .82em; color: var(--vp-c-text-2); }
.tmeta { display: block; font-size: .74em; color: var(--vp-c-text-3); margin-top: .1rem; }
.filt-empty { color: var(--vp-c-text-2); }
.filt-empty a { cursor: pointer; }
</style>

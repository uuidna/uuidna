---
title: Theorems
description: "The sealed Lean 4 theorem ledger — every proof by decide, axiom-free. Browse by principle, skill, or wing-binding; each claim cites its proof and the defs it uses."
aside: false
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import { dims } from './.vitepress/theme/dimensions'

const { frontmatter } = useData()
const route = useRoute()
const axis = computed(() => frontmatter.value.axis || {
  total: 0, members: [], order: [], publicationByPrinciple: {}, skills: [], trialReceipt: '',
  axiomHolds: false, unboundCount: 0,
})
const q = ref('')
const principle = ref('')
const skill = ref('')
const binding = ref('') // '' | 'unbound' | 'bound'
const aura = computed({ get: () => dims.aura, set: (v) => { dims.aura = v } })

onMounted(() => {
  const p = route.query.principle
  if (typeof p === 'string' && p) principle.value = p
  const b = route.query.binding
  if (b === 'unbound' || b === 'bound') binding.value = b
})

const matches = (t, { skipPrinciple = false, skipSkill = false, skipBinding = false, skipQ = false } = {}) => {
  const needle = q.value.trim().toLowerCase()
  if (!skipPrinciple && principle.value && t.principle !== principle.value) return false
  if (!skipSkill && skill.value && t.skill !== skill.value) return false
  if (!skipBinding && binding.value) {
    if (binding.value === 'unbound' && !t.unbound) return false
    if (binding.value === 'bound' && t.unbound) return false
  }
  if (!skipQ && needle && !(t.key + ' ' + t.name + ' ' + t.statement + ' ' + (t.dependsOn || []).join(' ')).toLowerCase().includes(needle)) return false
  return true
}

const shown = computed(() => axis.value.members.filter((t) => matches(t)))

const principleFacets = computed(() =>
  axis.value.order.map((name) => ({ name, n: axis.value.members.filter((t) => t.principle === name && matches(t, { skipPrinciple: true })).length })))

const skillFacets = computed(() =>
  axis.value.skills.map((s) => ({ s, n: axis.value.members.filter((t) => t.skill === s && matches(t, { skipSkill: true })).length })))

const bindingFacets = computed(() => {
  const pool = axis.value.members.filter((t) => matches(t, { skipBinding: true }))
  const unbound = pool.filter((t) => t.unbound).length
  return { all: pool.length, unbound, bound: pool.length - unbound }
})

const activePublication = computed(() => principle.value ? axis.value.publicationByPrinciple[principle.value] : null)
const usablePrinciples = computed(() => principleFacets.value.filter((f) => f.n > 0 || principle.value === f.name))
const clearAll = () => { q.value = ''; principle.value = ''; skill.value = ''; binding.value = '' }

const depLabel = (t) => t.unbound ? 'kernel' : `${t.depCount} def${t.depCount === 1 ? '' : 's'}`
const axiomSummary = computed(() =>
  `Kernel axioms: the ledger is ${axis.value.axiomHolds ? 'axiom-free' : 'under audit'}. `
  + `${axis.value.unboundCount} theorems cite no wing def (kernel numerals only); the rest bind to defs declared in their wing.`)
</script>

# Theorems <Badge type="tip" :text="`${axis.total} Lean-proven`" />

<p>{{ axiomSummary }}</p>

**Every proven Lean theorem — filter it, read its proof, see which wing defs it cites.** Each is authored in `lean/*.lean`, proven `by decide`
(Lean 4.33.0, no Mathlib), verified sorry-free by `npm run lean`. Filter by **principle** (derivation clique), **skill** (capability), or **binding** (unbound vs wing-tied).
See also [**/axioms**](/axioms) — every wing def and which theorems cite it (the reverse index).

<div class="filt">
  <input class="filt-q" v-model="q" placeholder="filter — key, statement, wing def…" />
  <button class="filt-aura" :class="{ on: aura }" @click="aura = !aura">✨ aura</button>
  <button v-if="q || principle || skill || binding" class="filt-clear" @click="clearAll">clear ✕</button>
</div>

<div class="tpage">
<div class="tmain">

<div class="filt-row">
  <strong class="filt-lbl">binding</strong>
  <button class="chip" :class="{ on: !binding }" @click="binding = ''">all <span class="chip-n">{{ bindingFacets.all }}</span></button>
  <button class="chip" :class="{ on: binding === 'unbound' }" @click="binding = binding === 'unbound' ? '' : 'unbound'">kernel <span class="chip-n">{{ bindingFacets.unbound }}</span></button>
  <button class="chip" :class="{ on: binding === 'bound' }" @click="binding = binding === 'bound' ? '' : 'bound'">wing-tied <span class="chip-n">{{ bindingFacets.bound }}</span></button>
</div>

<div class="filt-row">
  <strong class="filt-lbl">skill</strong>
  <button class="chip" :class="{ on: !skill }" @click="skill = ''">all</button>
  <button v-for="f in skillFacets" :key="f.s" class="chip" :class="{ on: skill === f.s, dim: f.n === 0 }" @click="skill = skill === f.s ? '' : f.s">{{ f.s }} <span class="chip-n">{{ f.n }}</span></button>
</div>

<p class="filt-count">
  <strong>{{ shown.length }}</strong> of {{ axis.total }} shown{{ principle ? ` · principle ${principle}` : '' }}{{ skill ? ` · skill ${skill}` : '' }}{{ binding ? ` · ${binding}` : '' }}.
  <a v-if="activePublication" :href="activePublication">Read the {{ principle }} publication →</a>
</p>

<ul class="tlist tlist-flat" :class="{ 'tlist-aura': aura }">
  <li v-for="t in shown" :key="t.key" :style="aura ? { borderLeftColor: t.aura.hsl } : null">
    <span v-if="aura" class="tray" :style="{ backgroundColor: t.aura.hsl }" :title="`proposition — ray ${t.aura.ray}`">{{ t.aura.ray }}</span>
    <span v-if="aura" class="tray tray-line" :style="{ backgroundColor: t.lineAura.hsl }" :title="`Lean line — ray ${t.lineAura.ray}`">{{ t.lineAura.ray }}</span>
    <span class="tbind" :class="{ kernel: t.unbound }" :title="t.unbound ? 'kernel only — no wing def cited' : t.dependsOn.join(' · ')">{{ depLabel(t) }}</span>
    <a :href="`/theorem/${t.key}`">{{ t.name }}</a>
    <code class="tstmt" :title="t.statement">{{ t.tex || t.statement }}</code>
    <span class="tmeta">{{ t.principle }} · {{ t.skill }}<template v-if="!t.unbound"> · g={{ t.gravity }}</template></span>
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
.tray-line { width: 1.1rem; height: 1.1rem; border-radius: 3px; font-size: .62rem; }
.tbind {
  display: inline-block; margin-right: .45rem; padding: .1rem .45rem; border-radius: 4px;
  font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .03em;
  background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); vertical-align: middle;
}
.tbind.kernel { background: var(--vp-c-bg-soft); color: var(--vp-c-text-3); }
.tlist-flat li > a { font-weight: 600; }
.tstmt { display: inline-block; margin-left: .5rem; font-size: .82em; color: var(--vp-c-text-2); }
.tmeta { display: block; font-size: .74em; color: var(--vp-c-text-3); margin-top: .1rem; }
.filt-empty { color: var(--vp-c-text-2); }
.filt-empty a { cursor: pointer; }
</style>

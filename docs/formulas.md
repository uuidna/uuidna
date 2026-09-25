---
title: Formulas
description: "Every sealed statement that is algebra rather than a program — filterable by wing, principle, skill and operator — beside what those same integers generate that nobody has stated."
aside: false
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()
const axis = computed(() => frontmatter.value.axis || {
  total: 0, program: 0, members: [], ops: { arithmetic: [], relation: [] },
  duplication: { statements: 0, formulas: 0, forms: 0, restatements: 0, copies: 0, crosses: 0 },
  closure: { landing: 0, forced: 0, stated: 0, unstated: 0, crossing: 0, integers: 0, wings: 0 },
  novelties: [], receipt: '',
})

const q = ref('')
const wing = ref('')
const skill = ref('')
const op = ref('')
const view = ref('sealed')

onMounted(() => {
  for (const [k, r] of [['wing', wing], ['skill', skill], ['op', op]]) {
    const v = route.query[k]
    if (typeof v === 'string' && v) r.value = v
  }
  if (route.query.view === 'unstated') view.value = 'unstated'
})

const needle = computed(() => q.value.trim().toLowerCase())

// EVERY FACET IS COUNTED FROM THE MEMBERS, never declared. A wing the ledger stops carrying leaves this page because
// the census stops returning it — there is no list here to fall out of date.
const matches = (m, skip = '') =>
  (skip === 'wing' || !wing.value || m.wing === wing.value)
  && (skip === 'skill' || !skill.value || m.skill === skill.value)
  && (skip === 'op' || !op.value || m.ops.includes(op.value))
  && (!needle.value || (m.key + ' ' + m.source).toLowerCase().includes(needle.value))

const shown = computed(() => axis.value.members.filter((m) => matches(m)))
const facet = (field, skip) => {
  const seen = new Map()
  for (const m of axis.value.members.filter((x) => matches(x, skip))) {
    for (const v of field === 'ops' ? m.ops : [m[field]]) seen.set(v, (seen.get(v) || 0) + 1)
  }
  return [...seen.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n || (a.name < b.name ? -1 : 1))
}
const wingFacets = computed(() => facet('wing', 'wing'))
const skillFacets = computed(() => facet('skill', 'skill'))
const opFacets = computed(() => facet('ops', 'op'))

const clearAll = () => { q.value = ''; wing.value = ''; skill.value = ''; op.value = '' }
const short = (w) => String(w).replace(/\.lean$/, '')
</script>

# Formulas <Badge type="tip" :text="`${axis.total} sealed`" />

**The ledger read as algebra.** {{ axis.total }} sealed statements are a formula — closed arithmetic, nothing but
numerals, operators and relations — and {{ axis.program }} are a program, which is a walk over a list and lives on
[/theorems](/theorems). A statement is judged by its parse tree, never by a pattern over its text.

<p class="fnote">
  The alphabet is a census rather than a choice: the sealed formulas use the arithmetic
  <code v-for="o in axis.ops.arithmetic" :key="o">{{ o }}</code>
  and the relations
  <code v-for="o in axis.ops.relation" :key="o">{{ o }}</code>.
  Every candidate on the <strong>unstated</strong> tab is written in exactly that alphabet.
</p>

## The same formula, counted once

{{ axis.duplication.formulas }} formulas carry **{{ axis.duplication.forms }} distinct algebraic forms**, so
{{ axis.duplication.restatements }} statements could be dropped without losing a formula — but only some of them
*should* be, and the census separates the two kinds rather than reporting a single number.

<table class="fwide">
  <thead><tr><th>kind</th><th class="num">groups</th><th>what it means</th></tr></thead>
  <tbody>
    <tr>
      <td><strong>copies</strong></td>
      <td class="num">{{ axis.duplication.copies }}</td>
      <td>one skill sealing one form repeatedly. This is the waste: the second sealing added a key and no fact.</td>
    </tr>
    <tr>
      <td><strong>crosses</strong></td>
      <td class="num">{{ axis.duplication.crosses }}</td>
      <td>two or more skills meeting on one form and <em>meaning different things</em>. Deleting these would delete a bridge — one arithmetic answering a question in each domain.</td>
    </tr>
  </tbody>
</table>

The equivalence is derived, not declared. `a + b` and `b + a` are the same form because probing `+` over the
corpus's own integers showed the swap never changes the value; `a - b` and `b - a` are not, because it does.

## What those integers generate

The {{ axis.closure.integers }} distinct integers across {{ axis.closure.wings }} wings generate
{{ axis.closure.landing }} crosses that land on an integer the corpus already carries. They partition:

<table class="fwide">
  <thead><tr><th>kind</th><th class="num">count</th><th>why it is in this row</th></tr></thead>
  <tbody>
    <tr><td><strong>forced</strong></td><td class="num">{{ axis.closure.forced }}</td><td>an instance of a law true of <em>every</em> integer — <code>0 × 0 = 0</code>, <code>1 × 64 = 64</code>. Detected by running the operator, never by a list of exceptions.</td></tr>
    <tr><td><strong>stated</strong></td><td class="num">{{ axis.closure.stated }}</td><td>a sealed theorem already says it.</td></tr>
    <tr><td><strong>unstated</strong></td><td class="num">{{ axis.closure.unstated }}</td><td>true as written, decidable by <code>decide</code>, and nobody has sealed it. Of these, {{ axis.closure.crossing }} join integers no single wing carries all three of.</td></tr>
  </tbody>
</table>

An unstated cross is **not a defect**. Some say something about their domain and most are the ordinary arithmetic of
the quantities involved; the census does not judge which, and nothing here ranks one gap above another except the
order below.

<div class="filt">
  <input class="filt-q" v-model="q" placeholder="filter — key or statement…" />
  <button v-if="q || wing || skill || op" class="filt-clear" @click="clearAll">clear ✕</button>
</div>

<div class="filt-row">
  <strong class="filt-lbl">view</strong>
  <button class="chip" :class="{ on: view === 'sealed' }" @click="view = 'sealed'">sealed <span class="chip-n">{{ axis.total }}</span></button>
  <button class="chip" :class="{ on: view === 'unstated' }" @click="view = 'unstated'">unstated, ranked <span class="chip-n">{{ axis.novelties.length }}</span></button>
</div>

<template v-if="view === 'sealed'">

<div class="filt-row">
  <strong class="filt-lbl">operator</strong>
  <button class="chip" :class="{ on: !op }" @click="op = ''">all</button>
  <button v-for="f in opFacets" :key="f.name" class="chip" :class="{ on: op === f.name }" @click="op = op === f.name ? '' : f.name"><code>{{ f.name }}</code> <span class="chip-n">{{ f.n }}</span></button>
</div>

<div class="filt-row">
  <strong class="filt-lbl">skill</strong>
  <button class="chip" :class="{ on: !skill }" @click="skill = ''">all</button>
  <button v-for="f in skillFacets.slice(0, 24)" :key="f.name" class="chip" :class="{ on: skill === f.name }" @click="skill = skill === f.name ? '' : f.name">{{ f.name }} <span class="chip-n">{{ f.n }}</span></button>
</div>

<div class="fpage">
<div class="fmain">

<p class="filt-count"><strong>{{ shown.length }}</strong> of {{ axis.total }} shown{{ wing ? ` · ${short(wing)}` : '' }}{{ skill ? ` · ${skill}` : '' }}{{ op ? ` · ${op}` : '' }}.</p>

<ul class="flist">
  <li v-for="m in shown.slice(0, 400)" :key="m.key">
    <a :href="`/theorem/${m.key}`">{{ m.key }}</a>
    <code class="fstmt" :title="m.source">{{ m.tex || m.source }}</code>
    <span class="fmeta">{{ short(m.wing) }} · {{ m.principle }} · {{ m.skill }}</span>
  </li>
</ul>

<p v-if="shown.length > 400" class="filt-count">Showing the first 400 of {{ shown.length }} — narrow the filter to see the rest. Nothing is hidden: the whole set is one <code>uuidna_formulas</code> call.</p>
<p v-if="shown.length === 0" class="filt-empty">No formula matches — <a @click="clearAll">clear the filters</a>.</p>

</div>

<aside class="frail" aria-label="wings">
  <strong class="frail-lbl">wing · {{ wingFacets.length }}</strong>
  <button class="chip" :class="{ on: !wing }" @click="wing = ''">all <span class="chip-n">{{ axis.total }}</span></button>
  <button v-for="f in wingFacets" :key="f.name" class="chip" :class="{ on: wing === f.name }" @click="wing = wing === f.name ? '' : f.name">{{ short(f.name) }} <span class="chip-n">{{ f.n }}</span></button>
</aside>

</div>

</template>

<template v-else>

<p class="filt-count">
  The unstated remainder, ordered by what makes one a <strong>discovery</strong>: first by <strong>span</strong> — a
  cross no single wing carries all three integers of couples two domains, and a coincidence between domains is the
  only kind that could not have been noticed by reading one wing — then by how few wings carry its rarest integer,
  because a rare integer is a characteristic quantity rather than a counting number. Nothing is thresholded; only the
  order is computed.
</p>

<table class="fwide">
  <thead><tr><th>cross</th><th class="num">span</th><th>rarest integer</th><th>domains it joins</th></tr></thead>
  <tbody>
    <tr v-for="(n, i) in axis.novelties" :key="i">
      <td><code>{{ n.text }}</code></td>
      <td class="num">{{ n.span }}</td>
      <td><code>{{ n.rarest }}</code> <span class="fmeta-inline">in {{ n.rarestWings }} wing<template v-if="n.rarestWings !== 1">s</template></span></td>
      <td class="fmeta-inline">{{ n.wings.slice(0, 4).map(short).join(', ') }}<template v-if="n.wings.length > 4"> +{{ n.wings.length - 4 }}</template></td>
    </tr>
  </tbody>
</table>

</template>

**The counts on this page are sealed, not asserted.** The partition is
[the_generated_closure_partitions_into_three_kinds](/theorem/the_generated_closure_partitions_into_three_kinds); the
operator roles are
[the_arithmetic_alphabet_partitions_by_its_own_algebra](/theorem/the_arithmetic_alphabet_partitions_by_its_own_algebra);
the crossing share is
[most_of_the_unstated_remainder_stays_inside_one_wing](/theorem/most_of_the_unstated_remainder_stays_inside_one_wing);
the fraction stated is
[the_corpus_has_sealed_under_a_hundredth_of_its_own_closure](/theorem/the_corpus_has_sealed_under_a_hundredth_of_its_own_closure);
and that one form can answer several domains is
[the_same_arithmetic_answers_more_than_one_domain](/theorem/the_same_arithmetic_answers_more_than_one_domain). Each is
proven `by decide` over its own finite domain, axiom-free — so a figure here that stopped being true would move the
wing's content-address and turn the recompute test red.

Every figure is computed when the site is built: the collection from `formulas()`, the duplication from
`duplicationCensus()`, the closure and its partition from `quantumCombinatorics()`, the order above from
`novelties()`. The whole census folds to <Handle :uuid="axis.receipt" />, and the four counts are sealed as theorems
in <a href="/lean/CrossFormulas.lean">lean/CrossFormulas.lean</a>. The same statements as propositions are on
[/theorems](/theorems); each principle's prose is on [/publications](/publications).

<style scoped>
.fpage { display: grid; grid-template-columns: minmax(0, 1fr) 15.5rem; gap: 1.6rem; align-items: start; }
.frail { position: sticky; top: calc(var(--vp-nav-height) + 1.2rem); display: flex; flex-direction: column; align-items: stretch; gap: .3rem; max-height: calc(100vh - var(--vp-nav-height) - 2.4rem); overflow-y: auto; padding: .2rem .2rem .8rem; }
.frail .chip { text-align: left; }
.frail-lbl { color: var(--vp-c-text-2); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; padding: .1rem .2rem; }
@media (max-width: 1100px) {
  .fpage { display: block; }
  .frail { position: static; flex-direction: row; flex-wrap: wrap; align-items: center; max-height: none; overflow: visible; margin: .35rem 0; }
  .frail .chip { text-align: center; }
  .frail-lbl { flex: 0 0 3.5rem; }
}
.fnote { color: var(--vp-c-text-2); font-size: .92rem; }
.fnote code { margin-right: .2rem; }
.filt { display: flex; gap: .5rem; align-items: center; margin: 1rem 0 .5rem; }
.filt-q { flex: 1; padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); font-size: .95rem; }
.filt-clear { padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); cursor: pointer; white-space: nowrap; }
.filt-row { display: flex; flex-wrap: wrap; gap: .35rem; align-items: center; margin: .35rem 0; }
.filt-lbl { flex: 0 0 4.5rem; color: var(--vp-c-text-2); font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; }
.chip { padding: .28rem .6rem; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; font-size: .82rem; line-height: 1.2; transition: all .12s; }
.chip:hover { border-color: var(--vp-c-brand-1); }
.chip.on { background: var(--vp-c-brand-1); color: var(--vp-c-bg); border-color: var(--vp-c-brand-1); }
.chip-n { opacity: .7; font-variant-numeric: tabular-nums; font-size: .78em; }
.chip.on .chip-n { opacity: .85; }
.filt-count { margin: .8rem 0 .4rem; color: var(--vp-c-text-2); }
.flist { list-style: none; padding: 0; }
.flist li { padding: .4rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.flist li > a { font-weight: 600; }
.fstmt { display: block; margin-top: .1rem; overflow-x: auto; }
/* --vp-c-text-3 measures 3.10:1 on this ground in light and 3.20:1 in dark, under the 4.5:1 this size needs;
   --vp-c-text-2 measures 5.62:1. The same reading is recorded on /theorems. */
.fmeta { display: block; font-size: .74em; color: var(--vp-c-text-2); margin-top: .1rem; }
.fmeta-inline { font-size: .84em; color: var(--vp-c-text-2); }
.filt-empty { color: var(--vp-c-text-2); }
.filt-empty a { cursor: pointer; }
.fwide { display: table; width: 100%; }
.fwide .num { text-align: right; font-variant-numeric: tabular-nums; }
</style>

---
title: Wing axioms
description: "Every wing def in lean/*.lean — and which theorems cite it. The reverse index of theoremAxioms: axioms explained by theorems, vice versa."
aside: false
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()
const axis = computed(() => frontmatter.value.axis || {
  totalDefs: 0, citedDefs: 0, unusedDefs: 0, wings: 0, axiomHolds: false, entries: [],
})
const q = ref('')
const file = ref('')
const showUnused = ref(false)
const focusDef = ref('')

onMounted(() => {
  const f = route.query.file
  if (typeof f === 'string' && f) file.value = f
  const d = route.query.def
  if (typeof d === 'string' && d) focusDef.value = d
})

const files = computed(() => {
  const set = new Set(axis.value.entries.map((e) => e.file))
  return [...set].sort()
})

const matches = (e, { skipFile = false, skipUnused = false, skipQ = false } = {}) => {
  const needle = q.value.trim().toLowerCase()
  if (!skipFile && file.value && e.file !== file.value) return false
  if (!skipUnused && !showUnused.value && e.unused) return false
  if (!skipQ && needle && !(e.def + ' ' + e.file + ' ' + e.principle + ' ' + e.theorems.map((t) => t.key + ' ' + t.name).join(' ')).toLowerCase().includes(needle)) return false
  return true
}

const shown = computed(() => {
  let list = axis.value.entries.filter((e) => matches(e))
  if (focusDef.value) {
    const hit = list.find((e) => e.def === focusDef.value)
    if (hit) list = [hit, ...list.filter((e) => e.def !== focusDef.value)]
  }
  return list
})

const fileFacets = computed(() =>
  files.value.map((name) => ({ name, n: axis.value.entries.filter((e) => e.file === name && matches(e, { skipFile: true })).length })))

const clearAll = () => { q.value = ''; file.value = ''; showUnused.value = false; focusDef.value = '' }

const defHref = (e) => `/axioms?file=${encodeURIComponent(e.file)}&def=${encodeURIComponent(e.def)}`
</script>

# Wing axioms <Badge type="tip" :text="`${axis.citedDefs}/${axis.totalDefs} cited`" />

<p>
  <strong>{{ axis.citedDefs }}</strong> wing defs are cited by at least one theorem;
  <strong>{{ axis.unusedDefs }}</strong> are declared but not yet used in any statement.
  Kernel audit: {{ axis.axiomHolds ? 'axiom-free' : 'under audit' }}.
  Each def is the wing vocabulary a theorem may bind to ([`xor_gate_truth_table`](/theorem/xor_gate_truth_table) — axiom-free `lxor`) — the reverse of
  <a href="/theorems">/theorems</a> (theorem → defs). Open any theorem for the forward map.
</p>

<div class="filt">
  <input class="filt-q" v-model="q" placeholder="filter — def name, wing file, theorem key…" />
  <button class="chip" :class="{ on: showUnused }" @click="showUnused = !showUnused">unused <span class="chip-n">{{ axis.unusedDefs }}</span></button>
  <button v-if="q || file || showUnused || focusDef" class="filt-clear" @click="clearAll">clear ✕</button>
</div>

<div class="filt-row">
  <strong class="filt-lbl">wing</strong>
  <button class="chip" :class="{ on: !file }" @click="file = ''">all <span class="chip-n">{{ axis.wings }}</span></button>
  <button v-for="f in fileFacets" :key="f.name" class="chip" :class="{ on: file === f.name, dim: f.n === 0 }" @click="file = file === f.name ? '' : f.name">{{ f.name.replace('.lean','') }} <span class="chip-n">{{ f.n }}</span></button>
</div>

<p class="filt-count"><strong>{{ shown.length }}</strong> defs shown{{ file ? ` · ${file}` : '' }}{{ focusDef ? ` · focus ${focusDef}` : '' }}.</p>

<ul class="alist">
  <li v-for="e in shown" :key="e.file + ':' + e.def" :class="{ unused: e.unused, focus: e.def === focusDef }">
    <div class="ahead">
      <code class="adef">{{ e.def }}</code>
      <span class="ameta">{{ e.file }} · {{ e.principle }}</span>
      <span class="acount" :class="{ zero: e.unused }">{{ e.unused ? 'unused' : e.theoremCount + ' theorem' + (e.theoremCount === 1 ? '' : 's') }}</span>
      <a class="alean" :href="`/lean/${e.file}#${e.def}`">Lean ↗</a>
    </div>
    <ul v-if="e.theorems.length" class="athms">
      <li v-for="t in e.theorems" :key="t.key"><a :href="`/theorem/${t.key}`">{{ t.key }}</a> — {{ t.name }}</li>
    </ul>
    <p v-else class="aempty">No theorem cites this def yet — vocabulary only.</p>
  </li>
</ul>

<p v-if="shown.length === 0" class="filt-empty">No def matches — <a @click="clearAll">clear the filters</a>.</p>

<style scoped>
.filt { display: flex; gap: .5rem; align-items: center; margin: 1rem 0 .5rem; flex-wrap: wrap; }
.filt-q { flex: 1; min-width: 12rem; padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
.filt-clear { padding: .55rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); cursor: pointer; }
.filt-row { display: flex; flex-wrap: wrap; gap: .35rem; align-items: center; margin: .35rem 0; }
.filt-lbl { flex: 0 0 3rem; color: var(--vp-c-text-2); font-size: .8rem; text-transform: uppercase; }
.chip { padding: .28rem .6rem; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg-soft); cursor: pointer; font-size: .82rem; }
.chip.on { background: var(--vp-c-brand-1); color: var(--vp-c-bg); border-color: var(--vp-c-brand-1); }
.chip.dim { opacity: .38; }
.chip-n { opacity: .7; font-size: .78em; }
.filt-count { margin: .8rem 0 .4rem; color: var(--vp-c-text-2); }
.alist { list-style: none; padding: 0; }
.alist > li { padding: .65rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.alist > li.focus { border-left: 3px solid var(--vp-c-brand-1); padding-left: .5rem; }
.alist > li.unused { opacity: .72; }
.ahead { display: flex; flex-wrap: wrap; gap: .35rem .65rem; align-items: baseline; }
.adef { font-weight: 700; font-size: 1rem; }
.ameta { font-size: .78rem; color: var(--vp-c-text-3); }
.acount { font-size: .72rem; font-weight: 600; text-transform: uppercase; color: var(--vp-c-brand-1); }
.acount.zero { color: var(--vp-c-text-3); }
.alean { font-size: .75rem; }
.athms { list-style: none; margin: .35rem 0 0; padding: 0 0 0 .5rem; font-size: .82rem; }
.athms li { padding: .15rem 0; }
.aempty { margin: .35rem 0 0; font-size: .78rem; color: var(--vp-c-text-3); font-style: italic; }
.filt-empty { color: var(--vp-c-text-2); }
.filt-empty a { cursor: pointer; }
</style>

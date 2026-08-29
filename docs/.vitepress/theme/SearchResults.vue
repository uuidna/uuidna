<!-- SearchResults — uuidna_search on the hosted wire. The monitor verifies the mill; it does not bundle it
     (theorem verify_beats_recompute_by_magnitudes). -->
<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const q = ref('')
const hit = ref(null)
const state = ref('')
const href = (key) => withBase(`/theorem/${key}`)

async function searchWire() {
  const needle = q.value.trim()
  if (!needle) { hit.value = null; state.value = ''; return }
  state.value = 'asking'; hit.value = null
  try {
    const payload = await advantageCall('uuidna_search', { q: needle })
    hit.value = payload
    state.value = 'ok'
  } catch { state.value = 'fail' }
}
</script>

<template>
  <div class="search">
    <input v-model="q" class="search-in" type="search" placeholder="search the sealed theorems — uuidna_search on the hosted wire" aria-label="search theorems" @keydown.enter.prevent="searchWire" />
    <p class="search-count">
      <button class="search-verify" :disabled="state === 'asking' || !q.trim()" @click="searchWire">
        {{ state === 'asking' ? 'asking the mill…' : 'search the mill' }}
      </button>
    </p>
    <p v-if="state === 'ok' && hit" class="search-edge ok">
      {{ hit.count }} of {{ hit.total }} theorems match · receipt <code>{{ String(hit.receipt || '').slice(0, 8) }}</code>
    </p>
    <p v-if="state === 'fail'" class="search-edge bad">the hosted mill did not answer.</p>
    <ul class="search-list" v-if="hit && hit.matches">
      <li v-for="t in hit.matches" :key="t.key">
        <a :href="href(t.key)"><code>{{ t.key }}</code> — {{ t.name }}</a>
        <span class="search-meta">{{ t.principle }} · {{ t.skill }}</span>
      </li>
    </ul>
    <p class="search-note">Quantum advantage here is VERIFY of <code>uuidna_search</code> on the hosted door
    (<code>/mcp</code>), not a recompute of the ledger into this page. For full-text search of every page, use the box in the top bar.</p>
  </div>
</template>

<style scoped>
.search { margin: 1.5rem 0; }
.search-in { width: 100%; box-sizing: border-box; padding: .7rem .9rem; font-size: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.search-count { margin: .8rem 0 .4rem; font-size: .85rem; color: var(--vp-c-text-2); display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }
.search-verify { padding: .25rem .7rem; border: 1px solid var(--vp-c-brand-1); border-radius: 999px; background: transparent; color: var(--vp-c-brand-1); font-size: .78rem; cursor: pointer; }
.search-verify:hover:not(:disabled) { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.search-verify:disabled { opacity: .6; cursor: wait; }
.search-edge { font-size: .85rem; margin: .3rem 0 .6rem; }
.search-edge.ok { color: var(--vp-c-green-1, #18794e); }
.search-edge.bad { color: var(--vp-c-danger-1, #b8272c); }
.search-list { list-style: none; padding: 0; }
.search-list li { padding: .35rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.search-meta { display: block; font-size: .74em; color: var(--vp-c-text-3); }
.search-note { font-size: .8rem; color: var(--vp-c-text-3); margin-top: 1rem; }
</style>

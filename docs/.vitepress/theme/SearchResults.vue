<!-- SearchResults — THE FUSED SEARCH. One function (searchLedger, src/editorial.ts) serves every surface: this
     page runs it IN YOUR BROWSER over the bundled sealed ledger, the stdio MCP serves it as uuidna_search, and
     the edge serves it at /mcp. The fusion is verifiable, not asserted: "verify at the edge" sends the same
     query to the live /mcp and compares RECEIPTS — two independent parties computing the same fold. Matching
     receipts prove browser and edge hold the same ledger; a mismatch exposes divergence instantly. The local
     search itself sends nothing; only the explicit verify button calls the edge. -->
<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { searchLedger } from '../../../dist/index.js'

const q = ref('')
const local = computed(() => searchLedger(q.value))
const href = (key) => withBase(`/theorem/${key}`)

const edge = ref(null)      // { receipt, count } from the live /mcp
const edgeState = ref('')   // '' | 'asking' | 'ok' | 'fail'
async function verifyAtEdge() {
  edgeState.value = 'asking'; edge.value = null
  try {
    const res = await fetch('/mcp', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_search', arguments: { q: q.value } } }),
    })
    const d = await res.json()
    const payload = JSON.parse(d.result?.content?.[0]?.text ?? '{}')
    edge.value = { receipt: payload.receipt ?? '', count: payload.count ?? -1 }
    edgeState.value = 'ok'
  } catch { edgeState.value = 'fail' }
}
const agrees = computed(() => edge.value && edge.value.receipt === local.value.receipt)
</script>

<template>
  <div class="search">
    <input v-model="q" class="search-in" type="search" placeholder="search the sealed theorems — the same function the MCP serves, run in your browser" aria-label="search theorems" />
    <p class="search-count" v-if="q.trim()">
      {{ local.count }} of {{ local.total }} theorems match · receipt <code>{{ local.receipt.slice(0, 8) }}</code>
      <button class="search-verify" :disabled="edgeState === 'asking'" @click="verifyAtEdge">
        {{ edgeState === 'asking' ? 'asking the edge…' : 'verify at the edge' }}
      </button>
    </p>
    <p v-if="edgeState === 'ok'" class="search-edge" :class="agrees ? 'ok' : 'bad'">
      <template v-if="agrees">✓ the edge computed the SAME receipt <code>{{ edge.receipt.slice(0, 8) }}</code> — two parties, one ledger, no trust needed.</template>
      <template v-else>✗ RECEIPTS DIFFER — browser <code>{{ local.receipt.slice(0, 8) }}</code> vs edge <code>{{ edge.receipt.slice(0, 8) }}</code>: the ledgers have diverged (a deploy in flight, or a stale bundle). Reload and re-verify.</template>
    </p>
    <p v-if="edgeState === 'fail'" class="search-edge bad">the edge did not answer — the local result stands alone (evidence of one party only).</p>
    <ul class="search-list">
      <li v-for="t in local.matches" :key="t.key">
        <a :href="href(t.key)"><code>{{ t.key }}</code> — {{ t.name }}</a>
        <span class="search-meta">{{ t.principle }} · {{ t.skill }}</span>
      </li>
    </ul>
    <p class="search-note">THE FUSED SEARCH: this page, the stdio MCP (<code>uuidna_search</code>) and the live edge
    (<code>/mcp</code>) all run the ONE function over the sealed ledger and fold the matches to one receipt. Typing
    sends nothing; only "verify at the edge" calls out — and then the two receipts must agree, which you can see,
    not trust. For full-text search of every page, use the box in the top bar.</p>
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

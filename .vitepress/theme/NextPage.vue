<!-- NextPage — a clickable "next" on EVERY page, walking a canonical site order that WRAPS (a closed cover: keep
     clicking next and you visit every page, then return to the start), and referrer-aware: it records the page you
     came from (client-side, the referrer "contract") and shows it, so the trail is your own path. Off-tour pages
     (a theorem's own page, which already has its sequence/rotation compass) continue into the ledger. No network. -->
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

// the canonical reading order — the whole site as one sequence, wrapping like the theorem cover
const ORDER = [
  ['/', 'Home'], ['/theorems', 'Theorems'], ['/topics', 'Topics'], ['/search', 'Search'],
  ['/mcp', 'MCP'], ['/chat', 'Chat'], ['/books', 'Books'], ['/guides', 'Guides'], ['/games', 'Games'],
  ['/trials', 'Trials'], ['/tests', 'Tests'], ['/trading', 'Trading'], ['/deploy', 'Deploy'],
  ['/captain/message', "The captain's message"], ['/captain/navigator', 'The Navigator'],
  ['/captain/config', 'The Contract'], ['/license', 'License'],
]

const { page } = useData()
const route = computed(() => '/' + (page.value.relativePath || '').replace(/\.md$/, '').replace(/(^|\/)index$/, '$1'))
const idx = computed(() => ORDER.findIndex(([r]) => r === route.value))
const next = computed(() => (idx.value >= 0 ? ORDER[(idx.value + 1) % ORDER.length] : ['/theorems', 'the theorems']))

const from = ref(null)
onMounted(() => {
  try {
    const prev = sessionStorage.getItem('uuidna:from')
    if (prev && prev !== route.value) from.value = prev
    sessionStorage.setItem('uuidna:from', route.value)
  } catch { /* private mode / SSR — degrade to just the next link */ }
})
</script>

<template>
  <nav class="nextpage" aria-label="next page">
    <span v-if="from" class="np-from">you came from <code>{{ from }}</code></span>
    <a :href="withBase(next[0])" class="np-next">next → {{ next[1] }}</a>
  </nav>
</template>

<style scoped>
.nextpage { max-width: 1120px; margin: 2rem auto 0; padding: 0 1.5rem; display: flex; flex-wrap: wrap; gap: .5rem 1.5rem; align-items: baseline; justify-content: space-between; font-size: .85rem; }
.np-from { color: var(--vp-c-text-3); }
.np-from code { font-size: .9em; }
.np-next { font-weight: 600; color: var(--seq-center); text-decoration: none; padding: .35rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; transition: border-color .2s, background .2s; }
.np-next:hover { border-color: var(--seq-center); background: color-mix(in srgb, var(--seq-center) 8%, transparent); }
</style>

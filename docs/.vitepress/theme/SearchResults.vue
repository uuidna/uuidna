<!-- SearchResults — an honest results PAGE over the STATIC theorem index. The whole sealed ledger is bundled at
     build time (theorems()); this filters it IN THE BROWSER as you type and lists matches with links. It is a
     static client-side index, not a live search engine and not "auditing in realtime" — it searches the pages that
     were built. Nothing is sent or stored. Complements the built-in VitePress search overlay by showing results on
     their own page. -->
<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { theorems } from '../../../dist/index.js'

const T = theorems()
const q = ref('')
const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return []
  return T.filter((t) => `${t.key} ${t.name} ${t.statement} ${t.principle} ${t.skill}`.toLowerCase().includes(s)).slice(0, 60)
})
const href = (key) => withBase(`/theorem/${key}`)
</script>

<template>
  <div class="search">
    <input v-model="q" class="search-in" type="search" placeholder="search the sealed theorems — filtered in your browser" aria-label="search theorems" />
    <p class="search-count" v-if="q.trim()">{{ results.length }}<span v-if="results.length === 60">+</span> of {{ T.length }} theorems match</p>
    <ul class="search-list">
      <li v-for="t in results" :key="t.key">
        <a :href="href(t.key)"><code>{{ t.key }}</code> — {{ t.name }}</a>
        <span class="search-meta">{{ t.principle }} · {{ t.skill }}</span>
      </li>
    </ul>
    <p class="search-note">A static, client-side index of the {{ T.length }} sealed theorems — it searches what was
    built, not a live engine. Nothing is sent or stored. For the full text of every page, use the search box in the
    top bar.</p>
  </div>
</template>

<style scoped>
.search { margin: 1.5rem 0; }
.search-in { width: 100%; box-sizing: border-box; padding: .7rem .9rem; font-size: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.search-count { margin: .8rem 0 .4rem; font-size: .85rem; color: var(--vp-c-text-2); }
.search-list { list-style: none; margin: 0; padding: 0; }
.search-list li { padding: .5rem 0; border-bottom: 1px solid var(--vp-c-divider); }
.search-list a { text-decoration: none; }
.search-list a code { font-size: .82em; color: var(--vp-c-brand-1); }
.search-meta { display: block; font-size: .74rem; color: var(--vp-c-text-3); margin-top: .15rem; }
.search-note { margin: 1rem 0 0; font-size: .8rem; color: var(--vp-c-text-2); }
</style>

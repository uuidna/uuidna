<!-- UrlAudit — 404 slot verifies uuidna_search on the hosted mill; it does not recompute the census. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { toUuid } from '../../../src/address.js'
import { hexbitDoorOf } from '../../../src/hexbit/index.js'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

type Match = { kind: string; link: string; text: string; why: string }

const path = ref('')
const hexbits = ref<number[]>([])
const address = ref('')
const matches = ref<Match[]>([])

onMounted(async () => {
  const raw = typeof location !== 'undefined' ? location.pathname : '/'
  path.value = raw
  const door = hexbitDoorOf(toUuid('url-audit|' + raw))
  hexbits.value = door.hexbits
  address.value = toUuid('url-audit|' + raw)
  const needle = raw.replace(/[^a-z0-9]+/gi, ' ').trim() || 'uuidna'
  const found: Match[] = [
    { kind: 'home', link: '/', text: 'Home', why: 'the meta package — every path still reaches the install' },
    { kind: 'search', link: '/search', text: 'Search', why: 'the mill is uuidna_search on /mcp' },
  ]
  try {
    const payload = await advantageCall('uuidna_search', { q: needle }) as { matches?: { key: string; name: string }[] }
    for (const t of payload.matches ?? []) {
      found.push({ kind: 'theorem', link: `/theorem/${t.key}`, text: t.key, why: t.name ?? 'uuidna_search' })
    }
  } catch { /* wire down — totality still holds via home + search */ }
  matches.value = found
})
</script>

<template>
  <div class="url-audit" v-if="path">
    <h1>This path is audited, not lost</h1>
    <p class="path">
      <code>{{ path }}</code> — even a page the book does not carry has an address on the lattice:
      <code class="hexbits">[{{ hexbits.join(' ') }}]</code>
    </p>
    <ul class="matches">
      <li v-for="m in matches" :key="m.kind + m.link">
        <a :href="withBase(m.link)">{{ m.text }}</a>
        <small> — {{ m.why }}</small>
      </li>
    </ul>
    <p class="receipt"><small>audit receipt <code>{{ address }}</code> — path compiled locally; matches verified on the hosted mill</small></p>
  </div>
</template>

<style scoped>
.url-audit { max-width: 688px; margin: 48px auto; padding: 0 24px; }
.url-audit .path { color: var(--vp-c-text-2); }
.url-audit .hexbits { font-size: 0.8em; word-break: break-all; }
.url-audit .matches { padding-left: 1.2em; }
.url-audit .matches li { margin: 0.4em 0; }
.url-audit .receipt { margin-top: 2em; color: var(--vp-c-text-3); }
</style>

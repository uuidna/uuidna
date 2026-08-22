<!-- UrlAudit — the not-found slot IS an audit (the captain's rule: 404 is handled by the audit that parses the
     url finding relevant content to display). A thin shell over the pure hexbit app quantum/apps/url-audit:
     the path is parsed where the visitor stands, the relevant sealed content computed in the browser (exact
     path meaning from the default install, family, token matches over the ledger's own pages and theorems,
     total fallback), and the report shown with its own recomputable address. No asset, no fetch, no guess. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { auditUrl, type UrlAuditReport } from '../../../src/quantum/apps/url-audit.js'
import { data } from '../ledger.data'

const report = ref<UrlAuditReport | null>(null)

onMounted(() => {
  // the pages the walk already knows (ledger.data.next's keys are the canonical closed cycle) + every theorem key
  const pages = Object.keys(data.next ?? {}).map((route) => ({ route, text: route.replace(/^\//, '').replace(/[-/]/g, ' ') }))
  const theoremKeys = (data.theorems ?? []).map((t: { key: string }) => t.key)
  report.value = auditUrl(location.pathname, { pages, theoremKeys })
})
</script>

<template>
  <div class="url-audit" v-if="report">
    <h1>This path is audited, not lost</h1>
    <p class="path">
      <code>{{ report.path }}</code> — even a page the book does not carry has an address on the lattice:
      <code class="hexbits">[{{ report.hexbits.join(' ') }}]</code>
    </p>
    <ul class="matches">
      <li v-for="m in report.matches" :key="m.kind + m.link">
        <a :href="withBase(m.link)">{{ m.text }}</a>
        <small> — {{ m.why }}</small>
      </li>
    </ul>
    <p class="receipt"><small>audit receipt <code>{{ report.address }}</code> — recomputable by anyone from the same url</small></p>
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

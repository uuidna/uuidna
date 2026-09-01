<!-- DomainPort — THE ALPINE PORT BY DOMAIN, served from the hosted census rather than recomputed in the tab.
     The classification walks 28,635 packages; asking uuidna_domains costs one call instead of priming a 7 MB
     catalogue in the visitor's browser to answer a question the edge already holds. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

type Census = { domain: string; packages: number; origins: number; outside: number; classifier: string; note: string; claims: { key: string }[] }
const domains = ref<Census[]>([])
const honest = ref('')
const err = ref('')
const total = ref(0)

onMounted(async () => {
  try {
    const r = await advantageCall('uuidna_domains', { all: true }) as { domains?: Census[]; seeded?: { domain: string; note: string }[] }
    domains.value = r.domains ?? []
    const d0 = domains.value[0]
    total.value = d0 ? d0.packages + d0.outside : 0
    honest.value = 'The ARITHMETIC over these counts is exact and sealed as theorems. The MEMBERSHIP is a pattern '
      + 'match over Alpine’s own name and description — a measurement with known failures: a client or an SDK '
      + 'matches its engine’s name, and completion packages match the shell they serve. No sum promotes a match '
      + 'into a fact. Provenance only: nothing is installed, mounted, linked or executed.'
  } catch (e) { err.value = e instanceof Error ? e.message : String(e) }
})

const claimed = (): number => domains.value.reduce((a, d) => a + d.packages, 0)
const pct = (n: number): string => total.value ? ((100 * n) / total.value).toFixed(1) + '%' : '—'
</script>

<template>
  <article class="uuidna-card domain-port" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">The port, by domain</h3>
      <p data-slot="card-description">what Alpine publishes, classified and counted — the counting is proven, the classifying is measured</p>
    </div>
    <div data-slot="card-content">
      <p v-if="err">{{ err }}</p>
      <table v-else-if="domains.length">
        <thead><tr><th>domain</th><th>packages</th><th>origins</th><th>share</th><th>sealed claims</th></tr></thead>
        <tbody>
          <tr v-for="d in domains" :key="d.domain">
            <td>{{ d.domain }}</td>
            <td>{{ d.packages.toLocaleString() }}</td>
            <td>{{ d.origins.toLocaleString() }}</td>
            <td>{{ pct(d.packages) }}</td>
            <td>{{ d.claims.length }}</td>
          </tr>
          <tr>
            <td><strong>together</strong></td>
            <td><strong>{{ claimed().toLocaleString() }}</strong></td>
            <td>—</td>
            <td><strong>{{ pct(claimed()) }}</strong></td>
            <td>of {{ total.toLocaleString() }} published</td>
          </tr>
        </tbody>
      </table>
      <p v-else>asking the hosted census…</p>
    </div>
    <div data-slot="card-footer">
      <small>{{ honest }}</small>
      <p><a data-slot="button" href="/mcp">uuidna_domains</a><a data-slot="button" href="/catalogue">/catalogue</a></p>
    </div>
  </article>
</template>

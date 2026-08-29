<!-- AgentCoverage — 100% of Alpine APIs for external agents, through ONE hosted MCP door.
     The world has https://uuidna.com/mcp only. Every Alpine app is `uuidna_exec` {line}, not a
     uuidna_* tool per package. uuidnaOS boots here; the walk POSTs the live wire. Click starts it
     so a page view is not thousands of tools/call. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'
import {
  hostedMcpUrl, walkHostedAlpineApis, alpineMansForAgent, MCP_ALPINE_DOOR,
  type AlpineAgentCoverage,
} from '../../../src/quantum/os/agent-coverage.js'

const bootLine = ref('booting uuidnaOS…')
const line = ref('the world door is uuidna.com/mcp — one tool, every Alpine API. click to walk the man corpus through it.')
const report = ref<AlpineAgentCoverage | null>(null)
const busy = ref(false)
const ready = ref(false)
const endpoint = hostedMcpUrl()

const rpc = async (message: object): Promise<unknown> => {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(message) })
  return res.json()
}

onMounted(async () => {
  try {
    const boot = await bootUuidnaOSInBrowser(undefined, { selfTest: false })
    const c = boot.catalogue
    bootLine.value = c.present
      ? `uuidnaOS · ${c.count.toLocaleString('en-US')} packages · boot \`${boot.bootReceipt.slice(0, 8)}\``
      : `catalogue ABSENT — ${c.why}`
    ready.value = c.present
    if (!c.present) line.value = bootLine.value
  } catch (e) {
    bootLine.value = `boot refused — ${e instanceof Error ? e.message : String(e)}`
    line.value = bootLine.value
  }
})

const prove = async () => {
  if (busy.value || !ready.value) return
  busy.value = true
  line.value = `listing ${endpoint}…`
  try {
    const mans = alpineMansForAgent()
    const cov = await walkHostedAlpineApis(rpc, mans, {
      endpoint,
      onProgress: (done, total) => { line.value = `${done}/${total} through ${MCP_ALPINE_DOOR} at ${endpoint}` },
      yieldEvery: () => new Promise((r) => { requestAnimationFrame(() => r()) }),
    })
    report.value = cov
    line.value = cov.ok
      ? `${cov.covered}/${cov.listed} · ${cov.percent}% — every Alpine API answered through one hosted door`
      : !cov.doorPresent
        ? `${MCP_ALPINE_DOOR} is not on the hosted tools/list — the world cannot reach Alpine`
        : `${cov.covered}/${cov.listed} · missed ${cov.missed.join(', ')}${cov.listed - cov.covered > cov.missed.length ? '…' : ''}`
  } catch (e) {
    line.value = `wire did not answer (${endpoint}) — ${e instanceof Error ? e.message : String(e)}`
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <article class="uuidna-card uu-cover" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Alpine APIs · the world door</h3>
      <p data-slot="card-description">{{ bootLine }}</p>
    </div>
    <div data-slot="card-content">
      <p class="uu-cover-line">{{ line }}</p>
      <p class="uu-cover-meta">
        <code>{{ endpoint }}</code>
        · door <code>{{ MCP_ALPINE_DOOR }}</code>
        · not one tool per package
      </p>
      <button type="button" class="uu-cover-go" :disabled="busy || !ready" @click="prove">
        {{ busy ? 'walking the hosted door…' : 'prove 100% on uuidna.com/mcp' }}
      </button>
      <p v-if="report" class="uu-cover-meta">
        listed {{ report.listed }}
        · covered {{ report.covered }}
        · wire doors {{ report.wireDoors }}
        · receipt <code>{{ report.receipt }}</code>
      </p>
    </div>
  </article>
</template>

<style scoped>
.uu-cover { margin: 1rem 0; }
.uu-cover-line { font-family: var(--vp-font-family-mono); font-size: 13px; }
.uu-cover-meta { color: var(--vp-c-text-3); font-size: 12px; word-break: break-all; }
.uu-cover-go {
  margin-top: 0.75rem;
  padding: 0.35rem 0.75rem;
  font: inherit;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}
.uu-cover-go:disabled { opacity: 0.5; cursor: not-allowed; }
.uu-cover-go:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
</style>

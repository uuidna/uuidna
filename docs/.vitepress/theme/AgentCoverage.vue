<!-- AgentCoverage — prove the hosted door answers Alpine through uuidna_exec. Catalogue walk stays on the mill. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { hostedMcpUrl, advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const MCP_ALPINE_DOOR = 'uuidna_exec'
const bootLine = ref('asking uuidna_os…')
const line = ref('the world door is uuidna.com/mcp — one tool, every Alpine API. click to prove the door.')
const busy = ref(false)
const ready = ref(false)
const listed = ref(0)
const covered = ref(0)
const receipt = ref('')
const endpoint = hostedMcpUrl()

onMounted(async () => {
  try {
    const os = await advantageCall('uuidna_os', {}) as { bootReceipt?: string; receipt?: string }
    const boot = os.bootReceipt ?? os.receipt ?? ''
    bootLine.value = `uuidna_os · \`${String(boot).slice(0, 8)}\``
    ready.value = true
  } catch (e) {
    bootLine.value = `uuidna_os refused — ${e instanceof Error ? e.message : String(e)}`
    line.value = bootLine.value
  }
})

const prove = async () => {
  if (busy.value || !ready.value) return
  busy.value = true
  line.value = `listing ${endpoint}…`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    })
    const listedRaw = await res.json() as { result?: { tools?: { name?: string }[] } }
    const names = (listedRaw.result?.tools ?? []).map((t) => t.name).filter((n): n is string => typeof n === 'string')
    const doorPresent = names.includes(MCP_ALPINE_DOOR)
    listed.value = names.length
    if (!doorPresent) {
      covered.value = 0
      receipt.value = ''
      line.value = `${MCP_ALPINE_DOOR} is not on the hosted tools/list — the world cannot reach Alpine`
      return
    }
    line.value = `${MCP_ALPINE_DOOR} on the list — probing apk info busybox`
    const exec = await advantageCall('uuidna_exec', { line: 'apk info busybox' }) as {
      ok?: boolean; data?: { name?: string }; receipt?: string
    }
    const ok = exec.ok === true && exec.data?.name === 'busybox'
    covered.value = ok ? 1 : 0
    receipt.value = String(exec.receipt ?? '')
    line.value = ok
      ? `door ${MCP_ALPINE_DOOR} answered apk info busybox — mill covers Alpine through one hosted tool`
      : `door present, apk info busybox missed`
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
        {{ busy ? 'proving the hosted door…' : 'prove uuidna_exec on uuidna.com/mcp' }}
      </button>
      <p v-if="receipt" class="uu-cover-meta">
        tools {{ listed }}
        · probe {{ covered }}
        · receipt <code>{{ receipt }}</code>
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

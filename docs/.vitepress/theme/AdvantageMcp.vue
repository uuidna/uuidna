<!-- AdvantageMcp — quantum advantage as worked MCP calls on uuidna.com, run in the school.
     Each row is one tools/call: constructor expect, sealed theorem. uuidna_quantum is named-absent
     on the hosted wire; 2^n is uuidna_decide. Click one row — a page view is not a catalogue walk. -->
<script setup lang="ts">
import { ref } from 'vue'
import { hostedMcpUrl } from '../../../src/quantum/os/agent-coverage.js'
import { rpcCall } from '../../../src/quantum/apps/terminal.js'
import { resultText } from '../../../src/quantum/apps/terminal.js'
import {
  schoolAdvantageMcpExamples, expectHolds, hookAdvantageMcp, type AdvantageMcpExample,
} from '../../../src/school/advantage/index.js'

const cur = schoolAdvantageMcpExamples()
const endpoint = hostedMcpUrl()
const line = ref(`the world door is ${endpoint} — ${cur.examples.length} worked calls, constructor fields`)
const busy = ref<string | null>(null)
const last = ref('')

const payloadOf = (raw: unknown): unknown => {
  const text = resultText(raw)
  const first = text.split('\n')[0] ?? ''
  if (first.startsWith('{') || first.startsWith('[')) {
    try { return JSON.parse(first) } catch { return raw }
  }
  return raw
}

const callHosted = async (name: string, args: Record<string, unknown>): Promise<unknown> => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(rpcCall({ kind: 'call', name, args }, 1)),
  })
  return payloadOf(await res.json())
}

const runOne = async (ex: AdvantageMcpExample) => {
  if (busy.value) return
  busy.value = ex.id
  line.value = `${ex.tool} ${JSON.stringify(ex.arguments)}`
  try {
    const payload = await callHosted(ex.tool, ex.arguments)
    const misses = expectHolds(payload, ex.expect)
    last.value = misses.length === 0
      ? `${ex.id} · ${ex.expect.map((e) => e.path).join(', ')} matched`
      : `${ex.id} missed ${misses.map((m) => `${m.path} got ${JSON.stringify(m.got)}`).join('; ')}`
    line.value = last.value
  } catch (e) {
    last.value = `wire did not answer — ${e instanceof Error ? e.message : String(e)}`
    line.value = last.value
  } finally {
    busy.value = null
  }
}

const runPipe = async () => {
  if (busy.value) return
  busy.value = 'pipe'
  line.value = 'pipe: os → decide → crypto → …'
  try {
    const h = await hookAdvantageMcp(callHosted)
    last.value = `pipe · nest ${h.hooked.nestBelowEncoder} · rungs ${h.typeRungs} · ${h.hops.length} hops`
    line.value = last.value
  } catch (e) {
    last.value = `pipe did not answer — ${e instanceof Error ? e.message : String(e)}`
    line.value = last.value
  } finally {
    busy.value = null
  }
}
</script>

<template>
  <article class="uuidna-card uu-adv" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Quantum advantage · MCP examples</h3>
      <p data-slot="card-description">{{ line }}</p>
    </div>
    <div data-slot="card-content">
      <p class="uu-adv-meta"><code>{{ endpoint }}</code> · receipt <code>{{ cur.receipt }}</code></p>
      <p>
        <button type="button" class="uu-adv-go" :disabled="!!busy" @click="runPipe">
          {{ busy === 'pipe' ? 'calling…' : 'run pipe' }}
        </button>
      </p>
      <ul class="uu-adv-list">
        <li v-for="ex in cur.examples" :key="ex.id">
          <button type="button" class="uu-adv-go" :disabled="!!busy" @click="runOne(ex)">
            {{ busy === ex.id ? 'calling…' : 'run' }}
          </button>
          <code>{{ ex.tool }}</code>
          {{ ex.reads }}
          <small>theorem <code>{{ ex.theorem }}</code></small>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.uu-adv { margin: 1rem 0; }
.uu-adv-meta { color: var(--vp-c-text-3); font-size: 12px; word-break: break-all; }
.uu-adv-list { list-style: none; padding: 0; margin: 0.5rem 0 0; }
.uu-adv-list li { margin: 0.6rem 0; font-size: 13px; }
.uu-adv-go {
  margin-right: 0.5rem;
  padding: 0.2rem 0.55rem;
  font: inherit;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
}
.uu-adv-go:disabled { opacity: 0.5; cursor: not-allowed; }
.uu-adv-go:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
</style>

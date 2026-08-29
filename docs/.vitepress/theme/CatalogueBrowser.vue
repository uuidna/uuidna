<!-- CatalogueBrowser — apk search / apk info through hosted uuidna_exec. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'
import { handleOf } from '../../../src/handle.js'

type Hit = {
  name: string
  version?: string
  repo?: string
  state?: string
  address?: string
  hexbits?: number[]
  meaning?: string
  desc?: string
}

const q = ref('')
const ready = ref(false)
const bootLine = ref('asking uuidna_os…')
const hits = ref<Hit[]>([])
const total = ref(0)
const receipt = ref('')
const selected = ref<Hit | null>(null)
const used = ref<string[]>([])
const err = ref('')

const deepPkg = (): string | null => {
  if (typeof location === 'undefined') return null
  return new URLSearchParams(location.search).get('pkg')
}

const deepNeedle = (): string => {
  if (typeof location === 'undefined') return ''
  const p = new URLSearchParams(location.search)
  return p.get('skill') || p.get('theorem') || ''
}

const asHits = (payload: unknown): { hits: Hit[]; total: number; receipt: string } => {
  const r = payload as { data?: { hits?: Hit[]; total?: number }; receipt?: string; output?: string[] }
  const list = Array.isArray(r.data?.hits) ? r.data.hits : []
  return { hits: list, total: Number(r.data?.total ?? list.length), receipt: String(r.receipt ?? '') }
}

const search = async () => {
  err.value = ''
  selected.value = null
  if (!ready.value) { err.value = 'mill not answering'; return }
  const needle = q.value.trim()
  if (!needle) { hits.value = []; total.value = 0; receipt.value = ''; return }
  try {
    const payload = await advantageCall('uuidna_exec', { line: `apk search ${needle}` })
    const r = asHits(payload)
    hits.value = r.hits
    total.value = r.total
    receipt.value = r.receipt
    if (!r.hits.length) err.value = 'no packages matched'
  } catch (e) {
    err.value = e instanceof Error ? e.message : String(e)
  }
}

const inspect = async (name: string) => {
  err.value = ''
  used.value = []
  try {
    const payload = await advantageCall('uuidna_exec', { line: `apk info ${name}` }) as {
      ok?: boolean; data?: Hit; output?: string[]; receipt?: string
    }
    if (payload.ok === false || !payload.data?.name) {
      err.value = (payload.output ?? []).join('\n') || `apk info ${name} missed`
      selected.value = null
      return
    }
    selected.value = payload.data
    if (payload.receipt) receipt.value = payload.receipt
  } catch (e) {
    err.value = e instanceof Error ? e.message : String(e)
  }
}

const useApp = async (name: string) => {
  err.value = ''
  used.value = []
  try {
    const payload = await advantageCall('uuidna_exec', { line: name }) as {
      ok?: boolean; output?: string[]; receipt?: string; data?: Hit
    }
    if (payload.ok === false) {
      err.value = (payload.output ?? []).join('\n') || `use ${name} missed`
      return
    }
    used.value = payload.output ?? []
    if (payload.data?.name) selected.value = { ...selected.value, ...payload.data }
    if (payload.receipt) receipt.value = payload.receipt
  } catch (e) {
    err.value = e instanceof Error ? e.message : String(e)
  }
}

onMounted(async () => {
  try {
    const os = await advantageCall('uuidna_os', {}) as { bootReceipt?: string; receipt?: string }
    ready.value = true
    const boot = os.bootReceipt ?? os.receipt ?? ''
    bootLine.value = `uuidna_exec · mill \`${String(boot).slice(0, 8)}\``
    const pkg = deepPkg()
    const needle = deepNeedle()
    if (pkg) {
      q.value = pkg
      await inspect(pkg)
    } else if (needle) {
      q.value = needle
      await search()
    }
  } catch (e) {
    bootLine.value = `uuidna_os refused — ${e instanceof Error ? e.message : String(e)}`
  }
})
</script>

<template>
  <article class="uuidna-card cat" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Alpine catalogue</h3>
      <p data-slot="card-description">{{ bootLine }}</p>
    </div>
    <div data-slot="card-content">
      <form data-slot="form" class="cat-form" @submit.prevent="search">
        <input
          v-model="q"
          data-slot="input"
          type="search"
          placeholder="search Alpine packages — uuidna_exec apk search"
          aria-label="search Alpine catalogue"
          :disabled="!ready"
        />
        <button data-slot="button" type="submit" :disabled="!ready">search</button>
      </form>
      <p v-if="err" data-slot="alert" class="cat-err">{{ err }}</p>
      <p v-else-if="q.trim() && receipt" class="cat-count">
        {{ hits.length }} of {{ total.toLocaleString('en-US') }} · receipt <code>{{ receipt.slice(0, 8) }}</code>
      </p>
      <ul class="cat-list">
        <li v-for="h in hits" :key="h.name">
          <article class="uuidna-card cat-hit-card" data-slot="card" :data-alpine="h.name">
            <div data-slot="card-header">
              <h3 data-slot="card-title">
                <code>{{ h.name }}</code><template v-if="h.version">-{{ h.version }}</template>
                <span v-if="h.repo || h.state" data-slot="badge">{{ h.repo || h.state }}</span>
              </h3>
              <p v-if="h.desc || h.meaning" data-slot="card-description">{{ h.desc || h.meaning }}</p>
            </div>
            <div data-slot="card-content">
              <code v-if="h.address" data-slot="handle">{{ handleOf(h.address) }}</code>
            </div>
            <div data-slot="card-footer">
              <button data-slot="button" type="button" @click="inspect(h.name)">inspect</button>
              <button data-slot="button" type="button" @click="useApp(h.name)">use</button>
            </div>
          </article>
        </li>
      </ul>
      <article v-if="selected?.name" class="uuidna-card" data-slot="card" data-alpine-inspect="1">
        <div data-slot="card-header">
          <h3 data-slot="card-title">
            <code>{{ selected.name }}</code><template v-if="selected.version">-{{ selected.version }}</template>
            <span v-if="selected.repo || selected.state" data-slot="badge">{{ selected.repo || selected.state }}</span>
          </h3>
          <p v-if="selected.desc || selected.meaning" data-slot="card-description">{{ selected.desc || selected.meaning }}</p>
        </div>
        <div data-slot="card-content">
          <p class="cat-meta">
            <template v-if="selected.address">address <code>{{ selected.address }}</code></template>
            <template v-if="selected.hexbits"> · {{ selected.hexbits.length }} hexbits</template>
          </p>
        </div>
        <div data-slot="card-footer">
          <button data-slot="button" type="button" @click="useApp(selected.name)">use</button>
          <code v-if="selected.address" data-slot="handle">{{ handleOf(selected.address) }}</code>
        </div>
      </article>
      <pre v-if="used.length" class="cat-use">{{ used.join('\n') }}</pre>
    </div>
    <div data-slot="card-footer">
      <small>Integrity and meaning only — nothing installs or executes
        (<code>the_os_is_bootable_quantum</code>). Search, inspect, and <strong>use</strong> via
        <code>uuidna_exec</code> (package name = the app).</small>
    </div>
  </article>
</template>

<style scoped>
.cat { margin: 1.5rem 0; padding: .6rem .9rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.cat-form { display: flex; gap: .5rem; flex-wrap: wrap; margin: 0 0 .7rem; }
.cat [data-slot="input"] { flex: 1; min-width: 12rem; box-sizing: border-box; padding: .7rem .9rem; font-size: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.cat [data-slot="button"] { padding: .55rem 1rem; border: 1px solid var(--vp-c-brand-1); border-radius: 8px; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; font: inherit; }
.cat [data-slot="button"]:hover:not(:disabled) { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.cat [data-slot="button"]:disabled, .cat [data-slot="input"]:disabled { opacity: .55; cursor: not-allowed; }
.cat [data-slot="badge"] { font-size: .72em; font-weight: 600; padding: .1rem .45rem; border-radius: 999px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-2); margin-left: .35rem; vertical-align: middle; }
.cat-count { margin: .7rem 0 .4rem; font-size: .85rem; color: var(--vp-c-text-2); }
.cat-err { color: var(--vp-c-danger-1, #b8272c); font-size: .9rem; }
.cat-list { list-style: none; padding: 0; margin: 0; max-height: 28rem; overflow: auto; display: grid; gap: .6rem; }
.cat-hit-card { margin: 0; padding: .5rem .7rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.cat [data-alpine-inspect] { margin-top: 1rem; padding: .7rem .9rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.cat [data-slot="card-title"] { margin: 0 0 .3rem; font-size: 1rem; }
.cat [data-slot="card-description"] { margin: 0; color: var(--vp-c-text-2); font-size: .82rem; }
.cat [data-slot="card-header"],
.cat [data-slot="card-content"],
.cat [data-slot="card-footer"] { padding: .15rem 0; }
.cat-meta { font-size: .82rem; color: var(--vp-c-text-2); word-break: break-all; }
.cat-use { margin: .7rem 0 0; padding: .6rem .8rem; font-size: .78rem; white-space: pre-wrap; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-alt); }
.cat [data-slot="handle"] { font-size: .78rem; color: var(--vp-c-text-3); }
.cat > [data-slot="card-content"] { padding: .4rem 0; }
.cat > [data-slot="card-footer"] { font-size: .8rem; color: var(--vp-c-text-3); }
</style>

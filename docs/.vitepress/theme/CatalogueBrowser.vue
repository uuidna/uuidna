<!-- CatalogueBrowser — offline PWA shelf: boot uuidnaOS, prime the census, browse community apps locally. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'
import { browseCatalogue, inspectCataloguePackage } from '../../../src/quantum/apps/catalogue-browser.js'
import { runExecLine } from '../../../src/quantum/apps/exec-shell.js'
import { handleOf } from '../../../src/handle.js'

type Hit = {
  name: string
  version?: string
  repo?: string
  state?: string
  address?: string
  hexbits?: number[]
  desc?: string
  man?: string
  app?: string | null
}

const q = ref('')
const ready = ref(false)
const bootLine = ref('booting uuidnaOS…')
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

const search = () => {
  err.value = ''
  selected.value = null
  if (!ready.value) { err.value = 'catalogue not primed'; return }
  const r = browseCatalogue(q.value.trim(), 40, 'community')
  hits.value = r.hits
  total.value = r.total
  receipt.value = r.receipt
  if (!r.present) err.value = r.why ?? 'catalogue absent'
  else if (r.total === 0 && q.value.trim()) err.value = 'no community packages matched'
}

const inspect = (name: string) => {
  err.value = ''
  used.value = []
  const i = inspectCataloguePackage(name)
  if (!i.ok || !i.package) {
    err.value = i.detail
    selected.value = null
    return
  }
  if (i.package.repo !== 'community') {
    err.value = `${name} is [${i.package.repo}], not community`
    selected.value = null
    return
  }
  selected.value = i.package
  receipt.value = i.receipt
}

const useApp = (name: string) => {
  err.value = ''
  used.value = []
  const r = runExecLine(name)
  if (!r.ok) {
    err.value = r.output.join('\n') || `use ${name} missed`
    return
  }
  used.value = r.output
  if (r.receipt) receipt.value = r.receipt
}

onMounted(async () => {
  try {
    const boot = await bootUuidnaOSInBrowser('/alpine-catalogue.tsv')
    ready.value = boot.catalogue.present
    const n = browseCatalogue('', 1, 'community').total
    bootLine.value = boot.catalogue.present
      ? `uuidnaOS · ${n.toLocaleString('en-US')} community apps · offline · boot \`${boot.bootReceipt.slice(0, 8)}\``
      : `catalogue absent — ${boot.catalogue.why ?? 'not cached'}`
    const pkg = deepPkg()
    const needle = deepNeedle()
    if (pkg) {
      q.value = pkg
      inspect(pkg)
    } else if (needle) {
      q.value = needle
      search()
    } else {
      search()
    }
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  } catch (e) {
    bootLine.value = `boot refused — ${e instanceof Error ? e.message : String(e)}`
  }
})
</script>

<template>
  <article class="uuidna-card cat" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Alpine community apps</h3>
      <p data-slot="card-description">{{ bootLine }}</p>
    </div>
    <div data-slot="card-content">
      <form data-slot="form" class="cat-form" @submit.prevent="search">
        <input
          v-model="q"
          data-slot="input"
          type="search"
          placeholder="search community packages — offline PWA"
          aria-label="search Alpine community catalogue"
          :disabled="!ready"
        />
        <button data-slot="button" type="submit" :disabled="!ready">search</button>
      </form>
      <p v-if="err" data-slot="alert" class="cat-err">{{ err }}</p>
      <p v-else-if="ready && receipt" class="cat-count">
        {{ hits.length }} of {{ total.toLocaleString('en-US') }} community · receipt <code>{{ receipt.slice(0, 8) }}</code>
      </p>
      <ul class="cat-list">
        <li v-for="h in hits" :key="h.name">
          <article class="uuidna-card cat-hit-card" data-slot="card" :data-alpine="h.name">
            <div data-slot="card-header">
              <h3 data-slot="card-title">
                <code>{{ h.name }}</code><template v-if="h.version">-{{ h.version }}</template>
                <span v-if="h.repo || h.state" data-slot="badge">{{ h.repo || h.state }}</span>
              </h3>
              <p v-if="h.desc" data-slot="card-description">{{ h.desc }}</p>
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
          <p v-if="selected.desc" data-slot="card-description">{{ selected.desc }}</p>
        </div>
        <div data-slot="card-content">
          <p class="cat-meta">
            <template v-if="selected.address">address <code>{{ selected.address }}</code></template>
            <template v-if="selected.hexbits"> · {{ selected.hexbits.length }} hexbits</template>
            <template v-if="selected.man"> · man {{ selected.man }}</template>
            <template v-if="selected.app"> · app {{ selected.app }}</template>
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
      <small>Installable PWA — the census is precached; search primes locally after uuidnaOS boots.
        Integrity and meaning only — nothing installs or executes (<code>the_os_is_bootable_quantum</code>).</small>
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

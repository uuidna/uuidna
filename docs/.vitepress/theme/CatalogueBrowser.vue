<!-- CatalogueBrowser — THE FULL ALPINE CENSUS IN THE BROWSER. Boots uuidnaOS, primes the catalogue, then
     searches and inspects any published package locally. UI is shadcn anatomy (data-slot card/input/button/badge),
     same slots as renderTheorem / renderAlpineApp — no Tailwind, no React. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'
import { browseCatalogue, inspectCataloguePackage, type CatalogueHit, type CatalogueInspectResult } from '../../../src/quantum/apps/catalogue-browser.js'
import { catalogueNeedleOf } from '../../../src/quantum/apps/theorem-demos.js'
import { catalogueRouteOf } from '../../../src/quantum/os/catalogue.js'
import { handleOf } from '../../../src/handle.js'

const q = ref('')
const ready = ref(false)
const bootLine = ref('booting uuidnaOS…')
const hits = ref<CatalogueHit[]>([])
const total = ref(0)
const receipt = ref('')
const selected = ref<CatalogueInspectResult | null>(null)
const err = ref('')

const deepPkg = (): string | null => {
  if (typeof location === 'undefined') return null
  return new URLSearchParams(location.search).get('pkg')
}

const deepNeedle = (): string => {
  if (typeof location === 'undefined') return ''
  const p = new URLSearchParams(location.search)
  const skill = p.get('skill')
  if (skill) return catalogueNeedleOf(skill)
  return p.get('theorem') || ''
}

const search = () => {
  err.value = ''
  selected.value = null
  if (!ready.value) { err.value = 'catalogue not primed'; return }
  const r = browseCatalogue(q.value.trim())
  hits.value = r.hits
  total.value = r.total
  receipt.value = r.receipt
  if (!r.present) err.value = r.why ?? 'catalogue absent'
}

const inspect = (name: string) => {
  selected.value = inspectCataloguePackage(name)
}

onMounted(async () => {
  try {
    const boot = await bootUuidnaOSInBrowser(undefined, { selfTest: false })
    const c = boot.catalogue
    ready.value = c.present
    bootLine.value = c.present
      ? `uuidnaOS · ${c.count.toLocaleString('en-US')} packages · boot \`${boot.bootReceipt.slice(0, 8)}\``
      : `catalogue ABSENT — ${c.why}`
    const pkg = deepPkg()
    const needle = deepNeedle()
    if (pkg && c.present) {
      q.value = pkg
      selected.value = inspectCataloguePackage(pkg)
    } else if (needle && c.present) {
      q.value = needle
      search()
    }
  } catch (e) {
    bootLine.value = `boot refused — ${e instanceof Error ? e.message : String(e)}`
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
          placeholder="search Alpine packages — name or published description"
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
                <code>{{ h.name }}</code>-{{ h.version }}
                <span data-slot="badge">{{ h.repo }}</span>
              </h3>
              <p data-slot="card-description">{{ h.desc }}</p>
            </div>
            <div data-slot="card-content">
              <code data-slot="handle">{{ handleOf(h.address) }}</code>
            </div>
            <div data-slot="card-footer">
              <button data-slot="button" type="button" @click="inspect(h.name)">inspect</button>
            </div>
          </article>
        </li>
      </ul>
      <article v-if="selected?.ok && selected.package" class="uuidna-card" data-slot="card" data-alpine-inspect="1">
        <div data-slot="card-header">
          <h3 data-slot="card-title">
            <code>{{ selected.package.name }}</code>-{{ selected.package.version }}
            <span data-slot="badge">{{ selected.package.repo }}</span>
          </h3>
          <p data-slot="card-description">{{ selected.package.desc }}</p>
        </div>
        <div data-slot="card-content">
          <p class="cat-meta">route <code>{{ catalogueRouteOf(selected.package.name) }}</code> · address <code>{{ selected.package.address }}</code> · {{ selected.package.hexbits.length }} hexbits · checksum <code>{{ selected.package.checksum.slice(0, 16) }}…</code></p>
          <p v-if="selected.package.man" class="cat-meta">man {{ selected.package.man }}<template v-if="selected.package.app"> → app {{ selected.package.app }}</template></p>
          <p v-if="selected.package.deps.length" class="cat-deps">depends: {{ selected.package.deps.slice(0, 12).join(' ') }}<template v-if="selected.package.deps.length > 12"> …</template></p>
        </div>
        <div data-slot="card-footer">
          <code data-slot="handle">{{ handleOf(selected.package.address) }}</code>
        </div>
      </article>
      <p v-else-if="selected && !selected.ok" data-slot="alert" class="cat-err">{{ selected.detail }}</p>
    </div>
    <div data-slot="card-footer">
      <small>Integrity and meaning only — nothing installs or executes
        (<code>the_os_is_bootable_quantum</code>). Same surface as <code>apk search</code> / <code>apk info</code> via
        <code>uuidna_exec</code>.</small>
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
.cat-meta, .cat-deps { font-size: .82rem; color: var(--vp-c-text-2); word-break: break-all; }
.cat [data-slot="handle"] { font-size: .78rem; color: var(--vp-c-text-3); }
.cat > [data-slot="card-content"] { padding: .4rem 0; }
.cat > [data-slot="card-footer"] { font-size: .8rem; color: var(--vp-c-text-3); }
</style>

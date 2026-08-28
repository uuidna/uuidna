<!-- CatalogueBrowser — THE FULL ALPINE CENSUS IN THE BROWSER. Boots uuidnaOS, primes the catalogue, then
     searches and inspects any published package locally (browseCatalogue / inspectCataloguePackage). Same
     mint as apk info: provenance + 32 hexbits, never binary execution. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { bootUuidnaOSInBrowser } from '../../../src/quantum/os/browser-boot.js'
import { browseCatalogue, inspectCataloguePackage, type CatalogueHit, type CatalogueInspectResult } from '../../../src/quantum/apps/catalogue-browser.js'
import { catalogueRouteOf } from '../../../src/quantum/os/catalogue.js'

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
    if (pkg && c.present) {
      q.value = pkg
      selected.value = inspectCataloguePackage(pkg)
    }
  } catch (e) {
    bootLine.value = `boot refused — ${e instanceof Error ? e.message : String(e)}`
  }
})
</script>

<template>
  <div class="cat">
    <p class="cat-boot">{{ bootLine }}</p>
    <form class="cat-form" @submit.prevent="search">
      <input v-model="q" class="cat-in" type="search" placeholder="search Alpine packages — name or published description" aria-label="search Alpine catalogue" :disabled="!ready" />
      <button class="cat-go" type="submit" :disabled="!ready">search</button>
    </form>
    <p v-if="err" class="cat-err">{{ err }}</p>
    <p v-else-if="q.trim() && receipt" class="cat-count">
      {{ hits.length }} of {{ total.toLocaleString('en-US') }} · receipt <code>{{ receipt.slice(0, 8) }}</code>
    </p>
    <ul class="cat-list">
      <li v-for="h in hits" :key="h.name">
        <button type="button" class="cat-hit" @click="inspect(h.name)">
          <code>{{ h.name }}</code>-{{ h.version }}
          <span class="cat-repo">[{{ h.repo }}]</span>
          <span class="cat-desc">{{ h.desc }}</span>
        </button>
      </li>
    </ul>
    <div v-if="selected?.ok && selected.package" class="cat-detail">
      <h3><code>{{ selected.package.name }}</code>-{{ selected.package.version }} <span class="cat-repo">[{{ selected.package.repo }}]</span></h3>
      <p>{{ selected.package.desc }}</p>
      <p class="cat-meta">route <code>{{ catalogueRouteOf(selected.package.name) }}</code> · address <code>{{ selected.package.address }}</code> · {{ selected.package.hexbits.length }} hexbits · checksum <code>{{ selected.package.checksum.slice(0, 16) }}…</code></p>
      <p v-if="selected.package.man" class="cat-meta">man {{ selected.package.man }}<template v-if="selected.package.app"> → app {{ selected.package.app }}</template></p>
      <p v-if="selected.package.deps.length" class="cat-deps">depends: {{ selected.package.deps.slice(0, 12).join(' ') }}<template v-if="selected.package.deps.length > 12"> …</template></p>
    </div>
    <p v-else-if="selected && !selected.ok" class="cat-err">{{ selected.detail }}</p>
    <p class="cat-note">Integrity and meaning only — nothing installs or executes
      (<code>the_os_is_bootable_quantum</code>). Same surface as <code>apk search</code> / <code>apk info</code> via
      <code>uuidna_exec</code>.</p>
  </div>
</template>

<style scoped>
.cat { margin: 1.5rem 0; }
.cat-boot { font-size: .85rem; color: var(--vp-c-text-2); margin: 0 0 .8rem; }
.cat-form { display: flex; gap: .5rem; flex-wrap: wrap; }
.cat-in { flex: 1; min-width: 12rem; box-sizing: border-box; padding: .7rem .9rem; font-size: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.cat-go { padding: .55rem 1rem; border: 1px solid var(--vp-c-brand-1); border-radius: 8px; background: transparent; color: var(--vp-c-brand-1); cursor: pointer; }
.cat-go:hover:not(:disabled) { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
.cat-go:disabled, .cat-in:disabled { opacity: .55; cursor: not-allowed; }
.cat-count { margin: .7rem 0 .4rem; font-size: .85rem; color: var(--vp-c-text-2); }
.cat-err { color: var(--vp-c-danger-1, #b8272c); font-size: .9rem; }
.cat-list { list-style: none; padding: 0; margin: 0; max-height: 22rem; overflow: auto; }
.cat-hit { width: 100%; text-align: left; padding: .4rem 0; border: 0; border-bottom: 1px solid var(--vp-c-divider); background: transparent; color: inherit; cursor: pointer; font: inherit; }
.cat-hit:hover { color: var(--vp-c-brand-1); }
.cat-repo { font-size: .78em; color: var(--vp-c-text-3); margin-left: .35rem; }
.cat-desc { display: block; font-size: .78em; color: var(--vp-c-text-3); margin-top: .15rem; }
.cat-detail { margin-top: 1rem; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.cat-detail h3 { margin: 0 0 .4rem; font-size: 1.05rem; }
.cat-meta, .cat-deps { font-size: .82rem; color: var(--vp-c-text-2); word-break: break-all; }
.cat-note { font-size: .8rem; color: var(--vp-c-text-3); margin-top: 1rem; }
</style>

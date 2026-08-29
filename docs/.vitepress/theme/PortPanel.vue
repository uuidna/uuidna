<!-- PortPanel — pinned Alpine port via hosted uuidna_port. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const lines = ref<string[]>([])
const honest = ref('')
const err = ref('')

onMounted(async () => {
  try {
    const s = await advantageCall('uuidna_port', {}) as {
      release?: { version?: string; rootfsSha256?: string }
      branch?: string
      arch?: string
      count?: number
      driver?: { flavor?: string; sha256?: string; receipt?: string }
      bootStates?: number
      receipt?: string
      floor?: string
      honest?: string
    }
    const ver = s.release?.version ?? ''
    const sha = s.release?.rootfsSha256 ?? ''
    const drv = s.driver ?? {}
    lines.value = [
      `Alpine ${ver} · ${s.branch}/${s.arch} · ${s.count} install paths`,
      sha ? `rootfs sha256 ${sha.slice(0, 16)}…` : '',
      `driver ${drv.flavor ?? ''} · ${String(drv.sha256 ?? '').slice(0, 16)}… · receipt ${String(drv.receipt ?? '').slice(0, 8)}…`,
      `boot ${Number(s.bootStates ?? 0).toLocaleString('en-US')} states · port receipt ${String(s.receipt ?? '').slice(0, 8)}…`,
      `floor ${s.floor ?? ''}`,
    ].filter(Boolean)
    honest.value = String(s.honest ?? '')
  } catch (e) {
    err.value = e instanceof Error ? e.message : String(e)
  }
})
</script>

<template>
  <article class="uuidna-card port-panel" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Alpine port</h3>
      <p data-slot="card-description">pinned release · production observability</p>
    </div>
    <div data-slot="card-content">
      <p v-if="err">{{ err }}</p>
      <ul v-else>
        <li v-for="(line, i) in lines" :key="i">{{ line }}</li>
      </ul>
    </div>
    <div data-slot="card-footer">
      <small>{{ honest }}</small>
      <p class="port-links">
        <a data-slot="button" href="/terminal">/terminal</a>
        <a data-slot="button" href="/catalogue">/catalogue</a>
        <a data-slot="button" href="/chat">/chat</a>
      </p>
    </div>
  </article>
</template>

<style scoped>
.port-panel { margin: 1rem 0; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; font-size: .9rem; }
.port-panel [data-slot="card-title"] { margin: 0 0 .3rem; font-size: 1.05rem; }
.port-panel [data-slot="card-description"] { margin: 0; color: var(--vp-c-text-2); font-size: .82rem; }
.port-panel ul { margin: .6rem 0 0; padding-left: 1.2rem; }
.port-panel li { margin: .25rem 0; font-family: var(--vp-font-family-mono); font-size: .85rem; word-break: break-all; }
.port-panel [data-slot="card-footer"] { margin-top: .8rem; font-size: .8rem; color: var(--vp-c-text-3); }
.port-links { margin: .5rem 0 0; display: flex; flex-wrap: wrap; gap: .4rem; }
.port-panel a[data-slot="button"] { display: inline-block; padding: .35rem .7rem; border: 1px solid var(--vp-c-brand-1); border-radius: 8px; color: var(--vp-c-brand-1); text-decoration: none; font-size: .85rem; }
.port-panel a[data-slot="button"]:hover { background: var(--vp-c-brand-1); color: var(--vp-c-bg); }
</style>

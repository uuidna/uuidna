<!-- PortPanel — pinned Alpine port status on /os. shadcn card anatomy (data-slot), same as renderAlpineApp. -->
<script setup lang="ts">
import { portPanelView } from '../../../src/quantum/apps/port-panel.js'

const view = portPanelView()
</script>

<template>
  <article class="uuidna-card port-panel" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Alpine port</h3>
      <p data-slot="card-description">pinned release · production observability</p>
    </div>
    <div data-slot="card-content">
      <ul>
        <li v-for="(line, i) in view.lines" :key="i">{{ line }}</li>
      </ul>
    </div>
    <div data-slot="card-footer">
      <small>{{ view.status.honest }}</small>
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

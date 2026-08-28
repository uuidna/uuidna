<!-- PortPanel — pinned Alpine port status on /os (pure portStatus(), offline, production observability). -->
<script setup lang="ts">
import { portPanelView } from '../../../src/quantum/apps/port-panel.js'

const view = portPanelView()
</script>

<template>
  <div class="port-panel">
    <ul>
      <li v-for="(line, i) in view.lines" :key="i">{{ line }}</li>
    </ul>
    <p class="port-note">{{ view.status.honest }}</p>
    <p class="port-links">
      Shell: <a href="/terminal">/terminal</a> · Catalogue: <a href="/catalogue">/catalogue</a> ·
      MCP: <a href="/chat">/chat</a>
    </p>
  </div>
</template>

<style scoped>
.port-panel { margin: 1rem 0; padding: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; font-size: .9rem; }
.port-panel ul { margin: 0; padding-left: 1.2rem; }
.port-panel li { margin: .25rem 0; font-family: var(--vp-font-family-mono); font-size: .85rem; word-break: break-all; }
.port-note { margin: .8rem 0 0; font-size: .8rem; color: var(--vp-c-text-3); }
.port-links { margin: .5rem 0 0; font-size: .85rem; }
</style>

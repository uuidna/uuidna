<!-- Handle — a uuid rendered as its CITATION: the first-segment handle (8 hex) is shown, the WHOLE uuid is carried
     for recompute (title + data-full, click to copy). Real uuids compute; the page cites the handle, the fold is
     the full. One component, used on every page, so the handle rule is unified across the site (matches render.ts). -->
<script setup>
import { ref } from 'vue'
const props = defineProps({ uuid: { type: String, default: '' } })
const copied = ref(false)
function copy() {
  try { navigator.clipboard.writeText(props.uuid); copied.value = true; setTimeout(() => (copied.value = false), 1200) } catch { /* no clipboard — the title still shows the full */ }
}
</script>

<template>
  <code class="uuid-handle" :title="uuid + ' — click to copy the full uuid'" :data-full="uuid" role="button" tabindex="0" @click="copy" @keydown.enter="copy">{{ (uuid || '').slice(0, 8) }}<span v-if="copied" class="uuid-copied"> ✓</span></code>
</template>

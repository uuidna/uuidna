<!-- DeviceBalance — the resource balancer at the visitor's own device (the captain: "same tools balance the
     user device using uuidna.com"): the browser SELF-REPORTS what it honestly can — hardwareConcurrency as
     cores, deviceMemory (where the browser grants it) as the memory lane — into the SAME pure balanceMachine
     that judges the dev machine and (as uuidna_machine) serves the wire: one law, three surfaces, the sealed
     13/32 spare floor throughout. COMPUTED IN YOUR BROWSER; NOTHING IS SENT — the receipt on screen is yours
     to keep or recompute, and what the browser does not expose is said so, never guessed. -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { balanceMachine, type MachineBalance } from '../../../src/quantum/machine/index.js'

const b = ref<MachineBalance | null>(null)
const caveat = ref('')

onMounted(() => {
  const cores = navigator.hardwareConcurrency || 1
  // deviceMemory is coarse (GB buckets) and not granted everywhere — honesty over precision
  const devMemGb = (navigator as unknown as { deviceMemory?: number }).deviceMemory
  const memTotalMb = devMemGb ? devMemGb * 1024 : 1024
  if (!devMemGb) caveat.value = 'this browser does not expose deviceMemory — the memory lane runs on a 1 GB placeholder, said not guessed; '
  // the browser exposes no load average — the CPU lane reports idle spend (0), honestly a capacity reading
  caveat.value += 'no load average reaches a web page, so the CPU lane shows capacity, not spend'
  b.value = balanceMachine({ cores, centiLoad1: 0, memTotalMb, memFreeMb: memTotalMb, writers: [] })
})
</script>

<template>
  <div class="dev-balance" v-if="b">
    <p>
      <b>Your device, by the same law:</b> {{ b.cores }} cores · spare floor {{ b.safeFloorPermille }}‰
      ({{ b.balanced ? 'capacity holds the 13/32 law' : 'under the floor' }})
    </p>
    <p><small>receipt <code>{{ b.receipt }}</code> — computed in your browser; nothing was sent. {{ caveat }}.</small></p>
  </div>
</template>

<style scoped>
.dev-balance { border: 1px solid var(--vp-c-divider); border-radius: 8px; padding: 10px 14px; background: var(--vp-c-bg-alt); }
.dev-balance p { margin: 4px 0; }
.dev-balance code { word-break: break-all; }
</style>

<!-- Reflect — a CLIENT-SIDE content-addresser. The visitor chooses what to reflect (free text, or one device datum
     they explicitly pick), it is content-addressed IN THE BROWSER via toUuid, and the address is shown back to them.
     Nothing is sent, stored, or tracked: no fetch, no analytics, no persistence. The chosen data reflects to its
     address and never leaves the device. This is opt-in by construction — nothing happens until the visitor types
     or clicks. Privacy-preserving by design; a page visit collects nothing. -->
<script setup>
import { ref, computed } from 'vue'
import { toUuid } from '../../../dist/index.js'

const input = ref('')
const address = computed(() => (input.value ? toUuid(input.value) : '—'))

// The visitor may CHOOSE to reflect one device datum — read only on click, only into the input, never sent anywhere.
const choose = (what) => {
  if (typeof window === 'undefined') return
  if (what === 'screen') input.value = `${window.screen?.width}×${window.screen?.height}`
  else if (what === 'locale') input.value = navigator.language || ''
  else if (what === 'timezone') input.value = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
}
</script>

<template>
  <div class="reflect">
    <p class="reflect-lead">Reflect your own content to its address — <strong>in your browser</strong>. Nothing is sent, stored, or tracked.</p>
    <input v-model="input" class="reflect-in" type="text" placeholder="type or paste anything — it stays on your device" aria-label="content to reflect" />
    <p class="reflect-out">reflects to <code>{{ address }}</code></p>
    <p class="reflect-choose">
      or reflect a device datum you choose (read only when you click, never sent):
      <button @click="choose('screen')">screen size</button>
      <button @click="choose('locale')">locale</button>
      <button @click="choose('timezone')">time zone</button>
    </p>
    <p class="reflect-note">The same input always mints the same address, for anyone — that is content-addressing:
    your chosen data reflects to itself, deterministically, and never leaves your device.</p>
  </div>
</template>

<style scoped>
.reflect { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.reflect-lead { margin: 0 0 .8rem; font-size: .95rem; }
.reflect-in { width: 100%; box-sizing: border-box; padding: .6rem .8rem; font-size: 1rem; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.reflect-out { margin: .8rem 0 0; font-size: .95rem; }
.reflect-out code { font-size: .95em; }
.reflect-choose { margin: .9rem 0 0; font-size: .82rem; color: var(--vp-c-text-2); }
.reflect-choose button { margin: 0 .2rem; padding: .2rem .55rem; font-size: .82rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; }
.reflect-choose button:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.reflect-note { margin: .9rem 0 0; font-size: .8rem; color: var(--vp-c-text-2); }
</style>

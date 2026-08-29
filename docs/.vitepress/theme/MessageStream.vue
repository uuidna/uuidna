<!-- MessageStream — a live visualisation of uuidna messaging. Type a message and a passphrase, seal it, and watch it
     become a stream of uuids (the onion carried AS a uuid chain), then arrive and decrypt back. It runs the REAL
     sealStream/openStream (pure-TS ChaCha20-Poly1305) IN THE BROWSER — nothing is sent, stored, or tracked. The
     chain animates in node-by-node as it "transmits". HONEST: secrecy is the ChaCha20-Poly1305 layer(s) keyed by the
     passphrase; the uuid transport is PUBLIC and hides nothing (it is imprint, not encryption) — opening still needs
     the passphrase. Sealing runs PBKDF2, so it is a deliberate button press, not per-keystroke. -->
<script setup>
import { ref } from 'vue'
import { sealStream, openStream } from '../../../src/stream.js'

const message = ref('the vortex speaks at 432 Hz')
const passphrase = ref('gold-string-60')
const layers = ref(1)
const sealed = ref(null)
const arrived = ref(null)
const ok = ref(false)
const busy = ref(false)
const error = ref('')

const keysFor = () => Array.from({ length: layers.value }, (_, i) => (layers.value > 1 ? `${passphrase.value}:${i}` : passphrase.value))

function transmit() {
  busy.value = true; error.value = ''; sealed.value = null; arrived.value = null; ok.value = false
  // Let "sealing…" paint before the blocking PBKDF2.
  setTimeout(() => {
    try {
      const keys = keysFor()
      const s = sealStream(message.value, keys) // onion-seal → uuid chain
      const back = openStream(s.uuids, keys) // round-trip: peel it open again
      sealed.value = s
      arrived.value = back
      ok.value = back === message.value
    } catch (e) { error.value = e.message || String(e) }
    busy.value = false
  }, 30)
}
</script>

<template>
  <div class="ms">
    <div class="ms-inputs">
      <label>message<input v-model="message" type="text" placeholder="anything — it stays on your device" /></label>
      <div class="ms-row">
        <label class="ms-pass">passphrase<input v-model="passphrase" type="text" /></label>
        <label class="ms-layers">layers <input v-model.number="layers" type="range" min="1" max="6" /> <b>{{ layers }}</b></label>
      </div>
      <button class="ms-go" :disabled="busy" @click="transmit">{{ busy ? 'sealing…' : 'Seal & transmit →' }}</button>
    </div>

    <div v-if="error" class="ms-err">{{ error }}</div>

    <div v-if="sealed" class="ms-out">
      <p class="ms-meta"><b>{{ sealed.layers }}</b> ChaCha20-Poly1305 layer<span v-if="sealed.layers>1">s</span> · carried as <b>{{ sealed.uuids.length }}</b> uuid<span v-if="sealed.uuids.length>1">s</span> · receipt <code>{{ sealed.receipt.slice(0, 8) }}…</code></p>
      <div class="ms-chain">
        <template v-for="(u, i) in sealed.uuids" :key="i">
          <code class="ms-uuid" :style="{ animationDelay: i * 90 + 'ms' }">{{ u.slice(0, 13) }}…</code>
          <span v-if="i < sealed.uuids.length - 1" class="ms-link" :style="{ animationDelay: (i * 90 + 45) + 'ms' }">→</span>
        </template>
      </div>
      <p class="ms-arrive" :class="{ ok }">arrives, decrypts to: <span>{{ arrived }}</span> <b v-if="ok">✓ round-trip</b></p>
    </div>

    <p class="ms-note">Real ChaCha20-Poly1305, sealed and opened <strong>in your browser</strong> — nothing sent. Secrecy
    is the passphrase (and the layers); the uuid stream itself is <em>public</em> transport and hides nothing — opening
    still needs the key. A wrong key or any tamper fails Poly1305 authentication.</p>
  </div>
</template>

<style scoped>
.ms { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.ms-inputs label { display: block; font-size: .85rem; color: var(--vp-c-text-2); margin-bottom: .5rem; }
.ms-inputs input[type=text] { display: block; width: 100%; box-sizing: border-box; margin-top: .2rem; padding: .5rem .7rem; border: 1px solid var(--vp-c-divider); border-radius: 7px; background: var(--vp-c-bg); color: var(--vp-c-text-1); font-size: .95rem; }
.ms-row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: end; }
.ms-pass { flex: 1; min-width: 12rem; }
.ms-layers { white-space: nowrap; }
.ms-layers b { color: var(--seq-center); }
.ms-go { margin-top: .3rem; padding: .5rem 1rem; border: 1px solid var(--seq-center); border-radius: 7px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; font-size: .9rem; }
.ms-go:disabled { opacity: .6; cursor: wait; }
.ms-go:hover:not(:disabled) { background: var(--vp-c-bg); }
.ms-err { margin-top: .8rem; color: var(--seq-1); font-size: .85rem; }
.ms-out { margin-top: 1rem; }
.ms-meta { font-size: .85rem; color: var(--vp-c-text-2); margin: 0 0 .6rem; }
.ms-chain { display: flex; flex-wrap: wrap; gap: .3rem; align-items: center; }
.ms-uuid { font-size: .78rem; padding: .25rem .5rem; border: 1px solid var(--seq-center); border-radius: 6px; background: var(--vp-c-bg-soft); opacity: 0; animation: msIn .3s ease forwards; }
.ms-link { color: var(--vp-c-text-3); opacity: 0; animation: msIn .3s ease forwards; }
@keyframes msIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.ms-arrive { margin: .9rem 0 0; font-size: .9rem; color: var(--vp-c-text-2); }
.ms-arrive span { color: var(--vp-c-text-1); }
.ms-arrive.ok b { color: var(--seq-center); margin-left: .4rem; }
.ms-note { margin: 1rem 0 0; font-size: .8rem; color: var(--vp-c-text-2); }
</style>

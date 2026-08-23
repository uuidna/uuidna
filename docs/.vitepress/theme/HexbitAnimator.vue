<!-- HexbitAnimator — the shell of the kernel's second layer (lead 94): the pure app hands over integer keyframes
     (ray indexes, levels, glyphs, times) and THIS shell does the only things a shell may do — trigonometry and
     paint. Sound and motion from ONE uuid: the same states drive the player's exact bytes and this ring's
     moving light, bar-for-bar aligned by the sealed arithmetic (4032 samples = 24 film slots — no sync code,
     just the same integer). The fold is printed; every layer refolds to it or the rendering is not the uuid's.
     Nothing typed leaves the page; everything shown recomputes anywhere. -->
<script setup>
import { ref, computed } from 'vue'
import { layersOf, BAR_MS, GAP_MS } from '../../../src/quantum/apps/hexbit-animator.js'
import { toUuid } from '../../../src/address.js'

const input = ref('the sixteen open | the store derives its shelves | the reading room reads | the wing of rhodes turns')
const layers = ref(null)
const audioSrc = ref('')
const playing = ref(-1)
let timers = []

const R = 110, C = 140
const xy = (ray, level) => {
  const a = (ray * 22.5 - 90) * Math.PI / 180        // paint-side trig: the app gave an integer sixteenth
  const r = 30 + (R - 30) * level / 16
  return [C + r * Math.cos(a), C + r * Math.sin(a)]
}

const build = () => {
  timers.forEach(clearTimeout); timers = []; playing.value = -1
  const u = toUuid(input.value)
  const states = [...u.replace(/-/g, '')].map((c) => parseInt(c, 16))
  const L = layersOf(states)
  layers.value = { uuid: u, fold: L.animation.fold, handle: L.animation.handle, frames: L.animation.keyframes, totalMs: L.animation.totalMs, audioAddr: L.recording.address }
  audioSrc.value = URL.createObjectURL(new Blob([L.recording.bytes], { type: 'audio/wav' }))
}

const sing = () => {
  if (!layers.value) build()
  const audio = document.getElementById('hexbit-animator-audio')
  if (audio) { audio.currentTime = 0; audio.play() }
  layers.value.frames.forEach((f) => {
    timers.push(setTimeout(() => { playing.value = f.index }, f.atMs))
    timers.push(setTimeout(() => { if (playing.value === f.index) playing.value = -1 }, f.atMs + BAR_MS))
  })
}
const dots = computed(() => layers.value ? layers.value.frames.map((f) => ({ ...f, p: xy(f.ray, f.level) })) : [])
</script>

<template>
  <div class="hexbit-animator">
    <input v-model="input" style="width:100%" placeholder="anything — it folds to a uuid, and the uuid sings and moves" />
    <p><button @click="build">fold the layers</button> <button @click="sing" :disabled="!layers">sing the layers ▶</button></p>
    <template v-if="layers">
      <audio id="hexbit-animator-audio" :src="audioSrc" style="display:none"></audio>
      <svg viewBox="0 0 280 280" style="max-width:320px; width:100%">
        <circle :cx="C" :cy="C" :r="R" fill="none" stroke="var(--vp-c-divider)" />
        <g v-for="d in dots" :key="d.index">
          <circle :cx="d.p[0]" :cy="d.p[1]" :r="playing === d.index ? 11 : 4"
                  :fill="playing === d.index ? 'var(--vp-c-brand-1)' : 'var(--vp-c-text-3)'" :opacity="playing === d.index ? 1 : 0.5" />
          <text v-if="playing === d.index" :x="d.p[0]" :y="d.p[1] - 15" text-anchor="middle" style="font-size:20px; fill: var(--vp-c-text-1)">{{ d.glyph }}</text>
        </g>
      </svg>
      <p><small>one identity, three layers — fold <code>{{ layers.handle }}</code> · sound <code>{{ layers.audioAddr }}</code> ·
        {{ layers.frames.length }} keyframes over {{ layers.totalMs }} ms, every bar 24 film slots of 168 samples
        (the movie and the song are one) — computed in your browser from the uuid only</small></p>
    </template>
  </div>
</template>

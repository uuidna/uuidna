<!-- SchoolTools — the school's three instruments in one shell (lead 81), each a pure src/quantum/apps import
     computed in the visitor's browser (the captain's law: no assets, all computes in browser, hexbit quantum
     apps only). TESTING: the claim trial with its controls run first, verdict + receipt rendered client-side.
     EDITING: the ℤ/24 frame ring — apply a unit stride, undo it, watch every unit square to one. BUILDING:
     compose hexbit states, hear them on the lattice, read the door and the beats off your own composition.
     Everything shown recomputes on any machine; nothing here is served, stored, or sent — the student's claim,
     edits and compositions never leave the page. -->
<script setup>
import { ref, computed } from 'vue'
import { testClaim, start, applyStride, undo, UNITS_24, FRAME_RING, build } from '../../../src/quantum/apps/categories/coding/index.js'
import { renderStates } from '../../../src/quantum/apps/hexbit-player.js'

// ── testing
const claim = ref('the round turns on seven, proven by theorem song_round_turns_on_seven')
const result = ref(null)
const runTest = () => { result.value = testClaim(claim.value) }

// ── editing
const edit = ref(start())
const stride = (u) => { edit.value = applyStride(edit.value, u) }
const undoOne = () => { edit.value = undo(edit.value) }

// ── building
const statesText = ref('1 2 4 8 7 5')
const comp = ref(null)
const audioSrc = ref('')
const buildIt = () => {
  const states = statesText.value.split(/[\s,]+/).filter(Boolean).map(Number)
  try {
    const c = build(states)
    comp.value = { door: c.door, multiplier: c.multiplier, beats: c.beats, address: c.address, states: c.states, error: '' }
    audioSrc.value = URL.createObjectURL(new Blob([renderStates(c.states).bytes], { type: 'audio/wav' }))
  } catch (e) { comp.value = { error: String(e.message || e) }; audioSrc.value = '' }
}
const ringDots = computed(() => Array.from({ length: FRAME_RING }, (_, i) => i))
</script>

<template>
  <div class="school-tools">
    <h3>Test — the trial, controls first</h3>
    <textarea v-model="claim" rows="2" style="width:100%"></textarea>
    <button @click="runTest">run the trial</button>
    <div v-if="result">
      <p><small v-for="c in result.controls" :key="c.name">{{ c.rejected ? '✓' : '✗' }} control «{{ c.name }}» {{ c.rejected ? 'rejected' : 'ACCEPTED — VOID' }}<br/></small></p>
      <p v-if="result.subject"><strong>{{ result.subject.verdict }}</strong> — {{ result.subject.note }}<br/><small>receipt <code>{{ result.subject.receipt }}</code></small></p>
      <p v-if="result.notice?.where"><em>{{ result.notice.where }}</em></p>
    </div>

    <h3>Edit — the ring whose undo is its own law</h3>
    <p>position <strong>{{ edit.position }}</strong> of {{ FRAME_RING }} · history [{{ edit.history.join(', ') }}]</p>
    <p><button v-for="u in UNITS_24" :key="u" @click="stride(u)">+{{ u }}</button> <button @click="undoOne">undo</button></p>
    <p><span v-for="d in ringDots" :key="d">{{ d === edit.position ? '●' : '·' }}</span></p>

    <h3>Build — compose on the lattice</h3>
    <input v-model="statesText" style="width:100%" placeholder="states 0..15, space-separated" />
    <button @click="buildIt">build</button>
    <div v-if="comp">
      <p v-if="comp.error"><em>{{ comp.error }}</em></p>
      <template v-else>
        <audio v-if="audioSrc" controls :src="audioSrc" style="width:100%"></audio>
        <p><small>door {{ comp.door }} (×{{ comp.multiplier }}) · beats [{{ comp.beats.join(', ') }}] Hz · address <code>{{ comp.address }}</code> — computed in your browser just now</small></p>
      </template>
    </div>
  </div>
</template>

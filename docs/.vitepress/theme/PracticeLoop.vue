<!-- PracticeLoop — the practice shelf's four instruments in one shell (lead 81c), each a pure
     categories/practice import computed in the visitor's browser. DRILL a sealed theorem, attempt it,
     fold attempts to one order-invariant receipt, meter the trinity close, and walk prerequisites.
     Nothing leaves the page. -->
<script setup>
import { ref, computed } from 'vue'
import {
  drillOf, attemptDrill, foldFeedback, meterLoop, CLOSES_AT,
} from '../../../src/quantum/apps/categories/practice/index.js'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const key = ref('two_coins')
const drill = ref(null)
const error = ref('')
const trials = ref([])
const load = async () => {
  error.value = ''
  try {
    const t = await advantageCall('uuidna_theorem', { key: key.value.trim() })
    const d = drillOf(key.value.trim(), [{
      key: String(t.key), name: String(t.name), statement: String(t.statement),
      cases: 1, skill: String(t.paper?.skill ?? t.skill ?? 'unskilled'),
    }])
    drill.value = { key: d.key, name: d.name, statement: d.statement, cases: d.cases, skill: d.skill }
  } catch (e) {
    drill.value = null
    error.value = String(e.message || e)
  }
}
const attempt = (correct) => {
  if (!drill.value) return
  trials.value = [...trials.value, { correct, ms: 500 }]
}
const fold = computed(() => {
  if (!trials.value.length || !drill.value) return null
  const recorded = trials.value.map((t) => attemptDrill(
    { key: drill.value.key, name: drill.value.name, statement: drill.value.statement, cases: drill.value.cases, skill: drill.value.skill },
    t.correct, t.ms,
  ))
  return foldFeedback(recorded)
})
const meter = computed(() => meterLoop(trials.value.map((t) => t.correct)))
load()
</script>

<template>
  <div class="practice-loop">
    <h3>Drill — a sealed theorem as a recompute challenge</h3>
    <input v-model="key" style="width:100%" placeholder="theorem key" @change="load" />
    <button @click="load">load drill</button>
    <p v-if="error"><em>{{ error }}</em></p>
    <div v-if="drill">
      <p><strong>{{ drill.key }}</strong> · {{ drill.cases }} cases · skill {{ drill.skill }}</p>
      <p><code>{{ drill.statement }}</code></p>
      <p>
        <button @click="attempt(true)">mark recomputed</button>
        <button @click="attempt(false)">mark missed</button>
      </p>
    </div>
    <p v-if="fold"><small>fold receipt <code>{{ fold.receipt }}</code> · {{ trials.length }} attempts — order-invariant, answer-blind</small></p>
    <p v-if="meter">
      <small>meter: {{ meter.closed ? 'CLOSED' : 'open' }} at {{ CLOSES_AT }} · streak {{ meter.streak }}
        · reopened {{ meter.reopened }}</small>
    </p>
    <h3>Walk — prerequisites before the target</h3>
    <p><small>Walk the sealed citations on <code>uuidna_theorem</code> — this page does not recompute the ledger.</small></p>
    <p><em>The drill presents and records — it never grades understanding. The mill is the hosted door.</em></p>
  </div>
</template>

<style scoped>
.practice-loop { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.practice-loop h3 { margin-top: 1rem; }
.practice-loop h3:first-child { margin-top: 0; }
.practice-loop input { padding: .4rem .6rem; margin: .4rem 0; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.practice-loop button { margin: .25rem .4rem .25rem 0; padding: .35rem .7rem; }
.practice-loop code { font-size: .85rem; word-break: break-all; }
</style>

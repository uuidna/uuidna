<!-- PracticeLoop — the practice shelf's instruments in one shell (lead 81c). DRILL a sealed theorem, answer its
     predict-the-value exercise, fold the checked attempts to one order-invariant receipt, and meter the trinity close.
     The verdict is the Worker's: /school/attempt re-evaluates the statement with your value using the repository's
     evaluator, so an attempt counts as recomputed only when the check says so. A theorem with no checked exercise can
     be marked by hand, and that mark is labelled self-assessment wherever it is shown. -->
<script setup>
import { ref, computed } from 'vue'
import {
  drillOf, attemptDrill, foldFeedback, meterLoop, CLOSES_AT,
} from '../../../src/quantum/apps/categories/practice/index.js'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'
import { splitAt, courseSlugOf, isAnswer, CHECK_LABEL } from '../../../src/school/lesson/shape/index.js'

const key = ref('mul9_2_5')
const drill = ref(null)
const exercise = ref(null)
const course = ref('')
const error = ref('')
const answer = ref('')
const status = ref('')
const trials = ref([])
const load = async () => {
  error.value = ''
  status.value = ''
  answer.value = ''
  exercise.value = null
  try {
    const t = await advantageCall('uuidna_theorem', { key: key.value.trim() })
    const d = drillOf(key.value.trim(), [{
      key: String(t.key), name: String(t.name), statement: String(t.statement),
      cases: 1, skill: String(t.paper?.skill ?? t.skill ?? 'unskilled'),
    }])
    drill.value = { key: d.key, name: d.name, statement: d.statement, cases: d.cases, skill: d.skill }
    course.value = courseSlugOf(String(t.file))
    const res = await fetch(`/school/${encodeURIComponent(course.value)}.json`)
    const file = res.ok ? await res.json() : null
    const lesson = file?.lessons?.find((l) => l.key === d.key)
    exercise.value = lesson?.exercise ? lesson.exercise : null
  } catch (e) {
    drill.value = null
    error.value = String(e.message || e)
  }
}
const parts = computed(() => (drill.value && exercise.value ? splitAt(drill.value.statement, exercise.value) : null))
const record = (correct, checked) => { trials.value = [...trials.value, { correct, checked, ms: 500 }] }
const check = async () => {
  const a = answer.value.trim()
  if (!isAnswer(a)) { status.value = 'Enter a whole number in digits, with no sign and no leading zero.'; return }
  status.value = 'Checking…'
  try {
    const res = await fetch('/school/attempt', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ course: course.value, lesson: drill.value.key, answer: a }) })
    const data = await res.json().catch(() => ({}))
    if (data.verdict !== 'correct' && data.verdict !== 'incorrect') { status.value = data.error || `The checker answered ${res.status}.`; return }
    record(data.verdict === 'correct', true)
    status.value = data.verdict === 'correct' ? `Correct: with ${a} the statement evaluates true.` : `Not yet: with ${a} the statement evaluates false.`
  } catch (e) { status.value = `The checker runs on the uuidna.com Worker and did not answer (${String(e?.message || e)}).` }
}
const selfChecked = computed(() => trials.value.filter((t) => !t.checked).length)
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
    <h3>Drill — a sealed theorem, answered and checked</h3>
    <label for="practice-key">Theorem key</label>
    <input id="practice-key" v-model="key" style="width:100%" autocomplete="off" @change="load" />
    <button type="button" @click="load">Load drill</button>
    <p v-if="error" role="alert"><em>{{ error }}</em></p>
    <div v-if="drill">
      <p><strong>{{ drill.name }}</strong> · <a :href="`/theorem/${drill.key}`">{{ drill.key }}</a> · skill {{ drill.skill }}</p>
      <form v-if="parts" @submit.prevent="check">
        <p class="blanked"><code>{{ parts.before }}</code><input v-model="answer" class="blank" inputmode="numeric" autocomplete="off"
          :size="parts.blank.length + 2" aria-label="The missing number" aria-describedby="practice-label" /><code>{{ parts.after }}</code></p>
        <button type="submit">Check my answer</button>
        <p id="practice-label"><small>A check is {{ CHECK_LABEL }}.</small></p>
      </form>
      <template v-else>
        <p><code>{{ drill.statement }}</code></p>
        <p><small>This theorem carries no checked exercise. Recompute it yourself, then mark the result — a self-assessment, unchecked by anyone.</small></p>
        <p>
          <button type="button" @click="record(true, false)">Self-assessment: I recomputed it</button>
          <button type="button" @click="record(false, false)">Self-assessment: I missed it</button>
        </p>
      </template>
      <p role="status" aria-live="polite">{{ status }}</p>
    </div>
    <p v-if="fold"><small>fold receipt <code>{{ fold.receipt }}</code> · {{ trials.length }} attempts ({{ trials.length - selfChecked }} checked, {{ selfChecked }} self-assessed) — order-invariant, answer-blind</small></p>
    <p v-if="meter">
      <small>meter: {{ meter.closed ? 'CLOSED' : 'open' }} at {{ CLOSES_AT }} · streak {{ meter.streak }}
        · reopened {{ meter.reopened }}</small>
    </p>
    <p><em>For whole courses, a saved record and certificates, use <a href="/school/learn">the learn page</a>.</em></p>
  </div>
</template>

<style scoped>
.practice-loop { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.practice-loop h3 { margin-top: 1rem; }
.practice-loop h3:first-child { margin-top: 0; }
.practice-loop label { display: block; font-weight: 600; margin-top: .4rem; }
.practice-loop input { padding: .4rem .6rem; margin: .4rem 0; border: 1px solid var(--vp-c-text-2); border-radius: 6px; background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.practice-loop input.blank { width: auto; margin: 0 .25rem; text-align: center; }
.practice-loop button { margin: .25rem .4rem .25rem 0; padding: .35rem .7rem; }
.practice-loop a:focus-visible, .practice-loop button:focus-visible, .practice-loop input:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: 2px; }
.practice-loop code { font-size: .85rem; word-break: break-all; }
.practice-loop .blanked { overflow-x: auto; }
</style>

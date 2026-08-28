<!-- TheoremUse — proof of work + concept on every theorem page: drill the sealed statement,
     record attempts (order-invariant fold), link to the skill shelf and Alpine catalogue. -->
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue'
import {
  drillOf, attemptDrill, foldFeedback, meterLoop, CLOSES_AT,
} from '../../../src/quantum/apps/categories/practice/index.js'
import { LEAN_LEDGER } from '../../../src/theorems/generated.js'

const props = defineProps({ theoremKey: { type: String, default: '' } })
const { params } = useData()

const key = computed(() => (props.theoremKey || params.value?.key || params.value?.id || '').trim())
const drill = ref(null)
const error = ref('')
const trials = ref([])

const load = () => {
  error.value = ''
  trials.value = []
  if (!key.value) { drill.value = null; return }
  try {
    const d = drillOf(key.value, LEAN_LEDGER)
    drill.value = { key: d.key, name: d.name, statement: d.statement, cases: d.cases, skill: d.skill }
  } catch (e) {
    drill.value = null
    error.value = String(e.message || e)
  }
}

watch(key, load, { immediate: true })
onMounted(load)

const attempt = (correct) => {
  if (!drill.value) return
  trials.value = [...trials.value, { correct, ms: 400 }]
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

const use = computed(() => params.value?.use || null)
const shelfHref = computed(() => {
  const r = use.value?.shelf?.route || '/school'
  return `${r}?key=${encodeURIComponent(key.value)}`
})
const catalogueHref = computed(() =>
  use.value?.alpineApps ? `/catalogue?theorem=${encodeURIComponent(key.value)}` : null,
)
</script>

<template>
  <div v-if="key" class="theorem-use">
    <h3>Proof of work — recompute the seal</h3>
    <p class="tu-lede">
      Minting is free once the kernel decides (<code>by decide</code>); the drill is the work —
      recompute this statement and record the attempt. Nothing leaves your browser.
    </p>
    <p v-if="error"><em>{{ error }}</em></p>
    <div v-if="drill" class="tu-drill">
      <p><strong>{{ drill.key }}</strong> · {{ drill.cases }} case{{ drill.cases === 1 ? '' : 's' }} · skill <code>{{ drill.skill }}</code></p>
      <pre class="tu-stmt">{{ drill.statement }}</pre>
      <p>
        <button type="button" @click="attempt(true)">I recomputed it</button>
        <button type="button" class="tu-muted" @click="attempt(false)">Not yet</button>
      </p>
      <p v-if="fold"><small>Proof-of-work receipt <code>{{ fold.receipt }}</code> · {{ trials.length }} attempt(s) — order-invariant</small></p>
      <p v-if="meter"><small>Meter: {{ meter.closed ? 'CLOSED' : 'open' }} at {{ CLOSES_AT }} · streak {{ meter.streak }}</small></p>
    </div>

    <h3>Use the concept</h3>
    <p class="tu-lede">Alpine apps and browser shelves demonstrate the skill this theorem teaches.</p>
    <p class="tu-actions">
      <VPButton v-if="use?.shelf" theme="brand" size="medium" :href="shelfHref" :text="use.shelf.label" />
      <VPButton v-if="catalogueHref" theme="alt" size="medium" :href="catalogueHref"
        :text="`${use.alpineApps} Alpine apps harmonised`" />
      <VPButton theme="alt" size="medium" href="/catalogue" text="Browse Alpine catalogue" />
      <VPButton theme="alt" size="medium" href="/terminal" text="uuidnaOS terminal" />
    </p>
    <p><em>{{ use?.honest || 'The drill presents and records; Alpine harmonisation is integrity, not execution.' }}</em></p>
  </div>
</template>

<style scoped>
.theorem-use { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; background: var(--vp-c-bg-soft); }
.theorem-use h3 { margin: 1rem 0 0.4rem; font-size: 1.05rem; }
.theorem-use h3:first-child { margin-top: 0; }
.tu-lede { font-size: 0.92rem; color: var(--vp-c-text-2); margin: 0.4rem 0 0.8rem; }
.tu-drill pre.tu-stmt { overflow-x: auto; padding: 0.6rem 0.8rem; border-radius: 6px; background: var(--vp-c-bg); font-size: 0.85rem; }
.theorem-use button { margin-right: 0.5rem; padding: 0.35rem 0.75rem; border-radius: 6px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); cursor: pointer; }
.theorem-use button.tu-muted { opacity: 0.85; }
.tu-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
</style>

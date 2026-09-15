<!-- RightsDoor — the public's door to the right to land and to access. Paste a claim or a link: the hosted
     uuidna_land_rights door answers VERIFIED / UNVERIFIED against the sealed instrument table, or reads the page and
     returns the legislative paths it touches. Every answer carries a receipt signed by 2×7 theorems, so anyone can
     re-verify it. Integrity of the citation, not legal advice. -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

interface Path {
  instrument: string; title: string; kind: string; body: string; article: string; topic: string
  summary: string; qualifications: string; url: string; shared?: number; details?: number
}
interface Seal { address: string; seal: string | null; signed: number; of: number; legal: boolean }
interface Answer {
  verdict?: 'VERIFIED' | 'UNVERIFIED'; why?: string; found?: Path[]; nearest?: Path[]
  url?: string; reached?: boolean; note?: string; paths?: Path[]
  citations?: { detail: string; verdict: string; why: string }[]
  audit?: { outcome: string; details: number; counts: { verified: number; refuted: number; unverified: number; drained: number } } | null
  honest?: string; sealedBy?: Seal
}

const EXAMPLES = [
  'UNDROP Art. 17 recognises a right to land',
  'Regeringsformen 2 kap. 15 § gives everyone access to nature',
  'The Bulgarian Forests Act art. 144(1) gives free access to forests',
]

const input = ref(EXAMPLES[0]!)
const busy = ref(false)
const answer = ref<Answer | null>(null)
const failure = ref('')
const isLink = computed(() => /^https?:\/\//i.test(input.value.trim()))
const isReport = computed(() => answer.value?.reached !== undefined)
const rows = computed<Path[]>(() => {
  const a = answer.value
  if (!a) return []
  if (isReport.value) return a.paths ?? []
  return a.found?.length ? a.found : a.nearest ?? []
})
const rowsHeading = computed(() => {
  const a = answer.value
  if (!a) return ''
  if (isReport.value) return 'Legislative paths the page touches — strongest shared vocabulary first'
  return a.found?.length ? 'What the sealed table records for this citation' : 'Nearest rows the sealed table does hold'
})

async function run(): Promise<void> {
  const text = input.value.trim()
  if (!text || busy.value) return
  busy.value = true
  failure.value = ''
  answer.value = null
  try {
    answer.value = await advantageCall('uuidna_land_rights', isLink.value ? { url: text } : { claim: text }) as Answer
  } catch (e) {
    failure.value = `The door did not answer (${e instanceof Error ? e.message : String(e)}). Nothing was checked — try again.`
  } finally {
    busy.value = false
  }
}

function useExample(e: string): void { input.value = e; void run() }
</script>

<template>
  <article class="uuidna-card uu-rights" data-slot="card">
    <div data-slot="card-header">
      <h3 data-slot="card-title">Check a land-rights citation, or read a link</h3>
      <p data-slot="card-description">
        Paste a claim that cites an instrument and article, or a link to a page. Every answer is checked against
        instruments read from their official sources and comes with a receipt anyone can re-verify.
      </p>
    </div>

    <form class="uu-rights-form" @submit.prevent="run">
      <label for="uu-rights-input">Claim or link</label>
      <textarea id="uu-rights-input" v-model="input" rows="2" spellcheck="false"
        placeholder="UNDROP Art. 17 recognises a right to land — or https://…" />
      <div class="uu-rights-actions">
        <button type="submit" :disabled="busy || !input.trim()">
          {{ busy ? (isLink ? 'Reading the page…' : 'Checking…') : (isLink ? 'Read link' : 'Check claim') }}
        </button>
        <span class="uu-rights-try">Try:
          <button v-for="e in EXAMPLES" :key="e" type="button" class="uu-rights-example" :disabled="busy" @click="useExample(e)">{{ e }}</button>
        </span>
      </div>
    </form>

    <div class="uu-rights-result" aria-live="polite">
      <p v-if="failure" class="uu-rights-failure">{{ failure }}</p>

      <template v-if="answer">
        <p v-if="isReport && !answer.reached" class="uu-rights-why">
          <span class="uu-chip uu-chip-warn">NOT READ</span> The page could not be read: {{ answer.note }}. Nothing else is reported.
        </p>

        <template v-else-if="isReport">
          <p class="uu-rights-why">
            <span class="uu-chip">REPORT</span>
            {{ answer.audit?.details ?? 0 }} statements audited
            ({{ answer.audit?.counts.verified ?? 0 }} verified, {{ answer.audit?.counts.refuted ?? 0 }} refuted,
            {{ answer.audit?.counts.unverified ?? 0 }} unverified) · {{ answer.citations?.length ?? 0 }} instrument citation(s) checked.
          </p>
          <ul v-if="answer.citations?.length" class="uu-rights-citations">
            <li v-for="c in answer.citations" :key="c.detail">
              <span :class="['uu-chip', c.verdict === 'VERIFIED' ? 'uu-chip-ok' : 'uu-chip-warn']">{{ c.verdict }}</span>
              “{{ c.detail }}” — {{ c.why }}
            </li>
          </ul>
        </template>

        <p v-else class="uu-rights-why">
          <span :class="['uu-chip', answer.verdict === 'VERIFIED' ? 'uu-chip-ok' : 'uu-chip-warn']">{{ answer.verdict }}</span>
          {{ answer.why }}
        </p>

        <template v-if="rows.length">
          <h4 class="uu-rights-rows-title">{{ rowsHeading }}</h4>
          <ol class="uu-rights-rows">
            <li v-for="p in rows" :key="p.instrument + '#' + p.article">
              <div class="uu-rights-row-head">
                <strong>{{ p.title }}</strong> · art. {{ p.article }}
                <span class="uu-rights-kind">{{ p.kind }}</span>
              </div>
              <p>{{ p.summary }}</p>
              <p class="uu-rights-qual"><em>Qualified:</em> {{ p.qualifications }}</p>
              <a :href="p.url" target="_blank" rel="noopener noreferrer">Official source</a>
            </li>
          </ol>
        </template>

        <p v-if="answer.sealedBy" class="uu-rights-receipt">
          Receipt <code>{{ answer.sealedBy.address }}</code> · signed by {{ answer.sealedBy.signed }} of {{ answer.sealedBy.of }} theorems ·
          {{ answer.sealedBy.legal ? 'sealed' : 'not sealed' }}
        </p>
        <p class="uu-rights-honest">{{ answer.honest }}</p>
      </template>
    </div>
  </article>
</template>

<style scoped>
.uu-rights-form { display: grid; gap: 8px; margin-top: 12px; }
.uu-rights-form label { font-weight: 600; font-size: 14px; }
.uu-rights-form textarea {
  width: 100%; box-sizing: border-box; padding: 10px 12px; font: inherit; line-height: 1.5; resize: vertical;
  color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); border-radius: 8px;
}
.uu-rights-form textarea:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }
.uu-rights-actions { display: flex; flex-wrap: wrap; gap: 8px 12px; align-items: center; }
.uu-rights-actions > button[type='submit'] {
  padding: 8px 16px; border-radius: 8px; font-weight: 600; color: var(--vp-c-white);
  background: var(--vp-c-brand-1); border: 1px solid var(--vp-c-brand-1); cursor: pointer;
}
.uu-rights-actions > button:disabled { opacity: 0.6; cursor: progress; }
.uu-rights-try { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 13px; color: var(--vp-c-text-2); }
.uu-rights-example {
  padding: 2px 8px; font-size: 12px; border-radius: 999px; cursor: pointer;
  color: var(--vp-c-text-1); background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider);
}
.uu-rights-example:focus-visible, .uu-rights-actions > button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.uu-rights-result { margin-top: 16px; display: grid; gap: 10px; }
.uu-rights-why { margin: 0; line-height: 1.6; }
.uu-rights-failure { margin: 0; color: var(--vp-c-danger-1); }
.uu-chip {
  display: inline-block; margin-right: 6px; padding: 1px 8px; border-radius: 999px; font-size: 12px; font-weight: 700;
  letter-spacing: 0.04em; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); background: var(--vp-c-bg-soft);
}
.uu-chip-ok { color: var(--vp-c-tip-1); border-color: var(--vp-c-tip-1); background: var(--vp-c-tip-soft); }
.uu-chip-warn { color: var(--vp-c-warning-1); border-color: var(--vp-c-warning-1); background: var(--vp-c-warning-soft); }
.uu-rights-citations { margin: 0; padding-left: 18px; display: grid; gap: 4px; font-size: 14px; }
.uu-rights-rows-title { margin: 6px 0 0; font-size: 15px; }
.uu-rights-rows { margin: 0; padding-left: 20px; display: grid; gap: 12px; max-height: 32rem; overflow-y: auto; }
.uu-rights-rows p { margin: 4px 0; line-height: 1.55; font-size: 14px; }
.uu-rights-row-head { display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: baseline; }
.uu-rights-kind { font-size: 12px; color: var(--vp-c-text-2); }
.uu-rights-qual { color: var(--vp-c-text-2); }
.uu-rights-receipt { margin: 0; font-size: 13px; color: var(--vp-c-text-2); overflow-wrap: anywhere; }
.uu-rights-honest { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
@media (prefers-reduced-motion: reduce) { .uu-rights * { transition: none !important; } }
</style>

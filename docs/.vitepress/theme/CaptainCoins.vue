<!-- CaptainCoins — THE ONE COIN ACCOUNT, computed in the reader's browser. Every other surface points here
     instead of re-explaining the coins, so there is one place to be right. The twelve jobs come from
     coinsJobs() and are TRIED ON THIS READ (a vanished theorem breaks the catalog's own verdict, visibly);
     the theorem list is filtered from the bundled ledger; the deposit arithmetic is computed, never typed. -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase, useData } from 'vitepress'
import { COIN_JOBS } from '../../../src/captain/jobs/catalog.js'
import { coins } from '../../../src/captain/billing/index.js'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const { frontmatter } = useData()
const C = coins()
const Tlen = computed(() => Number(frontmatter.value?.theoremCount) || 0)
const jobs = ref(COIN_JOBS.map((j) => ({ ...j, verdict: '…' })))
const receipt = ref('')
const coinTheorems = ref([])
const href = (key) => withBase(`/theorem/${key}`)
const deposits = computed(() => Tlen.value * C)

onMounted(async () => {
  const next = []
  for (const j of COIN_JOBS) {
    const claim = `${j.claim} — per ${j.cites.map((c) => 'theorem ' + c).join(' and ')}`
    try {
      const r = await advantageCall('uuidna_gate', { claim })
      next.push({ ...j, verdict: String(r?.verdict ?? 'UNVERIFIED') })
    } catch {
      next.push({ ...j, verdict: 'UNVERIFIED' })
    }
  }
  jobs.value = next
  try {
    const s = await advantageCall('uuidna_search', { q: 'coin' })
    coinTheorems.value = Array.isArray(s?.matches) ? s.matches : []
    receipt.value = String(s?.receipt ?? '')
  } catch { /* mill quiet */ }
})
const verified = computed(() => jobs.value.filter((j) => j.verdict === 'VERIFIED').length)
</script>

<template>
  <div class="cc">
    <p class="cc-verdict" :class="verified === jobs.length ? 'ok' : 'bad'">
      <strong>{{ verified }} / {{ jobs.length }}</strong> jobs confirmed — tried on the hosted mill this
      read, receipt <code>{{ (receipt || '…').slice(0, 8) }}</code>.
    </p>

    <table class="cc-jobs">
      <thead><tr><th>#</th><th>the job</th><th>what it is</th><th>backed by</th></tr></thead>
      <tbody>
        <tr v-for="j in jobs" :key="j.n">
          <td class="cc-n">{{ j.n }}</td>
          <td><strong>{{ j.job }}</strong></td>
          <td class="cc-claim">{{ j.claim }}</td>
          <td class="cc-cites">
            <a v-for="c in j.cites" :key="c" :href="href(c)"><code>{{ c }}</code></a>
            <span class="cc-v" :class="j.verdict === 'VERIFIED' ? 'ok' : 'bad'">{{ j.verdict }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <h3>The account — measured, never typed</h3>
    <table class="cc-acct">
      <tbody>
        <tr><td>the denomination</td><td><strong>{{ C }}</strong> — the only one; no other exists</td></tr>
        <tr><td>sealed theorems</td><td>{{ Tlen }}</td></tr>
        <tr><td>deposits</td><td>{{ Tlen }} × {{ C }} = <strong>{{ deposits }}</strong> coins, one pair per seal</td></tr>
        <tr><td>the coins' own wing</td><td>{{ coinTheorems.length }} theorems mention them</td></tr>
      </tbody>
    </table>

    <details class="cc-all">
      <summary>Every theorem that speaks of the coins ({{ coinTheorems.length }})</summary>
      <ul>
        <li v-for="t in coinTheorems" :key="t.key">
          <a :href="href(t.key)"><code>{{ t.key }}</code></a> — <span class="cc-meta">{{ t.principle }}</span>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
.cc { margin: 1.5rem 0; }
.cc-verdict { padding: .7rem .9rem; border-radius: 8px; border: 1px solid var(--vp-c-divider); font-size: .9rem; }
.cc-verdict.ok { border-color: var(--seq-5); }
.cc-verdict.bad { border-color: var(--seq-2); }
.cc-jobs, .cc-acct { width: 100%; display: table; margin: 1rem 0; font-size: .88rem; }
.cc-n { text-align: right; color: var(--vp-c-text-3); }
.cc-claim { color: var(--vp-c-text-2); }
.cc-cites a { display: inline-block; margin-right: .4rem; }
.cc-v { font-size: .72rem; font-weight: 700; }
.cc-v.ok { color: var(--seq-5); }
.cc-v.bad { color: var(--seq-2); }
.cc-all { margin-top: 1rem; }
.cc-all ul { columns: 2; font-size: .84rem; }
.cc-meta { color: var(--vp-c-text-3); font-size: .9em; }
@media (max-width: 640px) { .cc-all ul { columns: 1; } }
</style>

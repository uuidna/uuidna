<!-- NimPlay — the game of heaps, played in the browser with the REAL nim-sum (bitwise XOR — the same operation the
     axiom-free `lxor` seals across the 9×9 nim-addition table in Nim.lean). Set the heaps; the nim-sum decides the
     game by Bouton's theorem: zero is a P-position (the player to MOVE loses), nonzero is a WIN with an exact move to
     zero. Pure client-side arithmetic — nothing sent. This is the "two coins" in miniature: you VERIFY the winning
     position by one XOR, instead of RECOMPUTING the game tree. -->
<script setup>
import { ref, computed } from 'vue'

const heaps = ref([3, 5, 7])
const clamp = (n) => Math.max(0, Math.min(8, Number(n) || 0))
const H = computed(() => heaps.value.map(clamp))
const nimsum = computed(() => H.value.reduce((a, b) => a ^ b, 0))
const isP = computed(() => nimsum.value === 0)
// Bouton's winning move: some heap h with (h XOR nimsum) < h — reduce it to that target.
const winMove = computed(() => {
  if (isP.value) return null
  for (let i = 0; i < H.value.length; i++) {
    const t = H.value[i] ^ nimsum.value
    if (t < H.value[i]) return { heap: i, from: H.value[i], to: t }
  }
  return null
})
const setHeap = (i, v) => { const h = heaps.value.slice(); h[i] = clamp(v); heaps.value = h }
const addHeap = () => { if (heaps.value.length < 5) heaps.value = [...heaps.value, 1] }
const dropHeap = () => { if (heaps.value.length > 1) heaps.value = heaps.value.slice(0, -1) }

// the sealed 9×9 nim-addition table (lxor on {0..8}); highlight the first two heaps' entry
const RANGE = [0, 1, 2, 3, 4, 5, 6, 7, 8]
const cell = (a, b) => a ^ b
</script>

<template>
  <div class="nim">
    <div class="nim-heaps">
      <div v-for="(h, i) in H" :key="i" class="nim-heap">
        <div class="nim-stones" :aria-label="`heap ${i + 1}: ${h} stones`">
          <span v-for="s in h" :key="s" class="nim-stone" />
          <span v-if="h === 0" class="nim-empty">∅</span>
        </div>
        <input type="range" min="0" max="8" :value="h" @input="setHeap(i, $event.target.value)" />
        <b>{{ h }}</b>
      </div>
      <div class="nim-heap-ctl">
        <button @click="addHeap" :disabled="H.length >= 5" title="add a heap">+</button>
        <button @click="dropHeap" :disabled="H.length <= 1" title="remove a heap">−</button>
      </div>
    </div>

    <p class="nim-verdict">
      nim-sum = {{ H.join(' ⊕ ') }} = <code>{{ nimsum }}</code> —
      <strong v-if="isP" class="p">P-position: the player to MOVE loses</strong>
      <strong v-else class="n">N-position: the mover WINS</strong>
    </p>
    <p v-if="winMove" class="nim-move">
      winning move: take heap {{ winMove.heap + 1 }} from <b>{{ winMove.from }}</b> to <b>{{ winMove.to }}</b> — the nim-sum returns to 0.
    </p>
    <p v-else class="nim-move p">no winning move — every move hands the opponent a nonzero nim-sum (the mirror strategy). This is <a href="/theorem/nim_pposition_is_zero"><code>nim_pposition_is_zero</code></a>.</p>

    <details class="nim-table">
      <summary>the sealed 9×9 nim-addition table <span>(lxor on {0..8}, axiom-free)</span></summary>
      <div class="nim-grid-wrap">
        <table class="nim-grid">
          <thead><tr><th>⊕</th><th v-for="b in RANGE" :key="b">{{ b }}</th></tr></thead>
          <tbody>
            <tr v-for="a in RANGE" :key="a">
              <th>{{ a }}</th>
              <td v-for="b in RANGE" :key="b" :class="{ diag: a === b, hot: a === H[0] && b === H[1] }">{{ cell(a, b) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <p class="nim-coins">
      <strong>the two coins:</strong> you decided this position with <b>one</b> XOR (verify), not by walking the game tree
      (recompute) — the measured saving Bouton's theorem delivers. Integrity, not enumeration · nothing sent.
      <a href="/theorem/nim_sum_is_xor"><code>nim_sum_is_xor</code></a> ·
      <a href="/theorem/grundy_sum_is_xor"><code>grundy_sum_is_xor</code></a>
    </p>
  </div>
</template>

<style scoped>
.nim { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; }
.nim-heaps { display: flex; flex-wrap: wrap; gap: 1.2rem; align-items: flex-end; justify-content: center; }
.nim-heap { display: flex; flex-direction: column; align-items: center; gap: .4rem; }
.nim-heap input { width: 90px; }
.nim-heap b { color: var(--vp-c-brand-1); }
.nim-stones { display: flex; flex-direction: column-reverse; gap: 3px; min-height: 90px; justify-content: flex-end; }
.nim-stone { width: 20px; height: 8px; border-radius: 3px; background: var(--vp-c-brand-1); }
.nim-empty { color: var(--vp-c-text-3); font-size: 1.4rem; }
.nim-heap-ctl { display: flex; flex-direction: column; gap: .3rem; }
.nim-heap-ctl button { width: 2rem; height: 2rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); cursor: pointer; color: var(--vp-c-text-1); }
.nim-heap-ctl button:disabled { opacity: .4; cursor: not-allowed; }
.nim-verdict { text-align: center; margin: 1rem 0 .3rem; }
.nim-verdict .p { color: var(--vp-c-danger-1, #d33); }
.nim-verdict .n { color: var(--vp-c-brand-1); }
.nim-move { text-align: center; font-size: .9rem; margin: .2rem 0; color: var(--vp-c-text-2); }
.nim-move.p { color: var(--vp-c-text-2); }
.nim-table { margin: 1rem 0 0; font-size: .85rem; }
.nim-table summary { cursor: pointer; color: var(--vp-c-text-2); }
.nim-table summary span { color: var(--vp-c-text-3); font-size: .8rem; }
.nim-grid-wrap { overflow-x: auto; margin-top: .6rem; }
.nim-grid { border-collapse: collapse; margin: 0 auto; font-variant-numeric: tabular-nums; }
.nim-grid th, .nim-grid td { border: 1px solid var(--vp-c-divider); padding: .25rem .45rem; text-align: center; }
.nim-grid thead th, .nim-grid tbody th { color: var(--vp-c-brand-1); background: var(--vp-c-bg-soft); }
.nim-grid td.diag { color: var(--vp-c-text-3); }
.nim-grid td.hot { background: var(--vp-c-brand-1); color: var(--vp-c-bg); font-weight: 700; }
.nim-coins { font-size: .82rem; color: var(--vp-c-text-2); margin: 1rem 0 0; border-top: 1px solid var(--vp-c-divider); padding-top: .8rem; }
</style>

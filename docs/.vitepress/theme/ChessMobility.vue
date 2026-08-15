<!-- ChessMobility — the decidable geometry of the board, played: place a knight or king on any square and the
     reachable squares light up, counting exactly the move-deltas that stay on the 8×8 (the same filter Chessgames.lean
     seals). The move-count links to its sealed theorem. Pure client-side geometry — nothing sent. Real board
     arithmetic, still NOT a solved game or an engine. -->
<script setup>
import { ref, computed } from 'vue'

const KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]
const KG = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
const piece = ref('N')
const sq = ref([3, 3]) // [rank, file], a1 = [0,0]
const deltas = computed(() => (piece.value === 'N' ? KN : KG))
const onB = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8
const reach = computed(() => deltas.value.map(([dr, dc]) => [sq.value[0] + dr, sq.value[1] + dc]).filter(([r, c]) => onB(r, c)))
const count = computed(() => reach.value.length)
const isReach = (r, c) => reach.value.some(([rr, cc]) => rr === r && cc === c)
const isPiece = (r, c) => sq.value[0] === r && sq.value[1] === c
const glyph = computed(() => (piece.value === 'N' ? '♞' : '♚'))

// each reachable move-count maps to its sealed theorem (the mobility map)
const SEAL = {
  N: { 8: 'knight_centre_eight', 6: 'knight_near_centre_six', 4: 'knight_edge_four', 3: 'knight_near_corner_three', 2: 'knight_corner_two' },
  K: { 8: 'king_centre_eight', 5: 'king_edge_five', 3: 'king_corner_three' },
}
const theorem = computed(() => SEAL[piece.value][count.value] || null)
const rows = [7, 6, 5, 4, 3, 2, 1, 0]
const files = [0, 1, 2, 3, 4, 5, 6, 7]
const sqName = computed(() => 'abcdefgh'[sq.value[1]] + (sq.value[0] + 1))
</script>

<template>
  <div class="cm">
    <div class="cm-ctrls">
      <label><input type="radio" value="N" v-model="piece" /> ♞ knight</label>
      <label><input type="radio" value="K" v-model="piece" /> ♚ king</label>
      <span class="cm-hint">click a square to place the piece</span>
    </div>
    <div class="cm-board" role="grid" :aria-label="`${piece === 'N' ? 'knight' : 'king'} mobility from ${sqName}`">
      <template v-for="r in rows" :key="r">
        <button
          v-for="c in files" :key="r + '-' + c"
          class="cm-sq"
          :class="{ dark: (r + c) % 2 === 1, piece: isPiece(r, c), reach: isReach(r, c) }"
          @click="sq = [r, c]"
          :aria-label="'abcdefgh'[c] + (r + 1)">
          <span v-if="isPiece(r, c)" class="cm-glyph">{{ glyph }}</span>
          <span v-else-if="isReach(r, c)" class="cm-dot" />
        </button>
      </template>
    </div>
    <p class="cm-verdict">
      {{ piece === 'N' ? 'knight' : 'king' }} on <code>{{ sqName }}</code> commands <strong>{{ count }}</strong> moves
      <template v-if="theorem"> — sealed as <a :href="'/theorem/' + theorem"><code>{{ theorem }}</code></a></template>
    </p>
    <p class="cm-coins">
      <strong>the two coins:</strong> the mobility is <b>verified</b> by counting deltas that land on the board — the
      decidable geometry — not by searching moves. Integrity, not enumeration · nothing sent.
    </p>
  </div>
</template>

<style scoped>
.cm { border: 1px solid var(--vp-c-divider); border-radius: 10px; padding: 1.2rem 1.4rem; margin: 1.5rem 0; text-align: center; }
.cm-ctrls { display: flex; flex-wrap: wrap; gap: 1.2rem; justify-content: center; align-items: center; margin-bottom: .9rem; font-size: .9rem; }
.cm-ctrls label { cursor: pointer; }
.cm-hint { color: var(--vp-c-text-3); font-size: .8rem; }
.cm-board { display: grid; grid-template-columns: repeat(8, 1fr); width: 288px; max-width: 100%; margin: 0 auto; border: 2px solid var(--vp-c-divider); aspect-ratio: 1; }
.cm-sq { aspect-ratio: 1; border: 0; padding: 0; background: var(--vp-c-bg-soft); cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; }
.cm-sq.dark { background: var(--vp-c-bg-mute); }
.cm-sq.reach { box-shadow: inset 0 0 0 2px var(--vp-c-brand-1); }
.cm-sq.piece { background: var(--vp-c-brand-soft); }
.cm-glyph { font-size: 1.4rem; line-height: 1; color: var(--vp-c-text-1); }
.cm-dot { width: 28%; height: 28%; border-radius: 50%; background: var(--vp-c-brand-1); opacity: .75; }
.cm-verdict { font-size: .92rem; margin: .9rem 0 .2rem; }
.cm-coins { font-size: .82rem; color: var(--vp-c-text-2); margin: .8rem 0 0; border-top: 1px solid var(--vp-c-divider); padding-top: .8rem; }
</style>

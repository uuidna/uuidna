<!-- The 42 pair grid, SHOWN as the 7 × 7 matrix it is cut from — because the cut is the point. Rows are sources,
     columns are targets, and the DIAGONAL IS EMPTY: those are the seven self-pairs, the identity, which is never a
     seat. So the figure does not merely assert 49 − 7 = 42, it shows the seven holes that make the subtraction, the
     same subtraction that takes the wing grid from 504 to 432.

     TRANSPOSITION IS REFLECTION ACROSS THAT DIAGONAL, so the involution is visible rather than described: hover any
     direction and its reverse lights up on the mirrored side. The pair is ORDERED — the two cells carry different
     addresses — which is exactly why 6 × 7 and 7 × 6 are the same 42 read from two sides and not two grids.

     Everything is read from the ledger build: the dimensions from DIMENSIONS, the directions from pairs(), the root
     from pairsRoot(). Colour is the direction's own address, never a chosen palette.

     HONEST SCOPE: a direction is a named address, never a translation and never evidence that anything has been
     carried along it. -->
<script setup>
import { ref, computed } from 'vue'
import { pairs, pairSeat, pairsRoot, transpose, DIMENSIONS } from '../../../dist/index.js'

const dims = DIMENSIONS
const all = pairs()
const root = pairsRoot()
const hovered = ref(null)

// the reverse of what is hovered — the mirrored cell, so the involution is seen and not just claimed
const mirror = computed(() => (hovered.value ? transpose(hovered.value) : null))
const isHot = (from, to) => hovered.value && hovered.value.from === from && hovered.value.to === to
const isMirror = (from, to) => mirror.value && mirror.value.from === from && mirror.value.to === to

const seat = (from, to) => pairSeat(from, to)
const hue = (address) => `var(--seq-${(parseInt(address[0], 16) % 9) + 1}, var(--vp-c-brand-1))`
</script>

<template>
  <figure class="pair-grid">
    <figcaption>
      <strong>{{ all.length }} directions</strong> — {{ dims.length }} sources × {{ dims.length - 1 }} targets.
      The diagonal is empty: those {{ dims.length }} self-pairs are the identity, which is never a seat.
    </figcaption>

    <div class="scroll">
      <table>
        <thead>
          <tr>
            <th class="corner"><span class="axis">from ╲ to</span></th>
            <th v-for="d in dims" :key="'h' + d">{{ d }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="from in dims" :key="from">
            <th>{{ from }}</th>
            <td v-for="to in dims" :key="from + to">
              <span v-if="from === to" class="identity" :title="`${from} → ${from} — the identity, excluded`">·</span>
              <button
                v-else class="dir"
                :class="{ hot: isHot(from, to), mirror: isMirror(from, to) }"
                :style="{ background: hue(seat(from, to).address) }"
                :aria-label="`${from} to ${to}`"
                @mouseenter="hovered = seat(from, to)" @focus="hovered = seat(from, to)"
                @mouseleave="hovered = null"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="readout" aria-live="polite">
      <template v-if="hovered">
        <code>{{ hovered.name }}</code>
        <span class="addr">{{ hovered.address.slice(0, 8) }}…</span>
        <span class="rev">reverse <code>{{ mirror.name }}</code> — a different address, because a direction is ordered</span>
      </template>
      <template v-else>
        Hover a cell to read its direction and watch its reverse light up across the diagonal.
        The {{ all.length }} directions form {{ all.length / 2 }} transpose orbits of two.
      </template>
    </p>

    <p class="root">pair-grid root <code>{{ root }}</code> — an order-invariant fold of all {{ all.length }} directions.</p>
  </figure>
</template>

<style scoped>
.pair-grid { margin: 1.5rem 0; }
figcaption { font-size: .9rem; color: var(--vp-c-text-2); margin-bottom: .6rem; }
.scroll { overflow-x: auto; }
table { border-collapse: collapse; font-size: .8rem; }
th { font-weight: 500; color: var(--vp-c-text-2); padding: .2rem .45rem; text-align: center; }
.corner { text-align: right; }
.axis { font-size: .72rem; opacity: .75; white-space: nowrap; }
td { padding: 2px; }
.identity { display: block; width: 26px; height: 26px; line-height: 26px; text-align: center; color: var(--vp-c-text-3); opacity: .5; }
.dir {
  display: block; width: 26px; height: 26px; border: 0; border-radius: 4px; padding: 0;
  cursor: pointer; opacity: .8; transition: opacity .12s, transform .12s, box-shadow .12s;
}
.dir:hover, .dir.hot { opacity: 1; transform: scale(1.12); outline: none; }
/* Tabbing a cell sets `hovered` (the @focus handler), which makes isHot() true, which hits the rule above and
   removed the outline with no replacement — a keyboard user had NO visible focus indicator across all 56 cells.
   Same specificity as .dir.hot (one class + one pseudo-class each), so source order alone makes this win. */
.dir:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
.dir.mirror { opacity: 1; box-shadow: 0 0 0 2px var(--vp-c-text-1); }
.readout { min-height: 1.6em; margin: .7rem 0 .2rem; font-size: .88rem; }
.readout .addr { color: var(--vp-c-text-2); margin-left: .45rem; font-family: var(--vp-font-family-mono); }
.readout .rev { display: block; color: var(--vp-c-text-2); font-size: .84rem; margin-top: .15rem; }
.root { font-size: .82rem; color: var(--vp-c-text-2); }
</style>

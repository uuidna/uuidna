<!-- The 432 grid, SHOWN — and nothing in it is chosen. The seats come from grid() in the ledger build, the rays from
     PROJECTED, the wings from the ledger's own .lean files, and the root from gridRoot(). No count, no name and no
     address is typed here; if the ledger gains a wing this figure changes shape by itself, and the guard's grid
     finder fails in the same breath.

     THE INVOLUTION IS THE INTERACTION. The page argues that 432 factors twice — 6 × 72 by the grid's own axes, and
     16 × 27 by reversing the digits of the wing count — so the figure lets you SEE it: the same 432 seats, in the
     same order, reflowed between the two shapes. Nothing is added or removed by the toggle, which is the whole
     claim. A second layout that changed the cells would be decoration; one that only changes their arrangement is
     the argument.

     Colour is READ, never picked: each seat takes its hue from the first hex digit of its OWN content-address,
     mapped onto the --seq-* custom properties applySequence() already puts on the root. So the lattice's texture is
     the addresses themselves, and two seats look alike exactly when their addresses begin alike.

     HONEST SCOPE: this VISUALISES a structure already computed and already gated; it proves nothing further, and a
     seat remains a receipt that a wing is reachable from a ray, never a translation of it. -->
<script setup>
import { computed, ref, onMounted } from 'vue'
import { withBase } from 'vitepress'
import { advantageCall } from '../../../src/quantum/advantage/mcp/wire/index.js'

const seats = ref([])
const rays = ref([])
const wingList = ref([])
const root = ref('')
const err = ref('')

onMounted(async () => {
  try {
    const r = await advantageCall('uuidna_grid', {})
    seats.value = Array.isArray(r?.seats) ? r.seats : []
    rays.value = Array.isArray(r?.raysList) ? r.raysList : []
    wingList.value = Array.isArray(r?.wingsList) ? r.wingsList : []
    root.value = String(r?.root ?? '')
  } catch (e) { err.value = e instanceof Error ? e.message : String(e) }
})

const reversed = computed(() => Number(String(wingList.value.length).split('').reverse().join('')))
const byAxes = computed(() => ({ cols: wingList.value.length, rows: rays.value.length, label: `${rays.value.length} × ${wingList.value.length}` }))
const byInvolution = computed(() => ({ cols: reversed.value, rows: seats.value.length / reversed.value, label: `${seats.value.length / reversed.value} × ${reversed.value}` }))
const shapes = computed(() =>
  Number.isInteger(seats.value.length / reversed.value) && reversed.value !== wingList.value.length ? [byAxes.value, byInvolution.value] : [byAxes.value],
)

const shape = ref(0)
const cols = computed(() => shapes.value[shape.value]?.cols || 1)
const selected = ref(null)

const hue = (address) => `var(--seq-${(parseInt(address[0], 16) % 9) + 1}, var(--vp-c-brand-1))`
const show = (s) => { selected.value = s }
</script>

<template>
  <figure class="grid-lattice">
    <figcaption>
      <strong>{{ seats.length }} seats</strong> — {{ rays.length }} projected rays × {{ wingList.length }} wings.
      <span v-if="err">{{ err }}</span>
      <span v-if="shapes.length > 1">The same seats, two shapes:</span>
      <span class="shapes" v-if="shapes.length > 1">
        <button
          v-for="(s, i) in shapes" :key="s.label"
          :class="{ on: shape === i }" :aria-pressed="shape === i"
          @click="shape = i">{{ s.label }}</button>
      </span>
    </figcaption>

    <div class="scroll">
      <div class="lattice" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
        <button
          v-for="s in seats" :key="s.name"
          class="seat" :style="{ background: hue(s.address) }"
          :aria-label="`${s.name} — ${s.address}`"
          @mouseenter="show(s)" @focus="show(s)" @click="show(s)"></button>
      </div>
    </div>

    <p class="readout" aria-live="polite">
      <template v-if="selected">
        <code>{{ selected.name }}</code>
        <span class="addr">{{ selected.address }}</span>
      </template>
      <template v-else>
        Hover or focus a seat to read its name and address. Every one is reachable through
        <code>uuidna_grid</code>.
      </template>
    </p>

    <p class="root">
      grid root <code>{{ root }}</code> — an order-invariant fold of all {{ seats.length }} seat addresses.
      Recompute it yourself; it does not depend on the shape above.
      <a :href="withBase('/theorem/k432')">k432</a>
    </p>
  </figure>
</template>

<style scoped>
.grid-lattice { margin: 1.5rem 0; }
figcaption { font-size: .9rem; color: var(--vp-c-text-2); margin-bottom: .6rem; }
.shapes { display: inline-flex; gap: .35rem; margin-left: .35rem; }
.shapes button {
  font: inherit; font-size: .85rem; padding: .1rem .5rem; cursor: pointer;
  border: 1px solid var(--vp-c-divider); border-radius: 5px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-2);
}
.shapes button.on { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
/* wide shapes must scroll INSIDE the figure — the page itself never scrolls sideways */
.scroll { overflow-x: auto; padding-bottom: .25rem; }
.lattice { display: grid; gap: 2px; min-width: 320px; }
.seat {
  aspect-ratio: 1; min-width: 7px; border: 0; padding: 0; border-radius: 2px;
  cursor: pointer; opacity: .78; transition: opacity .12s, transform .12s;
}
.seat:hover, .seat:focus-visible { opacity: 1; transform: scale(1.35); outline: none; }
.readout { min-height: 1.6em; margin: .7rem 0 .2rem; font-size: .9rem; }
.readout .addr { color: var(--vp-c-text-2); margin-left: .5rem; font-family: var(--vp-font-family-mono); font-size: .82rem; }
.root { font-size: .82rem; color: var(--vp-c-text-2); }
@media (max-width: 640px) { .seat { min-width: 6px; } }
</style>

<!-- HandleStrips — fourteen lines, ten choices: a handle writes the book.
     Occupancy constructors (VE faces × ten stations). No poem text. -->
<script setup>
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { handleBookOf, stripsOf, STRIP_LINES, STRIP_CHOICES } from '../../../src/quantum/apps/categories/books/strips.js'
import { toUuid } from '../../../src/address.js'

const seed = stripsOf(toUuid('literature_sonnet_measure'))
const picks = ref([...seed])

const setPick = (line, variant) => {
  const next = [...picks.value]
  next[line] = variant
  picks.value = next
}

const book = computed(() => handleBookOf(picks.value))
const href = (key) => withBase(`/theorem/${key}`)
const lines = Array.from({ length: STRIP_LINES }, (_, i) => i)
const variants = Array.from({ length: STRIP_CHOICES }, (_, i) => i)
</script>

<template>
  <section class="handle-strips" data-slot="handle-strips">
    <p class="hs-lede">
      Fourteen strips, ten choices each — the sonnet measure
      <a :href="href('literature_sonnet_measure')"><code>literature_sonnet_measure</code></a>
      is {{ STRIP_LINES }} · {{ STRIP_CHOICES }} beats; the book is the power
      <a :href="href('literature_sonnet_volume')"><code>literature_sonnet_volume</code></a>,
      one handle per combination.
      Faces
      <a :href="href('ve_fourteen_faces')"><code>ve_fourteen_faces</code></a>
      · stations
      <a :href="href('station_ten_is_hexagram_plus_hexbit')"><code>station_ten_is_hexagram_plus_hexbit</code></a>
      · handle space
      <a :href="href('universe_of_handles')"><code>universe_of_handles</code></a>
      · pigeonhole
      <a :href="href('combinatorial_book_exceeds_handles')"><code>combinatorial_book_exceeds_handles</code></a>.
    </p>
    <ol class="hs-lines" aria-label="handle strips">
      <li v-for="line in lines" :key="line" class="hs-line">
        <span class="hs-n">{{ line + 1 }}</span>
        <button
          v-for="v in variants"
          :key="v"
          type="button"
          class="hs-cell"
          :class="{ on: picks[line] === v }"
          :data-line="line"
          :data-choice="v"
          @click="setPick(line, v)"
        >{{ v.toString(16) }}</button>
      </li>
    </ol>
    <p class="hs-book">
      handle <code data-slot="book-handle">{{ book.handle }}</code>
      · <a :href="href('literature_sonnet_volume')">{{ book.volume }}</a> books
    </p>
  </section>
</template>

<style scoped>
.handle-strips { margin: 1rem 0 1.4rem; }
.hs-lede { font-size: 0.9rem; color: var(--vp-c-text-2); margin: 0 0 0.75rem; }
.hs-lines { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.2rem; }
.hs-line { display: flex; align-items: center; gap: 0.25rem; }
.hs-n { width: 1.4rem; font-size: 0.7rem; color: var(--vp-c-text-3); font-family: ui-monospace, monospace; }
.hs-cell {
  width: 1.55rem; height: 1.55rem; padding: 0;
  font-family: ui-monospace, monospace; font-size: 0.72rem;
  border: 1px solid var(--vp-c-divider); border-radius: 4px;
  background: var(--vp-c-bg); color: var(--vp-c-text-1); cursor: pointer;
}
.hs-cell.on { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); font-weight: 600; }
.hs-book { margin: 0.7rem 0 0; font-size: 0.85rem; font-family: ui-monospace, monospace; }
</style>

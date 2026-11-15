<script setup lang="ts">
// The affect trinity, drawn by the design matrix's q-trinity rules (src/css.ts → computed.css). The corners, the
// valences and every figure come from src/affect-trinity.ts, the module lean/AffectTrinity.lean is generated from;
// this component only lays out the elements those rules style and holds the two toggles.
import { ref } from 'vue'
import { CORNERS, VALENCES, trinity } from '../../../src/affect-trinity.js'

const T = trinity()
const [PLEASANT, UNPLEASANT] = VALENCES
const flipped = ref(false)
const backward = ref(false)
</script>

<template>
  <figure class="q-trinity" :data-valence="flipped ? UNPLEASANT : PLEASANT" :data-direction="backward ? 'back' : 'forward'">
    <div class="q-trinity-wheel" role="img"
      :aria-label="`${CORNERS.join(', ')}: ${T.corners} corners ${T.step} degrees apart, turning ${backward ? 'backward' : 'forward'}, valence ${flipped ? UNPLEASANT : PLEASANT}`">
      <span class="q-trinity-marker" aria-hidden="true"></span>
      <span class="q-trinity-axis" aria-hidden="true">observer</span>
      <span v-for="c in CORNERS" :key="c" :class="['q-trinity-corner', `q-trinity-${c}`]">{{ c }}</span>
    </div>
    <figcaption>
      <label><input v-model="flipped" class="q-trinity-valence" type="checkbox"> flip valence (σ): {{ flipped ? UNPLEASANT : PLEASANT }}</label>
      ·
      <label><input v-model="backward" type="checkbox"> run the loop backward (ρ⁻¹)</label>
    </figcaption>
  </figure>
</template>

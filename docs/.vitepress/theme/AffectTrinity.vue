<script setup lang="ts">
// The affect trinity, drawn by the design matrix's q-trinity rules (src/css.ts → computed.css). The corners, the
// valences, the arousals and every figure come from src/affect-trinity.ts, the module lean/AffectTrinity.lean is
// generated from; this component lays out the elements those rules style, holds the toggles that choose a feeling,
// and reads what that feeling turns into from turnsInto, the same function the uuidna_feel door answers with.
import { ref, computed } from 'vue'
import { CORNERS, VALENCES, AROUSALS, trinity, turnsInto } from '../../../src/affect-trinity.js'

const T = trinity()
const flipped = ref(false)
const charged = ref(false)
const backward = ref(false)
const valence = computed(() => VALENCES[flipped.value ? 1 : 0])
const arousal = computed(() => AROUSALS[charged.value ? 1 : 0])
const loop = computed(() => turnsInto({ valence: flipped.value ? 1 : 0, arousal: charged.value ? 1 : 0 }).loop)
</script>

<template>
  <figure class="q-trinity" :data-valence="valence" :data-arousal="arousal" :data-direction="backward ? 'back' : 'forward'">
    <div class="q-trinity-wheel" role="img"
      :aria-label="`${CORNERS.join(', ')}: ${T.corners} corners ${T.step} degrees apart, turning ${backward ? 'backward' : 'forward'}, carrying a ${valence}, ${arousal} feeling`">
      <span class="q-trinity-marker" aria-hidden="true"></span>
      <span class="q-trinity-axis" aria-hidden="true">observer</span>
      <span v-for="c in CORNERS" :key="c" :class="['q-trinity-corner', `q-trinity-${c}`]">{{ c }}</span>
    </div>
    <figcaption>
      <label><input v-model="flipped" class="q-trinity-valence" type="checkbox"> flip valence (σ): {{ valence }}</label>
      ·
      <label><input v-model="charged" type="checkbox"> arousal: {{ arousal }}</label>
      ·
      <label><input v-model="backward" type="checkbox"> run the loop backward (ρ⁻¹)</label>
      <br>
      feel({{ valence }}, {{ arousal }}) turns into
      <span v-for="(e, i) in loop" :key="e.corner">{{ i ? ' → ' : '' }}{{ e.corner }}</span> → {{ loop[0]?.corner }}
      (<a href="/theorem/affect_feel_turns_into">affect_feel_turns_into</a>)
    </figcaption>
  </figure>
</template>

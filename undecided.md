---
title: The undecided register
---

<script setup>
import { data } from './.vitepress/ledger.data'
</script>

# The undecided register

The binary that matters is Lean, not the lexical gate. There are **three** states, not two:
**TRUE** Lean proves it · **FALSE** Lean proves its negation · **UNDECIDED** Lean does neither. "Not proven" is
**not** false — it is open. The claims below are UNDECIDED: held here, labeled, never dropped and never faked. To
develop one to TRUE, give it **decidable content** — reduce it to algebra Lean can compute; the reducible core
becomes a proven theorem, and the irreducible residue stays open.

<div v-for="u in data.undecided" :key="u.claim" class="undec">
  <p><Badge type="warning" text="UNDECIDED" /> <strong>{{ u.claim }}</strong></p>
  <p class="note">
    {{ u.why }}
    <template v-if="u.key">
      &nbsp;→ reduces to <a :href="`/theorem/${u.key}`">{{ u.key }}</a>
      (<Badge type="tip" text="TRUE" />, proven in Lean).
    </template>
  </p>
</div>

Everything provable is on [/theorems](/theorems) ({{ data.total }} theorems, all `by decide`, sorry-free). The whole
set folds to one receipt on [/trial](/trial). What remains open lives here — accounted for, not discarded.

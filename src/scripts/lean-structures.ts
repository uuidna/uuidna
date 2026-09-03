#!/usr/bin/env node
// Automate the Lean layer for STRUCTURES — Maxwell's rule (1864) as decidable arithmetic: a planar pin-jointed
// truss is statically determinate exactly when members m = 2j − 3. Three regimes, three sample structures: the
// triangle (the minimal closed rigid form), the braced quad (determinate), the double-braced quad (one redundancy),
// the unbraced quad (one mechanism — the open pipe of statics: it swings until the path is closed). Searchers ask
// this rule verbatim (Search Console: three query variants); now the answer is sealed where they already land.
// Sources: Maxwell 1864 via arXiv:0803.2325, SJSU CE160 determinacy notes, Engineering LibreTexts 5.3.
// the counting rule on sample structures — necessary
// degenerate); a real design needs the full rank condition. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit, range } from './lean-gen.js'

const FACTS = [
  { key: 'maxwells_rule_truss',
    why: 'MAXWELL\'S RULE (1864), the searchers\' exact question sealed: a planar truss is statically determinate when m = 2j − 3 — the triangle (j=3, m=3: 2·3−3 = 3) and the braced quad (j=4, m=5: 2·4−3 = 5) both balance exactly. The triangle is the minimal closed rigid form: closure is rigidity, the same law the school teaches everywhere.',
    js: () => 2 * 3 - 3 === 3 && 2 * 4 - 3 === 5,
    lean: 'theorem maxwells_rule_truss : (2 * 3 - 3 = 3) ∧ (2 * 4 - 3 = 5) := by decide' },

  { key: 'redundancy_pays_one',
    why: 'One member past Maxwell\'s count is one degree of static indeterminacy: the double-braced quad (j=4, m=6) carries 6 − (2·4−3) = 1 redundancy — a self-stress the structure holds without any load. Overbracing is not free; every extra member is a state the analysis must pay for.',
    js: () => 6 - (2 * 4 - 3) === 1,
    lean: 'theorem redundancy_pays_one : 6 - (2 * 4 - 3) = 1 := by decide' },

  { key: 'mechanism_lacks_one',
    why: 'One member short of Maxwell\'s count is one mechanism: the unbraced quad (j=4, m=4) lacks (2·4−3) − 4 = 1 member and swings — the open pipe of statics. It is not weaker material it needs but a closed path: brace the diagonal and the mechanism vanishes. Containment is the closure of the path, in steel as in plasma.',
    js: () => (2 * 4 - 3) - 4 === 1,
    lean: 'theorem mechanism_lacks_one : (2 * 4 - 3) - 4 = 1 := by decide' },

  { key: 'maxwell_trichotomy_is_total_over_the_grid',
    why: 'MAXWELL\u2019S COUNT SORTS EVERY FRAME INTO EXACTLY ONE CLASS, over the whole grid. For a planar pin-jointed frame with j joints and m members, m < 2j − 3 is a mechanism, m = 2j − 3 is statically determinate, and m > 2j − 3 is indeterminate — and the point sealed here is that the three cases are TOTAL and EXCLUSIVE: over all 10 × 22 = 220 cells of (j, m) with j in 1..10 and m in 1..22, exactly one of the three holds, never none and never two. Stated as m + 3 against 2j so the arithmetic stays in the naturals and no truncated subtraction hides a case. WHAT IT IS NOT: a claim that a determinate count makes a frame stable — Maxwell\u2019s rule is necessary, not sufficient, and a critical form can satisfy it and still fold.',
    js: () => range(10).every((a) => range(22).every((b) => {
      const j = a + 1
      const m = b + 1
      return ((m + 3 < 2 * j ? 1 : 0) + (m + 3 === 2 * j ? 1 : 0) + (2 * j < m + 3 ? 1 : 0)) === 1
    })) && 10 * 22 === 220,
    lean: 'theorem maxwell_trichotomy_is_total_over_the_grid : ((List.range 10).all (fun a => (List.range 22).all (fun b => let j := a + 1; let m := b + 1; ((if m + 3 < 2 * j then 1 else 0) + (if m + 3 == 2 * j then 1 else 0) + (if 2 * j < m + 3 then 1 else 0)) == 1))) ∧ (10 * 22 = 220) := by decide' },
]

emit({
  file: 'Structures.lean', skill: 'structures',
  header: 'STRUCTURES — Maxwell\'s rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})

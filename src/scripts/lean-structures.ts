#!/usr/bin/env node
// Automate the Lean layer for STRUCTURES — Maxwell's rule (1864) as decidable arithmetic: a planar pin-jointed
// truss is statically determinate exactly when members m = 2j − 3. Three regimes, three sample structures: the
// triangle (the minimal closed rigid form), the braced quad (determinate), the double-braced quad (one redundancy),
// the unbraced quad (one mechanism — the open pipe of statics: it swings until the path is closed). Searchers ask
// this rule verbatim (Search Console: three query variants); now the answer is sealed where they already land.
// Sources: Maxwell 1864 via arXiv:0803.2325, SJSU CE160 determinacy notes, Engineering LibreTexts 5.3.
// HONEST SCOPE: the counting rule on sample structures — necessary, not sufficient (geometry can still be
// degenerate); a real design needs the full rank condition. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

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
]

emit({
  file: 'Structures.lean', skill: 'structures',
  header: 'STRUCTURES — Maxwell\'s rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})

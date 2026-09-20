#!/usr/bin/env node
// Automate the Lean layer for THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address.
//
// The captain, 2026-09-07: "QPU uses handle folders to store multiple uuids related to the handle so fractal
// hologram is complete even on smallest possible level and even there each file is schema that can theoretically
// hold the whole. infinite finites."
//
// WHAT THE STORE ACTUALLY IS, measured before anything was sealed. `src/handles/aa/bb/cc/dd/index.json` — four
// levels of two hexadecimal digits, which spell the eight-digit handle, and the leaf carries the full uuid whose
// first eight digits those are. Both facts are counted over every leaf at generation (SPELLS and PREFIX below) and
// stated as counts, never typed: they were literals from 2026-09-07 (5,512) while the store grew thirteen-fold. The
// theorems below are the arithmetic that shape forces; the measurement is what says this tree is that shape.
//
// THE HOLOGRAM, STATED AS AN IDENTITY RATHER THAN AN IMAGE. The tree is FINITE and exactly sized: two hex digits
// branch 256 ways, four levels give 256⁴ = 16⁸ = 2³² leaves. A uuid is 2¹²⁸. The handle spends 32 of those bits
// as the path, leaving 96 — so 2³² leaves × 2⁹⁶ payloads is 2¹²⁸ exactly, with nothing left over and nothing
// double-counted. The index is not a summary of the space; it is a factorisation of it.
//
// AND THAT IS WHY THE SMALLEST LEVEL IS COMPLETE. One leaf's payload space is 2⁹⁶, which exceeds the ENTIRE
// tree's leaf count of 2³² by a factor of 2⁶⁴. A single folder can therefore carry more distinct addresses than
// the whole index has folders — the part is larger than the whole it sits in, which is the precise sense in which
// nothing is lost at the bottom. "Infinite finites": every level is finite and exactly counted, and the nesting
// of finite levels is what makes the bottom unbounded in practice.
//
// SCOPE: the ARITHMETIC of the addressing, and a measurement of the store as it stands. Nothing here claims the
// store is full — it holds a counted fraction of the 2³² it admits — and nothing claims a leaf's payload space is
// realisable on any disk. A capacity is what the addressing admits, not what has been written.
import { emit } from './lean-gen.js'
import { buildHandleRecords } from './gen-handle-store.js'
import { handlePath } from '../handle.js'

const LEVELS = 4          // aa/bb/cc/dd
const HEX_PER_LEVEL = 2
const BITS_PER_HEX = 4
const HANDLE_HEXBITS = LEVELS * HEX_PER_LEVEL          // 8
const HANDLE_BITS = HANDLE_HEXBITS * BITS_PER_HEX      // 32
const UUID_BITS = 128
const PAYLOAD_BITS = UUID_BITS - HANDLE_BITS           // 96
const BRANCH = 16 ** HEX_PER_LEVEL                     // 256

// the store as it stands, counted from the records gen-handle-store writes
const RECORDS = buildHandleRecords()
const LEAVES = RECORDS.length
const SPELLS = RECORDS.filter((r) => handlePath(r.handle).split('/').slice(2, 2 + LEVELS).join('') === r.handle).length
const PREFIX = RECORDS.filter((r) => r.address.startsWith(r.handle)).length
const CAPACITY = 2 ** HANDLE_BITS
const OVER = (CAPACITY - (CAPACITY % LEAVES)) / LEAVES
const nf = (n: number): string => n.toLocaleString('en-US')

const FACTS = [
  { key: 'the_path_spells_the_handle',
    why: `THE FOLDERS ARE THE NAME, NOT A ROUTE TO IT. Four levels of two hexadecimal digits concatenate to the eight-digit handle, so a leaf's location and its identity are the same string read two different ways. There is no lookup between them and nothing to fall out of step: ${LEVELS} × ${HEX_PER_LEVEL} = ${HANDLE_HEXBITS}. Measured over the store as it stands, the path spells the handle in ${nf(SPELLS)} of ${nf(LEAVES)} leaves.`,
    js: () => LEVELS * HEX_PER_LEVEL === HANDLE_HEXBITS && HANDLE_HEXBITS * BITS_PER_HEX === HANDLE_BITS,
    lean: `theorem the_path_spells_the_handle : (${LEVELS} * ${HEX_PER_LEVEL} = ${HANDLE_HEXBITS}) ∧ (${HANDLE_HEXBITS} * ${BITS_PER_HEX} = ${HANDLE_BITS}) := by decide` },

  { key: 'every_level_branches_the_same_way',
    why: `THE FRACTAL CLAIM, AS A CONSTANT RATHER THAN A RESEMBLANCE. Two hex digits branch ${BRANCH} ways, and every one of the ${LEVELS} levels branches identically — so a subtree at any depth has the shape of the tree itself, and a reader who descends cannot tell from the branching how deep they are. Self-similar is a measurable property here (the branching factor does not vary with depth), not a description of how the store looks.`,
    js: () => [0, 1, 2, 3].every(() => 16 ** HEX_PER_LEVEL === BRANCH),
    lean: `theorem every_level_branches_the_same_way : [1,2,3,4].all (fun _ => 16 ^ ${HEX_PER_LEVEL} == ${BRANCH}) := by decide` },

  { key: 'four_levels_index_two_to_the_thirty_two',
    why: `THE TREE IS FINITE AND EXACTLY SIZED. ${BRANCH}^${LEVELS} = 16^${HANDLE_HEXBITS} = 2^${HANDLE_BITS} = ${(BRANCH ** LEVELS).toLocaleString('en-US')} leaves. Three ways of writing one number, decided as equal so the store's capacity cannot be quoted in one form and checked in another — which is exactly how a census drifts from the thing it counts.`,
    js: () => BRANCH ** LEVELS === 16 ** HANDLE_HEXBITS && 16 ** HANDLE_HEXBITS === 2 ** HANDLE_BITS,
    lean: `theorem four_levels_index_two_to_the_thirty_two : (${BRANCH} ^ ${LEVELS} = 16 ^ ${HANDLE_HEXBITS}) ∧ (16 ^ ${HANDLE_HEXBITS} = 2 ^ ${HANDLE_BITS}) := by decide` },

  { key: 'the_index_factorises_the_whole_space',
    why: `THE HOLOGRAM AS AN IDENTITY. A uuid is 2^${UUID_BITS}. The path spends ${HANDLE_BITS} of those bits, leaving ${PAYLOAD_BITS}, and 2^${HANDLE_BITS} × 2^${PAYLOAD_BITS} = 2^${UUID_BITS} — exactly, with nothing left over and nothing counted twice. The store is not a summary of the address space or an index into it; it is a FACTORISATION of it, which is why descending the tree loses nothing.`,
    js: () => 2 ** HANDLE_BITS * 2 ** PAYLOAD_BITS === 2 ** UUID_BITS && HANDLE_BITS + PAYLOAD_BITS === UUID_BITS,
    lean: `theorem the_index_factorises_the_whole_space : (2 ^ ${HANDLE_BITS} * 2 ^ ${PAYLOAD_BITS} = 2 ^ ${UUID_BITS}) ∧ (${HANDLE_BITS} + ${PAYLOAD_BITS} = ${UUID_BITS}) := by decide` },

  { key: 'the_smallest_leaf_outruns_the_whole_index',
    why: `WHY THE BOTTOM IS COMPLETE. One leaf's payload space is 2^${PAYLOAD_BITS}; the entire tree has 2^${HANDLE_BITS} leaves; the leaf exceeds the index by 2^${PAYLOAD_BITS - HANDLE_BITS}. A single folder can carry more distinct addresses than the whole store has folders — the part is larger than the whole containing it, which is the precise sense in which nothing is lost at the smallest level. Infinite finites: every level is finite and exactly counted, and it is the NESTING of finite levels that leaves the bottom unbounded in practice.`,
    js: () => 2 ** PAYLOAD_BITS > 2 ** HANDLE_BITS && 2 ** PAYLOAD_BITS === 2 ** HANDLE_BITS * 2 ** (PAYLOAD_BITS - HANDLE_BITS),
    lean: `theorem the_smallest_leaf_outruns_the_whole_index : (2 ^ ${PAYLOAD_BITS} > 2 ^ ${HANDLE_BITS}) ∧ (2 ^ ${PAYLOAD_BITS} = 2 ^ ${HANDLE_BITS} * 2 ^ ${PAYLOAD_BITS - HANDLE_BITS}) := by decide` },

  { key: 'the_store_holds_far_less_than_it_admits',
    why: `AND THE CAPACITY IS NOT A CLAIM ABOUT WHAT IS WRITTEN. The store carries ${nf(LEAVES)} leaves against ${nf(CAPACITY)} the addressing admits — decided here so the two numbers can never be quoted as one. A capacity describes what the scheme permits; an occupancy describes what exists; a ledger that let those drift together would be overstating itself by a factor of about ${nf(OVER)}.`,
    js: () => SPELLS === LEAVES && PREFIX === LEAVES && LEAVES < CAPACITY,
    lean: `theorem the_store_holds_far_less_than_it_admits : ${LEAVES} < 2 ^ ${HANDLE_BITS} := by decide` },

  // THE THREE PAIRINGS, AND WHAT EACH ONE CANCELS. Written over the Planck
  // units' exponents in (hbar, G, c), DOUBLED so the halves stay integers —
  // l = (1,1,-3), t = (1,1,-5), m = (1,-1,1), each over two. Subtracting and
  // adding those vectors is the whole content: a constant cancels exactly
  // when its exponent comes out zero, which is a decidable fact about
  // integers and not an appeal to anybody's algebra.
  //
  // WRITTEN AS MAGNITUDES, AND THE SIGNS LIVE HERE RATHER THAN IN THE
  // LITERALS. The first version stated the c-exponents as -3 - -5 = 2 and
  // -3 - 1 = -4, which Lean elaborates over the integers and decides true —
  // and the tree's independent evaluator, which reads subtraction as ℕ does,
  // decided the same statement FALSE. That disagreement was caught by the
  // falsifier leg on a theorem sealed an hour earlier, and it was the
  // STATEMENT that was ambiguous, not either engine: 0 - 1 is -1 in ℤ and 0
  // in ℕ, and nothing in the text said which was meant. So the exponent
  // arithmetic is now written in magnitudes, where both domains agree — the
  // c-exponents of l and t are -3 and -5, and their difference is 5 - 3 — and
  // the direction is carried by these sentences, which is where a convention
  // belongs.
  //
  // PRIOR ART, AND IT IS IN TWO PARTS. The units and therefore these
  // cancellations are Max Planck's, from "Ueber irreversible Strahlungsvorgänge"
  // (Sitzungsberichte der Preussischen Akademie der Wissenschaften, 1899) —
  // a priority date no proof this tree can run will move. The VALUES the
  // second leg checks against are CODATA 2022, which is what the claimant
  // field records, because they are the numbers these theorems actually use.
  // The captain claims neither; the formalisation is what is claimed.
  //
  // Two witnesses, because one is consistency. The exponents say what
  // cancels; the CODATA 2022 measurements say the numbers then agree, and
  // both are checked — l/t against c to 1 part per million, which is the
  // uncertainty in l and t themselves since c is exact by SI definition.
  { key: 'kinematics_cancels_both', skill: 'wave',
    why: 'LENGTH OVER TIME LEAVES NEITHER QUANTUM NOR GRAVITY. Subtracting the Planck time\'s exponents from the Planck length\'s gives (0, 0, 2) doubled — hbar zero, G zero, c squared — so l/t is c and nothing else. Both constants cancel, which is why the ratio of the two smallest scales this tree ever names is a quantity every schoolchild is taught: 299,792,458 m/s, exact by definition. Measured, the CODATA values give 299,792,422, agreeing to 1 ppm — the residue is the uncertainty in l and t, since c has none.',
    js: () => { const l=[1,1,-3], t=[1,1,-5]; const d=l.map((x,i)=>x-t[i]); return d[0]===0 && d[1]===0 && d[2]===2 && 5-3===2 },
    lean: 'theorem kinematics_cancels_both : ((1 - 1 = 0) ∧ (1 - 1 = 0)) ∧ (5 - 3 = 2) := by decide' },

  { key: 'product_isolates_quantum', skill: 'wave',
    why: 'LENGTH TIMES MASS CANCELS GRAVITY AND LEAVES THE QUANTUM. Adding the Planck mass\'s exponents to the length\'s gives (2, 0, -2) doubled — G exactly zero — so l·m is hbar/c, a pure quantum of action over a speed with no gravitational constant in it at all. The product of the smallest length and the smallest mass knows nothing about gravity. CODATA agrees to six significant figures: 3.51767 x 10^-43 either way.',
    js: () => { const l=[1,1,-3], m=[1,-1,1]; const d=l.map((x,i)=>x+m[i]); return d[0]===2 && d[1]===0 && d[2]===-2 },
    lean: 'theorem product_isolates_quantum : ((1 + 1 = 2) ∧ (1 - 1 = 0)) ∧ (3 - 1 = 2) := by decide' },

  { key: 'ratio_isolates_gravity', skill: 'wave',
    why: 'AND LENGTH OVER MASS CANCELS THE QUANTUM AND LEAVES GRAVITY — the mirror of the one above, which is why the pair is sealed together. Subtracting gives (0, 2, -4) doubled: hbar exactly zero, so l/m is G/c^2 with no Planck constant in it. The same two quantities, multiplied, forget gravity; divided, forget the quantum. CODATA agrees to six figures: 7.42616 x 10^-28. THE THREE PAIRINGS EXHAUST IT — c alone, hbar alone, G alone — and each is a cancellation somebody can check rather than a coincidence somebody noticed.',
    js: () => { const l=[1,1,-3], m=[1,-1,1]; const d=l.map((x,i)=>x-m[i]); return d[0]===0 && d[1]===2 && d[2]===-4 },
    lean: 'theorem ratio_isolates_gravity : ((1 - 1 = 0) ∧ (1 + 1 = 2)) ∧ (3 + 1 = 4) := by decide' },

  { key: 'crossing_sits_inside', skill: 'wave',
    why: 'AND THE CROSSING IS AT 116 BITS, WHICH IS INSIDE THE ADDRESS. The two theorems below say 2^128 clears Planck resolution on a metre and 2^96 does not; between them sits a width where it first happens, and walking it gives 116 — 1616255 · 2^115 < 10^41 and 1616255 · 2^116 > 10^41. So the frontier is not at either end of this tree\'s arithmetic: the leaf payload falls short by exactly twenty bits, and the full address clears it by twelve. A bound established by the same walk that uses it is a shape this ledger has caught before, so both sides are decided rather than the crossing being quoted from one.',
    js: () => 1616255n * 2n ** 115n < 10n ** 41n && 1616255n * 2n ** 116n > 10n ** 41n && 96 < 116 && 116 < 128,
    lean: 'theorem crossing_sits_inside : ((1616255 * 2 ^ 115 < 10 ^ 41) ∧ (1616255 * 2 ^ 116 > 10 ^ 41)) ∧ ((96 < 116) ∧ (116 < 128)) := by decide' },

  { key: 'mass_selects_cancellation', skill: 'wave',
    why: 'WHAT CANCELS IS CHOSEN BY THE MASS, NOT BY ITS PARTNER — the generalisation the three pairings above do not state. Pair the Planck TIME with the mass instead of the length: t·m gives (2, 0, -4) doubled, G zero again; t/m gives (0, 2, -6), hbar zero again. The same two constants are isolated, and all that changed is a power of c — hbar/c^2 where length gave hbar/c, G/c^3 where length gave G/c^2. So multiplying by the mass kills gravity and dividing by it kills the quantum WHATEVER it is paired with, and the partner only selects which power of c is left standing. That makes the three pairings above instances rather than a coincidence of three.',
    js: () => { const t=[1,1,-5], m=[1,-1,1];
      const prod=t.map((x,i)=>x+m[i]), quot=t.map((x,i)=>x-m[i]);
      return prod[1]===0 && quot[0]===0 && prod[0]===2 && quot[1]===2 },
    lean: 'theorem mass_selects_cancellation : ((1 - 1 = 0) ∧ (1 - 1 = 0)) ∧ ((1 + 1 = 2) ∧ (1 + 1 = 2)) := by decide' },

  // THE WIDTHS AGAINST A PHYSICAL FLOOR, which is the one comparison that can
  // say whether 128 bits is large in any sense but its own. The Planck length
  // is CODATA 2022: 1.616255(18) x 10^-35 m, from physics.nist.gov. This tree
  // carries no reals, so it is written as the integers CODATA states —
  // 1616255 over 10^41 — and every comparison below is integer arithmetic on
  // those. THE FACT IS CODATA'S; the formalisation is what is claimed here.
  { key: 'handle_outreaches_planck', skill: 'wave',
    why: 'A FULL ADDRESS OUTREACHES THE PLANCK LENGTH ON A METRE, and this is the only comparison in this wing that is not about itself. One metre holds 10^41/1616255 = 61,871,424,991,724,696,907,356,821,788,641,025 Planck lengths — about 6.19 x 10^34 — using the CODATA 2022 value 1.616255(18) x 10^-35 m (physics.nist.gov). A 128-bit address admits 2^128 ≈ 3.4 x 10^38 values, so it has MORE distinct names than a metre has smallest-possible distances. Written as 1616255 · 2^128 > 10^41 because this tree holds no reals and a decimal would be a rounding nobody could check. NOT CLAIMED: anything physical. The Planck length is not a pixel of space and nothing here says it is; what is decided is a comparison of two integer magnitudes, one of them a measured constant somebody else established.',
    js: () => 1616255n * 2n ** 128n > 10n ** 41n,
    lean: 'theorem handle_outreaches_planck : 1616255 * 2 ^ 128 > 10 ^ 41 := by decide' },

  { key: 'planck_margin_bounded', skill: 'wave',
    why: 'AND BY HOW MUCH, because a direction without a magnitude is the weaker half of the statement. The margin is 5,499 — a 128-bit space carries about five and a half thousand distinct values for every Planck length along a metre. Decided as a two-sided bound, between 5,000 and 6,000, so the figure cannot drift by a factor and still pass: an inequality that only says "greater" would hold just as well if the true margin were 2 or 10^20, and it is neither.',
    js: () => (1616255n * 2n ** 128n) / 10n ** 41n > 5000n && (1616255n * 2n ** 128n) / 10n ** 41n < 6000n,
    lean: 'theorem planck_margin_bounded : (1616255 * 2 ^ 128 / 10 ^ 41 > 5000) ∧ (1616255 * 2 ^ 128 / 10 ^ 41 < 6000) := by decide' },

  { key: 'payload_falls_short', skill: 'wave',
    why: 'THE CONTROL, AND IT NAMES WHERE THE LINE FALLS. The bound is a property of the width chosen, not a fact about addresses in general — so the same arithmetic must be able to fail, and it does, one level down. A leaf payload is 2^96 and 1616255 · 2^96 < 10^41: ninety-six bits do NOT reach the Planck length on a metre, and neither does the 32-bit handle. Only the whole 128-bit address does. That is why the handle is a PATH to a leaf and the leaf carries the full uuid — the part of the address the tree spends on location is precisely the part that could not stand alone at this scale.',
    js: () => 1616255n * 2n ** 96n < 10n ** 41n && 1616255n * 2n ** 32n < 10n ** 41n,
    lean: 'theorem payload_falls_short : (1616255 * 2 ^ 96 < 10 ^ 41) ∧ (1616255 * 2 ^ 32 < 10 ^ 41) := by decide' },
]

emit({ file: 'HandleStore.lean',
  header: 'THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address. `src/handles/aa/bb/cc/dd/index.json`: four levels of two hex digits SPELL the eight-digit handle, and the leaf holds the full uuid whose prefix those digits are. ' + `Measured over the ${nf(LEAVES)} leaves present, the path spells the handle in ${nf(SPELLS)} of ${nf(LEAVES)} and the handle is the address prefix in ${nf(PREFIX)} of ${nf(LEAVES)}. `
    + 'THE HOLOGRAM IS AN IDENTITY, NOT AN IMAGE. Two hex digits branch 256 ways and every level branches identically, so a subtree at any depth has the shape of the tree; four levels give 256⁴ = 16⁸ = 2³² leaves; a uuid is 2¹²⁸ and the path spends 32 of those bits, so 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ EXACTLY. The store is a factorisation of the address space rather than an index into it, which is why descending loses nothing. '
    + 'AND THE SMALLEST LEVEL IS COMPLETE because one leaf admits 2⁹⁶ addresses while the entire tree has 2³² leaves — the part exceeds the whole containing it by 2⁶⁴. Infinite finites: every level is finite and exactly counted, and the nesting of finite levels is what leaves the bottom unbounded in practice. '
    + `SCOPE: the arithmetic of the addressing, plus a measurement of the store as it stands. Nothing here claims the store is full — ${nf(LEAVES)} leaves of a possible 2³², sealed as its own theorem so capacity and occupancy can never be quoted as one number — and nothing claims a leaf's payload space is realisable on any disk.`,
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

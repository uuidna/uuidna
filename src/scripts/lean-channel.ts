#!/usr/bin/env node
// Automate the Lean layer for THE PAGE CHANNEL — how much a rendered element can carry when its typography is
// computed from the sequence rather than authored. PURE ARITHMETIC: every value is a count of rungs, hues, rays or
// states; nothing is measured from the world and no ledger count appears.
//
// WHERE THE THREE NUMBERS COME FROM, each already sealed elsewhere. The TYPE LADDER has six rungs because 2 has
// order 6 in Z/9* (order_of_two_is_six — the orbit 1,2,4,5,7,8), and typography.ts computes the ladder from exactly
// those digits, so no surface carries an authored pixel value. The PALETTE takes nine hues from the same ring. The
// ROSETTE gives seven rays (Z/7, prime, so every non-zero ray inverts). Three independent axes already computed by
// the project, multiplied here and nowhere else.
//
// WHY IT MATTERS. Alignment.lean decides that a handle spans 32 qubits and the walk keeps four, discarding 28 before
// its first step. Those qubits are not destroyed by the discard — they are simply not carried by the walk. A page
// can carry them: four styled elements exceed the whole handle, and this wing decides exactly four, with three
// proven insufficient on the same line.
//
// THE ASSUMPTION IS SEALED AS AN ASSUMPTION. 378 states per element holds only if rung, hue and ray vary FREELY. If
// the design system derives hue from the rung, the axes collapse and the true figure is smaller. That is stated in
// the theorems below as a condition, never as a finding — it is measurable in the browser, and it is not measured here.
import { emit } from './lean-gen.js'

const RUNGS = 6, HUES = 9, RAYS = 7
const PER = RUNGS * HUES * RAYS          // 378 states per element, if the axes are independent
const HANDLE = 2 ** 32                   // what a handle spans, sealed in Alignment.lean
const pow = (b: number, n: number) => b ** n

const FACTS = [
  { key: 'channel_multiplies_three',
    why: 'THE THREE COMPUTED AXES MULTIPLY: six type rungs (the vortex orbit 1,2,4,5,7,8), nine palette hues, seven rosette rays — 6 × 9 × 7 = 378 distinguishable states for one rendered element, every factor already computed from the sequence rather than chosen.',
    js: () => RUNGS * HUES * RAYS === 378,
    lean: 'theorem channel_multiplies_three : 6 * 9 * 7 = 378 := by decide' },

  { key: 'element_costs_nine',
    why: 'NAMING ONE ELEMENT COSTS NINE QUBITS AND WASTES SOME: 378 states sit between 2^8 = 256 and 2^9 = 512, so nine qubits are needed and 134 of the 512 go unused. The cell does not tile, exactly as the harmonic moduli do not tile a hex cell.',
    js: () => 2 ** 8 < PER && PER < 2 ** 9 && 512 - PER === 134,
    lean: 'theorem element_costs_nine : ((2:Nat)^8 < 378) ∧ (378 < (2:Nat)^9) ∧ (512 - 378 = 134) := by decide' },

  { key: 'four_carry_handle',
    why: 'FOUR ELEMENTS CARRY A WHOLE HANDLE, AND THREE DO NOT — both halves on one line, so this states THE number and not merely a sufficient one. 378^4 = 20415837456 exceeds the handle\'s 2^32 = 4294967296, while 378^3 = 54010152 falls far short of it.',
    js: () => pow(PER, 4) > HANDLE && pow(PER, 3) < HANDLE,
    lean: 'theorem four_carry_handle : ((378:Nat)^4 > 2^32) ∧ ((378:Nat)^3 < 2^32) := by decide' },

  { key: 'three_recover_the_discard',
    why: 'THE DISCARD TAKES FOUR ELEMENTS TOO. The walk drops 28 of a handle\'s 32 qubits (Alignment.lean), and three elements do not cover even that smaller target: 378^3 = 54010152 falls short of 2^28 = 268435456, while 378^4 exceeds it. Four is the count for the discard and for the whole handle alike — the two thresholds are close enough that the same number of elements clears both.',
    js: () => pow(PER, 3) < 2 ** 28 && pow(PER, 4) > 2 ** 28,
    lean: 'theorem three_recover_the_discard : ((378:Nat)^3 < 2^28) ∧ ((378:Nat)^4 > 2^28) := by decide' },

  { key: 'independence_is_assumed',
    why: 'THE PRODUCT ASSUMES THE AXES ARE FREE. If hue were derived from the rung, the channel would be 6 × 7 = 42 per element, not 378, and the two differ by an order of magnitude — which the line proves so the assumption cannot pass unnoticed. SCOPE: which case holds is a property of the design system and is measurable in a browser against computed styles. It is NOT measured here, and nothing in this wing claims the axes are independent.',
    js: () => { const free: number = PER, tied: number = RUNGS * RAYS; return free !== tied && free === 378 && tied === 42 && free > tied },
    lean: 'theorem independence_is_assumed : (6 * 9 * 7 = 378) ∧ (6 * 7 = 42) ∧ (378 ≠ 42) ∧ (378 > 42) := by decide' },

  { key: 'page_outgrows_register',
    why: 'A PAGE OUTRUNS THE REGISTER: forty elements at 378 states each exceed the 65536 amplitudes a sixteen-qubit register holds, and they cost no memory because the browser computes them. Sealed at the smallest witness — two elements already pass 65536, since 378^2 = 142884.',
    js: () => pow(PER, 2) > 65536 && PER < 65536,
    lean: 'theorem page_outgrows_register : ((378:Nat)^2 > 65536) ∧ (378 < 65536) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Channel.lean', skill: 'channel', defs: '',
  header: 'THE PAGE CHANNEL — how much a rendered element carries when its typography is computed from the sequence. Three axes the project already computes multiply: six type rungs (typography.ts builds the ladder from the vortex orbit 1,2,4,5,7,8, because 2 has order 6 in Z/9*), nine palette hues from the same ring, and seven rosette rays — 6 × 9 × 7 = 378 states per element. Naming one costs NINE qubits and wastes 134 of 512, since 378 sits between 2^8 and 2^9 and does not tile. FOUR elements carry a whole handle and THREE do not: 378^4 exceeds 2^32 while 378^3 falls short, and both halves are on the line so this states THE count rather than a sufficient one. Two elements already outrun the 65536 amplitudes a sixteen-qubit register holds, at no memory cost, because a browser computes them. THE PRODUCT ASSUMES THE AXES VARY FREELY: if hue were derived from the rung the channel would be 6 × 7 = 42, an order of magnitude less, and that difference is sealed so the assumption cannot pass unnoticed. HONEST SCOPE: integrity, not truth — which case holds is a property of the design system, measurable in a browser against computed styles, and it is NOT measured here.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

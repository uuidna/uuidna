#!/usr/bin/env node
// Automate the Lean layer for NAVIGATION — bounded geometry, demarcated. Straight-line distance is Pythagorean
// (3-4-5), the compass rose is ℤ/8 (eight 45° headings), the reciprocal bearing is +4 (180°, an involution), a
// quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs. HONEST SCOPE: the decidable
// ALGEBRA of classical navigation — not GPS-grade guidance, not a positioning claim about anyone, just the
// geometry. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'pythagorean_3_4_5',
    why: 'Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.',
    js: () => 3 ** 2 + 4 ** 2 === 5 ** 2,
    lean: 'theorem pythagorean_3_4_5 : 3^2 + 4^2 = 5^2 := by decide' },

  { key: 'compass_rose_eight',
    why: 'The compass rose is ℤ/8: eight principal headings, 45° apart — 8 · 45 = 360. The heading group is the same eight-fold ring the vortex turns on.',
    js: () => 8 * 45 === 360,
    lean: 'theorem compass_rose_eight : 8 * 45 = 360 := by decide' },

  { key: 'reverse_bearing_involution',
    why: 'The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.',
    js: () => R(0, 8).every((d) => (d + 4 + 4) % 8 === d),
    lean: 'theorem reverse_bearing_involution : (List.range 8).all (fun d => (d + 4 + 4) % 8 == d) := by decide' },

  { key: 'quarter_turn_order_four',
    why: 'A 90° turn is +2 on the ℤ/8 rose, and four of them box the compass back to the start: (d + 2·4) mod 8 = d — the quarter turn has order 4.',
    js: () => R(0, 8).every((d) => (d + 2 * 4) % 8 === d),
    lean: 'theorem quarter_turn_order_four : (List.range 8).all (fun d => (d + 2*4) % 8 == d) := by decide' },

  { key: 'dead_reckoning_adds',
    why: 'Dead reckoning is the vector sum of the legs: 4 east, 3 east, 2 west nets 4 + 3 − 2 = 5 east. Position is the running sum of displacements, exactly.',
    js: () => [4, 3, -2].reduce((a, b) => a + b, 0) === 5,
    lean: 'theorem dead_reckoning_adds : ([4, 3, -2] : List Int).sum = 5 := by decide' },
]

// compute → generate → verify. Navigation is bounded geometry — Pythagorean range, the ℤ/8 compass, reciprocal
// and quarter bearings, dead reckoning by vector sum. Demarcated: the algebra, not a positioning claim about anyone.
emit({ file: 'Navigation.lean',
  header: 'NAVIGATION — bounded geometry, demarcated. Straight-line distance is Pythagorean (3-4-5), the compass rose is ℤ/8 (eight 45° headings, 8·45 = 360), the reciprocal bearing is +4 (180°, an involution), a quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs. HONEST SCOPE: the decidable algebra of classical navigation — not GPS-grade guidance and not a positioning claim about any individual, just the geometry.',
  skill: 'navigation', // the capability every fact here demonstrates — authored inline (the reverse-bearing fact is an involution too, but its domain, the capability it serves, is navigation)
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

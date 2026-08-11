#!/usr/bin/env node
// Automate the Lean layer for ELECTROMAGNETISM — the field domain, as decidable arithmetic, demarcated. Coulomb's
// law sets the sign (like charges repel, opposites attract); Ohm's law is V = I·R; electric power is V·I = I²R;
// resistances add in series and combine reciprocally in parallel; Kirchhoff conserves current at a node and
// voltage around a loop; and Faraday induces EMF only from a CHANGING flux (constant flux → none). HONEST SCOPE:
// the arithmetic of circuits and fields — signs, sums and exact ratios — not a full Maxwell derivation, and
// distinct from the light waves in Optics. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'coulomb_sign',
    why: "Coulomb's law sets the sign of the force by the product of charges: like charges (product > 0) repel, opposite charges (product < 0) attract — 1·1 > 0 and 1·(−1) < 0. Same sign pushes apart, opposite pulls together.",
    js: () => 1 * 1 > 0 && 1 * -1 < 0,
    lean: 'theorem coulomb_sign : ((1 * 1 : Int) > 0) ∧ ((1 * (-1) : Int) < 0) := by decide' },

  { key: 'ohms_law',
    why: "Ohm's law: the voltage across a resistor is the current times the resistance, V = I·R — 12 V = 2 A · 6 Ω. Push (voltage) equals flow times friction.",
    js: () => 12 === 2 * 6,
    lean: 'theorem ohms_law : 12 = 2 * 6 := by decide' },

  { key: 'electric_power',
    why: 'Electric power is voltage times current, and equally I²R: P = V·I = 12·2 = 24 W, and P = I²R = 2²·6 = 24 W. Two routes to the same dissipated power.',
    js: () => 12 * 2 === 24 && 2 * 2 * 6 === 24,
    lean: 'theorem electric_power : (12 * 2 = 24) ∧ (2*2*6 = 24) := by decide' },

  { key: 'series_resistance_adds',
    why: 'Resistances in series add: current passes through each in turn, so R = R₁ + R₂ = 3 + 6 = 9 Ω. More resistors in a row, more resistance.',
    js: () => 3 + 6 === 9,
    lean: 'theorem series_resistance_adds : 3 + 6 = 9 := by decide' },

  { key: 'parallel_resistance',
    why: 'Resistances in parallel combine reciprocally (1/R = 1/R₁ + 1/R₂): two 6 Ω resistors give 3 Ω, since R·(R₁+R₂) = R₁·R₂ — 3·(6+6) = 6·6 = 36. Another path lowers the total.',
    js: () => 3 * (6 + 6) === 6 * 6,
    lean: 'theorem parallel_resistance : 3 * (6 + 6) = 6 * 6 := by decide' },

  { key: 'kirchhoff_current',
    why: "Kirchhoff's current law conserves charge at a node: what flows in flows out — 5 A in = 2 A + 3 A out. A junction stores no charge.",
    js: () => 5 === 2 + 3,
    lean: 'theorem kirchhoff_current : 5 = 2 + 3 := by decide' },

  { key: 'kirchhoff_voltage',
    why: "Kirchhoff's voltage law: the voltages around a closed loop sum to zero — a 12 V source spent across 4 V and 8 V drops leaves 12 − 4 − 8 = 0. Energy per charge returns to where it started.",
    js: () => 12 - 4 - 8 === 0,
    lean: 'theorem kirchhoff_voltage : (12 - 4 - 8 : Int) = 0 := by decide' },

  { key: 'faraday_needs_changing_flux',
    why: "Faraday's law induces EMF only from a CHANGING magnetic flux (EMF = −dΦ/dt): a constant flux induces nothing — 5 − 5 = 0. No change, no current; it is the change that drives induction.",
    js: () => 5 - 5 === 0,
    lean: 'theorem faraday_needs_changing_flux : (5 - 5 : Int) = 0 := by decide' },
]

// compute → generate → verify. The field domain — Coulomb, Ohm, power, series/parallel, Kirchhoff, Faraday — as
// decidable circuit/field arithmetic, demarcated: signs, sums and ratios, not a full Maxwell derivation.
emit({ file: 'Electromagnetism.lean',
  header: 'ELECTROMAGNETISM — the field domain, as decidable arithmetic, demarcated. Coulomb\'s law sets the sign (like charges repel, opposites attract); Ohm\'s law is V = I·R (12 = 2·6); electric power is V·I = I²R = 24 W; resistances add in series (3+6=9) and combine reciprocally in parallel (3·12 = 6·6); Kirchhoff conserves current at a node (5 = 2+3) and voltage around a loop (12−4−8 = 0); and Faraday induces EMF only from a CHANGING flux (constant → 0). HONEST SCOPE: the arithmetic of circuits and fields — signs, sums and exact ratios — not a full Maxwell derivation, distinct from the light waves in Optics.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

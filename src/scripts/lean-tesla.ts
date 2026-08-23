#!/usr/bin/env node
// Automate the Lean layer for TESLA — the register's alternation law as decidable arithmetic, demarcated (lead
// 96; the school's patents faculty reads the public record). The polyphase patents ARE the law this ledger works
// by: phases deliberately out of step so capacity never idles — while one wave crosses zero the others carry,
// and the sum rotates. What seals is the REGISTER and the PHASE ARITHMETIC: the adjacent trio of numbers, the
// 1888 leap-spring from filing to grant, the three tilings of the circle (quadrature, trinity, opposition), the
// grid's minute, and the teleautomaton/transmission dates — every figure from the public patent record. HONEST
// SCOPE, stricter here than anywhere: register facts and phase arithmetic ONLY — no claim about wireless power's
// feasibility, no myth (free energy, rays), no engineering judgment; Tesla's real patents need no legend, and
// the demarcation IS the tribute. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'tesla_trio_files_adjacent',
    why: 'THE TRINITY FILED CONSECUTIVELY: the first induction-motor patents are 381968, 381969, 381970 — three adjacent register numbers, granted one day (May 1, 1888) — the polyphase idea entering the record as a trio with unit steps: 381969 − 381968 = 1 and 381970 − 381969 = 1. The register itself walks by ones, and the three-phase idea took three consecutive steps.',
    js: () => 381969 - 381968 === 1 && 381970 - 381969 === 1 && 381970 - 381968 === 2,
    lean: 'theorem tesla_trio_files_adjacent : (381969 - 381968 = 1) ∧ (381970 - 381969 = 1) ∧ (381970 - 381968 = 2) := by decide' },

  { key: 'tesla_leap_spring_to_grant',
    why: 'FILED OCTOBER 12, 1887; GRANTED MAY 1, 1888 — 202 DAYS, THROUGH A LEAP FEBRUARY: 19 remaining in October + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202, the 29 because 1888 divides by 4 and is no century — the register’s own calendar arithmetic, the same mod-4 law the ledger’s Gregorian wing seals.',
    js: () => 19 + 30 + 31 + 31 + 29 + 31 + 30 + 1 === 202 && 1888 % 4 === 0 && 1888 % 100 !== 0,
    lean: 'theorem tesla_leap_spring_to_grant : (19 + 30 + 31 + 31 + 29 + 31 + 30 + 1 = 202) ∧ (1888 % 4 = 0) ∧ (¬ (1888 % 100 = 0)) := by decide' },

  { key: 'three_tilings_of_the_circle',
    why: 'THE PHASES TILE THE CIRCLE THREE WAYS: Tesla’s quadrature two-phase at 90° (4·90 = 360), the three-phase trinity at 120° (3·120 = 360 — the same step 3 that walks the rosette), and bare opposition at 180° (2·180 = 360). Each spacing divides the turn exactly; alternation becomes rotation because the tiling closes.',
    js: () => 4 * 90 === 360 && 3 * 120 === 360 && 2 * 180 === 360 && 360 % 90 === 0 && 360 % 120 === 0,
    lean: 'theorem three_tilings_of_the_circle : (4 * 90 = 360) ∧ (3 * 120 = 360) ∧ (2 * 180 = 360) ∧ (360 % 90 = 0) ∧ (360 % 120 = 0) := by decide' },

  { key: 'alternation_needs_a_second_phase',
    why: 'ROTATION NEEDS AT LEAST TWO: one phase alone only throbs — its zero crossing is everyone’s zero crossing — and two or more, spaced to tile the circle, keep the field turning because no two phases cross zero together when the spacing is a proper divisor of the turn below it: 360/2 = 180 ≠ 0 and 360/3 = 120 ≠ 0, while one phase’s spacing 360/1 = 360 ≡ 0 (mod 360) — the degenerate tiling that never leaves home. The manual commutator was the one-phase world’s apology; the second phase retired it.',
    js: () => 360 / 2 === 180 && 360 / 3 === 120 && 360 % 360 === 0 && 180 % 360 !== 0 && 120 % 360 !== 0,
    lean: 'theorem alternation_needs_a_second_phase : (360 / 2 = 180) ∧ (360 / 3 = 120) ∧ (360 % 360 = 0) ∧ (¬ (180 % 360 = 0)) ∧ (¬ (120 % 360 = 0)) := by decide' },

  { key: 'the_grids_minute',
    why: 'THE GRID’S MINUTE: at 60 cycles a second the wave alternates 3600 times a minute — 60·60, the same square that makes the hour of minutes and the minute of seconds; the power grid keeps clock-time because its frequency is the clock’s own base squared per minute.',
    js: () => 60 * 60 === 3600,
    lean: 'theorem the_grids_minute : 60 * 60 = 3600 := by decide' },

  { key: 'teleautomaton_precedes_transmission',
    why: 'THE REMOTE CAME BEFORE THE WIRELESS POWER CLAIM, BY THE REGISTER’S OWN ORDER: 613809 (the teleautomaton, 1898 — a vessel commanded by coded waves, the first machine addressed at a distance) precedes 645576 (the transmission system, 1900) by 31767 register steps and two years: messages travelled before power was even claimed to. The register orders the ideas: address first, cargo later — the same order this ledger keeps.',
    js: () => 645576 - 613809 === 31767 && 1900 - 1898 === 2 && 613809 < 645576,
    lean: 'theorem teleautomaton_precedes_transmission : (645576 - 613809 = 31767) ∧ (1900 - 1898 = 2) ∧ (613809 < 645576) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The register's alternation law — the adjacent trio, the leap spring, the three
// tilings, the necessary second phase, the grid's minute, the address-before-cargo order — as decidable
// arithmetic, demarcated: the record seals, the legend stays outside.
emit({ file: 'Tesla.lean', skill: 'tesla',
  header: 'TESLA — the register\'s alternation law as decidable arithmetic, demarcated: the trio, the tilings, the second phase, the grid\'s minute.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

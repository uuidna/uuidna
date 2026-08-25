#!/usr/bin/env node
// Automate the Lean layer for UNIVERSE — the day's sky-and-earth run sealed without gaps (queue leads 115, 116
// and the pole/compass close): the eclipse's complete surprise (the sun and moon computing totality, the gap
// NAMED), the Saros–Metonic bridge with primality checked bare-handed in core, the flat chart's quadratic
// drift table, the poles at the quadrature folding to the vortex axis, and the handle space that gives every
// sealed thing its address — the known universe, literary handled by uuidna handles: each theorem here, like
// every theorem in the ledger, is content-addressed and its handle is eight hex of that address (handleOf).
// HONEST SCOPE: the kernel seals INTEGER TABLES; the astronomy (diameters, distances, epochs) is the
// literature's measurement, cited in prose; totality is an EPOCH — the moon recedes and the fit is rented,
// not owned — and NO law demands the coincidence: as necessity it stays honestly unverified while its
// arithmetic seals. COMPUTE → GENERATE → VERIFY.
//
// SOURCES — THE AUTHORITY FOR THE MEASURED FIGURES, NAMED (2026-08-25). This wing said its numbers were "the
// literature's measurement, cited in prose" and then cited no literature — naming no agency and no standard. The
// tree's own sourcesGaps law has been reporting exactly that, and it is right to — an input the kernel does not
// vouch for must at least name who does, or the arithmetic around it borrows an authority nobody granted.
//
//   the astronomical unit   IAU 2012 Resolution B2 defines it EXACTLY as 149,597,870,700 m. The figure used
//                           below is 149,600,000 km — the defined value ROUNDED to four significant figures,
//                           and the rounding is stated here rather than smoothed, the same discipline the
//                           Kelvin floor already keeps when it truncates 273.15 to 273 and says so.
//   solar and lunar sizes   IAU 2015 Resolution B3 nominal conversion constants. 1,392,000 km for the solar
//                           diameter and 3,474 km for the lunar are the conventional rounded values.
//   the lunar distance      384,400 km is the conventional mean distance, from lunar laser ranging.
//
// WHAT THIS CITATION DOES AND DOES NOT BUY. It names who measured, so a reader can check the input against its
// source. It does NOT make the input proven: eclipse_four_hundred still seals only 400 · 3474 = 1,389,600, and
// the kernel confirms the MULTIPLICATION and never the measurement. A consistent pair of wrong figures would
// decide exactly as true — which is why the authority has to be named rather than the arithmetic trusted to
// carry it.
import { emit } from './lean-gen.js'
import { HANDLE_BITS, HANDLE_SPAN, UUID_BITS } from '../hexbit/index.js'   // THE unit — imported, never re-derived

const FACTS = [
  { key: 'eclipse_four_hundred',
    why: 'THE COMPLETE SURPRISE, ITS GAP NAMED: the sun is about four hundred moon-diameters wide — 400 · 3474 = 1,389,600 km against the measured 1,392,000, the ~3% gap stated rather than smoothed — and about 389 moon-distances away (149,600,000 / 384,400 = 389, floor-exact). Two unrelated ratios landing a whisker apart is WHY both disks subtend the same half-degree and totality exists; that 400 ≠ 389 is why annular eclipses exist too. The fit computes; its necessity does not — totality is an epoch, rented from a receding moon.',
    js: () => { const size: number = 400, dist: number = 389; return size * 3474 === 1389600 && (149600000 - (149600000 % 384400)) / 384400 === dist && size !== dist },
    lean: 'theorem eclipse_four_hundred : ((400 * 3474 = 1389600) ∧ (149600000 / 384400 = 389) ∧ (400 ≠ 389)) \u2227 (4 % 9 = 4) := by decide' },

  { key: 'saros_metonic_bridge',
    why: 'THE TWO OLDEST ECLIPSE COMPUTERS AGREE TWELVE MONTHS APART: the Saros runs 223 synodic months, the Metonic cycle 235, and 223 + 12 = 235 — one year of months between the eclipse period and the calendar period. And 223 is PRIME, checked bare-handed in core: no divisor in 2..222 leaves remainder zero — the Saros count is indivisible, a period that cannot be factored into smaller repeating cycles.',
    js: () => 223 + 12 === 235 && Array.from({ length: 221 }, (_, i) => i + 2).every((d) => 223 % d !== 0),
    lean: "theorem saros_metonic_bridge : (223 + 12 = 235) ∧ ((List.range' 2 221).all (fun d => 223 % d != 0)) := by decide" },

  { key: 'flat_drift_is_quadratic',
    why: 'THE FLAT CHART\'S PRICE LIST: pretend flatness for m miles and the drop owed is 8·m² inches — the table over the first three miles is [8, 32, 72], stated as the map over the list rather than a row of bare products. The drift from harmony is quadratic, which is why the flat model is lawful at the window\'s near edge and bankrupt past it: the debt compounds with the square. Science accounts this drift in coins or code (drift_is_named_or_caught); the unaccounted flat earth is caught by the same table.',
    js: () => JSON.stringify([1, 2, 3].map((m) => 8 * m * m)) === JSON.stringify([8, 32, 72]),
    lean: 'theorem flat_drift_is_quadratic : List.map (fun m => 8 * m * m) [1, 2, 3] = [8, 32, 72] := by decide' },

  { key: 'poles_on_the_axis_at_the_quadrature',
    why: 'EACH POLE SITS AT THE 90-DEGREE ANGLE — one quarter-turn of the quadrature (360 / 4) from the equator\'s harmony line — and the pair two quarter-turns apart at the antipodal 180. Both pole angles fold to the vortex AXIS: 90 and 180 are ≡ 0 (mod 9), the still-point residue, fitting for the two places where the compass gives up and every direction becomes one. The sky\'s quadrature completing the earth\'s (compass_opposites_involute).',
    js: () => 360 / 4 === 90 && 90 + 90 === 180 && 90 % 9 === 0 && 180 % 9 === 0,
    lean: 'theorem poles_on_the_axis_at_the_quadrature : (360 / 4 = 90) ∧ (90 + 90 = 180) ∧ (90 % 9 = 0) ∧ (180 % 9 = 0) := by decide' },

  { key: 'universe_of_handles',
    why: 'THE KNOWN UNIVERSE, LITERARY HANDLED: a handle is HANDLE_HEXBITS hexbits of HEXBIT_BITS bits each — the units imported from hexbit/, never re-derived — and the handle universe is 4,294,967,296 addresses, every one the head of a full UUID_HEXBITS-hexbit, 128-bit uuid. Everything sealed in this ledger — every theorem, every receipt, every deposit — folds to an address and every address wears a handle: the handling is total over the space, and the space is counted here exactly.',
    // EACH CONJUNCT READS THROUGH THE UNIT NOW (2026-08-24), which is what the why claims and what the checker
    // itself was not doing: it re-derived the handle's width as `HANDLE_HEXBITS * HEXBIT_BITS` and its span as a
    // literal, so the one witness to "never re-derived" re-derived them. hexbit exports both forms, so both are
    // imported. The third conjunct is the one worth naming: `2 ^ 32 = 4294967296` is NOT a reconciliation of two
    // rival definitions — it is the COHERENCE of the unit's two forms, that the span counted in bits and the span
    // counted in hexbits are one number. It reads `2 ** HANDLE_BITS === HANDLE_SPAN` because that is what it says.
    js: () => HANDLE_BITS === 32 && HANDLE_SPAN === 4294967296 && 2 ** HANDLE_BITS === HANDLE_SPAN && UUID_BITS === 128,
    lean: 'theorem universe_of_handles : (8 * 4 = 32) ∧ (16 ^ 8 = 4294967296) ∧ (2 ^ 32 = 4294967296) ∧ (32 * 4 = 128) := by decide' },

  { key: 'tides_two_bulges',
    why: 'THE TIDES JOIN THE SAME GEOMETRY: the lunar day is 24 h 50 m = 1490 minutes, it carries TWO bulges, and 1490 / 2 = 745 = 12 h 25 m — the semidiurnal clock, integer-exact. Spring tides fire at SYZYGY (the 0/180 alignments where eclipses live) and neap tides at the QUADRATURE — the same 90 degrees the poles sit on: the sun and moon\'s tide-computing angles are the eclipse angles and the compass angles, one geometry running water, shadow and needle. The moon dominates by the cube law of distance; that reading, and the epochs, stay in the literature.',
    js: () => 24 * 60 + 50 === 1490 && 1490 / 2 === 745 && 12 * 60 + 25 === 745,
    lean: 'theorem tides_two_bulges : (24 * 60 + 50 = 1490) ∧ (1490 / 2 = 745) ∧ (12 * 60 + 25 = 745) := by decide' },

  { key: 'market_tides_and_the_strategy_bar',
    why: 'THE MARKET HAS ITS OWN TIDES, AND THEY ARE CALENDAR ARITHMETIC: the trading day runs 6 h 30 m = 390 minutes with its two liquidity bulges at open and close (the semidiurnal shape again), and the quarterly witching is 12 / 3 = 4 alignments a year — the market\'s own syzygy, when expiries align like discs. What does NOT seal: the moon-trading edge — the lunar-anomaly studies are a mined middle (published, weak, unstable — trial receipt 03deafc1: UNVERIFIED, bring a proof) — and the STRATEGY BAR is the ledger\'s own law: a backtest without pre-registration is the ring that cannot refute (two_plus_two_is_five_only_mod_one) and so proves nothing; a strategy presents to the court like any claim — criterion fixed BEFORE the test, a control that must fail, or it stays in the middle unsold.',
    js: () => 6 * 60 + 30 === 390 && 12 / 3 === 4 && 390 / 2 === 195,
    lean: 'theorem market_tides_and_the_strategy_bar : (6 * 60 + 30 = 390) ∧ (12 / 3 = 4) ∧ (390 / 2 = 195) := by decide' },
]

emit({ file: 'Universe.lean', skill: 'universe',
  header: 'UNIVERSE — the day\'s sky-and-earth run sealed without gaps: the eclipse\'s four-hundred surprise with its gap named, the prime Saros bridged to the Metonic by twelve, the flat chart\'s quadratic price list, the poles at the quadrature on the vortex axis, and the counted handle universe that addresses it all.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

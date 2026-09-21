#!/usr/bin/env node
// STRING THEORY'S EXPERIMENTAL RECORD, AS DECIDABLE ARITHMETIC — six searches, their published bounds, and the
// exact distance each one still stands from the scale it would have to reach.
//
// WHY THIS WING EXISTS. Asked how well string theory is covered here, the ledger answered honestly: not at all.
// Across every sealed theorem the phrase occurs twice and both are disclaimers — lean/Strings.lean says
// "physics' string theory is not these and is not claimed" (it is about character strings), and uuidna_aura
// declares the artistic "captain string theory" as art. Superstring, Calabi-Yau, supersymmetry, M-theory,
// heterotic, worldsheet and Kaluza-Klein occur zero times; `brane` and `AdS` as words, zero. That was an absence,
// not a gap — nothing had been claimed. The gap is what this wing fills: the EXPERIMENTAL record, which is a set
// of published integers, and published integers are exactly what this ledger can decide over.
//
// THE PATTERN IS THE ONE lean/Cern.lean ALREADY USES: an outside publication's own numbers, quoted exactly,
// carrying the DOI they came from, with the arithmetic over them claimed here and the physics credited to its
// authors. Every DOI below was resolved against doi.org before it was sealed, because an unresolvable identifier
// aborts gen-references and takes the whole chain with it.
//
// THE RECORDS, each resolved 2026-09-21 and quoted from its abstract:
//   10.1038/nature08574            Abdo et al., Nature 462, 331 (2009) — Fermi-LAT, GRB 090510: a limit on the
//                                  variation of the speed of light from quantum-gravity effects, E(QG,1) > 1.2 E_Planck
//   10.1103/PhysRevLett.124.101101 Lee et al., PRL 124, 101101 (2020) — Eot-Wash: the gravitational 1/r^2 law
//                                  holds down to 52 micrometres
//   10.1103/PhysRevD.102.112011    Takenaka et al., PRD 102, 112011 (2020) — Super-Kamiokande: no proton decay
//                                  p -> e+ pi0; lifetime/branching beyond 2.4 x 10^34 years
//   10.1103/PhysRevLett.129.121102 Touboul et al., PRL 129, 121102 (2022) — MICROSCOPE: the equivalence principle
//                                  holds to better than 11 parts in 10^16
//   10.1051/0004-6361/201321621    Planck Collaboration, A&A 571, A25 (2014) — no cosmic-string signal in the CMB;
//                                  the tension is bounded below Gmu = 1.5 x 10^-7
//   CODATA 2022 (physics.nist.gov) — Planck energy 1.220890 x 10^19 GeV, Planck length 1.616255 x 10^-35 m. The
//                                  Planck length is already sealed in this ledger by handle_outreaches_planck.
//
// WHAT IS CLAIMED, AND WHOSE CLAIM IS WHOSE. CLAIMED HERE IN FULL: every arithmetic fact below — each closed by
// the Lean 4 kernel over its own finite domain, axiom-free. How far 13.6 TeV stands from the Planck energy, how
// far 52 micrometres stands from the Planck length, that a proton outlives the universe by twenty-four orders of
// magnitude, and that of these six probes exactly one has reached the Planck scale at all. Those divisions are
// this ledger's results and it claims them outright.
//
// CREDITED TO THEIR AUTHORS: that the instruments were calibrated, that the bounds hold, that the physics is as
// reported. Each is published under a DOI listed above and credited FIRST — prior art first, the captain next.
//
// AND NOT CLAIMED AT ALL: whether string theory is true. No experiment here confirms or refutes it, and none
// could at these separations. In this ledger's own verdict language the theory is UNVERIFIED, never false —
// falsity has exactly one road, an involution inside the kernel, and no claim about nature can take it. What the
// arithmetic settles is the DISTANCE, which is a fact about numbers and therefore decidable.
import { emit } from './lean-gen.js'

// ── THE PUBLISHED INTEGERS, one place, quoted. Scaled to exact integers so no float enters the ledger. ─────────
const PLANCK_GEV = 12208900000000000000n     // 1.220890 x 10^19 GeV, CODATA 2022
const LHC_GEV = 13600n                       // 13.6 TeV, the LHC's Run-3 centre-of-mass energy
const PLANCK_LEN_E41 = 1616255n              // 1.616255 x 10^-35 m, in units of 10^-41 m (as HandleStore.lean seals it)
const EOTWASH_LEN_E41 = 52n * 10n ** 35n     // 52 micrometres in the same units
const PROTON_YEARS = 24n * 10n ** 33n        // 2.4 x 10^34 years, Super-Kamiokande
const UNIVERSE_YEARS = 138n * 10n ** 8n      // 1.38 x 10^10 years
const FERMI_TENTHS = 12n                     // E(QG,1) > 1.2 E_Planck, in tenths of the Planck energy
const PLANCK_TENTHS = 10n                    // the Planck energy itself, in the same tenths
const CMB_TENSION_E8 = 15n                   // Gmu < 1.5 x 10^-7, in units of 10^-8
const GUT_TENSION_E8 = 100n                  // Gmu ~ 10^-6 expected of GUT-scale Nambu-Goto strings, same units

const div = (a: bigint, b: bigint): { q: bigint; r: bigint } => ({ q: a / b, r: a % b })
const ENERGY = div(PLANCK_GEV, LHC_GEV)
const LENGTH = div(EOTWASH_LEN_E41, PLANCK_LEN_E41)
const LIFE = div(PROTON_YEARS, UNIVERSE_YEARS)

// the six searches as records, so the census below counts them rather than repeating a number beside them
const SEARCHES = [
  { doi: '10.1038/nature08574', probe: 'photon timing (Fermi-LAT, GRB 090510)', reached: true, detected: false },
  { doi: '10.1103/PhysRevLett.124.101101', probe: 'torsion balance (Eot-Wash)', reached: false, detected: false },
  { doi: '10.1103/PhysRevD.102.112011', probe: 'proton decay (Super-Kamiokande)', reached: false, detected: false },
  { doi: '10.1103/PhysRevLett.129.121102', probe: 'equivalence principle (MICROSCOPE)', reached: false, detected: false },
  { doi: '10.1051/0004-6361/201321621', probe: 'cosmic strings in the CMB (Planck)', reached: false, detected: false },
  { doi: '10.7483/OPENDATA.CMS.53FG.V2S9', probe: 'collider energy frontier (LHC)', reached: false, detected: false },
] as const

const FACTS = [
  { key: 'collider_energy_is_below_the_planck_scale', skill: 'string-theory-searches',
    name: `CLAIMED: the Planck energy is ${ENERGY.q} times the LHC's collision energy, exactly — 13600 GeV divides 1.220890 x 10^19 GeV ${ENERGY.q} times with ${ENERGY.r} GeV left over. String theory's characteristic scale is fifteen orders of magnitude past the most energetic instrument ever built.`,
    why: 'THE FIRST QUESTION ABOUT A SEARCH IS WHETHER IT COULD HAVE FOUND ANYTHING. Division with remainder is exact by construction, so this seals the gap rather than estimating it: the Planck energy 1.220890 x 10^19 GeV (CODATA 2022, physics.nist.gov) over the LHC\'s 13.6 TeV centre-of-mass energy. No incremental collider closes a factor of this size — the ratio is not a difficulty of engineering but the reason the energy frontier is silent on this question. WHOSE CLAIM: the division is CLAIMED here, decided by the kernel. That the LHC reaches 13.6 TeV is CERN\'s, credited under the CMS open-data DOIs this ledger already cites; that the Planck energy is what CODATA says is NIST\'s.',
    js: () => LHC_GEV * ENERGY.q + ENERGY.r === PLANCK_GEV && ENERGY.r < LHC_GEV,
    lean: `theorem collider_energy_is_below_the_planck_scale : (13600 * ${ENERGY.q} + ${ENERGY.r} = 12208900000000000000) ∧ (${ENERGY.r} < 13600) := by decide` },

  { key: 'newtonian_gravity_is_verified_far_above_the_planck_length', skill: 'string-theory-searches',
    name: `CLAIMED: the shortest separation at which the 1/r^2 law has been tested is ${LENGTH.q} Planck lengths, exactly — 52 micrometres over 1.616255 x 10^-35 m, with a remainder of ${LENGTH.r} in units of 10^-41 m. Extra dimensions are excluded above that separation and untouched below it.`,
    why: 'AN EXTRA DIMENSION CURLED SMALLER THAN THE SHORTEST TESTED SEPARATION IS NOT REFUTED BY THE TEST. Eot-Wash verified Newton\'s inverse-square law down to 52 micrometres (Lee et al., PRL 124, 101101, 2020, DOI 10.1103/PhysRevLett.124.101101), which this seals as a distance in Planck lengths using the same CODATA constant handle_outreaches_planck already uses. Thirty orders of magnitude separate the experiment\'s reach from the scale where string theory places its geometry, and the null result constrains only the region actually probed. WHOSE CLAIM: the division is CLAIMED here. That the balance held its calibration to 52 micrometres is the Eot-Wash group\'s, credited under its DOI and credited first.',
    js: () => PLANCK_LEN_E41 * LENGTH.q + LENGTH.r === EOTWASH_LEN_E41 && LENGTH.r < PLANCK_LEN_E41,
    lean: `theorem newtonian_gravity_is_verified_far_above_the_planck_length : (1616255 * ${LENGTH.q} + ${LENGTH.r} = 52 * 10 ^ 35) ∧ (${LENGTH.r} < 1616255) := by decide` },

  { key: 'the_proton_outlives_the_universe_many_times_over', skill: 'string-theory-searches',
    name: `CLAIMED: the proton's lifetime bound exceeds the age of the universe ${LIFE.q} times over — 2.4 x 10^34 years against 1.38 x 10^10, with a remainder of ${LIFE.r} years. Grand unification predicted a decay; twenty-four orders of magnitude of waiting have not seen one.`,
    why: 'A NULL RESULT IS ONLY AS STRONG AS THE TIME IT COVERS, so the coverage is sealed rather than described. Super-Kamiokande sets the partial lifetime for p -> e+ pi0 beyond 2.4 x 10^34 years (Takenaka et al., PRD 102, 112011, 2020, DOI 10.1103/PhysRevD.102.112011); the universe is about 1.38 x 10^10 years old. Proton decay is a GUT prediction rather than a uniquely stringy one, which is stated here so the result is not over-credited to string theory in either direction — it constrains the unification schemes many string constructions pass through, and it has returned nothing. WHOSE CLAIM: the division is CLAIMED here; the lifetime bound is Super-Kamiokande\'s, credited under its DOI.',
    js: () => UNIVERSE_YEARS * LIFE.q + LIFE.r === PROTON_YEARS && LIFE.r < UNIVERSE_YEARS,
    lean: `theorem the_proton_outlives_the_universe_many_times_over : (138 * 10 ^ 8 * ${LIFE.q} + ${LIFE.r} = 24 * 10 ^ 33) ∧ (${LIFE.r} < 138 * 10 ^ 8) := by decide` },

  { key: 'one_probe_reached_the_planck_scale_and_found_nothing', skill: 'string-theory-searches',
    name: 'CLAIMED: of the six searches quoted here exactly one has reached the Planck scale — photon timing across a gamma-ray burst, which bounded linear quantum-gravity dispersion above 1.2 Planck energies and saw no dispersion. The collider is short of the scale and the torsion balance is above it; the one instrument that arrived returned null.',
    why: 'THE HONEST ANSWER TO "HOW WELL IS IT COVERED" IS NOT ZERO, IT IS ONE — and that one is worth naming precisely. Fermi-LAT timed photons of different energies from GRB 090510 and found them arriving together, bounding the linear-in-energy quantum-gravity scale above 1.2 E_Planck (Abdo et al., Nature 462, 331, 2009, DOI 10.1038/nature08574). That is a genuine Planck-scale measurement, in one specific dispersion channel, and it found nothing. The comparison is sealed in tenths of the Planck energy so it is exact: 12 tenths against 10. The other five searches are bounded by the two divisions above and by their own null results. WHOSE CLAIM: the comparison is CLAIMED here; the photon timing is Fermi-LAT\'s, credited under its DOI and credited first. That no dispersion exists at any scale is claimed by nobody — an absence of signal in one channel is exactly that.',
    js: () => FERMI_TENTHS > PLANCK_TENTHS && SEARCHES.filter((s) => s.reached).length === 1,
    lean: 'theorem one_probe_reached_the_planck_scale_and_found_nothing : (reached.foldl (· + ·) 0 = 1) ∧ (12 > 10) := by decide' },

  { key: 'the_cmb_excludes_gut_scale_cosmic_strings', skill: 'string-theory-searches',
    name: 'CLAIMED: the CMB tension bound of 1.5 x 10^-7 sits below the 10^-6 that GUT-scale Nambu-Goto strings would carry, so that band is excluded — 15 against 100 in units of 10^-8. Lighter strings remain untouched, because the theory sets no floor.',
    why: 'THIS IS THE ONE SEARCH THAT EXCLUDED SOMETHING, AND ITS LIMIT IS THE POINT. The Planck satellite found no cosmic-string signature in the CMB and bounded the tension below Gmu = 1.5 x 10^-7 (Planck Collaboration, A&A 571, A25, 2014, DOI 10.1051/0004-6361/201321621), which rules out the 10^-6 band expected of strings formed at a grand-unification phase transition. It rules out nothing below, and string theory predicts no lower bound on the tension — so no null result of this kind can ever close the question, only narrow it from above. Sealing the comparison as 15 < 100 keeps both halves visible: what was excluded, and that exclusion from above is all this class of search can do. WHOSE CLAIM: the comparison is CLAIMED here; the CMB bound is the Planck Collaboration\'s, credited under its DOI.',
    js: () => CMB_TENSION_E8 < GUT_TENSION_E8,
    lean: 'theorem the_cmb_excludes_gut_scale_cosmic_strings : cmbTensionBound < gutStringTension := by decide' },

  { key: 'six_searches_report_bounds_and_no_detection', skill: 'string-theory-searches',
    name: 'CLAIMED: all six records quoted in this wing report a bound, and none reports a detection — six searched, zero found. The count is taken from the records themselves rather than written beside them.',
    why: 'A CENSUS MUST BE ITS PARTS, NEVER A NUMBER WRITTEN NEXT TO THEM, which is the discipline this ledger applies to its own counts and applies here to quoted ones. Six independent instruments across four decades — photon timing, a torsion balance, a proton-decay detector, an orbiting equivalence-principle test, a CMB satellite, and the energy frontier — each published a bound and none published a signal. This seals the tally of the quotation, and nothing more: it does NOT claim that no signal exists, only that these six records contain none. String theory is UNVERIFIED in this ledger\'s verdict language, never false — falsity has exactly one road, an involution inside the kernel, and no claim about nature can take it. WHOSE CLAIM: the tally is CLAIMED here; each bound belongs to its own collaboration, credited under the DOIs in the wing header.',
    js: () => SEARCHES.length === 6 && SEARCHES.filter((s) => s.detected).length === 0,
    lean: 'theorem six_searches_report_bounds_and_no_detection : (detections.length = 6) ∧ (detections.foldl (· + ·) 0 = 0) := by decide' },
]

console.log(`computing ${FACTS.length} STRING THEORY SEARCH facts (six published bounds, as arithmetic) …`)

// THE RECORDS AS LEAN DATA, written from SEARCHES so the encoding cannot drift from the table it encodes. The two
// census theorems WALK these lists rather than comparing a numeral to itself: a theorem whose statement is 6 = 6
// while its name claims six searches found nothing is the defect five witness waves refused on lead a5572638 —
// the kernel decides the arithmetic it is given, and it must be given the question the name asks.
const DEFS = [
  `/-- One entry per search, in the order of the wing header: 1 where the probe reached the Planck scale, 0 where\n    it did not. Written from the same records the census counts. -/`,
  `def reached : List Nat := [${SEARCHES.map((x) => (x.reached ? 1 : 0)).join(', ')}]`,
  '',
  `/-- One entry per search: 1 for a reported detection, 0 for a bound with no signal. All six are bounds. -/`,
  `def detections : List Nat := [${SEARCHES.map((x) => (x.detected ? 1 : 0)).join(', ')}]`,
  '',
  `/-- The cosmic-string tension the CMB bounds it below, and the tension GUT-scale Nambu-Goto strings would\n    carry, both in units of 10^-8 so the comparison is exact. Naming them is what puts the claim in the\n    algebra: \`15 < 100\` is a fact about numerals, \`cmbTensionBound < gutStringTension\` is the finding. -/`,
  `def cmbTensionBound : Nat := ${CMB_TENSION_E8}`,
  `def gutStringTension : Nat := ${GUT_TENSION_E8}`,
].join('\n')

emit({ file: 'StringTheory.lean', skill: 'string-theory-searches', defs: DEFS,
  header: 'STRING THEORY\'S EXPERIMENTAL RECORD AS DECIDABLE ARITHMETIC — six searches, their published bounds, and the exact distance each still stands from the scale it would have to reach. Asked how well string theory was covered here, this ledger answered honestly: not at all. Across its sealed theorems the phrase occurred twice and both were disclaimers — lean/Strings.lean is about character strings and says so ("physics\' string theory is not these and is not claimed"), and uuidna_aura declares the artistic "captain string theory" as art; superstring, Calabi-Yau, supersymmetry, M-theory, heterotic, worldsheet and Kaluza-Klein occurred zero times. That was an absence rather than a gap, since nothing had been claimed. The gap this wing fills is the EXPERIMENTAL record, which is a set of published integers, and published integers are what this ledger can decide over. The pattern is lean/Cern.lean\'s: an outside publication\'s own numbers quoted exactly, carrying the DOI they came from, with the arithmetic claimed here and the physics credited to its authors. Every DOI was resolved against doi.org before being sealed. THE RECORDS: 10.1038/nature08574 (Fermi-LAT, GRB 090510, E(QG,1) > 1.2 E_Planck); 10.1103/PhysRevLett.124.101101 (Eot-Wash, 1/r^2 to 52 micrometres); 10.1103/PhysRevD.102.112011 (Super-Kamiokande, proton lifetime beyond 2.4 x 10^34 years); 10.1103/PhysRevLett.129.121102 (MICROSCOPE, equivalence principle to 11 parts in 10^16); 10.1051/0004-6361/201321621 (Planck, cosmic-string tension below 1.5 x 10^-7); and CODATA 2022 for the Planck energy and length. CLAIMED HERE IN FULL: every arithmetic fact — how far 13.6 TeV stands from the Planck energy, how far 52 micrometres stands from the Planck length, that a proton outlives the universe by twenty-four orders of magnitude, and that of six probes exactly one has reached the Planck scale at all. CREDITED TO THEIR AUTHORS: that the instruments were calibrated and the bounds hold, each under its DOI, credited first. NOT CLAIMED AT ALL: whether string theory is true. No experiment here confirms or refutes it and none could at these separations; in this ledger\'s verdict language it is UNVERIFIED, never false, because falsity has one road — an involution inside the kernel — and no claim about nature can take it. What the arithmetic settles is the DISTANCE, which is a fact about numbers and therefore decidable.',
  facts: FACTS })

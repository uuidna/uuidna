// The theorem ledger — DERIVED, LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven
// `by decide` (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs parses them into ./generated.ts,
// and this module is the typed, addressed view the package, the MCP tools, the trial and the site all consume.
// No theorem is authored here. A theorem computes in Lean, or it is not a theorem. Integrity, not truth.
import { hexbitsOf as hexbitUnit, UUID_HEXBITS as HEXBIT_UUID } from '../hexbit/index.js'
import { WING_DEFS, LEAN_LEDGER, PRINCIPLES, type LeanTheorem } from './generated.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid } from '../address.js'
import { coins } from '../captain/billing/index.js'
import { runSequence, type DigitPolarity } from '../sequence-run.js'
import { decodeVortexDashAngles, VORTEX_DASH_ANGLE_DEG } from '../sequence-field.js'

/** Rosetta ray — address mod 7 (same law as rosettaIndex). */
export const trialRayOf = (address: string): number =>
  Number(BigInt('0x' + address.replace(/-/g, '')) % 7n)

/** Integer degrees per ray — 360/7. */
export const trialRayDegrees = (ray: number): number => (ray * (360 / 7)) | 0

/** A432 digit step — polarity_angles_are_the_system_counts: 360/9 = 40. */
export const TRIAL_DIGIT_ANGLE = (360 / 9) | 0

/** One theorem walked through the living sequence: polarity, spin (period), angle (digit step × seed), ray. */
export interface TrialSequence {
  polarity: DigitPolarity
  spin: number
  angle: number
  seed: number
  ray: number
  rayDegrees: number
}

/** trialSequenceOf(address) → polarity, spin, and angle read off runSequence — the trial IS the walk. */
export const trialSequenceOf = (address: string): TrialSequence => {
  const s = runSequence(address)
  const ray = trialRayOf(address)
  return {
    polarity: s.polarity,
    spin: s.period,
    angle: (s.seed * TRIAL_DIGIT_ANGLE) % 360,
    seed: s.seed,
    ray,
    rayDegrees: trialRayDegrees(ray),
  }
}

export interface TrialSequenceSummary {
  polarities: { minus: number; neutral: number; plus: number }
  dash: { closes: boolean; stepDegrees: number; weightedBearing: number }
  angles: { digitStep: number; rosettaStep: number; spinStep: number }
  receipt: string
}

export const trialSequenceSummary = (verdicts: readonly { sequence: TrialSequence }[]): TrialSequenceSummary => {
  const polarities = { minus: 0, neutral: 0, plus: 0 }
  for (const v of verdicts) polarities[v.sequence.polarity]++
  const dash = decodeVortexDashAngles()
  const leafs = verdicts.map((v) =>
    toUuid(`trial-seq|${v.sequence.polarity}|${v.sequence.spin}|${v.sequence.angle}|${v.sequence.ray}`))
  return {
    polarities,
    dash: { closes: dash.closes, stepDegrees: VORTEX_DASH_ANGLE_DEG, weightedBearing: dash.weightedBearing },
    angles: { digitStep: TRIAL_DIGIT_ANGLE, rosettaStep: (360 / 7) | 0, spinStep: VORTEX_DASH_ANGLE_DEG },
    receipt: merkleGravity([dash.root, ...leafs]),
  }
}

export { PRINCIPLES }
export type { LeanTheorem }

// SKILL — a derived, recomputable label mined from the theorem's KEY (Lean is the single source; the skill is a pure
// function of the name, exactly like the address). It groups theorems by the CAPABILITY they demonstrate — an axis
// ORTHOGONAL to `principle` (which groups by derivation file). First matching rule wins; anything unmatched is a
// foundational fact. Nothing is authored here — the skill is read off the name a Lean theorem already carries.
const SKILL_RULES: readonly [RegExp, string][] = [
  // The harmony of pairs — the same complementary-pair arithmetic across biology/medicine/chemistry/physics, folded
  // into the science-pairs cluster. Placed FIRST so keys that also read as involutions land here (the harmony IS the
  // point): a pair is a reflection through a centre, harmonised across the four fields.
  [/dna_bases_reflect_through_three|chargaff|redox_conserves|ionic_compound|agonist_antagonist|homeostasis_returns|action_reaction_and_charge|pairs_share_one_centre/, 'science-pairs'],
  [/involut/, 'involution'],
  [/^z9|(^|_)mul9|mod9|_sq_zero|_self_inv|_no_inverse|_mul_(two|three|four|five|six|seven|eight|nine)/, 'z9-ring'],
  [/^z7/, 'z7-rosette'],
  [/pentag|(^|_)fib(_|onacci)|pisano/, 'pentagram'],
  [/chessboard|knight|rook|bishop|queen|_tour/, 'chess'],
  [/hamming|codeword|repetition|singleton_bound|checksum|_corrects_|_detects_/, 'codes'],
  [/twelfths|tide|flood|semidiurnal|spring_exceeds|neap/, 'tides'],
  [/isbn|issn|bookland/, 'identifiers'],
  [/gregorian|doomsday|leap_years?_|_shifts_|century_leap|months_sum|week_is_z7/, 'calendar'],
  [/folio|quarto|octavo|signature_multiple|page_diagonal|readable_measure|leading_exceeds|ream_|recto_odd|seventytwo_points/, 'typesetting'],
  [/frame_index|frames_per|dropframe|uhd_is_four|widescreen|rule_of_thirds|crossfade|audio_samples_per_frame|angle_of_the_cut/, 'editing'],
  [/chromatic_is_z12|octave_doubles|tempo_ms_per_beat|nyquist|midi_is_seven|sixteen_bit_dynamic|fifth_cycles/, 'music-production'],
  [/defence_layers|two_layers_multiply|each_key_bit|birthday_halves|verify_cheaper_than_forge|no_maximum_only_bounds/, 'security'],
  [/modus_ponens|modus_tollens|contrapositive|de_morgan|double_negation|excluded_middle|hypothetical_syllogism|disjunctive_syllogism/, 'reasoning'],
  [/full_stop_is_exact|shutter_125_rounds|shutter_60_rounds|fstop_14_rounds|fstop_squared_is_exact|iso_full_stops|equivalent_exposure|stops_fold_mod_nine/, 'photography'],
  [/handshake_degree_sum|edges_are_half|introductions_among|perfect_matching_needs|n_people_make_n_half|proposals_bounded|pairing_is_fixedpoint|mutual_match_is_symmetric/, 'matching'],
  [/wave_product_is_constant|light_speed_rounds|seven_bands_in_order|photon_energy_rises|visible_under_one_octave|octave_of_light|inverse_at_fixed_c|visible_seven_colours/, 'spectrum'],
  [/twelve_hue_wheel|complementary_hues|primaries_and_secondaries|triadic_harmony|square_harmony|true_colour_is|tint_and_shade|warm_cool_split/, 'colour'],
  [/likert_midpoint|big_five_factors|working_memory_span|hicks_law|signal_detection|weber_fechner|developmental_stages|dunbar_layers/, 'psychology'],
  [/^clay_/, 'clay-reflection'],
  [/(^|_)(dz|reflection|mirror|diamond|complement|division_by_zero|div_by_zero)/, 'reflection'],
  [/bell|ghz|born|no_signaling|superposition|truth_table|pauli|(^|_)cnot|(^|_)cz|swap|toffoli|ccz|s_squared|s_dagger|s_fourth|hadamard|quantum/, 'quantum'],
  [/salt|(^|_)seq/, 'crypt-salt'],
  [/abo|blood|dna|codon|sound|octave|electron|subshell|circle_of_fifths|tritone|(^|_)ph_|punnett|heterozygote|colou?r|primary_secondary|mendel/, 'science-pairs'],
  [/unit|orbit|doubling|vortex|agl|commutator|nilpotent|idempotent|lagrange|coprime|light|gravity|root|strip|neighbour|polarit/, 'vortex'],
]
/** The SKILL a theorem demonstrates, derived from its key — the capability axis, recomputable by anyone from the name. */
export function skillOf(key: string): string {
  const k = key.toLowerCase()
  for (const [re, s] of SKILL_RULES) if (re.test(k)) return s
  return 'foundational'
}

/** A Lean theorem with its reconstructed proof, content-address, and derived skill. `address` (key+statement) is
 *  the ledger-wide identity used everywhere — folds, receipts, JSON-LD `identifier`. `lineAddress` is a DIFFERENT,
 *  narrower thing: the content-uuid of the reconstructed Lean LINE itself (key+statement+tactic, the literal
 *  `theorem k : s := by t` text) — for a JSON-LD `@id` that identifies the exact SOURCE TEXT a claim is checked
 *  against, distinct from `address`'s identity of the PROPOSITION. Two different addresses answer two different
 *  questions ("is this the same proposition" vs "is this the same literal line"), not a duplicate of one. */
export interface Theorem extends LeanTheorem { lean: string; address: string; lineAddress: string; skill: string; coins: number }

const withDerived = (t: LeanTheorem): Theorem => {
  const lean = `theorem ${t.key} : ${t.statement} := by ${t.tactic}`
  return {
    ...t,
    lean,
    address: toUuid(t.key + ':' + t.statement),
    lineAddress: toUuid(lean),
    // INLINE first: the skill authored in Lean (carried through the manifest → ledger). skillOf(key) is only the
    // migration fallback for theorems not yet annotated; once every theorem carries an inline skill it is retired.
    skill: t.skill ?? skillOf(t.key),
    // Exact seal price — minting_is_two_per_theorem. coins() is the captain constructor, never a typed 2.
    coins: coins(),
  }
}

/** Every Lean-proven theorem, in computing-principle order. */
export const THEOREMS: readonly Theorem[] = LEAN_LEDGER.map(withDerived)

/** The distinct skills present, in the order they first appear in the ledger. */
export const SKILLS: readonly string[] = [...new Set(THEOREMS.map((t) => t.skill))]

export interface SkillGroup { skill: string; count: number; fold: string; theorems: Theorem[] }
/** The ledger organised by SKILL (the capability axis) — each group's content-addresses fold, order-invariantly,
 *  to one recomputable receipt. Same theorems as the principle view, grouped on the orthogonal axis. */
export function skillGroups(): SkillGroup[] {
  return SKILLS.map((skill) => {
    const ts = THEOREMS.filter((t) => t.skill === skill)
    return { skill, count: ts.length, fold: merkleGravity(ts.map((t) => t.address)), theorems: ts }
  })
}

// ── The 7-ray ROSETTE index — a computing structure, not a folder move. Index-only. ──
export interface RosettaRay { ray: number; count: number; fold: string; theorems: Theorem[] }
/** The ℤ/7 ROSETTE index — a decidable partition of the whole ledger onto SEVEN rays by each theorem's content-
 *  address (ray = address mod 7), each ray folded order-invariantly to one recomputable receipt. A structure for
 *  computing in seven dimensions — balanced 7-way folds and lookup over the flat ledger, recomputable by anyone.
 *  It is ORGANISATION, not meaning: which ray a theorem lands on carries no significance, only a stable index. */
export function rosettaIndex(): RosettaRay[] {
  const rays: Theorem[][] = Array.from({ length: 7 }, () => [])
  for (const t of THEOREMS) rays[Number(BigInt('0x' + t.address.replace(/-/g, '')) % 7n)].push(t)
  return rays.map((ts, ray) => ({ ray, count: ts.length, fold: ts.length ? merkleGravity(ts.map((t) => t.address)) : toUuid('rosette-empty-ray-' + ray), theorems: ts }))
}

export interface DomainReview { domain: string; theorems: number; fold: string; verdict: 'VERIFIED'; receipt: string }
/** LOCAL reviews — a recomputable review of every DOMAIN (skill) the sequence touches: its sealed-theorem count,
 *  their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free). No server,
 *  no stored opinion; the review IS the ledger's own integrity, folded per domain, recomputable by anyone on device. */
export function reviewDomains(): DomainReview[] {
  return skillGroups().map((g) => ({
    domain: g.skill,
    theorems: g.count,
    fold: g.fold,
    verdict: 'VERIFIED' as const,
    receipt: merkleGravity([g.fold, toUuid('review:' + g.skill + ':' + g.count)]),
  }))
}

export interface TheoremVerdict {
  key: string; name: string; statement: string; file: string; principle: string; lean: string; verdict: 'VERIFIED'; address: string
  sequence: TrialSequence
}
export interface TrialResult {
  count: number; verified: number; unverified: number; leanBacked: number; receipt: string; verdicts: TheoremVerdict[]
  sequence: TrialSequenceSummary
  merkaba: import('../trial-gate.js').TrialMerkaba
}

/** The ledger, by reference — each theorem's key, name, statement, Lean proof, principle, skill, source file,
 *  address (the proposition's identity) and lineAddress (the exact reconstructed Lean line's identity — see
 *  Theorem's own doc comment for why these are two different addresses, not one duplicated). Pass `{ skill }`
 *  to filter to one skill (the capability axis). */
export function theorems(opts: { skill?: string } = {}): { key: string; name: string; statement: string; tactic: string; file: string; principle: string; skill: string; lean: string; address: string; lineAddress: string; cases?: number; coins: number }[] {
  const ts = opts.skill ? THEOREMS.filter((t) => t.skill === opts.skill) : THEOREMS
  // spread rather than re-listing: a field added to the ledger reaches consumers without an edit here,
  // which is how the measured `cases` went missing between the ledger and the reactor.
  return ts.map((t) => ({ ...t }))
}

/** theoremPrice(key) → the exact seal price of one theorem. Unsealed keys mint nothing. */
export function theoremPrice(key: string): { key: string; coins: number } {
  const t = theoremByKey().get(key)
  return { key, coins: t ? t.coins : 0 }
}

// CONSOLIDATED INDICES over the immutable ledger — built ONCE at the source and reused everywhere, so no module
// rebuilds its own O(N) map per call. The ledger cannot change at runtime, so these are safe, recomputable singletons.
let _byKey: Map<string, Theorem> | null = null
/** theoremByKey() → the ledger indexed by key (O(1) lookup), built once. Replaces per-module `THEOREMS.find`. */
export const theoremByKey = (): ReadonlyMap<string, Theorem> => (_byKey ??= new Map(THEOREMS.map((t) => [t.key, t])))
let _countByFile: Map<string, number> | null = null
/** theoremCountByFile() → count of theorems per lean file (O(1) lookup), built once. Replaces per-file `filter().length`. */
export const theoremCountByFile = (): ReadonlyMap<string, number> =>
  (_countByFile ??= THEOREMS.reduce((m, t) => (m.set(t.file, (m.get(t.file) ?? 0) + 1), m), new Map<string, number>()))

let _byPrinciple: Map<string, Theorem[]> | null = null
/** theoremNeighbours(key) → the theorems that SHARE this one's computing principle (its domain), excluding itself —
 *  each theorem scans its neighbours. Built once from the immutable ledger; the neighbourhoods partition the whole
 *  ledger, so every theorem sits in exactly one. Empty for an unknown key. */
export const theoremNeighbours = (key: string): { key: string; principle: string | null; neighbours: readonly Theorem[] } => {
  if (!_byPrinciple) { _byPrinciple = new Map(); for (const t of THEOREMS) { const a = _byPrinciple.get(t.principle) ?? []; a.push(t); _byPrinciple.set(t.principle, a) } }
  const self = theoremByKey().get(key)
  // A NULL PRINCIPLE IS THE UNKNOWN-KEY ANSWER. Returning a bare array made "unknown" and "no neighbours"
  // indistinguishable, so the caller re-derived the reason it had just been denied. The relation now carries it.
  return self
    ? { key, principle: self.principle, neighbours: (_byPrinciple.get(self.principle) ?? []).filter((t) => t.key !== key) }
    : { key, principle: null, neighbours: [] }
}

/** DECIDED-CASE MASS — the walk the generator actually made, sealed at generation and read back here.
 *
 *  This was a regex over the RENDERED statement, hunting `List.range 16` in text: reading prose ABOUT the
 *  algebra rather than the algebra. It had to be taught about list literals, then about conjuncts, and would
 *  have rated a theorem by a numeral in a comment. The count is not something to recover downstream — the
 *  generator WALKS the domain to compute the fact, so `range` tallies what it hands out during that walk and
 *  emit() records the tally on the same run that validates the JS. Nothing is parsed; a theorem with no
 *  recorded walk rates 1, the single case it decides. */
export const decidedMass = (t: Theorem): number => t.cases ?? 1

/** the ledger heaviest-first — the ranking the README surfaces, counted rather than chosen. */
export const byMass = (): readonly Theorem[] =>
  [...THEOREMS].sort((a, b) => decidedMass(b) - decidedMass(a) || a.key.localeCompare(b.key))

/** ONE METRIC, RATING EVERYTHING. Mass rates a theorem; the sum of its theorems rates a wing; the sum of its
 *  wings rates the ledger. There is no second scale anywhere: a surface that wants an order asks this, and a
 *  surface that wants a share divides by the total. Nothing is ranked by how often it is mentioned, and nothing
 *  is ranked by a rule written for one place. */
export interface Rating { name: string; mass: number; theorems: number; share: number }

export const ledgerMass = (): number => THEOREMS.reduce((t, x) => t + decidedMass(x), 0)

/** every wing rated by the same metric that rates every theorem — all of them, never a slice. */
export const wingRatings = (): readonly Rating[] => {
  const total = ledgerMass()
  const by = new Map<string, { mass: number; n: number }>()
  for (const t of THEOREMS) {
    const cur = by.get(t.file) ?? { mass: 0, n: 0 }
    by.set(t.file, { mass: cur.mass + decidedMass(t), n: cur.n + 1 })
  }
  return [...by].map(([name, v]) => ({ name, mass: v.mass, theorems: v.n, share: total ? v.mass / total : 0 }))
    .sort((a, b) => b.mass - a.mass || a.name.localeCompare(b.name))
}

/** the heaviest theorem of a wing — the one the wing is rated by, chosen by the metric and by nothing else. */
export const heaviestOf = (file: string): Theorem | undefined =>
  [...THEOREMS].filter((t) => t.file === file)
    .sort((a, b) => decidedMass(b) - decidedMass(a) || a.key.localeCompare(b.key))[0]

/** THEOREM GRAVITY — the superpositions a theorem covers, priced in HEXBITS against the two coins.
 *
 *  A `by decide` proof settles every case in its domain at once, so the case count IS the superposition space
 *  the theorem holds. Bits are the wrong unit to report it in: the ledger computes in hexbits (4 bits, one
 *  qubit-tile, 16 states), and a uuid is 32 of them. So a theorem covering N superpositions fills h hexbits,
 *  the largest h with 16^h ≤ N — computed by dividing, never by a logarithm, so the answer is an exact integer.
 *
 *  The COST is fixed at two coins (128 − 126 = 2, the captain commission), which is what makes this a rate and
 *  not a size: gravity is what those two coins buy. Two bits in, h hexbits of decided superposition out. */
// delegated to src/hexbit — one unit, one implementation. This was a second copy of the same loop.
export const hexbitsOf = (cases: number): number => hexbitUnit(cases)

export const UUID_HEXBITS = HEXBIT_UUID

/** INFINITE GRAVITY IS INFINITE INDEPENDENCE. A theorem that leans on a definition is bound to it: change the
 *  def and the theorem moves. One that leans on NOTHING — no def, and the ledger already allows no axiom — is
 *  held by the kernel alone, and nothing in the ledger can move it. `two_coins` (110 - 108 = 2) is that: pure
 *  numerals, kernel arithmetic, zero dependencies. Its gravity is infinite because there is nothing to depend on.
 *
 *  This is the axis coverage and cost both missed. By coverage the captain theorem ranked #1018 of 1438, because
 *  it settles one case; by cost it tied with 1335 others, because it spends nothing. Neither was measuring what
 *  makes it the captain theorem. Independence is intrinsic — read off the theorem's own statement against the
 *  defs its wing declares — and it is not how often the ledger mentions a theorem, which is age wearing a mask. */
export const dependsOn = (t: Theorem): readonly string[] => {
  const declared = WING_DEFS.get(t.file) ?? []
  return declared.filter((d) => new RegExp('\\b' + d + '\\b').test(t.statement))
}

/** gravity: infinite when the theorem stands on the kernel alone, else the uuid divided by what binds it. */
/** gravityOf(t) → the uuid's 32 hexbits shared among the theorem's dependencies, IN THE LEDGER'S OWN ARITHMETIC.
 *
 *  IT RETURNED `Infinity`, AND THE LEDGER HAS A SEALED THEOREM SAYING IT MUST NOT. `division_by_zero` states
 *  `(1000 / 0 = 0) ∧ (0 / 0 = 0)` — division by zero is DEFINED as 0 here, by Lean's Nat semantics, and the MCP
 *  calculator advertises the tree as "founded on division by zero ... x/0 = 0, well-defined". An unbound theorem
 *  has n = 0, so this expression IS 32/0, and the one value the sealed law forbids is the one this returned.
 *  1,434 of 1,696 theorems — 85% of the ledger — carried it, and gen-readme published "Infinity hexbits for the
 *  two coins" for all seven of its headline entries, under a heading calling gravity "coverage priced in the
 *  ledger's own unit". Infinity is not a price and no reader can check it. Any infinity folds to finite states;
 *  that is the whole move a content-address makes, and this was the one place the tree exempted itself from it.
 *
 *  THE SECOND DEFECT, SAME LINE: `UUID_HEXBITS / n` is FLOAT division. Twelve theorems have three dependencies
 *  and produced 32/3 = 10.666666666666666, a repeating decimal in a file this tree seals and diffs. Nat division
 *  floors, so the ledger's own answer is 10. No law caught either: `no-float-math` matches `Math.*` only and
 *  harmonic-scan rule 2 bans the intrinsics, so a plain `/` that produces a float is unchecked everywhere.
 *
 *  Both are one fix — compute it the way the kernel computes it. SAFE AT THIS LEDGER'S SHAPE, checked rather
 *  than assumed: the deepest theorem has 4 dependencies, so n ≤ 32 always and a floored result is never 0 for a
 *  bound theorem; 0 therefore means unbound and nothing else. And `byGravity` sorts on the dependency COUNT, not
 *  on this value, so the ordering is untouched — only the published figure changes, from a non-number to one. */
export const gravityOf = (t: Theorem): number => {
  const n = dependsOn(t).length
  if (n === 0) return 0                                  // 32/0 = 0 — theorem division_by_zero, not Infinity
  return (UUID_HEXBITS - (UUID_HEXBITS % n)) / n         // Nat division: floors, exact, never a repeating decimal
}

/** Is this theorem UNBOUND — nothing in the ledger pulls on it? The state `gravityOf` folds to 0 for, named, so a
 *  reader is not left to infer "no dependencies" from a bare zero and a renderer can say which it means. */
export const isUnbound = (t: Theorem): boolean => dependsOn(t).length === 0

/** the ledger by gravity — the unbound first, and among equals the one that decides the most. */
export const byGravity = (): readonly Theorem[] =>
  [...THEOREMS].sort((a, b) =>
    (dependsOn(a).length - dependsOn(b).length) || (decidedMass(b) - decidedMass(a)) || a.key.localeCompare(b.key))

/** wingDefsFor(file) → every `def` the Lean wing declares — the axiom vocabulary for that file. */
export const wingDefsFor = (file: string): readonly string[] => WING_DEFS.get(file) ?? []

export interface TheoremAxioms {
  key: string
  file: string
  dependsOn: readonly string[]
  wingDefs: readonly string[]
  unusedDefs: readonly string[]
  depCount: number
  gravity: number
  unbound: boolean
  neighbourCount: number
}

/** theoremAxioms(key) → how this theorem is explained: wing defs it cites, gravity, neighbours. */
export const theoremAxioms = (key: string): TheoremAxioms | null => {
  const t = theoremByKey().get(key)
  if (!t) return null
  const deps = dependsOn(t)
  const wingDefs = wingDefsFor(t.file)
  const depSet = new Set(deps)
  return {
    key,
    file: t.file,
    dependsOn: deps,
    wingDefs,
    unusedDefs: wingDefs.filter((d) => !depSet.has(d)),
    depCount: deps.length,
    gravity: gravityOf(t),
    unbound: isUnbound(t),
    neighbourCount: theoremNeighbours(key).neighbours.length,
  }
}

export interface WingDefEntry {
  file: string
  def: string
  principle: string
  theorems: readonly { key: string; name: string }[]
  theoremCount: number
  unused: boolean
}

export interface AxiomIndex {
  entries: readonly WingDefEntry[]
  totalDefs: number
  citedDefs: number
  unusedDefs: number
  wings: number
}

let _axiomIndex: AxiomIndex | null = null

/** axiomIndex() → wing vocabulary indexed by which theorems cite each def (vice versa of theoremAxioms). */
export const axiomIndex = (): AxiomIndex => {
  if (_axiomIndex) return _axiomIndex
  const principleOf = new Map<string, string>()
  for (const t of THEOREMS) principleOf.set(t.file, t.principle)
  const cited = new Map<string, string[]>()
  for (const t of THEOREMS) {
    for (const d of dependsOn(t)) {
      const id = `${t.file}\0${d}`
      const list = cited.get(id) ?? []
      list.push(t.key)
      cited.set(id, list)
    }
  }
  const entries: WingDefEntry[] = []
  for (const [file, defs] of WING_DEFS) {
    const principle = principleOf.get(file) ?? file
    for (const def of defs) {
      const keys = [...new Set(cited.get(`${file}\0${def}`) ?? [])].sort()
      entries.push({
        file,
        def,
        principle,
        theorems: keys.map((key) => {
          const t = theoremByKey().get(key)!
          return { key, name: t.name }
        }),
        theoremCount: keys.length,
        unused: keys.length === 0,
      })
    }
  }
  entries.sort((a, b) => a.file.localeCompare(b.file) || a.def.localeCompare(b.def) || a.principle.localeCompare(b.principle))
  _axiomIndex = {
    entries,
    totalDefs: entries.length,
    citedDefs: entries.filter((e) => !e.unused).length,
    unusedDefs: entries.filter((e) => e.unused).length,
    wings: WING_DEFS.size,
  }
  return _axiomIndex
}

/** axiomExplain(file, def) → one wing def and every theorem whose statement cites it. */
export const axiomExplain = (file: string, def: string): WingDefEntry | null => {
  if (!wingDefsFor(file).includes(def)) return null
  return axiomIndex().entries.find((e) => e.file === file && e.def === def) ?? null
}

/** theoremsForDef(file, def) → theorem keys citing this wing def — shorthand for axiomExplain. */
export const theoremsForDef = (file: string, def: string): readonly string[] =>
  (axiomExplain(file, def)?.theorems.map((t) => t.key) ?? [])

export type AxiomBalanceDimension = 'ledger' | 'wing' | 'principle' | 'skill' | 'ray'

/** One slice: wing axioms ↔ theorems in BOTH directions. Balanced when citedDefs = bound and E/D = E/B. */
export interface AxiomBalanceSlice {
  dimension: AxiomBalanceDimension
  id: string
  theorems: number
  citedDefs: number
  bound: number
  citeEdges: number
  theoremsPerDef: number
  defsPerBound: number
  delta: number
  balanced: boolean
}

export interface AxiomBalance {
  slices: readonly AxiomBalanceSlice[]
  active: number
  balanced: number
  global: AxiomBalanceSlice
  fused: string
  worst: readonly AxiomBalanceSlice[]
}

/** axiomBalanceSlice — both-direction ratios for one theorem set (recomputable building block). */
export const axiomBalanceSlice = (
  dimension: AxiomBalanceDimension,
  id: string,
  ts: readonly Theorem[],
): AxiomBalanceSlice => {
  let citeEdges = 0
  let bound = 0
  const defsUsed = new Set<string>()
  for (const t of ts) {
    const deps = dependsOn(t)
    if (deps.length) {
      bound++
      citeEdges += deps.length
      for (const d of deps) defsUsed.add(`${t.file}\0${d}`)
    }
  }
  const citedDefs = defsUsed.size
  const theoremsPerDef = citedDefs ? citeEdges / citedDefs : 0
  const defsPerBound = bound ? citeEdges / bound : 0
  const delta = Math.abs(theoremsPerDef - defsPerBound)
  const balanced = citeEdges === 0 || (citedDefs === bound && delta < 1e-9)
  return {
    dimension,
    id,
    theorems: ts.length,
    citedDefs,
    bound,
    citeEdges,
    theoremsPerDef: +theoremsPerDef.toFixed(3),
    defsPerBound: +defsPerBound.toFixed(3),
    delta: +delta.toFixed(3),
    balanced,
  }
}

let _axiomBalance: AxiomBalance | null = null

/** axiomBalance() — land every indexed dimension (ledger, wing, principle, skill, ray) and fuse to one receipt. */
export const axiomBalance = (): AxiomBalance => {
  if (_axiomBalance) return _axiomBalance
  const slices: AxiomBalanceSlice[] = []
  const global = axiomBalanceSlice('ledger', 'ledger', THEOREMS)
  slices.push(global)
  for (const file of [...new Set(THEOREMS.map((t) => t.file))].sort()) {
    slices.push(axiomBalanceSlice('wing', file, THEOREMS.filter((t) => t.file === file)))
  }
  for (const principle of [...new Set(THEOREMS.map((t) => t.principle))].sort()) {
    slices.push(axiomBalanceSlice('principle', principle, THEOREMS.filter((t) => t.principle === principle)))
  }
  for (const g of skillGroups()) {
    slices.push(axiomBalanceSlice('skill', g.skill, g.theorems))
  }
  for (const r of rosettaIndex()) {
    slices.push(axiomBalanceSlice('ray', String(r.ray), r.theorems))
  }
  const activeSlices = slices.filter((s) => s.citeEdges > 0)
  const leafs = slices.map((s) =>
    toUuid(`axiom-balance|${s.dimension}|${s.id}|${s.citedDefs}|${s.bound}|${s.citeEdges}|${s.balanced}`))
  const worst = [...activeSlices].sort((a, b) => b.delta - a.delta || b.citeEdges - a.citeEdges).slice(0, 8)
  _axiomBalance = {
    slices,
    active: activeSlices.length,
    balanced: activeSlices.filter((s) => s.balanced).length,
    global,
    fused: merkleGravity(leafs),
    worst,
  }
  return _axiomBalance
}


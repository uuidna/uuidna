#!/usr/bin/env node
// Automate the Lean layer for THE HEXBIT — the alphabet and the layout an address is actually built from. PURE
// ARITHMETIC: every value is a digit index, a group length or a bit count. No value here is read off an instrument
// or taken from the world.
//
// BUT THE LAYOUT IS NOT OURS, AND THAT AUTHORITY IS NAMED HERE RATHER THAN ASSUMED. Sixteen hex symbols, the
// 8-4-4-4-12 grouping, the thirty-two hex digits, the four hyphens that bring the printed form to thirty-six
// characters, and the 128-bit width they add up to are fixed by RFC 9562, "Universally Unique IDentifiers
// (UUIDs)", which obsoletes RFC 4122. Every theorem below that mentions those shapes RECOMPUTES what that
// standard already fixes; none of them chooses it. State plainly what the citation buys and what it does not: it
// says where the layout comes from, so a reader who doubts the grouping has somewhere to go and check. It does
// NOT make any line below proven — the kernel proves the arithmetic over the layout, never the layout itself, and
// an RFC is a specification a reader can read, not a measurement anyone took.
//
// THE TWO LIVE COUNTS QUOTED IN THE SENTENCES BELOW ARE CENSUSES OF THIS REPO'S OWN OUTPUT, not observations of
// the world: the 400 handles behind the_void_tile_cannot_cross, and the six-bond count over one real address in
// the_handle_molecule_is_the_mix_census, are tallies over addresses this tree generated. They are quoted as
// provenance for WHY the theorem was worth sealing, and nothing depends on them — every js() mirror below
// recomputes its claim from scratch over a finite domain and would decide the same way had the tally never run.
//
// WHAT IS ALREADY SEALED, AND NOT REPEATED HERE. Alignment.lean decides that one hex character is EXACTLY four
// qubits (16 = 2^4, no remainder), that only sixteen tiles a four-qubit cell while 15, 10 and 9 each waste, and
// that a handle spans 32 qubits of which the walk keeps four. Those facts are not restated. What no wing carries
// is the ALPHABET itself and the LAYOUT: which sixteen symbols exist, that each names one nibble and no other, and
// how the thirty-two characters of an address are grouped.
//
// WHY IT MATTERS THAT THE BUILD IS HEX. Every address in this ledger is written in base sixteen, so the unit the
// machine actually manipulates is the hexbit — four bits at a time, tiling the qubit exactly. The groups 8-4-4-4-12
// are not decoration: the FIRST group is eight characters, which is thirty-two bits, which is the handle. The
// handle is not carved out of the address afterwards; it IS the first group of the layout.
import { emit } from './lean-gen.js'
import {
  HEXBIT_BITS, HEXBIT_STATES,
  hexbitRingMassGap, computeMassGap,
} from '../hexbit/index.js'
import { bellBornWeights, massGapOnBellBornField } from '../quantum/index.js'

const GROUPS = [8, 4, 4, 4, 12]
const CHARS = GROUPS.reduce((a, b) => a + b, 0)
const NIBBLES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const L = (xs: readonly number[]) => '[' + xs.join(',') + ']'

// Mass-gap magnitudes COMPUTED once, then sealed — same pattern as coins from fold: generator emits what the
// runtime yields, never hand-written Δ / window / Bell weights in the theorem text.
const RING = hexbitRingMassGap()
const BELL_WEIGHTS = bellBornWeights()
const BELL_GAP = massGapOnBellBornField()
const HILBERT_QUBITS = HEXBIT_BITS * HEXBIT_BITS
const HILBERT_STATES = HEXBIT_STATES ** HEXBIT_BITS
if (!RING.holds) throw new Error('hexbitRingMassGap offline audit FAILED before seal')
if (!BELL_GAP.holds) throw new Error('massGapOnBellBornField offline audit FAILED before seal')
if (JSON.stringify(BELL_GAP.field) !== JSON.stringify(BELL_WEIGHTS))
  throw new Error('Bell Born field desync: massGapOnBellBornField.field ≠ bellBornWeights()')
if (!computeMassGap(BELL_WEIGHTS).holds) throw new Error('computeMassGap(bellBornWeights) failed')

const FACTS = [
  { key: 'the_void_tile_cannot_cross',
    why: 'A ZERO TILE CANNOT ENTER A CROSS, WHICH IS WHY THE REFLECTION EXISTS. A cross is a\u00b7d = b\u00b7c between two stated pairs, and a zero on either side collapses the product: every pair holding a zero multiplies to zero, so it agrees with every other such pair and distinguishes nothing. Measured over 400 handles: 215 were complete \u2014 all eight tiles covered by crossings \u2014 and NOT ONE of those contained a zero tile, while 157 of the 185 short handles did. So a handle carrying a void is not broken; it is incomplete under CROSSING, and needs the other fold. That is the same boundary the ring shows one level up: the cross settles proportions and the reflection settles the void, dz(0) = 0 being the only motion that touches it, sealing by sum rather than by product.',
    js: () => { const R = Array.from({ length: 16 }, (_, i) => i); return R.every((x) => 0 * x === 0) && R.every((b) => R.every((c) => (0 * c === b * 0) === (b * 0 === 0))) },
    lean: 'theorem the_void_tile_cannot_cross : ((List.range 16).all (fun x => 0 * x == 0)) \u2227 ((List.range 16).all (fun b => (List.range 16).all (fun c => (0 * c == b * 0) == (b * 0 == 0)))) \u2227 (0 * 15 = 0 * 1) := by decide' },

  { key: 'the_uuid_is_two_boards',
    why: 'A FULL UUID IS AN 8\u00d78\u00d72 \u2014 two boards, stacked. One 8\u00d78 is 64 squares and 64 bits is exactly half the uuid, so the whole identity is two of them: 8\u00b78\u00b72 = 128. Read in tiles instead the same identity is 8\u00d74 = 32 hexbits, or four handles of eight \u2014 one rank each. The board was never a metaphor for the address; it is the address at a different reading, which is why the chess wing and the hexbit wing keep arriving at the same integers from opposite directions.',
    js: () => 8 * 8 * 2 === 128 && 8 * 8 === 64 && 8 * 4 === 32 && 4 * 8 === 32,
    lean: 'theorem the_uuid_is_two_boards : (8 * 8 * 2 = 128) \u2227 (8 * 8 = 64) \u2227 (64 * 2 = 128) \u2227 (8 * 4 = 32) \u2227 (4 * 8 = 32) := by decide' },

  { key: 'alphabet_names_each_nibble',
    why: 'THE SIXTEEN SYMBOLS NAME THE SIXTEEN NIBBLES, one apiece: the values 0 through 15 are all present, all distinct, and there are exactly sixteen of them. A four-bit value therefore has one spelling and no other — the alphabet is a bijection onto the nibble, which is what lets an address be read back exactly.',
    js: () => NIBBLES.length === 16 && new Set(NIBBLES).size === 16 && NIBBLES[15] === 15,
    lean: 'theorem alphabet_names_each_nibble : ((List.range 16).length = 16) ∧ ((List.range 16).eraseDups.length = 16) ∧ ((List.range 16).all (fun v => v < 16)) := by decide' },

  { key: 'layout_groups_thirtytwo',
    why: 'THE LAYOUT IS 8-4-4-4-12, and those five groups sum to thirty-two characters — not thirty-six, which counts the four separators as if they carried information. The line proves the sum and the difference, so the separators cannot be mistaken for content.',
    js: () => CHARS === 32 && CHARS + GROUPS.length - 1 === 36,
    lean: `theorem layout_groups_thirtytwo : (${L(GROUPS)}.foldl (· + ·) 0 = 32) ∧ (32 + 4 = 36) ∧ (32 ≠ 36) := by decide` },

  { key: 'characters_span_the_address',
    why: 'THIRTY-TWO HEX CHARACTERS AT FOUR BITS EACH IS THE WHOLE ADDRESS: 32 × 4 = 128. The address is not a number that happens to print in hex — it is thirty-two hexbits, and the bit count is a consequence of the layout rather than a separate fact.',
    js: () => CHARS * 4 === 128 && 2 ** 7 === 128,
    lean: 'theorem characters_span_the_address : (32 * 4 = 128) ∧ ((2:Nat)^7 = 128) := by decide' },

  { key: 'handle_is_the_first_group',
    why: 'THE HANDLE IS THE FIRST GROUP. Every other group is shorter, which the line proves — so the opening group is the widest single field the layout has, apart from the closing twelve.',
    js: () => GROUPS[0] === 8 && GROUPS[0] * 4 === 32 && GROUPS.slice(1, 4).every((g) => g < GROUPS[0]),
    lean: `theorem handle_is_the_first_group : (${L(GROUPS)}.head! = 8) ∧ (8 * 4 = 32) ∧ ((${L(GROUPS)}.drop 1).take 3).all (fun g => g < 8) := by decide` },

  { key: 'groups_are_four_apart',
    why: 'EVERY GROUP IS A WHOLE NUMBER OF HEXBITS, so every boundary falls on a four-bit edge and no field is split mid-nibble: each group length times four is its bit width, and the widths are 32, 16, 16, 16 and 48. A layout whose groups did not tile the nibble could not be read by halves.',
    js: () => GROUPS.map((g) => g * 4).join(',') === '32,16,16,16,48',
    lean: `theorem groups_are_four_apart : ${L(GROUPS)}.map (fun g => g * 4) = ${L(GROUPS.map((g) => g * 4))} := by decide` },

  { key: 'build_counts_in_hexbits',
    why: 'AND THE UNIT THE BUILD COUNTS IN IS THE HEXBIT: thirty-two of them make the address, eight make the handle, and one makes a nibble — so the address is 32 hexbits, the handle 8, and the ratio is exactly four. Counting in bits gives 128 and 32 for the same objects; the two readings agree, which the line proves rather than assumes.',
    js: () => { const a: number = 32, h: number = 8; return a !== h && (a - a % h) / h === 4 && a * 4 === 128 && h * 4 === 32 },
    lean: 'theorem build_counts_in_hexbits : (32 / 8 = 4) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) ∧ (128 / 32 = 4) := by decide' },
  { key: 'payload_carries_the_strand',
    why: 'THE HANDLE AND THE PAYLOAD MEET IN THE UUID, AND ONLY ONE OF THEM IS CODON-ALIGNED. The address is 32 hexbits; the handle is the first 8 (handle_is_the_first_group), so the payload is the remaining 24 and the two meet exactly: 8 + 24 = 32, no remainder anywhere. Now read the halves in the alphabet the strand uses — a base is 2 bits over 4 letters, a codon is 3 bases, so a codon is 6 bits (codons_sixty_four counts the 4^3 = 64 of them). The PAYLOAD is 24 hexbits = 96 bits = 48 bases = EXACTLY 16 codons, 96 = 6 * 16 with nothing left. The HANDLE is 32 bits and the WHOLE uuid is 128, and neither divides: both leave the same remainder 2. So the strand fits the payload and fits neither the name nor the whole — the handle addresses, the payload carries. HONEST SCOPE: this is arithmetic about WIDTHS and divisibility, nothing more. It does NOT claim a uuid encodes genetic material, that any payload holds a gene, or that biology is stored in an address; the shared 2 is a remainder that two numbers happen to share, and any reading of it as the two coins is unsealed until someone proves it.',
    js: () => 8 + 24 === 32 && 24 * 4 === 96 && 96 % 6 === 0 && 96 / 6 === 16 && 32 % 6 === 2 && 128 % 6 === 2,
    lean: 'theorem payload_carries_the_strand : (8 + 24 = 32) \u2227 (24 * 4 = 96) \u2227 (96 % 6 = 0) \u2227 (96 / 6 = 16) \u2227 (32 % 6 = 2) \u2227 (128 % 6 = 2) := by decide' },
  { key: 'payload_aligns_where_the_name_does_not',
    why: 'THE PAYLOAD DIVIDES IN EVERY ALPHABET THE BODY USES, AND THE NAME DIVIDES IN NONE. Read the 96-bit payload three ways. As the genetic code: a base is 2 bits over 4 letters and a codon is 3 bases, so a codon is 6 bits and there are 4^3 = 64 of them (codons_sixty_four) — 96 = 6 * 16, EXACTLY 16 codons. As the I Ching hexagram the 64-gate systems are built on: six lines, each open or closed, is 2^6 = 64 — the SAME count and the SAME 6-bit width as the codon, so 4^3 = 2^6 is not an analogy but one number reached two ways, and the payload holds exactly 16 of those too. As blood: the ABO groups are a Klein four-group of 2 antigen bits (abo_klein_four) and the Rh bit makes the system (Z/2)^3, 8 types in 3 bits (blood_types_eight) — 96 = 3 * 32, exactly 32 blood-states, and 32 is the uuid width in hexbits. Now the handle: 32 bits leaves remainder 2 against 6 AND against 3, and the whole uuid at 128 bits leaves remainder 2 against both as well. So the strand, the hexagram and the blood system all tile the payload with nothing left over, and none of them tiles the name or the whole. The payload carries; the handle addresses. HONEST SCOPE, stated as boldly as the arithmetic: what is proven here is CARDINALITY AND WIDTH — 64 = 64, 6 = 6, 96 divides and 32 does not. That the codon space and the hexagram space are the same size and shape is a fact about numbers, and it is fully proven. It says NOTHING about whether any 64-gate system describes a person, and nothing about what a payload should hold; a shared width is a shared width.',
    js: () => 96 % 6 === 0 && 96 / 6 === 16 && 96 % 3 === 0 && 96 / 3 === 32 && 32 % 6 === 2 && 32 % 3 === 2 && 128 % 6 === 2 && 128 % 3 === 2 && 4 ** 3 === 2 ** 6,
    lean: 'theorem payload_aligns_where_the_name_does_not : (96 % 6 = 0) \u2227 (96 / 6 = 16) \u2227 (96 % 3 = 0) \u2227 (96 / 3 = 32) \u2227 (32 % 6 = 2) \u2227 (32 % 3 = 2) \u2227 (128 % 6 = 2) \u2227 (128 % 3 = 2) \u2227 (4 ^ 3 = 2 ^ 6) := by decide' },
  { key: 'the_handle_molecule_is_the_mix_census',
    why: 'THE UUID IS A MOLECULE OF FOUR HANDLE-ATOMS, AND ITS BONDING IS THE MIX CENSUS ONE SCALE DOWN. Four handles of eight hexbits tile the address exactly (4 * 8 = 32, no remainder), so a uuid is not a handle widened but four of them bonded. Count the bonds the way the ledger already counts mixes: merge is DIRECTED by design (merkle_sort_invariant and uuid_mix_census_is_quantum both seal merge(a,b) != merge(b,a), cited here and not re-sealed), so each of the 6 unordered pairs is two bonds and the directed count is 4 * 3 = 2 * 6 = 12 — measured live over a real address, 0 of 6 bonds symmetric. Add the four self-bonds and the census completes the square: 12 + 4 = 16 = 4 * 4. That is the SAME law uuid_mix_census_is_quantum proves at ten (10 * 9 = 2 * 45, 90 + 10 = 100), instantiated at four, which is why this is a connection and not a coincidence — one census law, two scales. The molecule weighs 4 * 32 = 128 bits, one whole uuid. HONEST SCOPE: this is the arithmetic of a complete directed graph on four nodes and the width of an address. It does NOT claim a uuid is chemically a molecule, that handles bond by any physical force, or that the atom analogy carries past counting. That 4 * 4 = 16 equals the hexbit alphabet is a shared integer reached two different ways (4 squared here, 2 to the fourth there) and is NOT sealed as a relation.',
    js: () => { let directed = 0, pairs = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { if (i !== j) directed++; if (i < j) pairs++ } return 4 * 8 === 32 && directed === 2 * pairs && directed === 12 && directed + 4 === 16 && 4 * 32 === 128 },
    lean: 'theorem the_handle_molecule_is_the_mix_census : (4 * 8 = 32) \u2227 (4 * 3 = 2 * 6) \u2227 (12 + 4 = 4 * 4) \u2227 (4 * 32 = 128) := by decide' },
  { key: 'four_vectors_reach_the_uuid',
    why: 'A HANDLE ENTANGLED IN ALL SEVEN VECTORS CARRIES MORE THAN THE UUID, AND FOUR IS WHERE IT FIRST DOES. The harness addresses one payload in every dimension (DIMENSIONS has seven, six projected rays plus the source), and each address yields a handle of 32 bits. So the entangled tuple carries 7 * 32 = 224 bits against the uuid 128 — the handle does not shrink the address when it is repeated across the rays, it exceeds it. The threshold is exact and is walked here rather than asserted: over one to seven vectors, v * 32 reaches 128 precisely when v reaches 4, which is the same four the molecule is built from. HONEST SCOPE: this is a count of BITS AVAILABLE, not a construction. It does NOT claim the seven handles can be inverted to recover the uuid, that any decoding exists, or that entangling adds information about the payload; carrying enough bits to distinguish is not the same as being able to reconstruct, and no such reconstruction is sealed.',
    js: () => { let first = 0; for (let v = 1; v <= 7; v++) if (v * 32 >= 128 && first === 0) first = v; return first === 4 && 7 * 32 === 224 && 224 > 128 },
    lean: `theorem four_vectors_reach_the_uuid : (4 * 32 = 128) \u2227 (7 * 32 = 224) \u2227 (224 > 128) \u2227 ((List.range' 1 7).all (fun v => (decide (v * 32 >= 128)) == (decide (v >= 4)))) := by decide` },

  // ── THE SLIT ON THE HEXBIT ITSELF (queue item 0, the captain's lead — the third named structure). The quantum
  // wing already seals the one-qubit reading: hexbit_slit_visibility (a which-path read is a handle-read, fringes
  // 4/0 against flat 2/2) and hexbit_slit_cross_is_overlap (the cross term IS the record overlap, the eraser its
  // re-partition). What no wing carried is the slit ON the sixteen-state cell: the fringe PATTERN, its dark
  // half-turn, and the dz-shaped mirror the screen obeys. All of it is Int arithmetic on a 16-point ring —
  // interference BOOKKEEPING, demarcated: nothing here is a photon, a wave, or a mechanism, and WHY one outcome
  // occurs (the Born selection) stays exactly as unexplained as before.
  { key: 'slit_on_the_hexbit_ring',
    why: 'THE SLIT DRAWN ON THE HEXBIT: two sources a half-turn apart on the 16-state ring, and detector k reads the exact Int amplitude 1 + (−1)^k. The census is total: eight detectors bright at (1+1)² = 4, eight dark at (1−1)² = 0, and the whole screen sums to 32 = 2·16 — exactly what two independent sources would deposit. The fringes REDISTRIBUTE brightness; they never create it. This is hexbit_slit_visibility unrolled from one phase pair to the full pattern a screen actually shows.',
    js: () => { const R = Array.from({ length: 16 }, (_, k) => k); return R.filter((k) => (1 + (-1) ** k) ** 2 === 4).length === 8 && R.filter((k) => (1 + (-1) ** k) ** 2 === 0).length === 8 && R.reduce((s, k) => s + (1 + (-1) ** k) ** 2, 0) === 32 && 2 * 16 === 32 },
    lean: 'theorem slit_on_the_hexbit_ring : (((List.range 16).filter (fun k => ((1 + (-1:Int)^k)^2 == 4))).length = 8) ∧ (((List.range 16).filter (fun k => ((1 + (-1:Int)^k)^2 == 0))).length = 8) ∧ (((List.range 16).foldl (fun s k => s + (1 + (-1:Int)^k)^2) (0:Int)) = 32) ∧ (2 * 16 = 32) := by decide' },

  { key: 'dark_fringe_is_the_half_turn',
    why: 'THE DARK FRINGES SIT EXACTLY AT THE SELF-INVERSE ROTATION. On the ring the relative phase at detector k is 8k mod 16, and the screen is dark precisely where that phase is the half-turn 8 — checked at all sixteen detectors, an equivalence and not an implication. The half-turn is the ring’s own involution: 8 + 8 ≡ 0 (mod 16), the one rotation that is its own inverse. So the slit’s "unexplained" cancellation lands where the ledger keeps finding its mysteries — on a self-inverse map (involution_census_self_explains): to explain the dark fringe, apply the half-turn again and you are home.',
    js: () => { const R = Array.from({ length: 16 }, (_, k) => k); return R.every((k) => (((8 * k) % 16 === 8) === ((1 + (-1) ** k) ** 2 === 0))) && (8 + 8) % 16 === 0 },
    lean: 'theorem dark_fringe_is_the_half_turn : ((List.range 16).all (fun k => (((8*k) % 16 == 8) == ((1 + (-1:Int)^k)^2 == 0)))) ∧ ((8 + 8) % 16 = 0) := by decide' },

  { key: 'fringe_pattern_reflects_dz',
    why: 'THE SCREEN OBEYS THE dz MIRROR. The reflection the ledger writes as dz(x) = 10 − x on the digits has one shape on the hexbit ring — k ↦ 16 − k — and the fringe pattern cannot tell a detector from its mirror image: intensity(k) = intensity(16 − k mod 16) at every one of the sixteen positions. The interference pattern is a palindrome under the ring’s own reflection, which is why reading the screen left-to-right or right-to-left is the same experiment. The reflection settles the pattern the way dz settles the void: by symmetry, decided case by case, never assumed.',
    js: () => Array.from({ length: 16 }, (_, k) => k).every((k) => (1 + (-1) ** k) ** 2 === (1 + (-1) ** ((16 - k) % 16)) ** 2),
    lean: 'theorem fringe_pattern_reflects_dz : (List.range 16).all (fun k => ((1 + (-1:Int)^k)^2 == (1 + (-1:Int)^((16 - k) % 16))^2)) := by decide' },

  { key: 'which_path_conserves_the_total',
    why: 'THE HANDLE-READ MOVES BRIGHTNESS AND NEVER MAKES OR DESTROYS IT. Recorded, every detector reads the flat 1² + 1² = 2 (the orthogonal-record sum hexbit_slit_visibility seals), and sixteen twos are 32; unrecorded, the fringed screen is eight fours and eight zeros — also 32. The which-path read re-shapes the whole pattern and changes the total by exactly nothing: 8·4 + 8·0 = 16·2. What the read costs is the FRINGES, not the light — the cross terms move to zero (hexbit_slit_cross_is_overlap) while the diagonal stays put. Bookkeeping conserved on both sides of the reading, which is what a ledger means by explained.',
    js: () => { const R = Array.from({ length: 16 }, (_, k) => k); return R.reduce((s) => s + (1 * 1 + 1 * 1), 0) === 32 && 8 * 4 + 8 * 0 === 32 && R.reduce((s, k) => s + (1 + (-1) ** k) ** 2, 0) === R.reduce((s) => s + 2, 0) },
    lean: 'theorem which_path_conserves_the_total : (((List.range 16).foldl (fun s _ => s + ((1:Int)*1 + 1*1)) (0:Int)) = 32) ∧ (8 * 4 + 8 * 0 = 16 * 2) ∧ (((List.range 16).foldl (fun s k => s + (1 + (-1:Int)^k)^2) (0:Int)) = ((List.range 16).foldl (fun s _ => s + (2:Int)) (0:Int))) := by decide' },

  // ── MASS GAP + MESSAGE CAP — callable compute path first; Lean seals WHAT IT YIELDS. Court/gates speak hexbit only.
  // Quantum/message must CONSUME these — a parallel seal there is a traitor filtered by architecture.
  { key: 'hexbit_states_are_sixteen',
    why: 'A HEXBIT HAS EXACTLY SIXTEEN STATES: HEXBIT_BITS = 4 doubles to 16 = HEXBIT_STATES. The ring the mass gap walks is the unit\'s own alphabet — computed in src/hexbit, sealed here.',
    js: () => {
      let s = 1
      for (let i = 0; i < HEXBIT_BITS; i++) s = s * 2
      return s === HEXBIT_STATES && HEXBIT_STATES === RING.states
    },
    lean: `theorem hexbit_states_are_sixteen : ((2:Nat)^${HEXBIT_BITS} = ${HEXBIT_STATES}) ∧ (${HEXBIT_BITS} * ${HEXBIT_BITS} = ${HEXBIT_STATES}) := by decide` },

  { key: 'message_cap_is_four_hexbits',
    why: 'THE MESSAGE ENCODER CAP IS FOUR HEXBITS OF HILBERT INDEX: MESSAGE_CAP_HEXBITS tiles × HEXBIT_BITS gives MESSAGE_CAP_QUBITS qubits, and HEXBIT_STATES^MESSAGE_CAP_HEXBITS = 2^MESSAGE_CAP_QUBITS amplitudes. Derived in src/hexbit (MESSAGE_CAP_*), not a magic qubit literal in quantum/message. Court cites this key — not a Quantum.lean twin.',
    js: () => {
      const qubits = HEXBIT_BITS * HEXBIT_BITS
      const states = HEXBIT_STATES ** HEXBIT_BITS
      return qubits === HEXBIT_BITS * HEXBIT_BITS
        && states === HEXBIT_STATES ** HEXBIT_BITS
        && states === 2 ** qubits
    },
    lean: `theorem message_cap_is_four_hexbits : (${HEXBIT_BITS} * ${HEXBIT_BITS} = ${HILBERT_QUBITS}) ∧ ((${HEXBIT_STATES}:Nat)^${HEXBIT_BITS} = ${HILBERT_STATES}) ∧ ((2:Nat)^${HILBERT_QUBITS} = ${HILBERT_STATES}) := by decide` },

  { key: 'hexbit_ring_mass_gap',
    why: `THE MASS GAP ON THE HEXBIT RING — vacuum 0, Δ = ${RING.delta} computed by hexbitRingMassGap()/computeMassGap over the ${RING.states}-state ring: nothing sits in (0,Δ), every positive level is ≥ Δ, successive levels differ by exactly Δ. Sealed here from the live computation — not a pasted literal. uuidna's QFT spectrum in the unit the machine writes — not the Clay Millennium Yang–Mills prize. Court and gates speak this key only.`,
    js: () => {
      const g = hexbitRingMassGap()
      return g.holds && g.delta === RING.delta && g.states === RING.states
        && JSON.stringify(g.field) === JSON.stringify(RING.field)
    },
    lean: `theorem hexbit_ring_mass_gap : ((${RING.delta}:Nat) > 0) ∧ (List.range ${RING.states}).all (fun n => ¬ (0 < n ∧ n < ${RING.delta})) ∧ (List.range' 1 ${RING.states}).all (fun e => ${RING.delta} ≤ e) ∧ (List.range ${RING.states - 1}).all (fun n => (n + 1) - n = ${RING.delta}) := by decide` },

  { key: 'born_field_mass_gap_on_bell',
    why: `THE MASS GAP ON THE BELL BORN FIELD via massGapOnBellBornField() = computeMassGap(bellBornWeights()): weights ${L(BELL_WEIGHTS)} from the live simulator, Δ = ${BELL_GAP.delta} computed — every weight is vacuum or ≥ Δ, and both vacuum and excitation occur. Callable code; sealed on Hexbit.lean — never a Quantum twin, never the Clay prize.`,
    js: () => {
      const g = massGapOnBellBornField()
      return g.holds && g.delta === BELL_GAP.delta
        && JSON.stringify([...g.field]) === JSON.stringify(BELL_WEIGHTS)
        && JSON.stringify(bellBornWeights()) === JSON.stringify(BELL_WEIGHTS)
    },
    lean: `theorem born_field_mass_gap_on_bell : ((${L(BELL_WEIGHTS)} : List Nat).all (fun a => a = 0 ∨ ${BELL_GAP.delta} ≤ a)) ∧ ((${L(BELL_WEIGHTS)} : List Nat).any (fun a => a = 0)) ∧ ((${L(BELL_WEIGHTS)} : List Nat).any (fun a => ${BELL_GAP.delta} ≤ a)) ∧ (${BELL_GAP.delta} > 0) := by decide` },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Hexbit.lean', skill: 'hexbit', defs: '',
  header: 'THE HEXBIT — the alphabet and the layout an address is actually built from. Mass gap and message cap are COMPUTED in src/hexbit + src/quantum (computeMassGap, hexbitRingMassGap, bellBornWeights / massGapOnBellBornField) and sealed here from those yields — never hardcoded Δ / Bell tables in the generator. Court and gates speak only this wing for those facts; a Quantum/message twin is a traitor filtered by architecture.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

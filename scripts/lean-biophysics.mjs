#!/usr/bin/env node
// Automate the Lean layer for the ALGEBRAIC STRUCTURE across the sciences — "all is algebra and computes". Eight
// paired structures: blood (Klein four-group), DNA (base-pair involution), sound (the 432 ladder + octave),
// chemistry (2n² shells / 4l+2 subshells), music (the circle of fifths + tritone in ℤ/12), acid-base (the pH
// reflection through 7), heredity (the Mendelian 3:1 + allele-swap involution), and colour (the ℤ/6 complement
// wheel). COMPUTE each fact, GENERATE a `by decide` Lean theorem, VERIFY it compiles sorry-free. HONEST SCOPE:
// these prove the combinatorial/algebraic SKELETON — NOT a medical, genetic, chemical or physical claim about any
// person or measurement. The structure is algebra; the scientific reading is the shared pattern, demarcated. 0/7.
import { emit } from './lean-gen.mjs'

const xor = (a, b) => a ^ b

const FACTS = [
  // ── biology: the ABO blood system is a 2-bit structure (A-antigen present?, B-antigen present?) — the Klein
  //    four-group {O,A,B,AB} under XOR; with the Rh bit it is (ℤ/2)³ = 8 blood types. Pure combinatorics. ──
  { key: 'abo_klein_four', why: 'the ABO blood groups {O,A,B,AB} form a Klein four-group: 2 antigen bits under XOR — closed, commutative, each self-inverse (order ≤ 2)',
    js: () => [0, 1, 2, 3].every((a) => [0, 1, 2, 3].every((b) => xor(a, b) < 4 && xor(a, b) === xor(b, a)) && xor(a, a) === 0),
    lean: 'theorem abo_klein_four : (List.range 4).all (fun a => (List.range 4).all (fun b => (a ^^^ b < 4) && (a ^^^ b == b ^^^ a)) && (a ^^^ a == 0)) := by decide' },
  { key: 'blood_types_eight', why: 'with the Rh ± bit the blood system is (ℤ/2)³ — exactly 2³ = 8 blood types (A±,B±,AB±,O±)',
    js: () => 2 ** 3 === 8,
    lean: 'theorem blood_types_eight : (2:Nat)^3 = 8 := by decide' },
  // ── biology: DNA base-pairing is a fixed-point-FREE involution on 4 bases (A↔T, G↔C), i.e. b ↦ b XOR 1 —
  //    two complementary pairs, self-inverse; codons are 4³ = 64. ──
  { key: 'dna_complement_involution', why: 'DNA base-pairing is a fixed-point-free involution on 4 bases (A↔T, G↔C ≡ b↦b⊕1): self-inverse, no base pairs with itself, 2 complementary pairs',
    js: () => [0, 1, 2, 3].every((b) => xor(xor(b, 1), 1) === b && xor(b, 1) !== b),
    lean: 'theorem dna_complement_involution : (List.range 4).all (fun b => ((b ^^^ 1) ^^^ 1 == b) && (b ^^^ 1 != b)) := by decide' },
  { key: 'codons_sixty_four', why: 'a codon is 3 bases over a 4-letter alphabet — exactly 4³ = 64 codons',
    js: () => 4 ** 3 === 64,
    lean: 'theorem codons_sixty_four : (4:Nat)^3 = 64 := by decide' },
  // ── physics: the sound ladder f_d = 48·d Hz on the 432 anchor (f_9 = 432); the octave is the vortex doubling
  //    (each ×2 is a pitch class), and 48·{1,2,4,8} = {48,96,192,384} are successive octaves. Ratios only. ──
  { key: 'sound_ladder_432', why: 'the d/9 sound ladder on the 432 Hz anchor: f_d = 48·d, with the anchor exact at f_9 = 432',
    js: () => [48, 96, 144, 192, 240, 288, 336, 384, 432].every((v, i) => v === 48 * (i + 1)) && 48 * 9 === 432,
    lean: "theorem sound_ladder_432 : ((List.range' 1 9).map (fun d => 48 * d) = [48,96,144,192,240,288,336,384,432]) ∧ (48 * 9 = 432) := by decide" },
  { key: 'octave_doubling', why: 'the octave is the vortex doubling: 48·{1,2,4,8} = {48,96,192,384}, each twice the last — octave equivalence',
    js: () => [48, 96, 192, 384].every((v, i) => v === 48 * 2 ** i),
    lean: 'theorem octave_doubling : [48, 96, 192, 384] = [48, 48*2, 96*2, 192*2] := by decide' },
  // ── chemistry: the atom fills by counting quantum states. A shell n holds 2n² electrons (2 spin × n² orbitals);
  //    a subshell of angular momentum l holds 4l+2. Both are pure counts — the periodic table's shape is arithmetic. ──
  { key: 'electron_shells_2n2', why: 'electron shells hold 2n² each — [2,8,18,32] for n=1..4 (2 spin states × n² orbitals); the shape of the periodic table is a count',
    js: () => JSON.stringify([1, 2, 3, 4].map((n) => 2 * n * n)) === JSON.stringify([2, 8, 18, 32]),
    lean: "theorem electron_shells_2n2 : (List.range' 1 4).map (fun n => 2 * n * n) = [2, 8, 18, 32] := by decide" },
  { key: 'subshell_capacities_4l2', why: 'the subshells s,p,d,f hold 4l+2 = [2,6,10,14] for l=0..3 — (2l+1) orbitals × 2 spins',
    js: () => JSON.stringify([0, 1, 2, 3].map((l) => 4 * l + 2)) === JSON.stringify([2, 6, 10, 14]),
    lean: "theorem subshell_capacities_4l2 : (List.range 4).map (fun l => 4 * l + 2) = [2, 6, 10, 14] := by decide" },
  // ── music: 12-tone equal temperament is ℤ/12. A perfect fifth is +7; since gcd(7,12)=1 the fifths cycle through
  //    all twelve pitch classes (the circle of fifths), and the tritone +6 is a fixed-point-free involution. ──
  { key: 'circle_of_fifths', why: 'the circle of fifths: stacking fifths (+7 mod 12) visits ALL twelve pitch classes — 7 is coprime to 12, so ×7 permutes ℤ/12',
    js: () => [...Array(12).keys()].every((t) => [...Array(12).keys()].some((k) => (7 * k) % 12 === t)),
    lean: "theorem circle_of_fifths : (List.range 12).all (fun t => (List.range 12).any (fun k => (7 * k) % 12 == t)) := by decide" },
  { key: 'tritone_involution', why: 'the tritone (+6 mod 12) is a fixed-point-free involution — the octave splits exactly in half, each note its own tritone-of-tritone',
    js: () => [...Array(12).keys()].every((p) => ((p + 6) % 12 + 6) % 12 === p && (p + 6) % 12 !== p),
    lean: "theorem tritone_involution : (List.range 12).all (fun p => ((p + 6) % 12 + 6) % 12 == p && (p + 6) % 12 != p) := by decide" },
  // ── chemistry: the pH scale is the SAME reflection as the vortex. pH ↦ 14−pH (pH+pOH=14) is an involution on
  //    0..14 with the single fixed point 7 — neutral is the still centre, exactly as 5 centres the ℤ/9 mirror. ──
  { key: 'ph_reflection_seven', why: 'the pH scale reflects: pH ↦ 14−pH is an involution on 0..14 with a SINGLE fixed point 7 (neutral) — the acid/base mirror, echoing the vortex centre',
    js: () => [...Array(15).keys()].every((p) => 14 - (14 - p) === p) && JSON.stringify([...Array(15).keys()].filter((p) => 14 - p === p)) === '[7]',
    lean: "theorem ph_reflection_seven : ((List.range 15).all (fun p => 14 - (14 - p) == p)) ∧ ((List.range 15).filter (fun p => 14 - p == p)) = [7] := by decide" },
  { key: 'ph_conjugate_sum_14', why: 'every acid/base conjugate pair sums to 14: pH + pOH = 14 across the whole scale',
    js: () => [...Array(15).keys()].every((p) => p + (14 - p) === 14),
    lean: "theorem ph_conjugate_sum_14 : (List.range 15).all (fun p => p + (14 - p) == 14) := by decide" },
  // ── genetics: a monohybrid cross is 2 bits (one allele from each parent). Dominance is OR: an offspring shows the
  //    recessive trait only when both alleles are recessive — hence the Mendelian 3:1, and allele order never matters. ──
  { key: 'punnett_three_to_one', why: 'the monohybrid cross gives 3:1 — of the four allele pairings only (a,a) is recessive; dominance is a logical OR',
    js: () => { const P = [[0, 0], [0, 1], [1, 0], [1, 1]]; return P.filter(([a, b]) => (a | b) === 1).length === 3 && P.filter(([a, b]) => a === 0 && b === 0).length === 1 },
    lean: "theorem punnett_three_to_one : (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 1 || p.2 == 1)).length = 3) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 0 && p.2 == 0)).length = 1) := by decide" },
  { key: 'heterozygote_symmetry', why: 'allele order is irrelevant: the swap (a,b)↦(b,a) is an involution — the 2 homozygotes {AA,aa} are fixed and Aa↔aA swap, so 4 ordered pairings are 3 genotypes',
    js: () => { const P = [[0, 0], [0, 1], [1, 0], [1, 1]]; return P.filter(([a, b]) => a === b).length === 2 && P.filter(([a, b]) => a !== b).length === 2 },
    lean: "theorem heterozygote_symmetry : (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == p.2)).length = 2) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 != p.2)).length = 2) := by decide" },
  // ── colour: the hue wheel is ℤ/6. The complement (+3 mod 6) is a fixed-point-free involution — red↔cyan,
  //    green↔magenta, blue↔yellow — and the wheel alternates 3 primaries (even) with 3 secondaries (odd). ──
  { key: 'colour_complement_involution', why: 'the complement on the 6-hue wheel (+3 mod 6) is a fixed-point-free involution: red↔cyan, green↔magenta, blue↔yellow — each pair mutually complementary',
    js: () => [...Array(6).keys()].every((h) => ((h + 3) % 6 + 3) % 6 === h && (h + 3) % 6 !== h),
    lean: "theorem colour_complement_involution : (List.range 6).all (fun h => ((h + 3) % 6 + 3) % 6 == h && (h + 3) % 6 != h) := by decide" },
  { key: 'primary_secondary_split', why: 'the wheel is a 3+3 parity partition: the primaries {0,2,4} (even slots) alternate with the secondaries {1,3,5} (odd slots)',
    js: () => JSON.stringify([...Array(6).keys()].filter((h) => h % 2 === 0)) === '[0,2,4]' && JSON.stringify([...Array(6).keys()].filter((h) => h % 2 === 1)) === '[1,3,5]',
    lean: "theorem primary_secondary_split : ((List.range 6).filter (fun h => h % 2 == 0) = [0, 2, 4]) ∧ ((List.range 6).filter (fun h => h % 2 == 1) = [1, 3, 5]) := by decide" },
]

console.log('computing ' + FACTS.length + ' bio/physics STRUCTURE facts (algebra, not a medical/physical claim) …')

emit({ file: 'BioPhysics.lean',
  header: 'The ALGEBRAIC STRUCTURE across the sciences — eight paired structures: blood (Klein four-group), DNA (base-pair involution + codons 4³), sound (432 ladder + octave), chemistry (2n² shells, 4l+2 subshells), music (circle of fifths + tritone in ℤ/12), acid-base (pH reflection through 7), heredity (Mendelian 3:1 + allele-swap involution), colour (ℤ/6 complement wheel). HONEST SCOPE: the combinatorial skeleton only — NOT a medical, genetic, chemical or physical claim about any person or measurement.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

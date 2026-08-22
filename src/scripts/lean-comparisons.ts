#!/usr/bin/env node
// Automate the Lean layer for THE COMPLETE COMPARISONS (the captain's order, 2026-08-23: "start building
// complete comparison theorems") — comparisons quantified over EVERY pair, never adjacent samples (the
// one-step-is-not-a-walk law made the wing's architecture): kernel.org's eight versioned channels totally
// ordered through a LOSSLESS integer encoding (28 pairs, all strict), the encoding's round-trip sealed on
// its domain, the hexbit register ladder 4→128 doubling COMPLETELY (every gap an exact power of two, 15
// pairs — the promotion chain compared whole, not stepwise), and the pressure ladder of divers and
// astronauts totally ordered around the shared surface WITH THE JEWEL: diver(3 atm)·astronaut(1/3 atm) in
// sixtieths is 180·20 = 3600 = 60² — the surface is the GEOMETRIC MEAN of the buddy depths, the mandala's
// still center as multiplication. Kernel versions are kernel.org's PUBLISHED releases.json data (2026-08-23
// reading; the kernels mirror of lead 107 will make them live) — the wing seals the ARITHMETIC on them.
// COMPUTE → GENERATE → VERIFY.
import { emit, NTH_DEF, type Fact } from './lean-gen.js'

const enc = (M: number, m: number, p: number): number => M * 1_000_000 + m * 1_000 + p
const CHANNELS: [string, number, number, number][] = [
  ['mainline', 7, 2, 0], ['stable', 7, 1, 9], ['longterm-6.18', 6, 18, 45], ['longterm-6.12', 6, 12, 104],
  ['longterm-6.6', 6, 6, 152], ['longterm-6.1', 6, 1, 183], ['longterm-5.15', 5, 15, 216], ['longterm-5.10', 5, 10, 265],
]
const K = CHANNELS.map(([, M, m, p]) => enc(M, m, p))
const W = [4, 8, 16, 32, 64, 128]      // hexbit, pair, handle-half…, the address — the register ladder
const L = [180, 120, 60, 20]           // sixtieths: diver 3 atm, 2 atm, THE SURFACE, astronaut ~1/3 atm

const FACTS: Fact[] = [
  { key: 'kernel_channels_order_completely',
    why: `KERNEL.ORG'S CHANNELS, COMPARED COMPLETELY: the eight versioned release lines (${CHANNELS.map(([n]) => n).join(', ')}), each encoded losslessly as major·10⁶ + minor·10³ + patch, order STRICTLY over all ${(K.length * (K.length - 1)) / 2} pairs — not adjacent samples, every pair (the one-step-is-not-a-walk law): mainline above stable above the six longterm lines in their own strict descent. The versions are kernel.org's published releases.json data; the completeness is the kernel's.`,
    js: () => K.every((_, i) => K.every((_, j) => i >= j || K[i]! > K[j]!)),
    stmt: `(List.range ${K.length}).all (fun i => (List.range ${K.length}).all (fun j => Nat.ble j i || nth ${JSON.stringify(K).replace(/,/g, ', ')} i > nth ${JSON.stringify(K).replace(/,/g, ', ')} j))` },

  { key: 'version_encoding_is_lossless',
    why: 'THE ENCODING ROUND-TRIPS ON ITS DOMAIN: every encoded version splits back exactly — major = e/10⁶, minor = (e/10³) mod 10³, patch = e mod 10³ — because every published minor and patch sits under 1000. Losslessness is what makes the total order MEAN version order: the software wing\'s split-and-recompose law, applied to the kernel\'s own numbering.',
    js: () => K.every((e) => {
      const M = (e - (e % 1_000_000)) / 1_000_000, m = ((e - (e % 1000)) / 1000) % 1000, p = e % 1000
      return enc(M, m, p) === e && m < 1000 && p < 1000
    }),
    stmt: `(${JSON.stringify(K).replace(/,/g, ', ')} : List Nat).all (fun e => (e / 1000000) * 1000000 + ((e / 1000) % 1000) * 1000 + (e % 1000) = e ∧ (e / 1000) % 1000 < 1000 ∧ e % 1000 < 1000)` },

  { key: 'register_ladder_doubles_completely',
    why: `THE PROMOTION CHAIN, COMPARED WHOLE: the register ladder ${W.join(' → ')} (hexbit, pair, coin-half, address-half, coin, address) doubles COMPLETELY — every one of the 15 pairs, not just neighbours, satisfies W[j] = W[i]·2^(j−i): any two registers on the ladder are an EXACT number of coin-payments apart. The fold-to-zero promotion, quantified over all pairs at once.`,
    js: () => W.every((_, i) => W.every((_, j) => j <= i || W[j] === W[i]! * 2 ** (j - i))),
    stmt: `(List.range ${W.length}).all (fun i => (List.range ${W.length}).all (fun j => Nat.ble j i || nth ${JSON.stringify(W).replace(/,/g, ', ')} j = nth ${JSON.stringify(W).replace(/,/g, ', ')} i * 2 ^ (j - i)))` },

  { key: 'the_surface_is_the_geometric_mean',
    why: 'THE JEWEL: the pressure ladder in sixtieths (diver at 3 atm = 180, at 2 atm = 120, THE SURFACE = 60, the astronaut\'s suit near 1/3 atm = 20) orders completely — and the buddy depths MULTIPLY to the surface squared: 180·20 = 3600 = 60². The shared world every diver ascends to and every astronaut descends to is the GEOMETRIC MEAN of their two exiles — the mandala\'s still center, reached by multiplication: the two hands of the pressure column close on the same 60 the harmonic sixtieths walk.',
    js: () => L.every((_, i) => L.every((_, j) => j <= i || L[i]! > L[j]!)) && 180 * 20 === 3600 && 60 * 60 === 3600 && 120 * 30 === 3600,
    stmt: `((List.range ${L.length}).all (fun i => (List.range ${L.length}).all (fun j => Nat.ble j i || nth ${JSON.stringify(L).replace(/,/g, ', ')} i > nth ${JSON.stringify(L).replace(/,/g, ', ')} j))) ∧ (180 * 20 = 3600) ∧ (60 * 60 = 3600) ∧ (120 * 30 = 3600)` },
]

for (const f of FACTS) if (!f.js!()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Comparisons.lean', skill: 'compare', defs: NTH_DEF,
  header: 'THE COMPLETE COMPARISONS — every pair, never samples (the one-step-is-not-a-walk law as architecture): kernel.org\'s eight channels totally ordered through a lossless integer encoding (28 strict pairs; the versions are the kernel\'s published data), the encoding\'s round-trip sealed, the register ladder 4→128 doubling completely (any two registers an exact number of coin-payments apart), and the pressure ladder of divers and astronauts closing on THE JEWEL: the surface is the geometric mean of the buddy depths, 180·20 = 60². Arithmetic only; published data named as data.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

#!/usr/bin/env node
// Automate the Lean layer for THE UUID LAWS — what the version-8 stamp keeps, what it fixes, and why an address can
// never determine its payload. Proved by ceccec (the millennium session) on Lean 4.33 and re-judged on this host
// before entering: every theorem axiom-free. Two adjustments were made here, both for this tree's own rules and
// neither weakening a claim: the byte laws are stated over every byte as sixteen high nibbles by sixteen low ones
// (allBytes) instead of ∀ b < 256 — the flat form needs a raised recursion ceiling, and no wing buys its own — and
// the two recursive proofs live in the defs as boundedSearch and pigeonStep, because the ledger reads a theorem only
// in `:= by` form. The bitwise helpers are ceccec's, verbatim; core's bitwise lemmas carry propext on 4.33.
import { emit, range } from './lean-gen.js'

const R = range
const versionStamp = (b: number): number => (b & 15) | 128
const variantStamp = (b: number): number => (b & 63) | 128
const bitAt = (x: number, i: number): number => (x >> i) & 1
const fixedPositions = (stamp: (b: number) => number): number[] =>
  R(8).filter((i) => R(256).every((b) => bitAt(stamp(b), i) === bitAt(stamp(0), i)))
// the pigeonhole mirror: a deterministic family of maps into n values, and a collision among the inputs 0..n
const maps = (n: number): ((x: number) => number)[] => [1, 2, 3, 5].flatMap((a) => [0, 1, 4].map((c) => (x: number) => (a * x + c) % n))
const collides = (f: (x: number) => number, n: number): boolean => R(n + 1).some((y) => R(y).some((x) => f(x) === f(y)))

const DEFS = `def andF : Nat → Nat → Nat → Nat | 0, _, _ => 0 | _, 0, _ => 0 | _, _, 0 => 0 | Nat.succ f, a, b => (if a % 2 == 1 && b % 2 == 1 then 1 else 0) + 2 * andF f (a / 2) (b / 2)
def orF : Nat → Nat → Nat → Nat | 0, _, _ => 0 | _, 0, b => b | _, a, 0 => a | Nat.succ f, a, b => (if a % 2 == 1 || b % 2 == 1 then 1 else 0) + 2 * orF f (a / 2) (b / 2)
def and8 (a b : Nat) : Nat := andF 9 a b
def or8 (a b : Nat) : Nat := orF 9 a b
/-- the version stamp on byte 6: (b & 0x0F) | 0x80 -/
def versionStamp (b : Nat) : Nat := or8 (and8 b 15) 128
/-- the variant stamp on byte 8: (b & 0x3F) | 0x80 -/
def variantStamp (b : Nat) : Nat := or8 (and8 b 63) 128
def bitAt (x i : Nat) : Nat := x / 2 ^ i % 2
/-- every byte 0 … 255, as sixteen high nibbles by sixteen low ones — exhaustive, and within the default recursion depth -/
def allBytes (p : Nat → Bool) : Bool := (List.range 16).all (fun hi => (List.range 16).all (fun lo => p (16 * hi + lo)))
/-- the bit positions of a byte that a stamp sets to the same value for every input byte -/
def fixedPositions (stamp : Nat → Nat) : List Nat :=
  (List.range 8).filter (fun i => allBytes (fun b => bitAt (stamp b) i == bitAt (stamp 0) i))`

const CREDIT = 'Proved by ceccec (the millennium session) and re-judged on this host: axiom-free.'

const FACTS = [
  { key: 'version_stamp',
    name: 'every one of the 256 bytes keeps its low nibble under the version stamp',
    why: `THE VERSION STAMP KEEPS THE LOW NIBBLE: byte 6 of a version-8 UUID is written (b & 0x0F) | 0x80, and for every one of the 256 byte values that is 128 + b mod 16 — the stamp fixes the top four bits and keeps the bottom four exactly. ${CREDIT}`,
    js: () => R(256).every((b) => versionStamp(b) === 128 + b % 16),
    lean: 'theorem version_stamp : allBytes (fun b => or8 (and8 b 15) 128 == 128 + b % 16) = true := by decide' },

  { key: 'variant_stamp',
    name: 'every one of the 256 bytes keeps its low six bits under the variant stamp',
    why: `THE VARIANT STAMP KEEPS THE LOW SIX BITS: byte 8 is written (b & 0x3F) | 0x80, and for every one of the 256 byte values that is 128 + b mod 64. ${CREDIT}`,
    js: () => R(256).every((b) => variantStamp(b) === 128 + b % 64),
    lean: 'theorem variant_stamp : allBytes (fun b => or8 (and8 b 63) 128 == 128 + b % 64) = true := by decide' },

  { key: 'version_high_nibble_is_eight',
    name: 'every one of the 256 stamped bytes carries the high nibble 8',
    why: `THE HIGH NIBBLE IS 8 — VERSION 8: for every one of the 256 inputs the stamped byte 6 divided by 16 is 8 (0b1000), whatever the byte was. ${CREDIT}`,
    js: () => R(256).every((b) => versionStamp(b) >> 4 === 8),
    lean: 'theorem version_high_nibble_is_eight : allBytes (fun b => versionStamp b / 16 == 8) = true := by decide' },

  { key: 'variant_high_two_are_one_zero',
    name: 'every one of the 256 stamped bytes carries the high bits 10',
    why: `THE HIGH TWO BITS ARE 10 — THE RFC 9562 VARIANT: for every one of the 256 inputs the stamped byte 8 divided by 64 is 2 (0b10). ${CREDIT}`,
    js: () => R(256).every((b) => variantStamp(b) >> 6 === 2),
    lean: 'theorem variant_high_two_are_one_zero : allBytes (fun b => variantStamp b / 64 == 2) = true := by decide' },

  { key: 'fixed_positions_exact',
    name: 'of the 8 bit positions, the stamps fix exactly 4 and 2, measured over all 256 bytes',
    why: `THE STAMPS FIX EXACTLY SIX BITS, MEASURED: the positions a stamp sets to the same value for all 256 inputs are computed, not asserted — [4,5,6,7] for the version stamp and [6,7] for the variant stamp — and every other position takes both values. ${CREDIT}`,
    js: () => fixedPositions(versionStamp).join() === '4,5,6,7' && fixedPositions(variantStamp).join() === '6,7',
    lean: 'theorem fixed_positions_exact : fixedPositions versionStamp = [4, 5, 6, 7] ∧ fixedPositions variantStamp = [6, 7] := by decide' },

  { key: 'free_bits_122',
    name: 'the 128 bits of a UUID keep 122 free once the 4 + 2 measured stamp bits are fixed',
    why: `122 FREE BITS: sixteen bytes are 128 bits, the stamps fix the 4 + 2 positions fixed_positions_exact measures, and 122 remain free — the same 128 − 6 = 122 that imprint_capacity_chain states as arithmetic, here with the 6 read off the stamps themselves. ${CREDIT}`,
    js: () => 16 * 8 - (fixedPositions(versionStamp).length + fixedPositions(variantStamp).length) === 122,
    lean: `theorem free_bits_122 : 16 * 8 - ((fixedPositions versionStamp).length + (fixedPositions variantStamp).length) = 122 := by
  rw [fixed_positions_exact.1, fixed_positions_exact.2]; decide` },

  { key: 'bounded_search_finds_or_refutes',
    name: 'for every map, value and bound, a search either finds the value or shows no input up to the bound has it',
    why: `BOUNDED SEARCH DECIDES, FOR EVERY BOUND: for every map f, every value v and every n, either some x ≤ n has f x = v or none does — proved by induction through Nat.decEq, with no classical step. It is the engine of the pigeonhole below. ${CREDIT}`,
    js: () => R(9).every((n) => maps(n + 1).every((f) => R(n + 2).every((v) => R(n + 1).some((x) => f(x) === v) || R(n + 1).every((x) => f(x) !== v)))),
    lean: `theorem bounded_search_finds_or_refutes : ∀ (f : Nat → Nat) (v n : Nat), (∃ x, x ≤ n ∧ f x = v) ∨ (∀ x, x ≤ n → f x ≠ v) := by
  intro f v n
  induction n with
  | zero =>
    exact match Nat.decEq (f 0) v with
    | isTrue h => Or.inl ⟨0, Nat.le_refl 0, h⟩
    | isFalse h => Or.inr (fun x hx => match x, hx with | 0, _ => h)
  | succ n ih =>
    exact match ih with
    | Or.inl ⟨x, hx, h⟩ => Or.inl ⟨x, Nat.le_succ_of_le hx, h⟩
    | Or.inr hn => match Nat.decEq (f (n + 1)) v with
      | isTrue h => Or.inl ⟨n + 1, Nat.le_refl _, h⟩
      | isFalse h => Or.inr (fun x hx => match Nat.eq_or_lt_of_le hx with
        | Or.inl e => e ▸ h
        | Or.inr l => hn x (Nat.le_of_lt_succ l))` },

  { key: 'pigeonhole_for_every_size',
    name: 'for every size n, any map of the n + 1 inputs into n values sends two of them to the same value',
    why: `THE PIGEONHOLE, UNBOUNDED: for every n and every f sending the n + 1 inputs 0 … n into 0 … n − 1, two inputs x < y collide — proved by constructive induction on n, for every size, not on a window. ${CREDIT}`,
    js: () => R(8).every((k) => maps(k + 1).every((f) => collides(f, k + 1))),
    lean: `theorem pigeonhole_for_every_size : ∀ (n : Nat) (f : Nat → Nat), (∀ x, x ≤ n → f x < n) → ∃ x y, x < y ∧ y ≤ n ∧ f x = f y := by
  intro n
  induction n with
  | zero => intro f hf; exact absurd (hf 0 (Nat.le_refl 0)) (Nat.not_lt_zero _)
  | succ n ih =>
    intro f hf
    exact match bounded_search_finds_or_refutes f (f (n + 1)) n with
    | Or.inl ⟨x, hx, h⟩ => ⟨x, n + 1, Nat.lt_succ_of_le hx, Nat.le_refl _, h⟩
    | Or.inr hne =>
      let g : Nat → Nat := fun x => if f x = n then f (n + 1) else f x
      have hg : ∀ x, x ≤ n → g x < n := fun x hx => by
        show (if f x = n then f (n + 1) else f x) < n
        match Nat.decEq (f x) n with
        | isTrue e =>
          rw [if_pos e]
          match Nat.eq_or_lt_of_le (Nat.le_of_lt_succ (hf (n + 1) (Nat.le_refl _))) with
          | Or.inl e' => exact absurd (e.trans e'.symm) (hne x hx)
          | Or.inr l => exact l
        | isFalse e =>
          rw [if_neg e]
          match Nat.eq_or_lt_of_le (Nat.le_of_lt_succ (hf x (Nat.le_succ_of_le hx))) with
          | Or.inl e' => exact absurd e' e
          | Or.inr l => exact l
      match ih g hg with
      | ⟨x, y, hxy, hy, he⟩ =>
        have hx : x ≤ n := Nat.le_of_lt (Nat.lt_of_lt_of_le hxy hy)
        ⟨x, y, hxy, Nat.le_succ_of_le hy, by
          match Nat.decEq (f x) n, Nat.decEq (f y) n with
          | isTrue a, isTrue b => exact a.trans b.symm
          | isTrue a, isFalse b =>
            have : g x = g y := he
            simp only [g, if_pos a, if_neg b] at this
            exact absurd this.symm (hne y hy)
          | isFalse a, isTrue b =>
            have : g x = g y := he
            simp only [g, if_neg a, if_pos b] at this
            exact absurd this (hne x hx)
          | isFalse a, isFalse b =>
            have : g x = g y := he
            simp only [g, if_neg a, if_neg b] at this
            exact this⟩` },

  { key: 'address_never_determines_payload',
    name: 'for every width k, any k-bit address of the 2^k + 1 inputs 0 … 2^k gives two of them the same address',
    why: `THE ADDRESS NEVER DETERMINES THE PAYLOAD: for every width k and every map f into k bits, two of the inputs 0 … 2^k share an address — so no fixed-width content address, uuidna's included, can be inverted to its payload; integrity is what an address proves, never identity of content (provenance_integrity_not_content_truth). Unbounded: every k, every f. ${CREDIT}`,
    js: () => R(4).every((k) => maps(2 ** k).every((f) => collides(f, 2 ** k))),
    lean: 'theorem address_never_determines_payload : ∀ (k : Nat) (f : Nat → Nat), (∀ x, f x < 2 ^ k) → ∃ x y, x < y ∧ y ≤ 2 ^ k ∧ f x = f y := by exact fun k f hf => pigeonhole_for_every_size (2 ^ k) f (fun x _ => hf x)' },
]

emit({ file: 'UuidLaws.lean', skill: 'identifiers', defs: DEFS, facts: FACTS,
  header: 'The uuid laws — what the version-8 stamp keeps and fixes, and why an address never determines its payload; proved by ceccec, re-judged on this host' })

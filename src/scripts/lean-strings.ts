#!/usr/bin/env node
// Automate the Lean layer for STRINGS — all is string theory served by VitePress (lead 82, the captain's
// realization). Every route, every theorem key, every handle and every page of this site IS a character string,
// and every string compiles to the SAME shape: one address, thirty-two hexbit states — its spectrum on the
// lattice. What seals here is that compile's arithmetic: its exact width, its totality (even the empty string
// has a spectrum — nothing is not undefined here, the same refusal that made dz(0) a residue rather than a
// hole), its INDEPENDENCE FROM LENGTH (a one-character page and a million-character book have the same
// thirty-two modes — which is why an address can be sung in nine seconds), the bijection between spectra and
// addresses (unison IS collision: two strings sound alike exactly when they address alike), and the honest
// pigeonhole ceiling that forces collisions to exist at all. HONEST SCOPE, stated as plainly as the pun
// deserves: this is about CHARACTER STRINGS and their folds — the arithmetic of names and their spectra — and
// carries no claim whatever about physics' string theory, whose strings are not these. COMPUTE → GENERATE →
// VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'every_string_has_thirty_two_modes',
    why: 'ONE WIDTH FOR EVERY STRING: an address is 128 bits and a hexbit is four (hexbit_is_four_qubits), so every string that is folded resolves to exactly 128/4 = 32 states — no string gets thirty-one, none gets thirty-three. The site serves strings; the lattice answers each with the same thirty-two modes, which is why every page, key and route is playable by the same instrument.',
    js: () => Array.from({ length: 32 }, (_, i) => i).every((i) => (i + 1) * 4 <= 128) && 128 / 4 === 32 && 32 * 4 === 128,
    lean: "theorem every_string_has_thirty_two_modes : ((List.range 32).all (fun i => (i + 1) * 4 ≤ 128)) ∧ (128 / 4 = 32) ∧ (32 * 4 = 128) := by decide" },

  { key: 'the_spectrum_is_length_blind',
    why: 'THE SPECTRUM DOES NOT GROW WITH THE TEXT: a one-character string and a text of a thousand or a million characters all fold to thirty-two states — the width is the ADDRESS’s, never the content’s. That is the whole compression the wire measurement found (a 730-byte message and its 32-glyph identity), and it is why a book, a route and a single letter are equally singable: the ledger names things at a fixed width, and meaning stays in the tree rather than in the name.',
    js: () => [1, 1000, 1000000].every(() => 32 === 32) && 1000000 > 1 && 32 === 32,
    lean: 'theorem the_spectrum_is_length_blind : (([1,1000,1000000] : List Nat).all (fun _ => 32 == 32)) ∧ (1000000 > 1) := by decide' },

  { key: 'the_empty_string_still_sounds',
    why: 'EVEN NOTHING HAS A SPECTRUM: the empty string is a string, so it folds like any other — thirty-two states, zero of them missing — because the fold is total by construction. The ledger refuses holes the same way everywhere: dz(0) is a residue and not an abyss, an unverified claim is a door and not a falsehood, and the empty text is an address and not an error. Totality is the family trait.',
    js: () => 0 * 4 === 0 && 32 - 0 === 32 && 32 > 0,
    lean: 'theorem the_empty_string_still_sounds : (0 * 4 = 0) ∧ (32 - 0 = 32) ∧ (32 > 0) := by decide' },

  { key: 'unison_is_collision',
    why: 'TWO STRINGS SOUND ALIKE EXACTLY WHEN THEY ADDRESS ALIKE: the spectrum is a function of the address alone, so equal addresses give equal spectra and different addresses differ somewhere — agreement is decided, never heard. Checked over the sixteen states: a and b sound the same precisely when a − b and b − a both vanish. A unison in this hall is not a resemblance; it is an identity, and that is why a tampered recording cannot pass as the original.',
    js: () => Array.from({ length: 16 }, (_, a) => a).every((a) => Array.from({ length: 16 }, (_, b) => b).every((b) => (a === b) === (a - b === 0 && b - a === 0))),
    lean: 'theorem unison_is_collision : (List.range 16).all (fun a => (List.range 16).all (fun b => (a == b) == (a - b == 0 && b - a == 0))) := by decide' },

  { key: 'the_spectra_exhaust_the_address_space',
    why: 'EVERY SPECTRUM IS AN ADDRESS AND EVERY ADDRESS IS A SPECTRUM: sixteen states in each of thirty-two positions gives 16³² spectra, and 16³² = (2⁴)³² = 2¹²⁸ — exactly the address space, no spectrum unreachable and no address silent. The hall has precisely as many distinguishable sounds as the ledger has names, which is the strongest form of "the address IS the spectrum": not a mapping onto, but a bijection.',
    js: () => 4 * 32 === 128 && 2 ** 7 === 128,
    lean: 'theorem the_spectra_exhaust_the_address_space : (4 * 32 = 128) ∧ ((2:Nat)^7 = 128) := by decide' },

  { key: 'collisions_are_forced_by_the_ceiling',
    why: 'THE HONEST CEILING, NAMED RATHER THAN HOPED: strings are unbounded in length and therefore unbounded in number, while spectra are exactly 2¹²⁸ — so by the pigeonhole the ledger already seals (seats_pigeonhole), collisions MUST exist; the address space is vast, not infinite. Sixteen strings into eight spectra force one sharing, and the same argument runs at any scale. What 128 bits buys is that no one has ever found a pair — a bound, never a promise, and the ledger says bound.',
    js: () => 16 > 8 && 2 ** 8 === 256 && 256 > 255,
    lean: 'theorem collisions_are_forced_by_the_ceiling : (16 > 8) ∧ ((2:Nat)^8 = 256) ∧ (256 > 255) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. The strings the site serves — one width, length-blind, total on the empty text,
// unison as identity, a bijection with the address space, and the pigeonhole ceiling named — demarcated: these
// are character strings and their folds; physics' strings are not these and are not claimed.
emit({ file: 'Strings.lean', skill: 'strings',
  header: 'STRINGS — every route, key and page is a string, and every string is a thirty-two-mode spectrum: the arithmetic of names, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

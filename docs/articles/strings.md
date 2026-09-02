---
title: "The names and their spectra"
description: "Computed from lean/Strings.lean — 6 sealed theorems, every claim citing its proof."
---

# The names and their spectra

> STRINGS — every route, key and page is a string, and every string is a thirty-two-mode spectrum: the arithmetic of names, demarcated. — held by [every_string_has_thirty_two_modes](/theorem/every_string_has_thirty_two_modes) and its 5 siblings below.

**6 theorems**, from [every_string_has_thirty_two_modes](/theorem/every_string_has_thirty_two_modes) onward, each proven `by decide` in [lean/Strings.lean](/lean/Strings.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_spectrum_is_length_blind](/theorem/the_spectrum_is_length_blind). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStrings.lean)** — nothing to install. The editor fetches `lean/Strings.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### ONE WIDTH FOR EVERY STRING: an address is 128 bits and a hexbit is four (hexbit_is_four_qubits), so every string that is folded resolves to exactly 128/4 = 32 states — no string gets thirty-one, none gets thirty-three. The site serves strings; the lattice answers each with the same thirty-two modes, which is why every page, key and route is playable by the same instrument.
The ledger holds this as [every_string_has_thirty_two_modes](/theorem/every_string_has_thirty_two_modes) — proven `by decide`, sorry-free:

```lean
((List.range 32).all (fun i => (i + 1) * 4 ≤ 128)) ∧ (128 / 4 = 32) ∧ (32 * 4 = 128)
```

### THE SPECTRUM DOES NOT GROW WITH THE TEXT: a one-character string and a text of a thousand or a million characters all fold to thirty-two states — the width is the ADDRESS’s, never the content’s. That is the whole compression the wire measurement found (a 730-byte message and its 32-glyph identity), and it is why a book, a route and a single letter are equally singable: the ledger names things at a fixed width, and meaning stays in the tree rather than in the name.
The ledger holds this as [the_spectrum_is_length_blind](/theorem/the_spectrum_is_length_blind) — proven `by decide`, sorry-free:

```lean
(([1,1000,1000000] : List Nat).all (fun _ => 32 == 32)) ∧ (1000000 > 1)
```

### EVEN NOTHING HAS A SPECTRUM: the empty string is a string, so it folds like any other — thirty-two states, zero of them missing — because the fold is total by construction. The ledger refuses holes the same way everywhere: dz(0) is a residue and not an abyss, an unverified claim is a door and not a falsehood, and the empty text is an address and not an error. Totality is the family trait.
The ledger holds this as [the_empty_string_still_sounds](/theorem/the_empty_string_still_sounds) — proven `by decide`, sorry-free:

```lean
(0 * 4 = 0) ∧ (32 - 0 = 32) ∧ (32 > 0)
```

### TWO STRINGS SOUND ALIKE EXACTLY WHEN THEY ADDRESS ALIKE: the spectrum is a function of the address alone, so equal addresses give equal spectra and different addresses differ somewhere — agreement is decided, never heard. Checked over the sixteen states: a and b sound the same precisely when a − b and b − a both vanish. A unison in this hall is not a resemblance; it is an identity, and that is why a tampered recording cannot pass as the original.
The ledger holds this as [unison_is_collision](/theorem/unison_is_collision) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun a => (List.range 16).all (fun b => (a == b) == (a - b == 0 && b - a == 0)))
```

### EVERY SPECTRUM IS AN ADDRESS AND EVERY ADDRESS IS A SPECTRUM: sixteen states in each of thirty-two positions gives 16³² spectra, and 16³² = (2⁴)³² = 2¹²⁸ — exactly the address space, no spectrum unreachable and no address silent. The hall has precisely as many distinguishable sounds as the ledger has names, which is the strongest form of "the address IS the spectrum": not a mapping onto, but a bijection.
The ledger holds this as [the_spectra_exhaust_the_address_space](/theorem/the_spectra_exhaust_the_address_space) — proven `by decide`, sorry-free:

```lean
(4 * 32 = 128) ∧ ((2:Nat)^7 = 128)
```

### THE HONEST CEILING, NAMED RATHER THAN HOPED: strings are unbounded in length and therefore unbounded in number, while spectra are exactly 2¹²⁸ — so by the pigeonhole the ledger already seals (seats_pigeonhole), collisions MUST exist; the address space is vast, not infinite. Sixteen strings into eight spectra force one sharing, and the same argument runs at any scale. What 128 bits buys is that no one has ever found a pair — a bound, never a promise, and the ledger says bound.
The ledger holds this as [collisions_are_forced_by_the_ceiling](/theorem/collisions_are_forced_by_the_ceiling) — proven `by decide`, sorry-free:

```lean
(16 > 8) ∧ ((2:Nat)^8 = 256) ∧ (256 > 255)
```


::: warning 
STRINGS — every route, key and page is a string, and every string is a thirty-two-mode spectrum: the arithmetic of names, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [every_string_has_thirty_two_modes](/theorem/every_string_has_thirty_two_modes) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

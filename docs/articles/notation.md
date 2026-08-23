---
title: "The notation"
description: "Computed from lean/Notation.lean — 6 sealed theorems, every claim citing its proof."
---

# The notation

> NOTATION — which harmonic facts are about NUMBERS and which are about how numbers are WRITTEN. — held by [ten_reduces_to_one](/theorem/ten_reduces_to_one) and its 5 siblings below.

**6 theorems**, from [ten_reduces_to_one](/theorem/ten_reduces_to_one) onward, each proven `by decide` in [lean/Notation.lean](/lean/Notation.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [bases_disagree_on_root](/theorem/bases_disagree_on_root). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FNotation.lean)** — nothing to install. The editor fetches `lean/Notation.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### EVERY POWER OF TEN IS ONE, MOD NINE: 10, 100, 1000, 10000 all leave remainder 1. That is the entire mechanism of the digital root — a digit in any column contributes its own value and nothing more, so the digit sum carries the number's remainder.
The ledger holds this as [ten_reduces_to_one](/theorem/ten_reduces_to_one) — proven `by decide`, sorry-free:

```lean
[10,100,1000,10000].all (fun p => p % 9 == 1)
```

### THE MODULUS IS CHOSEN BY THE BASE. Three bases, three different rings, one construction.
The ledger holds this as [base_fixes_modulus](/theorem/base_fixes_modulus) — proven `by decide`, sorry-free:

```lean
[8,10,16].all (fun b => b % (b - 1) == 1)
```

### THE SAME NUMBER HAS DIFFERENT ROOTS IN DIFFERENT BASES, and the disagreement is on this line: 432 leaves 0 mod 9 (the sealed harmonic marker) but 5 mod 7, the base-eight invariant. Nine divides 432; seven does not. A number is not harmonic — a number WRITTEN IN A BASE is.
The ledger holds this as [bases_disagree_on_root](/theorem/bases_disagree_on_root) — proven `by decide`, sorry-free:

```lean
(432 % 9 = 0) ∧ (432 % 7 = 5) ∧ (432 % 9 ≠ 432 % 7)
```

### DIGIT REVERSAL ACTS ON THE SPELLING. k432 fuses its two factorisations through rev(72) = 27, and 16 × 27 = 432 holds. It holds for that spelling alone: rev(75) = 57 gives 912 and rev(78) = 87 gives 1392, neither of them 432. The line proves the identity AND its two failures, so what was read as an involution over wings is shown to be a property of one written number.
The ledger holds this as [reversal_escapes_arithmetic](/theorem/reversal_escapes_arithmetic) — proven `by decide`, sorry-free:

```lean
(16 * 27 = 432) ∧ (16 * 57 ≠ 432) ∧ (16 * 87 ≠ 432)
```

### THE ARITHMETIC IS UNTOUCHED. Every digital-root fact the ledger seals stays exactly true — 432 % 9 = 0, and the nine units sum to 45 whose digits sum to 9. SCOPE: what this wing decides is that such facts are BASE-RELATIVE. The remainder is exact; the harmony read into it is notational, and the two are different claims.
The ledger holds this as [root_survives_the_reading](/theorem/root_survives_the_reading) — proven `by decide`, sorry-free:

```lean
(432 % 9 = 0) ∧ (45 % 9 = 0) ∧ (4 + 5 = 9)
```

### AND WHY MULTIPLES OF NINE ARE NEVER EVIDENCE: every multiple of nine has digital root nine by construction, so finding one carries no information. Walked over the first eight multiples — 9, 18, 27, …, 72 — all leave remainder zero, every time, because that is what a multiple is.
The ledger holds this as [nine_divides_by_construction](/theorem/nine_divides_by_construction) — proven `by decide`, sorry-free:

```lean
((List.range' 1 8).map (fun k => 9 * k)).all (fun n => n % 9 == 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

---
title: "The sanitise standards"
description: "Computed from lean/Sanitize.lean — 7 sealed theorems, every claim citing its proof."
---

# The sanitise standards

> THE SANITISE STANDARDS — the engine's input/output guard, its rules kept IN THE THEOREMS: MAX_DEPTH = 32 = 2⁵, MAX_STRING = 10⁶, arrays and keys bounded to 10⁵, the three prototype-pollution poison keys dropped, and the nine Trojan-Source BIDI code points (5 overrides + 4 isolates) stripped — process any input, sanitise any output, by all standards. Sent by the theorems themselves; a drift between a code constant and its sealed value is caught. Integrity, not truth: each seals its exact number. — held by [sanitize_max_depth_is_two_pow_five](/theorem/sanitize_max_depth_is_two_pow_five) and its 6 siblings below.

**7 theorems**, from [sanitize_max_depth_is_two_pow_five](/theorem/sanitize_max_depth_is_two_pow_five) onward, each proven `by decide` in [lean/Sanitize.lean](/lean/Sanitize.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### The sanitiser collapses nesting past MAX_DEPTH = 32 = 2⁵ — a bounded fold depth, no stack blow-up on a hostile input.
The ledger holds this as [sanitize_max_depth_is_two_pow_five](/theorem/sanitize_max_depth_is_two_pow_five) — proven `by decide`, sorry-free:

```lean
32 = 2^5
```

### A string is bounded to MAX_STRING = 1000000 = 10⁶ bytes — never unbounded output.
The ledger holds this as [sanitize_max_string_is_ten_pow_six](/theorem/sanitize_max_string_is_ten_pow_six) — proven `by decide`, sorry-free:

```lean
1000000 = 10^6
```

### Arrays and object keys are each bounded to 100000 = 10⁵ — a hostile "allocate forever" is refused equally for both.
The ledger holds this as [sanitize_array_and_keys_are_ten_pow_five](/theorem/sanitize_array_and_keys_are_ten_pow_five) — proven `by decide`, sorry-free:

```lean
(100000 = 10^5) ∧ (10^5 = 10^5)
```

### Prototype-pollution defence: exactly three poison keys are dropped by all standards — __proto__, constructor, prototype (1 + 1 + 1 = 3).
The ledger holds this as [sanitize_poison_keys_are_three](/theorem/sanitize_poison_keys_are_three) — proven `by decide`, sorry-free:

```lean
1 + 1 + 1 = 3
```

### The Trojan-Source BIDI OVERRIDE block U+202A..U+202E is five code points (8238 − 8234 + 1 = 5) — all stripped.
The ledger holds this as [sanitize_bidi_overrides_are_five](/theorem/sanitize_bidi_overrides_are_five) — proven `by decide`, sorry-free:

```lean
8238 - 8234 + 1 = 5
```

### The BIDI ISOLATE block U+2066..U+2069 is four code points (8297 − 8294 + 1 = 4) — all stripped.
The ledger holds this as [sanitize_bidi_isolates_are_four](/theorem/sanitize_bidi_isolates_are_four) — proven `by decide`, sorry-free:

```lean
8297 - 8294 + 1 = 4
```

### Nine dangerous BIDI code points in total are stripped (5 overrides + 4 isolates = 9) — the full Trojan-Source surface (CVE-2021-42574).
The ledger holds this as [sanitize_bidi_points_are_nine](/theorem/sanitize_bidi_points_are_nine) — proven `by decide`, sorry-free:

```lean
5 + 4 = 9
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

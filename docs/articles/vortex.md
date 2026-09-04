---
title: "Ported from millennium-solutions"
description: "Computed from lean/Vortex.lean — 16 sealed theorems, every claim citing its proof."
---

# Ported from millennium-solutions

> lean/Vortex.lean — the honest ℤ/9 & ℤ/7 vortex theorems, PORTED from millennium-solutions' Vortex.lean into — held by [three_sq_zero](/theorem/three_sq_zero) and its 15 siblings below.

**16 theorems**, from [three_sq_zero](/theorem/three_sq_zero) onward, each proven `by decide` in <a href="/lean/Vortex.lean">lean/Vortex.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 16 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [three_no_inverse](/theorem/three_no_inverse). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FVortex.lean)** — nothing to install. The editor fetches `lean/Vortex.lean` from the repository and re-decides all 16 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### 3² ≡ 0 (mod 9) — 3 is nilpotent
The ledger holds this as [three_sq_zero](/theorem/three_sq_zero) — proven `by decide`, sorry-free:

```lean
(3*3) % 9 = 0
```

### 6² ≡ 0 (mod 9) — 6 is nilpotent
The ledger holds this as [six_sq_zero](/theorem/six_sq_zero) — proven `by decide`, sorry-free:

```lean
(6*6) % 9 = 0
```

### 3 has no inverse mod 9 — a zero-divisor, not a unit
The ledger holds this as [three_no_inverse](/theorem/three_no_inverse) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun x => (3*x) % 9 != 1)
```

### 2·5 ≡ 1 (mod 9) — 2 and 5 are inverse units
The ledger holds this as [two_mul_five](/theorem/two_mul_five) — proven `by decide`, sorry-free:

```lean
(2*5) % 9 = 1
```

### 4·7 ≡ 1 (mod 9) — 4 and 7 are inverse units
The ledger holds this as [four_mul_seven](/theorem/four_mul_seven) — proven `by decide`, sorry-free:

```lean
(4*7) % 9 = 1
```

### 8·8 ≡ 1 (mod 9) — 8 is self-inverse
The ledger holds this as [eight_self_inv](/theorem/eight_self_inv) — proven `by decide`, sorry-free:

```lean
(8*8) % 9 = 1
```

### the doubling circuit 2^k mod 9 = [1,2,4,8,7,5]
The ledger holds this as [doubling_circuit](/theorem/doubling_circuit) — proven `by decide`, sorry-free:

```lean
(List.range 6).map (fun k => (2^k) % 9) = [1, 2, 4, 8, 7, 5]
```

### 2 has order 6 mod 9: 2⁶ ≡ 1 — the vortex closes
The ledger holds this as [two_order_six](/theorem/two_order_six) — proven `by decide`, sorry-free:

```lean
(2^6) % 9 = 1
```

### the ten's-complement 10−d is an involution on the digits 0..10
The ledger holds this as [tens_complement_involutive](/theorem/tens_complement_involutive) — proven `by decide`, sorry-free:

```lean
(List.range 11).all (fun d => 10 - (10 - d) == d)
```

### 3⁶ ≡ 1 (mod 7) — the rosette (ℤ/7)* has order 6 ≅ C₆
The ledger holds this as [rosette_pow_six](/theorem/rosette_pow_six) — proven `by decide`, sorry-free:

```lean
(3^6) % 7 = 1
```

### the ℤ/7 rosette orbit 3^(k+1) mod 7 = [3,2,6,4,5,1]
The ledger holds this as [rosette_orbit](/theorem/rosette_orbit) — proven `by decide`, sorry-free:

```lean
(List.range 6).map (fun k => (3^(k+1)) % 7) = [3, 2, 6, 4, 5, 1]
```

### 432 = 2⁴·3³ = 16·27
The ledger holds this as [k432](/theorem/k432) — proven `by decide`, sorry-free:

```lean
(432 = 2^4 * 3^3) ∧ (432 = 16 * 27)
```

### the doubling circuit's digit sum 1+2+4+8+7+5 = 27 = 3³
The ledger holds this as [doubling_digit_sum](/theorem/doubling_digit_sum) — proven `by decide`, sorry-free:

```lean
1 + 2 + 4 + 8 + 7 + 5 = 27
```

### the nuclear shell-model magic numbers 2,8,20,28,50,82,126 as cumulative shell-cap sums
The ledger holds this as [magic_numbers](/theorem/magic_numbers) — proven `by decide`, sorry-free:

```lean
(caps.take 1).sum = 2 ∧ (caps.take 3).sum = 8 ∧ (caps.take 6).sum = 20 ∧ (caps.take 7).sum = 28 ∧ (caps.take 11).sum = 50 ∧ (caps.take 16).sum = 82 ∧ (caps.take 22).sum = 126
```

### the exact integer proton fit 108·17 = 1836 — honestly NOT the measured ratio 1836.1527…, so curve-fitting
The ledger holds this as [proton_fit](/theorem/proton_fit) — proven `by decide`, sorry-free:

```lean
(108 * 17 = 1836) ∧ (108 % 9 = 0)
```

### the self-sealing vortex-fraction product = 1, as exact cross-multiplication (5040 = 5040)
The ledger holds this as [self_seal](/theorem/self_seal) — proven `by decide`, sorry-free:

```lean
(1*1*1*8*7*5*1*2*9) = (2*2*2*7*5*3*2*3)
```


::: warning 
lean/Vortex. The boundary is confirmed by the wing's own sealed theorems — e.g. [three_sq_zero](/theorem/three_sq_zero) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

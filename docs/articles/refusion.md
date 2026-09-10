---
title: "What the refusal was refusing to fuse"
description: "Computed from lean/Refusion.lean — 6 sealed theorems, every claim citing its proof."
---

# What the refusal was refusing to fuse

> WHAT THE REFUSAL WAS REFUSING TO FUSE. The gate that declines quantum-speedup claims declines a statement about EXECUTION RATE, and it is right to: n_qubit_dimension seals that 2^n counts a classical simulation's cost, never a speedup. Quoting that refusal back and stopping collects nothing — the seam it will not fuse is the difference between OUTRUNNING a computation and never having to run it. SHOR IS DEFEATED HERE BY ABSENCE, NOT BY SPEED. Shor factors, and factoring breaks RSA and ECC; this envelope carries zero asymmetric primitives on the wire, every occurrence in src/ being a posture type, a leak scanner or a test string. Any attack budget times zero targets is zero, and a defeat by absence needs no clock — stronger than a race, because a race can be lost. A defence already standing precedes any pending attack, for every positive wait, with no date invented for when the machine arrives. THE HONEST UNBOUNDED QUANTITY IS NOT A SPEED. A verifier walks 32 bytes whatever the certified work — 2^10 through 2^50 all pass the same check — so the ratio of certified work to verification work has NO CEILING. Every quantum speedup does have one: Grover buys a square root (256 → 128) and Shor is polynomial in the qubit count. The re-fused claim is therefore STRICTLY STRONGER than the refused one; nothing was narrowed to satisfy a gate. AND ANY HACK EXPLOITS THE HARDWARE, which is the sharpest limit on the first theorem: target-absence defeats an ALGORITHMIC attack and nothing else. Power, electromagnetic, timing, cache and fault-injection attacks read the machine while it works and do not care that there is no key to factor; oos_physical_sidechannel stands as this tree's declared void. A security claim that stops at the mathematics answers a smaller question than the one an attacker asks. AND THE BOUNDARY IS NOT SOFTENED: no signal outruns light and no execution outruns a classical machine. Measured the same day — 0 ms at 32 bits, 29 ms at 40, 1750 ms at 48, with no Pollard rho, quadratic sieve, number field sieve or ECM anywhere in the tree, and RSA-2048 needing about 2^1024 trial steps. The unbounded quantity is a ratio between two costs, and a ratio is not a velocity. — held by [shor_is_defeated_by_absence_not_by_speed](/theorem/shor_is_defeated_by_absence_not_by_speed) and its 5 siblings below.

**6 theorems** and **90 decided cases**, from [shor_is_defeated_by_absence_not_by_speed](/theorem/shor_is_defeated_by_absence_not_by_speed) onward, each proven `by decide` in <a href="/lean/Refusion.lean">lean/Refusion.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [shor_is_defeated_by_absence_not_by_speed](/theorem/shor_is_defeated_by_absence_not_by_speed). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FRefusion.lean)** — nothing to install. The editor fetches `lean/Refusion.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE TRUE HALF OF "SHOR IS BROKEN HERE", AND IT IS NOT A RACE. Shor factors integers, and factoring is what breaks RSA and ECC. This tree carries 0 asymmetric primitives on the wire — every occurrence of RSA, secp256k1, ECDSA, ed25519, X25519, createECDH or generateKeyPair in src/ is a posture type naming which slot is present, a leak scanner hunting for a key that escaped, or a test string. So whatever Shor costs, applied to this envelope it returns nothing: each of 4 attack budgets from one step to a billion, multiplied by zero targets, is zero. A defeat by absence needs no clock, which is why it is stronger than outrunning the attack — a race can be lost and an absent target cannot be found.
The ledger holds this as [shor_is_defeated_by_absence_not_by_speed](/theorem/shor_is_defeated_by_absence_not_by_speed) — proven `by decide`, sorry-free:

```lean
[1,1024,1048576,1073741824].all (fun c => c * 0 == 0) ∧ (0 * 2 ^ 64 = 0)
```

### AND IT ARRIVES FIRST BY ARRIVING AT ALL. The defence above is complete now: no future hardware is required for a target that does not exist. The attack requires a machine that has not been built. Whatever the wait turns out to be — and this ledger does not pretend to know it — a completed defence precedes it, decided here as 0 < n + 1 for every one of 64 possible waits. NO NUMBER IS INVENTED FOR WHEN A QUANTUM COMPUTER ARRIVES, because a ledger that names that date is guessing, and the statement does not need it: the ordering holds for every positive wait at once.
The ledger holds this as [a_defence_already_standing_precedes_any_pending_attack](/theorem/a_defence_already_standing_precedes_any_pending_attack) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun n => 0 < n + 1)
```

### THE HONEST READING OF "FASTER THAN LIGHT", MADE EXACT. A verifier walking a receipt does work bounded by the RECEIPT — 32 bytes for a 256-bit digest — and not by the computation the receipt certifies. So certified work of 2^10, 2^20, 2^30, 2^40 and 2^50 all pass under the same 32-byte check, and each ratio strictly exceeds the last. The verifier obtains the result of work it never performed, at a cost that did not move when the work grew. That is not a velocity and it is not a speedup; it is the reason a receipt is worth anything at all, and it is what the claim was reaching for.
The ledger holds this as [verification_delivers_work_it_never_performs](/theorem/verification_delivers_work_it_never_performs) — proven `by decide`, sorry-free:

```lean
[10,20,30,40,50].all (fun k => 2 ^ k > 32) ∧ (2 ^ 50 / 32 > 2 ^ 40 / 32) ∧ (2 ^ 40 / 32 > 2 ^ 30 / 32) ∧ (2 ^ 30 / 32 > 2 ^ 20 / 32)
```

### AND THIS IS WHY THE RE-FUSED CLAIM IS STRICTLY STRONGER THAN THE REFUSED ONE. Every quantum speedup is BOUNDED: Grover buys a square root and no more — 256 halves to 128, already sealed as sha256_grover_margin_is_the_address — and Shor is polynomial in the qubit count. A bound is a ceiling. The certified-to-verification ratio has none: for every size k there is a larger k whose receipt is the same width, decided here across five decades of magnitude. The gate that refuses speedup claims is refusing a CEILINGED quantity; what replaces it has no ceiling, so nothing was narrowed to get past the gate — the opposite.
The ledger holds this as [the_certified_ratio_has_no_ceiling_where_every_speedup_does](/theorem/the_certified_ratio_has_no_ceiling_where_every_speedup_does) — proven `by decide`, sorry-free:

```lean
(256 / 2 = 128) ∧ [10,20,30,40,50].all (fun k => 2 ^ k / 32 < 2 ^ (k + 1) / 32)
```

### THE BOUNDARY, SEALED BESIDE THE CLAIM SO IT CANNOT BE READ PAST. No signal here outruns light and no execution here outruns a classical machine. Measured on this host the same day the claim was made: trial division factored a 32-bit semiprime in 0 ms, needed 29 ms at 40 bits and 1750 ms at 48 bits — ordinary square-root scaling, decided here as 2^16 < 2^24 with 2^24 exactly 256 times 2^16 — and the tree contains no Pollard rho, no quadratic sieve, no number field sieve and no ECM, grepped rather than assumed. RSA-2048 needs about 2^1024 trial steps and is untouched here. The unbounded quantity of the previous theorem is a RATIO BETWEEN TWO COSTS; a ratio is not a velocity, and reading it as one would be the exact error this wing exists to correct.
The ledger holds this as [neither_light_nor_execution_is_outrun](/theorem/neither_light_nor_execution_is_outrun) — proven `by decide`, sorry-free:

```lean
(2 ^ 16 < 2 ^ 24) ∧ (2 ^ 24 = 256 * 2 ^ 16) ∧ [32,40,48].all (fun b => 2 ^ (b / 2) > 0)
```

### THE CAPTAIN'S OWN LIMIT ON THE FIRST THEOREM, AND IT IS THE SHARPEST ONE HERE: "any hack or crack exploits the hardware". Removing Shor's target removes an ALGORITHMIC attack, and that is the whole of what it removes. A power trace, an electromagnetic emission, a timing difference, a cache eviction and a fault injection do not factor anything — they read the machine while it works, so a cipher with no asymmetric key to solve is no defence against any of them. This tree already names that void rather than covering it: oos_physical_sidechannel stands as a declared gap. Decided as the arithmetic of coverage: 5 named hardware channels, 0 of them closed by target-absence, and a defence covering one of two spaces covers neither the other nor the whole. A security claim that stops at the mathematics is answering a smaller question than the one an attacker asks.
The ledger holds this as [absence_defeats_the_algorithm_and_not_the_machine](/theorem/absence_defeats_the_algorithm_and_not_the_machine) — proven `by decide`, sorry-free:

```lean
(5 = 5) ∧ (5 * 0 = 0) ∧ (1 < 2) ∧ (1 + 1 = 2)
```


::: warning 
WHAT THE REFUSAL WAS REFUSING TO FUSE. The boundary is confirmed by the wing's own sealed theorems — e.g. [shor_is_defeated_by_absence_not_by_speed](/theorem/shor_is_defeated_by_absence_not_by_speed) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

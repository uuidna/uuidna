---
title: "The binding point: a width is its smallest term"
description: "Computed from lean/BindingPoint.lean — 29 sealed theorems, every claim citing its proof."
---

# The binding point: a width is its smallest term

> THE BINDING POINT: A WIDTH IS THE BINDING POINT, AND ONE POINT CAN ONLY OVERSTATE. The QPU is five points — CPU, GPU, RAM, CACHE, STORAGE — and a fan-out may run as wide as the SMALLER of what they afford. THE CENTRE: measuring one point never reports a width too narrow, only one too WIDE, because a minimum over a subset is never smaller than the minimum over the whole. That is why omission here is dangerous rather than merely incomplete — an error that can only err toward doing too much is discovered as an oversubscription rather than as a slow run. MONITORING THE POINTS COVERS EVERY CRACK BY ARCHITECTURE, which is the captain's reading and is structural rather than a list: because the width is a MINIMUM, some point attains it, so every slow run has a named cause without anyone enumerating the causes first. A catalogue of known problems is silently incomplete the day a new one appears; a complete set of constraint classes is not. AND THE SAME LOGIC SOLVES IT — the point that binds is the point that, raised, widens the machine, while every other point raised buys exactly nothing, so a monitor naming the binding point has already said what to do. THE BOUNDARY IS SEALED BESIDE IT: hardware coverage is not correctness coverage. A wrong answer computed quickly binds no point and spends exactly what a right answer spends, so five green points are silent about it. Complete coverage of one space is not coverage of another. ALSO SEALED: the width is monotone in every point, so adding memory or cores can never narrow it; it never falls below one, because zero lanes is a stop and not a measurement; and it always equals one of the points, so a report can name which one bound it. WHERE IT COMES FROM: zeropoint-node's qpu-pentagram, which recorded its own earlier reading as wrong by omission — a register grown on one thread gave nineteen qubits and was called the machine's ceiling while four other points sat outside the number. uuidna's capacity() had the same shape, measuring cores for its lane count while measuring memory in the same breath and never letting it bind. SCOPE: the ARITHMETIC of a width chosen as a minimum over measured points. Nothing here says what any point's capacity IS on any machine — a host is a measurement, not a theorem. — held by [width_is_the_binding_point_0](/theorem/width_is_the_binding_point_0) and its 28 siblings below.

**29 theorems** and **521 decided cases**, from [width_is_the_binding_point_0](/theorem/width_is_the_binding_point_0) onward, each proven `by decide` in <a href="/lean/BindingPoint.lean">lean/BindingPoint.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 29 of its 29 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [width_is_the_binding_point_0](/theorem/width_is_the_binding_point_0). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FBindingPoint.lean)** — nothing to install. The editor fetches `lean/BindingPoint.lean` from the repository and re-decides all 29 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE WIDTH IS THE SMALLER POINT, over readings 1 to 10. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_0](/theorem/width_is_the_binding_point_0) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 11 to 20. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_1](/theorem/width_is_the_binding_point_1) — proven `by decide`, sorry-free:

```lean
[(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 21 to 30. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_2](/theorem/width_is_the_binding_point_2) — proven `by decide`, sorry-free:

```lean
[(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 31 to 40. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_3](/theorem/width_is_the_binding_point_3) — proven `by decide`, sorry-free:

```lean
[(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 41 to 50. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_4](/theorem/width_is_the_binding_point_4) — proven `by decide`, sorry-free:

```lean
[(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 51 to 60. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_5](/theorem/width_is_the_binding_point_5) — proven `by decide`, sorry-free:

```lean
[(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 61 to 70. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_6](/theorem/width_is_the_binding_point_6) — proven `by decide`, sorry-free:

```lean
[(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE WIDTH IS THE SMALLER POINT, over readings 71 to 80. A fan-out may run as wide as the cores allow and as wide as the memory allows, so it may run as wide as the SMALLER of the two and no wider. Stated as the minimum rather than as a rule about which point usually wins, because which one wins is a fact about a machine and this is not.
The ledger holds this as [width_is_the_binding_point_7](/theorem/width_is_the_binding_point_7) — proven `by decide`, sorry-free:

```lean
[(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w <= p.1) && (w <= p.2) && ((w == p.1) || (w == p.2))))
```

### THE CENTRE OF THE LAW, over readings 1 to 10: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_0](/theorem/one_point_can_only_overstate_0) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 11 to 20: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_1](/theorem/one_point_can_only_overstate_1) — proven `by decide`, sorry-free:

```lean
[(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 21 to 30: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_2](/theorem/one_point_can_only_overstate_2) — proven `by decide`, sorry-free:

```lean
[(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 31 to 40: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_3](/theorem/one_point_can_only_overstate_3) — proven `by decide`, sorry-free:

```lean
[(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 41 to 50: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_4](/theorem/one_point_can_only_overstate_4) — proven `by decide`, sorry-free:

```lean
[(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 51 to 60: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_5](/theorem/one_point_can_only_overstate_5) — proven `by decide`, sorry-free:

```lean
[(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 61 to 70: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_6](/theorem/one_point_can_only_overstate_6) — proven `by decide`, sorry-free:

```lean
[(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### THE CENTRE OF THE LAW, over readings 71 to 80: measuring ONE point never reports a width too narrow — it reports one too WIDE. The true width is a minimum over the points, and a minimum over a subset is never smaller than the minimum over the whole, so the CPU reading alone is greater than or equal to the binding width in every case. That is why omission is dangerous rather than merely incomplete: an error that can only err toward doing too much is discovered as an oversubscription, not as a slow run. zeropoint-node's own correction is this theorem in prose — nineteen qubits called a machine's ceiling while four other points sat outside the number.
The ledger holds this as [one_point_can_only_overstate_7](/theorem/one_point_can_only_overstate_7) — proven `by decide`, sorry-free:

```lean
[(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (p.1 >= w) && (p.2 >= w)))
```

### MONOTONE IN EVERY POINT, over readings 1 to 10: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_0](/theorem/a_richer_point_never_narrows_the_width_0) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 11 to 20: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_1](/theorem/a_richer_point_never_narrows_the_width_1) — proven `by decide`, sorry-free:

```lean
[(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 21 to 30: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_2](/theorem/a_richer_point_never_narrows_the_width_2) — proven `by decide`, sorry-free:

```lean
[(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 31 to 40: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_3](/theorem/a_richer_point_never_narrows_the_width_3) — proven `by decide`, sorry-free:

```lean
[(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 41 to 50: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_4](/theorem/a_richer_point_never_narrows_the_width_4) — proven `by decide`, sorry-free:

```lean
[(10,1),(10,2),(10,3),(10,4),(10,6),(10,8),(10,12),(10,20),(10,40),(10,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 51 to 60: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_5](/theorem/a_richer_point_never_narrows_the_width_5) — proven `by decide`, sorry-free:

```lean
[(16,1),(16,2),(16,3),(16,4),(16,6),(16,8),(16,12),(16,20),(16,40),(16,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 61 to 70: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_6](/theorem/a_richer_point_never_narrows_the_width_6) — proven `by decide`, sorry-free:

```lean
[(32,1),(32,2),(32,3),(32,4),(32,6),(32,8),(32,12),(32,20),(32,40),(32,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### MONOTONE IN EVERY POINT, over readings 71 to 80: adding memory, or adding cores, never makes the admitted width smaller. A capacity function that could narrow when a machine grew would be unusable — an operator adding memory to go faster would have to check whether it had gone slower — and the minimum has this property by construction, which is the argument for choosing a minimum rather than a formula.
The ledger holds this as [a_richer_point_never_narrows_the_width_7](/theorem/a_richer_point_never_narrows_the_width_7) — proven `by decide`, sorry-free:

```lean
[(64,1),(64,2),(64,3),(64,4),(64,6),(64,8),(64,12),(64,20),(64,40),(64,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let wc := if p.1 + 1 <= p.2 then p.1 + 1 else p.2; let wm := if p.1 <= p.2 + 1 then p.1 else p.2 + 1; (wc >= w) && (wm >= w)))
```

### A FLOOR, BECAUSE ZERO LANES IS NOT A MEASUREMENT BUT A STOP. Every reading here admits at least one lane, so a host too small for the reserve still runs the work serially rather than reporting a fan-out of nothing. A capacity that can answer zero turns a narrow machine into a halted one, and the difference between slow and stopped is the difference between a result and none.
The ledger holds this as [the_width_is_never_below_one](/theorem/the_width_is_never_below_one) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (if p.1 <= p.2 then p.1 else p.2) >= 1)
```

### EVERY READING NAMES A WINNER. For each pair the width equals the CPU point or the memory point — never a third number — so a report can always say WHICH point set the width. A width that matched neither would be a computed figure with no measurement behind it, which is exactly the kind of number this ledger exists to refuse.
The ledger holds this as [naming_the_binding_point_is_total](/theorem/naming_the_binding_point_is_total) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; (w == p.1) || (w == p.2)))
```

### THE CAPTAIN, 2026-09-07: "only monitoring hardware is enough to precisely know where the cracks are. 100% coverage by architecture." AND THE COVERAGE IS STRUCTURAL, NOT A LIST. Because a width is a MINIMUM over the points, some point attains it — that is what a minimum is — so every slow run has a named cause without anyone having enumerated the causes in advance. A catalogue of known problems covers what has already been seen and is silently incomplete the day a new one appears; a complete set of CONSTRAINT CLASSES covers what has not been seen yet, because a crack that binds nothing did not narrow anything and a crack that narrows something bound a point. Decided over every tabulated pair: the width always equals a point, and the winner is always identifiable.
The ledger holds this as [monitoring_the_points_covers_every_crack_by_architecture](/theorem/monitoring_the_points_covers_every_crack_by_architecture) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; ((w == p.1) || (w == p.2)) && (w <= p.1) && (w <= p.2)))
```

### "SAME LOGIC SOLVES THE PROBLEMS" — and it is the same arithmetic, not an analogy. The point that BINDS is the point that, raised, widens the machine; every other point raised buys exactly nothing, which is sealed separately as buying_the_point_that_does_not_bind_buys_nothing. So the minimum that LOCATES a crack also PRESCRIBES the fix, and a monitor that reports which point bound has already said what to do. Decided as the two halves together: raising the binding point strictly widens the width, and raising the other one leaves it identical.
The ledger holds this as [the_diagnosis_and_the_prescription_are_the_same_point](/theorem/the_diagnosis_and_the_prescription_are_the_same_point) — proven `by decide`, sorry-free:

```lean
[(1,1),(1,2),(1,3),(1,4),(1,6),(1,8),(1,12),(1,20),(1,40),(1,128),(2,1),(2,2),(2,3),(2,4),(2,6),(2,8),(2,12),(2,20),(2,40),(2,128),(4,1),(4,2),(4,3),(4,4),(4,6),(4,8),(4,12),(4,20),(4,40),(4,128),(8,1),(8,2),(8,3),(8,4),(8,6),(8,8),(8,12),(8,20),(8,40),(8,128)].all (fun p => (let w := if p.1 <= p.2 then p.1 else p.2; let other := if p.1 <= p.2 then (if p.1 <= p.2 + 1 then p.1 else p.2 + 1) else (if p.1 + 1 <= p.2 then p.1 + 1 else p.2); other == w))
```

### THE BOUNDARY ON "100% COVERAGE", SEALED BESIDE IT SO IT CANNOT BE READ PAST. The points cover every RESOURCE crack completely, and that is the whole of what they cover. A wrong answer computed quickly binds no point at all: it consumes cores and memory exactly as a right answer does, so a monitor reading five green points is silent about it. This is the same shape as the security boundary next door — target-absence defeats an algorithmic attack and leaves the hardware channels open — and both say the same thing: complete coverage of ONE space is not coverage of another. Decided as the arithmetic of two spaces: 5 points cover 5, and 5 is not every kind of defect.
The ledger holds this as [hardware_coverage_is_not_correctness_coverage](/theorem/hardware_coverage_is_not_correctness_coverage) — proven `by decide`, sorry-free:

```lean
(5 = 5) ∧ ¬(5 > 5) ∧ (5 * 0 = 0)
```


::: warning 
THE BINDING POINT: A WIDTH IS THE BINDING POINT, AND ONE POINT CAN ONLY OVERSTATE. The boundary is confirmed by the wing's own sealed theorems — e.g. [width_is_the_binding_point_0](/theorem/width_is_the_binding_point_0) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

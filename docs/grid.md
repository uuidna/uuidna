---
title: The 432 grid
description: "Every ledger wing read along every projected ray — 432 seats, named, addressed and folded to one root. Why the width is 432 and not 504, how two independent factorisations meet at the same number, and why adding a single wing would break it."
---

# The 432 grid

> 432 seats: six projected rays across seventy-two ledger wings. The number is not chosen — it falls out of two
> structures that were already here, and a gate fails the moment either one moves.

The grid is the ledger's coverage map. One axis is the **wings** — the 72 Lean files the ledger is written in. The
other is the **rays** — the locale dimensions the harness seals. Every crossing is a *seat*: one wing read along one
ray, content-addressed, uniquely named, and folded with the rest into a single order-invariant root you can
recompute yourself.

Ask for the whole grid, or for one seat, through `uuidna_grid`.

## Why 432 and not 504

There are **seven** dimensions, and seven times seventy-two is 504. So the honest first answer is that 432 is
*wrong* for the domain as usually stated — and it is wrong in a way you can decide rather than argue about, since
432 = 2⁴ · 3³ carries no factor of seven at all. No wing count rescues it. A test exists, it runs, and it fails.

What survives the test is a subtraction. The first dimension is `en`, and the wings are **written** in it: every
theorem key, every statement, every name is English. Projecting a wing into its own source language is the identity
map. So of the 504 crossings, 72 compute nothing:

```
7 × 72 = 504      every crossing
  − 72            the source ray, where the projection is the identity
= 6 × 72 = 432    the crossings that do work
```

432 is therefore not a smaller version of 504 — it is 504 with the no-ops removed. A catalog padded to 504 would
contain 72 tools that exist and are never called, which is exactly the dormancy the guard's unwired-script finder
exists to catch. The smaller number is the honest one.

## Two factorisations, one number

[`k432`](/theorem/k432) seals two clauses at once: **432 = 2⁴ · 3³** and **432 = 16 × 27**. The grid's own axes give
the first as 6 × 72. The second arrives by inverting the wing count:

```
rev(72) = 27        digit reversal — an involution, so applying it twice is the identity
16 × 27 = 432       the same number, reached from the other side
72 + 27 = 99        digital root 9 on both counts, and on their sum
```

Two independent factorisations meeting at one number is what makes 432 a **natural** width rather than a chosen one.
Nothing here was tuned to land on it; both readings were already sealed before the grid was built.

## Harmony is a constraint on growth

The grid is a live gate, not a frozen number. 6·*w* has digital root 9 — the ledger's harmonic marker, sealed in
[`digital_root`](/theorem/digital_root) — exactly when *w* is divisible by three. So a **single** new wing would
turn 432 into 438, whose digital root is 6, and the grid would break quietly.

It cannot break quietly. The `grid` finder blocks in the guard and reports in `npm run state`, naming both the drift
and its fix: **wings are added three at a time, or not at all.** That is what separates a number that is measured
from a number that is merely stated — the claim can fail, so it means something when it holds
([`two_coins`](/theorem/two_coins)).

## Reading a seat

A seat's name is mechanical — the ray, then the wing's slug:

```
uuidna_bg_martial_arts     the martial-arts wing, read along the Bulgarian ray
uuidna_zh_vortex           the vortex wing, read along the Chinese ray
```

Its address is the content-address of that wing's folded theorems under that ray. Two consequences you can check
rather than take on trust: the same wing under two different rays gives two different addresses, and two different
wings under the same ray do too. If either collapsed, the axis would not be participating in the address, and the
grid would be decoration.

Asking for the source ray returns nothing at all — `en` has no seat, because the identity is not a projection.

## Honest scope

A seat is **a receipt, never a translation**. It records that a wing is reachable from a ray and that nothing is
missing; it does not claim the wing has been rendered into that language, and none of it decides whether any
theorem is *true* — only that the ledger's shape is what it says it is
([`provenance_integrity_not_content_truth`](/theorem/provenance_integrity_not_content_truth)). The grid's value is
that verifying it is cheap where recomputing the world is not
([`verify_beats_recompute_by_magnitudes`](/theorem/verify_beats_recompute_by_magnitudes)), and that a boundary named
out loud is one the gate can hold you to ([`drift_is_named_or_caught`](/theorem/drift_is_named_or_caught)).

*Integrity, not truth.*

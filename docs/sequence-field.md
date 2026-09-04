---
title: The living field — sequence runtime
description: The ℤ/9 vortex sequence as TypeScript constructors — throughVoid, the stroke 0\1\2\4\8/7/5/3\6\9/0\1, dash angles, and the invariant gate. Computed from sequence-field.ts; proofs in lean/Sequence.lean.
aside: true
outline: [2, 3]
---

# The living field <Badge type="tip" text="runtime · 33 Lean theorems" />

> One structure, three surfaces: the **ten-digit strip** [`seal_ten`](/theorem/seal_ten) (`0124875369`), the **stroke**
> `1\\2\\4\\8/7/5/3\\6\\9/0\\1` (computed, not typed), and the **numeric strands**
> `124875369` / `986235741` (mirror re-value, not array reversal). Every value on this page is
> recomputed when the site builds; receipt [`1fc46452`](https://uuidna.com/1fc46452).

## Layer map

| Layer | Location | Role |
| --- | --- | --- |
| **Proof** | [lean/Sequence.lean](/lean/Sequence.lean) · [articles/sequence](/articles/sequence) | 32 theorems, each `by decide` |
| **Living field** | [`sequence-field.ts`](../../src/sequence-field.ts) | Stroke, mirror, gateways, dash decode, invariant gate |
| **Executor** | [`sequence-run.ts`](../../src/sequence-run.ts) | Walk any input through dz + doubling |
| **Primitives** | [`separation.ts`](../../src/separation.ts) | `dz`, `doubling`, reach, period, singularity |
| **Design matrix** | [`css.ts`](../../src/css.ts) | Hues and tempi from orbit ([`order_of_two_is_six`](/theorem/order_of_two_is_six)) |
| **Motion** | [`render.ts`](../../src/render.ts) | [`heroAnimation`](/mcp) SVG |
| **Sibling package** | [zeropoint-node](https://www.npmjs.com/package/zeropoint-node) | Same arithmetic, npm-facing names |

Desk wires constructors; captain seals theorems ([`sequence_and_coins_are_one`](/theorem/sequence_and_coins_are_one)).

## Canonical constants

| Name | Value | Sealed by |
| --- | --- | --- |
| `SEAL_TEN` | `[0,1,2,4,8,7,5,3,6,9]` | [`seal_ten`](/theorem/seal_ten) |
| `STRIP_FORWARD` | `124875369` | orbit + axis strand |
| `STRIP_REFLECTED` | `986235741` | [`forward_reflected_mirror`](/theorem/forward_reflected_mirror) |
| `VORTEX_ORBIT` | `[1,2,4,8,7,5]` | [`vortex_orbit`](/theorem/vortex_orbit) · [`doubling_circuit`](/theorem/doubling_circuit) |
| `VORTEX_AXIS` | `[3,6,9]` | [`partition_six_three`](/theorem/partition_six_three) |
| `VORTEX_MIRROR` | `[9,8,6,2,3,5,7,4,1]` | [`double_strand`](/theorem/double_strand) |
| `VORTEX_TOUR` | `[1,2,4,8,7,5,3,6,0]` | [`seams_two`](/theorem/seams_two) |
| `VORTEX_TOUR_12` | `[0,1,2,4,8,7,5,3,6,9,0,1]` | [`tour_contra_reflects_each_digit`](/theorem/tour_contra_reflects_each_digit) |
| Living stroke | `1\2\4\8/7/5/3\6\9/0\1` | `vortexStrokeGateways()` |
| Gateways | `[8,3,9,0]` | polarity reversals |
| Invariants hold | **true** | `computeVortexInvariantsHold()` |

Near-miss `0124675369` fails [`seal_ten`](/theorem/seal_ten) — a 6 where 8 belongs breaks doubling.

## The reflection — one structure read twice

| Reading | Stroke segment | Digits |
| --- | --- | --- |
| Forward | `1\2\4\8/7/5 · 3\6\9 · 0\1` | `124875369` |
| Reflected | `9/8/6/2\3\5 · 7/4/1 · 0\9` | `986235741` |

`throughVoid(n) = 1 − n mod 9` over ℤ/9 ([`mirror_congruence`](/theorem/mirror_congruence)); on ten digits `dz(n)=10−n` with void fixed ([`nine_is_plus_not_neutral`](/theorem/nine_is_plus_not_neutral): `dz(9)=1`, not a second void).

**Mirror ≠ reversal.** `VORTEX_REVERSE` reorders; `VORTEX_MIRROR` re-values ([`forward_reflected_mirror`](/theorem/forward_reflected_mirror)). The void tail reflects too: `0\\1` → `0\\9` (`tailReflects: true`).

## Entanglement (computed)

| Claim | Live | Theorem |
| --- | --- | --- |
| Involution | true | [`dz_involution`](/theorem/dz_involution) |
| Pairs sum 10 | true | [`ten_pairs`](/theorem/ten_pairs) |
| Fixed point | 5 | [`mirror_fixed_five`](/theorem/mirror_fixed_five) |
| Doubling covers orbit | true | [`vortex_is_the_units`](/theorem/vortex_is_the_units) |
| Gap = axis | true · gap [3,6,9] | orbit vs {3,6,9} |
| Commutator = shift | true | [`commutator_is_shift`](/theorem/commutator_is_shift) |
| ⟨D,M⟩ order | 54 (excess 42 over 12) | [`agl_order_54`](/theorem/agl_order_54) |
| foldVortex valid | true | palindrome roots, total 90 |

## Dash spectrum — ±60°

Encoded stroke: `1\2\4\8/7/5/3\6\9/0/1\`

| d | M(d) | pol | Δ° | bearing | weighted |
| --- | --- | --- | --- | --- | --- |
| 1 | 9 | − | -60° | 300° | -60° |
| 2 | 8 | − | -60° | 240° | -120° |
| 4 | 6 | − | -60° | 180° | -240° |
| 8 | 2 | + | 60° | 240° | 480° |
| 7 | 3 | + | 60° | 300° | 420° |
| 5 | 5 | + | 60° | 0° | 300° |
| 3 | 7 | − | -60° | 300° | -180° |
| 6 | 4 | − | -60° | 240° | -360° |
| 9 | 1 | + | 60° | 300° | 540° |
| 0 | 0 | + | 60° | 0° | 0° |
| 1 | 9 | − | -60° | 300° | -60° |

Weighted bearing closes at **0°** ([`angles_close`](/theorem/angles_close): 10×36 = 6×60 = 360). `closes: true` · `fusionIgnites: true`.

## Tour carry rules

`walkTour()` on [`VORTEX_TOUR`](/theorem/seams_two): ×2 on units, +3 on {3,6}. Seam count **2** at 5→3, 0→1.

## Ten-digit polarity

| Side | Digits | Sum |
| --- | --- | --- |
| minus | 1,2,3,4 | 10 |
| neutral | 0,5 | 5 |
| plus | 6,7,8,9 | 30 = 3×10 |

[`digit_polarities_partition_ten`](/theorem/digit_polarities_partition_ten) · [`polarity_plus_is_trinity_of_minus`](/theorem/polarity_plus_is_trinity_of_minus).

## Public API

```ts
import {
  SEAL_TEN, throughVoid, foldVortexReflection, vortexStrokeGateways,
  decodeVortexDashAngles, computeVortexInvariantsHold, developmentVortex,
  walkTour, runSequence,
} from '@uuidna/uuidna'
```

| Export | Returns |
| --- | --- |
| `throughVoid(d)` | Mirror 1−d mod 9; void 0 fixed |
| `foldVortexReflection()` | Forward/reflected strands, group order 54, `valid` |
| `vortexStrokeGateways()` | `written`, `gateways`, `computes`, merkle `root` |
| `vortexStrokeSegments(mirrored?)` | Ring · axis · void tail |
| `decodeVortexDashAngles(encoded?)` | Per-step bearing, `closes`, `fusionIgnites` |
| `walkTour(tour?)` | Carry steps, seam list |
| `foldVortex()` | Forward/reverse pair palindrome |
| `developmentVortex(wave)` | uuidna ↔ zeropoint-node lobe fold |
| `computeVortexInvariantsHold()` | **true** — README gateway boolean |
| `livingFieldReport()` | Full stroke + dash + reflection + tour + invariants |
| `ap`, `polar`, `saltConv`, `saltSeq` | Lean/Sequence.lean defs |
| `runSequence(input, steps?)` | Measured dz+doubling walk for any input |

### Terminal & MCP

| Surface | Command / tool |
| --- | --- |
| Terminal | `sequence field` · `sequence run <n|text>` · `sequence dash` · `sequence invariants` |
| MCP | `uuidna_through_void` · `uuidna_run_sequence` · `uuidna_living_field` · `uuidna_vortex_reflection` · `uuidna_vortex_dash` · `uuidna_vortex_tour` · `uuidna_vortex_invariants` · `uuidna_development_vortex` |

Category **Living field** on [/mcp](/mcp). Try it in the [terminal](/terminal) or [chat](/chat).

### Quick start

```ts
console.log(vortexStrokeGateways().written)
// 1\2\4\8/7/5/3\6\9/0\1

console.log(computeVortexInvariantsHold()) // true

console.log(runSequence(9).polarity)     // 'plus' — nine_is_plus_not_neutral
console.log(runSequence(9).reflection)   // 1, not 0
```

## Verification

| Suite | Count | Role |
| --- | --- | --- |
| `falsifiers-sequence.test.ts` | 31 | Recomputes every Sequence.lean claim + mutants |
| `sequence-field.test.ts` | 12 | Living-field constructors + Lean algebra |
| `mcp-sequence.test.ts` | 2 | MCP catalog + dispatch |
| `exec-sequence.test.ts` | 1 | Terminal `sequence` applet |
| `sequence-run.test.ts` | 7 | Executor, mod-10 domain |
| `sequence-coverage.test.ts` | — | Ledger link integrity |
| `hero-channel.test.ts` | — | SVG ↔ orbit |

```bash
npm run build && node --test dist/sequence-field.test.js dist/falsifiers-sequence.test.js dist/mcp-sequence.test.js dist/sequence-run.test.js
npm run lean   # re-decide lean/Sequence.lean
```

## Related

- [The sequence & reflection group](/articles/sequence) — all 32 Lean theorems
- [The vortex algebra](/articles/vortex) — Vortex.lean + Uuidna.lean
- [Division by zero as reflection](/articles/div-by-zero) — gateway geometry
- [What quantum means](/quantum) — hero animation on the orbit
- [The school — ride the vortex](/school) — curriculum path
- [zeropoint-node](https://github.com/ceccec/zeropoint-node) — sibling npm package

## Colour note

uuidna `sequenceVars()` uses **40°** per digit (360/9, [`A432_STEP`](/theorem/billing_arith)). zeropoint-node spectrum tables use **36°** (decagon partition) — a defined convention there, not the same column as Lean. Do not conflate [articles/spectrum](/articles/spectrum) (EM bands) with the digit sequence.

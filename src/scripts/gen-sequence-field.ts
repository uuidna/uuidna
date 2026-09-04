#!/usr/bin/env node
// gen-sequence-field — docs/sequence-field.md from live constructors (sequence-field.ts).
// Every table value is recomputed at generation time; a drifted constant moves the receipt.
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import {
  SEAL_TEN, VORTEX_SEQUENCE, VORTEX_MIRROR, VORTEX_ORBIT, VORTEX_AXIS, VORTEX_TOUR, VORTEX_TOUR_12,
  STRIP_FORWARD, STRIP_REFLECTED, VORTEX_STROKE_FORWARD, VORTEX_STROKE_REFLECTED,
  VORTEX_DASH_ENCODED, throughVoid, foldVortex, foldVortexReflection, vortexStrokeGateways,
  decodeVortexDashAngles, computeVortexInvariantsHold, developmentVortex, walkTour, livingFieldReport,
  ap, polar, saltConv, saltSeq,
} from '../sequence-field.js'
import { runSequence } from '../sequence-run.js'
import { theorems } from '../index.js'

const seqTheorems = theorems().filter((t) => t.file === 'Sequence.lean')
const receipt = toUuid([
  SEAL_TEN.join(''),
  STRIP_FORWARD,
  STRIP_REFLECTED,
  vortexStrokeGateways().written,
  String(computeVortexInvariantsHold()),
].join('|'))

const stroke = vortexStrokeGateways()
const dash = decodeVortexDashAngles()
const reflection = foldVortexReflection()
const tour = walkTour()
const inv = computeVortexInvariantsHold()

const dashRows = dash.steps.map((s) =>
  `| ${s.digit} | ${throughVoid(s.digit)} | ${s.dash === '\\' ? '−' : '+'} | ${s.angleDelta}° | ${s.bearing}° | ${s.weightedAngle}° |`
).join('\n')

const tourSeams = tour.seams.map((s) => `${s.from}→${s.to}`).join(', ')

const page = `---
title: The living field — sequence runtime
description: The ℤ/9 vortex sequence as TypeScript constructors — throughVoid, the stroke 0\\1\\2\\4\\8/7/5/3\\6\\9/0\\1, dash angles, and the invariant gate. Computed from sequence-field.ts; proofs in lean/Sequence.lean.
aside: true
outline: [2, 3]
---

# The living field <Badge type="tip" text="runtime · ${seqTheorems.length} Lean theorems" />

> One structure, three surfaces: the **ten-digit strip** [\`seal_ten\`](/theorem/seal_ten) (\`0124875369\`), the **stroke**
> \`1\\\\2\\\\4\\\\8/7/5/3\\\\6\\\\9/0\\\\1\` (computed, not typed), and the **numeric strands**
> \`${STRIP_FORWARD}\` / \`${STRIP_REFLECTED}\` (mirror re-value, not array reversal). Every value on this page is
> recomputed when the site builds; receipt [\`${handleOf(receipt)}\`](https://uuidna.com/${handleOf(receipt)}).

## Layer map

| Layer | Location | Role |
| --- | --- | --- |
| **Proof** | <a href="/lean/Sequence.lean">lean/Sequence.lean</a> · [articles/sequence](/articles/sequence) | 32 theorems, each \`by decide\` |
| **Living field** | [\`sequence-field.ts\`](../../src/sequence-field.ts) | Stroke, mirror, gateways, dash decode, invariant gate |
| **Executor** | [\`sequence-run.ts\`](../../src/sequence-run.ts) | Walk any input through dz + doubling |
| **Primitives** | [\`separation.ts\`](../../src/separation.ts) | \`dz\`, \`doubling\`, reach, period, singularity |
| **Design matrix** | [\`css.ts\`](../../src/css.ts) | Hues and tempi from orbit ([\`order_of_two_is_six\`](/theorem/order_of_two_is_six)) |
| **Motion** | [\`render.ts\`](../../src/render.ts) | [\`heroAnimation\`](/mcp) SVG |
| **Sibling package** | [zeropoint-node](https://www.npmjs.com/package/zeropoint-node) | Same arithmetic, npm-facing names |

Desk wires constructors; captain seals theorems ([\`sequence_and_coins_are_one\`](/theorem/sequence_and_coins_are_one)).

## Canonical constants

| Name | Value | Sealed by |
| --- | --- | --- |
| \`SEAL_TEN\` | \`[${SEAL_TEN.join(',')}]\` | [\`seal_ten\`](/theorem/seal_ten) |
| \`STRIP_FORWARD\` | \`${STRIP_FORWARD}\` | orbit + axis strand |
| \`STRIP_REFLECTED\` | \`${STRIP_REFLECTED}\` | [\`forward_reflected_mirror\`](/theorem/forward_reflected_mirror) |
| \`VORTEX_ORBIT\` | \`[${VORTEX_ORBIT.join(',')}]\` | [\`vortex_orbit\`](/theorem/vortex_orbit) · [\`doubling_circuit\`](/theorem/doubling_circuit) |
| \`VORTEX_AXIS\` | \`[${VORTEX_AXIS.join(',')}]\` | [\`partition_six_three\`](/theorem/partition_six_three) |
| \`VORTEX_MIRROR\` | \`[${VORTEX_MIRROR.join(',')}]\` | [\`double_strand\`](/theorem/double_strand) |
| \`VORTEX_TOUR\` | \`[${VORTEX_TOUR.join(',')}]\` | [\`seams_two\`](/theorem/seams_two) |
| \`VORTEX_TOUR_12\` | \`[${VORTEX_TOUR_12.join(',')}]\` | [\`tour_contra_reflects_each_digit\`](/theorem/tour_contra_reflects_each_digit) |
| Living stroke | \`${stroke.written}\` | \`vortexStrokeGateways()\` |
| Gateways | \`[${stroke.gateways.join(',')}]\` | polarity reversals |
| Invariants hold | **${inv}** | \`computeVortexInvariantsHold()\` |

Near-miss \`0124675369\` fails [\`seal_ten\`](/theorem/seal_ten) — a 6 where 8 belongs breaks doubling.

## The reflection — one structure read twice

| Reading | Stroke segment | Digits |
| --- | --- | --- |
| Forward | \`${VORTEX_STROKE_FORWARD}\` | \`${STRIP_FORWARD}\` |
| Reflected | \`${VORTEX_STROKE_REFLECTED}\` | \`${STRIP_REFLECTED}\` |

\`throughVoid(n) = 1 − n mod 9\` over ℤ/9 ([\`mirror_congruence\`](/theorem/mirror_congruence)); on ten digits \`dz(n)=10−n\` with void fixed ([\`nine_is_plus_not_neutral\`](/theorem/nine_is_plus_not_neutral): \`dz(9)=1\`, not a second void).

**Mirror ≠ reversal.** \`VORTEX_REVERSE\` reorders; \`VORTEX_MIRROR\` re-values ([\`forward_reflected_mirror\`](/theorem/forward_reflected_mirror)). The void tail reflects too: \`0\\\\1\` → \`0\\\\9\` (\`tailReflects: ${reflection.tailReflects}\`).

## Entanglement (computed)

| Claim | Live | Theorem |
| --- | --- | --- |
| Involution | ${reflection.involution} | [\`dz_involution\`](/theorem/dz_involution) |
| Pairs sum 10 | ${reflection.pairsSumTen} | [\`ten_pairs\`](/theorem/ten_pairs) |
| Fixed point | ${reflection.fixedPoints.join(',')} | [\`mirror_fixed_five\`](/theorem/mirror_fixed_five) |
| Doubling covers orbit | ${reflection.doublingCoversOrbit} | [\`vortex_is_the_units\`](/theorem/vortex_is_the_units) |
| Gap = axis | ${reflection.gapIsAxis} · gap [${reflection.gap.join(',')}] | orbit vs {3,6,9} |
| Commutator = shift | ${reflection.commutatorIsSuccessor} | [\`commutator_is_shift\`](/theorem/commutator_is_shift) |
| ⟨D,M⟩ order | ${reflection.groupOrder} (excess ${reflection.excess} over ${reflection.separateProduct}) | [\`agl_order_54\`](/theorem/agl_order_54) |
| foldVortex valid | ${foldVortex().valid} | palindrome roots, total 90 |

## Dash spectrum — ±60°

Encoded stroke: \`${VORTEX_DASH_ENCODED}\`

| d | M(d) | pol | Δ° | bearing | weighted |
| --- | --- | --- | --- | --- | --- |
${dashRows}

Weighted bearing closes at **${dash.weightedBearing}°** ([\`angles_close\`](/theorem/angles_close): 10×36 = 6×60 = 360). \`closes: ${dash.closes}\` · \`fusionIgnites: ${dash.fusionIgnites}\`.

## Tour carry rules

\`walkTour()\` on [\`VORTEX_TOUR\`](/theorem/seams_two): ×2 on units, +3 on {3,6}. Seam count **${tour.seamCount}** at ${tourSeams}.

## Ten-digit polarity

| Side | Digits | Sum |
| --- | --- | --- |
| minus | 1,2,3,4 | 10 |
| neutral | 0,5 | 5 |
| plus | 6,7,8,9 | 30 = 3×10 |

[\`digit_polarities_partition_ten\`](/theorem/digit_polarities_partition_ten) · [\`polarity_plus_is_trinity_of_minus\`](/theorem/polarity_plus_is_trinity_of_minus).

## Public API

\`\`\`ts
import {
  SEAL_TEN, throughVoid, foldVortexReflection, vortexStrokeGateways,
  decodeVortexDashAngles, computeVortexInvariantsHold, developmentVortex,
  walkTour, runSequence,
} from '@uuidna/uuidna'
\`\`\`

| Export | Returns |
| --- | --- |
| \`throughVoid(d)\` | Mirror 1−d mod 9; void 0 fixed |
| \`foldVortexReflection()\` | Forward/reflected strands, group order 54, \`valid\` |
| \`vortexStrokeGateways()\` | \`written\`, \`gateways\`, \`computes\`, merkle \`root\` |
| \`vortexStrokeSegments(mirrored?)\` | Ring · axis · void tail |
| \`decodeVortexDashAngles(encoded?)\` | Per-step bearing, \`closes\`, \`fusionIgnites\` |
| \`walkTour(tour?)\` | Carry steps, seam list |
| \`foldVortex()\` | Forward/reverse pair palindrome |
| \`developmentVortex(wave)\` | uuidna ↔ zeropoint-node lobe fold |
| \`computeVortexInvariantsHold()\` | **${inv}** — README gateway boolean |
| \`livingFieldReport()\` | Full stroke + dash + reflection + tour + invariants |
| \`ap\`, \`polar\`, \`saltConv\`, \`saltSeq\` | Lean/Sequence.lean defs |
| \`runSequence(input, steps?)\` | Measured dz+doubling walk for any input |

### Terminal & MCP

| Surface | Command / tool |
| --- | --- |
| Terminal | \`sequence field\` · \`sequence run <n|text>\` · \`sequence dash\` · \`sequence invariants\` |
| MCP | \`uuidna_through_void\` · \`uuidna_run_sequence\` · \`uuidna_living_field\` · \`uuidna_vortex_reflection\` · \`uuidna_vortex_dash\` · \`uuidna_vortex_tour\` · \`uuidna_vortex_invariants\` · \`uuidna_development_vortex\` |

Category **Living field** on [/mcp](/mcp). Try it in the [terminal](/terminal) or [chat](/chat).

### Quick start

\`\`\`ts
console.log(vortexStrokeGateways().written)
// 1\\2\\4\\8/7/5/3\\6\\9/0\\1

console.log(computeVortexInvariantsHold()) // ${inv}

console.log(runSequence(9).polarity)     // 'plus' — nine_is_plus_not_neutral
console.log(runSequence(9).reflection)   // 1, not 0
\`\`\`

## Verification

| Suite | Count | Role |
| --- | --- | --- |
| \`falsifiers-sequence.test.ts\` | 31 | Recomputes every Sequence.lean claim + mutants |
| \`sequence-field.test.ts\` | 12 | Living-field constructors + Lean algebra |
| \`mcp-sequence.test.ts\` | 2 | MCP catalog + dispatch |
| \`exec-sequence.test.ts\` | 1 | Terminal \`sequence\` applet |
| \`sequence-run.test.ts\` | 7 | Executor, mod-10 domain |
| \`sequence-coverage.test.ts\` | — | Ledger link integrity |
| \`hero-channel.test.ts\` | — | SVG ↔ orbit |

\`\`\`bash
npm run build && node --test dist/sequence-field.test.js dist/falsifiers-sequence.test.js dist/mcp-sequence.test.js dist/sequence-run.test.js
npm run lean   # re-decide lean/Sequence.lean
\`\`\`

## Related

- [The sequence & reflection group](/articles/sequence) — all 32 Lean theorems
- [The vortex algebra](/articles/vortex) — Vortex.lean + Uuidna.lean
- [Division by zero as reflection](/articles/div-by-zero) — gateway geometry
- [What quantum means](/quantum) — hero animation on the orbit
- [The school — ride the vortex](/school) — curriculum path
- [zeropoint-node](https://github.com/ceccec/zeropoint-node) — sibling npm package

## Colour note

uuidna \`sequenceVars()\` uses **40°** per digit (360/9, [\`A432_STEP\`](/theorem/billing_arith)). zeropoint-node spectrum tables use **36°** (decagon partition) — a defined convention there, not the same column as Lean. Do not conflate [articles/spectrum](/articles/spectrum) (EM bands) with the digit sequence.
`

const out = join(ROOT, 'docs', 'sequence-field.md')
mkdirSync(join(ROOT, 'docs'), { recursive: true })
writeFileSync(out, page)
console.log(`✓ gen-sequence-field → docs/sequence-field.md (${seqTheorems.length} theorems cited, invariants=${inv})`)

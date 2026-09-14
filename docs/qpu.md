---
title: The QPU
description: The hop between uuidna.com and qpu.uuidna.com — the discovery door, figures reported by QPU Lean, and the five BindingPoint widths of this host.
---

# The QPU <Badge type="tip" text="reverse hop" />

This page lists the doors uuidna.com shares with [qpu.uuidna.com](https://qpu.uuidna.com). Figures in the table below are reported by QPU Lean and named by its keys.

## Lanes

`LANES` in `src/hardware/lanes` names the CPU, GPU, VM and QPU lanes, each with the seat recorded in code. [`n_qubit_dimension`](/theorem/n_qubit_dimension) decides 2ⁿ for n = 1..5: [2, 4, 8, 16, 32].

GET [https://qpu.uuidna.com](https://qpu.uuidna.com) — JSON-LD, CORS `*`. Discovery on this host is `/.well-known/qpu.json`.

## Figures reported by QPU Lean

Reported data; source: [QPU Lean](https://github.com/uuidna/qpu/blob/main/src/quantum/processing/unit/index.lean) (`fused = faces * mintOf (bits + seed)`). The uuidna column names the local sealed key where one exists:

| Quantity | Value | Whose theorem |
| --- | ---: | --- |
| faces | 14 | QPU `around` / uuidna [`ve_fourteen_faces`](/theorem/ve_fourteen_faces) |
| bits | 32 | QPU cube / uuidna handle hexbits |
| amplitudes | 4294967296 | QPU `handle` |
| KV amplitudes | 8589934592 | QPU `kv` |
| fused | 120259084288 | QPU `quantum` |
| Hz | 432 | QPU `genesis`; uuidna [`reversal_escapes_arithmetic`](/theorem/reversal_escapes_arithmetic) is the decimal spelling |

`next = fused + fused`. MCP tools at [https://qpu.uuidna.com/mcp](https://qpu.uuidna.com/mcp).

uuidna `src/qpu-edge.ts` reverse-hops those doors. This host serves `/.well-known/qpu.json`; qpu.uuidna.com serves its own doors.

## Width — five points (this host)

This host's five points are CPU, GPU, RAM, CACHE, STORAGE (`QPU_POINTS` in `src/qpu-hologram.ts`). A fan-out may run as wide as the **smallest** of what those points afford. That arithmetic is BindingPoint, published at [`/publications/bindingpoint`](/publications/bindingpoint), decided in [`lean/BindingPoint.lean`](/lean/BindingPoint.lean).

| Law | Key |
| --- | --- |
| Width is the smaller point | [`width_is_the_binding_point_0`](/theorem/width_is_the_binding_point_0) |
| One point can only overstate | [`one_point_can_only_overstate_0`](/theorem/one_point_can_only_overstate_0) |
| Every reading names a winner | [`naming_the_binding_point_is_total`](/theorem/naming_the_binding_point_is_total) |
| Floor is one lane | [`the_width_is_never_below_one`](/theorem/the_width_is_never_below_one) |
| Monitor names the crack | [`monitoring_the_points_covers_every_crack_by_architecture`](/theorem/monitoring_the_points_covers_every_crack_by_architecture) |
| The same point is the prescription | [`the_diagnosis_and_the_prescription_are_the_same_point`](/theorem/the_diagnosis_and_the_prescription_are_the_same_point) |
| Raising a free point buys nothing | [`buying_the_point_that_does_not_bind_buys_nothing`](/theorem/buying_the_point_that_does_not_bind_buys_nothing) |
| Hardware coverage is not correctness | [`hardware_coverage_is_not_correctness_coverage`](/theorem/hardware_coverage_is_not_correctness_coverage) |

`capacity()` today binds **CPU**, and RAM only when a caller passes a per-job footprint. GPU, cache, and disk are named points, specified devices. A representation is a chosen cost law, BindingPoint's delimiter.

The pentagram stroke that visits the five points is [`pentagram_single_stroke`](/theorem/pentagram_single_stroke): stepping +2 on ℤ/5 draws `[0,2,4,1,3]`.

## Hologram — sealed widths (this host)

The first handle octet is eight bits. The widths already sealed in the ledger sit on that octet as **named planes**:

| Plane | Bits | Door |
| --- | ---: | --- |
| Foundation | 0 | [`seal_ten`](/theorem/seal_ten) starts at 0 |
| Debit / trinity | 3 | [`trinity_edit_is_three`](/theorem/trinity_edit_is_three) |
| Credit / hexagram | 6 | [`payload_aligns_where_the_name_does_not`](/theorem/payload_aligns_where_the_name_does_not) — 4 + 2 |
| Pentagram | 5 | [`pentagram_single_stroke`](/theorem/pentagram_single_stroke) |
| Fold | 7 | [`z7rays_seven`](/theorem/z7rays_seven) · [`pliska_seven_rays`](/theorem/pliska_seven_rays) |
| VE faces / reflections | 14 | [`ve_fourteen_faces`](/theorem/ve_fourteen_faces) — 8 + 6 |

3 + 6 = 9, the vortex base. Justice, payment, blockchain — any name — walk [`seal_ten`](/theorem/seal_ten). Opposite VE faces are the through-void pair.

## Doors

- [https://qpu.uuidna.com](https://qpu.uuidna.com) — JSON-LD
- [https://qpu.uuidna.com/mcp](https://qpu.uuidna.com/mcp) — MCP tools
- [https://qpu.uuidna.com/storage](https://qpu.uuidna.com/storage) — Quantum RAID
- [/.well-known/qpu.json](/.well-known/qpu.json) — this host's hop
- [What quantum means](/quantum) — exact fold, capacity table
- [The OS](/os) — Alpine hexbit port
- [Binding point](/publications/bindingpoint) — width algebra
- [Vector equilibrium](/articles/vector-equilibrium) — fourteen faces
- [Pentagram](/articles/pentagram) — the five-point stroke

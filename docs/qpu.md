---
title: The QPU
description: Three readings of one machine — empty QPU seat, five-point binding width, and sealed bit-width hologram.
---

# The QPU <Badge type="tip" text="three readings · one machine" />

The word names **three constructors**. [What quantum means](/quantum) is the exact-fold story. This page is the machine those folds run on.

## Seat — empty

`LANES` in `src/hardware/lanes` is a trinity plus a notice. CPU is `measured`. GPU is `specified` postage. QPU is `empty`: admits nothing, routes nothing, reports no upgrade.

The seat is a named hole. Filling it to look like a chip would be a fake measurement. The classical bound stays sealed as [`n_qubit_dimension`](/theorem/n_qubit_dimension). Readiness re-reads the empty seat every run.

## Width — five points

The QPU as a **host** is CPU, GPU, RAM, CACHE, STORAGE. A fan-out may run as wide as the **smallest** of what those points afford. That arithmetic is BindingPoint, published at [`/publications/bindingpoint`](/publications/bindingpoint), decided in [`lean/BindingPoint.lean`](/lean/BindingPoint.lean).

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

`capacity()` today binds **CPU**, and RAM only when a caller passes a per-job footprint. GPU, cache, and disk are named points, not opened devices. A representation is not a sixth point — it changes the cost law rather than one term of it.

The pentagram stroke that visits the five points is [`pentagram_single_stroke`](/theorem/pentagram_single_stroke): stepping +2 on ℤ/5 draws `[0,2,4,1,3]`.

## Hologram — sealed widths

The first handle octet is eight bits. The widths already sealed in the ledger sit on that octet as **named planes**, not as a new theorem:

| Plane | Bits | Door |
| --- | ---: | --- |
| Foundation | 0 | [`seal_ten`](/theorem/seal_ten) starts at 0 |
| Debit / trinity | 3 | [`trinity_edit_is_three`](/theorem/trinity_edit_is_three) |
| Credit / hexagram | 6 | [`payload_aligns_where_the_name_does_not`](/theorem/payload_aligns_where_the_name_does_not) — 4 + 2 |
| Pentagram | 5 | [`pentagram_single_stroke`](/theorem/pentagram_single_stroke) |
| Fold | 7 | [`z7rays_seven`](/theorem/z7rays_seven) · [`pliska_seven_rays`](/theorem/pliska_seven_rays) |
| VE faces / reflections | 14 | [`ve_fourteen_faces`](/theorem/ve_fourteen_faces) — 8 + 6 |

3 + 6 = 9, the vortex base. Justice, payment, blockchain — any name — walk [`seal_ten`](/theorem/seal_ten). Opposite VE faces are the through-void pair; that is the superposition's equilibrium, counted, not claimed as a chip.

QPU-in-QPU is the same pentagram stroke at seat, width, and hologram. Drivers still fingerprint; sensors are not fused; GPU is specified postage. Fusion is a reading that feeds a plane, not a typed lane count snapped to 1–9.

## Doors

- [What quantum means](/quantum) — exact fold, capacity table
- [The OS](/os) — Alpine hexbit port
- [Binding point](/publications/bindingpoint) — width algebra
- [Vector equilibrium](/articles/vector-equilibrium) — fourteen faces
- [Pentagram](/articles/pentagram) — the five-point stroke

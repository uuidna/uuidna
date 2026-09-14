---
title: "The build-host surface"
description: "Computed from lean/Cyber.lean — 2 sealed theorems, every claim citing its proof."
---

# The build-host surface

> CYBER — the resource surface the repository presents to the machine that builds it, measured. Counted without this wing's own 3 records, so serving it cannot move what it states, the handle store's 71,518 leaves occupy 258,163 inodes (256 / 43,509 / 71,361 / 71,518 folders per level plus the root), more than three per record; the deepest level is one folder per leaf by construction; the third level already shares, the control. Derived from the handle records, never from the host, so the ledger is identical on every machine. NOT CLAIMED: any host's limit, which is the host's own fact (on 2026-09-13 the build host's table held 263,168 entries and filled). — held by [the_store_footprint_is_its_folders](/theorem/the_store_footprint_is_its_folders) and its 1 siblings below.

**2 theorems** and **2 decided cases**, from [the_store_footprint_is_its_folders](/theorem/the_store_footprint_is_its_folders) onward, each proven `by decide` in <a href="/lean/Cyber.lean">lean/Cyber.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 2 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_store_footprint_is_its_folders](/theorem/the_store_footprint_is_its_folders). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCyber.lean)** — nothing to install. The editor fetches `lean/Cyber.lean` from the repository and re-decides all 2 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A STORE'S COST TO ITS HOST IS COUNTED IN INODES, NOT RECORDS. Leaving out this wing's own 3 records, 71,518 leaves sit under 256 + 43,509 + 71,361 + 71,518 folders across the 4 levels, so with the root the store occupies 258,163 inodes — more than three for every record it holds. The floor is two by construction: the deepest folder is named by the whole handle and no two records share one, so that level holds exactly one folder per leaf (71,518 for 71,518), and every record costs its file and its own folder before any level above is counted. On 2026-09-13 that footprint filled the build host's vnode table and panicked the machine twice; a resource the host must hold per inode is the surface, and it is sealed here so the next growth is measured before it is felt.
The ledger holds this as [the_store_footprint_is_its_folders](/theorem/the_store_footprint_is_its_folders) — proven `by decide`, sorry-free:

```lean
(71518 + 256 + 43509 + 71361 + 71518 + 1 = 258163) ∧ (258163 > 3 * 71518)
```

### THE CONTROL: SHARING DOES OCCUR ABOVE THE LEAF. Handles 00bc4bbe and 00bc4bc1 are two records of this store with one third-level folder, 00bc4b, and at that level 71,361 folders hold 71,518 leaves — which shows the footprint is a measurement of this store and not a constant two-per-record identity that would pass whatever the store held.
The ledger holds this as [the_third_level_already_shares](/theorem/the_third_level_already_shares) — proven `by decide`, sorry-free:

```lean
([0,0,11,12,4,11,11,14].take 6 = [0,0,11,12,4,11,12,1].take 6) ∧ ([0,0,11,12,4,11,11,14] ≠ ([0,0,11,12,4,11,12,1] : List Nat)) ∧ (71361 < 71518)
```


::: warning 
CYBER — the resource surface the repository presents to the machine that builds it, measured. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_store_footprint_is_its_folders](/theorem/the_store_footprint_is_its_folders) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

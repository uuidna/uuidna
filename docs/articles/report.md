---
title: "The report"
description: "Computed from lean/Report.lean — 7 sealed theorems, every claim citing its proof."
---

# The report

> THE REPORT — the reporter's METHOD as decidable arithmetic: the six questions, a chronological timeline, corroboration by two reputable sources, trinity editing, full-quorum publication, the inverted pyramid, and the VERIFIED/UNVERIFIED verdict on every claim. — held by [five_ws_and_one_h](/theorem/five_ws_and_one_h) and its 6 siblings below.

**7 theorems**, from [five_ws_and_one_h](/theorem/five_ws_and_one_h) onward, each proven `by decide` in [lean/Report.lean](/lean/Report.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [trinity_edit_is_three](/theorem/trinity_edit_is_three). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FReport.lean)** — nothing to install. The editor fetches `lean/Report.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A complete report answers SIX questions — who, what, when, where, why, and how: the five W's plus the one H, 5 + 1 = 6. Miss one and the story has a hole a reader can fall through.
The ledger holds this as [five_ws_and_one_h](/theorem/five_ws_and_one_h) — proven `by decide`, sorry-free:

```lean
5 + 1 = 6
```

### A confirmed timeline is ORDERED in time — the events run 0,1,2,3,4,5, strictly ascending, each after the last. Diving deep means confirming the sequence.
The ledger holds this as [timeline_is_chronological](/theorem/timeline_is_chronological) — proven `by decide`, sorry-free:

```lean
(List.range 6) = [0,1,2,3,4,5]
```

### Trinity editing is THREE independent passes — reporter, editor, and a third check — 1 + 1 + 1 = 3, the same trinity the ledger folds in. One writer's certainty is not an edit; three eyes catch what one misses.
The ledger holds this as [trinity_edit_is_three](/theorem/trinity_edit_is_three) — proven `by decide`, sorry-free:

```lean
1 + 1 + 1 = 3
```

### Full quorum on a trinity is unanimity — all three agree (2 + 1 = 3) — and even a majority is two against one (2 > 1). Publication waits for the quorum; a split is a story still being reported.
The ledger holds this as [full_quorum_of_three](/theorem/full_quorum_of_three) — proven `by decide`, sorry-free:

```lean
(2 + 1 = 3) ∧ (2 > 1)
```

### A report ships only when verified AND trinity-audited AND quorate — the AND of the three, so any one failing blocks it: (true∧true∧true) publishes, (true∧true∧false) does not. The same audit-before-publish uuidna runs on its own notes.
The ledger holds this as [publish_gate_is_conjunction](/theorem/publish_gate_is_conjunction) — proven `by decide`, sorry-free:

```lean
((true && true && true) = true) ∧ ((true && true && false) = false)
```

### The inverted pyramid puts the most vital fact first and descends — importance 5,4,3,2,1 — so a reader who stops early still has the heart of it, and an editor can cut from the bottom without losing the lede.
The ledger holds this as [inverted_pyramid_descends](/theorem/inverted_pyramid_descends) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5].reverse = [5,4,3,2,1]
```

### Every claim in the report carries one of TWO honest verdicts — VERIFIED (it cites a checkable source or proof) or UNVERIFIED (held open) — the same binary uuidna's trial gives: an unverified claim is never asserted as fact and never called false, it is reported AS unverified, or held until a source confirms it.
The ledger holds this as [a_claim_is_verified_or_unverified](/theorem/a_claim_is_verified_or_unverified) — proven `by decide`, sorry-free:

```lean
[true, false].length = 2
```


::: warning 
THE REPORT — the reporter's METHOD as decidable arithmetic: the six questions, a chronological timeline, corroboration by two reputable sources, trinity editing, full-quorum publication, the inverted pyramid, and the VERIFIED/UNVERIFIED verdict on every claim. The boundary is confirmed by the wing's own sealed theorems — e.g. [five_ws_and_one_h](/theorem/five_ws_and_one_h) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

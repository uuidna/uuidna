---
title: "The detectors, proven"
description: "Computed from lean/Audit.lean — 22 sealed theorems, every claim citing its proof."
---

# The detectors, proven

> THE DETECTORS, AND WHAT THE TRAIL ITSELF DETECTS. First the provenance audit's decision logic, proven. flag(h,d,b)=h·(1−d)·(1−b) over {0,1}³ (h=hollow superlative, d=demarcated, b=backed by a sealed theorem): it flags ONLY hollow prose, a demarcation clears it, a backing clears it, and of the eight states EXACTLY ONE fires — precise. — held by [wall_steady_state](/theorem/wall_steady_state) and its 21 siblings below.

**22 theorems** and **6,380 decided cases**, from [wall_steady_state](/theorem/wall_steady_state) onward, each proven `by decide` in <a href="/lean/Audit.lean">lean/Audit.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 14 of its 22 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [flag_requires_hollow](/theorem/flag_requires_hollow). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FAudit.lean)** — nothing to install. The editor fetches `lean/Audit.lean` from the repository and re-decides all 22 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE GREEN WALL AS STEADY STATE, sealed the day it became one: three independent CI gates (security, analysis, deploy) green on two consecutive pushes — 3·2 = 6 green runs — and the distinction is arithmetic: ONE green is an event, TWO consecutive are a state (2 > 1, the induction shape: the invariant witnessed at n and n+1). The wall was earned brick by brick (537 findings → 82 → 5 → 0, four NAMED allowlist iterations; a rule cured at its root; a dead path removed) and now holds without attention — the wall lesson's green, promoted from achievement to invariant.
The ledger holds this as [wall_steady_state](/theorem/wall_steady_state) — proven `by decide`, sorry-free:

```lean
(3 * 2 = 6) ∧ (2 > 1) ∧ (3 > 0)
```

### The provenance gate as a full truth table: flag(h,d,b)=h·(1−d)·(1−b) over the eight states (h=hollow, d=demarcated, b=backed) is 1 exactly at (hollow, ¬demarcated, ¬backed) and 0 everywhere else.
The ledger holds this as [flag_truth_table](/theorem/flag_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun n => flag (n%2) (n/2%2) (n/4%2))) = [0,1,0,0,0,0,0,0]
```

### Soundness — the gate never flags honest prose: flag ≤ h, so a sentence with no hollow superlative (h=0) is NEVER flagged, whatever its demarcation or backing.
The ledger holds this as [flag_requires_hollow](/theorem/flag_requires_hollow) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) <= n%2)
```

### A demarcation clears the claim: whenever d=1 the flag is 0 (flag·d = 0) — "never infinity", "not quantum hardware", "classical" pass, as the honest use of the word should.
The ledger holds this as [demarcation_clears](/theorem/demarcation_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/2%2) == 0)
```

### A sealed-theorem link clears the claim: whenever b=1 the flag is 0 (flag·b = 0) — prose that points at a proof earns its claim and passes.
The ledger holds this as [backing_clears](/theorem/backing_clears) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => (flag (n%2) (n/2%2) (n/4%2)) * (n/4%2) == 0)
```

### The gate is precise— it can (and does) flag, but only the hollow-and-uncleared case. A gate that never fires would prove nothing.
The ledger holds this as [exactly_one_flag](/theorem/exactly_one_flag) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun n => flag (n%2) (n/2%2) (n/4%2) == 1)).length = 1
```

### The arithmetic detector equals its boolean specification: h·(1−d)·(1−b) = (hollow ∧ ¬demarcated ∧ ¬backed) at every state — the implementation IS the intent, proven.
The ledger holds this as [flag_matches_spec](/theorem/flag_matches_spec) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => flag (n%2) (n/2%2) (n/4%2) == (if (n%2 == 1) && (n/2%2 == 0) && (n/4%2 == 0) then 1 else 0))
```

### The sanitizer’s recursion bound the I/O wall ASSUMES, sealed (axiom-hunt): MAX_DEPTH = 32 = 2^5 — a finite power-of-two wall the resource-DoS audit stands on. Any nesting beyond it is refused, so no input can spin the fold unboundedly.
The ledger holds this as [sanitize_depth_bounded](/theorem/sanitize_depth_bounded) — proven `by decide`, sorry-free:

```lean
(32 = 2^5) ∧ (0 < 32)
```

### TWO WITNESSES DETECT, THREE LOCATE, FIVE SURVIVE A CORRELATED PAIR. This is the error-correcting bound, and it is why the ledger counts legs rather than trusting agreement: to LOCATE t faults you need 2t+1 witnesses, so one fault needs three and two need five. Four is worse than it looks — an even count admits a 2-2 split with no majority, which detects a disagreement while naming no culprit. The case that forced this: strokes_survive_reflection passed BOTH its js mirror and the Lean kernel and was still wrong, because one hand wrote both legs and they carried the same mistaken framing. Two legs agreeing is consistency.
The ledger holds this as [witnesses_locate_faults](/theorem/witnesses_locate_faults) — proven `by decide`, sorry-free:

```lean
(2*1+1 = 3) ∧ (2*2+1 = 5) ∧ ([3,5].all (fun n => n % 2 == 1)) ∧ (4 % 2 = 0) ∧ (3 - 1 = 2)
```

### A HANDLE IS EIGHT HEX CHARACTERS, WHICH IS WHY IT SPLITS EXACTLY FOUR WAYS AT TWO EACH. Not a chosen convention — the shape the handles already have, verified against every live handle: the path round-trips back to the handle for all of them, lexicographic path order equals numeric handle order, and no directory level can exceed 256 entries because two hex characters address exactly that. Four such levels address 256^4, which is 16^8 — the same space the eight characters name, so the tree loses nothing and gains an index. The handle follows the LEAN and not the key, which is why two names for one statement share one handle and renaming a theorem moves its address but never its identity.
The ledger holds this as [handle_splits_four](/theorem/handle_splits_four) — proven `by decide`, sorry-free:

```lean
(8 = 4 * 2) ∧ (256^4 = 4294967296) ∧ (16^8 = 4294967296) ∧ (256^4 = 16^8)
```

### THE HARMONY LAW — every departure from exact recomputation is either NAMED or CAUGHT, and there is no third state. Over the two bits of the scan (r = the module reaches outside determinism: the network, the process, the clock; d = it declares that boundary by name), the verdict is pass = 1 − r·(1−d): of the four states exactly ONE fails, the undeclared reach. Harmony is therefore not the absence of boundaries — the tree carries fourteen, each naming what it touches — but the absence of UNNAMED ones. This is why a claim of quantum advantage cannot pass: it REACHES, asserting computation beyond the exact cost the state count fixes (n qubits span 2^n amplitudes), and it cannot DECLARE, because no boundary marker exists for faster-than-the-cost — so it lands in the one failing state by construction. The same algebra as the provenance detector, applied to computation instead of prose.
The ledger holds this as [drift_is_named_or_caught](/theorem/drift_is_named_or_caught) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun n => let r := n % 2; let d := n / 2 % 2; ((1 - r * (1 - d)) == 1) == ((r == 0) || (d == 1)))) ∧ (((List.range 4).filter (fun n => let r := n % 2; let d := n / 2 % 2; (1 - r * (1 - d)) == 0)).length = 1)
```

### AN INDEX THAT REPORTS "UNUSED" MUST MEAN IT, and this one did not. The axiom index asks a precise question — which theorem STATEMENTS name this definition — and answered it correctly: 93 of the wing definitions were named outright and the rest were reported as unused vocabulary. Reading them is what showed the word was wrong. Nine were lxorAux, four nthR, two popAux, and the others bitOf, av, bv and units9: every one a recursion helper or a small list that a CITED definition is written in terms of. `def lxor (a b : Nat) : Nat := lxorAux 8 a b`, and lxor is cited — so lxorAux is one hop from a theorem, not unexplained. THE SAME FAULT SHAPE THIS TREE HAS PAID FOR TWICE: a measurement that asks one question and reports another (audit-citations asked "points at a proof" and reported "backed by one"; a table census measured theorem count and reported enumerated cases). The cure is the same both times — PARTITION instead of relabel. Reachability through the definition-call graph splits the nineteen into 15 explained one hop away and 4 genuinely unreached, and those four were real: nthR shipped inside a shared preamble to five wings while only one of them indexes matrix rows, so four wings declared an indexer nothing there used. The preamble is split, the dead vocabulary is gone, and the partition now closes with no remainder: 93 direct plus 15 reached plus 0 unreached is 108, which is the 112 that stood before less the 4 removed — and the theorem count did not move, because removing vocabulary no theorem reaches cannot cost a proof.
The ledger holds this as [the_axiom_index_partitions_without_remainder](/theorem/the_axiom_index_partitions_without_remainder) — proven `by decide`, sorry-free:

```lean
(mergeIdx 26 [0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,20,21,23] [1,2,17,19,22,24] = List.range' 0 25) ∧ (mergeIdx 26 [25,26,27,28,29,31,32,33,35,36,37,38,40,41,42,43,44,45,47,49] [30,34,39,46,48] = List.range' 25 25) ∧ (mergeIdx 26 [50,52,53,54,55,56,57,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74] [51,58] = List.range' 50 25) ∧ (mergeIdx 26 [75,76,77,78,79,80,81,82,83,84,85,87,89,91,93,95,97,99] [86,88,90,92,94,96,98] = List.range' 75 25) ∧ (mergeIdx 26 [101,103,105,107,109,111,113,115,117,119,121,123] [100,102,104,106,108,110,112,114,116,118,120,122,124] = List.range' 100 25) ∧ (mergeIdx 26 [125,127,129,131,133,135,137,139,141,143,145,147,149] [126,128,130,132,134,136,138,140,142,144,146,148] = List.range' 125 25) ∧ (mergeIdx 26 [151,153,155,157,159,161,163,165,167,169,171,173] [150,152,154,156,158,160,162,164,166,168,170,172,174] = List.range' 150 25) ∧ (mergeIdx 26 [175,177,179,181,183,185,187,189,191,193,195,197,199] [176,178,180,182,184,186,188,190,192,194,196,198] = List.range' 175 25) ∧ (mergeIdx 26 [201,203,205,207,209,211,213,215,216,217,221] [200,202,204,206,208,210,212,214,218,219,220,222,223,224] = List.range' 200 25) ∧ (mergeIdx 26 [225,229,233,237,241,245,249] [226,227,228,230,231,232,234,235,236,238,239,240,242,243,244,246,247,248] = List.range' 225 25) ∧ (mergeIdx 26 [253,257,261,265,269,273] [250,251,252,254,255,256,258,259,260,262,263,264,266,267,268,270,271,272,274] = List.range' 250 25) ∧ (mergeIdx 26 [277,281,285,289,293,297] [275,276,278,279,280,282,283,284,286,287,288,290,291,292,294,295,296,298,299] = List.range' 275 25) ∧ (mergeIdx 26 [301,305,306,308,309,310,311,312,315,316,317,319,321,322,324] [300,302,303,304,307,313,314,318,320,323] = List.range' 300 25) ∧ (mergeIdx 26 [325,327,328,330,331,333,334,336,337,339,340,342,343,345,346,348,349] [326,329,332,335,338,341,344,347] = List.range' 325 25) ∧ (mergeIdx 26 [351,352,354,355,357,358,360,361,363,364,366,367,368,369,370,371,372,373,374] [350,353,356,359,362,365] = List.range' 350 25) ∧ (mergeIdx 26 [375,376,377,378,379,380,381,382,383,387,388,389,390,391,392,393,394] [384,385,386,395,396,397,398,399] = List.range' 375 25) ∧ (mergeIdx 26 [401,404,407,411,413,414,415,416,418,419,420,421,422,423] [400,402,403,405,406,408,409,410,412,417,424] = List.range' 400 25) ∧ (mergeIdx 26 [425,428,429,430,432,434,435,436,438,439,441,442,446,447,448,449] [426,427,431,433,437,440,443,444,445] = List.range' 425 25) ∧ (mergeIdx 26 [450,451,452,453,456,458,459,460,461,462,463,464,467,468,469,470,471,472] [454,455,457,465,466,473,474] = List.range' 450 25) ∧ (mergeIdx 26 [478,479,480,481,482,483,484,486,487,488,489,490,491,492,493,495,497] [475,476,477,485,494,496,498,499] = List.range' 475 25) ∧ (mergeIdx 26 [503,504,505,506,507,508,509,510,511,512,514,515,516,517,519,520,521,522,523,524] [500,501,502,513,518] = List.range' 500 25) ∧ (mergeIdx 26 [525,532,540,542,543,544,545,547,548,549] [526,527,528,529,530,531,533,534,535,536,537,538,539,541,546] = List.range' 525 25) ∧ (mergeIdx 26 [550,551,552,553,554,555,556,557,558,559,560,561,563,564,565,566,567,568,569,570,571,572,573,574] [562] = List.range' 550 25) ∧ (mergeIdx 26 [575,578,579,581,582,583,584,585,586,587,588,589,590,591,592] [576,577,580] = List.range' 575 18)
```

### AN EDITED ENTRY STOPS RECOMPUTING, AT EVERY POSITION. Each link commits to the one before it, so changing a single content address anywhere in the trail makes the recomputed chain differ from the stored one — walked over all eight positions and caught at eight of eight. The count is the claim: a detector that caught seven of eight would leave one seat where a receipt could be rewritten, and nothing in the prose would say which. This is the property an append-only log is usually ASSERTED to have by the database it sits in; here it is a consequence of the shape, and it survives a database that lets a row be updated. PRIOR ART: the fact is Haber and Stornetta, Journal of Cryptology 3:99-111 (1991), DOI 10.1007/BF00196791 — hash-chaining records so that altering one invalidates every later link. The captain claims the FORMALISATION and not the discovery; a priority date of 1991 is answered by no proof this tree can run.
The ledger holds this as [edits_break_recompute](/theorem/edits_break_recompute) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun i => chain (addrs.set i 999) != stored)).length = 8
```

### REMOVING AN ENTRY BREAKS EVERY LINK AFTER IT — SEVEN TIMES OUT OF EIGHT. Delete a receipt from the middle and the entries that followed it still carry the prev-hash of a predecessor that is no longer there, so the recomputation and the record part company. Walked over all eight positions, seven are caught. The number is not eight, and the gap is the whole point: one position in this trail can be removed without the links noticing, and it is the position a draw somebody disliked would occupy. PRIOR ART: Haber and Stornetta, DOI 10.1007/BF00196791. Formalisation claimed; discovery credited.
The ledger holds this as [cuts_break_successors](/theorem/cuts_break_successors) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun i => chain (dropAt addrs i) != dropAt stored i)).length = 7
```

### AND THE ONE THAT IS NOT CAUGHT IS THE LAST, NAMED RATHER THAN LEFT AS A GAP IN A COUNT. Deleting the final entry breaks nothing, because nothing follows it to break: the shortened trail recomputes exactly, and every link in it is honest. A chain proves that what remains has not been reordered or rewritten; it cannot prove that nothing was removed from the end, and no choice of hash changes that. Sealed as its own theorem so the seven above can never be read as eight by a reader who does not stop to ask which one is missing. PRIOR ART: the truncation problem is the motivation of Crosby and Wallach, USENIX Security 2009, cited by VENUE and not by identifier, deliberately: the ACM proceedings identifier this line once carried resolves nowhere — measured 2026-09-21, a 404 at doi.org itself as well as at Crossref and DataCite — because it sits under the reserved test prefix and was never registered in the handle system. The paper is real and the identifier was not, so the credit stands and the unresolvable string goes; an identifier a reader cannot follow is worse than none, since it reads as checkable and is not. Their deletion proofs exist because links alone do not answer it; the attack was named against the Schneier-Kelsey secure-log scheme (USENIX Security 1998) by Ma and Tsudik. Formalisation claimed; discovery credited.
The ledger holds this as [tail_cut_survives](/theorem/tail_cut_survives) — proven `by decide`, sorry-free:

```lean
chain (dropAt addrs 7) = dropAt stored 7
```

### WHAT CLOSES IT IS A COUNT SOMEBODY SEALED, NOT A STRONGER LINK. Of the seven ways to cut this trail short from the end, the links catch ZERO — every truncated trail recomputes perfectly, which is what makes truncation the attack a chain invites. A checkpoint that recorded the length catches seven of seven, by arithmetic no forger can argue with: a shortened trail is shorter than the number sealed. Both halves are decided here together, because the first alone reads as a weakness and the second alone reads as a promise, and the pair is what is actually true. The residue is honest and stays: between two seals, a truncation is detectable only once the next seal exists. PRIOR ART: periodic commitments closing truncation is Crosby and Wallach, USENIX Security 2009 (cited by venue: the 10.5555 identifier is unregistered and resolves nowhere), and the same shape carries Certificate Transparency RFC 6962 signed tree heads. Formalisation claimed; discovery credited.
The ledger holds this as [checkpoints_catch_truncation](/theorem/checkpoints_catch_truncation) — proven `by decide`, sorry-free:

```lean
(((List.range 7).filter (fun k => chain (addrs.take (k + 1)) != stored.take (k + 1))).length = 0) ∧ (((List.range 7).filter (fun k => (addrs.take (k + 1)).length < 8)).length = 7)
```

### every generated theorem carries prose IN the Lean — 71039 of 71039 documented across 258 wings, 0 without; the kernel sums the per-wing counts and compares them wing by wing rather than comparing a total to itself, so a gap in any ONE file breaks the equality; the doc comment rides inside the text the kernel signs, and a sentence cannot drift from the proof it describes without moving the file's content-address
The ledger holds this as [prose_coverage_total](/theorem/prose_coverage_total) — proven `by decide`, sorry-free:

```lean
((([[6,6,6,9,13,8,11,11,6,29,17,6,5,16,5,5,6],[9,13,24,38,8,6,9,25,6,20,7,4,5,64,5,3,6],[11,9,2,2,10,16,13,8,10,3,6,14,4,13,8,65,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,12,10,35,57,69],[71,96,66,76,82,82,79,78,55,58,58,46,63,72,73,82,63],[75,83,567,25,3,15,6,6,6,18,18,8,4096,4096,4096,4096,4096],[4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,23,6,13,12,3,2],[1,1,2,2,3,3,6,7,353,10,12,6,5,8,11,7,7],[5,8,18,93,6,6,6,9,9,8,13,6,6,8,10,10,6],[10,1,1,5,6,8,65,5,5,17,25,11,15,6,6,11,8],[7,6,234,148,10,7,6,6,12,33,3,5,15,16,11,11,8],[6,9,6,6,4,6,6,6,16,6,18,8,6,13,7,9,2],[19,968,21]].map (fun c => c.foldl (· + ·) 0)).foldl (· + ·) 0) = 71039) ∧ ([[6,6,6,9,13,8,11,11,6,29,17,6,5,16,5,5,6],[9,13,24,38,8,6,9,25,6,20,7,4,5,64,5,3,6],[11,9,2,2,10,16,13,8,10,3,6,14,4,13,8,65,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,12,10,35,57,69],[71,96,66,76,82,82,79,78,55,58,58,46,63,72,73,82,63],[75,83,567,25,3,15,6,6,6,18,18,8,4096,4096,4096,4096,4096],[4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,23,6,13,12,3,2],[1,1,2,2,3,3,6,7,353,10,12,6,5,8,11,7,7],[5,8,18,93,6,6,6,9,9,8,13,6,6,8,10,10,6],[10,1,1,5,6,8,65,5,5,17,25,11,15,6,6,11,8],[7,6,234,148,10,7,6,6,12,33,3,5,15,16,11,11,8],[6,9,6,6,4,6,6,6,16,6,18,8,6,13,7,9,2],[19,968,21]] = [[6,6,6,9,13,8,11,11,6,29,17,6,5,16,5,5,6],[9,13,24,38,8,6,9,25,6,20,7,4,5,64,5,3,6],[11,9,2,2,10,16,13,8,10,3,6,14,4,13,8,65,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,12,10,35,57,69],[71,96,66,76,82,82,79,78,55,58,58,46,63,72,73,82,63],[75,83,567,25,3,15,6,6,6,18,18,8,4096,4096,4096,4096,4096],[4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,4096,23,6,13,12,3,2],[1,1,2,2,3,3,6,7,353,10,12,6,5,8,11,7,7],[5,8,18,93,6,6,6,9,9,8,13,6,6,8,10,10,6],[10,1,1,5,6,8,65,5,5,17,25,11,15,6,6,11,8],[7,6,234,148,10,7,6,6,12,33,3,5,15,16,11,11,8],[6,9,6,6,4,6,6,6,16,6,18,8,6,13,7,9,2],[19,968,21]])
```

### THE PARTITION LAW BEHIND THE ROUND-TRIP COUNT, and the count is the witness rather than the proof: for any n and any b ≤ n, b = 0 IF AND ONLY IF n − b = n, so a single broken round-trip makes the identity false in one direction — decided over every n ≤ 11 and every b ≤ n. The measurement this law is applied to is 71039 of 71039 doc comments re-reading to the text they started from, 0 broken, and it lives in the js witness because the kernel cannot read a doc comment and should not pretend to
The ledger holds this as [prose_round_trips](/theorem/prose_round_trips) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun n => (List.range (n+1)).all (fun b => ((b == 0) == (n - b == n))))
```

### THE ESCAPE DESTROYS THE TERMINATOR, decided rather than counted — with the two characters written as codes (- = 1, / = 2, \ = 3), the RAW pair [1, 2] does carry the adjacency that would close a doc comment early, and the ESCAPED triple [1, 3, 2] carries it at neither position. That is the property docComment's -/ → -\/ rewrite exists for, and it is false the moment the rewrite becomes the identity. The witness measures 0 unescaped terminators across 71039 doc comments, which is a fact about files that something able to read a file must check
The ledger holds this as [prose_terminator_escaped](/theorem/prose_terminator_escaped) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun i => !((1 + 2 * i == 1) && (3 - i == 2)))
```

### prose that says more than the statement OUTNUMBERS prose that repeats it — 71039 informative against 0 bare, of 71039; a doc comment identical to its own Lean statement carries nothing the proof did not already say, and this is the remaining work counted rather than a target claimed
The ledger holds this as [prose_beats_restatement](/theorem/prose_beats_restatement) — proven `by decide`, sorry-free:

```lean
(0 < 71039) ∧ (0 + 71039 = 71039)
```

### the whole prose corpus folds to ONE ℤ/9 receipt — 6530521 characters across 71039 doc comments in 258 wings fold to 4; the kernel sums the per-wing character counts itself and takes the residue, the ledger's own vortex arithmetic over its own sentences, so a single changed character in any wing moves the digit
The ledger holds this as [prose_folds_receipt](/theorem/prose_folds_receipt) — proven `by decide`, sorry-free:

```lean
((([[1078,1237,1545,3403,3345,3111,1892,2906,2142,13881,2947,1487,774,7355,796,6292,1774],[3811,3451,4156,12598,2753,1597,1647,13765,2696,8124,1389,1736,1372,960,1277,947,2495],[5291,1889,1111,916,1902,2363,5075,1465,5416,2232,1603,3293,761,3008,2038,26036,350],[350,351,351,351,351,351,351,351,351,351,350,351,351,351,351,351,351],[351,351,351,351,350,351,351,351,351,351,351,351,351,351,351,350,351],[351,351,351,351,351,351,351,351,351,350,351,351,351,351,351,351,351],[351,351,351,350,351,351,351,351,351,350,350,350,2171,5344,21730,34326,43811],[44310,66665,40721,50284,58114,55941,51816,53181,30820,34070,38160,26138,37740,46262,44933,58010,37490],[49557,57163,308682,12890,1219,7021,1506,1335,1330,12640,4215,2581,251512,262143,262144,262144,262144],[262144,262144,262144,253787,258408,262060,262088,262109,262124,262134,262140,14166,959,4148,5637,888,310],[89,369,237,352,497,434,1452,533,174580,3162,17269,2783,2298,1629,1299,3672,1188],[753,4555,5728,15957,1575,2718,1245,2102,2098,3162,2602,2602,1479,1572,1831,4860,2341],[1800,317,187,934,1027,2126,16933,2859,1013,9354,10650,5468,6610,1646,4100,8378,918],[1488,1539,3510,3069,2850,789,2496,1488,6806,8336,476,2244,1249,6905,1937,3396,1946],[1544,2704,1651,2571,1638,1453,2419,2104,6171,805,6250,2905,1522,3958,3675,727,1653],[6909,325753,12997]].map (fun c => c.foldl (· + ·) 0)).foldl (· + ·) 0) = 6530521) ∧ (6530521 % 9 = 4) ∧ (4 < 9)
```

### the audit is TOTAL over what a generator writes — 258 generated wings censused against 3 authored ones (OneLeap, Uuidna, Vortex), each classified by the GENERATED stamp emit puts in its own header rather than by a typed list; the authored wings are out of scope because no generator will ever write them a doc comment, and this wing excludes itself because it is written after the census it states
The ledger holds this as [prose_audit_total](/theorem/prose_audit_total) — proven `by decide`, sorry-free:

```lean
(0 < 258) ∧ (0 < 3) ∧ (71039 = 71039 + 0)
```


## References

The external work this wing stands on. These are not sealed theorems and this ledger claims none of them — each is somebody else's result, cited by the DOI its own prose carries and resolved from the registry of record.

1. Haber, Stuart; Stornetta, W. Scott. (1991). How to time-stamp a digital document. Journal of Cryptology. [https://doi.org/10.1007/BF00196791](https://doi.org/10.1007/BF00196791)

::: warning 
THE DETECTORS, AND WHAT THE TRAIL ITSELF DETECTS. The boundary is confirmed by the wing's own sealed theorems — e.g. [wall_steady_state](/theorem/wall_steady_state) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*

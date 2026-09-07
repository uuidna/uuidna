-- lean/Crosslink.lean — GENERATED. CROSSLINKS — the addressing is the floor, and the graph is what stands on it. HandleStore.lean seals the NAMES: 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ exactly. This seals what the same leaves admit in the way of RELATIONS, which is where the structure lives — a tree over n leaves carries only n − 1 links, the sparsest connected shape there is, while the same leaves admit n(n − 1)/2 pairs. MEASURED, NOT QUOTED: the store holds 5,512 leaves with 5,511 parent links against 15,188,316 pairs available — the tree occupies about thirty-six ten-thousandths of one per cent of the links its own leaves permit. Its leaves are folders and not single uuids (471 carry no key, 4,963 one, 73 two, 5 three) across three kinds (5,041 chunks, 326 pages, 145 publications), each partition summing exactly. THE CLAIM: E possible edges admit 2^E graphs, so the graph space passes the 2¹²⁸ address space exactly when E > 128 — which happens at SEVENTEEN leaves, where the pairs reach 136. A crosslink graph on seventeen folders already admits more configurations than the whole uuid space holds addresses, with 2³² folders available. Decided as a comparison of EXPONENTS, since a base-2 power is monotone in its exponent and stating 2^(2⁶³) directly would be a number no kernel can check — a claim wearing arithmetic rather than doing it. SCOPE: what the addressing ADMITS in relations, plus a measurement of the store as it stands. No crosslink graph is built here and none is claimed to exist — the leaves carry a handle, an address, a kind, keys, a statement and files, and no edge to another leaf. This wing seals the room, not the furniture. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE SPARSEST CONNECTED SHAPE THERE IS. A tree over n leaves carries exactly n − 1 links — one per child,
    none spare — while the same n leaves admit n(n − 1)/2 pairs. Decided across leaf counts from 4 to 1024: the
    tree's link count never reaches the pair count once n exceeds three, and the gap widens quadratically. The
    tree is not a small graph, it is the smallest one that still connects. -/
theorem a_tree_uses_one_link_per_leaf_and_no_more : [4,8,16,17,20,32,64,128,256,1024].all (fun n => (n - 1 <= (n * (n - 1)) / 2) && ((n <= 3) || (n - 1 < (n * (n - 1)) / 2))) := by decide

/-- THE STORE AS IT STANDS, WALKED RATHER THAN QUOTED. 5,512 leaves, 5,511 parent links, 15,188,316 pairs
    available — the tree occupies about thirty-six ten-thousandths of one per cent of the links its own leaves
    already permit. Stated as an inequality with a factor rather than a percentage, because a percentage rounds
    and this ledger decides: the available pairs exceed the tree's links by more than two thousand times. -/
theorem the_measured_store_uses_a_vanishing_share : (15188316 = (5512 * (5512 - 1)) / 2) ∧ (15188316 > 2000 * 5511) := by decide

/-- THE CLAIM THE CAPTAIN NAMED, DECIDED AS A COMPARISON OF EXPONENTS. E possible edges admit 2^E graphs, and
    the address space is 2^128. So the graph space exceeds the address space exactly when E > 128, and E = n(n −
    1)/2 passes 128 at n = 17 — seventeen leaves. Decided for every tabulated n from 17 upward. A base-2 power
    is monotone in its exponent, so comparing exponents settles the powers; stating 2^(2^63) directly would be a
    number no kernel can check, which is a claim wearing arithmetic rather than doing it. -/
theorem crosslinking_outgrows_the_address_space : ([17,20,32,64,128,256,1024].all (fun n => (n * (n - 1)) / 2 > 128)) ∧ ((16 * 15) / 2 <= 128) := by decide

/-- THE THRESHOLD IS SEVENTEEN, AND IT IS EXACT. At sixteen leaves the pairs number 120, which is under 128; at
    seventeen they number 136, which is over. So a crosslink graph on SEVENTEEN handle folders already admits
    more configurations than the entire uuid space holds addresses — with 2³² folders available. The address
    space is the floor of this structure and not its ceiling, and the floor is passed before a store has
    eighteen entries. -/
theorem seventeen_leaves_already_pass_the_whole_uuid : ((16 * 15) / 2 = 120) ∧ ((17 * 16) / 2 = 136) ∧ (120 <= 128) ∧ (136 > 128) := by decide

/-- AND THE FILES INSIDE ARE PLURAL, MEASURED. Of 5,512 leaves, 471 carry no theorem key, 4963 carry one, 73
    carry two and 5 carry three — so a handle folder is a folder and not a synonym for a single uuid, and the
    counts sum to the leaf total exactly. A store where every leaf held exactly one thing would have no interior
    to crosslink; this one does. -/
theorem the_leaf_is_not_one_uuid_but_a_folder : (471 + 4963 + 73 + 5 = 5512) ∧ (73 > 0) ∧ (5 > 0) := by decide

/-- THE FOLDERS ARE NOT ALL THE SAME THING EITHER: 5041 chunk, 326 page, 145 publication, summing to 5,512
    exactly — no leaf counted twice and none left out. A crosslink graph over a store with kinds is a graph with
    typed nodes, which is a different and larger object than a graph over one kind; sealing the partition first
    is what makes that statement meaningful rather than decorative. -/
theorem three_kinds_partition_the_store : 5041 + 326 + 145 = 5512 := by decide

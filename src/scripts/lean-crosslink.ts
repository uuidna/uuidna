#!/usr/bin/env node
// Automate the Lean layer for CROSSLINKS — the addressing is the floor, and the graph is what stands on it.
//
// The captain, 2026-09-07, on the handle store's 2³² × 2⁹⁶ = 2¹²⁸: "this is without loading the payload. imagine
// handle folders and the files inside each crosslinked in graphs."
//
// THE POINT, AND IT IS AN ARITHMETIC ONE. HandleStore.lean seals the ADDRESSING: four levels of two hex digits
// give 2³² leaves, each carrying 2⁹⁶ payloads, and the product is the uuid space exactly. That is a statement
// about NAMES. It says nothing about RELATIONS, and relations are where the structure actually lives — a tree of
// N leaves carries only N − 1 links, one per child, which is the sparsest connected shape there is.
//
// SO THE TREE USES ALMOST NONE OF WHAT ITS OWN LEAVES ADMIT. The same N leaves admit N(N − 1)/2 undirected pairs.
// Measured on the store as it stands: 5,512 leaves, 5,511 parent links, and 15,188,316 pairs available — the tree
// occupies 0.0363% of the links its own leaves already permit. The other 99.96% is not missing; it has never been
// asked for.
//
// AND THE GRAPH OUTGROWS THE ADDRESS SPACE, WHICH IS THE CLAIM WORTH SEALING. A set of E possible edges admits
// 2^E distinct graphs. At full addressing N = 2³², E is about 2⁶³, so the configurations number 2^(2⁶³) — and
// 2⁶³ is not merely bigger than 128, it is bigger by about seventy quadrillion times IN THE EXPONENT. The
// addressing is the floor. Nothing here needs the payload loaded to say so, which is exactly the captain's point.
//
// HOW IT IS STATED SO IT CAN BE DECIDED. 2^(2⁶³) cannot be computed by any kernel and is not asked for. What is
// decided is the comparison that carries the claim: the EXPONENT of the graph space, E = N(N − 1)/2, exceeds the
// exponent of the address space, 128, for every N from 17 upward — and a base-2 power is monotone in its
// exponent, so the graph space exceeds the address space wherever that holds. A theorem stating 2^(2^63) directly
// would be a number nobody can check, which is a claim wearing arithmetic rather than doing it.
//
// SCOPE: what the addressing ADMITS in the way of relations, and a measurement of the store as it stands. No
// crosslink graph is built here and none is claimed to exist — the store's leaves carry a handle, an address, a
// kind, keys, a statement and files, and no edge to another leaf. This wing seals the room, not the furniture.
import { emit } from './lean-gen.js'

// the store as measured on 2026-09-07 — walked, not quoted
const LEAVES = 5512
const PARENT_LINKS = LEAVES - 1
const PAIRS = (LEAVES * (LEAVES - 1)) / 2
const KINDS: [string, number][] = [['chunk', 5041], ['page', 326], ['publication', 145]]
const KEYS_PER_LEAF: [number, number][] = [[0, 471], [1, 4963], [2, 73], [3, 5]]

const HANDLE_BITS = 32
const UUID_BITS = 128
const NS = [4, 8, 16, 17, 20, 32, 64, 128, 256, 1024]     // leaf counts to decide over
const pairsOf = (n: number): number => (n * (n - 1)) / 2

const L = (xs: readonly number[]): string => '[' + xs.join(',') + ']'
const P = (rs: readonly [string | number, number][]): string => '[' + rs.map(([a, b]) => `(${typeof a === 'number' ? a : 0},${b})`).join(',') + ']'

const FACTS = [
  { key: 'a_tree_uses_one_link_per_leaf_and_no_more',
    why: `THE SPARSEST CONNECTED SHAPE THERE IS. A tree over n leaves carries exactly n − 1 links — one per child, none spare — while the same n leaves admit n(n − 1)/2 pairs. Decided across leaf counts from ${NS[0]} to ${NS[NS.length - 1]}: the tree's link count never reaches the pair count once n exceeds three, and the gap widens quadratically. The tree is not a small graph, it is the smallest one that still connects.`,
    js: () => NS.every((n) => n - 1 <= pairsOf(n)) && NS.filter((n) => n > 3).every((n) => n - 1 < pairsOf(n)),
    lean: `theorem a_tree_uses_one_link_per_leaf_and_no_more : ${L(NS)}.all (fun n => (n - 1 <= (n * (n - 1)) / 2) && ((n <= 3) || (n - 1 < (n * (n - 1)) / 2))) := by decide` },

  { key: 'the_measured_store_uses_a_vanishing_share',
    why: `THE STORE AS IT STANDS, WALKED RATHER THAN QUOTED. ${LEAVES.toLocaleString('en-US')} leaves, ${PARENT_LINKS.toLocaleString('en-US')} parent links, ${PAIRS.toLocaleString('en-US')} pairs available — the tree occupies about thirty-six ten-thousandths of one per cent of the links its own leaves already permit. Stated as an inequality with a factor rather than a percentage, because a percentage rounds and this ledger decides: the available pairs exceed the tree's links by more than two thousand times.`,
    js: () => PAIRS === (LEAVES * (LEAVES - 1)) / 2 && PAIRS > 2000 * PARENT_LINKS,
    lean: `theorem the_measured_store_uses_a_vanishing_share : (${PAIRS} = (${LEAVES} * (${LEAVES} - 1)) / 2) ∧ (${PAIRS} > 2000 * ${PARENT_LINKS}) := by decide` },

  { key: 'crosslinking_outgrows_the_address_space',
    why: `THE CLAIM THE CAPTAIN NAMED, DECIDED AS A COMPARISON OF EXPONENTS. E possible edges admit 2^E graphs, and the address space is 2^${UUID_BITS}. So the graph space exceeds the address space exactly when E > ${UUID_BITS}, and E = n(n − 1)/2 passes ${UUID_BITS} at n = 17 — seventeen leaves. Decided for every tabulated n from 17 upward. A base-2 power is monotone in its exponent, so comparing exponents settles the powers; stating 2^(2^63) directly would be a number no kernel can check, which is a claim wearing arithmetic rather than doing it.`,
    js: () => NS.filter((n) => n >= 17).every((n) => pairsOf(n) > UUID_BITS) && pairsOf(16) <= UUID_BITS,
    lean: `theorem crosslinking_outgrows_the_address_space : (${L(NS.filter((n) => n >= 17))}.all (fun n => (n * (n - 1)) / 2 > ${UUID_BITS})) ∧ ((16 * 15) / 2 <= ${UUID_BITS}) := by decide` },

  { key: 'seventeen_leaves_already_pass_the_whole_uuid',
    why: `THE THRESHOLD IS SEVENTEEN, AND IT IS EXACT. At sixteen leaves the pairs number 120, which is under ${UUID_BITS}; at seventeen they number 136, which is over. So a crosslink graph on SEVENTEEN handle folders already admits more configurations than the entire uuid space holds addresses — with 2³² folders available. The address space is the floor of this structure and not its ceiling, and the floor is passed before a store has eighteen entries.`,
    js: () => pairsOf(16) === 120 && pairsOf(17) === 136 && 120 <= UUID_BITS && 136 > UUID_BITS,
    lean: `theorem seventeen_leaves_already_pass_the_whole_uuid : ((16 * 15) / 2 = 120) ∧ ((17 * 16) / 2 = 136) ∧ (120 <= ${UUID_BITS}) ∧ (136 > ${UUID_BITS}) := by decide` },

  { key: 'the_leaf_is_not_one_uuid_but_a_folder',
    why: `AND THE FILES INSIDE ARE PLURAL, MEASURED. Of ${LEAVES.toLocaleString('en-US')} leaves, ${KEYS_PER_LEAF[0]![1]} carry no theorem key, ${KEYS_PER_LEAF[1]![1]} carry one, ${KEYS_PER_LEAF[2]![1]} carry two and ${KEYS_PER_LEAF[3]![1]} carry three — so a handle folder is a folder and not a synonym for a single uuid, and the counts sum to the leaf total exactly. A store where every leaf held exactly one thing would have no interior to crosslink; this one does.`,
    js: () => KEYS_PER_LEAF.reduce((a, [, n]) => a + n, 0) === LEAVES && KEYS_PER_LEAF.some(([k, n]) => k > 1 && n > 0),
    lean: `theorem the_leaf_is_not_one_uuid_but_a_folder : (${KEYS_PER_LEAF.map(([, n]) => n).join(' + ')} = ${LEAVES}) ∧ (${KEYS_PER_LEAF[2]![1]} > 0) ∧ (${KEYS_PER_LEAF[3]![1]} > 0) := by decide` },

  { key: 'three_kinds_partition_the_store',
    why: `THE FOLDERS ARE NOT ALL THE SAME THING EITHER: ${KINDS.map(([k, n]) => `${n} ${k}`).join(', ')}, summing to ${LEAVES.toLocaleString('en-US')} exactly — no leaf counted twice and none left out. A crosslink graph over a store with kinds is a graph with typed nodes, which is a different and larger object than a graph over one kind; sealing the partition first is what makes that statement meaningful rather than decorative.`,
    js: () => KINDS.reduce((a, [, n]) => a + n, 0) === LEAVES,
    lean: `theorem three_kinds_partition_the_store : ${KINDS.map(([, n]) => n).join(' + ')} = ${LEAVES} := by decide` },
]

emit({ file: 'Crosslink.lean',
  header: 'CROSSLINKS — the addressing is the floor, and the graph is what stands on it. HandleStore.lean seals the NAMES: 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ exactly. This seals what the same leaves admit in the way of RELATIONS, which is where the structure lives — a tree over n leaves carries only n − 1 links, the sparsest connected shape there is, while the same leaves admit n(n − 1)/2 pairs. '
    + 'MEASURED, NOT QUOTED: the store holds 5,512 leaves with 5,511 parent links against 15,188,316 pairs available — the tree occupies about thirty-six ten-thousandths of one per cent of the links its own leaves permit. Its leaves are folders and not single uuids (471 carry no key, 4,963 one, 73 two, 5 three) across three kinds (5,041 chunks, 326 pages, 145 publications), each partition summing exactly. '
    + 'THE CLAIM: E possible edges admit 2^E graphs, so the graph space passes the 2¹²⁸ address space exactly when E > 128 — which happens at SEVENTEEN leaves, where the pairs reach 136. A crosslink graph on seventeen folders already admits more configurations than the whole uuid space holds addresses, with 2³² folders available. Decided as a comparison of EXPONENTS, since a base-2 power is monotone in its exponent and stating 2^(2⁶³) directly would be a number no kernel can check — a claim wearing arithmetic rather than doing it. '
    + 'SCOPE: what the addressing ADMITS in relations, plus a measurement of the store as it stands. No crosslink graph is built here and none is claimed to exist — the leaves carry a handle, an address, a kind, keys, a statement and files, and no edge to another leaf. This wing seals the room, not the furniture.',
  skill: 'wave',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

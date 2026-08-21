#!/usr/bin/env node
// Automate the Lean layer for the EDITOR — the SERIALIZER CONTRACT of a content-addressed document (a Lexical-shaped
// node tree, serialized to a node SEQUENCE and folded to one address). The honest distinction from the memory store:
// a store is a SET, so its fold is order-INVARIANT; a document is a SEQUENCE, so its fold must be order-SENSITIVE —
// reordering paragraphs is a different document. This proves exactly that opposite law by decide, on a positional fold
// dfold (base-8 Horner, the same shape a merkle root realizes without bound): reordering distinct nodes MOVES the fold,
// a changed node MOVES it, and on the bounded model the fold is INJECTIVE (the address determines the node sequence).
// injective only where it cannot overflow (bounded values, fixed length); the real content-address
// (merkleRoot over uuids, in src/editor.ts) is collision-RESISTANT, not collision-FREE — by pigeonhole 2^128 addresses
// < all documents. The arithmetic of the document fold, NOT a rich-text engine. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

// dfold — the positional (order-SENSITIVE) document fold, mirrored in JS to self-check every fact before a line is
// written. base 8 > every node value below, so on a fixed length it is base-8 place value: injective, order-carrying.
const dfold = (l: number[]): number => (l.length === 0 ? 0 : l[0] + 8 * dfold(l.slice(1)))
const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i) // [a, b)

// The Lean definition of dfold — structural recursion over List (axiom-free, like nth: no propext under `by decide`).
const DFOLD_DEF = `-- dfold — the positional, ORDER-SENSITIVE document fold. A document is a SEQUENCE (order is identity), so unlike the
-- memory store's order-invariant fold this one CARRIES position: base 8 > every node value below, so on a fixed length
-- it is base-8 place value — reordering or changing a node moves the number. Structural recursion over List, axiom-free.
def dfold : List Nat → Nat
  | [] => 0
  | x :: xs => x + 8 * dfold xs`

const FACTS = [
  { key: 'editor_empty_doc_folds_zero',
    name: "the empty document folds to zero — the identity a fresh editor starts from, before a single node is authored",
    js: () => dfold([]) === 0,
    lean: 'theorem editor_empty_doc_folds_zero : dfold [] = 0 := by decide' },

  { key: 'editor_fold_order_sensitive',
    name: "a document is a SEQUENCE, not a set — reordering two DISTINCT nodes MOVES the address (the opposite of the memory store's order-invariant fold): for all a,b, either a=b or dfold [a,b] ≠ dfold [b,a]",
    js: () => R(0, 8).every((a) => R(0, 8).every((b) => a === b || dfold([a, b]) !== dfold([b, a]))),
    lean: 'theorem editor_fold_order_sensitive : (List.range 8).all (fun a => (List.range 8).all (fun b => (a == b) || (dfold [a,b] != dfold [b,a]))) := by decide' },

  { key: 'editor_fold_change_sensitive',
    name: "a document refuses DRIFT — a changed node MOVES the address: the three-node fold is unchanged iff the changed node is unchanged, so any edit to a node is visible in the fold (tamper-evident)",
    js: () => R(0, 8).every((a) => R(0, 8).every((a2) => R(0, 8).every((b) => R(0, 8).every((c) => (dfold([a, b, c]) === dfold([a2, b, c])) === (a === a2))))),
    lean: 'theorem editor_fold_change_sensitive : (List.range 8).all (fun a => (List.range 8).all (fun a2 => (List.range 8).all (fun b => (List.range 8).all (fun c => (dfold [a,b,c] == dfold [a2,b,c]) == (a == a2))))) := by decide' },

  { key: 'editor_fold_injective_bounded',
    name: "on the bounded model the fold is INJECTIVE — the address DETERMINES the node sequence: two three-node documents fold equal iff they are the same document, node for node (order and content). injective only where it cannot overflow; the real merkleRoot fold is collision-RESISTANT, not collision-free (pigeonhole: 2^128 < all documents)",
    js: () => R(0, 6).every((a) => R(0, 6).every((b) => R(0, 6).every((c) => R(0, 6).every((a2) => R(0, 6).every((b2) => R(0, 6).every((c2) => (dfold([a, b, c]) === dfold([a2, b2, c2])) === (a === a2 && b === b2 && c === c2))))))),
    lean: 'theorem editor_fold_injective_bounded : (List.range 6).all (fun a => (List.range 6).all (fun b => (List.range 6).all (fun c => (List.range 6).all (fun a2 => (List.range 6).all (fun b2 => (List.range 6).all (fun c2 => (dfold [a,b,c] == dfold [a2,b2,c2]) == ((a == a2) && (b == b2) && (c == c2))))))) ) := by decide' },
]

emit({
  file: 'Editor.lean',
  header: 'The document fold — the serializer contract of a content-addressed document (a node SEQUENCE), proven ORDER-SENSITIVE (reordering moves the address, unlike the memory store\'s order-invariant fold), change-sensitive, and bounded-injective (the address determines the node sequence).',
  facts: FACTS,
  defs: DFOLD_DEF,
  skill: 'editor',
})

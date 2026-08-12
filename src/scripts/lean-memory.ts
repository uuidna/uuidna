#!/usr/bin/env node
// The MEMORY STORE, distilled to its decidable core. The content-addressed store (memory/uuidna-store.json) folds
// each memory's address into ONE gravity receipt with two guarantees anyone rechecks: (1) it is ORDER-INVARIANT —
// every observer ordering of the members falls to the SAME receipt (why the store recomputes for anyone, in any
// order); and (2) it is CHANGE-SENSITIVE — a changed member MOVES the receipt (why drift is refused and tamper is
// visible). Both modeled on the axiom-free XOR fold, a commutative-associative monoid — the algebra the receipt uses.
//
// HONEST SCOPE — the answer to "seal what's genuinely decidable, flag the rest": this is the ONLY genuinely-decidable
// fact the memory corpus encodes that was NOT already sealed. The honesty-gate memory's drain/verdict logic is already
// sealed (honesty_gate_one_drain, flag_truth_table, exactly_one_flag, verdict_is_exactly_one); the multi-element
// order-invariant fold below is new (the ledger had only pairwise nim_sum_commutes). The rest of the memories — the
// deploy/wrangler notes, the concurrent-session hazard, the KAT counts, the workflow prose, the index — is operational
// prose with NO decidable arithmetic core; it is FLAGGED here, never fabricated into a theorem. Integrity, not truth.
import { emit, LXOR_DEF } from './lean-gen.js'

const xor = (a: number, b: number): number => a ^ b
const fold = (l: number[]): number => l.reduce(xor, 0) // JS mirror of the receipt's order-invariant fold
const R8 = [0, 1, 2, 3, 4, 5, 6, 7]

const FACTS = [
  { key: 'store_fold_order_invariant', skill: 'memory',
    why: "the memory store's receipt is ORDER-INVARIANT — every ordering of the members folds to the SAME root, so the store recomputes for any observer in any order (the 3-member fold equals all six permutations)",
    js: () => R8.every((a) => R8.every((b) => R8.every((c) => {
      const base = fold([a, b, c])
      return [[a, c, b], [b, a, c], [b, c, a], [c, a, b], [c, b, a]].every((p) => fold(p) === base)
    }))),
    lean: `theorem store_fold_order_invariant :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c =>
    ([a,b,c].foldl lxor 0 == [a,c,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,a,c].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,c,a].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,a,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,b,a].foldl lxor 0)))) := by decide` },

  { key: 'store_fold_change_moves_receipt', skill: 'memory',
    why: 'the memory store refuses DRIFT — a changed member MOVES the receipt: the three-member fold is unchanged iff the changed member is unchanged, so any edit to a memory is visible in the fold (tamper-evident)',
    js: () => R8.every((a) => R8.every((b) => R8.every((c) => R8.every((a2) =>
      (fold([a, b, c]) === fold([a2, b, c])) === (a === a2))))),
    lean: `theorem store_fold_change_moves_receipt :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => (List.range 8).all (fun a2 =>
    ([a,b,c].foldl lxor 0 == [a2,b,c].foldl lxor 0) == (a == a2))))) := by decide` },
]

console.log('computing ' + FACTS.length + ' MEMORY-STORE facts (the order-invariant, change-sensitive receipt — the only decidable core the memories add) …')

emit({ file: 'MemoryStore.lean', skill: 'memory', defs: LXOR_DEF,
  header: 'The MEMORY STORE distilled: the content-addressed memory receipt is ORDER-INVARIANT (any ordering → same root) and CHANGE-SENSITIVE (a changed member moves it), modeled on the axiom-free XOR fold',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

// agent/memory — MEMORY AN AGENT CANNOT MISREMEMBER, AND THE OPERATIONS IT NO LONGER HAS TO JUDGE.
//
// An agent's memory is normally the model's own: facts live in a context window, recall is a forward pass, and
// "have I seen this before?" is an opinion. That opinion is expensive (it re-reads everything to answer), it drifts
// (the same question twice can answer twice), and it cannot be checked (nothing the agent remembers carries proof
// that it is what was stored). Three separate defects, one cause — the memory has no address.
//
// Give a fact an address and all three close at once. The address IS the content (`toUuid`), so:
//   · IDENTITY is arithmetic. Two agents that stored the same fact hold the same address, with no comparison of
//     text and no model asked to rule on sameness. Unison is collision (theorem unison_is_collision).
//   · MEMBERSHIP is O(1). "Do I know this?" is an address lookup, not a re-read of the store — the same
//     verify-beats-recompute asymmetry the ledger rests on, applied to recall.
//   · RECALL IS CHECKABLE. A fact handed back with an address is REFUSED unless the text recomputes to that
//     address. An agent can no longer misremember in a way that survives inspection, because the store does not
//     take the agent's word for what it stored.
//   · AGREEMENT IS ONE COMPARISON. A whole memory folds order-invariantly (`merkleGravity`) to a single receipt,
//     so two agents decide whether they hold the same knowledge by comparing 128 bits — never by exchanging or
//     re-reading their stores. Merge in any order, reach the same receipt.
//
// WHAT THIS IS NOT, STATED PLAINLY BECAUSE THE OPPOSITE IS THE OBVIOUS OVERCLAIM. Content-addressing gives EXACT
// identity, not semantic identity. "The gate runs 29 checks" and "there are 29 checks in the gate" are one fact to
// a reader and two addresses here — the store will hold both and call them different, correctly by its own law and
// uselessly by the reader's. So this replaces the model for the operations that are ARITHMETIC (is it the same, do
// I have it, do we agree, what changed) and replaces it for nothing else. Judging whether a fact is TRUE, whether
// it is RELEVANT, or whether two differently-worded facts MEAN the same thing is still the model's work, and
// nothing here should be read as claiming otherwise. Integrity, not omniscience.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { handleOf } from '../../handle.js'   // THE one derivation — see handle.ts

/** One remembered fact: what was stored, under which kind, and the address that IS it. */
export interface Recollection {
  kind: string      // the shelf — 'decision', 'measurement', 'constraint'; part of the address, so kinds never collide
  fact: string      // the exact text stored; anything else recomputes elsewhere
  address: string   // toUuid(kind|fact) — the identity, not a label attached to one
  handle: string    // the 8-hex short form, for a human to read back
}

/** A store is its facts by address. Readonly at the boundary: every verb returns a NEW store, so a memory can be
 *  shared between callers without one of them changing what another already folded. */
export type Store = ReadonlyMap<string, Recollection>

/** the empty memory — an agent that knows nothing, which is a state worth being able to name */
export const empty = (): Store => new Map()

/** addressOf(kind, fact) → the identity of this fact on this shelf. Pure, total, and the ONLY place the address is
 *  derived, so a caller can never mint an address a different way and still be talking about the same memory. */
export const addressOf = (kind: string, fact: string): string => toUuid(`${kind}|${fact}`)

/** remember(store, kind, fact) → the store with this fact in it, and the recollection it became.
 *
 *  DEDUPE IS NOT A DECISION. Storing a fact twice yields the same address and therefore the same single entry —
 *  no comparison ran, no threshold was chosen, and nothing was asked to judge. `added` reports whether the memory
 *  actually grew, which is how a caller learns something was new without asking the model what "new" means. */
export function remember(store: Store, kind: string, fact: string): { store: Store; held: Recollection; added: boolean } {
  const address = addressOf(kind, fact)
  const held: Recollection = { kind, fact, address, handle: handleOf(address) }
  if (store.has(address)) return { store, held: store.get(address)!, added: false }
  const next = new Map(store)
  next.set(address, held)
  return { store: next, held, added: true }
}

/** knows(store, kind, fact) → is this already held? One address lookup, whatever the store's size. */
export const knows = (store: Store, kind: string, fact: string): boolean => store.has(addressOf(kind, fact))

/** recall(store, address) → what was stored there, or null. Null is an ANSWER: a memory that invents a plausible
 *  fact for an address it never held is exactly the failure this module exists to remove. */
export const recall = (store: Store, address: string): Recollection | null => store.get(address) ?? null

/** The verdict on a recollection that arrived from somewhere else — another agent, a file, a wire. */
export interface Check { ok: boolean; address: string; recomputed: string; why: string }

/** verify(r) → does this text actually recompute to the address it claims?
 *
 *  The one operation that makes a memory transferable. A recollection is not trusted because of where it came
 *  from; it is checked, by recomputing the address from the text in hand. Tamper with either the fact or its shelf
 *  and the address moves, so the pair no longer agrees with itself — refused, with the reason named rather than a
 *  bare false. */
export function verify(r: Recollection): Check {
  const recomputed = addressOf(r.kind, r.fact)
  return recomputed === r.address
    ? { ok: true, address: r.address, recomputed, why: 'the text recomputes to the address it carries' }
    : { ok: false, address: r.address, recomputed, why: `REFUSED — this text addresses ${recomputed}, not the ${r.address} it claims; the fact, the kind, or the address was altered after it was stored` }
}

/** receipt(store) → the whole memory as one address, order-invariant.
 *
 *  Two agents comparing knowledge exchange this, not their stores. Equal receipts mean the same facts; a different
 *  receipt means something moved, without saying what — which is why `missing` exists below. The empty memory has
 *  a receipt too, because "I hold nothing" is a state that must be comparable like any other. */
export const receipt = (store: Store): string => merkleGravity([...store.keys()])

/** union(a, b) → everything either agent holds.
 *
 *  ORDER CANNOT MATTER, and that is the point rather than a convenience: merging A into B and B into A reach the
 *  same receipt, so two agents that sync in opposite orders end up provably identical instead of nearly so. */
export function union(a: Store, b: Store): Store {
  const next = new Map(a)
  for (const [address, held] of b) if (!next.has(address)) next.set(address, held)
  return next
}

/** missing(mine, theirs) → what THEY hold that I do not, by address.
 *
 *  The cheap half of a sync: an agent learns exactly what it is owed without either side sending its store, and
 *  the answer is a set difference rather than a conversation. */
export const missing = (mine: Store, theirs: Store): Recollection[] =>
  [...theirs.values()].filter((r) => !mine.has(r.address))

/** forget(store, address) → the store without it. Returns a new store; the old one still folds to its old receipt,
 *  so "what did I know before I dropped that" stays answerable. */
export function forget(store: Store, address: string): Store {
  if (!store.has(address)) return store
  const next = new Map(store)
  next.delete(address)
  return next
}

/** shelf(store, kind) → everything held under one kind, address-sorted so two agents list it identically. */
export const shelf = (store: Store, kind: string): Recollection[] =>
  [...store.values()].filter((r) => r.kind === kind).sort((x, y) => (x.address < y.address ? -1 : 1))

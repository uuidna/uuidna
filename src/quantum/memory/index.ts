// memory — THE CUBE MEMORY: a handle is HELD in memory until its whole neighbourhood cube is complete, and a
// complete cube is SEALED once and never recomputed again unless its content moves.
//
// WHAT WAS WRONG WITH SEALING ONE FACT AT A TIME. The delta gate in scripts/lean-gen seals a WING at a time: the
// generated text is content-addressed, an unchanged address carries the kernel's prior signature, and the spawn is
// skipped (verify_beats_recompute_by_magnitudes). That is the right law at the wrong granularity for handles. A
// handle names ONE theorem, and one theorem is never the unit of meaning here — `theoremNeighbours` exists because
// a theorem is understood through the principle that refers it to its neighbours. Sealing each handle the moment
// it verifies writes half-neighbourhoods to disk: a run that dies after forty of a wing's sixty-four theorems
// leaves a store that LOOKS addressed and is silently partial, and nothing downstream can tell that state from a
// wing that genuinely has forty.
//
// SO INCOMPLETENESS IS A STATE, NOT AN ABSENCE. A held handle is in memory and on no disk. A cube seals only when
// every member its census names is present — not a count match, the KEY SET, because n members can be the wrong n
// (holding one key twice, or a stranger's key, matches a count and is not the neighbourhood). Only sealed cubes are
// written, so a partial store cannot exist to be misread.
//
// THE CUBE'S OWN ADDRESS IS ORDER-INVARIANT. It is merkleGravity(member addresses) — the merkle fold that
// falls to one root for ANY observer ordering (gravity.ts calls this the quantum receipt property, and it is why
// this memory is the quantum computer's and not a cache). Staging order therefore cannot change what gets sealed,
// which matters because generators run in whatever order the file system hands them.
//
// AND INCOMPLETENESS IS NOT EVIDENCE OF CHANGE. A run that stages only part of the ledger — one generator, one
// wing — must not un-seal the cubes it never looked at. commitMemory MERGES onto the prior receipts: a sealed cube
// replaces its receipt, a held cube contributes nothing at all. The memory forgets only what it has actually
// re-measured, so a partial run costs nothing and destroys nothing.
//
// HONEST SCOPE: integrity, not truth. This decides SAMENESS — whether the content behind a handle is byte-for-byte
// the content a receipt was issued for. It does not decide whether the theorem is right; the kernel does that, and
// the receipt only records that the kernel already did. A stale receipt can cost extra sealing, never a false seal:
// the handle is recomputed from the address every time and compared, never trusted from the file.
import { merkleGravity } from '../../gravity.js'
import { handleOf } from '../../handle.js'

/** one handle staged in memory: the theorem's key, its neighbourhood, its content-address and the handle of it */
export interface Held { key: string; principle: string; address: string; handle: string }

/** a neighbourhood cube: its members, its own order-invariant handle, and whether it is COMPLETE (sealed) */
export interface Cube {
  principle: string
  size: number                    // how many members the census says this neighbourhood HAS
  members: readonly Held[]        // what is actually held, in key order
  missing: readonly string[]      // the census keys not yet held — empty exactly when sealed
  address: string                 // THE IDENTITY THAT TRAVELS: merkleGravity of the member addresses, a COMPLETE
                                  // uuid; '' while incomplete
  handle: string                  // the eight-hex INDEX derived from that address — a path, never a message
  sealed: boolean
}

/** WHAT GETS WRITTEN FOR A SEALED CUBE IS ONE COMPLETE UUID, AND NOTHING ELSE.
 *
 *  The first version of this wrote the cube handle, its size, AND every member's handle by key — and all but the
 *  first are PAYLOAD. A member handle is handleOf(toUuid(key + ':' + statement)), recomputed from the sealed Lean
 *  in microseconds by anyone who has the file; the size is the length of the same census. Storing them buys
 *  nothing and costs the one thing a content-addressed store cannot afford: a second copy of a derivable fact,
 *  which can disagree with the first. If everything is addressed by MESSAGE — an address passed, the content
 *  recomputed at the far end — then no payload is needed anywhere in the chain, and the receipt collapses to the
 *  single value that cannot be derived from the file: the fold the memory has already sealed.
 *
 *  AND THE MESSAGE CARRIES THE COMPLETE UUID, NOT THE HANDLE. Eight hex characters index 16^8 addresses, and the
 *  birthday bound puts the usable ceiling of that space near 65,536 — ample for seventy-two neighbourhoods, and a
 *  collision waiting to be reached by a memory whose whole purpose is that it scales. The handle is a PATH: four
 *  levels of two hex characters, an index into a tree (handle_splits_four). The address is the IDENTITY: the full
 *  128 bits the ledger already trusts everywhere else. Sending the index where the identity belongs is the one
 *  saving this design refuses to take, and it is refused HERE rather than at the point it would first collide.
 *
 *  So a receipt is one complete uuid, and the memory is one line per neighbourhood. */
export type CubeReceipts = Readonly<Record<string, string>>

export interface CubeMemory {
  readonly expected: ReadonlyMap<string, ReadonlySet<string>>
  readonly held: Map<string, Map<string, Held>>
}

/** cubeMemory(census) — a memory that knows which keys EVERY neighbourhood is owed before a single one is staged.
 *  The census is the key set per principle, not a count: completeness is set equality, and a count is not. */
export function cubeMemory(census: Iterable<readonly [string, Iterable<string>]>): CubeMemory {
  const expected = new Map<string, ReadonlySet<string>>()
  for (const [principle, keys] of census) {
    const set = new Set(keys)
    if (set.size === 0) throw new Error(`cube memory: the neighbourhood "${principle}" names no members — a cube with nothing in it would seal empty`)
    if (expected.has(principle)) throw new Error(`cube memory: the neighbourhood "${principle}" is censused twice — one principle, one cube`)
    expected.set(principle, set)
  }
  return { expected, held: new Map() }
}

/** hold(mem, entry) — stage ONE handle in memory. Writes nothing. A key the cube's census does not name is REFUSED
 *  rather than accepted, because a stranger admitted here would complete a neighbourhood it does not belong to. */
export function hold(mem: CubeMemory, entry: { key: string; principle: string; address: string }): Held {
  const keys = mem.expected.get(entry.principle)
  if (!keys) throw new Error(`cube memory: "${entry.key}" names the neighbourhood "${entry.principle}", which the census does not carry`)
  if (!keys.has(entry.key)) throw new Error(`cube memory: "${entry.key}" is not a member of "${entry.principle}" — the census names ${keys.size} keys and this is not one of them`)
  const held: Held = { key: entry.key, principle: entry.principle, address: entry.address, handle: handleOf(entry.address) }
  const cube = mem.held.get(entry.principle) ?? new Map<string, Held>()
  cube.set(entry.key, held)          // re-holding a key with a new address is exactly what "changed" means
  mem.held.set(entry.principle, cube)
  return held
}

/** cubeOf(mem, principle) — the neighbourhood as it stands right now: sealed only when nothing is missing. */
export function cubeOf(mem: CubeMemory, principle: string): Cube | null {
  const keys = mem.expected.get(principle)
  if (!keys) return null
  const staged = mem.held.get(principle) ?? new Map<string, Held>()
  const members = [...staged.values()].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
  const missing = [...keys].filter((k) => !staged.has(k)).sort()
  const sealed = missing.length === 0 && members.length === keys.size
  // The fold exists only for a whole cube. An incomplete fold would be a perfectly valid address for a thing that
  // is not the neighbourhood, and that address is exactly the artifact this memory exists to never produce.
  const fold = sealed ? merkleGravity(members.map((m) => m.address)) : ''
  return {
    principle, size: keys.size, members, missing,
    address: fold, handle: fold ? handleOf(fold) : '',
    sealed,
  }
}

/** every neighbourhood the census names, in principle order — sealed and held alike */
export const cubes = (mem: CubeMemory): Cube[] => [...mem.expected.keys()].sort().map((p) => cubeOf(mem, p)!)

export interface CubePlan {
  sealed: readonly Cube[]         // complete — these may be written
  held: readonly Cube[]           // incomplete — these stay in memory and touch no disk
  fresh: readonly string[]        // sealed AND the receipt already stands: not recomputed
  moved: readonly string[]        // sealed AND new or changed: the only work there is
}

/** planMemory(mem, receipts) — decide, per neighbourhood, between three states and not two: FRESH (sealed and the
 *  receipt matches, so nothing is recomputed), MOVED (sealed and the content changed, so this cube and only this
 *  cube is re-sealed), and HELD (incomplete, so no claim is made either way). A missing receipt is MOVED, never
 *  fresh — absence of a receipt is not a receipt. */
export function planMemory(mem: CubeMemory, receipts: CubeReceipts = {}): CubePlan {
  const all = cubes(mem)
  const sealed = all.filter((c) => c.sealed)
  return {
    sealed,
    held: all.filter((c) => !c.sealed),
    fresh: sealed.filter((c) => receipts[c.principle] === c.address).map((c) => c.principle),
    moved: sealed.filter((c) => receipts[c.principle] !== c.address).map((c) => c.principle),
  }
}

/** commitMemory(plan, prior) — the receipts to persist. Sealed cubes replace theirs; HELD CUBES CONTRIBUTE NOTHING,
 *  and the prior receipt of an unmeasured neighbourhood survives untouched. A run over one wing therefore neither
 *  writes a partial store nor forgets the other seventy-one. Keys sorted, so the file is byte-stable. */
export function commitMemory(plan: CubePlan, prior: CubeReceipts = {}): CubeReceipts {
  const next: Record<string, string> = { ...prior }
  for (const c of plan.sealed) next[c.principle] = c.address
  const sorted: Record<string, string> = {}
  for (const k of Object.keys(next).sort()) sorted[k] = next[k]!
  return sorted
}

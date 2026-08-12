// reactor — the involutionary refusion reactor. Two motions, one recomputable run:
//
//   SNAPSHOT (fusion): a chosen set of SEALED theorems, spanning any domains, folds — order-invariantly — into ONE
//   superposition uuid. Per the design: the FIRST part of the uuid is the identity (the short handle you cite), and
//   the whole uuid superposes every point of view (each domain/skill axis contributes its own fold). Recompute the
//   same set and the same superposition returns, so digital DRIFT is refused: a changed member moves the uuid.
//
//   RECYCLE (refusion): the reactor never discards. A claim that is REFUTED (cites a proof that does not exist) or
//   UNVERIFIED (cites none) is not waste — it is fed back as MATERIAL, carrying the develop plan that says which new
//   aspect would seal its honest kernel. "Refuted" holds "re-fuse": the refusal is the start of the next fusion.
//
// HONEST SCOPE (integrity, not truth): the snapshot proves only that a set of sealed theorems folds to a
// recomputable address; the recycle plan is the honest NEXT, not a proof that the recycled claim is true. Nothing
// here decides truth — the ledger and the develop plan are recomputable by anyone. Integrity, not truth.
import { THEOREMS } from './theorems/index.js'
import { adjudicate } from './adjudicate.js'
import { merkleGravity } from './gravity.js'
import { toUuid } from './address.js'

const BY_KEY = new Map(THEOREMS.map((t) => [t.key, t]))

export interface Viewpoint { axis: 'principle' | 'skill'; name: string; count: number; fold: string }
export interface Snapshot {
  keys: string[]           // the theorem keys asked for
  members: string[]        // the ones that ARE sealed in the ledger (unknown keys are dropped and named)
  unknown: string[]        // keys that are not sealed — refused from the fusion (they would be drift)
  handle: string           // the FIRST part of the superposition uuid — the identity you cite
  superposition: string    // the whole uuid: every member's address folded, order-invariant — all points of view as one
  viewpoints: Viewpoint[]  // each domain (principle) and capability (skill) the set spans, folded on its own axis
  receipt: string
  honest: string
}

/** snapshot(keys) → the cross-domain FUSION: the sealed theorems among `keys` fold, order-invariantly, to one
 *  superposition uuid whose first segment is the identity handle; each principle and skill axis the set spans is a
 *  point of view folded on its own. Unknown keys are refused (named, not silently dropped) — that is drift refused. */
export function snapshot(keys: string[]): Snapshot {
  const seen = new Set<string>()
  const members: string[] = []
  const unknown: string[] = []
  for (const k of keys) {
    if (seen.has(k)) continue
    seen.add(k)
    ;(BY_KEY.has(k) ? members : unknown).push(k)
  }
  const addrs = members.map((k) => BY_KEY.get(k)!.address)
  const superposition = merkleGravity(addrs)
  const axisFold = (axis: 'principle' | 'skill'): Viewpoint[] => {
    const groups = new Map<string, string[]>()
    for (const k of members) {
      const t = BY_KEY.get(k)!
      const name = axis === 'principle' ? t.principle : t.skill
      ;(groups.get(name) ?? groups.set(name, []).get(name)!).push(t.address)
    }
    return [...groups].map(([name, a]) => ({ axis, name, count: a.length, fold: merkleGravity(a) }))
  }
  const viewpoints = [...axisFold('principle'), ...axisFold('skill')]
  return {
    keys, members, unknown,
    handle: superposition.slice(0, 8),
    superposition,
    viewpoints,
    receipt: merkleGravity([superposition, ...viewpoints.map((v) => v.fold)]),
    honest:
      'The first segment (handle) is the identity; the whole uuid superposes every member address, order-invariant, ' +
      'so the same set recomputes the same superposition and a changed member moves it — drift is refused. Unknown ' +
      'keys are named, not folded. A snapshot proves a recomputable fold of sealed theorems, not any new truth.',
  }
}

export interface ReactorCell {
  claim: string
  verdict: 'SEALED' | 'REFUTED' | 'UNVERIFIED'
  address: string
  develop: string[]        // for a recycled cell, the new aspects that would seal its honest kernel
}
export interface ReactorRun {
  cells: ReactorCell[]
  sealed: ReactorCell[]    // kept — the fusion holds
  recycled: ReactorCell[]  // REFUTED or UNVERIFIED — re-fused: each carries the develop plan (never discarded)
  handle: string
  superposition: string    // every cell's address folded — the run as one superposition uuid
  receipt: string
  honest: string
}

/** reactor(claims[, tests]) → the involutionary refusion run. Each claim is adjudicated (an optional decidable test
 *  by index can SEAL it); SEALED cells are kept, and REFUTED/UNVERIFIED cells are RECYCLED — returned with the
 *  develop plan that names the next aspect to seal, not discarded. The whole run folds to one superposition uuid
 *  (first segment the handle). Nothing is waste: refusal is the start of the next fusion. Recomputable by anyone. */
export function reactor(claims: string[], tests: (undefined | (() => boolean))[] = []): ReactorRun {
  const cells: ReactorCell[] = claims.map((claim, i) => {
    const v = adjudicate(claim, tests[i])
    return { claim, verdict: v.verdict, address: toUuid(claim), develop: v.develop }
  })
  const superposition = merkleGravity(cells.map((c) => c.address))
  const sealed = cells.filter((c) => c.verdict === 'SEALED')
  const recycled = cells.filter((c) => c.verdict !== 'SEALED')
  return {
    cells, sealed, recycled,
    handle: superposition.slice(0, 8),
    superposition,
    receipt: merkleGravity([superposition, toUuid('reactor:' + sealed.length + '/' + recycled.length)]),
    honest:
      'Nothing is discarded: a REFUTED cell (cites a proof that is not sealed) and an UNVERIFIED cell (cites none) ' +
      'are recycled — each returns with the develop plan naming the aspect that would seal its honest kernel. The ' +
      'recycle plan is the honest NEXT, not a proof the recycled claim is true. The run folds to one superposition uuid.',
  }
}

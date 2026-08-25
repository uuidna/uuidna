// upgrade-wave — HANDING OUT THE ANCHORING WORK, deterministically, so many hands can take it at once.
//
// (the captain's order, 2026-08-25: "automate upgrading all in a wave")
//
// WHAT AN UPGRADE IS. A theorem stands on five legs — symbol, proof, witness, falsifier, address — and the ledger
// mints the first, third and fifth by construction: the key names it, the kernel proves it, the fold addresses it.
// The other two are authored. A WITNESS is an independent confirmation that the statement means what its key
// says; a FALSIFIER is the mutation that must break it. waveCensus() counts them from the rows rather than from a
// number written here: almost every sealed theorem owes at least one authored leg, most owe both, and a bare
// handful stand on all five. A count frozen in prose is wrong on the next landing, so the census is the source
// and this sentence deliberately is not — the comments finder refused the first draft of it for exactly that.
//
// WHAT IS AUTOMATED HERE, AND WHAT DELIBERATELY IS NOT. Not the authoring. A witness and a falsifier are exactly
// the work that cannot be generated — a fabricated witness is a second name for the same claim, and a fabricated
// falsifier is a mutation nobody checked breaks anything. Either would be the overclaim the whole ledger exists
// to refuse, and wave.yml already states the law for the queue: no new claim enters from a cron, because a seal
// needs an author who can answer for it. The same holds one leg down.
//
// What IS automated is the DISTRIBUTION, which is the part that actually blocks parallel work. Four thousand
// pieces of work and no way to take a share of it without two agents colliding on the same theorem is why the
// conveyor reads 4,127 available and 0 pending: the work is nameable and not takeable.
//
// SHARDED BY THE THEOREM'S OWN HANDLE, so the assignment is a property of the ledger rather than of who asked
// first. laneOf(address, lanes) is the same key the executor trinity uses, and lanes.test.ts already measures it
// balanced over the live ledger — no lane carrying double its share, none empty. Two agents asking for lane 3 get
// the same list, forever, with no registry, no lock and no coordination: the address decides.
//
// PURE. No filesystem, no clock, no network — it reads the sealed rows and the ledger and returns an assignment.
// Nothing is claimed, reserved or written; taking the work is still an act a person or an agent performs.
import { mirrorRows, type Leg } from './rosetta-legs.js'
import { theorems } from './theorems/index.js'
import { laneOf, handleOf } from './handle.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'

/** the two legs that are AUTHORED — the ones an upgrade supplies. symbol, proof and address are minted. */
export const AUTHORED: readonly Leg[] = ['witness', 'falsifier'] as const

/** one piece of work: which theorem, what it owes, and which lane owns it */
export interface Upgrade {
  key: string
  wing: string
  owes: Leg[]          // 'witness', 'falsifier', or both — never a minted leg
  address: string
  handle: string
  lane: number
}

export interface WaveCensus {
  lanes: number
  total: number            // theorems owing at least one authored leg
  legs: number             // legs owed in total — the work, counted per leg rather than per theorem
  anchored: number         // theorems already standing on all five
  perLane: number[]        // how many theorems each lane carries
  receipt: string          // order-invariant fold of the assignment — two callers recompute the same wave
  honest: string
}

const HONEST =
  'The wave DISTRIBUTES work; it never authors it. A witness and a falsifier are the two legs a ledger cannot mint '
  + 'for itself — a fabricated witness is a second name for the same claim, and a fabricated falsifier is a mutation '
  + 'nobody checked breaks anything. The assignment is a pure function of each theorem\'s own address, so it is the '
  + 'same for every caller forever and needs no lock; taking the work remains an act with an author behind it.'

/** every theorem owing an authored leg, with the lane its own address puts it in */
export function upgrades(lanes = 14): Upgrade[] {
  const addr = new Map(theorems().map((t) => [t.key, t.address]))
  const out: Upgrade[] = []
  for (const r of mirrorRows()) {
    const owes = r.missing.filter((l): l is Leg => AUTHORED.includes(l))
    if (!owes.length) continue
    // a row whose key the ledger no longer holds cannot be addressed, so it cannot be assigned — and it is a
    // finding rather than a silent drop, which is why it takes the key's own fold instead of vanishing
    const address = addr.get(r.key) ?? toUuid('unaddressed:' + r.key)
    out.push({ key: r.key, wing: r.wing, owes, address, handle: handleOf(address), lane: laneOf(address, lanes) })
  }
  return out
}

/** THE LANE'S OWN SHARE. Deterministic and disjoint: every theorem lands in exactly one lane, decided by its
 *  address, so N agents may each take a lane and never collide without ever speaking to one another. */
export const laneWork = (lane: number, lanes = 14): Upgrade[] =>
  upgrades(lanes).filter((u) => u.lane === lane)

/** the whole wave, counted — what is owed, how it splits, and one receipt anyone recomputes */
export function waveCensus(lanes = 14): WaveCensus {
  const all = upgrades(lanes)
  const perLane = Array.from({ length: lanes }, (_, i) => all.filter((u) => u.lane === i).length)
  return {
    lanes,
    total: all.length,
    legs: all.reduce((n, u) => n + u.owes.length, 0),
    anchored: mirrorRows().length - all.length,
    perLane,
    // binds each theorem to the legs it owes, order-invariantly: a theorem gaining a witness moves the receipt
    receipt: merkleGravity(all.map((u) => toUuid(`${u.key}|${u.owes.join(',')}`))),
    honest: HONEST,
  }
}

/** render one lane's share for whoever is about to do it — the key, its wing, and exactly what it owes */
export function renderLane(lane: number, lanes = 14, limit = 20): string[] {
  const work = laneWork(lane, lanes)
  const out = [`lane ${lane} of ${lanes} — ${work.length} theorem(s), ${work.reduce((n, u) => n + u.owes.length, 0)} leg(s) owed`]
  for (const u of work.slice(0, limit)) out.push(`  ${u.key.padEnd(44)} ${u.wing.padEnd(18)} owes ${u.owes.join(' + ')}`)
  if (work.length > limit) out.push(`  … ${work.length - limit} more in this lane`)
  return out
}

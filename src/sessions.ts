// sessions — THE ROSTER, CARRIED BY THE LEDGER ITSELF (the captain's "sync all uuidna sessions from all
// devices using uuidna messaging"). All weekend the crews coordinated over unix sockets in /tmp — which works
// beautifully and only on ONE MACHINE: ListAgents says "on this machine" because that is all a socket can say.
// The transport that already spans every device is the one they all push to: origin. A session announces itself
// as a content-addressed entry, the janitor sweeps it like any derived file, and every device that fetches has
// the roster. No server, no daemon, no new infrastructure — the repo IS the message bus, which is what this
// ledger has been claiming about itself since the first receipt.
//
// LIVENESS WITHOUT A CLOCK — the hard part, and the house law that makes it interesting. A pid tells you a
// local process lives; nothing tells you a process on another machine does, and `Date` is refused everywhere in
// this tree. So staleness is measured in LEDGER DISTANCE: a session announces the theorem count it last saw,
// and a roster entry is stale when the ledger has moved further than DRIFT past it. Time is data; the ledger's
// own growth is the clock every device already agrees on, and it cannot be faked by a wrong system clock.
//
// a roster carries DECLARATIONS, never proof of life. An entry means "this session said this,
// at this ledger height" — it does not mean the session is still running, and nothing here should be read as
// authority. Coordination is still consent between crews; this only tells them who to ask.
import { toUuid } from './address.js'
import { handleOf } from './handle.js'

/** how far the ledger may move before a silent session is presumed gone. Nine theorems: about a wave's worth of
 *  work on a busy day, and the ring the whole tree counts in. A session that lands anything re-announces, so an
 *  active crew is never stale; only a silent one ages out. */
export const DRIFT = 9

export interface SessionEntry {
  handle: string      // the session's stable identity — its own content-address
  host: string        // which device; a machine name, never a person
  purpose: string     // what this crew is doing, in its own words
  head: string        // the commit it last announced at
  ledger: number      // the theorem count it saw — the clock every device shares
}

/** the identity of a session: host + purpose + the commit it began at, folded. Stable across its whole life,
 *  so re-announcing UPDATES an entry rather than multiplying it. */
export const sessionHandle = (host: string, purpose: string, bornAt: string): string =>
  handleOf(toUuid(`session:${host}|${purpose}|${bornAt}`))

/** announce(roster, entry) → the roster with this session's word taken as its latest. One entry per handle:
 *  a session speaks for itself and overwrites only itself, so no crew can edit another's line. */
export function announce(roster: readonly SessionEntry[], entry: SessionEntry): SessionEntry[] {
  const others = roster.filter((e) => e.handle !== entry.handle)
  return [...others, entry].sort((a, b) => (a.handle < b.handle ? -1 : a.handle > b.handle ? 1 : 0))
}

/** live(roster, ledgerNow) → the entries the ledger has not outrun. Pure, clockless, and the same answer on
 *  every device that has fetched the same origin — which is the property a socket could never have. */
export const live = (roster: readonly SessionEntry[], ledgerNow: number, drift = DRIFT): SessionEntry[] =>
  roster.filter((e) => ledgerNow - e.ledger <= drift)

export const stale = (roster: readonly SessionEntry[], ledgerNow: number, drift = DRIFT): SessionEntry[] =>
  roster.filter((e) => ledgerNow - e.ledger > drift)

/** depart(roster, handle) → a session that ends politely removes its own line. A crew that crashes leaves its
 *  entry to age out by drift instead — the same courtesy the lock extends to a dead pid. */
export const depart = (roster: readonly SessionEntry[], handle: string): SessionEntry[] =>
  roster.filter((e) => e.handle !== handle)

export interface Roster { entries: SessionEntry[]; receipt: string }
/** the roster folded to ONE address: two devices holding the same receipt hold the same roster, and a differing
 *  receipt is exactly the "diverged" signal the fused search already uses for the ledger. */
export const rosterReceipt = (entries: readonly SessionEntry[]): string =>
  handleOf(toUuid(entries.map((e) => `${e.handle}:${e.ledger}:${e.head}`).join('|')))

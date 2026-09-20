// theorem-record — A THEOREM IS KNOWN BY MANY NAMES, AND ALL OF THEM SURFACE. Four parts, and no fifth: NAME (what
// it is called, in every system that names it), DESCRIPTION (what it says, and what else stands where it stands),
// SOURCE (where it came from and what proved it), CITATION (how to name it so a gate accepts the naming).
//
// THE NAMES WERE ALREADY THERE AND NOWHERE SERVED. A theorem carried twelve fields and not one of them was the name
// theology gives it: theologyNameOf has been computable for every sealed address — the four-hex lattice station
// written in Hebrew, Greek and the Arabic abjad, each an exact numeral of the same station — and it was wired into
// no door, so a reader could not find a theorem by the name it has in those systems. Nothing here computes a new
// name; it serves the ones the ledger already decides.
//
// WHAT A NAME IS NOT (theology/names says this too, and it travels with the answer rather than being left behind):
// the station is where an address SEATS, an identity for the text and never its meaning. There are more sealed
// theorems than stations, so theorems share station names by construction — gematria_forces_collisions seals that —
// and a shared name is not a shared theorem. The key is the identifier; the station name is a coordinate.
import { theoremFor, theoremNeighbours, type Theorem } from './theorems/index.js'
import { theologyNameOf, type TheologyName } from './theology/names/index.js'
import { handleOf } from './handle.js'

export interface TheoremRecord {
  /** every name this theorem is known by — the key it is cited as, the prose name it was sealed with, the handle
   *  its address carries, and the lattice station written in each script that names stations */
  name: {
    key: string
    prose: string
    handle: string
    station: string
    theology: TheologyName['names']
    /** false only at station 0000, which no script writes: the rank rule starts at one */
    writable: boolean
  }
  /** what it says, and what else stands where it stands — the station's own science, asked for rather than assumed */
  description: {
    statement: string
    says: string
    skill: string
    principle: string
    /** the skills, principles and wings seated at this theorem's station, and the distance if read from a neighbour */
    seatedHere: TheologyName['meaning']
    /** the theorems its own principle groups it with — the applications nearest to hand */
    neighbours: { key: string; name: string }[]
  }
  /** where it came from and what proved it */
  source: {
    file: string
    lean: string
    tactic: string
    /** the content address of the reconstructed Lean LINE — the exact source text, narrower than the identity */
    lineAddress: string
  }
  /** how to name it so a gate accepts the naming — the honesty gate reads `theorem <key>` and `/theorem/<key>` */
  citation: {
    address: string
    cite: string
    href: string
  }
  honest: string
}

/** theoremRecord(key) → the four-part record, or null for a key the ledger does not seal. At the edge the row must
 *  have been fetched for this call (the pre-pass reads the keys a claim cites); an unfetched key reads as absent,
 *  which is a fact about the call and not about the ledger. */
export function theoremRecord(key: string, opts: { meaning?: boolean } = {}): TheoremRecord | null {
  const t: Theorem | undefined = theoremFor(key)
  if (!t) return null
  const named = theologyNameOf(t.address, { meaning: opts.meaning ?? true })
  const near = theoremNeighbours(key)
  return {
    name: {
      key: t.key,
      prose: String(t.name ?? ''),
      handle: handleOf(t.address),
      station: named.station,
      theology: named.names,
      writable: named.writable,
    },
    description: {
      statement: t.statement,
      says: String(t.name ?? ''),
      skill: t.skill,
      principle: t.principle,
      seatedHere: named.meaning,
      neighbours: near.neighbours.map((n) => ({ key: n.key, name: String(n.name ?? '') })),
    },
    source: {
      file: t.file,
      lean: t.lean,
      tactic: String((t as { tactic?: string }).tactic ?? ''),
      lineAddress: t.lineAddress,
    },
    citation: {
      address: t.address,
      cite: `theorem ${t.key}`,
      href: `/theorem/${t.key}`,
    },
    honest:
      'The KEY identifies the theorem; the station name is a COORDINATE. There are more sealed theorems than lattice ' +
      'stations, so theorems share station names by construction (gematria_forces_collisions), and the same letters ' +
      'reordered keep their value and move the address (gematria_ignores_order) — a shared name is never a shared ' +
      'theorem. Every name here is computed from what the ledger already seals; none is authored.',
  }
}

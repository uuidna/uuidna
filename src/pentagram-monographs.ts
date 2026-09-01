// pentagram-monographs — split the domain monographs into PENTAGRAMS, and let the split COMPUTE ITSELF. Nothing here
// is hand-assigned: the monographs are ordered by their own CONTENT-ADDRESS (recomputable by anyone from the same
// ledger), then chunked five to a pentagram. Each pentagram is WALKED in the {5/2} single-stroke order [0,2,4,1,3]
// (`pentagram_single_stroke`, `pentagram_closes_after_five`, `gcd 2 5 = 1`) — the star drawn in one stroke — while
// its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`): the walk is a sequence, the seal
// is a set. So the grouping is a surprise of the addresses.  (integrity, not
// truth): this is a content-addressed PARTITION — it claims no thematic kinship between the five in a pentagram,
// only that this is the split the addresses produce, and that anyone recomputes the same one.
import { publications, type Publication } from './publish.js'
import { merkleGravity } from './gravity/index.js'
import { starPolygon } from './cycles.js'

// The pentagram is the PRIME-NEIGHBOUR graph on five points: each point's neighbour is reached by the step 2 — the
// smallest prime, coprime to 5 (`gcd 2 5 = 1`) — so stepping neighbour-to-neighbour draws the whole star in ONE
// stroke and closes after exactly five (`pentagram_closes_after_five`). The prime neighbours compute the pentagram.
const PRIME_STEP = 2
const STROKE = starPolygon(5, PRIME_STEP).stroke // [0,2,4,1,3] — the prime-neighbour {5/2} traversal of the five points

export interface PentagramPoint { position: number; slug: string; title: string; count: number; address: string }
export interface Pentagram { index: number; complete: boolean; stroke: number[]; points: PentagramPoint[]; receipt: string }
export interface PentagramMonographs { pentagrams: Pentagram[]; count: number; full: number; remainder: number; receipt: string }

/** Split every monograph into pentagrams of five, the split computed from the content-addresses (sorted), each
 *  pentagram walked in {5/2} order and sealed order-invariantly. Zero-arg, recomputable — the same ledger yields the
 *  same pentagrams for everyone. */
export function pentagramMonographs(): PentagramMonographs {
  // ORDER BY CONTENT-ADDRESS — the split is the addresses' surprise.
  const sorted: Publication[] = publications().slice().sort((a, b) => (a.address < b.address ? -1 : a.address > b.address ? 1 : 0))

  const pentagrams: Pentagram[] = []
  for (let i = 0; i < sorted.length; i += 5) {
    const chunk = sorted.slice(i, i + 5)
    const complete = chunk.length === 5
    // WALK the five in {5/2} single-stroke order (only when the pentagram is complete — a partial star has no stroke)
    const walk = complete ? STROKE.map((k) => chunk[k]) : chunk
    const points: PentagramPoint[] = walk.map((p, position) => ({ position, slug: p.slug, title: p.title, count: p.count, address: p.address }))
    // SEAL order-invariantly — the pentagram's identity is its SET of five, independent of the walk (merkleGravity)
    const receipt = merkleGravity(chunk.map((p) => p.address))
    pentagrams.push({ index: pentagrams.length, complete, stroke: complete ? STROKE : [], points, receipt })
  }

  const full = pentagrams.filter((p) => p.complete).length
  // the whole corpus folds order-invariantly to ONE grand receipt over the pentagram receipts
  const receipt = merkleGravity(pentagrams.map((p) => p.receipt))
  return { pentagrams, count: sorted.length, full, remainder: sorted.length - full * 5, receipt }
}

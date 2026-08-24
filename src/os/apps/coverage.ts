// alpine port coverage — WHAT THE PORT READS, AGAINST WHAT ALPINE PUBLISHES, WITH "WE NEVER LOOKED" AND "IT CAME
// BACK EMPTY" KEPT APART.
//
// The catalogue report leads with a large, true number — tens of thousands of apps ported — and every figure in
// it is honest about ITSELF. What no figure in it states is its DENOMINATOR. Alpine publishes an APKINDEX for
// every (repo × architecture) pair on a branch; the port reads one architecture. Measured 2026-08-25 on
// latest-stable: 16 indexes published, 2 read. The report says `arch: "x86_64"` and so hides nothing, but a
// reader is left to know unaided that x86_64 is one of eight. A coverage fraction nobody computes is not a
// disclosure, and the number that sounds comprehensive is the one that most needs its denominator printed.
//
// THE FAILURE THIS EXISTS TO MAKE IMPOSSIBLE. `fetchRepoIndex` is best-effort by design and returns [] for a
// down mirror, a shape drift, or a decoder that cannot read the format — the same [] a genuinely empty
// repository would give. That is not hypothetical: APKINDEX.tar.gz is TWO concatenated gzip members, and the
// whole-buffer `DecompressionStream('gzip')` recipe decodes only the first (the signature), so every live read
// came back as an empty catalogue for as long as that recipe was in the path. os/apps was cured with a member
// search; AS OF THIS WRITING the same whole-buffer recipe still stands in os/packages and os/installs, each
// inside a catch, which is why this module treats "empty" as a claim requiring evidence rather than a result.
//
// THE DISCRIMINATOR IS THE SIZE OF THE THING THAT DECODED TO NOTHING. A published APKINDEX is half a megabyte
// or more. If the fetch returns a large body and the decoder yields zero packages, the repository is not empty —
// the READER is broken, and saying so is the difference between reporting an upstream and reporting yourself.
// A missing index (404, or nothing at the URL) is genuinely absent and says nothing about the decoder.
//
// So an index gets one of FOUR outcomes and never a boolean, because a boolean is where the two collapse:
//   unread       — the port does not cover this pair. Not a failure and NOT a pass; nothing was measured.
//   read         — decoded, n > 0. The only outcome that is evidence about Alpine.
//   absent       — no index published there. Evidence about Alpine, and a real answer.
//   undecodable  — a substantial body decoded to nothing. Evidence about US, reported as ours.
//
// `unread` is required rather than defaulted, and that is the whole point: a matrix cell with no evidence must
// render as no evidence. Every instrument that failed in this tree failed by rendering "not measured" as
// something else — a lock that never checked, a preflight that could not see, a VOID that read as not-a-failure.
import { toUuid } from '../../address.js'

/** Below this, a body is too small to be a real index — Alpine's smallest published APKINDEX is ~500 KB, and the
 *  gzip signature member alone (what the broken whole-buffer recipe returns) is a few hundred bytes. Anything
 *  between is neither, so the threshold is deliberately far from both and stated rather than tuned. */
export const SUBSTANTIAL_BYTES = 50_000

export type IndexOutcome = 'unread' | 'read' | 'absent' | 'undecodable'

export interface IndexCell {
  repo: string
  arch: string
  outcome: IndexOutcome
  /** packages decoded; meaningful only when `read` */
  packages: number
  /** body size the fetch reported; 0 when absent or unread */
  bytes: number
  /** why this outcome, in words — a cell always carries its own reason so a table never has to be interpreted */
  why: string
}

/** classifyIndex — the four-way decision, kept as a pure function so it can be tested without a network.
 *  `bytes` and `packages` are what the reader actually observed; `attempted` is whether it looked at all. */
export function classifyIndex(repo: string, arch: string, attempted: boolean, bytes: number, packages: number): IndexCell {
  if (!attempted) {
    // an unread cell MAY still carry bytes: probing an index (a HEAD) is not decoding it, and the two facts are
    // separate. Knowing a half-megabyte index is published there while never reading it is exactly the state
    // this audit exists to make sayable — it is the numerator's absence, not the denominator's.
    return { repo, arch, outcome: 'unread', packages: 0, bytes,
      why: bytes >= SUBSTANTIAL_BYTES
        ? `published (${bytes} bytes) but the port does not read this pair — nothing was measured here, which is neither a pass nor a failure`
        : 'the port does not cover this pair — nothing was measured, which is neither a pass nor a failure' }
  }
  if (packages > 0) {
    return { repo, arch, outcome: 'read', packages, bytes,
      why: `decoded ${packages} packages` }
  }
  if (bytes >= SUBSTANTIAL_BYTES) {
    // the case the whole module exists for: a half-megabyte index that decoded to nothing is a broken reader
    return { repo, arch, outcome: 'undecodable', packages: 0, bytes,
      why: `${bytes} bytes fetched and zero packages decoded — a published index is never this large and empty, so this is the READER failing, not an empty repository` }
  }
  return { repo, arch, outcome: 'absent', packages: 0, bytes,
    why: bytes === 0 ? 'nothing published at this path' : `only ${bytes} bytes — too small to be an index` }
}

export interface Coverage {
  branch: string
  /** every (repo × arch) pair considered, each with its own outcome and reason */
  cells: IndexCell[]
  published: number      // indexes Alpine actually serves (read + undecodable + any absent that had a body)
  read: number           // indexes this port decoded
  unread: number         // indexes never attempted
  undecodable: number    // indexes fetched substantial and decoded to nothing — OUR defect, counted separately
  /** breadth, as a fraction of what is published — the denominator the catalogue report never prints */
  breadth: number
  receipt: string
}

/** coverageOf(branch, cells) → the fold. `undecodable` is counted apart from `read` on purpose: rolling it into
 *  either one would restate a defect of ours as a fact about Alpine, in one direction or the other. */
export function coverageOf(branch: string, cells: IndexCell[]): Coverage {
  const n = (o: IndexOutcome): number => cells.filter((c) => c.outcome === o).length
  const read = n('read')
  const undecodable = n('undecodable')
  const unread = n('unread')
  // "published" counts every pair KNOWN to serve a real body, whatever we then did with it. Three cases fold in
  // here and each would otherwise flatter the fraction:
  //   · an index we failed to decode is still published — excluding it would make breaking the reader RAISE breadth
  //   · an index we never decoded but DID probe is still published — excluding it would let the port report 100%
  //     coverage by the simple method of never looking, which is the failure this module is named after
  //   · an index we never probed at all is NOT counted, in either direction. The audit may not credit itself with
  //     knowledge it did not acquire, and "we did not look" is not evidence that there was nothing to see.
  const published = cells.filter((c) => c.outcome === 'read' || c.bytes >= SUBSTANTIAL_BYTES).length
  const breadth = published === 0 ? 0 : read / published
  return {
    branch,
    cells,
    published,
    read,
    unread,
    undecodable,
    breadth,
    receipt: toUuid(`alpine-coverage|${branch}|${cells.map((c) => `${c.repo}/${c.arch}:${c.outcome}:${c.packages}`).sort().join('|')}`),
  }
}

// gate-receipt-compare — THE RECEIPT CHECK, WITH NO HOST IN IT.
//
// Deciding whether a green receipt still covers a tree is a comparison of two maps from path to digest. That is
// arithmetic over data, and it needs no filesystem, no git and no crypto — yet it lived inside
// gate-receipt-index, which imports node:crypto, node:fs, node:child_process and node:path EAGERLY. So the court
// could not carry the check: importing it dragged `path.join` into the browser bundle, the OS page died with
// "(0, m_.join) is not a function", and every ported API on that page went with it. The arm was moved to the CLI
// as a placement, and the captain named the real objection — that is a module written as though a host were the
// only place it would ever run, not a check that needs one.
//
// THE PRIME PATTERN, which this tree already uses for exactly this shape. primeCatalogue takes 7.3 MB of TSV and
// every accessor stays synchronous and pure afterwards; the load is split from the use, and the source of the
// bytes is the caller's business. Here the caller hands over the covers map — computed from the filesystem on
// Node, fetched or embedded in a tab — and the comparison is the same comparison either way.
//
// UNPRIMED IS ITS OWN ANSWER and the reason this file can be trusted in a gate: a host that has handed over
// nothing gets 'unprimed', never 'covered'. An unread source and a clean source return the same empty map, and a
// check that reads them alike is the instrument no_instrument_narrower_than_its_question forbids.

export type CoverVerdict =
  | { state: 'covered'; moved: [] }
  | { state: 'moved'; moved: string[] }
  | { state: 'unprimed'; moved: [] }

let PRIMED: Record<string, string> | null = null

/** primeTreeCovers(covers) → hand the check this host's digests. Idempotent; the same map is the same world. */
export const primeTreeCovers = (covers: Record<string, string>): void => { PRIMED = { ...covers } }

/** has anything been handed over? A gate asks this before trusting a verdict. */
export const coversPrimed = (): boolean => PRIMED !== null

/** forget them — for a caller that knows the tree moved under it */
export const forgetTreeCovers = (): void => { PRIMED = null }

/** coversMatch(want, have) → pure comparison. Every key in `have` must match `want`, or it names what moved. */
export function coversMatch(want: Record<string, string> | undefined, have: Record<string, string>): CoverVerdict {
  const moved = Object.keys(have).filter((k) => want?.[k] !== have[k]).sort()
  return moved.length ? { state: 'moved', moved } : { state: 'covered', moved: [] }
}

/** receiptCovers(want) → does the primed tree match this receipt? 'unprimed' when nobody has handed one over. */
export function receiptCovers(want: Record<string, string> | undefined): CoverVerdict {
  if (PRIMED === null) return { state: 'unprimed', moved: [] }
  return coversMatch(want, PRIMED)
}

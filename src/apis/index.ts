// @non-harmonic: this module ASKS THE OUTSIDE WORLD. fetch, async and await are here because a public API
// answers on its own uptime and in its own time, and no amount of arithmetic makes that recomputable. The
// boundary is named rather than hidden: everything downstream of the answer — the content-address, the handle,
// the ring position, the fold — is exact and deterministic, and `answered()` is the pure half that proves it by
// needing no network at all. What crosses this line is bytes; what leaves it is an address.
// apis — EVERY EXTERNAL ANSWER, HANDLED BY ITS HANDLE.
//
// The tree reaches roughly a dozen keyless public sources — crossref, openalex, semanticscholar, zenodo, nist,
// gutendex, arxiv, open-meteo, wikipedia and the European open-data hosts. They answer in their own shapes and
// on their own uptime, and none of that is ours. What IS ours is what happens next: an answer becomes a
// content-address, and the address's first eight hexbits are the handle it is known by from then on.
//
// WHY THE HANDLE AND NOT THE URL. A URL says where something was; a handle says what it was. The same query to
// the same host returns different bytes on different days, and two mirrors of one book return different bytes on
// the same day — measured: gutendex offers several plain-text URLs for a book and they do not fail together, one
// timing out while another serves 68,652 characters. So a fetch is recorded by what came back, never by where it
// was asked, and an answer that changed announces itself by changing its handle.
//
// HONEST SCOPE: this addresses and records. It does not verify the CLAIM an external source makes — corroborate
// does that, and only a Lean seal approves. A handle here proves these exact bytes arrived, nothing about
// whether they are true.
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'
import { valueOf, type HandleValue } from '../hexbit/index.js'

export interface Answered {
  host: string          // where it was asked
  url: string           // the exact endpoint that served, which may be a fallback mirror
  status: number
  bytes: number
  address: string       // the content-address of what came back
  handle: string        // its first eight hexbits — how the ledger names it
  place: HandleValue    // where that handle sits on the ring, and whether it walks or is trapped
}

/** address an answer that has already arrived — pure, so it is testable without a network. */
export const answered = (host: string, url: string, status: number, body: string): Answered => {
  const address = toUuid(body)
  const handle = handleOf(address)
  return { host, url, status, bytes: body.length, address, handle, place: valueOf(handle) }
}

/** ask a source and hand back its answer, addressed. Every failure is NAMED — a source that refused is recorded
 *  as refused rather than absent, because "no answer" and "never asked" are different facts. */
export const ask = async (url: string, ms = 9000): Promise<Answered | { host: string; url: string; refused: string }> => {
  const host = new URL(url).host
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(ms) })
    const body = await r.text()
    if (!r.ok) return { host, url, refused: `HTTP ${r.status}` }
    return answered(host, r.url || url, r.status, body)
  } catch (e) { return { host, url, refused: String((e as Error).message).slice(0, 60) } }
}

/** the same fold the ledger uses everywhere: many answers reduce to one handle, order-invariantly. */
export const foldAnswers = (all: readonly Answered[]): string =>
  handleOf(toUuid([...all].map((a) => a.address).sort().join('\n')))

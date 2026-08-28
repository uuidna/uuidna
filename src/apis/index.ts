// @non-harmonic: this module ASKS THE OUTSIDE WORLD. fetch, async and await are here because a public API
// answers on its own uptime and in its own time, and no amount of arithmetic makes that recomputable. The
// boundary is named rather than hidden: everything downstream of the answer — the content-address, the handle,
// the ring position, the fold — is exact and deterministic, and `answered()` is the pure half that proves it by
// needing no network at all. What crosses this line is bytes; what leaves it is an address.
// apis — EVERY EXTERNAL ANSWER, HANDLED BY ITS HANDLE.
//
// The tree reaches every keyless public source catalogued in public-apis.ts — crossref, openalex, semanticscholar,
// zenodo, nist, arxiv, mathoverflow, wikipedia, gutendex, open-meteo, wikinews, the EU education hosts, NOAA
// tides, and more. They answer in their own shapes and on their own uptime. What IS ours is what happens next:
// an answer becomes a content-address, and the address's first eight hexbits are the handle it is known by.
import { toUuid } from '../address.js'
import { hexbitDoorOf, type HexbitDoor } from '../hexbit/index.js'
export { publicApiRegistry, type PublicApiEntry, type PublicApiKind } from '../public-apis.js'

export interface Answered extends HexbitDoor {
  host: string          // where it was asked
  url: string           // the exact endpoint that served, which may be a fallback mirror
  status: number
  bytes: number
  address: string       // the content-address of what came back
}

/** address an answer that has already arrived — pure, so it is testable without a network. */
export const answered = (host: string, url: string, status: number, body: string): Answered => {
  const address = toUuid(body)
  return { host, url, status, bytes: body.length, address, ...hexbitDoorOf(address) }
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
  hexbitDoorOf(toUuid([...all].map((a) => a.address).sort().join('\n'))).handle

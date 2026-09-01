// @non-harmonic: reaches the NETWORK — a remote host answers or does not, and that is not decidable here.
//
// os/netapi — ONE NETWORK API OVER THE PORTED ALPINE NETWORK SURFACE.
//
// IT LIVES UNDER src/os BECAUSE THAT IS WHERE NON-DETERMINISM IS HONEST. The determinism hard-reject has no
// exemption anywhere else, and a fetch is the plainest impurity there is: the same call answers 200 today, 503
// tomorrow, and nothing at all on a train. src/os and src/drivers are the two NAMED boundary modules, so a
// network API belongs here by declaration rather than by argument — the captain's correction, 2026-09-01, when I
// had wrongly called this surface forbidden rather than bounded.
//
// Alpine publishes 332 network packages across 237 origins: curl, wget, socat, netcat, the DNS and TLS clients,
// the routing daemons. They fetch bytes from elsewhere, and every one of them leaves the same question open —
// ARE THESE THE BYTES THAT WERE PUBLISHED? A retrieval is not provenance. What arrives has no identity until
// something addresses it.
//
// So the one API is not "another fetch". It is FETCH-AND-ADDRESS: every read returns the bytes together with
// their content-address, so a network answer becomes a citable fact instead of an event that happened once. Pin
// an address and the same URL is verifiable forever after; the fetch stays impure and the VERDICT becomes pure,
// which is the only part that can be sealed.
//
// WHAT IT DOES NOT DO, named because a reader will otherwise assume it: it opens no socket (there is no TCP, no
// UDP, no listen, no bind), speaks no protocol below HTTP, runs no daemon, and resolves nothing itself. It is
// one verb over the host's own fetch, and the value is entirely in the address it returns beside the bytes.
import { fetchData, type DataKind } from '../../quantum/os/fetch/index.js'
import { domainCensus, type DomainCensus } from '../../quantum/os/domains/index.js'
import { toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'

export const NETWORK_DOMAIN = 'network' as const

export function networkCensus(): DomainCensus {
  const c = domainCensus(NETWORK_DOMAIN)
  if (!c) throw new Error(`netapi: DOMAIN_PATTERNS carries no "${NETWORK_DOMAIN}" domain`)
  return c
}

export interface NetRead {
  url: string
  /** null when the read did not happen — declined, refused or unreachable. NEVER an empty string standing in. */
  body: string | null
  /** sha-256 of the retrieved bytes, uuidna's own pure TS — null when nothing was retrieved */
  digest: string | null
  /** the content-address of (url, digest) — what a citation actually pins */
  address: string | null
  reached: boolean
  note: string
}

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** netRead — the ONE reach. Returns the bytes AND their address, or an honest not-reached. */
export async function netRead(url: string, kind: DataKind = 'text'): Promise<NetRead> {
  const r = await fetchData<string>(url, kind)
  if (r.data === null) {
    // A FAILED READ IS NOT AN EMPTY READ. Returning '' here would address the empty string and hand back a
    // perfectly valid-looking receipt for bytes that never arrived — the exact green-over-absent shape this tree
    // has met ten times. reached:false is the whole point of the field.
    return { url, body: null, digest: null, address: null, reached: false, note: r.declined ? `declined: ${r.note}` : `not reached: ${r.note}` }
  }
  const body = String(r.data)
  const digest = hex(sha256(new TextEncoder().encode(body)))
  return { url, body, digest, address: toUuid(`net:${url}:${digest}`), reached: true, note: r.note || 'reached' }
}

export type NetVerdict =
  | { ok: true; url: string; address: string; note: string }
  | { ok: false; url: string; address: string | null; expected: string; note: string }

/** netVerify — did this URL answer with the bytes that were pinned? The impure half is the fetch; this is pure. */
export async function netVerify(url: string, expectedAddress: string, kind: DataKind = 'text'): Promise<NetVerdict> {
  const r = await netRead(url, kind)
  if (!r.reached || r.address === null) return { ok: false, url, address: null, expected: expectedAddress, note: r.note }
  return r.address === expectedAddress
    ? { ok: true, url, address: r.address, note: 'the bytes match the pinned address' }
    : { ok: false, url, address: r.address, expected: expectedAddress, note: 'the URL answered, and it answered something else' }
}

export interface NetApiCensus {
  definition: 'alpine-network-port·one-fetch-and-address-api'
  ported: { packages: number; origins: number }
  api: readonly string[]
  cannot: readonly string[]
  boundary: string
  honest: string
}

export function netApi(): NetApiCensus {
  const c = networkCensus()
  return {
    definition: 'alpine-network-port·one-fetch-and-address-api',
    ported: { packages: c.packages, origins: c.origins },
    api: ['netRead', 'netVerify', 'networkCensus'],
    cannot: ['open a socket', 'TCP', 'UDP', 'listen', 'bind', 'resolve DNS itself', 'run a daemon', 'speak below HTTP'],
    boundary: 'src/os — the NAMED non-determinism boundary; a remote host answering is not a decidable fact',
    honest:
      `PORT = PROVENANCE over ${c.packages} packages, ${c.origins} origins. API = one verb, fetch-and-address: ` +
      'every read returns its content-address so a network answer becomes citable rather than merely recent. ' +
      'A read that did not happen returns reached:false and a null address — never an empty string with a ' +
      'valid-looking receipt. The fetch is impure and stays at this boundary; only the verdict is sealed.',
  }
}

// repos — BIND the captain's public repositories to the DISCOVERY SEQUENCE, the sequence revealed FIRST. The ℤ/9
// vortex orbit [1,2,4,8,7,5] — the doubling sequence uuidna discovers everything along — is revealed first; then each
// of the captain's public GitHub repositories (the uuidna org + the ceccec user) is BOUND to it by content-address:
// the repo's full name folds to a 128-bit address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9
// axis the vortex never visits), and its rank in the address-sorted order is its slot in the revealed sequence. Folded
// to one order-invariant receipt anyone recomputes.
// @non-harmonic: reads the captain's PUBLIC GitHub repositories over the network (a research boundary) — the response
// is DATA, never run; the binding itself is a pure, deterministic fold of the public metadata.
//
// HONEST SCOPE: integrity, not truth. It BINDS the captain's public repos to the sequence by content-address
// (provenance) — it fingerprints them and places them in the recomputable sequence. It does NOT modify, fork, mirror,
// claim ownership of, or vouch for the contents of any repository. A binding is a placement in the sequence, not a
// possession of the code. Best-effort: an unreachable account contributes nothing, never a faked repo.
import { toUuid, digitalRoot, vortexOrbit } from '../address.js'
import { merkleGravity } from '../gravity.js'

// the captain's public GitHub accounts — the org and the user behind uuidna (Tsvetan Rouschev / ceccec).
export const CAPTAIN_ACCOUNTS: readonly { kind: 'org' | 'user'; who: string }[] = [
  { kind: 'org', who: 'uuidna' },
  { kind: 'user', who: 'ceccec' },
]

/** One repository bound to the sequence. */
export interface BoundRepo {
  fullName: string     // owner/name
  url: string          // the public html url
  address: string      // 128-bit content-address of the full name — the binding handle
  digit: number        // its ℤ/9 digital root (1..9)
  onVortex: boolean    // true if the digit is on the vortex orbit [1,2,4,8,7,5]; false ⇒ the 3-6-9 axis
  rank: number         // its slot in the address-sorted reveal order
}

export interface RepoBinding {
  sequence: number[]       // the vortex orbit [1,2,4,8,7,5] — REVEALED FIRST, the spine the repos bind to
  accounts: readonly { kind: string; who: string }[]
  repos: BoundRepo[]       // the captain's public repos, bound and revealed in sequence order
  count: number
  receipt: string          // order-invariant fold of every bound repo's address — the whole binding, one address
  honest: string
}

const HONEST =
  'The captain\'s public repositories BOUND to the ℤ/9 vortex sequence (revealed first): each repo fingerprinted to a ' +
  '128-bit content-address, placed on the vortex by its digital root and in the reveal order by its address rank, ' +
  'folded to one recomputable receipt. Integrity, not truth — it binds the repos to the sequence by content-address ' +
  '(provenance); it does NOT modify, fork, mirror, or vouch for any repository. A binding is a placement, not a ' +
  'possession. Best-effort; an unreachable account contributes nothing, never a faked repo.'

async function fetchAccountRepos(kind: 'org' | 'user', who: string): Promise<{ fullName: string; url: string }[]> {
  try {
    const base = kind === 'org' ? `https://api.github.com/orgs/${who}/repos` : `https://api.github.com/users/${who}/repos`
    const res = await fetch(`${base}?per_page=100&type=public`, { headers: { 'User-Agent': 'uuidna', Accept: 'application/vnd.github+json' } })
    if (!res.ok) return []
    const json = await res.json() as { full_name?: string; html_url?: string; private?: boolean; fork?: boolean }[]
    return json.filter((r) => r.full_name && !r.private).map((r) => ({ fullName: r.full_name as string, url: r.html_url ?? `https://github.com/${r.full_name}` }))
  } catch { return [] }
}

/** bindCaptainRepos() → reveal the ℤ/9 vortex sequence, then bind every one of the captain's public repositories to it
 *  by content-address, folded to one receipt. The binding is deterministic given the same set of public repos (the
 *  network read is the only non-determinism, declared at this boundary). Recompute it against the same repos. */
export async function bindCaptainRepos(): Promise<RepoBinding> {
  const sequence = vortexOrbit()                                     // [1,2,4,8,7,5] — revealed FIRST
  const seen = new Map<string, { fullName: string; url: string }>()
  for (const a of CAPTAIN_ACCOUNTS) for (const r of await fetchAccountRepos(a.kind, a.who)) seen.set(r.fullName, r)
  const bound: BoundRepo[] = [...seen.values()]
    .map((r) => {
      const address = toUuid(r.fullName)
      const n = parseInt(address.replace(/-/g, '').slice(0, 8), 16)
      const digit = digitalRoot(n)
      return { fullName: r.fullName, url: r.url, address, digit, onVortex: sequence.includes(digit), rank: 0 }
    })
    .sort((a, b) => (a.address < b.address ? -1 : 1))               // reveal order = address rank
    .map((r, i) => ({ ...r, rank: i }))
  return {
    sequence, accounts: CAPTAIN_ACCOUNTS, repos: bound, count: bound.length,
    receipt: bound.length ? merkleGravity(bound.map((r) => r.address)) : toUuid('captain-repos-empty'),
    honest: HONEST,
  }
}

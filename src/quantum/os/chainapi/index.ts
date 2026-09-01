// quantum/os/chainapi — ONE LEDGER API OVER THE PORTED ALPINE BLOCKCHAIN SURFACE.
//
// Alpine publishes 29 blockchain packages across 19 origins — bitcoin, monero, electrum, libsecp256k1 — and they
// are the smallest domain in the catalogue by a wide margin. That smallness is the interesting part: a chain is
// mostly agreement about WHO MAY APPEND, and almost none of that is a package.
//
// Strip the consensus and what remains is the part uuidna already is: an append-only sequence of
// content-addressed records where any member can be PROVEN to belong without handing over the rest. That is a
// merkle ledger, and this tree has had every piece of one — merkleRoot, merkleProof, verifyProof, and the sealed
// chain whose every link names its referer — scattered across three modules. This is those behind one door.
//
// WHAT IT IS, said precisely: inclusion without disclosure. A proof carries log2(n) siblings, so a party can
// verify that a record is in a ledger of any size while seeing only its own record and a handful of hashes. That
// is the whole trick a chain sells, and it needs no consensus, no mining and no coin to work — those exist to
// decide who appends NEXT, which is a governance question this API leaves to whoever runs it.
//
// THE SEQUENCE IS PART OF THE CLAIM. Each entry folds its index with its address, so reordering breaks the root
// exactly as tampering does — "a provenance is a sequence, not a set" (Os.lean). The plain merkle fold in this
// tree is order-invariant by design, which is right for a pile and wrong for a ledger; fsapi learned that the
// expensive way and this module inherits the lesson rather than repeating it.
import { merkleRoot, merkleProof, verifyProof } from '../../../merkle.js'
import { domainCensus, type DomainCensus } from '../domains/index.js'
import { toUuid } from '../../../address.js'

export const CHAIN_DOMAIN = 'blockchain' as const

export function chainCensus(): DomainCensus {
  const c = domainCensus(CHAIN_DOMAIN)
  if (!c) throw new Error(`chainapi: DOMAIN_PATTERNS carries no "${CHAIN_DOMAIN}" domain`)
  return c
}

export interface ChainEntry { index: number; record: string; address: string; leaf: string }
export interface Chain { entries: ChainEntry[]; root: string; length: number }

/** the leaf binds POSITION to content, so a reordering moves the root as surely as an edit does */
const leafOf = (index: number, record: string): string => toUuid(`chain:${index}|${toUuid(record)}`)

/** chainSeal — fold records into an append-only ledger with one root. */
export function chainSeal(records: readonly string[]): Chain {
  const entries = records.map((record, index) => ({ index, record, address: toUuid(record), leaf: leafOf(index, record) }))
  return { entries, root: entries.length ? merkleRoot(entries.map((e) => e.leaf)) : '', length: entries.length }
}

/** chainAppend — the append is a new fold, not a mutation: the old root stays valid for the old prefix. */
export function chainAppend(chain: Chain, record: string): Chain {
  return chainSeal([...chain.entries.map((e) => e.record), record])
}

export interface ChainProof { index: number; leaf: string; root: string; path: { sibling: string; left: boolean }[] }

/** chainProve — inclusion WITHOUT disclosure: log2(n) siblings, and the other records stay unseen. */
export function chainProve(chain: Chain, index: number): ChainProof | null {
  if (!Number.isInteger(index) || index < 0 || index >= chain.length) return null
  const leaves = chain.entries.map((e) => e.leaf)
  return { index, leaf: leaves[index]!, root: chain.root, path: merkleProof(leaves, index) }
}

/** chainVerify — check a proof against a root, holding only the one record. */
export function chainVerify(record: string, proof: ChainProof): boolean {
  // the leaf is recomputed from the record AND the claimed index, so a proof cannot be replayed at another
  // position: a record that really is at index 3 does not verify as index 5, which set-shaped merkle would allow
  return leafOf(proof.index, record) === proof.leaf && verifyProof(proof.leaf, proof.path, proof.root)
}

export interface ChainApiCensus {
  definition: 'alpine-blockchain-port·one-ledger-api'
  ported: { packages: number; origins: number }
  api: readonly string[]
  /** what a chain adds beyond this, and who owns it — governance, not arithmetic */
  leftToTheOperator: readonly string[]
  receipt: string
  honest: string
}

export function chainApi(): ChainApiCensus {
  const c = chainCensus()
  return {
    definition: 'alpine-blockchain-port·one-ledger-api',
    ported: { packages: c.packages, origins: c.origins },
    api: ['chainSeal', 'chainAppend', 'chainProve', 'chainVerify', 'chainCensus'],
    leftToTheOperator: ['who may append', 'consensus among disagreeing writers', 'incentive', 'a unit of value'],
    receipt: toUuid(`chainapi|${c.packages}|${c.origins}`),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages, ${c.origins} origins. API = inclusion without disclosure: ` +
      'a proof carries log2(n) siblings, so a party verifies membership in a ledger of any size while seeing only ' +
      'its own record. Position is folded into every leaf, so reordering breaks the root exactly as tampering ' +
      'does. What a public chain adds on top is agreement about who appends next — governance, not arithmetic.',
  }
}

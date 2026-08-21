// contract — first-class contract-keyed messaging. A CONTRACT is a text (the terms). Its content-address IS its
// domain: contractId(terms) = toUuid(terms), the [contract-uuid] that names the deployment's subdomain
// (<contract-uuid>.uuidna.org). That address is the PUBLIC identity — it ROUTES (which contract a message is under)
// and lets a holder PROVE they hold the tagged contract (re-address their terms and compare) — while the contract
// TEXT is the private KEY. Same addressing as the license's own receipt, so the license itself is a contract.
//
// HONEST SCOPE (integrity. Confidentiality is EXACTLY the secrecy of the contract text — pure-TS
// ChaCha20-Poly1305 (crypt.ts) keyed by it:
//  · If the contract is PUBLIC (the CC BY-NC license on uuidna.com/license), there is NO secrecy — a public key is
//    public. That is sealed"a fixed pad is public"). Sealing under
//    a public contract only BINDS a message to the terms (coupling); it does not hide it.
//  · If the contract is a PRIVATE commercial contract (a secret shared only with the licensee), it is real
//    confidentiality — only holders of the terms decrypt; a wrong contract fails the address check or Poly1305
//    authentication. As private as the contract is kept, and as strong as its entropy.
//  · The contract-uuid is a NON-crypto FNV address: it routes and proves-holding, but it is not a binding
//    commitment (not collision-resistant). Secrecy and authentication stay with the ChaCha20-Poly1305 layer + tag.
//  · A changed contract → a new address AND a new key → old ciphertext no longer opens: a license change is a new
//    signature, cryptographically.
import { toUuid } from './address.js'
import { sealStream, openStream, sealChain, openChain, type Stream, type Link } from './stream.js'

/** The contract's content-address — the [contract-uuid] that names its subdomain. Public identity, recomputable by
 *  anyone who holds the exact terms (so it also proves holding). Same fold as uuidna_address — the license is a contract. */
export function contractId(terms: string): string {
  return toUuid(terms)
}

/** The domain the contract addresses to: <contract-uuid>.uuidna.org — the domain IS the contract's address. */
export function contractDomain(terms: string, base = 'uuidna.org'): string {
  return `${contractId(terms)}.${base}`
}

/** A message sealed under a contract: the sealed uuid stream, TAGGED with the public contract-uuid (routing only). */
export interface ContractSealed extends Stream {
  contract: string // the [contract-uuid] this is under — public routing
}

/** Seal ONE message under a contract. Encrypts with the contract text as the ChaCha20-Poly1305 key and tags the
 *  sealed stream with the public contract-uuid. Only holders of the terms can open it. `step` freshens the salt so a
 *  repeated message never seals alike. Secrecy is exactly the secrecy of the terms (none, if the contract is public). */
export function sealToContract(message: string, terms: string, step?: number): ContractSealed {
  return { ...sealStream(message, [terms], step), contract: contractId(terms) }
}

/** Open a contract-sealed message. First checks the holder's terms address to the tagged contract-uuid (a public
 *  proof of holding the right contract), then decrypts. A wrong contract fails the address check or Poly1305 auth. */
export function openFromContract(sealed: ContractSealed, terms: string): string {
  if (contractId(terms) !== sealed.contract)
    throw new Error(`contract: wrong contract — your terms address to ${contractId(terms)}.contract}`)
  return openStream(sealed.uuids, [terms])
}

/** A contract-keyed ratchet: a stream of messages sealed under one contract, forward-linked (each step rotated from
 *  the prior link's receipt — the referer sequence), all tagged with the contract-uuid. */
export interface ContractChain {
  contract: string
  links: Link[]
}

/** Seal a STREAM of messages under a contract as a ratchet (freshness + linkage + tamper-evidence.
 *  Seeded from the public contract-uuid so the same contract's chain is reproducible. */
export function sealChainToContract(messages: readonly string[], terms: string): ContractChain {
  const contract = contractId(terms)
  return { contract, links: sealChain(messages, [terms], contract) }
}

/** Open a contract-keyed ratchet: verifies the terms address to the tagged contract-uuid and the referer chain
 *  rotates correctly, then decrypts each link. A wrong contract, or a dropped/reordered/edited link, throws. */
export function openChainFromContract(chain: ContractChain, terms: string): string[] {
  if (contractId(terms) !== chain.contract)
    throw new Error(`contract: wrong contract — your terms address to ${contractId(terms)}.contract}`)
  return openChain(chain.links, [terms], chain.contract)
}

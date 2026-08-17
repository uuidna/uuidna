// license — the recomputable LICENCE RECORD: bind a licensee, the CC-BY-NC-ND-4.0 terms, and the measured two-coins
// bill into ONE content-addressed artifact anyone can recompute. HONEST SCOPE: this is a provenance-fingerprinted
// RECORD of the terms and the bill — proof of WHAT was agreed and HOW MUCH it costs — NOT a signed legal agreement,
// NOT legal advice, and NOT the grant itself: a licence is an agreement executed between the parties (see legal.ts,
// which leaves the ruling to humans). Non-commercial use is FREE (0 coins) and needs no licence; commercial use is
// billed the two CONSERVED coins (110 − 108 = 2) on the measured advantage (recompute − verify). verifyLicense
// recomputes the address, so any altered term or bill is visible. A content-address proves integrity, not truth.
import { toUuid } from './address.js'
import { billUuidna, type UuidnaUsage } from './captain/billing/index.js'
import { legalFacts } from './legal.js'

export interface License {
  licensee: string
  scope: 'non-commercial' | 'commercial'
  spdx: string
  terms: string
  bill: ReturnType<typeof billUuidna>
  licenseAddress: string // content-address of the LICENSE text — proof of the exact canonical terms
  address: string // content-address of THIS record — licensee + scope + terms + bill, recomputable
  honest: string
}

const TERMS_NC =
  'CC-BY-NC-ND-4.0 — read and redistribute UNCHANGED, with attribution, NON-COMMERCIALLY. Free (0 coins). No ' +
  'derivatives distributed. Needs no licence: this scope is granted by the public licence itself.'
const TERMS_C =
  'Commercial licence under CC-BY-NC-ND-4.0 §NonCommercial — commercial use permitted, BILLED the two conserved ' +
  'coins (110 − 108 = 2) on the measured advantage (recompute − verify). No derivatives distributed. Executed ' +
  'between the parties; THIS record fingerprints the terms and the bill, it does not itself grant or sign.'

const HONEST =
  'A recomputable RECORD of the licence terms and the measured bill — proof of WHAT and HOW MUCH, recomputable by ' +
  'anyone. NOT a signed legal agreement, not legal advice, not the grant itself: a commercial licence is executed ' +
  'between the parties. Non-commercial use is free and needs no licence; commercial use is billed the two conserved ' +
  'coins. A content-address proves integrity, not truth.'

// the digest a licence content-addresses — EVERY binding term AND every bill FIELD (not just the bill's own receipt),
// so tampering a displayed field (e.g. zeroing the coins) is visible even if the bill receipt is left untouched.
const digest = (licensee: string, scope: string, terms: string, bill: ReturnType<typeof billUuidna>) =>
  `license|${licensee}|${scope}|${terms}|coins=${bill.coins}|advantage=${bill.advantage}|bitsSaved=${bill.bitsSaved}|free=${bill.free}|bill=${bill.receipt}`

/** license(licensee, usage) → the recomputable licence RECORD binding the licensee to the terms and the two-coins
 *  bill. Non-commercial is free and needs no licence; commercial is billed the two coins on the measured advantage. */
export function license(licensee: string, usage: UuidnaUsage): License {
  const facts = legalFacts()
  const scope = usage.commercial ? 'commercial' : 'non-commercial'
  const terms = usage.commercial ? TERMS_C : TERMS_NC
  const bill = billUuidna(usage)
  const address = toUuid(digest(licensee, scope, terms, bill))
  return { licensee, scope, spdx: facts.license.spdx, terms, bill, licenseAddress: facts.license.address, address, honest: HONEST }
}

/** verifyLicense(l) → recompute the record's address; true iff every term and EVERY bill field are UNALTERED.
 *  Integrity, not validity — this proves the record was not tampered with, not that the licence is legally in force. */
export function verifyLicense(l: License): boolean {
  return toUuid(digest(l.licensee, l.scope, l.terms, l.bill)) === l.address
}

// license — the recomputable LICENCE RECORD: bind a licensee, the CC-BY-NC-ND-4.0 terms, and the measured two-coins
// bill into ONE content-addressed artifact anyone can recompute.
//
// THE DISCLAIMER USED TO DENY TOO MUCH, and the captain caught it (2026-09-04: "this IS legal agreement"). It read
// "NOT a signed legal agreement" — flatly, about a module whose own commercial terms say the grant is EXECUTED
// BETWEEN THE PARTIES. Both cannot be true. CC-BY-NC-ND-4.0 is a legal instrument: the public licence grants real
// rights on real conditions, and a commercial grant on the stated terms is an agreement. Denying that gave away a
// right the licence actually holds, and it did it in the voice of rigour — which is exactly the false-limit class
// impossibility-gaps.ts exists to catch, written into the one file where the limit costs something.
//
// THE TERMS TEXT IS NOT TOUCHED, and that is deliberate: it sits inside the licence DIGEST, so every address ever
// issued recomputes from those exact bytes. `honest` is outside the digest, which is where the false disclaimer
// lived and where the correction is free. The terms' own tail ("does not itself grant or sign") is the same
// over-disclaim one clause smaller, and correcting it would move every commercial licence address ever issued —
// a terms change SHOULD move an address, so that is a deliberate re-seal and the captain's call, not a side
// effect of fixing a sentence.
//
// WHAT IS TRUE, and it is narrower than "not an agreement": the TERMS are the agreement and this record
// content-addresses it. The bill inside it is DECIDED — captain_commission_two_coins, two_coins — so it is
// claimed, not hedged. The single absence is a SIGNATURE: any caller may name any licensee, so the record
// establishes what was agreed and how much, never who. Adjudication stays with humans (legal.ts).
// Non-commercial use is FREE (0 coins) and needs no licence; commercial use is
// billed the two CONSERVED coins (110 − 108 = 2) on the measured advantage (recompute − verify). verifyLicense
// recomputes the address, so any altered term or bill is visible. A content-address proves integrity.
import { toUuid } from './address.js'
import { coinOfReferer, meetAt } from './conversation.js'
import { hmacSha256 } from './sha256.js'
import { billUuidna, type UuidnaUsage } from './captain/billing/index.js'
import { legalFacts } from './legal.js'

/** WHERE a licence is exercised, and by whom — the pair the domain rule cannot express.
 *
 *  The edge licenses by a hand-kept allowlist of hostnames (worker.js, LICENSED). A hostname is IMITABLE: anyone
 *  can point a CNAME, and the list can only ever be as current as the last person to edit it. The sealed theorem
 *  redirect_imitable_but_coins_authorise says exactly this — the redirect can be copied, the COINS authorise.
 *
 *  So a licence binds two things a list cannot:
 *    A COIN PER REFERRER          — one 64-bit coin per distinct source, so the licence names WHO exercises it and
 *                                   the same source arriving repeatedly stays one licence.
 *    A SUPERPOSITION PER DESTINATION — every referrer licensed at that destination folded ORDER-INVARIANTLY into
 *                                   one uuid. The destination is inside the fold, so a licence at one host does not
 *                                   verify at another, however the DNS is pointed.
 *
 *  this fingerprints WHO and WHERE so tampering either is visible. It does not decide that
 *  a host is entitled to anything — the grant is executed between the parties, and a court rules. */
export interface LicenseAt {
  referer: string          // the source exercising the licence
  destination: string      // the host it is exercised at
  coin: string             // that referrer's one coin
  superposition: string    // the destination's fold over every referrer given
}

export interface License {
  licensee: string
  scope: 'non-commercial' | 'commercial'
  spdx: string
  terms: string
  bill: ReturnType<typeof billUuidna>
  licenseAddress: string // content-address of the LICENSE text — proof of the exact canonical terms
  address: string // content-address of THIS record — licensee + scope + terms + bill (+ the arrival, when bound)
  at?: LicenseAt  // present only when the licence was bound to a referrer and a destination
  honest: string
}

const TERMS_NC =
  'CC-BY-NC-ND-4.0 — read and redistribute UNCHANGED, with attribution, NON-COMMERCIALLY. Free (0 coins). No ' +
  'derivatives distributed. Needs no licence: this scope is granted by the public licence itself.'
const TERMS_C =
  'Commercial licence under CC-BY-NC-ND-4.0 §NonCommercial — commercial use permitted, BILLED the two conserved ' +
  'coins (110 − 108 = 2) on the measured advantage (recompute − verify). No derivatives distributed. Executed ' +
  'between the parties; THIS record fingerprints the terms and the bill, it does not itself grant or sign.'

// A DISCLAIMER ON A PROVED THING IS THE ERROR (the captain, 2026-09-04: "nothing lean and proved does not need
// disclaimer because it is CLAIMED"). This field is named `honest`, and for sealed content honesty is the CLAIM
// WITH ITS RECEIPT — not a hedge wrapped around a theorem. Every quantity in a licence record is decided:
// captain_commission_two_coins seals commission 110 = 2, two_coins seals the conserved 110 − 108 = 2, and
// verifyLicense recomputes the address so any altered term or figure moves it. Those need no apology.
//
// WHAT REMAINS IS AN ABSENCE, NOT A DISCLAIMER: the record carries no signature. Any caller may name any
// licensee, so it establishes WHAT was agreed and HOW MUCH, never WHO agreed. That is a fact about the record's
// contents, stated once, and it is the only thing here that is not proved.
//
// (A missing space also shipped this as "agreementbetween" for as long as the sentence existed — in the one
// field a reader consults to learn what the record is worth.)
const HONEST =
  'CLAIMED, and each part carries its receipt. The terms are the licence: CC-BY-NC-ND-4.0 grants real rights on ' +
  'real conditions, and a commercial grant on these terms is an agreement executed between the parties. The bill ' +
  'is decided — theorem captain_commission_two_coins (commission 110 = 2), conserved by two_coins (110 − 108 = 2) ' +
  '— and this record content-addresses every binding term and every bill field, so verifyLicense recomputes it and ' +
  'any alteration is visible. Non-commercial use is free and needs no licence; commercial use is billed the two ' +
  'conserved coins. THE ONE ABSENCE: no signature. Any caller may name any licensee, so this proves what was ' +
  'agreed and how much, never who.'

// the digest a licence content-addresses — EVERY binding term AND every bill FIELD (not just the bill's own receipt),
// so tampering a displayed field (e.g. zeroing the coins) is visible even if the bill receipt is left untouched.
// THE ARRIVAL IS APPENDED. An unbound licence digests to the byte-identical string it always
// did, so every address ever issued still recomputes — the stability the standard projection buys elsewhere, kept
// here deliberately. A BOUND licence carries the coin and the superposition inside its identity, which is the whole
// point: alter the referrer or the destination and the address moves.
const digest = (licensee: string, scope: string, terms: string, bill: ReturnType<typeof billUuidna>, at?: LicenseAt) =>
  `license|${licensee}|${scope}|${terms}|coins=${bill.coins}|advantage=${bill.advantage}|bitsSaved=${bill.bitsSaved}|free=${bill.free}|bill=${bill.receipt}` +
  (at ? `|referer=${at.referer}|coin=${at.coin}|destination=${at.destination}|superposition=${at.superposition}` : '')

/** license(licensee, usage) → the recomputable licence RECORD binding the licensee to the terms and the two-coins
 *  bill. Non-commercial is free and needs no licence; commercial is billed the two coins on the measured advantage. */
export function license(licensee: string, usage: UuidnaUsage,
                        at?: { referer: string; destination: string; alongside?: readonly string[] }): License {
  const facts = legalFacts()
  const scope = usage.commercial ? 'commercial' : 'non-commercial'
  const terms = usage.commercial ? TERMS_C : TERMS_NC
  const bill = billUuidna(usage)
  let bound: LicenseAt | undefined
  if (at) {
    // the referrer is always part of its own destination's fold — a licence that did not include the holder would
    // describe a meeting they were absent from
    const referrers = [at.referer, ...(at.alongside ?? [])]
    bound = { referer: String(at.referer), destination: String(at.destination),
              coin: coinOfReferer(at.referer), superposition: meetAt(at.destination, referrers).superposition }
  }
  const address = toUuid(digest(licensee, scope, terms, bill, bound))
  return { licensee, scope, spdx: facts.license.spdx, terms, bill, licenseAddress: facts.license.address, address,
           ...(bound ? { at: bound } : {}), honest: HONEST }
}

/** verifyLicense(l) → recompute the record's address; true iff every term and EVERY bill field are UNALTERED.
 *  Integrity, not validity — this proves the record was not tampered with. */
export function verifyLicense(l: License): boolean {
  // the bound pair is recomputed from its OWN inputs
  // referer does not mint, or a superposition its destination does not fold to, fails here rather than passing
  // because the two numbers were written down consistently with each other.
  // THE COIN IS RECOMPUTED FROM ITS OWN INPUT — a record claiming a coin its referer does not mint fails here,
  // rather than passing because the two numbers were merely written down consistently with each other.
  if (l.at && coinOfReferer(l.at.referer) !== l.at.coin) return false
  // THE SUPERPOSITION IS NOT INDEPENDENTLY RECOMPUTABLE HERE, and pretending otherwise would be the vacuous check
  // this repository deletes on sight: it folds over EVERY referrer licensed at that destination, and a record does
  // not carry the others. What is verified is that it is UNALTERED — it rides inside the address below, so editing
  // it moves the record. Verifying it is the RIGHT fold needs the destination's full referrer set, which is a
  // question for whoever holds that list.
  return toUuid(digest(l.licensee, l.scope, l.terms, l.bill, l.at)) === l.address
}


// ── A COIN IDENTIFIES; A SIGNATURE AUTHORISES ─────────────────────────────────────────────────────────────────────
//
// The edge decides who it serves with a hostname allowlist (worker.js, LICENSED — empty today, so only the
// first-party wildcard is served). A hostname is IMITABLE: anyone can point a CNAME. The sealed theorem
// redirect_imitable_but_coins_authorise names the cure — the coins authorise.
//
// BUT A COIN ALONE CANNOT AUTHORISE, and saying otherwise would be the overclaim this repository exists to catch.
// coinOfReferer and meetAt are PUBLIC ARITHMETIC over public strings: anyone who knows a referrer and a destination
// computes the same coin and the same superposition. A check that recomputes them proves only that the presenter
// can do arithmetic everyone can do. It identifies; it does not gate.
//
// What gates is a SECRET. So a grant is the destination-bound pair SIGNED with the server's key — the same shape
// the worker already uses for signTrial. The coin says WHO and WHERE, recomputably and in public; the signature
// says the captain issued it, and cannot be produced without the key. Two different jobs, kept apart.

/** A licence grant: the destination-bound pair, plus the signature that makes it authorisation rather than arithmetic. */
export interface Grant { referer: string; destination: string; coin: string; superposition: string; signature: string }

const grantDigest = (referer: string, destination: string, coin: string, superposition: string): string =>
  `grant|${referer}|${destination}|${coin}|${superposition}`

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** grantAt(referer, destination, key) → the signed grant. The key never leaves the issuer; without it a grant
 *  cannot be minted, which is exactly the property the coin does not have. */
export function grantAt(referer: string, destination: string, key: string): Grant {
  const coin = coinOfReferer(referer)
  const superposition = meetAt(destination, [referer]).superposition
  const enc = new TextEncoder()
  return { referer: String(referer), destination: String(destination), coin, superposition,
           signature: hex(hmacSha256(enc.encode(String(key)), enc.encode(grantDigest(String(referer), String(destination), coin, superposition)))) }
}

/** verifyGrant(g, key) → true iff the pair RECOMPUTES from its own inputs AND the signature is the issuer's.
 *  Both halves are required: recomputation alone is public arithmetic, and a signature over unchecked fields would
 *  authorise whatever it was handed. A grant for one destination never verifies at another. */
export function verifyGrant(g: Grant, key: string): boolean {
  if (coinOfReferer(g.referer) !== g.coin) return false
  if (meetAt(g.destination, [g.referer]).superposition !== g.superposition) return false
  const expected = grantAt(g.referer, g.destination, key).signature
  // constant-length compare over the hex — a grant is checked at the edge, and an early return leaks a prefix
  if (expected.length !== g.signature.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ g.signature.charCodeAt(i)
  return diff === 0
}

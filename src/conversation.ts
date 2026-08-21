// conversation — local chat as recomputable CODE (not a demo). A CONVERSATION FOLD binds four message handles into a
// room ADDRESS (128-bit) whose first 8 hex is the FIFTH handle — the public room identifier (the {5/2} close-point,
// used for routing/display) — with each handle FOLDED FROM the one before (order-sensitive `merge`, the directed
// edge), so each handle is PART OF the next: a dropped, reordered, or forged handle yields a different address —
// authenticity by construction (routes and messaging self-authenticate). The fold is rotated by the room's referer,
// so each referer gets a distinct, un-correlatable room. The FULL address (of which the fifth is the head) then keys
// the encrypted uuid-stream channel (sealStream / openStream, pure-TS ChaCha20-Poly1305) — LOCAL-FIRST: keys and
// plaintext stay client-side, the channel IS the uuid stream, nothing is sent. Secrecy is exactly the passphrase
// entropy; the handles are integrity/routing, not secrecy; an advancing per-message step closes the equality leak.
import { merge, coin64, toUuid } from './address.js'
import { merkleGravity } from './gravity.js'   // the ORDER-INVARIANT fold — the superposition's own arithmetic
import { handleOf } from './handle.js'   // THE one derivation — see handle.ts
import { encryptSession, decryptSession, type Sealed } from './crypt.js'
import { imprintTextChain, readImprintTextChain } from './imprint.js'

const HANDLE = /^[0-9a-f]{8}$/

export interface Room { handles: string[]; referer: string; fifth: string; address: string }

/** conversationFold(handles, referer) → the FIFTH handle (the room key): the four handles fold order-sensitively
 *  (each part of the next), rotated by the referer. O(1), recomputable — a changed/reordered handle or referer moves
 *  the fifth, so a tampered route/thread no longer resolves. */
export function conversationFold(handles: string[], referer = ''): Room {
  if (handles.length !== 4 || !handles.every((h) => HANDLE.test(h)))
    throw new Error('conversationFold needs exactly four 8-hex handles')
  const address = merge(merge(merge(merge(handles[0], handles[1]), handles[2]), handles[3]), String(referer))
  return { handles: [...handles], referer: String(referer), fifth: handleOf(address), address }
}

/** Open a local chat room from four handles (+ the referer). The room key is its fifth-handle address. */
export const openRoom = (handles: string[], referer = ''): Room => conversationFold(handles, referer)

/** Seal a message INTO the room's uuid stream at an advancing POSITION `step` (its index in the conversation), keyed
 *  by the room address + passphrase (local — nothing sent). The advancing step CLOSES THE EQUALITY LEAK: the same
 *  message at two positions seals to different uuid chains, so an observer cannot tell two room messages hold the same
 *  text (or recover their order). Omit `step` only for a one-shot send where repetition cannot occur. */
export const sendToRoom = (room: Room, message: string, passphrase: string, step: number): string[] =>
  imprintTextChain(JSON.stringify(encryptSession(String(message), String(passphrase), room.address, step)))

/** Seal a whole room TRANSCRIPT — each message at its advancing position (step = index) — so no two messages, even
 *  identical ones, seal alike; the equality leak is closed across the conversation. Returns one uuid chain per
 *  message, in order. Local: keys and plaintext stay client-side. */
export const sealRoomTranscript = (room: Room, messages: string[], passphrase: string): string[][] =>
  messages.map((m, i) => sendToRoom(room, String(m), passphrase, i))

/** Open a message FROM the room's uuid stream; a wrong passphrase or any tamper throws (Poly1305 authentication). */
export const receiveFromRoom = (room: Room, uuids: string[], passphrase: string): string =>
  decryptSession(JSON.parse(readImprintTextChain(uuids)) as Sealed, String(passphrase), room.address)

// ── ONE primitive for EVERY case — attach a UNIQUE chat to any subject ──────────────────────────────────────────
// A minimised url (a four-handle path) that POINTS BACK to the subject and carries a UNIQUE room for THIS instance.
// Handle 0 is the subject's 64-bit coin (the minimised pointer back to its url); the rest bind a per-instance id, so
// the same subject with two ids gets two rooms. uuidna chat handles ALL cases this way — a donation, a support case,
// an order, whatever — the room is authenticated (each handle part of the next) and per-referer isolated.
export interface AttachedChat { subject: string; id: string; minimised: string; handles: string[]; room: Room }
export function attachChat(subjectUrl: string, id = '', referer = ''): AttachedChat {
  const u = String(subjectUrl)
  const target = handleOf(coin64(u))                                                       // handle 0 — minimised pointer back to the subject
  const h = (tag: string): string => handleOf(toUuid(u + '|' + String(id) + '|' + tag))
  const handles = [target, h('1'), h('2'), h('3')]                                         // unique to (subject, id)
  const room = conversationFold(handles, referer)
  return { subject: u, id: String(id), minimised: '/' + handles.join('/'), handles, room }
}

/** A donation's NOTE: the minimised url pointing back to the donating url, with a UNIQUE chat for THIS donation. */
export const donationNote = (donationUrl: string, donationId = '', referer = ''): AttachedChat =>
  attachChat(donationUrl, donationId, referer)

/** A SUPPORT case's chat: uuidna chat handles all support cases whatever they may be — each case its own room. */
export const supportCase = (caseUrl: string, caseId = '', referer = ''): AttachedChat =>
  attachChat(caseUrl, caseId, referer)

// ── COIN PER REFERRER, SUPERPOSITION PER DESTINATION ──────────────────────────────────────────────────────────────
//
// attachChat already mints handle 0 from the SUBJECT (coin64 of its url) and isolates the room per referer — so the
// coin answers "what is this about" and the referer only rotates the fold. That leaves the two questions a arrival
// actually carries unanswered: WHO sent this one, and WHERE do the many of them meet.
//
// The law here answers both, and keeps them on different axes on purpose:
//   A COIN PER REFERRER    — every distinct referrer mints exactly one 64-bit coin, deterministically. The same
//                            referrer arriving a thousand times is ONE coin, because a coin identifies a source,
//                            not a visit; counting visits is a different measurement and must not ride this one.
//   A SUPERPOSITION PER DESTINATION — every referrer arriving at one destination folds ORDER-INVARIANTLY into a
//                            single uuid: all points of view as one, exactly reactor.ts's sense of the word. The
//                            destination is IN the fold, so the same crowd at two destinations gives two different
//                            superpositions — otherwise the fold would describe the crowd and not the meeting.
//
// Both are pure content-addresses over the given strings. This says nothing about whether a referrer is honest, and
// nothing about what a visit was worth: it makes the arrival RECOMPUTABLE and attributable, which is the only claim
// a fold can carry. Integrity, not truth.

/** one referrer, and the single coin it mints */
export interface Arrival { referer: string; coin: string }

/** every referrer that reached one destination, folded to one order-invariant superposition */
export interface Meeting {
  destination: string
  arrivals: Arrival[]          // deduplicated by referrer, in first-seen order — a coin per referrer, not per visit
  referrers: number
  superposition: string        // the whole uuid: every arrival folded, order-invariant
  handle: string               // its first eight hex — the identity you cite
}

/** coinOfReferer(referer) → THE coin for a referrer: 64 bits, deterministic, one per distinct source.
 *  Namespaced so a referrer string can never collide with a subject url minting the same coin through coin64. */
export const coinOfReferer = (referer: string): string => coin64('referer|' + String(referer))

/** meetAt(destination, referers) → a coin per referrer and ONE superposition for the destination they meet at.
 *  Order-invariant in the referrers (merkle gravity), change-sensitive in the destination and in the set. */
export function meetAt(destination: string, referers: readonly string[]): Meeting {
  const seen = new Set<string>()
  const arrivals: Arrival[] = []
  for (const r of referers) {
    const referer = String(r)
    if (seen.has(referer)) continue          // a coin identifies a SOURCE — the same referrer twice is one coin
    seen.add(referer)
    arrivals.push({ referer, coin: coinOfReferer(referer) })
  }
  // the destination rides INSIDE each leaf, so the same crowd at another destination folds elsewhere
  const superposition = merkleGravity(arrivals.map((a) => toUuid('arrival|' + String(destination) + '|' + a.coin)))
  return { destination: String(destination), arrivals, referrers: arrivals.length, superposition, handle: handleOf(superposition) }
}

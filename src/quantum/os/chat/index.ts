// quantum/os/chat — ONE CHAT API OVER THE PORTED ALPINE CHAT SURFACE.
//
// Alpine publishes 241 chat packages across 130 origins and they do not agree on anything: IRC, XMPP, Matrix,
// Mumble, and a shelf of bridges whose whole purpose is that the others cannot talk to each other. bitlbee exists
// because IRC is not XMPP. That is the fragmentation this API answers — one door, one envelope, one address
// space — and it answers it by REPLACING the wire, not by bridging it.
//
// SAY THE LIMIT FIRST, because the honest version of this is much narrower than "port the chat apps" sounds.
// uuidna does NOT speak IRC, XMPP, Matrix or any protocol in that census. It cannot join a channel on Libera, it
// cannot federate with a homeserver, and nothing here links, mounts or runs an Alpine binary. Two separate things
// live in this module and conflating them would be the overreach:
//
//   • THE PORT is PROVENANCE — name, version, checksum, repo, description, exactly as Alpine publishes them,
//     counted by the domain census and sealed as decidable arithmetic. It says what exists, never what it does.
//   • THE CHAT API is uuidna's OWN sealed channel, and it is real: encryptSession is the session ratchet (the two
//     coins paid once on the session, then a fresh key per advancing step), imprintTextChain carries the envelope
//     as uuids, so the channel IS the address space. It interoperates with nothing but itself, which is precisely
//     why it needs no bridge.
//
// The value is not that we reimplemented IRC. It is that a census of 241 fragmented clients sits beside ONE
// surface whose whole transport is an address, and the comparison is the point.
import { domainCensus, DOMAIN_PATTERNS, type DomainCensus } from '../domains/index.js'
import { catalogue } from '../catalogue/index.js'
import { encryptSession, decryptSession, type Sealed } from '../../../crypt.js'
import { imprintTextChain, readImprintTextChain } from '../../../imprint.js'
import { toUuid } from '../../../address.js'
import { gateCommitMessage } from '../../../sign.js'

export const CHAT_DOMAIN = 'chat' as const

/** the ported Alpine chat surface — provenance only, computed from the committed mirror */
export const chatCensus = (): DomainCensus => {
  const c = domainCensus(CHAT_DOMAIN)
  // domainCensus answers null for a domain it does not carry. That cannot happen while CHAT_DOMAIN is in
  // DOMAIN_PATTERNS, and saying so out loud is cheaper than a non-null assertion that hides the day it can.
  if (!c) throw new Error(`chat: DOMAIN_PATTERNS carries no "${CHAT_DOMAIN}" domain — the census and the API disagree about what exists`)
  return c
}

/** the catalogue rows this domain matches — the census reports counts, the families need the rows */
const chatMembers = (): { name: string; desc: string }[] => {
  const pat = DOMAIN_PATTERNS.find((d) => d.domain === CHAT_DOMAIN)
  if (!pat) return []
  return catalogue().filter((p) => pat.match.test(p.name) || pat.match.test(p.desc)).map((p) => ({ name: p.name, desc: p.desc }))
}

export interface ChatProtocol { protocol: string; packages: number }

// PROTOCOL FAMILIES, COUNTED — the fragmentation the one API is measured against. A package may name more than
// one family (a bridge names both sides, which is what a bridge IS), so these counts deliberately OVERLAP and do
// not sum to the census: bitlbee is IRC and XMPP at once, and forcing it into one bucket would erase the fact
// that makes it interesting.
const FAMILIES: readonly (readonly [string, RegExp])[] = [
  ['irc', /\b(irc|ircd|weechat|irssi|bitlbee)\b/i],
  ['xmpp', /\b(xmpp|jabber|ejabberd|prosody)\b/i],
  ['matrix', /\bmatrix\b/i],
  ['voice', /\b(mumble|murmur)\b/i],
  ['proprietary-client', /\b(telegram|discord|slack|signal)\b/i],
  ['bridge', /\b(bridge|gateway|transport)\b/i],
]

export function chatProtocols(): ChatProtocol[] {
  const members = chatMembers()
  return FAMILIES.map(([protocol, re]) => ({
    protocol,
    packages: members.filter((m) => re.test(m.name) || re.test(m.desc)).length,
  })).sort((a, b) => b.packages - a.packages || a.protocol.localeCompare(b.protocol))
}

export interface ChatMessage {
  /** the room this message is scoped to — a different room cannot open it, and that is the secrecy boundary */
  room: string
  /** the advancing position; MUST be unique per message under one room, or the ratchet reuses a key */
  step: number
  /** the sealed envelope carried as uuids — the channel IS the address space */
  chain: readonly string[]
  /** the room's own address, so a chain can be filed without naming the room in the clear */
  roomAddress: string
  /** what the message gate found — carried with the message, so a recipient sees the verdict too */
  gate: MessageGate
}

export interface MessageGate {
  /** citations in the text that name no sealed theorem — treason, and the send is refused */
  fabricated: string[]
  /** sentences claiming more than the ledger backs — carried, not refused: an overclaim is an argument, not a forgery */
  overreach: { unit: string; kind: string }[]
  /** the text arrived damaged (broken quoting, mangled escapes) */
  damage: string[]
  signed: boolean
}

/** gateMessage(text) → the SAME gate the commit-msg hook runs, applied to a message before it is sealed. */
export function gateMessage(text: string): MessageGate {
  const g = gateCommitMessage(text)
  return { fabricated: [...g.sig.fabricated], overreach: [...g.overreach], damage: [...g.damage], signed: g.sig.signed }
}

// ── TREASON DOES NOT RIDE THE WIRE (the captain: "catch treason in messaging") ────────────────────────────────
//
// A commit message that cites a theorem the ledger does not seal is refused at the commit-msg hook, and has been
// for the whole life of that gate. A MESSAGE carrying the identical forgery was sealed and sent without anyone
// looking — same tree, same ledger, same forgery, one door checked and one not. That asymmetry is the gap, and
// it is worse in messaging than in commits: a commit stays in a repository a reader can audit, while a sealed
// message arrives somewhere else carrying a citation its recipient has no way to check.
//
// So the same gate runs here, and the verdicts are kept apart because they are different acts:
//   • FABRICATED citation — a theorem key that is not in the ledger. This is forgery and the send is REFUSED.
//     Nothing about the ratchet or the address would make a false citation true, and sealing one would put
//     uuidna's own integrity behind it.
//   • OVERREACH — a claim larger than what is cited. Carried with the message rather than refused: an overclaim
//     is an argument someone can answer, and a channel that silently dropped arguments would be worse than one
//     that carries a weak one. The recipient is told.
//   • DAMAGE — mangled quoting or escapes. Reported, because a message that arrived broken is not a message.
/** chatSend — the ONE send. Seals text under the room ratchet and returns it as a uuid chain. */
export function chatSend(text: string, passphrase: string, room: string, step: number): ChatMessage {
  if (!Number.isInteger(step) || step < 0) throw new Error('chat: step must be a non-negative integer — it rotates the key, and a reused step reuses a key')
  const gate = gateMessage(text)
  if (gate.fabricated.length) {
    throw new Error(
      `chat: REFUSED — the message cites ${gate.fabricated.length} theorem(s) the ledger does not seal ` +
      `(${gate.fabricated.join(', ')}). A fabricated citation is forgery, and sealing it would put uuidna's own ` +
      'integrity behind a claim nobody can check. Cite a sealed key, or say it without one.',
    )
  }
  const sealed = encryptSession(text, passphrase, room, step)
  return { room, step, chain: imprintTextChain(JSON.stringify(sealed)), roomAddress: toUuid('chat:room:' + room), gate }
}

/** chatOpen — the ONE receive. A different room, or a wrong passphrase, does not open it. */
export function chatOpen(chain: readonly string[], passphrase: string, room: string): string {
  const sealed = JSON.parse(readImprintTextChain(chain)) as Sealed
  return decryptSession(sealed, passphrase, room)
}

export interface ChatApiCensus {
  definition: 'alpine-chat-port·one-api'
  ported: { packages: number; origins: number }
  protocols: ChatProtocol[]
  api: readonly string[]
  receipt: string
  honest: string
}

/** chatApi() — the whole surface in one answer: what was ported, and the one API that stands beside it. */
export function chatApi(): ChatApiCensus {
  const c = chatCensus()
  const protocols = chatProtocols()
  return {
    definition: 'alpine-chat-port·one-api',
    ported: { packages: c.packages, origins: c.origins },
    protocols,
    api: ['chatSend', 'chatOpen', 'chatProtocols', 'chatCensus'],
    receipt: toUuid(`chat|${c.packages}|${c.origins}|${protocols.map((p) => p.protocol + ':' + p.packages).join(',')}`),
    honest:
      'PORT = PROVENANCE: names, versions and checksums as Alpine publishes them, nothing installed, linked or run. ' +
      'API = uuidna\'s OWN sealed channel (session ratchet + uuid transport), which speaks no IRC, XMPP or Matrix ' +
      'and federates with nothing. Two things side by side, never one thing bridging the other.',
  }
}

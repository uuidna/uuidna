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
}

/** chatSend — the ONE send. Seals text under the room ratchet and returns it as a uuid chain. */
export function chatSend(text: string, passphrase: string, room: string, step: number): ChatMessage {
  if (!Number.isInteger(step) || step < 0) throw new Error('chat: step must be a non-negative integer — it rotates the key, and a reused step reuses a key')
  const sealed = encryptSession(text, passphrase, room, step)
  return { room, step, chain: imprintTextChain(JSON.stringify(sealed)), roomAddress: toUuid('chat:room:' + room) }
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

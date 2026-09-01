// quantum/os/socialapi — THE SOCIAL PORT: A MESSAGE WITH AN AUDIENCE, WHICH IS NOT A MESSAGE WITH A RECIPIENT.
//
// The chat port owns the live channel: two parties, a shared ratchet, a private symmetric link. Everything
// Alpine ships for the OTHER half — mail, news, feeds, calendars, contacts — had never been counted here, and
// it is the larger half. The difference is not a shelf label. A chat message is sealed TO someone and its
// security is that no one else can open it; a post is addressed FOR everyone and its integrity is that no one
// can alter it, reorder it, or put words in its author's mouth. Confidentiality and attribution are different
// problems, so this port is a different API rather than chat with a wider recipient list.
//
// THREE PROPERTIES, EACH ONE A THING THE CHANNEL DOES NOT NEED:
//
//   • A FEED IS ORDERED, AND THE ROOT MUST SAY SO. merkleGravity folds order-INVARIANTLY, which is right for a
//     set of files and wrong for a timeline — reordering someone's posts changes what they said. This tree has
//     already shipped that exact bug once (fsVerify returned ok for reordered files), so the position is bound
//     into every leaf here and a permuted feed has a different root by construction, not by convention.
//
//   • A FOLLOW IS DIRECTED. follow(a,b) and follow(b,a) are different edges with different addresses, because
//     being read by someone is not the same as reading them. The channel's link is symmetric; this one is not,
//     and the asymmetry is the whole shape of a social graph.
//
//   • ATTRIBUTION IS IN THE ADDRESS. The same text by two authors gets two addresses; the same text by the same
//     author gets one. Re-attribution is therefore visible by construction — the address covers author AND
//     bytes, so changing the author changes the address — and a repost is provably the same bytes rather than
//     a claim that it is.
//
// THE GATE AND THE SCRUB BOTH APPLY, and they matter more here than on the channel. A private message reaches
// one reader who knows the sender; a post reaches an audience that does not, and a fabricated theorem citation
// travelling to strangers is the forgery this tree refuses to seal. Posting is REFUSED on a fabricated citation.
// Reading returns text scrubbed of the bidi and control code points that make displayed text differ from actual
// text (CVE-2021-42574) — disclosed, never silently, with the raw bytes alongside because the address is over
// those. Nothing here federates: no ActivityPub is spoken, no mail is delivered, no feed is fetched.
import { domainCensus, DOMAIN_PATTERNS, type DomainCensus } from '../domains/index.js'
import { catalogue } from '../catalogue/index.js'
import { gateMessage, type MessageGate } from '../chat/index.js'
import { scrubString } from '../../../sanitize.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'

export const SOCIAL_DOMAIN = 'social' as const

export const socialCensus = (): DomainCensus => {
  const c = domainCensus(SOCIAL_DOMAIN)
  if (!c) throw new Error(`socialapi: DOMAIN_PATTERNS carries no "${SOCIAL_DOMAIN}" domain — the census and the API disagree about what exists`)
  return c
}

const socialMembers = (): { name: string; desc: string }[] => {
  const pat = DOMAIN_PATTERNS.find((d) => d.domain === SOCIAL_DOMAIN)
  if (!pat) return []
  return catalogue().filter((p) => pat.match.test(p.name) || pat.match.test(p.desc)).map((p) => ({ name: p.name, desc: p.desc }))
}

export interface SocialShelf { shelf: string; packages: number }

// THE SHELVES OVERLAP ON PURPOSE, exactly as chat's protocol families do: a package that reads mail AND news
// belongs on both, and forcing it onto one would erase the fact that makes it worth naming. These do not sum to
// the census and are not meant to.
const SHELVES: readonly (readonly [string, RegExp])[] = [
  ['mail', /\b(e-?mail|imap|smtp|pop3|maildir|mbox|\bmua\b|\bmta\b|webmail|mail (transfer|delivery|server|client|filter))\b/i],
  ['news', /\b(nntp|usenet|newsreader|news ?server)\b/i],
  ['feeds', /\b(rss|atom feed|feed (reader|aggregator)|syndicat\w*|microblog\w*)\b/i],
  ['calendar', /\b(caldav|icalendar|calendar\w*)\b/i],
  ['contacts', /\b(carddav|vcard|address ?book)\b/i],
  ['federated', /\b(activitypub|fediverse)\b/i],
]

export function socialShelves(): SocialShelf[] {
  const members = socialMembers()
  return SHELVES.map(([shelf, re]) => ({
    shelf,
    packages: members.filter((m) => re.test(m.name) || re.test(m.desc)).length,
  })).sort((a, b) => b.packages - a.packages || a.shelf.localeCompare(b.shelf))
}

export interface Post {
  /** the author's handle as given — attribution rides in the address, so this is not a claim the reader must trust */
  author: string
  /** the bytes as posted; the address is over THESE, and the scrub must not rewrite what was addressed */
  raw: string
  address: string
  gate: MessageGate
}

export interface ReadPost {
  author: string
  /** what a reader should be shown — scrubbed of code points that make displayed text differ from actual text */
  text: string
  raw: string
  /** true when scrubbing removed something: disclosed, because a silent edit is the attack wearing a defence */
  altered: boolean
  address: string
}

/** post(author, text) — address the bytes to their author. REFUSED on a fabricated theorem citation. */
export function post(author: string, text: string): Post {
  const a = author.trim()
  if (!a) throw new Error('socialapi: REFUSED — a post with no author is not attributable, and attribution is the only thing this port guarantees')
  const gate = gateMessage(text)
  if (gate.fabricated.length) {
    throw new Error(
      `socialapi: REFUSED — the post cites ${gate.fabricated.length} theorem(s) the ledger does not seal ` +
      `(${gate.fabricated.join(', ')}). A private message reaches one reader who knows the sender; a post reaches ` +
      'an audience that does not, and addressing a forgery for an audience is the worse act. Cite a sealed key, or say it without one.',
    )
  }
  return { author: a, raw: text, address: toUuid(`post:${a}|${text}`), gate }
}

/** readPost — the display side: scrubbed text, the raw bytes, and whether they differ. */
export function readPost(p: Post): ReadPost {
  const text = scrubString(p.raw)
  return { author: p.author, text, raw: p.raw, altered: text !== p.raw, address: p.address }
}

/** feedRoot(posts) — the ordered fold. POSITION IS BOUND INTO EVERY LEAF, so a permutation is a different feed. */
export function feedRoot(posts: readonly Post[]): string {
  return merkleGravity(posts.map((p, i) => toUuid(`feed:${i}|${p.address}`)))
}

export interface FollowEdge { from: string; to: string; address: string }

/** follow(from, to) — a DIRECTED edge. follow(a,b) and follow(b,a) are different edges, and their addresses differ. */
export function follow(from: string, to: string): FollowEdge {
  const f = from.trim()
  const t = to.trim()
  if (!f || !t) throw new Error('socialapi: REFUSED — a follow needs both ends named; an edge with an anonymous end points nowhere')
  return { from: f, to: t, address: toUuid(`follow:${f}->${t}`) }
}

/** timeline(handle, posts, edges) — the posts by whom `handle` follows, in the feed's own order, plus its root. */
export function timeline(handle: string, posts: readonly Post[], edges: readonly FollowEdge[]): { handle: string; posts: ReadPost[]; root: string } {
  const h = handle.trim()
  const followed = new Set(edges.filter((e) => e.from === h).map((e) => e.to))
  const mine = posts.filter((p) => followed.has(p.author))
  return { handle: h, posts: mine.map(readPost), root: feedRoot(mine) }
}

export interface SocialApiCensus {
  definition: 'alpine-social-port·one-api'
  ported: { packages: number; origins: number }
  shelves: SocialShelf[]
  /** what this port does that the chat port does not — stated, because two message ports need a reason each */
  distinctFromChat: string
  api: readonly string[]
  receipt: string
  honest: string
}

/** socialApi() — what was ported, and the one addressed feed that stands beside it. */
export function socialApi(): SocialApiCensus {
  const c = socialCensus()
  const shelves = socialShelves()
  return {
    definition: 'alpine-social-port·one-api',
    ported: { packages: c.packages, origins: c.origins },
    shelves,
    distinctFromChat:
      'chat seals a message TO someone and its security is confidentiality; social addresses a post FOR everyone ' +
      'and its integrity is attribution, order and non-alteration. The two ports share a gate and nothing else.',
    api: ['post', 'readPost', 'feedRoot', 'follow', 'timeline', 'socialShelves', 'socialCensus'],
    receipt: toUuid(`social|${c.packages}|${c.origins}|${shelves.map((s) => s.shelf + ':' + s.packages).join(',')}`),
    honest:
      'PORT = PROVENANCE: names and versions as Alpine publishes them — no mail is delivered, no feed fetched, no ' +
      'ActivityPub spoken, nothing federated. API = uuidna\'s OWN addressed feed: a post is content-addressed to ' +
      'its author, a feed root binds position so a permutation is a different feed, and a follow is directed. ' +
      'Posting is refused on a fabricated citation; reading is scrubbed and the scrub is disclosed.',
  }
}

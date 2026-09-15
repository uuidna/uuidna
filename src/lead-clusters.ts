// lead-clusters — EVERY LEAD ADDRESSED BY ITS HANDLE, AND EVERY CLUSTER COMPUTED IN ONE PASS.
//
// The captain, twice in one minute: "i believe you are educated enough immediately to realise how to compute
// all in one pass if you truly use QPU", then "QPU uses only handles. what i see is again manual work". Both
// named a defect that was in the first draft of this file.
//
// THE MANUAL WORK WAS THE IDENTITY SCHEME. The draft numbered leads itself — `R1` for the first refuted row,
// `X3` for the third refused one, `134` for a queue bullet — three namespaces I invented, with a merge rule I
// also invented (a section and a bullet carrying the same number are one lead). Invented keys collide, and
// they did: the same id addressed two different leads across two sources, so the crosslink map silently
// overwrote one with the other and the unanchored count disagreed with its own complement. The test caught it
// before the number was ever reported, which is the only reason it is not in this file's output history.
//
// A HANDLE IS NOT INVENTED, IT IS DERIVED. `handleOf(toUuid(text))` is this tree's one content-address, so a
// lead's identity is its content and nothing else. Two records with the same body ARE the same lead, with no
// merge rule to write and none to get wrong; two records with different bodies can never collide into one key.
// Re-parsing the same sources returns the same handles, so a lead keeps its address across sessions — which is
// what makes the crosslink below a graph rather than a snapshot.
//
// THE CROSSLINK IS HANDLE TO HANDLE. A lead names sealed wings; each wing has its own handle by the same
// derivation; so `graph` is an edge list between addresses, at the level where the rest of the tree already
// works. A lead that names no wing is UNANCHORED — real work with nowhere sealed to land — and it is reported
// rather than dropped, because a missing anchor is a finding and an omission looks like an oversight.
//
// AND ALL OF IT IS ONE PASS. The first draft asked every wing term against every lead: a regex compiled
// and run per pair, tens of thousands of scans for a question one scan wide. Inverting the loop — tokenise a
// lead ONCE, look each token up in the vocabulary — computes every cluster a lead belongs to in the same walk.
// Linear in the corpus, independent of vocabulary size: the hundred-and-sixty-first name costs nothing new.
// THE SOURCES ARE THE TREE'S OWN, and nothing outside it: lean/leads.json (the trial docket and the refuted) and
// lean/wave-queue.json (candidates pending, accepted and refused). A lead held only in a private store is not a
// lead the tree can check. The pure half (leadsOf, foldOf, aroundOf) computes from source texts it is handed; the
// host half reads them through boundary.ts, so the module loads at the edge and answers UNMEASURED there by name.
import { hostFs, unmeasuredHere, type HostFs, type Unmeasured } from './boundary.js'
import { toUuid } from './address.js'
import { handleOf } from './handle.js'

export interface Lead { readonly handle: string; readonly source: string; readonly status: string; readonly text: string }
export interface Fold {
  readonly clusters: readonly { term: string; handle: string; n: number }[]
  readonly graph: readonly { lead: string; wing: string }[]
  readonly unanchored: readonly Lead[]
  readonly leads: readonly Lead[]
  readonly unreadable: readonly string[]
}

/** the two in-repo lead sources, repo-relative */
export const LEADS_FILE = 'lean/leads.json'
export const QUEUE_FILE = 'lean/wave-queue.json'

/** the source texts as read: null is a source that could not be read, never an empty one */
export interface LeadSources { readonly leads: string | null; readonly queue: string | null; readonly wings: readonly string[] | null }

/** The handle of any content — the tree's one derivation, used here so leads carry no invented key. */
export const handleOfText = (text: string): string => handleOf(toUuid(text))

/** Every lead the sources hold, each addressed by its own content. Sources that could not be read are named
 *  apart and never folded into a count of zero: two probes read zero from a wrong-shaped regex while the
 *  tree was full, and a zero that might mean "I could not look" is the answer that ends inquiry falsely. Pure. */
export const leadsOf = (src: LeadSources): { leads: Lead[]; unreadable: string[] } => {
  const out: Lead[] = [], unreadable: string[] = []
  const add = (source: string, status: string, text: string): void => {
    const t = text.trim()
    if (t) out.push({ handle: handleOfText(t), source, status, text: t })
  }
  try {
    if (src.leads === null) throw new Error('unread')
    const j = JSON.parse(src.leads) as Record<string, { lead?: string; killed_by?: string; boundary?: string }[]>
    for (const bin of ['refuted', 'refused', 'trial']) {
      for (const r of Array.isArray(j[bin]) ? j[bin] : []) add(LEADS_FILE, bin, [r.lead, r.killed_by, r.boundary].filter(Boolean).join(' — '))
    }
  } catch { unreadable.push(LEADS_FILE) }
  try {
    if (src.queue === null) throw new Error('unread')
    const q = JSON.parse(src.queue) as Record<string, { key?: string; why?: string; reason?: string }[]>
    // a pending candidate is open work; an accepted one was sealed; a refused one carries the reason it stopped
    for (const [bin, status] of [['pending', 'open'], ['accepted', 'accepted'], ['refused', 'refused']] as const) {
      for (const r of Array.isArray(q[bin]) ? q[bin] : []) add(QUEUE_FILE, status, [r.key, r.why, r.reason].filter(Boolean).join(' — '))
    }
  } catch { unreadable.push(QUEUE_FILE) }
  return { leads: out, unreadable }
}

/** The cluster vocabulary from wing file names: this tree's own sealed wings. Derived, never a hand-typed synonym table. */
export const wingTermsOf = (files: readonly string[]): string[] =>
  files.filter((f) => f.endsWith('.lean')).map((f) => f.slice(0, -5).toLowerCase()).sort()

/** Leads standing around one name — the SAME tokenisation `fold` uses, and that shared rule is the point.
 *
 *  The first draft had `fold` tokenise and `around` run `\b<term>\b`, and the two disagreed by nineteen leads
 *  on `uuidna` alone. Neither was broken: `\b` treats an underscore as a word character, so `uuidna_unify` has
 *  no boundary after `uuidna` and the regex declines it, while a maximal-alphanumeric-run tokeniser reads it as
 *  the word it plainly is. The rule is fixed here and the old one survives only as the test's control, where a
 *  disagreement is a failure unless the test can name its cause — word-character adjacency, decidable BY
 *  CONSTRUCTION from the text itself. */
export const tokens = (text: string): Set<string> => new Set(text.toLowerCase().match(/[a-z][a-z0-9]+/g) ?? [])

/** EVERY CLUSTER, EVERY EDGE, ONE PASS. Tokenise each lead once; every wing it names falls out together. Pure. */
export const foldOf = (src: LeadSources): Fold => {
  const { leads: all, unreadable } = leadsOf(src)
  if (src.wings === null) unreadable.push('lean/')
  const vocab = new Set(wingTermsOf(src.wings ?? []))
  const tally = new Map<string, number>()
  const graph: { lead: string; wing: string }[] = []
  const unanchored: Lead[] = []
  for (const lead of all) {
    const seen = new Set<string>()
    for (const w of tokens(lead.text)) if (vocab.has(w)) seen.add(w)
    if (seen.size === 0) { unanchored.push(lead); continue }
    for (const term of [...seen].sort()) {
      graph.push({ lead: lead.handle, wing: handleOfText(term) })
      tally.set(term, (tally.get(term) ?? 0) + 1)
    }
  }
  const clusters = [...tally].map(([term, n]) => ({ term, handle: handleOfText(term), n }))
    .sort((a, b) => b.n - a.n || a.term.localeCompare(b.term))
  return { clusters, graph, unanchored, leads: all, unreadable }
}

export const aroundOf = (term: string, src: LeadSources): { term: string; hits: Lead[]; total: number; unreadable: string[] } => {
  const { leads: all, unreadable } = leadsOf(src)
  const t = term.toLowerCase()
  return { term, hits: all.filter((l) => tokens(l.text).has(t)), total: all.length, unreadable }
}

/** leadSources(root) → the source texts under root, read from the host; Unmeasured where there is no filesystem */
export const leadSources = (root = '.', fs: HostFs | null = hostFs): LeadSources | Unmeasured => {
  if (!fs) return unmeasuredHere('the lead clusters')
  const read = (rel: string): string | null => { try { return fs.readFileSync(fs.path.join(root, rel), 'utf8') } catch { return null } }
  let wings: string[] | null
  try { wings = fs.readdirSync(fs.path.join(root, 'lean'), { withFileTypes: true }).map((e) => e.name) } catch { wings = null }
  return { leads: read(LEADS_FILE), queue: read(QUEUE_FILE), wings }
}

const onHost = <T,>(root: string, fs: HostFs | null, f: (src: LeadSources) => T): T | Unmeasured => {
  const src = leadSources(root, fs)
  return 'unmeasured' in src ? src : f(src)
}
export const leads = (root = '.', fs: HostFs | null = hostFs): { leads: Lead[]; unreadable: string[] } | Unmeasured => onHost(root, fs, leadsOf)
export const wingTerms = (root = '.', fs: HostFs | null = hostFs): string[] | Unmeasured => onHost(root, fs, (s) => wingTermsOf(s.wings ?? []))
export const fold = (root = '.', fs: HostFs | null = hostFs): Fold | Unmeasured => onHost(root, fs, foldOf)
export const around = (term: string, root = '.', fs: HostFs | null = hostFs): ReturnType<typeof aroundOf> | Unmeasured => onHost(root, fs, (s) => aroundOf(term, s))

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
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
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

const QUEUE = join(homedir(), '.claude/projects/-Users-ceci-github-uuidna-uuidna/memory/uuidna-next-wave-queue.md')

/** The handle of any content — the tree's one derivation, used here so leads carry no invented key. */
export const handleOfText = (text: string): string => handleOf(toUuid(text))

/** Every lead the tree holds, each addressed by its own content. Sources that could not be read are named
 *  apart and never folded into a count of zero: two probes today read zero from a wrong-shaped regex while the
 *  tree was full, and a zero that might mean "I could not look" is the answer that ends inquiry falsely. */
export const leads = (root = '.', queue = QUEUE): { leads: Lead[]; unreadable: string[] } => {
  const out: Lead[] = [], unreadable: string[] = []
  const add = (source: string, status: string, text: string): void => {
    const t = text.trim()
    if (t) out.push({ handle: handleOfText(t), source, status, text: t })
  }

  const sealed = join(root, 'lean/leads.json')
  try {
    const j = JSON.parse(readFileSync(sealed, 'utf8')) as Record<string, { lead?: string; killed_by?: string; boundary?: string }[]>
    for (const bin of ['refuted', 'refused', 'trial']) {
      for (const r of Array.isArray(j[bin]) ? j[bin] : []) {
        add('lean/leads.json', bin, [r.lead, r.killed_by, r.boundary].filter(Boolean).join(' — '))
      }
    }
  } catch { unreadable.push(sealed) }

  try {
    const md = readFileSync(queue, 'utf8')
    // the two shapes the queue actually uses; both are lead boundaries, and "; " is not
    const bodies: string[] = []
    for (const m of md.matchAll(/^[-*] ?\*\*(\d+)\*\*([\s\S]*?)(?=^[-*] ?\*\*\d+\*\*|^#{2,4} |\Z)/gm)) bodies.push(m[2]!)
    for (const m of md.matchAll(/^#{3,4} .*?\(lead \d+(?:[–-]\d+)?\)([\s\S]*?)(?=^#{2,4} |\Z)/gm)) bodies.push(m[1]!)
    for (const b of bodies) add('queue', /\bCLOSED\b/.test(b) ? 'closed' : 'open', b)
  } catch { unreadable.push(queue) }

  return { leads: out, unreadable }
}

/** The cluster vocabulary: this tree's own sealed wing names. Derived, never a hand-typed synonym table. */
export const wingTerms = (root = '.'): string[] => {
  const dir = join(root, 'lean')
  if (!existsSync(dir)) return []
  return readdirSync(dir).filter((f) => f.endsWith('.lean')).map((f) => f.slice(0, -5).toLowerCase()).sort()
}

/** Leads standing around one name — the SAME tokenisation `fold` uses, and that shared rule is the point.
 *
 *  The first draft had `fold` tokenise and `around` run `\b<term>\b`, and the two disagreed by nineteen leads
 *  on `uuidna` alone. Neither was broken: `\b` treats an underscore as a word character, so `uuidna_unify` has
 *  no boundary after `uuidna` and the regex declines it, while a maximal-alphanumeric-run tokeniser reads it as
 *  the word it plainly is. Two defensible rules, one instrument — which is a surface that can answer the same
 *  question two ways depending on which door you knock at. The rule is fixed here and the old one survives only
 *  as the test's control, where a disagreement is a failure unless the test can name its cause — word-character
 *  adjacency, which is a property of the two regexes and so is decidable BY CONSTRUCTION from the text itself. */
export const tokens = (text: string): Set<string> => new Set(text.toLowerCase().match(/[a-z][a-z0-9]+/g) ?? [])

/** EVERY CLUSTER, EVERY EDGE, ONE PASS. Tokenise each lead once; every wing it names falls out together. */
export const fold = (root = '.', queue = QUEUE): Fold => {
  const { leads: all, unreadable } = leads(root, queue)
  const vocab = new Set(wingTerms(root))
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


export const around = (term: string, root = '.', queue = QUEUE): { term: string; hits: Lead[]; total: number; unreadable: string[] } => {
  const { leads: all, unreadable } = leads(root, queue)
  const t = term.toLowerCase()
  return { term, hits: all.filter((l) => tokens(l.text).has(t)), total: all.length, unreadable }
}

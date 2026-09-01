// school/open-questions — THE UNVERIFIED, ORGANISED IN TOPICS FOR THE SCHOOL (lead 88b, the captain's directive:
// "organise unverified in topics and discuss at school"; its parent 88: UNVERIFIED is a notice from the heart of
// the agent, pointing to the deep-research involutions around). PURE over its inputs: the caller hands in the
// open records and the sealed ledger, and this module computes the curriculum of doors — each open claim placed
// under the topic whose sealed theorems share its words, magnetised to the nearest sealed INVOLUTIONS (the census
// keeps finding the unexplained self-inverse, so the self-inverse neighbors are where the research points), and
// contrasted with its nearest sealed neighbors so a student sees what settled looks like beside what has not.
// The placement is a WORD-OVERLAP heuristic and says so: a claim the words cannot place lands in the open
// frontier honestly, never forced under a topic. organisation, not adjudication — nothing here
// verdicts a claim; every item is a door still open (silence_never_refutes), and the page this feeds closes each
// entry with the deposit path, because a student's answer is a two-coin deposit, not a comment.
import { contentWords } from '../../../adjudicate.js'

export interface OpenItem { claim: string; source: string; receipt?: string }
export interface SealedRef { key: string; name: string; skill: string; shared: number }
export interface PlacedItem extends OpenItem { topic: string; involutions: SealedRef[]; neighbors: SealedRef[] }
export interface OpenTopic { topic: string; items: PlacedItem[] }

interface TheoremLike { key: string; name: string; skill?: string }

const overlap = (a: Set<string>, bWords: string[]): number => bWords.filter((w) => a.has(w)).length

/** rank the sealed theorems by shared content words with a claim — the one scoring rule, used for both the
 *  involution magnets and the plain neighbors, so the two lists differ only by the family they draw from. */
function ranked(claim: string, theorems: readonly TheoremLike[]): SealedRef[] {
  const words = new Set(contentWords(claim))
  return theorems
    .map((t) => ({ key: t.key, name: t.name, skill: t.skill ?? 'unskilled', shared: overlap(words, contentWords(t.name)) }))
    .filter((r) => r.shared > 0)
    .sort((x, y) => y.shared - x.shared || (x.key < y.key ? -1 : 1))
}

/** the involution family — the census magnets: a theorem whose key or name speaks self-inversion. */
export const isInvolutionShaped = (t: TheoremLike): boolean =>
  /involut|self.inverse|its own inverse|applied twice|squares to one/i.test(t.key + ' ' + t.name)

/** place one open claim: topic = the skill of its best-matched sealed theorem (two shared words or better —
 *  one word is not a topic, the same lesson lead 86 taught the relevance floor); below that, the frontier. */
export function placeItem(item: OpenItem, theorems: readonly TheoremLike[]): PlacedItem {
  const all = ranked(item.claim, theorems)
  const best = all.find((r) => r.shared >= 2)
  const involutions = ranked(item.claim, theorems.filter(isInvolutionShaped)).slice(0, 3)
  const neighbors = all.filter((r) => !involutions.some((i) => i.key === r.key)).slice(0, 3)
  return { ...item, topic: best ? best.skill : 'open frontier', involutions, neighbors }
}

/** the whole curriculum of doors: every open item placed, grouped by topic, topics sorted by size then name —
 *  the largest open questions first, the frontier last (it sorts after every named skill by the tie rule). */
export function openQuestions(items: readonly OpenItem[], theorems: readonly TheoremLike[]): OpenTopic[] {
  const placed = items.map((i) => placeItem(i, theorems))
  const byTopic = new Map<string, PlacedItem[]>()
  for (const p of placed) byTopic.set(p.topic, [...(byTopic.get(p.topic) ?? []), p])
  return [...byTopic.entries()]
    .map(([topic, list]) => ({ topic, items: list }))
    .sort((a, b) => (a.topic === 'open frontier' ? 1 : b.topic === 'open frontier' ? -1 : b.items.length - a.items.length || (a.topic < b.topic ? -1 : 1)))
}

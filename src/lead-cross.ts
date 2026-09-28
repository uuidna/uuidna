// lead-cross — CROSS THE LEADS AGAINST EACH OTHER AND AGAINST THE SERVED SURFACE.
//
// The captain, 2026-09-28: "Develop all leads purging fake ones" and "Cross the leads to find the cross formulas and
// applications". Those are one computation. Crossing 121 leads shows which of them are ONE lead restated many times —
// the cluster names the capability, which is the cross formula — and checking each against the tools the server already
// serves shows which name something that already exists, which is a FAKE lead.
//
// WHY A FAKE LEAD IS NOT DELETED. leads-gate is explicit: "A lead is never settled by deletion or by wording — the
// record keeps what was tried." A lead naming a door that exists is settled by REFUTATION, with the tool's name as the
// evidence, and the record keeps that it was once believed missing. Purging by deletion would destroy the only trace of
// why anyone thought the capability was absent, which for a discoverability failure is the entire finding.
//
// AND THE DISCOVERABILITY FAILURE IS THE FINDING. Measured: uuidna_theorem EXISTS, and "no door serves a theorem by key"
// was recorded four separate times. Asking the catalogue for "theorem" returns it NINTH of eighteen, behind get_skills,
// compute_skill, get_handle, get_tokens and get_cost, under the stub description "Get theorem". Four sessions looked,
// none found it, each recorded a missing door. The lead is false and the search is the defect.
//
// MATCHING IS DELIBERATELY CONSERVATIVE. A lead is called served only when a tool's own name or description carries the
// lead's DISTINCTIVE words — the ones the corpus of leads rarely uses. Matching on common words would refute real leads
// by coincidence, and a wrongly refuted lead is worse than an open one: an open lead is a question, a wrongly closed one
// is a false answer with a receipt.

/** one lead, as the gate records it */
export interface LeadRow { source: string; what: string; owes?: string }

/** a tool the server serves */
export interface ToolRow { name: string; description: string }

const WORDS = (s: string): string[] => (s.toLowerCase().match(/[a-z]{4,}/g) ?? [])

/**
 * Words that say nothing about WHICH capability a lead is about — measured from the lead corpus, never listed.
 *
 * A word is common when it appears in more than a quarter of the leads AND in more than two of them. The second
 * condition is not decoration: with a share alone the rule degenerates on small corpora, and measured on a three-lead
 * corpus the cap is 0.75, so a word appearing in ONE lead counted as common and every lead came out with no distinctive
 * words at all. A word in two leads cannot be what most leads share: the floor of two is a DECLARED BOUNDARY of this
 * rule, chosen because the share alone degenerates below four leads, as the measurement above shows.
 */
export function commonWords(leads: readonly LeadRow[], shareCap = 4): Set<string> {
  const seen = new Map<string, number>()
  for (const l of leads) {
    for (const w of new Set(WORDS(l.what))) seen.set(w, (seen.get(w) ?? 0) + 1)
  }
  const cap = leads.length / shareCap
  return new Set([...seen].filter(([, n]) => n > cap && n > 2).map(([w]) => w))
}

/** the distinctive words of one lead: its own words, less the ones most leads share */
export function distinctive(lead: LeadRow, common: ReadonlySet<string>): string[] {
  return [...new Set(WORDS(lead.what))].filter((w) => !common.has(w)).sort()
}

export interface Cluster {
  /** the shared distinctive word the cluster is named by — the capability the leads are all asking for */
  on: string
  leads: LeadRow[]
  /**
   * How much the clustered leads have in common BESIDES the naming word: the mean Jaccard overlap of their
   * vocabularies with that word removed.
   *
   * MEASURED AND NECESSARY. Rarity alone named clusters "from", "still" and "runs" — a function word appearing in five
   * of 174 leads looks rare by frequency while identifying nothing, which is the same defect that cost science-classes
   * three rewrites. A real capability word groups leads that share other words too; "from" groups leads with nothing
   * else in common. Low coherence is the signal that the cluster is an artefact of the word rather than a capability.
   */
  coherence: number
}

/** mean pairwise vocabulary overlap of a group, with the naming word removed so it cannot score a free point */
export function coherenceOf(leads: readonly LeadRow[], on: string): number {
  const vocab = leads.map((l) => new Set(WORDS(l.what).filter((w) => w !== on)))
  if (vocab.length < 2) return 0
  let sum = 0
  let pairs = 0
  // capped at the first 12, which bounds a 30-lead cluster to 66 comparisons instead of 435
  const use = vocab.slice(0, 12)
  for (let i = 0; i < use.length; i += 1) {
    for (let j = i + 1; j < use.length; j += 1) {
      const a = use[i]!
      const b = use[j]!
      const union = new Set([...a, ...b])
      if (union.size === 0) continue
      let shared = 0
      for (const w of a) if (b.has(w)) shared += 1
      sum += shared / union.size
      pairs += 1
    }
  }
  return pairs === 0 ? 0 : sum / pairs
}

/**
 * Cross the leads: group them by the distinctive word most of them share.
 *
 * Greedy and largest-first, so the biggest restatement is named before its members can be claimed by a smaller one. A
 * lead joins at most one cluster, because the point is to count how many DISTINCT capabilities 121 leads amount to, and
 * a lead in three clusters would be counted three times.
 */
export function crossLeads(leads: readonly LeadRow[]): { clusters: Cluster[]; alone: LeadRow[] } {
  const common = commonWords(leads)
  const byWord = new Map<string, LeadRow[]>()
  for (const l of leads) {
    for (const w of distinctive(l, common)) {
      const list = byWord.get(w) ?? []
      list.push(l)
      byWord.set(w, list)
    }
  }
  const ranked = [...byWord.entries()]
    .filter(([, ls]) => ls.length >= 2)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
  const taken = new Set<LeadRow>()
  const clusters: Cluster[] = []
  for (const [on, ls] of ranked) {
    const mine = ls.filter((l) => !taken.has(l))
    if (mine.length < 2) continue
    for (const l of mine) taken.add(l)
    clusters.push({ on, leads: mine, coherence: coherenceOf(mine, on) })
  }
  // RANKED BY COHERENCE, not size: the biggest cluster is often the one named by the emptiest word.
  clusters.sort((a, b) => b.coherence - a.coherence || b.leads.length - a.leads.length || a.on.localeCompare(b.on))
  return { clusters, alone: leads.filter((l) => !taken.has(l)) }
}

export interface Verdict {
  lead: LeadRow
  /** the tool that may already serve it — a CANDIDATE, never a settled refutation */
  servedBy: string | null
  /** the distinctive words that matched, so the refutation can be argued with */
  on: string[]
}

/**
 * MEASURED NOT TO WORK, and kept only so the measurement is not repeated. Read this before using it.
 *
 * Over 174 open leads and 250 served tools, matching a lead's distinctive words against tool names and descriptions
 * produced 163 candidates — a 94% hit rate, which is a coincidence rate. Worse, the STRONGEST matches are false too: the
 * top four by matched-word count were inspected and all four are coincidences on generic words, such as a lead about
 * Alpine package classification matching uuidna_domains on "claims, data, database, domain". There is no threshold that
 * separates signal here, because at one word everything matches and at more words the matches are still generic.
 *
 * So the door does not report these, and nothing settles a lead from them. The real finding this was chasing — that
 * uuidna_theorem exists while four sessions recorded "no door serves a theorem by key" — is a DISCOVERABILITY defect in
 * the tool search, which ranks the exact-match door ninth of eighteen under the stub description "Get theorem". Fixing
 * that search would prevent the fake leads from being recorded at all, which is worth more than detecting them after.
 *
 * Which leads name a capability the server may ALREADY serve — CANDIDATES only, never applied.
 *
 * THIS DOES NOT SETTLE ANYTHING, and the reason is a tension I could not resolve in favour of automation. Requiring two
 * distinctive words in common is conservative enough to avoid false refutations — one word is how "no door commits a
 * pathspec" would match a tool about commit messages — but measured against the one fake lead I can name with
 * certainty, "no door serves a theorem by key" against uuidna_theorem, only ONE word matches. So a threshold strict
 * enough to be safe misses the true case, and one loose enough to catch it refutes by coincidence.
 *
 * A wrongly closed lead is worse than an open one: an open lead is a question, a wrongly closed one is a false answer
 * carrying a receipt. And leads-gate already says how a lead may be settled — by the kernel's evidence, or by an
 * explicit `--settle --refute` with a stated reason. So this reports candidates with the words that matched, and a
 * person or the kernel decides. The threshold is one word BECAUSE nothing here is applied.
 */
export function refutationCandidates(
  leads: readonly LeadRow[],
  tools: readonly ToolRow[],
  need = 1,
): Verdict[] {
  // MEASURED: at need = 1 over 250 tools, 163 of 174 leads matched something — 94%, which is a coincidence rate and not
  // a finding. The verdicts are therefore RANKED by how many distinctive words matched, so a reader reads the top and
  // ignores the tail, and the count alone is reported as uninformative rather than as a result.
  const common = commonWords(leads)
  const haystacks = tools.map((t) => ({ name: t.name, text: `${t.name} ${t.description}`.toLowerCase() }))
  const out: Verdict[] = []
  for (const lead of leads) {
    const words = distinctive(lead, common)
    if (words.length < need) continue
    let best: { name: string; hit: string[] } | null = null
    for (const h of haystacks) {
      const hit = words.filter((w) => h.text.includes(w))
      if (hit.length >= need && (best === null || hit.length > best.hit.length)) best = { name: h.name, hit }
    }
    if (best !== null) out.push({ lead, servedBy: best.name, on: best.hit })
  }
  return out.sort((a, b) => b.on.length - a.on.length || a.lead.what.localeCompare(b.lead.what))
}

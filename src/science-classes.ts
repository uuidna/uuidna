// science-classes — GROUP THE PRINCIPLES INTO CLASSES BY SCIENCE DOMAIN, with the domains named by the corpus.
//
// The captain, 2026-09-27: "Group principles as school classes organised by science domain". The school already
// publishes practices, wings, port domains and Clay lessons, and none of those is a science domain: a `domain` in
// domain-wave.ts is a principle or a skill, and the port's 27 domains are Alpine package categories. So the axis the
// captain asked for did not exist, and 246 principles (the 262 less the sixteen HexSpan enumeration parts) sat in no
// scientific order at all.
//
// THE HARD PART IS NOT THE GROUPING, IT IS NOT INVENTING THE TAXONOMY. A hand-written map from wing to science —
// Affine.lean is geometry, Cern.lean is physics — would be exactly the manual logic this repository refuses ("remove
// any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions", 2026-09-14). It would
// also be wrong within a week, because wings arrive faster than a list is maintained.
//
// SO THE DOMAINS ARE READ OUT OF THE WINGS' OWN HEADERS. Every generated wing states its subject in prose on its first
// line, and that prose is the corpus's own account of what the wing is about. A term's weight in a wing is how often
// that wing says it, discounted by how many wings say it at all — so a word every header uses ("theorem", "decided",
// "the") scores near zero everywhere WITHOUT a stopword list, because appearing in every header is precisely what makes
// a term uninformative. There is no vocabulary to maintain: the discount is computed from the headers present.
//
// A DOMAIN IS A WORD SEVERAL WINGS SHARE, and getting this wrong cost a rewrite worth recording. The first version
// gave each wing to its most DISTINCTIVE term, which is the standard weighting and is exactly backwards for this job:
// the discount log(wings/saying) is largest for a word only one wing uses, so every wing won its own private word and
// the result was 100 singleton classes. Cern.lean joined "collision" and CernLinks.lean joined "crossings" — the two
// CERN wings, split by a method meant to group them. Individuation and classification pull in opposite directions.
//
// AND THE MIDDLE OF THE RANGE IS WHERE FUNCTION WORDS LIVE, which the first run of this on the real corpus proved
// embarrassingly: 21 classes, 260 of 262 principles placed, and eighteen of the names were "file", "and", "are",
// "case", "from", "that", "two". No word appears in all 262 headers, so no word is discounted to zero, and "and" —
// used by 43 wings — outscored every real subject term by sheer frequency. The partition was total and meaningless.
//
// THE REAL BUG WAS MULTIPLYING BY OCCURRENCE COUNT, and it took three wrong fixes to see it. "cern" is said by 2 of
// the wings and scored 2 x log(262/2) = 9.8; "file" is said by 81 and scored 81 x 1.17 = 95. Term frequency is the
// right factor for ranking a word WITHIN one document and the wrong one for naming a GROUP, because a word's ubiquity
// is precisely what disqualifies it as a domain name. Dropping the count and scoring by rarity alone puts "cern" nine
// places above "file" and sinks every function word without naming one of them.
//
// COHERENCE SURVIVES AS THE TIEBREAK, not the discriminator, and it needs no list. A function word groups wings that have nothing ELSE in common;
// a domain word groups wings whose whole vocabularies overlap. "and" joins 43 unrelated wings; "arithmetic" joins
// Acoustics, Astronomy, Chemistry and Electromagnetism, which say many of the same other things. So each candidate is
// scored by the mean Jaccard overlap of its members' vocabularies WITH THE NAMING TERM REMOVED — otherwise every
// candidate would score a free point for the word that defined the group. A word that explains nothing beyond itself
// scores near zero and cannot name a class. A later edit described this score as "the share of members using the
// word", which it is not: the score is log(wings / wings-saying-it), a RARITY, and coherence multiplies it only as a
// tiebreak. The distinction matters because a share would rise with popularity and rarity falls with it, which is the
// exact inversion that cost this module three rewrites.
//
// THE CORPUS GROUPS ITS SCIENCES AND DOES NOT NAME THEM, which is the honest end of this and took four attempts to
// reach. With rarity scoring the groups are right: every EquilibriumXor, FermatRing, HexSpan and Involution family
// clusters, and Acoustics, Chemistry, Electromagnetism, Molecular, Optics and Sailing land in one class — a physical
// sciences class, discovered rather than assigned. But that class shares no word meaning "physics", because no header
// ever says "physics". The best shared term is "domain", which names nothing.
//
// SO THE TERM IS NOT PRESENTED AS THE DOMAIN'S NAME. `joinedOn` is the word the wings were grouped by, and the class is
// identified by its MEMBERS, which is what the corpus actually supports. Calling a class "chunk" or "demarcated" a
// science domain would be the flattering reading, and a reader who wants the academic name can supply it — that mapping
// is a human judgement and is not sealed here.
//
// NAMING IS NOT GROUPING, which the coherence run made obvious: the largest class was 81 wings named "file". Those 81
// are the EquilibriumXor family, whose generated headers are near-identical, so their mutual overlap is real and the
// GROUP was correct — only the label was absurd, because the term that happened to win the selection is not
// necessarily the term that describes the members. So a class is named after selection, by the most distinctive term
// every one of its members uses. A word only some members use cannot name the class — nameOf filters to terms every
// member's vocabulary contains, so a partial word is gone before scoring — and among the words all of them use the
// rarest across the corpus wins, because that is the one that says something.
//
// SO THE CANDIDATES ARE THE MIDDLE OF THE RANGE: a term said by more than one wing and by fewer than all of them. A
// word one wing uses names that wing, not a domain; a word every wing uses names nothing. Between those the term still
// carries its discount, so among equally shared words the more informative one wins. Wings then join the best-scoring
// term they contain, greedily, which makes the result a partition — the captain asked for classes, and a principle in
// four classes is a cross-reference, not a class. Ties break alphabetically, so a rerun on an unchanged corpus cannot
// drift.
//
// WHAT THIS IS NOT. It is not a claim that the corpus's vocabulary matches the Dewey decimal system or a university's
// faculty list. The classes are named in the words this ledger uses about itself, and a class called "congruence" is
// honest where "number theory" would be a flattering guess. A reader who wants the academic name can map it; the
// mapping is theirs to make and is not sealed here.

/** one wing, its own account of itself, and the principles sealed in it */
export interface WingSubject {
  wing: string
  /** the wing header's prose — what the corpus says the wing is about */
  subject: string
  principles: readonly string[]
}

export interface ScienceClass {
  /** the word these wings were joined on. NOT the domain's name — the corpus does not name its domains */
  joinedOn: string
  /** how distinctive that word is: the summed weight of the wings that joined */
  weight: number
  wings: string[]
  principles: string[]
}

/** words a header uses, lowercased, with punctuation and digits dropped. No stopword list — see the header. */
export function terms(subject: string): string[] {
  return (subject.toLowerCase().match(/[a-z]{3,}/g) ?? [])
}

/**
 * The weight of every term in every wing: how often the wing says it, discounted by how many wings say it at all.
 *
 * THE DISCOUNT IS `(wings - saying) / wings`, WHICH NEEDS NO LOGARITHM. The textbook form is log(wings / saying), and I
 * wrote it that way until the determinism scan hard-rejected it — Math.* is refused tree-wide, with no exemption,
 * because a float logarithm is a decision the host makes and a wing's arithmetic cannot be. The refusal turned out to
 * be a simplification rather than a cost: nothing here uses the discount's VALUE, only its ORDER, and both expressions
 * fall monotonically as `saying` rises. So the exact rational ranks identically and depends on nothing but integers.
 *
 * Either way it is zero for a term every wing uses, and that zero is the whole reason no stopword list is needed: "the"
 * appears in every header, so its discount is exactly 0 and it can never win a wing, however often that wing repeats it.
 */
export function weigh(subjects: readonly WingSubject[]): Map<string, Map<string, number>> {
  const saying = new Map<string, number>()
  const counted: { wing: string; counts: Map<string, number> }[] = []
  for (const s of subjects) {
    const counts = new Map<string, number>()
    for (const t of terms(s.subject)) counts.set(t, (counts.get(t) ?? 0) + 1)
    for (const t of counts.keys()) saying.set(t, (saying.get(t) ?? 0) + 1)
    counted.push({ wing: s.wing, counts })
  }
  const out = new Map<string, Map<string, number>>()
  for (const { wing, counts } of counted) {
    const w = new Map<string, number>()
    for (const [t, n] of counts) {
      const discount = (subjects.length - (saying.get(t) ?? 1)) / subjects.length
      if (discount > 0) w.set(t, n * discount)
    }
    out.set(wing, w)
  }
  return out
}

/**
 * How much the wings a term groups have in common BESIDES that term: the mean Jaccard overlap of their vocabularies.
 *
 * The naming term is removed from every vocabulary first. Leaving it in would give each candidate a free point for the
 * very word that defined its group, which flatters exactly the function words this is meant to expose.
 *
 * PAIRS ARE CAPPED AT THE FIRST 24 WINGS IN SORTED ORDER, which bounds a term grouping 130 wings to 276 comparisons
 * instead of 8,385. The cap is deterministic — sorted, not sampled — so a rerun on an unchanged corpus gives the
 * identical figure. It is a cost bound and nothing else, and it is stated here rather than hidden in a constant.
 */
export function coherence(vocabularies: ReadonlyMap<string, Set<string>>, wings: readonly string[], term: string): number {
  const use = [...wings].sort().slice(0, 24)
  if (use.length < 2) return 0
  let sum = 0
  let pairs = 0
  for (let i = 0; i < use.length; i += 1) {
    for (let j = i + 1; j < use.length; j += 1) {
      const a = new Set([...(vocabularies.get(use[i]!) ?? [])].filter((t) => t !== term))
      const b = new Set([...(vocabularies.get(use[j]!) ?? [])].filter((t) => t !== term))
      const union = new Set([...a, ...b])
      if (union.size === 0) continue
      let shared = 0
      for (const t of a) if (b.has(t)) shared += 1
      sum += shared / union.size
      pairs += 1
    }
  }
  return pairs === 0 ? 0 : sum / pairs
}

/**
 * The classes: each candidate term claims the unassigned wings that use it, best-scoring term first.
 *
 * A CLASS NEEDS TWO WINGS. A term left with one unassigned wing names that wing rather than a domain, so it is skipped
 * and the wing stays available to a weaker term that still groups it with a peer.
 *
 * A wing no candidate term reaches — an empty header, or a vocabulary it shares with nobody — is reported in
 * `unclassed` rather than swept into a default bucket. A wing the method cannot place is a fact about the method — no
 * candidate term reaches it, which is a property of this scoring and not of the wing — and hiding it behind an "other"
 * class would make the partition look total when it is not.
 */
export function scienceClasses(subjects: readonly WingSubject[]): {
  classes: ScienceClass[]
  unclassed: string[]
} {
  const wings = subjects.length
  const saying = new Map<string, Set<string>>()
  for (const s of subjects) {
    for (const t of terms(s.subject)) {
      const w = saying.get(t) ?? new Set<string>()
      w.add(s.wing)
      saying.set(t, w)
    }
  }
  // the middle of the range: shared by more than one wing, and not by every wing
  const vocabularies = new Map(subjects.map((s) => [s.wing, new Set(terms(s.subject))]))
  const candidates = [...saying.entries()]
    .filter(([, w]) => w.size >= 2 && w.size < wings)
    .map(([term, w]) => ({
      term,
      wings: w,
      // RARITY ALONE. A word two wings share out of 262 says something about both; a word 81 share says nothing.
      score: (wings - w.size) / wings,
      // how much those wings have in common besides the word — only ever a tiebreak between equally rare terms
      cohesion: coherence(vocabularies, [...w], term),
    }))
    .filter((c) => c.score > 0)
    .sort((a, b) =>
      b.score - a.score || b.cohesion - a.cohesion || b.wings.size - a.wings.size || a.term.localeCompare(b.term))

  /** the most distinctive term EVERY member uses — the join word, chosen after the group is fixed */
  const nameOf = (members: readonly string[], fallback: string): string => {
    const shared = [...(vocabularies.get(members[0]!) ?? [])].filter((t) =>
      members.every((w) => vocabularies.get(w)?.has(t)),
    )
    let best = fallback
    let bestWeight = -1
    for (const t of shared) {
      const w = (wings - (saying.get(t)?.size ?? 1)) / wings
      if (w > bestWeight || (w === bestWeight && t < best)) { best = t; bestWeight = w }
    }
    return best
  }

  const principlesOf = new Map(subjects.map((s) => [s.wing, s.principles]))
  const taken = new Set<string>()
  const classes: ScienceClass[] = []
  for (const c of candidates) {
    const mine = [...c.wings].filter((w) => !taken.has(w)).sort()
    if (mine.length < 2) continue
    const principles: string[] = []
    for (const w of mine) {
      for (const p of principlesOf.get(w) ?? []) if (!principles.includes(p)) principles.push(p)
      taken.add(w)
    }
    classes.push({ joinedOn: nameOf(mine, c.term), weight: c.score, wings: mine, principles: principles.sort() })
  }
  classes.sort(
    (a, b) => b.principles.length - a.principles.length || b.weight - a.weight || a.joinedOn.localeCompare(b.joinedOn),
  )
  const unclassed = subjects.map((s) => s.wing).filter((w) => !taken.has(w)).sort()
  return { classes, unclassed }
}

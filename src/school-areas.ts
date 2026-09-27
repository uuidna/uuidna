// school-areas — THE TWELVE LEARNING AREAS, named by the captain, with every wing ASSIGNED BY COMPUTATION.
//
// The captain, 2026-09-28: "For a coherent school architecture, I would not stop at a list of subjects. I would build
// it as a set of larger learning areas, so that traditional subjects remain recognisable but interdisciplinary work is
// easy." What follows is that architecture, in the captain's own words.
//
// WHY THE TAXONOMY IS THE CAPTAIN'S AND THE ASSIGNMENT IS NOT. src/science-classes.ts groups the 262 principles by
// their wings' own vocabulary and reaches an honest dead end: the grouping is right — Acoustics, Chemistry,
// Electromagnetism, Molecular, Optics and Sailing land together — but the corpus cannot NAME that class, because no
// header ever says "physics". The best shared word is "domain", which names nothing. That module says so and stops,
// leaving the academic name to a person, because inventing one would be the flattering reading.
//
// This file is that person's answer. The twelve areas and their subjects are a decision no theorem decides, which is
// exactly the kind of thing the captain is asked for (AGENTS.md: "Ask the captain only for credentials, irreversible
// outward acts, or a choice no theorem decides"). So they are recorded here as given, dated and attributed, the way
// src/laws.ts records the captain's words rather than paraphrasing them.
//
// AND THE ASSIGNMENT IS NOT COMPUTABLE FROM THIS CORPUS, which took three measurements to accept and is the honest
// result of this file. Matching each wing's header against the areas' subject vocabulary was tried three ways:
// discounting words by how many AREAS use them placed Byte and Cipher under "Body, Movement & Performance" and 78 wings
// under "Economy, Law & Politics"; adding a discount for how many HEADERS use them barely moved it; requiring a word
// the corpus treats as characteristic collapsed it to 22 placements with Symphony under "Art, Design & Making" and
// Acoustics, Chemistry and Optics unplaced. Swinging between 231 and 22 is not a method needing a better threshold.
//
// THE REASON IS THAT THE CORPUS NEVER SAYS WHICH SCIENCE A WING BELONGS TO. Placing Acoustics under physics requires
// knowing that acoustics is a branch of physics, and that is world knowledge, not a fact in any header. A score built
// on word overlap can only ever be a guess wearing a number, and a guess presented as a computation is worse here than
// no answer, because the next reader would trust it.
//
// SO THIS FILE OFFERS CANDIDATES AND REFUSES TO ASSIGN. `candidatesFor` names the wings whose headers share a
// characteristic word with an area, and the word, so a reader can agree or disagree with the evidence in front of them.
// The assignment itself is a choice no theorem decides — the same kind of choice the twelve areas are — and belongs to
// whoever makes it, recorded as theirs. What IS computed, and what actually serves the captain's stated goal that
// "interdisciplinary work is easy", is the entanglement between subjects: src/window-crossroads.ts ranks the junctions
// where two wings share a rare quantity, which is how Sailing meets Optics on [4, 45, 90, 180] and Looms meets Chess on
// [2, 4, 8, 256]. Those cross the areas without needing anyone's taxonomy to be right.
//
// AND THE EMPTY AREAS ARE THE POINT AS MUCH AS THE FULL ONES. Asked for the entanglements between school subjects and
// scientific domains, the ledger answered richly for sport, music, crafts, letters and games — and had no wing at all
// for circus, dance, theatre, law, economics or first aid, all of which this architecture names. An area with no wing
// is a curriculum this ledger cannot yet teach, and counting those is the honest measure of how much of the captain's
// school actually exists.

import { terms } from './science-classes.js'

export interface LearningArea {
  /** the area's number in the captain's architecture, kept so the order is the captain's and not a sort */
  n: number
  name: string
  /** the captain's own subject list for this area, verbatim */
  subjects: readonly string[]
}

/**
 * The twelve areas, verbatim (the captain, 2026-09-28).
 *
 * Order and wording are the captain's. Area 9 and area 12 carry the captain's own notes on why they are there —
 * "This is often missing from conventional school structures" and "Potentially very valuable if this is an
 * alternative or experimental school" — and those notes are kept because they say what the area is FOR.
 */
export const LEARNING_AREAS: readonly LearningArea[] = [
  { n: 1, name: 'Body, Movement & Performance', subjects: [
    'sports and physical education', 'circus', 'dance and movement', 'theatre and drama',
    'music and singing', 'rhythm', 'performance', 'body awareness', 'health, nutrition and wellbeing'] },
  { n: 2, name: 'Art, Design & Making', subjects: [
    'visual arts', 'drawing and painting', 'sculpture', 'photography and film', 'art and crafts',
    'textile work', 'wood, metal and other materials', 'design', 'architecture', 'fashion',
    'creative technology digital making'] },
  { n: 3, name: 'Language, Literature & Communication', subjects: [
    'mother tongue language of instruction', 'foreign languages', 'literature', 'creative writing',
    'rhetoric and public speaking', 'journalism', 'translation and interpreting', 'media literacy',
    'communication and storytelling'] },
  { n: 4, name: 'Society, History & Human Thought', subjects: [
    'history', 'philosophy', 'ethics', 'religion history of religions', 'sociology', 'psychology',
    'anthropology', 'cultural studies', 'gender and diversity', 'human rights'] },
  { n: 5, name: 'Geography, Nature & Environment', subjects: [
    'geography', 'earth sciences', 'nature studies', 'ecology', 'climate',
    'environment and sustainability', 'agriculture and food systems', 'urban and rural environments',
    'global development', 'human environment relationships'] },
  { n: 6, name: 'Mathematics & Natural Sciences', subjects: [
    'mathematics', 'physics', 'chemistry', 'biology', 'astronomy', 'geology',
    'statistics and probability', 'scientific methods', 'laboratory work', 'systems thinking'] },
  { n: 7, name: 'Technology, Digital Life & AI', subjects: [
    'computer science', 'programming', 'ai and machine learning', 'robotics', 'internet',
    'social media', 'digital literacy', 'data literacy', 'cybersecurity and privacy',
    'digital creativity', 'algorithms and platforms', 'critical understanding of technology',
    'ethics of ai and digital technologies'] },
  { n: 8, name: 'Economy, Law & Politics', subjects: [
    'economics', 'business and entrepreneurship', 'personal finance', 'work and labour', 'law',
    'constitutional principles', 'politics and political systems', 'european union',
    'international relations', 'democracy and civic education', 'public institutions',
    'taxes and public budgets', 'consumer rights', 'media, power and public opinion'] },
  { n: 9, name: 'Life Skills & Society', subjects: [
    'relationships and communication', 'conflict resolution', 'emotional literacy',
    'sexuality and relationships education', 'first aid', 'cooking and nutrition', 'household skills',
    'financial literacy', 'administration and bureaucracy', 'housing and tenancy',
    'employment and contracts', 'parenting and care', 'ageing and intergenerational life',
    'community participation'] },
  { n: 10, name: 'Research, Invention & Projects', subjects: [
    'research methods', 'observation', 'asking questions', 'experimentation', 'project development',
    'collaborative work', 'problem solving', 'prototyping', 'documentation', 'presentation',
    'reflection', 'interdisciplinary projects'] },
  { n: 11, name: 'World, Cultures & Global Perspectives', subjects: [
    'world cultures', 'languages', 'migration', 'indigenous knowledge', 'globalisation',
    'colonialism and postcolonial perspectives', 'international cooperation', 'peace and conflict',
    'cultural heritage', 'comparative societies'] },
  { n: 12, name: 'Environment of the Self', subjects: [
    'identity', 'body', 'attention', 'memory', 'emotions', 'relationships', 'solitude', 'play',
    'failure', 'curiosity', 'creativity', 'death and mortality', 'meaning', 'responsibility'] },
] as const

/**
 * The four transversal dimensions (the captain, 2026-09-28), which "run through all subjects rather than becoming
 * additional subjects". They are deliberately NOT areas and nothing is assigned to them here: a dimension describes
 * what a student DOES with a subject, and this file has no evidence about that. Recording them as data with no
 * assignment is the honest shape — the alternative, scoring wings against them, would manufacture a reading.
 */
export const DIMENSIONS: readonly { name: string; means: string }[] = [
  { name: 'Making', means: 'students produce, build, perform or test something' },
  { name: 'Understanding', means: 'theory, knowledge, history and concepts' },
  { name: 'Encountering', means: 'people, communities, places and the outside world' },
  { name: 'Reflecting', means: 'ethics, critical thinking and self-reflection' },
] as const

/** every word an area's subject list uses, once */
export const areaTerms = (area: LearningArea): Set<string> =>
  new Set(area.subjects.flatMap((s) => terms(s)))

/**
 * How many of the twelve areas use a term — the discount that stops connective words carrying a wing.
 *
 * "and" appears in nine areas' subject lists and says nothing; "textile" appears in one and says a great deal. This is
 * the same judgement science-classes makes about wing headers, applied to the captain's vocabulary instead, and it is
 * why no stopword list is needed here either.
 */
export function areaSpread(areas: readonly LearningArea[] = LEARNING_AREAS): Map<string, number> {
  const spread = new Map<string, number>()
  for (const a of areas) {
    for (const t of areaTerms(a)) spread.set(t, (spread.get(t) ?? 0) + 1)
  }
  return spread
}

/**
 * How many WING HEADERS use a term — the second discount, and the one whose absence made the first census absurd.
 *
 * Measured 2026-09-28: discounting only by how many AREAS use a word placed Byte and Cipher under "Body, Movement &
 * Performance" and 64 EquilibriumXor wings under "Economy, Law & Politics", while Acoustics, Electromagnetism,
 * Molecular and Optics went unplaced. The reason is that the captain's subject lists contain ordinary English words —
 * work, power, body, design, play, memory, performance — each unique among the twelve areas and each ubiquitous in
 * technical prose, where they mean something else entirely. Uniqueness in the taxonomy is not informativeness in the
 * corpus, and only the corpus can say which words it wastes.
 *
 * So a term's weight is 1 / (areas using it x wing headers using it). "acoustics" in one area and one header scores 1;
 * "work" in one area and fifty headers scores a fiftieth. This is the same judgement science-classes had to learn —
 * that ubiquity disqualifies — applied to the other vocabulary.
 *
 * AND WEIGHTING ALONE WAS STILL NOT ENOUGH, which is the second measurement. With both discounts in place the census
 * barely moved: 57 wings still sat under "Body, Movement & Performance" and 78 under "Economy, Law & Politics", because
 * a weak generic match still beats no match, and a wing with only weak matches was still placed. The real finding is
 * that MOST WINGS ARE NOT A SCHOOL SUBJECT AT ALL — 64 EquilibriumXor, 16 HexSpan, 21 FermatRing and the Involution
 * family are this ledger's own machinery, and filing them under a teaching area is a category error however the score
 * is computed. So a term only counts when the CORPUS treats it as characteristic: used by no more wing headers than the
 * median term. A wing with no characteristic match is left unplaced, which for machinery is the correct answer.
 */
export function corpusSpreadOf(
  rows: readonly { subject: string }[],
): Map<string, number> {
  const spread = new Map<string, number>()
  for (const r of rows) {
    for (const t of new Set(terms(r.subject))) spread.set(t, (spread.get(t) ?? 0) + 1)
  }
  return spread
}

export interface Candidacy {
  wing: string
  /** the area whose vocabulary this wing's header shares most — a SUGGESTION, never an assignment */
  area: string | null
  score: number
  /** the characteristic words behind the suggestion, so a reader can disagree with the evidence itself */
  on: string[]
}

/**
 * Place one wing by its own header against the areas' vocabularies.
 *
 * A term scores 1/spread, so a word unique to one area is worth twelve times one shared by all twelve. Ties go to the
 * lower-numbered area, which keeps the captain's order as the tiebreak rather than the alphabet.
 */
export function candidateAreaFor(
  wing: string,
  subject: string,
  areas: readonly LearningArea[] = LEARNING_AREAS,
  spread: Map<string, number> = areaSpread(areas),
  corpus: Map<string, number> = new Map(),
  /** the carrier count at or below which the CORPUS treats a word as characteristic — its own median */
  characteristic: number = corpusMedian(corpus),
): Candidacy {
  const mine = new Set(terms(subject))
  let best: Candidacy = { wing, area: null, score: 0, on: [] }
  for (const a of areas) {
    // ONLY CHARACTERISTIC WORDS PLACE A WING. A word the corpus spends everywhere cannot carry a subject.
    const hit = [...areaTerms(a)].filter((t) => mine.has(t) && (corpus.get(t) ?? 1) <= characteristic)
    let score = 0
    for (const t of hit) score += 1 / ((spread.get(t) ?? 1) * (corpus.get(t) ?? 1))
    if (score > best.score) best = { wing, area: a.name, score, on: hit.sort() }
  }
  return best
}

/** the median carrier count across the corpus's header vocabulary — measured, so the cut moves with the corpus */
export function corpusMedian(corpus: Map<string, number>): number {
  if (corpus.size === 0) return 1
  const counts = [...corpus.values()].sort((a, b) => a - b)
  const mid = counts.length >> 1
  return counts.length % 2 === 1
    ? counts[mid]!
    : ((counts[mid - 1]! + counts[mid]!) - ((counts[mid - 1]! + counts[mid]!) % 2)) / 2
}

export interface AreaCensus {
  area: LearningArea
  /** wings whose header shares a characteristic word with this area — candidates awaiting a decision */
  wings: string[]
  principles: string[]
}

/**
 * The school as CANDIDATES: which wings each area's vocabulary reaches, which reach none, and which areas nothing
 * reaches. Nothing here is an assignment — see the header for why the corpus cannot make one.
 */
export function schoolAreas(
  rows: readonly { wing: string; subject: string; principles: readonly string[] }[],
  areas: readonly LearningArea[] = LEARNING_AREAS,
): { census: AreaCensus[]; unplaced: string[]; empty: string[] } {
  const spread = areaSpread(areas)
  const corpus = corpusSpreadOf(rows)
  const characteristic = corpusMedian(corpus)
  const census: AreaCensus[] = areas.map((area) => ({ area, wings: [], principles: [] }))
  const unplaced: string[] = []
  for (const row of rows) {
    const p = candidateAreaFor(row.wing, row.subject, areas, spread, corpus, characteristic)
    if (p.area === null) { unplaced.push(row.wing); continue }
    const slot = census.find((c) => c.area.name === p.area)!
    slot.wings.push(row.wing)
    for (const pr of row.principles) if (!slot.principles.includes(pr)) slot.principles.push(pr)
  }
  for (const c of census) { c.wings.sort(); c.principles.sort() }
  return {
    census,
    unplaced: unplaced.sort(),
    empty: census.filter((c) => c.wings.length === 0).map((c) => c.area.name),
  }
}

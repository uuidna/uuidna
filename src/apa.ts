// apa — REFERENCES DERIVED FROM THE STRUCTURE, never typed.
//
// A citation is a claim about a work, and this tree does not let a claim be typed when it can be computed. Every
// field of an APA reference already exists somewhere in the repository: the creator list in the archival record
// (.zenodo.json, already stored surname-first, which is APA's own order), the version and repository in the
// package manifest, the release year in the tag that version names, and — for a sealed theorem — its key, its
// wing and its content-address in the ledger itself. So the reference is FOLDED from those, and a reference that
// disagrees with the work is not possible: change the work and the reference moves with it.
//
// WHY THIS MATTERS MORE HERE THAN ELSEWHERE. A hand-typed bibliography is the classic derived-layer defect — a
// restatement of facts held somewhere else, drifting the moment either side moves, and drifting silently because
// nothing compares them. This repository has spent its whole history removing exactly that shape from its ledger;
// its own citations should not be the last place it survives.
//
// THE MISSING YEAR IS (n.d.), WHICH IS APA'S OWN ANSWER AND NOT A GUESS. If no release tag names the version, the
// year is unknown and the reference says so. Substituting the current year would be a clock read standing in for
// a fact, and it would produce a reference that looks complete while resting on nothing — the same shape as a
// witness whose denominator is short. APA already provides the third value; this uses it rather than inventing a
// second-best one.

/** What the archival record and the package manifest between them know about the work. */
export interface WorkFacts {
  /** creators as the archival record stores them — "Surname, Given", APA's own order */
  creators: readonly string[]
  /** the short name the work is published under */
  name: string
  version: string
  /** the release year, or null when no tag names this version — rendered (n.d.), never guessed */
  year: string | null
  url: string
}

/** A sealed theorem, as the ledger holds it. Only the fields a reference needs. */
export interface TheoremFacts {
  key: string
  file: string
  address: string
}

/** "Rouschev, Tsvetan" → "Rouschev, T." — APA initialises given names, and a name already stored surname-first
 *  needs no reordering. Multi-part given names each initialise ("Ivanov, Georgi Petrov" → "Ivanov, G. P."). A
 *  name with no comma is a group author and APA leaves those whole (an organisation is not initialised). */
export const apaName = (stored: string): string => {
  const at = stored.indexOf(',')
  if (at === -1) return stored.trim()
  const surname = stored.slice(0, at).trim()
  const initials = stored.slice(at + 1).trim().split(/\s+/).filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + '.').join(' ')
  return initials ? `${surname}, ${initials}` : surname
}

/** APA joins two authors with an ampersand and three or more with commas plus a final ampersand. */
export const apaAuthors = (creators: readonly string[]): string => {
  const names = creators.map(apaName).filter(Boolean)
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]!
  if (names.length === 2) return `${names[0]} & ${names[1]}`
  return `${names.slice(0, -1).join(', ')}, & ${names[names.length - 1]}`
}

/** the year, or APA's own marker for a work whose date is genuinely unknown */
export const apaYear = (year: string | null): string => year ?? 'n.d.'

/** The work itself, as APA renders software:
 *  Author. (Year). *Title* (Version x.y.z) [Computer software]. URL */
export const apaWork = (w: WorkFacts): string =>
  `${apaAuthors(w.creators)} (${apaYear(w.year)}). ${w.name} (Version ${w.version}) [Computer software]. ${w.url}`

/** A sealed theorem, cited as a component of the work it lives in. APA has no theorem type; a named part of a
 *  larger software work takes the In-form, and the CONTENT-ADDRESS stands where a page number would — it is the
 *  locator that makes the citation recomputable rather than merely findable. */
export const apaTheorem = (t: TheoremFacts, w: WorkFacts): string =>
  `${apaAuthors(w.creators)} (${apaYear(w.year)}). ${t.key} [Sealed theorem]. ` +
  `In ${w.name} (Version ${w.version}) [Computer software]. ${t.file}. ${t.address}`

/** the in-text form: (Rouschev, 2026) — and for a specific proof, the key stands where a page would. */
export const apaInText = (w: WorkFacts, key?: string): string => {
  const surname = (w.creators[0] ?? '').split(',')[0]!.trim()
  const stem = `${surname}, ${apaYear(w.year)}`
  return key ? `(${stem}, ${key})` : `(${stem})`
}

/** the reference LIST for a set of cited theorems: the work first, then each theorem, alphabetised by the key
 *  that identifies it — APA orders a reference list, and ordering it by the locator keeps the sort computable
 *  rather than editorial. Deduplicated, because one theorem cited twice is one reference. */
export const apaReferences = (theorems: readonly TheoremFacts[], w: WorkFacts): string[] => {
  const seen = new Map<string, TheoremFacts>()
  for (const t of theorems) if (!seen.has(t.key)) seen.set(t.key, t)
  return [apaWork(w), ...[...seen.values()].sort((a, b) => a.key.localeCompare(b.key)).map((t) => apaTheorem(t, w))]
}

// resonance — ONE NEIGHBOURHOOD COMPUTATION, FOR ANYTHING WITH AN ADDRESS.
//
// WHY THIS EXISTS, and it is a correction rather than a feature. Over one session I answered the same shape of
// question fifteen times with fifteen throwaway scripts: which moduli does the family cover, what did the cached
// ledger miss, what resonates around these deposits, which frames can disagree, which statements survive an
// involution. Every one was a `node -e` that ran once, printed, and was deleted. That is precisely the defect
// this tree spends its finders refusing — a bespoke checker per question, each with its own blind spot, none of
// them able to be run again by anyone else — and diagnosing it in other people's code while practising it in my
// own is the least defensible thing I did all night.
//
// ONE FOR ALL: a single computation serves every auditable. ALL FOR ONE: every auditable is served by it, because
// the only thing it requires is an ADDRESS. A theorem, a book, a course, a deposit, a commit — the tree already
// content-addresses all of them, and `message_carries_address` already seals that the address is what travels.
// So a neighbourhood needs no per-type code: give it addressed subjects and the axes to compare them on.
//
// AXES ANSWER IN THREE STATES, like every other instrument here. An axis that cannot read a subject returns
// `cannot-see` and is excluded from the denominator, rather than silently scoring zero — a subject that no axis
// can read must be distinguishable from a subject that resonates with nothing. Those are different findings, and
// the second one is real: `connect-lonely` exists because a sealed thing with no neighbours is worth naming.
//
// NOTHING HERE RANKS BY OPINION. An axis reports a shared VALUE or nothing; the neighbourhood is who shares it,
// counted. There is no weighting, no score, no tuning constant — those are the guesses that wear the clothes of
// laws, and the one I already had to delete from a margin gate tonight.

/** Anything the tree can address. `facets` are the axes' raw material — never interpreted here. */
export interface Subject {
  id: string
  address: string
  facets: Readonly<Record<string, string | number | undefined>>
}

export type Reading = 'read' | 'cannot-see'

/** An axis extracts one comparable value from a subject, or reports that it cannot see this one. */
export interface Axis {
  name: string
  why: string
  of: (s: Subject) => string | null   // null = cannot see
}

/** The ℤ/9 residue of an address — the tree's own digit, available for ANY addressed thing, which is what makes
 *  it the one axis that never returns cannot-see. */
export const residue = (address: string): number => {
  let sum = 0
  for (const c of address.replace(/-/g, '')) {
    const d = parseInt(c, 16)
    if (!Number.isNaN(d)) sum += d
  }
  return ((sum - 1) % 9) + 1
}

/** The axes every addressed subject supports. Callers add domain axes; these two need nothing but an address. */
export const ADDRESS_AXES: readonly Axis[] = [
  { name: 'residue', why: 'the ℤ/9 digit of the content-address — every addressed thing has one, so this axis never blinds',
    of: (s) => s.address ? String(residue(s.address)) : null },
  { name: 'address', why: 'the address itself — an axis that finds only exact re-addressings, which is how a duplicate announces itself',
    of: (s) => s.address || null },
]

/** A facet axis, for callers who have structured fields: shared modulus, shared wing, shared count, shared kind. */
export const facetAxis = (name: string, why: string): Axis => ({
  name, why,
  of: (s) => { const v = s.facets[name]; return v === undefined || v === '' ? null : String(v) },
})

export interface Neighbourhood {
  subject: string
  /** per axis: the value read, and who else shares it */
  axes: readonly { axis: string; value: string | null; sharedWith: readonly string[]; reading: Reading }[]
  /** axes that could READ this subject — the denominator; `lonely` is only meaningful against it */
  legible: number
  attempted: number
  /** every other subject that shares at least one axis value, with how many axes they share */
  neighbours: readonly { id: string; on: number }[]
  /** TRUE only when at least one axis could read it AND nothing shares any value it has */
  lonely: boolean
}

/** resonance(subject, universe, axes) → who surrounds it, on which axes, and how much of it was legible.
 *  One computation. Any addressed thing. No per-type branch anywhere below. */
export function resonance(subject: Subject, universe: readonly Subject[], axes: readonly Axis[] = ADDRESS_AXES): Neighbourhood {
  const others = universe.filter((u) => u.id !== subject.id)
  const shared = new Map<string, number>()
  const rows = axes.map((ax) => {
    const value = ax.of(subject)
    if (value === null) return { axis: ax.name, value: null, sharedWith: [] as string[], reading: 'cannot-see' as Reading }
    const sharedWith = others.filter((o) => ax.of(o) === value).map((o) => o.id)
    for (const id of sharedWith) shared.set(id, (shared.get(id) ?? 0) + 1)
    return { axis: ax.name, value, sharedWith, reading: 'read' as Reading }
  })
  const legible = rows.filter((r) => r.reading === 'read').length
  const neighbours = [...shared.entries()]
    .map(([id, on]) => ({ id, on }))
    .sort((a, b) => b.on - a.on || (a.id < b.id ? -1 : 1))
  return { subject: subject.id, axes: rows, legible, attempted: axes.length, neighbours, lonely: legible > 0 && neighbours.length === 0 }
}

/** The whole universe against itself — the census `connect-lonely` asks for, computed once for every subject. */
export function census(universe: readonly Subject[], axes: readonly Axis[] = ADDRESS_AXES): {
  total: number; lonely: readonly string[]; illegible: readonly string[]
} {
  const lonely: string[] = [], illegible: string[] = []
  for (const s of universe) {
    const n = resonance(s, universe, axes)
    if (n.legible === 0) illegible.push(s.id)
    else if (n.lonely) lonely.push(s.id)
  }
  return { total: universe.length, lonely, illegible }
}

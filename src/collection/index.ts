// collection — CONTENT WITH A SCHEMA, borrowed from Astro and answerable to this tree's laws.
//
// WHAT ASTRO GETS RIGHT AND VITEPRESS LEAVES OPEN. Astro's content collections pair a loader with a SCHEMA, and
// the guarantee is stated plainly in its docs: a schema guarantees the data exists in a predictable form when
// you query it. An entry that fails validation does not render oddly — the build STOPS and names the file and
// the field. VitePress ships `createContentLoader`, which is the loader half, and no schema half at all: a page
// with a missing `description` is not an error there, it is a page with no description.
//
// This repository has 210 articles under docs/articles and every one of them carries exactly `title` and
// `description`. So the corpus is already uniform — and NOTHING ENFORCES IT. The 211th article can omit either
// and the build is silent. That is the shape of every defect this tree caught tonight: a property that holds,
// a check that would pass either way, and no way to tell which is why it passed. Uniformity nobody verifies is
// a coincidence with a good track record.
//
// THREE THINGS TRANSPLANTED, AND ONE DELIBERATELY NOT:
//
//   SCHEMA — a field is required, optional, or drawn from a fixed set. A failure is a GAP with an exact FIX, in
//   the same form every finder in this tree already speaks, so it reads like the rest of the gate rather than
//   like a framework's error.
//
//   REFERENCE — Astro's `reference(collection)` makes a cross-collection link a TYPED, VALIDATED thing rather
//   than a string somebody hopes resolves. Here that is worth more than it is there: an article citing a
//   theorem key can be checked against the sealed ledger, so a citation to a purged or misspelled key fails the
//   docs build. That is exactly what the `deadkey` finder does for source, arriving at content — and tonight
//   proved the need, when two purged keys sat quoted in a comment inside the one finder built to catch them.
//
//   DENOMINATOR — every validation reports how many entries it checked, not only how many failed. A validator
//   that ran over nothing and a corpus with nothing wrong return the same verdict otherwise, which is the
//   distinction this whole tree has spent its instruments learning to make.
//
//   NOT TRANSPLANTED: Astro's live collections, which fetch at request time. The edge worker has no filesystem
//   and this content is sealed and recomputable; a request-time read would make the page depend on when it was
//   asked. Named here so the omission is a decision rather than an oversight.

/** A field verdict: nothing, or the exact charge and its cure — the same shape `report()` prints. */
export interface Gap { what: string; fix: string }

/** A field rule. `check` receives the raw frontmatter value and the entry id it came from. */
export interface Field {
  name: string
  required: boolean
  check: (value: unknown, id: string) => Gap | null
}

const isText = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

/** A required non-empty string. */
export const text = (name: string): Field => ({
  name, required: true,
  check: (v, id) => isText(v) ? null : {
    what: `${id}: \`${name}\` is ${v === undefined ? 'absent' : 'empty'}`,
    fix: `add a non-empty ${name} to the frontmatter of ${id}. Every sibling in this collection carries one, and a field that is present 210 times and absent once is not optional — it is unenforced.`,
  },
})

/** A string that may be absent, but may not be present-and-empty — the two are different claims. */
export const optionalText = (name: string): Field => ({
  name, required: false,
  check: (v, id) => v === undefined || isText(v) ? null : {
    what: `${id}: \`${name}\` is present but empty`,
    fix: `give ${name} a value in ${id}, or remove the key. An empty field asserts "this has no value"; an absent field asserts nothing, and only one of those is usually meant.`,
  },
})

/** A value drawn from a fixed set — the set is named in the charge, so nobody has to go and find it. */
export const oneOf = (name: string, allowed: readonly string[]): Field => ({
  name, required: true,
  check: (v, id) => typeof v === 'string' && allowed.includes(v) ? null : {
    what: `${id}: \`${name}\` is ${JSON.stringify(v)}, which is not one of the ${allowed.length} allowed`,
    fix: `set ${name} in ${id} to one of: ${allowed.join(', ')}`,
  },
})

/** ASTRO'S reference(), pointed at the sealed ledger. A citation that does not resolve fails the build, which
 *  is `deadkey` arriving at content — and the reason it earns its place is that a purged key looks exactly like
 *  a live one until something checks. Accepts a single key or a list. */
export const reference = (name: string, known: ReadonlySet<string>, opts: { required?: boolean } = {}): Field => ({
  name, required: opts.required ?? false,
  check: (v, id) => {
    if (v === undefined) return opts.required ? { what: `${id}: \`${name}\` is absent`, fix: `cite a sealed key in ${name}` } : null
    const keys = Array.isArray(v) ? v : [v]
    const dead = keys.filter((k) => typeof k !== 'string' || !known.has(k))
    if (!dead.length) return null
    return {
      what: `${id}: \`${name}\` cites ${dead.map((k) => JSON.stringify(k)).join(', ')} — the ledger seals no such key`,
      fix: `cite a key the ledger actually seals, or drop the reference from ${id}. A key that was purged reads identically to a live one until something resolves it, which is why this is checked rather than trusted.`,
    }
  },
})

export interface Entry { id: string; data: Record<string, unknown> }

export interface Collection { name: string; schema: readonly Field[] }

export const defineCollection = (name: string, schema: readonly Field[]): Collection => ({ name, schema })

export interface Validation {
  collection: string
  /** how many entries were CHECKED — a validator that ran over nothing must not look like a clean corpus */
  checked: number
  gaps: Gap[]
  /** fields the schema declares but NO entry carries — a rule that can never fire is not a rule */
  unexercised: string[]
}

/** validate(collection, entries) → every gap in the corpus, with its denominator and its dead rules.
 *
 *  `unexercised` is the part Astro does not have and this tree insists on: a required field that no entry
 *  carries would fail everything, so a dead one shows loudly — but an OPTIONAL field or a reference that no
 *  entry ever uses is a check that has never once run, and reporting the corpus clean on the strength of it is
 *  the false green this tree has spent the night cataloguing. */
export function validate(collection: Collection, entries: readonly Entry[]): Validation {
  const gaps: Gap[] = []
  const seen = new Set<string>()
  for (const e of entries) {
    for (const f of collection.schema) {
      if (e.data[f.name] !== undefined) seen.add(f.name)
      const gap = f.check(e.data[f.name], e.id)
      if (gap) gaps.push(gap)
    }
  }
  const unexercised = collection.schema.filter((f) => !f.required && !seen.has(f.name)).map((f) => f.name)
  return { collection: collection.name, checked: entries.length, gaps, unexercised }
}

/** The one-line verdict, in the gate's own voice — never "ok", always the count it rests on. */
export const verdictOf = (v: Validation): string =>
  v.gaps.length
    ? `✗ ${v.collection} — ${v.gaps.length} gap(s) across ${v.checked} entries`
    : `✓ ${v.collection} — ${v.checked} entries carry every required field`

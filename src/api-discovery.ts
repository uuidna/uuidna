// api-discovery — DISCOVER AN API'S SHAPE FROM WHAT IT ANSWERS, not from what it documents.
//
// The captain, 2026-09-28: "discover the apis to discover the schemas to discover the methods to discover the cross
// formulas and prove on the apis as cross applications". This is the first three links, and they are one walk: a
// response IS the schema, the methods are the shapes the schema admits, and the quantities are the numbers it carries.
//
// WHY DERIVED AND NOT DOCUMENTED. A documented schema is a claim about an endpoint; a response is evidence from it. The
// two disagree constantly — fields marked required arrive absent, integers arrive as strings, an array of one collapses
// to an object. Everything downstream here is a cross against a PUBLISHED NUMBER, so a number read from documentation
// would be a cross against a claim, and the whole point is to cross against what the source actually served.
//
// WHAT A DERIVED SCHEMA CANNOT KNOW, and it cannot BY CONSTRUCTION: a schema derived from observation sees exactly what
// was observed, so what the sample did not carry is outside the evidence rather than absent from the endpoint. Stated
// before it is used, because the limit is the reading. One response shows the fields THAT response carried:
// optional fields absent from it are invisible, a union type looks like whichever branch arrived, and an empty array
// says nothing about its element type. So a schema here is a floor — "the endpoint served at least this" — never a
// contract. Two probes of the same endpoint can legitimately derive different schemas, and that difference is
// information about the endpoint rather than an error in the reader.
//
// NUMBERS ARE SEPARATED FROM IDENTIFIERS, because the cross machinery downstream would otherwise drown. An id, a
// timestamp and a page count are numerals that carry no quantity: crossing a record id against a sealed constant is the
// digit-coincidence this tree spent the afternoon learning to refuse. The separation is by FIELD NAME, computed from the
// name's own words, and it is deliberately conservative — a field it cannot classify from that name ALONE, which is the
// declared boundary of this reader, is left out of the quantities rather than guessed into them. The boundary is a
// choice with a measured cost on each side: a missed quantity is one unfound cross, an admitted id is a false one.

/** one field a response actually carried, at its path, with the kind the value had */
export interface Field {
  /** dotted path, with [] marking an array hop */
  path: string
  kind: 'number' | 'string' | 'boolean' | 'null' | 'array' | 'object'
  /** for a number: the value as an exact decimal string, so nothing is lost to a float */
  sample?: string
}

const KIND = (v: unknown): Field['kind'] => {
  if (v === null) return 'null'
  if (Array.isArray(v)) return 'array'
  const t = typeof v
  if (t === 'number') return 'number'
  if (t === 'string') return 'string'
  if (t === 'boolean') return 'boolean'
  return 'object'
}

/**
 * Every field a response carried, depth- and breadth-bounded.
 *
 * THE BOUNDS ARE STATED AND NOT SILENT: a schema walk over an unbounded response is how a probe becomes a denial of
 * service against the thing being probed, and a deep recursive JSON is a real shape (Wikidata SPARQL, Ensembl trees).
 * At most `maxDepth` hops and the first `perArray` elements of any array, because element two of a homogeneous array
 * teaches nothing that element one did not.
 */
export function deriveSchema(body: unknown, maxDepth = 6, perArray = 2): Field[] {
  const out: Field[] = []
  const seen = new Set<string>()
  const walk = (v: unknown, path: string, depth: number): void => {
    const kind = KIND(v)
    const key = `${path}|${kind}`
    if (!seen.has(key)) {
      seen.add(key)
      out.push(kind === 'number'
        ? { path, kind, sample: String(v) }
        : { path, kind })
    }
    if (depth >= maxDepth) return
    if (Array.isArray(v)) {
      for (const el of v.slice(0, perArray)) walk(el, `${path}[]`, depth + 1)
      return
    }
    if (kind === 'object') {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        walk(val, path === '' ? k : `${path}.${k}`, depth + 1)
      }
    }
  }
  walk(body, '', 0)
  return out
}

/**
 * The words that mark a numeral as bookkeeping rather than a quantity.
 *
 * Conservative on purpose: a field this cannot classify FROM ITS NAME — the only evidence this regex is given, which is
 * the declared boundary of the separation — is LEFT OUT of the quantities. Crossing a record id or a page
 * offset against a sealed constant is exactly the digit coincidence the base-invariance guard exists to refuse, and the
 * cost of missing a real quantity is one unfound cross, while the cost of admitting an id is a confident false finding.
 */
const BOOKKEEPING = /(^|[._[])(id|ids|uid|guid|key|index|idx|offset|page|pagesize|limit|count|total|totalcount|hits|numfound|cursor|version|revision|timestamp|time|date|created|modified|updated|year|month|day|seconds|millis|epoch|status|code|rank|score|position|line|column|length|size|bytes)([._[]|$)/i

/** the numeric fields that look like published QUANTITIES rather than bookkeeping */
export function quantitiesOf(fields: readonly Field[]): Field[] {
  return fields.filter((f) => f.kind === 'number' && !BOOKKEEPING.test(f.path) && f.sample !== undefined)
}

/**
 * The methods a schema admits — what a caller can DO with this endpoint, read off its own answer.
 *
 * An array field is listable (there is more than one, so it can be paged or filtered); an object field is expandable;
 * a number is crossable against the ledger; a string is matchable. This is not a claim that the endpoint SUPPORTS
 * paging or filtering — only that its answer has the shape those operations act on. What the endpoint accepts is in its
 * documentation, and documentation is the thing this module declines to trust.
 */
export interface Method { kind: 'list' | 'expand' | 'cross' | 'match'; path: string }

export function methodsOf(fields: readonly Field[]): Method[] {
  const out: Method[] = []
  for (const f of fields) {
    if (f.path === '') continue
    if (f.kind === 'array') out.push({ kind: 'list', path: f.path })
    else if (f.kind === 'object') out.push({ kind: 'expand', path: f.path })
    else if (f.kind === 'number') out.push({ kind: 'cross', path: f.path })
    else if (f.kind === 'string') out.push({ kind: 'match', path: f.path })
  }
  return out
}

export interface Discovered {
  api: string
  /** null when the probe did not answer — never an empty schema, which would read as "answered with nothing" */
  fields: Field[] | null
  quantities: Field[]
  methods: Method[]
  why: string
}

/** fold one probe result into a discovery, keeping the difference between "answered emptily" and "did not answer" */
export function discoveryOf(api: string, body: unknown | null, why: string): Discovered {
  if (body === null) return { api, fields: null, quantities: [], methods: [], why }
  const fields = deriveSchema(body)
  return { api, fields, quantities: quantitiesOf(fields), methods: methodsOf(fields), why }
}

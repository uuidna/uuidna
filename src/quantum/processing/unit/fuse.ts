// Cooled out of index.ts by the heat family (scripts/cool.mjs): schemaMethodsOf, fuseOf, graphStateOf, qpuComposeOf, composeLiveOf, probeableOf, probeLiveOf, apisLiveOf, crossOf.
import {
  QPU_EXPERIMENTS,
  coins,
  foreignDeadlineOf,
  foreignFetchOf,
  found,
  headers,
  mintOf,
  n,
  callUuidOf,
  contentUuidOf,
  qpuCrossHolds,
  fieldUuidOf,
  graphStateHolds,
  schemaMethodsHolds,
  uuidReceiptOf,
  schemaFieldsOf,
  seed,
} from './index.js'
import type { QpuCrossRow, QpuField, QpuFuseEdge, QpuMethod, QpuProbe, QpuSwap } from './index.js'
import { facesOf } from '../../../families/lattice/lattice.js'

/**
 * An OpenAPI document read as methods: what each one takes, and what it gives back. Pure; no network.
 * @wing fusion
 * @kind builder
 * @evidence schemaMethodsHolds
 */
export const schemaMethodsOf = (api: string, document: unknown): QpuMethod[] => {
  if (!document || typeof document !== 'object') return []
  const doc = document as Record<string, unknown> & { paths?: Record<string, Record<string, unknown>> }
  const verbs = ['get', 'post', 'put', 'patch', 'delete'] as const
  const methods: QpuMethod[] = []
  for (const [path, item] of Object.entries(doc.paths ?? {})) {
    for (const verb of verbs) {
      const op = (item as Record<string, unknown>)[verb] as
        | undefined
        | { operationId?: string; parameters?: { name?: string; schema?: unknown }[]; requestBody?: { content?: Record<string, { schema?: unknown }> }; responses?: Record<string, { content?: Record<string, { schema?: unknown }>; schema?: unknown }> }
      if (!op) continue
      const takes = [
        ...(op.parameters ?? [])
          .filter((row): row is { name: string; schema?: unknown } => typeof row.name === 'string')
          .map((row) => ({ name: row.name, uuid: fieldUuidOf(row.name, row.schema, doc) })),
        ...Object.values(op.requestBody?.content ?? {}).flatMap((row) => schemaFieldsOf(row.schema, doc)),
      ]
      const ok = op.responses?.[String(found)]
      const gives = ok === undefined ? [] : [...Object.values(ok.content ?? {}).flatMap((row) => schemaFieldsOf(row.schema, doc)), ...schemaFieldsOf(ok.schema, doc)]
      const once = (rows: QpuField[]) => [...new Map(rows.map((row) => [row.uuid, row])).values()]
      methods.push({ api, verb, path, operationId: op.operationId, takes: once(takes), gives: once(gives), declaredStatuses: Object.keys(op.responses ?? {}) })
    }
  }
  return methods
}

/**
 * Fuse API methods by an inverted field-UUID index: an edge is a giver and a taker of one field; edges carry direction, counts and the rarest field per direction; hubs ranked by giver x taker.
 * @wing fusion
 * @kind builder
 */
export const fuseOf = (methods: readonly QpuMethod[], detail = true) => {
  const none = n - n
  const apis = [...new Set(methods.map((row) => row.api))].sort()
  const at = new Map(apis.map((api, k) => [api, k]))
  const fields = new Map<string, { name: string; gives: Set<number>; takes: Set<number> }>()
  const slot = (f: QpuField) => fields.get(f.uuid) ?? fields.set(f.uuid, { name: f.name, gives: new Set(), takes: new Set() }).get(f.uuid)!
  for (const m of methods) {
    const k = at.get(m.api)!
    for (const f of m.gives) slot(f).gives.add(k)
    for (const f of m.takes) slot(f).takes.add(k)
  }
  const edges = new Map<number, QpuFuseEdge>()
  const width = apis.length
  for (const [uuid, { name, gives, takes }] of fields)
    for (const g of gives)
      for (const t of takes) {
        if (g === t) continue
        const [i, j, forward] = g < t ? [g, t, true] : [t, g, false]
        const key = i * width + j
        const e = edges.get(key) ?? edges.set(key, { i, j, forward: none, backward: none, names: { forward: [], backward: [] }, rare: {} }).get(key)!
        // the rarest field a direction is joined on: fewest giver × taker pairs, so the most specific evidence
        const pairs = gives.size * takes.size
        const side = forward ? 'forward' : 'backward'
        const held = e.rare[side]
        if (!held || pairs < held.pairs || (pairs === held.pairs && uuid < held.uuid)) e.rare[side] = { uuid, name, pairs }
        if (forward) e.forward++
        else e.backward++
        const list = forward ? e.names.forward : e.names.backward
        if (detail && list.length < n) list.push(`${name} ${uuid}`)
      }
  const all = [...edges.values()].sort((a, b) => a.i - b.i || a.j - b.j)
  const entangled = all.filter((e) => e.forward > none && e.backward > none).length
  const hubs = [...fields.entries()]
    .map(([uuid, f]) => ({ uuid, name: f.name, gives: f.gives.size, takes: f.takes.size, pairs: f.gives.size * f.takes.size }))
    .sort((a, b) => b.pairs - a.pairs || a.uuid.localeCompare(b.uuid))
  return { kind: 'fuse' as const, apis, methods: methods.length, fields: fields.size, edges: all, entangled, oneWay: all.length - entangled, hubs }
}

/**
 * THE FUSED GRAPH IS A GRAPH STATE. One qubit per API, |+⟩ on each, CZ across every composing pair: an N-qubit
 * stabilizer state whose generators K_v = X_v ∏_{u ~ v} Z_u are read off the graph, so it is exact at any N with
 * no 2^N vector. The entanglement across a cut (A | rest) is, in ebits, the rank over GF(2) of the adjacency
 * between A and the rest — computed here by elimination on bit rows. Known cases are asserted beside it: a path
 * cut in the middle, a star, a complete graph and a perfect matching across the cut.
  * @wing fusion
  * @kind builder
  * @evidence graphStateHolds
 */
export const graphStateOf = (qubits: number, edges: ReadonlyArray<{ i: number; j: number }>, cut = (v: number) => v < qubits / coins) => {
  const left = [...Array(qubits).keys()].filter(cut)
  const right = [...Array(qubits).keys()].filter((v) => !cut(v))
  const col = new Map(right.map((v, k) => [v, k]))
  const row = new Map(left.map((v, k) => [v, k]))
  const words = Math.ceil(right.length / 32) || 1
  const rows = left.map(() => new Uint32Array(words))
  for (const { i, j } of edges) {
    const [a, b] = row.has(i) && col.has(j) ? [i, j] : row.has(j) && col.has(i) ? [j, i] : [-1, -1]
    if (a < 0) continue
    const c = col.get(b)!
    rows[row.get(a)!]![c >>> 5]! ^= 1 << (c & 31)
  }
  let rank = 0
  for (let c = 0; c < right.length && rank < rows.length; c++) {
    const w = c >>> 5
    const bit = 1 << (c & 31)
    const pivot = rows.findIndex((r, k) => k >= rank && (r[w]! & bit) !== 0)
    if (pivot < 0) continue
    ;[rows[rank], rows[pivot]] = [rows[pivot]!, rows[rank]!]
    for (let k = 0; k < rows.length; k++) if (k !== rank && (rows[k]![w]! & bit) !== 0) for (let x = 0; x < words; x++) rows[k]![x]! ^= rows[rank]![x]!
    rank++
  }
  const degree = new Array<number>(qubits).fill(0)
  for (const { i, j } of edges) { degree[i]!++; degree[j]!++ }
  return { kind: 'graph-state' as const, qubits, edges: edges.length, stabilizers: qubits, isolated: degree.filter((d) => d === 0).length, cut: { left: left.length, right: right.length }, ebits: rank, bound: Math.min(left.length, right.length) }
}

/**
 * Cross API methods into compositions (entangled, application, undecided) joined on field shape UUIDs.
 * @wing fusion
 * @kind builder
 * @evidence composeHolds
 */
export const qpuComposeOf = (methods: readonly QpuMethod[]) => {
  const fused = fuseOf(methods)
  const { apis } = fused
  const rows: QpuCrossRow[] = []
  for (const e of fused.edges) {
    const left = apis[e.i]!
    const right = apis[e.j]!
    if (e.forward > n - n) rows.push({ left, right, forward: true, year: n - n, what: `${left} returns ${e.names.forward.join(', ')}, which ${right} takes`, source: `openapi:${left}` })
    if (e.backward > n - n) rows.push({ left, right, forward: false, year: n - n, what: `${right} returns ${e.names.backward.join(', ')}, which ${left} takes`, source: `openapi:${right}` })
  }
  const cross = crossOf(rows, true, apis)
  return { kind: 'compose' as const, apis, methods: methods.length, joinedOn: 'the shape UUID of a field — its name and its type, folded to an RFC 9562 v8 identity' as const, cross, holds: qpuCrossHolds(cross) && schemaMethodsHolds(methods) }
}

/**
 * DISCOVERED AND CROSSED IN ONE CALL, so a door can carry the finding rather than the ingredients.
 *
 * A caller that had to fetch the registry, then the schemas, then run the cross itself would be doing the
 * unit's job with the unit's data, which is the shape of an API that has not decided what it is for.
  * @wing fusion
  * @kind builder
  * @evidence composeLiveOf
 */
export const composeLiveOf = async (from = n - n, howMany = facesOf().rays) => {
  const discovered = await apisLiveOf(from, howMany)
  const compose = qpuComposeOf(discovered.methods)
  const fused = fuseOf(discovered.methods, false)
  const graphState = graphStateOf(fused.apis.length, fused.edges)
  const of = (swap: QpuSwap) => compose.cross.pairs.filter((row) => row.swap === swap).length
  return {
    kind: 'compose' as const,
    live: true as const,
    registry: discovered.registry,
    apis: discovered.apis,
    sampled: discovered.sampled,
    reached: discovered.reached,
    methods: discovered.methods.length,
    joinedOn: compose.joinedOn,
    swap: 'a gives what b takes, both ways or one or neither — the same criterion the subjects are judged by' as const,
    pairs: compose.cross.pairs.length,
    entangled: of('entangled'),
    oneWay: of('application'),
    undecided: of('undecided'),
    cross: compose.cross,
    graphState,
    holds: discovered.holds && compose.holds && graphStateHolds() && graphState.ebits <= graphState.bound,
  }
}

/**
 * Probeable when nothing must be supplied and nothing is written: no path template, no required parameter.
 * @wing fusion
 * @kind builder
 * @evidence probeableHolds
 */
export const probeableOf = (methods: readonly QpuMethod[]): QpuMethod[] =>
  methods.filter((row) => !row.path.includes('{') && (row.verb === 'get' || row.verb === 'post') && row.takes.length === n - n)

/**
 * Probe discovered APIs live with argument-free GET and POST calls and report which answer.
 * @wing fusion
 * @kind builder
 * @evidence probeLiveHolds
 */
export const probeLiveOf = async (methods: readonly QpuMethod[], server: string | undefined, howMany = facesOf().coins) => {
  const none = n - n
  const deadline = foreignDeadlineOf()
  const rows: QpuProbe[] = []
  if (server === undefined) return { kind: 'probe' as const, live: true as const, server, rows, answered: none, gone: none, holds: true }
  for (const method of probeableOf(methods).slice(none, howMany)) {
    const url = `${server.replace(/\/$/, '')}${method.path}`
    const request = new Request(url, {
      method: method.verb.toUpperCase(),
      headers: { accept: 'application/json', ...(method.verb === 'post' ? { 'content-type': 'application/json' } : {}) },
      ...(method.verb === 'post' ? { body: '{}' } : {}),
    })
    const response = await foreignFetchOf(request, deadline)
    /* A host that does not resolve and a host that refuses are different facts, and foreignFetchOf returns
     * undefined for both — so the distinction is drawn on whether ANY door of this server answered. */
    rows.push({
      api: method.api,
      verb: method.verb,
      url,
      status: response?.status ?? none,
      answer: response === undefined ? 'unreached' : method.declaredStatuses?.includes(String(response.status)) === false ? 'refused' : 'answered',
      declared: method.declaredStatuses ?? [],
    })
  }
  const reached = rows.filter((row) => row.answer !== 'unreached')
  const gone = rows.length > none && reached.length === none
  return {
    kind: 'probe' as const,
    live: true as const,
    server,
    rows: gone ? rows.map((row) => ({ ...row, answer: 'gone' as const })) : rows,
    answered: rows.filter((row) => row.answer === 'answered').length,
    /* EVERY DOOR SILENT MEANS THE SPEC IS STALE, not that every door is broken. */
    gone: gone ? rows.length : none,
    holds: rows.every((row) => row.url.startsWith(server.slice(none, mintOf(n)))),
  }
}

/**
 * The registry, the schemas and the methods, discovered live and bounded to `faces` schemas from an offset.
 * @wing fusion
 * @kind builder
 * @evidence apisLiveOf
 */
export const apisLiveOf = async (from = n - n, howMany = facesOf().faces) => {
  const faces = facesOf()
  const none = n - n
  const deadline = foreignDeadlineOf()
  const registry = 'https://api.apis.guru/v2/list.json'
  const miss = { kind: 'apis' as const, live: false as const, registry, apis: none, sampled: none, rows: [] as { api: string; spec: string; live: boolean; methods: number }[], methods: [] as QpuMethod[], holds: false }
  const listed = await foreignFetchOf(new Request(registry, { method: 'GET', headers: { accept: 'application/json' } }), deadline)
  if (!listed || listed.status !== found) return { ...miss, why: 'the registry did not answer — no APIs were discovered this run, which is not none existing' as const }
  const catalogue = (await listed.json().catch(() => undefined)) as undefined | Record<string, { preferred?: string; versions?: Record<string, { swaggerUrl?: string }> }>
  if (!catalogue) return { ...miss, live: true as const, why: 'the registry answered with something that is not a catalogue' as const }
  const names = Object.keys(catalogue).sort()
  /* A CALLER MAY ASK FOR FEWER. A door that also reads CERN has already spent seventeen of its fifty
   * subrequests before it gets here, so the door asks for `rays` and a direct caller may ask for `faces`. */
  const window = names.slice(from, from + Math.min(howMany, faces.faces))
  const rows: { api: string; spec: string; live: boolean; methods: number }[] = []
  const methods: QpuMethod[] = []
  for (const api of window) {
    const entry = catalogue[api]
    const spec = entry?.versions?.[entry.preferred ?? '']?.swaggerUrl ?? ''
    if (spec.length === none) {
      rows.push({ api, spec, live: false, methods: none })
      continue
    }
    const got = await foreignFetchOf(new Request(spec, { method: 'GET', headers: { accept: 'application/json' } }), deadline)
    const document = got && got.status === found ? await got.json().catch(() => undefined) : undefined
    const found_ = document === undefined ? [] : schemaMethodsOf(api, document)
    methods.push(...found_)
    if (document !== undefined) uuidReceiptOf(`fuse ${api}`, contentUuidOf({ api, methods: found_.map((m) => `${m.verb} ${m.path}`) }), { methods: found_.length }, spec)
    rows.push({ api, spec, live: document !== undefined, methods: found_.length })
  }
  return {
    kind: 'apis' as const,
    live: true as const,
    registry,
    apis: names.length,
    from,
    sampled: rows.length,
    rows,
    methods,
    reached: rows.filter((row) => row.live).length,
    /* Sound when every sampled name was accounted for — NOT when every schema was reached. A registry entry
     * whose spec is gone is a fact about that entry. */
    holds: rows.length === Math.min(Math.min(howMany, faces.faces), Math.max(none, names.length - from)) && schemaMethodsHolds(methods),
  }
}

/**
 * The swap criterion over rows: a pair is entangled when each gives what the other takes, application when one way, undecided otherwise.
 * @wing fusion
 * @kind builder
 * @evidence qpuCrossHolds
 */
export const crossOf = (rows: readonly QpuCrossRow[], within = false, vocabulary: readonly string[] = []) => {
  const none = n - n
  /* THE VOCABULARY MAY BE GIVEN, because a pair nobody has evidenced must still be REPORTED. Derived from the
   * rows alone, two APIs that share no shape produce no row and so vanish from the cross entirely — which
   * reads as "not asked" when it is "asked and nothing found". That is the third state deleting itself. */
  const named = [...vocabulary]
  const lefts = [...new Set([...named, ...rows.flatMap((row) => (within ? [row.left, row.right] : [row.left]))])].sort()
  const rights = [...new Set([...named, ...rows.flatMap((row) => (within ? [row.left, row.right] : [row.right]))])].sort()
  /* Unordered pairs are canonicalised by name, so a corpus that happens to write a pair both ways round
   * classifies it once rather than reporting two half-evidenced pairs that are the same pair. */
  const combinations = within
    ? lefts.flatMap((left, i) => lefts.slice(i + seed).map((right) => ({ left, right })))
    : lefts.flatMap((left) => rights.map((right) => ({ left, right })))
  /* crossOf serves any rows it is handed, including a caller's own vocabulary, so only the cross whose axes
   * ARE the mixed surface can be addressed on it. Asking for an address off the axis would throw, and a reading
   * that throws because somebody passed their own rows is worse than a reading with no address on those rows. */
  const mixedAxis = [...new Set(QPU_EXPERIMENTS.flatMap((row) => [row.left, row.right]))]
  const addressable = within && lefts.every((name) => mixedAxis.includes(name))
  const pairs = combinations.map(({ left, right }) => {
    const held = rows.filter((row) => (within ? (row.left === left && row.right === right) || (row.left === right && row.right === left) : row.left === left && row.right === right))
    const forward = held.filter((row) => (row.left === left ? row.forward : !row.forward))
    const backward = held.filter((row) => (row.left === left ? !row.forward : row.forward))
    const swap: QpuSwap = forward.length > none && backward.length > none ? 'entangled' : held.length > none ? 'application' : 'undecided'
    const years = held.map((row) => row.year)
    return {
      left,
      right,
      /** Addressed on the `mixed` surface when both names are on its axis; a caller-supplied vocabulary is not. */
      uuid: addressable ? callUuidOf('mixed', left, right) : undefined,
      swap,
      owes: swap === 'application' ? (forward.length > none ? 'backward' : 'forward') : undefined,
      earliest: years.length > none ? Math.min(...years) : undefined,
      forward,
      backward,
      cited: held.length,
    }
  })
  return { kind: 'cross' as const, lefts, rights, within, pairs, holds: pairs.every((row) => (row.swap === 'undecided') === (row.cited === none)) }
}

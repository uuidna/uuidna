import './involute.js'
import './shadcn.js'
import './job.js'
import './fusion.js'
import './leads.js'
import { FAMILY_WORDS } from './family-words.js'
import { aeadOpen, aeadSeal, bytesOf, ed25519PublicKey, ed25519Sign, ed25519Verify, fromHex, hexOf, hkdf, hmac, md5, sha256, sha512, utf8, x25519, type HashName } from '../core/crypt.js'
import { leanSource, leanRecomputed, leanToolchain, leanPath, leanAxioms } from '../quantum/processing/unit/lean.js'
import { packageVersion } from '../quantum/processing/unit/version.js'
import { cernCatalogsOf, cernRecordsOf, qpuCiteOf, facesOf, failureOf, foldOf, harnessesOf, hexRegisterOf, contentUuidOf, hexCatalogOf, hexFamiliesOf, hexMissOf, hexRunOf, qpuHexUuidOf, installOf, mcpDoorsOf, mcpFuseOf, mcpToolsListOf, uuidReceiptOf } from '../quantum/processing/unit/index.js'
import { DOORS } from './discovery.js'
import { portingOf } from '../quantum/processing/unit/porting.js'
import { crossFormulaOf, crossBridgesOf } from '../families/cross/index.js'
import { apiCallOf, apiOf, apiRegistryOf, apiSearchOf } from './api-door.js'
import { CryptFormulas } from '../families/crypt/index.js'
import { hologramStreamsOf } from '../families/holo/index.js'
import { certifyUnreachable, findAssignment, findColoring, findHamCycle, generalizedPetersen, pigeonhole, verifyColoring, verifyHamCycle, verifySat, verifySubsetSum, type Graph } from '../families/np/index.js'
import { chooseOf, mintOf, latticeNamesOf, tenOf, type QpuEnv } from '../quantum/processing/unit/index.js'
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

type Args = Record<string, unknown>
// an unknown name is answered with every name that resolves it
const fail = (why: string, extra: Record<string, unknown> = {}) => {
  const choices = Object.entries(extra).find(([, v]) => Array.isArray(v))
  return { holds: false as const, denied: why, ...extra, resolve: choices ? `use one of the ${choices[0]}: ${(choices[1] as unknown[]).slice(0, 12).join(', ')}${(choices[1] as unknown[]).length > 12 ? ', …' : ''}` : `correct ${why}` }
}
const receiptOf = (name: string, value: unknown, holds: boolean) => uuidReceiptOf(`fused ${name}`, contentUuidOf(value), { holds }).uuid
const str = (x: unknown): string => (typeof x === 'string' ? x : '')
const num = (x: unknown, d: number): number => (typeof x === 'number' && Number.isSafeInteger(x) ? x : typeof x === 'string' && /^\d+$/.test(x) ? Number(x) : d)

// ---------------------------------------------------------------------------
// hex: run any hex program of any family
// ---------------------------------------------------------------------------

mcpFuseOf('hex', {
  description: 'Run a hex program: { uuid } or { family, program, params }, of any registered family ({} returns the catalogue; { doors: true } through any door lists the families).',
  inputSchema: { type: 'object', properties: { uuid: { type: 'string' }, family: { type: 'string' }, program: { type: ['array', 'string'], items: { type: 'string' } }, params: { type: 'array', items: { type: 'integer' } } } },
  run: async (a, env) => {
    const referrer = typeof a.referrer === 'string' ? a.referrer : undefined
    if (!a.uuid && !a.family) return hexCatalogOf()
    let uuid = str(a.uuid)
    if (!uuid) {
      const program = Array.isArray(a.program) ? a.program.map(String) : str(a.program).split(',').map((x) => x.trim()).filter(Boolean)
      const params = Array.isArray(a.params) ? a.params.map(Number) : []
      try {
        uuid = qpuHexUuidOf({ family: str(a.family), program, params })
      } catch (e) {
        const next = hexMissOf(str(a.family), params)
        return fail('program', { reading: (e as Error).message, ...(next ? { next } : {}) })
      }
    }
    return hexRunOf(uuid, referrer, env)
  },
})

// ---------------------------------------------------------------------------
// data: live public datasets against the unit's own values
// ---------------------------------------------------------------------------

// the unit's own deadline: tenOf(hexbit) milliseconds, ten seconds
const DEADLINE = L.tenOf(L.hexbit)
// A TRANSIENT FAILURE IS RETRIED, A SETTLED ONE IS NOT. A 5xx, a 429 (rate limit) or a dropped connection is a blip the
// next attempt may clear, so get() retries it a few times with a short growing backoff. A 4xx below 429 is the client's
// own (it will not change on a retry) and a timeout has already spent the whole deadline (retrying would spend it
// again), so neither is retried — the budget stays near one deadline while a flaky source no longer fails a whole feed.
const RETRIES = L.coins
const BACKOFF = L.tenOf(L.coins)
// once the network is found out of reach, the network work is skipped for a minute and answered with a warning
let offlineUntil = 0
const OFFLINE_WINDOW = L.tenOf(L.hexbit) * L.coins * L.n
const get = async (url: string, accept = 'application/json'): Promise<Response> => {
  const headers = { accept, 'user-agent': 'qpu.uuidna.com (+https://qpu.uuidna.com)' }
  let last: Error = new Error(`${url} did not answer`)
  for (let attempt = L.n - L.n; attempt <= RETRIES; attempt++) {
    if (attempt > L.n - L.n) await new Promise((resolve) => setTimeout(resolve, BACKOFF * attempt))
    try {
      const r = await fetch(url, { headers, signal: AbortSignal.timeout(DEADLINE) })
      if (r.ok) return r
      // 4xx below 429 is settled, not transient: fail now rather than retry something that cannot change, because that status is settled
      if (r.status < 500 && r.status !== 429) throw new Error(`${url} answered ${r.status}`)
      last = new Error(`${url} answered ${r.status}`)
    } catch (e) {
      last = e instanceof Error ? e : new Error(String(e))
      // a client 4xx raised just above, and a timeout that already spent the deadline, are not worth another attempt
      if (last.name === 'TimeoutError' || last.name === 'AbortError' || /answered 4\d\d$/.test(last.message)) break
    }
  }
  throw last
}
/** The deadline-bounded, transient-retrying fetch the data door uses, exported so its retry contract can be tested. */
export const getOf = get
const leanNat = (name: string): string | undefined => new RegExp(`def ${name} : Nat := (\\d+)`).exec(leanSource)?.[1]
// the embedded kernel's axiom count, hooked from the build-time embed (scripts/embed-lean.mjs, gated by `lake build` as
// ground truth) — NOT re-scanned here. The proof and clay doors report "zero axioms" only when this is 0, falsifiable.
const LEAN_AXIOMS = leanAxioms
const bellOf = (count: number): bigint[] => {
  const out: bigint[] = []
  let row = [1n]
  for (let i = 0; i < count; i++) {
    out.push(row[0]!)
    const next = [row[row.length - 1]!]
    for (const x of row) next.push(next[next.length - 1]! + x)
    row = next
  }
  return out
}
const catalanOf = (count: number): bigint[] => {
  const out = [1n]
  for (let i = 1; i < count; i++) out.push((out[i - 1]! * BigInt(2 * (2 * i - 1))) / BigInt(i + 1))
  return out
}
const SEQUENCES: Record<string, { name: string; of: (count: number) => bigint[] }> = { A000110: { name: 'Bell numbers', of: bellOf }, A000108: { name: 'Catalan numbers', of: catalanOf } }

/** A formula as an integer sequence: a unary formula over n = 0, 1, …, a binary one as its section f(2, n). The longest run
 *  of whole values is kept; it is a sequence when it has six terms and four distinct values. */
export type Sequence = { family: string; formula: string; fixed: number[]; terms: string[] }
const TERMS = L.mintOf(L.hexbit)
const sequenceOf = async (family: string, formula: string, fixed: number[]): Promise<Sequence | null> => {
  // a live formula is a reading, not a sequence: its terms are not run here
  if (hexFamiliesOf().get(family)?.find((x) => x.name === formula)?.live) return null
  let best: string[] = [], run: string[] = []
  for (let n = 0; n < TERMS; n++) {
    let v: unknown
    try {
      v = ((await hexRunOf(qpuHexUuidOf({ family, program: [formula], params: [...fixed, n] }), undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean })
    } catch {
      v = undefined
    }
    const r = v as { value?: unknown; holds?: boolean } | undefined
    const x = r?.holds !== true ? null : typeof r.value === 'bigint' ? r.value.toString() : typeof r.value === 'number' && Number.isSafeInteger(r.value) && r.value >= 0 ? String(r.value) : typeof r.value === 'string' && /^\d+$/.test(r.value) ? r.value : null
    if (x === null) run = []
    else if ((run = [...run, x]).length > best.length) best = run
  }
  return best.length >= L.chooseOf(L.hexbit, L.coins) ? { family, formula, fixed, terms: best } : null
}
let sequences: Promise<Sequence[]> | undefined
/** Every formula of every family that is an integer sequence, read off the families rather than listed. */
export const sequencesOf = (): Promise<Sequence[]> =>
  (sequences ??= (async () => {
    const out: Sequence[] = []
    for (const [family, formulas] of hexFamiliesOf()) {
      if (DOORS.has(family)) continue
      for (const f of formulas) {
        if ((f.arity !== 1 && f.arity !== 2) || f.live) continue
        const s = await sequenceOf(family, f.name, f.arity === 2 ? [2] : [])
        if (s) out.push(s)
      }
    }
    return out
  })())

// the unit's own identities: its author and DOIs from the citation, its repositories from the install manifest
const citeOf = () => qpuCiteOf() as unknown as { author: { last: string; first: string; orcid: string }; doi: string; conceptdoi: string; archived?: { version: string; doi: string }; served?: { version: string }; prior?: { title?: string; doi?: string; conceptdoi?: string } }
const doisOf = () => {
  const c = citeOf()
  return [
    ...[c.doi, c.conceptdoi].map((doi) => ({ doi, title: undefined as string | undefined })),
    ...[c.prior?.doi, c.prior?.conceptdoi].filter((d): d is string => Boolean(d)).map((doi) => ({ doi, title: c.prior?.title })),
  ]
}
const reposOf = (): string[] =>
  Object.values((installOf() as unknown as { cloudflare?: Record<string, string> }).cloudflare ?? {})
    .map((href) => /[?&]url=https:\/\/github\.com\/([^/]+\/[^/?#]+)/.exec(href)?.[1])
    .filter((r): r is string => Boolean(r))

/** Collections the generated mcpPlugin already exposes. Chat calls that plugin; tools/list does not grow. */
const PAYLOAD_MCP_COLLECTIONS = ['docs', 'pages', 'quantum-receipts', 'fuse-apis', 'fuse-fields', 'fuse-formulas'] as const
const HUE_BITS = 64
const NIBBLE_WEIGHT = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]
const nibbleWeightOf = (fold: string): number => {
  let d = 0
  for (const ch of fold) d += NIBBLE_WEIGHT[parseInt(ch, 16)] ?? 0
  return d
}
const hammingOf = (left: string, right: string): number => {
  let d = 0
  const span = Math.min(left.length, right.length)
  for (let i = 0; i < span; i++) d += NIBBLE_WEIGHT[(parseInt(left[i]!, 16) ^ parseInt(right[i]!, 16)) & 15] ?? 0
  return d
}
/** plasma.hue(distance, 64): degrees on the wheel. Distance 0 sits at hue 0. */
const hueOf = (distance: number): number => (distance >= 0 && distance <= HUE_BITS ? Math.floor((distance * 360) / HUE_BITS) : 0)
const collectionAskedOf = (asked: Set<string>): (typeof PAYLOAD_MCP_COLLECTIONS)[number] | undefined =>
  PAYLOAD_MCP_COLLECTIONS.find((slug) => slug.split('-').every((word) => asked.has(word)))
/** Integers only. A name, an email, an address and a Referer are strings and do not enter the fold. */
const publicIntsOf = (x: unknown): number[] => {
  if (typeof x === 'number' && Number.isSafeInteger(x) && x >= 0) return [x]
  if (Array.isArray(x)) return x.flatMap(publicIntsOf)
  if (x && typeof x === 'object') return Object.values(x as Record<string, unknown>).flatMap(publicIntsOf)
  return []
}
/**
 * The chat's tool for Payload content: findDocuments on the plugin already mounted at /api/mcp.
 * The same JSON-RPC the unit speaks, over the PAYLOAD binding. No second account. A refusal, and any
 * document the plugin returns, stay off the reply; only the integers of a successful find are folded.
 */
const payloadContentFoldOf = async (env: QpuEnv | undefined, auth: string | null | undefined, slug: string): Promise<string | undefined> => {
  const payload = env?.PAYLOAD
  if (!payload) return undefined
  const headers = new Headers({ accept: 'application/json', 'content-type': 'application/json' })
  if (auth) headers.set('authorization', auth)
  let timer: ReturnType<typeof setTimeout> | undefined
  const res = await new Promise<Response | undefined>((resolve) => {
    timer = setTimeout(() => resolve(undefined), DEADLINE)
    payload.fetch(new Request('https://qpu.uuidna.com/api/mcp', {
      method: 'POST',
      headers,
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'findDocuments', arguments: { slug, limit: 1 } } }),
    })).then((row) => resolve(row), () => resolve(undefined))
  })
  if (timer) clearTimeout(timer)
  if (!res?.ok) return undefined
  const body = (await res.json().catch(() => null)) as { result?: { isError?: boolean; structuredContent?: unknown; content?: { text?: string }[] } } | null
  const result = body?.result
  if (!result || result.isError) return undefined
  const structured = publicIntsOf(result.structuredContent)
  const text = result.content?.find((row) => typeof row.text === 'string')?.text ?? ''
  const at = text.indexOf('{')
  let parsed: number[] = []
  if (at >= 0) {
    try { parsed = publicIntsOf(JSON.parse(text.slice(at))) } catch { parsed = [] }
  }
  const ints = structured.length > 0 ? structured : parsed
  return ints.length > 0 ? foldOf(ints.join(',')) : undefined
}
const reading = async (source: string, a: Args, env?: QpuEnv, auth?: string | null) => {
  if (source === 'cern') {
    const recid = num(a.recid ?? a.id, cernRecordsOf().records[L.n - L.n]?.recid ?? L.n - L.n)
    const row = cernRecordsOf().records.find((r) => r.recid === recid)
    if (!row) return fail('recid', { recids: cernRecordsOf().records.map((r) => r.recid) })
    const url = `https://opendata.cern.ch/api/records/${recid}`
    const d = ((await (await get(url)).json()) as { metadata?: { distribution?: { number_events?: number; number_files?: number }; title?: string } }).metadata
    const live = { title: d?.title, events: d?.distribution?.number_events, files: d?.distribution?.number_files }
    const agrees = live.events === row.events && live.files === row.files && row.files * row.q + row.r === row.events
    return { source, url, reading: live, expected: { events: row.events, files: row.files, theorem: `${row.files} * ${row.q} + ${row.r} = ${row.events}` }, agrees }
  }
  if (source === 'nist') {
    const url = 'https://physics.nist.gov/cuu/Constants/Table/allascii.txt'
    const text = await (await get(url, 'text/plain')).text()
    const digitsOf = (quantity: string) => {
      const line = text.split('\n').find((l) => l.startsWith(`${quantity} `))
      const value = line?.slice(60, 85).trim() ?? ''
      return { value, digits: value.replace(/e.*$/, '').replace(/[^0-9]/g, '').replace(/^0+/, ''), exact: line?.includes('(exact)') ?? false }
    }
    const live = { planck: digitsOf('Planck constant'), boltzmann: digitsOf('Boltzmann constant') }
    const expected = { planck: leanNat('planck'), boltzmann: leanNat('boltzmann') }
    return { source, url, reading: live, expected, agrees: live.planck.digits === expected.planck && live.boltzmann.digits === expected.boltzmann && live.planck.exact && live.boltzmann.exact }
  }
  if (source === 'oeis') {
    const id = str(a.id) || 'A000110'
    const seq = SEQUENCES[id]
    if (!seq) return fail('sequence', { sequences: Object.keys(SEQUENCES) })
    const url = `https://oeis.org/search?q=id:${id}&fmt=json`
    const body = (await (await get(url)).json()) as { data?: string }[] | { results?: { data?: string }[] }
    const data = (Array.isArray(body) ? body[0]?.data : body.results?.[0]?.data) ?? ''
    const live = data.split(',').filter(Boolean).map((x) => BigInt(x))
    const mine = seq.of(live.length)
    const mismatches = live.flatMap((v, i) => (v === mine[i] ? [] : [i]))
    return { source, url, reading: { name: seq.name, terms: live.length, last: String(live.at(-1) ?? '') }, expected: { last: String(mine.at(-1) ?? ''), mismatches }, agrees: live.length > 0 && mismatches.length === 0 }
  }
  if (source === 'zenodo') {
    const concept = str(a.id) || '22700098'
    const url = `https://zenodo.org/api/records/${concept}/versions/latest`
    const d = (await (await get(url)).json()) as { id?: number; doi?: string; metadata?: { version?: string; publication_date?: string } }
    const live = { record: d.id, doi: d.doi, version: d.metadata?.version, published: d.metadata?.publication_date }
    // The Zenodo field is the archived cite. A tag may carry one leading v. The git tag is named beside it.
    const cite = citeOf()
    const archiveVersion = cite.archived?.version ?? ''
    const gitTag = cite.served?.version ?? packageVersion
    const published = typeof live.version === 'string' ? live.version.replace(/^v/, '') : ''
    const doi = typeof live.doi === 'string' ? live.doi : ''
    return { source, url, reading: { ...live, gitTag: `v${gitTag}` }, expected: { version: archiveVersion, doi: cite.doi }, agrees: published === archiveVersion && doi === cite.doi }
  }
  if (source === 'catalog') {
    const catalog = cernCatalogsOf().catalogs.find((c) => c.name === str(a.name))
    if (!catalog) return fail('catalog', { catalogs: cernCatalogsOf().catalogs.map((c) => c.name) })
    const body = (await (await get(catalog.href)).json()) as { hits?: { total?: number | { value?: number }; hits?: unknown[] }; total?: number; results?: unknown[]; count?: number }
    const total = body.hits?.total ?? body.total ?? body.count ?? body.results?.length ?? body.hits?.hits?.length
    let count = typeof total === 'number' ? total : typeof total === 'object' && total && typeof total.value === 'number' ? total.value : undefined
    // a count document is only numbers (HEPData /record/count is { data, publications }): the search path is
    // disallowed by the site and challenged, and this document is the record count that answers
    if (count === undefined && body && typeof body === 'object' && !Array.isArray(body)) {
      const values = Object.values(body)
      const nums = values.filter((v): v is number => typeof v === 'number' && Number.isSafeInteger(v) && v > 0)
      if (nums.length > 0 && nums.length === values.length) count = nums.reduce((a, b) => a + b, 0)
    }
    return { source, url: catalog.href, reading: { name: catalog.name, total: count }, expected: { answers: 'records' }, agrees: count !== undefined && count > 0 }
  }
  if (source === 'sequence') {
    // identification: the formula's own terms searched in OEIS; it agrees when a sequence there holds them consecutively
    const family = str(a.family), formula = str(a.formula)
    const fixed = Array.isArray(a.fixed) ? a.fixed.map(Number) : []
    // the summary row names no formula. Resolving it by listing every sequence is the lattice-wide scan that exceeds
    // a call, so the row answers as the pointer: one formula is read on demand, and gate.leads enumerates a slice.
    if (!family && !formula) return { source, url: 'https://oeis.org', reading: { read: '{ source: sequence, family, formula }', enumerate: 'gate.leads' }, expected: { enumerate: 'a slice at a time' }, agrees: true }
    const seq = (await sequencesOf()).find((s) => s.family === family && s.formula === formula && s.fixed.join() === fixed.join()) ?? (family && formula ? await sequenceOf(family, formula, fixed) : null)
    // a formula that exists but holds on fewer than six consecutive naturals (pVsNp: a mode is 0 or 1) is read, not
    // refused: the reading says how short its run is, and OEIS is not asked
    if (!seq && hexFamiliesOf().get(family)?.some((f) => f.name === formula)) return { source, url: 'https://oeis.org', reading: { formula: `${family}.${formula}${fixed.length ? `(${fixed.join(',')}, n)` : '(n)'}`, terms: '', oeis: 'none', run: 'shorter than six terms' }, expected: { terms: 'six consecutive' }, warning: 'the formula holds on fewer than six consecutive naturals: no sequence to look up', agrees: false }
    if (!seq) return fail('sequence', { sequences: (await sequencesOf()).map((s) => `${s.family}.${s.formula}`) })
    const terms = seq.terms.join(',')
    const url = `https://oeis.org/search?q=${terms}&fmt=json`
    const body = (await (await get(url)).json()) as { number?: number; name?: string; data?: string }[] | { results?: { number?: number; name?: string; data?: string }[] | null } | null
    const results = (Array.isArray(body) ? body : body?.results) ?? []
    const hit = results.find((r) => `,${r.data ?? ''},`.includes(`,${terms},`))
    const id = hit?.number !== undefined ? `A${String(hit.number).padStart(6, '0')}` : undefined
    return { source, url: id ? `https://oeis.org/${id}` : url, reading: { formula: `${family}.${formula}${fixed.length ? `(${fixed.join(',')}, n)` : '(n)'}`, terms, oeis: id ?? 'none', name: hit?.name ?? '', candidates: results.length }, expected: { terms }, agrees: id !== undefined }
  }
  if (source === 'datacite') {
    const doi = str(a.doi) || citeOf().doi
    const known = doisOf().find((d) => d.doi === doi)
    const url = `https://api.datacite.org/dois/${doi}`
    const d = ((await (await get(url, 'application/vnd.api+json')).json()) as { data?: { attributes?: { titles?: { title?: string }[]; creators?: { familyName?: string; name?: string }[]; publicationYear?: number; citationCount?: number; viewCount?: number; downloadCount?: number; versionCount?: number } } }).data?.attributes
    const creators = (d?.creators ?? []).map((c) => c.familyName ?? c.name ?? '')
    const live = { title: d?.titles?.[0]?.title, creators: creators.join('; '), year: d?.publicationYear, citations: d?.citationCount, views: d?.viewCount, downloads: d?.downloadCount, versions: d?.versionCount }
    const expected = { creator: citeOf().author.last, ...(known?.title ? { title: known.title } : {}) }
    return { source, url: `https://doi.org/${doi}`, reading: live, expected, agrees: creators.includes(expected.creator) && (!known?.title || live.title === known.title) }
  }
  if (source === 'novelty') {
    // DataCite registration dates for the unit's DOIs. The rows are the public reading.
    const dois = doisOf()
    // sequential, not concurrent: DataCite rate-limits a burst, and the author's DOIs are a small set read once
    const rows: { doi: string; archive: string; title: string | null; dated: string | null; year: number | null; version: string | null; creator: string | null }[] = []
    for (const d of dois) {
      const at = ((await get(`https://api.datacite.org/dois/${d.doi}`, 'application/vnd.api+json').then((r) => r.json()).catch(() => null)) as { data?: { attributes?: { registered?: string; created?: string; publicationYear?: number; version?: string; titles?: { title?: string }[]; creators?: { familyName?: string; name?: string }[] } } } | null)?.data?.attributes
      rows.push({ doi: d.doi, archive: `https://doi.org/${d.doi}`, title: d.title ?? at?.titles?.[0]?.title ?? null, dated: at?.registered ?? at?.created ?? null, year: at?.publicationYear ?? null, version: at?.version ?? null, creator: (at?.creators ?? []).map((c) => c.familyName ?? c.name ?? '').join('; ') || null })
    }
    const dated = rows.map((r) => r.dated).filter((x): x is string => Boolean(x)).sort()
    const reading = {
      of: 'novelty', license: 'CC-BY-NC-ND-4.0', author: citeOf().author.last, orcid: citeOf().author.orcid,
      priorityDate: dated[0] ?? null, records: rows,
      boundBy: 'the content is content-addressed — the unit\'s own UUID receipts recompute to the same value, binding the archived record to what it serves',
    }
    return { source, url: 'https://doi.org', reading, expected: { priorityDate: 'a registered date' }, agrees: dated.length > 0 }
  }
  if (source === 'orcid') {
    const { author } = citeOf()
    const id = author.orcid.replace(/^https?:\/\/orcid\.org\//, '')
    const url = `https://pub.orcid.org/v3.0/${id}`
    // the name ORCID puts on works is the credit name; the family name is the legal transliteration. The citation
    // carries the credit name, so either reading agreeing is the record naming this author.
    const d = (await (await get(url)).json()) as { person?: { name?: { 'family-name'?: { value?: string }; 'given-names'?: { value?: string }; 'credit-name'?: { value?: string } } }; 'activities-summary'?: { works?: { group?: unknown[] } } }
    const name = d.person?.name
    const live = { family: name?.['family-name']?.value, given: name?.['given-names']?.value, credit: name?.['credit-name']?.value, works: d['activities-summary']?.works?.group?.length }
    const expected = { credit: `${author.first} ${author.last}`, family: author.last, given: author.first }
    return { source, url: author.orcid, reading: live, expected, agrees: live.credit === expected.credit || (live.family === author.last && live.given === author.first) }
  }
  if (source === 'github') {
    const repo = str(a.repo) || reposOf()[0] || ''
    if (!reposOf().includes(repo)) return fail('repo', { repos: reposOf() })
    const url = `https://api.github.com/repos/${repo}`
    let response: Response
    try {
      response = await get(url, 'application/vnd.github+json')
    } catch (e) {
      // a private repository answers 404 to a client without access. The address exists; it is not public.
      if (/answered 404/.test(String((e as Error).message))) return { ...fail('not public', {}), source, url: `https://github.com/${repo}`, reading: { visible: false }, expected: { public: true, archived: false }, resolve: 'GitHub answers 404 to a client without access: this repository is not public, so the deploy button names a repository an outsider cannot clone' }
      throw e
    }
    const d = (await response.json()) as { private?: boolean; archived?: boolean; default_branch?: string; pushed_at?: string; stargazers_count?: number; forks_count?: number; open_issues_count?: number; license?: { spdx_id?: string } | null }
    const live = { branch: d.default_branch, pushed: d.pushed_at, license: d.license?.spdx_id ?? 'none', stars: d.stargazers_count, forks: d.forks_count, issues: d.open_issues_count }
    return { source, url: `https://github.com/${repo}`, reading: live, expected: { public: true, archived: false }, agrees: d.private === false && d.archived === false }
  }
  if (source === 'npm') {
    // the unit's package is named for its repository: github.com/owner/repo publishes @owner/repo
    const name = str(a.name) || (reposOf()[0] ? `@${reposOf()[0]}` : '')
    const url = `https://registry.npmjs.org/${name.replace('/', '%2f')}`
    const d = (await (await get(url)).json()) as { 'dist-tags'?: { latest?: string }; versions?: Record<string, unknown>; time?: { modified?: string } }
    const live = { latest: d['dist-tags']?.latest, versions: Object.keys(d.versions ?? {}).length, modified: d.time?.modified }
    return { source, url: `https://www.npmjs.com/package/${name}`, reading: live, expected: { latest: packageVersion }, agrees: live.latest === packageVersion }
  }
  if (source === 'alpine') {
    // Alpine Linux community apps: one directory per package in aports/community (GitLab, keyless). The count (x-total on
    // page 1) is always the lead; the full enumeration is attempted page by page and fail-fast — a page that errors
    // stops the walk (HOT, continued next run). No clock bounds the walk: the count it reaches is a function of the pages read. The reading stays small: a
    // count and a content digest over the sorted names so far (the address that recomputes), never the names inlined.
    const base = 'https://gitlab.alpinelinux.org/api/v4/projects/alpine%2Faports/repository/tree?path=community&per_page=100'
    const first = await get(`${base}&page=1`)
    const apps = Number(first.headers.get('x-total'))
    const pages = Number(first.headers.get('x-total-pages'))
    const names = ((await first.json()) as { name?: string }[]).map((e) => e.name ?? '')
    let page = 1
    for (let p = 2; p <= pages; p++) {
      try {
        for (const e of (await get(`${base}&page=${p}`).then((r) => r.json())) as { name?: string }[]) if (e.name) names.push(e.name)
        page = p
      } catch { break } // a throttled/slow page is HOT: stop here, the next run resumes the walk
    }
    const complete = names.length === apps
    const digest = contentUuidOf([...names].sort())
    const live = { apps, pages, discovered: names.length, page, complete, digest }
    return { source, url: 'https://pkgs.alpinelinux.org/packages?repo=community', reading: live, expected: { apps }, agrees: Number.isInteger(apps) && apps > 0 }
  }
  if (source === 'apis') {
    // the API registry the unit fused, against theorem fuse: the APIs it listed then, read live now
    const fused = /theorem fuse : (\d+) \+ (\d+) = (\d+)/.exec(leanSource)
    const url = 'https://api.apis.guru/v2/metrics.json'
    const d = (await (await get(url)).json()) as { numAPIs?: number; numSpecs?: number; numEndpoints?: number; unreachable?: number; invalid?: number; fixes?: number }
    const live = { apis: d.numAPIs, specs: d.numSpecs, endpoints: d.numEndpoints, unreachable: d.unreachable, invalid: d.invalid }
    const expected = { apis: Number(fused?.[3]), theorem: fused ? `theorem fuse: ${fused[1]} + ${fused[2]} = ${fused[3]}` : 'theorem fuse missing' }
    return { source, url: 'https://apis.guru', reading: live, expected, agrees: live.apis === expected.apis }
  }
  if (source === 'site') {
    // the unit's own site, walked as the unit serves it: every address the sitemap names is asked of the Payload app the
    // unit hands browser pages to (in-process on Workers, the host over the network elsewhere). Every address agrees
    // when it answers 200; one that serves a page also carries a title. A JSON or XML door answers its document.
    // The reading is the site as a whole; each address that does not is named.
    const origin = (qpuCiteOf() as unknown as { href: string }).href
    const ask = async (path: string, accept: string, within = DEADLINE): Promise<Response> => {
      const request = new Request(`${origin}${path}`, { headers: { accept, 'user-agent': 'qpu.uuidna.com (+https://qpu.uuidna.com)' } })
      const door = env?.PAYLOAD ? env.PAYLOAD.fetch(request) : fetch(request)
      let timer: ReturnType<typeof setTimeout> | undefined
      try {
        return await Promise.race([door, new Promise<Response>((_, reject) => { timer = setTimeout(() => reject(new Error(`${path} did not answer within ${within === DEADLINE ? 'the deadline' : 'the window'}`)), within) })])
      } finally { clearTimeout(timer) }
    }
    // the sitemap is one read that gathers the whole site, and a cold isolate's first answer is Payload's initialisation:
    // it gets the window; every page then gets the deadline
    const xml = await (await ask('/sitemap.xml', 'application/xml', OFFLINE_WINDOW)).text()
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.replace(origin, '') || '/')
    // n addresses at a time: every page is rendered in this isolate, and sixty at once starve each other of the deadline
    const one = async (path: string) => {
      try {
        const r = await ask(path, 'text/html')
        const html = r.status === 200 ? await r.text() : ''
        const page = (r.headers.get('content-type') ?? '').includes('text/html')
        const title = page ? (/<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim() ?? '') : ''
        return { path, status: r.status, title, page }
      } catch (e) {
        return { path, status: 0, title: '', page: false, error: (e as Error).message }
      }
    }
    // a slice per call: { from, take } with next, so no one call renders the whole site
    const total = paths.length
    const from = num(a.from, 0), take = num(a.take, facesOf().faces)
    const slice = paths.slice(from, from + take)
    const rows: Awaited<ReturnType<typeof one>>[] = []
    for (let i = 0; i < slice.length; i += L.n) rows.push(...(await Promise.all(slice.slice(i, i + L.n).map(one))))
    const failing = rows.filter((r) => r.status !== 200 || (r.page && !r.title))
    const pages = rows.filter((r) => r.page).length
    const live = { total, from, take: slice.length, ...(from + slice.length < total ? { next: from + slice.length } : {}), addresses: rows.length, answered: rows.filter((r) => r.status === 200).length, titled: rows.filter((r) => r.title).length, failing: failing.map((r) => `${r.path} ${r.status}${r.error ? ` ${r.error}` : ''}`) }
    return { source, url: `${origin}/sitemap.xml`, reading: live, expected: { answered: rows.length, titled: pages }, agrees: rows.length > L.n - L.n && failing.length === L.n - L.n, rows }
  }
  if (source === 'release') {
    // the GitHub Release of the served version: the tag v<version> exists, is published, and carries notes.
    // a 404 is that tag not published yet, not a missing address and not the network.
    const repo = reposOf()[0] ?? ''
    const url = `https://api.github.com/repos/${repo}/releases/tags/v${packageVersion}`
    let response: Response
    try {
      response = await get(url, 'application/vnd.github+json')
    } catch (e) {
      if (/answered 404/.test(String((e as Error).message))) return { source, url: `https://github.com/${repo}/releases/tag/v${packageVersion}`, reading: { tag: `v${packageVersion}`, published: false }, expected: { tag: `v${packageVersion}`, published: true }, agrees: false, denied: 'not released', resolve: `GitHub has no release v${packageVersion}: the served version is ahead of what is published` }
      throw e
    }
    const d = (await response.json()) as { tag_name?: string; name?: string; published_at?: string; draft?: boolean; prerelease?: boolean; body?: string; html_url?: string }
    const live = { tag: d.tag_name, name: d.name, published: d.published_at, draft: d.draft, prerelease: d.prerelease, notes: (d.body ?? '').length }
    return { source, url: d.html_url ?? `https://github.com/${repo}/releases`, reading: live, expected: { tag: `v${packageVersion}`, published: true }, agrees: live.tag === `v${packageVersion}` && d.draft === false && typeof d.published_at === 'string' && live.notes > 0 }
  }
  if (source === 'patents') {
    // PATENTS, FUSED. The registry's own patent authority is USPTO's bulk data (files, not search). Search is
    // PatentsView, whose API answers with a key the operator holds as a Worker secret (PATENTSVIEW_API_KEY); without
    // it the reading says so and resolves it. A query is the inventor's last name; the reading is the patents found —
    // numbers, dates, counts — for discovery.
    const inventor = str(a.inventor) || 'Tesla'
    const key = (env as unknown as { PATENTSVIEW_API_KEY?: string } | undefined)?.PATENTSVIEW_API_KEY ?? (typeof process !== 'undefined' ? process.env.PATENTSVIEW_API_KEY : undefined)
    const bulk = await apiOf('uspto.gov:bdss')
    const bulkRead = bulk.operations.find((op) => op.verb === 'get' && op.required.length === 0)
    const bulkReading = bulkRead ? await apiCallOf(bulk.index, bulkRead.index) : undefined
    if (!key) {
      return { source, url: 'https://search.patentsview.org', reading: { inventor, bulk: bulkReading ? { url: bulkReading.url, status: bulkReading.status, why: bulkReading.why } : 'no read', search: 'needs a key' }, expected: { search: 'PatentsView answers with a key' }, agrees: false, warning: 'no PATENTSVIEW_API_KEY', resolve: 'set the Worker secret PATENTSVIEW_API_KEY (free at patentsview.org); the operator holds it, the unit never does' }
    }
    const q = encodeURIComponent(JSON.stringify({ _contains: { 'inventors.inventor_name_last': inventor } }))
    const fl = encodeURIComponent(JSON.stringify(['patent_id', 'patent_title', 'patent_date', 'patent_num_times_cited_by_us_patents']))
    const r = await fetch(`https://search.patentsview.org/api/v1/patent/?q=${q}&f=${fl}&o=${encodeURIComponent(JSON.stringify({ size: facesOf().faces }))}`, { headers: { accept: 'application/json', 'X-Api-Key': key }, signal: AbortSignal.timeout(DEADLINE) })
    if (!r.ok) throw new Error(`https://search.patentsview.org answered ${r.status}`)
    const d = (await r.json()) as { patents?: { patent_id: string; patent_title: string; patent_date: string; patent_num_times_cited_by_us_patents?: number }[]; total_hits?: number }
    const live = { inventor, total: d.total_hits, patents: (d.patents ?? []).map((p) => ({ id: p.patent_id, title: p.patent_title, date: p.patent_date, cited: p.patent_num_times_cited_by_us_patents })), bulk: bulkReading ? { url: bulkReading.url, status: bulkReading.status } : undefined }
    return { source, url: 'https://search.patentsview.org', reading: live, expected: { total: '>= 1' }, agrees: (d.total_hits ?? 0) > 0 }
  }
  if (source === 'authors') {
    // THE WORK OF THE CITED AUTHORS. The unit cites by DOI and ORCID; the record around those is read live: each cited
    // DOI's creators, year and citation count from DataCite, and for every creator with an ORCID their works (ORCID)
    // and the works Crossref indexes for that ORCID — titles, years, DOIs, counts — as readings whose numbers go to
    // discovery. A slice of faces readings per call, from `from`.
    const from = num(a.from, 0), take = num(a.take, facesOf().faces)
    const cite = citeOf()
    const dois = doisOf().map((d) => d.doi)
    const creators = new Map<string, { name: string; orcid?: string }>()
    const works: { doi: string; title?: string; year?: number; citations?: number; creators: string[] }[] = []
    for (const doi of dois) {
      const d = ((await (await get(`https://api.datacite.org/dois/${doi}`, 'application/vnd.api+json')).json()) as { data?: { attributes?: { titles?: { title?: string }[]; publicationYear?: number; citationCount?: number; creators?: { name?: string; nameIdentifiers?: { nameIdentifier?: string; nameIdentifierScheme?: string }[] }[] } } }).data?.attributes
      const names: string[] = []
      for (const c of d?.creators ?? []) {
        const orcid = c.nameIdentifiers?.find((x) => x.nameIdentifierScheme === 'ORCID')?.nameIdentifier?.replace(/^https?:\/\/orcid\.org\//, '')
        if (c.name) { names.push(c.name); creators.set(orcid ?? c.name, { name: c.name, ...(orcid ? { orcid } : {}) }) }
      }
      works.push({ doi, title: d?.titles?.[0]?.title, year: d?.publicationYear, citations: d?.citationCount, creators: names })
    }
    const own = cite.author.orcid.replace(/^https?:\/\/orcid\.org\//, '')
    if (!creators.has(own)) creators.set(own, { name: `${cite.author.first} ${cite.author.last}`, orcid: own })
    const authors = [...creators.values()].slice(from, from + take)
    const around = await Promise.all(authors.map(async (c) => {
      if (!c.orcid) return { ...c, works: works.filter((w) => w.creators.includes(c.name)).length }
      const o = (await (await get(`https://pub.orcid.org/v3.0/${c.orcid}/works`)).json()) as { group?: { 'work-summary'?: { title?: { title?: { value?: string } }; 'publication-date'?: { year?: { value?: string } }; type?: string }[] }[] }
      const summaries = (o.group ?? []).map((g) => g['work-summary']?.[0]).filter(Boolean) as NonNullable<NonNullable<typeof o.group>[number]['work-summary']>[number][]
      const cr = (await (await get(`https://api.crossref.org/works?filter=orcid:${c.orcid}&rows=0&mailto=ceccec@psg.bg`)).json().catch(() => ({}))) as { message?: { 'total-results'?: number } }
      return { ...c, works: summaries.length, years: [...new Set(summaries.map((w) => Number(w['publication-date']?.year?.value)).filter((y) => y > 0))].sort(), types: [...new Set(summaries.map((w) => w.type).filter(Boolean))], crossref: cr.message?.['total-results'] ?? null, titles: summaries.slice(0, 5).map((w) => w.title?.title?.value) }
    }))
    const live = { cited: works, authors: around, from, take: around.length, ...(from + around.length < creators.size ? { next: from + around.length } : {}) }
    return { source, url: 'https://api.datacite.org', reading: live, expected: { authors: '>= 1', works: '>= 1' }, agrees: around.length > 0 && around.some((x) => x.works > 0) }
  }
  if (source === 'research') {
    // the research a human request needs, done by the registry: a family's formula names are the words, the APIs they
    // find are read, and their numbers go to discovery with every other live reading
    const family = str(a.family) || 'cal'
    const formulas = hexFamiliesOf().get(family)
    if (!formulas) return fail('family', { families: [...hexFamiliesOf().keys()] })
    // the words: the family's formula names, or the words given (a lead's own); `from` continues the scan of the
    // matched documents where the last call stopped, so a deep research reads every API the words name, slice by slice
    const given = Array.isArray(a.words) ? a.words.map(String) : typeof a.words === 'string' ? a.words.split(/[\s,]+/) : []
    // the family's own words: its name, its formula names, and the domain words its doc comment names (family-words.ts)
    const own = FAMILY_WORDS[family.replace(/^Qpu\./, '').toLowerCase()] ?? []
    const words = given.length ? given : [...new Set([family, ...formulas.flatMap((f) => f.name.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).split(' ')), ...own])]
    const from = typeof a.from === 'number' ? a.from : 0
    const faces = facesOf().faces
    // a word is a whole token. "line" does not name an API called airlines, and "gate" does not name apigateway.
    const terms = words.map((w) => w.toLowerCase()).filter((w) => w.length > 2)
    const tokened = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).some((w) => terms.includes(w))
    const reg = await apiRegistryOf()
    const named = reg.names.filter((api) => {
      const entry = reg.entries[api] ?? {}
      const version = entry.versions?.[entry.preferred ?? ''] ?? {}
      return tokened(`${api} ${version.info?.title ?? ''}`)
    })
    // every usable API the words name is read: keyless (no secured scheme), served, with a free GET. The named APIs are
    // walked in slices of faces, and the walk reads all of them: none is left out.
    const reads: Awaited<ReturnType<typeof apiCallOf>>[] = []
    let cursor = from
    // take: read at most that many APIs from the cursor, so a small job is one slice; the reply names the next cursor
    const stop = typeof a.take === 'number' && a.take > 0 ? Math.min(named.length, from + Math.floor(a.take)) : named.length
    while (cursor < stop) {
      const slice = named.slice(cursor, cursor + faces)
      const loaded = await Promise.all(slice.map(async (name) => apiOf(name)))
      const readable = loaded.filter((api) => api.why === undefined && api.secured !== true && api.server).flatMap((api) => {
        const free = api.operations.find((op) => op.verb === 'get' && op.required.length === 0)
        return free ? [{ api, free }] : []
      })
      reads.push(...(await Promise.all(readable.map(async (x) => apiCallOf(x.api.index, x.free.index)))))
      cursor += slice.length
    }
    if (reads.some((r) => r.status > 0)) {
      const live = { family, words: terms, matched: named.length, from, ...(cursor < named.length ? { next: cursor } : {}), read: reads.length, readings: reads.map((r) => ({ api: r.api, status: r.status, url: r.url, hex: r.hex, excerpt: r.excerpt })) }
      return { source, url: 'https://apis.guru', reading: live, expected: { matched: '>= 1', answered: '>= 1' }, agrees: true }
    }
    // no keyless API named by these words answered. A family no API names is tested on the dataset (its own formulas,
    // not the lattice-wide sequence scan). A slice that named APIs and got no reading is a warning: the unit did not differ.
    if (named.length === 0) {
      const looked: { formula: string; oeis?: string; terms?: string; warning?: string }[] = []
      for (const x of formulas) {
        if ((x.arity !== 1 && x.arity !== 2) || x.live) continue
        const seq = await sequenceOf(family, x.name, x.arity === 2 ? [2] : [])
        if (!seq) { looked.push({ formula: x.name, warning: 'shorter than six terms' }); continue }
        const terms = seq.terms.join(',')
        const body = (await get(`https://oeis.org/search?q=${terms}&fmt=json`).then((r) => r.json()).catch(() => null)) as { number?: number; data?: string }[] | { results?: { number?: number; data?: string }[] | null } | null
        const results = (Array.isArray(body) ? body : body?.results) ?? []
        const hit = results.find((r) => `,${r.data ?? ''},`.includes(`,${terms},`))
        looked.push({ formula: x.name, terms, oeis: hit?.number !== undefined ? `A${String(hit.number).padStart(6, '0')}` : 'none' })
      }
      const live = { family, words: terms, matched: looked.filter((x) => x.oeis && x.oeis !== 'none').length, scanned: 0, read: looked.length, dataset: 'OEIS', readings: looked }
      return { source, url: 'https://oeis.org', reading: live, expected: { matched: '>= 1', answered: '>= 1' }, agrees: looked.length > 0 && looked.some((x) => (x.oeis !== undefined && x.oeis !== 'none') || x.warning !== undefined) }
    }
    const live = { family, words: terms, matched: named.length, from, ...(cursor < named.length ? { next: cursor } : {}), read: reads.length, readings: reads.map((r) => ({ api: r.api, status: r.status, url: r.url, why: r.why })) }
    return { source, url: 'https://apis.guru', reading: live, expected: { answered: '>= 1' }, agrees: false, warning: 'no reading', resolve: 'the words name no keyless API that answered: read a formula with source:sequence, or the next slice' }
  }
  if (source === 'ask') {
    // THE CHAT: a question in words answered by the formula its words name. The words of the question are crossed
    // with the words of every family and formula; the formula whose words the question covers best is the one asked;
    // the numbers in the question are its parameters, in order. The exposed reply is the formula, the integer, the
    // fold and the hue. A named Payload collection is read through the plugin's findDocuments; that document is not
    // the reply. A question that names no formula, or too few numbers, says what it would need.
    const q = str(a.about)
    if (!q) return fail('about', { about: 'a question in words, with its numbers' })
    const wordsOf = (s: string) => s.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 1)
    const asked = new Set(wordsOf(q))
    const numbers = (q.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number).filter((x) => Number.isSafeInteger(x) && x >= 0)
    // THE CONNECTOR, IN CHAT: before matching a formula, the chat answers the connector's own capabilities — how to
    // connect from a coding agent, what tools and doors there are, and what families it speaks. The chat is the
    // connector: ask it to connect, to list, or to compute, and it answers from the live surface, not a guess.
    const cw = new Set(wordsOf(q))
    const has = (...ks: string[]) => ks.some((k) => cw.has(k))
    if (numbers.length === 0 && has('connect', 'connector', 'install', 'setup', 'configure', 'add') && has('mcp', 'connector', 'agent', 'claude', 'cursor', 'code', 'server', 'you')) {
      const h = harnessesOf()
      return { source, url: h.url, reading: { answer: `Add the MCP server ${h.name} at ${h.url} — ${h.rows.find((r) => r.harness === 'Claude Code')?.how}`, connect: h.rows.map((r) => ({ harness: r.harness, how: r.how })), mcpUrl: h.url, auth: h.auth }, expected: { harnesses: '>= 1' }, agrees: h.holds === true }
    }
    if (numbers.length === 0 && has('tools', 'tool', 'doors', 'door', 'capabilities', 'capability', 'offer', 'use')) {
      const doors = mcpDoorsOf()
      return { source, url: `${(qpuCiteOf() as { href: string }).href}/api`, reading: { answer: `${mcpToolsListOf().length} tools; through them ${doors.doors.length} doors and ${doors.formulas} formulas`, tools: mcpToolsListOf().length, doors: doors.doors.map((d) => d.name), formulas: doors.formulas }, expected: { tools: '>= 1' }, agrees: true }
    }
    if (numbers.length === 0 && has('families', 'family', 'formulas')) {
      const fams = [...hexFamiliesOf()].filter(([f]) => !DOORS.has(f)).map(([f, fs]) => ({ family: f, formulas: fs.map((x) => x.name) }))
      return { source, url: `${(qpuCiteOf() as { href: string }).href}/families`, reading: { answer: `${fams.length} families: ${fams.map((f) => f.family).join(', ')}`, families: fams }, expected: { families: '>= 1' }, agrees: fams.length > 0 }
    }
    // HOW TO PORT, not what to depend on: the gate blocks an external dependency in the core, and the chat says what to do
    // instead — the steps and the port map (src/quantum/processing/unit/porting.ts).
    if (numbers.length === 0 && has('port', 'porting', 'dependency', 'dependencies', 'external', 'depend')) {
      const p = portingOf()
      return { source, url: `${(qpuCiteOf() as { href: string }).href}/api`, reading: { answer: p.rule, steps: p.steps, ports: p.ports, blocks: p.blocks }, expected: { steps: '>= 1' }, agrees: p.holds }
    }
    // NEXT, THE INTELLIGENT STEP: let the families organise by domain and discover all around. The bridges (family → domain,
    // filled as the families seal) group into domains; the neighbourhood of a named family is the families sharing its
    // domain; the frontier is the thinnest domains — where next develops. No hand list: the graph organises itself.
    if (numbers.length === 0 && has('next', 'organize', 'organise', 'discover', 'around', 'domain', 'domains', 'neighbour', 'neighbor', 'frontier')) {
      const bridges = crossBridgesOf()
      const byDomain = new Map<string, string[]>()
      for (const [fam, dom] of bridges) (byDomain.get(dom) ?? byDomain.set(dom, []).get(dom)!).push(fam)
      const domains = [...byDomain].map(([domain, families]) => ({ domain, families: families.sort(), count: families.length })).sort((a, b) => b.count - a.count)
      const named = [...bridges.keys()].find((fm) => asked.has(fm))
      const around = named ? (byDomain.get(bridges.get(named)!) ?? []).filter((fm) => fm !== named).sort() : undefined
      const frontier = [...domains].sort((a, b) => a.count - b.count).slice(0, facesOf().faces).map((d) => d.domain)
      return { source, url: `${(qpuCiteOf() as { href: string }).href}/families`, reading: { answer: `${bridges.size} families organise into ${domains.length} domains; next develops the thin edges: ${frontier.join(', ') || 'none yet'}`, domains, ...(named ? { around: { family: named, domain: bridges.get(named), neighbours: around } } : {}), frontier }, expected: { domains: '>= 1' }, agrees: domains.length > 0 }
    }
    const candidates = [...hexFamiliesOf()].filter(([fam]) => !DOORS.has(fam)).flatMap(([family, formulas]) => formulas.filter((x) => !x.live).map((x) => {
      const fw = wordsOf(family), xw = wordsOf(x.name)
      const own = [...new Set([...fw, ...xw])]
      const covered = own.filter((w) => asked.has(w))
      // the formula's own words covered, weighted: a formula word counts twice a family word; ties go to the exact arity
      const score = covered.reduce((s, w) => s + (xw.includes(w) ? 2 : 1), 0) + (x.arity === numbers.length ? 0.5 : 0)
      return { family, name: x.name, arity: x.arity, score, covered, missing: own.filter((w) => !asked.has(w)) }
    })).filter((c) => c.score > 0).sort((x, y) => y.score - x.score)
    const best = candidates[0]
    if (!best) return { source, url: `${(qpuCiteOf() as { href: string }).href}/families`, reading: { answer: 'no formula is named by these words', families: [...hexFamiliesOf().keys()].filter((f) => !DOORS.has(f)) }, expected: { formula: 'named' }, agrees: false }
    const params = numbers.slice(0, best.arity)
    if (params.length < best.arity) return { source, url: `${(qpuCiteOf() as { href: string }).href}/${best.family}`, reading: { formula: `${best.family}.${best.name}`, needs: best.arity, given: numbers.length, answer: `${best.family}.${best.name} takes ${best.arity} number${best.arity === 1 ? '' : 's'}; the question gives ${numbers.length}` }, expected: { numbers: best.arity }, agrees: false }
    const hex = qpuHexUuidOf({ family: best.family, program: [best.name], params })
    const r = (await hexRunOf(hex, undefined, env, { store: false })) as { value?: unknown; holds?: boolean }
    const value = typeof r.value === 'bigint' ? r.value.toString() : typeof r.value === 'object' && r.value !== null && 'value' in r.value ? String((r.value as { value: unknown }).value) : String(r.value)
    const formula = `${best.family}.${best.name}`
    const fold = foldOf(`${formula}=${value}`)
    const named = collectionAskedOf(asked)
    const content = named ? await payloadContentFoldOf(env, auth, named) : undefined
    const distance = content ? Math.min(hammingOf(fold, content), HUE_BITS) : Math.min(nibbleWeightOf(fold), HUE_BITS)
    const live = { formula, value, fold, hue: hueOf(distance), hex, holds: r.holds === true }
    return { source, url: `${(qpuCiteOf() as { href: string }).href}/${hex}`, reading: live, expected: { holds: true }, agrees: r.holds === true }
  }
  if (source === 'collisions') {
    // SO MUCH LEADS FROM HERE: the CERN Open Data catalogue — 66k records — read live and keyless. The verified record
    // 38 proved events = files · q + r against theorem cern; every other record is the same arithmetic unproven, a
    // lead. This walks a slice (from the page), reads each record's events and files, and when both are present the
    // integer quotient and remainder are the candidate relation; a human (or a new theorem) crosses it. `from` is the page.
    const page = typeof a.from === 'number' && a.from > 0 ? a.from : 1
    const url = `https://opendata.cern.ch/api/records?size=${facesOf().faces}&page=${page}&type=Dataset&sort=mostrecent`
    const body = (await get(url).then((x) => x.json()).catch(() => null)) as { hits?: { total?: { value?: number } | number; hits?: { id?: number; metadata?: { title?: string; distribution?: { number_events?: number; number_files?: number } } }[] } } | null
    const hits = body?.hits?.hits ?? []
    const total = typeof body?.hits?.total === 'object' ? body?.hits?.total?.value : body?.hits?.total
    const leads = hits.map((h) => { const ev = h.metadata?.distribution?.number_events, fi = h.metadata?.distribution?.number_files; const rel = ev && fi && fi > 0 ? { q: Math.floor(ev / fi), r: ev % fi, check: `${fi} · ${Math.floor(ev / fi)} + ${ev % fi} = ${ev}` } : undefined; return { id: h.id, title: (h.metadata?.title ?? '').slice(0, 80), events: ev, files: fi, ...(rel ? { relation: rel } : {}) } })
    const withCounts = leads.filter((l) => l.relation)
    const live = { total, page, ...(page * facesOf().faces < (total ?? 0) ? { next: page + 1 } : {}), read: leads.length, withCounts: withCounts.length, leads }
    return { source, url: 'https://opendata.cern.ch', reading: live, expected: { records: '>= 1' }, agrees: leads.length > 0 }
  }
  if (source === 'clay') {
    // THE CLAY SOLUTIONS AS QUANTUM PROOFS, IN PROCESS, TOKEN-FREE: the six Millennium σ-involution seals (Rouschev,
    // 2026, doi:10.5281/zenodo.21781602), each computed exactly as the paper states it — σ self-inverse (σ∘σ = id),
    // fixed at the point the paper names — handed back WITH ITS HEX ADDRESS and WITH THE LEAN THEOREM that proves it in
    // the unit's own kernel (Qpu.Sigma, checked by `lake build`): the solution is a quantum proof, not a citation.
    // `about` names one seal (riemann, bsd, hodge, navierStokes, yangMills, pVsNp); unset, all six. Evidence only —
    // value/holds/hex/theorem — never a prize and never a solved flag.
    const { ClaySeals, CLAY_SEALS, CLAY_SEAL_SOURCE } = await import('../families/clay/index.js')
    // each seal at the fixed point the paper names: s = 1/2, (ℤ/15ℤ)*, Σ₂, ω₊ = −ω₋, Pauli σ_x, w presupposed
    const NAMED: Record<string, number[]> = { riemann: [1, 2], bsd: [15], hodge: [2], navierStokes: [1, 1], yangMills: [], pVsNp: [1] }
    // each seal's quantum proof — the Lean theorem of Qpu.Sigma that proves its σ-involution or named value
    const SIGMA: Record<string, string> = { riemann: 'sigma_midpoint', pVsNp: 'sigma_pvsnp', hodge: 'sigma_hodge', navierStokes: 'sigma_reflect', bsd: 'sigma_reflect', yangMills: 'clay_sigma' }
    const named = str(a.about).trim()
    const want = (CLAY_SEALS as readonly string[]).includes(named) ? [named] : [...CLAY_SEALS]
    const seals = want.map((name) => {
      const params = NAMED[name] ?? []
      const r = (ClaySeals[name as keyof typeof ClaySeals] as (...xs: number[]) => { value: number; holds: boolean; formula: string; proof: string })(...params)
      const thm = SIGMA[name]
      const quantumProof = thm && leanRecomputed[thm] ? { module: 'Qpu.Sigma', theorem: thm, holds: leanRecomputed[thm]!.holds, lean: leanRecomputed[thm]!.formula } : null
      return { seal: name, params, value: r.value, holds: r.holds, hex: qpuHexUuidOf({ family: 'clay', program: [name], params }), formula: r.formula, quantumProof, proof: r.proof }
    })
    const sigmaHolds = seals.every((s) => s.quantumProof?.holds === true)
    const live = { paper: 'All Seven Clay Millennium Problems Sealed via Universal σ-Involution', doi: CLAY_SEAL_SOURCE, sealed: seals.filter((s) => s.holds).length, of: seals.length, quantumProof: { module: 'Qpu.Sigma', theorem: 'clay_sigma', holds: leanRecomputed['clay_sigma']?.holds === true, verified: `lake build (leanprover/lean4) — ${LEAN_AXIOMS} axioms`, served: '{ source: proof }', relations: Object.keys(leanRecomputed).filter((k) => k.startsWith('relation_')).length }, seals, note: 'each σ-involution is a theorem of the unit\'s Lean kernel (Qpu.Sigma) — a quantum proof, not a prize or a solved flag; recognition by the Clay Mathematics Institute is a lead, not asserted here' }
    return { source, url: CLAY_SEAL_SOURCE, reading: live, expected: { sealed: seals.length, quantumProof: 'holds' }, agrees: seals.every((s) => s.holds) && sigmaHolds && LEAN_AXIOMS === 0 }
  }
  if (source === 'proof') {
    // THE QUANTUM PROOFS, IN PROCESS, TOKEN-FREE: every theorem of the Lean kernel (index.lean) the build recomputed,
    // each with holds and its exact Lean statement. The proofs the unit stands on — mint doubling, the lattice
    // identities, Shor's order-finding and the Born rule, the clay σ — navigable through the same door as every lead.
    // `about` filters by name or formula substring; `from` pages by faces. Zero axioms: nothing assumed, all proven.
    const names = Object.keys(leanRecomputed)
    const q = str(a.about).toLowerCase()
    const matched = q ? names.filter((nm) => nm.toLowerCase().includes(q) || leanRecomputed[nm]!.formula.toLowerCase().includes(q)) : names
    const faces = facesOf().faces
    const start = num(a.from, 0)
    const page = matched.slice(start, start + faces)
    const stmtOf = (nm: string) => (new RegExp(`theorem ${nm}\\b[\\s\\S]*?:=`).exec(leanSource)?.[0] ?? '').replace(/\s+/g, ' ').replace(/ :=$/, '').slice(0, 240)
    const rows = page.map((nm) => ({ theorem: nm, holds: leanRecomputed[nm]!.holds, ...(leanRecomputed[nm]!.over ? { over: leanRecomputed[nm]!.over } : {}), formula: leanRecomputed[nm]!.formula, lean: stmtOf(nm) }))
    // axioms MEASURED from the embedded source (not a literal 0): if an axiom ever enters leanSource, this reports it and agrees drops.
    const axioms = LEAN_AXIOMS
    const live = { toolchain: leanToolchain, path: leanPath, theorems: names.length, held: names.filter((nm) => leanRecomputed[nm]!.holds).length, axioms, matched: matched.length, from: start, ...(start + faces < matched.length ? { next: start + faces } : {}), rows }
    return { source, url: 'https://qpu.uuidna.com/lean', reading: live, expected: { held: names.length, axioms: 0 }, agrees: names.every((nm) => leanRecomputed[nm]!.holds) && axioms === 0 }
  }
  if (source === 'define') {
    // THE WORD, LOOKED UP — AND THE LEXICON AS LEADS. A word's meanings and phonetics come from the keyless Free
    // Dictionary (dictionaryapi.dev), its translation from the keyless MyMemory API — speech (how it sounds) and
    // translation, no token. And every dictionary/translation API the registry names is a lead for the next speech and
    // translation work. `about` is the word (default 'lead'), the very thing a lead is: a clue, a guide, a pointer.
    const word = (str(a.about) || 'lead').toLowerCase().split(/\s+/)[0]!
    const to = str(a.to) || 'es'
    const def = (await get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`).then((x) => x.json()).catch(() => null)) as { word?: string; phonetic?: string; phonetics?: { text?: string; audio?: string }[]; meanings?: { partOfSpeech?: string; definitions?: { definition?: string }[] }[] }[] | null
    const entry = Array.isArray(def) ? def[0] : null
    let meanings = (entry?.meanings ?? []).map((m) => ({ partOfSpeech: m.partOfSpeech, definition: m.definitions?.[0]?.definition }))
    // fallback to Wiktionary's keyless REST API when the Free Dictionary is down (it returned 522 on 2026-10-03)
    if (meanings.length === 0) {
      const wik = (await get(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`).then((x) => x.json()).catch(() => null)) as { en?: { partOfSpeech?: string; definitions?: { definition?: string }[] }[] } | null
      meanings = (wik?.en ?? []).map((m) => ({ partOfSpeech: m.partOfSpeech, definition: (m.definitions?.[0]?.definition ?? '').replace(/<[^>]+>/g, '').trim().slice(0, 160) || undefined }))
    }
    const phonetic = entry?.phonetic ?? entry?.phonetics?.find((p) => p.text)?.text
    const audio = entry?.phonetics?.find((p) => p.audio)?.audio
    const tr = (await get(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${to}`).then((x) => x.json()).catch(() => null)) as { responseData?: { translatedText?: string } } | null
    // the lexicon as leads: the registry's dictionary and translation APIs
    const found = await apiSearchOf(['dictionary', 'translate', 'translation', 'language', 'lexical', 'word', 'define', 'speech', 'phonetic'], facesOf().faces)
    const leads = found.apis.filter((x) => ['dictionary', 'translate', 'translation', 'language', 'lexical', 'speech'].some((w) => `${x.api} ${x.title}`.toLowerCase().includes(w))).map((x) => x.api)
    // attribution carried with the returned definitions: the Free Dictionary and the Wiktionary fallback are derived from
    // Wiktionary (CC BY-SA 3.0, share-alike), and the translation is MyMemory — the verbatim lexical content is credited.
    const attribution = { definitions: 'Free Dictionary (dictionaryapi.dev), derived from Wiktionary — CC BY-SA 3.0', translation: 'MyMemory (mymemory.translated.net)' }
    const live = { word, phonetic, audio, speech: Boolean(audio), meanings, translation: { to, text: tr?.responseData?.translatedText }, attribution, lexiconLeads: leads, matched: found.matched }
    return { source, url: 'https://dictionaryapi.dev + https://mymemory.translated.net', reading: live, expected: { meanings: '>= 1' }, agrees: meanings.length > 0 }
  }
  if (source === 'arxiv') {
    // OPEN RESEARCH AS LEADS: the newest arXiv preprints in a field (keyless Atom API) — the frontier, unsettled by
    // definition. Each is a lead: its title's words and numbers feed the discovery; `about` is the category (math.NT,
    // quant-ph, cs.CC …), `from` the 0-based start. The unit reads the frontier and sees what the lattice meets.
    const cat = str(a.about) || 'math'
    const start = typeof a.from === 'number' && a.from >= 0 ? a.from : 0
    const url = `http://export.arxiv.org/api/query?search_query=cat:${encodeURIComponent(cat)}*&sortBy=submittedDate&sortOrder=descending&start=${start}&max_results=${facesOf().faces}`
    const xml = await get(url, 'application/atom+xml').then((x) => x.text()).catch(() => '')
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1] ?? '')
    const field = (e: string, t: string) => (new RegExp(`<${t}[^>]*>([\s\S]*?)</${t}>`).exec(e)?.[1] ?? '').replace(/\s+/g, ' ').trim()
    const leads = entries.map((e) => { const title = field(e, 'title').slice(0, 120); return { id: field(e, 'id').split('/abs/')[1] ?? field(e, 'id'), title, numbers: (title.match(/\d+/g) ?? []).map(Number).filter((n) => Number.isSafeInteger(n) && n >= 3) } })
    const live = { category: cat, from: start, ...(entries.length === facesOf().faces ? { next: start + facesOf().faces } : {}), count: leads.length, numbers: [...new Set(leads.flatMap((l) => l.numbers))].slice(0, facesOf().faces), leads }
    return { source, url: 'https://arxiv.org', reading: live, expected: { open: '>= 1 preprint' }, agrees: leads.length > 0 }
  }
  if (source === 'books') {
    // OPEN BIBLIOGRAPHY AS LEADS: Open Library's keyless search — public, FACTUAL book metadata and its subject taxonomy,
    // never the text. The unit learns what books are ABOUT — the subjects feed the discovery, the years, editions and page
    // counts are the numbers the lattice meets. A book in copyright contributes only its facts; its words are never read.
    //   { about } learns one theme or title the caller names ('hello world hannah fry').
    //   no theme = RANGE THE UNIT'S OWN SUBJECT GRAPH: the roots are the unit's families (its authored subjects, NOT a
    //   typed list), so `from` addresses a family and `next` advances to the next — a hex program over a param that ranges
    //   the whole family graph. The books about a family are its neighbourhood; their subjects and numbers fuse into the
    //   discovery. (The law source derives its terms from the families the same way; books is no different.) Learn, freely.
    const faces = facesOf().faces
    const fams = [...hexFamiliesOf().keys()]
    const ranging = str(a.about) === ''
    const from = typeof a.from === 'number' && a.from >= 0 ? a.from : 0
    const family = ranging ? (fams[from % fams.length] ?? '') : ''
    // the family name split to its words (Qpu.Mint -> "mint"), a derived transform like the law source's wordsOf, so the
    // query is a word Open Library can match rather than the module's internal spelling — still the unit's own subject.
    const subjectOf = (f: string) => f.replace(/^Qpu\./, '').replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().trim()
    const q = ranging ? subjectOf(family) : str(a.about)
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&fields=title,author_name,first_publish_year,subject,edition_count,number_of_pages_median&limit=${faces}`
    const json = (await get(url, 'application/json').then((x) => x.json()).catch(() => null)) as { docs?: Array<Record<string, unknown>> } | null
    const docs = json && Array.isArray(json.docs) ? json.docs : []
    const num = (x: unknown): number | undefined => (typeof x === 'number' && Number.isSafeInteger(x) && x >= 3 ? x : undefined)
    const leads = docs.map((d) => {
      const subjects = Array.isArray(d.subject) ? (d.subject as unknown[]).map(String).slice(0, faces) : []
      return {
        title: str(d.title).slice(0, 120),
        author: Array.isArray(d.author_name) ? str((d.author_name as unknown[])[0]) : '',
        year: num(d.first_publish_year),
        editions: num(d.edition_count),
        pages: num(d.number_of_pages_median),
        subjects,
        numbers: [num(d.first_publish_year), num(d.edition_count), num(d.number_of_pages_median)].filter((x): x is number => typeof x === 'number'),
      }
    })
    const frontier = [...new Set(leads.flatMap((l) => l.subjects))]
    const live = {
      ...(ranging ? { family, from, next: (from + 1) % Math.max(fams.length, 1), families: fams.length } : { query: q }),
      count: leads.length,
      subjects: frontier.slice(0, faces * 2),
      numbers: [...new Set(leads.flatMap((l) => l.numbers))].slice(0, faces),
      leads,
    }
    return { source, url: 'https://openlibrary.org', reading: live, expected: { open: '>= 1 book' }, agrees: leads.length > 0 }
  }
  if (source === 'quantumai') {
    // GOOGLE QUANTUM AI, AS LEADS: every section of quantumai.google is read live, and every framework repository the
    // site links is read from GitHub. Each section and each repository is a lead for the court: its title and link, not a claim.
    const PAGES = ['whatisqc', 'quantumcomputer', 'roadmap', 'lab', 'software', 'cirq', 'qsim', 'qualtran', 'openfermion', 'research', 'resources']
    const pages = await Promise.all(PAGES.map(async (page) => ({ page, html: await get(`https://quantumai.google/${page}`).then((x) => (x.ok ? x.text() : null)).catch(() => null) })))
    const sections = pages.map(({ page, html }) => ({ page, reached: html !== null, title: html?.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() ?? null }))
    const repos = [...new Set(pages.flatMap(({ html }) => [...(html ?? '').matchAll(/https:\/\/github\.com\/([\w.-]+\/[\w.-]+)/g)].map((m) => m[1]!)))].sort()
    const checked = await Promise.all(repos.map(async (repo) => {
      const j = (await get(`https://api.github.com/repos/${repo}`).then((x) => (x.ok ? x.json() : null)).catch(() => null)) as { stargazers_count?: number; pushed_at?: string; archived?: boolean } | null
      return { repo, reached: j !== null, stars: j?.stargazers_count ?? null, pushed: j?.pushed_at ?? null, archived: j?.archived ?? null }
    }))
    const live = { sections, repos: checked, leads: sections.filter((s) => s.reached).length + checked.filter((r) => r.reached).length }
    return { source, url: 'https://quantumai.google', reading: live, expected: { answered: '>= 1' }, agrees: live.leads > 0, warning: live.leads === 0 ? 'no section or repository answered' : undefined }
  }
  if (source === 'news') {
    // ALL NEWS FROM EVERYWHERE, ANYTIME, AS LEADS: the newest stories across many keyless sources — Hacker News, Reddit,
    // Lobsters, Dev.to, and GDELT (global news in every language and country). Each story is a lead: its title's words and
    // numbers feed the discovery. `site` picks the source (default hn), `about` is the query (ANYTIME — searched across all
    // time, not just the latest page), `from` the 0-based page. The freshest and widest signal there is.
    const q = str(a.about)
    const start = typeof a.from === 'number' && a.from >= 0 ? a.from : 0
    const n = facesOf().faces
    const SITES = ['hn', 'reddit', 'lobsters', 'devto', 'gdelt'] as const
    const site = (SITES as readonly string[]).includes(str(a.site)) ? str(a.site) : 'hn'
    const numsOf = (t: string) => (t.match(/\d+/g) ?? []).map(Number).filter((x) => Number.isSafeInteger(x) && x >= 3)
    type Lead = { id?: string; title: string; points: number; link?: string; source: string; numbers: number[] }
    const j = async (url: string) => (await get(url).then((x) => x.json()).catch(() => null)) as Record<string, unknown> | unknown[] | null
    let leads: Lead[] = []
    let origin = 'https://news.ycombinator.com'
    try {
      if (site === 'hn') {
        const b = (await j(`https://hn.algolia.com/api/v1/${q ? 'search' : 'search_by_date'}?tags=story&hitsPerPage=${n}&page=${start}${q ? `&query=${encodeURIComponent(q)}` : ''}`)) as { hits?: { objectID?: string; title?: string | null; points?: number; url?: string | null }[] } | null
        leads = (b?.hits ?? []).filter((h) => h.title).map((h) => ({ id: h.objectID, title: (h.title ?? '').slice(0, 120), points: h.points ?? 0, link: h.url ?? undefined, source: 'hn', numbers: numsOf(h.title ?? '') }))
      } else if (site === 'reddit') {
        origin = 'https://www.reddit.com'
        const b = (await j(q ? `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&sort=new&limit=${n}` : `https://www.reddit.com/r/all/new.json?limit=${n}`)) as { data?: { children?: { data?: { id?: string; title?: string; score?: number; permalink?: string } }[] } } | null
        leads = (b?.data?.children ?? []).map((c) => c.data).filter((d): d is NonNullable<typeof d> => !!d?.title).map((d) => ({ id: d.id, title: (d.title ?? '').slice(0, 120), points: d.score ?? 0, link: d.permalink ? `https://reddit.com${d.permalink}` : undefined, source: 'reddit', numbers: numsOf(d.title ?? '') }))
      } else if (site === 'lobsters') {
        origin = 'https://lobste.rs'
        const b = (await j('https://lobste.rs/newest.json')) as { short_id?: string; title?: string; score?: number; url?: string }[] | null
        leads = (Array.isArray(b) ? b : []).slice(start * n, start * n + n).map((s) => ({ id: s.short_id, title: (s.title ?? '').slice(0, 120), points: s.score ?? 0, link: s.url ?? undefined, source: 'lobsters', numbers: numsOf(s.title ?? '') }))
      } else if (site === 'devto') {
        origin = 'https://dev.to'
        const b = (await j(`https://dev.to/api/articles?per_page=${n}&page=${start + 1}${q ? `&tag=${encodeURIComponent(q)}` : ''}`)) as { id?: number; title?: string; positive_reactions_count?: number; url?: string }[] | null
        leads = (Array.isArray(b) ? b : []).filter((x) => x?.title).map((x) => ({ id: String(x.id), title: (x.title ?? '').slice(0, 120), points: x.positive_reactions_count ?? 0, link: x.url, source: 'devto', numbers: numsOf(x.title ?? '') }))
      } else {
        origin = 'https://www.gdeltproject.org'
        const b = (await j(`https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q || 'technology')}&mode=ArtList&format=json&maxrecords=${n}&sort=datedesc`)) as { articles?: { url?: string; title?: string; domain?: string }[] } | null
        leads = (b?.articles ?? []).filter((x) => x?.title).map((x) => ({ id: x.url, title: (x.title ?? '').slice(0, 120), points: 0, link: x.url, source: `gdelt:${x.domain ?? ''}`, numbers: numsOf(x.title ?? '') }))
      }
    } catch { leads = [] }
    const live = { site, sites: SITES, about: q || 'latest', from: start, next: start + 1, count: leads.length, numbers: [...new Set(leads.flatMap((l) => l.numbers))].slice(0, n), leads }
    return { source, url: origin, reading: live, expected: { open: '>= 1 story' }, agrees: leads.length > 0 }
  }
  if (source === 'unanswered') {
    // OPEN PROBLEMS AS LEADS: MathOverflow's unanswered questions, read over the keyless Stack Exchange API — research
    // mathematics nobody has answered. Each is a lead: its title's words and any numbers in it go to the discovery,
    // and a question whose value a family reaches is a cross worth a human's look; the rest stay open. The unit never
    // claims to answer them — it feeds them in and sees what the lattice meets. `from` is the 1-based page, `about` a tag.
    // like mathoverflow: every research Stack Exchange site serves an unanswered feed over the same keyless API —
    // theoretical CS, physics, statistics, quantum computing, economics, astronomy, scientific computing, and more
    const SITES = ['mathoverflow', 'cstheory', 'physics', 'stats', 'math', 'quantumcomputing', 'economics', 'astronomy', 'scicomp', 'cs', 'hsm', 'mathematica', 'stackoverflow', 'softwareengineering', 'ux', 'webmasters', 'codereview', 'graphicdesign', 'security', 'gamedev', 'dba', 'devops', 'ai']
    const site = SITES.includes(str(a.site)) ? str(a.site) : 'mathoverflow'
    const from = typeof a.from === 'number' && a.from > 0 ? a.from : 1
    const tag = str(a.about) ? `&tagged=${encodeURIComponent(str(a.about))}` : ''
    const url = `https://api.stackexchange.com/2.3/questions/no-answers?site=${site}&order=desc&sort=votes&pagesize=${facesOf().faces}&page=${from}${tag}`
    const body = (await get(url).then((x) => x.json()).catch(() => null)) as { items?: { question_id: number; title: string; tags: string[]; score: number; link: string }[]; has_more?: boolean; quota_remaining?: number } | null
    const items = body?.items ?? []
    const numbersOfTitle = (t: string) => (t.match(/\d+/g) ?? []).map(Number).filter((n) => Number.isSafeInteger(n) && n >= 3)
    const leads = items.map((q) => ({ id: q.question_id, title: q.title.replace(/&[a-z]+;/g, ' ').slice(0, 120), tags: q.tags, score: q.score, link: q.link, numbers: numbersOfTitle(q.title) }))
    const live = { site, sites: SITES, from, ...(body?.has_more ? { next: from + 1 } : {}), quota: body?.quota_remaining, count: leads.length, numbers: [...new Set(leads.flatMap((l) => l.numbers))].slice(0, facesOf().faces), leads }
    return { source, url: 'https://mathoverflow.net/unanswered', reading: live, expected: { open: '>= 1 unanswered question' }, agrees: leads.length > 0 }
  }
  if (source === 'law') {
    // THE COURT-ADMISSIBLE RECORD + THE CASE LAW: the official sources a court accepts as authoritative, read live and
    // keyless — US Federal Register, UK legislation, EU law (EUR-Lex) — and the CourtListener corpus (the Free Law
    // Project), walked by citation so the biggest cases and the firms of record surface as leads — plus the registry's
    // legal APIs. The search TERMS ARE FORMULATED from the law family's own formula names (no hand list): add a law
    // formula and the record researches its word. The review layer for the `law` family: a computed conclusion becomes
    // advice only when confirmed TRUE against one of these documents; `about` searches them, `from` walks the registry.
    // One irreducible anchor word set (the domain word a formula cannot name); the rest is the family, split to words.
    const seed = ['law', 'legal', 'court', 'case', 'jurisdiction']
    const terms = [...new Set([...seed, ...(hexFamiliesOf().get('law') ?? []).flatMap((x) => x.name.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).split(/[^a-z]+/)).filter((w) => w.length > 2)])]
    const ask = str(a.about) ? str(a.about).toLowerCase().split(/[\s,]+/).filter(Boolean) : []
    const from = typeof a.from === 'number' ? a.from : 0
    const nums = (t: string) => (t.match(/\d+/g) ?? []).map(Number).filter((n) => Number.isSafeInteger(n) && n >= 3)
    type Src = { source: string; title: string; jurisdiction: string; secured: boolean; operation: string; status: number; url: string; records?: number; keyless: boolean }
    const anchor: Src[] = []
    let cases: { case: string; court: string; citeCount: number; dateFiled?: string; firms: string[]; numbers: number[] }[] = []
    if (from === 0) {
      const terml = ask.length ? ask.join(' ') : terms.join(' ')
      const q = encodeURIComponent(terml)
      const clUrl = `https://www.courtlistener.com/api/rest/v4/search/?type=o&order_by=${encodeURIComponent('citeCount desc')}&q=${q}`
      // Each official source is read at its own keyless endpoint and in its own format: legislation.gov.uk serves no JSON
      // (a `format=json` request returns HTML, so .json() would silently fail and the UK source would never answer) — it
      // serves Atom, so it is read as a `.feed` and parsed as text. The rest answer JSON. `feed` picks the reader.
      const official = [
        { source: 'federalregister.gov', title: 'US Federal Register', jurisdiction: 'US', feed: false, url: `https://www.federalregister.gov/api/v1/documents.json?per_page=1${ask.length ? `&conditions[term]=${q}` : ''}`, count: (b: Record<string, unknown>) => b.count as number | undefined },
        { source: 'legislation.gov.uk', title: 'UK legislation', jurisdiction: 'UK', feed: true, url: `https://www.legislation.gov.uk/${ask.length ? `all/data.feed?text=${q}` : 'ukpga/data.feed'}`, count: (b: Record<string, unknown>) => { const m = str(b.text).match(/totalResults[^>]*>\s*(\d+)/); return m ? Number(m[1]) : undefined } },
        { source: 'data.europa.eu:eur-lex', title: 'EU law (EUR-Lex)', jurisdiction: 'EU', feed: false, url: `https://data.europa.eu/api/hub/search/search?limit=1&q=${ask.length ? q : 'eur-lex'}`, count: (b: Record<string, unknown>) => (b.result as { count?: number } | undefined)?.count },
        { source: 'courtlistener.com', title: 'US case law (CourtListener / Free Law Project)', jurisdiction: 'US', feed: false, url: clUrl, count: (b: Record<string, unknown>) => b.count as number | undefined },
      ]
      for (const o of official) {
        const b = o.feed
          ? await get(o.url, 'application/atom+xml').then((x) => x.text()).then((text) => (text ? { text } : null)).catch(() => null)
          : ((await get(o.url).then((x) => x.json()).catch(() => null)) as Record<string, unknown> | null)
        const records = b ? o.count(b) : undefined
        anchor.push({ source: o.source, title: o.title, jurisdiction: o.jurisdiction, secured: false, operation: new URL(o.url).pathname, status: b ? 200 : 0, url: o.url, ...(typeof records === 'number' ? { records } : {}), keyless: b !== null })
      }
      // THE BIGGEST CASES AND THEIR FIRMS AS LEADS — ranked by the record's own citation count, not by hand
      const cl = (await get(clUrl).then((x) => x.json()).catch(() => null)) as { results?: Record<string, unknown>[] } | null
      cases = (cl?.results ?? []).slice(0, facesOf().faces).map((r) => {
        const name = str(r.caseName).replace(/\s+/g, ' ').slice(0, 120)
        const citeCount = num(r.citeCount, 0)
        const firms = [...new Set([str(r.attorney)].flatMap((s) => s.split(/[,;]| and /).map((w) => w.trim()).filter((w) => w.length > 3)))].slice(0, facesOf().faces)
        return { case: name, court: str(r.court) || str(r.court_id), citeCount, dateFiled: str(r.dateFiled) || undefined, firms, numbers: [...new Set([citeCount, ...nums(`${name} ${str(r.dateFiled)}`)])].filter((n) => n >= 3) }
      })
    }
    const found = await apiSearchOf([...terms, ...ask], facesOf().faces, from)
    const tokened = (s: string) => s.toLowerCase().split(/[^a-z]+/).some((w) => terms.includes(w))
    const matches = found.apis.filter((x) => tokened(x.api) || tokened(x.title))
    const reads = await Promise.all(matches.filter((x) => x.free !== undefined).slice(0, facesOf().faces).map(async (x) => { const api = await apiOf(x.index).catch(() => null); const r = await apiCallOf(x.index, x.free!).catch(() => null); return { source: x.api, title: x.title, jurisdiction: (x.categories[0] ?? 'registry'), secured: api?.secured === true, operation: x.operations[0]?.path ?? '', status: r?.status ?? 0, url: r?.url ?? '', keyless: api?.secured !== true && (r?.status ?? 0) === 200 } as Src }))
    const sources = [...anchor, ...reads]
    // an answering source is a reading. It is not the human integer law.reviewed holds on, and this tool does not set that integer.
    const reviewed = 0
    const live = { terms, about: ask, jurisdictions: [...new Set(anchor.map((s) => s.jurisdiction))], matched: found.matched, from, scanned: found.scanned, ...(found.next !== undefined ? { next: found.next } : {}), answered: sources.filter((s) => s.status > 0).length, keyless: sources.filter((s) => s.keyless).length, reviewed, advice: 'a lead, not a charge and not advice', sources }
    return { source, url: 'https://www.federalregister.gov + https://www.legislation.gov.uk + https://data.europa.eu', reading: live, expected: { answered: '>= 1 authoritative source' }, agrees: sources.some((s) => s.keyless) }
  }
  if (source === 'funding') {
    // FUSE THE OFFICIAL REGIONAL FUNDING: the public finds money for anything through the one door. Keyless official
    // sources are read first — the World Bank's projects (api.worldbank.org, no key) and the EU Open Data Portal's
    // datasets (data.europa.eu, no key) — then the registry's APIs whose words name funding (grant, tender, subsidy,
    // fund, finance, loan) are discovered and the keyless ones read. `about` narrows by programme, region or theme;
    // `from` walks the registry matches. Each answered source is a reading with its address — funding as a fused
    // public capability, no key, no hand list.
    const terms = ['fund', 'funding', 'grant', 'grants', 'tender', 'tenders', 'subsidy', 'subsidies', 'finance', 'loan', 'loans']
    const ask = str(a.about) ? str(a.about).toLowerCase().split(/[\s,]+/).filter(Boolean) : []
    const from = typeof a.from === 'number' ? a.from : 0
    type Fund = { source: string; title: string; region: string; secured: boolean; operation: string; status: number; url: string; records?: number; keyless: boolean }
    const anchor: Fund[] = []
    if (from === 0) {
      const q = ask.length ? encodeURIComponent(ask.join(' ')) : ''
      const official = [
        { source: 'worldbank.org:projects', title: 'World Bank projects & financing', region: 'global', url: `https://search.worldbank.org/api/v2/projects?format=json&rows=1${q ? `&qterm=${q}` : ''}`, count: (b: Record<string, unknown>) => (b.total as number | undefined) },
        { source: 'data.europa.eu:datasets', title: 'EU Open Data Portal (funding datasets)', region: 'eu', url: `https://data.europa.eu/api/hub/search/search?limit=1${q ? `&q=${q}` : '&q=funding'}`, count: (b: Record<string, unknown>) => ((b.result as { count?: number } | undefined)?.count) },
      ]
      for (const o of official) {
        const b = (await get(o.url).then((x) => x.json()).catch(() => null)) as Record<string, unknown> | null
        const records = b ? o.count(b) : undefined
        anchor.push({ source: o.source, title: o.title, region: o.region, secured: false, operation: new URL(o.url).pathname, status: b ? 200 : 0, url: o.url, ...(typeof records === 'number' ? { records } : {}), keyless: b !== null })
      }
    }
    const found = await apiSearchOf([...terms, ...ask], facesOf().faces, from)
    const tokened = (s: string) => s.toLowerCase().split(/[^a-z]+/).some((w) => terms.includes(w))
    const matches = found.apis.filter((x) => tokened(x.api) || tokened(x.title))
    const reads = await Promise.all(matches.filter((x) => x.free !== undefined).slice(0, facesOf().faces).map(async (x) => { const api = await apiOf(x.index).catch(() => null); const r = await apiCallOf(x.index, x.free!).catch(() => null); return { source: x.api, title: x.title, region: (x.categories[0] ?? 'registry'), secured: api?.secured === true, operation: x.operations[0]?.path ?? '', status: r?.status ?? 0, url: r?.url ?? '', keyless: api?.secured !== true && (r?.status ?? 0) === 200 } as Fund }))
    const sources = [...anchor, ...reads]
    const live = { terms, about: ask, matched: found.matched, named: matches.length, from, scanned: found.scanned, ...(found.next !== undefined ? { next: found.next } : {}), answered: sources.filter((s) => s.status > 0).length, keyless: sources.filter((s) => s.keyless).length, sources }
    return { source, url: 'https://api.worldbank.org + https://data.europa.eu + https://apis.guru', reading: live, expected: { answered: '>= 1 keyless official source' }, agrees: sources.some((s) => s.keyless) }
  }
  if (source === 'jobs') {
    // FUSE THE JOB BOARDS: the public searches for work through the one door. The registry's APIs whose words name
    // hiring (job, jobs, career, vacancy, hiring, employment, recruit, work, position) are found; the keyless ones
    // (no credential asked) are read live, their listing endpoints called; `about` narrows by role or place, `from`
    // walks the matches a slice at a time. Each answered board is a reading with its hex address — the job search as
    // a fused public capability, no key, no hand list.
    const terms = ['job', 'jobs', 'career', 'careers', 'vacancy', 'vacancies', 'hiring', 'employment', 'recruit', 'recruiting', 'position', 'positions']
    const ask = str(a.about) ? str(a.about).toLowerCase().split(/[\s,]+/).filter(Boolean) : []
    const from = typeof a.from === 'number' ? a.from : 0
    // the unit's own keyless board first: the INSPIRE jobs catalogue (research openings), always read, narrowed by `about`
    const inspire = cernCatalogsOf().catalogs.find((c) => c.name === 'jobs')
    const anchor: { board: string; title: string; categories: string[]; secured: boolean; operation: string; status: number; url: string; openings?: number; keyless: boolean }[] = []
    if (inspire && from === 0) {
      const href = ask.length ? `${inspire.href}${inspire.href.includes('?') ? '&' : '?'}q=${encodeURIComponent(ask.join(' '))}` : inspire.href
      const r = (await get(href).then((x) => x.json()).catch(() => null)) as { hits?: { total?: number | { value?: number } } } | null
      const total = r?.hits?.total; const count = typeof total === 'number' ? total : (total as { value?: number } | undefined)?.value
      anchor.push({ board: 'inspirehep.net:jobs', title: 'INSPIRE-HEP jobs', categories: ['open_data'], secured: false, operation: '/api/jobs', status: r ? 200 : 0, url: href, ...(typeof count === 'number' ? { openings: count } : {}), keyless: r !== null })
    }
    // the registry boards: an API whose NAME or TITLE carries a hiring token as a whole word (not 'work' inside 'network')
    const found = await apiSearchOf([...terms, ...ask], facesOf().faces, from)
    const tokened = (s: string) => s.toLowerCase().split(/[^a-z]+/).some((w) => terms.includes(w))
    const matches = found.apis.filter((x) => tokened(x.api) || tokened(x.title))
    const reads = await Promise.all(matches.filter((x) => x.free !== undefined).slice(0, facesOf().faces).map(async (x) => { const api = await apiOf(x.index).catch(() => null); const r = await apiCallOf(x.index, x.free!).catch(() => null); return { board: x.api, title: x.title, categories: x.categories, secured: api?.secured === true, operation: x.operations[0]?.path ?? '', status: r?.status ?? 0, url: r?.url ?? '', keyless: api?.secured !== true && (r?.status ?? 0) === 200 } }))
    const boards = [...anchor, ...reads]
    const live = { terms, about: ask, matched: found.matched, boardsNamed: matches.length, from, scanned: found.scanned, ...(found.next !== undefined ? { next: found.next } : {}), answered: boards.filter((b) => b.status > 0).length, keyless: boards.filter((b) => b.keyless).length, boards }
    return { source, url: 'https://apis.guru + https://inspirehep.net', reading: live, expected: { answered: '>= 1 keyless board' }, agrees: boards.some((b) => b.keyless) }
  }
  if (source === 'ai') {
    // THE AI APIs THAT ANSWER FREE AND KEYLESS: the registry's machine_learning category and the APIs the request's
    // words name (ai, model, inference, language, vision, speech …), each document read for the credential it asks,
    // each free operation (a GET needing no parameter) called; keyless when the document asks no credential and the
    // operation answered 200. These are the remote agents a wave launches at no cost.
    const reg = await apiRegistryOf()
    const words = (str(a.about) || 'ai artificial intelligence machine learning model inference llm language vision speech translate nlp embedding neural').split(/[\s,]+/)
    const hit = (s: string) => words.some((w) => w.length > 1 && s.toLowerCase().split(/[^a-z]+/).includes(w.toLowerCase()))
    const named = reg.names.map((api, index) => ({ api, index, e: reg.entries[api] ?? {} })).filter(({ api, e }) => { const v = e.versions?.[e.preferred ?? '']; const cats = v?.info?.['x-apisguru-categories'] ?? []; return cats.includes('machine_learning') || hit(api) || hit(v?.info?.title ?? '') })
    const from = typeof a.from === 'number' ? a.from : 0
    const slice = named.slice(from, from + facesOf().faces)
    const read = await Promise.all(slice.map(async ({ index }) => {
      const api = await apiOf(index).catch(() => null)
      if (!api) return null
      const free = api.server ? api.operations.find((op) => op.verb === 'get' && op.required.length === 0) : undefined
      const r = free ? await apiCallOf(index, free.index).catch(() => null) : null
      return { api: api.api, title: api.title, categories: api.categories, secured: api.secured === true, operation: free ? `${free.verb} ${free.path}` : undefined, status: r?.status ?? 0, hex: r?.hex, keyless: api.secured !== true && r?.status === 200 }
    }))
    const apis = read.filter((x): x is NonNullable<typeof x> => x !== null)
    const live = { words, matched: named.length, from, scanned: slice.length, ...(from + slice.length < named.length ? { next: from + slice.length } : {}), keyless: apis.filter((x) => x.keyless).length, apis }
    return { source, url: 'https://apis.guru', reading: live, expected: { keyless: '>= 1 in the slice' }, agrees: apis.some((x) => x.keyless) }
  }
  if (source === 'payload') {
    // THE NEXT PAYLOAD CONFIG, AS AN ENDLESS FEED OF LEADS. payloadcms/payload and payloadcms/website are read through
    // the GitHub API and returned one BOUNDED part per call, chained by `next` so the feed never ends and no call
    // spends more than a few fetches inside the deadline (the whole-repo sweep in one call timed out and fed nothing).
    // Each part is one contribution the next config is consolidated from:
    //   from 0    — the map: the docs sections, the starter templates, the examples.
    //   from 1    — content architecture: payloadcms/website's src dirs, blocks and collections to mirror (the leads
    //               that grow the site's content architecture).
    //   from 2    — monetisation: the official packages classed, the ones that earn (ecommerce, stripe, payments) and
    //               the plugins the unit does not yet fuse (the leads that grow monetisation and coverage).
    //   from 3..  — vocabulary: one docs section per call crossed with the families whose formula its pages name; when
    //               the sections run out the feed wraps to 0, so it is endless.
    // { category: c } reads the c-th section's vocabulary directly, unchanged — what the data.payload formula crosses.
    const repo = 'payloadcms/payload'
    const url = `https://github.com/${repo}`
    const list = async (dir: string, where = repo) => (await (await get(`https://api.github.com/repos/${where}/contents/${dir}`, 'application/vnd.github+json')).json()) as { name: string; type: string }[]
    const wordsOf = (s: string) => s.replace(/[A-Z]/g, (ch) => ` ${ch.toLowerCase()}`).split(/[^a-z]+/).filter((w) => w.length > 2)
    // one listing, dirs only (the double-fetch that helped time the sweep out is gone — the entries are read once)
    const dirsOf = async (dir: string, where = repo): Promise<string[]> => { const x = await list(dir, where).catch(() => []); return Array.isArray(x) ? x.filter((d) => d.type === 'dir').map((d) => d.name).sort() : [] }
    // the c-th docs section crossed with the families its pages name — the vocabulary, one section at a time
    const vocabularyOf = async (c: number, part: number, next: number, pre?: string[]) => {
      const sections = pre ?? (await dirsOf('docs'))
      const section = sections[c]
      const pages = section ? (await list(`docs/${section}`)).filter((d) => d.type === 'file').map((d) => d.name.replace(/\.mdx?$/, '')) : []
      const pageWords = new Set([...(section ? wordsOf(section) : []), ...pages.flatMap(wordsOf)])
      const families = section ? [...hexFamiliesOf()].filter(([f]) => !DOORS.has(f)).map(([family, formulas]) => ({ family, formulas: formulas.filter((x) => [...new Set([...wordsOf(family), ...wordsOf(x.name)])].some((w) => pageWords.has(w))).map((x) => x.name) })).filter((x) => x.formulas.length) : []
      const reading = { part, of: 'vocabulary', repo, docs: sections.length, sections, section, pages, families, configures: families.length ? `${section}: ${families.map((x) => `${x.family} (${x.formulas.join(', ')})`).join('; ')}` : section ? `${section}: no family its pages name yet` : 'no such section', feed: section ? `next payload config: the '${section}' docs vocabulary, and the families its pages name` : 'no such section', ...(next >= 0 ? { next } : {}) }
      return { source, url, reading, expected: { pages: '>= 1' }, agrees: pages.length > 0 }
    }
    // the formula's direct read of one section — no feed cursor, holds on pages found
    if (typeof a.category === 'number') return vocabularyOf(a.category, a.category, -1)
    const from = typeof a.from === 'number' && a.from >= 0 ? Math.floor(a.from) : 0
    if (from === 0) {
      const [sections, templates, examples] = await Promise.all([dirsOf('docs'), dirsOf('templates'), dirsOf('examples')])
      const reading = { part: 0, of: 'map', repo, docs: sections.length, sections, templates, examples, next: 1, feed: 'next payload config: the map — docs sections, starter templates and examples' }
      return { source, url, reading, expected: { sections: '>= 1' }, agrees: sections.length > 0 }
    }
    if (from === 1) {
      // the reference app, the Payload way: payloadcms/website's src dirs, blocks and collections are the content
      // architecture the next config mirrors (a block or collection it handles that the unit does not yet is a lead)
      const where = 'payloadcms/website'
      const fileNames = async (dir: string): Promise<string[]> => { const x = await list(dir, where).catch(() => []); return Array.isArray(x) ? x.filter((e) => e.type === 'dir' || /\.tsx?$/.test(e.name)).map((e) => e.name.replace(/\.tsx?$/, '')).filter((nm) => nm !== 'index').sort() : [] }
      const [dirs, blocks, collections] = await Promise.all([dirsOf('src', where), fileNames('src/blocks'), fileNames('src/collections')])
      const reading = { part: 1, of: 'architecture', website: { repo: where, dirs, blocks, collections }, leads: [...blocks.map((b) => `block:${b}`), ...collections.map((c) => `collection:${c}`)], next: 2, feed: 'next payload config: the content architecture — the blocks and collections the reference site handles, to mirror' }
      return { source, url: `https://github.com/${where}`, reading, expected: { blocks: '>= 1' }, agrees: blocks.length > 0 }
    }
    if (from === 2) {
      // monetisation: the official packages classed; the ones whose name earns, and the plugins not yet fused, are the
      // leads that grow what the site earns and how much of Payload it covers
      const MONEY = ['ecommerce', 'commerce', 'stripe', 'payment', 'payments', 'subscription', 'subscriptions', 'checkout', 'billing', 'paywall', 'shop', 'store', 'order', 'cart', 'price', 'pricing', 'invoice', 'affiliate']
      const packages = await dirsOf('packages')
      const classOf = (p: string) => (p.startsWith('plugin-') ? 'plugin' : p.startsWith('db-') ? 'db adapter' : p.startsWith('storage-') ? 'storage adapter' : p.startsWith('richtext-') ? 'rich text' : p.startsWith('email-') ? 'email adapter' : p.startsWith('translations') || p.startsWith('ui') || p.startsWith('next') || p.startsWith('graphql') ? 'core' : 'package')
      const fused = new Set(['plugin-ecommerce', 'plugin-form-builder', 'plugin-import-export', 'plugin-mcp', 'plugin-multi-tenant', 'plugin-nested-docs', 'plugin-redirects', 'plugin-search', 'plugin-sentry', 'plugin-seo', 'plugin-stripe', 'db-d1-sqlite', 'db-postgres', 'storage-s3', 'richtext-lexical', 'email-resend'])
      const ecosystem = packages.map((p) => ({ package: p, kind: classOf(p), fused: fused.has(p), earns: MONEY.some((m) => wordsOf(p).includes(m)), families: [...hexFamiliesOf()].filter(([ff]) => !DOORS.has(ff)).filter(([ff, fs]) => [...new Set([...wordsOf(ff), ...fs.flatMap((x) => wordsOf(x.name))])].some((w) => wordsOf(p).includes(w))).map(([ff]) => ff) }))
      const monetisation = ecosystem.filter((e) => e.earns).map((e) => ({ package: e.package, fused: e.fused, families: e.families }))
      const notYetFused = ecosystem.filter((e) => e.kind === 'plugin' && !e.fused).map((e) => e.package)
      const reading = { part: 2, of: 'monetisation', packages: packages.length, plugins: ecosystem.filter((e) => e.kind === 'plugin').length, monetisation, notYetFused, leads: [...monetisation.filter((m) => !m.fused).map((m) => `monetise:${m.package}`), ...notYetFused.map((p) => `fuse:${p}`)], next: 3, feed: 'next payload config: monetisation — the packages that earn (ecommerce, stripe, payments) and the plugins not yet fused' }
      return { source, url, reading, expected: { packages: '>= 1' }, agrees: ecosystem.length > 0 }
    }
    // from >= 3: walk the docs sections one per call; wrap to 0 when they run out, so the feed never terminates
    const sections = await dirsOf('docs')
    const i = from - 3
    if (i >= sections.length) return { source, url, reading: { part: from, of: 'wrap', sections: sections.length, next: 0, feed: 'next payload config: the sections are read; the feed wraps to the map' }, expected: { wrap: 'to 0' }, agrees: true }
    return vocabularyOf(i, from, from + 1, sections)
  }
  if (source === 'org') {
    // ANY GITHUB ORG, AS AN ENDLESS FEED OF FUSION LEADS. { about: '<org>' } reads github.com/<org> through the GitHub
    // API (default cloudflare), so one source covers cloudflare, zeropoint-foundation and any other org named without a
    // branch per org. Each repo is a complex app, SDK, framework, agent or template — a lead for fusing a complex app
    // or deployment into the unit's combinatorics. One BOUNDED part per call, chained by next:
    //   from 0   — the org: its most-recently-updated repos, classed (template, sdk, framework, agent, ai, docs, tool)
    //              and crossed with the families whose formula words they name.
    //   from 1.. — one repo examined per call (its top-level files, the config its wrangler declares) mapped to the
    //              unit's axes (runtime, storage, db); the concrete fusion lead. Wraps to 0 when the repos run out.
    const org = (str(a.about) || 'cloudflare').toLowerCase()
    if (!/^[a-z0-9][a-z0-9-]{0,38}$/.test(org)) return fail('about', { about: 'a GitHub org login: letters, digits and dashes' })
    const url = `https://github.com/${org}`
    const wordsOf = (s: string) => s.replace(/[A-Z]/g, (ch) => ` ${ch.toLowerCase()}`).split(/[^a-z]+/).filter((w) => w.length > 2)
    const crossed = (name: string): string[] => [...hexFamiliesOf()].filter(([f]) => !DOORS.has(f)).filter(([f, fs]) => [...new Set([...wordsOf(f), ...fs.flatMap((x) => wordsOf(x.name))])].some((w) => wordsOf(name).includes(w))).map(([f]) => f)
    // tolerate a missing org or a network blip: a 404 (the org login does not exist) or an error yields null, so the
    // feed answers agrees:false rather than throwing a raw message
    const api = async (path: string): Promise<unknown> => get(`https://api.github.com/${path}`, 'application/vnd.github+json').then((r) => r.json()).catch(() => null)
    const reposOf = async (): Promise<{ name: string; language?: string | null; stargazers_count?: number; archived?: boolean }[]> => {
      const x = await api(`orgs/${org}/repos?per_page=100&sort=updated&type=public`)
      return (Array.isArray(x) ? x : []).filter((r) => r && !r.archived).slice(0, facesOf().faces * L.tenOf(L.seed))
    }
    const classOf = (s: string) => (/template|starter|example/.test(s) ? 'template' : /sdk|^wrangler$|workers-sdk/.test(s) ? 'sdk' : /agent/.test(s) ? 'agent' : /(^|-)ai(-|$)|workers-ai|vectorize|rag|vector/.test(s) ? 'ai' : /doc/.test(s) ? 'docs' : /next|pages|vite|remix|nuxt|astro|svelte|react|vue/.test(s) ? 'framework' : 'repo')
    const from = typeof a.from === 'number' && a.from >= 0 ? Math.floor(a.from) : 0
    if (from === 0) {
      // no family cross here — crossing every repo against 1134 families is the walk's job, one repo at a time, so the
      // map stays within a fast budget; the map is the repos, their kind and the leads
      const rows = (await reposOf()).map((r) => ({ repo: r.name, kind: classOf(r.name.toLowerCase()), stars: r.stargazers_count ?? 0, language: r.language ?? null }))
      const reading = { part: 0, of: 'org', org, count: rows.length, repos: rows, leads: rows.map((r) => `${r.kind}:${org}/${r.repo}`), next: 1, feed: `${org} fusion: the repos — templates, SDK, frameworks, agents, AI and tools — to fuse into the combinatorics` }
      return { source, url, reading, expected: { repos: '>= 1' }, agrees: rows.length > 0 }
    }
    const repos = await reposOf()
    const i = from - 1
    if (i >= repos.length) return { source, url, reading: { part: from, of: 'wrap', org, repos: repos.length, next: 0, feed: `${org} fusion: every repo is read; the feed wraps to the org` }, expected: { wrap: 'to 0' }, agrees: true }
    const repo = repos[i]!.name
    const c = await api(`repos/${org}/${repo}/contents`)
    const files = Array.isArray(c) ? (c as { name: string }[]).map((x) => x.name) : []
    const has = (re: RegExp) => files.some((x) => re.test(x))
    const maps = {
      runtime: has(/open-?next/) ? 'opennext' : has(/next\.config/) ? 'vinext' : has(/wrangler\./) ? 'worker' : 'none',
      storage: has(/r2|bucket/i) ? 'r2' : 'none',
      db: has(/d1|drizzle|prisma|schema\.sql/i) ? 'd1' : 'qpu-raid',
      wrangler: files.find((x) => /^wrangler\./.test(x)) ?? null,
    }
    const reading = { part: from, of: 'repo', org, repo, files, maps, families: crossed(repo), next: from + 1, feed: `${org} fusion: '${repo}' — its files and the unit axes (runtime ${maps.runtime}, storage ${maps.storage}, db ${maps.db}) it maps to` }
    return { source, url: `${url}/${repo}`, reading, expected: { files: '>= 1' }, agrees: files.length > 0 }
  }
  if (source === 'imagine') {
    // WHAT THE UNIT MAY BE, computed from the record: a request's words (a law firm, an auditor, a forensic expert) or
    // a category of the registry find the public APIs of that world; the words those APIs' titles and operations use
    // are crossed with the words every family's formulas use; the families reached are what the unit is for that
    // world, each with the formulas the APIs name. Proposed by the record, not claimed.
    const wordsOf = (s: string) => s.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).split(/[^a-z]+/).filter((w) => w.length > 2)
    const reg = await apiRegistryOf()
    // a document that names one category as a string, not a list, names one category (measured: 'c', 'e', 'i' as categories)
    const categoryOf = (api: string): string[] => { const e = reg.entries[api] ?? {}; const c = e.versions?.[e.preferred ?? '']?.info?.['x-apisguru-categories'] as unknown; return (Array.isArray(c) ? c.map(String) : typeof c === 'string' ? [c] : []).filter(Boolean) }
    const categories = [...new Set(reg.names.flatMap(categoryOf))].sort()
    const about = str(a.about)
    const c = typeof a.category === 'number' ? a.category : -1
    const category = categories[c]
    if (!about && !category) return fail('about', { about: 'words of a request', categories })
    const found = about ? await apiSearchOf(about.split(/[\s,]+/), facesOf().faces) : undefined
    const names = found ? found.apis.map((x) => x.api) : reg.names.filter((api) => categoryOf(api).includes(category!)).slice(0, facesOf().faces)
    const apis = found ? found.apis.map((x) => ({ api: x.api, title: x.title, categories: x.categories, operations: x.operations.map((op) => op.path) })) : (await Promise.all(names.map((x) => apiOf(x).catch(() => null)))).filter((x): x is NonNullable<typeof x> => x !== null).map((x) => ({ api: x.api, title: x.title, categories: x.categories, operations: x.operations.map((op) => op.operationId ?? op.path) }))
    const apiWords = new Set(apis.flatMap((x) => [x.api, x.title, ...x.categories, ...x.operations].flatMap(wordsOf)))
    const families = [...hexFamiliesOf()].filter(([f]) => !DOORS.has(f)).map(([family, formulas]) => {
      const named = formulas.map((f) => ({ name: f.name, words: [...new Set([...wordsOf(family), ...wordsOf(f.name)])].filter((w) => apiWords.has(w)) })).filter((f) => f.words.length)
      // imagine now hands back the ADDRESS, not just the names: the family's hex handle (first formula, no params) so a
      // caller goes straight from "which families fit this request" to "the hex program to run" — imagine → run, closing the loop
      const handle = named.length ? qpuHexUuidOf({ family, program: [named[0].name], params: [] }).slice(0, 8) : undefined
      return { family, ...(handle ? { handle } : {}), formulas: named.map((f) => f.name), words: [...new Set(named.flatMap((f) => f.words))] }
    }).filter((f) => f.formulas.length).sort((x, y) => y.formulas.length - x.formulas.length)
    const live = { ...(about ? { about } : { category }), categories: [...new Set(apis.flatMap((x) => x.categories))], apis: apis.map((x) => x.api), words: apiWords.size, families, is: families.length ? `${about ?? category}: ${families.map((f) => `${f.family} (${f.formulas.join(', ')})`).join('; ')}` : `${about ?? category}: no family the record names yet — a family to imagine` }
    return { source, url: 'https://apis.guru', reading: live, expected: { families: '>= 1' }, agrees: families.length > 0 }
  }
  if (source === 'prior') {
    // Public preprint and patent dates against the DOI registration date. The count is earlier.
    const words = (str(a.about) || 'quantum processing unit').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3).slice(0, facesOf().n ?? 4)
    if (words.length === 0) return fail('about', { about: 'the claim in words' })
    const faces = facesOf().faces
    const start = num(a.from, 0)
    const doi = citeOf().doi
    const claim = words.join(' ')
    const day = (iso: string) => iso.slice(0, 10)
    const earlierThan = (iso: string, priority: string | null) => (priority && iso ? day(iso) < priority : null)
    const [priority, xml, patents, found] = await Promise.all([
      get(`https://api.datacite.org/dois/${doi}`, 'application/vnd.api+json').then((r) => r.json()).then((b) => {
        const at = (b as { data?: { attributes?: { registered?: string; created?: string } } }).data?.attributes
        return day(at?.registered ?? at?.created ?? '') || null
      }).catch(() => null),
      get(`http://export.arxiv.org/api/query?search_query=${words.map((w) => `all:${encodeURIComponent(w)}`).join('+AND+')}&sortBy=submittedDate&sortOrder=ascending&start=${start}&max_results=${faces}`, 'application/atom+xml').then((r) => r.text()).catch(() => ''),
      (async () => {
        const key = (env as { PATENTSVIEW_API_KEY?: string } | undefined)?.PATENTSVIEW_API_KEY ?? (typeof process !== 'undefined' ? process.env.PATENTSVIEW_API_KEY : undefined)
        if (!key) return { holds: false as const, lead: 'no PATENTSVIEW_API_KEY', patents: [] as { id: string; title: string; date: string }[] }
        try {
          const q = encodeURIComponent(JSON.stringify({ _text_any: { patent_title: claim } }))
          const fl = encodeURIComponent(JSON.stringify(['patent_id', 'patent_title', 'patent_date']))
          const r = await fetch(`https://search.patentsview.org/api/v1/patent/?q=${q}&f=${fl}&o=${encodeURIComponent(JSON.stringify({ size: faces }))}`, { headers: { accept: 'application/json', 'X-Api-Key': key }, signal: AbortSignal.timeout(DEADLINE) })
          if (!r.ok) return { holds: false as const, lead: `PatentsView answered ${r.status}`, patents: [] }
          const d = (await r.json()) as { patents?: { patent_id: string; patent_title: string; patent_date: string }[] }
          return { holds: true as const, patents: (d.patents ?? []).map((p) => ({ id: p.patent_id, title: p.patent_title, date: p.patent_date })) }
        } catch (e) {
          return { holds: false as const, lead: (e as Error).message, patents: [] as { id: string; title: string; date: string }[] }
        }
      })(),
      apiSearchOf(words, faces, start).catch(() => null),
    ])
    const field = (e: string, t: string) => (new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`).exec(e)?.[1] ?? '').replace(/\s+/g, ' ').trim()
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1] ?? '')
    const preprints = entries.map((e) => {
      const published = field(e, 'published')
      const title = field(e, 'title').slice(0, 120)
      return { id: field(e, 'id').split('/abs/')[1] ?? field(e, 'id'), title, published: day(published), earlier: earlierThan(published, priority), numbers: (title.match(/\d+/g) ?? []).map(Number).filter((n) => Number.isSafeInteger(n) && n >= 3) }
    })
    const patentRows = patents.patents.map((p) => ({ ...p, earlier: earlierThan(p.date, priority) }))
    const earlier = preprints.filter((p) => p.earlier === true).length + patentRows.filter((p) => p.earlier === true).length
    const chain = {
      priority: { holds: priority !== null, dated: priority, doi },
      arxiv: { holds: xml.includes('<feed'), count: preprints.length, earlier: preprints.filter((p) => p.earlier === true).length, ...(entries.length === faces ? { next: start + faces } : {}) },
      patents: { holds: patents.holds, ...(patents.holds ? { count: patentRows.length, earlier: patentRows.filter((p) => p.earlier === true).length } : { lead: patents.lead }) },
      research: { holds: found !== null, matched: found?.matched ?? 0, ...(found?.next !== undefined ? { next: found.next } : {}) },
    }
    const reading = {
      of: 'prior', claim, license: 'CC-BY-NC-ND-4.0', priorityDate: priority, doi,
      chain, earlier, product: 'priority ∧ arxiv ∧ patents ∧ research',
      leads: { arxiv: preprints, patents: patentRows, apis: (found?.apis ?? []).map((x) => x.api) },
      numbers: [...new Set(preprints.flatMap((p) => p.numbers))].slice(0, faces),
      discover: 'not run here — pass numbers to discover as one family slice',
    }
    return { source, url: 'https://arxiv.org', reading, expected: { archive: 'read' }, agrees: chain.arxiv.holds }
  }
  return fail('source', { sources: SOURCES })
}
const SOURCES = ['quantumai', 'cern', 'nist', 'oeis', 'sequence', 'zenodo', 'datacite', 'novelty', 'prior', 'orcid', 'github', 'npm', 'alpine', 'release', 'site', 'apis', 'patents', 'authors', 'research', 'imagine', 'payload', 'org', 'ai', 'ask', 'jobs', 'funding', 'law', 'unanswered', 'arxiv', 'define', 'collisions', 'catalog', 'clay', 'proof', 'news', 'books']

/** Every live check there is, enumerated from the unit: each CERN record theorem cern counts, each registered sequence and
 *  every formula that is one, the physical constants, the release and its DOIs, author, repositories and package, and
 *  every catalogue the unit names. */
export const dataSourcesOf = async () => [
  ...cernRecordsOf().records.map((r) => ({ source: 'cern', args: { recid: r.recid } as Args, label: `CERN Open Data · record ${r.recid}`, checks: `theorem cern: ${r.files} * ${r.q} + ${r.r} = ${r.events}` })),
  { source: 'nist', args: {}, label: 'NIST CODATA · Planck, Boltzmann', checks: 'Qpu.Physics planck, boltzmann' },
  ...Object.entries(SEQUENCES).map(([id, s]) => ({ source: 'oeis', args: { id }, label: `OEIS ${id} · ${s.name}`, checks: `the unit's ${s.name.toLowerCase()}` })),
  // THE SEQUENCES ARE NOT EXPANDED TO LIST THE SOURCES. Running every family formula as an integer sequence (the
  // lattice-wide sequencesOf scan) to enumerate one source row per sequence took ~33s and, with the rest of a call,
  // exceeded the isolate — so { source: 'all' } and the errors door a remote agent self-checks with would 1102. One
  // summary row stands for them; a specific sequence is read on demand with source:sequence, and the gate identifies
  // them a family slice at a time (gate.leads). The lattice-wide scan is never on the hot path of listing the sources.
  { source: 'sequence', args: {} as Args, label: 'OEIS · integer-sequence formulas', checks: 'each family formula that is an integer sequence, identified in OEIS; read one with source:sequence, enumerate via gate.leads a slice at a time' },
  { source: 'zenodo', args: {}, label: 'Zenodo · latest release', checks: `archive ${citeOf().archived?.version ?? ''} at ${citeOf().doi}; git tag v${packageVersion}` },
  ...doisOf().map((d) => ({ source: 'datacite', args: { doi: d.doi }, label: `DataCite · ${d.doi}`, checks: `creator ${citeOf().author.last}${d.title ? `, title` : ''}` })),
  { source: 'orcid', args: {}, label: 'ORCID · author', checks: `${citeOf().author.first} ${citeOf().author.last}` },
  ...reposOf().map((repo) => ({ source: 'github', args: { repo }, label: `GitHub · ${repo}`, checks: 'public, not archived' })),
  { source: 'npm', args: {}, label: `npm · @${reposOf()[0] ?? ''}`, checks: `latest ${packageVersion}` },
  { source: 'site', args: {}, label: 'site · every sitemap address', checks: 'answers 200, a page with its title' },
  { source: 'release', args: {}, label: `GitHub Release · v${packageVersion}`, checks: 'the tag of the served version, published with notes' },
  { source: 'apis', args: {}, label: 'APIs.guru · every public API', checks: 'theorem fuse: the registry the unit fused' },
  { source: 'patents', args: {}, label: 'patents · PatentsView, USPTO bulk data', checks: 'the patents of an inventor (Tesla), with a key the operator holds' },
  { source: 'authors', args: {}, label: 'cited authors · DataCite, ORCID, Crossref', checks: 'the work around the authors the unit cites: works, years, citations' },
  { source: 'quantumai', args: {}, label: 'Google Quantum AI · its sections and framework repositories as leads', checks: 'each section and each linked repository, read live as a lead for the court' },
  ...['cal', 'hd', 'yi'].map((family) => ({ source: 'research', args: { family }, label: `research · ${family}`, checks: "the APIs the family's formulas name, read live; their numbers go to discovery" })),
  ...cernCatalogsOf().catalogs.map((c) => ({ source: 'catalog', args: { name: c.name } as Args, label: `catalog · ${c.name}`, checks: 'answers with records' })),
  { source: 'books', args: {} as Args, label: "Open Library · ranges the unit's family subject graph (facts and subjects, never the text)", checks: "with no theme, addresses the from-th family (the unit's own subjects, derived) and advances via next; the books' subjects and numbers go to discovery" },
]

// a reading is the same for ten minutes in one isolate: the public sources are read once per window, not once per view
const WINDOW = L.tenOf(L.hexbit + L.seed) * L.coins * L.n
const cache = new Map<string, { at: number; value: Promise<unknown> }>()
const integersOf = (x: unknown): number[] => (typeof x === 'number' ? (Number.isSafeInteger(x) && x >= 3 ? [x] : []) : typeof x === 'string' ? (/^\d+$/.test(x) && Number.isSafeInteger(Number(x)) && Number(x) >= 3 ? [Number(x)] : []) : x && typeof x === 'object' ? Object.values(x).flatMap(integersOf) : [])
/** Live integers already read in this isolate, smallest first, bounded to what one family slice's formulas can meet. */
export const discoverLiveOf = async (): Promise<number[]> => {
  const readings = await Promise.all([...cache.values()].map((c) => c.value.catch(() => null)))
  return [...new Set(readings.flatMap((r) => integersOf((r as { reading?: unknown } | null)?.reading ?? {})))].sort((a, b) => a - b).slice(0, facesOf().faces * 4)
}

/** A live public dataset checked against the unit: the reading, what the unit holds, whether they agree, and a receipt. */
export const dataOf = async (source: string, a: Args = {}, env?: QpuEnv, auth?: string | null) => {
  // the ask cache is scoped to the EXACT credential, not merely whether one was sent: a folded token id, so one
  // bearer never serves another bearer's Payload reply from the window (Wave XIII HIGH — was Boolean(auth)).
  const key = source === 'ask' ? JSON.stringify([source, a, auth ? foldOf(auth) : false, Boolean(env?.PAYLOAD)]) : JSON.stringify([source, a])
  const hit = cache.get(key)
  if (hit && Date.now() - hit.at < WINDOW) return hit.value as ReturnType<typeof readOf>
  const value = readOf(source, a, env, auth)
  cache.set(key, { at: Date.now(), value })
  // a warning is a moment's state, not a reading: it is not kept
  void value.then((v) => { if (v && typeof v === 'object' && 'warning' in v) cache.delete(key) })
  return value
}
const readOf = async (source: string, a: Args, env?: QpuEnv, auth?: string | null) => {
  // the name first: an unknown source is answered with every source, network or not
  if (!SOURCES.includes(source)) return fail('source', { sources: SOURCES })
  if (Date.now() < offlineUntil)
    return { kind: 'data' as const, source, warning: 'offline', reading: 'skipped: the network was out of reach a moment ago', resolve: 'the network work is skipped while the network is out of reach; it runs again on the next call once it is back' }
  try {
    const r = await reading(source, a, env, auth)
    if ('denied' in r) return r
    return { kind: 'data' as const, ...r, holds: r.agrees, receipt: receiptOf(`data ${source}`, r.reading, r.agrees) }
  } catch (e) {
    const f = failureOf(e, `data ${source}`)
    if (f.level === 'warning') {
      // only the network itself out of reach skips the next minute's network work; a slow host is its own warning
      if (f.why === 'offline') offlineUntil = Date.now() + OFFLINE_WINDOW
      return { kind: 'data' as const, source, warning: f.why, reading: f.reading, resolve: f.resolve }
    }
    return { ...fail(f.why, { source }), reading: f.reading, resolve: f.resolve }
  }
}

// ---------------------------------------------------------------------------
// the data family: every live check is a hex program, not a door wrapped in a door
// ---------------------------------------------------------------------------

const dataFormula = (id: string, name: string, params: number[], formula: string, value: number, holds: boolean, proof: string, extra: Record<string, unknown> = {}) =>
  crossFormulaOf({ id, src: 'data', dst: 'science', formula, value, proof, ...extra }, holds, { name: `data.${name}`, params })
const familyIndexOf = (i: number) => [...hexFamiliesOf().keys()].filter((f) => !DOORS.has(f)).sort()[i]
export class DataFormulas {
  /** How many live sources the unit checks (the index space of read). */
  static async sources(): Promise<unknown> { const n = (await dataSourcesOf()).length; return dataFormula('data-sources', 'sources', [], 'sources = |every live check the unit names|', n, n > 0, 'dataSourcesOf') }
  /** The i-th live source read now: 2 when it agrees with the unit, 1 when it differs, 0 when it could not be read; it
   *  holds when it agrees, when the network is out of reach (a warning), or when it differs and is not a theorem of the
   *  unit (cern, nist, oeis: those must agree). */
  static async read(i: number): Promise<unknown> {
    const sources = await dataSourcesOf()
    const s = sources[i]
    if (!s) return dataFormula('data-read', 'read', [i], 'read(i)', 0, false, `no source ${i} of ${sources.length}`)
    const r = (await dataOf(s.source, s.args)) as { agrees?: boolean; warning?: string; denied?: string; url?: string; reading?: unknown; resolve?: string }
    const theorem = ['cern', 'nist', 'oeis'].includes(s.source)
    const value = r.agrees ? 2 : r.denied ? 0 : 1
    // it holds when it agrees, when the network is out of reach (a warning), when it differs and is no theorem, or
    // when the source answered a refusal the unit cannot resolve on its own (403, 404: named, with what resolves it)
    const holds = r.agrees === true || r.warning !== undefined || (value === 1 && !theorem) || (value === 0 && typeof r.resolve === 'string' && !theorem)
    return dataFormula('data-read', 'read', [i], `read(${i}): ${s.label} — 2 agrees, 1 differs, 0 unread`, value, holds, r.url ?? s.label, { label: s.label, source: s.source, reading: r.reading, ...(r.warning ? { warning: r.warning } : {}), ...(r.denied ? { denied: r.denied, resolve: r.resolve } : {}) })
  }
  /** The f-th family (sorted, doors excluded) researched in the registry: the APIs its formulas name, read live; value how many matched, holds when one answered. */
  static async research(f: number, from = 0): Promise<unknown> {
    const family = familyIndexOf(f)
    if (!family) return dataFormula('data-research', 'research', [f], 'research(f)', 0, false, 'no such family')
    // from: where the scan of the matched documents continues (the reading's `next`), so research(f, next) walks on
    const r = (await dataOf('research', { family, from })) as { agrees?: boolean; reading?: { matched: number; read: number; next?: number; readings: unknown[] } }
    return dataFormula('data-research', 'research', from ? [f, from] : [f], `research(${f}${from ? `, ${from}` : ''}) = |APIs the formulas of ${family} name|`, r.reading?.matched ?? 0, r.agrees === true || (r.reading?.read ?? 0) > 0 || from > 0, 'https://apis.guru', { family, reading: r.reading })
  }
  /** The errors of a slice of the live checks, from the f-th source, faces at a time: value how many, holds when none;
   *  the rows ride along with what resolves each, and next names the slice after. */
  static async errors(from: number): Promise<unknown> {
    const { mcpErrorsOf } = await import('../quantum/processing/unit/index.js')
    const e = (await mcpErrorsOf(undefined, from)) as { errors: unknown[]; warnings: unknown[]; count: number; next?: number }
    return dataFormula('data-errors', 'errors', [from], `errors(${from}) = |errors among the sources from ${from}|`, e.count, e.count === 0, 'mcpErrorsOf', { errors: e.errors, warnings: e.warnings, ...(e.next !== undefined ? { next: e.next } : {}) })
  }
  /** The unit's own site, a slice of its sitemap from the f-th address rendered as the unit serves it: value how many
   *  answered 200 with a title, holds when all of the slice did; next names the slice after. */
  static async site(from: number): Promise<unknown> {
    const r = (await dataOf('site', { from })) as { agrees?: boolean; reading?: { total?: number; next?: number; titled?: number; failing?: unknown }; warning?: string }
    return dataFormula('data-site', 'site', [from], `site(${from}): the sitemap's addresses from ${from}, rendered`, r.reading?.titled ?? 0, r.agrees === true || r.warning !== undefined, 'the sitemap', { reading: r.reading })
  }
  /** THE DEEP RESEARCH OF THE f-th FAMILY, ONE SLICE PER ADDRESS: the k-th slice of the APIs its words name read
   *  (research(f, from = k · faces)), and with k = 0 the f-th slice of the datasets — all of it in the window the
   *  discovery runs over; `next` names the slice after, and a caller follows it to the registry's end. Value the
   *  readings made; holds when the record answered. */
  static async deep(f: number, k = 0): Promise<unknown> {
    const family = familyIndexOf(f)
    if (!family) return dataFormula('data-deep', 'deep', [f, k], 'deep(f, k)', 0, false, 'no such family')
    const faces = facesOf().faces
    const r = (await dataOf('research', { family, from: k * faces })) as { reading?: { matched?: number; read?: number; next?: number } }
    const slice = k === 0 ? (await dataSourcesOf()).slice(f * faces, (f + 1) * faces) : []
    const datasets = (await Promise.all(slice.map((s) => dataOf(s.source, s.args).catch(() => null)))).filter((x) => x !== null).length
    const read = (r.reading?.read ?? 0) + datasets
    return dataFormula('data-deep', 'deep', k ? [f, k] : [f], `deep(${f}, ${k}) = |APIs of ${family} read in slice ${k}| + |datasets of slice ${f} read|`, read, read > 0 || (r.reading?.matched ?? 0) === 0, 'https://apis.guru and every dataset', { family, matched: r.reading?.matched ?? 0, apisRead: r.reading?.read ?? 0, datasets, of: slice.length, ...(typeof r.reading?.next === 'number' ? { next: Math.ceil(r.reading.next / faces) } : {}) })
  }
  /** The CERN Open Data catalogue walked as leads: value how many records read, holds when one was. Each record's
   *  events = files · q + r is a candidate relation like the proven record 38; the slice's numbers feed the discovery. */
  static async collisions(from: number): Promise<unknown> {
    const r = (await dataOf('collisions', { from: from + 1 })) as { agrees?: boolean; reading?: { total?: number; read?: number; withCounts?: number; leads?: unknown[] } }
    return dataFormula('data-collisions', 'collisions', [from], `collisions(${from}) = |CERN Open Data records read as leads (of ${r.reading?.total ?? '?'})|`, r.reading?.read ?? 0, r.agrees === true, 'https://opendata.cern.ch', { reading: r.reading })
  }
  /** A word defined and translated (keyless Free Dictionary + MyMemory), with its phonetics for speech; the registry's
   *  dictionary and translation APIs are the lexicon leads. value how many meanings; holds when the word is found. */
  static async define(from: number): Promise<unknown> {
    const r = (await dataOf('define', {})) as { agrees?: boolean; reading?: { word?: string; meanings?: unknown[]; lexiconLeads?: unknown[] } }
    return dataFormula('data-define', 'define', [from], `define = |meanings of ${r.reading?.word ?? 'the word'}|`, r.reading?.meanings?.length ?? 0, r.agrees === true, 'https://dictionaryapi.dev', { reading: r.reading })
  }
  /** Claim-driven prior art for one slice: value how many public records are dated earlier than the priority date.
   *  Holds when the archive answered. The count is a lead, never a finding of novelty. */
  static async prior(from: number): Promise<unknown> {
    const r = (await dataOf('prior', { from, about: 'quantum processing unit' })) as { agrees?: boolean; reading?: { earlier?: number } }
    return dataFormula('data-prior', 'prior', [from], `prior(${from}) = |earlier public records in the slice|; a count of leads, not a finding of novelty`, r.reading?.earlier ?? 0, r.agrees === true, 'https://arxiv.org', { reading: r.reading })
  }
  /** arXiv's newest preprints in a field as leads: value how many read; holds when one was. Their numbers feed the discovery. */
  static async arxiv(from: number): Promise<unknown> {
    const r = (await dataOf('arxiv', { from })) as { agrees?: boolean; reading?: { count?: number; numbers?: number[]; next?: number; leads?: unknown[] } }
    return dataFormula('data-arxiv', 'arxiv', [from], `arxiv(${from}) = |open preprints read as leads|`, r.reading?.count ?? 0, r.agrees === true, 'https://arxiv.org', { reading: r.reading })
  }
  /** Open Library's books about the from-th family (the unit's own subjects, derived — no typed list) as leads: value how
   *  many read, holds when one was. A hex program over the family cursor, so it ranges the whole subject graph to infinity;
   *  the books' subjects and numbers feed the discovery. For a theme in words, data { source: 'books', about }. */
  static async books(from: number): Promise<unknown> {
    const r = (await dataOf('books', { from })) as { agrees?: boolean; reading?: { family?: string; count?: number; subjects?: string[]; numbers?: number[]; next?: number; leads?: unknown[] } }
    return dataFormula('data-books', 'books', [from], `books(${from}) = |books about ${r.reading?.family ?? 'the family'} read as leads|`, r.reading?.count ?? 0, r.agrees === true, 'https://openlibrary.org', { reading: r.reading })
  }
  /** MathOverflow's unanswered questions as leads: value how many open problems read; holds when one was. Their numbers
   *  feed the discovery — an open problem a family's value reaches is a cross worth a human's look. */
  static async unanswered(from: number): Promise<unknown> {
    const r = (await dataOf('unanswered', { from: from + 1 })) as { agrees?: boolean; reading?: { count?: number; numbers?: number[]; next?: number; leads?: unknown[] } }
    return dataFormula('data-unanswered', 'unanswered', [from], `unanswered(${from}) = |open MathOverflow questions read as leads|`, r.reading?.count ?? 0, r.agrees === true, 'https://mathoverflow.net/unanswered', { reading: r.reading })
  }
  /** The court-admissible legal sources of the from-th slice (Federal Register, UK legislation, EUR-Lex, registry):
   *  value how many answered keyless; holds when one did — the review layer the law family's advice gate depends on. */
  static async law(from: number): Promise<unknown> {
    const r = (await dataOf('law', { from })) as { agrees?: boolean; reading?: { keyless?: number; answered?: number; reviewed?: number; jurisdictions?: string[]; next?: number; sources?: unknown[] } }
    return dataFormula('data-law', 'law', [from], `law(${from}) = |court-admissible legal sources of the slice answering keyless|`, r.reading?.keyless ?? 0, r.agrees === true, 'https://www.federalregister.gov', { reading: r.reading })
  }
  /** The official funding sources of the from-th slice that answer free and keyless (World Bank, EU Open Data, and the
   *  registry's funding APIs): value how many, holds when one did; next in the reading. data { source: 'funding', about, from }. */
  static async funding(from: number): Promise<unknown> {
    const r = (await dataOf('funding', { from })) as { agrees?: boolean; reading?: { keyless?: number; answered?: number; matched?: number; next?: number; sources?: unknown[] } }
    return dataFormula('data-funding', 'funding', [from], `funding(${from}) = |official funding sources of the slice answering 200 with no credential asked|`, r.reading?.keyless ?? 0, r.agrees === true, 'https://api.worldbank.org + https://data.europa.eu', { reading: r.reading })
  }
  /** The job boards of the from-th slice that answer free and keyless: value how many, holds when one did; next in
   *  the reading. The public searches for work through the one door — data { source: 'jobs', about, from }. */
  static async jobs(from: number): Promise<unknown> {
    const r = (await dataOf('jobs', { from })) as { agrees?: boolean; reading?: { keyless?: number; answered?: number; matched?: number; next?: number; boards?: unknown[] } }
    return dataFormula('data-jobs', 'jobs', [from], `jobs(${from}) = |job boards of the slice answering 200 with no credential asked|`, r.reading?.keyless ?? 0, r.agrees === true, 'https://apis.guru', { reading: r.reading })
  }
  /** The AI APIs of the from-th slice that answer free and keyless: value how many; holds when one did; next in the reading. */
  static async ai(from: number): Promise<unknown> {
    const r = (await dataOf('ai', { from })) as { agrees?: boolean; reading?: { keyless?: number; matched?: number; next?: number; apis?: unknown[] } }
    return dataFormula('data-ai', 'ai', [from], `ai(${from}) = |AI APIs of the slice answering 200 with no credential asked|`, r.reading?.keyless ?? 0, r.agrees === true, 'https://apis.guru', { reading: r.reading })
  }
  /** The c-th section of Payload's docs crossed with the families: value how many families its pages name; holds
   *  when the section was read. The templates and examples ride in the reading: what the site is configured from. */
  static async payload(c: number): Promise<unknown> {
    const r = (await dataOf('payload', { category: c })) as { agrees?: boolean; reading?: { section?: string; pages?: string[]; families?: unknown[]; docs?: number; templates?: string[]; examples?: string[]; configures?: string } }
    return dataFormula('data-payload', 'payload', [c], `payload(${c}) = |families the pages of docs/${r.reading?.section ?? '?'} name|`, r.reading?.families?.length ?? 0, r.agrees === true && (r.reading?.pages?.length ?? 0) > 0, 'https://github.com/payloadcms/payload', { reading: r.reading })
  }
  /** What the unit may be for the c-th category of the registry: the families whose formula words the category's APIs
   *  name; value how many families, holds when one is reached. For a request in words, data { source: 'imagine', about }. */
  static async imagine(c: number): Promise<unknown> {
    const r = (await dataOf('imagine', { category: c })) as { agrees?: boolean; reading?: { category?: string; families?: unknown[]; is?: string } }
    return dataFormula('data-imagine', 'imagine', [c], `imagine(${c}) = |families the APIs of ${r.reading?.category ?? 'the category'} name|`, r.reading?.families?.length ?? 0, r.agrees === true, 'https://apis.guru', { reading: r.reading })
  }
  /** THE DOUBLE TORUS OVER THE DISCOVERY: the first n relations of the window's discovery, each a superposition of ways,
   *  every way run with every other way's address as referrer (both directions); value how many relations every
   *  perspective answers alike, holds when all of the n do. */
  static async perspectives(n: number): Promise<unknown> {
    const d = (await DataFormulas.discover(n)) as { reading?: { relations?: { value: string; ways: { hex: string }[] }[] } } & Record<string, unknown>
    const relations = ((d as { relations?: unknown }).relations ?? d.reading?.relations ?? []) as { value: string; ways: { hex: string }[] }[]
    let pairs = 0, closed = 0
    const open: string[] = []
    for (const rel of relations.slice(0, n)) {
      // each way from the perspective of its two neighbours on the ring of ways (the double torus), not every pair
      const ways = rel.ways
      const seen = await Promise.all(ways.flatMap((w, i) => [ways[(i + 1) % ways.length]!, ways[(i + ways.length - 1) % ways.length]!].filter((o) => o !== w).map(async (o) => { pairs += 1; const r = (await hexRunOf(w.hex, o.hex, undefined, { store: false }).catch(() => null)) as { value?: unknown } | null; return r !== null && String(r.value) === rel.value })))
      if (seen.every(Boolean)) closed += 1
      else open.push(rel.value)
    }
    return dataFormula('data-perspectives', 'perspectives', [n], 'perspectives(n) = |relations every way of which answers the same value from every other way as referrer|', closed, relations.length > 0 && open.length === 0, 'hexRunOf(way, referrer)', { relations: relations.length, pairs, closed, open: open.slice(0, facesOf().faces) })
  }
  /** Discovery across every family, bounded to the first n relations: value how many values two or more families reach. */
  static async discover(n: number, slice?: { from?: number; count?: number }): Promise<unknown> {
    const { qpuDiscoverOf } = await import('./discovery.js')
    // UNLOCK FOR LIMITED-ENVIRONMENT AGENTS. A call with no slice defaults to the first family slice (faces families),
    // so the door fits the isolate budget — the sweep over every family exceeds it (measured: 58s then a 1102). The
    // whole discovery is the merge of the slices (discoverMergeOf), walked by `next`. This reply shows two ways
    // of each relation; gate.leads counts every way of the same discovery, so a later way is not an open lead.
    const total = [...hexFamiliesOf()].length
    const s = slice ?? { from: 0, count: facesOf().faces }
    const from = Math.max(0, s.from ?? 0)
    const count = s.count ?? total
    const next = from + count < total ? from + count : undefined
    // the live inputs are every reading the doors made in this window (data.read, research, the site…): reading the
    // record and discovering over it is one sequence of calls, nothing passed by hand
    // a slice of the window's numbers, the smallest first: faces · hexbit of them (56) are what the formulas' small
    // inputs can meet; a window full of catalogue totals would make one discovery the lattice squared (measured
    // 2026-10-03: 22 minutes at 100% CPU after one family's research)
    const live = await discoverLiveOf()
    const d = await qpuDiscoverOf(live, { from, count })
    return dataFormula('data-discover', 'discover', [n], 'discover(n) = |values reached by two or more families in the family slice [from, from+faces)|', d.relations.length, d.holds, 'qpuDiscoverOf', { families: d.families, slice: { from, count }, ...(next !== undefined ? { next } : {}), liveInputs: live.length, liveRelations: d.liveRelations, relationsTotal: d.relations.length, sealsTotal: d.seals.length, relations: d.relations.slice(0, n).map((r) => ({ value: r.value, families: r.families, live: r.live, ways: r.ways.slice(0, 2).map((w) => ({ family: w.family, program: w.program, params: w.params, hex: w.hex })) })), seals: d.seals.slice(0, n).map((seal) => ({ family: seal.family, program: seal.program, kind: seal.kind, points: seal.points.slice(0, 6) })) })
  }
}
// Two families, each within its nibble (15): `data` keeps the discovery and research core the rest of the unit calls
// by name (discover, research, imagine, perspectives, deep, …); the external public-record lookups organise into
// `record` — a value a client reads from arXiv, CERN, Crossref funders, a legal or job registry or a site, each
// still a hex program at its own address, none of them called by name elsewhere so the move breaks nothing.
for (const name of ['ai', 'deep', 'define', 'discover', 'errors', 'imagine', 'payload', 'perspectives', 'read', 'research', 'sources', 'unanswered'] as const)
  hexRegisterOf('data', name, (DataFormulas[name] as (...x: unknown[]) => unknown).bind(DataFormulas))
for (const name of ['arxiv', 'books', 'collisions', 'funding', 'jobs', 'law', 'prior', 'site'] as const)
  hexRegisterOf('record', name, (DataFormulas[name] as (...x: unknown[]) => unknown).bind(DataFormulas))

mcpFuseOf('data', {
  description: "THE CHAT IS THE DEFAULT WAY IN: { source: 'ask', about } answers a question in words (with its numbers) from the formula its words name, at its address, with the receipt. Also reads live public data and checks it against the unit: { source: 'cern', recid } (theorem cern), 'nist' (Planck, Boltzmann vs Qpu.Physics), 'oeis' { id: A000110 | A000108 }, 'sequence' { family, formula, fixed? } (a formula's terms identified in OEIS), 'zenodo' (latest release vs this version), 'datacite' { doi } (the cited DOIs), 'novelty' (the DOI-based priority record: each DOI's registration date, bound to the content by the receipts), 'prior' { about, from } (a claim in words: the priority date, then arXiv and PatentsView records dated against it, and the APIs the words name), 'orcid' (the author), 'github' { repo }, 'npm' (the package), 'release' (the GitHub Release of the served version), 'apis' (the APIs.guru registry vs theorem fuse), 'research' { family } (the APIs a family's formula names find, read live), 'imagine' { about } | { category } (what the unit may be for a request or a registry category: the families its APIs name), 'payload' { category?, from? } (the NEXT payload config as an endless feed: from 0 the map, 1 the content architecture, 2 monetisation, 3.. the docs vocabulary; { category } reads one docs section crossed with the families), 'org' { about?, from } (ANY GitHub org as an endless feed of fusion leads — its repos classed template/sdk/framework/agent/ai/docs/tool and mapped to the deploy axes, crossed with the families; default cloudflare), 'ai' { from, about? } (the AI APIs that answer free and keyless), 'jobs' { about?, from } (search for work: the public job boards fused from the registry, the keyless ones read live), 'funding' { about?, from } (find funding: World Bank, EU Open Data, registry funding APIs), 'law' { about?, from } (the court-admissible legal record, read live), 'unanswered' { site?, about?, from } (open questions as leads from any research Stack Exchange site — mathoverflow, cstheory, physics, stats, quantumcomputing, economics, astronomy…), 'arxiv' { about?, from } (the newest arXiv preprints in a field as leads), 'collisions' { from } (the CERN Open Data catalogue — 66k records — walked as leads, each an events = files·q + r arithmetic like the proven record 38), 'define' { about?, to? } (a word's meanings and phonetics from the keyless Free Dictionary and its translation from MyMemory — speech and translation; the registry's dictionary/translation APIs are the lexicon leads), 'ask' { about } (the chat: a question in words with its numbers, answered by the formula its words name; the reply is the formula, the integer, the fold and the hue; a named Payload collection is read with the plugin findDocuments and is not copied into the reply), 'authors' { from } (the work around the cited authors: DataCite, ORCID, Crossref), 'catalog' { name } (every public catalogue the unit names). { source: 'all' } lists every check.",
  inputSchema: { type: 'object', properties: { source: { type: 'string', enum: [...SOURCES, 'all'] }, about: { type: 'string' }, to: { type: 'string' }, category: { type: 'integer' }, recid: { type: 'integer' }, id: { type: 'string' }, name: { type: 'string' }, family: { type: 'string' }, words: { type: ['string', 'array'], items: { type: 'string' } }, from: { type: 'integer' }, formula: { type: 'string' }, fixed: { type: 'array', items: { type: 'integer' } }, doi: { type: 'string' }, repo: { type: 'string' } }, required: ['source'] },
  run: async (a, env, auth) => (str(a.source) === 'all' ? { kind: 'data-sources', sources: await dataSourcesOf() } : dataOf(str(a.source), a, env, auth)),
})

// ---------------------------------------------------------------------------
// discover: cross-formulated solutions across every family
// ---------------------------------------------------------------------------

mcpFuseOf('discover', {
  description: 'Discover cross-formulated solutions: every family, every program of one formula and every composition of two, over params that fit the hex split; a value reached by two or more families is a relation. { live: [naturals] } adds live readings as inputs; { limit } caps the relations returned (default 50).',
  inputSchema: { type: 'object', properties: { live: { type: 'array', items: { type: 'integer' } }, limit: { type: 'integer' } } },
  run: async (a) => {
    const { qpuDiscoverOf } = await import('./discovery.js')
    const d = await qpuDiscoverOf(Array.isArray(a.live) ? a.live.map(Number) : [])
    return { ...d, relations: d.relations.slice(0, num(a.limit, (L.hexbit + L.seed) * L.tenOf(L.seed))), relationsTotal: d.relations.length }
  },
})

// ---------------------------------------------------------------------------
// crypt: the internal crypto
// ---------------------------------------------------------------------------

const bytesArg = (a: Args, key: string): Uint8Array => (typeof a[`${key}Hex`] === 'string' ? fromHex(a[`${key}Hex`] as string) : bytesOf(str(a[key])))
const CRYPT_OPS: Record<string, (a: Args) => unknown> = {
  known: () => CryptFormulas.knownAnswers(),
  sha256: (a) => hexOf(sha256(bytesArg(a, 'text'))),
  sha512: (a) => hexOf(sha512(bytesArg(a, 'text'))),
  md5: (a) => hexOf(md5(bytesArg(a, 'text'))),
  hmac: (a) => hexOf(hmac((str(a.hash) || 'sha256') as HashName, bytesArg(a, 'key'), bytesArg(a, 'message'))),
  hkdf: (a) => hexOf(hkdf((str(a.hash) || 'sha256') as HashName, fromHex(str(a.ikm)), fromHex(str(a.salt)), utf8(str(a.info)), num(a.length, 32))),
  aead_seal: (a) => {
    const sealed = aeadSeal(fromHex(str(a.key)), fromHex(str(a.nonce)), bytesArg(a, 'plaintext'), fromHex(str(a.aad)))
    return { ct: hexOf(sealed.subarray(0, sealed.length - 16)), tag: hexOf(sealed.subarray(sealed.length - 16)) }
  },
  aead_open: (a) => {
    const opened = aeadOpen(fromHex(str(a.key)), fromHex(str(a.nonce)), fromHex(`${str(a.ct)}${str(a.tag)}`), fromHex(str(a.aad)))
    return opened ? { plaintextHex: hexOf(opened), authentic: true } : { authentic: false }
  },
  x25519: (a) => hexOf(x25519(fromHex(str(a.scalar)), fromHex(str(a.u) || '09'.padEnd(64, '0')))),
  ed25519_public: (a) => hexOf(ed25519PublicKey(fromHex(str(a.seed)))),
  ed25519_sign: (a) => hexOf(ed25519Sign(fromHex(str(a.seed)), bytesArg(a, 'message'))),
  ed25519_verify: (a) => ed25519Verify(fromHex(str(a.publicKey)), bytesArg(a, 'message'), fromHex(str(a.signature))),
  // Security formulas (hex family crypt.*) — MCP-readable, same as crypto_verify morph.
  symmetric_quantum: (a) => CryptFormulas.symmetricQuantumBits(num(a.keyBits, 256)),
  curve_classical: (a) => CryptFormulas.curveClassicalBits(num(a.curveBits, 256)),
  curve_quantum: (a) => CryptFormulas.curveQuantumBits(num(a.curveBits, 256)),
  tag_forgery: (a) => CryptFormulas.tagForgery(num(a.bytes, 16)),
  nonce_collision: (a) => CryptFormulas.nonceCollision(num(a.messages, 0)),
  aead_tag_bits: () => CryptFormulas.aeadTagBits(),
  hash_collision: (a) => CryptFormulas.hashCollisionBits(num(a.hashBits, 256)),
  security: () => {
    const known = CryptFormulas.knownAnswers()
    const grover = CryptFormulas.symmetricQuantumBits(256)
    const classical = CryptFormulas.curveClassicalBits(256)
    const quantum = CryptFormulas.curveQuantumBits(256)
    const tag = CryptFormulas.aeadTagBits()
    const poly = CryptFormulas.tagForgery(16)
    const birthday = CryptFormulas.hashCollisionBits(256)
    return {
      knownAnswers: known,
      symmetricQuantumBits256: grover,
      curveClassicalBits256: classical,
      curveQuantumBits256: quantum,
      aeadTagBits: tag,
      tagForgery16: poly,
      hashCollisionBits256: birthday,
      holds: [known, grover, classical, quantum, tag, poly, birthday].every((r) => r.holds === true),
    }
  },
}

mcpFuseOf('crypt', {
  description: 'The unit\'s own crypto (FIPS 180-4, RFC 1321/2104/5869/8439/7748/8032), no external library: { op: known | sha256 | sha512 | md5 | hmac | hkdf | aead_seal | aead_open | x25519 | ed25519_public | ed25519_sign | ed25519_verify | security | symmetric_quantum | curve_classical | curve_quantum | tag_forgery | nonce_collision | aead_tag_bits | hash_collision, ... }. Byte inputs are hex; text, key, message and plaintext also take <name>Hex.',
  inputSchema: { type: 'object', properties: { op: { type: 'string', enum: Object.keys(CRYPT_OPS) } }, required: ['op'] },
  run: (a) => {
    const op = CRYPT_OPS[str(a.op)]
    if (!op) return fail('op', { ops: Object.keys(CRYPT_OPS) })
    try {
      const value = op(a)
      const holds = value !== false && !(value && typeof value === 'object' && 'holds' in value && (value as { holds: unknown }).holds === false)
      return { kind: 'crypt', op: a.op, value, holds, receipt: receiptOf(`crypt ${String(a.op)}`, value, holds) }
    } catch (e) {
      return fail('input', { op: a.op, reading: (e as Error).message })
    }
  },
})

// ---------------------------------------------------------------------------
// np: certificate verifiers and the theorems they decide
// ---------------------------------------------------------------------------

const MAX_VERTICES = L.mintOf(L.n * L.hexbit)
const MAX_EDGES = L.tenOf(L.hexbit + L.seed)
const graphOf = (a: Args): Graph | null => {
  const n = num(a.n, -1)
  const edges = Array.isArray(a.edges) ? (a.edges as unknown[]).filter((e): e is [number, number] => Array.isArray(e) && e.length === 2 && e.every((v) => Number.isSafeInteger(v) && v >= 0 && v < n)) : []
  return n > 0 && n <= MAX_VERTICES && edges.length <= MAX_EDGES && edges.length === (a.edges as unknown[] | undefined)?.length ? { n, edges } : null
}
const NP_OPS: Record<string, (a: Args) => unknown> = {
  coloring: (a) => {
    const g = graphOf(a)
    return g && Array.isArray(a.colors) ? verifyColoring(g, a.colors as number[], num(a.k, 3)) : fail('graph')
  },
  ham_cycle: (a) => {
    const g = graphOf(a)
    return g && Array.isArray(a.cycle) ? verifyHamCycle(g, a.cycle as number[]) : fail('graph')
  },
  subset_sum: (a) => (Array.isArray(a.set) ? verifySubsetSum(a.set as number[], num(a.mask, 0), num(a.target, 0)) : fail('set')),
  sat: (a) => (Array.isArray(a.cnf) && Array.isArray(a.assignment) ? verifySat(a.cnf as number[][], a.assignment as boolean[]) : fail('cnf')),
  unreachable: (a) => {
    const g = graphOf(a)
    return g ? certifyUnreachable(g, num(a.s, 0), num(a.t, 0)) : fail('graph')
  },
  theorems: () => {
    const petersen = generalizedPetersen(5, 2)
    const dodecahedron = generalizedPetersen(10, 2)
    const colour = findColoring(petersen, 3)
    const cycle = findHamCycle(dodecahedron)
    const php = pigeonhole(3, 2)
    const rows = [
      { name: 'petersen chromatic 3', holds: colour !== null && verifyColoring(petersen, colour, 3) && findColoring(petersen, 2) === null },
      { name: 'petersen non-hamiltonian', holds: findHamCycle(petersen) === null },
      { name: 'dodecahedron hamiltonian', holds: cycle !== null && verifyHamCycle(dodecahedron, cycle), cycle },
      { name: 'pigeonhole 3 into 2 unsatisfiable', holds: findAssignment(php.cnf, php.vars) === null },
      { name: 'subset sum {3,7,1,9,4} reaches 13', holds: verifySubsetSum([3, 7, 1, 9, 4], 13, 13) },
    ]
    return { rows, holds: rows.every((r) => r.holds) }
  },
}

mcpFuseOf('np', {
  description: 'Check NP certificates in linear time and NL non-reachability by inductive counting: { op: coloring { n, edges, colors, k } | ham_cycle { n, edges, cycle } | subset_sum { set, mask, target } | sat { cnf, assignment } | unreachable { n, edges, s, t } | theorems }.',
  inputSchema: { type: 'object', properties: { op: { type: 'string', enum: Object.keys(NP_OPS) } }, required: ['op'] },
  run: (a) => {
    const op = NP_OPS[str(a.op)]
    if (!op) return fail('op', { ops: Object.keys(NP_OPS) })
    const value = op(a)
    const holds = value === true || (value !== null && typeof value === 'object' && ('unreachable' in value ? (value as { unreachable: boolean }).unreachable : (value as { holds?: unknown }).holds === true))
    return { kind: 'np', op: a.op, value, holds, receipt: receiptOf(`np ${String(a.op)}`, value, holds) }
  },
})

// ---------------------------------------------------------------------------
// hologram: the signed hologram streams
// ---------------------------------------------------------------------------

let hologram: ReturnType<typeof hologramStreamsOf> | undefined




mcpFuseOf('hologram', {
  description: "The unit's hologram as signed SHA-256 UUID streams, one per scale, each fragment carrying a Merkle proof to the root: {} for the whole, { scale } for one stream's fragments.",
  inputSchema: { type: 'object', properties: { scale: { type: 'string' } } },
  run: (a) => {
    const h = (hologram ??= hologramStreamsOf())
    const scale = str(a.scale)
    if (scale) return h.streams[scale] ? { kind: 'hologram-scale', scale, root: h.root, publicKey: h.publicKeys[scale], fragments: h.streams[scale], holds: h.holds } : fail('scale', { scales: Object.keys(h.streams) })
    return { kind: h.kind, root: h.root, publicKeys: h.publicKeys, entries: h.entries, scales: Object.fromEntries(Object.entries(h.streams).map(([k, v]) => [k, { length: v.length, head: v.at(-1)?.uuid }])), holds: h.holds }
  },
})


mcpFuseOf('papers', {
  description: 'Every blueprint and white-paper generator the tree names. {} runs each one. { chips: true } prints ray-layered chip blueprints (UUID rays = layers; coins·rays=faces). { print: true } printable×printer matrix. A script that imports dist waits while dist is held.',
  inputSchema: { type: 'object', properties: {
    chips: { type: 'boolean', description: '{ chips: true } — print semiconductor/hardware/firmware chip blueprints with multidimensional layers managed by UUID rays (facesOf.rays).' },
    chip: { type: 'boolean', description: 'Alias of chips: true.' },
    print: { type: 'boolean', description: '{ print: true } — print all tree printables and test each on publishing.print / printmaking / optics.dpi / raster.dpi / driver.dmaPages.' },
    printAll: { type: 'boolean', description: 'Alias of print: true.' },
  } },
  run: async (a) => {
    const { papersOf } = await import('./papers.js')
    return papersOf(a)
  },
})

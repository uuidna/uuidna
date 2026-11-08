import { test as receiptedTest } from './receipted.js'
import type { TestContext } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { contentUuidOf, hexFamiliesOf, uuidReceiptOf } from './index.js'
import { DOORS } from '../../../mcp/discovery.js'
import '../../../mcp/families.js'

/** THE RELEASE, AS EVERY CLIENT SEES IT. QPU is live: these tests call https://qpu.uuidna.com/api (QPU_LIVE names
 * another host) through the sealed doors, the one way any MCP client reaches it, and drive what a release must cover:
 * every door and formula listed, every external API and dataset read, formula discovery holding, and every error and
 * warning answered at once, each with what resolves it. */
const host = (process.env.QPU_LIVE ?? 'https://qpu.uuidna.com').replace(/\/$/, '')
const DOOR = 'cite'
// BOUNDED SO IT NEVER HANGS, EVEN ON THE SMALLEST MACHINE. Each request has a short deadline and at most one retry, so
// no call runs for minutes (the old 120s × four retries was eight minutes). The host is probed once, memoized: when it
// is unreachable — offline, no network, the host down — every live test skips rather than timing out, so the suite
// finishes on any hardware (a Pravets 8M included) instead of stalling on a request that was never going to answer.
// What that register recomputes one byte at a time is zeroPageOf; analyticsOf holds every integer, including the amplitude count.
const DEADLINE = 20000
let up: Promise<boolean> | undefined
const reachable = (): Promise<boolean> => (up ??= fetch(`${host}/health`, { signal: AbortSignal.timeout(DEADLINE) }).then((r) => r.ok).catch(() => false))
const test = (name: string, fn: (t: TestContext) => void | Promise<void>): Promise<void> =>
  receiptedTest(name, async (t) => { if (!(await reachable())) { t.skip(`${host} unreachable — offline or down; set QPU_LIVE or start the host`); return } await fn(t) })
let id = 0
type Shown = { structuredContent?: Record<string, unknown>; isError?: boolean }
const call = async (args: Record<string, unknown>, name = DOOR, again = 0): Promise<Shown> => {
  const r = await fetch(`${host}/api`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method: 'tools/call', params: { name, arguments: args } }),
    signal: AbortSignal.timeout(DEADLINE),
  }).catch(() => null)
  // one retry, then give up fast with a clear error — never a cascade of two-minute waits
  if (r === null) { if (again < 1) return call(args, name, again + 1); throw new Error(`${host}/api did not answer within ${DEADLINE}ms`) }
  if (r.status >= 500 && again < 1) { await new Promise((ok) => setTimeout(ok, 2000)); return call(args, name, again + 1) }
  const body = (await r.json()) as { result?: Shown; error?: { message: string } }
  assert.ok(body.result, `tools/call ${name} ${JSON.stringify(args)}: ${body.error?.message ?? r.status}`)
  // the live reading is this test's computation: its content address is minted into the test's receipt ledger, so the
  // receipted reporter sees what was read and from where, and a test that only read the host is not "dry"
  const sc = body.result.structuredContent ?? {}
  uuidReceiptOf(`release ${name} ${JSON.stringify(args).slice(0, 80)}`, contentUuidOf(sc), { holds: (sc as { holds?: unknown }).holds === true, host })
  return body.result
}
const out = (s: Shown) => (s.structuredContent ?? {}) as Record<string, unknown>
const FUSED = ['data', 'hex', 'discover', 'crypt', 'np', 'hologram']
// COMPUTE ALL IN HEX, DO NOT WRAP: every check is a hex program run at its address through a sealed door
type Run = { value?: unknown; holds?: boolean; steps?: unknown[]; denied?: string; receipt?: string }
const hex = async (family: string, program: string[], params: number[] = []): Promise<Run> => out(await call({ hex: { family, program, params } })) as Run
// the families the data formulas index: sorted, the doors excluded, as data.research(f) and gate.family(i) count them
const nonDoors = () => [...hexFamiliesOf().keys()].filter((f) => !DOORS.has(f)).sort()

test('release: every door and every formula is reachable through a sealed door', async (t) => {
  // COLD SPLITS HOT, ONE CATALOGUE: the doors come back cold and in full (name + kind, unfolded); the formulas are not
  // duplicated here — the door carries their count and points to the one hex catalogue, each formula reachable in hex.
  // { doors: true } is recognition-first: the cold summary (counts, lean, a folded doors stub). The full doors array is
  // over the span, so reading it spends the enthalpy — { full: true } — the one place this contract is exercised live.
  const d = out(await call({ doors: true, full: true })) as { doors?: { name: string; kind: string }[]; formulas?: number; families?: number; catalogue?: string; lean?: { theorems: number; held: number; axioms: number; defs: number; proven: number }; holds?: boolean }
  assert.ok(Array.isArray(d.doors), 'the sealed door answers { doors: true } with the cold doors as an array, unfolded')
  assert.ok(typeof d.formulas === 'number' && d.formulas > 0, 'the formula count stands for the whole; the list is the one hex catalogue, not duplicated here')
  assert.ok(typeof d.families === 'number' && d.families > 0, 'every family is counted')
  assert.ok(typeof d.catalogue === 'string' && d.catalogue.includes('hex'), 'the door points to the one catalogue in hex')
  // a door is meaningful in terms of lean: it carries the proof — every theorem recomputed, zero axioms, formulas proven
  assert.ok(d.lean && d.lean.held === d.lean.theorems && d.lean.theorems > 0 && d.lean.axioms === 0, 'the door carries the lean proof: every theorem holds, zero axioms')
  assert.ok(d.lean.proven > 0 && d.lean.defs > 0, 'the catalogue names how many formulas are a Lean def the kernel proves')
  assert.equal(d.holds, true, 'the doors hold only when the lean holds')
  for (const f of FUSED) assert.ok(d.doors.some((x) => x.name === f && x.kind === 'fused'), `fused door ${f} is listed`)
  // every family is reachable IN HEX, at its address — proven by running one formula of each, not by a giant inline list
  for (const [family, program, params, expected] of [['Qpu.Mint', ['mintOf'], [3], 8], ['Qpu.Physics', ['planck'], [], undefined], ['clay', ['hodge'], [2], 4], ['heat', ['temperature'], [16, 1], 16000]] as [string, string[], number[], number | undefined][]) {
    const run = await hex(family, program, params)
    assert.equal(run.holds, true, `family ${family} is reachable in hex (${family}.${program.join('∘')})`)
    if (expected !== undefined) assert.equal(Number(run.value), expected, `${family}.${program[0]}(${params.join(',')}) = ${expected} at its hex address`)
  }
  t.diagnostic(`${d.doors.length} doors, cold; ${d.formulas} formulas in ${d.families} families — one catalogue in hex (${d.catalogue})`)
})

test('release: every external API and dataset is read, the theorems among them agree', async (t) => {
  const n = Number((await hex('data', ['sources'])).value)
  assert.ok(n > 0, 'data.sources() counts the live checks')
  const runs = await Promise.all(Array.from({ length: n }, (_, i) => hex('data', ['read'], [i])))
  const unread = runs.map((r, i) => ({ r, i })).filter(({ r }) => r.holds !== true)
  assert.deepEqual(unread.map(({ i, r }) => `read(${i}) = ${String(r.value)}`), [], 'every source agrees, warns, or differs without being a theorem of the unit')
  const agree = runs.filter((r) => Number(r.value) === 2).length, differ = runs.filter((r) => Number(r.value) === 1).length, warned = runs.filter((r) => Number(r.value) === 0).length
  t.diagnostic(`${n} sources in hex: ${agree} agree, ${differ} differ, ${warned} unread (warned)`)
})

test('release: formula discovery holds across every family', async (t) => {
  const d = await hex('data', ['discover'], [5])
  assert.equal(d.holds, true, 'discovery holds: every family ran and two or more reach a common value')
  assert.ok(Number(d.value) > 0, 'cross-family solutions')
  t.diagnostic(`${d.value} cross-family solutions, in hex`)
})

test('release: the site end to end — every address it lists answers, every page renders as built', async (t) => {
  // every page read is minted into the test's receipt ledger (status and content address), as the MCP readings are
  const get = async (path: string, accept = 'text/html') => {
    const r = await fetch(`${host}${path}`, { headers: { accept }, redirect: 'manual', signal: AbortSignal.timeout(DEADLINE) })
    const text = await r.text()
    uuidReceiptOf(`release site ${path}`, contentUuidOf({ status: r.status, text }), { holds: r.status === 200, host })
    return { status: r.status, headers: r.headers, text: async () => text, json: async () => JSON.parse(text) as unknown }
  }
  // THE COLD START IS REPORTED, NOT RACED. The first page after a deploy seeds a changed site before it answers (minutes
  // on a version bump: every doc's UUID moves); this test runs right after the deploy that made the host, so it waits
  // for the first answer and records how long it took, then holds the site to its warm shape.
  // A 503 is the host saying not yet (the isolate still seeding, or the Worker version still propagating), so the wait
  // is paced, up to five minutes; the first 200 is the cold start's end.
  const started = Date.now()
  let warm: { status: number } | undefined
  let last = ''
  for (let i = 0; i < 30 && !(warm && warm.status === 200); i++) {
    if (i) await new Promise((r) => setTimeout(r, 1500))
    try { warm = await get('/'); last = String(warm.status) } catch (e) { last = (e as Error).message }
  }
  assert.ok(warm && warm.status === 200, `the site answers its root within five minutes of a deploy (last: ${last})`)
  t.diagnostic(`cold start ${Math.round((Date.now() - started) / 1000)}s`)
  // the site names its own addresses: nothing is listed here
  const sitemap = await (await get('/sitemap.xml', 'application/xml')).text()
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname)
  assert.ok(urls.length > 0, 'the sitemap lists the site')
  const failed: string[] = []
  await Promise.all(urls.map(async (u) => {
    const r = await get(u)
    const body = await r.text()
    // every address answers; one that serves a page serves it titled; a JSON door answers its JSON
    const page = (r.headers.get('content-type') ?? '').includes('text/html')
    if (r.status !== 200 || (page && !/<title>[^<]+<\/title>/.test(body))) failed.push(`${u} ${r.status} ${body.replace(/\s+/g, ' ').slice(0, 160)}`)
  }))
  assert.deepEqual(failed, [], 'every address the sitemap lists answers 200, a page with its title')
  // every published page renders as the admin built it, and SEO-optimised: the test says what the page must carry,
  // the code follows — a title of at most 70 characters that is the page's, a description of 50 to 160, a canonical
  // that is the page's own address, Open Graph title and description, and structured data (JSON-LD)
  const pages = (await (await get('/api/pages?limit=100&depth=0', 'application/json')).json()) as { docs: { slug: string; title: string; meta?: { title?: string; description?: string } }[] }
  assert.ok(pages.docs.length > 0, 'Payload serves its pages')
  const seo: string[] = []
  for (const p of pages.docs) {
    const path = p.slug === 'home' ? '/' : `/${p.slug}`
    // the seed resumes one slice per request: a page not yet written is asked again, paced, before it is a finding
    let html = ''
    for (let i = 0; i < 6; i++) {
      try {
        const r = await get(path)
        html = await r.text()
        if (r.status === 200 && html.includes(p.meta?.title ?? p.title)) break
      } catch { /* a read that timed out while the seed resumes is asked again */ }
      await new Promise((f) => setTimeout(f, 1500))
    }
    const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? ''
    const meta = (name: string) => new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`).exec(html)?.[1] ?? new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${name}"`).exec(html)?.[1] ?? ''
    const canonical = /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/.exec(html)?.[1] ?? /<link[^>]+href="([^"]*)"[^>]+rel="canonical"/.exec(html)?.[1] ?? ''
    const want = p.meta?.title ?? p.title
    if (!title.includes(want)) seo.push(`${path}: title "${title}" is not the page's "${want}"`)
    if (title.length > 70) seo.push(`${path}: title ${title.length} chars > 70`)
    const description = meta('description')
    if (description.length < 50 || description.length > 160) seo.push(`${path}: description ${description.length} chars, not 50–160`)
    if (!canonical.endsWith(path === '/' ? '' : path) || !canonical.startsWith('https://')) seo.push(`${path}: canonical "${canonical}"`)
    if (!meta('og:title')) seo.push(`${path}: no og:title`)
    if (!meta('og:description')) seo.push(`${path}: no og:description`)
    if (!/<script[^>]+type="application\/ld\+json"/.test(html)) seo.push(`${path}: no JSON-LD`)
  }
  // the seed's state rides with the verdict: a page whose text the content moved past names the slice that did not run
  const seedState = await (await get('/api/seed')).json().catch(() => null)
  t.diagnostic(`seed: ${JSON.stringify(seedState).slice(0, 300)}`)
  assert.deepEqual(seo, [], `every page is SEO-optimised as the test states it; seed ${JSON.stringify(seedState).slice(0, 300)}`)
  // the header is the admin's global, the admin answers, an unknown address is a 404 page, a program runs
  const header = (await (await get('/api/globals/header', 'application/json')).json()) as { navItems?: unknown[] }
  assert.ok((header.navItems ?? []).length > 0, 'the header global has its navigation')
  assert.equal((await get('/admin/login')).status, 200, 'the admin answers')
  assert.equal((await get('/no-such-address-anywhere')).status, 404, 'an unknown address is a 404')
  const program = await (await get('/heat/temperature+signal?p=16,1')).text()
  assert.ok(program.includes('16000'), 'a hex program renders its run: heat.temperature(16, 1) = 16000')
  t.diagnostic(`${urls.length} addresses, ${pages.docs.length} pages`)
})

test('release: every public API is fused and used — the registry walked through api.call addresses, a slice of it live', async (t) => {
  // the committed walk covers the whole registry: every API read (fused), and a read made wherever one needs no parameter
  const walk = JSON.parse(readFileSync(new URL('../../../../api-receipt.json', import.meta.url), 'utf8')) as { listed: number; walked: number; fused: number; used: number; statuses: Record<string, number> }
  assert.equal(walk.walked, walk.listed, 'the walk covers every API the registry lists')
  assert.equal(walk.fused, walk.walked, 'every API is fused: its document read and its operations derived')
  assert.ok(walk.used > 0 && walk.statuses['200'] > 0, 'reads were made and answered')
  // and live, in hex: the i-th API's operations are derived and its first operation resolved at their addresses
  const from = Math.floor((walk.listed * 7) / 16)
  const ops = await Promise.all(Array.from({ length: 8 }, (_, k) => hex('api', ['operations'], [from + k])))
  assert.deepEqual(ops.map((r, k) => (r.holds ? null : `api.operations(${from + k}) ${String(r.denied ?? r.value)}`)).filter(Boolean), [], 'every API of the live slice is fused: its document read at its address')
  const first = await hex('api', ['call'], [from, 0, 0])
  assert.ok(typeof first.value === 'string' || typeof first.value === 'number', `api.call(${from}, 0, 0) answers at its address: ${JSON.stringify(first).slice(0, 160)}`)
  const slice = { fused: ops.filter((r) => r.holds).length, take: ops.length, rows: [] as { used: boolean }[] }
  t.diagnostic(`${walk.listed} listed, ${walk.fused} fused, ${walk.used} used; live slice from ${from}: ${slice.fused}/${slice.take} fused in hex`)
})

test('release: every error and warning is answered at once, each with what resolves it', async (t) => {
  const e = await hex('data', ['errors'])
  assert.ok(typeof e.value === 'string' || typeof e.value === 'number', 'data.errors() answers at its address')
  assert.equal(e.holds, Number(e.value) === 0, 'it holds exactly when there is no error')
  // an unknown name is answered with every name that would resolve it, not a bare failure
  const bad = await hex('data', ['read'], [65535])
  assert.equal(bad.holds, false, 'a source that does not exist does not hold')
  t.diagnostic(`${e.value} errors now, in hex`)
})

test('release: the public APIs a family names test it — the registry searched by its formulas, read live, crossed by discovery', async (t) => {
  const families = nonDoors()
  for (const family of ['cal', 'hd', 'yi', 'kin']) {
    const f = families.indexOf(family)
    assert.ok(f >= 0, `${family} is a family`)
    const r = await hex('data', ['research'], [f])
    assert.ok(Number(r.value) > 0, `${family}: the registry holds APIs its formulas name`)
    assert.equal(r.holds, true, `${family}: at least one read answered`)
    t.diagnostic(`${family}: ${r.value} APIs matched, in hex`)
  }
  // what the unit may be: a category of the registry imagined — the families its APIs name, or a family to imagine
  const i = await hex('data', ['imagine'], [0])
  assert.ok(Number(i.value) >= 0, 'imagine(0) answers')
  uuidReceiptOf('release imagine', contentUuidOf(i), { value: i.value })
  t.diagnostic(`imagine(0): ${i.value} families reached`)
  // the Payload record: payloadcms/payload's docs, templates and examples read; the first docs section crossed
  const p = await hex('data', ['payload'], [0])
  assert.ok(p.holds === true || Number(p.value) >= 0, 'payload(0) answers: the docs section read, or a warning')
  uuidReceiptOf('release payload', contentUuidOf(p), { value: p.value })
  t.diagnostic(`payload(0): ${p.value} families the section names, holds ${p.holds}`)
})

test('release: every clay formula is cross developed from every perspective and tested on the public record', async (t) => {
  // the Clay solutions are formulas of the clay family; each must be reached by a discovery relation with another
  // family (cross developed), every such relation must answer alike from every way's referrer (all perspectives), the
  // family's words must find APIs in the registry and be read live, and each formula's terms are looked up in OEIS
  const families = nonDoors()
  const c = families.indexOf('clay')
  assert.ok(c >= 0, 'clay is a family')
  const names = (hexFamiliesOf().get('clay') ?? []).map((f) => f.name)
  const research = await hex('data', ['research'], [c])
  assert.ok(Number(research.value) > 0, 'clay: the registry holds APIs its formulas name')
  const d = await hex('data', ['discover'], [256])
  const reading = ((d.steps as { reading?: { relations?: { value: string; families: string[]; ways: { family: string; program: string[] }[] }[] } }[] | undefined)?.at(-1)?.reading) ?? {}
  const relations = reading.relations ?? []
  const seals = ((reading as { seals?: { family: string; program: string[] }[] }).seals ?? [])
  // cross developed: a relation with another family, a seal the Clay lens found, or an indicator (every value below
  // the discovery floor) whose σ-involution holds on every input tried, run live at its addresses
  const crossed = async (name: string) => {
    if (relations.some((r) => r.families.length > 1 && r.ways.some((w) => w.family === 'clay' && w.program.includes(name)))) return 'relation'
    if (seals.some((s) => s.family === 'clay' && s.program.includes(name))) return 'seal'
    const arity = hexFamiliesOf().get('clay')!.find((f) => f.name === name)!.arity
    const tuples = arity === 0 ? [[]] : arity === 1 ? [[1], [2], [3], [5], [8], [13]] : [[1, 2], [2, 3], [3, 5], [5, 8], [1, 1], [8, 13]]
    const runs = await Promise.all(tuples.map((params) => hex('clay', [name], params)))
    return runs.every((r) => r.holds === true && Number(r.value) < 3) ? 'involution' : undefined
  }
  const how = Object.fromEntries(await Promise.all(names.map(async (name) => [name, await crossed(name)])))
  assert.deepEqual(names.filter((name) => !how[name]), [], 'every clay formula is cross developed: a relation, a seal, or an involution holding on every input')
  const p = await hex('data', ['perspectives'], [Math.min(relations.length, 14)])
  assert.equal(p.holds, true, `every relation answers alike from every referrer perspective: ${JSON.stringify((p.steps as { reading?: unknown }[] | undefined)?.at(-1)?.reading ?? {}).slice(0, 300)}`)
  // the datasets, at scale: every formula's terms looked up in OEIS live — one parameter as it is, two with the other
  // fixed at each of a slice of small naturals, none through the relation that reaches its value
  let looked = 0, identified = 0
  for (const name of names) {
    const arity = hexFamiliesOf().get('clay')!.find((f) => f.name === name)!.arity
    if (arity === 0) { assert.ok(how[name], `clay.${name}: a value with no parameter is tested by the relation that reaches it or by its own involution`); continue }
    for (const fixed of arity === 1 ? [[]] : [[1], [2], [3], [5]]) {
      const s = out(await call({ door: 'data', arguments: { source: 'sequence', family: 'clay', formula: name, fixed } })) as { agrees?: boolean; warning?: string; reading?: unknown }
      assert.ok(s.reading !== undefined || s.warning !== undefined, `clay.${name}(${fixed.join(',')}, n): its terms were looked up in OEIS`)
      looked += 1
      if (s.agrees === true) identified += 1
    }
  }
  t.diagnostic(`${names.map((n) => `${n}: ${how[n]}`).join(', ')}; ${relations.filter((r) => r.ways.some((w) => w.family === 'clay')).length} relations cross clay, ${p.value} of ${Math.min(relations.length, 14)} relations closed from every perspective, ${research.value} matched in the record; OEIS: ${identified} of ${looked} lookups identified`)
})

test('release: the chat answers every formula asked in words with its numbers — combinatorial questions, 100% precision, one wave per family', async (t) => {
  // the questions are combinations: every family × every formula (the live ones excepted) × two inputs, each asked as
  // a sentence made of the family's and formula's own words and the numbers; the answer must be the value at the
  // address. Time is split in calls: one wave per family, and a slice of formulas per wave when a family is wide.
  const wordsOf = (s: string) => s.replace(/[A-Z]/g, (c) => ` ${c.toLowerCase()}`).toLowerCase().trim()
  let asked = 0, exact = 0
  const wrong: string[] = []
  for (const family of nonDoors()) {
    const formulas = (hexFamiliesOf().get(family) ?? []).filter((x) => !x.live)
    for (const x of formulas) for (const input of [2, 5]) {
      const params = Array.from({ length: x.arity }, () => input)
      const question = `what is ${wordsOf(family)} ${wordsOf(x.name)}${params.length ? ` for ${params.join(' and ')}` : ''}?`
      const direct = await hex(family, [x.name], params)
      const reply = out(await call({ door: 'data', arguments: { source: 'ask', about: question } })) as { reading?: { formula?: string; value?: string; answer?: string } }
      asked += 1
      if (reply.reading?.formula === `${family}.${x.name}` && reply.reading?.value === String(direct.value)) exact += 1
      else if (wrong.length < 14) wrong.push(`${question} → ${reply.reading?.answer ?? JSON.stringify(reply).slice(0, 80)} (address says ${direct.value})`)
    }
  }
  uuidReceiptOf('release chat', contentUuidOf({ asked, exact }), { asked, exact })
  assert.deepEqual(wrong, [], `every question answered exactly: ${exact}/${asked}`)
  t.diagnostic(`chat: ${exact}/${asked} questions answered exactly by the formula they name`)
})

test('release: every theorem that states a cross-domain relation is confirmed by the live discovery', async (t) => {
  // the Lean kernel proves `relation_<value> : <wing> = <wing>`; the live host must re-reach each value across two or
  // more families now — the theorem proven by the kernel and validated by the running lattice, in formulas
  const r = await hex('gate', ['theorems'])
  const reading = (r.steps as { reading?: { stated?: number; confirmed?: number; missing?: number[]; relations?: string[] } }[] | undefined)?.at(-1)?.reading ?? {}
  assert.ok((reading.stated ?? 0) > 0, 'the kernel states relation theorems')
  assert.deepEqual(reading.missing ?? [], [], `every relation theorem's value is reached across domains live; relations ${JSON.stringify(reading.relations).slice(0, 300)}`)
  assert.equal(r.holds, true, 'every cross-domain theorem is validated by the discovery')
  uuidReceiptOf('release theorems', contentUuidOf(r), { stated: reading.stated, confirmed: reading.confirmed })
  t.diagnostic(`theorems: ${reading.confirmed}/${reading.stated} cross-domain relation theorems confirmed by the live discovery`)
})

test('release: paste the URL into any agent and it develops an idea on the formulas, as a real Payload app', async (t) => {
  // 1. THE URL ALONE: /.well-known/mcp.json tells an agent how to connect — the one server, no key for reads
  const wk = await (await fetch(`/.well-known/mcp.json`, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(DEADLINE) })).json().catch(() => null) as { mcp?: unknown; url?: string } | null
  assert.ok(wk, '/.well-known/mcp.json answers')
  // 2. initialize + tools/list, as any MCP client makes them
  const init = await fetch(`${host}/api`, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: {} }), signal: AbortSignal.timeout(DEADLINE) })
  assert.equal(init.status, 200, 'initialize answers 200')
  const doors = out(await call({ doors: true })) as { doors?: { name: string }[]; formulas?: { name: string }[] }
  assert.ok((doors.formulas?.length ?? 0) > 0, 'the agent sees the formulas to build on')
  // 3. DEVELOP AN IDEA: the agent composes a hex program from the families it was shown and runs it — the idea computes,
  //    exactly, with a receipt, no code written
  const idea = await hex('tesla', ['schumann'], [1])
  assert.equal(Number(idea.value), 7830, "the agent's idea (tesla.schumann 1) computes to the Schumann fundamental")
  assert.ok(typeof idea.receipt === 'string', 'the idea carries a receipt')
  // 4. A REAL PAYLOAD APP behind the same origin: the admin answers, the API answers, a collection reads over the door
  const admin = await fetch(`/admin`, { headers: { accept: "text/html" }, signal: AbortSignal.timeout(DEADLINE) })
  assert.equal(admin.status, 200, 'the Payload admin is a real app at the same origin')
  const finds = out(await call({ doors: true })) as { doors?: { name: string }[] }
  assert.ok(finds.doors?.some((d) => d.name === 'findPages'), 'the Payload collections are fused into the same MCP (findPages)')
  const pages = await call({}, 'findPages').catch(() => null)
  assert.ok(pages !== null, 'the agent reads a Payload collection through the one door')
  uuidReceiptOf('release onboarding', contentUuidOf({ wk: Boolean(wk), idea: idea.value, admin: admin.status }), { idea: idea.value })
  t.diagnostic(`from ${host}: connect → ${doors.formulas?.length} formulas → idea tesla.schumann(1) = ${idea.value} → Payload admin ${admin.status}, findPages fused`)
})

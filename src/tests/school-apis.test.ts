// school-apis — a source that could not be called is not in the registry.
//
// Every readable survey of "EU school APIs" is wrong in the same place: it lists an endpoint nobody called. This
// registry records what each source ACTUALLY answered, and names the ones that did not answer at all in ABSENT
// rather than quietly omitting them. An absence that is written down can be retried; one that is not looks like a
// source that was never considered.
//
// These assertions are PURE — no network. A test that needs the internet fails for reasons that are not the code's.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { schoolApiRegistry, schoolApiFetch, probeSchoolApis, splitCsvLine, pickLang, SCHOOL_APIS, GISCO_VINTAGE,
  type SchoolApiAnswer } from '../school-apis.js'

test('every registered source declares what it serves and how it answered', () => {
  const r = schoolApiRegistry()
  assert.ok(r.count > 0)
  assert.equal(r.sources.length, r.count)
  for (const s of r.sources) {
    assert.ok(s.id && s.name && s.base, `${s.id}: incomplete declaration`)
    assert.ok(Array.isArray(s.serves) && s.serves.length > 0, `${s.id}: serves nothing`)
    assert.ok(s.base.startsWith('https://'), `${s.id}: not an https source`)
  }
})

// ── THE POINT. An unreachable source is NAMED, not dropped.
test('sources that could not be called are recorded in ABSENT, by name', () => {
  const r = schoolApiRegistry()
  assert.ok(Array.isArray(r.absent), 'absent must exist even when empty — silence is not evidence of reachability')
  for (const a of r.absent) assert.ok(String(a).length > 0, 'an absence must carry what it was')
})

test('the receipt is deterministic and MOVES with the registry', () => {
  assert.equal(schoolApiRegistry().receipt, schoolApiRegistry().receipt)
  assert.ok(schoolApiRegistry().receipt.length > 0)
})

test('the GISCO vintage is pinned — a directory without a vintage cannot be rechecked', () => {
  assert.ok(String(GISCO_VINTAGE).length > 0)
})

test('no two sources share an id', () => {
  const ids = SCHOOL_APIS.map((s) => s.id)
  assert.equal(new Set(ids).size, ids.length)
})

// ── THE PAIRING. Education and jobs are joined through a PUBLISHED relation, so the join is named, not guessed.
test('ESCO is declared as the bridge, and the jobs side is reachable from the same door', () => {
  const esco = SCHOOL_APIS.find((s) => s.id === 'esco')
  assert.ok(esco, 'the taxonomy that relates skills to occupations must be a wired source')
  assert.match(esco.honest, /BRIDGE/, 'the source that pairs education to jobs must say so where it is declared')
  const eurostat = SCHOOL_APIS.find((s) => s.id === 'eurostat')
  assert.ok(eurostat?.serves.some((x) => x.includes('vacanc')), 'the jobs side rides the same Eurostat door')
})

// EURES is the whole reason ABSENT exists: it is the one every survey lists and nobody calls.
test('EURES is named in ABSENT with what stands in its place', () => {
  const eures = schoolApiRegistry().absent.find((a) => a.source.includes('EURES'))
  assert.ok(eures, 'a probed-and-refused source must be recorded, not dropped')
  assert.ok(eures.why.includes('404') || eures.why.includes('403'), 'the absence carries what the probe actually got')
  assert.ok(eures.instead.length > 0, 'an absence that names no alternative lies by omission')
})

test('an unknown source is refused BY NAME, never answered with an empty result', async () => {
  await assert.rejects(() => schoolApiFetch('eures'), /unknown source "eures"/)
  await assert.rejects(() => schoolApiFetch('esco'), /needs \{text\}/)
  await assert.rejects(() => schoolApiFetch('gisco'), /needs \{country\}/)
  await assert.rejects(() => schoolApiFetch('oeapi'), /SERVED, not fetched/)
})

// The GISCO rows carry quoted names with embedded commas and doubled quotes — a naive split truncates schools.
test('the CSV split survives quoted commas and doubled quotes', () => {
  assert.deepEqual(splitCsvLine('a,"b,c",d'), ['a', 'b,c', 'd'])
  assert.deepEqual(splitCsvLine('BG_1,"УЧИЛИЩЕ ""АНГЕЛ УЗУНОВ"" I-XII",41.9'), ['BG_1', 'УЧИЛИЩЕ "АНГЕЛ УЗУНОВ" I-XII', '41.9'])
  assert.deepEqual(splitCsvLine('x,,y'), ['x', '', 'y'])
})

// ── THE HOMOGRAPH RULE, and the surface it cost. The finder for the gap this module shipped with: a search returns
// the query's letters, so a fragment hit carries no information. z9-ring is a ring of sealed arithmetic, never a cast
// concrete one. The rule now guards the PAIRING's first hop; the bulk ledger-to-ESCO map it was written for was
// measured, found to produce confident wrong rows that no string rule could reach, and REMOVED — recorded in ABSENT
// rather than deleted in silence, because a surface that vanishes without a reason looks like one nobody thought of.
test('a fragment hit is a homograph, not a mapping', () => {
  const keep: [string, string][] = [['quantum', 'quantum mechanics'], ['astronomy', 'astronomy'],
    ['martial-arts', 'practice martial arts'], ['optimisation', 'conduct search engine optimisation']]
  const drop: [string, string][] = [['z9-ring', 'cast concrete rings'], ['z7-rosette', 'finish costumes'],
    ['coins', 'count money'], ['cipher', 'interpret religious texts'], ['science-pairs', 'pair beer with food']]
  const norm = (x: string): string => ' ' + x.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' '
  const whole = (skill: string, title: string): boolean => norm(title).includes(norm(skill))
  for (const [skill, title] of keep) assert.ok(whole(skill, title), `the whole name is there: ${skill} → ${title}`)
  for (const [skill, title] of drop) assert.ok(!whole(skill, title), `a homograph must not map: ${skill} → ${title}`)
})

test('the removed bulk mapping is recorded as an absence, with what replaced it', () => {
  const gone = schoolApiRegistry().absent.find((a) => a.source.includes('automatic mapping'))
  assert.ok(gone, 'a surface that was built and withdrawn must say so — silence reads as an oversight')
  assert.match(gone.instead, /uuidna_education_jobs/, 'a withdrawal that names no replacement lies by omission')
})

// ── A SOURCE THAT ANSWERS IS NOT A SOURCE THAT SERVES. SEDIA returns 200 on the path nobody needs.
test('a source wired on the responding path rather than the serving path is refused, and says which', () => {
  const sedia = schoolApiRegistry().absent.find((a) => a.source.includes('SEDIA'))
  assert.ok(sedia, 'a probed source rejected for what it returns must be recorded, not silently skipped')
  assert.match(sedia.why, /ANSWERS/, 'the reason must be that it answers uselessly, not that it is unreachable')
  assert.match(sedia.instead, /cordis/, 'a rejection that names no replacement lies by omission')
})

test('each fetched source is refused by name when its own required argument is missing', async () => {
  await assert.rejects(() => schoolApiFetch('data-europa'), /needs \{text\}/)
  await assert.rejects(() => schoolApiFetch('cordis'), /needs \{text\}/)
  await assert.rejects(() => schoolApiFetch('sedia'), /unknown source "sedia"/)
})

// The EU publishes titles per language; dropping a row for not being English would lose it entirely.
test('a multilingual title prefers English and never falls through to nothing', () => {
  assert.equal(pickLang({ bg: 'училище', en: 'school' }), 'school')
  assert.equal(pickLang({ lav: 'skola', bul: 'училище' }), 'skola', 'no English: keep the row, take what exists')
  assert.equal(pickLang({ MUL: ['multi'] }), 'multi', 'TED wraps its values in arrays')
  assert.equal(pickLang('plain'), 'plain')
  assert.equal(pickLang(undefined), '')
})

// ── THE HEARTBEAT, EXERCISED OFFLINE. await-live.ts already argued the shape: a probe written inside a workflow is
// a probe no test can reach. The call is INJECTED, so every path a live source can take — answers, returns nothing,
// REFUSES the query, throws — is asserted here with no network at all. This is the finder the `declined` flag was
// missing: a refusal and an empty world are different facts, and the heartbeat must never render them the same.
const fake = (by: Record<string, Partial<SchoolApiAnswer> | 'throw'>) =>
  async (source: string): Promise<SchoolApiAnswer> => {
    const r = by[source]
    if (r === 'throw') throw new Error('connect ECONNREFUSED')
    return { source, query: {}, url: '', count: 0, results: [], truncated: false, receipt: '', honest: '', ...(r ?? {}) }
  }

test('every source declares the known-good query that proves it still answers', () => {
  for (const s of SCHOOL_APIS.filter((x) => x.direction === 'fetched'))
    assert.ok(s.probe, `${s.id}: a source with no way to check it cannot be told from a dead one`)
})

test('the heartbeat separates answering, empty, REFUSED and thrown — and never raises', async () => {
  const h = await probeSchoolApis(fake({
    esco: { count: 3 }, eurostat: { count: 0 },
    gisco: { count: 0, declined: true }, 'data-europa': 'throw',
    cordis: { count: 1 }, ted: { count: 2 },
  }))
  const by = Object.fromEntries(h.probes.map((p) => [p.id, p]))
  assert.equal(by.esco.ok, true)
  assert.equal(by.eurostat.ok, false, 'zero rows for a known-good query is a source that moved')
  assert.equal(by.gisco.declined, true, 'a REFUSAL must not be reported as an empty world')
  assert.match(by.gisco.note, /REFUSED/)
  assert.equal(by['data-europa'].ok, false)
  assert.match(by['data-europa'].note, /threw/, 'an unreachable source is named, not swallowed')
  assert.equal(h.answering, 3)
  assert.equal(h.dark.length, 3)
})

test('the heartbeat receipt moves when a source goes dark, and is stable when nothing changes', async () => {
  const all = { esco: { count: 1 }, eurostat: { count: 1 }, gisco: { count: 1 },
    'data-europa': { count: 1 }, cordis: { count: 1 }, ted: { count: 1 } }
  const a = await probeSchoolApis(fake(all))
  const b = await probeSchoolApis(fake(all))
  assert.equal(a.receipt, b.receipt, 'same liveness, same receipt — recomputable by anyone')
  const c = await probeSchoolApis(fake({ ...all, ted: { count: 0 } }))
  assert.notEqual(a.receipt, c.receipt, 'a source going dark must MOVE the receipt or the silence is invisible')
})

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
import { schoolApiRegistry, schoolApiFetch, splitCsvLine, SCHOOL_APIS, GISCO_VINTAGE } from '../school-apis.js'

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

// ── THE HOMOGRAPH RULE. The finder for the gap this module shipped with: a search returns the query's letters, so
// a fragment hit carries no information. z9-ring is a ring of sealed arithmetic, never a cast concrete one.
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

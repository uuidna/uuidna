import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  JOURNAL_DOORS, JOURNAL_DOORS_ABSENT, doorById, journalCoverage, journalSearch, journalSweep,
  renderJournalCoverage, renderJournalSweep,
} from './index.js'
import { theorems } from '../../../theorems/index.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

test('every declared door is distinct, https, and names the host its base belongs to', () => {
  assert.equal(new Set(JOURNAL_DOORS.map((d) => d.id)).size, JOURNAL_DOORS.length, 'ids are the address of a door')
  for (const d of JOURNAL_DOORS) {
    assert.ok(d.base.startsWith('https://'), `${d.id} must be asked over TLS`)
    assert.equal(new URL(d.base).host, d.host, `${d.id}: the declared host must BE the base's host`)
    assert.ok(d.honest.length > 40, `${d.id} must say what it serves`)
    assert.equal(doorById(d.id), d)
  }
  assert.equal(doorById('nope'), null)
})

test('the two levels are kept apart — journal-level and article-level doors both exist', () => {
  const c = journalCoverage()
  assert.ok(c.journalLevelDoors.length >= 3, 'which journals exist: DOAJ, Crossref /journals, OpenAlex /sources')
  assert.ok(c.articleLevelDoors.length >= 6, 'what was published')
  assert.equal(c.journalLevelDoors.length + c.articleLevelDoors.length + c.lookupDoors.length, c.doors,
    'every door is in exactly one level — a door in two would be counted twice')
})

test('coverage breadth rests ONLY on operators’ own all-subject scope, and depth is labelled editorial', () => {
  const c = journalCoverage()
  const declaredAll = JOURNAL_DOORS.filter((d) => d.subjects === 'all').map((d) => d.id)
  assert.deepEqual(c.allSubjectDoors, declaredAll, 'breadth must be read off the declared scope, not chosen here')
  assert.ok(c.allSubjectDoors.length >= 1, 'without one all-subject door there is no breadth claim to make')
  assert.match(c.honest, /EDITORIAL/, 'the depth map must be labelled where the answer is read')
  // the skill census is the LEDGER'S, not a list retyped here
  const skills = new Set(theorems().map((t) => t.skill))
  assert.equal(c.skills, skills.size)
  assert.equal(c.withSpecialistDoor.length + c.breadthOnly.length, c.skills,
    'a skill has a specialist door or it does not — the two classes must partition the ledger’s skills')
  for (const w of c.withSpecialistDoor) {
    assert.ok(skills.has(w.skill), `${w.skill} is not a skill in the ledger — a depth map may not invent one`)
    for (const id of w.doors) assert.ok(doorById(id), `${w.skill} maps to undeclared door ${id}`)
  }
  // NEGATIVE CONTROL: by construction the depth table holds specialists only — an all-subject door listed
  // there would count the same door twice, once as breadth and once as depth
  for (const w of c.withSpecialistDoor)
    for (const id of w.doors)
      assert.notEqual(doorById(id)!.subjects, 'all', `${id} declares every subject; it is breadth, not depth`)
})

test('every absent door is named with a reason, and is not also wired', () => {
  assert.ok(JOURNAL_DOORS_ABSENT.length >= 3)
  for (const a of JOURNAL_DOORS_ABSENT) {
    assert.ok(a.why.length > 30, `${a.id} must say WHY it is absent`)
    assert.equal(JOURNAL_DOORS.some((d) => d.host === a.id), false, `${a.id} is declared absent AND wired`)
  }
})

test('an undeclared door declines by name rather than throwing', async () => {
  const r = await journalSearch('not-a-door', 'quantum', 2)
  assert.equal(r.declined, true)
  assert.match(r.note, /no declared door "not-a-door"/)
  assert.deepEqual(r.rows, [])
})

test('renderJournalSweep names the fan-out arithmetic, and coverage names its receipt door', () => {
  const s = renderJournalSweep({
    definition: 'uuidnaOS·journals·sweep', query: 'q', asked: 10, answering: 9, declined: ['plos: responded 503'],
    journalLevel: [], articleLevel: [], rows: 0,
    concurrency: { doorsAskedAtOnce: 10, deadlinesSerial: 10, deadlinesConcurrent: 1, magnitude: 10 },
    receipt: '00000000-0000-8000-8000-000000000000', handle: '00000000', hexbits: [],
    doorUrl: 'https://uuidna.com/00000000', honest: 'x',
  })
  assert.match(s, /^JOURNALS 9\/10 answering/)
  assert.match(s, /fan-out 10 doors at once — one deadline, not 10 \(×10\)/)
  assert.match(renderJournalCoverage(journalCoverage()), /^JOURNAL DOORS \d+ · journal-level/)
})

// uuidna_journals is the wire name. This reaches every door at once; the invariant is that each either answers
// with addressed rows bounded by its own total, or declines with a reason. A door that answers nothing at all is
// the only failure, and the fan-out must not lose a door on the way.
test('uuidna_journals — the sweep asks every search door concurrently and each answers or declines', async () => {
  const s = await journalSweep('quantum entanglement', { limit: 3 })
  assert.equal(s.asked, JOURNAL_DOORS.filter((d) => d.level !== 'lookup').length, 'the lookup door is not a search door')
  assert.equal(s.journalLevel.length + s.articleLevel.length, s.asked, 'no door may vanish in the fan-out')
  assert.equal(s.concurrency.doorsAskedAtOnce, s.asked)
  assert.equal(s.concurrency.magnitude, s.asked, 'the magnitude IS the fan-out width — one deadline instead of n')
  // THE THRESHOLD MEASURED SOMEONE ELSE'S RATE LIMIT. This asserted `answering >= 6`, which fails when several
  // polite-pool doors 429 at once — measured from the hosted edge (openalex-sources: responded 429) and reachable
  // locally too after repeated sweeps. A door that says NO with a reason is this port working; a suite that goes
  // red because OpenAlex is busy is measuring the weather. So the invariant is that every door ACCOUNTS for
  // itself and at least one answers — the fan-out, the limits and the addressing are asserted below and depend on
  // nothing outside this tree.
  assert.ok(s.answering >= 1, `no door answered at all — that is a network outage, not a rate limit: ${s.declined.join(' · ')}`)
  assert.equal(s.answering + s.declined.length, s.asked, 'every door either answered or declined with a reason')
  for (const r of [...s.journalLevel, ...s.articleLevel]) {
    if (r.declined) { assert.ok(r.note.length > 0, `${r.door} must say why`); continue }
    assert.ok(r.rows.length <= 3, `${r.door} must honour the limit`)
    assert.ok(r.rows.length <= r.total || r.total === 0, `${r.door}: a page cannot exceed what matches`)
    for (const x of r.rows) {
      assert.match(x.address, UUID)
      assert.equal(x.door, r.door)
      assert.ok(x.id.length > 0, `${r.door}: a row with no identifier is not citable`)
    }
  }
  assert.equal(s.rows, [...s.journalLevel, ...s.articleLevel].reduce((n, r) => n + r.rows.length, 0))
  // NEGATIVE CONTROL: a different query must not land on the same receipt
  const other = await journalSweep('quantum entanglement', { limit: 3, ids: ['dblp'] })
  assert.notEqual(other.receipt, s.receipt)
})

test('uuidna_journals — the bioRxiv door RESOLVES a DOI it is given, and empties on a phrase', async () => {
  const hit = await journalSearch('biorxiv', '10.1101/339747', 2)
  if (hit.declined) { assert.ok(hit.note.length > 0); return }
  assert.equal(hit.level, 'lookup')
  assert.ok(hit.rows.length >= 1, 'a named preprint DOI must resolve')
  assert.match(hit.rows[0]!.id, /^10\.1101\//)
  // a resolver given a phrase has nothing to resolve — an empty page, not an invented row
  const phrase = await journalSearch('biorxiv', 'quantum entanglement', 2)
  assert.deepEqual(phrase.rows, [])
})

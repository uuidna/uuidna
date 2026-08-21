// school — the eleven sections, computed rather than authored.
//
// The accreditation test is the one that matters. A school page implying credentials it does not hold would be the
// one overclaim this ledger could not survive, because everything else it publishes rests on its claims being
// checkable. So the position is asserted here, not left to a comment somebody may later soften.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { school, courses, levels, levelOf, bandOf } from '../school.js'
import { theorems, publications, oeapiCourses, oeapiProfile } from '../index.js'

test('all eleven sections are present, each with a body', () => {
  const s = school()
  assert.equal(s.sections.length, 11)
  for (const sec of s.sections) assert.ok(sec.body.length > 0, `${sec.id} is empty`)
  assert.equal(new Set(s.sections.map((x) => x.id)).size, 11, 'no duplicate section ids')
})

// ── THE BINDING CONSTRAINT.
test('accreditation states plainly that uuidna is NOT accredited', () => {
  const body = school().sections.find((s) => s.id === 'accreditation')!.body.join(' ')
  assert.match(body, /NOT an accredited institution/)
  assert.match(body, /no diploma, degree, credit or recognised qualification/)
  assert.ok(!/\baccredited by\b|\bcertified by\b|\bapproved by\b/i.test(body),
    'no phrasing may imply an accrediting body')
})

test('enrolment collects nothing and costs nothing', () => {
  const all = school().sections
  assert.match(all.find((s) => s.id === 'enrollment')!.body.join(' '), /No personal data is collected/)
  assert.match(all.find((s) => s.id === 'tuition')!.body.join(' '), /Free/)
})

// ── COMPUTED, NOT AUTHORED. A course is a wing; the lesson count is the theorems in it.
test('every wing is a course, and lessons sum to the ledger', () => {
  const cs = courses()
  const T = theorems()
  assert.equal(cs.length, new Set(T.map((t) => t.file)).size, 'one course per proof wing')
  assert.equal(cs.reduce((n, c) => n + c.lessons, 0), T.length, 'no lesson counted twice or lost')
  assert.equal(new Set(cs.map((c) => c.code)).size, cs.length, 'course codes must not collide')
})

// ── PROSE REPLACED BY READS. Eight of eleven sections were authored strings restating fields that already exist
// in package.json and CHANGELOG.md — a retyped field is a claim that cannot stay true, the same defect as a ledger
// count frozen into a comment. Only positions that are NOT measurements may stay authored.
test('most sections are computed, and the authored ones are positions rather than facts', () => {
  const s = school()
  const authored = s.sections.filter((x) => !x.computed).map((x) => x.id).sort()
  assert.deepEqual(authored, ['accreditation', 'enrollment', 'faq'],
    'a section may stay authored only if it states a position; anything readable from a source must be read')
  assert.ok(s.sections.filter((x) => x.computed).length >= 8)
})

test('the computed sections carry real values, not placeholders', () => {
  const body = (id: string): string => school().sections.find((x) => x.id === id)!.body.join(' ')
  assert.match(body('tuition'), /CC-BY-NC-ND/, 'the licence is read from the manifest')
  assert.match(body('technology'), /Node: >=/, 'the engine requirement is read, not remembered')
  assert.match(body('contact'), /github\.com/, 'contact points are read from the manifest')
  assert.match(body('calendar'), /Releases to date: \d+/, 'releases ARE the calendar')
  for (const id of ['tuition', 'technology', 'contact', 'calendar'])
    assert.ok(!/undefined|: $|NaN/.test(body(id)), `${id} has an unresolved field`)
})

test('the catalogue MOVES with the ledger — it is a reading, not a promise', () => {
  const before = school().receipt
  assert.equal(before, school().receipt, 'deterministic')
  assert.ok(before.length > 0)
})

// ── GRADE LEVELS. Every test below was written to FAIL FIRST and then confirmed red against a real mutation of
// src/school.ts, because a check that cannot fail is void, not passed. The mutation each one catches is named on
// the test, so a later reader can re-run the experiment instead of trusting this comment.

// MUTATION CAUGHT: change `decade * 10 <= steps` to `<` (levelOf(100) drops to 10); or drop the `< 1` guard
// (levelOf(0) becomes 1, so an unmeasured course is silently graded "beginner").
test('a level is the DECADE of a measured cost, and its boundaries are exact', () => {
  assert.equal(levelOf(1), 1)
  assert.equal(levelOf(9), 1)
  assert.equal(levelOf(10), 10)
  assert.equal(levelOf(99), 10)
  assert.equal(levelOf(100), 100)
  assert.equal(levelOf(97467), 10000)
  assert.notEqual(levelOf(99), levelOf(100), 'the decade boundary must SEPARATE — a level that never changes is not a level')
  // an absent measure is not a low one: UNVERIFIED means undecided here, never "beginner by default"
  for (const nothing of [0, -1, 0.5, Number.NaN]) assert.equal(levelOf(nothing), 0, `${nothing} is not a measured cost`)
  assert.equal(bandOf(0), 'unmeasured')
  assert.equal(bandOf(10), '10–99 steps')
  assert.notEqual(bandOf(10), bandOf(100), 'each band names its own span')
})

// MUTATION CAUGHT: rank the courses and slice them into percentile bands instead. Every assertion below still
// passes under a percentile scheme EXCEPT this one, because a percentile level is a fact about the CATALOGUE and
// re-deriving it over any subset moves it. This is the property that makes the decade derivation defensible.
test('a level is a property of the course, not of the catalogue — it survives the catalogue changing', () => {
  const cs = courses()
  for (const c of cs) assert.equal(c.level, levelOf(c.steps), `${c.code}: its level is read from its own measured cost, nothing else`)
  // re-grading any sub-catalogue reproduces the SAME level for every course in it
  for (const subset of [cs.slice(0, 5), cs.slice(-5), cs.filter((c) => c.lessons > 20)])
    for (const c of subset) assert.equal(levelOf(c.steps), c.level, `${c.code} changed level when the catalogue did`)
})

// MUTATION CAUGHT: sort by lesson count (the previous ordering) or leave the sort out — ranks stop tracking cost.
// MUTATION CAUGHT: give unmeasured courses level 1 instead of 0 — they sort to the front and open the school.
test('the reading order is total, starts at the cheapest course, and never sorts an absence to the front', () => {
  const cs = courses()
  assert.deepEqual(cs.map((c) => c.rank), cs.map((_, i) => i + 1), 'rank IS the position — 1..n, no gaps, no ties')
  const measured = cs.filter((c) => c.level > 0)
  for (let i = 1; i < measured.length; i++)
    assert.ok(measured[i].level >= measured[i - 1].level, 'levels never decrease along the reading order')
  for (const c of cs) {
    if (c.level === 0) assert.ok(c.rank > measured.length, `${c.code} is unmeasured and must not sort ahead of a measured course`)
    else assert.ok(c.steps >= c.entry, `${c.code}: the median cannot be cheaper than the cheapest lesson`)
  }
  assert.equal(cs[0].rank, 1)
  assert.ok(cs[0].level > 0 && cs[0].level <= cs[cs.length - 1].level, 'the school opens on a measured course')
})

// MUTATION CAUGHT: replace the lower median with an average — the value stops being a cost the kernel ever paid,
// and stops being an integer. MUTATION CAUGHT: `cost[t.address] ?? 1` instead of `?? 0` — an unmeasured lesson
// starts counting as a one-step lesson and drags the median down.
test('a course cost is a cost the kernel actually paid — an element of its own roll, in integers', () => {
  for (const c of courses()) {
    assert.ok(Number.isInteger(c.steps) && Number.isInteger(c.entry), `${c.code}: costs are integers, never an average`)
    assert.equal(c.roll.length, c.lessons, `${c.code}: the roll IS the course`)
    for (let i = 1; i < c.roll.length; i++)
      assert.ok(c.roll[i].steps >= c.roll[i - 1].steps, `${c.code}: the roll is ordered cheapest first — that is where to start`)
    if (c.level === 0) { assert.equal(c.steps, 0); continue }
    assert.ok(c.roll.some((l) => l.steps === c.steps), `${c.code}: ${c.steps} is not a cost any of its lessons paid`)
    assert.equal(c.entry, c.roll.find((l) => l.steps > 0)!.steps, `${c.code}: entry is the cheapest MEASURED lesson`)
  }
})

// THE BRANCH LIVE DATA CANNOT REACH. The heartbeats currently cover the ledger exactly, so no course is unmeasured
// and every "unmeasured" line in school.ts is unreachable from the real ledger — a check that cannot fail. Feeding
// courses() its cost map directly reaches it, and these two mutations SURVIVED the whole suite until it did.
// MUTATION CAUGHT: `cost[t.address] ?? 1` instead of `?? 0` — nothing measured becomes everything level 1.
// MUTATION CAUGHT: `unmeasuredLast` returning a constant — an absence sorts to the FRONT and opens the school.
test('nothing measured is nothing graded — an absent measure is never a low one', () => {
  const blind = courses({})
  assert.ok(blind.length > 0, 'the courses still exist; only their grading is undecided')
  for (const c of blind) {
    assert.equal(c.level, 0, `${c.code} was graded with nothing to grade it by`)
    assert.equal(c.steps, 0)
    assert.equal(c.entry, 0)
    assert.equal(c.band, 'unmeasured')
  }
  assert.deepEqual(levels({}).map((l) => l.band), ['unmeasured'], 'one honest band, not a fabricated ladder')

  // measure ONE course and the unmeasured rest must fall in behind it, never ahead of it
  const one = courses()[0]
  const partial = Object.fromEntries(theorems().filter((t) => t.file === one.wing)
    .map((t) => [t.address, one.roll.find((l) => l.key === t.key)!.steps]))
  const mixed = courses(partial)
  assert.equal(mixed[0].wing, one.wing, 'the only measured course must lead the reading order')
  assert.ok(mixed[0].level > 0)
  for (const c of mixed.slice(1)) assert.equal(c.level, 0, `${c.code} is unmeasured and must not be graded`)
})

// MUTATION CAUGHT: hardcode a four-rung ladder (foundations/intermediate/advanced/mastery — what the retired
// quantum-school.ts did). An authored ladder advertises rungs no course fills and cannot grow a new one.
test('the levels are the levels PRESENT — the school advertises no grade it cannot fill', () => {
  const cs = courses(), ls = levels()
  assert.deepEqual(ls.map((l) => l.level), [...new Set(cs.map((c) => c.level))].sort((a, b) => (a === 0 ? 1 : 0) - (b === 0 ? 1 : 0) || a - b))
  assert.ok(ls.length > 1, 'a single level is not a grading — the derivation must discriminate')
  for (const l of ls) {
    assert.ok(l.courses > 0, `level ${l.level} is advertised with no course in it`)
    assert.equal(l.band, bandOf(l.level))
    assert.equal(l.courses, cs.filter((c) => c.level === l.level).length)
    assert.equal(l.lessons, cs.filter((c) => c.level === l.level).reduce((n, c) => n + c.lessons, 0))
    assert.ok(l.opens.startsWith(cs.find((c) => c.level === l.level)!.code), `level ${l.level} must open at its first course`)
  }
  assert.equal(ls.reduce((n, l) => n + l.lessons, 0), theorems().length, 'every lesson sits at exactly one level')
})

// ── THE GRADING REACHES THE INTEROPERABILITY SURFACE, WITHOUT BECOMING A QUALIFICATION. The Open Education API
// has a `Course.level` field whose name fits the school's grading perfectly and whose MEANING is the qualification
// ladder (bachelor, master, doctoral). uuidna awards none of those, so the measured level rides in `ext` and the
// spec's own field is refused by name.
// MUTATION CAUGHT: emit the derived level as `level` — the field-name audit still passes, this test does not.
// MUTATION CAUGHT: drop `ext` from oeapiCourses — the school grades, and the API surface never hears about it.
test('OEAPI serves the measured level in ext and REFUSES the spec field that would imply a degree', () => {
  const graded = new Map(courses().map((c) => [c.wing, c]))
  const cs = oeapiCourses()
  assert.ok(cs.length > 0)
  for (const c of cs) {
    assert.equal('level' in c, false, `${c.abbreviation}: Course.level means a QUALIFICATION level — uuidna confers none`)
    assert.equal('levelOfQualification' in c, false)
    assert.equal('qualificationAwarded' in c, false)
    assert.ok(c.ext && typeof c.ext.level === 'number', `${c.abbreviation}: the measured grading must be served`)
    assert.equal(c.ext.band, bandOf(c.ext.level), `${c.abbreviation}: the band names its own decade`)
  }
  // and it is the SAME grading the school page shows — one derivation, two surfaces, never two answers
  const wingOf = new Map(publications().map((p) => [p.slug, p.file]))
  let checked = 0
  for (const c of cs) {
    const g = graded.get(wingOf.get(c.abbreviation) ?? '')
    if (!g) continue
    assert.equal(c.ext.level, g.level, `${c.abbreviation}: the API and the page must not grade the same wing differently`)
    assert.equal(c.ext.decideSteps, g.steps)
    assert.equal(c.ext.rank, g.rank)
    checked++
  }
  assert.ok(checked > 0, 'no course could be matched back to its wing — the join is broken, not the grading')
  const profile = oeapiProfile()
  const refused = profile.absentFields.find((f) => f.field === 'Course.level')
  assert.ok(refused, 'a field refused silently is a field forgotten — the refusal is part of the projection')
  assert.match(refused!.why, /qualification/i)
  assert.ok(refused!.why.length > 40)
})

// MUTATION CAUGHT: leave the levels-and-courses section on its old body (a bare list of eight course codes).
// The section is what a reader actually sees, so the derivation has to reach it, not just exist in the module.
test('the levels section RENDERS the derivation — the measure reaches the reader', () => {
  const s = school()
  const body = s.sections.find((x) => x.id === 'levels-courses')!.body.join('\n')
  assert.match(body, /Levels present: \d+/)
  assert.match(body, /heartbeats/, 'the section names the source of its measure')
  for (const l of s.levels) assert.match(body, new RegExp(`Level ${l.level} \\(${l.band.replace('–', '.')}\\)`), `level ${l.level} is derived but never shown`)
  assert.match(body, new RegExp(`Start here: ${s.courses[0].code}`), 'the reader is told where to begin')
  assert.ok(!/undefined|NaN|: $/.test(body), 'the section has an unresolved field')
})

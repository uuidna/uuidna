import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { APPLETS, shellCoverage, shellRun, shellCensus, shellCommandUniverse, catalogueCommandUniverse } from './index.js'
import { ROOT } from '../../../boundary.js'

test('APPLETS matches the live dispatcher — a list is not a surface unless it agrees with the switch', () => {
  // The module claims this list is what uuidnaExec dispatches. A hand-kept list drifts the moment an applet is
  // added, and then the coverage number is a story rather than a measurement — so it is read back from the
  // dispatcher itself. This is the cross-check the module's own comment promises.
  const src = readFileSync(join(ROOT, 'src/quantum/os/exec/index.ts'), 'utf8')
  const cases = [...src.matchAll(/^\s{4}case '([a-z0-9.-]+)':/gm)].map((m) => m[1]!)
  assert.ok(cases.length > 0, 'the dispatcher must expose cases, or this test proves nothing')
  assert.deepEqual([...APPLETS].sort(), [...new Set(cases)].sort(), 'APPLETS drifted from the dispatcher')
})

test('the denominator is READ from Alpine, not written down by us', () => {
  // The first version measured coverage against 36 utility names I typed from memory, so the ratio was a fact
  // about my recollection: change the list, change the number, and nothing in the tree could disagree. Alpine
  // publishes the answer in its provides column as cmd:<name>, so the denominator is now parsed from the mirror
  // and moves when the mirror moves.
  const c = shellCoverage()
  assert.ok(c.ported.packages > 1000, 'the shell domain is the second largest Alpine publishes')
  assert.equal(c.coverage.met, c.implemented.length)
  assert.ok(c.coverage.of > 100, 'the shell domain declares hundreds of commands — a denominator no one hand-listed')
  assert.ok(c.coverage.universe > c.coverage.of, 'the catalogue-wide command universe must exceed one domain of it')
  assert.ok(c.coverage.met < c.coverage.of, 'and uuidnaOS answers a small fraction of them, which is the honest number')
})

test('every implemented applet is a command Alpine itself declares', () => {
  const c = shellCoverage()
  const universe = shellCommandUniverse()
  for (const a of c.implemented) assert.ok(universe.has(a), `${a} must be declared by the shell domain to count`)
  for (const b of c.beyond) assert.ok(!catalogueCommandUniverse().has(b), `${b} is uuidna's own — no package declares it`)
})

test('an unknown applet REFUSES rather than answering emptily', () => {
  // `grep` stood here until it was ported; the example moved to `awk`, which is refused on the record for a
  // named reason (it is an interpreter for its own language, so porting it means porting a language). The check
  // was never about grep — it is about a refusal being visible instead of arriving as a green empty answer.
  const r = shellRun('awk /x/')
  assert.equal(r.ok, false, 'an empty success would read as "no matches" — the green-over-absent shape')
  assert.match(r.output[0] ?? '', /not an applet/)
  assert.equal((r.data as { error: string }).error, 'unknown-applet')
})

test('a known applet runs through the one door', () => {
  const r = shellRun('apk list')
  assert.equal(r.ok, true)
  assert.ok(r.output.length > 0)
  assert.equal(shellCensus().domain, 'shell')
})

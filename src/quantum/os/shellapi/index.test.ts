import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { APPLETS, shellCoverage, shellRun, shellCensus } from './index.js'
import { ROOT } from '../../../boundary.js'

test('APPLETS matches the live dispatcher — a list is not a surface unless it agrees with the switch', () => {
  // The module claims this list is what uuidnaExec dispatches. A hand-kept list drifts the moment an applet is
  // added, and then the coverage number is a story rather than a measurement — so it is read back from the
  // dispatcher itself. This is the cross-check the module's own comment promises.
  const src = readFileSync(join(ROOT, 'src/quantum/os/exec/index.ts'), 'utf8')
  const cases = [...src.matchAll(/^\s{4}case '([a-z-]+)':/gm)].map((m) => m[1]!)
  assert.ok(cases.length > 0, 'the dispatcher must expose cases, or this test proves nothing')
  assert.deepEqual([...APPLETS].sort(), [...new Set(cases)].sort(), 'APPLETS drifted from the dispatcher')
})

test('coverage is honest — the missing utilities are listed, not rounded away', () => {
  const c = shellCoverage()
  assert.ok(c.ported.packages > 1000, 'the shell domain is the second largest Alpine publishes')
  assert.equal(c.coverage.met, c.implemented.length)
  assert.ok(c.missing.length > c.implemented.length, 'most expected utilities are NOT implemented, and saying so is the point')
  assert.ok(c.missing.includes('grep') && c.missing.includes('sed'), 'the absent ones a reader will actually reach for must appear by name')
  assert.ok(c.implemented.every((u) => !c.missing.includes(u)), 'implemented and missing must not overlap')
})

test('an unknown applet REFUSES rather than answering emptily', () => {
  const r = shellRun('grep foo')
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

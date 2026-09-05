import { test } from 'node:test'
import assert from 'node:assert/strict'
import { REFUSAL_FAMILIES, refusalOf, refusedNames, appletAccounting } from './index.js'
import { shellCoverage, shellCommandUniverse } from '../shellapi/index.js'
import { APPLETS } from '../exec/index.js'

test('the domain is FULLY accounted: every command is ported or refused, none is both', () => {
  const universe = [...shellCommandUniverse()].sort()
  const acct = appletAccounting(universe, shellCoverage().implemented)
  assert.equal(acct.unaccounted.length, 0, `unaccounted: ${acct.unaccounted.slice(0, 10).join(', ')}`)
  assert.equal(acct.ported.length + acct.refused.length, acct.universe, 'the two verdicts must partition the domain')
  const both = shellCoverage().implemented.filter((c) => refusedNames().has(c))
  assert.deepEqual(both, [], 'a ported applet with a standing refusal is a false reason nobody re-checks')
})

// THE CONTROL. appletAccounting returning an empty remainder is the same reading whether the register covers
// the domain or the universe arrived empty, so the remainder is shown MOVING: one invented command must land in
// unaccounted, and one real refusal must not.
test('the accounting FIRES on a command no family covers, and stays quiet on one that is covered', () => {
  const a = appletAccounting(['zzz-not-a-real-command', 'gzip', 'wc'], ['wc'])
  assert.deepEqual(a.unaccounted, ['zzz-not-a-real-command'], 'an uncovered command must surface')
  assert.deepEqual(a.refused, ['gzip'], 'a covered one must not')
  assert.deepEqual(a.ported, ['wc'])
})

test('every family names a cause, its kind, and at least one member', () => {
  assert.ok(REFUSAL_FAMILIES.length > 0)
  for (const f of REFUSAL_FAMILIES) {
    assert.ok(f.members.length > 0, `a family with no members: ${f.cause}`)
    assert.ok(f.cause.length >= 40, `a cause too short to be a reason: ${JSON.stringify(f.cause)}`)
    assert.ok(['law', 'subject', 'scope'].includes(f.kind), `${f.kind} is not one of the three reasons`)
  }
})

test('no command is refused by two families — one cause each, or the register contradicts itself', () => {
  const seen = new Map<string, string>()
  for (const f of REFUSAL_FAMILIES) {
    for (const m of f.members) {
      const prior = seen.get(m)
      assert.equal(prior, undefined, `${m} is refused twice: ${JSON.stringify(prior)} and ${JSON.stringify(f.cause)}`)
      seen.set(m, f.cause)
    }
  }
})

test('refusalOf answers with the family that carries the name, and null for a ported applet', () => {
  assert.match(refusalOf('date')!.cause, /clock/)
  assert.equal(refusalOf('date')!.kind, 'law')
  assert.match(refusalOf('vim')!.cause, /INTERACTIVE/)
  assert.match(refusalOf('gzip')!.cause, /COMPRESSION CODEC/)
  for (const a of APPLETS) assert.equal(refusalOf(a), null, `${a} is ported; it can carry no refusal`)
})

test('the three kinds are all in use — a register with one kind has stopped distinguishing', () => {
  const kinds = new Set(REFUSAL_FAMILIES.map((f) => f.kind))
  assert.deepEqual([...kinds].sort(), ['law', 'scope', 'subject'], 'law, missing subject and scope are different refusals')
})

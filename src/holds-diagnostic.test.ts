// holds-diagnostic — THE DIAGNOSTIC THAT FINDS SILENT FAILURES MUST NOT FAIL SILENTLY.
//
// WHY THIS FILE EXISTS. `holds()` catches every throw and returns null, and null also means "the grammar cannot
// express this" — cannot BECAUSE the evaluator parses expression bodies and not pattern-matching recursion, which
// is the boundary wing-defs.ts names and declines to guess past. Those two outcomes are indistinguishable from
// outside, which is the defect here: one is a real limit with a reason, the other is a crash wearing its face.
// On 2026-09-06 four ordinary bugs hid
// behind that one reassuring sentence — a missing wing environment, `conjunction` (returns bool) called where
// `junction` (returns a value) was needed, a def-body scan that swallowed the next theorem's doc comment, and a
// fold handed a bare function name. Falsifier coverage sat at 2,765 of 5,116 and the report said the evaluator's
// grammar could not decide the rest. It could. What found them was UUIDNA_HOLDS_DEBUG, which prints the swallowed
// exception.
//
// So the diagnostic is load-bearing, and zeropoint-node's observation is the reason for this test: a diagnostic
// that stops printing is invisible in exactly the situation it exists for. Nothing else in the suite would notice
// — the verdicts are unchanged either way, which is the point of gating printing rather than behaviour.
//
// BOTH ARMS ARE CHECKED, because one is not coverage: it must PRINT for a statement that throws, and stay SILENT
// for one that merely cannot be expressed — cannot because that statement's vocabulary is outside the parser's
// grammar by construction, so there is nothing to evaluate and nothing to report. A diagnostic that printed on
// everything would be as useless as one
// that printed on nothing, and only the pair distinguishes them.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')

/** run holds() on one statement in a child process, returning what reached stderr */
const stderrOf = (statement: string, debug: boolean): string => {
  const script = `import { holds } from ${JSON.stringify(join(ROOT, 'dist', 'involution', 'index.js'))}
holds(${JSON.stringify(statement)}, 'def unitsOf (m : Nat) : List Nat := (List.range m).filter (fun x => Nat.gcd x m == 1)')`
  // spawnSync, not execFileSync: the latter RETURNS STDOUT and the diagnostic writes to STDERR, so the first
  // version of this test read an empty string and failed while the diagnostic was working perfectly. A test that
  // looks in the wrong stream is the same defect it was written to catch, one level up.
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    encoding: 'utf8',
    env: debug ? { ...process.env, UUIDNA_HOLDS_DEBUG: '1' } : { ...process.env, UUIDNA_HOLDS_DEBUG: '' },
  })
  return String(r.stderr ?? '')
}

// A statement whose vocabulary the evaluator KNOWS but which fails while evaluating: unitsOf is supplied above,
// and applying it to a non-numeric argument throws inside the def body rather than being rejected at the gate.
const THROWS = 'unitsOf [1,2] = [1]'

test('the diagnostic PRINTS the swallowed exception when the flag is set', () => {
  const err = stderrOf(THROWS, true)
  assert.match(err, /holds threw/,
    'UUIDNA_HOLDS_DEBUG must surface the caught exception — without it a crash and a genuine grammar limit are the '
    + 'same null, which is how four bugs hid behind "the evaluator cannot decide these"')
})

test('and stays silent when the flag is not set — the verdict never depends on the host', () => {
  const err = stderrOf(THROWS, false)
  assert.doesNotMatch(err, /holds threw/, 'the flag gates PRINTING only; unset it must print nothing')
})

test('the flag changes what is seen, never what is true', async () => {
  const { holds } = await import('./involution/index.js')
  const defs = 'def unitsOf (m : Nat) : List Nat := (List.range m).filter (fun x => Nat.gcd x m == 1)'
  const before = holds(THROWS, defs)
  process.env.UUIDNA_HOLDS_DEBUG = '1'
  const after = holds(THROWS, defs)
  delete process.env.UUIDNA_HOLDS_DEBUG
  assert.equal(before, after, 'a diagnostic that moved a verdict would be a second implementation, not a diagnostic')
})

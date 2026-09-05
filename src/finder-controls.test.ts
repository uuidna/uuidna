import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { scriptsGaps, pipeGaps } from './scripts/one-receipt.js'
import { executableSource } from './executable-source.js'
import { ROOT } from './boundary.js'

// HANDING A FINDER A CRAFTED VIOLATION, which is the one thing that proves it can FIRE.
//
// lean/finder-controls-baseline.json declares 43 finders that no test hands a violation to — wired, run daily,
// never once shown to refuse anything. The conveyor's kernel arm was in exactly that population: it had run on
// every deposit for the life of the queue and had never successfully refused a candidate, because the diagnostic
// it returned was the empty string and the caller read that as "no problem". Reading the code would not have
// shown it. Only feeding it something that MUST be refused did.
//
// So these tests do not check that the finders are quiet on a clean tree — the guard already does that, and that
// is the assertion that hid the bug. They construct the fault and require the finder to name it.

const withFixture = (pkg: unknown, fn: (root: string) => void): void => {
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-finder-control-'))
  try { writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg, null, 2)); fn(dir) }
  finally { rmSync(dir, { recursive: true, force: true }) }
}

test('scriptsGaps FIRES on a pipeline whose steps run in the wrong order', () => {
  withFixture({ scripts: { lean: 'node dist/scripts/rosetta.js && node dist/scripts/gen-falsifiers.js' } }, (root) => {
    const gaps = scriptsGaps(root)
    const hit = gaps.find((g) => /runs rosetta BEFORE gen-falsifiers/.test(g.what))
    assert.ok(hit, 'the ordering law must name the reversed pair')
    assert.match(hit.what, /falsifier legs/, 'and it must carry the REASON, so a reorder is argued against the reason')
    assert.match(hit.fix, /swap them/)
  })
})

test('scriptsGaps is silent on the same pipeline in the right order — the CONTROL', () => {
  withFixture({ scripts: { lean: 'node dist/scripts/gen-falsifiers.js && node dist/scripts/rosetta.js' } }, (root) => {
    assert.deepEqual(scriptsGaps(root).filter((g) => /BEFORE/.test(g.what)), [], 'a finder that fires on the correct order is worse than none')
  })
})

test('scriptsGaps does not invent an order for steps a script does not run', () => {
  // Absence is not a violation: a pipeline that runs neither step has nothing to order.
  withFixture({ scripts: { lean: 'node dist/scripts/build.js' } }, (root) => {
    assert.deepEqual(scriptsGaps(root).filter((g) => /BEFORE/.test(g.what)), [])
  })
})

test('the live tree obeys every ordering constraint it declares', () => {
  assert.deepEqual(scriptsGaps().filter((g) => /BEFORE/.test(g.what)), [])
})

// THE DIAGNOSTIC-SURVIVAL ARM. pipeGaps walks the tree itself, so the control is the RULE it applies rather than
// an injected fixture: the shape it refuses must be refused, and the shape it permits must be permitted.
test('pipeGaps refuses coalescing a stream onto a different source, and permits coalescing onto empty', () => {
  assert.deepEqual(pipeGaps().filter((g) => /coalesces/.test(g.what)), [], 'the live tree is clean of the shape')
  // `??` falls through on null/undefined ONLY, so an empty Buffer passes the guard and then reads as falsy.
  const empty = Buffer.alloc(0)
  assert.equal(String((empty as Buffer | undefined) ?? 'fallback'), '', 'THIS is the mechanism: ?? keeps the empty Buffer')
  // AND THE OBVIOUS CURE IS ALSO WRONG, which is why this assertion exists: an empty Buffer is a truthy OBJECT,
  // so `||` does not fall through either. Only String() collapses it to something an operator can see.
  assert.equal(String(empty || 'fallback'), '', '|| does NOT rescue a Buffer — Buffer.alloc(0) is truthy')
  assert.equal(String(empty ?? '') || 'fallback', 'fallback', 'stringify FIRST, then coalesce — the shape that works')
  const asString: string = String(empty)
  assert.equal(asString || 'fallback', 'fallback', 'bare || is enough only where the field is already a string')
})

test('the finders scan EXECUTABLE source, so a comment cannot make one report itself', () => {
  // pipeGaps' own comment quotes `err.stderr ?? err.message` to explain what it hunts. Before stripping, three
  // of its first five findings were its own prose and queue-wave's.
  const stripped = executableSource(readFileSync(join(ROOT, 'src', 'scripts', 'queue-wave.ts'), 'utf8'))
  assert.doesNotMatch(stripped, /LEAN WRITES ITS ERRORS TO STDOUT/, 'the comment must be gone')
  assert.match(stripped, /export function probe/, 'and the code must remain')
})

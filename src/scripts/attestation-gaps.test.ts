import { test } from 'node:test'
import assert from 'node:assert/strict'
import { writeFileSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { attestationGaps, ATTESTORS } from './attestation-gaps.js'
import { ROOT } from './api.js'

test('the tree has no bare attestation writer', () => {
  assert.deepEqual(attestationGaps(['src/scripts/reconcile.ts', 'src/scripts/next.ts', 'src/scripts/land.ts']), [])
})

// THE CONTROL. A finder that only ever returns [] proves nothing, for a reason that is visible in its output
// alone: a working finder over a clean tree and a blind finder over any tree print the same empty list, so the
// green is not evidence until the finder has been shown firing. So the defect is REBUILT here, verbatim as reconcile carried it on 2026-09-05, and the finder must name
// it. If this stops firing, the finder went blind and the green above became decoration.
test('the finder FIRES on the exact line reconcile shipped, and stays quiet on the reader and the prose', () => {
  const dir = mkdtempSync(join(tmpdir(), 'attest-'))
  const write = (name: string, body: string): string => {
    const p = join(dir, name)
    writeFileSync(p, body)
    return relative(ROOT, p)
  }
  const bare = write('bare.ts', "run('node dist/scripts/gate-receipt.js')   // the push-time proof\n")
  assert.equal(attestationGaps([bare]).length, 1, 'the bare write must be named')
  assert.match(attestationGaps([bare])[0]!.fix, /--verified/)

  const named = write('named.ts', "run('node dist/scripts/gate-receipt.js --verified guard,build')\n")
  assert.deepEqual(attestationGaps([named]), [], 'naming the arms is the cure, so it is not a gap')

  const reader = write('reader.ts', "const covered = run('node dist/scripts/gate-receipt.js --verify')\n")
  assert.deepEqual(attestationGaps([reader]), [], '--verify READS; it asserts nothing and cannot overclaim')

  const prose = write('prose.ts', "// gate-receipt.js is the writer; see the law above\n")
  assert.deepEqual(attestationGaps([prose]), [], 'a comment about the writer is not a call to it')

  const path = write('path.ts', "const RECEIPT = join(ROOT, 'gate-receipt.json')\n")
  assert.deepEqual(attestationGaps([path]), [], 'reading the receipt FILE is not writing one')
})

test('every declared attestor names both the flag it needs and the reader flags that are exempt', () => {
  assert.ok(ATTESTORS.length > 0)
  for (const a of ATTESTORS) {
    assert.match(a.names, /^--/)
    assert.ok(a.readerFlags.length > 0, `${a.invocation}: a writer with no reader flag declared cannot exempt one`)
  }
})

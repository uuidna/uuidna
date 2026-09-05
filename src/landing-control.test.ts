// A positive control for landingGaps — the first task taken off the checker queue, by hand.
//
// THE QUEUE CALLED THIS ONE 'direct' AND THAT WAS WRONG. It takes the file LIST as an argument, but reads each
// file's CONTENT from disk through `rd`, which joins against ROOT. So a crafted violation cannot be passed in;
// it has to exist as a file inside the repository. That is why the first task was taken by hand before pointing
// checkers at the other 38 — the classifier's word 'direct' meant two things, and finding that out on one task
// costs one task.
//
// The fixture is created under ROOT, named per-process so a cached read cannot be stale, and removed in a
// `finally` so a failing assertion still leaves the tree as it found it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { landingGaps } from './scripts/landing-gaps.js'
import { ROOT } from './boundary.js'

const withFixture = (name: string, body: string, fn: (rel: string) => void): void => {
  const dir = `.landing-control-${process.pid}`
  const rel = `${dir}/${name}`
  mkdirSync(join(ROOT, dir), { recursive: true })
  try { writeFileSync(join(ROOT, rel), body); fn(rel) }
  finally { rmSync(join(ROOT, dir), { recursive: true, force: true }) }
}

test('landingGaps FIRES on a push that never reads a ref back — "Everything up-to-date" is also a success', () => {
  withFixture('pushes-blind.ts', 'execSync("git push origin main")\nconsole.log("landed")\n', (rel) => {
    const gaps = landingGaps([rel])
    assert.equal(gaps.length, 1)
    assert.match(gaps[0]!.what, /runs `git push` and never reads a ref back/)
  })
})

test('landingGaps FIRES on a commit whose result is never checked', () => {
  // NOT execSync — that THROWS on non-zero, so treating it as verification is correct and my first fixture
  // was the lawful case wearing a violation's name. A helper that swallows the result is the real shape.
  withFixture('commits-blind.ts', 'await run(`git commit -m x`)\nconsole.log("committed")\n', (rel) => {
    const gaps = landingGaps([rel])
    assert.equal(gaps.length, 1)
    assert.match(gaps[0]!.what, /without noticing whether it succeeded/)
  })
})

// VERIFIES_COMMIT matches the token `execSync` ANYWHERE IN THE FILE, not at the commit's call site. So a file
// that execSyncs something unrelated and then commits blindly reads as verified. Recorded as the arm's measured
// reach rather than asserted as a defect — narrowing it is a judgement for whoever owns the finder.
test('a file that execSyncs something ELSE and commits blindly is NOT flagged — the exemption is file-wide', () => {
  withFixture('commits-blind-2.ts', 'execSync("ls")\nawait run(`git commit -m x`)\n', (rel) => {
    assert.deepEqual(landingGaps([rel]).filter((g) => /git commit/.test(g.what)), [],
      'an unrelated execSync exempts the commit — the reach of VERIFIES_COMMIT, measured')
  })
})

test('landingGaps is SILENT on a push that DOES verify the remote moved — the lawful twin', () => {
  withFixture('pushes-checked.ts',
    'const want = execSync("git rev-parse HEAD")\nexecSync("git push origin main")\n' +
    'const got = execSync("git rev-parse origin/main")\nif (got !== want) throw new Error("the push moved nothing")\n',
    (rel) => {
      assert.deepEqual(landingGaps([rel]).filter((g) => /git push/.test(g.what)), [],
        'a script that compares the remote ref after pushing must not be flagged; a control that only proves firing would pass a finder that flags everything')
    })
})

test('landingGaps is SILENT on a file that lands nothing at all', () => {
  withFixture('no-git.ts', 'export const two = 1 + 1\n', (rel) => assert.deepEqual(landingGaps([rel]), []))
})

test('a path that does not exist is skipped, not thrown on — an unreadable file is not a finding', () => {
  assert.deepEqual(landingGaps(['.no-such-file-anywhere.ts']), [])
})

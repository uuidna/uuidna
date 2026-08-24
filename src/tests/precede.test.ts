// precede — THE CONTROL FOR THE CONTROL. A finder that returns a gap for every tree looks exactly like a finder that
// found something, and the tree it was written against was guilty, so running it there proves nothing either way.
// This builds a scratch repository with the shape deliberately absent, present, and then repaired, and asserts the
// verdict flips — the two-sided check the finding itself was born from.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync, existsSync, realpathSync } from 'node:fs'
import { join, sep } from 'node:path'
import { tmpdir } from 'node:os'
import { precedeGaps } from '../scripts/one-receipt.js'
/** a throwaway repo carrying one Lean wing and the one file derived from it — fixed path, no clock, no randomness
 *
 *  THE FIXTURE MUST PROVE ITS OWN ISOLATION BEFORE IT WRITES ANYTHING (2026-08-25). This helper ran `git init`,
 *  `git config user.*` and `git add -A` with `cwd: dir` and `stdio: 'ignore'`, trusting that the directory it
 *  meant to stand in was the repository it was standing in. On 2026-08-25 that assumption failed while the suite
 *  was run inside a detached git worktree, and the consequences were total: `git config user.email
 *  test@example.invalid` landed in the SHARED .git/config (a worktree shares config with its main checkout),
 *  which also carried core.bare = true — so every git operation in every session on this machine began refusing
 *  with "fatal: this operation must be run in a work tree". A `git add -A` and commit ran against the real
 *  repository, and one session's commit went out authored as `test <test@example.invalid>`.
 *
 *  Every part of that was invisible while it happened, because `stdio: 'ignore'` discarded the evidence and no
 *  step ever asked WHICH repository it had. So the fixture now VERIFIES rather than assumes:
 *
 *    · the directory exists after it is created, and is the one we resolved
 *    · `git rev-parse --show-toplevel` inside it returns THAT directory and not an ancestor — the one check that
 *      distinguishes "my sandbox" from "somebody's repository", and the one that would have stopped all of this
 *    · every git call is `git -C <dir>` with `--local`, so a cwd that drifts cannot redirect a write
 *    · init's output is CAPTURED, so a failure is a message rather than a silence
 *
 *  A fixture that cannot confirm its sandbox must REFUSE, not proceed against whatever directory it happens to be
 *  standing in. The refusal is loud and names the repository it actually found. */
function scratch(): string {
  const dir = realpathSync(tmpdir()) + '/uuidna-precede-fixture'
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(join(dir, 'lean'), { recursive: true })
  mkdirSync(join(dir, 'src', 'theorems'), { recursive: true })
  if (!existsSync(dir)) throw new Error(`precede fixture: ${dir} was not created — refusing to run git anywhere`)

  // -C rather than cwd, and the output kept: a silent init is how this went unnoticed for an evening
  const git = (c: string): string => execSync(`git -C ${JSON.stringify(dir)} ${c}`, { encoding: 'utf8' }).trim()
  git('init -q')

  // THE ISOLATION PROOF. If this is not our own directory we are inside somebody's repository, and the next
  // `config` would write their config and the next `add -A` would stage their tree.
  // compared through the platform separator rather than a literal backslash — Windows answers this question in
  // one spelling and the fixture is written in another, and a comparison that ignores that would always differ
  const norm = (p: string): string => p.split(sep).join('/').toLowerCase()
  const top = realpathSync(git('rev-parse --show-toplevel'))
  if (norm(top) !== norm(realpathSync(dir))) {
    throw new Error(
      `precede fixture: NOT ISOLATED — git reports its repository as ${top}, not the fixture at ${dir}. ` +
      'Refusing to init, config or add: doing so would write another repository\'s config and stage its tree. ' +
      'This is what corrupted every session on 2026-08-25.')
  }

  git('config --local user.email test@example.invalid')
  git('config --local user.name test')
  git('config --local commit.gpgsign false')
  writeFileSync(join(dir, 'lean', 'Core.lean'), 'theorem a : 1 = 1 := by decide\n')
  writeFileSync(join(dir, 'src', 'theorems', 'generated.ts'), 'export const LEDGER = ["a"]\n')
  git('add -A')
  git('commit -q -m base')
  // both move together, as a real wing landing does
  writeFileSync(join(dir, 'lean', 'Core.lean'), 'theorem a : 1 = 1 := by decide\ntheorem b : 2 = 2 := by decide\n')
  writeFileSync(join(dir, 'src', 'theorems', 'generated.ts'), 'export const LEDGER = ["a","b"]\n')
  return dir
}

test('a dirty tree with NOTHING staged is not an inversion — the finder stays silent', () => {
  const dir = scratch()
  assert.deepEqual(precedeGaps(dir), [], 'nothing is armed, so nothing can be published out of order')
  rmSync(dir, { recursive: true, force: true })
})

test('derived STAGED while its Lean source is not is caught, and the gap names both sides', () => {
  const dir = scratch()
  execSync(`git -C ${JSON.stringify(dir)} add src/theorems/generated.ts`, { stdio: 'ignore' })
  const gaps = precedeGaps(dir)
  assert.equal(gaps.length, 1, 'the inversion must be caught')
  assert.match(gaps[0]!.what, /generated\.ts/, 'the staged derived file is named')
  assert.match(gaps[0]!.what, /lean\/Core\.lean/, 'the unstaged source is named')
  assert.match(gaps[0]!.fix, /git add/, 'the fix is an exact command')
  rmSync(dir, { recursive: true, force: true })
})

test('staging the source alongside its derived output clears the gap — the finder can be satisfied', () => {
  const dir = scratch()
  execSync(`git -C ${JSON.stringify(dir)} add src/theorems/generated.ts lean/Core.lean`, { stdio: 'ignore' })
  assert.deepEqual(precedeGaps(dir), [], 'source and derived in one commit is exactly what the law asks for')
  rmSync(dir, { recursive: true, force: true })
})

test('a staged SOURCE with no derived file staged is not an inversion — the order it forbids has a direction', () => {
  const dir = scratch()
  execSync(`git -C ${JSON.stringify(dir)} add lean/Core.lean`, { stdio: 'ignore' })
  assert.deepEqual(precedeGaps(dir), [], 'source ahead of derived is the safe order')
  rmSync(dir, { recursive: true, force: true })
})

// precede — THE CONTROL FOR THE CONTROL. A finder that returns a gap for every tree looks exactly like a finder that
// found something, and the tree it was written against was guilty, so running it there proves nothing either way.
// This builds a scratch repository with the shape deliberately absent, present, and then repaired, and asserts the
// verdict flips — the two-sided check the finding itself was born from.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { precedeGaps } from '../scripts/one-receipt.js'

/** a throwaway repo carrying one Lean wing and the one file derived from it — fixed path, no clock, no randomness */
function scratch(): string {
  const dir = join(tmpdir(), 'uuidna-precede-fixture')
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(join(dir, 'lean'), { recursive: true })
  mkdirSync(join(dir, 'src', 'theorems'), { recursive: true })
  const git = (c: string): void => { execSync(c, { cwd: dir, stdio: 'ignore' }) }
  git('git init -q')
  git('git config user.email test@example.invalid')
  git('git config user.name test')
  git('git config commit.gpgsign false')
  writeFileSync(join(dir, 'lean', 'Core.lean'), 'theorem a : 1 = 1 := by decide\n')
  writeFileSync(join(dir, 'src', 'theorems', 'generated.ts'), 'export const LEDGER = ["a"]\n')
  git('git add -A')
  git('git commit -q -m base')
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
  execSync('git add src/theorems/generated.ts', { cwd: dir, stdio: 'ignore' })
  const gaps = precedeGaps(dir)
  assert.equal(gaps.length, 1, 'the inversion must be caught')
  assert.match(gaps[0]!.what, /generated\.ts/, 'the staged derived file is named')
  assert.match(gaps[0]!.what, /lean\/Core\.lean/, 'the unstaged source is named')
  assert.match(gaps[0]!.fix, /git add/, 'the fix is an exact command')
  rmSync(dir, { recursive: true, force: true })
})

test('staging the source alongside its derived output clears the gap — the finder can be satisfied', () => {
  const dir = scratch()
  execSync('git add src/theorems/generated.ts lean/Core.lean', { cwd: dir, stdio: 'ignore' })
  assert.deepEqual(precedeGaps(dir), [], 'source and derived in one commit is exactly what the law asks for')
  rmSync(dir, { recursive: true, force: true })
})

test('a staged SOURCE with no derived file staged is not an inversion — the order it forbids has a direction', () => {
  const dir = scratch()
  execSync('git add lean/Core.lean', { cwd: dir, stdio: 'ignore' })
  assert.deepEqual(precedeGaps(dir), [], 'source ahead of derived is the safe order')
  rmSync(dir, { recursive: true, force: true })
})

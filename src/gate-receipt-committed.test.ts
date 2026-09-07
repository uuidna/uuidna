// gate-receipt over the COMMITTED tree (lead 235): committedTree() holds exactly what HEAD commits under src/ and
// lean/, its covers are deterministic, and — the control — they part from a directory the moment an uncommitted
// byte lands in a covered file. Held on a repository of its own so the shared tree's live edits are never the fixture.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { committedTree, treeCovers, fileManifest } from './gate-receipt-index.js'

const git = (cwd: string, ...args: string[]): string => execFileSync('git', args, { cwd, encoding: 'utf8' })

test('committedTree holds HEAD\'s covered files, deterministically, and an open edit parts the directory from it', () => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-committed-'))
  git(root, 'init', '-q')
  git(root, 'config', 'user.email', 'test@uuidna.local')
  git(root, 'config', 'user.name', 'test')
  mkdirSync(join(root, 'src')); mkdirSync(join(root, 'lean'))
  writeFileSync(join(root, 'src', 'a.ts'), 'export const a = 1\n')
  writeFileSync(join(root, 'lean', 'A.lean'), 'theorem a : 1 = 1 := by decide\n')
  git(root, 'add', '.'); git(root, 'commit', '-q', '-m', 'seed')
  const committed = committedTree('HEAD', root)
  assert.ok(existsSync(join(committed, 'src', 'a.ts')) && existsSync(join(committed, 'lean', 'A.lean')), 'the archive carries both covered directories')
  assert.deepEqual(treeCovers(committed), treeCovers(root), 'a clean directory and its commit cover the same bytes')
  assert.deepEqual(fileManifest(committed), fileManifest(root))
  assert.equal(committedTree('HEAD', root), committed, 'one extraction per ref per process')
  // CONTROL — the defect this fold exists for: a private edit that the directory reports and the commit does not
  writeFileSync(join(root, 'src', 'a.ts'), 'export const a = 2\n')
  assert.notDeepEqual(treeCovers(root), treeCovers(committed), 'the directory moved; the committed tree did not')
  assert.equal(fileManifest(committed)['src/a.ts'], fileManifest(committed)['src/a.ts'], 'and the committed manifest is stable')
})

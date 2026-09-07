// in-flight — THE GUARD JUDGES WHAT GIT WOULD COMMIT (lead 223), held on a repository of its own so the shared
// tree's live files are never the fixture: an untracked file is deferred and NAMED, a staged one is judged, a
// tracked one is judged, and a control that must fail — the helper handed the wrong root defers nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { judged } from './api.js'

const git = (cwd: string, ...args: string[]): string => execFileSync('git', args, { cwd, encoding: 'utf8' })

test('untracked is deferred and named, staged and tracked are judged', () => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-in-flight-'))
  git(root, 'init', '-q')
  git(root, 'config', 'user.email', 'test@uuidna.local')
  git(root, 'config', 'user.name', 'test')
  mkdirSync(join(root, 'src'))
  writeFileSync(join(root, 'src', 'tracked.ts'), '// tracked\n')
  git(root, 'add', 'src/tracked.ts')
  git(root, 'commit', '-q', '-m', 'seed')
  writeFileSync(join(root, 'src', 'staged.ts'), '// staged\n')
  git(root, 'add', 'src/staged.ts')
  writeFileSync(join(root, 'src', 'in-flight.ts'), '// a peer is still typing here\n')
  const r = judged(['src/tracked.ts', 'src/staged.ts', 'src/in-flight.ts'], root)
  assert.deepEqual(r.files, ['src/tracked.ts', 'src/staged.ts'], 'tracked and staged are judged')
  assert.deepEqual(r.deferred, ['src/in-flight.ts'], 'the untracked, unstaged file is deferred by name')
})

test('CONTROL — the helper is not a filter that always passes: a file only in the working tree is caught as in flight', () => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-in-flight-'))
  git(root, 'init', '-q')
  writeFileSync(join(root, 'loose.ts'), '// never added\n')
  const r = judged(['loose.ts'], root)
  assert.equal(r.files.length, 0)
  assert.deepEqual(r.deferred, ['loose.ts'])
})

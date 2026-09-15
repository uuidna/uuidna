// in-flight — THE GUARD JUDGES WHAT GIT WOULD COMMIT (lead 223, widened 2026-09-15), held on a repository of its own so
// the shared tree's live files are never the fixture: tracked, staged and untracked-not-ignored are judged, because a
// landing commits all three; a gitignored file is deferred by name. The finders read the same set through
// listCommittable, and the impossibility finder is held end to end: a new file with a bare modal fails before it is
// added, and the same file under a gitignore does not.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { ROOT, judged, listCommittable } from './api.js'
import { impossibilityReading } from './impossibility-gaps.js'

const git = (cwd: string, ...args: string[]): string => execFileSync('git', args, { cwd, encoding: 'utf8' })

const repo = (): string => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-in-flight-'))
  git(root, 'init', '-q')
  git(root, 'config', 'user.email', 'test@uuidna.local')
  git(root, 'config', 'user.name', 'test')
  return root
}

test('tracked, staged and untracked are judged; only the gitignored file is deferred', () => {
  const root = repo()
  mkdirSync(join(root, 'src'))
  writeFileSync(join(root, '.gitignore'), 'src/ignored.ts\n')
  writeFileSync(join(root, 'src', 'tracked.ts'), '// tracked\n')
  git(root, 'add', '.gitignore', 'src/tracked.ts')
  git(root, 'commit', '-q', '-m', 'seed')
  writeFileSync(join(root, 'src', 'staged.ts'), '// staged\n')
  git(root, 'add', 'src/staged.ts')
  writeFileSync(join(root, 'src', 'new.ts'), '// written, not yet added\n')
  writeFileSync(join(root, 'src', 'ignored.ts'), '// gitignored\n')
  const r = judged(['src/tracked.ts', 'src/staged.ts', 'src/new.ts', 'src/ignored.ts'], root)
  assert.deepEqual(r.files, ['src/tracked.ts', 'src/staged.ts', 'src/new.ts'], 'everything a landing would commit is judged')
  assert.deepEqual(r.deferred, ['src/ignored.ts'], 'the gitignored file is deferred by name')
  assert.deepEqual(listCommittable(['src'], root).sort(), ['src/new.ts', 'src/staged.ts', 'src/tracked.ts'],
    'the finders\' listing is the same set')
})

test('an untracked file with a bare "cannot" fails the local guard\'s impossibility finder; the same file gitignored does not', () => {
  const root = repo()
  mkdirSync(join(root, 'src'))
  writeFileSync(join(root, '.gitignore'), 'src/scratch.ts\n')
  git(root, 'add', '.gitignore')
  git(root, 'commit', '-q', '-m', 'seed')
  // the bare modal the landing's certification refused twice — no reason in the same breath
  const bare = '// the loop cannot stop here\nexport const x = 1\n'
  writeFileSync(join(root, 'src', 'fresh.ts'), bare)
  writeFileSync(join(root, 'src', 'scratch.ts'), bare)
  const { files, deferred } = judged(['src/fresh.ts', 'src/scratch.ts'], root)
  assert.deepEqual(files, ['src/fresh.ts'])
  assert.deepEqual(deferred, ['src/scratch.ts'])
  // impossibilityReading reads through rd, which joins onto ROOT, so the fixture is handed over ROOT-relative
  const fromRoot = (f: string): string => relative(ROOT, join(root, f))
  const reading = impossibilityReading(files.map(fromRoot), new Set())
  assert.equal(reading.gaps.length, 1, 'the new file is judged before `git add`, as the committed tree will be')
  assert.match(reading.gaps[0]!.what, /CANNOT be done without naming why/)
  assert.deepEqual(impossibilityReading(deferred.map(fromRoot), new Set()).gaps.length, 1,
    'CONTROL — the ignored file carries the same bare modal, so only the enumeration keeps it out')
})

test('CONTROL — the helper is not a filter that always passes: a path git would not commit is deferred', () => {
  const root = mkdtempSync(join(tmpdir(), 'uuidna-in-flight-'))
  git(root, 'init', '-q')
  writeFileSync(join(root, 'loose.ts'), '// never added\n')
  const r = judged(['loose.ts', 'absent.ts'], root)
  assert.deepEqual(r.files, ['loose.ts'], 'an untracked, unignored file is judged')
  assert.deepEqual(r.deferred, ['absent.ts'], 'a path git would not commit is deferred')
})

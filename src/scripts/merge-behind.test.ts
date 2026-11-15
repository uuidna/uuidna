// merge-behind — origin's commits come in without disturbing another session's staged work, and a real conflict is
// refused with nothing changed. Run against a throwaway origin and checkout, never this repository.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { ROOT } from './api.js'

const sh = (args: string[], cwd: string): string => {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' })
  assert.equal(r.status, 0, `git ${args.join(' ')}: ${r.stderr}`)
  return r.stdout.trim()
}
const ident = ['-c', 'user.name=t', '-c', 'user.email=t@t', '-c', 'commit.gpgsign=false']
const world = (): { here: string; there: string } => {
  const base = mkdtempSync(join(tmpdir(), 'merge-behind-test-'))
  const origin = join(base, 'origin.git'), here = join(base, 'here'), there = join(base, 'there')
  sh(['init', '-q', '--bare', '-b', 'main', origin], base)
  sh(['clone', '-q', origin, here], base)
  writeFileSync(join(here, 'data.json'), '1\n'); writeFileSync(join(here, 'work.txt'), 'a\n')
  sh([...ident, 'add', '.'], here); sh([...ident, 'commit', '-q', '-m', 'start'], here); sh(['push', '-q', 'origin', 'main'], here)
  sh(['clone', '-q', origin, there], base)
  return { here, there }
}
const mergeBehind = (cwd: string) => spawnSync(process.execPath, [join(ROOT, 'dist', 'scripts', 'merge-behind.js')], {
  cwd, encoding: 'utf8', env: { ...process.env, UUIDNA_MERGE_ROOT: cwd, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' },
})

test('origin gains a commit on one file while another file is staged here: the merge comes in, the staged work stays', () => {
  const { here, there } = world()
  writeFileSync(join(there, 'data.json'), '2\n'); sh([...ident, 'commit', '-q', '-am', 'ci'], there); sh(['push', '-q', 'origin', 'main'], there)
  writeFileSync(join(here, 'work.txt'), 'staged by another session\n'); sh(['add', 'work.txt'], here)
  const r = mergeBehind(here)
  assert.equal(r.status, 0, r.stderr)
  assert.equal(readFileSync(join(here, 'data.json'), 'utf8'), '2\n', 'origin\'s change is here')
  assert.equal(sh(['diff', '--cached', '--name-only'], here), 'work.txt', 'the staged entry is untouched')
  assert.equal(sh(['rev-list', '--count', 'HEAD..origin/main'], here), '0', 'nothing behind')
})

test('CONTROL: origin changed the file that is staged here — refused, HEAD unchanged', () => {
  const { here, there } = world()
  writeFileSync(join(there, 'work.txt'), 'changed upstream\n'); sh([...ident, 'commit', '-q', '-am', 'ci'], there); sh(['push', '-q', 'origin', 'main'], there)
  writeFileSync(join(here, 'work.txt'), 'staged by another session\n'); sh(['add', 'work.txt'], here)
  const before = sh(['rev-parse', 'HEAD'], here)
  const r = mergeBehind(here)
  assert.notEqual(r.status, 0)
  assert.match(r.stderr, /carry local work here/)
  assert.equal(sh(['rev-parse', 'HEAD'], here), before)
})

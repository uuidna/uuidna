#!/usr/bin/env node
// merge-behind — TAKE IN WHAT ORIGIN GAINED WITHOUT TOUCHING ANYONE'S STAGED WORK. land's cure for a refused push
// ("behind the shared tree") ran `git merge origin/main` in the shared checkout, and git refuses a merge over a staged
// index: on 2026-11-15 a proven-green landing stopped there because another session had staged web/ changes, and
// CI's six books commits (two data files nobody else touched) kept the release out. This merges in a scratch
// worktree with every hook running, advances the branch with a ref update guarded on its old value, and refreshes
// in this checkout only the paths origin changed. It refuses — and leaves everything as it was — when any of those
// paths carries local work, because that is a real conflict and a person decides it.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { ROOT as REPO } from './api.js'

/** the checkout to merge into: this repository, or the one a test names */
const ROOT = process.env.UUIDNA_MERGE_ROOT || REPO

const git = (args: string[], cwd = ROOT): { ok: boolean; out: string } => {
  const r = spawnSync('git', args, { cwd, encoding: 'utf8' })
  return { ok: r.status === 0, out: `${r.stdout ?? ''}${r.stderr ?? ''}`.trim() }
}
const fail = (why: string): never => { console.error(`✗ merge-behind — ${why}`); process.exit(1) }

if (!git(['fetch', 'origin']).ok) fail('git fetch origin failed')
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']).out
const head = git(['rev-parse', 'HEAD']).out
const behind = Number(git(['rev-list', '--count', `HEAD..origin/${branch}`]).out)
if (!behind) { console.log('✓ merge-behind — nothing to take in'); process.exit(0) }

// the paths origin changed since the merge base, and whether any of them carries local work here
const changed = git(['diff', '--name-only', `HEAD...origin/${branch}`]).out.split('\n').filter(Boolean)
const local = new Set(git(['status', '--porcelain', '--', ...changed]).out.split('\n').filter(Boolean).map((l) => l.slice(3)))
if (local.size) fail(`origin changed ${[...local].slice(0, 6).join(', ')}, which carry local work here — a person merges this`)

// the merge, in a worktree of HEAD, hooks running; the hooks read dist/ and node_modules/, which this checkout built
const wt = join(tmpdir(), `uuidna-merge-${head.slice(0, 12)}`) // named by the commit it starts from, not by chance
rmSync(wt, { recursive: true, force: true }); mkdirSync(tmpdir(), { recursive: true })
try {
  if (!git(['worktree', 'add', '-q', '--detach', wt, head]).ok) fail('could not open a scratch worktree')
  for (const d of ['dist', 'node_modules']) if (existsSync(join(ROOT, d))) symlinkSync(join(ROOT, d), join(wt, d))
  const msg = `Merge origin/${branch}: ${changed.length} path(s) origin gained while the gate was walked, none carrying local work here.\n\nBacked by theorem two_coins.`
  const merged = git(['merge', '--no-edit', '-m', msg, `origin/${branch}`], wt)
  if (!merged.ok) { git(['merge', '--abort'], wt); fail(`the merge did not conclude:\n${merged.out.slice(-800)}`) }
  const tip = git(['rev-parse', 'HEAD'], wt).out
  // advance the branch only if it still points where this started — a neighbour's commit in between is not overwritten
  if (!git(['update-ref', `refs/heads/${branch}`, tip, head]).ok) fail('the branch moved while merging; nothing was changed')
  // this checkout's index and files follow, for the paths origin changed and no others
  const kept = changed.filter((f) => git(['cat-file', '-e', `${tip}:${f}`]).ok)
  const gone = changed.filter((f) => !kept.includes(f))
  if (kept.length) { git(['reset', '-q', '--', ...kept]); git(['checkout', '--', ...kept]) }
  if (gone.length) git(['rm', '-q', '--ignore-unmatch', '--', ...gone])
  console.log(`✓ merge-behind — ${behind} commit(s) taken in as ${tip.slice(0, 10)}; ${changed.length} path(s) refreshed, every other staged entry left as it was`)
} finally {
  for (const d of ['dist', 'node_modules']) rmSync(join(wt, d), { force: true })
  git(['worktree', 'remove', '--force', wt])
}

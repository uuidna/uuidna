// precede — THE CONTROL FOR THE CONTROL. A finder that returns a gap for every tree looks exactly like a finder that
// found something, and the tree it was written against was guilty, so running it there proves nothing either way.
// This builds a scratch repository with the shape deliberately absent, present, and then repaired, and asserts the
// verdict flips — the two-sided check the finding itself was born from.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync, rmSync, existsSync, realpathSync } from 'node:fs'
import { join, sep } from 'node:path'
import { tmpdir } from 'node:os'
import { precedeGaps } from './scripts/one-receipt.js'
// cleanGitEnv is imported, never redefined: it is the scripts singularity's, and precedeGaps uses the same one
import { cleanGitEnv } from './scripts/api.js'

/** a throwaway repo carrying one Lean wing and the one file derived from it — no clock, and a UNIQUE path
 *  (mkdtempSync) rather than a fixed one: the directory name is the only thing here that varies, and it varies
 *  so that two sessions' suites stay clear of each other on it. Nothing the tests ASSERT depends on it.
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
 *    · `git rev-parse --show-toplevel` inside it returns THAT directory and not an ancestor
 *    · every git call is `git -C <dir>` with `--local`, so a cwd that drifts cannot redirect a write
 *    · init's output is CAPTURED, so a failure is a message rather than a silence
 *
 *  AND THE ABOVE WAS NOT ENOUGH, because it named the wrong cause (2026-08-25, second finding). The trigger was
 *  never the worktree — it was that the suite ran INSIDE A GIT HOOK. Git exports GIT_DIR to every hook it runs,
 *  and an inherited GIT_DIR OUTRANKS `-C`: `git -C <fixture> init` re-inits the REAL repository, `config --local`
 *  writes the REAL config, `add -A` stages the REAL tree. `-C` changes the directory, and the directory was never
 *  what decided the repository. `git init` reached for a work tree, found the environment pointing elsewhere, and
 *  wrote core.bare = true — the outage, in full, from one variable nobody passed.
 *
 *  THE ISOLATION GUARD DID NOT FIRE, AND COULD NOT. With GIT_DIR set and GIT_WORK_TREE unset, git still infers
 *  the work tree from the cwd, so `rev-parse --show-toplevel` answers with the FIXTURE — the same answer it gives
 *  when everything is fine — while every write goes to the .git the environment named. A guard whose safe case
 *  and whose dangerous case return the same value is not a guard. It is the empty-versus-healthy defect this tree
 *  spent 2026-08-25 pulling out of the arc receipt, the shell throwers and the served wave verdict, found here
 *  inside the check written to prevent exactly this.
 *
 *  So the fixture now does the two things that actually decide it:
 *    · SCRUBS every GIT_* variable that can redirect a repository out of the environment it hands to git, so the
 *      directory is the only thing left that can answer the question
 *    · asks `rev-parse --absolute-git-dir` — WHICH .git will be written — instead of --show-toplevel, which
 *      answers where we are standing. Only the first can differ between the safe and the unsafe case.
 *
 *  A fixture that cannot confirm its sandbox must REFUSE, not proceed against whatever directory it happens to be
 *  standing in. The refusal is loud and names the repository it actually found. */
function scratch(): string {
  // A UNIQUE DIRECTORY, because a FIXED one is not concurrency-safe and this repository is worked by several
  // sessions at once. The path was `tmpdir() + '/uuidna-precede-fixture'` — the same string in every process —
  // so two suites running together raced it: one holds a handle under it while the other's rmSync tries to
  // delete it, and the loser gets `EPERM ... syscall: 'rm'`. The failure reads as a defect in whatever change
  // is being pushed, because it surfaces inside pre-push; it is neither, and it blocked two pushes here.
  // Every other fixture in this suite already uses mkdtempSync (circle-, lawreg-, one-writer); this was the
  // lone fixed path. Same family as the docs build sharing one .temp per docs root: a scratch resource that is
  // correct for one writer and wrong for two.
  const dir = mkdtempSync(join(realpathSync(tmpdir()), 'uuidna-precede-'))
  mkdirSync(join(dir, 'lean'), { recursive: true })
  mkdirSync(join(dir, 'src', 'theorems'), { recursive: true })
  if (!existsSync(dir)) throw new Error(`precede fixture: ${dir} was not created — refusing to run git anywhere`)

  // -C rather than cwd, and the output kept: a silent init is how this went unnoticed for an evening. The
  // environment is SCRUBBED of every variable git lets override a repository — inherited from a hook, any one of
  // these silently outranks -C and points the whole fixture at the real tree.
  const git = (c: string): string =>
    execSync(`git -C ${JSON.stringify(dir)} ${c}`, { encoding: 'utf8', env: cleanGitEnv() }).trim()
  git('init -q')

  // THE ISOLATION PROOF. If this is not our own directory we are inside somebody's repository, and the next
  // `config` would write their config and the next `add -A` would stage their tree.
  // compared through the platform separator rather than a literal backslash — Windows answers this question in
  // one spelling and the fixture is written in another, and a comparison that ignores that would always differ
  const norm = (p: string): string => p.split(sep).join('/').toLowerCase()
  // --absolute-git-dir, NOT --show-toplevel: the question is which .git will be WRITTEN, and only that one can
  // differ between the safe case and the case where an inherited GIT_DIR has redirected every write elsewhere.
  const gitDir = realpathSync(git('rev-parse --absolute-git-dir'))
  if (norm(gitDir) !== norm(join(realpathSync(dir), '.git'))) {
    throw new Error(
      `precede fixture: NOT ISOLATED — git will write to ${gitDir}, not the fixture's own .git at ${join(dir, '.git')}. ` +
      'Refusing to init, config or add: doing so would write another repository\'s config and stage its tree. ' +
      'This is what corrupted every session on 2026-08-25, via a GIT_DIR inherited from a hook.')
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
  execSync(`git -C ${JSON.stringify(dir)} add src/theorems/generated.ts`, { stdio: 'ignore', env: cleanGitEnv() })
  const gaps = precedeGaps(dir)
  assert.equal(gaps.length, 1, 'the inversion must be caught')
  assert.match(gaps[0]!.what, /generated\.ts/, 'the staged derived file is named')
  assert.match(gaps[0]!.what, /lean\/Core\.lean/, 'the unstaged source is named')
  assert.match(gaps[0]!.fix, /git add/, 'the fix is an exact command')
  rmSync(dir, { recursive: true, force: true })
})

test('staging the source alongside its derived output clears the gap — the finder can be satisfied', () => {
  const dir = scratch()
  execSync(`git -C ${JSON.stringify(dir)} add src/theorems/generated.ts lean/Core.lean`, { stdio: 'ignore', env: cleanGitEnv() })
  assert.deepEqual(precedeGaps(dir), [], 'source and derived in one commit is exactly what the law asks for')
  rmSync(dir, { recursive: true, force: true })
})

test('a staged SOURCE with no derived file staged is not an inversion — the order it forbids has a direction', () => {
  const dir = scratch()
  execSync(`git -C ${JSON.stringify(dir)} add lean/Core.lean`, { stdio: 'ignore', env: cleanGitEnv() })
  assert.deepEqual(precedeGaps(dir), [], 'source ahead of derived is the safe order')
  rmSync(dir, { recursive: true, force: true })
})

// ── THE GUARD ITSELF ON TRIAL. Everything above depends on the fixture writing where it says it writes, and the
// PREVIOUS guard passed this whole file every time while the writes went somewhere else. So the scrub and the
// question are checked directly, with the exact environment a git hook supplies.
test('cleanGitEnv removes every variable that can outrank -C, and touches nothing else', () => {
  const hookish = {
    GIT_DIR: 'C:/real/.git', GIT_WORK_TREE: 'C:/real', GIT_INDEX_FILE: 'C:/real/.git/index',
    GIT_COMMON_DIR: 'C:/real/.git', GIT_OBJECT_DIRECTORY: 'C:/real/.git/objects',
    GIT_ALTERNATE_OBJECT_DIRECTORIES: 'C:/other', GIT_CEILING_DIRECTORIES: 'C:/', GIT_NAMESPACE: 'ns',
    GIT_PREFIX: 'sub/', PATH: '/usr/bin', GIT_AUTHOR_NAME: 'kept',
  }
  const clean = cleanGitEnv(hookish)
  for (const k of Object.keys(hookish)) {
    if (k.startsWith('GIT_') && k !== 'GIT_AUTHOR_NAME') assert.equal(clean[k], undefined, `${k} must not survive`)
  }
  assert.equal(clean.PATH, '/usr/bin', 'the environment is scrubbed, not emptied — git still needs to be findable')
  assert.equal(clean.GIT_AUTHOR_NAME, 'kept', 'a GIT_ variable that cannot redirect a repository is left alone')
  assert.equal(hookish.GIT_DIR, 'C:/real/.git', 'the caller\'s own environment object is never mutated')
})

test('THE CONTROL: with a hook\'s GIT_DIR inherited, an unscrubbed git IGNORES -C — and the old guard could not see it', () => {
  // Two real repositories, both created with a CLEAN environment: A stands for the fixture, B for the repository a
  // hook's GIT_DIR points at. The dangerous act — running `init` while GIT_DIR names someone else's repo — is the
  // outage itself and is never performed here; it does not need to be, because the redirection is already visible
  // in what git ANSWERS, and that is the whole finding.
  // unique per run, for the same reason as `scratch` above — two of these ran concurrently under one name
  const base = mkdtempSync(join(realpathSync(tmpdir()), 'uuidna-precede-control-'))
  const A = join(base, 'a')
  const B = join(base, 'b')
  const clean = cleanGitEnv()
  for (const d of [A, B]) {
    mkdirSync(d, { recursive: true })
    execSync(`git -C ${JSON.stringify(d)} init -q`, { env: clean, encoding: 'utf8' })
  }
  const n = (p: string): string => p.split(sep).join('/').toLowerCase()
  const ask = (q: string, env: NodeJS.ProcessEnv): string =>
    execSync(`git -C ${JSON.stringify(A)} rev-parse ${q}`, { encoding: 'utf8', env }).trim()

  // a hook's environment: git exports GIT_DIR to every hook it runs, and nobody in the fixture passed it
  const hooked = { ...clean, GIT_DIR: join(B, '.git') }

  // (1) THE DEFECT, in one assertion: -C names A, and git writes to B.
  assert.equal(n(ask('--absolute-git-dir', hooked)), n(join(B, '.git')),
    'an inherited GIT_DIR outranks -C — every config, add and commit the fixture made would land in B')

  // (2) THE BLIND SPOT: the question the old guard asked is unmoved by the redirection. It answers A whether the
  //     writes go to A or to B, which is why this file passed for as long as it did while doing the damage.
  assert.equal(n(ask('--show-toplevel', hooked)), n(A),
    'the old guard asked where we STAND, and standing still is exactly what the dangerous case looks like')

  // (3) THE FIX, both halves. Scrubbed, the directory is the only thing left that can answer — and it answers A.
  assert.equal(n(ask('--absolute-git-dir', cleanGitEnv(hooked))), n(join(A, '.git')),
    'with the redirection removed, -C means what it was always assumed to mean')
  //     and the new question separates the two cases, which is the entire requirement on a guard
  assert.notEqual(n(ask('--absolute-git-dir', hooked)), n(ask('--absolute-git-dir', cleanGitEnv(hooked))),
    'safe and dangerous must not share an answer — the property --show-toplevel lacked')

  for (const d of [A, B]) rmSync(d, { recursive: true, force: true })
})

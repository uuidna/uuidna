// land --drain-only — the fold of lead 227: on a shared tree the landing stages what the drain owns, never the tree.
// Held as source shape (like the stage-before-mint law beside it in gate-paths.test.ts): the whole-tree stage still
// exists for `--all`, the drain-only stage names DRAIN_PATHS, the commit carries a pathspec, the mode is chosen when
// in-flight files exist, and --no-verify appears nowhere.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, DRAIN_PATHS } from './api.js'

const land = readFileSync(join(ROOT, 'src', 'scripts', 'land.ts'), 'utf8')

test('drain-only stages the declared drain paths and commits with a pathspec; --all keeps the whole-tree stage', () => {
  assert.match(land, /process\.argv\.includes\('--drain-only'\)/)
  assert.match(land, /inFlightFiles\(\)/, 'the mode is chosen from the tree, not only from the flag')
  assert.match(land, /run\('git add -- ' \+ drainPaths\(\)/, 'drain-only stages DRAIN_PATHS')
  assert.match(land, /run\('git add -A'\)/, '--all still stages the tree it owns')
  assert.match(land, /' -- gate-receipt\.json ' \+ drainPaths\(\)/, 'the commit carries the same pathspec')
  // USE, not mention: the header itself names --no-verify to say it is absent (scanner_cannot_tell_use_from_mention)
  assert.doesNotMatch(land, /git (push|commit)[^\n]*--no-verify/, 'no git command in land bypasses a hook')
  assert.ok(DRAIN_PATHS.length > 50, 'the drain is the declared derived layer, not a guess')
})

test('the push arm judges the derived layer it names, and defers what the precede law forbids committing', () => {
  const hook = readFileSync(join(ROOT, 'hooks', 'pre-push'), 'utf8')
  assert.match(hook, /DRAIN_PATHS\.join/, 'the arm diffs the declared drain, not the whole tree')
  assert.match(hook, /lean\/\[\^\/\]\+\\\.lean\|src\/scripts\/lean-\.\+\\\.ts/, 'the waiting set is precede\'s own source set')
  assert.match(hook, /push BLOCKED/, 'a settle nobody committed is still refused')
})

// ── THE PINNED PUSH (2026-09-28). Three lands raced each other's mint for over an hour and pushed nothing: each spent
// ~50 minutes earning a receipt, a neighbour committed inside that window, the receipt stopped covering HEAD, and the
// next round re-minted. Held as source shape, like the laws above it, because the race needs three concurrent lands to
// reproduce and a test that needs a race is a test that passes for the wrong reason.
test('the mint pins the commit it proves, and opens its worktree at that name rather than at HEAD', () => {
  assert.match(land, /let pinned = ''/, 'the proven commit is named once, outside the mint block, so the push can see it')
  assert.match(land, /pinned = run\('git rev-parse HEAD'\)/, 'the SHA is resolved BEFORE the worktree, not after the walk')
  assert.match(land, /git worktree add --detach ' \+ JSON\.stringify\(wt\) \+ ' ' \+ pinned/,
    'the worktree is opened at the pinned SHA — `HEAD` there is a name that can move under a 50-minute walk')
})

test('the push names the commit the receipt covers, and never the bare ref', () => {
  assert.match(land, /git push origin \$\{before\}:main/, 'the landing sends a SHA, so what is pushed is what was proven')
  // USE, not mention: the comment beside it names the old form to say it is gone (scanner_cannot_tell_use_from_mention)
  assert.doesNotMatch(land, /run\((['"`])git push origin main\1\)/, 'no arm of land pushes a ref whose tip it has not certified')
})

test('nothing rides along: a neighbour inside the mint window re-mints instead of shipping uncovered bytes', () => {
  assert.match(land, /git rev-list --count \$\{pinned\}\.\.HEAD/, 'the distance is ASKED of git, never assumed to be one')
  assert.match(land, /if \(between !== '1'\)/, 'exactly the receipt commit may sit on top of what was proven')
  assert.doesNotMatch(land, /between !== '1'\)[^}]*process\.exit\(0\)/, 'contention is a re-mint, never a green exit')
})

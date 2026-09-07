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

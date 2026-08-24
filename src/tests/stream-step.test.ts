// streamStep — the streaming step runner on trial. Two properties matter and both must be checked, because
// the easy half hides the hard one: capturing output is obvious, and returning the CHILD'S OWN exit code is
// the part a `| tee` would silently destroy (the pipes trap this tree keeps a finder for, and the one that let
// a failed run report success to a watcher earlier the same day). A runner that captures beautifully and
// reports the wrong verdict is worse than one that prints nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { streamStep } from '../scripts/api.js'

test('a passing step captures its output and reports ok', async () => {
  const r = await streamStep('probe pass', 'echo the-stream-carries-this')
  assert.equal(r.ok, true, 'exit 0 is ok')
  assert.match(r.out, /the-stream-carries-this/, 'the text is captured, not only printed')
  assert.match(r.tail, /the-stream-carries-this/, 'the tail is the last lines of what was said')
})

test('a FAILING step reports ok:false — the exit code survives, which a pipe would have eaten', async () => {
  const r = await streamStep('probe fail', 'echo said-before-dying; exit 3')
  assert.equal(r.ok, false, 'a non-zero exit is NOT ok — the whole point: no pipe stands between the child and its verdict')
  assert.match(r.out, /said-before-dying/, 'what a failing step said is captured too — the charge sheet is never eaten')
})

test('stderr is captured alongside stdout — a runner classifies what a step said, wherever it said it', async () => {
  const r = await streamStep('probe stderr', 'echo to-err 1>&2; exit 0')
  assert.equal(r.ok, true)
  assert.match(r.out, /to-err/, 'the named transient classes live in stderr as often as in stdout')
})

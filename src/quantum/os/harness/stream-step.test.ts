// streamStep — the streaming step runner on trial. Two properties matter and both must be checked, because
// the easy half hides the hard one: capturing output is obvious, and returning the CHILD'S OWN exit code is
// the part a `| tee` would silently destroy (the pipes trap this tree keeps a finder for, and the one that let
// a failed run report success to a watcher earlier the same day). A runner that captures beautifully and
// reports the wrong verdict is worse than one that prints nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { streamStep } from '../../../scripts/api.js'

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

// ── whyFailed — the same file's OTHER two-state instrument, now able to say which of three things happened.
//
// shellRun/shellOut both threw `failed (exit ${r.status})` on `r.status !== 0`, and null satisfies that test. So a
// command the host never launched raised a sentence naming an exit code that does not exist — pointing the reader
// at a command that was never wrong, while the actual fault (no such binary, a refused spawn, a signal) went
// unnamed. Control flow is unchanged and should be: a step that could not run has not passed. The EVIDENCE changes.
test('whyFailed tells a NONZERO EXIT from a command that never ran, and names the reason', async () => {
  const { whyFailed } = await import('../../../scripts/api.js')
  assert.equal(whyFailed({ status: 1 }), 'failed (exit 1)', 'a real exit code is reported as one')
  assert.equal(whyFailed({ status: 127 }), 'failed (exit 127)')

  // THE MUTATION THIS CATCHES: revert to `failed (exit ${r.status})` and this line reads "exit null" — the string
  // the old throwers produced, and the reason this test exists.
  const never = whyFailed({ status: null, error: new Error('spawn nosuchshell ENOENT') })
  assert.match(never, /could not be RUN/, 'a spawn that never started must not be reported as an exit')
  assert.match(never, /ENOENT/, 'and it must carry the host\'s own reason, which is the only clue there is')
  assert.doesNotMatch(never, /exit/, 'nothing exited, so nothing may say it did')

  // killed before it could report: no error object, no status — the case with the least evidence, so it must not
  // invent any. It says what it knows (a signal) and admits the rest.
  const killed = whyFailed({ status: null, signal: 'SIGKILL' })
  assert.match(killed, /could not be RUN/)
  assert.match(killed, /SIGKILL/)
  assert.match(whyFailed({ status: null }), /unknown signal/, 'with no signal named either, it says so rather than guessing')

  // and success is not this function's business — it is only ever asked why something did NOT succeed
  assert.equal(whyFailed({ status: 0 }), 'failed (exit 0)', 'called on a success it says so plainly; the callers guard that')
})

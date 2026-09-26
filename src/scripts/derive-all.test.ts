// derive-all.test — THE EXTRACTOR MUST ASK BOTH QUESTIONS, and the first version only asked one.
//
// derive-all runs the commands the gates prescribe. Its first extractor took any command a fix MENTIONED, and the
// scripts finder's fix reads "REMOVE it and use `npm run x -- <name>`" — where the quoted command is how a reader
// invokes the script afterwards and the action is an edit to package.json. So it ran `npm run x -- zenodo-deposit`
// and attempted a Zenodo DOI publish. That refused, because deposits are workflow-only; on a different script it
// would simply have run.
//
// EVERY PRESCRIPTION I TESTED BY HAND WAS A GENUINE REGENERATION, which is exactly why it looked right. A check that
// only confirms the true cases cannot find a false one, so this asserts BOTH: real regeneration fixes yield their
// command, and fixes whose action is a removal or an edit yield nothing however many commands they quote.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { prescribedIn } from './derive-all.js'

test('a fix that asks for a regeneration yields its command, in every form the finders write', () => {
  // the three forms taken verbatim from live finder fixes
  assert.deepEqual(prescribedIn('regenerate with npm run x -- gen-falsifiers — a falsifier over a stale statement falsifies nothing'),
    ['npm run x -- gen-falsifiers'])
  assert.deepEqual(prescribedIn('run `node dist/scripts/gen-seo-freeze.js` to extend the freeze map for NEW sealed subjects'),
    ['npm run x -- gen-seo-freeze'])
  assert.deepEqual(prescribedIn('uuidna_handle: the recorded example no longer reproduces — run gen-mcp-docs'),
    ['npm run x -- gen-mcp-docs'])
  assert.deepEqual(prescribedIn('run `npm run x -- trial-refusals` — the record is recomputed from the leads'),
    ['npm run x -- trial-refusals'])
  // and a fix naming one command twice yields it once, because running it twice is not the instruction
  assert.deepEqual(prescribedIn('run `npm run x -- stamp`; if it persists, re-run stamp'), ['npm run x -- stamp'])
})

test('A FIX WHOSE ACTION IS A REMOVAL OR AN EDIT PRESCRIBES NOTHING — the case that ran a DOI publish', () => {
  // the live fix, verbatim, that the first extractor acted on
  const scriptsFix = 'remove it and use `npm run x -- zenodo-deposit` — the dispatcher discovers every script, so a'
    + ' hand-typed entry can only lag what exists'
  assert.deepEqual(prescribedIn(scriptsFix), [],
    'a fix telling you to REMOVE a wrapper must not run the wrapper')

  assert.deepEqual(prescribedIn('drop the number and name the source instead ("the key count"), or mark the sentence as HISTORY'), [])
  assert.deepEqual(prescribedIn('edit src/novelty.ts:95: theoremFor(key) (import theoremByKey from the theorems index)'), [])
  assert.deepEqual(prescribedIn('this is a LEAD, not a fix: put it to the trial door (uuidna_trial)'), [])
  // a fix that names no command prescribes none. The reason is that there is nothing in it to run — NOT that it
  // contains the word "never", which the case below shows is no evidence at all.
  assert.deepEqual(prescribedIn('the slots are generated from the live census, so the surface is corrected by recomputing it, never by editing the number'), [])
})

test('A "NEVER" LATER IN THE SENTENCE DOES NOT VETO THE COMMAND IT OPENS WITH — my own false limit', () => {
  // I wrote the first veto lexically, refusing any fix containing remove/edit/never anywhere, and used THIS fix's
  // tail as my example of a non-action. stamp's fix is a genuine regeneration whose "never" governs the reader's
  // alternative, so the loop refused the one command that clears the gate and reported the gate as prescribing
  // nothing. The landing named it, which is the only reason the control is here rather than the assertion I wrote.
  const stampFix = 'run `npm run x -- stamp` — the slots are generated from the live census, so the surface is'
    + ' corrected by recomputing it, never by editing the number'
  assert.deepEqual(prescribedIn(stampFix), ['npm run x -- stamp'],
    'the verb the fix opens with is its action; the "never" tells the reader what not to do instead')

  // and the discrimination is POSITIONAL: the same veto word in front of the command still vetoes it
  assert.deepEqual(prescribedIn('remove it and use `npm run x -- stamp`'), [])
  assert.deepEqual(prescribedIn('run `npm run x -- stamp`, and never edit the number by hand'), ['npm run x -- stamp'])
})

test('A FIX THAT OPENS WITH THE BARE COMMAND IS PRESCRIBING IT — no imperative verb is needed', () => {
  // axiom-reach's live fix, verbatim: a command chain in the first position, and the extractor read zero from it,
  // so derive-all announced the gate was "not the kind a regeneration clears" when it was precisely that.
  const axiomReach = 'node dist/scripts/generate.js && npm run build — reconcile runs the JS controls BEFORE it'
    + ' rewrites src/theorems/generated.ts, so a wing added or a dead definition removed makes the index disagree'
  assert.deepEqual(prescribedIn(axiomReach), ['npm run x -- generate'],
    'the leading command is the action; `npm run build` is not an x script and derive-all builds every pass itself')
  assert.deepEqual(prescribedIn('`npm run x -- gen-latex` — the paper quotes a count the ledger has moved past'),
    ['npm run x -- gen-latex'])
  // and the first position does not override a removal: the same chain inside a removal fix still prescribes nothing
  assert.deepEqual(prescribedIn('remove the wrapper; node dist/scripts/generate.js is reached through the dispatcher'), [])
})

test('A PACKAGE SCRIPT IS TAKEN AS WRITTEN, and a verdict line prescribes like a FIX row', () => {
  // the axiom finder's live fix: `axioms` is a package.json script, so `npm run x -- axioms` would name nothing
  assert.deepEqual(prescribedIn('71082 audited against 71085 theorems (a new theorem lacks a kernel-only witness) — run `npm run axioms`'),
    ['npm run axioms'], 'a backticked package script is the command, not a dispatcher entry of that name')
  // and it is not ALSO emitted in the dispatcher's shape — one instruction, one command
  assert.equal(prescribedIn('run `npm run axioms`').length, 1)
  // the dispatcher form still resolves to the dispatcher
  assert.deepEqual(prescribedIn('run `npm run x -- stamp`'), ['npm run x -- stamp'])
  // and `npm run x` itself is never a target, nor is build — derive-all builds every pass on its own
  assert.deepEqual(prescribedIn('run `npm run x` then `npm run build`'), [])
})

test('THE CONTROL — the two directions are genuinely different, so neither answer is constant', () => {
  // if the extractor returned [] for everything, the first test would fail; if it returned a command for everything,
  // this one would. Asserting that both outcomes actually occur is what makes the pair evidence.
  const asks = prescribedIn('run `npm run x -- gen-falsifiers`')
  const doesNot = prescribedIn('remove it and use `npm run x -- gen-falsifiers`')
  assert.ok(asks.length > 0, 'the performing form must yield a command')
  assert.equal(doesNot.length, 0, 'the removal form must yield none')
  assert.notDeepEqual(asks, doesNot, 'one input yields a command and the other does not — the extractor discriminates')
})

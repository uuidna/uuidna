// gate-all — the law that independent verdicts are computed TOGETHER.
//
// `npm run audit` joins twenty-nine steps with `&&`, so it stops at the first failure. Bringing the dormant-backlog
// work to green cost SEVEN full passes — stale axiom witness, Math.* determinism reject, heartbeats missing four,
// two injected thin wrappers, heartbeats again, spin drift, derived diff — every one of which was already true on
// the first pass. Independence is also the licence to run them CONCURRENTLY: the first version of this script
// collected all the verdicts but still walked them linearly, which is why it was slow.
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { INSTRUMENTS } from '../scripts/gate-all.js'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { plan, kindOf, runPlan, pool, label } from '../scripts/gate-all.js'

const CHAIN = 'npm run lean && npm run build && node dist/scripts/gen-lines.js && node dist/scripts/guard.js'
  + ' && node dist/scripts/gen-reports.js && node dist/scripts/spin.js && node dist/quantum/os/cli.js --court'
  + ' && node dist/scripts/exercise-dormant.js && git diff --exit-code -- lean/'

const green = async () => ({ exit: 0, out: '' })

test('the plan is READ from the chain, so it cannot drift from what audit runs', () => {
  const steps = plan(CHAIN)
  assert.equal(steps.length, 9)
  assert.deepEqual(steps.map((s) => s.kind),
    ['generator', 'generator', 'generator', 'check', 'generator', 'check', 'check', 'serial-check', 'serial-check'])
})

test('the manifest runner is a generator, though its name lacks the hyphen its children have', () => {
  // The miss cost a real verdict: classified as a check, generate.js wrote the derived layer inside the fan-out,
  // and the emitter it runs that TIMES ITSELF (gen-quantum-capacity seals the decade of a per-verify sweep) took
  // its reading under contention. A decade slower, a moved seal, and spin reporting drift in a tree where nothing
  // had changed. Pinned so the classification cannot regress to matching on the name.
  assert.equal(kindOf('node dist/scripts/generate.js'), 'generator')
  assert.equal(kindOf('node dist/scripts/gen-mcp.js'), 'generator', 'its children were always classified correctly')
})

test('a step is classified by what it RUNS — `npm run <name>` is resolved through the manifest', () => {
  // THE PATTERN THAT COULD NEVER FIRE. GENERATOR_PATTERNS has carried /\blean-axioms\.js/ for as long as it has
  // existed, and the audit chain says `npm run axioms` — a string containing no such text. So the pattern matched
  // nothing, ever, and the step landed in the concurrent wave while its body is
  // `npm run build && node dist/scripts/lean-axioms.js`: it BUILDS. It was writing dist beside twenty-seven checks
  // reading dist. Observed 2026-08-25 in a clean worktree — the arm FAILED inside the fan-out and PASSED standing
  // alone, which is a race's signature and not a defect's.
  //
  // It is the generate.js mistake one level up, and it is why the cure moved from adding another pattern to
  // resolving the name: no pattern over the surface text can see through the manifest.
  const scripts = { axioms: 'npm run build && node dist/scripts/lean-axioms.js', lint: 'eslint .' }
  assert.equal(kindOf('npm run axioms'), 'check', 'unresolved, the surface text names nothing generator-shaped — this is the bug')
  assert.equal(kindOf('npm run axioms', scripts), 'generator', 'resolved, it builds, so it must not share the wave')
  // a step whose body genuinely checks is left where it was — resolving must not sweep everything into the ordered phase
  assert.equal(kindOf('npm run lint', scripts), 'check', 'eslint renders a verdict and writes nothing')
  // an unknown name resolves to itself rather than throwing: a manifest that does not list it is not a crash
  assert.equal(kindOf('npm run nowhere', scripts), 'check')
})

test('the three classes are told apart by what a step DOES', () => {
  assert.equal(kindOf('node dist/scripts/gen-mcp.js'), 'generator', 'gen-* writes inputs for later steps')
  assert.equal(kindOf('npx vitepress build docs'), 'generator')
  assert.equal(kindOf('node dist/scripts/harmonic-scan.js'), 'check', 'a scanner renders a verdict and feeds nothing')
  assert.equal(kindOf('node dist/scripts/exercise-dormant.js'), 'serial-check', 'it dirties the tree and restores it')
  assert.equal(kindOf('git diff --exit-code -- lean/'), 'serial-check', 'it READS the tree to decide')
})

// ── THE POINT (1): every failing check is reported from one pass.
test('every failing CHECK is reported in a single pass', async () => {
  const failing = new Set(['node dist/scripts/guard.js', 'node dist/scripts/spin.js', 'node dist/quantum/os/cli.js --court'])
  const { verdicts, aborted } = await runPlan(plan(CHAIN), async (cmd) => ({ exit: failing.has(cmd) ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, null, 'no generator failed, so nothing may abort')
  assert.equal(verdicts.length, 9, 'the walk must reach EVERY step')
  assert.deepEqual(verdicts.filter((v) => v.exit !== 0).map((v) => v.cmd).sort(), [...failing].sort())
})

// ── THE POINT (2): the read-only checks actually overlap in time. A linear walk would serialise them.
test('read-only checks run CONCURRENTLY — the linear walk was the slowness', async () => {
  let inFlight = 0, peak = 0
  const { verdicts } = await runPlan(plan(CHAIN), async (cmd) => {
    if (kindOf(cmd) === 'check') {
      inFlight++; peak = inFlight > peak ? inFlight : peak
      await new Promise((r) => setTimeout(r, 20))
      inFlight--
    }
    return { exit: 0, out: '' }
  }, 8)
  assert.equal(verdicts.length, 9)
  assert.ok(peak >= 3, `all three read-only checks must overlap; peak concurrency was ${peak}`)
})

// ── and the tree-touching ones must NOT overlap, with anything.
test('tree-touching checks never share the tree — they run strictly alone', async () => {
  let inFlight = 0, serialPeak = 0
  await runPlan(plan(CHAIN), async (cmd) => {
    inFlight++
    if (kindOf(cmd) === 'serial-check') serialPeak = inFlight > serialPeak ? inFlight : serialPeak
    await new Promise((r) => setTimeout(r, 5))
    inFlight--
    return { exit: 0, out: '' }
  }, 8)
  assert.equal(serialPeak, 1, 'exercise-dormant dirties the tree; git diff reads it — they must never overlap')
})

test('a failing GENERATOR still aborts — later steps read what it never wrote', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN),
    async (cmd) => ({ exit: cmd === 'node dist/scripts/gen-lines.js' ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, 'node dist/scripts/gen-lines.js')
  assert.equal(verdicts.length, 3, 'the walk stops AT the failed generator')
})

test('a check failing never stops the generators or the checks that follow it', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN),
    async (cmd) => ({ exit: cmd === 'node dist/scripts/guard.js' ? 1 : 0, out: '' }), 8)
  assert.equal(aborted, null)
  assert.equal(verdicts.length, 9)
  assert.equal(verdicts.filter((v) => v.exit !== 0).length, 1)
})

test('an all-green chain reports no failures and never aborts', async () => {
  const { verdicts, aborted } = await runPlan(plan(CHAIN), green, 8)
  assert.equal(aborted, null)
  assert.equal(verdicts.filter((v) => v.exit !== 0).length, 0)
})

test('pool honours its limit and preserves result order', async () => {
  let inFlight = 0, peak = 0
  const out = await pool(Array.from({ length: 12 }, (_, i) => async () => {
    inFlight++; peak = inFlight > peak ? inFlight : peak
    await new Promise((r) => setTimeout(r, 5))
    inFlight--
    return i
  }), 4)
  assert.deepEqual(out, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'order must survive concurrency')
  assert.ok(peak <= 4, `the limit must hold; peak was ${peak}`)
  assert.ok(peak > 1, 'and it must actually run more than one at a time')
})

test('every instrument names the arms it voids, and the invisible one is covered', () => {
  // The lesson this list exists to hold: run without the Lean kernel, the gate reported SIX failures, and every
  // one was the same absent program wearing a different costume — the proof arms it runs, plus the derived-layer
  // arms that fail downstream on a layer the absent kernel never regenerated. An arm nothing measured must not be
  // counted as a finding about the tree.
  const covers = (cmd: string) => INSTRUMENTS.filter((i) => i.covers.some((re) => re.test(cmd))).map((i) => i.file)
  assert.deepEqual(covers('UUIDNA_PROVE_ALL=1 npm run lean').sort(), ['lean', 'node'])
  assert.deepEqual(covers('npm run axioms').sort(), ['lean', 'node', 'npm'])
  assert.deepEqual(covers('node dist/scripts/spin.js'), ['node'], 'spin is NOT voided by the kernel — it reads the tree, and a real drift there is a real finding')
  for (const i of INSTRUMENTS) {
    assert.ok(i.remedy.length > 10, `${i.file} states how to install it`)
    assert.ok(i.why.length > 10, `${i.file} states what goes dark without it`)
  }
  // lean appears nowhere in package.json's chain — declared precisely because it cannot be derived
  const lean = INSTRUMENTS.find((i) => i.file === 'lean')!
  assert.ok(lean.why.includes('nowhere in the chain'), 'the declaration says why it is declared rather than derived')
})

test('labels stay short enough to read as a table', () => {
  assert.equal(label('node dist/scripts/exercise-dormant.js'), 'exercise-dormant')
  assert.equal(label('npm run build'), 'npm:build')
  assert.equal(label('node --test dist/tests/*.test.js'), 'test dist/tests', 'a test step names its suite — the 50-second stranger of lead 132b, never again bare "node"')
  assert.equal(label('node --test docs/.vitepress/theme/*.test.ts'), 'test docs/.vitepress/theme')
  assert.ok(label('git diff --exit-code -- lean/ src/theorems/generated.ts README.md llm.txt').length <= 46)
})

test('an ENVIRONMENT PREFIX is not part of the command — the third costume of one mistake', () => {
  // `/^npm run lean$/` is anchored and the audit chain says `UUIDNA_PROVE_ALL=1 npm run lean`, so the anchor
  // missed and the tree's HEAVIEST WRITER — every Lean wing, the generated ledger, the heartbeats, the axiom
  // witness, the rosetta mirror — was classified read-only and fanned out beside the checks that read what it
  // writes, spin and `git diff --exit-code` among them. Their reds were about a race, not about the tree.
  //
  // Pinned with its two older siblings, because each was cured by teaching the matcher one more surface form and
  // the next surface form will arrive: a hyphen (generate.js), a manifest (npm run axioms), an assignment.
  const scripts = { lean: 'npm run build && node dist/scripts/lean-all.js', lint: 'eslint .' }
  assert.equal(kindOf('UUIDNA_PROVE_ALL=1 npm run lean', scripts), 'generator', 'the assignment must not hide the writer')
  assert.equal(kindOf('A=1 B=2 npm run lean', scripts), 'generator', 'nor several of them')
  assert.equal(kindOf('UUIDNA_PROVE_ALL=1 npm run lean'), 'generator', 'and it holds with no manifest, off the bare surface alone')
  // the direction that would cost a false verdict: stripping must never demote a genuine check into the wave
  assert.equal(kindOf('CI=1 npm run lint', scripts), 'check', 'eslint still renders a verdict and writes nothing')
  assert.equal(kindOf('FOO=bar git diff --exit-code -- lean/'), 'serial-check', 'and a tree-reader stays alone')
})

test('the RELEASE PROVER is a generator, and its rename is the fourth costume of one mistake', () => {
  // MEASURED 2026-08-25, and self-inflicted. The audit's link 2 was `UUIDNA_PROVE_ALL=1 npm run lean`, matched as
  // a generator once the env prefix is stripped. Replacing it with the runner that makes the release gate work on
  // a cmd.exe host changed its NAME and nothing else — and the classifier reads names, so the tree's heaviest
  // writer was reclassified read-only and fanned out beside spin and `git diff --exit-code`, which read what it
  // writes. It announced itself as drift in a tree where nothing had changed but who was writing during the read.
  assert.equal(kindOf('node dist/scripts/prove-all.js'), 'generator',
    'the runner that re-proves the whole ledger must never share the wave with a step that reads it')
  // its predecessor stays classified, so the rule that caught the env prefix is not quietly dropped
  assert.equal(kindOf('UUIDNA_PROVE_ALL=1 npm run lean'), 'generator')
  // and the pattern must be NARROW — a step that merely mentions proving is not a writer
  assert.equal(kindOf('node dist/scripts/proof-check.js'), 'check', 'the match is the runner, not the word')
})

// ── THE WRITERS THAT WERE CLASSIFIED AS CHECKS (2026-08-25). GENERATOR_PATTERNS has now been taught five surface
// forms — a missing hyphen, a manifest indirection, an env prefix, a rename, and these. Each was added after a
// symptom, and the symptom is always the same: a step that WRITES running in the concurrent wave beside spin and
// `git diff --exit-code`, which read exactly what it wrote. Drift in a tree where nothing had changed.
//
// I TRIED TO REPLACE THIS LIST WITH A PROPERTY AND COULD NOT, honestly. Reading each check's source for a write
// cannot correlate the WRITE with its TARGET, so a script that reads tracked files and writes untracked ones
// trips it (one-writer, axiom-hunt), and it cannot see per-invocation behaviour at all — one-receipt writes only
// under `messaging`, spin only under `--seal`. Every attempt turned into a longer exemption list, which is the
// exact failure mode of the pattern list it was meant to replace. So this pins what was MEASURED rather than
// claiming a class-catcher I do not have, and the durable fix stays named and unbuilt: a runner should DECLARE
// what it writes, and the classifier should read the declaration instead of the name.
test('every step that writes the tracked tree is classified as a GENERATOR, not a check', () => {
  // each verified by reading its source for the file it writes
  assert.equal(kindOf('node dist/scripts/prove-all.js'), 'generator', 'rewrites the whole ledger')
  assert.equal(kindOf('node dist/scripts/audit-citations.js'), 'generator', 'writes audit-citations.json')
  assert.equal(kindOf('node dist/scripts/support.js --check'), 'generator', 'writes support-audit.json and research-leads.json')
  assert.equal(kindOf('node dist/scripts/rosetta.js'), 'generator', 'writes src/rosetta-mirror.ts')
  assert.equal(kindOf('node dist/scripts/one-receipt.js messaging'), 'generator', 'writes lean/messaging-witness.json')

  // AND THE NARROWNESS, which is what keeps the fan-out worth having: one-receipt is run five times and only
  // `messaging` writes, so the other four must stay concurrent. Ordering a whole script for one of its verbs
  // would buy safety with the speedup the gate depends on.
  for (const verb of ['dormant', 'skills', 'micro'])
    assert.equal(kindOf(`node dist/scripts/one-receipt.js ${verb}`), 'check',
      `one-receipt ${verb} reports and writes nothing — it belongs in the wave`)

  // the predecessor rule still holds, so the env-prefix cure is not quietly dropped
  assert.equal(kindOf('UUIDNA_PROVE_ALL=1 npm run lean'), 'generator')
  // and a step that merely mentions proving is not a writer
  assert.equal(kindOf('node dist/scripts/proof-check.js'), 'check')
})

test('THE .json TRAP — a pattern must not match a FILENAME in another command\'s arguments', () => {
  // SHIPPED AND CAUGHT WITHIN THE MINUTE (2026-08-25). `.js` is a PREFIX of `.json`, so an unanchored
  // /\baudit-citations\.js/ matched the string "audit-citations.json" sitting in the argument list of
  // `git diff --exit-code -- …`. That reclassified the step that READS the tree as a GENERATOR, and the gate
  // refused with "GENERATOR FAILED: git diff" — correctly, and about my own pattern rather than about the tree.
  const diff = 'git diff --exit-code -- lean/ audit-citations.json support-audit.json research-leads.json'
  assert.equal(kindOf(diff), 'serial-check',
    'the tree-reader is a serial check; a generator pattern matching one of its ARGUMENTS inverts the whole plan')
  // and each anchored pattern still matches the thing it is for
  assert.equal(kindOf('node dist/scripts/audit-citations.js'), 'generator')
  assert.equal(kindOf('node dist/scripts/support.js --check'), 'generator')
  assert.equal(kindOf('node dist/scripts/rosetta.js'), 'generator')
})

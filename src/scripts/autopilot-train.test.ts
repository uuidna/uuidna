// the train's decisions, without a build, a forge or a network: stage order, the build triage read from the drain's own
// declarations, the round plan, the oscillation detector naming a two-writer pair, the land verdict read from git's
// answer, and the live door's arguments derived from the served instructions.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DRAIN_WRITERS, RECONCILE_OUTPUTS } from './api.js'
import { HEAL_ORDER, RESEAL_FROM } from './develop-cures.js'
import {
  STAGES, stagesToRun, typeErrorFiles, buildTriage, buildDecision, wingDomains, isWingGenerator, roundSteps, roundBound,
  loopVerdict, loopGap, failingTests, landVerdict, toolsNamed, instructionArgs, argsFor, liveVerdict, rpcOfBody, runReceipt,
  type Round,
} from './autopilot-train.js'

test('the train runs in one order, resumes by name, always ends with its receipt, and refuses an unknown stage', () => {
  assert.deepEqual(stagesToRun([]), [...STAGES])
  assert.deepEqual(stagesToRun(['--from', 'land']), ['land', 'ship', 'live', 'receipt'])
  assert.deepEqual(stagesToRun(['--until', 'fixed-point']), ['build', 'fixed-point', 'receipt'])
  assert.deepEqual(stagesToRun(['--stage', 'build']), ['build'])
  assert.throws(() => stagesToRun(['--from', 'shipit']), /no stage "shipit"/)
  assert.throws(() => stagesToRun(['--from', 'live', '--until', 'build']), /comes after/)
})

test('the build gate bootstraps only when every refused file is one a declared generator owns', () => {
  const out = 'src/theorems/generated.ts(88,5): error TS2590: Expression produces a union type that is too complex to represent.\n'
  assert.deepEqual(typeErrorFiles(out), ['src/theorems/generated.ts'])
  const t = buildTriage(out, DRAIN_WRITERS, RECONCILE_OUTPUTS)
  assert.deepEqual(t.generated, [{ file: 'src/theorems/generated.ts', owners: ['lean-ledger'] }])
  assert.deepEqual(buildDecision(t), { bootstrap: true, owners: ['lean-ledger'] })
  // a directory output owns the files under it
  assert.deepEqual(buildTriage('src/chunks/a1.ts(1,1): error TS2322: x', DRAIN_WRITERS, RECONCILE_OUTPUTS).generated[0]?.owners, ['gen-handle-chunks', 'gen-handles'])
})

test('CONTROL — a type error in a hand-written file stops the build gate, even beside a generated one', () => {
  const out = 'src/theorems/generated.ts(1,1): error TS2590: x\nsrc/scripts/land.ts(4,2): error TS2304: Cannot find name\n'
  const d = buildDecision(buildTriage(out, DRAIN_WRITERS, RECONCILE_OUTPUTS))
  assert.equal(d.bootstrap, false)
  assert.match(d.bootstrap ? '' : d.gaps[0]!.what, /src\/scripts\/land\.ts: a type error in a file no generator owns/)
  assert.equal(buildDecision(buildTriage('npm ERR! something else', DRAIN_WRITERS, RECONCILE_OUTPUTS)).bootstrap, false)
})

test('wing domains are the changed generators that emit a wing — never an entry point or a reader', () => {
  const src: Record<string, string> = {
    'src/scripts/lean-clay.ts': "import { emit, range } from './lean-gen.js'",
    'src/scripts/lean-one.ts': "import { provePending } from './lean-gen.js'",
    'src/scripts/lean-heartbeats.ts': "import { ROOT, MAXBUF } from './lean-gen.js'",
    'src/scripts/lean-clay.test.ts': "import { emit } from './lean-gen.js'",
  }
  assert.equal(isWingGenerator(src['src/scripts/lean-clay.ts']!), true)
  assert.deepEqual(wingDomains([...Object.keys(src), 'src/scripts/land.ts'], (p) => src[p] ?? null), ['clay'])
})

test('a round re-runs the order\'s tail from its earliest objection; a cure outside the order is followed by the reseal', () => {
  const order = HEAL_ORDER.map((o) => o.cure)
  assert.deepEqual(roundSteps([], order, RESEAL_FROM), [])
  assert.deepEqual(roundSteps(['court record stale'], order, RESEAL_FROM), ['court record stale', 'derived layer drift (spin)'])
  assert.deepEqual(roundSteps(['derived layer drift (spin)', 'axiom witness stale'], order, RESEAL_FROM), order.slice(order.indexOf('axiom witness stale')))
  assert.deepEqual(roundSteps(['rosetta mirror stale'], order, RESEAL_FROM), ['rosetta mirror stale', 'court record stale', 'derived layer drift (spin)'])
  assert.equal(roundBound(8), 9)
})

test('the oscillation detector names a two-writer pair and the files each side rewrote', () => {
  const spin = 'derived layer drift (spin)', court = 'court record stale'
  const rounds: Round[] = [
    { rewrote: { 'proved wings not yet served': ['src/theorems/generated.ts'] }, objections: [court] },
    { rewrote: { [court]: ['lean/refusal-trials.json'], [spin]: ['spin-manifest.json'] }, objections: [spin] },
    { rewrote: { [spin]: ['lean/axioms.json', 'spin-manifest.json'] }, objections: [court] },
  ]
  const v = loopVerdict(rounds, 9)
  assert.equal(v.kind, 'two-writers')
  if (v.kind !== 'two-writers') return
  assert.deepEqual(v.sides[0].objections, [court])
  assert.deepEqual(Object.keys(v.sides[0].rewrote), [court, spin])
  assert.deepEqual(v.sides[1].objections, [spin])
  assert.deepEqual(v.shared, ['spin-manifest.json'])
  const gap = loopGap(v)
  assert.match(gap.what, /TWO WRITERS: "court record stale" is cured by court record stale, derived layer drift \(spin\) \(rewrites lean\/refusal-trials\.json, spin-manifest\.json\)/)
  assert.match(gap.what, /rewrites lean\/axioms\.json, spin-manifest\.json\) brings back the first/)
})

test('CONTROL — converged, stuck and bound are told apart from the pair', () => {
  assert.equal(loopVerdict([{ rewrote: {}, objections: [] }], 9).kind, 'converged')
  assert.equal(loopVerdict([{ rewrote: {}, objections: ['a'] }], 9).kind, 'continue')
  assert.equal(loopVerdict([{ rewrote: {}, objections: ['a'] }, { rewrote: { a: ['x'] }, objections: ['a'] }], 9).kind, 'stuck')
  // a, b, c: no repeat, so no pair — the bound ends it
  assert.equal(loopVerdict([{ rewrote: {}, objections: ['a'] }, { rewrote: {}, objections: ['b'] }, { rewrote: {}, objections: ['c'] }], 3).kind, 'bound')
})

test('land is judged by HEAD == origin/main, and a refused certification is reported with its reasons verbatim', () => {
  assert.deepEqual(landVerdict({ exitOk: true, head: 'abc', origin: 'abc', out: '', proof: '' }), { landed: true, clean: true, gaps: [] })
  // exit 0 over an absent push is not a landing
  assert.equal(landVerdict({ exitOk: true, head: 'abc', origin: 'def', out: 'Everything up-to-date', proof: '' }).landed, false)
  const proof = '✔ passes GAP and FIX in its name\n✖ battery reaches the manifest\n    AssertionError: skill infinity missing\n    at src/battery.test.ts:12\n# fail 1\n'
  const v = landVerdict({ exitOk: false, head: 'abc', origin: 'def', out: '✗ land — the COMMITTED tree does not prove green', proof })
  assert.equal(v.landed, false)
  assert.deepEqual(v.gaps.slice(1).map((g) => g.what), [
    '✗ land — the COMMITTED tree does not prove green',
    '✖ battery reaches the manifest', '    AssertionError: skill infinity missing', '    at src/battery.test.ts:12', '# fail 1',
  ])
  assert.deepEqual(failingTests('✔ a test named GAP FIX\n# fail 0\n'), [])
  // landed, then the forge refused: landed and not clean
  const refused = landVerdict({ exitOk: false, head: 'abc', origin: 'abc', out: '✗ land — THE PUSH LANDED AND THE FORGE REFUSED IT.', proof: '' })
  assert.equal(refused.landed && !refused.clean, true)
})

test('the live tools are the ones the served instructions name, called with the arguments they write', () => {
  const instructions = 'After your first deposit: uuidna_quantum_advantage (…). Alpine apps: uuidna_exec. poll uuidna_gate_status {messaging:true} or uuidna_coin_ledger. Integrity.'
  const listed = ['uuidna_exec', 'uuidna_gate_status', 'uuidna_coin_ledger', 'uuidna_quantum_advantage', 'uuidna_laws']
  assert.deepEqual(toolsNamed(instructions, listed), ['uuidna_quantum_advantage', 'uuidna_exec', 'uuidna_gate_status', 'uuidna_coin_ledger'])
  assert.deepEqual(instructionArgs(instructions, 'uuidna_gate_status'), { messaging: true })
  assert.equal(instructionArgs(instructions, 'uuidna_exec'), null)
  const served = { properties: { line: { description: 'e.g.' } }, required: ['line'] }
  const local = { properties: { line: { description: 'e.g. "apk add nginx", "cat /core"' } }, required: ['line'] }
  assert.deepEqual(argsFor('uuidna_exec', instructions, served, local), { args: { line: 'apk add nginx' }, missing: [] })
  assert.deepEqual(argsFor('uuidna_exec', instructions, served), { args: {}, missing: ['line'] })
})

test('a live failure is a GAP naming the tool and the answer; an event-stream reply is read like JSON', () => {
  assert.equal(liveVerdict('uuidna_laws', { result: { content: [{ text: '{"allHold":true,"laws":[]}' }] } }).ok, true)
  const down = liveVerdict('uuidna_laws', { result: { content: [{ text: '{"allHold":false,"laws":[{"law":"Any manual fails","holds":false}]}' }] } })
  assert.match(down.gap?.what ?? '', /uuidna_laws: answered allHold: false — not holding: Any manual fails/)
  assert.match(liveVerdict('uuidna_exec', { error: { code: -32602, message: 'unknown tool' } }).gap?.what ?? '', /uuidna_exec: JSON-RPC error -32602 — unknown tool/)
  assert.match(liveVerdict('uuidna_exec', { result: { isError: true, content: [{ text: 'boom' }] } }).gap?.what ?? '', /isError — boom/)
  assert.match(liveVerdict('x', null, 'timeout').gap?.what ?? '', /x: no JSON-RPC answer \(timeout\)/)
  assert.deepEqual(rpcOfBody('event: message\ndata: {"result":{"content":[]}}\n\n', 'text/event-stream'), { result: { content: [] } })
})

test('the run receipt is content-addressed over what it states', () => {
  const a = runReceipt({ stages: [], shas: { start: 'abc' }, live: [], rounds: 0 })
  const b = runReceipt({ stages: [], shas: { start: 'abd' }, live: [], rounds: 0 })
  assert.notEqual(a.address, b.address)
  assert.equal(runReceipt({ stages: [], shas: { start: 'abc' }, live: [], rounds: 0 }).address, a.address)
})

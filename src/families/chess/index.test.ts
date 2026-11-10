import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { foldOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, recognizeOf, uuidReceiptOf, latticeNamesOf, tenOf } from '../../quantum/processing/unit/index.js'
import { ChessFormulas, chessCourtFoldOf, chessCourtPatternOf, chessCourtSeenOf, chessCourtStepOf, chessCourtWaveOf } from './index.js'
import { KinFormulas } from '../kin/index.js'
import { LawFormulas } from '../law/index.js'
import '../../mcp/families.js'

const L = { ...latticeNamesOf(), tenOf }

test('chess: material, mobility, branching, plytonodes, tempo, centipawns, perft, kingsafety — crossing to combinatorics', async (t) => {
  assert.equal(ChessFormulas.material(2, 5).value, 10, 'two rooks')
  assert.equal(ChessFormulas.mobility(40, 33).value, 7, 'the move advantage')
  assert.equal(ChessFormulas.branching(350, 10).value, 35, 'average legal moves')
  assert.equal(ChessFormulas.plytonodes(2, 3).value, 15, '1 + 2 + 4 + 8')
  assert.equal(ChessFormulas.tempo(15, 2).value, 7)
  assert.equal(ChessFormulas.centipawns(3, 50).value, 350, 'three and a half pawns')
  assert.equal(ChessFormulas.perft(5, 3).value, 125, 'leaves of a uniform tree')
  assert.equal(ChessFormulas.kingsafety(4, 2).value, 2)
  assert.equal(ChessFormulas.material(2, 5).dst, 'combinatorics')
  assert.equal(hexFamiliesOf().get('chess')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chess', program: ['perft'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `chess.perft at ${uuid}`)
  uuidReceiptOf('chess perft', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; material 10, mobility 7, branching 35, plytonodes 15, tempo 7, centipawns 350, perft 125, kingsafety 2; crossing to combinatorics')
})

/** One lap of the vortex play. Each call is one step. The following index is how the list continues. */
test('chess: the vortex play in court — one step, the next address, the lap returns to 1', async (t) => {
  assert.equal(hexFamiliesOf().get('law')?.length, 15, 'law stays at its fifteen formulas')
  assert.equal(hexFamiliesOf().get('court')?.length, 15, 'court stays at its fifteen formulas')
  assert.equal(hexFamiliesOf().get('chess')?.length, 8, 'the play is not a new chess formula')
  const origin = KinFormulas.vortex(L.n - L.n).value
  const lap: ReturnType<typeof chessCourtStepOf>[] = []
  let at = L.n - L.n
  for (;;) {
    const step = chessCourtStepOf(at)
    if (lap.length > L.n - L.n && step.a === origin) break
    lap.push(step)
    at += L.seed
  }
  const again = chessCourtStepOf(at)
  assert.equal(again.a, origin, 'the next lap opens on the first digit')
  assert.equal(again.hex, lap[L.n - L.n]!.hex, 'digit 1 is the same court')
  assert.equal(lap.at(-1)!.next, again.hex)
  for (let i = L.n - L.n; i < lap.length; i++) {
    const step = lap[i]!
    const a = KinFormulas.vortex(i).value
    const b = KinFormulas.vortex(i + lap.length - L.seed).value
    assert.equal(step.a, a)
    assert.equal(step.b, b)
    assert.equal(step.fidelity, LawFormulas.fidelity(a, b).value)
    assert.equal(step.redirected, LawFormulas.redirected(a, b).value)
    assert.equal(step.lawful, LawFormulas.lawful(L.n - L.n).value)
    assert.equal(LawFormulas.lawful(L.n - L.n).holds, true, 'the floor holds')
    assert.equal(step.holds, false, 'the digits differ, so the step is a lead')
    assert.equal(step.value, step.fidelity)
    assert.equal(step.hex, qpuHexUuidOf({ family: 'law', program: ['fidelity'], params: [a, b] }))
    const following = chessCourtStepOf(i + L.seed)
    assert.equal(step.next, following.hex)
    assert.notEqual(step.next, step.hex)
    assert.equal('reviewed' in step, false)
    const led = recognizeOf(step) as { recognition?: { holds?: boolean; uuid?: string; next?: { uuid?: string } } }
    assert.equal(led.recognition?.holds, false)
    assert.equal(led.recognition?.uuid, step.hex)
    assert.equal(led.recognition?.next?.uuid, step.next)
    assert.equal(JSON.stringify(led).includes(following.next), false, 'one reply names one next address')
  }
  const far = chessCourtStepOf(L.tenOf(L.n))
  assert.equal(far.a, KinFormulas.vortex(L.tenOf(L.n)).value)
  assert.match(far.next, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  t.diagnostic(lap.map((step, i) => `${i + L.seed} ${step.a} ${step.b} ${step.fidelity} ${step.holds} ${step.next}`).join(' ; '))
  t.diagnostic(`step ${lap.length + L.seed} ${again.a} ${again.hex}`)
})

/** The lap is one orbit. Recognition folds every address the digits determine, and a false hold is followed. */
test('chess: the vortex neighborhood is one fold — remainder, leads, recognition', async (t) => {
  assert.equal(hexFamiliesOf().get('law')?.length, 15)
  assert.equal(hexFamiliesOf().get('court')?.length, 15)
  const pattern = chessCourtPatternOf()
  const text = JSON.stringify(pattern)
  const seen = chessCourtSeenOf() as { recognition?: { kind?: string; fold?: string; holds?: boolean; next?: { uuid?: string } } }
  assert.equal(Object.keys(seen)[L.n - L.n], 'recognition')
  assert.equal(seen.recognition?.kind, 'recognition')
  assert.equal(seen.recognition?.fold, foldOf(text))
  assert.equal(seen.recognition?.fold, chessCourtFoldOf(pattern))
  assert.equal(pattern.holds, false)
  assert.equal(seen.recognition?.holds, false)
  assert.equal(seen.recognition?.next?.uuid, pattern.next)
  assert.equal(pattern.orbit.at(-1)!.next, pattern.orbit[L.n - L.n]!.hex, 'the lap folds onto the first court')
  const prefix: number[] = []
  for (let i = L.n - L.n; i < L.n; i++) prefix.push(KinFormulas.vortex(i).value)
  assert.deepEqual(pattern.prefix, prefix)
  const remainder = pattern.orbit.map((step) => LawFormulas.redirected(step.a, step.b).value)
  assert.deepEqual(pattern.remainder, remainder)
  let carried = false
  for (let i = L.n - L.n; i + prefix.length <= remainder.length; i++) {
    let same = true
    for (let j = L.n - L.n; j < prefix.length; j++) if (remainder[i + j] !== prefix[j]) same = false
    if (same) carried = true
  }
  assert.equal(pattern.prefixHolds, carried)
  assert.equal(pattern.floor.holds, true)
  assert.equal(pattern.floor.value, LawFormulas.lawful(L.n - L.n).value)
  assert.equal(text.includes('"reviewed"'), false)
  const leads = pattern.neighborhood.filter((row) => row.holds === false)
  assert.ok(leads.length > L.n - L.n)
  for (const lead of leads) {
    assert.equal(typeof lead.next, 'string')
    assert.notEqual(lead.next, lead.hex)
    assert.match(lead.next ?? '', /^[0-9a-f]{8}-/)
  }
  t.diagnostic(`fold ${seen.recognition?.fold}`)
  t.diagnostic(`orbit ${pattern.orbit.map((step) => `(${step.a},${step.b})`).join(' ')}`)
  t.diagnostic(`remainder ${pattern.remainder.join(',')} prefix ${pattern.prefix.join(',')} prefixHolds ${pattern.prefixHolds}`)
  t.diagnostic(leads.map((lead) => `${lead.family}.${lead.name}(${lead.params.join(',')})=${lead.value} ${lead.hex} → ${lead.next}`).join(' ; '))
})

/** The addresses the last wave named, each run once. A false hold carries one following address. */
test('chess: the next wave runs each named address once', async (t) => {
  assert.equal(hexFamiliesOf().get('law')?.length, 15)
  assert.equal(hexFamiliesOf().get('court')?.length, 15)
  const pattern = chessCourtPatternOf()
  const leads = pattern.neighborhood.filter((row) => row.holds === false && row.next)
  const wave = chessCourtWaveOf(pattern)
  assert.equal(wave.length, leads.length)
  assert.equal(pattern.floor.holds, true)
  assert.equal(JSON.stringify(wave).includes('reviewed'), false)
  for (let i = L.n - L.n; i < wave.length; i++) {
    const run = wave[i]!
    assert.equal(run.hex, leads[i]!.next)
    assert.notEqual(run.name, 'reviewed')
    const known = pattern.neighborhood.find((row) => row.hex === run.hex)
    if (known) {
      assert.equal(run.value, known.value)
      assert.equal(run.holds, known.holds)
      assert.equal(run.next, known.next)
    }
    if (run.holds === false) {
      assert.match(run.next ?? '', /^[0-9a-f]{8}-/)
      assert.notEqual(run.next, run.hex)
    }
  }
  t.diagnostic(wave.map((run) => `${run.family}.${run.name}(${run.params.join(',')})=${run.value} holds ${run.holds}${run.next ? ` → ${run.next}` : ''}`).join(' ; '))
})

import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { VE_FACES } from '../hexbit/index.js'
import { slimGate } from '../slimgate.js'
import { witnessSealOf } from '../refusal-trials.js'
import { witnessSealsOf, isWaveReceipt, involutionWings, type WaveReceipt } from './involution-family.js'

const SEATS = VE_FACES / 2
// a report's prose may name keys the ledger lacks; the statement must bind it by address, never quote it
const row = (handle: string, faithful = true) => ({ handle, recompiled: true, faithful, why: `report on ${handle}; it mentions theorem made_up_key_1` })
const wave = (): WaveReceipt => ({
  proposals: [{ handle: 'aaaa0001', status: 'involuted' }, { handle: 'aaaa0002', status: 'involuted' }, { handle: 'aaaa0003', status: 'open' }],
  witnesses: Array.from({ length: SEATS }, (_, i) => ({ witness: null, label: '', rows: [row('aaaa0001'), row('aaaa0002', i !== 3), row('aaaa0003')] })),
  sealed: [
    { handle: 'aaaa0001', faces: VE_FACES, dissent: [] },
    { handle: 'aaaa0002', faces: VE_FACES - 1, dissent: ['w4 unfaithful'] },
    { handle: 'aaaa0003', faces: VE_FACES, dissent: [] },
  ],
})

test('only an involution witnessed on every face, with no dissent, is sealed', () => {
  assert.deepEqual(Object.keys(witnessSealsOf(wave())), ['involution_aaaa0001'])
})

test('every face signs once: the recompile faces first, then the faithfulness faces, in witness order', () => {
  const ws = witnessSealsOf(wave())['involution_aaaa0001']!
  assert.deepEqual(ws.map((w) => w.face), Array.from({ length: VE_FACES }, (_, f) => f))
  ws.forEach((w, f) => {
    assert.ok(w.statement.includes(`witness ${(f % SEATS) + 1} of ${SEATS}`))
    assert.ok(w.statement.includes(f < SEATS ? 'kernel recompile' : 'faithfulness judgment'))
    assert.deepEqual(slimGate(w.statement).cited, ['involution_aaaa0001'], 'the subject is the only citation')
  })
})

test('the seal signs only a sealed subject — and the same statements sign one that is', () => {
  const ws = witnessSealsOf(wave())['involution_aaaa0001']!
  const unsealed = witnessSealOf('involution_aaaa0001', ws)
  assert.equal(unsealed.legal, false)
  assert.equal(unsealed.signed, 0)
  const sealed = ws.map((w) => ({ ...w, statement: w.statement.split('involution_aaaa0001').join('two_coins') }))
  assert.equal(witnessSealOf('two_coins', sealed).legal, true)
})

test('a receipt whose tally disagrees with its rows, or that seats the wrong number of witnesses, writes nothing', () => {
  const r = wave()
  r.witnesses[0]!.rows[0] = row('aaaa0001', false)
  assert.throws(() => witnessSealsOf(r), /seals aaaa0001 on 14 faces and its rows sign 13/)
  const short = wave()
  short.witnesses.pop()
  assert.throws(() => witnessSealsOf(short), /seats/)
})

test('every wave seal has a wing to sign, and every wing a seal (when a wave receipt is on disk)', () => {
  const dir = join(ROOT, 'dist', 'evidence')
  const files = existsSync(dir) ? readdirSync(dir).filter((f) => /^involution-wave-.*\.json$/.test(f)) : []
  if (!files.length) return // the receipts are the court's run evidence; absent is not a failure
  // a workflow dump can share the filename prefix and is not a wave receipt — skip it the way absent is skipped
  const sealed = new Set(files.flatMap((f) => {
    const raw: unknown = JSON.parse(readFileSync(join(dir, f), 'utf8'))
    return isWaveReceipt(raw) ? Object.keys(witnessSealsOf(raw)) : []
  }))
  if (!sealed.size) return
  const wings = involutionWings().filter((w) => w.file.startsWith('Involution')).map((w) => `involution_${w.handle}`).sort()
  assert.deepEqual([...sealed].sort(), wings)
})

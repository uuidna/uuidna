import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReverberationFormulas } from './index.js'
import '../../mcp/families.js'

test('reverberation: sabine, rt60, absorptionarea, meanfreepath, criticaldistance, decayrate, earlyreflections, clarity — crossing to acoustics', async (t) => {
  assert.equal(ReverberationFormulas.sabine(1000, 20).value, 8, 'Sabine RT60 for the hall')
  assert.equal(ReverberationFormulas.rt60(2000, 50, 2).value, 3)
  assert.equal(ReverberationFormulas.absorptionarea(200, 35).value, 70, 'sabins of absorption')
  assert.equal(ReverberationFormulas.meanfreepath(1000, 100).value, 40)
  assert.equal(ReverberationFormulas.criticaldistance(100, 2).value, 4)
  assert.equal(ReverberationFormulas.decayrate(60, 2).value, 30, 'dB per second')
  assert.equal(ReverberationFormulas.earlyreflections(17, 340).value, 50, 'first reflection in ms')
  assert.equal(ReverberationFormulas.clarity(80, 20).value, 40)
  assert.equal(ReverberationFormulas.sabine(1000, 20).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('reverberation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'reverberation', program: ['sabine'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 8, `reverberation.sabine at ${uuid}`)
  uuidReceiptOf('reverberation sabine', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; sabine 8, rt60 3, absorptionarea 70, meanfreepath 40, criticaldistance 4, decayrate 30, earlyreflections 50, clarity 40; crossing to acoustics')
})

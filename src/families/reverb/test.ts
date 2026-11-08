import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReverbFormulas } from './index.js'
import '../../mcp/families.js'

test('reverb: rt60, earlyreflections, decaytime, predelay, diffusion, dampingratio, roommodes, wetdrymix — crossing to acoustics', async (t) => {
  assert.equal(ReverbFormulas.rt60(1000, 20).value, 80, 'the Sabine decay of the room')
  assert.equal(ReverbFormulas.earlyreflections(34, 340).value, 100, 'first reflection in ms')
  assert.equal(ReverbFormulas.decaytime(60, 30).value, 30)
  assert.equal(ReverbFormulas.predelay(51, 34, 340).value, 50, 'the gap before the tail')
  assert.equal(ReverbFormulas.diffusion(70, 100).value, 70)
  assert.equal(ReverbFormulas.dampingratio(30, 40).value, 75)
  assert.equal(ReverbFormulas.roommodes(340, 5).value, 34, 'the fundamental room mode')
  assert.equal(ReverbFormulas.wetdrymix(30, 70).value, 30, 'wet share of the mix')
  assert.equal(ReverbFormulas.rt60(1000, 20).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('reverb')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'reverb', program: ['roommodes'], params: [340, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 34, `reverb.roommodes at ${uuid}`)
  uuidReceiptOf('reverb roommodes', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rt60 80, earlyreflections 100, decaytime 30, predelay 50, diffusion 70, dampingratio 75, roommodes 34, wetdrymix 30; crossing to acoustics')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NeurologyFormulas } from './index.js'
import '../../mcp/families.js'

test('neurology: glasgow, reflex, conduction, seizure, stroke, latency, perfusion, recovery — crossing to med', async (t) => {
  assert.equal(NeurologyFormulas.glasgow(4, 5, 6).value, 15, 'a fully responsive patient')
  assert.equal(NeurologyFormulas.reflex(2).value, 2)
  assert.equal(NeurologyFormulas.conduction(60, 2).value, 30, 'metres per second')
  assert.equal(NeurologyFormulas.seizure(3, 30).value, 10)
  assert.equal(NeurologyFormulas.stroke(8, 40).value, 20)
  assert.equal(NeurologyFormulas.latency(100).value, 100)
  assert.equal(NeurologyFormulas.perfusion(900, 18).value, 50)
  assert.equal(NeurologyFormulas.recovery(3, 4).value, 75)
  assert.equal(NeurologyFormulas.glasgow(4, 5, 6).dst, 'med')
  assert.equal(hexFamiliesOf().get('neurology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'neurology', program: ['conduction'], params: [60, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `neurology.conduction at ${uuid}`)
  uuidReceiptOf('neurology conduction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; glasgow 15, reflex 2, conduction 30, seizure 10, stroke 20, latency 100, perfusion 50, recovery 75; crossing to med')
})

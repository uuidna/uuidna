import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VolcanologyFormulas } from './index.js'
import '../../mcp/families.js'

test('volcanology: vei, effusion, viscosity, ash, magma, pyroclastic, gas, repose — crossing to seismology', async (t) => {
  assert.equal(VolcanologyFormulas.vei(7).value, 7, 'the explosivity index proxy')
  assert.equal(VolcanologyFormulas.effusion(1000, 10).value, 100, 'volume per hour')
  assert.equal(VolcanologyFormulas.viscosity(50, 1000).value, 50)
  assert.equal(VolcanologyFormulas.ash(1000, 4).value, 250)
  assert.equal(VolcanologyFormulas.magma(6000, 60).value, 100, 'hours to refill')
  assert.equal(VolcanologyFormulas.pyroclastic(30, 4).value, 120)
  assert.equal(VolcanologyFormulas.gas(900, 500).value, 400)
  assert.equal(VolcanologyFormulas.gas(300, 500).value, 0, 'no excess')
  assert.equal(VolcanologyFormulas.repose(42).value, 42)
  assert.equal(VolcanologyFormulas.effusion(1000, 10).dst, 'seismology')
  assert.equal(hexFamiliesOf().get('volcanology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'volcanology', program: ['effusion'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `volcanology.effusion at ${uuid}`)
  uuidReceiptOf('volcanology effusion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vei 7, effusion 100, viscosity 50, ash 250, magma 100, pyroclastic 120, gas 400, repose 42; crossing to seismology')
})

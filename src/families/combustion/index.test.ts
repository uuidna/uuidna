import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CombustionFormulas } from './index.js'
import '../../mcp/families.js'

test('combustion: airfuelratio, excessair, flametemp, heatrelease, stoichiometric, efficiency, emissions, calorific — crossing to thermochemistry', async (t) => {
  assert.equal(CombustionFormulas.airfuelratio(150, 10).value, 15, 'air per unit fuel')
  assert.equal(CombustionFormulas.excessair(120, 100).value, 20, 'twenty percent excess air')
  assert.equal(CombustionFormulas.flametemp(300, 1800).value, 2100, 'adiabatic flame temperature')
  assert.equal(CombustionFormulas.heatrelease(5, 40).value, 200)
  assert.equal(CombustionFormulas.stoichiometric(8, 18).value, 12, 'O₂ for octane')
  assert.equal(CombustionFormulas.efficiency(85, 100).value, 85)
  assert.equal(CombustionFormulas.emissions(100, 3).value, 300)
  assert.equal(CombustionFormulas.calorific(4000, 100).value, 40)
  assert.equal(CombustionFormulas.heatrelease(5, 40).dst, 'thermochemistry')
  assert.equal(hexFamiliesOf().get('combustion')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'combustion', program: ['heatrelease'], params: [5, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `combustion.heatrelease at ${uuid}`)
  uuidReceiptOf('combustion heatrelease', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; airfuelratio 15, excessair 20, flametemp 2100, heatrelease 200, stoichiometric 12, efficiency 85, emissions 300, calorific 40; crossing to thermochemistry')
})

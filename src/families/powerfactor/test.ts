import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PowerfactorFormulas } from './index.js'
import '../../mcp/families.js'

test('powerfactor: ratio, realpower, apparentpower, reactivepower, correction, phaseangle, capacitorkvar, efficiency — crossing to electronics', async (t) => {
  assert.equal(PowerfactorFormulas.ratio(80, 100).value, 80)
  assert.equal(PowerfactorFormulas.realpower(100, 8).value, 800)
  assert.equal(PowerfactorFormulas.apparentpower(100, 10).value, 1000)
  assert.equal(PowerfactorFormulas.reactivepower(1000, 800).value, 200)
  assert.equal(PowerfactorFormulas.correction(100, 80).value, 20)
  assert.equal(PowerfactorFormulas.phaseangle(900, 10).value, 90)
  assert.equal(PowerfactorFormulas.capacitorkvar(600, 10).value, 60)
  assert.equal(PowerfactorFormulas.efficiency(95, 100).value, 95)
  assert.equal(PowerfactorFormulas.ratio(80, 100).dst, 'electronics')
  assert.equal(hexFamiliesOf().get('powerfactor')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'powerfactor', program: ['ratio'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `powerfactor.ratio at ${uuid}`)
  uuidReceiptOf('powerfactor ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ratio 80, realpower 800, apparentpower 1000, reactivepower 200, correction 20, phaseangle 90, capacitorkvar 60, efficiency 95; crossing to electronics')
})

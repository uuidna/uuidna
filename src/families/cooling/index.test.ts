import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CoolingFormulas } from './index.js'
import '../../mcp/families.js'

test('cooling: dissipation, rise, airflow, thermal resistance and the margin — crossing to hardware', async (t) => {
  assert.equal(CoolingFormulas.dissipation(60, 2).value, 30, 'watts removed per °C/W')
  assert.equal(CoolingFormulas.deltat(100, 1).value, 100, 'power × resistance rise')
  assert.equal(CoolingFormulas.airflow(6, 80).value, 480, 'fans × CFM each')
  assert.equal(CoolingFormulas.thermalresistance(50, 100).value, 0, '⌊deltaT/power⌋')
  assert.equal(CoolingFormulas.fanpower(6, 5).value, 30, 'fans × watts each')
  assert.equal(CoolingFormulas.headroom(100, 72).value, 28, 'degrees below Tjmax')
  assert.equal(CoolingFormulas.heatsink(200, 3).value, 600, 'area × coefficient')
  assert.equal(CoolingFormulas.duty(1800, 3000).value, 60, 'RPM of the maximum')
  assert.equal(CoolingFormulas.liquidflow(2, 60).value, 120, 'pumps × LPM each')
  assert.equal(CoolingFormulas.margin(100, 25, 40).value, 35, 'Tjmax less ambient and rise')
  assert.equal(CoolingFormulas.dissipation(60, 2).dst, 'hardware')
  assert.equal(hexFamiliesOf().get('cooling')?.length, 10)
  const uuid = qpuHexUuidOf({ family: 'cooling', program: ['dissipation'], params: [60, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `cooling.dissipation at ${uuid}`)
  uuidReceiptOf('cooling dissipation', contentUuidOf(run), { uuid })
  t.diagnostic('10 formulas; dissipation 30, deltat 100, airflow 480, thermalresistance 0, fanpower 30, headroom 28, heatsink 600, duty 60%, liquidflow 120, margin 35; crossing to hardware')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FuelcellFormulas } from './index.js'
import '../../mcp/families.js'

test('fuelcell: cellvoltage, stackvoltage, efficiency, currentdensity, powerdensity, stackcells, h2consumption, degradation — crossing to energy', async (t) => {
  assert.equal(FuelcellFormulas.cellvoltage(1, 700).value, 700)
  assert.equal(FuelcellFormulas.stackvoltage(100, 700).value, 70000)
  assert.equal(FuelcellFormulas.efficiency(60, 100).value, 60)
  assert.equal(FuelcellFormulas.currentdensity(1000, 1).value, 1000)
  assert.equal(FuelcellFormulas.powerdensity(700, 1).value, 700)
  assert.equal(FuelcellFormulas.stackcells(100, 1).value, 100)
  assert.equal(FuelcellFormulas.h2consumption(1000, 2).value, 500)
  assert.equal(FuelcellFormulas.degradation(90, 100).value, 90)
  assert.equal(FuelcellFormulas.cellvoltage(1, 700).dst, 'energy')
  assert.equal(hexFamiliesOf().get('fuelcell')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fuelcell', program: ['cellvoltage'], params: [1, 700] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 700, `fuelcell.cellvoltage at ${uuid}`)
  uuidReceiptOf('fuelcell cellvoltage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cellvoltage 700, stackvoltage 70000, efficiency 60, currentdensity 1000, powerdensity 700, stackcells 100, h2consumption 500, degradation 90; crossing to energy')
})

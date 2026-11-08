import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NuclearpowerFormulas } from './index.js'
import '../../mcp/families.js'

test('nuclearpower: thermaloutput, electricaloutput, efficiency, fuelburnup, capacityfactor, halflifecycles, coolingloops, decayheat — crossing to energy', async (t) => {
  assert.equal(NuclearpowerFormulas.thermaloutput(3, 1000).value, 3000)
  assert.equal(NuclearpowerFormulas.electricaloutput(3000, 3).value, 1000)
  assert.equal(NuclearpowerFormulas.efficiency(33, 100).value, 33)
  assert.equal(NuclearpowerFormulas.fuelburnup(45, 1).value, 45)
  assert.equal(NuclearpowerFormulas.capacityfactor(90, 100).value, 90)
  assert.equal(NuclearpowerFormulas.halflifecycles(3, 0).value, 3)
  assert.equal(NuclearpowerFormulas.coolingloops(4, 0).value, 4)
  assert.equal(NuclearpowerFormulas.decayheat(7, 100).value, 7)
  assert.equal(NuclearpowerFormulas.thermaloutput(3, 1000).dst, 'energy')
  assert.equal(hexFamiliesOf().get('nuclearpower')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nuclearpower', program: ['thermaloutput'], params: [3, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3000, `nuclearpower.thermaloutput at ${uuid}`)
  uuidReceiptOf('nuclearpower thermaloutput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; thermaloutput 3000, electricaloutput 1000, efficiency 33, fuelburnup 45, capacityfactor 90, halflifecycles 3, coolingloops 4, decayheat 7; crossing to energy')
})

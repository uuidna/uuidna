import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConductionFormulas } from './index.js'
import '../../mcp/families.js'

test('conduction: fourierlaw, resistance, uvalue, rvalue, gradient, fluxdensity, seriesresistance, parallelresistance — crossing to thermodynamics', async (t) => {
  assert.equal(ConductionFormulas.fourierlaw(40, 2, 5).value, 400, 'Fourier conduction rate')
  assert.equal(ConductionFormulas.resistance(100, 5, 2).value, 10, 'slab thermal resistance')
  assert.equal(ConductionFormulas.uvalue(100, 4).value, 25)
  assert.equal(ConductionFormulas.rvalue(120, 5).value, 24)
  assert.equal(ConductionFormulas.gradient(100, 5).value, 20)
  assert.equal(ConductionFormulas.fluxdensity(1000, 5).value, 200)
  assert.equal(ConductionFormulas.seriesresistance(10, 20, 30).value, 60, 'resistances in a wall add')
  assert.equal(ConductionFormulas.parallelresistance(30, 60).value, 20, 'two paths in parallel')
  assert.equal(ConductionFormulas.fourierlaw(40, 2, 5).dst, 'thermodynamics')
  assert.equal(hexFamiliesOf().get('conduction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'conduction', program: ['fourierlaw'], params: [40, 2, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `conduction.fourierlaw at ${uuid}`)
  uuidReceiptOf('conduction fourierlaw', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; fourierlaw 400, resistance 10, uvalue 25, rvalue 24, gradient 20, fluxdensity 200, seriesresistance 60, parallelresistance 20; crossing to thermodynamics')
})

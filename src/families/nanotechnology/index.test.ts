import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NanotechnologyFormulas } from './index.js'
import '../../mcp/families.js'

test('nanotechnology: aspectratio, bandgap, coating, dispersion, particlecount, quantumconfinement, surfacevolume, yieldrate — crossing to materials', async (t) => {
  assert.equal(NanotechnologyFormulas.aspectratio(1000, 10).value, 10000, 'a long thin rod')
  assert.equal(NanotechnologyFormulas.bandgap(500, 5).value, 100)
  assert.equal(NanotechnologyFormulas.coating(3, 4).value, 12)
  assert.equal(NanotechnologyFormulas.dispersion(80, 100).value, 80)
  assert.equal(NanotechnologyFormulas.particlecount(1000, 5).value, 200, 'particles in the mass')
  assert.equal(NanotechnologyFormulas.quantumconfinement(600, 3).value, 200)
  assert.equal(NanotechnologyFormulas.surfacevolume(600, 100).value, 600)
  assert.equal(NanotechnologyFormulas.yieldrate(90, 100).value, 90, 'yield as a percentage')
  assert.equal(NanotechnologyFormulas.coating(3, 4).dst, 'materials')
  assert.equal(hexFamiliesOf().get('nanotechnology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nanotechnology', program: ['particlecount'], params: [1000, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `nanotechnology.particlecount at ${uuid}`)
  uuidReceiptOf('nanotechnology particlecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; aspectratio 10000, bandgap 100, coating 12, dispersion 80, particlecount 200, quantumconfinement 200, surfacevolume 600, yieldrate 90; crossing to materials')
})

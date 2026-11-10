import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LatticeFormulas } from './index.js'
import '../../mcp/families.js'

test('lattice: points, unitcells, coordinationnumber, symmetryorderings, planepairs, packingfraction, latticevectors, millerindices — crossing to crystallography', async (t) => {
  assert.equal(LatticeFormulas.points(10, 10, 10).value, 1000)
  assert.equal(LatticeFormulas.unitcells(100, 8).value, 800)
  assert.equal(LatticeFormulas.coordinationnumber(6, 6).value, 12)
  assert.equal(LatticeFormulas.symmetryorderings(4).value, 24)
  assert.equal(LatticeFormulas.planepairs(6, 2).value, 15)
  assert.equal(LatticeFormulas.packingfraction(74, 100).value, 74)
  assert.equal(LatticeFormulas.latticevectors(3, 0).value, 3)
  assert.equal(LatticeFormulas.millerindices(3).value, 8)
  assert.equal(LatticeFormulas.points(10, 10, 10).dst, 'crystallography')
  assert.equal(hexFamiliesOf().get('lattice')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lattice', program: ['points'], params: [10, 10, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `lattice.points at ${uuid}`)
  uuidReceiptOf('lattice points', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; points 1000, unitcells 800, coordinationnumber 12, symmetryorderings 24, planepairs 15, packingfraction 74, latticevectors 3, millerindices 8; crossing to crystallography')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConstructionFormulas } from './index.js'
import '../../mcp/families.js'

test('construction: area, volume, materials, cost, crew, progress, load, waste — crossing to econ', async (t) => {
  assert.equal(ConstructionFormulas.area(10, 8).value, 80, 'a floor plan')
  assert.equal(ConstructionFormulas.volume(80, 3).value, 240)
  assert.equal(ConstructionFormulas.materials(80, 25).value, 2000)
  assert.equal(ConstructionFormulas.cost(2000, 1500).value, 3500)
  assert.equal(ConstructionFormulas.crew(120, 8).value, 15, 'hours per worker')
  assert.equal(ConstructionFormulas.progress(30, 120).value, 25)
  assert.equal(ConstructionFormulas.load(1000, 4).value, 250)
  assert.equal(ConstructionFormulas.waste(5, 100).value, 5)
  assert.equal(ConstructionFormulas.area(10, 8).dst, 'econ')
  assert.equal(hexFamiliesOf().get('construction')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'construction', program: ['area'], params: [10, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `construction.area at ${uuid}`)
  uuidReceiptOf('construction area', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; area 80, volume 240, materials 2000, cost 3500, crew 15, progress 25, load 250, waste 5; crossing to econ')
})

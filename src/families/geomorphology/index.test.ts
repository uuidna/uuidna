import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeomorphologyFormulas } from './index.js'
import '../../mcp/families.js'

test('geomorphology: slope, erosion, drainage, relief, sediment, sinuosity, incision, weathering — crossing to geology', async (t) => {
  assert.equal(GeomorphologyFormulas.slope(30, 100).value, 30, 'a 30 percent grade')
  assert.equal(GeomorphologyFormulas.erosion(5000, 100).value, 50)
  assert.equal(GeomorphologyFormulas.drainage(240, 60).value, 4, 'streams per unit area')
  assert.equal(GeomorphologyFormulas.relief(2400, 400).value, 2000)
  assert.equal(GeomorphologyFormulas.relief(400, 2400).value, 0)
  assert.equal(GeomorphologyFormulas.sediment(1000, 50).value, 20)
  assert.equal(GeomorphologyFormulas.sinuosity(150, 100).value, 150, 'a winding channel')
  assert.equal(GeomorphologyFormulas.incision(50, 200).value, 25)
  assert.equal(GeomorphologyFormulas.weathering(30, 100).value, 30)
  assert.equal(GeomorphologyFormulas.slope(30, 100).dst, 'geology')
  assert.equal(hexFamiliesOf().get('geomorphology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geomorphology', program: ['drainage'], params: [240, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `geomorphology.drainage at ${uuid}`)
  uuidReceiptOf('geomorphology drainage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; slope 30, erosion 50, drainage 4, relief 2000, sediment 20, sinuosity 150, incision 25, weathering 30; crossing to geology')
})

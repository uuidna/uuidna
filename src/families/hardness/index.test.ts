import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HardnessFormulas } from './index.js'
import '../../mcp/families.js'

test('hardness: brinell, vickers, rockwell, knoop, tensileestimate, indentation, loadratio, scaleconvert — crossing to materials', async (t) => {
  assert.equal(HardnessFormulas.brinell(3000, 10).value, 300, 'load over indentation area')
  assert.equal(HardnessFormulas.vickers(10, 100).value, 185)
  assert.equal(HardnessFormulas.rockwell(100, 30).value, 70, 'base less penetration')
  assert.equal(HardnessFormulas.knoop(10, 1000).value, 142)
  assert.equal(HardnessFormulas.tensileestimate(200).value, 690, 'ultimate strength from Brinell')
  assert.equal(HardnessFormulas.indentation(3000, 300).value, 10)
  assert.equal(HardnessFormulas.loadratio(150, 10).value, 1500)
  assert.equal(HardnessFormulas.scaleconvert(200, 150).value, 300)
  assert.equal(HardnessFormulas.brinell(3000, 10).dst, 'materials')
  assert.equal(hexFamiliesOf().get('hardness')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hardness', program: ['brinell'], params: [3000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `hardness.brinell at ${uuid}`)
  uuidReceiptOf('hardness brinell', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; brinell 300, vickers 185, rockwell 70, knoop 142, tensileestimate 690, indentation 10, loadratio 1500, scaleconvert 300; crossing to materials')
})

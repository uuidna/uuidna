import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AlloysFormulas } from './index.js'
import '../../mcp/families.js'

test('alloys: carbonequivalent, composition, conductivity, density, hardness, meltingpoint, phasefraction, tensile — crossing to materials', async (t) => {
  assert.equal(AlloysFormulas.carbonequivalent(20, 60, 50).value, 40, 'a steel carbon equivalent')
  assert.equal(AlloysFormulas.composition(88, 100).value, 88, 'the base metal is 88% of bronze')
  assert.equal(AlloysFormulas.conductivity(580, 2, 4).value, 290)
  assert.equal(AlloysFormulas.density(16000, 2).value, 8000)
  assert.equal(AlloysFormulas.hardness(600, 3).value, 200, 'a Brinell hardness')
  assert.equal(AlloysFormulas.meltingpoint(1538, 1085).value, 1311, 'iron and copper, averaged')
  assert.equal(AlloysFormulas.phasefraction(3, 4).value, 75)
  assert.equal(AlloysFormulas.tensile(40000, 80).value, 500, 'tensile strength in MPa')
  assert.equal(AlloysFormulas.hardness(600, 3).dst, 'materials')
  assert.equal(hexFamiliesOf().get('alloys')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'alloys', program: ['hardness'], params: [600, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `alloys.hardness at ${uuid}`)
  uuidReceiptOf('alloys hardness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; carbonequivalent 40, composition 88, conductivity 290, density 8000, hardness 200, meltingpoint 1311, phasefraction 75, tensile 500; crossing to materials')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FractureFormulas } from './index.js'
import '../../mcp/families.js'

test('fracture: toughness, stressintensity, criticalcrack, energyrelease, griffith, notchsensitivity, crackgrowth, failurestress — crossing to materials', async (t) => {
  assert.equal(FractureFormulas.toughness(50, 4).value, 200, 'stress through a crack')
  assert.equal(FractureFormulas.stressintensity(2, 50, 4).value, 400)
  assert.equal(FractureFormulas.criticalcrack(200, 50).value, 4, 'the crack the toughness allows')
  assert.equal(FractureFormulas.energyrelease(50, 4, 10).value, 20)
  assert.equal(FractureFormulas.griffith(5, 100).value, 500, 'surface energy of a new face')
  assert.equal(FractureFormulas.notchsensitivity(80, 100).value, 80)
  assert.equal(FractureFormulas.crackgrowth(1000, 3).value, 3000)
  assert.equal(FractureFormulas.failurestress(200, 4).value, 50, 'the stress a crack runs at')
  assert.equal(FractureFormulas.toughness(50, 4).dst, 'materials')
  assert.equal(hexFamiliesOf().get('fracture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fracture', program: ['criticalcrack'], params: [200, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `fracture.criticalcrack at ${uuid}`)
  uuidReceiptOf('fracture criticalcrack', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; toughness 200, stressintensity 400, criticalcrack 4, energyrelease 20, griffith 500, notchsensitivity 80, crackgrowth 3000, failurestress 50; crossing to materials')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ConcreteFormulas } from './index.js'
import '../../mcp/families.js'

test('concrete: volume, cement, watercement, slump, strength, cure, mix, rebar — crossing to materials', async (t) => {
  assert.equal(ConcreteFormulas.volume(10, 4, 2).value, 80, 'a slab of 80 units')
  assert.equal(ConcreteFormulas.cement(80, 7).value, 560, 'seven bags a unit')
  assert.equal(ConcreteFormulas.watercement(50, 100).value, 50, 'a 0.50 water-cement ratio')
  assert.equal(ConcreteFormulas.slump(100, 25).value, 75)
  assert.equal(ConcreteFormulas.strength(28, 1).value, 28, 'C28 at a MPa a day')
  assert.equal(ConcreteFormulas.cure(28, 7).value, 21, 'three weeks still to cure')
  assert.equal(ConcreteFormulas.mix(1, 2, 4).value, 7, 'a 1:2:4 mix is seven parts')
  assert.equal(ConcreteFormulas.rebar(100, 20).value, 5, 'five bars across the span')
  assert.equal(ConcreteFormulas.volume(10, 4, 2).dst, 'materials')
  assert.equal(hexFamiliesOf().get('concrete')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'concrete', program: ['rebar'], params: [100, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `concrete.rebar at ${uuid}`)
  uuidReceiptOf('concrete rebar', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 80, cement 560, watercement 50, slump 75, strength 28, cure 21, mix 7, rebar 5; crossing to materials')
})

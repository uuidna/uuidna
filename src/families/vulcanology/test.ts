import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { VulcanologyFormulas } from './index.js'
import '../../mcp/families.js'

test('vulcanology: vei, ejectavolume, explosivity, lavaflowrate, ashheight, repose, magmaviscosity, hazardindex — crossing to geology', async (t) => {
  assert.equal(VulcanologyFormulas.vei(4, 5).value, 5)
  assert.equal(VulcanologyFormulas.ejectavolume(1000, 3).value, 3000)
  assert.equal(VulcanologyFormulas.explosivity(5000, 1000).value, 5)
  assert.equal(VulcanologyFormulas.lavaflowrate(6000, 60).value, 100)
  assert.equal(VulcanologyFormulas.ashheight(12, 1000).value, 12000)
  assert.equal(VulcanologyFormulas.repose(1000, 200).value, 800)
  assert.equal(VulcanologyFormulas.magmaviscosity(100, 4).value, 400)
  assert.equal(VulcanologyFormulas.hazardindex(80, 100).value, 80)
  assert.equal(VulcanologyFormulas.vei(4, 5).dst, 'geology')
  assert.equal(hexFamiliesOf().get('vulcanology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'vulcanology', program: ['vei'], params: [4, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `vulcanology.vei at ${uuid}`)
  uuidReceiptOf('vulcanology vei', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vei 5, ejectavolume 3000, explosivity 5, lavaflowrate 100, ashheight 12000, repose 800, magmaviscosity 400, hazardindex 80; crossing to geology')
})

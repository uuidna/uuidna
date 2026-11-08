import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SerologyFormulas } from './index.js'
import '../../mcp/families.js'

test('serology: titer, dilutionfactor, antibodypairs, antigencombos, seroconversion, crossreactivity, bindingaffinity, panelsubsets — crossing to immunology', async (t) => {
  assert.equal(SerologyFormulas.titer(8).value, 256)
  assert.equal(SerologyFormulas.dilutionfactor(2, 64).value, 128)
  assert.equal(SerologyFormulas.antibodypairs(10, 2).value, 45)
  assert.equal(SerologyFormulas.antigencombos(12, 3).value, 220)
  assert.equal(SerologyFormulas.seroconversion(95, 100).value, 95)
  assert.equal(SerologyFormulas.crossreactivity(20, 100).value, 20)
  assert.equal(SerologyFormulas.bindingaffinity(60000, 1000).value, 60)
  assert.equal(SerologyFormulas.panelsubsets(6).value, 64)
  assert.equal(SerologyFormulas.titer(8).dst, 'immunology')
  assert.equal(hexFamiliesOf().get('serology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'serology', program: ['titer'], params: [8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 256, `serology.titer at ${uuid}`)
  uuidReceiptOf('serology titer', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; titer 256, dilutionfactor 128, antibodypairs 45, antigencombos 220, seroconversion 95, crossreactivity 20, bindingaffinity 60, panelsubsets 64; crossing to immunology')
})

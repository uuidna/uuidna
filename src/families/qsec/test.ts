import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { QsecFormulas } from './index.js'
import '../../mcp/families.js'

test('qsec: keybits, entropybits, attemptpairs, hashrounds, collisionresistance, attackcost, saltlength, strengthmargin — crossing to statistics', async (t) => {
  assert.equal(QsecFormulas.keybits(8).value, 256)
  assert.equal(QsecFormulas.entropybits(16, 8).value, 128)
  assert.equal(QsecFormulas.attemptpairs(10, 2).value, 45)
  assert.equal(QsecFormulas.hashrounds(10000, 1).value, 10000)
  assert.equal(QsecFormulas.collisionresistance(99, 100).value, 99)
  assert.equal(QsecFormulas.attackcost(10).value, 1024)
  assert.equal(QsecFormulas.saltlength(16, 0).value, 16)
  assert.equal(QsecFormulas.strengthmargin(256, 128).value, 128)
  assert.equal(QsecFormulas.keybits(8).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('qsec')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'qsec', program: ['keybits'], params: [8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 256, `qsec.keybits at ${uuid}`)
  uuidReceiptOf('qsec keybits', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; keybits 256, entropybits 128, attemptpairs 45, hashrounds 10000, collisionresistance 99, attackcost 1024, saltlength 16, strengthmargin 128; crossing to statistics')
})

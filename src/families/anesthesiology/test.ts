import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnesthesiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('anesthesiology: mac, dosage, infusionrate, mapp, bloodloss, oxygenation, reversal, depth — crossing to physiology', async (t) => {
  assert.equal(AnesthesiologyFormulas.mac(70, 50).value, 120, 'volatile plus nitrous MAC fractions')
  assert.equal(AnesthesiologyFormulas.dosage(70, 2).value, 140, 'a propofol induction dose')
  assert.equal(AnesthesiologyFormulas.infusionrate(1200, 24).value, 50)
  assert.equal(AnesthesiologyFormulas.mapp(120, 60).value, 80, 'mean arterial pressure')
  assert.equal(AnesthesiologyFormulas.bloodloss(5000, 45, 30).value, 1666)
  assert.equal(AnesthesiologyFormulas.oxygenation(100, 50).value, 200, 'the P/F ratio')
  assert.equal(AnesthesiologyFormulas.reversal(70, 50).value, 3500)
  assert.equal(AnesthesiologyFormulas.depth(45, 60).value, 1, 'adequate depth')
  assert.equal(AnesthesiologyFormulas.depth(70, 60).value, 0)
  assert.equal(AnesthesiologyFormulas.mac(70, 50).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('anesthesiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'anesthesiology', program: ['mapp'], params: [120, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `anesthesiology.mapp at ${uuid}`)
  uuidReceiptOf('anesthesiology mapp', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; mac 120, dosage 140, infusionrate 50, mapp 80, bloodloss 1666, oxygenation 200, reversal 3500, depth 1; crossing to physiology')
})

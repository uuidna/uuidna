import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JainismFormulas } from './index.js'
import '../../mcp/families.js'

test('jainism: vows, principles, tirthankaras, karmatypes, substancecombos, stageorderings, nonviolencelevels, liberationpaths — crossing to philosophy', async (t) => {
  assert.equal(JainismFormulas.vows(5, 0).value, 5)
  assert.equal(JainismFormulas.principles(3, 0).value, 3)
  assert.equal(JainismFormulas.tirthankaras(24, 0).value, 24)
  assert.equal(JainismFormulas.karmatypes(8, 0).value, 8)
  assert.equal(JainismFormulas.substancecombos(6, 2).value, 15)
  assert.equal(JainismFormulas.stageorderings(5).value, 120)
  assert.equal(JainismFormulas.nonviolencelevels(5, 0).value, 5)
  assert.equal(JainismFormulas.liberationpaths(3).value, 8)
  assert.equal(JainismFormulas.vows(5, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('jainism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'jainism', program: ['vows'], params: [5, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `jainism.vows at ${uuid}`)
  uuidReceiptOf('jainism vows', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; vows 5, principles 3, tirthankaras 24, karmatypes 8, substancecombos 15, stageorderings 120, nonviolencelevels 5, liberationpaths 8; crossing to philosophy')
})

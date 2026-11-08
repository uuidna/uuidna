import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StoicismFormulas } from './index.js'
import '../../mcp/families.js'

test('stoicism: virtues, dichotomypairs, passionstates, controlratio, disciplineorderings, impressionfilters, apatheiaindex, preferredindifferents — crossing to psychology', async (t) => {
  assert.equal(StoicismFormulas.virtues(4, 0).value, 4)
  assert.equal(StoicismFormulas.dichotomypairs(10, 2).value, 45)
  assert.equal(StoicismFormulas.passionstates(4).value, 16)
  assert.equal(StoicismFormulas.controlratio(50, 100).value, 50)
  assert.equal(StoicismFormulas.disciplineorderings(3).value, 6)
  assert.equal(StoicismFormulas.impressionfilters(3, 3).value, 9)
  assert.equal(StoicismFormulas.apatheiaindex(80, 100).value, 80)
  assert.equal(StoicismFormulas.preferredindifferents(10, 10).value, 20)
  assert.equal(StoicismFormulas.virtues(4, 0).dst, 'psychology')
  assert.equal(hexFamiliesOf().get('stoicism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stoicism', program: ['virtues'], params: [4, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `stoicism.virtues at ${uuid}`)
  uuidReceiptOf('stoicism virtues', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; virtues 4, dichotomypairs 45, passionstates 16, controlratio 50, disciplineorderings 6, impressionfilters 9, apatheiaindex 80, preferredindifferents 20; crossing to psychology')
})

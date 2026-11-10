import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MitosisFormulas } from './index.js'
import '../../mcp/families.js'

test('mitosis: cellcount, chromosomes, cyclelength, doublingtime, generations, growthfraction, mitoticindex, phasefraction — crossing to genetics', async (t) => {
  assert.equal(MitosisFormulas.cellcount(5, 3).value, 40, 'five cells after three doublings')
  assert.equal(MitosisFormulas.chromosomes(100, 46).value, 4600, 'a hundred human cells')
  assert.equal(MitosisFormulas.cyclelength(11, 8, 5).value, 24, 'a 24-hour cycle')
  assert.equal(MitosisFormulas.doublingtime(48, 4).value, 12)
  assert.equal(MitosisFormulas.generations(48, 24).value, 2, 'two divisions in two days')
  assert.equal(MitosisFormulas.growthfraction(300, 1000).value, 30)
  assert.equal(MitosisFormulas.mitoticindex(50, 1000).value, 5)
  assert.equal(MitosisFormulas.phasefraction(6, 24).value, 25)
  assert.equal(MitosisFormulas.cellcount(5, 3).dst, 'genetics')
  assert.equal(hexFamiliesOf().get('mitosis')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mitosis', program: ['cellcount'], params: [5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `mitosis.cellcount at ${uuid}`)
  uuidReceiptOf('mitosis cellcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cellcount 40, chromosomes 4600, cyclelength 24, doublingtime 12, generations 2, growthfraction 30, mitoticindex 5, phasefraction 25; crossing to genetics')
})

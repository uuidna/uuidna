import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProtozoologyFormulas } from './index.js'
import '../../mcp/families.js'

test('protozoology: cellcount, divisionrate, motilitytypes, cystcount, virulenceindex, speciespairs, generationtime, infectivity — crossing to microbiology', async (t) => {
  assert.equal(ProtozoologyFormulas.cellcount(1000, 10).value, 10000)
  assert.equal(ProtozoologyFormulas.divisionrate(8).value, 256)
  assert.equal(ProtozoologyFormulas.motilitytypes(3, 1).value, 4)
  assert.equal(ProtozoologyFormulas.cystcount(5000, 50).value, 100)
  assert.equal(ProtozoologyFormulas.virulenceindex(70, 100).value, 70)
  assert.equal(ProtozoologyFormulas.speciespairs(12, 2).value, 66)
  assert.equal(ProtozoologyFormulas.generationtime(1440, 8).value, 180)
  assert.equal(ProtozoologyFormulas.infectivity(60, 100).value, 60)
  assert.equal(ProtozoologyFormulas.cellcount(1000, 10).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('protozoology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'protozoology', program: ['cellcount'], params: [1000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10000, `protozoology.cellcount at ${uuid}`)
  uuidReceiptOf('protozoology cellcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cellcount 10000, divisionrate 256, motilitytypes 4, cystcount 100, virulenceindex 70, speciespairs 66, generationtime 180, infectivity 60; crossing to microbiology')
})

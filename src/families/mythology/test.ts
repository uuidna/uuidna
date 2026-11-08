import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MythologyFormulas } from './index.js'
import '../../mcp/families.js'

test('mythology: pantheonsize, deitypairs, archetypecount, narrativeorderings, motifsubsets, genealogylinks, questcombos, variantcount — crossing to anthropology', async (t) => {
  assert.equal(MythologyFormulas.pantheonsize(12, 3).value, 15)
  assert.equal(MythologyFormulas.deitypairs(12, 2).value, 66)
  assert.equal(MythologyFormulas.archetypecount(7, 2).value, 14)
  assert.equal(MythologyFormulas.narrativeorderings(6).value, 720)
  assert.equal(MythologyFormulas.motifsubsets(5).value, 32)
  assert.equal(MythologyFormulas.genealogylinks(12, 3).value, 36)
  assert.equal(MythologyFormulas.questcombos(10, 3).value, 120)
  assert.equal(MythologyFormulas.variantcount(40, 20).value, 60)
  assert.equal(MythologyFormulas.pantheonsize(12, 3).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('mythology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mythology', program: ['pantheonsize'], params: [12, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `mythology.pantheonsize at ${uuid}`)
  uuidReceiptOf('mythology pantheonsize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pantheonsize 15, deitypairs 66, archetypecount 14, narrativeorderings 720, motifsubsets 32, genealogylinks 36, questcombos 120, variantcount 60; crossing to anthropology')
})

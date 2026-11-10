import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChoreographyFormulas } from './index.js'
import '../../mcp/families.js'

test('choreography: dancers, formationorderings, stepcombos, beatspermeasure, symmetrygroups, phrasecount, spacingmeters, syncratio — crossing to kinematics', async (t) => {
  assert.equal(ChoreographyFormulas.dancers(12, 4).value, 16)
  assert.equal(ChoreographyFormulas.formationorderings(5).value, 120)
  assert.equal(ChoreographyFormulas.stepcombos(16, 3).value, 560)
  assert.equal(ChoreographyFormulas.beatspermeasure(4, 8).value, 32)
  assert.equal(ChoreographyFormulas.symmetrygroups(4).value, 16)
  assert.equal(ChoreographyFormulas.phrasecount(64, 8).value, 8)
  assert.equal(ChoreographyFormulas.spacingmeters(100, 4).value, 25)
  assert.equal(ChoreographyFormulas.syncratio(90, 100).value, 90)
  assert.equal(ChoreographyFormulas.dancers(12, 4).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('choreography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'choreography', program: ['dancers'], params: [12, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `choreography.dancers at ${uuid}`)
  uuidReceiptOf('choreography dancers', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dancers 16, formationorderings 120, stepcombos 560, beatspermeasure 32, symmetrygroups 16, phrasecount 8, spacingmeters 25, syncratio 90; crossing to kinematics')
})

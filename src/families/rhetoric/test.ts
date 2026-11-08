import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RhetoricFormulas } from './index.js'
import '../../mcp/families.js'

test('rhetoric: ethos, pathos, logos, persuasion, cadence, emphasis, clarity, devices — crossing to linguistics', async (t) => {
  assert.equal(RhetoricFormulas.ethos(100, 4).value, 25, 'credibility per source')
  assert.equal(RhetoricFormulas.pathos(30, 120).value, 25)
  assert.equal(RhetoricFormulas.logos(60, 12).value, 5, 'evidence per claim')
  assert.equal(RhetoricFormulas.persuasion(75, 100).value, 75, 'three in four convinced')
  assert.equal(RhetoricFormulas.cadence(100, 10).value, 10, 'syllables per line')
  assert.equal(RhetoricFormulas.emphasis(20, 200).value, 10)
  assert.equal(RhetoricFormulas.clarity(90, 100).value, 90)
  assert.equal(RhetoricFormulas.devices(7).value, 7)
  assert.equal(RhetoricFormulas.ethos(100, 4).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('rhetoric')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'rhetoric', program: ['ethos'], params: [100, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `rhetoric.ethos at ${uuid}`)
  uuidReceiptOf('rhetoric ethos', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; ethos 25, pathos 25, logos 5, persuasion 75, cadence 10, emphasis 10, clarity 90, devices 7; crossing to linguistics')
})

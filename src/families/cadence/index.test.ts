import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CadenceFormulas } from './index.js'
import '../../mcp/families.js'

test('cadence: rootmotion, resolutionstrength, chordspan, phraselength, harmonicrhythm, tensionrelease, approachinterval, finalitytype — crossing to music', async (t) => {
  assert.equal(CadenceFormulas.rootmotion(0, 7).value, 7, 'root up a fifth')
  assert.equal(CadenceFormulas.resolutionstrength(3, 4).value, 12)
  assert.equal(CadenceFormulas.chordspan(0, 16).value, 16)
  assert.equal(CadenceFormulas.phraselength(4, 4).value, 16, 'beats in a four-bar phrase')
  assert.equal(CadenceFormulas.harmonicrhythm(8, 4).value, 2, 'two chords per bar')
  assert.equal(CadenceFormulas.tensionrelease(3, 4).value, 75)
  assert.equal(CadenceFormulas.approachinterval(11, 12).value, 1, 'leading tone to tonic')
  assert.equal(CadenceFormulas.finalitytype(5, 3).value, 1, 'authentic arrival')
  assert.equal(CadenceFormulas.finalitytype(2, 3).value, 0)
  assert.equal(CadenceFormulas.rootmotion(0, 7).dst, 'music')
  assert.equal(hexFamiliesOf().get('cadence')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cadence', program: ['harmonicrhythm'], params: [8, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `cadence.harmonicrhythm at ${uuid}`)
  uuidReceiptOf('cadence harmonicrhythm', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rootmotion 7, resolutionstrength 12, chordspan 16, phraselength 16, harmonicrhythm 2, tensionrelease 75, approachinterval 1, finalitytype 1; crossing to music')
})

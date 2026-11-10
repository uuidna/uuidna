import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OrigamiFormulas } from './index.js'
import '../../mcp/families.js'

test('origami: creasecount, foldorderings, mountainvalley, flatfoldability, vertexpairs, layersubsets, crimpangle, panelcount — crossing to geometry', async (t) => {
  assert.equal(OrigamiFormulas.creasecount(20, 12).value, 32)
  assert.equal(OrigamiFormulas.foldorderings(6).value, 720)
  assert.equal(OrigamiFormulas.mountainvalley(16, 2).value, 32)
  assert.equal(OrigamiFormulas.flatfoldability(100, 100).value, 100)
  assert.equal(OrigamiFormulas.vertexpairs(12, 2).value, 66)
  assert.equal(OrigamiFormulas.layersubsets(5).value, 32)
  assert.equal(OrigamiFormulas.crimpangle(180, 4).value, 45)
  assert.equal(OrigamiFormulas.panelcount(8, 4).value, 32)
  assert.equal(OrigamiFormulas.creasecount(20, 12).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('origami')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'origami', program: ['creasecount'], params: [20, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `origami.creasecount at ${uuid}`)
  uuidReceiptOf('origami creasecount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; creasecount 32, foldorderings 720, mountainvalley 32, flatfoldability 100, vertexpairs 66, layersubsets 32, crimpangle 45, panelcount 32; crossing to geometry')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StagecraftFormulas } from './index.js'
import '../../mcp/families.js'

test('stagecraft: flats, riggingpoints, stagearea, scenechanges, trusscombos, sightlines, weightkg, loadmargin — crossing to geometry', async (t) => {
  assert.equal(StagecraftFormulas.flats(12, 8).value, 20)
  assert.equal(StagecraftFormulas.riggingpoints(20, 4).value, 80)
  assert.equal(StagecraftFormulas.stagearea(12, 10).value, 120)
  assert.equal(StagecraftFormulas.scenechanges(5, 3).value, 8)
  assert.equal(StagecraftFormulas.trusscombos(10, 2).value, 45)
  assert.equal(StagecraftFormulas.sightlines(6, 2).value, 30)
  assert.equal(StagecraftFormulas.weightkg(50, 20).value, 1000)
  assert.equal(StagecraftFormulas.loadmargin(1000, 800).value, 200)
  assert.equal(StagecraftFormulas.flats(12, 8).dst, 'geometry')
  assert.equal(hexFamiliesOf().get('stagecraft')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'stagecraft', program: ['flats'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `stagecraft.flats at ${uuid}`)
  uuidReceiptOf('stagecraft flats', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flats 20, riggingpoints 80, stagearea 120, scenechanges 8, trusscombos 45, sightlines 30, weightkg 1000, loadmargin 200; crossing to geometry')
})

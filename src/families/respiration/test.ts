import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RespirationFormulas } from './index.js'
import '../../mcp/families.js'

test('respiration: atpyield, oxygenuptake, respiratoryquotient, minuteventilation, tidalvolume, gasexchange, metabolicrate, glucoseoxidation — crossing to physiology', async (t) => {
  assert.equal(RespirationFormulas.atpyield(2, 38).value, 76, 'two glucose at 38 ATP aerobic')
  assert.equal(RespirationFormulas.oxygenuptake(5, 50).value, 250)
  assert.equal(RespirationFormulas.respiratoryquotient(8, 10).value, 80, 'RQ 0.80 scaled by 100')
  assert.equal(RespirationFormulas.minuteventilation(500, 12).value, 6000, 'tidal volume times rate')
  assert.equal(RespirationFormulas.tidalvolume(6000, 12).value, 500)
  assert.equal(RespirationFormulas.gasexchange(150, 100).value, 50)
  assert.equal(RespirationFormulas.metabolicrate(250, 5).value, 1250)
  assert.equal(RespirationFormulas.glucoseoxidation(3, 6).value, 18, 'six O₂ per glucose')
  assert.equal(RespirationFormulas.gasexchange(100, 150).value, 0)
  assert.equal(RespirationFormulas.atpyield(2, 38).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('respiration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'respiration', program: ['minuteventilation'], params: [500, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 6000, `respiration.minuteventilation at ${uuid}`)
  uuidReceiptOf('respiration minuteventilation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; atpyield 76, oxygenuptake 250, respiratoryquotient 80, minuteventilation 6000, tidalvolume 500, gasexchange 50, metabolicrate 1250, glucoseoxidation 18; crossing to physiology')
})

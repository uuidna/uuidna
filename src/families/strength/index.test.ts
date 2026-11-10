import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StrengthFormulas } from './index.js'
import '../../mcp/families.js'

test('strength: volume, intensity, tonnage, density, relativestrength, restratio, progression, workcapacity — crossing to physiology', async (t) => {
  assert.equal(StrengthFormulas.volume(100, 5, 3).value, 1500)
  assert.equal(StrengthFormulas.intensity(80, 100).value, 80)
  assert.equal(StrengthFormulas.tonnage(500, 10).value, 5000)
  assert.equal(StrengthFormulas.density(5000, 50).value, 100)
  assert.equal(StrengthFormulas.relativestrength(150, 75).value, 200)
  assert.equal(StrengthFormulas.restratio(180, 60).value, 3)
  assert.equal(StrengthFormulas.progression(105, 100).value, 5)
  assert.equal(StrengthFormulas.workcapacity(20, 50).value, 1000)
  assert.equal(StrengthFormulas.volume(100, 5, 3).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('strength')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'strength', program: ['volume'], params: [100, 5, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1500, `strength.volume at ${uuid}`)
  uuidReceiptOf('strength volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 1500, intensity 80, tonnage 5000, density 100, relativestrength 200, restratio 3, progression 5, workcapacity 1000; crossing to physiology')
})

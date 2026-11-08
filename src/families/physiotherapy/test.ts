import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhysiotherapyFormulas } from './index.js'
import '../../mcp/families.js'

test('physiotherapy: rom, strength, recovery, endurance, adherence, pain, gait, balance — crossing to med', async (t) => {
  assert.equal(PhysiotherapyFormulas.rom(90, 120).value, 75, 'range of motion regained')
  assert.equal(PhysiotherapyFormulas.strength(100, 80).value, 125)
  assert.equal(PhysiotherapyFormulas.recovery(30, 50).value, 60, 'function recovered')
  assert.equal(PhysiotherapyFormulas.endurance(100, 5).value, 20, 'reps per session')
  assert.equal(PhysiotherapyFormulas.adherence(18, 20).value, 90)
  assert.equal(PhysiotherapyFormulas.pain(8, 3).value, 5, 'pain relieved from baseline')
  assert.equal(PhysiotherapyFormulas.gait(1000, 10).value, 100)
  assert.equal(PhysiotherapyFormulas.balance(9, 10).value, 90)
  assert.equal(PhysiotherapyFormulas.rom(90, 120).dst, 'med')
  assert.equal(hexFamiliesOf().get('physiotherapy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'physiotherapy', program: ['endurance'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `physiotherapy.endurance at ${uuid}`)
  uuidReceiptOf('physiotherapy endurance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rom 75, strength 125, recovery 60, endurance 20, adherence 90, pain 5, gait 100, balance 90; crossing to med')
})

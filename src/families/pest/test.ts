import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PestFormulas } from './index.js'
import '../../mcp/families.js'

test('pest: economicthreshold, infestationrate, controlefficacy, damageindex, populationgrowth, treatmentcost, survivingfraction, trapcount — crossing to ecology', async (t) => {
  assert.equal(PestFormulas.economicthreshold(500, 20).value, 25, 'treat above this density')
  assert.equal(PestFormulas.infestationrate(45, 300).value, 15)
  assert.equal(PestFormulas.controlefficacy(80, 100).value, 80, 'eighty percent killed')
  assert.equal(PestFormulas.damageindex(150, 3).value, 450)
  assert.equal(PestFormulas.populationgrowth(1000, 25).value, 1250, 'one generation at 25%')
  assert.equal(PestFormulas.treatmentcost(40, 15).value, 600)
  assert.equal(PestFormulas.survivingfraction(20, 100).value, 20)
  assert.equal(PestFormulas.trapcount(1000, 40).value, 25, 'traps for the field')
  assert.equal(PestFormulas.economicthreshold(500, 20).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('pest')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pest', program: ['trapcount'], params: [1000, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `pest.trapcount at ${uuid}`)
  uuidReceiptOf('pest trapcount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; economicthreshold 25, infestationrate 15, controlefficacy 80, damageindex 450, populationgrowth 1250, treatmentcost 600, survivingfraction 20, trapcount 25; crossing to ecology')
})

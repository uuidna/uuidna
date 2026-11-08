import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExistentialismFormulas } from './index.js'
import '../../mcp/families.js'

test('existentialism: freedomchoices, authenticitymodes, anguishindex, projectorderings, facticitypairs, badfaithratio, situationsubsets, becomingstages — crossing to philosophy', async (t) => {
  assert.equal(ExistentialismFormulas.freedomchoices(5).value, 32)
  assert.equal(ExistentialismFormulas.authenticitymodes(2, 1).value, 3)
  assert.equal(ExistentialismFormulas.anguishindex(60, 100).value, 60)
  assert.equal(ExistentialismFormulas.projectorderings(4).value, 24)
  assert.equal(ExistentialismFormulas.facticitypairs(6, 2).value, 15)
  assert.equal(ExistentialismFormulas.badfaithratio(40, 100).value, 40)
  assert.equal(ExistentialismFormulas.situationsubsets(4).value, 16)
  assert.equal(ExistentialismFormulas.becomingstages(3, 2).value, 5)
  assert.equal(ExistentialismFormulas.freedomchoices(5).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('existentialism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'existentialism', program: ['freedomchoices'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 32, `existentialism.freedomchoices at ${uuid}`)
  uuidReceiptOf('existentialism freedomchoices', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; freedomchoices 32, authenticitymodes 3, anguishindex 60, projectorderings 24, facticitypairs 15, badfaithratio 40, situationsubsets 16, becomingstages 5; crossing to philosophy')
})

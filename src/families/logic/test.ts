import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LogicFormulas } from './index.js'
import '../../mcp/families.js'

test('logic: truthtable, conjunction, disjunction, implication, equivalence, satisfiable, entropy, proof — crossing to code', async (t) => {
  assert.equal(LogicFormulas.truthtable(3).value, 8, 'eight rows over three variables')
  assert.equal(LogicFormulas.conjunction(1, 0).value, 0)
  assert.equal(LogicFormulas.disjunction(1, 0).value, 1)
  assert.equal(LogicFormulas.implication(0, 1).value, 1, 'false implies anything')
  assert.equal(LogicFormulas.implication(1, 0).value, 0)
  assert.equal(LogicFormulas.equivalence(1, 1).value, 1)
  assert.equal(LogicFormulas.satisfiable(3, 8).value, 37)
  assert.equal(LogicFormulas.entropy(1, 4).value, 25)
  assert.equal(LogicFormulas.proof(10, 2).value, 5)
  assert.equal(LogicFormulas.truthtable(3).dst, 'code')
  assert.equal(hexFamiliesOf().get('logic')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'logic', program: ['conjunction'], params: [1, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 0, `logic.conjunction at ${uuid}`)
  uuidReceiptOf('logic conjunction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; truthtable 8, conjunction 0, disjunction 1, implication 1/0, equivalence 1, satisfiable 37, entropy 25, proof 5; crossing to code')
})

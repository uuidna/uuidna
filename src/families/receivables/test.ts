import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ReceivablesFormulas } from './index.js'
import '../../mcp/families.js'

test('receivables: turnover, dso, aging, baddebt, collection, outstanding, factoring, terms — crossing to accounting', async (t) => {
  assert.equal(ReceivablesFormulas.turnover(1000, 250).value, 4, 'credit sales turn the book four times')
  assert.equal(ReceivablesFormulas.dso(50000, 365000).value, 50, 'fifty days to collect')
  assert.equal(ReceivablesFormulas.aging(1000, 600).value, 400, 'overdue once current is off')
  assert.equal(ReceivablesFormulas.baddebt(10000, 3).value, 300)
  assert.equal(ReceivablesFormulas.collection(950, 1000).value, 95, 'collected ninety-five percent')
  assert.equal(ReceivablesFormulas.outstanding(1000, 750).value, 250)
  assert.equal(ReceivablesFormulas.outstanding(500, 800).value, 0, 'never negative')
  assert.equal(ReceivablesFormulas.factoring(5000, 80).value, 4000, 'the factor advances four fifths')
  assert.equal(ReceivablesFormulas.terms(2000, 2).value, 40)
  assert.equal(ReceivablesFormulas.turnover(1000, 250).dst, 'accounting')
  assert.equal(hexFamiliesOf().get('receivables')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'receivables', program: ['turnover'], params: [1000, 250] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `receivables.turnover at ${uuid}`)
  uuidReceiptOf('receivables turnover', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turnover 4, dso 50, aging 400, baddebt 300, collection 95, outstanding 250, factoring 4000, terms 40; crossing to accounting')
})

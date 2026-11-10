import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LiteracyFormulas } from './index.js'
import '../../mcp/families.js'

test('literacy: wordsperminute, comprehension, fluency, readinglevel, vocabulary, accuracy, lexiledelta, fogindex — crossing to pedagogy', async (t) => {
  assert.equal(LiteracyFormulas.wordsperminute(300, 60).value, 300, 'three hundred words a minute')
  assert.equal(LiteracyFormulas.comprehension(8, 10).value, 80)
  assert.equal(LiteracyFormulas.fluency(300, 80).value, 240, 'correct words per minute')
  assert.equal(LiteracyFormulas.readinglevel(120, 8).value, 15)
  assert.equal(LiteracyFormulas.vocabulary(4500, 5000).value, 90)
  assert.equal(LiteracyFormulas.accuracy(95, 100).value, 95)
  assert.equal(LiteracyFormulas.lexiledelta(1000, 850).value, 150, 'the gap to close')
  assert.equal(LiteracyFormulas.lexiledelta(800, 850).value, 0)
  assert.equal(LiteracyFormulas.fogindex(100, 5, 10).value, 12)
  assert.equal(LiteracyFormulas.wordsperminute(300, 60).dst, 'pedagogy')
  assert.equal(hexFamiliesOf().get('literacy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'literacy', program: ['wordsperminute'], params: [300, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `literacy.wordsperminute at ${uuid}`)
  uuidReceiptOf('literacy wordsperminute', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; wordsperminute 300, comprehension 80, fluency 240, readinglevel 15, vocabulary 90, accuracy 95, lexiledelta 150, fogindex 12; crossing to pedagogy')
})

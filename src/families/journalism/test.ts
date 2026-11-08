import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { JournalismFormulas } from './index.js'
import '../../mcp/families.js'

test('journalism: readability, inverted, sources, deadline, engagement, wordcount, factcheck, bias — crossing to content', async (t) => {
  assert.equal(JournalismFormulas.readability(300, 20).value, 15, 'words per sentence')
  assert.equal(JournalismFormulas.inverted(40, 200).value, 20, 'inverted pyramid percent')
  assert.equal(JournalismFormulas.sources(8, 10).value, 80)
  assert.equal(JournalismFormulas.deadline(14, 18).value, 4, 'hours to deadline')
  assert.equal(JournalismFormulas.deadline(20, 18).value, 0, 'past deadline')
  assert.equal(JournalismFormulas.engagement(50, 1000).value, 5, 'shares per read percent')
  assert.equal(JournalismFormulas.wordcount(12, 80).value, 960)
  assert.equal(JournalismFormulas.factcheck(9, 10).value, 90)
  assert.equal(JournalismFormulas.bias(3, 300).value, 1)
  assert.equal(JournalismFormulas.readability(300, 20).dst, 'content')
  assert.equal(hexFamiliesOf().get('journalism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'journalism', program: ['sources'], params: [8, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `journalism.sources at ${uuid}`)
  uuidReceiptOf('journalism sources', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; readability 15, inverted 20, sources 80, deadline 4, engagement 5, wordcount 960, factcheck 90, bias 1; crossing to content')
})

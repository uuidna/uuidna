import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EvidenceFormulas } from './index.js'
import '../../mcp/families.js'

test('evidence: the tribunal weighs by threshold — balance, corroboration, balancing test, chain, sufficiency', async (t) => {
  assert.equal(EvidenceFormulas.weight(7, 3).value, 1, 'the proof for outweighs against')
  assert.equal(EvidenceFormulas.weight(3, 7).value, 0)
  assert.equal(EvidenceFormulas.margin(7, 3).value, 4, 'the facts for stand four above the facts against')
  assert.equal(EvidenceFormulas.margin(3, 7).value, 0, 'no margin when the facts against are heavier')
  assert.equal(EvidenceFormulas.corroboration(1).holds, false, 'one source is not corroboration')
  assert.equal(EvidenceFormulas.corroboration(3).holds, true, 'three independent sources')
  assert.equal(EvidenceFormulas.admissible(8, 3).value, 1, 'probative value exceeds prejudice')
  assert.equal(EvidenceFormulas.admissible(3, 8).value, 0, 'more prejudicial than probative')
  assert.equal(EvidenceFormulas.chain(5, 5).value, 1, 'an intact chain of custody')
  assert.equal(EvidenceFormulas.chain(5, 4).value, 0, 'a broken link')
  assert.equal(EvidenceFormulas.sufficiency(4, 4).value, 1, 'every element made out')
  assert.equal(EvidenceFormulas.sufficiency(4, 3).value, 0, 'an element missing')
  assert.equal(EvidenceFormulas.hearsay(0).value, 0, 'no exception: inadmissible')
  assert.equal(EvidenceFormulas.hearsay(1).value, 1, 'an exception applies')
  assert.equal(hexFamiliesOf().get('evidence')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'evidence', program: ['chain'], params: [5, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1, `evidence.chain at ${uuid}`)
  uuidReceiptOf('evidence chain', contentUuidOf(run), { uuid })
  t.diagnostic('9 formulas; weight 7>3, margin 4, corroboration 3, admissible 8>3, chain 5/5, sufficiency 4/4; crossing to law')
})

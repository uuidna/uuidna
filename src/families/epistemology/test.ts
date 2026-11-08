import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EpistemologyFormulas } from './index.js'
import '../../mcp/families.js'

test('epistemology: beliefstates, justificationpaths, evidencecombos, certaintydegree, inferencedepth, gettiercases, truthconditions, doubtmargin — crossing to philosophy', async (t) => {
  assert.equal(EpistemologyFormulas.beliefstates(8).value, 256)
  assert.equal(EpistemologyFormulas.justificationpaths(4).value, 24)
  assert.equal(EpistemologyFormulas.evidencecombos(12, 3).value, 220)
  assert.equal(EpistemologyFormulas.certaintydegree(80, 100).value, 80)
  assert.equal(EpistemologyFormulas.inferencedepth(3, 2).value, 5)
  assert.equal(EpistemologyFormulas.gettiercases(5, 2).value, 10)
  assert.equal(EpistemologyFormulas.truthconditions(4).value, 16)
  assert.equal(EpistemologyFormulas.doubtmargin(100, 70).value, 30)
  assert.equal(EpistemologyFormulas.beliefstates(8).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('epistemology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'epistemology', program: ['beliefstates'], params: [8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 256, `epistemology.beliefstates at ${uuid}`)
  uuidReceiptOf('epistemology beliefstates', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; beliefstates 256, justificationpaths 24, evidencecombos 220, certaintydegree 80, inferencedepth 5, gettiercases 10, truthconditions 16, doubtmargin 30; crossing to philosophy')
})

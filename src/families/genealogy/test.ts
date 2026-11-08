import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GenealogyFormulas } from './index.js'
import '../../mcp/families.js'

test('genealogy: generations, descendants, lineagepaths, ancestorsatdepth, siblingpairs, cousindegree, marriagelinks, branchingfactor — crossing to anthropology', async (t) => {
  assert.equal(GenealogyFormulas.generations(400, 25).value, 16)
  assert.equal(GenealogyFormulas.descendants(10).value, 1024)
  assert.equal(GenealogyFormulas.lineagepaths(5).value, 120)
  assert.equal(GenealogyFormulas.ancestorsatdepth(4).value, 16)
  assert.equal(GenealogyFormulas.siblingpairs(6, 2).value, 15)
  assert.equal(GenealogyFormulas.cousindegree(8, 2).value, 6)
  assert.equal(GenealogyFormulas.marriagelinks(12, 2).value, 24)
  assert.equal(GenealogyFormulas.branchingfactor(1024, 10).value, 102)
  assert.equal(GenealogyFormulas.generations(400, 25).dst, 'anthropology')
  assert.equal(hexFamiliesOf().get('genealogy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'genealogy', program: ['generations'], params: [400, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `genealogy.generations at ${uuid}`)
  uuidReceiptOf('genealogy generations', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; generations 16, descendants 1024, lineagepaths 120, ancestorsatdepth 16, siblingpairs 15, cousindegree 6, marriagelinks 24, branchingfactor 102; crossing to anthropology')
})

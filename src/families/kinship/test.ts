import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KinshipFormulas } from './index.js'
import '../../mcp/families.js'

test('kinship: coefficientrelatedness, generationdistance, degreeremoval, consanguinity, descendants, ancestorcount, cousindegree, lineagedepth — crossing to sociology', async (t) => {
  assert.equal(KinshipFormulas.coefficientrelatedness(2).value, 250, 'grandparent relatedness per-mille')
  assert.equal(KinshipFormulas.coefficientrelatedness(1).value, 500)
  assert.equal(KinshipFormulas.generationdistance(2, 6).value, 4)
  assert.equal(KinshipFormulas.degreeremoval(3, 5).value, 2)
  assert.equal(KinshipFormulas.consanguinity(3, 2).value, 250, 'inbreeding per-mille over two loops')
  assert.equal(KinshipFormulas.descendants(2, 4).value, 16)
  assert.equal(KinshipFormulas.ancestorcount(5).value, 32)
  assert.equal(KinshipFormulas.cousindegree(4).value, 3)
  assert.equal(KinshipFormulas.lineagedepth(1900, 2000, 25).value, 4, 'a century at 25 years a generation')
  assert.equal(KinshipFormulas.coefficientrelatedness(2).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('kinship')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kinship', program: ['descendants'], params: [2, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `kinship.descendants at ${uuid}`)
  uuidReceiptOf('kinship descendants', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coefficientrelatedness 250, generationdistance 4, degreeremoval 2, consanguinity 250, descendants 16, ancestorcount 32, cousindegree 3, lineagedepth 4; crossing to sociology')
})

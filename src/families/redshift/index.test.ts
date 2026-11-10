import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RedshiftFormulas } from './index.js'
import '../../mcp/families.js'

test('redshift: z, recessionvelocity, hubbledistance, wavelengthshift, lookbacktime, scalefactor, dopplerz, comovingdistance — crossing to cosmology', async (t) => {
  assert.equal(RedshiftFormulas.z(700, 500).value, 400, 'a line stretched four-tenths')
  assert.equal(RedshiftFormulas.recessionvelocity(100, 30000).value, 3000)
  assert.equal(RedshiftFormulas.hubbledistance(7000, 70).value, 100, 'a hundred megaparsecs')
  assert.equal(RedshiftFormulas.wavelengthshift(500, 400).value, 200)
  assert.equal(RedshiftFormulas.lookbacktime(1000, 10).value, 100)
  assert.equal(RedshiftFormulas.scalefactor(1000).value, 500, 'half the present scale at z = 1')
  assert.equal(RedshiftFormulas.dopplerz(3000, 30000).value, 100)
  assert.equal(RedshiftFormulas.comovingdistance(100, 4000).value, 400)
  assert.equal(RedshiftFormulas.z(500, 700).value, 0)
  assert.equal(RedshiftFormulas.z(700, 500).dst, 'cosmology')
  assert.equal(hexFamiliesOf().get('redshift')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'redshift', program: ['hubbledistance'], params: [7000, 70] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `redshift.hubbledistance at ${uuid}`)
  uuidReceiptOf('redshift hubbledistance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; z 400, recessionvelocity 3000, hubbledistance 100, wavelengthshift 200, lookbacktime 100, scalefactor 500, dopplerz 100, comovingdistance 400; crossing to cosmology')
})

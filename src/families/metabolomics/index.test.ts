import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MetabolomicsFormulas } from './index.js'
import '../../mcp/families.js'

test('metabolomics: concentration, flux, pathway, foldchange, turnover, retention, ratio, coverage — crossing to biochemistry', async (t) => {
  assert.equal(MetabolomicsFormulas.concentration(1000, 50).value, 20, 'moles over volume')
  assert.equal(MetabolomicsFormulas.flux(12, 5).value, 60, 'rate scaled by enzyme')
  assert.equal(MetabolomicsFormulas.pathway(100, 8).value, 12)
  assert.equal(MetabolomicsFormulas.foldchange(300, 100).value, 300, 'threefold')
  assert.equal(MetabolomicsFormulas.turnover(25, 200).value, 12)
  assert.equal(MetabolomicsFormulas.retention(42).value, 42)
  assert.equal(MetabolomicsFormulas.ratio(45, 90).value, 50)
  assert.equal(MetabolomicsFormulas.coverage(80, 100).value, 80, 'four fifths of the known set')
  assert.equal(MetabolomicsFormulas.concentration(1000, 50).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('metabolomics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'metabolomics', program: ['pathway'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `metabolomics.pathway at ${uuid}`)
  uuidReceiptOf('metabolomics pathway', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; concentration 20, flux 60, pathway 12, foldchange 300, turnover 12, retention 42, ratio 50, coverage 80; crossing to biochemistry')
})

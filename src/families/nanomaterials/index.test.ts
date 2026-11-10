import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NanomaterialsFormulas } from './index.js'
import '../../mcp/families.js'

test('nanomaterials: surfacearea, aspectratio, bandgap, quantumyield, loading, dispersion, surfacevolume, confinement — crossing to materials', async (t) => {
  assert.equal(NanomaterialsFormulas.surfacearea(1000, 6).value, 6000, 'area over a thousand particles')
  assert.equal(NanomaterialsFormulas.aspectratio(100, 5).value, 20, 'a nanotube aspect ratio')
  assert.equal(NanomaterialsFormulas.bandgap(1120, 300).value, 1420, 'bulk gap widened by confinement')
  assert.equal(NanomaterialsFormulas.quantumyield(80, 100).value, 80)
  assert.equal(NanomaterialsFormulas.loading(20, 80).value, 20, 'weight percent loaded')
  assert.equal(NanomaterialsFormulas.dispersion(600, 1000).value, 60)
  assert.equal(NanomaterialsFormulas.surfacevolume(600, 100).value, 6)
  assert.equal(NanomaterialsFormulas.confinement(3600, 6).value, 100, 'confinement energy at radius 6')
  assert.equal(NanomaterialsFormulas.confinement(3600, 0).value, 0)
  assert.equal(NanomaterialsFormulas.surfacearea(1000, 6).dst, 'materials')
  assert.equal(hexFamiliesOf().get('nanomaterials')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'nanomaterials', program: ['confinement'], params: [3600, 6] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `nanomaterials.confinement at ${uuid}`)
  uuidReceiptOf('nanomaterials confinement', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; surfacearea 6000, aspectratio 20, bandgap 1420, quantumyield 80, loading 20, dispersion 60, surfacevolume 6, confinement 100; crossing to materials')
})

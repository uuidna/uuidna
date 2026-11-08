import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EtymologyFormulas } from './index.js'
import '../../mcp/families.js'

test('etymology: cognaterate, borrowingshare, rootdepth, soundchange, attestationage, derivationchain, loanratio, reconstructionscore — crossing to linguistics', async (t) => {
  assert.equal(EtymologyFormulas.cognaterate(300, 1000).value, 30, 'three in ten words are cognate')
  assert.equal(EtymologyFormulas.borrowingshare(250, 1000).value, 25)
  assert.equal(EtymologyFormulas.rootdepth(4, 3).value, 12, 'twelve reconstructed forms')
  assert.equal(EtymologyFormulas.soundchange(1000, 8).value, 125, 'years per sound shift')
  assert.equal(EtymologyFormulas.attestationage(2024, 1500).value, 524)
  assert.equal(EtymologyFormulas.derivationchain(2, 3).value, 5)
  assert.equal(EtymologyFormulas.loanratio(5000, 90).value, 450)
  assert.equal(EtymologyFormulas.reconstructionscore(80, 75).value, 1, 'reconstruction clears its target')
  assert.equal(EtymologyFormulas.reconstructionscore(70, 75).value, 0)
  assert.equal(EtymologyFormulas.cognaterate(300, 1000).dst, 'linguistics')
  assert.equal(hexFamiliesOf().get('etymology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'etymology', program: ['rootdepth'], params: [4, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12, `etymology.rootdepth at ${uuid}`)
  uuidReceiptOf('etymology rootdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cognaterate 30, borrowingshare 25, rootdepth 12, soundchange 125, attestationage 524, derivationchain 5, loanratio 450, reconstructionscore 1; crossing to linguistics')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HeattransferFormulas } from './index.js'
import '../../mcp/families.js'

test('heattransfer: conduction, convection, radiation, lmtd, nusselt, biot, fourier, effectiveness — crossing to thermodynamics', async (t) => {
  assert.equal(HeattransferFormulas.conduction(50, 20, 10).value, 100, 'Fourier conduction flux through the wall')
  assert.equal(HeattransferFormulas.convection(10, 5, 20).value, 1000, 'Newton cooling off the surface')
  assert.equal(HeattransferFormulas.radiation(3, 2).value, 65, 'net Stefan–Boltzmann exchange')
  assert.equal(HeattransferFormulas.lmtd(40, 20).value, 30)
  assert.equal(HeattransferFormulas.nusselt(100, 2, 5).value, 40)
  assert.equal(HeattransferFormulas.biot(20, 3, 4).value, 15)
  assert.equal(HeattransferFormulas.fourier(4, 25, 2).value, 25, 'dimensionless diffusion time')
  assert.equal(HeattransferFormulas.effectiveness(80, 100).value, 80, 'exchanger effectiveness %')
  assert.equal(HeattransferFormulas.effectiveness(60, 100).value, 60)
  assert.equal(HeattransferFormulas.conduction(50, 20, 10).dst, 'thermodynamics')
  assert.equal(hexFamiliesOf().get('heattransfer')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'heattransfer', program: ['conduction'], params: [50, 20, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `heattransfer.conduction at ${uuid}`)
  uuidReceiptOf('heattransfer conduction', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; conduction 100, convection 1000, radiation 65, lmtd 30, nusselt 40, biot 15, fourier 25, effectiveness 80; crossing to thermodynamics')
})

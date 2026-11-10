import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ZerotrustFormulas } from './index.js'
import '../../mcp/families.js'

test('zerotrust: trustscore, microsegments, verificationrate, blastradius, continuousauth, deviceposture, policycoverage, attacksurface — crossing to networking', async (t) => {
  assert.equal(ZerotrustFormulas.trustscore(90, 100).value, 90, 'trust score as a percentage')
  assert.equal(ZerotrustFormulas.microsegments(100, 8).value, 13, 'thirteen segments for the assets')
  assert.equal(ZerotrustFormulas.verificationrate(950, 1000).value, 95)
  assert.equal(ZerotrustFormulas.blastradius(1000, 20).value, 50, 'assets reachable per breached segment')
  assert.equal(ZerotrustFormulas.continuousauth(3600, 300).value, 12, 're-auths across the hour')
  assert.equal(ZerotrustFormulas.deviceposture(480, 500).value, 96)
  assert.equal(ZerotrustFormulas.policycoverage(180, 200).value, 90)
  assert.equal(ZerotrustFormulas.attacksurface(50, 12).value, 600)
  assert.equal(ZerotrustFormulas.trustscore(90, 100).dst, 'networking')
  assert.equal(hexFamiliesOf().get('zerotrust')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'zerotrust', program: ['microsegments'], params: [100, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 13, `zerotrust.microsegments at ${uuid}`)
  uuidReceiptOf('zerotrust microsegments', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; trustscore 90, microsegments 13, verificationrate 95, blastradius 50, continuousauth 12, deviceposture 96, policycoverage 90, attacksurface 600; crossing to networking')
})

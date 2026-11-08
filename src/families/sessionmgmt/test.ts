import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SessionmgmtFormulas } from './index.js'
import '../../mcp/families.js'

test('sessionmgmt: idletimeout, absolutetimeout, concurrentlimit, tokenttl, renewalwindow, activesessions, expirymargin, cleanupinterval — crossing to networking', async (t) => {
  assert.equal(SessionmgmtFormulas.idletimeout(15, 30).value, 930, 'fifteen minutes plus a grace')
  assert.equal(SessionmgmtFormulas.absolutetimeout(8).value, 28800, 'an eight-hour ceiling in seconds')
  assert.equal(SessionmgmtFormulas.concurrentlimit(100, 5).value, 500, 'five sessions each for a hundred users')
  assert.equal(SessionmgmtFormulas.tokenttl(1000, 3600).value, 4600)
  assert.equal(SessionmgmtFormulas.renewalwindow(3600, 4).value, 900, 'renewal opens a quarter in')
  assert.equal(SessionmgmtFormulas.activesessions(500, 120).value, 380)
  assert.equal(SessionmgmtFormulas.activesessions(100, 400).value, 0, 'never below zero')
  assert.equal(SessionmgmtFormulas.expirymargin(3600, 1200).value, 2400)
  assert.equal(SessionmgmtFormulas.cleanupinterval(1000, 30).value, 34, 'thirty-four sweeps')
  assert.equal(SessionmgmtFormulas.idletimeout(15, 30).dst, 'networking')
  assert.equal(hexFamiliesOf().get('sessionmgmt')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sessionmgmt', program: ['concurrentlimit'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `sessionmgmt.concurrentlimit at ${uuid}`)
  uuidReceiptOf('sessionmgmt concurrentlimit', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; idletimeout 930, absolutetimeout 28800, concurrentlimit 500, tokenttl 4600, renewalwindow 900, activesessions 380, expirymargin 2400, cleanupinterval 34; crossing to networking')
})

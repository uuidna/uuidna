import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TlsFormulas } from './index.js'

/** tls: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('tls: keybits, handshake, suites, sessions, certchain, ticketlife, resumption, combos', async (t) => {
  assert.equal(TlsFormulas.keybits(8).value, 256, 'keybits(8)')
  assert.equal(TlsFormulas.handshake(2, 0).value, 2, 'handshake(2, 0)')
  assert.equal(TlsFormulas.suites(5, 3).value, 15, 'suites(5, 3)')
  assert.equal(TlsFormulas.sessions(1000, 2).value, 2000, 'sessions(1000, 2)')
  assert.equal(TlsFormulas.certchain(3, 0).value, 3, 'certchain(3, 0)')
  assert.equal(TlsFormulas.ticketlife(86400, 3600).value, 24, 'ticketlife(86400, 3600)')
  assert.equal(TlsFormulas.resumption(80, 100).value, 80, 'resumption(80, 100)')
  assert.equal(TlsFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('tls')?.length, 8)
  for (const [name, params, expected] of [["keybits",[8],256],["handshake",[2,0],2],["suites",[5,3],15]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'tls', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `tls.${name} at ${uuid}`)
    uuidReceiptOf(`tls ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "keybits=256, handshake=2, suites=15")
})

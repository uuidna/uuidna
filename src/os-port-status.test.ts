// quantum/os — portStatus + portDelta: AUTOMATE PORT UPDATES made observable and decidable. portStatus reports
// the pinned Alpine port offline; portDelta is the PURE comparator that decides whether an update is due against
// a supplied upstream mirror and names exactly what moved. The properties: the status matches the committed
// mirror, an identical upstream is CURRENT (the no-op), a moved release / changed checksum / added / removed
// package each flips it STALE and is named, and the delta receipt is deterministic + change-sensitive. Controls
// that fail: comparing the port to ITSELF must be current — an instrument that cried stale on no change is broken.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { portStatus, portDelta } from './quantum/os/index.js'
import { INSTALLS_MIRROR } from './index.js'
import { callTool } from './mcp.js'

test('portStatus reports the pinned port — the committed mirror made observable', () => {
  const s = portStatus()
  assert.equal(s.release.version, INSTALLS_MIRROR.release.version, 'the pinned release')
  assert.equal(s.driver.sha256, INSTALLS_MIRROR.driver.sha256, 'the pinned netboot/modloop bundle')
  assert.ok(s.driver.address.includes('-'), 'driver bundle address')
  assert.equal(s.count, INSTALLS_MIRROR.count, 'the pinned package count')
  assert.equal(s.branch, INSTALLS_MIRROR.branch)
  assert.equal(s.bootStates, 32 * (s.count + 1), 'the boot image is 32·(count+1) states')
  assert.ok(s.receipt.length > 0 && s.bootReceipt.length > 0, 'the port and boot receipts are present')
})

test('CONTROL — the port compared to ITSELF is CURRENT: no move, no update due', () => {
  const d = portDelta(INSTALLS_MIRROR)
  assert.equal(d.current, true, 'identical upstream ⇒ current')
  assert.equal(d.releaseChanged, false)
  assert.deepEqual([d.changed.length, d.added.length, d.removed.length], [0, 0, 0], 'nothing moved')
})

test('a moved DRIVER sha flips it STALE and is named', () => {
  const up = {
    ...INSTALLS_MIRROR,
    driver: { ...INSTALLS_MIRROR.driver, sha256: '0'.repeat(64) },
  }
  const d = portDelta(up)
  assert.equal(d.current, false)
  assert.equal(d.driverChanged, true)
  assert.equal(d.driverFrom, INSTALLS_MIRROR.driver.sha256)
  assert.equal(d.driverTo, '0'.repeat(64))
})

test('a moved RELEASE flips it STALE and is named', () => {
  const up = { ...INSTALLS_MIRROR, release: { ...INSTALLS_MIRROR.release, version: '3.99.9' } }
  const d = portDelta(up)
  assert.equal(d.current, false)
  assert.equal(d.releaseChanged, true)
  assert.equal(d.releaseFrom, INSTALLS_MIRROR.release.version)
  assert.equal(d.releaseTo, '3.99.9')
})

test('a changed CHECKSUM, an ADDED and a REMOVED package are each caught and named', () => {
  const pkgs = INSTALLS_MIRROR.packages.map((p) => ({ ...p }))
  // change the first package's checksum
  const target = pkgs[0]!.name
  pkgs[0] = { ...pkgs[0]!, checksum: 'Q1CHANGEDCHANGEDCHANGEDCHANGEDCHANGED=' }
  // add a new package, remove the last
  const removed = pkgs[pkgs.length - 1]!.name
  pkgs.pop()
  pkgs.push({ name: 'newpkg', version: '1.0.0-r0', checksum: 'Q1NEWNEWNEW=', desc: 'a new package', deps: [] })
  const up = { ...INSTALLS_MIRROR, count: pkgs.length, packages: pkgs }
  const d = portDelta(up)
  assert.equal(d.current, false)
  assert.ok(d.changed.some((c) => c.name === target), 'the changed checksum is named')
  assert.ok(d.added.includes('newpkg'), 'the added package is named')
  assert.ok(d.removed.includes(removed), 'the removed package is named')
  assert.equal(d.countTo, pkgs.length, 'the upstream count is reported')
})

test('the delta receipt is deterministic AND change-sensitive', () => {
  assert.equal(portDelta(INSTALLS_MIRROR).receipt, portDelta(INSTALLS_MIRROR).receipt, 'same input, same receipt')
  const up = { ...INSTALLS_MIRROR, release: { ...INSTALLS_MIRROR.release, version: '4.0.0' } }
  assert.notEqual(portDelta(up).receipt, portDelta(INSTALLS_MIRROR).receipt, 'a moved port moves the receipt')
})

test('the SERVED tool uuidna_port reports the pinned port through the wire', () => {
  const r = callTool('uuidna_port', {}) as ReturnType<typeof portStatus>
  assert.equal(r.release.version, INSTALLS_MIRROR.release.version, 'the served status pins the same release')
  assert.equal(r.count, INSTALLS_MIRROR.count)
  assert.equal(r.bootStates, 32 * (r.count + 1), 'the served status carries the boot shape')
})

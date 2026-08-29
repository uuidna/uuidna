// exec-shell — Layer 1 browser production shell (pure).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runExecLine, execShellHelp } from '../quantum/apps/exec-shell.js'
import { portPanelView } from '../quantum/apps/port-panel.js'

test('execShellHelp names Layer 1 and examples', () => {
  const h = execShellHelp()
  assert.match(h, /Layer 1/)
  assert.match(h, /ls \/terminal/)
  assert.match(h, /apk info busybox/)
  assert.match(h, /sequence field/)
  assert.match(h, /nginx/)
})

test('runExecLine — install port ls and apk info', () => {
  const ls = runExecLine('ls /terminal')
  assert.ok(ls.ok, ls.output.join('\n'))
  assert.ok(ls.output.includes('sh') || ls.output.includes('services'))
  assert.ok(ls.receipt.includes('-'))

  const info = runExecLine('apk info busybox')
  assert.ok(info.ok, info.output.join('\n'))
  assert.ok(info.output.some((l) => l.includes('busybox')))

  const app = runExecLine('nginx')
  assert.ok(app.ok, app.output.join('\n'))
  assert.equal(app.applet, 'nginx')
})

test('portPanelView — pinned port observable offline', () => {
  const v = portPanelView()
  assert.ok(v.status.count >= 20)
  assert.equal(v.status.release.version, '3.24.1')
  assert.ok(v.lines.some((l) => l.includes('Alpine')))
})

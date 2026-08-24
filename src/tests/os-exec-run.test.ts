// quantum/os/exec — uuidnaExec, THE BUSYBOX EXECUTOR: the whole ported toolbox reached through ONE door. Each
// applet is uuidna's own pure logic over the virtual OS (the install port's routes), run in the booted sandbox,
// never a binary. The properties: it parses a command line, dispatches to the applet, resolves packages by route
// AND by name, the receipt is deterministic and change-sensitive, and an unknown applet is an honest error — not
// a crash and not a faked answer. Controls that fail included.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaExec, APPLETS } from '../quantum/os/exec.js'
import { installFor } from '../quantum/os/index.js'
import { callTool } from '../mcp.js'

test('ls runs as an applet — the same listing the dedicated tool gives, now through the executor', () => {
  const r = uuidnaExec('ls /terminal')
  assert.equal(r.applet, 'ls')
  assert.ok(r.ok)
  assert.deepEqual(r.output.sort(), ['devices', 'network', 'privileged', 'services', 'sh'], 'the five /terminal members')
})

test('cat reads a file — the package\'s provenance record at a route', () => {
  const r = uuidnaExec('cat /core')
  assert.ok(r.ok)
  const musl = installFor('/core')!
  assert.equal((r.data as { id: string }).id, musl.id, 'cat /core is the musl spec')
  assert.ok(r.output.some((l) => l.includes(musl.checksum)), 'the checksum is shown — the external anchor')
  // control: a route with no package is an honest error, never a faked file
  const miss = uuidnaExec('cat /no-such-route')
  assert.equal(miss.ok, false)
  assert.match(miss.output[0]!, /no ported package/)
})

test('which walks both directions — name→route and route→name', () => {
  const byName = uuidnaExec('which busybox')
  assert.ok(byName.ok)
  assert.equal(byName.output[0], '/terminal', 'busybox lives at /terminal')
  const byRoute = uuidnaExec('which /core')
  assert.ok(byRoute.ok)
  assert.equal(byRoute.output[0], 'musl', '/core is musl')
  // control: a non-package word resolves to nothing, honestly
  assert.equal(uuidnaExec('which nonsense').ok, false)
})

test('stat, pwd, echo — the small applets answer from the sealed spec', () => {
  assert.equal(uuidnaExec('pwd').output[0], '/')
  const stat = uuidnaExec('stat /terminal')
  assert.ok(stat.ok)
  // /terminal resolves to the busybox package itself (which ALSO has children) — in this install set every
  // directory node carries a package, so stat reports the package it IS, not a bare dir.
  assert.equal((stat.data as { kind: string }).kind, 'pkg', '/terminal is the busybox package')
  assert.equal((stat.data as { id: string }).id, 'uuidna/busybox', '/terminal is busybox')
  const echo = uuidnaExec('echo hello')
  assert.equal(echo.output[0], 'hello')
  assert.match((echo.data as { address: string }).address, /^[0-9a-f]{8}-/, 'echo folds its text to an address')
})

test('deterministic AND change-sensitive AND honest on the unknown — the executor cannot fake or drift', () => {
  assert.equal(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /terminal').receipt, 'same line, same receipt')
  assert.notEqual(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /core').receipt, 'different run, different receipt')
  // control: an applet uuidna does NOT port is refused, never guessed (no `rm`, no `sh`, no invented answer)
  const unknown = uuidnaExec('rm -rf /')
  assert.equal(unknown.ok, false)
  assert.match(unknown.output[0]!, /not a ported applet/)
  assert.ok(!APPLETS.includes('rm' as never), 'rm is deliberately not an applet — a provenance OS deletes nothing')
})

test('the SERVED tool uuidna_exec dispatches — the terminal\'s command line answered by the wire', () => {
  const r = callTool('uuidna_exec', { line: 'cat /terminal' }) as ReturnType<typeof uuidnaExec>
  assert.ok(r.ok, 'cat /terminal succeeds through the served tool')
  assert.equal((r.data as { id: string }).id, 'uuidna/busybox', 'the served executor reads the busybox record')
  assert.equal(r.applet, 'cat')
  assert.equal(r.hexbits.length, 32, 'the run is hexbit-compiled')
})

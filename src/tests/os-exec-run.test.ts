// quantum/os/exec — updated for Layer 1 simulation (session + busybox).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaExec, APPLETS, resetExecSession } from '../quantum/os/exec.js'
import { callTool } from '../mcp.js'

test.beforeEach(() => resetExecSession())

test('ls runs as an applet — install-port VFS through the executor', () => {
  const r = uuidnaExec('ls /terminal')
  assert.equal(r.applet, 'ls')
  assert.ok(r.ok)
  assert.deepEqual(r.output.sort(), ['devices', 'network', 'privileged', 'services', 'sh'], 'the five /terminal members')
})

test('busybox applets are ported — pure logic over virtual vfs', () => {
  assert.ok(APPLETS.includes('cat'))
  assert.ok(APPLETS.includes('which'))
  const r = uuidnaExec('which musl')
  assert.ok(r.ok)
  assert.equal(r.output[0], '/core')
})

test('deterministic AND change-sensitive AND honest on the unknown', () => {
  assert.equal(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /terminal').receipt, 'same line, same receipt')
  assert.notEqual(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /core').receipt, 'different run, different receipt')
  const unknown = uuidnaExec('rm -rf /')
  assert.equal(unknown.ok, false)
  assert.match(unknown.output[0]!, /not a ported applet/)
})

test('apk — list, info, deps, search, simulated add', () => {
  const list = uuidnaExec('apk list')
  assert.ok(list.ok)
  assert.ok((list.data as { installed: number }).installed >= 25)

  const add = uuidnaExec('apk add nginx')
  assert.ok(add.ok, add.output.join('\n'))
  assert.match(add.output[0]!, /simulated install/)

  const info = uuidnaExec('apk info busybox')
  assert.ok(info.ok)
  assert.equal((info.data as { name: string }).name, 'busybox')

  const deps = uuidnaExec('apk depends alpine-base')
  assert.ok(deps.ok)

  const search = uuidnaExec('apk search busybox')
  assert.ok(search.ok)
})

test('ls /catalogue — full census by repo', () => {
  const root = uuidnaExec('ls /catalogue')
  assert.ok(root.ok)
  const main = uuidnaExec('ls /catalogue/main')
  assert.ok(main.ok)
  assert.ok((main.data as { count: number }).count >= 500)
})

test('driver and device applets', () => {
  assert.ok(uuidnaExec('driver').ok)
  assert.ok(uuidnaExec('device').ok)
})

test('man — man→app→hexbit is the Alpine app path', () => {
  const r = uuidnaExec('man busybox')
  assert.ok(r.ok)
  const d = r.data as { kind?: string; hexbits?: number[]; app?: string; witnessOk?: boolean }
  assert.equal(d.kind, 'man')
  assert.equal(d.hexbits?.length, 32)
  assert.equal(d.app, 'busybox')
})

test('the SERVED tool uuidna_exec dispatches — Alpine apps at the wire', () => {
  const r = callTool('uuidna_exec', { line: 'apk info busybox' }) as ReturnType<typeof uuidnaExec>
  assert.ok(r.ok)
  assert.equal(r.applet, 'apk')
  assert.equal(r.hexbits.length, 32)
})

test('published Alpine apps are used by name — nginx, busybox, cmd:dotnet; rm stays refused', () => {
  const nginx = uuidnaExec('nginx')
  assert.ok(nginx.ok, nginx.output.join('\n'))
  assert.equal(nginx.applet, 'nginx')
  const d = nginx.data as { kind?: string; name?: string; hexbits?: number[]; state?: string }
  assert.equal(d.kind, 'app')
  assert.equal(d.name, 'nginx')
  assert.equal(d.state, 'AVAILABLE')
  assert.equal(d.hexbits?.length, 32)

  const box = uuidnaExec('busybox')
  assert.ok(box.ok, box.output.join('\n'))
  assert.equal((box.data as { name: string; state: string }).name, 'busybox')
  assert.equal((box.data as { state: string }).state, 'INSTALLED')

  const dotnet = uuidnaExec('dotnet')
  assert.ok(dotnet.ok, dotnet.output.join('\n'))
  assert.equal((dotnet.data as { name: string; via: string }).name, 'dotnet-host')
  assert.equal((dotnet.data as { via: string }).via, 'cmd')

  const omp = uuidnaExec('omp')
  assert.ok(omp.ok, omp.output.join('\n'))
  assert.equal((omp.data as { name: string }).name, 'oh-my-pi')

  const unknown = uuidnaExec('rm -rf /')
  assert.equal(unknown.ok, false)
  assert.match(unknown.output[0]!, /not a ported applet/)
})

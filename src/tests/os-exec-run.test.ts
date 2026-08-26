// quantum/os/exec — uuidnaExec after Alpine apps folded toy busybox. Remaining: ls · apk · man · driver · device · help.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaExec, APPLETS, FOLDED_APPLETS } from '../quantum/os/exec.js'
import { callTool } from '../mcp.js'

test('ls runs as an applet — install-port VFS through the executor', () => {
  const r = uuidnaExec('ls /terminal')
  assert.equal(r.applet, 'ls')
  assert.ok(r.ok)
  assert.deepEqual(r.output.sort(), ['devices', 'network', 'privileged', 'services', 'sh'], 'the five /terminal members')
})

test('toy busybox applets are FOLDED — refuse with a pointer to apk/man, never reimplement', () => {
  for (const toy of FOLDED_APPLETS) {
    const r = uuidnaExec(`${toy} /core`)
    assert.equal(r.ok, false, `${toy} must refuse`)
    assert.match(r.output[0]!, /folded into Alpine apps/, `${toy}: fold message`)
    assert.match(r.output[0]!, /apk info|man /, `${toy}: points at Alpine path`)
  }
  assert.ok(!APPLETS.includes('cat' as never), 'cat is not in the remaining applet set')
  assert.deepEqual([...APPLETS].sort(), ['apk', 'device', 'driver', 'help', 'ls', 'man'])
})

test('deterministic AND change-sensitive AND honest on the unknown', () => {
  assert.equal(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /terminal').receipt, 'same line, same receipt')
  assert.notEqual(uuidnaExec('ls /terminal').receipt, uuidnaExec('ls /core').receipt, 'different run, different receipt')
  const unknown = uuidnaExec('rm -rf /')
  assert.equal(unknown.ok, false)
  assert.match(unknown.output[0]!, /not a ported applet/)
  assert.ok(!APPLETS.includes('rm' as never), 'rm is deliberately not an applet')
})

test('apk — the package manager\'s READ surface: list, info, deps, search', () => {
  const list = uuidnaExec('apk list')
  assert.ok(list.ok)
  assert.ok((list.data as { installed: number }).installed >= 25)
  assert.ok(list.output.some((l) => l.startsWith('musl-')))

  const all = uuidnaExec('apk list --all')
  assert.ok(all.ok)
  assert.ok((all.data as { total: number }).total > 25000)
  assert.ok(all.output.some((l) => l.includes('[main]')))

  const info = uuidnaExec('apk info busybox')
  assert.ok(info.ok)
  assert.equal((info.data as { name: string }).name, 'busybox')

  const deps = uuidnaExec('apk depends alpine-base')
  assert.ok(deps.ok)
  assert.ok((deps.data as { depends: string[] }).depends.length > 0)

  const rdeps = uuidnaExec('apk rdepends musl')
  assert.ok(rdeps.ok)

  const search = uuidnaExec('apk search busybox')
  assert.ok(search.ok)
  assert.ok((search.data as { hits: unknown[] }).hits.length > 1)

  const miss = uuidnaExec('apk search zzznomatch')
  assert.equal(miss.ok, false)
  assert.match(miss.output[0]!, /no such package/)
  assert.match(miss.output[0]!, /Absent UPSTREAM/)

  const add = uuidnaExec('apk add nginx')
  assert.equal(add.ok, false)
  assert.match(add.output[0]!, /not a ported verb|READ only/)
})

test('ls /catalogue — full census by repo', () => {
  const root = uuidnaExec('ls /catalogue')
  assert.ok(root.ok)
  assert.ok(root.output.some((l) => l === 'main/' || l === 'community/'))
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
  assert.equal(d.witnessOk, true)
})

test('the SERVED tool uuidna_exec dispatches — Alpine apps at the wire; uuidna_ls is gone', () => {
  const r = callTool('uuidna_exec', { line: 'apk info busybox' }) as ReturnType<typeof uuidnaExec>
  assert.ok(r.ok)
  assert.equal((r.data as { name: string }).name, 'busybox')
  assert.equal(r.applet, 'apk')
  assert.equal(r.hexbits.length, 32)
  assert.throws(() => callTool('uuidna_ls', { path: '/' }), /unknown tool: uuidna_ls/)
})

// os
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../../boundary.js'
import { toUuid } from '../../../address.js'
import { UUID_HEXBITS } from '../../../hexbit/index.js'
import { handleOf } from '../../../handle.js'
import { channelAudit, layoutCoversUuid, layoutMatchesHandle, monographFaceOf } from '../../../hexagram.js'
import { theorems } from '../../../index.js'
import { publications } from '../../../publish.js'
import { catalogueCompile, cataloguePackage } from '../catalogue/index.js'
import {
  boot, bootBrowser, reset, fresh, exec, shell, ls, servedOS, execShellHelp,
  execSessionStamp, sessionWrite, APPLETS, APK_VERBS, SEQUENCE_VERBS,
} from './index.js'
import { browseCatalogue, inspectCataloguePackage, renderAlpineApp, SHADCN_ALPINE_SLOTS } from '../../../index.js'
import { portPanelView } from '../../apps/port-panel.js'
import { defaultInstalls } from '../index.js'
import { callTool } from '../../../mcp.js'
import { planAlpineRun, pinnedAlpineRelease, verifyPinnedRootfs } from '../../../os/runtime/index.js'
import { listTestSources } from '../../../test-paths.js'

test('tests never import exec outside harness', () => {
  for (const f of listTestSources()) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    assert.doesNotMatch(src, /from ['"].*quantum\/os\/exec\.js/, f)
    assert.doesNotMatch(src, /from ['"].*quantum\/apps\/exec-shell\.js/, f)
    assert.doesNotMatch(src, /from ['"].*quantum\/os\/session\.js/, f)
  }
})

function addresses() {
  const b = boot()
  const os = servedOS()
  const nginx = cataloguePackage('nginx')
  const pub = publications().find((p) => p.publishable && p.address)
  const th = theorems().find((t) => t.skill === 'os') ?? theorems()[0]!
  const out = [
    { label: 'boot', address: b.receipt },
    { label: 'served', address: os.receipt },
    { label: 'theorem', address: th.address },
    { label: 'synthetic', address: toUuid('os-wire') },
  ]
  if (pub?.address) out.push({ label: 'publication', address: pub.address })
  if (nginx) out.push({ label: 'catalogue', address: catalogueCompile(nginx).address })
  return out
}

test('boot + browser self-test', async () => {
  const b = boot()
  assert.ok(b.receipt.includes('-'))
  assert.equal(servedOS().layer.principle, 'lean/Os.lean')
  assert.ok(servedOS().portCount > 20)
  assert.match(execShellHelp(), /Layer 1/)
  const browser = await bootBrowser(true)
  assert.equal(browser.bootReceipt, b.receipt)
  assert.ok(browser.catalogue.count > 20_000)
  assert.equal(browser.selfTest!.failed, 0)
})

test('uuid channel — same wire on every address class', () => {
  for (const { label, address } of addresses()) {
    const ch = channelAudit(address)
    assert.ok(layoutCoversUuid(address), label)
    assert.ok(layoutMatchesHandle(address), label)
    assert.equal(ch.handle, handleOf(address), label)
    assert.equal(ch.trinities.length, 3, label)
    assert.equal(ch.torusHome, true, label)
  }
})

test('monographFaceOf — same keys on every address class', () => {
  const keys = addresses().map(({ label, address }) => {
    const face = monographFaceOf(address)
    assert.equal((face.hexbits as number[]).length, UUID_HEXBITS, label)
    assert.equal(face.handle, handleOf(address), label)
    return Object.keys(face).sort().join(',')
  })
  assert.equal(new Set(keys).size, 1)
})

test('catalogue browser + port panel', () => {
  boot()
  const browse = browseCatalogue('busybox')
  assert.ok(browse.present && browse.total > 0)
  assert.equal(browse.hits.find((h) => h.name === 'busybox')!.hexbits.length, UUID_HEXBITS)
  assert.ok(inspectCataloguePackage('busybox').package?.app === 'busybox')
  assert.match(renderAlpineApp(browse.hits.find((h) => h.name === 'busybox')!), /data-alpine="busybox"/)
  assert.ok(portPanelView().status.count >= 20)
})

test('ls / and /terminal', () => {
  boot()
  const root = ls('/')
  assert.ok(root.count > 0)
  assert.equal(root.sealed, defaultInstalls().receipt)
  const term = ls('/terminal')
  assert.deepEqual(term.entries.map((e) => e.name).sort(), ['devices', 'network', 'privileged', 'services', 'sh'])
  assert.equal((exec('ls /terminal').data as { count: number }).count, term.count)
})

test('shell grammar — catalogue and census', () => {
  fresh()
  for (const line of ['ls /terminal', 'ls /catalogue', 'apk info busybox', 'apk search musl', 'apk list main']) {
    const r = shell(line)
    assert.ok(r.ok, `${line}: ${r.output.join('\n')}`)
    assert.equal(r.hexbits.length, UUID_HEXBITS, line)
  }
})

test('apps across domains', () => {
  fresh()
  for (const { line, applet } of [
    { line: 'nginx', applet: 'nginx' },
    { line: 'openssl', applet: 'openssl' },
    { line: 'dotnet', applet: 'dotnet' },
    { line: 'sequence field', applet: 'sequence' },
    { line: 'omp', applet: 'omp' },
    { line: 'man busybox', applet: 'man' },
  ] as const) {
    const r = shell(line)
    assert.ok(r.ok, line)
    assert.equal(r.applet, applet, line)
  }
})

test('sequence verbs', () => {
  fresh()
  assert.deepEqual([...SEQUENCE_VERBS], ['field', 'run', 'dash', 'invariants'])
  assert.match(exec('sequence field').output.join('\n'), /1\\2\\4\\8/)
  assert.match(exec('sequence dash').output.join('\n'), /closes:\s+true/)
})

test('session apk + vfs', () => {
  fresh()
  const before = execSessionStamp()
  assert.ok(exec('apk add nginx').ok)
  assert.notEqual(execSessionStamp(), before)
  assert.equal((exec('apk info nginx').data as { state: string }).state, 'SESSION')
  sessionWrite('/tmp/hello', 'hello')
  assert.ok(exec('cat /tmp/hello').output[0]!.includes('hello'))
  assert.ok(APPLETS.includes('cat'))
})

test('receipts deterministic; unknown applet refused', () => {
  fresh()
  assert.equal(exec('ls /terminal').receipt, exec('ls /terminal').receipt)
  assert.notEqual(exec('ls /terminal').receipt, exec('ls /core').receipt)
  assert.equal(exec('rm -rf /').ok, false)
})

test('shell ≡ exec; MCP uuidna_exec same mint', () => {
  fresh()
  const line = 'apk policy'
  assert.deepEqual(shell(line).output, exec(line).output)
  boot()
  const r = callTool('uuidna_exec', { line: 'apk info busybox' }) as ReturnType<typeof exec>
  assert.ok(r.ok && r.hexbits.length === UUID_HEXBITS)
})

test('Layer 2 plan when rootfs verifies', () => {
  const plan = planAlpineRun('/bin/busybox --help')
  const verify = verifyPinnedRootfs()
  if (verify.present && verify.ok) assert.ok(plan.ok)
  else assert.equal(plan.ok, false)
})

test('/catalogue boots locally; /terminal uses the MCP wire', () => {
  const cat = readFileSync(join(ROOT, 'docs/.vitepress/theme/CatalogueBrowser.vue'), 'utf8')
  assert.match(cat, /mountUuidnaOS/)
  assert.doesNotMatch(cat, /advantageCall/)
  const term = readFileSync(join(ROOT, 'docs/.vitepress/theme/Terminal.vue'), 'utf8')
  assert.match(term, /advantageCall/)
  assert.doesNotMatch(term, /exec-shell/)
})

// ── THE APPLETS THAT TOUCH THE SESSION. These cannot be checked in the pure suite because their whole point is
// the effect; each is read back through a DIFFERENT door than the one that wrote it, so a write that only
// updated the writer's own view would fail here.

test('tee writes what it echoes, and cat reads back the same bytes', () => {
  const r = exec('tee /tmp/tee-check hello')
  assert.equal(r.ok, true)
  assert.deepEqual((r.data as { wrote: string[] }).wrote, ['/tmp/tee-check'])
  assert.equal(exec('cat /tmp/tee-check').output.join('\n'), 'hello', 'a different door must see the write')
})

test('split writes every piece, and the pieces rejoin to the original', () => {
  sessionWrite('/tmp/split-src', 'l1\nl2\nl3\nl4\nl5')
  const r = exec('split -l 2 /tmp/split-src')
  const wrote = (r.data as { wrote: string[] }).wrote
  assert.deepEqual(wrote, ['/xaa', '/xab', '/xac'])
  const back = wrote.map((p) => exec('cat ' + p).output.join('\n')).join('\n')
  assert.equal(back, 'l1\nl2\nl3\nl4\nl5', 'the split must be lossless when read back through cat')
})

test('cp copies, and REFUSES a source that does not exist instead of writing an empty file', () => {
  sessionWrite('/tmp/cp-src', 'payload')
  assert.equal(exec('cp /tmp/cp-src /tmp/cp-dst').ok, true)
  assert.equal(exec('cat /tmp/cp-dst').output.join(''), 'payload')
  const miss = exec('cp /tmp/definitely-absent /tmp/cp-x')
  assert.equal(miss.ok, false, 'a copy from nothing must fail, not create an empty destination')
  assert.equal(exec('cat /tmp/cp-x').ok, false, 'and it must not have written the destination at all')
})

test('find descends by whether a route LISTS CHILDREN, which is what a directory is here', () => {
  const dirs = exec('find / -type d -maxdepth 1')
  assert.ok(dirs.output.length > 0, 'a -type d that answers empty is the bug this test was written for')
  const files = exec('find / -type f -maxdepth 1')
  assert.equal(new Set([...dirs.output, ...files.output]).size, dirs.output.length + files.output.length,
    'd and f must PARTITION the level, never overlap')
  const named = exec('find / -name util* -maxdepth 3')
  assert.ok(named.output.every((p) => p.split('/').pop()!.startsWith('util')), 'every hit must match the glob')
})

test('the busybox multiplexer dispatches into the one door, and carries an inner refusal out', () => {
  assert.deepEqual(exec('busybox rev abc').output, exec('rev abc').output, 'busybox X is X')
  assert.deepEqual(exec('coreutils factor 91').output, exec('factor 91').output)
  const bare = exec('busybox')
  assert.ok(bare.output[0]!.startsWith('applets:'), 'called bare it lists what it carries')
  const bad = exec('busybox nosuchapplet')
  assert.equal(bad.ok, false, 'an unknown inner applet must not be laundered into a green outer answer')
})

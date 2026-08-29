// default-install packages — ONE AT A TIME, 100% OF THE SEALED CLOSURE.
//
// Start here, not at the 28k catalogue. alpine-base's dependency graph is the world uuidnaOS boots
// (default_install_is_dependency_closed). Each spec is tested as its own package: catalogue identity,
// self-test, handle, apk INSTALLED, ls/cat/stat of its route, man→app when Alpine published docs,
// published cmd: handed to the one Layer 2 planner. No per-language port. A package without man or
// without a binary is named; 100% is every member of the closure, not a padded man corpus.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultInstalls } from '../quantum/os/index.js'
import {
  testDefaultInstallPackages, testInstallPackage, renderDefaultInstallProgress,
  runPackageAtATime, renderPackageAtATime, testAvailablePackage,
  portRemainingAlpine, foldRemainingAlpine, remainingAvailableQueue, readAvailableApp,
  renderRemainingAlpine,
} from '../quantum/os/package-at-a-time.js'
import { planAlpineRuns } from '../os/runtime/index.js'
import { catalogue, cataloguePackage, isAlpineDistroPackage, providedCommands } from '../quantum/os/catalogue.js'
import { UUID_HEXBITS, UUID_BITS, nativeBitWidths } from '../hexbit/index.js'
import { theoremByKey } from '../theorems/index.js'
import { uuidnaExec } from '../quantum/os/exec.js'

test('every default-install package is tested, one at a time, in sealed build order — 100%', () => {
  const port = defaultInstalls()
  const failures: string[] = []
  for (const spec of port.specs) {
    const t = testInstallPackage(spec)
    if (!t.ok) {
      failures.push(`${t.name} (${t.route}): ${t.checks.filter((c) => !c.ok).map((c) => `${c.check}: ${c.detail}`).join('; ')}`)
    }
    assert.equal(t.name, spec.name)
    assert.equal(t.route, spec.route)
  }
  assert.equal(failures.length, 0, `default-install package failures:\n${failures.join('\n')}`)
  assert.equal(port.specs.length, port.count)
})

test('the suite reports 100% of the closure — derived count, every member, none padded', () => {
  const port = defaultInstalls()
  const r = testDefaultInstallPackages()
  assert.equal(r.definition, 'default-install·package-at-a-time')
  assert.equal(r.count, port.count)
  assert.equal(r.passed, r.count, `failed: ${r.failed.join(', ')}`)
  assert.equal(r.failed.length, 0)
  assert.equal(r.complete, true)
  assert.equal(r.packages.length, r.count)
  assert.deepEqual(r.packages.map((p) => p.name), port.specs.map((s) => s.name), 'order is sealed build order')
  assert.ok(r.withMan > 0, 'some default packages publish documentation')
  assert.ok(r.withBinary > 0, 'some default packages publish cmd:')
  assert.ok(r.withMan < r.count, 'a 100% that found man pages for everything would be padding')
})

test('completion and next steps are shown — a finished set is not a closed ledger', () => {
  const r = testDefaultInstallPackages()
  const shown = renderDefaultInstallProgress(r)
  console.log('\n' + shown + '\n')
  assert.match(shown, /^COMPLETE \d+\/\d+ default-install packages/)
  assert.match(shown, /NEXT \/theorem\/research_always_has_a_next/)
  assert.match(shown, /next package:/)
  assert.ok(theoremByKey().has('research_always_has_a_next'))
  assert.equal(r.next.cites, '/theorem/research_always_has_a_next')
  assert.ok(r.next.remaining > 0, 'the catalogue beyond the boot closure is the next work')
  assert.ok(r.next.package, 'the next package must be named')
  assert.ok(r.next.steps.length >= 2, 'next steps: the next package, then the remaining count')
  const names = new Set(r.packages.map((p) => p.name))
  assert.equal(names.has(r.next.package!), false, 'the next package is not already in the default install')
  const row = cataloguePackage(r.next.package!)
  assert.ok(row, 'the next package is in the published catalogue')
  assert.equal(row.repo, r.next.repo)
  assert.equal(r.next.steps[0]!.includes(r.next.package!), true)
})

test('every default-install cmd: has a Layer 2 plan — one door, any language, any binary', () => {
  const r = testDefaultInstallPackages()
  assert.ok(r.commands.length > 0, 'the toolbox publishes binaries')
  const batch = planAlpineRuns(r.commands)
  assert.equal(batch.plans.length, r.commands.length, 'a slot per published command — none dropped')
  if (batch.ok) {
    for (const p of batch.plans) {
      assert.equal(p.plan.ok, true, p.command)
      assert.equal(p.plan.recipe?.command, p.command)
      assert.ok(p.plan.backend === 'docker' || p.plan.backend === 'chroot')
    }
  } else {
    assert.ok(batch.reason, 'refused scaffold must name why')
    for (const p of batch.plans) {
      assert.equal(p.plan.ok, false, p.command)
      assert.equal(p.plan.reason, batch.reason)
    }
  }
})

test('busybox — the toolbox package — is INSTALLED, man-tested, and planned', () => {
  const spec = defaultInstalls().specs.find((s) => s.name === 'busybox')
  assert.ok(spec)
  const t = testInstallPackage(spec)
  assert.equal(t.ok, true, t.checks.filter((c) => !c.ok).map((c) => `${c.check}: ${c.detail}`).join('; '))
  assert.equal(t.route, '/terminal')
  assert.equal(t.man, 'busybox-doc')
  assert.ok(t.commands.includes('busybox'))
  assert.equal(spec.hexbits.length, UUID_HEXBITS)
})

test('after default 100%, package-at-a-time continues automatically at the next AVAILABLE package', () => {
  const boot = testDefaultInstallPackages()
  assert.equal(boot.complete, true)
  assert.ok(boot.next.package, 'research_always_has_a_next names the next row')
  const row = cataloguePackage(boot.next.package!)
  assert.ok(row)
  const one = testAvailablePackage(row)
  assert.equal(one.ok, true, one.checks.filter((c) => !c.ok).map((c) => `${c.check}: ${c.detail}`).join('; '))
  assert.equal(one.name, boot.next.package)
  assert.equal(one.route, `/catalogue/${one.name}`)
  const apk = one.checks.find((c) => c.check === 'apk')
  assert.ok(apk?.detail.startsWith('AVAILABLE'), `next package is AVAILABLE, not INSTALLED: ${apk?.detail}`)

  const r = runPackageAtATime(1)
  const shown = renderPackageAtATime(r)
  console.log('\n' + shown + '\n')
  assert.equal(r.boot.complete, true)
  assert.equal(r.started, boot.next.package)
  assert.equal(r.available.length, 1)
  assert.equal(r.available[0]!.ok, true, r.available[0]!.checks.filter((c) => !c.ok).map((c) => `${c.check}: ${c.detail}`).join('; '))
  assert.equal(r.complete, false, 'one AVAILABLE row is a pass, not the remaining census')
  assert.match(shown, /CONTINUING available pass 1\/1 starting at /)
  assert.match(shown, /NEXT \/theorem\/research_always_has_a_next/)
  assert.ok(r.next.package)
  assert.notEqual(r.next.package, r.started, 'the frontier advanced past the package just tested')
  const names = new Set(defaultInstalls().specs.map((s) => s.name))
  names.add(r.started!)
  assert.equal(names.has(r.next.package!), false)
  const alpineLeft = catalogue().filter((p) => isAlpineDistroPackage(p) && !names.has(p.name))
  assert.equal(r.next.package, alpineLeft[0]?.name)
  const batch = planAlpineRuns(r.commands)
  assert.equal(batch.plans.length, r.commands.length)
})

test('native bit widths run 1 bit to the uuid — uuidnaOS is native on that ladder', () => {
  const w = nativeBitWidths(UUID_BITS)
  assert.equal(w[0], 1)
  assert.equal(w[w.length - 1], UUID_BITS)
  assert.ok(theoremByKey().has('one_image_every_architecture'))
  assert.ok(theoremByKey().has('k432'))
})

test('remaining Alpine port reverse-and-quantumizes any language in one major batch, under a second', () => {
  const boot = defaultInstalls()
  const done = new Set(boot.specs.map((s) => s.name))
  const queue = remainingAvailableQueue(done)
  const t0 = performance.now()
  const rem = portRemainingAlpine()
  const ms = performance.now() - t0
  const shown = renderRemainingAlpine(rem)
  console.log('\n' + shown + `\n  ${ms | 0} ms\n`)
  assert.equal(rem.definition, 'remaining-alpine-port')
  assert.equal(rem.remaining, queue.length)
  assert.ok(rem.remaining > 20000)
  assert.equal(rem.reversed, rem.remaining)
  assert.equal(rem.execs, 0)
  assert.equal(rem.bitWidth, UUID_BITS)
  assert.equal(rem.complete, true, `failed ${rem.failedCount}: ${rem.failed.join(', ')}`)
  assert.equal(rem.passed, rem.remaining)
  assert.ok(rem.withBinary > 0)
  assert.ok(rem.withMan > 0)
  assert.ok(rem.withBinary < rem.remaining, 'a 100% that found cmd: on every row would be padding')
  assert.ok(ms < 1000, `remaining reverse-quantumize took ${ms} ms`)
  assert.equal(rem.hexbits.length, UUID_HEXBITS)
  assert.match(shown, /^COMPLETE remaining Alpine port /)
})

test('1-bit grain and uuid-bit grain are a schedule change, never a scope change', () => {
  const one = portRemainingAlpine(1)
  const major = portRemainingAlpine(UUID_BITS)
  assert.equal(one.remaining, major.remaining)
  assert.equal(one.passed, major.passed)
  assert.equal(one.failedCount, major.failedCount)
  assert.equal(one.receipt, major.receipt)
  assert.equal(one.bitWidth, 1)
  assert.equal(major.bitWidth, UUID_BITS)
})

test('CONTROL: omit a remaining row and a compile hole are named, never padded', () => {
  const boot = defaultInstalls()
  const done = new Set(boot.specs.map((s) => s.name))
  const queue = remainingAvailableQueue(done)
  const full = foldRemainingAlpine(queue, done)
  const skip = foldRemainingAlpine(queue.slice(1), done)
  assert.equal(skip.remaining, full.remaining - 1)
  assert.notEqual(skip.receipt, full.receipt)
  const openssl = cataloguePackage('openssl')
  assert.ok(openssl)
  const hole = { ...openssl, checksum: 'xx' }
  const broken = foldRemainingAlpine([hole], done)
  assert.equal(broken.complete, false)
  assert.ok(broken.failed.includes('openssl'))
})

test('reverse of an AVAILABLE row agrees with the exec door; a Python CLI and a C ELF are the same shape', () => {
  const boot = defaultInstalls()
  const done = new Set(boot.specs.map((s) => s.name))
  const busy = cataloguePackage('busybox')
  assert.ok(busy)
  const installed = readAvailableApp(busy, done)
  assert.equal(installed.state, 'INSTALLED')
  assert.equal(installed.ok, false, 'busybox is booted — remaining census is AVAILABLE only')

  const frontier = cataloguePackage(testDefaultInstallPackages().next.package!)
  assert.ok(frontier)
  const rev = readAvailableApp(frontier, done)
  const exec = testAvailablePackage(frontier)
  assert.equal(rev.state, 'AVAILABLE')
  assert.equal(rev.ok, exec.ok)
  assert.equal(rev.name, exec.name)
  assert.equal(rev.man, exec.man)
  assert.deepEqual(rev.commands, exec.commands)
  assert.equal(rev.hexbits.length, UUID_HEXBITS)
  const apk = uuidnaExec(`apk info ${frontier.name}`)
  assert.equal((apk.data as { state?: string })?.state, 'AVAILABLE')

  const py = catalogue().find((p) => p.name.startsWith('py3-') && providedCommands(p).length > 0 && !done.has(p.name))
  const c = cataloguePackage('openssl')
  assert.ok(py, 'a Python CLI is in the remaining census')
  assert.ok(c)
  const pyRead = readAvailableApp(py, done)
  const cRead = readAvailableApp(c, done)
  assert.equal(pyRead.state, cRead.state)
  assert.equal(pyRead.hexbits.length, cRead.hexbits.length)
  assert.ok(pyRead.commands.length > 0)
  assert.ok(cRead.commands.length > 0)
})

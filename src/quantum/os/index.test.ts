// quantum/os — THE DEFAULT INSTALL PORT, TESTED FOR EXACTNESS. "Exactly ported" is a checkable property, not
// a mood: every spec's identity recomputes from the mirror's published tuple alone (same mint the catalog
// uses), the closure is exact (every dependency inside, none dangling), the authored route layer covers the
// set exactly (no stale entry, no unnamed member), the build order truly rises from the floor with only the
// published cycle excepted, the hexbit compile is the address nibble for nibble, and the receipt is stable and
// change-sensitive — a tampered mirror is CAUGHT, which is the instrument's proof it can fail. These tests
// exercise integrity only: nothing is installed, linked, booted, or executed (there is nothing to execute).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultInstalls, installFor, portFrom, buildOrder, routeOf, compileToHexbits, INSTALL_ROUTES } from './index.js'
import { INSTALLS_MIRROR } from '../../index.js'
import { uuidnaPackage } from '../../os/packages/index.js'
import { merkleGravity } from '../../gravity/index.js'

test('EXACTLY PORTED — every spec recomputes from the published tuple alone, field for field', () => {
  const port = defaultInstalls()
  assert.equal(port.count, INSTALLS_MIRROR.count)
  assert.equal(port.specs.length, INSTALLS_MIRROR.packages.length)
  const byName = new Map(INSTALLS_MIRROR.packages.map((p) => [p.name, p]))
  for (const s of port.specs) {
    const p = byName.get(s.name)
    assert.ok(p, `spec ${s.name} has no mirror package — a spec from nowhere is not a port`)
    // the identity is the SAME mint os/packages uses on the SAME published tuple — recomputed independently here
    const minted = uuidnaPackage({ name: p!.name, version: p!.version, arch: INSTALLS_MIRROR.arch, repo: INSTALLS_MIRROR.repo, branch: INSTALLS_MIRROR.branch, checksum: p!.checksum })
    assert.equal(s.address, minted.address, `${s.name}: the ported address is not the published tuple's address`)
    assert.equal(s.id, `uuidna/${p!.name}`)
    assert.equal(s.version, p!.version)
    assert.equal(s.checksum, p!.checksum)
    assert.equal(s.meaning, p!.desc, `${s.name}: the meaning must be the PUBLISHED description, verbatim`)
    assert.deepEqual(s.deps, p!.deps)
    assert.equal(s.route, routeOf(s.name))
  }
  // ... and nothing is ported twice, nothing left out: specs ↔ mirror is a bijection
  assert.equal(new Set(port.specs.map((s) => s.name)).size, INSTALLS_MIRROR.packages.length)
})

test('the closure is exact — every dependency lands inside the set, and home is the meta package', () => {
  const names = new Set(INSTALLS_MIRROR.packages.map((p) => p.name))
  for (const p of INSTALLS_MIRROR.packages) for (const d of p.deps)
    assert.ok(names.has(d), `${p.name} needs ${d}, which the default install does not carry — the world is not closed`)
  assert.ok(names.has('alpine-base'), 'the meta package itself must be a member')
  const home = installFor('/')
  assert.equal(home?.name, 'alpine-base')
  assert.ok(home!.deps.length > 0, 'home exists to name the others — it must name some')
})

test('the authored route layer covers the set EXACTLY — no stale entry, no unnamed member, all distinct', () => {
  const names = new Set(INSTALLS_MIRROR.packages.map((p) => p.name))
  for (const key of Object.keys(INSTALL_ROUTES))
    assert.ok(names.has(key), `INSTALL_ROUTES names ${key}, which is not in the default install — a stale translation`)
  for (const p of INSTALLS_MIRROR.packages)
    assert.ok(INSTALL_ROUTES[p.name] !== undefined, `${p.name} has no authored route — the fallback would serve, but the port should name every one`)
  const routes = INSTALLS_MIRROR.packages.map((p) => routeOf(p.name))
  assert.equal(new Set(routes).size, routes.length, 'two packages behind one path is not a bijection')
  assert.equal(installFor('/terminal')?.name, 'busybox')
  assert.equal(installFor('/core')?.name, 'musl')
  assert.equal(installFor('/no-such-path'), null)
})

test('the port rises from the floor — dependencies first, the published cycle the ONLY exception', () => {
  const order = buildOrder(INSTALLS_MIRROR)
  assert.equal(order.length, INSTALLS_MIRROR.packages.length)
  assert.equal(new Set(order).size, order.length)
  const pos = new Map(order.map((n, i) => [n, i]))
  const idx = new Map(INSTALLS_MIRROR.packages.map((p, i) => [p.name, i]))
  const mutual = new Set<string>()
  for (const p of INSTALLS_MIRROR.packages) for (const d of p.deps)
    if (INSTALLS_MIRROR.packages[idx.get(d)!]!.deps.includes(p.name)) mutual.add(`${p.name}→${d}`)
  for (const p of INSTALLS_MIRROR.packages) for (const d of p.deps) {
    const ok = pos.get(idx.get(d)!)! < pos.get(idx.get(p.name)!)!
    if (!ok) assert.ok(mutual.has(`${p.name}→${d}`), `${p.name} ported before its dependency ${d}, and they are not a published cycle`)
  }
  // home is the top of the stack: ported last
  const last = order[order.length - 1]!
  assert.equal(INSTALLS_MIRROR.packages[last]!.name, 'alpine-base')
  // the served specs ride exactly this order
  const port = defaultInstalls()
  assert.deepEqual(port.specs.map((s) => s.name), order.map((i) => INSTALLS_MIRROR.packages[i]!.name))
})

test('compiled from source in hexbit — 32 on-lattice states, the address nibble for nibble', () => {
  const port = defaultInstalls()
  for (const s of [...port.specs.slice(0, 3), port.specs[port.specs.length - 1]!]) {
    assert.equal(s.hexbits.length, 32)
    for (const h of s.hexbits) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15, 'off-lattice state')
    assert.equal(s.hexbits.map((h) => h.toString(16)).join(''), s.address.replace(/-/g, ''), `${s.name}: the compile is not the address`)
  }
  assert.equal(port.hexbits.length, 32)
  assert.deepEqual(port.hexbits, compileToHexbits(port.receipt))
})

test('the OS is bootable quantum — the boot image is the compiled specs in boot order, receipt-closed', () => {
  const port = defaultInstalls()
  assert.equal(port.boot.count, 32 * (port.count + 1))
  assert.equal(port.boot.states.length, port.boot.count)
  for (const h of port.boot.states) assert.ok(Number.isInteger(h) && h >= 0 && h <= 15, 'a boot image with an off-lattice state cannot load')
  // the image IS the specs' hexbits in build order, closed by the receipt's 32 — exactly, nibble for nibble
  assert.deepEqual(port.boot.states, [...port.specs.flatMap((s) => s.hexbits), ...port.hexbits])
  // firmware and up: the floor layer's spec opens the image, the receipt closes it
  assert.deepEqual(port.boot.states.slice(0, 32), port.specs[0]!.hexbits)
  assert.deepEqual(port.boot.states.slice(-32), compileToHexbits(port.receipt))
  // deterministic and change-sensitive: a fresh compile is identical; a tampered mirror boots DIFFERENTLY
  assert.equal(portFrom(INSTALLS_MIRROR).boot.address, port.boot.address)
  const tampered = structuredClone(INSTALLS_MIRROR)
  const c = tampered.packages[1]!.checksum
  tampered.packages[1]!.checksum = c.slice(0, -1) + (c.endsWith('A') ? 'B' : 'A')   // flip the LAST char — never a no-op
  assert.notEqual(tampered.packages[1]!.checksum, c, 'the control must actually change the byte it claims to')
  assert.notEqual(portFrom(tampered).boot.address, port.boot.address)
})

test('the receipt is stable, recomputable, and CHANGE-SENSITIVE — the instrument can fail', () => {
  const port = defaultInstalls()
  // stable: the cached port and a fresh recompute agree
  const fresh = portFrom(INSTALLS_MIRROR)
  assert.equal(fresh.receipt, port.receipt)
  assert.deepEqual(fresh.specs.map((s) => s.address), port.specs.map((s) => s.address))
  // recomputable: the receipt is exactly the fold of the addresses in build order
  assert.equal(port.receipt, merkleGravity(port.specs.map((s) => s.address)))
  // change-sensitive: one flipped version digit moves an address AND the receipt (the negative control)
  const tampered = structuredClone(INSTALLS_MIRROR)
  tampered.packages[0]!.version = tampered.packages[0]!.version + '.tampered'
  const bad = portFrom(tampered)
  assert.notEqual(bad.receipt, port.receipt, 'a tampered mirror folding to the same receipt would be a dead instrument')
  const a = new Map(port.specs.map((s) => [s.name, s.address]))
  assert.notEqual(bad.specs.find((s) => s.name === tampered.packages[0]!.name)!.address, a.get(tampered.packages[0]!.name))
})

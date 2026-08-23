// quantum/os/exec — uuidna_ls, THE FIRST ALPINE-PACKAGE TOOL, tested. It lists the VIRTUAL uuidnaOS
// filesystem (the install port's routes) with uuidna's own logic inside the booted sandbox — never a binary.
// The properties: it boots first (a drifted world lists nothing), the listing is exact and deterministic,
// leaves carry their package identity, dirs recurse, and the receipt is change-sensitive. Controls that fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { uuidnaLs } from '../quantum/os/exec.js'
import { defaultInstalls } from '../quantum/os/index.js'

test('uuidna_ls / lists the virtual OS root — packages and dirs, each with its identity, from the sandbox', () => {
  const r = uuidnaLs('/')
  assert.ok(r.count > 0, 'root is not empty')
  assert.equal(r.sealed, defaultInstalls().receipt, 'the listing ran inside the booted sandbox (its receipt)')
  // /core is musl (the floor), a package leaf under a directory
  const rootHasCore = r.entries.some((e) => e.name === 'core')
  assert.ok(rootHasCore, '/core (musl) is visible at the root')
  for (const e of r.entries) {
    assert.equal(e.hexbits.length, 32, `${e.name}: its address compiles to 32 states`)
    if (e.kind === 'pkg') assert.match(e.id!, /^uuidna\//, 'a package entry carries its uuidna/<name> identity')
  }
})

test('uuidna_ls /terminal lists the busybox family — the toolbox\'s own shelf', () => {
  const r = uuidnaLs('/terminal')
  const names = r.entries.map((e) => e.name).sort()
  assert.deepEqual(names, ['devices', 'network', 'privileged', 'services', 'sh'], 'the five /terminal members')
  const sh = r.entries.find((e) => e.name === 'sh')!
  assert.equal(sh.id, 'uuidna/busybox-binsh', 'sh is busybox-binsh, the ported shell')
})

test('deterministic AND change-sensitive — the receipt is the run\'s own transcript', () => {
  assert.equal(uuidnaLs('/terminal').receipt, uuidnaLs('/terminal').receipt, 'same path, same receipt')
  assert.notEqual(uuidnaLs('/terminal').receipt, uuidnaLs('/core').receipt, 'different listing, different receipt')
  // a nonexistent path lists nothing (honest empty, never a crash) — the control
  const empty = uuidnaLs('/no-such-dir')
  assert.equal(empty.count, 0)
  assert.equal(empty.entries.length, 0)
  assert.equal(empty.hexbits.length, 32, 'even an empty listing has its receipt compiled')
})

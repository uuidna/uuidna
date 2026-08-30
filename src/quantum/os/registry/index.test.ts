// quantum/os/registry — THE ONE PORT REGISTRY, tested. The toolbox and the ported OS fold to a single
// content-addressed set: every tool wears the same PackagePort shape an Alpine package wears (uuidna/<name>, a
// 128-bit address, 32 hexbit states), the whole set merkle-folds to one root, and a tool's registry address is
// the SAME preimage the served API seal folds — so the two surfaces cannot drift. Controls that fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unifiedRegistry, portTool } from './index.js'
import { defaultInstalls } from '../index.js'
import { toUuid } from '../../../address.js'
import { callTool } from '../../../mcp.js'

const SAMPLE = [
  { name: 'uuidna_digital_root', description: 'The digital root of a number. Reduce n mod 9 to one digit.' },
  { name: 'uuidna_exec', description: 'Alpine apps via apk and man in the virtual uuidnaOS.' },
]

test('every port — tool or install — wears the one shape: uuidna/<name>, 128-bit address, 32 hexbit states', () => {
  const r = unifiedRegistry(SAMPLE)
  assert.equal(r.count, r.tools + r.installs, 'the registry is exactly the toolbox plus the OS, nothing else')
  assert.equal(r.installs, defaultInstalls().specs.length, 'every ported install is present')
  assert.equal(r.tools, SAMPLE.length, 'every tool is present')
  for (const p of r.packages) {
    assert.match(p.id, /^uuidna\//, `${p.name}: carries its uuidna/<name> identity`)
    assert.equal(p.hexbits.length, 32, `${p.name}: its address compiles to 32 states`)
    assert.match(p.address, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, `${p.name}: a 128-bit address`)
    assert.ok(p.kind === 'tool' || p.kind === 'install', 'each port names which half it came from')
  }
})

test('a tool\'s registry address IS the API seal\'s own preimage — the two surfaces cannot drift', () => {
  const t = SAMPLE[0]!
  const p = portTool(t)
  // apiHandleOf / toolHandleOf in mcp.ts fold exactly this preimage; the registry reads it, never invents one.
  assert.equal(p.address, toUuid('tool:' + t.name + ':' + t.description), 'address is toUuid(tool:name:description)')
})

test('the whole registry folds to ONE root, recomputable AND change-sensitive', () => {
  assert.equal(unifiedRegistry(SAMPLE).root, unifiedRegistry(SAMPLE).root, 'same input, same root')
  assert.equal(unifiedRegistry(SAMPLE).receipt, unifiedRegistry(SAMPLE).receipt, 'same input, same receipt')
  // move ONE tool's description — the root must move (the control: a silent reword cannot pass unseen)
  const moved = [{ ...SAMPLE[0]!, description: SAMPLE[0]!.description + ' (reworded)' }, SAMPLE[1]!]
  assert.notEqual(unifiedRegistry(moved).root, unifiedRegistry(SAMPLE).root, 'a reworded tool moves the root')
  // the empty toolbox still folds the OS alone — never a crash (the control)
  const os = unifiedRegistry([])
  assert.equal(os.tools, 0)
  assert.equal(os.installs, defaultInstalls().specs.length)
  assert.ok(os.root.length > 0, 'the OS-only registry still has a root')
})

test('the registry is sorted by id — a stable order, so the fold is order-free of insertion', () => {
  const ids = unifiedRegistry(SAMPLE).packages.map((p) => p.id)
  assert.deepEqual(ids, [...ids].sort(), 'packages are in id order')
})

test('the SERVED tool uuidna_registry dispatches: the whole live catalogue folds with the OS to one receipt', () => {
  const r = callTool('uuidna_registry', {}) as ReturnType<typeof unifiedRegistry>
  assert.equal(r.count, r.tools + r.installs, 'the served registry is the live toolbox plus the OS')
  assert.equal(r.installs, defaultInstalls().specs.length, 'the whole install port is folded in')
  assert.ok(r.tools > r.installs, 'the live catalogue has more tools than the OS has installs')
  // uuidna_registry ports ITSELF — the tool is a package in its own registry (the fixed point of the unification)
  const self = r.packages.find((p) => p.name === 'uuidna_registry')
  assert.ok(self, 'uuidna_registry appears as a package in its own registry')
  assert.equal(self!.kind, 'tool')
  assert.equal(self!.id, 'uuidna/uuidna_registry')
  assert.equal(self!.hexbits.length, 32)
})

// quantum/os/registry — THE ONE PORT REGISTRY, tested. The toolbox and the ported OS fold to a single
// content-addressed set: every tool wears the same PackagePort shape an Alpine package wears (uuidna/<name>, a
// 128-bit address, 32 hexbit states), the whole set merkle-folds to one root, and a tool's registry address is
// the SAME preimage the served API seal folds — so the two surfaces cannot drift. Controls that fail.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { unifiedRegistry, portTool } from '../quantum/os/registry.js'
import { defaultInstalls } from '../quantum/os/index.js'
import { toUuid } from '../address.js'

const SAMPLE = [
  { name: 'uuidna_digital_root', description: 'The digital root of a number. Reduce n mod 9 to one digit.' },
  { name: 'uuidna_ls', description: 'List a directory of the virtual uuidnaOS.' },
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

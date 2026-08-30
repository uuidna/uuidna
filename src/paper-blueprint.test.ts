// paper+blueprint — THE WHITE PAPER AND THE DRAWINGS ARE THE SAME INTEGER.
//
// Theorem a_spec_compiles_to_hexbits: the specification and its sound are one compile. This suite checks that
// a sealed theorem, a default-install spec, an MCP tool, and a catalogue row each have two readings that share
// one address — paper (statement / published meaning) and blueprint (handle, route, 32 hexbits). No second
// theorem key. uuidna_theorem serves one dual object (wire-light: one key, not the ledger dump).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremByKey, THEOREMS } from './index.js'
import { defaultInstalls } from './index.js'
import { cataloguePackage } from './index.js'
import { compileToHexbits, UUID_HEXBITS } from './index.js'
import { handleOf } from './index.js'
import { callTool } from './mcp.js'
import {
  paperBlueprintTheorem, paperBlueprintInstall, paperBlueprintTool, paperBlueprintPackage, sameInteger,
} from './index.js'
import { quantumiseRegistry } from './os/overlay/quantumise/index.js'

test('a sealed theorem is white paper and blueprints at once — same address, 32 hexbits', () => {
  assert.ok(theoremByKey().has('a_spec_compiles_to_hexbits'))
  const t = THEOREMS.find((x) => x.key === 'a_spec_compiles_to_hexbits')
  assert.ok(t)
  const d = paperBlueprintTheorem(t)
  assert.equal(d.definition, 'paper+blueprint')
  assert.equal(d.cites, '/theorem/a_spec_compiles_to_hexbits')
  assert.equal(d.kind, 'theorem')
  assert.equal(d.address, t.address)
  assert.equal(d.paper.statement, t.statement)
  assert.equal(d.blueprint.route, '/theorem/a_spec_compiles_to_hexbits')
  assert.equal(d.blueprint.id, 'uuidna/a_spec_compiles_to_hexbits')
  assert.equal(d.blueprint.handle, handleOf(t.address))
  assert.equal(d.blueprint.hexbits.length, UUID_HEXBITS)
  assert.deepEqual(d.blueprint.hexbits, compileToHexbits(t.address))
  assert.equal(sameInteger(d), true)
})

test('busybox — Alpine meaning is the paper; /terminal is the blueprint; one compile', () => {
  const spec = defaultInstalls().specs.find((s) => s.name === 'busybox')
  assert.ok(spec)
  const d = paperBlueprintInstall(spec)
  assert.equal(d.kind, 'install')
  assert.equal(d.paper.statement, spec.meaning)
  assert.equal(d.blueprint.route, '/terminal')
  assert.equal(d.blueprint.id, spec.id)
  assert.equal(sameInteger(d), true)
})

test('an MCP tool wears the same dual — description is paper, /mcp/<name> is the drawing', () => {
  const d = paperBlueprintTool({
    name: 'uuidna_theorem',
    description: 'Read ONE theorem by key as WHITE PAPER AND BLUEPRINTS AT ONCE.',
  })
  assert.equal(d.kind, 'tool')
  assert.equal(d.blueprint.route, '/mcp/uuidna_theorem')
  assert.equal(d.blueprint.hexbits.length, UUID_HEXBITS)
  assert.equal(sameInteger(d), true)
})

test('a quantumised registry row is the same dual — npm/gems/pypi/crates, one compile', () => {
  const q = quantumiseRegistry({
    registry: 'npm', name: '@scope/pkg', version: '1.2.3',
    checksum: 'a'.repeat(40), desc: 'a scoped npm package, quantumised',
  })
  assert.equal(q.ok, true)
  if (!q.ok) return
  const d = paperBlueprintPackage(q.pkg)
  assert.equal(d.kind, 'package')
  assert.equal(d.paper.title, 'scope-pkg')
  assert.equal(d.blueprint.route, '/catalogue/scope-pkg')
  assert.equal(sameInteger(d), true)
  const live = cataloguePackage('busybox')
  assert.ok(live)
  assert.equal(sameInteger(paperBlueprintPackage(live)), true)
})

test('uuidna_theorem serves paper and blueprint together — one key, not the ledger', () => {
  const r = callTool('uuidna_theorem', { key: 'a_spec_compiles_to_hexbits' }) as {
    key: string
    address: string
    paper?: { statement: string }
    blueprint?: { route: string; hexbits: number[]; handle: string }
  }
  assert.equal(r.key, 'a_spec_compiles_to_hexbits')
  assert.ok(r.paper?.statement)
  assert.equal(r.blueprint?.route, '/theorem/a_spec_compiles_to_hexbits')
  assert.equal(r.blueprint?.hexbits.length, UUID_HEXBITS)
  assert.deepEqual(r.blueprint?.hexbits, compileToHexbits(r.address))
  assert.equal(r.blueprint?.handle, handleOf(r.address))
})

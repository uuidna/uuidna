import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HardwareFormulas } from './index.js'

/** The silicon's arithmetic — SMT threads, cache lines, bus bytes, lanes, pins, dies, per-core power, address space. */
test('hardware: threads, cache lines, bus bytes, lanes, pins, dies, per-core power, addressable', async (t) => {
  assert.equal(HardwareFormulas.threads(8).value, 16, '8 cores, SMT2')
  assert.equal(HardwareFormulas.cacheLines(4096).value, 64, '4096 bytes / 64-byte line')
  assert.equal(HardwareFormulas.busBytes(64).value, 8, '64-bit bus is 8 bytes')
  assert.equal(HardwareFormulas.lanes(4, 16).value, 64, '4 x16 slots')
  assert.equal(HardwareFormulas.pins(39, 39).value, 1521, 'a 39x39 BGA')
  assert.equal(HardwareFormulas.dies(70000, 100).value, 700, 'dies per wafer')
  assert.equal(HardwareFormulas.dies(70000, 0).value, 0, 'no die, no divide')
  assert.equal(HardwareFormulas.tdpPerCore(125, 8).value, 15, '125W over 8 cores')
  assert.equal(HardwareFormulas.addressable(20).value, 1048576, '2^20 addresses')
  assert.equal(HardwareFormulas.addressable(40).value, 0, 'past the safe cap')
  assert.equal(hexFamiliesOf().get('hardware')?.length, 8)
  for (const [name, params, expected] of [['threads', [8], 16], ['lanes', [4, 16], 64], ['addressable', [20], 1048576]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'hardware', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `hardware.${name} at ${uuid}`)
    uuidReceiptOf(`hardware ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 8 cores→16 threads, 4096→64 lines, 4×16 lanes=64, 2^20 addressable')
})

import { crossSchemaOf, crossSchemaHolds, crossSchemasOf, crossSchemasHolds } from '../cross/index.js'
import { hexDecodeOf } from '../../quantum/processing/unit/index.js'
// register the sibling families so the catalog assertion is deterministic (each registers on import)
import '../firmware/index.js'
import '../software/index.js'
import '../driver/index.js'
import '../api/index.js'

/** Every family is a schema.org DefinedTermSet whose terms are its hex-program UUIDs — the full programmable capacity. */
test('schema.org: a family is a DefinedTermSet of hex UUIDs, and all families are one DataCatalog', () => {
  const s = crossSchemaOf('hardware')
  assert.equal(s['@context'][0], 'https://schema.org')
  assert.equal(s['@type'], 'DefinedTermSet')
  assert.equal(s['@id'], `urn:uuid:${s.identifier}`)
  assert.equal(s.hasDefinedTerm.length, 8, 'eight hardware terms')
  for (const term of s.hasDefinedTerm) {
    assert.equal(term['@type'], 'DefinedTerm')
    assert.equal(term['@id'], `urn:uuid:${term.identifier}`)
    const d = hexDecodeOf(term.identifier) as { family?: string | null; program?: string[]; sealed?: boolean }
    assert.equal(d.family, 'hardware', `${term.name} addresses the hardware family`)
    assert.equal(d.program?.[0], term.termCode, `${term.name} decodes back to its formula`)
    assert.equal(d.sealed, true, `${term.name} wears its crypto-decided version`)
  }
  assert.equal(crossSchemaHolds('hardware'), true)

  // all families organised as one schema.org DataCatalog
  const all = crossSchemasOf()
  assert.equal(all['@type'], 'DataCatalog')
  const named = new Set(all.hasPart.map((p) => p.name))
  for (const fam of ['hardware', 'firmware', 'software', 'driver', 'api']) assert.ok(named.has(fam), `${fam} is in the catalog`)
  assert.equal(crossSchemasHolds(), true, 'every family schema in the catalog holds')
})

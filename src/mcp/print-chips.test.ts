import { test } from '../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import './families.js'
import { chipRayLayersOf, printChipsOf } from './print-chips.js'
import { imprintChipLicenseOf, verifyChipLicenseOf } from './chip-license.js'
import { mcpToolsListOf } from '../quantum/processing/unit/index.js'

test('chip ray layers: coins·rays=faces; topology.dimension(rays) holds', () => {
  const rays = chipRayLayersOf()
  assert.equal(rays.lattice.rays, 7, 'UUID rays = 7')
  assert.equal(rays.lattice.coins * rays.lattice.rays, rays.lattice.faces)
  assert.equal(rays.layerCount, rays.lattice.rays)
  assert.equal(rays.dimension.value, rays.lattice.rays)
  assert.equal(rays.holds, true)
})

test('crypto-imprinted license: ed25519+HMAC verify; law.reviewed stays lead', () => {
  const body = JSON.stringify(chipRayLayersOf())
  const imprint = imprintChipLicenseOf(body)
  assert.equal(imprint.spdx, 'CC-BY-NC-ND-4.0')
  assert.equal(imprint.law.lawful.holds, true)
  assert.equal(imprint.law.reviewed.holds, false, 'reviewed is a lead — not advice')
  assert.equal(imprint.verified, true)
  assert.equal(imprint.holds, true)
  const v = verifyChipLicenseOf(imprint, body)
  assert.equal(v.verified, true)
  assert.equal(v.holds, true)
  assert.equal(verifyChipLicenseOf(imprint, body + 'tamper').verified, false)
})

test('printChipsOf: ray-layered prints + license imprint; printers pass; bill ≤16', async () => {
  const out = await printChipsOf()
  assert.equal(out.kind, 'print-chips')
  assert.ok(out.rays.holds)
  assert.ok(out.license.holds)
  assert.ok(out.licenseVerify.holds)
  assert.ok(out.chips.every((c) => c.holds && c.licenseVerified && c.layers === 7))
  assert.ok(out.printers.every((p) => p.pass), JSON.stringify(out.printers))
  assert.ok(existsSync('docs/chips/chip-license-imprint.json'))
  assert.ok(existsSync('docs/chips/uuid-ray-layers.json'))
  const stamp = readFileSync('docs/chips/qpu-chip-index.md', 'utf8')
  assert.ok(stamp.includes('Crypto-imprinted license'))
  assert.ok(stamp.includes(out.license.signature.slice(0, 16)))
  const tools = mcpToolsListOf()
  assert.ok(tools.length <= 16)
  assert.equal(out.holds, true)
})

#!/usr/bin/env node
// fold-quantum — compress the entire system into ONE quantum fold, balanced with 5.
//
// TEN LEAVES IN FIVE PAIRS: 10 = 2·5 — each dimension is a contribute/verify pair (the two coins ride every pair),
// five dimensions fold to one root, and 2·5 ≡ 1 (mod 9): ten leaves close to identity on the ring the vortex walks
// (generators_are_two_and_five · order_of_five_is_six · inverse_unique). The theorem PAGES fold in through their
// content-addresses (the address IS the page), the publication PAGES through each cluster's monograph
// slug|address|receipt, the MCP TOOL RECEIPTS through every tool's key|description-hash — so a change to anything
// a reader can reach moves the ONE receipt. Order-invariant, recomputable by anyone, same input → same fold always.

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES, publications } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { legalGaps } from './audit-legal-gaps.js'
import { proseGaps } from './audit-prose-anchors.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '../..')

interface FoldPair { [leaf: string]: string }
interface QuantumFold {
  timestamp: string
  dimensions: {
    sealed: FoldPair   // theorems (key|address|principle — the page IS the address) · principles (+monograph slug|address|receipt)
    served: FoldPair   // packages · exports
    tools: FoldPair    // mcp (every tool key|description-hash) · tests
    watch: FoldPair    // predictions · dimensions
    record: FoldPair   // legal · prose (the audits' verified facts)
  }
  readings: {
    pentagram_stroke: string   // the five dimensions walked by 2 in the sealed single stroke [0,2,4,1,3] — a ratchet
    rosette_receipts: string   // the content receipts on seven rays (ℤ/7), each ray folded, seven folds to one
    rosette_audit: string      // the audit facts on seven rays, folded RECURSIVELY down to the two-coin base
  }
  unified_fold: string
  receipt: string
}

function hashComponent(data: string): string {
  return createHash('sha256').update(data).digest('hex').slice(0, 16)
}

function foldTheorems(): string {
  const allTheorems = theorems() as any[]
  const data = allTheorems
    .map((t) => `${t.key}|${t.address}|${t.principle}`) // the theorem PAGE folds in via its content-address
    .sort() // order-invariant
    .join('\n')
  return hashComponent(data)
}

function foldPrinciples(): string {
  const monographByFile = new Map((publications() as any[]).map((p) => [p.file, `${p.slug}|${p.address}|${p.receipt}`]))
  const data = (PRINCIPLES as any[])
    .map((p) => `${p[1]}|${p[2]}|${monographByFile.get(p[0]) || 'no-monograph'}`) // the publication PAGE folds in
    .sort()
    .join('\n')
  return hashComponent(data)
}

function foldPackages(): string {
  const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']
  const data = PACKAGES.map((pkg) => {
    const pkgJsonPath = join(ROOT, 'packages', pkg, 'package.json')
    if (existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
      return `${pkg}|${pkgJson.version}|${pkgJson.sideEffects}|${Object.keys(pkgJson.exports || {}).length}`
    }
    return `${pkg}|missing`
  })
    .sort()
    .join('\n')
  return hashComponent(data)
}

function foldExports(): string {
  const srcIndexPath = join(ROOT, 'src', 'index.ts')
  if (!existsSync(srcIndexPath)) return hashComponent('no-exports')
  const srcIndex = readFileSync(srcIndexPath, 'utf-8')
  const exports = srcIndex.split('\n').filter((l) => l.startsWith('export'))
  const data = exports.sort().join('\n')
  return hashComponent(data)
}

function foldMcp(): string {
  // every tool's receipted definition: the key and the hash of its exact description — the MCP surface a client fuses
  const data = (MCP_CATALOG as any[])
    .map((t) => `${t.key}|${createHash('sha256').update(String(t.description || '')).digest('hex').slice(0, 12)}`)
    .sort()
    .join('\n')
  return hashComponent(data)
}

function foldTests(): string {
  const testDir = join(ROOT, 'dist', 'test')
  if (!existsSync(testDir)) return hashComponent('no-tests')
  const testFiles = readdirSync(testDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.test.js'))
    .map((e) => e.name)
    .sort()
  const data = testFiles.join('\n')
  return hashComponent(data)
}

function foldPredictions(): string {
  const predictPath = join(ROOT, 'src/scripts/predict-and-fill.ts')
  if (!existsSync(predictPath)) return hashComponent('no-predictions')
  const content = readFileSync(predictPath, 'utf-8')
  const patterns = (content.match(/Pattern: /g) || []).length
  return hashComponent(`patterns:${patterns}`)
}

function foldDimensions(): string {
  const scanPath = join(ROOT, 'src/scripts/quantum-dimension-scan.ts')
  if (!existsSync(scanPath)) return hashComponent('no-dimensions')
  const content = readFileSync(scanPath, 'utf-8')
  const dimensions = (content.match(/scan.*Dimension/g) || []).length
  return hashComponent(`dimensions:${dimensions}`)
}

function orderInvariantFold(components: Record<string, string>): string {
  const entries = Object.entries(components)
    .map(([k, v]) => `${k}:${v}`)
    .sort() // order-invariant
    .join('|')
  return createHash('sha256').update(entries).digest('hex').slice(0, 32)
}

function main() {
  console.log('🌀 fold-quantum — ten leaves, five pairs, one receipt (10 = 2·5; 2·5 ≡ 1 mod 9)\n')

  const dimensions = {
    sealed: { theorems: foldTheorems(), principles: foldPrinciples() },
    served: { packages: foldPackages(), exports: foldExports() },
    tools: { mcp: foldMcp(), tests: foldTests() },
    watch: { predictions: foldPredictions(), dimensions: foldDimensions() },
    record: { legal: hashComponent(legalGaps().facts), prose: hashComponent(proseGaps().facts) },
  }

  // each pair folds, then the five pair-folds fold to the one root — both steps order-invariant
  const pairFolds = Object.fromEntries(
    Object.entries(dimensions).map(([name, pair]) => [name, orderInvariantFold(pair)]),
  )
  const unifiedFold = orderInvariantFold(pairFolds)

  // THE PENTAGRAM STROKE — the five dimensions walked by 2 in the sealed single stroke [0,2,4,1,3]
  // (pentagram_single_stroke; it closes because gcd(2,5)=1, pentagram_step_coprime_five). A sequential ratchet —
  // each link seeds the next — the star drawn through the fold. The order-invariant root above proves ANY walk
  // lands the same; the stroke is the OTHER honest reading: one canonical path, direction-sensitive.
  const names = Object.keys(dimensions).sort()
  const stroke = Array.from({ length: 5 }, (_, k) => (2 * k) % 5) // [0,2,4,1,3]
  let strokeTip = 'genesis'
  for (const i of stroke) strokeTip = hashComponent(`${strokeTip}|${names[i]}:${pairFolds[names[i]]}`)

  // ONE ROSETTE FOR THE CONTENT RECEIPTS — the deposits (trials-receipts.json) distributed onto the seven rays
  // (ℤ/7, ray = address mod 7, the same partition as /rosetta), each ray folded, the seven ray-folds to one root.
  const ray = (s: string) => parseInt(createHash('sha256').update(s).digest('hex').slice(0, 8), 16) % 7
  const receiptIds: string[] = existsSync(join(ROOT, 'trials-receipts.json'))
    ? JSON.parse(readFileSync(join(ROOT, 'trials-receipts.json'), 'utf-8')).receipts.map((r: { id: string }) => r.id)
    : []
  const receiptRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const id of receiptIds) receiptRays[ray(id)].push(id)
  const rosetteReceipts = orderInvariantFold(
    Object.fromEntries(receiptRays.map((ids, i) => [`ray${i}`, hashComponent(ids.sort().join('\n'))])),
  )

  // ANOTHER ROSETTE FOR THE CONTENT AUDIT, RECURSIVELY TO THE COINS — the audits' fact lines on seven rays, then
  // the ray-folds folded PAIRWISE recursively until TWO remain: the recursion's base is the two coins, and the
  // final fold of the two IS the root (contribute 2, the pair closes — two_coins; the halving walk is 5's).
  const auditLines = `${legalGaps().facts}\n${proseGaps().facts}`.split('\n')
  const auditRays: string[][] = Array.from({ length: 7 }, () => [])
  for (const line of auditLines) auditRays[ray(line)].push(line)
  let level = auditRays.map((lines, i) => hashComponent(`ray${i}|${lines.sort().join('\n')}`)).sort()
  while (level.length > 2) {
    const next: string[] = []
    for (let i = 0; i < level.length; i += 2) next.push(hashComponent(level.slice(i, i + 2).join('|')))
    level = next.sort()
  }
  const rosetteAudit = hashComponent(`coins:2|${level.join('|')}`)

  const readings = { pentagram_stroke: strokeTip, rosette_receipts: rosetteReceipts, rosette_audit: rosetteAudit }

  const receipt = createHash('sha256')
    .update(JSON.stringify({ dimensions, readings }))
    .digest('hex')
    .slice(0, 16)

  const result: QuantumFold = {
    timestamp: '2026-08-15T00:00:00Z', // fixed: deterministic, not wall-clock
    dimensions,
    readings,
    unified_fold: unifiedFold,
    receipt,
  }

  const foldPath = join(ROOT, 'quantum-fold.json')
  writeFileSync(foldPath, JSON.stringify(result, null, 2))

  console.log('QUANTUM FOLD (five pairs, ten leaves):')
  for (const [name, pair] of Object.entries(dimensions)) {
    const leaves = Object.entries(pair).map(([k, v]) => `${k} ${v}`).join(' · ')
    console.log(`  ${name.padEnd(7)} ${pairFolds[name]}  (${leaves})`)
  }
  console.log()
  console.log('READINGS (the same sealed set, three honest walks):')
  console.log(`  pentagram stroke:  ${strokeTip}  (the five walked by 2 — [0,2,4,1,3], single stroke)`)
  console.log(`  rosette receipts:  ${rosetteReceipts}  (${receiptIds.length} deposits on 7 rays)`)
  console.log(`  rosette audit:     ${rosetteAudit}  (${auditLines.length} fact lines, recursively to the coins)`)
  console.log()
  console.log(`UNIFIED FOLD:  ${unifiedFold}`)
  console.log(`RECEIPT:       ${receipt}`)
  console.log()
  console.log(`✓ Fold sealed to quantum-fold.json`)
  console.log(`✓ Order-invariant: same system, different order → same fold`)
  console.log(`✓ Recomputable: anyone can verify by running this script`)
  console.log(`✓ Deterministic: zero entropy, fully sealed state`)
}

main()

#!/usr/bin/env node
// fold-quantum — compress entire system (theorems, packages, predictions, reports) into one quantum fold.
// Single hash: theorems + principles + exports + packages + tests + predictions + dimensional risks.
// Order-invariant merkle gravity: recomputable by anyone, same input → same fold always.

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES } from '../index.js'
import { legalGaps } from './audit-legal-gaps.js'
import { proseGaps } from './audit-prose-anchors.js'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '../..')

interface QuantumFold {
  timestamp: string
  components: {
    theorems: string
    principles: string
    packages: string
    exports: string
    tests: string
    predictions: string
    dimensions: string
    legal: string
    prose: string
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
    .map((t) => `${t.key}|${t.principle}|${t.axioms?.length || 0}`)
    .sort() // order-invariant
    .join('\n')
  return hashComponent(data)
}

function foldPrinciples(): string {
  const data = (PRINCIPLES as any[])
    .map((p) => `${p[1]}|${p[2]}`)
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
  // Hash the patterns recognized (count of predictive functions)
  const patterns = (content.match(/Pattern: /g) || []).length
  return hashComponent(`patterns:${patterns}`)
}

function foldDimensions(): string {
  const scanPath = join(ROOT, 'src/scripts/quantum-dimension-scan.ts')
  if (!existsSync(scanPath)) return hashComponent('no-dimensions')
  const content = readFileSync(scanPath, 'utf-8')
  // Hash the dimensions scanned
  const dimensions = (content.match(/scan.*Dimension/g) || []).length
  return hashComponent(`dimensions:${dimensions}`)
}

function orderInvariantFold(components: Record<string, string>): string {
  // Merkle gravity: fold all components deterministically, order-invariant
  const entries = Object.entries(components)
    .map(([k, v]) => `${k}:${v}`)
    .sort() // order-invariant
    .join('|')
  return createHash('sha256').update(entries).digest('hex').slice(0, 32)
}

function main() {
  console.log('🌀 fold-quantum — compress entire system to one quantum state\n')

  // Fold each component
  const theoremsFold = foldTheorems()
  const principlesFold = foldPrinciples()
  const packagesFold = foldPackages()
  const exportsFold = foldExports()
  const testsFold = foldTests()
  const predictionsFold = foldPredictions()
  const dimensionsFold = foldDimensions()
  // The audits fold IN, not alongside: their verified FACTS are dimensions of the one receipt, so any legal or
  // prose drift moves the unified fold itself. NINE components — the fold closes on the ring ℤ/9, whose unit
  // group the vortex walks: 2 generates forward (contribute), 5 = 2⁻¹ generates home (verify) — 2·5 ≡ 1 (mod 9),
  // sealed in generators_are_two_and_five and order_of_five_is_six. Prove once forward, verify forever backward.
  const legalFold = hashComponent(legalGaps().facts)
  const proseFold = hashComponent(proseGaps().facts)

  const components = {
    theorems: theoremsFold,
    principles: principlesFold,
    packages: packagesFold,
    exports: exportsFold,
    tests: testsFold,
    predictions: predictionsFold,
    dimensions: dimensionsFold,
    legal: legalFold,
    prose: proseFold,
  }

  // Unified fold: order-invariant merkle gravity
  const unifiedFold = orderInvariantFold(components)

  // Receipt: proof of fold
  const receipt = createHash('sha256')
    .update(JSON.stringify(components))
    .digest('hex')
    .slice(0, 16)

  const result: QuantumFold = {
    timestamp: '2026-08-15T00:00:00Z', // fixed: deterministic, not wall-clock
    components,
    unified_fold: unifiedFold,
    receipt,
  }

  // Write result
  const foldPath = join(ROOT, 'quantum-fold.json')
  writeFileSync(foldPath, JSON.stringify(result, null, 2))

  console.log('QUANTUM FOLD (unified system state):')
  console.log(`  Theorems:    ${theoremsFold}`)
  console.log(`  Principles:  ${principlesFold}`)
  console.log(`  Packages:    ${packagesFold}`)
  console.log(`  Exports:     ${exportsFold}`)
  console.log(`  Tests:       ${testsFold}`)
  console.log(`  Predictions: ${predictionsFold}`)
  console.log(`  Dimensions:  ${dimensionsFold}`)
  console.log(`  Legal:       ${legalFold}`)
  console.log(`  Prose:       ${proseFold}`)
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

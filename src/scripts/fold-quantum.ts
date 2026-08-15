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

  const receipt = createHash('sha256')
    .update(JSON.stringify(dimensions))
    .digest('hex')
    .slice(0, 16)

  const result: QuantumFold = {
    timestamp: '2026-08-15T00:00:00Z', // fixed: deterministic, not wall-clock
    dimensions,
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
  console.log(`UNIFIED FOLD:  ${unifiedFold}`)
  console.log(`RECEIPT:       ${receipt}`)
  console.log()
  console.log(`✓ Fold sealed to quantum-fold.json`)
  console.log(`✓ Order-invariant: same system, different order → same fold`)
  console.log(`✓ Recomputable: anyone can verify by running this script`)
  console.log(`✓ Deterministic: zero entropy, fully sealed state`)
}

main()

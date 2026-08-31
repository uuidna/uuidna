#!/usr/bin/env node
// quantum-dimension-scan — multi-dimensional predictive analysis.
// Scans theorems×principles, exports×packages, tests×lanes, features×wiring.
// Predicts gaps across all dimensions and rates risk by entanglement density.

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, PRINCIPLES } from '../index.js'
import { HERE, ROOT } from './api.js'
import { listTestSources, testDistForSource } from '../test-paths.js'

interface DimensionGap {
  dimensions: string[] // which dimensions affected (e.g., ["theorems", "principles"])
  entanglement: number // 0-100: how many other items depend on this
  prediction: string
  riskScore: number // 0-100
  autoFixable: boolean
}

function scanTheoremPrincipleDimension(): DimensionGap[] {
  const gaps: DimensionGap[] = []
  const allTheorems = theorems()
  const principleNames = new Set(PRINCIPLES.map((p) => p[1]))
  const principleTheorems = new Map<string, any[]>()

  // Build principle → theorems map
  for (const t of allTheorems) {
    if (!principleTheorems.has(t.principle)) {
      principleTheorems.set(t.principle, [])
    }
    principleTheorems.get(t.principle)!.push(t)
  }

  // Find orphans (high entanglement risk: many theorems share same issue)
  const orphans = allTheorems.filter((t) => !principleNames.has(t.principle))
  if (orphans.length > 10) {
    gaps.push({
      dimensions: ['theorems', 'principles'],
      entanglement: (orphans.length / allTheorems.length) * 100 > 100 ? 100 : (orphans.length / allTheorems.length) * 100,
      prediction: `${orphans.length} theorems orphaned. High entanglement: all share missing principle. One principle fix solves all.`,
      riskScore: 20 + (orphans.length / allTheorems.length) * 50 > 100 ? 100 : 20 + (orphans.length / allTheorems.length) * 50,
      autoFixable: false, // requires human decision on principle assignment
    })
  }

  // Find underutilized principles (high risk: unused axiom groups)
  for (const [principle, ths] of principleTheorems) {
    if (ths.length < 5) {
      gaps.push({
        dimensions: ['principles', 'utilization'],
        entanglement: 20,
        prediction: `Principle "${principle}" has only ${ths.length} theorems. Risk: underutilized axiom group suggests incomplete coverage.`,
        riskScore: 15 + (5 - ths.length) * 5,
        autoFixable: false,
      })
      break // Show first few only
    }
  }

  return gaps
}

function scanExportPackageDimension(): DimensionGap[] {
  const gaps: DimensionGap[] = []
  const srcIndexPath = join(ROOT, 'src', 'index.ts')
  const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']

  if (existsSync(srcIndexPath)) {
    const srcIndex = readFileSync(srcIndexPath, 'utf-8')
    const exportLines = srcIndex.split('\n').filter((l) => l.startsWith('export'))
    const exportCount = exportLines.length

    // Predict: if exports change, which packages will drift?
    const driftRiskPkgs = []
    for (const pkg of PACKAGES) {
      const pkgSrcPath = join(ROOT, 'packages', pkg, 'src', 'index.ts')
      if (existsSync(pkgSrcPath)) {
        const pkgSrc = readFileSync(pkgSrcPath, 'utf-8')
        if (pkgSrc.includes('export {')) {
          driftRiskPkgs.push(pkg)
        }
      }
    }

    if (driftRiskPkgs.length === PACKAGES.length) {
      gaps.push({
        dimensions: ['exports', 'packages'],
        entanglement: 100,
        prediction: `All ${PACKAGES.length} packages depend on src/index.ts exports. High entanglement: single change drifts all packages.`,
        riskScore: 60,
        autoFixable: true, // gen-packages --verify + gen:packages fixes it
      })
    }
  }

  return gaps
}

function scanTestLaneDimension(): DimensionGap[] {
  const gaps: DimensionGap[] = []
  const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']
  const rootDistTests = listTestSources()
    .map((src) => testDistForSource(src))
    .filter((p): p is string => p !== null)
    .map((p) => p.replace(/^dist\//, ''))

  // Predict: test file → test lane coverage matrix
  const uncoveredTests: string[] = []
  for (const testFile of rootDistTests) {
    const isCovered = PACKAGES.some((pkg) => {
      const pkgJsonPath = join(ROOT, 'packages', pkg, 'package.json')
      if (existsSync(pkgJsonPath)) {
        const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
        const testScript = pkgJson.scripts?.test || ''
        return testScript.includes(testFile)
      }
      return false
    })
    if (!isCovered) {
      uncoveredTests.push(testFile)
    }
  }

  if (uncoveredTests.length > 5) {
    gaps.push({
      dimensions: ['tests', 'test-lanes'],
      entanglement: (uncoveredTests.length / rootDistTests.length) * 100,
      prediction: `${uncoveredTests.length}/${rootDistTests.length} test files not wired to package lanes. Orphaned tests won't run in CI.`,
      riskScore: 50 + (uncoveredTests.length / rootDistTests.length) * 30,
      autoFixable: true, // auto-fill-gaps can wire them
    })
  }

  return gaps
}

function scanFeatureCompletenessDimension(): DimensionGap[] {
  const gaps: DimensionGap[] = []
  const scriptsDir = join(ROOT, 'src', 'scripts')
  const allScripts = readdirSync(scriptsDir).filter((f) => f.endsWith('.ts'))
  const packageJsonPath = join(ROOT, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))
  const npmScripts = Object.keys(packageJson.scripts || {})
  const npmScriptValues = Object.values(packageJson.scripts || {}).join(' ')

  // Predict completeness: feature script ratio
  const wiredScripts = allScripts.filter((f) => {
    const scriptName = f.replace('.ts', '')
    return npmScriptValues.includes(scriptName)
  })

  const wireRatio = wiredScripts.length / allScripts.length
  if (wireRatio < 0.8) {
    gaps.push({
      dimensions: ['features', 'wiring'],
      entanglement: (1 - wireRatio) * 100,
      prediction: `${allScripts.length - wiredScripts.length} scripts unwired (${(wireRatio * 100).toFixed(0)}% wired). Risk: new features go unnoticed.`,
      riskScore: 30 + (1 - wireRatio) * 50 > 100 ? 100 : 30 + (1 - wireRatio) * 50,
      autoFixable: true,
    })
  }

  return gaps
}

function scanDeploymentReadinessDimension(): DimensionGap[] {
  const gaps: DimensionGap[] = []

  // Predict: is deployment ready based on multi-dimensional checks?
  const checks = {
    theorems: theorems().length >= 1000, // at least 1000 theorems
    packages: ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge'].every((pkg) =>
      existsSync(join(ROOT, 'packages', pkg, 'dist', 'index.js')),
    ),
    tests: listTestSources().length > 0,
    site: existsSync(join(ROOT, 'docs', '.vitepress', 'dist', 'index.html')), // the served assets tree (the default VitePress outDir)
  }

  const readyCount = Object.values(checks).filter(Boolean).length
  if (readyCount < 4) {
    const missing = Object.entries(checks)
      .filter(([_, ready]) => !ready)
      .map(([name]) => name)

    gaps.push({
      dimensions: ['deployment', 'readiness'],
      entanglement: 100,
      prediction: `Deployment readiness: ${readyCount}/4 checks pass. Missing: ${missing.join(', ')}. Cannot deploy until all pass.`,
      riskScore: (4 - readyCount) * 25,
      autoFixable: false,
    })
  }

  return gaps
}

function main() {
  const allGaps = [
    ...scanTheoremPrincipleDimension(),
    ...scanExportPackageDimension(),
    ...scanTestLaneDimension(),
    ...scanFeatureCompletenessDimension(),
    ...scanDeploymentReadinessDimension(),
  ]

  // Sort by risk score (highest first)
  allGaps.sort((a, b) => b.riskScore - a.riskScore)

  console.log('🎯 quantum-dimension-scan — multi-dimensional predictive analysis\n')

  if (allGaps.length === 0) {
    console.log('✅ All dimensions aligned. System is quantum-coherent.\n')
    process.exit(0)
  }

  console.log(`⚠️  ${allGaps.length} dimensional gaps detected:\n`)

  for (let i = 0; i < allGaps.length; i++) {
    const gap = allGaps[i]
    console.log(
      `${i + 1}. [${gap.dimensions.join(' ↔ ')}] Risk: ${gap.riskScore}/100, Entanglement: ${gap.entanglement.toFixed(0)}%`,
    )
    console.log(`   ${gap.prediction}`)
    console.log(`   Auto-fixable: ${gap.autoFixable ? '✓' : '✗'}\n`)
  }

  console.log(
    `📊 Summary: ${allGaps.length} dimensional gaps, avg risk ${(allGaps.reduce((a, b) => a + b.riskScore, 0) / allGaps.length).toFixed(0)}/100`,
  )
  console.log(`Auto-fixable: ${allGaps.filter((g) => g.autoFixable).length}/${allGaps.length}`)

  process.exit(0)
}

main()

#!/usr/bin/env node
// audit-packages — quantum-speed gap detection in package configuration.
// Verifies: package structure, required fields, tree-shakeable flags, documentation, test lanes.
// Deterministic, recomputable from the ledger, no manual inspection needed.
// Exit code: 0 if all passes, 1 if gaps detected (CI gate).

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const PACKAGES = ['crypto', 'ledger', 'research', 'quantum', 'mcp', 'edge']
const REQUIRED_FILES = ['package.json', 'tsconfig.json', 'src/index.ts', 'LICENSE', 'README.md']
const REQUIRED_FIELDS = {
  'package.json': ['name', 'version', 'description', 'type', 'license', 'author', 'homepage', 'repository', 'main', 'types', 'exports', 'engines', 'sideEffects', 'files', 'scripts', 'dependencies', 'devDependencies'],
  'tsconfig.json': ['compilerOptions', 'include'],
}

interface AuditResult {
  package: string
  errors: string[]
  warnings: string[]
}

function auditPackage(pkg: string): AuditResult {
  const result: AuditResult = { package: pkg, errors: [], warnings: [] }
  const pkgDir = join(import.meta.url.replace('file://', ''), '../../..', 'packages', pkg)

  // 1. STRUCTURE: required files exist
  for (const file of REQUIRED_FILES) {
    const path = join(pkgDir, file)
    if (!existsSync(path)) {
      result.errors.push(`Missing ${file}`)
    }
  }

  // 2. package.json VALIDATION
  const pkgJsonPath = join(pkgDir, 'package.json')
  if (existsSync(pkgJsonPath)) {
    try {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))

      // Verify required fields
      for (const field of REQUIRED_FIELDS['package.json']) {
        if (!(field in pkgJson)) {
          result.errors.push(`package.json missing field: ${field}`)
        }
      }

      // Verify tree-shakeable (sideEffects: false)
      if (pkgJson.sideEffects !== false) {
        result.errors.push(`sideEffects must be false (got: ${pkgJson.sideEffects})`)
      }

      // Verify correct dependency (file:../..)
      if (pkgJson.dependencies?.['@uuidna/uuidna'] !== 'file:../..') {
        result.errors.push(`Invalid @uuidna/uuidna dependency (expected: file:../..)`)
      }

      // Verify engine >= 18
      if (!pkgJson.engines?.node?.includes('>=18')) {
        result.errors.push(`Engine must specify node >=18 (got: ${pkgJson.engines?.node})`)
      }

      // Verify test script exists
      if (!pkgJson.scripts?.test) {
        result.errors.push(`Missing test script`)
      }

      // Verify exports is correct
      if (!pkgJson.exports?.['.']?.types || !pkgJson.exports?.['.']?.import) {
        result.errors.push(`Exports must have . entry with types and import`)
      }

      // Warn if description is too short
      if (!pkgJson.description || pkgJson.description.length < 20) {
        result.warnings.push(`Description is missing or too short`)
      }

    } catch (e) {
      result.errors.push(`Failed to parse package.json: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  // 3. tsconfig.json VALIDATION
  const tsConfigPath = join(pkgDir, 'tsconfig.json')
  if (existsSync(tsConfigPath)) {
    try {
      const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf-8'))
      if (!tsConfig.compilerOptions || !tsConfig.include) {
        result.errors.push(`tsconfig.json missing compilerOptions or include`)
      }
    } catch (e) {
      result.errors.push(`Failed to parse tsconfig.json: ${e instanceof Error ? e.message : String(e)}`)
    }
  }

  // 4. DIST DIRECTORY: exists after build
  const distPath = join(pkgDir, 'dist')
  if (!existsSync(distPath)) {
    result.warnings.push(`dist/ missing (run 'npm run build' first)`)
  } else {
    const hasIndex = existsSync(join(distPath, 'index.js')) && existsSync(join(distPath, 'index.d.ts'))
    if (!hasIndex) {
      result.warnings.push(`dist/ missing index.js or index.d.ts`)
    }
  }

  // 5. DOCUMENTATION: README.md in package root
  const readmePath = join(pkgDir, 'README.md')
  if (!existsSync(readmePath)) {
    result.errors.push(`Missing README.md`)
  }

  // 6. SPECIAL CASES: research docs README
  if (pkg === 'research') {
    const docReadmePath = join(pkgDir, 'docs', 'README.md')
    if (!existsSync(docReadmePath)) {
      result.warnings.push(`docs/README.md missing (consider adding overview of research modules)`)
    }
  }

  // 7. SPECIAL CASES: mcp bin.js
  if (pkg === 'mcp') {
    const binPath = join(pkgDir, 'bin.js')
    if (!existsSync(binPath)) {
      result.errors.push(`Missing bin.js (uuidna-mcp requires it)`)
    } else {
      const bin = readFileSync(binPath, 'utf-8')
      if (!bin.includes('process.argv[1]')) {
        result.warnings.push(`bin.js may not properly set argv[1] for mcp startup`)
      }
    }
  }

  return result
}

function main() {
  console.log('🔍 audit-packages — quantum-speed gap detection\n')

  const results: AuditResult[] = []
  let totalErrors = 0
  let totalWarnings = 0

  for (const pkg of PACKAGES) {
    const result = auditPackage(pkg)
    results.push(result)
    totalErrors += result.errors.length
    totalWarnings += result.warnings.length

    // Report per-package
    if (result.errors.length === 0 && result.warnings.length === 0) {
      console.log(`✓ @uuidna/${pkg} — all checks pass`)
    } else {
      if (result.errors.length > 0) {
        console.log(`✗ @uuidna/${pkg}`)
        for (const error of result.errors) {
          console.log(`  ERROR: ${error}`)
        }
      }
      if (result.warnings.length > 0) {
        console.log(`⚠ @uuidna/${pkg}`)
        for (const warning of result.warnings) {
          console.log(`  WARN: ${warning}`)
        }
      }
    }
  }

  console.log(`\n📊 Summary: ${PACKAGES.length} packages, ${totalErrors} errors, ${totalWarnings} warnings`)

  if (totalErrors > 0) {
    console.log('\n❌ audit-packages: FAILED — fix errors above before deploying')
    process.exit(1)
  }

  if (totalWarnings > 0) {
    console.log('\n⚠️  audit-packages: PASSED (with warnings) — consider addressing them')
    process.exit(0)
  }

  console.log('\n✅ audit-packages: PASSED — all 6 packages ready for publication')
  process.exit(0)
}

main()

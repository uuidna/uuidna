#!/usr/bin/env node
// auto-fill-gaps — automatically seal predicted gaps.
// Reads predict-and-fill output and applies auto-fill actions deterministically.

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, '../..')

function autoFillUnwiredScripts() {
  const packageJsonPath = join(ROOT, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

  // List of critical scripts that should be wired
  const criticalScripts = [
    'gen-analytics',
    'gen-mcp',
    'gen-packages',
    'gen-captain-claims',
    'harmonic-scan',
    'conformance',
    'audit-packages',
    'security-audit',
    'copy-lean-to-site',
    'sync-changelog',
  ]

  let added = 0
  for (const scriptName of criticalScripts) {
    const npmScriptKey = scriptName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    // Check if already wired
    if (!packageJson.scripts[npmScriptKey] && !Object.values(packageJson.scripts).some((v: any) => v.includes(scriptName))) {
      // Add it
      packageJson.scripts[npmScriptKey] = `npm run build && node dist/scripts/${scriptName}.js`
      added++
    }
  }

  if (added > 0) {
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
    console.log(`✓ Wired ${added} critical scripts to package.json`)
  } else {
    console.log(`✓ All critical scripts already wired`)
  }

  return added
}

function main() {
  console.log('🔧 auto-fill-gaps — deterministic gap sealing\n')

  const filled = autoFillUnwiredScripts()

  if (filled > 0) {
    console.log(`\n✅ Auto-filled ${filled} gaps. Run guard to verify no drift.`)
    process.exit(0)
  } else {
    console.log(`\n✅ No critical gaps to fill. System is optimal.`)
    process.exit(0)
  }
}

main()

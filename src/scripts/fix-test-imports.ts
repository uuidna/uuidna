#!/usr/bin/env node
// fix-test-imports — re-rewrite imports after relocate (includes dynamic import()).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { rewriteTestImports, listTestSources } from '../test-paths.js'

const FROM: Record<string, string> = {
  'src/quantum/os/index.test.ts': 'src/tests/os.test.ts',
  'src/quantum/os/patime/index.test.ts': 'src/tests/os-install.test.ts',
  'src/quantum/os/catalogue/index.test.ts': 'src/tests/os-catalogue.test.ts',
  'src/quantum/os/registry/index.test.ts': 'src/tests/os-registry.test.ts',
  'src/quantum/os/related/index.test.ts': 'src/tests/os-related.test.ts',
  'src/os/apps/index.test.ts': 'src/tests/os-apps.test.ts',
  'src/os/runtime/sandbox/index.test.ts': 'src/tests/sandbox-spawn.test.ts',
  'src/quantum/os/boot/index.test.ts': 'src/tests/boot-sandbox.test.ts',
  'src/hexbit/index.test.ts': 'src/tests/import-architecture.test.ts',
  'src/quantum/os/alpine/index.test.ts': 'src/tests/quantum-alpine.test.ts',
  'src/quantum/os/cryptoapps/index.test.ts': 'src/tests/crypto-apps.test.ts',
  'src/quantum/os/apptheorem/index.test.ts': 'src/tests/app-theorem.test.ts',
  'src/quantum/os/acme/index.test.ts': 'src/tests/acme-port.test.ts',
  'src/quantum/os/mcpman/index.test.ts': 'src/tests/mcp-alpine-man.test.ts',
  'src/os/apps/coverage.test.ts': 'src/tests/alpine-coverage.test.ts',
  'src/os/host/index.test.ts': 'src/tests/host.test.ts',
  'src/os/packages/index.test.ts': 'src/tests/packages.test.ts',
  'src/worker.test.ts': 'src/tests/worker-discovery.test.ts',
  'src/quantum/os/cli/index.test.ts': 'src/tests/support-wiring.test.ts',
  'src/quantum/os/court/index.test.ts': 'src/tests/court-procedure.test.ts',
  'src/quantum/os/waves/index.test.ts': 'src/tests/waves.test.ts',
  'src/quantum/apps/anthem-stream.test.ts': 'src/tests/anthem-stream.test.ts',
  'src/quantum/apps/anthem-superposition.test.ts': 'src/tests/anthem-superposition.test.ts',
  'src/quantum/apps/url-audit.test.ts': 'src/tests/url-audit.test.ts',
  'src/quantum/apps/terminal.test.ts': 'src/tests/terminal.test.ts',
  'src/quantum/os/firmware/index.test.ts': 'src/tests/miner-firmware.test.ts',
  'src/scripts/all-run.test.ts': 'src/tests/all-run.test.ts',
  'src/scripts/harmonic-scan.test.ts': 'src/tests/harmony-scan.test.ts',
  'src/scripts/exercise-dormant.test.ts': 'src/tests/exercise-dormant.test.ts',
  'src/scripts/prescribed-scripts.test.ts': 'src/tests/prescribed-scripts.test.ts',
  'src/scripts/guard.test.ts': 'src/tests/finder-coverage.test.ts',
  'src/public-apis.test.ts': 'src/tests/public-apis.test.ts',
  'src/scripts/detail-audit.test.ts': 'src/tests/detail-audit.test.ts',
  'src/scripts/gap-survey.test.ts': 'src/tests/gap-survey.test.ts',
  'src/scripts/dirty-paths.test.ts': 'src/tests/dirty-paths.test.ts',
  'src/scripts/search-feed.test.ts': 'src/tests/search-feed.test.ts',
  'src/scripts/gate-paths.test.ts': 'src/tests/gate-paths.test.ts',
  'src/scripts/gate-all.test.ts': 'src/tests/gate-all.test.ts',
  'src/gate-receipt-index.test.ts': 'src/tests/test-delta.test.ts',
  'src/falsifiers.test.ts': 'src/tests/falsifiers.generated.test.ts',
  'src/test-api.ts': 'src/tests/api.ts',
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) walk(rel, out)
    else if (e.name.endsWith('.test.ts') || e.name === 'test-api.ts') out.push(rel)
  }
  return out
}

let fixed = 0
for (const to of [...new Set([...listTestSources(), ...walk('src')])]) {
  const base = to.split('/').pop()!
  const from = FROM[to] ?? `src/tests/${base}`
  const raw = readFileSync(join(ROOT, to), 'utf8')
  const out = rewriteTestImports(raw, from, to).replace(/tests\/api\.js/g, 'test-api.js')
  if (out !== raw) { writeFileSync(join(ROOT, to), out); fixed++ }
}
console.log(`fix-test-imports — touched ${fixed} files`)

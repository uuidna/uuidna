#!/usr/bin/env node
// relocate-tests — src/tests/*.test.ts → beside the module (index.test.ts or {name}.test.ts), or uuidnaOS harness
// for live/async integration tests (network, timers, process) that belong under quantum/os/harness/.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, rmdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { ROOT } from './api.js'
import { rewriteTestImports } from '../test-paths.js'

const TEST_DIR = join(ROOT, 'src/tests')
const HARNESS = 'src/quantum/os/harness'

/** Live/async integration tests — OS boundary; harmonic-scan excludes quantum/os/**. */
const HARNESS_HOME = new Set([
  'agent-coverage.test.ts', 'alpine-agent-wave.test.ts', 'anthem-stream.test.ts', 'await-live.test.ts',
  'constant-gaps.test.ts', 'corroborate.test.ts', 'crossref.test.ts', 'cube-memory.test.ts', 'exemptions.test.ts',
  'fill-gaps-advantage.test.ts', 'firewall.test.ts', 'hex-face.test.ts', 'hexbit-coverage.test.ts', 'lanes.test.ts',
  'mcp-e2e-online.test.ts', 'mcp-e2e.test.ts', 'mcp-edge-coverage.test.ts', 'mcp-http.test.ts', 'mcp-schema.test.ts',
  'measure.test.ts', 'object-i18n.test.ts', 'one-writer-working.test.ts', 'one-writer.test.ts', 'os-catalogue.test.ts',
  'os-port.test.ts', 'os.test.ts', 'proof-cache-sign.test.ts', 'public-apis.test.ts', 'publication-metadata.test.ts',
  'quantum-advantage-theme.test.ts', 'quantum-driver.test.ts', 'redos-bounds.test.ts', 'refused-robots.test.ts',
  'refused.test.ts', 'research-sources.test.ts', 'resonance.test.ts', 'school-advantage-mcp.test.ts', 'school-apis.test.ts',
  'school-cern.test.ts', 'school-pqc-mcp.test.ts', 'school-sequence-mcp.test.ts', 'steady-state.test.ts',
  'stream-step.test.ts', 'theorem-axioms.test.ts', 'tool-census.test.ts', 'tool-scope.test.ts', 'use-versus-mention.test.ts',
  'waves.test.ts', 'worker-discovery.test.ts', 'zenodo-publish.test.ts',
])

const INDEX_HOME: Record<string, string> = {
  'os.test.ts': 'src/quantum/os/index.test.ts',
  'os-install.test.ts': 'src/quantum/os/patime/index.test.ts',
  'os-catalogue.test.ts': 'src/quantum/os/catalogue/index.test.ts',
  'os-registry.test.ts': 'src/quantum/os/registry/index.test.ts',
  'os-related.test.ts': 'src/quantum/os/related/index.test.ts',
  'os-man.test.ts': 'src/quantum/os/catalogue/index.test.ts',
  'os-apps.test.ts': 'src/os/apps/index.test.ts',
  'sandbox-spawn.test.ts': 'src/os/runtime/sandbox/index.test.ts',
  'boot-sandbox.test.ts': 'src/quantum/os/boot/index.test.ts',
  'import-architecture.test.ts': 'src/hexbit/index.test.ts',
  'quantum-alpine.test.ts': 'src/quantum/os/alpine/index.test.ts',
  'crypto-apps.test.ts': 'src/quantum/os/cryptoapps/index.test.ts',
  'app-theorem.test.ts': 'src/quantum/os/apptheorem/index.test.ts',
  'acme-port.test.ts': 'src/quantum/os/acme/index.test.ts',
  'mcp-alpine-man.test.ts': 'src/quantum/os/mcpman/index.test.ts',
  'alpine-coverage.test.ts': 'src/os/apps/coverage.test.ts',
  'host.test.ts': 'src/os/host/index.test.ts',
  'packages.test.ts': 'src/os/packages/index.test.ts',
  'installs.test.ts': 'src/quantum/os/index.test.ts',
  'worker-discovery.test.ts': `${HARNESS}/worker.test.ts`,
  'support-wiring.test.ts': 'src/quantum/os/cli/index.test.ts',
  'browser-apps-usable.test.ts': 'src/quantum/os/catalogue/index.test.ts',
  'court-procedure.test.ts': 'src/due-process.test.ts',
  'wave-needs.test.ts': 'src/quantum/os/waves/index.test.ts',
  'anthem-stream.test.ts': `${HARNESS}/anthem-stream.test.ts`,
  'anthem-superposition.test.ts': 'src/quantum/apps/anthem-superposition.test.ts',
  'url-audit.test.ts': 'src/quantum/apps/url-audit.test.ts',
  'terminal.test.ts': 'src/quantum/apps/terminal.test.ts',
  'miner-firmware.test.ts': 'src/quantum/os/firmware/index.test.ts',
  'all-run.test.ts': 'src/scripts/all-run.test.ts',
  'harmony-scan.test.ts': 'src/scripts/harmonic-scan.test.ts',
  'exercise-dormant.test.ts': 'src/scripts/exercise-dormant.test.ts',
  'prescribed-scripts.test.ts': 'src/scripts/prescribed-scripts.test.ts',
  'finder-coverage.test.ts': 'src/scripts/guard.test.ts',
  'public-apis.test.ts': `${HARNESS}/public-apis.test.ts`,
  'detail-audit.test.ts': 'src/scripts/detail-audit.test.ts',
  'gap-survey.test.ts': 'src/scripts/gap-survey.test.ts',
  'dirty-paths.test.ts': 'src/scripts/dirty-paths.test.ts',
  'search-feed.test.ts': 'src/scripts/search-feed.test.ts',
  'gate-paths.test.ts': 'src/scripts/gate-paths.test.ts',
  'gate-all.test.ts': 'src/scripts/gate-all.test.ts',
  'test-delta.test.ts': 'src/gate-receipt-index.test.ts',
  'falsifiers.generated.test.ts': 'src/falsifiers.test.ts',
  'models.test.ts': 'src/models.test.ts',
  'api.ts': 'src/test-api.ts',
}

function preferredTarget(name: string): string {
  if (INDEX_HOME[name]) return INDEX_HOME[name]
  if (HARNESS_HOME.has(name)) return `${HARNESS}/${name}`
  const base = name.replace(/\.test\.ts$/, '').replace(/\.ts$/, '')
  if (existsSync(join(ROOT, 'src', `${base}.ts`))) return `src/${base}.test.ts`
  if (existsSync(join(ROOT, 'src/quantum/os', base, 'index.ts'))) return `src/quantum/os/${base}/index.test.ts`
  if (existsSync(join(ROOT, 'src/os', base, 'index.ts'))) return `src/os/${base}/index.test.ts`
  if (existsSync(join(ROOT, 'src/hexbit/index.ts')) && base.startsWith('hexbit')) return 'src/hexbit/index.test.ts'
  return `src/${base}.test.ts`
}

const files = readdirSync(TEST_DIR).filter((f) => f.endsWith('.test.ts') || f === 'api.ts')
const taken = new Set<string>()
const plan: { from: string; to: string }[] = []

for (const f of files.sort()) {
  let to = preferredTarget(f)
  if (taken.has(to)) to = f === 'api.ts' ? 'src/test-api.ts' : `src/${f}`
  taken.add(to)
  plan.push({ from: f, to })
}

let moved = 0
for (const { from, to } of plan) {
  const raw = readFileSync(join(TEST_DIR, from), 'utf8')
  const out = rewriteTestImports(raw, `src/tests/${from}`, to)
  const outPath = join(ROOT, to)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, out)
  unlinkSync(join(TEST_DIR, from))
  moved++
}

try { if (readdirSync(TEST_DIR).length === 0) rmdirSync(TEST_DIR) } catch { /* */ }

console.log(`relocate-tests — ${moved} files → ${taken.size} targets (${plan.filter((p) => p.to.includes('/index.test.ts')).length} beside index)`)

// quantum-alpine — FULL quantum coverage: every Alpine package related to crypto/quantum playbook,
// tested through uuidna_exec (Layer 1) and planned for uuidna_run (Layer 2). One door per package,
// not one MCP tool per apk. A row without man or cmd: is NAMED, not padded.
import { quantumAdvantagePlaybook } from '../../advantage/mcp/agent/playbook/index.js'
import { cryptoAppsPort, type CryptoVia } from '../cryptoapps/index.js'
import { cataloguePackage } from '../catalogue/index.js'
import { defaultInstalls } from '../index.js'
import { uuidnaExec } from '../exec/index.js'
import { testInstallPackage, testAvailablePackage, type PackageAtATime } from '../patime/index.js'
import { planAlpineRuns, sandboxTestCommands, type SandboxCommandSuite } from '../../../os/runtime/index.js'
import { UUID_HEXBITS, hexbitDoorOf } from '../../../hexbit/index.js'
import { toUuid } from '../../../address.js'
import { merkleGravity } from '../../../gravity/index.js'
import { foldAppTheorems, type TheoremClaim } from '../apptheorem/index.js'

export interface PlaybookExecHit {
  line: string
  ok: boolean
  detail: string
}

export interface QuantumAlpineRow extends PackageAtATime {
  via: CryptoVia | 'playbook'
  theorem: string
  theoremRoute: `/theorem/${string}`
  skill: string | null
}

export interface QuantumAlpineCoverage {
  definition: 'quantum-alpine·crypto-apps·playbook'
  census: number
  tested: number
  passed: number
  failed: string[]
  complete: boolean
  withMan: number
  withBinary: number
  commands: string[]
  packages: QuantumAlpineRow[]
  playbookExec: PlaybookExecHit[]
  plans: { ok: boolean; built: number; total: number; reason?: string }
  sandbox: SandboxCommandSuite | null
  cites: readonly TheoremClaim[]
  theoremCount: number
  receipt: string
  hexbits: number[]
}

/** quantumAlpinePackageNames() → sorted crypto-using catalogue names from uuidna_crypto census. */
export function quantumAlpinePackageNames(): string[] {
  return cryptoAppsPort().packages.map((p) => p.name)
}

/** testQuantumAlpinePackage(name) → Layer 1 exec door for one crypto-related package. */
export function testQuantumAlpinePackage(name: string): QuantumAlpineRow {
  const census = cryptoAppsPort()
  const row = census.packages.find((p) => p.name === name)
  const via = row?.via ?? 'playbook'
  const theorem = row?.theorem ?? 'the_os_is_bootable_quantum'
  const theoremRoute = `/theorem/${theorem}` as const
  const skill = row?.skill ?? null
  const spec = defaultInstalls().specs.find((s) => s.name === name)
  if (spec) return { ...testInstallPackage(spec), via, theorem, theoremRoute, skill }
  const pkg = cataloguePackage(name)
  if (!pkg) {
    return {
      name,
      route: '/catalogue/' + name,
      ok: false,
      man: null,
      commands: [],
      checks: [{ check: 'catalogue', ok: false, detail: `${name} missing from catalogue` }],
      via,
      theorem,
      theoremRoute: `/theorem/${theorem}`,
      skill,
    }
  }
  return { ...testAvailablePackage(pkg), via, theorem, theoremRoute, skill }
}

function testPlaybookExecLines(): PlaybookExecHit[] {
  const lines = quantumAdvantagePlaybook().alpine.lines
  return lines.map((line) => {
    const r = uuidnaExec(line)
    const bits = Array.isArray(r.hexbits) ? r.hexbits : []
    const ok = r.ok === true && bits.length === UUID_HEXBITS
    return { line, ok, detail: ok ? line : (r.output[0] ?? 'exec refused') }
  })
}

export interface QuantumAlpineOpts {
  /** When true, run sandboxTestCommands on collected cmd: (docker required). */
  sandbox?: boolean
}

/** testQuantumAlpineCoverage() → every crypto-related Alpine package + playbook exec lines + Layer 2 plans. */
export function testQuantumAlpineCoverage(opts: QuantumAlpineOpts = {}): QuantumAlpineCoverage {
  const census = cryptoAppsPort()
  const packages = census.packages.map((p) => testQuantumAlpinePackage(p.name))
  const playbookExec = testPlaybookExecLines()
  const commands = [...new Set(packages.flatMap((p) => p.commands))]
  const batch = planAlpineRuns(commands)
  const built = batch.plans.filter((p) => p.plan.ok).length
  const failed = [
    ...packages.filter((p) => !p.ok).map((p) => p.name),
    ...playbookExec.filter((h) => !h.ok).map((h) => `exec:${h.line}`),
  ]
  const passed = packages.filter((p) => p.ok).length
  const playbookOk = playbookExec.every((h) => h.ok)
  const complete = failed.length === 0 && playbookOk
  const sandbox = opts.sandbox ? sandboxTestCommands(commands) : null
  const fold = foldAppTheorems(packages.map((p) => p.name))
  const receipt = merkleGravity([
    toUuid('quantum-alpine|' + census.total),
    toUuid('passed|' + passed),
    toUuid('failed|' + failed.length),
    toUuid('cmd|' + commands.length),
    toUuid('plans|' + built + '/' + batch.plans.length),
    toUuid('theorems|' + fold.theorems.length),
    ...(sandbox ? [toUuid('sandbox|' + (sandbox.ok ? '1' : '0'))] : []),
    ...failed.slice(0, 25).map((n) => toUuid('fail|' + n)),
  ])
  return {
    definition: 'quantum-alpine·crypto-apps·playbook',
    census: census.total,
    tested: packages.length,
    passed,
    failed,
    complete,
    withMan: packages.filter((p) => p.man).length,
    withBinary: packages.filter((p) => p.commands.length > 0).length,
    commands,
    packages,
    playbookExec,
    plans: { ok: batch.ok, built, total: batch.plans.length, reason: batch.reason },
    sandbox,
    cites: fold.theorems,
    theoremCount: fold.theorems.length,
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

/** renderQuantumAlpineCoverage(c) → completion summary for CLI and tests. */
export function renderQuantumAlpineCoverage(c: QuantumAlpineCoverage): string {
  const status = c.complete ? 'COMPLETE' : 'INCOMPLETE'
  const lines = [
    `${status} quantum-alpine ${c.passed}/${c.tested} crypto packages · census ${c.census}`,
    `  man ${c.withMan}/${c.tested} · binaries ${c.withBinary}/${c.tested} · ${c.commands.length} cmd:`,
    `  plans ${c.plans.built}/${c.plans.total}${c.plans.reason ? ` (${c.plans.reason})` : ''}`,
  ]
  for (const h of c.playbookExec) {
    lines.push(`  playbook exec ${h.ok ? '✓' : '✗'} ${h.line}`)
  }
  if (c.cites.length) {
    lines.push(`  theorems from apps ${c.theoremCount} · cites ${c.cites.slice(0, 6).map((t) => t.route).join(' · ')}${c.cites.length > 6 ? ' …' : ''}`)
  }
  if (c.failed.length) {
    lines.push(`  failed: ${c.failed.slice(0, 12).join(', ')}${c.failed.length > 12 ? ' …' : ''}`)
  }
  if (c.sandbox) {
    lines.push(`  sandbox present ${c.sandbox.present} · spawned ${c.sandbox.spawned} · absent ${c.sandbox.absent}`)
    if (!c.sandbox.ok && c.sandbox.reason) lines.push(`  sandbox refused: ${c.sandbox.reason}`)
  }
  lines.push(`  receipt ${c.receipt.slice(0, 8)}…`)
  return lines.join('\n')
}

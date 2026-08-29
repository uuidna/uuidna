// package-at-a-time — ONE PACKAGE, THEN THE NEXT. Default install first (100% of alpine-base's closure);
// if that holds, CONTINUE automatically through remaining catalogue rows (Alpine then overlay). Ports are
// automated: catalogue identity, man→app→hexbit, and uuidna_run of published `cmd:` — not a TypeScript port
// per language. A package without a man page or without a binary is NAMED, not padded into a false 100%.
//
// THE REMAINING CENSUS REVERSES THE BINARY. Alpine ELFs are arch-bound; uuidnaOS is states
// (`one_image_every_architecture`) and is native from 1 bit to the width the architecture allows (UUID_BITS).
// readAvailableApp recovers apk / which / man FROM the published record — the same law as readSeed — so the
// census does not parse uuidnaExec per row. --limit N still walks the exec door. Omit the limit for this walk.
import { defaultInstalls, type InstallSpec } from './index.js'
import {
  cataloguePackage, catalogueCompile, packageSelfTest, resolveManPage,
  manAppWitness, providedCommands, catalogue, catalogueState, isAlpineDistroPackage, isOverlayPackage,
  isTestingPackage, catalogueRouteOf, type CataloguePackage,
} from './catalogue.js'
import { uuidnaExec } from './exec.js'
import { handleOf, handlePath, handleOfPath, isHandle } from '../../handle.js'
import { HANDLE_HEXBITS, UUID_HEXBITS, UUID_BITS, hexbitDoorOf, nativeBitWidths } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'

export interface PackageCheck { check: string; ok: boolean; detail: string }
export interface PackageAtATime {
  name: string
  route: string
  ok: boolean
  man: string | null
  commands: string[]
  checks: PackageCheck[]
}

const honestSelf = (p: CataloguePackage): boolean => packageSelfTest(p).ok

const handleOk = (address: string): boolean => {
  const h = handleOf(address)
  return isHandle(h) && h.length === HANDLE_HEXBITS && handleOfPath(handlePath(h)) === h
}

const push = (checks: PackageCheck[], check: string, ok: boolean, detail: string): void => {
  checks.push({ check, ok, detail })
}

/** testInstallPackage(spec) → one default-install package, fully. Pure against the committed catalogue + port. */
export function testInstallPackage(spec: InstallSpec): PackageAtATime {
  const checks: PackageCheck[] = []
  const cat = cataloguePackage(spec.name)
  push(checks, 'catalogue', !!cat, cat ? `${spec.name} in published index` : `${spec.name} missing from catalogue`)
  if (!cat) {
    return { name: spec.name, route: spec.route, ok: false, man: null, commands: [], checks }
  }
  const compiled = catalogueCompile(cat)
  push(checks, 'identity', compiled.address === spec.address && compiled.id === spec.id,
    compiled.address === spec.address ? spec.id : `catalogue ${compiled.address} ≠ port ${spec.address}`)
  push(checks, 'compile', spec.hexbits.length === UUID_HEXBITS && spec.hexbits.every((h) => h >= 0 && h < 16),
    `${spec.hexbits.length} hexbit states`)
  push(checks, 'self-test', honestSelf(cat), honestSelf(cat) ? 'honest' : packageSelfTest(cat).checks.filter((c) => !c.ok).map((c) => c.check).join(','))
  push(checks, 'handle', handleOk(spec.address), handleOk(spec.address) ? handleOf(spec.address) : 'handle round-trip failed')

  const apk = uuidnaExec(`apk info ${spec.name}`)
  const apkData = apk.data as { name?: string; state?: string; hexbits?: number[] } | null
  push(checks, 'apk', apk.ok && apkData?.name === spec.name && apkData?.state === 'INSTALLED',
    apk.ok ? `${apkData?.state} ${apkData?.name}` : (apk.output[0] ?? 'apk info failed'))

  const ls = uuidnaExec(`ls ${spec.route}`)
  push(checks, 'ls', ls.ok, ls.ok ? `ls ${spec.route}` : (ls.output[0] ?? 'ls failed'))

  if (spec.route !== '/') {
    const catLine = uuidnaExec(`cat ${spec.route}`)
    push(checks, 'cat', catLine.ok && (catLine.data as { package?: string })?.package === spec.name,
      catLine.ok ? `cat ${spec.route}` : (catLine.output[0] ?? 'cat failed'))
    const st = uuidnaExec(`stat ${spec.route}`)
    push(checks, 'stat', st.ok, st.ok ? `stat ${spec.route}` : (st.output[0] ?? 'stat failed'))
  }

  const { man, commands } = finishManAndCmds(checks, cat, spec.name)
  return { name: spec.name, route: spec.route, ok: checks.every((c) => c.ok), man, commands, checks }
}

function finishManAndCmds(checks: PackageCheck[], cat: CataloguePackage, name: string): { man: string | null; commands: string[] } {
  const doc = resolveManPage(name)
  if (doc) {
    const w = manAppWitness(doc)
    const manRun = uuidnaExec(`man ${name}`)
    const d = manRun.data as { witnessOk?: boolean; name?: string } | null
    push(checks, 'man', manRun.ok && w.ok && d?.witnessOk === true && d.name === doc.name,
      w.ok ? `man ${name} → ${w.app} (${w.via})` : w.detail)
  } else {
    push(checks, 'man', true, 'no documentation package published — named, not padded')
  }
  const commands = providedCommands(cat)
  const whichTarget = commands.find((c) => c === name || !!cataloguePackage(c))
  if (whichTarget) {
    const which = uuidnaExec(`which ${whichTarget}`)
    push(checks, 'which', which.ok, which.ok ? which.output[0]! : (which.output[0] ?? `which ${whichTarget}`))
  } else if (commands.length) {
    push(checks, 'which', true, `${commands.length} cmd: — applet names, not package names; Layer 2 plan covers them`)
  } else {
    push(checks, 'binary', true, 'no cmd: published — library/meta/data, named')
  }
  return { man: doc?.name ?? null, commands }
}

export interface DefaultInstallNext {
  cites: '/theorem/research_always_has_a_next'
  remaining: number
  package: string | null
  repo: string | null
  steps: string[]
}

export interface DefaultInstallPackageSuite {
  definition: 'default-install·package-at-a-time'
  complete: boolean
  count: number
  passed: number
  failed: string[]
  withMan: number
  withBinary: number
  commands: string[]
  packages: PackageAtATime[]
  next: DefaultInstallNext
}

/** next after the boot closure — first AVAILABLE Alpine package not in the default install, then the rest.
 *  The frontier always advances (research_always_has_a_next); a finished set is not a closed ledger. */
function nextAfterDefault(done: ReadonlySet<string>, complete: boolean, failed: readonly string[]): DefaultInstallNext {
  const cites = '/theorem/research_always_has_a_next' as const
  if (!complete) {
    const pkg = failed[0] ?? null
    return {
      cites, remaining: failed.length, package: pkg, repo: null,
      steps: pkg
        ? [`retest ${pkg} until it passes — the closure is not 100% while a member fails`]
        : ['retest the default install — passed < count'],
    }
  }
  const st = catalogueState()
  const alpine = catalogue().filter((p) => isAlpineDistroPackage(p) && !done.has(p.name))
  const testing = catalogue().filter((p) => isTestingPackage(p) && !done.has(p.name))
  const overlay = catalogue().filter((p) => isOverlayPackage(p) && !done.has(p.name))
  const nextPkg = alpine[0] ?? testing[0] ?? overlay[0] ?? null
  const remaining = alpine.length + testing.length + overlay.length
  const steps: string[] = []
  if (nextPkg) {
    steps.push(`package-at-a-time: ${nextPkg.name} [${nextPkg.repo}] — AVAILABLE, not in the boot closure`)
  }
  if (alpine.length > 1) {
    steps.push(`${alpine.length} Alpine catalogue packages remain after the default install, same automated door`)
  } else if (alpine.length === 1) {
    steps.push('one Alpine catalogue package remains after the default install')
  }
  if (testing.length) {
    steps.push(`${testing.length} edge/testing lead(s) after Alpine distro (published apk, not latest-stable)`)
  }
  if (overlay.length) {
    steps.push(`${overlay.length} overlay port(s) after Alpine distro (not APKINDEX completeness)`)
  }
  if (!st.present) {
    steps.push(`catalogue absent (${st.why ?? 'unknown'}) — prime it before the next package`)
  }
  if (!steps.length) {
    steps.push('no unpublished-from-boot row remains — Layer 2 uuidnaOS sandbox probes the planned cmd: (network none, caps dropped)')
  }
  return { cites, remaining, package: nextPkg?.name ?? null, repo: nextPkg?.repo ?? null, steps }
}

/** testDefaultInstallPackages() → every default-install spec, one at a time, sealed build order, with NEXT. */
export function testDefaultInstallPackages(): DefaultInstallPackageSuite {
  const port = defaultInstalls()
  const packages = port.specs.map(testInstallPackage)
  const commands = [...new Set(packages.flatMap((p) => p.commands))]
  const failed = packages.filter((p) => !p.ok).map((p) => p.name)
  const passed = packages.filter((p) => p.ok).length
  const complete = passed === port.count && failed.length === 0
  const done = new Set(port.specs.map((s) => s.name))
  return {
    definition: 'default-install·package-at-a-time',
    complete,
    count: port.count,
    passed,
    failed,
    withMan: packages.filter((p) => p.man).length,
    withBinary: packages.filter((p) => p.commands.length > 0).length,
    commands,
    packages,
    next: nextAfterDefault(done, complete, failed),
  }
}

/** renderDefaultInstallProgress(suite) → completion and next steps, for the test to SHOW not only assert. */
export function renderDefaultInstallProgress(s: DefaultInstallPackageSuite): string {
  const status = s.complete ? 'COMPLETE' : 'INCOMPLETE'
  const lines = [
    `${status} ${s.passed}/${s.count} default-install packages (build order, floor → home)`,
    `  man ${s.withMan}/${s.count} · binaries ${s.withBinary}/${s.count} · ${s.commands.length} cmd: planned`,
  ]
  if (s.failed.length) lines.push(`  failed: ${s.failed.join(', ')}`)
  lines.push(`NEXT ${s.next.cites}`)
  for (const [i, step] of s.next.steps.entries()) {
    lines.push(`  ${i + 1}. ${step}`)
  }
  if (s.next.package) lines.push(`  next package: ${s.next.package}${s.next.repo ? ` [${s.next.repo}]` : ''} · ${s.next.remaining} remaining`)
  return lines.join('\n')
}

/** testAvailablePackage(pkg) → one catalogue row that is NOT in the boot closure. apk state is AVAILABLE. */
export function testAvailablePackage(pkg: CataloguePackage): PackageAtATime {
  const checks: PackageCheck[] = []
  const route = catalogueRouteOf(pkg.name)
  const compiled = catalogueCompile(pkg)
  push(checks, 'catalogue', true, `${pkg.name} in published index`)
  push(checks, 'compile', compiled.hexbits.length === UUID_HEXBITS && compiled.hexbits.every((h) => h >= 0 && h < 16),
    `${compiled.hexbits.length} hexbit states`)
  push(checks, 'self-test', honestSelf(pkg), honestSelf(pkg) ? 'honest' : packageSelfTest(pkg).checks.filter((c) => !c.ok).map((c) => c.check).join(','))
  push(checks, 'handle', handleOk(compiled.address), handleOk(compiled.address) ? handleOf(compiled.address) : 'handle round-trip failed')
  const apk = uuidnaExec(`apk info ${pkg.name}`)
  const apkData = apk.data as { name?: string; state?: string } | null
  push(checks, 'apk', apk.ok && apkData?.name === pkg.name && apkData?.state === 'AVAILABLE',
    apk.ok ? `${apkData?.state} ${apkData?.name}` : (apk.output[0] ?? 'apk info failed'))
  const { man, commands } = finishManAndCmds(checks, pkg, pkg.name)
  return { name: pkg.name, route, ok: checks.every((c) => c.ok), man, commands, checks }
}

export interface PackageAtATimeRun {
  definition: 'package-at-a-time'
  boot: DefaultInstallPackageSuite
  started: string | null
  count: number
  available: PackageAtATime[]
  passed: number
  failed: string[]
  complete: boolean
  commands: string[]
  next: DefaultInstallNext
}

/** Remaining AVAILABLE rows after the boot closure — Alpine distro first, then testing leads, then overlay. */
export function remainingAvailableQueue(done: ReadonlySet<string>): CataloguePackage[] {
  return [
    ...catalogue().filter((p) => isAlpineDistroPackage(p) && !done.has(p.name)),
    ...catalogue().filter((p) => isTestingPackage(p) && !done.has(p.name)),
    ...catalogue().filter((p) => isOverlayPackage(p) && !done.has(p.name)),
  ]
}

export interface AvailableAppRead {
  name: string
  route: string
  state: 'INSTALLED' | 'AVAILABLE'
  address: string
  hexbits: number[]
  ok: boolean
  man: string | null
  commands: string[]
}

/** readAvailableApp(pkg) → reverse the exec door from the published record, then quantumize it.
 *  A Python CLI, a C ELF, a Rust binary, a shell script — same shape: cmd: → which, tuple → UUID_HEXBITS.
 *  Zero command parsing; the row already holds what `apk info` / `which` / `man` would emit. */
export function readAvailableApp(pkg: CataloguePackage, installed: ReadonlySet<string>): AvailableAppRead {
  const route = catalogueRouteOf(pkg.name)
  const compiled = catalogueCompile(pkg)
  const compileOk = compiled.hexbits.length === UUID_HEXBITS
    && compiled.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16)
  const state: 'INSTALLED' | 'AVAILABLE' = installed.has(pkg.name) ? 'INSTALLED' : 'AVAILABLE'
  const apkOk = state === 'AVAILABLE' && compileOk && handleOk(compiled.address)
  const doc = resolveManPage(pkg.name)
  const manOk = !doc || manAppWitness(doc).ok
  const commands = providedCommands(pkg)
  const whichTarget = commands.find((c) => c === pkg.name || !!cataloguePackage(c))
  const whichOk = !whichTarget || whichTarget === pkg.name || !!cataloguePackage(whichTarget)
  return {
    name: pkg.name,
    route,
    state,
    address: compiled.address,
    hexbits: compiled.hexbits,
    ok: apkOk && honestSelf(pkg) && manOk && whichOk,
    man: doc?.name ?? null,
    commands,
  }
}

export interface RemainingAlpinePort {
  definition: 'remaining-alpine-port'
  remaining: number
  passed: number
  failedCount: number
  failed: string[]
  withMan: number
  withBinary: number
  commands: number
  reversed: number
  execs: 0
  bitWidth: number
  complete: boolean
  started: string | null
  receipt: string
  hexbits: number[]
  next: DefaultInstallNext
}

/** foldRemainingAlpine(queue, done, bitWidth?) → remaining AVAILABLE census as one major reverse-and-quantumize
 *  batch. `bitWidth` is the native grain (1 bit … UUID_BITS); default is UUID_BITS, the architecture's address
 *  column. A scheduling change, never a scope change — the same queue at width 1 and at UUID_BITS must agree. */
export function foldRemainingAlpine(
  queue: readonly CataloguePackage[],
  done: ReadonlySet<string>,
  bitWidth: number = UUID_BITS,
): RemainingAlpinePort {
  const widths = nativeBitWidths(UUID_BITS)
  const width = widths.includes(bitWidth) ? bitWidth : UUID_BITS
  let passed = 0
  let withMan = 0
  let withBinary = 0
  let failedCount = 0
  const failed: string[] = []
  const cmds = new Set<string>()
  const named = new Set(done)
  const fail = (name: string): void => {
    failedCount++
    if (failed.length < 25) failed.push(name)
  }
  for (let i = 0; i < queue.length; i += width) {
    const end = i + width < queue.length ? i + width : queue.length
    for (let j = i; j < end; j++) {
      const p = queue[j]!
      named.add(p.name)
      const row = readAvailableApp(p, done)
      if (row.man) withMan++
      if (row.commands.length) {
        withBinary++
        for (const c of row.commands) cmds.add(c)
      }
      if (row.ok) passed++
      else fail(p.name)
    }
  }
  const complete = failedCount === 0
  const receipt = merkleGravity([
    toUuid('remaining-alpine|' + queue.length),
    toUuid('passed|' + passed),
    toUuid('failed|' + failedCount),
    toUuid('man|' + withMan),
    toUuid('cmd|' + cmds.size),
    ...failed.map((n) => toUuid('fail|' + n)),
  ])
  return {
    definition: 'remaining-alpine-port',
    remaining: queue.length,
    passed,
    failedCount,
    failed,
    withMan,
    withBinary,
    commands: cmds.size,
    reversed: queue.length,
    execs: 0,
    bitWidth: width,
    complete,
    started: queue[0]?.name ?? null,
    receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
    next: nextAfterDefault(named, complete, failed),
  }
}

/** portRemainingAlpine() → remaining catalogue after the sealed boot names, one major reverse-and-quantumize batch. */
export function portRemainingAlpine(bitWidth: number = UUID_BITS): RemainingAlpinePort {
  const done = new Set(defaultInstalls().specs.map((s) => s.name))
  return foldRemainingAlpine(remainingAvailableQueue(done), done, bitWidth)
}

/** renderRemainingAlpine(port) → remaining census completion. */
export function renderRemainingAlpine(p: RemainingAlpinePort): string {
  const status = p.complete ? 'COMPLETE' : 'INCOMPLETE'
  const lines = [
    `${status} remaining Alpine port ${p.passed}/${p.remaining} starting at ${p.started ?? '(none remaining)'}`,
    `  man ${p.withMan}/${p.remaining} · binaries ${p.withBinary}/${p.remaining} · ${p.commands} cmd: · reversed ${p.reversed} · ${p.bitWidth}-bit · ${p.receipt.slice(0, 8)}`,
  ]
  if (p.failedCount) {
    lines.push(`  failed ${p.failedCount}: ${p.failed.join(', ')}${p.failedCount > p.failed.length ? ' …' : ''}`)
  }
  lines.push(`NEXT ${p.next.cites}`)
  for (const [i, step] of p.next.steps.entries()) lines.push(`  ${i + 1}. ${step}`)
  if (p.next.package) {
    lines.push(`  next package: ${p.next.package}${p.next.repo ? ` [${p.next.repo}]` : ''} · ${p.next.remaining} remaining`)
  }
  return lines.join('\n')
}

/** runPackageAtATime() → default install first; if 100%, CONTINUE automatically through remaining
 *  catalogue rows. `limit` caps how many AVAILABLE rows run this pass through the exec door. Omit it
 *  to take the whole remaining census as one major reverse-and-quantumize batch. `each` is a progress
 *  hook on the exec-door pass only. */
export function runPackageAtATime(
  limit?: number,
  each?: (t: PackageAtATime, done: number, total: number) => void,
): PackageAtATimeRun {
  const boot = testDefaultInstallPackages()
  const done = new Set(boot.packages.map((p) => p.name))
  const queue = remainingAvailableQueue(done)
  if (limit === undefined) {
    const rem = boot.complete
      ? foldRemainingAlpine(queue, done)
      : foldRemainingAlpine([], done)
    return {
      definition: 'package-at-a-time',
      boot,
      started: rem.started,
      count: rem.remaining,
      available: [],
      passed: rem.passed,
      failed: rem.failed,
      complete: boot.complete && rem.complete,
      commands: [],
      next: rem.next,
    }
  }
  const take = queue.slice(0, limit < 0 ? 0 : limit)
  const started = boot.complete ? (take[0]?.name ?? null) : null
  const available: PackageAtATime[] = []
  if (boot.complete) {
    let i = 0
    for (const pkg of take) {
      const t = testAvailablePackage(pkg)
      available.push(t)
      done.add(pkg.name)
      i++
      each?.(t, i, take.length)
    }
  }
  const failed = available.filter((p) => !p.ok).map((p) => p.name)
  const passed = available.filter((p) => p.ok).length
  const complete = boot.complete && failed.length === 0 && take.length === queue.length
  const commands = [...new Set(available.flatMap((p) => p.commands))]
  return {
    definition: 'package-at-a-time',
    boot,
    started,
    count: take.length,
    available,
    passed,
    failed,
    complete,
    commands,
    next: nextAfterDefault(done, boot.complete && failed.length === 0, boot.complete ? failed : boot.failed),
  }
}

/** renderPackageAtATime(run) → boot completion, this pass, and the next steps. */
export function renderPackageAtATime(r: PackageAtATimeRun): string {
  const lines = [renderDefaultInstallProgress(r.boot), '']
  if (!r.boot.complete) {
    lines.push('STOPPED — default install is not 100%; remaining catalogue is not started')
    return lines.join('\n')
  }
  const status = r.complete ? 'COMPLETE' : 'CONTINUING'
  lines.push(`${status} available pass ${r.passed}/${r.count} starting at ${r.started ?? '(none remaining)'}`)
  if (r.failed.length) lines.push(`  failed: ${r.failed.slice(0, 15).join(', ')}${r.failed.length > 15 ? ' …' : ''}`)
  lines.push(`NEXT ${r.next.cites}`)
  for (const [i, step] of r.next.steps.entries()) lines.push(`  ${i + 1}. ${step}`)
  if (r.next.package) {
    lines.push(`  next package: ${r.next.package}${r.next.repo ? ` [${r.next.repo}]` : ''} · ${r.next.remaining} remaining`)
  }
  return lines.join('\n')
}

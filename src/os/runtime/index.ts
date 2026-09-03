// @non-harmonic: host binary execution — verify-then-run at the os/ boundary; may spawn subprocesses.
//
// Layer 2 beside uuidna_exec (Layer 1). uuidna_exec simulates on the lattice; uuidna_run executes pinned
// Alpine bytes on the host when a rootfs tarball is present and verified. Output is DATA (content-addressed),
// never folded into the boot hexbit image (theorem the_os_is_bootable_quantum stays true for Layer 1).
import { join } from './hostnode/index.js'
import { existsSync, readFileSync, mkdtempSync, writeFileSync, rmSync } from './hostnode/index.js'
import { tmpdir, spawnSync, execFileAsync } from './hostnode/index.js'
import { toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'
import { alpineRelease, verifyAlpineRootfs, type AlpineRelease, type RootfsCheck } from '../alpine/index.js'
import { resolveShell, type ShellDriver, type PosixShell } from '../host/index.js'
import { INSTALLS_MIRROR } from '../../quantum/os/mirror/index.js'
import { ROOT } from '../../boundary.js'
import { bootOS } from '../../quantum/os/index.js'
import { ensureExtractedRootfs, fetchPinnedRootfs, extractedRootfsDir, rootfsDownloadUrl } from './rootfs/index.js'
import {
  SANDBOX_HONEST, dockerPlatformOf, ensureSandboxImage, sandboxDockerFlags,
  isSafeCmdName, isProbeableCmdName, reasonFromRefused, probeSh,
} from './sandbox/index.js'
import type { Reasoning } from '../../reason.js'

export { fetchPinnedRootfs, ensureExtractedRootfs, extractedRootfsDir, rootfsDownloadUrl }

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

const HONEST =
  'Verify-then-run at the host boundary: the pinned Alpine minirootfs digest must match before any spawn ' +
  'recipe is returned or executed. uuidna_run is stdio-only — never on the Workers edge. Layer 2 spawn is the ' +
  'uuidnaOS docker sandbox (network none, capabilities dropped, read-only). stdout/stderr are DATA, ' +
  'content-addressed; they do not alter the sealed boot image.'

export type RunBackend = 'docker' | 'chroot' | 'shell-only'

/** pinnedAlpineRelease() → the committed default-install rootfs provenance record. */
export function pinnedAlpineRelease(): AlpineRelease {
  const m = INSTALLS_MIRROR
  return alpineRelease(m.release.version, m.arch, m.release.rootfsSha256)
}

/** defaultRootfsTarballPath() → repo-relative path to the pinned minirootfs tarball, if present. */
export function defaultRootfsTarballPath(release = pinnedAlpineRelease()): string {
  return join(ROOT, 'mirror', release.file)
}

/** detectRunBackend() → docker (preferred) · chroot (linux root) · shell-only (refuse spawn). */
export function detectRunBackend(shell: ShellDriver = resolveShell()): RunBackend {
  if (!shell.ok) return 'shell-only'
  try {
    const r = spawnSync(shell.file, shell.argv('command -v docker'), {
      encoding: 'utf8', env: shell.env(process.env as Record<string, string | undefined>),
    })
    if (!r.error && r.status === 0 && String(r.stdout).trim()) return 'docker'
  } catch { /* absent */ }
  if (process.platform === 'linux' && typeof process.getuid === 'function' && process.getuid() === 0) return 'chroot'
  return 'shell-only'
}

/** verifyPinnedRootfs(path?) → hash tarball bytes with uuidna SHA-256 vs pinned digest. */
export function verifyPinnedRootfs(path = defaultRootfsTarballPath()): RootfsCheck & { path: string; present: boolean } {
  const release = pinnedAlpineRelease()
  if (!existsSync(path)) {
    return {
      path, present: false, file: release.file, expected: release.rootfsSha256,
      computed: '', ok: false,
      honest: 'Rootfs tarball absent at ' + path + ' — run `npm run x -- fetch-pinned-rootfs` or place mirror/' + release.file,
    }
  }
  const bytes = readFileSync(path)
  const check = verifyAlpineRootfs(bytes, release)
  return { ...check, path, present: true }
}

const shellEscape = (cmd: string): string => cmd.replace(/'/g, `'\\''`)

const buildArgv = (scaffold: Extract<RunScaffold, { ok: true }>, command: string): string[] => {
  const inner = shellEscape(command)
  if (scaffold.backend === 'docker' && scaffold.image && scaffold.platform) {
    const line = `docker run ${sandboxDockerFlags(scaffold.platform)} ${scaffold.image} /bin/sh -c '${inner}'`
    return scaffold.shell.argv(line)
  }
  if (scaffold.backend === 'chroot') {
    return scaffold.shell.argv(`chroot "${scaffold.extracted}" /bin/sh -c '${inner}'`)
  }
  return scaffold.shell.argv(command)
}

export interface RunRecipe {
  backend: RunBackend
  file: string
  argv: string[]
  env: Record<string, string | undefined>
  command: string
  rootfs: AlpineRelease
  rootfsPath: string
  extractedRoot: string
  verify: RootfsCheck
  honest: string
}

export interface RunPlan {
  ok: boolean
  recipe?: RunRecipe
  reason?: string
  remedy?: string
  backend?: RunBackend
  honest: string
}

type RunScaffold =
  | {
    ok: true
    shell: PosixShell
    backend: Exclude<RunBackend, 'shell-only'>
    verify: ReturnType<typeof verifyPinnedRootfs>
    extracted: string
    release: AlpineRelease
    rootfsPath: string
    env: Record<string, string | undefined>
    image?: string
    platform?: string
  }
  | { ok: false; reason: string; remedy?: string; backend?: RunBackend }

/** prepareRunScaffold() → verify + extract + backend ONCE. planAlpineRun and planAlpineRuns share this so
 *  a catalogue of commands does not re-hash the tarball per binary. */
function prepareRunScaffold(): RunScaffold {
  const shell = resolveShell()
  if (!shell.ok) return { ok: false, reason: shell.reason, remedy: shell.remedy }
  const rootfsPath = defaultRootfsTarballPath()
  const verify = verifyPinnedRootfs(rootfsPath)
  if (!verify.present) {
    return { ok: false, reason: 'rootfs tarball absent', remedy: 'npm run x -- fetch-pinned-rootfs' }
  }
  if (!verify.ok) {
    return { ok: false, reason: 'rootfs digest mismatch', remedy: 'hold exactly the pinned bytes or refresh lean-installs' }
  }
  const extracted = ensureExtractedRootfs(rootfsPath)
  if (!extracted.ok) {
    return { ok: false, reason: extracted.reason ?? 'extract failed', remedy: 'ensure tar is available' }
  }
  const backend = detectRunBackend(shell)
  if (backend === 'shell-only') {
    return {
      ok: false, backend, reason: 'no execution backend',
      remedy: 'install Docker (recommended) or run on Linux as root for chroot',
    }
  }
  const release = pinnedAlpineRelease()
  let image: string | undefined
  let platform: string | undefined
  if (backend === 'docker') {
    platform = dockerPlatformOf(release.arch)
    const img = ensureSandboxImage({
      shell, tarball: rootfsPath, digest: verify.expected, platform,
    })
    if (!img.ok) {
      return { ok: false, backend, reason: img.reason, remedy: 'docker import of the verified minirootfs tarball' }
    }
    image = img.image
  }
  return {
    ok: true, shell, backend, verify, extracted: extracted.path, release, rootfsPath, image, platform,
    env: shell.env({
      UUIDNA_ROOTFS_TAR: rootfsPath,
      UUIDNA_ROOTFS_DIR: extracted.path,
      UUIDNA_ALPINE_VERSION: release.version,
      UUIDNA_SANDBOX_IMAGE: image,
    }),
  }
}

function recipeOf(scaffold: Extract<RunScaffold, { ok: true }>, command: string): RunRecipe {
  return {
    backend: scaffold.backend,
    file: scaffold.shell.file,
    argv: buildArgv(scaffold, command),
    env: scaffold.env,
    command,
    rootfs: scaffold.release,
    rootfsPath: scaffold.rootfsPath,
    extractedRoot: scaffold.extracted,
    verify: scaffold.verify,
    honest: HONEST,
  }
}

function planFromScaffold(scaffold: RunScaffold, command: string): RunPlan {
  const cmd = String(command ?? '').trim()
  if (!cmd) return { ok: false, reason: 'command required', honest: HONEST }
  if (!scaffold.ok) {
    return { ok: false, reason: scaffold.reason, remedy: scaffold.remedy, backend: scaffold.backend, honest: HONEST }
  }
  return { ok: true, backend: scaffold.backend, recipe: recipeOf(scaffold, cmd), honest: HONEST }
}

/** planAlpineRun(command) → verify-then-run spawn RECIPE; does not spawn. */
export function planAlpineRun(command: string): RunPlan {
  return planFromScaffold(prepareRunScaffold(), command)
}

export interface RunPlanBatch {
  ok: boolean
  backend?: RunBackend
  reason?: string
  remedy?: string
  honest: string
  /** one slot per input command, same order — empty strings refuse as 'command required' */
  plans: { command: string; plan: RunPlan }[]
}

/** planAlpineRuns(commands) → a recipe for EVERY command, scaffold verified once.
 *  The port is automated: any language, any binary, one planner. A refused scaffold still RETURNS a slot
 *  per command (named reason, no recipe) so a missing rootfs and a missing port read distinctly. */
export function planAlpineRuns(commands: readonly string[]): RunPlanBatch {
  const scaffold = prepareRunScaffold()
  const plans = commands.map((command) => ({ command: String(command ?? ''), plan: planFromScaffold(scaffold, command) }))
  return {
    ok: scaffold.ok && plans.every((p) => p.plan.ok),
    backend: scaffold.ok ? scaffold.backend : scaffold.backend,
    reason: scaffold.ok ? undefined : scaffold.reason,
    remedy: scaffold.ok ? undefined : scaffold.remedy,
    honest: HONEST,
    plans,
  }
}

export interface RunResult {
  ok: boolean
  spawned: boolean
  exitCode: number | null
  stdout: string
  stderr: string
  stdoutSha256: string
  stderrSha256: string
  receipt: string
  recipe?: RunRecipe
  backend?: RunBackend
  reason?: string
  remedy?: string
  honest: string
}

/** runAlpineCommand(command, { spawn, fetch }) → verify, optionally fetch tarball, optionally spawn. */
export async function runAlpineCommand(command: string, opts: { spawn?: boolean; fetch?: boolean } = {}): Promise<RunResult> {
  if (opts.fetch) await fetchPinnedRootfs()
  const plan = planAlpineRun(command)
  const empty = { stdout: '', stderr: '', stdoutSha256: hex(sha256(new Uint8Array())), stderrSha256: hex(sha256(new Uint8Array())) }
  if (!plan.ok || !plan.recipe) {
    return {
      ok: false, spawned: false, exitCode: null, ...empty, backend: plan.backend,
      receipt: toUuid('run|refused|' + (plan.reason ?? 'unknown')),
      reason: plan.reason, remedy: plan.remedy, honest: HONEST,
    }
  }
  if (!opts.spawn) {
    return {
      ok: true, spawned: false, exitCode: null, ...empty, backend: plan.backend,
      recipe: plan.recipe,
      receipt: toUuid('run|recipe|' + plan.recipe.verify.computed + '|' + plan.backend + '|' + command),
      honest: HONEST,
    }
  }
  try {
    const { stdout, stderr } = await execFileAsync(plan.recipe.file, plan.recipe.argv, {
      env: { ...process.env, ...plan.recipe.env } as NodeJS.ProcessEnv,
      maxBuffer: 4 * 1024 * 1024,
    })
    const out = String(stdout ?? '')
    const err = String(stderr ?? '')
    const stdoutSha256 = hex(sha256(new TextEncoder().encode(out)))
    const stderrSha256 = hex(sha256(new TextEncoder().encode(err)))
    return {
      ok: true, spawned: true, exitCode: 0, stdout: out, stderr: err, stdoutSha256, stderrSha256,
      backend: plan.backend, recipe: plan.recipe,
      receipt: toUuid('run|ok|' + stdoutSha256 + '|' + stderrSha256 + '|' + plan.backend + '|' + command),
      honest: HONEST,
    }
  } catch (e: unknown) {
    const errObj = e as { stdout?: Buffer; stderr?: Buffer; code?: number; message?: string }
    const out = String(errObj.stdout ?? '')
    const err = String(errObj.stderr ?? errObj.message ?? e)
    const stdoutSha256 = hex(sha256(new TextEncoder().encode(out)))
    const stderrSha256 = hex(sha256(new TextEncoder().encode(err)))
    return {
      ok: false, spawned: true, exitCode: typeof errObj.code === 'number' ? errObj.code : 1,
      stdout: out, stderr: err, stdoutSha256, stderrSha256, backend: plan.backend, recipe: plan.recipe,
      receipt: toUuid('run|fail|' + stdoutSha256 + '|' + stderrSha256),
      reason: err, honest: HONEST,
    }
  }
}

export interface SandboxCommandTest {
  command: string
  present: boolean
  spawned: boolean
  skipped: boolean
  exitCode: number | null
}

export interface SandboxCommandSuite {
  definition: 'uuidnaOS-sandbox'
  ok: boolean
  os: string
  backend?: RunBackend
  image?: string
  probed: number
  present: number
  spawned: number
  skipped: number
  absent: number
  refused: string[]
  presentNames: string[]
  absentSample: string[]
  results: SandboxCommandTest[]
  reasoning?: Reasoning
  reason?: string
  remedy?: string
  honest: string
  receipt: string
}

/** sandboxTestCommands(commands) → ONE docker spawn, every cmd: probed inside the uuidnaOS sandbox.
 *  The host never runs the binaries. PRESENT+SPAWN is in-image; ABSENT is AVAILABLE, named. */
export function sandboxTestCommands(commands: readonly string[]): SandboxCommandSuite {
  const os = bootOS().receipt
  const empty = (reason: string, remedy?: string, backend?: RunBackend): SandboxCommandSuite => ({
    definition: 'uuidnaOS-sandbox', ok: false, os, backend, probed: 0, present: 0, spawned: 0,
    skipped: 0, absent: 0, refused: [], presentNames: [], absentSample: [], results: [],
    reason, remedy, honest: SANDBOX_HONEST, receipt: toUuid('sandbox|refused|' + os + '|' + reason),
  })
  const scaffold = prepareRunScaffold()
  if (!scaffold.ok) return empty(scaffold.reason, scaffold.remedy, scaffold.backend)
  if (scaffold.backend !== 'docker' || !scaffold.image || !scaffold.platform) {
    return empty('sandbox is docker (network none, caps dropped) — chroot-as-root is not that isolation', 'install Docker', scaffold.backend)
  }
  const refused: string[] = []
  const names: string[] = []
  for (const raw of commands) {
    const c = String(raw ?? '').trim()
    if (!c) continue
    if (!isProbeableCmdName(c)) { refused.push(c); continue }
    if (!names.includes(c)) names.push(c)
  }
  const reasoning = reasonFromRefused(refused)
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-sandbox-'))
  try {
    writeFileSync(join(dir, 'cmds'), names.join('\n') + (names.length ? '\n' : ''))
    writeFileSync(join(dir, 'probe.sh'), probeSh() + '\n')
    const line = `docker run ${sandboxDockerFlags(scaffold.platform)} -v "${dir}:/probe:ro" ${scaffold.image} /bin/sh /probe/probe.sh`
    const ran = spawnSync(scaffold.shell.file, scaffold.shell.argv(line), {
      encoding: 'utf8',
      env: scaffold.env,
      timeout: 180_000,
      maxBuffer: 16 * 1024 * 1024,
    })
    if (ran.error || ran.status !== 0) {
      const why = (ran.stderr || ran.error?.message || `docker probe exit ${ran.status}`).trim()
      return empty(why, 'docker must run the imported minirootfs', 'docker')
    }
    const results: SandboxCommandTest[] = []
    const presentNames: string[] = []
    const absentSample: string[] = []
    const spawnExit = new Map<string, number>()
    const skipped = new Set<string>()
    const present = new Set<string>()
    const absent = new Set<string>()
    for (const lineOut of String(ran.stdout ?? '').split('\n')) {
      const parts = lineOut.trim().split(' ')
      const kind = parts[0]
      const name = parts[1]
      if (!kind || !name) continue
      if (kind === 'PRESENT') present.add(name)
      else if (kind === 'ABSENT') absent.add(name)
      else if (kind === 'SKIP') skipped.add(name)
      else if (kind === 'SPAWN') spawnExit.set(name, Number(parts[2] ?? 0))
    }
    for (const name of present) {
      presentNames.push(name)
      const spawned = spawnExit.has(name)
      results.push({
        command: name, present: true, spawned, skipped: skipped.has(name),
        exitCode: spawnExit.get(name) ?? null,
      })
    }
    for (const name of absent) {
      if (absentSample.length < 20) absentSample.push(name)
    }
    presentNames.sort()
    const receipt = toUuid('sandbox|' + os + '|' + scaffold.image + '|p' + present.size + '|a' + absent.size)
    return {
      definition: 'uuidnaOS-sandbox',
      ok: true, os, backend: 'docker', image: scaffold.image,
      probed: names.length, present: present.size, spawned: spawnExit.size,
      skipped: skipped.size, absent: absent.size, refused,
      presentNames, absentSample, results, reasoning,
      honest: SANDBOX_HONEST, receipt,
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/** renderSandboxSuite(s) → completion of the Layer 2 sandbox probe. */
export function renderSandboxSuite(s: SandboxCommandSuite): string {
  const lines = [
    s.ok
      ? `SANDBOX ${s.probed} cmd: in uuidnaOS Layer 2 (${s.backend ?? '?'}${s.image ? ` ${s.image}` : ''})`
      : `SANDBOX named-refusal — ${s.reason ?? 'unknown'}`,
    `  present ${s.present} · spawned ${s.spawned} · skip ${s.skipped} · absent ${s.absent} · refused ${s.refused.length}`,
  ]
  if (!s.refused.length && s.reasoning?.derived.includes('skipped-is-zero')) {
    lines.push('  proved skipped-is-zero /theorem/solutions_not_skipped · mandate obeyed (court_loser_develops_the_proven)')
  }
  if (s.refused.length) {
    lines.push(`  on the record /theorem/solutions_not_skipped: ${s.refused.slice(0, 8).join(', ')}${s.refused.length > 8 ? ' …' : ''}`)
  }
  if (s.reasoning?.trace.length) {
    lines.push('  proved (uninterrupted, not an order)')
    for (const t of s.reasoning.trace.slice(0, 2)) {
      lines.push(`    ${t.from.join(', ')} → ${t.conclude} ${t.cites}`)
    }
  }
  if (s.presentNames.length) {
    lines.push(`  in-image: ${s.presentNames.slice(0, 24).join(', ')}${s.presentNames.length > 24 ? ' …' : ''}`)
  }
  if (s.absentSample.length) {
    lines.push(`  absent (AVAILABLE, not in pinned image): ${s.absentSample.slice(0, 8).join(', ')}${s.absent > 8 ? ' …' : ''}`)
  }
  if (!s.ok && s.remedy) lines.push(`  remedy: ${s.remedy}`)
  lines.push(`  boot ${s.os}`)
  return lines.join('\n')
}

export {
  isSafeCmdName, isProbeableCmdName, hullCracks, reasonFromRefused,
  SANDBOX_SKIP_SPAWN, SANDBOX_HONEST,
} from './sandbox/index.js'

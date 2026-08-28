// @non-harmonic: host binary execution — verify-then-run at the os/ boundary; may spawn subprocesses.
//
// Layer 2 beside uuidna_exec (Layer 1). uuidna_exec simulates on the lattice; uuidna_run executes pinned
// Alpine bytes on the host when a rootfs tarball is present and verified. Output is DATA (content-addressed),
// never folded into the boot hexbit image (theorem the_os_is_bootable_quantum stays true for Layer 1).
import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'
import { alpineRelease, verifyAlpineRootfs, type AlpineRelease, type RootfsCheck } from '../alpine/index.js'
import { resolveShell } from '../host/index.js'
import { INSTALLS_MIRROR } from '../../quantum/os/mirror.js'
import { ROOT } from '../../boundary.js'

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

const HONEST =
  'Verify-then-run at the host boundary: the pinned Alpine minirootfs digest must match before any spawn ' +
  'recipe is returned or executed. uuidna_run is stdio-only — never on the Workers edge. stdout/stderr are ' +
  'DATA, content-addressed; they do not alter the sealed boot image.'

/** pinnedAlpineRelease() → the committed default-install rootfs provenance record. */
export function pinnedAlpineRelease(): AlpineRelease {
  const m = INSTALLS_MIRROR
  return alpineRelease(m.release.version, m.arch, m.release.rootfsSha256)
}

/** defaultRootfsTarballPath() → repo-relative path to the pinned minirootfs tarball, if present. */
export function defaultRootfsTarballPath(release = pinnedAlpineRelease()): string {
  return join(ROOT, 'mirror', release.file)
}

export interface RunRecipe {
  backend: 'shell'
  file: string
  argv: string[]
  env: Record<string, string | undefined>
  command: string
  rootfs: AlpineRelease
  rootfsPath: string
  verify: RootfsCheck
  honest: string
}

export interface RunPlan {
  ok: boolean
  recipe?: RunRecipe
  reason?: string
  remedy?: string
  honest: string
}

/** verifyPinnedRootfs(path?) → hash tarball bytes with uuidna SHA-256 vs pinned digest. */
export function verifyPinnedRootfs(path = defaultRootfsTarballPath()): RootfsCheck & { path: string; present: boolean } {
  const release = pinnedAlpineRelease()
  if (!existsSync(path)) {
    return {
      path, present: false, file: release.file, expected: release.rootfsSha256,
      computed: '', ok: false,
      honest: 'Rootfs tarball absent at ' + path + ' — fetch or place mirror/' + release.file + ' before run.',
    }
  }
  const bytes = readFileSync(path)
  const check = verifyAlpineRootfs(bytes, release)
  return { ...check, path, present: true }
}

/** planAlpineRun(command) → verify-then-run spawn RECIPE; does not spawn. */
export function planAlpineRun(command: string): RunPlan {
  const cmd = String(command ?? '').trim()
  if (!cmd) return { ok: false, reason: 'command required', honest: HONEST }
  const shell = resolveShell()
  if (!shell.ok) {
    return { ok: false, reason: shell.reason, remedy: shell.remedy, honest: HONEST }
  }
  const rootfsPath = defaultRootfsTarballPath()
  const verify = verifyPinnedRootfs(rootfsPath)
  if (!verify.present) {
    return {
      ok: false, reason: 'rootfs tarball absent', remedy: 'place ' + verify.file + ' under mirror/ or pass rootfsBytes to uuidna_run',
      honest: HONEST,
    }
  }
  if (!verify.ok) {
    return { ok: false, reason: 'rootfs digest mismatch', remedy: 'hold exactly the pinned bytes or refresh lean-installs', honest: HONEST }
  }
  const release = pinnedAlpineRelease()
  const env = shell.env({ UUIDNA_ROOTFS_TAR: rootfsPath, UUIDNA_ALPINE_VERSION: release.version })
  const argv = shell.argv(cmd)
  return {
    ok: true,
    recipe: {
      backend: 'shell', file: shell.file, argv, env, command: cmd, rootfs: release, rootfsPath,
      verify, honest: HONEST,
    },
    honest: HONEST,
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
  reason?: string
  remedy?: string
  honest: string
}

/** runAlpineCommand(command, { spawn }) → verify, optionally spawn, return DATA receipt. */
export async function runAlpineCommand(command: string, opts: { spawn?: boolean } = {}): Promise<RunResult> {
  const plan = planAlpineRun(command)
  const empty = { stdout: '', stderr: '', stdoutSha256: hex(sha256(new Uint8Array())), stderrSha256: hex(sha256(new Uint8Array())) }
  if (!plan.ok || !plan.recipe) {
    return {
      ok: false, spawned: false, exitCode: null, ...empty,
      receipt: toUuid('run|refused|' + (plan.reason ?? 'unknown')),
      reason: plan.reason, remedy: plan.remedy, honest: HONEST,
    }
  }
  if (!opts.spawn) {
    return {
      ok: true, spawned: false, exitCode: null, ...empty,
      recipe: plan.recipe,
      receipt: toUuid('run|recipe|' + plan.recipe.verify.computed + '|' + command),
      honest: HONEST,
    }
  }
  const { execFile } = await import('node:child_process')
  const { promisify } = await import('node:util')
  const exec = promisify(execFile)
  try {
    const { stdout, stderr } = await exec(plan.recipe.file, plan.recipe.argv, {
      env: { ...process.env, ...plan.recipe.env } as NodeJS.ProcessEnv,
      maxBuffer: 4 * 1024 * 1024,
    })
    const out = String(stdout ?? '')
    const err = String(stderr ?? '')
    const stdoutSha256 = hex(sha256(new TextEncoder().encode(out)))
    const stderrSha256 = hex(sha256(new TextEncoder().encode(err)))
    return {
      ok: true, spawned: true, exitCode: 0, stdout: out, stderr: err, stdoutSha256, stderrSha256,
      recipe: plan.recipe,
      receipt: toUuid('run|ok|' + stdoutSha256 + '|' + stderrSha256 + '|' + command),
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
      stdout: out, stderr: err, stdoutSha256, stderrSha256, recipe: plan.recipe,
      receipt: toUuid('run|fail|' + stdoutSha256 + '|' + stderrSha256),
      reason: err, honest: HONEST,
    }
  }
}

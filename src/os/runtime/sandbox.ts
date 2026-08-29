// @non-harmonic: Layer 2 sandbox — import the verified minirootfs and spawn inside it, never on the host.
//
// uuidnaOS is the sandbox: Layer 1 boots the lattice (nothing executes); Layer 2 runs Alpine ELF only inside a
// throwaway docker container built from the PINNED tarball. Network is off, capabilities are dropped, the
// filesystem is read-only. A catalogue `cmd:` that is not in the minirootfs is ABSENT — AVAILABLE, not INSTALLED —
// named, not a missing port. Tools that would be unsafe as a host bulk-wave (pwntools, scanners) are safe here
// because they cannot reach the host or the network.
import { spawnSync } from './host-node.js'
import type { PosixShell } from '../host/index.js'
import { reason, type Reasoning, type Rule } from '../../reason.js'

export const SANDBOX_HONEST =
  'Layer 2 uuidnaOS sandbox: the pinned minirootfs is imported as a throwaway image, then spawned with ' +
  '--network=none --cap-drop=ALL --read-only. stdout/stderr are DATA. Commands missing from the image are ' +
  'ABSENT (AVAILABLE, not INSTALLED) — named, not a missing port.'

/** dockerPlatformOf(arch) → the linux platform the pinned Alpine arch maps to (x86_64 → linux/amd64). */
export function dockerPlatformOf(arch: string): string {
  if (arch === 'x86_64' || arch === 'amd64') return 'linux/amd64'
  if (arch === 'aarch64' || arch === 'arm64') return 'linux/arm64'
  if (arch === 'armv7') return 'linux/arm/v7'
  return 'linux/' + arch
}

/** sandboxImageName(digest) → content-addressed tag; the image IS the verified tarball. */
export function sandboxImageName(digest: string): string {
  return 'uuidna-rootfs:' + digest
}

/** isSafeCmdName(name) → portable PATH identifier. Used when interpolating into a shell line. */
export function isSafeCmdName(name: string): boolean {
  return /^[A-Za-z0-9][A-Za-z0-9._+-]*$/.test(name) && name.length <= 64
}

/** isProbeableCmdName(name) → one quoted `"$c"` line in the probe file will not expand.
 *  Engineering, not a legal verdict: `$`, backticks, `;`, spaces stay out. Published catalogue
 *  names (`[`, `_pcbnew.kiface`, comma device-profiles, `kdevelop!`) are identifiers. */
export function isProbeableCmdName(name: string): boolean {
  if (name === '[') return true
  return /^[A-Za-z0-9_][A-Za-z0-9._+,-]*!?$/.test(name) && name.length <= 64 && !name.includes('/')
}

/** partitionCmdNames(commands) → probe names (binary I/O) vs leftover (named, never written to the cmds file).
 *  Refused is not part of the binary I/O. */
export function partitionCmdNames(commands: readonly string[]): { probe: string[]; leftover: string[] } {
  const probe: string[] = []
  const leftover: string[] = []
  for (const raw of commands) {
    const c = String(raw ?? '').trim()
    if (!c) continue
    if (!isProbeableCmdName(c)) {
      if (!leftover.includes(c)) leftover.push(c)
      continue
    }
    if (!probe.includes(c)) probe.push(c)
  }
  return { probe, leftover }
}

/** applets that wait, become init, change identity, or whose `--help` is the wrong trial — present-check only. */
export const SANDBOX_SKIP_SPAWN: ReadonlySet<string> = new Set([
  'reboot', 'halt', 'poweroff', 'shutdown', 'init', 'telinit', 'killall5', 'sulogin',
  'login', 'su', 'getty', 'linux32', 'linux64', 'mount', 'umount',
  '[',
])

/** sandboxDockerFlags(platform) → isolation flags for every Layer 2 docker spawn. */
export function sandboxDockerFlags(platform: string): string {
  return [
    '--rm',
    `--platform ${platform}`,
    '--network=none',
    '--cap-drop=ALL',
    '--security-opt no-new-privileges',
    '--read-only',
    '--tmpfs /tmp',
    '--memory=256m',
    '--pids-limit=128',
  ].join(' ')
}

/** ensureSandboxImage() → docker import of the already-verified tarball, once per digest. */
export function ensureSandboxImage(opts: {
  shell: PosixShell
  tarball: string
  digest: string
  platform: string
}): { ok: true; image: string } | { ok: false; reason: string } {
  const image = sandboxImageName(opts.digest)
  const env = opts.shell.env(process.env as Record<string, string | undefined>)
  const inspect = spawnSync(opts.shell.file, opts.shell.argv(`docker image inspect ${image}`), {
    encoding: 'utf8', env,
  })
  if (!inspect.error && inspect.status === 0) return { ok: true, image }
  const quoted = opts.tarball.replace(/'/g, `'\\''`)
  let imp = spawnSync(
    opts.shell.file,
    opts.shell.argv(`docker import --platform ${opts.platform} '${quoted}' ${image}`),
    { encoding: 'utf8', env },
  )
  if (imp.error || imp.status !== 0) {
    imp = spawnSync(
      opts.shell.file,
      opts.shell.argv(`docker import '${quoted}' ${image}`),
      { encoding: 'utf8', env },
    )
  }
  if (imp.error || imp.status !== 0) {
    return { ok: false, reason: (imp.stderr || imp.error?.message || `docker import exit ${imp.status}`).trim() }
  }
  return { ok: true, image }
}

/** probeSh() → busybox sh that classifies each cmd: PRESENT+SPAWN, SKIP, or ABSENT.
 *  `[` cannot live in a `case` arm (it opens a character class), so it is tested as a string. */
export function probeSh(): string {
  const skip = [...SANDBOX_SKIP_SPAWN].filter((n) => n !== '[').join('|')
  return [
    'while IFS= read -r c; do',
    '  [ -n "$c" ] || continue',
    '  if command -v "$c" >/dev/null 2>&1; then',
    '    echo "PRESENT $c"',
    '    skip=0',
    `    case "$c" in ${skip}) skip=1 ;; *.kiface) skip=1 ;; esac`,
    '    [ "$c" = "[" ] && skip=1',
    '    if [ "$skip" = 1 ]; then echo "SKIP $c"',
    '    else timeout -k 1 1 "$c" --help >/dev/null 2>&1; echo "SPAWN $c $?"',
    '    fi',
    '  else',
    '    echo "ABSENT $c"',
    '  fi',
    'done < /probe/cmds',
  ].join('\n')
}

/** hullCracks(names) → published cmd: the quoted-file hull does not carry. Empty is the legal
 *  requirement (solutions_not_skipped: skipped count is 0). A leftover here is an intentional crack. */
export function hullCracks(names: readonly string[]): string[] {
  const out: string[] = []
  for (const raw of names) {
    const n = String(raw ?? '').trim()
    if (!n) continue
    if (!isProbeableCmdName(n) && !out.includes(n)) out.push(n)
  }
  return out
}

/** reasonFromRefused(names) → prove the point, uninterrupted: empty leftover ⇒ skipped-is-zero;
 *  a named leftover ⇒ on-the-record. Not an order. The court mandate is solutions_not_skipped;
 *  the hull obeys it (hullCracks empty). Theorem court_loser_develops_the_proven. */
export function reasonFromRefused(names: readonly string[]): Reasoning {
  if (!names.length) {
    return reason(['hull-closed'], [
      { if: ['hull-closed'], then: 'skipped-is-zero', cites: 'solutions_not_skipped' },
    ])
  }
  return reason(['named-leftover'], [
    { if: ['named-leftover'], then: 'on-the-record', cites: 'solutions_not_skipped' },
  ])
}

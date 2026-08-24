// os/host — THE DEVELOPMENT MACHINE'S DRIVER. The tree assumed one host and got another: `gate-all` spawned
// every step through `execFile('sh', …)` and `wave-run` waited by shelling out to `sleep`, so on a Windows
// development machine the FIRST generator died in 2 ms with ENOENT and the gate reported "GENERATOR FAILED:
// npm:build" — a build that was never run, blamed for a shell that was never found. That is the defect class this
// module exists to remove: a host assumption written inline at each call site, where nothing names it and every
// caller re-makes it.
//
// WHAT A DRIVER IS HERE. The same thing src/drivers/driver is for a kernel bundle: uuidna does NOT execute. This
// module RESOLVES and DESCRIBES the host — which shell can run a step, how many lanes the machine really has — and
// hands back a spawn RECIPE. The caller spawns. One place decides what the host is; every runner reads it. The
// split matters: a resolver can be tested without running anything, and a runner that takes its recipe cannot
// quietly grow a second opinion about the host.
//
// WHY THIS LIVES AT src/os. Capacity and shell location are properties of the machine, not of the ledger: two hosts
// answer differently and both answers are honest. src/os is the declared non-determinism boundary (os/installs
// re-reads a live index there, os/models a live feed), and the harmonic scan already exempts os/ and drivers/ from
// the recomputable-core rules for exactly this reason. The reading is non-deterministic; what we FOLD from it is a
// content-address, so a host still leaves a receipt.
//
// WHY A POSIX SHELL AND NOT cmd.exe ON WINDOWS. Not taste — correctness. The audit chain's steps carry globs
// (`node --test dist/tests/*.test.js`), and glob expansion is the SHELL's job. cmd.exe does not expand them: it
// would hand node the literal pattern, node would match no files, and the suite would exit 0 having run nothing.
// A false green is worse than the ENOENT it replaced, so this driver REFUSES a host with no POSIX shell and names
// the remedy instead of substituting one that reports success for work it did not do.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'

// The builtins ride the runtime's own registry rather than a static `import`, the boundary.ts/api.ts idiom: this
// module sits in the library graph, the edge worker and the VitePress dev server bundle that graph untreeshaken,
// and neither has a filesystem. Importing is always safe; only CALLING a resolver off-Node refuses, by name.
// (This reaches ABSOLUTE host paths — where a shell is installed — which is why it is not boundary.ts's
// repo-relative existsRoot: a different question, deliberately not folded into that singularity.)
type OsModule = { availableParallelism: () => number; totalmem: () => number; cpus: () => { model: string }[] }
type FsModule = { existsSync: (p: string) => boolean }
type PathModule = { dirname: (p: string) => string }
const builtin = <T>(name: string): T | undefined =>
  typeof process !== 'undefined' && typeof (process as { getBuiltinModule?: unknown }).getBuiltinModule === 'function'
    ? ((process as unknown as { getBuiltinModule: (n: string) => unknown }).getBuiltinModule(name) as T)
    : undefined

/** one gibibyte, as the integer it is — every width in this tree is exact, and a memory figure is no exception */
const GIB = 1073741824

/** An environment, as the host hands it over and as a runner passes it on. */
export type Env = Record<string, string | undefined>

/** A spawn RECIPE: the file to execute, the argv that runs one command string through it, and the ENVIRONMENT it
 *  needs to be a whole shell. The driver never spawns; a runner takes this and does. `ok: false` carries the
 *  reason and the remedy, never a substitute. */
export type ShellDriver =
  | { ok: true; kind: 'posix'; file: string; argv: (cmd: string) => string[]; env: (base: Env) => Env; source: string }
  | { ok: false; kind: 'none'; reason: string; remedy: string }

/** Where a POSIX shell lives on a Windows host. Git for Windows ships one (its own coreutils come with it, so
 *  `sleep` and glob expansion both work); these are its two standard layouts plus the 32-bit install. */
const WINDOWS_SH: readonly string[] = [
  'C:\\Program Files\\Git\\usr\\bin\\sh.exe',
  'C:\\Program Files\\Git\\bin\\sh.exe',
  'C:\\Program Files (x86)\\Git\\usr\\bin\\sh.exe',
]

/** withToolchain(shellFile) → the environment that makes a found shell a WHOLE one.
 *
 *  A POSIX shell on Windows is an executable, not an installation: sh.exe resolves fine while the PATH it inherits
 *  is still the Windows one, so nothing beside it is reachable. That is not theoretical — with the shell resolved
 *  and the environment left alone, the very first step died on `/usr/bin/env: 'bash': No such file or directory`,
 *  because npm's Unix entry point asks env for bash and bash sat unreachable in the shell's own directory. The
 *  interpreter and its coreutils are ONE thing; a recipe that hands over the first without the second has found a
 *  shell that cannot run anything. So the shell's own directory goes on the front of PATH — `sleep`, `env` and
 *  `bash` all live there — and nothing else is disturbed.
 *
 *  PATH IS MATCHED CASE-INSENSITIVELY. Windows spells it `Path` about as often as `PATH`, and writing the other
 *  spelling into a fresh object creates a SECOND variable that the child then has to choose between — so the key
 *  already present is the key rewritten. */
const withToolchain = (shellFile: string) => (base: Env): Env => {
  const path = builtin<PathModule>('node:path')
  if (!path) return base
  const dir = path.dirname(shellFile)
  const key = Object.keys(base).find((k) => /^path$/i.test(k)) ?? 'PATH'
  return { ...base, [key]: `${dir};${base[key] ?? ''}` }
}

/** resolveShell() → the shell this host can run a build step through.
 *
 *  On a POSIX host `sh` is on PATH by definition and the recipe is the one every runner already assumed. On Windows
 *  the driver PROBES for a real POSIX shell: first whatever `SHELL` names (a developer running under Git Bash
 *  already has it), then Git for Windows' standard locations. Nothing is fabricated — a host with no POSIX shell
 *  gets a refusal naming what to install, because the alternative (cmd.exe) silently breaks glob expansion and
 *  turns "ran no tests" into "all tests passed". */
export function resolveShell(platform: string = process.platform): ShellDriver {
  const argv = (cmd: string) => ['-c', cmd]
  if (platform !== 'win32')
    return { ok: true, kind: 'posix', file: 'sh', argv, env: (base) => base, source: 'the host is POSIX — sh is on PATH by definition' }

  const fs = builtin<FsModule>('node:fs')
  if (!fs) return { ok: false, kind: 'none', reason: 'no filesystem to probe — resolveShell ran outside Node', remedy: 'call this from a Node runner; the edge and the browser have no shell to find' }

  const found = (file: string, source: string): ShellDriver => ({ ok: true, kind: 'posix', file, argv, env: withToolchain(file), source })

  const fromEnv = process.env.SHELL
  if (fromEnv && /(?:sh|bash)\.exe$/i.test(fromEnv) && fs.existsSync(fromEnv)) return found(fromEnv, 'the SHELL environment variable')

  for (const candidate of WINDOWS_SH) if (fs.existsSync(candidate)) return found(candidate, 'Git for Windows')

  return {
    ok: false,
    kind: 'none',
    reason: 'this is a Windows host and no POSIX shell was found (not in SHELL, not in Git for Windows\' standard locations)',
    remedy: 'install Git for Windows (it ships sh.exe and the coreutils the audit steps use), or point SHELL at an existing sh.exe. ' +
      'cmd.exe is deliberately NOT substituted: it does not expand the globs the test steps pass, so a suite would run zero files and still exit 0.',
  }
}

/** A shell that resolved — the shape a runner may actually spawn through. */
export type PosixShell = Extract<ShellDriver, { ok: true }>

/** shellOrExit(who) → the resolved shell, or a named refusal and exit 1.
 *
 *  Declared HERE rather than at each runner, and not only to avoid two copies: an unresolvable host is a REFUSAL
 *  with one wording, and two runners drifting into two wordings is how one of them ends up substituting a fallback
 *  "just for now". The driver owns the answer and the refusal both. Every step would fail identically on a missing
 *  shell, so refusing once beats printing the same ENOENT twenty-nine times wearing the gate's uniform. */
export function shellOrExit(who: string): PosixShell {
  const shell = resolveShell()
  if (shell.ok) return shell
  console.error(`${who} — no shell to run a step through: ${shell.reason}`)
  console.error(`  FIX ${shell.remedy}`)
  process.exit(1)
}

/** What the machine actually has, and how much of it a fan-out may take. */
export interface Capacity {
  logical: number    // logical processors the runtime will admit — measured, never assumed
  lanes: number      // how many steps may be in flight at once
  reserved: number   // what the fan-out deliberately leaves behind
  memoryGiB: number  // whole gibibytes of RAM — integer, floor, exact
  cpu: string        // the processor's own model string, for the report
}

/** capacity(reserve) → the machine's real width.
 *
 *  RESERVE, AND WHY IT IS NOT ZERO. A fan-out that claims every lane starves the process orchestrating it and the
 *  step that is actually heavy; gate-all measured this directly — a test runner fanned out beside thirteen siblings
 *  took 50 s and FAILED where it passed alone in under a second. Concurrency that manufactures a flake is not
 *  speed, it is a false verdict. Two lanes stay behind, and the floor is 2 so a single-core host still runs.
 *  Integer arithmetic throughout: the memory figure floors by the exact form, never by a rounding intrinsic. */
export function capacity(reserve = 2): Capacity {
  const os = builtin<OsModule>('node:os')
  if (!os) return { logical: 1, lanes: 2, reserved: reserve, memoryGiB: 0, cpu: 'unknown — no host to measure' }
  const logical = os.availableParallelism()
  const free = logical - reserve
  const bytes = os.totalmem()
  return {
    logical,
    lanes: free < 2 ? 2 : free,
    reserved: reserve,
    memoryGiB: (bytes - (bytes % GIB)) / GIB,
    cpu: os.cpus()[0]?.model.trim() ?? 'unknown',
  }
}

/** The whole machine, folded — a host that a report can cite and another observer can recompute. */
export interface HostProfile extends Capacity {
  platform: string
  arch: string
  shell: string       // the resolved shell's file, or 'none' when the host has none
  address: string     // content-address of this host's shape
  receipt: string     // order-invariant fold — the same for any observer reading the same machine
}

/** hostProfile() → the driver's own receipt. The READING is non-deterministic (that is what src/os is for), but
 *  the FOLD of it is not: the same machine folds to the same address every time, and a host that changed — a core
 *  disabled, memory pulled, the shell moved — addresses elsewhere. So "measured on this machine" stops being
 *  something a report says and becomes something the next reader recomputes. */
export function hostProfile(reserve = 2): HostProfile {
  const cap = capacity(reserve)
  const shell = resolveShell()
  const file = shell.ok ? shell.file : 'none'
  const parts = [`platform:${process.platform}`, `arch:${process.arch}`, `logical:${cap.logical}`, `mem:${cap.memoryGiB}`, `shell:${file}`]
  return {
    ...cap,
    platform: process.platform,
    arch: process.arch,
    shell: file,
    address: toUuid(`machine|${parts.join('|')}`),
    receipt: merkleGravity(parts.map(toUuid)),
  }
}

/** How to ask this host whether a pid has a live child — the recipe, plus how to read the answer back.
 *  The driver states it; the caller spawns it, same split as the shell. */
export interface ChildProbe {
  file: string
  args: (pid: number) => string[]
  /** did the probe find at least one child? Given whatever it printed and how it exited. */
  reads: (stdout: string, exit: number) => boolean
  note: string
}

/** childProbe(platform) → the host's way of answering "is this holder actually working?"
 *
 *  WHY THIS IS A SAFETY QUESTION AND NOT A CONVENIENCE. The one-writer lock distinguishes a holder that is BUSY
 *  from one that is STUCK by asking whether it has a live child — a clock cannot tell those apart, and on
 *  2026-08-24 a clock-based ceiling accused a holder whose children were `npm run lean` and `tsc`, mid-cure. The
 *  probe was `pgrep -P`, which Windows does not have, and the catch around it reads a missing program the same way
 *  it reads a real "no children": FALSE. So on this host every holder reads not-working, and the stuck signal
 *  fires on exactly the busy landing it was written to protect. The safety property did not degrade, it INVERTED.
 *
 *  Windows answers the same question through its own process table. `pgrep` exits nonzero to mean "none", while
 *  the CIM query exits zero and prints a count — so the reading is part of the recipe rather than assumed by the
 *  caller, which is what let the old catch-all conflate two different noes. */
export function childProbe(platform: string = process.platform): ChildProbe {
  if (platform !== 'win32') return {
    file: 'pgrep',
    args: (pid) => ['-P', String(pid)],
    // pgrep prints each child pid and exits 1 when there are none — the nonzero IS the answer, not an error
    reads: (stdout) => stdout.trim().length > 0,
    note: 'pgrep -P — the POSIX process table',
  }
  return {
    file: 'powershell',
    // THE OBSERVER IS EXCLUDED FROM THE OBSERVATION. Asking the process table costs a process, and that process is
    // itself a child of the very pid being asked about — so the naive count is never zero, and `working` would
    // answer yes for a holder doing nothing at all. (The POSIX side gets this for free: a shell running one simple
    // command execs into pgrep, and pgrep never matches itself.) `$PID` is the asking shell's own id.
    args: (pid) => ['-NoProfile', '-NonInteractive', '-Command', `(Get-CimInstance Win32_Process -Filter "ParentProcessId=${pid}" | Where-Object { $_.ProcessId -ne $PID } | Measure-Object).Count`],
    // a count, printed on exit 0 — "0" is a live answer meaning no children, and must not read as one child
    reads: (stdout) => { const n = Number(stdout.trim()); return Number.isFinite(n) && n > 0 },
    note: 'Get-CimInstance Win32_Process, minus the asking shell — the Windows process table (no pgrep on this host)',
  }
}

/** How to ask this host for a pid's PARENT — the recipe, plus how to read the answer back. Same split as the
 *  shell and the child probe: the driver states it, the caller spawns it. */
export interface ParentProbe {
  file: string
  args: (pid: number) => string[]
  /** the parent pid, or 0 for "no answer" — an unknown pid, a walk that reached the top, an unreadable reply */
  reads: (stdout: string) => number
  note: string
}

/** parentProbe(platform) → the host's way of answering "who spawned this pid?"
 *
 *  THE THIRD APPEARANCE OF ONE MISTAKE, IN THE FILE THAT NAMES THE OTHER TWO (2026-08-24). one-writer's
 *  reentrancy check walks a pid's ppid chain to decide whether a would-be second writer is the holder's own
 *  descendant — lead 91: land holds the tree, land's reconcile child may write, a stranger may not. It walked it
 *  with `ps -o ppid= -p`, and the `-o` flag is not POSIX ps, it is procps: the ps shipped in Git for Windows
 *  answers `unknown option -- o` and exits nonzero. The catch around it reads a missing FLAG exactly as it reads
 *  a real "not an ancestor" — false — so on this host the holder's own children were refused the tree, and lead
 *  91's fix was silently un-made. The gate printed the ps error and the refusal on the same run, side by side.
 *
 *  It is the same shape as `pgrep -P` (childProbe, above) and as `sleep` (api.pauseSeconds): a POSIX program
 *  assumed to exist everywhere, wrapped in a catch that cannot tell a missing instrument from a real no. Three
 *  times in one file is not three bugs; it is one law arriving late — ASK THE HOST, and let the driver say how
 *  the answer reads, because only the recipe knows which silence means what.
 *
 *  WHY NOT MSYS ps's OWN PPID COLUMN, which `ps -l` does print. Because it prints it in the MSYS pid namespace,
 *  and this lock stores OS pids — the same two-namespace confusion the control test already had to fix when `$!`
 *  handed it an MSYS pid and `process.kill(pid, 0)` called a live stranger dead. The CIM query answers in the
 *  namespace Node's own `process.pid` and `process.ppid` speak, which is the one the lock is written in.
 *
 *  COST, stated because it is not free: one spawn per hop, and a PowerShell start is not cheap. The walk is
 *  bounded at 32 hops, real chains are a handful deep, and nothing reaches here except a CONTENDED acquire — the
 *  path that was about to refuse a writer anyway. Correctness at the cost of a slow no is the right trade; a fast
 *  wrong no is what this is fixing. */
export function parentProbe(platform: string = process.platform): ParentProbe {
  if (platform !== 'win32') return {
    file: 'ps',
    args: (pid) => ['-o', 'ppid=', '-p', String(pid)],
    // procps prints the ppid alone and exits nonzero for an unknown pid — blank reads as 0, which ends the walk
    reads: (stdout) => Number(stdout.trim()) || 0,
    note: 'ps -o ppid= -p — the POSIX process table',
  }
  return {
    file: 'powershell',
    args: (pid) => ['-NoProfile', '-NonInteractive', '-Command', `(Get-CimInstance Win32_Process -Filter "ProcessId=${pid}").ParentProcessId`],
    // a pid that no longer exists yields $null, and $null.ParentProcessId prints nothing — blank is the honest
    // "no answer", and it ends the walk rather than being mistaken for a parent
    reads: (stdout) => Number(stdout.trim()) || 0,
    note: 'Get-CimInstance Win32_Process — the Windows process table, in the pid namespace Node itself uses (ps here has no -o)',
  }
}

/** loadMeasurable(platform) → can this host report a load average at all?
 *
 *  Windows keeps no load average, and Node does not pretend otherwise in spirit — but it does in shape: loadavg()
 *  returns [0, 0, 0] there, a real-looking triple of real-looking numbers. Fed to a balancer that asks whether load
 *  sits under a spare floor, a permanent zero is a permanent PASS: the metal reports BALANCED while a walker burns
 *  every core, and the check can never say no. That is the vacuous-audit disease the ledger already refuses in its
 *  theorems, reached by way of a host quirk instead of a tautology.
 *
 *  So the driver names the absence, and a caller withholds the verdict rather than issuing one it cannot support.
 *  An instrument that is not present voids; it does not read zero. */
export const loadMeasurable = (platform: string = process.platform): boolean => platform !== 'win32'

/** speedup(serialMs, wallMs) → the fan-out's real gain, in HUNDREDTHS, as an integer.
 *
 *  A ratio is the one number a concurrency report exists to state, and it is exactly where a float would sneak a
 *  rounding into a receipt. So it is computed as an integer in hundredths by the exact floor form and rendered as
 *  text — 400 reads "4.00x". Zero wall-clock yields 0 rather than dividing: an unmeasured run reports nothing, and
 *  never a number it did not earn. */
export function speedup(serialMs: number, wallMs: number): number {
  if (wallMs <= 0) return 0
  const n = serialMs * 100
  return (n - (n % wallMs)) / wallMs
}

/** render hundredths as the ratio a reader expects — 400 → "4.00x", 1725 → "17.25x". Integer string surgery, so
 *  the printed figure is the computed one and no formatter rounds it a second time. */
export function renderSpeedup(hundredths: number): string {
  const whole = (hundredths - (hundredths % 100)) / 100
  return `${whole}.${String(hundredths % 100).padStart(2, '0')}x`
}

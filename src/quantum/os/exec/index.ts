// quantum/os/exec — Alpine apps via apk + man→hexbit, plus install-port `ls`.
// Toy busybox (cat/which/stat/pwd/echo/du) FOLDED: Alpine packages ARE the apps (man→app→hexbit).
// `uuidnaLs` is internal for `ls`; MCP tool uuidna_ls removed — use uuidna_exec.
// NO STATIC `node:` IMPORT — the LAST one in the worker bundle, and the reason the deploy never appeared.
// Cloudflare rejects node: in any uploaded module at UPLOAD, so --dry-run bundled this happily and reported
// success while nothing shipped. The reach goes through boundary's one declared accessor; on the edge it is
// simply absent, and the caller below refuses by name rather than dying on a resolution error.
import { nodeBuiltin } from '../../../boundary.js'
import * as CU from '../coreutils/index.js'
import { planAlpineRun as planAlpineRunStatic } from '../../../os/runtime/index.js'
type ModuleModule = { createRequire: (u: string) => (id: string) => unknown }
const createRequire = (u: string): ((id: string) => unknown) => {
  const m = nodeBuiltin<ModuleModule>('node:module')
  if (!m) throw new Error('exec: the Alpine run plan is loaded through require — Node only, and this is not Node')
  return m.createRequire(u)
}
import {
  catalogueState, cataloguePackage, catalogueSearch, catalogueRdepends, catalogueCompile, cataloguePrimed,
  resolveManPage, isManPagePackage, manAppWitness, catalogue, catalogueRouteOf,
  resolveAlpineApp, providedCommands,
} from '../catalogue/index.js'
import { INSTALLS_MIRROR } from '../mirror/index.js'
import { primeMonitor, monitorCensus, renderMonitor, compilerCensus, renderCompilers } from '../census/index.js'
import { MONITOR_INVENTORY } from '../census/inventory/index.js'
import { theorems } from '../../../theorems/index.js'
import { toUuid } from '../../../address.js'
import { handleOf } from '../../../handle.js'
import { bootOS, hexbitDoorOf, type InstallSpec } from '../index.js'
import { hostQuantumDevice } from '../../../drivers/quantum/index.js'
import { hostStreamFleet } from '../../../os/host/index.js'
import { GPU_POSTAGE_ADDRESSES } from '../../../hardware/lanes/index.js'
import { driverBundle } from '../../../drivers/driver/index.js'
import {
  execSessionStamp, resetExecSession, sessionAdd, sessionDel, sessionAdded, sessionHasPackage,
  sessionRead, sessionWrite, sessionCwd, setSessionCwd,
} from '../session/index.js'
import { livingFieldReport, computeVortexInvariantsHold } from '../../../sequence-field.js'
import { runSequence } from '../../../sequence-run.js'
import { parseCourtPlan, runCourtCli, runCourtSync } from '../court/index.js'
import { testQuantumAlpineCoverage, renderQuantumAlpineCoverage } from '../alpine/index.js'
import { planLetsEncryptIssuance, renderAcmeIssuance, testAcmePort, renderAcmePort } from '../acme/index.js'

export { resetExecSession, execSessionStamp }

/** The virtual filesystem is the install port's routes: each route a path, each package the file at it, and a
 *  route that is a prefix of others is a directory. Deterministic, from the committed mirror. */
export interface VfsEntry { name: string; path: string; kind: 'dir' | 'pkg'; id?: string; meaning?: string; address: string; hexbits: number[] }
export interface LsResult { path: string; entries: VfsEntry[]; count: number; receipt: string; hexbits: number[]; sealed: string; honest: string }

const HONEST =
  'uuidna_ls computes the contents of a path in the VIRTUAL uuidnaOS — the install port\'s routes and packages — ' +
  'with uuidna\'s own pure logic inside the booted sandbox. It does NOT run Alpine\'s ls or any binary (the OS never ' +
  'executes); it reads the sealed spec and returns what the ported directory holds. Deterministic, receipted.'

const norm = (p: string): string => ('/' + (p || '/')).replace(/\/+/g, '/').replace(/\/$/, '') || '/'

/** the children of a route: an entry E is a child of DIR when E's route is DIR + '/' + one segment. A route
 *  that is itself a prefix of a deeper route is shown as a 'dir'; a leaf route is its package 'pkg'. */
function childrenOf(dir: string, specs: readonly InstallSpec[]): VfsEntry[] {
  const d = norm(dir)
  const prefix = d === '/' ? '/' : d + '/'
  const seen = new Map<string, VfsEntry>()
  for (const s of specs) {
    const r = norm(s.route)
    if (r === d) continue
    if (!(r === prefix + r.slice(prefix.length) && r.startsWith(prefix))) continue
    const rest = r.slice(prefix.length)
    const seg = rest.split('/')[0]!
    const childPath = norm(prefix + seg)
    const isLeaf = childPath === r                                   // the child route IS a package
    if (isLeaf) {
      seen.set(seg, { name: seg, path: childPath, kind: 'pkg', id: s.id, meaning: s.meaning, address: s.address, hexbits: s.hexbits })
    } else if (!seen.has(seg)) {
      const addr = toUuid('vfs-dir|' + childPath)
      seen.set(seg, { name: seg, path: childPath, kind: 'dir', address: addr, ...hexbitDoorOf(addr) })
    }
  }
  return [...seen.values()].sort((a, b) => (a.name < b.name ? -1 : 1))
}

const CATALOGUE_LS_LIMIT = 500

/** ls /catalogue — the whole published census by repo (main · community · overlay). */
function catalogueLs(path: string): LsResult {
  const os = bootOS()
  const st = catalogueState()
  const p = norm(path)
  if (!st.present) {
    const receipt = toUuid('ls|' + p + '|absent')
    return {
      path: p, entries: [], count: 0,
      receipt, ...hexbitDoorOf(receipt), sealed: os.receipt,
      honest: HONEST + ' Catalogue absent: ' + (st.why ?? ''),
    }
  }
  const all = catalogue()
  if (p === '/catalogue') {
    const entries: VfsEntry[] = ['main', 'community', 'overlay'].map((repo) => {
      const count = all.filter((x) => x.repo === repo).length
      const childPath = norm('/catalogue/' + repo)
      const addr = toUuid('vfs-dir|' + childPath + '|' + count)
      return { name: repo, path: childPath, kind: 'dir' as const, meaning: `${count} packages`, address: addr, ...hexbitDoorOf(addr) }
    }).filter((e) => e.meaning !== '0 packages')
    const receipt = toUuid('ls|' + p + '|' + entries.map((e) => e.name).join(','))
    return { path: p, entries, count: entries.length, receipt, ...hexbitDoorOf(receipt), sealed: os.receipt, honest: HONEST }
  }
  const repo = p.replace(/^\/catalogue\/?/, '')
  if (repo !== 'main' && repo !== 'community' && repo !== 'overlay') {
    const receipt = toUuid('ls|' + p + '|bad-repo')
    return { path: p, entries: [], count: 0, receipt, ...hexbitDoorOf(receipt), sealed: os.receipt, honest: HONEST }
  }
  const rows = all.filter((x) => x.repo === repo).sort((a, b) => (a.name < b.name ? -1 : 1))
  const slice = rows.slice(0, CATALOGUE_LS_LIMIT)
  const entries: VfsEntry[] = slice.map((pkg) => {
    const compiled = catalogueCompile(pkg)
    return {
      name: pkg.name, path: norm('/catalogue/' + repo + '/' + pkg.name), kind: 'pkg' as const,
      id: compiled.id, meaning: pkg.desc, address: compiled.address, hexbits: compiled.hexbits,
    }
  })
  const receipt = toUuid('ls|' + p + '|' + entries.length + '/' + rows.length)
  return {
    path: p, entries, count: entries.length,
    receipt, ...hexbitDoorOf(receipt), sealed: os.receipt,
    honest: HONEST + (rows.length > CATALOGUE_LS_LIMIT ? ` (first ${CATALOGUE_LS_LIMIT} of ${rows.length} — apk info <name> for any row)` : ''),
  }
}

/** uuidna_ls(path) → list a directory of the virtual uuidnaOS. Boots the sandbox first (a drifted world lists
 *  nothing), computes the entries from the sealed install port, and folds them to one receipt. The first
 *  Alpine-package tool: busybox's `ls`, reimplemented in uuidna, run in the box, never as a binary. */
export function uuidnaLs(path = '/'): LsResult {
  const p = norm(path)
  if (p === '/catalogue' || p.startsWith('/catalogue/')) return catalogueLs(p)
  const os = bootOS()                                                // verified loading, or nothing runs
  const entries = childrenOf(p, os.port.specs)
  const receipt = toUuid('ls|' + p + '|' + entries.map((e) => e.name + ':' + e.kind).join(','))
  return {
    path: p, entries, count: entries.length,
    receipt, ...hexbitDoorOf(receipt), sealed: os.receipt, honest: HONEST,
  }
}

// ── THE BUSYBOX EXECUTOR — THE WHOLE TOOLBOX PORTED TO MCP THROUGH ONE DOOR (the captain's order, 2026-08-24:
// "Port all to mcp"; lead 129 phase a) ──────────────────────────────────────────────────────────────────────
// busybox on Alpine is ONE binary carrying MANY applets (ls, cat, which, ...) — so uuidna ports it as ONE tool
// carrying many applets, each uuidna's OWN pure reimplementation of the utility's LOGIC over the VIRTUAL
// filesystem (the install port's routes), run INSIDE the booted sandbox, NEVER Alpine's binary. This is the
// singularity 85 at the metal: `ls /terminal`, `cat /core`, `which busybox` are the terminal's own command
// lines, now answered by the wire.  (the_os_is_bootable_quantum): nothing executes — an applet
// reads the sealed spec and folds an answer; the tool's LOGIC is uuidna's, its IDENTITY is the busybox package.

/** one applet run: the parsed line, its output as text lines AND as structured data, folded to one receipt. */
export interface ExecResult {
  line: string; applet: string; args: string[]; ok: boolean
  /** EXECUTED — a ported applet ran and this output is its result. ATTESTED — a catalogued Alpine package was
   *  IDENTIFIED and this output is its provenance record; no program ran. The two were indistinguishable before
   *  2026-09-04, and the captain asked the question that exposed it: what is the point of an app register if the
   *  apps do not execute? Measured, the answer was worse than the question — `openssl version`, bare `openssl`
   *  and `openssl this-is-not-a-subcommand` all returned the identical record with ok: true, because the app
   *  branch never consulted args. A caller could not tell attestation from execution, and a nonsense subcommand
   *  read as success. The register's purpose IS provenance, which is legitimate and deliberate; what was wrong
   *  was a surface that looked like a shell. So the mode is now stated, and unrun arguments are reported. */
  mode: 'executed' | 'attested'
  /** arguments that were NOT run, when mode is 'attested'. Never silently dropped. */
  unrunArgs: string[]
  output: string[]; data: unknown
  receipt: string; hexbits: number[]; sealed: string; honest: string
}

/** THE APPLETS uuidna ports — busybox's filesystem/inspection family over the virtual OS. Kept to what a
 *  provenance filesystem can HONESTLY answer from the sealed spec; a utility with no meaning here is absent, not
 *  faked. Each is pure and total: a bad path is an honest error line, never a crash. */
export const APPLETS = ['ls', 'apk', 'man', 'driver', 'device', 'cat', 'which', 'stat', 'pwd', 'echo', 'du', 'sequence', 'run', 'court', 'quantum-cover', 'acme', 'monitor', 'top', 'compilers', 'help',
  // PORTED 2026-09-05 — the busybox text and arithmetic family, as pure logic over the virtual OS. They EXECUTE:
  // an argument changes the answer. See ../coreutils for which applets cannot be ported and why (date and
  // uptime read a clock this tree refuses; ps and kill have nothing to act on; awk and full sed are languages).
  ...CU.CORE_APPLETS] as const
export type Applet = (typeof APPLETS)[number]

/** Legacy fold list — toys are ported again as pure logic over the virtual OS + session vfs. */
export const FOLDED_APPLETS = [] as const

/** apk READ + simulated WRITE (session only — host rootfs unchanged). Host binary run: uuidna_run. */
export const APK_VERBS = ['list', 'info', 'search', 'depends', 'rdepends', 'add', 'del', 'policy'] as const

/** sequence — living field constructors (lean/Sequence.lean runtime). */
export const SEQUENCE_VERBS = ['field', 'run', 'dash', 'invariants'] as const

/** THE THREE STATES A PACKAGE QUERY CAN END IN, kept apart in the one place they are worded.
 *
 *  Before the catalogue there were two: found among the 25 that boot, or the string "not a ported package" —
 *  which a caller deciding what to rest a project on reads as "Alpine does not have this". For 28,614 of
 *  Alpine's 28,639 packages that reading was wrong, and it was wrong with total confidence.
 *
 *  Now: INSTALLED (in the boot closure), AVAILABLE (published by Alpine, catalogued here, not booted), or
 *  genuinely ABSENT. And a fourth that must never wear the third's clothes — the catalogue could not be READ,
 *  which is a fact about this host and says nothing whatever about Alpine. */
const apkMiss = (verb: string, name: string): string => {
  const st = catalogueState()
  if (!st.present)
    return `apk ${verb}: ${name}: UNKNOWN HERE — the catalogue is absent (${st.why}). `
      + 'This is a fact about this host, NOT about Alpine: the package may well exist upstream. '
      + 'Only the boot closure was searched.'
  return `apk ${verb}: ${name}: no such package — searched all ${st.count} packages Alpine publishes on the pinned `
    + 'branch, plus the boot closure. Absent UPSTREAM, not merely unported.'
}

/** resolve a package by name (busybox) or by route (/terminal); the two directions `which` walks. */
const specByName = (name: string, specs: readonly InstallSpec[]): InstallSpec | undefined => specs.find((s) => s.name === name)
const specByRoute = (route: string, specs: readonly InstallSpec[]): InstallSpec | undefined => specs.find((s) => s.route === norm(route))

/** installed set for apk: boot closure + session-added simulated packages. */
const sessionInstalledNames = (specs: readonly InstallSpec[]): Set<string> => {
  const s = new Set(specs.map((x) => x.name))
  for (const n of sessionAdded()) s.add(n)
  return s
}

const pinnedFileHint = (): string =>
  `alpine-minirootfs-${INSTALLS_MIRROR.release.version}-${INSTALLS_MIRROR.arch}.tar.gz`

/** uuidnaExec(line) → run one busybox command line in the virtual uuidnaOS. Boots first (a drifted world runs
 *  nothing), splits `applet args...`, dispatches to the ported applet, and folds the whole run to one receipt.
 *  The whole toolbox through one door: uuidna's logic, busybox's identity, never a binary. */
export function uuidnaExec(line: string): ExecResult {
  const os = bootOS()                                                // verified loading, or nothing runs
  const specs = os.port.specs
  const toks = String(line).trim().split(/\s+/).filter(Boolean)
  const applet = (toks[0] ?? '') as string
  const args = toks.slice(1)
  let ok = true
  let output: string[] = []
  let data: unknown = null
  let mode: 'executed' | 'attested' = 'executed'
  let unrunArgs: string[] = []

  const emit = (o: string[], d: unknown): void => { output = o; data = d }
  const err = (msg: string): void => { ok = false; output = [msg]; data = { error: msg } }
  // fault() is err for an applet that ALREADY named its own failure in its data — it keeps that structure
  // (which code failed, and where) instead of flattening it to a message, and it keeps every printed line.
  const fault = (lines: string[], d: unknown): void => { ok = false; output = lines; data = d }

  switch (applet) {
    case 'ls': {
      const r = uuidnaLs(args[0] ?? '/')
      emit(r.entries.map((e) => (e.kind === 'dir' ? e.name + '/' : e.name)), r)
      break
    }
    case 'apk': {
      const verb = args[0] ?? ''
      const name = args[1] ?? ''
      if (verb === 'list') {
        const st = catalogueState()
        if (name === '--all' || name === '-a' || name === 'all') {
          if (!st.present) { err(`apk list: catalogue absent (${st.why})`); break }
          const rows = [...catalogue()].sort((a, b) => (a.name < b.name ? -1 : 1))
          const limit = CATALOGUE_LS_LIMIT
          emit([
            ...rows.slice(0, limit).map((p) => `${p.name}-${p.version}  [${p.repo}]`),
            ...(rows.length > limit ? [`… ${rows.length - limit} more of ${rows.length} (apk info <name> for any row)`] : []),
          ], {
            scope: 'all', total: rows.length, shown: limit < rows.length ? limit : rows.length,
            packages: rows.slice(0, limit).map((p) => ({ name: p.name, version: p.version, repo: p.repo })),
          })
          break
        }
        if (name === 'main' || name === 'community' || name === 'overlay') {
          if (!st.present) { err(`apk list: catalogue absent (${st.why})`); break }
          const rows = catalogue().filter((p) => p.repo === name).sort((a, b) => (a.name < b.name ? -1 : 1))
          const limit = CATALOGUE_LS_LIMIT
          emit([
            ...rows.slice(0, limit).map((p) => `${p.name}-${p.version}  [${p.repo}]`),
            ...(rows.length > limit ? [`… ${rows.length - limit} more of ${rows.length}`] : []),
          ], { scope: name, total: rows.length, shown: limit < rows.length ? limit : rows.length })
          break
        }
        const rows = [...specs].sort((a, b) => (a.name < b.name ? -1 : 1))
        const extra = sessionAdded().filter((n) => !rows.some((s) => s.name === n))
        emit([
          ...rows.map((s) => `${s.name}-${s.version}  ${s.route}`),
          ...extra.map((n) => {
            const c = cataloguePackage(n)!
            return `${c.name}-${c.version}  [session]  ${catalogueRouteOf(n)}`
          }),
        ], {
          scope: 'installed', installed: rows.length + extra.length, boot: rows.length, session: extra.length,
          packages: [
            ...rows.map((s) => ({ name: s.name, version: s.version, route: s.route, state: 'INSTALLED' as const })),
            ...extra.map((n) => {
              const c = cataloguePackage(n)!
              return { name: c.name, version: c.version, route: catalogueRouteOf(n), state: 'SESSION' as const }
            }),
          ],
        })
      } else if (verb === 'info') {                                  // a package BY NAME (cat is by route) — its provenance record
        const s = specByName(name, specs)
        if (s) {
          emit([`${s.name}-${s.version} description:`, `  ${s.meaning}`, `${s.name}-${s.version} webpage:`, `  ${s.route}`,
            `${s.name}-${s.version} depends on:`, ...(s.deps.length ? s.deps.map((d) => '  ' + d) : ['  (none)'])],
            { name: s.name, version: s.version, route: s.route, meaning: s.meaning, checksum: s.checksum, deps: s.deps, address: s.address, hexbits: s.hexbits, state: 'INSTALLED' })
          break
        }
        if (sessionHasPackage(name)) {
          const c = cataloguePackage(name)!
          const compiled = catalogueCompile(c)
          emit([`${c.name}-${c.version} description:`, `  ${c.desc}`, `${c.name}-${c.version} webpage:`, `  ${catalogueRouteOf(name)}`,
            `${c.name}-${c.version} depends on:`, ...(c.deps.length ? c.deps.map((d) => '  ' + d) : ['  (none)']),
            `(SESSION — simulated install; host rootfs unchanged)`],
            { name: c.name, version: c.version, route: catalogueRouteOf(name), meaning: c.desc, checksum: c.checksum, deps: c.deps, address: compiled.address, hexbits: compiled.hexbits, id: compiled.id, state: 'SESSION' })
          break
        }
        // NOT IN THE BOOT CLOSURE IS NOT NOT-IN-ALPINE. The catalogue answers for every published package —
        // and the answer COMPILES: same mint as the boot port, so AVAILABLE is the same kind of object.
        const c = cataloguePackage(name)
        if (c) {
          const compiled = catalogueCompile(c)
          emit([`${c.name}-${c.version} description:`, `  ${c.desc}`, `${c.name}-${c.version} repository:`, `  ${c.repo}`,
            `${c.name}-${c.version} checksum:`, `  ${c.checksum}`,
            `${c.name}-${c.version} depends on:`, ...(c.deps.length ? c.deps.map((d) => '  ' + d) : ['  (none)']),
            `(AVAILABLE — published by Alpine, not in the boot closure; nothing is installed either way)`],
            { name: c.name, version: c.version, repo: c.repo, meaning: c.desc, checksum: c.checksum, deps: c.deps, address: compiled.address, hexbits: compiled.hexbits, id: compiled.id, state: 'AVAILABLE' })
          break
        }
        err(apkMiss('info', name))
      } else if (verb === 'search') {                                // find packages by name or published meaning
        const q = name.toLowerCase()
        if (!q) { err('apk search: a search term is required, e.g. `apk search shell`'); break }
        const installed = specs.filter((s) => s.name.toLowerCase().includes(q) || s.meaning.toLowerCase().includes(q))
          .sort((a, b) => (a.name < b.name ? -1 : 1))
        const sessionHits = sessionAdded().filter((n) => n.toLowerCase().includes(q))
          .map((n) => cataloguePackage(n)).filter((c): c is NonNullable<typeof c> => !!c)
        const cat = catalogueSearch(name)
        const inBoot = sessionInstalledNames(specs)
        const available = cat.hits.filter((c) => !inBoot.has(c.name))
        const st = catalogueState()
        if (!installed.length && !available.length && !sessionHits.length) { err(apkMiss('search', name)); break }
        const availableCompiled = available.map((c) => ({ c, ...catalogueCompile(c) }))
        emit([
          ...installed.map((s) => `${s.name}-${s.version}  [installed]  ${s.meaning}`),
          ...sessionHits.map((c) => `${c.name}-${c.version}  [session]  ${c.desc}`),
          ...available.map((c) => `${c.name}-${c.version}  [${c.repo}]  ${c.desc}`),
          ...(cat.total > cat.hits.length ? [`… ${cat.total - cat.hits.length} more of ${cat.total} matches (refine the term)`] : []),
          ...(st.present ? [] : [`(catalogue ABSENT here — ${st.why}; only the ${specs.length} boot packages were searched)`]),
        ], {
          query: name,
          // `hits` is KEPT and is every match, installed and available together. Growing a served shape is
          // additive or it is a break: a caller reading `hits` predates the catalogue and must not lose its key
          // because the answer got better. installed/available are the new, finer cut alongside it.
          // address + hexbits ride every hit: AVAILABLE used to answer without a compile while the self-test
          // claimed 32 states — the same gap the slow push made visible once the catalogue shipped.
          hits: [
            ...installed.map((s) => ({ name: s.name, route: s.route, state: 'INSTALLED' as const, address: s.address, hexbits: s.hexbits })),
            ...sessionHits.map((c) => {
              const compiled = catalogueCompile(c)
              return { name: c.name, version: c.version, route: catalogueRouteOf(c.name), state: 'SESSION' as const, address: compiled.address, hexbits: compiled.hexbits }
            }),
            ...availableCompiled.map(({ c, address, hexbits }) => ({ name: c.name, version: c.version, repo: c.repo, state: 'AVAILABLE' as const, address, hexbits })),
          ],
          installed: installed.map((s) => ({ name: s.name, route: s.route, address: s.address, hexbits: s.hexbits })),
          session: sessionHits.map((c) => catalogueRouteOf(c.name)),
          available: availableCompiled.map(({ c, address, hexbits }) => ({ name: c.name, version: c.version, repo: c.repo, address, hexbits })),
          total: installed.length + sessionHits.length + cat.total, shown: installed.length + sessionHits.length + available.length, catalogue: st,
        })
      } else if (verb === 'add') {
        const names = args.slice(1)
        if (!names.length) { err('apk add: at least one package name required'); break }
        const st = catalogueState()
        if (!st.present) { err(`apk add: catalogue absent (${st.why})`); break }
        const okNames: string[] = []
        for (const n of names) {
          const r = sessionAdd(n)
          if (!r.ok) { err(`apk add: ${n}: ${r.why}`); break }
          okNames.push(n)
        }
        if (okNames.length && ok) {
          emit([
            `OK: ${okNames.length} simulated install(s) — session only, host rootfs unchanged`,
            ...okNames.map((n) => `  ${n} → ${catalogueRouteOf(n)}`),
            `(host binary execution: uuidna_run — verify-then-run at the os/ boundary)`,
          ], { added: okNames, session: sessionAdded(), stamp: execSessionStamp() })
        }
      } else if (verb === 'del') {
        const names = args.slice(1)
        if (!names.length) { err('apk del: at least one package name required'); break }
        const removed: string[] = []
        let blocked = false
        for (const n of names) {
          if (specByName(n, specs)) { err(`apk del: ${n}: in the boot closure — cannot remove sealed install`); blocked = true; break }
          const r = sessionDel(n)
          if (r.removed) removed.push(n)
        }
        if (!blocked) {
          emit([`OK: removed ${removed.length} session package(s)`, ...removed.map((n) => `  ${n}`)], { removed, session: sessionAdded() })
        }
      } else if (verb === 'policy') {
        emit([
          `${INSTALLS_MIRROR.branch}/${INSTALLS_MIRROR.arch} · pinned ${INSTALLS_MIRROR.release.version}`,
          'repositories: main, community, overlay',
          'Layer 1 (uuidna_exec): simulated apk add/del — session state only',
          'Layer 2 (uuidna_run): host verify-then-run when mirror/' + pinnedFileHint() + ' is present (`npm run x -- fetch-pinned-rootfs`)',
        ], {
          branch: INSTALLS_MIRROR.branch, arch: INSTALLS_MIRROR.arch, version: INSTALLS_MIRROR.release.version,
          sessionStamp: execSessionStamp(),
        })
      } else if (verb === 'depends') {                               // forward deps — what this package pulls in
        const s = specByName(name, specs)
        if (s) { emit(s.deps.length ? s.deps : ['(none)'], { name: s.name, depends: s.deps, state: 'INSTALLED' }); break }
        const c = cataloguePackage(name)
        if (c) { emit(c.deps.length ? c.deps : ['(none)'], { name: c.name, depends: c.deps, state: 'AVAILABLE' }); break }
        err(apkMiss('depends', name))
      } else if (verb === 'rdepends') {                              // reverse deps — who pulls THIS package in
        const known = specByName(name, specs) ?? cataloguePackage(name)
        if (!known) { err(apkMiss('rdepends', name)); break }
        // the reverse edge over the WHOLE published graph, not over the 25 that boot — the boot names are kept
        // first because "who in the running world needs this" is a different question from "who could"
        const inBoot = specs.filter((s) => s.deps.includes(name)).map((s) => s.name).sort()
        const cat = catalogueRdepends(name)
        const rest = cat.hits.filter((n) => !inBoot.includes(n))
        emit([
          ...inBoot.map((n) => `${n}  [installed]`), ...rest,
          ...(cat.total > cat.hits.length ? [`… ${cat.total - cat.hits.length} more of ${cat.total}`] : []),
          ...(inBoot.length || rest.length ? [] : ['(none)']),
        ], { name, rdepends: [...inBoot, ...rest], installedRdepends: inBoot, total: cat.total })
      } else err(`apk: ${verb || '(missing)'}: not a ported verb — try: ${APK_VERBS.join(' ')}`)
      break
    }
    case 'man': {                                                    // documentation packages — Alpine's -doc / *-man-pages, hexbit-compiled
      // Alpine publishes man pages as SEPARATE packages (`busybox-doc`, `s6-man-pages`, `man-pages`), not as
      // files inside the runtime package. Porting man pages here means resolving that documentation package and
      // compiling it to 32 hexbit states — the same mint as apk info. The manpage BYTES are never fetched or
      // held (the_os_is_bootable_quantum): provenance identity of the published documentation, never its body.
      const topic = args[0] ?? ''
      if (!topic) { err('man: a topic is required, e.g. `man busybox` or `man man-pages`'); break }
      const doc = resolveManPage(topic)
      if (!doc) {
        const st = catalogueState()
        if (!st.present)
          err(`man: ${topic}: UNKNOWN HERE — the catalogue is absent (${st.why}). A fact about this host, not about Alpine.`)
        else
          err(`man: ${topic}: no documentation package published — searched ${st.count} packages for ${topic}-doc / ${topic}-man-pages`)
        break
      }
      const compiled = catalogueCompile(doc)
      // man→app→hexbit rides the same door: man pages test the app; both fold to 32 hexbit states.
      const witness = manAppWitness(doc)
      emit([
        `${doc.name}-${doc.version}  [${doc.repo}]`,
        `  ${doc.desc}`,
        `  address:  ${compiled.address}`,
        `  hexbits:  ${compiled.hexbits.length} states`,
        `  checksum: ${doc.checksum}`,
        witness.ok
          ? `  app:      ${witness.app} (${witness.via}) · man→app→hexbit`
          : `  app:      (orphan documentation — ${witness.detail})`,
        isManPagePackage({ name: topic })
          ? `(documentation package — ported as provenance identity; manpage bytes are not held)`
          : `(documentation for ${topic} — Alpine package ${doc.name}; manpage bytes are not held)`,
      ], {
        topic, name: doc.name, version: doc.version, repo: doc.repo, meaning: doc.desc, checksum: doc.checksum,
        address: compiled.address, hexbits: compiled.hexbits, id: compiled.id, kind: 'man',
        state: 'AVAILABLE' as const,
        app: witness.app, via: witness.via, manHexbits: witness.manHexbits, appHexbits: witness.appHexbits,
        witnessOk: witness.ok, witness: witness.detail,
      })
      break
    }
    case 'pwd': {
      emit([sessionCwd()], { cwd: sessionCwd() })
      break
    }
    case 'echo': {
      const text = args.join(' ')
      emit([text], { text })
      break
    }
    case 'which': {
      const name = args[0] ?? ''
      if (!name) { err('which: missing argument'); break }
      const s = specByName(name, specs)
      if (s) { emit([s.route], { name, route: s.route, state: 'INSTALLED' }); break }
      if (sessionHasPackage(name)) {
        emit([catalogueRouteOf(name)], { name, route: catalogueRouteOf(name), state: 'SESSION' })
        break
      }
      const c = cataloguePackage(name)
      if (c) { emit([catalogueRouteOf(name)], { name, route: catalogueRouteOf(name), state: 'AVAILABLE' }); break }
      const resolved = resolveAlpineApp(name)
      if (resolved) {
        const pkg = resolved.pkg
        const route = specByName(pkg.name, specs)?.route ?? catalogueRouteOf(pkg.name)
        const state = specByName(pkg.name, specs) ? 'INSTALLED' : sessionHasPackage(pkg.name) ? 'SESSION' : 'AVAILABLE'
        emit([route], { name: pkg.name, command: name, via: resolved.via, route, state })
        break
      }
      err(`which: no ${name} in boot closure, session, or catalogue`)
      break
    }
    case 'cat': {
      const path = norm(args[0] ?? '')
      if (!path || path === '/') { err('cat: missing operand'); break }
      const sf = sessionRead(path)
      if (sf) { emit(sf.content.split('\n'), { path, address: sf.address, kind: 'session-file' }); break }
      const s = specByRoute(path, specs)
      if (s) {
        emit([s.meaning], { path, kind: 'install-route', package: s.name, address: s.address, hexbits: s.hexbits })
        break
      }
      err(`cat: ${path}: no such file (session vfs or install route)`)
      break
    }
    case 'stat': {
      const path = norm(args[0] ?? '/')
      const sf = sessionRead(path)
      if (sf) {
        emit([`  File: ${path}`, `  Size: ${sf.content.length}`, `  address: ${sf.address}`], { kind: 'session-file', ...sf })
        break
      }
      const s = specByRoute(path, specs)
      if (s) {
        emit([`  Route: ${path}`, `  Package: ${s.name}-${s.version}`, `  address: ${s.address}`], { path, kind: 'pkg', package: s.name })
        break
      }
      const ls = uuidnaLs(path)
      if (ls.count > 0 || path === '/') {
        emit([`  Directory: ${path}`, `  Entries: ${ls.count}`, `  receipt: ${handleOf(ls.receipt)}`], { path, kind: 'dir', count: ls.count })
        break
      }
      err(`stat: cannot stat '${path}'`)
      break
    }
    case 'du': {
      const path = norm(args[0] ?? '/')
      const count = uuidnaLs(path).count
      emit([`${count}\t${path}`], { path, entries: count })
      break
    }
    case 'driver': {
      const rel = INSTALLS_MIRROR.release
      const drv = INSTALLS_MIRROR.driver
      const bundle = driverBundle(rel.version, INSTALLS_MIRROR.arch, drv.sha256, drv.flavor)
      emit([
        `${drv.file}  [${drv.flavor}]`,
        `Alpine ${rel.version} · ${INSTALLS_MIRROR.arch} · modloop = kernel modules (the drivers)`,
        `sha256: ${drv.sha256}`,
        `address: ${bundle.address} · receipt ${bundle.receipt}`,
        `(uuidna fingerprints and verifies — never loads modules; theorem the_os_is_bootable_quantum)`,
      ], { version: rel.version, arch: INSTALLS_MIRROR.arch, rootfsSha256: rel.rootfsSha256, bundle, kind: 'driver-provenance' })
      break
    }
    case 'device': {
      const d = hostQuantumDevice()
      const idle = hostStreamFleet(1)
      const atPostage = hostStreamFleet(GPU_POSTAGE_ADDRESSES)
      emit([
        `device: ${d.platform}/${d.arch} · ${d.logical} logical cores`,
        `kind: ${d.kind}`,
        `simulable: ${d.simulableQubits} qubits (${d.simulableStates} states) · uuid hexbits: ${d.uuidHexbits}`,
        `stream: ${idle.cpuWorkers} CPU lanes; GPU specified, on at ${GPU_POSTAGE_ADDRESSES} jobs → ${atPostage.total} lanes`,
        `witnesses: ${d.witnesses.length} sealed theorems · address ${d.deviceAddress}`,
      ], { device: d, stream: { postage: GPU_POSTAGE_ADDRESSES, idle, atPostage } })
      break
    }
    case 'sequence': {
      const verb = args[0] ?? 'field'
      if (verb === 'field') {
        const r = livingFieldReport()
        emit([
          `seal_ten:     ${r.sealTen.join('')}`,
          `stroke:       ${r.stroke.written}`,
          `gateways:     ${r.stroke.gateways.join(',')}`,
          `reflection:   ${r.reflection.valid ? 'valid' : 'invalid'} · order ${r.reflection.groupOrder}`,
          `dash closes:  ${r.dash.closes}`,
          `tour seams:   ${r.tour.seamCount}`,
          `invariants:   ${r.invariantsHold}`,
        ], { kind: 'sequence-field', ...r })
        break
      }
      if (verb === 'run') {
        const input = args.slice(1).join(' ') || '0'
        const n = Number(input)
        const walked = runSequence(Number.isFinite(n) && input.trim() === String(n) ? n : input)
        emit([
          `input:      ${walked.input}`,
          `seed:       ${walked.seed}`,
          `reflection: ${walked.reflection}`,
          `polarity:   ${walked.polarity}`,
          `period:     ${walked.period}`,
          `orbit:      ${walked.orbit.join(' → ')}`,
        ], { execKind: 'sequence-run', ...walked })
        break
      }
      if (verb === 'dash') {
        const d = livingFieldReport().dash
        emit([
          `closes:           ${d.closes}`,
          `weightedBearing:  ${d.weightedBearing}`,
          `fusionIgnites:    ${d.fusionIgnites}`,
          `steps:            ${d.steps.length}`,
        ], { kind: 'sequence-dash', ...d })
        break
      }
      if (verb === 'invariants') {
        const hold = computeVortexInvariantsHold()
        emit([`vortexInvariantsHold: ${hold}`], { hold })
        break
      }
      err(`sequence: ${verb}: not a ported verb — try: ${SEQUENCE_VERBS.join(' ')}`)
      break
    }
    case 'run': {
      const cmd = args.join(' ')
      if (!cmd) { err('run: a command is required — e.g. `run busybox --help` or `run nginx -v`'); break }
      const planAlpineRun = planAlpineRunStatic
      const plan = planAlpineRun(cmd)
      if (!plan.ok) {
        emit([`run: ${plan.reason ?? 'refused'}`, ...(plan.remedy ? [`remedy: ${plan.remedy}`] : [])], { kind: 'run-plan', plan })
        ok = false
        break
      }
      emit([
        `Layer 2 recipe (${plan.backend}) — verify-then-run in uuidnaOS sandbox`,
        `command: ${cmd}`,
        `spawn: uuidna_run {command, spawn:true} — stdout/stderr are DATA, not hex image`,
        ...(plan.recipe ? [`argv: ${plan.recipe.file} ${plan.recipe.argv.join(' ')}`] : []),
      ], { kind: 'run-plan', plan, honest: 'Alpine binary via catalogue cmd: — not a TypeScript port per package' })
      break
    }
    case 'court': {
      const { msgFile, ...plan } = parseCourtPlan(args)
      if (msgFile) {
        const code = runCourtCli(['--msg', msgFile])
        emit([`court --msg: ${code === 0 ? 'green' : 'blocked'}`], { kind: 'court-msg', exit: code })
        ok = code === 0
        break
      }
      const r = runCourtSync(plan)
      emit([
        `court: ${r.ok ? 'green' : 'blocked'} · ${(r.ms + 0.5) | 0}ms`,
        ...(r.receipt ? [`receipt: ${handleOf(r.receipt)}…`] : []),
        ...(r.fails.length ? r.fails.map((f) => `${f.tool}: ${f.detail}`) : ['playbook: daily (fast — no crypto census); --full for uuidna_crypto']),
      ], { kind: 'court', ...r })
      ok = r.ok
      break
    }
    case 'quantum-cover': {
      const sandbox = args.includes('--sandbox')
      const c = testQuantumAlpineCoverage({ sandbox })
      emit([renderQuantumAlpineCoverage(c)], { kind: 'quantum-alpine', ...c })
      ok = c.complete && (!c.sandbox || c.sandbox.ok)
      break
    }
    case 'acme': {
      if (args[0] === 'issue') {
        const domains = args.slice(1).filter((a) => !a.startsWith('--'))
        const client = args.includes('--certbot') ? 'certbot' as const : 'lego' as const
        const p = planLetsEncryptIssuance({ domains: domains.length ? domains : ['localhost'], client })
        emit([renderAcmeIssuance(p)], { kind: 'acme-issue', ...p })
        ok = p.layer1.every((h) => h.ok) && p.packages.every((x) => x.ok)
        break
      }
      const c = testAcmePort()
      emit([renderAcmePort(c)], { kind: 'acme-port', ...c })
      ok = c.complete
      break
    }
    // THE MONITOR IS A DEVICE OF THIS OS, asked about exactly as the driver bundle and the boot image are. It
    // DISPLAYS and does not compute — every figure on every panel is computed here in TypeScript before it
    // reaches a page — so what this reports is an inventory and a split: which panels draw what the build knew,
    // and which run on the reader's own machine.
    // `top` — WHAT THIS MACHINE IS CARRYING RIGHT NOW. Alpine's top lists processes because a Unix machine's
    // load is processes; uuidnaOS has no processes, so listing them would be theatre. What it carries instead is
    // RESIDENT STRUCTURE — the sealed ledger, the primed catalogue, the ported domains — and the honest analogue
    // of load is how much of each is materialised in this isolate at this moment.
    //
    // THE CATALOGUE LINE IS THE ONE WORTH READING. It is 28,635 rows and 7.3 MB, and it is LAZY: unprimed it
    // costs nothing, primed it dominates everything else here. A `top` that hid that would hide the single
    // largest thing an isolate can be made to hold — which is exactly what the lazy prime was built to control.
    case 'top': {
      // ASK WITHOUT TOUCHING. The first version called catalogueState() unconditionally — and catalogueState()
      // triggers the lazy load, so running `top` MATERIALISED the 7.3 MB catalogue it was reporting on. A
      // monitor that changes what it measures is worse than no monitor: it reported PRIMED every time, and the
      // reason was itself. cataloguePrimed() is a pure read of a flag, so residency is asked before anything
      // that could create it, and the count is only fetched when the rows are already there to count.
      const primed = cataloguePrimed()
      const cat = primed ? catalogueState() : null
      const rows = [
        `uuidnaOS — resident structure (no processes: this machine's load is what it has materialised)`,
        `  theorems   ${theorems().length} sealed · always resident (a static import, no prime path)`,
        `  catalogue  ${cat ? `PRIMED ${cat.count} rows` : 'lazy, NOT primed — costs nothing until something asks for a row'}`,
        `  applets    ${APPLETS.length} on the exec door`,
        `  installs   ${specs.length} pinned paths in the boot image`,
      ]
      emit(rows, {
        theorems: theorems().length,
        cataloguePrimed: primed,
        catalogueRows: cat ? cat.count : 0,
        applets: APPLETS.length,
        installs: specs.length,
      })
      break
    }
    // EVERY TRANSLATION THIS MACHINE PERFORMS. Alpine's `language` domain is the largest in the catalogue and
    // uuidna can offer no API over it — it cannot run python. What it can answer is the same question turned
    // inward: this repository IS a compilation pipeline, and until now none of its stages were measured.
    case 'compilers': {
      const c = compilerCensus()
      emit(renderCompilers(c), c)
      break
    }
    case 'monitor': {
      primeMonitor(MONITOR_INVENTORY)
      const c = monitorCensus()
      emit(renderMonitor(c), c)
      break
    }
    case 'help': emit(['applets: ' + APPLETS.join(' '),
      'ls <path>  — install-port routes (/…) or full census (/catalogue, /catalogue/main|community|overlay)',
      'apk list · apk list --all · apk info · apk search · apk depends · apk rdepends · apk add · apk del · apk policy',
      'man <topic>  — Alpine documentation package → 32 hexbits (man→app→hexbit)',
      '<package>  — ATTEST a published Alpine app (nginx, openssl, busybox): its provenance record, not a run; cmd: too (dotnet, omp)',
      'cat · which · stat · pwd · echo · du  — busybox over virtual vfs + session files',
      'wc · head · tail · sort · uniq · cut · tr · rev · tac · nl · fold · grep  — text, over a session file or the operands',
      'seq · factor · expr · printf · basename · dirname · base64 · sha256sum · cksum · test · true · false · yes  — pure transforms',
      'NOT ported, by law: date · uptime (a wall clock this tree refuses) · ps · kill · mount · dd (nothing to act on) · awk · sed (languages, not transforms)',
      'run <cmd>  — Alpine cmd: recipe (Layer 2 sandbox via uuidna_run; not a manual TS port)',
      'court [--court|--full|--probe|--msg file]  — uuidnaOS court (hex + MCP + playbook + commit-msg)',
      'quantum-cover [--sandbox]  — full crypto-related Alpine coverage (Layer 1 exec + Layer 2 plans)',
      'acme  — ACME/Let\'s Encrypt port census; acme issue <domain…> [--certbot] plans HTTP-01 issuance',
      'sequence field · sequence run <n|text> · sequence dash · sequence invariants  — living field (Sequence.lean)',
      'driver  — netboot/modloop driver bundle provenance (pinned release)',
      'device  — this host executing the sealed quantum algebra (drivers/quantum)',
      'host binary execution: uuidna_run (stdio MCP — verify-then-run, separate door)',
      'Layer 1 simulates; Layer 2 executes pinned bytes when mirror rootfs is present'],
      { applets: APPLETS, apk: APK_VERBS, sessionStamp: execSessionStamp() }); break
    case '': err('exec: empty command — try `help`'); break
    // THE CODEC APPLETS ARE PORTED, AND NOT HERE. Letting them fall through to the default would report
    // "not a ported applet", which is false — they run on the async door because the platform's gzip is a
    // stream and this door is synchronous. A wrong refusal is worse than a pointed one: it sends a caller to
    // implement what already exists. The list is CODEC_APPLETS, so the two cannot drift.
    case 'gzip':
    case 'gunzip':
    case 'zcat':
    case 'zgrep':
    case 'tar':
      err(`exec: ${applet} is ported on the ASYNC door — call uuidnaExecAsync('${line.trim()}'); the platform's gzip codec is a stream and this door is synchronous`)
      break
    // ── THE PORTED BUSYBOX FAMILY. One dispatch rather than twenty-five cases, because they share a contract:
    // each is a pure function of its text and its flags.
    //
    // WHERE THE TEXT COMES FROM, stated because there is no shell here and so no stdin. If an operand names a
    // file in the session filesystem, that file's content IS the text; otherwise the operands ARE the text. No
    // redirection is invented — `echo a > b` writes no file in this shell and never pretended to.
    case 'wc':
    case 'head':
    case 'tail':
    case 'sort':
    case 'uniq':
    case 'cut':
    case 'tr':
    case 'rev':
    case 'tac':
    case 'nl':
    case 'fold':
    case 'seq':
    case 'factor':
    case 'expr':
    case 'basename':
    case 'dirname':
    case 'printf':
    case 'base64':
    case 'sha256sum':
    case 'cksum':
    case 'test':
    case 'true':
    case 'false':
    case 'yes':
    case 'grep':
    case 'comm':
    case 'join':
    case 'paste':
    case 'expand':
    case 'unexpand':
    case 'fmt':
    case 'base32':
    case 'od':
    case 'sum':
    case 'tsort':
    case 'numfmt':
    case 'pathchk':
    case 'basenc':
    case 'ptx':
    case 'pr':
    case 'dircolors':
    case 'realpath':
    case 'split':
    case 'tee':
    case 'cp':
    case 'find':
    case 'dir':
    case 'vdir':
    case 'busybox':
    case 'coreutils':
    case 'uutils': {
      // ── OPERAND PARSING, and the first version got three things wrong that a run exposed immediately.
      //
      // (1) FLAG VALUES LEAKED INTO THE TEXT. `fold -w 4 abcdefghij` folded "4 abcdefghij" because the 4 was
      //     read as the width AND left in the operands. A flag that takes a value must consume it.
      // (2) A MINUS SIGN IS NOT ALWAYS A FLAG. `expr 2617 - 2536` reported a non-integer operand because the
      //     operator was filtered out as a flag. expr and test take their operators positionally, so they get
      //     the raw arguments and no flag parsing at all.
      // (3) JOINING OPERANDS WITH SPACES MADE LINE APPLETS USELESS. `sort -n 10 2 33 4` sorted ONE line. For a
      //     line-oriented applet each operand IS a line; for a text-oriented one they join. Which is which is
      //     declared below rather than guessed per applet.
      // FLAG ARITY IS PER-APPLET, and treating it globally cost a value: `sort -n 10 2 33 4` sorted only three
      // numbers because -n consumed the 10 as its argument. In sort, -n is NUMERIC MODE and takes nothing; in
      // head, tail and yes it is a COUNT and takes the next operand. Same spelling, different arity — so the
      // table is keyed by applet and a flag not listed for this applet takes no value at all.
      const VALUED_BY_APPLET: Record<string, readonly string[]> = {
        head: ['-n'], tail: ['-n'], yes: ['-n'],
        fold: ['-w'], cut: ['-f', '-d'],
        expand: ['-t'], unexpand: ['-t'], fmt: ['-w'], join: ['-j'], paste: ['-d'], numfmt: ['--to'],
        pr: ['-h', '-l'], split: ['-l'], basenc: ['--base'], find: ['-name', '-type', '-maxdepth'],
      }
      const VALUED = new Set(VALUED_BY_APPLET[applet] ?? [])
      const POSITIONAL = new Set(['expr', 'test'])
      const LINEWISE = new Set(['head', 'tail', 'sort', 'uniq', 'nl', 'tac', 'grep', 'cut', 'tsort'])
      // TWO-INPUT APPLETS. comm, join and paste each read a PAIR, which the single `fromFile` lookup could not
      // express: it finds the first readable operand and the second side would silently become text. Each side
      // is resolved on its own — a session path becomes its content, anything else stands as its own literal.
      const PAIRWISE = new Set(['comm', 'join', 'paste'])
      const flags: string[] = []
      const rest: string[] = []
      const flagVal = new Map<string, string>()
      if (POSITIONAL.has(applet)) {
        rest.push(...args)
      } else {
        for (let i = 0; i < args.length; i++) {
          const a = args[i]!
          if (!a.startsWith('-') || a === '-') { rest.push(a); continue }
          flags.push(a)
          if (VALUED.has(a) && args[i + 1] !== undefined) { flagVal.set(a, args[i + 1]!); i++ }
          else {
            const m = /^(-[a-z])(\d+)$/.exec(a)   // the joined form, -n2
            if (m && VALUED.has(m[1]!)) flagVal.set(m[1]!, m[2]!)
          }
        }
      }
      const flagNum = (f: string, dflt: number): number => {
        const v = flagVal.get(f)
        return v !== undefined && /^\d+$/.test(v) ? Number(v) : dflt
      }
      const has = (f: string): boolean => flags.includes(f)
      const operands = rest
      const fromFile = operands.map((a) => sessionRead(norm(a))).find((f) => f !== null)
      // A LINE-ORIENTED APPLET TAKES EACH OPERAND AS A LINE; a text-oriented one joins them with a space.
      const textOf = (): string => fromFile ? fromFile.content
        : LINEWISE.has(applet) ? operands.join('\n') : operands.join(' ')
      const sideOf = (i: number): string => {
        const a = operands[i]
        if (a === undefined) return ''
        const f = sessionRead(norm(a))
        return f ? f.content : a
      }
      const pair = PAIRWISE.has(applet) ? [sideOf(0), sideOf(1)] as const : ['', ''] as const
      let r: CU.AppletOut
      switch (applet) {
        case 'wc': r = CU.wc(textOf()); break
        case 'head': r = CU.head(textOf(), flagNum('-n', 10)); break
        case 'tail': r = CU.tail(textOf(), flagNum('-n', 10)); break
        case 'sort': r = CU.sortLines(textOf(), has('-n'), has('-r')); break
        case 'uniq': r = CU.uniq(textOf(), has('-c')); break
        case 'cut': r = CU.cut(textOf(), flagNum('-f', 1), flagVal.get('-d') ?? '\t'); break
        // tr takes FROM and TO positionally, then its text — so the text is what follows them
        case 'tr': r = CU.tr(fromFile ? fromFile.content : operands.slice(2).join(' '), operands[0] ?? '', operands[1] ?? ''); break
        case 'rev': r = CU.rev(textOf()); break
        case 'tac': r = CU.tac(textOf()); break
        case 'nl': r = CU.nl(textOf()); break
        case 'fold': r = CU.fold(textOf(), flagNum('-w', 80)); break
        case 'seq': r = CU.seq(Number(operands[0] ?? 1), operands[1] === undefined ? undefined : Number(operands[1]), operands[2] === undefined ? undefined : Number(operands[2])); break
        case 'factor': r = CU.factor(Number(operands[0] ?? NaN)); break
        case 'expr': r = CU.expr(operands[0] ?? '', operands[1] ?? '', operands[2] ?? ''); break
        case 'basename': r = CU.basename(operands[0] ?? '', operands[1] ?? ''); break
        case 'dirname': r = CU.dirname(operands[0] ?? ''); break
        case 'printf': r = CU.printf(operands[0] ?? '', operands.slice(1)); break
        case 'base64': r = CU.base64(fromFile ? fromFile.content : operands.join(' '), has('-d')); break
        case 'sha256sum': r = CU.sha256sum(textOf()); break
        case 'cksum': r = CU.cksum(textOf()); break
        case 'test': r = CU.testExpr(operands); break
        case 'true': r = { lines: ['true'], data: { true: true } }; break
        case 'false': r = { lines: ['false'], data: { true: false } }; break
        // yes takes its count from -n or a bare integer, and the rest is the text it repeats
        case 'comm': r = CU.comm(pair[0], pair[1]); break
        case 'join': r = CU.join(pair[0], pair[1], flagNum('-j', 1)); break
        case 'paste': r = CU.paste(pair[0], pair[1], flagVal.get('-d') ?? '\t'); break
        case 'expand': r = CU.expand(textOf(), flagNum('-t', CU.TAB_DEFAULT)); break
        case 'unexpand': r = CU.unexpand(textOf(), flagNum('-t', CU.TAB_DEFAULT)); break
        case 'fmt': r = CU.fmt(textOf(), flagNum('-w', CU.FMT_WIDTH)); break
        case 'base32': r = CU.base32(fromFile ? fromFile.content : operands.join(' '), has('-d')); break
        case 'od': r = CU.od(textOf(), has('-c') ? 'c' : 'x1'); break
        case 'sum': r = CU.sum(textOf()); break
        case 'tsort': r = CU.tsort(textOf()); break
        case 'numfmt': r = CU.numfmt(Number(operands[0] ?? NaN), has('--iec-i') ? 'iec-i' : has('--iec') ? 'iec' : has('--none') ? 'none' : 'si'); break
        case 'pathchk': r = CU.pathchk(operands[0] ?? ''); break
        case 'basenc': r = CU.basenc(fromFile ? fromFile.content : operands.join(' '),
          flagVal.get('--base') === '16' ? 16 : flagVal.get('--base') === '32' ? 32 : 64, has('-d')); break
        case 'ptx': r = CU.ptx(textOf()); break
        case 'pr': r = CU.pr(textOf(), { header: flagVal.get('-h'), lines: flagNum('-l', CU.PR_LINES), noHeader: has('-t') }); break
        case 'dircolors': r = CU.dircolors(has('-c') ? 'csh' : 'sh'); break
        case 'realpath': r = CU.realpath(operands[0] ?? sessionCwd()); break
        // SPLIT AND TEE WRITE. The division and the content are pure (coreutils); only the session write lives
        // here, because only the dispatcher holds the session. Each names the paths it actually created, so a
        // caller can read them back — a split that printed nothing would be indistinguishable from one that
        // wrote nothing, which is the same green-over-absent shape the fault branch above exists to refuse.
        case 'split': {
          const pieces = CU.splitPieces(textOf(), flagNum('-l', CU.SPLIT_LINES), operands[1] ?? 'x')
          for (const p of pieces) sessionWrite(norm(p.name), p.content)
          r = { lines: pieces.map((p) => norm(p.name)), data: { wrote: pieces.map((p) => norm(p.name)), pieces: pieces.length } }
          break
        }
        case 'tee': {
          const text = fromFile ? fromFile.content : operands.slice(1).join(' ')
          const target = norm(operands[0] ?? '/tmp/tee.out')
          sessionWrite(target, text)
          r = { lines: text.split('\n'), data: { wrote: [target] } }
          break
        }
        case 'cp': {
          const src = sessionRead(norm(operands[0] ?? ''))
          if (!src) { r = { lines: [`cp: cannot stat '${operands[0] ?? ''}': no such session file`], data: { error: 'no-such-file' } }; break }
          const dest = norm(operands[1] ?? '')
          sessionWrite(dest, src.content)
          r = { lines: [`${norm(operands[0] ?? '')} -> ${dest}`], data: { wrote: [dest], bytes: src.content.length } }
          break
        }
        // FIND WALKS THE INSTALL PORT, the same routes `ls` lists — so it finds what actually exists in the
        // booted sandbox rather than a table written beside it. Depth is bounded because the walk is over a
        // finite sealed port and an unbounded one would still terminate, but slowly and for no gain.
        case 'find': {
          const start = norm(operands[0] ?? sessionCwd())
          const wantName = flagVal.get('-name')
          const wantType = flagVal.get('-type')
          const maxDepth = flagNum('-maxdepth', 6)
          // WHAT COUNTS AS A DIRECTORY HERE, measured rather than assumed. The first version tested
          // `kind === 'dir'` and found nothing and descended nowhere: every entry the install port lists
          // carries kind 'pkg', so the test was false at every node and `-type d` silently answered empty.
          // In this filesystem a route IS a directory exactly when it lists children, so that is the question
          // asked — one ls per node, the same call `dir` and `vdir` answer with.
          const childrenAt = (path: string): { name: string; kind: string }[] => {
            try { return [...uuidnaLs(path).entries] } catch { return [] }
          }
          const hits: string[] = []
          const walk = (path: string, depth: number): void => {
            if (depth > maxDepth) return
            for (const e of childrenAt(path)) {
              const full = path === '/' ? '/' + e.name : path + '/' + e.name
              const kids = childrenAt(full)
              const isDir = kids.length > 0
              const nameOk = wantName === undefined || CU.matchGlob(e.name, wantName)
              const typeOk = wantType === undefined || (wantType === 'd' ? isDir : !isDir)
              if (nameOk && typeOk) hits.push(full)
              if (isDir) walk(full, depth + 1)
            }
          }
          walk(start, 0)
          r = { lines: hits, data: { found: hits.length, root: start, maxDepth } }
          break
        }
        // dir and vdir ARE ls, in the two spellings coreutils ships: dir columns the names, vdir is the long
        // form. Porting them as aliases is the honest reading — inventing different output would be a fork.
        case 'dir':
        case 'vdir': {
          const l = uuidnaLs(operands[0] ?? sessionCwd())
          r = applet === 'dir'
            ? { lines: l.entries.map((e) => (e.kind === 'dir' ? e.name + '/' : e.name)), data: l }
            : { lines: l.entries.map((e) => `${e.kind === 'dir' ? 'd' : '-'} ${e.name}`), data: l }
          break
        }
        // THE MULTIPLEXER. busybox is ONE binary carrying many applets, and `busybox wc file` is how it is
        // called; coreutils and uutils ship the same shape. Porting the multiplexer is porting the calling
        // convention, so it dispatches into this very door rather than duplicating a table of its own.
        case 'busybox':
        case 'coreutils':
        case 'uutils': {
          if (operands.length === 0) {
            r = { lines: ['applets: ' + APPLETS.join(' ')], data: { applets: [...APPLETS], count: APPLETS.length } }
            break
          }
          const inner = uuidnaExec(operands.join(' '))
          r = { lines: inner.output, data: { via: applet, ...(typeof inner.data === 'object' && inner.data ? inner.data : {}) } }
          if (!inner.ok) r = { lines: inner.output, data: { via: applet, error: 'inner-applet-failed', ...(typeof inner.data === 'object' && inner.data ? inner.data : {}) } }
          break
        }
        case 'yes': r = CU.yes(operands.filter((a) => !/^\d+$/.test(a)).join(' '),
          flagNum('-n', Number(operands.find((a) => /^\d+$/.test(a)) ?? 10))); break
        // grep takes its PATTERN first, then the text or a file
        default: r = CU.grep(fromFile ? fromFile.content : operands.slice(1).join('\n'), operands[0] ?? '',
          { invert: has('-v'), count: has('-c'), ignoreCase: has('-i') })
      }
      // AN APPLET THAT NAMED A FAILURE MUST NOT RETURN GREEN. tsort's cycle, base32's invalid character and
      // pathchk's non-portable path each print the fault and were still arriving as ok:true — the exact
      // green-over-absent shape the refusal tests forbid one applet earlier. The applet declares the fault in
      // its own data; the door reads it and fails there, so the two cannot drift apart.
      const faulted = typeof r.data === 'object' && r.data !== null && 'error' in (r.data as Record<string, unknown>)
      const payload = { applet, source: fromFile ? 'session-file' : 'operands', ...(typeof r.data === 'object' && r.data ? r.data : { value: r.data }) }
      if (faulted) fault(r.lines, payload)
      else emit(r.lines, payload)
      break
    }

    default: {
      const resolved = resolveAlpineApp(applet)
      if (!resolved) {
        err(`exec: ${applet}: not a ported applet (try \`help\`); surface is ls · apk · man · busybox · driver · device · <alpine-app>`)
        break
      }
      const pkg = resolved.pkg
      // ATTESTATION, NOT EXECUTION — declared rather than implied. uuidnaOS is a provenance filesystem: it can
      // say what a package IS, with an address anyone recomputes, and it does not run binaries. Saying so is the
      // difference between a register and a shell that lies.
      mode = 'attested'
      unrunArgs = args.slice()
      const compiled = catalogueCompile(pkg)
      const boot = specByName(pkg.name, specs)
      const state = boot ? 'INSTALLED' : sessionHasPackage(pkg.name) ? 'SESSION' : 'AVAILABLE'
      const route = boot?.route ?? catalogueRouteOf(pkg.name)
      const cmds = providedCommands(pkg)
      const doc = resolveManPage(pkg.name)
      const witness = doc ? manAppWitness(doc) : null
      emit([
        `${pkg.name}-${pkg.version}  [${pkg.repo}]  ${state}`,
        `  ${pkg.desc}`,
        `  ${compiled.id}  ${route}`,
        `  address:  ${compiled.address}`,
        `  hexbits:  ${compiled.hexbits.length} states`,
        ...(cmds.length ? [`  cmd:      ${cmds.join(' ')}`] : ['  cmd:      (none — library/meta/data)']),
        ...(resolved.via === 'cmd' ? [`  via:      cmd:${applet} → ${pkg.name}`] : []),
        ...(witness
          ? [witness.ok
            ? `  man:      ${doc!.name} → ${witness.app} (${witness.via})`
            : `  man:      ${doc!.name} (orphan — ${witness.detail})`]
          : ['  man:      (no documentation package published)']),
        `  ATTESTED, NOT EXECUTED — this is the package's provenance record; no program ran.`,
        ...(args.length
          ? [`  NOT RUN:  ${args.join(' ')} — arguments are not executed here. uuidnaOS is a provenance`,
             `            filesystem, so it identifies a package rather than running it; for a host binary use uuidna_run.`]
          : []),
      ], {
        kind: 'app', name: pkg.name, command: applet, via: resolved.via, version: pkg.version, repo: pkg.repo,
        meaning: pkg.desc, checksum: pkg.checksum, deps: pkg.deps, commands: cmds, route,
        address: compiled.address, hexbits: compiled.hexbits, id: compiled.id, state,
        man: doc?.name ?? null, app: witness?.app ?? pkg.name, witnessOk: witness ? witness.ok : true,
        mode: 'attested', unrunArgs: args.slice(),
      })
    }
  }

  const receipt = toUuid('exec|' + execSessionStamp() + '|' + applet + '|' + args.join(' ') + '|' + (ok ? '0' : '1') + '|' + output.join('\n'))
  return { line: String(line).trim(), applet, args, ok, mode, unrunArgs, output, data, receipt, ...hexbitDoorOf(receipt), sealed: os.receipt, honest: HONEST }
}

// ── THE ASYNC DOOR. uuidnaExec is SYNCHRONOUS and stays so: every text and arithmetic applet is a pure
// function and awaiting a `wc` would be a cost paid by every caller for the benefit of none. The platform's
// gzip codec is a STREAM, so the four applets that need it get a door of their own that delegates everything
// else straight through. A caller that does not use a codec never learns this exists.
//
// WHY THESE FOUR AND NOT THE WHOLE COMPRESSION FAMILY: the platform ships gzip and does not ship bzip2, xz,
// lzma or zstd. Those stay refused, with the reason they always had. This ports what is actually available.
import { compress, decompress, bytesToBase64, base64ToBytes, tarEntries } from '../codecs/index.js'

/** the applets that need a codec stream, and therefore the async door */
export const CODEC_APPLETS = ['gzip', 'gunzip', 'zcat', 'zgrep', 'tar'] as const

/** uuidnaExecAsync(line) → the codec applets; anything else is handed to the synchronous door unchanged. */
export async function uuidnaExecAsync(line: string): Promise<ExecResult> {
  const parts = line.trim().split(/\s+/).filter(Boolean)
  const applet = parts[0] ?? ''
  if (!(CODEC_APPLETS as readonly string[]).includes(applet)) return uuidnaExec(line)
  const args = parts.slice(1)
  const flags = args.filter((a) => a.startsWith('-'))
  const operands = args.filter((a) => !a.startsWith('-'))
  const has = (f: string): boolean => flags.includes(f)
  const base = { applet, mode: 'executed' as const, unrunArgs: [] as string[] }
  const fail = (msg: string, data: unknown): ExecResult =>
    ({ ...uuidnaExec('true'), ok: false, output: [msg], data, applet, mode: 'executed', unrunArgs: [] })
  const done = (output: string[], data: unknown): ExecResult =>
    ({ ...uuidnaExec('true'), ok: true, output, data: { ...base, ...(typeof data === 'object' && data ? data : {}) } })

  // the source is a session file when the operand names one, and the literal operands otherwise — the same
  // rule the synchronous door uses, so `gzip /tmp/x` and `gzip hello` mean what they mean everywhere else
  const first = operands[0] ?? ''
  const file = sessionRead(norm(first))
  const sourceText = file ? file.content : operands.join(' ')

  try {
    if (applet === 'gzip') {
      const gz = await compress(new TextEncoder().encode(sourceText))
      const b64 = bytesToBase64(gz)
      const target = file ? norm(first) + '.gz' : null
      if (target) sessionWrite(target, b64)
      return done([b64], { bytes: gz.length, from: sourceText.length, base64: true, wrote: target ? [target] : [] })
    }
    // ZGREP TAKES ITS PATTERN FIRST, so its source is the SECOND operand — it must be handled before the
    // shared decode below, which reads the first. The first version decoded `alpha /tmp/doc.gz` as base64 and
    // refused its own archive: the applet's calling convention decides where its input is, not the door's.
    if (applet === 'zgrep') {
      // zgrep IS gunzip then grep, and both halves are ported — so it composes them rather than reimplementing
      // either. The pattern is the FIRST operand, as zgrep takes it; the archive is the second.
      const pattern = operands[0] ?? ''
      const archive = sessionRead(norm(operands[1] ?? ''))
      if (!archive) return fail(`zgrep: cannot read '${operands[1] ?? ''}'`, { error: 'no-such-file' })
      const raw = base64ToBytes(archive.content)
      if (!raw) return fail('zgrep: archive is not base64', { error: 'not-base64' })
      const text = new TextDecoder().decode(await decompress(raw))
      const hits = text.split('\n').filter((l) => l.includes(pattern))
      return done(hits, { matched: hits.length, pattern })
    }
    // gunzip, zcat and tar all DECODE the first operand; they differ only in what they do with the result
    const bytes = base64ToBytes(sourceText)
    if (!bytes) return fail(`${applet}: input is not base64 — compressed bytes travel as base64 in this filesystem`, { error: 'not-base64' })
    const plain = new TextDecoder().decode(await decompress(bytes))
    if (applet === 'gunzip' || applet === 'zcat') {
      const target = applet === 'gunzip' && file ? norm(first).replace(/\.gz$/, '') : null
      if (target) sessionWrite(target, plain)
      return done(plain.split('\n'), { bytes: plain.length, wrote: target ? [target] : [] })
    }
    // tar: LIST the members. Extraction to the session is a write per member and is not what `tar -t` does.
    const members = tarEntries(await decompress(bytes))
    return done(members.map((m) => m.name), { members: members.length, entries: members })
  } catch (e) {
    // THE PLATFORM'S CODEC THROWS WITH AN EMPTY MESSAGE on a member that is not gzip at all, so reporting it
    // verbatim printed `gunzip: ` — a refusal with no reason, which is precisely what this tree refuses
    // everywhere else. When the platform says nothing, the applet says what it knows.
    const why = e instanceof Error && e.message.trim() !== '' ? e.message
      : 'the bytes decode from base64 but are not a valid ' + (applet === 'tar' ? 'gzipped tar' : 'gzip member')
    return fail(`${applet}: ${why}`, { error: 'codec-failed', why })
  }
}

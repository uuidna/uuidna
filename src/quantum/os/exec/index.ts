// quantum/os/exec — Alpine apps via apk + man→hexbit, plus install-port `ls`.
// Toy busybox (cat/which/stat/pwd/echo/du) FOLDED: Alpine packages ARE the apps (man→app→hexbit).
// `uuidnaLs` is internal for `ls`; MCP tool uuidna_ls removed — use uuidna_exec.
// NO STATIC `node:` IMPORT — the LAST one in the worker bundle, and the reason the deploy never appeared.
// Cloudflare rejects node: in any uploaded module at UPLOAD, so --dry-run bundled this happily and reported
// success while nothing shipped. The reach goes through boundary's one declared accessor; on the edge it is
// simply absent, and the caller below refuses by name rather than dying on a resolution error.
import { nodeBuiltin } from '../../../boundary.js'
type ModuleModule = { createRequire: (u: string) => (id: string) => unknown }
const createRequire = (u: string): ((id: string) => unknown) => {
  const m = nodeBuiltin<ModuleModule>('node:module')
  if (!m) throw new Error('exec: the Alpine run plan is loaded through require — Node only, and this is not Node')
  return m.createRequire(u)
}
import {
  catalogueState, cataloguePackage, catalogueSearch, catalogueRdepends, catalogueCompile,
  resolveManPage, isManPagePackage, manAppWitness, catalogue, catalogueRouteOf,
  resolveAlpineApp, providedCommands,
} from '../catalogue/index.js'
import { INSTALLS_MIRROR } from '../mirror/index.js'
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
// lines, now answered by the wire. HONEST SCOPE (the_os_is_bootable_quantum): nothing executes — an applet
// reads the sealed spec and folds an answer; the tool's LOGIC is uuidna's, its IDENTITY is the busybox package.

/** one applet run: the parsed line, its output as text lines AND as structured data, folded to one receipt. */
export interface ExecResult {
  line: string; applet: string; args: string[]; ok: boolean
  output: string[]; data: unknown
  receipt: string; hexbits: number[]; sealed: string; honest: string
}

/** THE APPLETS uuidna ports — busybox's filesystem/inspection family over the virtual OS. Kept to what a
 *  provenance filesystem can HONESTLY answer from the sealed spec; a utility with no meaning here is absent, not
 *  faked. Each is pure and total: a bad path is an honest error line, never a crash. */
export const APPLETS = ['ls', 'apk', 'man', 'driver', 'device', 'cat', 'which', 'stat', 'pwd', 'echo', 'du', 'sequence', 'run', 'court', 'quantum-cover', 'acme', 'help'] as const
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

  const emit = (o: string[], d: unknown): void => { output = o; data = d }
  const err = (msg: string): void => { ok = false; output = [msg]; data = { error: msg } }

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
      const { planAlpineRun } = createRequire(import.meta.url)('../../../os/runtime/index.js') as typeof import('../../../os/runtime/index.js')
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
    case 'help': emit(['applets: ' + APPLETS.join(' '),
      'ls <path>  — install-port routes (/…) or full census (/catalogue, /catalogue/main|community|overlay)',
      'apk list · apk list --all · apk info · apk search · apk depends · apk rdepends · apk add · apk del · apk policy',
      'man <topic>  — Alpine documentation package → 32 hexbits (man→app→hexbit)',
      '<package>  — use a published Alpine app (nginx, openssl, busybox); cmd: too (dotnet, omp)',
      'cat · which · stat · pwd · echo · du  — busybox over virtual vfs + session files',
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
    default: {
      const resolved = resolveAlpineApp(applet)
      if (!resolved) {
        err(`exec: ${applet}: not a ported applet (try \`help\`); surface is ls · apk · man · busybox · driver · device · <alpine-app>`)
        break
      }
      const pkg = resolved.pkg
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
      ], {
        kind: 'app', name: pkg.name, command: applet, via: resolved.via, version: pkg.version, repo: pkg.repo,
        meaning: pkg.desc, checksum: pkg.checksum, deps: pkg.deps, commands: cmds, route,
        address: compiled.address, hexbits: compiled.hexbits, id: compiled.id, state,
        man: doc?.name ?? null, app: witness?.app ?? pkg.name, witnessOk: witness ? witness.ok : true,
      })
    }
  }

  const receipt = toUuid('exec|' + execSessionStamp() + '|' + applet + '|' + args.join(' ') + '|' + (ok ? '0' : '1') + '|' + output.join('\n'))
  return { line: String(line).trim(), applet, args, ok, output, data, receipt, ...hexbitDoorOf(receipt), sealed: os.receipt, honest: HONEST }
}

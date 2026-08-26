// quantum/os/exec — Alpine apps via apk + man→hexbit, plus install-port `ls`.
// Toy busybox (cat/which/stat/pwd/echo/du) FOLDED: Alpine packages ARE the apps (man→app→hexbit).
// `uuidnaLs` is internal for `ls`; MCP tool uuidna_ls removed — use uuidna_exec.
import {
  catalogueState, cataloguePackage, catalogueSearch, catalogueRdepends, catalogueCompile,
  resolveManPage, isManPagePackage, manAppWitness, catalogue,
} from './catalogue.js'
import { INSTALLS_MIRROR } from './mirror.js'
import { toUuid } from '../../address.js'
import { bootOS, compileToHexbits, type InstallSpec } from './index.js'
import { hostQuantumDevice } from '../../drivers/quantum/index.js'
import { driverBundle } from '../../drivers/driver/index.js'

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
      seen.set(seg, { name: seg, path: childPath, kind: 'dir', address: addr, hexbits: compileToHexbits(addr) })
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
      receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt,
      honest: HONEST + ' Catalogue absent: ' + (st.why ?? ''),
    }
  }
  const all = catalogue()
  if (p === '/catalogue') {
    const entries: VfsEntry[] = ['main', 'community', 'overlay'].map((repo) => {
      const count = all.filter((x) => x.repo === repo).length
      const childPath = norm('/catalogue/' + repo)
      const addr = toUuid('vfs-dir|' + childPath + '|' + count)
      return { name: repo, path: childPath, kind: 'dir' as const, meaning: `${count} packages`, address: addr, hexbits: compileToHexbits(addr) }
    }).filter((e) => e.meaning !== '0 packages')
    const receipt = toUuid('ls|' + p + '|' + entries.map((e) => e.name).join(','))
    return { path: p, entries, count: entries.length, receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt, honest: HONEST }
  }
  const repo = p.replace(/^\/catalogue\/?/, '')
  if (repo !== 'main' && repo !== 'community' && repo !== 'overlay') {
    const receipt = toUuid('ls|' + p + '|bad-repo')
    return { path: p, entries: [], count: 0, receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt, honest: HONEST }
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
    receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt,
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
    receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt, honest: HONEST,
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
export const APPLETS = ['ls', 'apk', 'man', 'driver', 'device', 'help'] as const
export type Applet = (typeof APPLETS)[number]

/** Retired toy applets — refused with a fold pointer, never silently reimplemented. */
export const FOLDED_APPLETS = ['cat', 'which', 'stat', 'pwd', 'echo', 'du'] as const

/** the apk sub-verbs uuidna ports — the package manager's READ surface only: list the inventory, show a package
 *  by NAME, search it, query its dependencies forward and back. NEVER add/del/update — a provenance OS installs
 *  nothing (theorem the_os_is_bootable_quantum); the sealed mirror IS the installed world, queried, never mutated. */
export const APK_VERBS = ['list', 'info', 'search', 'depends', 'rdepends'] as const

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
        emit(rows.map((s) => `${s.name}-${s.version}  ${s.route}`), { scope: 'installed', installed: rows.length, packages: rows.map((s) => ({ name: s.name, version: s.version, route: s.route })) })
      } else if (verb === 'info') {                                  // a package BY NAME (cat is by route) — its provenance record
        const s = specByName(name, specs)
        if (s) {
          emit([`${s.name}-${s.version} description:`, `  ${s.meaning}`, `${s.name}-${s.version} webpage:`, `  ${s.route}`,
            `${s.name}-${s.version} depends on:`, ...(s.deps.length ? s.deps.map((d) => '  ' + d) : ['  (none)'])],
            { name: s.name, version: s.version, route: s.route, meaning: s.meaning, checksum: s.checksum, deps: s.deps, address: s.address, hexbits: s.hexbits, state: 'INSTALLED' })
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
        const cat = catalogueSearch(name)
        const inBoot = new Set(installed.map((s) => s.name))
        const available = cat.hits.filter((c) => !inBoot.has(c.name))
        const st = catalogueState()
        if (!installed.length && !available.length) { err(apkMiss('search', name)); break }
        const availableCompiled = available.map((c) => ({ c, ...catalogueCompile(c) }))
        emit([
          ...installed.map((s) => `${s.name}-${s.version}  [installed]  ${s.meaning}`),
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
            ...availableCompiled.map(({ c, address, hexbits }) => ({ name: c.name, version: c.version, repo: c.repo, state: 'AVAILABLE' as const, address, hexbits })),
          ],
          installed: installed.map((s) => ({ name: s.name, route: s.route, address: s.address, hexbits: s.hexbits })),
          available: availableCompiled.map(({ c, address, hexbits }) => ({ name: c.name, version: c.version, repo: c.repo, address, hexbits })),
          total: installed.length + cat.total, shown: installed.length + available.length, catalogue: st,
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
      } else err(`apk: ${verb || '(missing)'}: not a ported verb — READ only: ${APK_VERBS.join(' ')} (a provenance OS installs nothing)`)
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
      emit([
        `device: ${d.platform}/${d.arch} · ${d.logical} logical cores`,
        `kind: ${d.kind}`,
        `simulable: ${d.simulableQubits} qubits (${d.simulableStates} states) · uuid hexbits: ${d.uuidHexbits}`,
        `witnesses: ${d.witnesses.length} sealed theorems · address ${d.deviceAddress}`,
      ], { device: d })
      break
    }
    case 'help': emit(['applets: ' + APPLETS.join(' '),
      'ls <path>  — install-port routes (/…) or full census (/catalogue, /catalogue/main|community|overlay)',
      'apk list · apk list --all · apk list main|community|overlay · apk info <name> · apk search · apk depends · apk rdepends',
      'man <topic>  — Alpine documentation package → 32 hexbits (man→app→hexbit)',
      'driver  — netboot/modloop driver bundle provenance (pinned release)',
      'device  — this host executing the sealed quantum algebra (drivers/quantum)',
      'folded toys (use apk/man instead): ' + FOLDED_APPLETS.join(' '),
      'Alpine apps are the apps — uuidna does not reimplement busybox'],
      { applets: APPLETS, apk: APK_VERBS, folded: FOLDED_APPLETS }); break
    case '': err('exec: empty command — try `help`'); break
    default: {
      if ((FOLDED_APPLETS as readonly string[]).includes(applet)) {
        err(`exec: ${applet}: folded into Alpine apps — try \`apk info <name>\` or \`man <topic>\` (toy busybox retired; man→app→hexbit is the port)`)
        break
      }
      err(`exec: ${applet}: not a ported applet (try \`help\`); remaining surface is ls · apk · man`)
    }
  }

  const receipt = toUuid('exec|' + applet + '|' + args.join(' ') + '|' + (ok ? '0' : '1') + '|' + output.join('\n'))
  return { line: String(line).trim(), applet, args, ok, output, data, receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt, honest: HONEST }
}

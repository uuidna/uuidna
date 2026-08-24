// quantum/os/exec — VIRTUAL EXECUTION IN uuidnaOS: the first Alpine-package tool, uuidna_ls, and the model
// that makes packages "executable" WITHOUT ever running a binary (the captain's order, 2026-08-23:
// "prototype uuidna_ls as the first alpine package tool and make all executable in the virtual uuidnaOS").
//
// THE LOAD-BEARING HONESTY (the_os_is_bootable_quantum, lead 129): uuidnaOS NEVER executes Alpine's binaries.
// "Executable in the virtual uuidnaOS" therefore means: uuidna's OWN pure-TS reimplementation of a utility's
// LOGIC, computed deterministically INSIDE the booted sandbox (bootOS verifies the world first, or nothing
// runs), over a VIRTUAL FILESYSTEM that is the install port's own routes and packages. The output is
// content-addressed and hexbit-compiled like every surface — a run leaves a receipt, recomputable by anyone.
// So `uuidna_ls /terminal` does NOT invoke busybox; it computes what the ported /terminal directory contains
// from the sealed spec. The tool's LOGIC is uuidna's; the tool's IDENTITY is the busybox package (coreutils/
// ls lives in busybox on Alpine). Integrity and computation, never execution.
import { toUuid } from '../../address.js'
import { bootOS, compileToHexbits, type InstallSpec } from './index.js'

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

/** uuidna_ls(path) → list a directory of the virtual uuidnaOS. Boots the sandbox first (a drifted world lists
 *  nothing), computes the entries from the sealed install port, and folds them to one receipt. The first
 *  Alpine-package tool: busybox's `ls`, reimplemented in uuidna, run in the box, never as a binary. */
export function uuidnaLs(path = '/'): LsResult {
  const os = bootOS()                                                // verified loading, or nothing runs
  const p = norm(path)
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
export const APPLETS = ['ls', 'cat', 'which', 'stat', 'pwd', 'echo', 'apk', 'help'] as const
export type Applet = (typeof APPLETS)[number]

/** the apk sub-verbs uuidna ports — the package manager's READ surface only: list the inventory, show a package
 *  by NAME, query its dependencies forward and back. NEVER add/del/update — a provenance OS installs nothing
 *  (theorem the_os_is_bootable_quantum); the sealed mirror IS the installed world, queried, never mutated. */
export const APK_VERBS = ['list', 'info', 'depends', 'rdepends'] as const

/** resolve a package by name (busybox) or by route (/terminal); the two directions `which` walks. */
const specByName = (name: string, specs: readonly InstallSpec[]): InstallSpec | undefined => specs.find((s) => s.name === name)
const specByRoute = (route: string, specs: readonly InstallSpec[]): InstallSpec | undefined => specs.find((s) => norm(s.route) === norm(route))

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
    case 'ls': {                                                     // list a directory of the virtual OS
      const r = uuidnaLs(args[0] ?? '/')
      emit(r.entries.map((e) => (e.kind === 'dir' ? e.name + '/' : e.name)), r)
      break
    }
    case 'cat': {                                                    // read a file: the package's provenance record
      const s = specByRoute(args[0] ?? '', specs)
      if (!s) { err(`cat: ${args[0] ?? ''}: no ported package at that route`); break }
      emit(
        [`${s.id}  ${s.version}`, `route:    ${s.route}`, `meaning:  ${s.meaning}`,
         `checksum: ${s.checksum}`, `deps:     ${s.deps.join(' ') || '(none)'}`, `address:  ${s.address}`],
        s,
      )
      break
    }
    case 'which': {                                                  // resolve a name → route, or a route → name
      const a = args[0] ?? ''
      const byName = specByName(a, specs)
      const byRoute = specByRoute(a, specs)
      if (byName) emit([byName.route], { name: a, route: byName.route, id: byName.id })
      else if (byRoute) emit([byRoute.name], { route: norm(a), name: byRoute.name, id: byRoute.id })
      else err(`which: ${a}: not a ported package name or route`)
      break
    }
    case 'stat': {                                                   // file metadata from the sealed spec
      const p = norm(args[0] ?? '/')
      const s = specByRoute(p, specs)
      if (s) emit([`${s.id}  pkg  ${s.deps.length} deps  addr ${s.address}`],
        { path: p, kind: 'pkg', id: s.id, version: s.version, deps: s.deps.length, address: s.address, hexbits: s.hexbits.length })
      else {
        const entries = childrenOf(p, specs)
        if (entries.length) emit([`${p}  dir  ${entries.length} entries`], { path: p, kind: 'dir', entries: entries.length })
        else err(`stat: ${p}: no such path in the virtual OS`)
      }
      break
    }
    case 'pwd': emit(['/'], { path: '/' }); break                    // the virtual OS has one root
    case 'echo': {                                                   // echo in the quantum OS folds its argument to an address
      const text = args.join(' ')
      const addr = toUuid('echo|' + text)
      emit([text], { text, address: addr, hexbits: compileToHexbits(addr) })
      break
    }
    case 'apk': {                                                    // the package manager — READ surface only, over the sealed mirror
      const verb = args[0] ?? ''
      const name = args[1] ?? ''
      if (verb === 'list') {                                         // the whole ported inventory, one line each
        const rows = [...specs].sort((a, b) => (a.name < b.name ? -1 : 1))
        emit(rows.map((s) => `${s.name}-${s.version}  ${s.route}`), { installed: rows.length, packages: rows.map((s) => ({ name: s.name, version: s.version, route: s.route })) })
      } else if (verb === 'info') {                                  // a package BY NAME (cat is by route) — its provenance record
        const s = specByName(name, specs)
        if (!s) { err(`apk info: ${name}: not a ported package (try \`apk list\`)`); break }
        emit([`${s.name}-${s.version} description:`, `  ${s.meaning}`, `${s.name}-${s.version} webpage:`, `  ${s.route}`,
          `${s.name}-${s.version} depends on:`, ...(s.deps.length ? s.deps.map((d) => '  ' + d) : ['  (none)'])],
          { name: s.name, version: s.version, route: s.route, meaning: s.meaning, checksum: s.checksum, deps: s.deps, address: s.address })
      } else if (verb === 'depends') {                               // forward deps — what this package pulls in
        const s = specByName(name, specs)
        if (!s) { err(`apk depends: ${name}: not a ported package`); break }
        emit(s.deps.length ? s.deps : ['(none)'], { name: s.name, depends: s.deps })
      } else if (verb === 'rdepends') {                              // reverse deps — who pulls THIS package in
        if (!specByName(name, specs)) { err(`apk rdepends: ${name}: not a ported package`); break }
        const rdeps = specs.filter((s) => s.deps.includes(name)).map((s) => s.name).sort()
        emit(rdeps.length ? rdeps : ['(none)'], { name, rdepends: rdeps })
      } else err(`apk: ${verb || '(missing)'}: not a ported verb — READ only: ${APK_VERBS.join(' ')} (a provenance OS installs nothing)`)
      break
    }
    case 'help': emit(['applets: ' + APPLETS.join(' '),
      'ls <path> · cat <route> · which <name|route> · stat <path> · pwd · echo <text>',
      'apk list · apk info <name> · apk depends <name> · apk rdepends <name>  (read-only — installs nothing)',
      'the whole toolbox is uuidna\'s own logic over the virtual OS — no binary is ever run'],
      { applets: APPLETS, apk: APK_VERBS }); break
    case '': err('exec: empty command — try `help`'); break
    default: err(`exec: ${applet}: not a ported applet (try \`help\`); uuidna ports the busybox filesystem family, faking none`)
  }

  const receipt = toUuid('exec|' + applet + '|' + args.join(' ') + '|' + (ok ? '0' : '1') + '|' + output.join('\n'))
  return { line: String(line).trim(), applet, args, ok, output, data, receipt, hexbits: compileToHexbits(receipt), sealed: os.receipt, honest: HONEST }
}

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

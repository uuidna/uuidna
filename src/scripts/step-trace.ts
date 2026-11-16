// @non-harmonic: a preload for one derive step's own process — it wraps the process's fs, child_process and fetch to
// RECORD what the step touches and writes the record at exit. Never imported by the core; generate.ts passes it with
// `--import` to the step it runs, and nothing else loads it.
//
// step-trace — WHAT A STEP READ AND WROTE, RECORDED BY THE PROCESS RATHER THAN DECLARED BY A HAND.
//
// A derive step may be skipped only when nothing it reads has moved, and the only honest list of what it reads is the
// one its own process produced. So the step runs once under this preload: every file it reads (fs, and every module
// the loader hands it), every directory it lists, every path whose existence it asks, every environment variable it
// reads, and every path it writes are recorded to the file named by UUIDNA_STEP_TRACE. A step that reaches the
// network, starts a child process or reads outside the tree is marked `open` — its inputs are not all in the record,
// so step-receipt.ts never skips it.
import { createRequire, registerHooks, syncBuiltinESMExports } from 'node:module'
import { resolve, relative, sep, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'

/** the address an environment value is recorded and compared by. Built on a builtin and nothing from the tree: a
 *  module this preload imported would load before its hook and reach the step from cache, unrecorded. */
export const envValueAddress = (v: string | undefined): string =>
  createHash('sha256').update(`env|${v ?? '∅'}`).digest('hex').slice(0, 32)

const require = createRequire(import.meta.url)
const fs = require('node:fs') as Record<string, unknown> & { promises: Record<string, unknown> }
const cp = require('node:child_process') as Record<string, unknown>
const OUT = process.env.UUIDNA_STEP_TRACE
const ROOT = process.cwd()

const reads = new Set<string>()
const lists = new Set<string>()
const probes = new Set<string>()
const writes = new Set<string>()
const env = new Map<string, string | undefined>()
const open = new Set<string>()

/** a path inside the tree, tree-relative with `/`; a path outside marks the step open. Everything under node_modules
 *  is read as package-lock.json, the file npm documents as pinning every installed byte, so a step's inputs are not
 *  thousands of library files that only a reinstall can move. A descriptor (a number) is not a path and is skipped. */
const inTree = (p: unknown, why: string): string | undefined => {
  if (typeof p !== 'string' && !(p instanceof URL)) return undefined
  const abs = resolve(ROOT, p instanceof URL ? fileURLToPath(p) : p)
  const rel = relative(ROOT, abs).split(sep).join('/')
  if (rel.startsWith('../') || rel === '..' || isAbsolute(rel)) { open.add(`${why} outside the tree: ${abs}`); return undefined }
  if (rel === 'node_modules' || rel.startsWith('node_modules/')) return 'package-lock.json'
  return rel === '' ? '.' : rel
}

type Fn = (...a: unknown[]) => unknown
const wrap = (obj: Record<string, unknown>, names: readonly string[], on: (a: unknown[]) => void): void => {
  for (const n of names) {
    const real = obj[n]
    if (typeof real !== 'function') continue
    obj[n] = function (this: unknown, ...a: unknown[]) { on(a); return (real as Fn).apply(this, a) }
  }
}

if (OUT) {
  const realWrite = fs.writeFileSync as Fn
  wrap(fs, ['readFileSync', 'readFile', 'createReadStream'], (a) => { const p = inTree(a[0], 'read'); if (p !== undefined) reads.add(p) })
  wrap(fs.promises, ['readFile'], (a) => { const p = inTree(a[0], 'read'); if (p !== undefined) reads.add(p) })
  wrap(fs, ['readdirSync', 'readdir', 'opendirSync'], (a) => { const p = inTree(a[0], 'list'); if (p !== undefined) lists.add(p) })
  wrap(fs.promises, ['readdir', 'opendir'], (a) => { const p = inTree(a[0], 'list'); if (p !== undefined) lists.add(p) })
  wrap(fs, ['existsSync', 'statSync', 'lstatSync', 'accessSync'], (a) => { const p = inTree(a[0], 'probe'); if (p !== undefined) probes.add(p) })
  wrap(fs.promises, ['stat', 'lstat', 'access'], (a) => { const p = inTree(a[0], 'probe'); if (p !== undefined) probes.add(p) })
  wrap(fs, ['writeFileSync', 'appendFileSync', 'writeFile', 'appendFile', 'createWriteStream', 'rmSync', 'unlinkSync', 'rm', 'unlink'], (a) => { const p = inTree(a[0], 'write'); if (p !== undefined) writes.add(p) })
  wrap(fs.promises, ['writeFile', 'appendFile', 'rm', 'unlink'], (a) => { const p = inTree(a[0], 'write'); if (p !== undefined) writes.add(p) })
  wrap(fs, ['copyFileSync', 'copyFile', 'renameSync', 'rename'], (a) => { for (const x of a.slice(0, 2)) { const p = inTree(x, 'write'); if (p !== undefined) writes.add(p) } })
  wrap(fs.promises, ['copyFile', 'rename'], (a) => { for (const x of a.slice(0, 2)) { const p = inTree(x, 'write'); if (p !== undefined) writes.add(p) } })
  wrap(cp, ['spawnSync', 'execSync', 'execFileSync', 'spawn', 'exec', 'execFile', 'fork'], (a) => { open.add(`child process: ${String(a[0]).slice(0, 60)}`) })
  syncBuiltinESMExports()
  const realFetch = globalThis.fetch
  if (typeof realFetch === 'function') globalThis.fetch = ((...a: Parameters<typeof fetch>) => { open.add('network'); return realFetch(...a) }) as typeof fetch
  const realEnv = process.env
  process.env = new Proxy(realEnv, {
    get: (t, k) => { if (typeof k === 'string' && !env.has(k)) env.set(k, t[k]); return t[k as string] },
    has: (t, k) => { if (typeof k === 'string' && !env.has(k)) env.set(k, t[k]); return k in t },
  })
  // every module the loader hands the step is an input, exactly as a file it reads is
  registerHooks({
    load(url, context, nextLoad) {
      if (url.startsWith('file:')) { const p = inTree(new URL(url), 'read'); if (p !== undefined) reads.add(p) }
      return nextLoad(url, context)
    },
  })
  process.on('exit', () => {
    realWrite(OUT, JSON.stringify({
      reads: [...reads].sort(), lists: [...lists].sort(), probes: [...probes].sort(), writes: [...writes].sort(),
      // a value is recorded by its address, never in clear: a step may read a token, and the record sits on disk
      env: [...env].filter(([k]) => k !== 'UUIDNA_STEP_TRACE').sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([k, v]) => [k, envValueAddress(v)]),
      open: [...open].sort(),
      // the step's measured peak resident memory, which the runner admits concurrent steps against (kilobytes, per
      // node's process.resourceUsage, carried as bytes)
      footprintBytes: process.resourceUsage().maxRSS * 1024,
    }))
  })
}

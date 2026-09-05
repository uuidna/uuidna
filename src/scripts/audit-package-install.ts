#!/usr/bin/env node
// audit-package-install — PACK THE PACKAGE, INSTALL IT OUTSIDE THE REPO, AND IMPORT EVERY SUBPATH.
//
// THIS CLASS OF DEFECT IS INVISIBLE IN-TREE BY CONSTRUCTION, which is the whole reason the check has to leave
// the tree. Measured 2026-09-05 by a wave agent: package.json `files` shipped only lean/axioms.json while
// dist/desk/repo/json imports SEVEN json assets statically, so a stranger's very first
// `import "@uuidna/uuidna"` threw ERR_MODULE_NOT_FOUND and 9 of 13 subpaths were down — on a package published
// to the registry at 0.3.0. In the repository the files are simply on disk, so every test, every guard finder
// and every build passed over it. Only an install from the tarball can see it.
//
// SO THIS RUNS `npm pack`, unpacks the tarball into a temp directory OUTSIDE the repository, and imports each
// subpath the package's own `exports` map declares. A failure names the subpath and the missing specifier.
//
// It is slow — a pack and an install — so it is registered as a MEASUREMENT rather than a unit test, and the
// audit chain takes it. The alternative is what happened: a published package nobody could import.
//
// @non-harmonic: shells out to npm and writes a temp directory — packing IS the reading, and the boundary is here
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { ROOT } from './api.js'

export interface SubpathResult { subpath: string; ok: boolean; error?: string }

export interface InstallAudit {
  /** false when the pack or install could not run — a fact about this host, never about the package */
  ran: boolean
  reason?: string
  tarball?: string
  subpaths: SubpathResult[]
  total: number
  importable: number
  broken: SubpathResult[]
}

/** declaredSubpaths() → every subpath the package's own exports map promises a consumer. */
export function declaredSubpaths(): string[] {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { name: string; exports?: Record<string, unknown> }
  const ex = pkg.exports ?? {}
  return Object.keys(ex).map((k) => (k === '.' ? pkg.name : `${pkg.name}${k.slice(1)}`))
}

/** auditPackageInstall() → pack, install to a temp dir outside the repo, import every declared subpath. */
export function auditPackageInstall(): InstallAudit {
  const subpaths = declaredSubpaths()
  const base: InstallAudit = { ran: false, subpaths: [], total: subpaths.length, importable: 0, broken: [] }
  let dir = ''
  try {
    // pack first — the tarball is exactly what a consumer receives
    const out = execFileSync('npm', ['pack', '--silent', '--pack-destination', tmpdir()], { cwd: ROOT, encoding: 'utf8', timeout: 300_000 })
    const name = out.trim().split('\n').filter(Boolean).pop() ?? ''
    const tarball = join(tmpdir(), name)
    if (!name || !existsSync(tarball)) return { ...base, reason: `npm pack produced no tarball (said: ${out.trim().slice(0, 200)})` }
    dir = mkdtempSync(join(tmpdir(), 'uuidna-install-'))
    execFileSync('npm', ['init', '-y'], { cwd: dir, encoding: 'utf8', timeout: 120_000 })
    execFileSync('npm', ['install', '--silent', '--no-audit', '--no-fund', tarball], { cwd: dir, encoding: 'utf8', timeout: 600_000 })
    // IMPORT EACH SUBPATH IN ITS OWN PROCESS, so one failure cannot mask the others
    const results: SubpathResult[] = subpaths.map((sp) => {
      try {
        execFileSync(process.execPath, ['--input-type=module', '-e', `await import(${JSON.stringify(sp)})`],
          { cwd: dir, encoding: 'utf8', timeout: 120_000, stdio: ['ignore', 'ignore', 'pipe'] })
        return { subpath: sp, ok: true }
      } catch (e) {
        const err = e as { stderr?: string; message?: string }
        const text = String(err.stderr ?? err.message ?? '')
        const spec = /Cannot find module '([^']+)'|ERR_MODULE_NOT_FOUND[\s\S]*?'([^']+)'/.exec(text)
        return { subpath: sp, ok: false, error: (spec ? `missing ${spec[1] ?? spec[2]}` : text.split('\n')[0] ?? 'import failed').slice(0, 200) }
      }
    })
    const broken = results.filter((r) => !r.ok)
    return { ran: true, tarball: name, subpaths: results, total: results.length, importable: results.length - broken.length, broken }
  } catch (e) {
    return { ...base, reason: e instanceof Error ? e.message.slice(0, 300) : String(e) }
  } finally {
    if (dir) { try { rmSync(dir, { recursive: true, force: true }) } catch { /* a temp dir that will not clear is not a package defect */ } }
  }
}

const isMain = process.argv[1]?.endsWith('audit-package-install.js') ?? false
if (isMain) {
  console.log('audit-package-install — packing, installing outside the repo, importing every declared subpath\n')
  const a = auditPackageInstall()
  if (!a.ran) {
    console.log(`· could not run: ${a.reason}`)
    console.log('  UNREAD is not a pass: nothing was verified about the published artifact.')
    process.exit(2)
  }
  for (const r of a.subpaths) console.log(`  ${r.ok ? '✓' : '✗'} ${r.subpath}${r.ok ? '' : ' — ' + r.error}`)
  console.log(`\n  ${a.importable}/${a.total} subpaths importable from the tarball ${a.tarball}`)
  if (a.broken.length) {
    console.log(`\n✗ audit-package-install — ${a.broken.length} subpath(s) a stranger cannot import:`)
    for (const b of a.broken) console.log(`    GAP ${b.subpath}: ${b.error}\n    FIX add the missing asset to package.json "files" — in-tree it sits on disk, so only a packed install sees this`)
    process.exit(1)
  }
  console.log('\n✓ audit-package-install — every declared subpath imports from a clean install outside the repo.')
}

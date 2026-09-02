#!/usr/bin/env node
// spin — the O(1) derived-layer door. `--seal` writes lean/spin-manifest.json (each derived file's coin + one
// receipt); default (`--verify`) re-spins the working tree and HARD-FAILS (exit 1) on any drift — a file whose coin
// moved is non-quantum and is rejected before it can be committed. Seal runs inside reconcile (after every generator,
// so the coins are of the freshly-rotated layer). Verify is the fast check a developer runs BEFORE the slow O(N)
// gate: "has my derived layer drifted since the last seal?" answered in one fold per file, no re-derivation.
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DERIVED_FILES, sealSpin, verifySpin, type SpinManifest } from '../spin.js'
import { ROOT } from './api.js'

// At repo ROOT (with the other derived-layer artifacts: audit-citations.json, support-audit.json, research-leads.json)
// — NOT under lean/, where the `*-manifest.json` glob belongs to lean-ledger's theorem-name manifests (a different shape).
const MANIFEST = join(ROOT, 'spin-manifest.json')
/** The paths git will actually carry — its INDEX, which is HEAD plus whatever has been staged.
 *
 *  A SEAL DESCRIBES THE TREE, NOT THE DIRECTORY (2026-08-25). The walk below reads directories off disk, so
 *  sealing `lean/` sealed every file lying in lean/ — including UNTRACKED output from another session's
 *  half-finished generator. 363cc8ff did exactly that: its spin-manifest names lean/alpine-apps.{json,md} and
 *  lean/quantum-advantage.{json,md}, four files that exist in no commit anywhere in this repository. A clean
 *  checkout of that very commit fails `spin --verify` immediately, on four phantoms — the seal is a receipt for
 *  work that is not there.
 *
 *  The index is the right authority because it is exactly what the commit will contain: a newly generated
 *  derived file that has been `git add`ed IS listed and so IS sealed, which keeps reconcile's generate-add-seal
 *  flow working, while a file merely sitting in the directory is not. That also makes the seal INDEPENDENT OF
 *  WHERE IT IS COMPUTED — the same commit seals identically in a clean worktree and in a shared checkout with
 *  four sessions' debris in it, which it emphatically did not before.
 *
 *  A missing git is NAMED, not silently tolerated: without it this cannot tell tracked from untracked, and a
 *  sealer that cannot make that distinction is the thing being fixed. It refuses rather than seals blind. */
const indexed = (): Set<string> | null => {
  try {
    const out = execFileSync('git', ['ls-files', '-z', '--', ...DERIVED_FILES], { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' })
    const paths = out.split('\0').filter(Boolean)
    return paths.length ? new Set(paths) : null
  } catch { return null }
}

const read = (): Record<string, string> => {
  const files: Record<string, string> = {}
  const tracked = indexed()
  if (!tracked) {
    console.error('✗ spin — cannot ask git which derived files are TRACKED, so a seal here could absorb untracked')
    console.error('  files that exist in no commit (it has: see 363cc8ff). Refusing rather than sealing blind.')
    console.error('  Fix: run inside the git working tree, with git on PATH.')
    process.exit(1)
  }
  // A DERIVED_FILES entry may be a DIRECTORY — lean/ and src/chunks are gated wholesale by the audit chain, and
  // sealing only the plain-file entries left the wings, every domain manifest and the whole chunk store un-rotated.
  // Walk directories into their files so the sealer covers exactly what the gate diffs.
  const walk = (rel: string): void => {
    const abs = join(ROOT, rel)
    if (!existsSync(abs)) return
    if (statSync(abs).isDirectory()) { for (const e of readdirSync(abs)) walk(rel + '/' + e); return }
    // git reports posix separators; the walk builds them the same way, so this compares like with like
    if (!tracked.has(rel)) return
    files[rel] = readFileSync(abs, 'utf8')
  }
  for (const p of DERIVED_FILES) walk(p)
  return files
}

const files = read()

if (process.argv.includes('--seal')) {
  const manifest = sealSpin(files)
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`✓ spin --seal — sealed ${Object.keys(manifest.coins).length} derived-file coins, receipt ${manifest.receipt}`)
} else {
  if (!existsSync(MANIFEST)) { console.error('✗ spin --verify — no spin-manifest.json; run `node dist/scripts/spin.js --seal` (or npm run reconcile) first'); process.exit(1) }
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8')) as SpinManifest
  const { ok, drift, receipt, sealedReceipt } = verifySpin(manifest, files)
  if (ok) {
    console.log(`✓ spin --verify — the derived layer is a fixed point of its seal (${Object.keys(manifest.coins).length} coins match), receipt ${receipt}`)
  } else {
    console.error(`✗ spin --verify — NON-QUANTUM DRIFT: ${drift.length} derived file(s) moved since the last seal (receipt ${receipt} ≠ sealed ${sealedReceipt}):`)
    for (const d of drift) {
      console.error(`    ${d.path}: coin ${d.sealed} → ${d.spun}`)
      // AND, FOR A JSON DOCUMENT, WHICH FIELD (2026-09-02). A coin over a whole file says THAT it moved and
      // never WHERE, so six v0.3.0 publishes each spent ~12 minutes of CI to learn one bit. The committed
      // version is right there in HEAD, so the two can be compared field by field and the drift can name its own
      // subtree — which is the captain's law about statements applied to a failure message: an aggregate that
      // cannot be checked in parts should be split into ones that can.
      if (!d.path.endsWith('.json')) continue
      try {
        const head = execFileSync('git', ['show', `HEAD:${d.path}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
        const was = JSON.parse(head) as Record<string, unknown>
        const now = JSON.parse(readFileSync(join(ROOT, d.path), 'utf8')) as Record<string, unknown>
        const keys = [...new Set([...Object.keys(was), ...Object.keys(now)])].sort()
        const moved = keys.filter((k) => JSON.stringify(was[k]) !== JSON.stringify(now[k]))
        if (moved.length) console.error(`      fields that differ from HEAD: ${moved.join(', ')}`)
      } catch { /* a file absent from HEAD is new, and a new file has no field to compare */ }
    }
    // THE SAFE DOOR NAMED FIRST (2026-08-25). This said "npm run reconcile", which re-derives AND stages AND
    // commits AND pushes — and stages DRAIN_PATHS as DIRECTORIES, so on a shared checkout it sweeps another
    // session's untracked files into your commit. Five sessions work this tree. `--derive-only` does the half
    // that fixes drift and stops before publishing anything, and it existed the whole time while every failure
    // message pointed at the other one. I hand-rolled its ten steps six times tonight before reading the source.
    console.error('  Fix: npm run reconcile -- --derive-only   (re-derive from the ledger + re-seal, publishes NOTHING)')
    console.error('       npm run reconcile                    (the same, then stages, commits and pushes — NOT on a shared tree)')
    console.error('       or restore the file. Spin hard-rejects drift.')
    process.exit(1)
  }
}

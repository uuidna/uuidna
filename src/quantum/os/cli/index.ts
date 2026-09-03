#!/usr/bin/env node
// cli — THE uuidnaOS DOOR (hooks · audit · wave-run). All court logic lives in court.ts + exec court applet.
//   (default)     daily — hex + court + fast QA playbook
//   --court       publish — hex + court
//   --full        daily + uuidna_crypto census
//   --probe       agent sample
//   --quantum-cover  full crypto-related Alpine coverage (Layer 1 + Layer 2)
//   --msg <file>  commit-msg gate (damage · overreach · sign)
import { runCourtCli } from '../court/index.js'
import { testQuantumAlpineCoverage, renderQuantumAlpineCoverage } from '../alpine/index.js'
import { changedFiles, fileManifest, treeCovers } from '../../../gate-receipt-index.js'
import { primeTreeCovers } from '../../../gate-receipt-compare.js'
import { ROOT } from '../../../boundary.js'

// node builtins reached LAZILY — this module is in the worker's import graph, and a module-scope `node:fs`
// import is what Cloudflare refuses with code 10021 (worker.test.ts holds that boundary).
const rdf = (p: string, enc: 'utf8'): string =>
  ((process as unknown as { getBuiltinModule(id: string): typeof import('node:fs') }).getBuiltinModule('node:fs')).readFileSync(p, enc)
const join = (...xs: string[]): string =>
  ((process as unknown as { getBuiltinModule(id: string): typeof import('node:path') }).getBuiltinModule('node:path')).join(...xs)

/** runUuidnaOsCli(argv) → exit code; importable from scripts/tests so support audit reaches this door. */
export function runUuidnaOsCli(argv: readonly string[]): number {
  if (argv.includes('--quantum-cover')) {
    const sandbox = argv.includes('--sandbox')
    const c = testQuantumAlpineCoverage({ sandbox })
    console.log(renderQuantumAlpineCoverage(c))
    return c.complete && (!c.sandbox || c.sandbox.ok) ? 0 : 1
  }
  // PRIME THE COURT WITH THIS HOST'S DIGESTS, then let it decide. The CLI is where a filesystem exists, so the
  // gathering happens here and the JUDGEMENT stays in the court — which is why the court can now run in a tab
  // and still carry the arm. Only the push door (--proven) reads the result; priming always is harmless.
  if (argv.includes('--proven')) primeTreeCovers(treeCovers())
  const code = runCourtCli(argv)
  // ── AND WHEN THE PUSH DOOR BLOCKS, THE FILES ARE NAMED HERE. The court is deliberately filesystem-free so it
  // can run in a tab, so all it can say is which COVERED DIRECTORY moved — `(src)`. Measured 2026-09-03: two
  // landings in one run were blocked with exactly that, after a fresh receipt had just been minted, and the
  // coarse verdict was the whole diagnosis available; the per-file manifest that answers it in milliseconds was
  // already inside the receipt and nothing read it. The CLI is the half that HAS a filesystem, so the naming
  // belongs here rather than in the court — the tab-safe boundary is kept and the answer stops being withheld.
  // A gate that knows the finding and prints something coarser makes the next hand re-run it to learn the
  // accusation, which is the cost this whole loop exists to remove.
  if (code !== 0 && argv.includes('--proven')) {
    try {
      const want = (JSON.parse(rdf(join(ROOT, 'gate-receipt.json'), 'utf8')) as { files?: Record<string, string> }).files ?? {}
      if (Object.keys(want).length) {
        const moved = changedFiles(want, fileManifest())
        console.error(moved.length
          ? `  MOVED ${moved.length} file(s) since the receipt: ${moved.slice(0, 8).join(', ')}${moved.length > 8 ? ` …and ${moved.length - 8} more` : ''}`
          : '  MOVED 0 files by the per-file manifest — the coarse cover disagrees with the manifest, which is its own finding')
      }
    } catch { /* a receipt that cannot be read is already the court's answer */ }
  }
  return code
}

// THE ENTRY CHECK COMPARES THIS MODULE TO THE ENTRY, not a filename it hopes still matches. It used to read
// `endsWith('cli.js')`, and when cli.ts became cli/index.ts the guard stopped matching its own file: every hook
// runs `node dist/quantum/os/cli/index.js`, which ends in index.js, so the condition was false and the process
// exited 0 having done NOTHING. pre-commit, commit-msg and pre-push all route through here, so three HARD gates
// were passing everything silently — the shell echoed "uuidnaOS court" and no court sat. A gate that cannot fail
// is not a gate, and this one could not even report its absence. Comparing against import.meta.url survives the
// next move, which is the only guarantee worth having: the file may be renamed again, the check may not care.
const isEntry = ((): boolean => {
  const entry = process.argv[1]
  if (!entry) return false
  const norm = (s: string): string => s.replace(/\\/g, '/').replace(/^file:\/\//, '')
  return norm(import.meta.url).endsWith(norm(entry))
})()
if (isEntry) {
  process.exit(runUuidnaOsCli(process.argv.slice(2)))
}

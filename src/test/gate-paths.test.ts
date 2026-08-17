// gate-paths — A GATE MUST ASSERT THE PROPERTY, NEVER THE FILENAME. Folded after the 2026-08-17 sweep, which found
// three drifted path references and one dangerous one:
//   · security-audit backed the "KAT-verified" claim with existsSync('src/test/kat.test.ts') — a rename broke it and
//     an EMPTY file of that name would have passed it. It now locates the suite by the standards' own vectors.
//   · audit.ts audited the built site through a hardcoded two-page list, and one page
//     ('docs/.vitepress/dist/theorems/index.html') stopped existing when cleanUrls began emitting 'theorems.html'.
//     It skipped that page silently for as long as nobody looked — a gate quietly covering half of its claim is
//     worse than a gate that fails. The page list is now DISCOVERED from the directory.
//   · predict-and-fill reported the axiom-leak gap at 'lean/theorems/generated.ts', a path that does not exist
//     (the ledger is src/theorems/generated.ts) — and that string is published to humans in the registrar's issue.
// SCOPE, stated honestly: this audits the GATE and AUDIT scripts only. Curriculum generators (quantum-school.ts) name
// paths that are DELIVERABLES — files a student is meant to create — so an unresolved path there is a specification,
// not a defect, and flagging it would teach the wrong lesson.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'

const GATE = /^(audit|guard|next|conformance|security-audit|spin|provenance|predict-and-fill|support|one-receipt|seal-claims-audit|account|harmonic-scan|axiom-hunt|audit-.*)\.ts$/
const LITERAL_PATH = /'((?:src|lean|docs|packages|extension)\/[A-Za-z0-9_./-]+)'/g
/** the VitePress outDir is gitignored build output — absent means "not built yet", which is not a drifted reference */
const isBuildOutput = (p: string): boolean => p.startsWith('docs/.vitepress/dist')

const gateFiles = (): string[] => [
  ...readdirSync(join(ROOT, 'src', 'scripts')).filter((f) => GATE.test(f)).map((f) => join('src', 'scripts', f)),
  join('src', 'spin.ts'), join('src', 'security-audit.ts'),
].filter((f) => existsSync(join(ROOT, f)))

/** a root-level file READ by a gate — the class the directory-prefixed regex above misses. The first version of this
 *  finder scanned only paths containing a '/', so it walked straight past `rd('mcp.mjs')` in audit.ts: a root-level
 *  file that had ceased to exist, throwing ENOENT and killing that entire audit before any arm ran. */
const ROOT_READ = /\b(?:rd|readFileSync)\(\s*'([A-Za-z0-9_.-]+\.(?:mjs|md|json|ts|js|lean|html|txt|yml|yaml))'/g

test('every literal path a gate script names resolves — a drifted reference makes a check inert', () => {
  const unresolved: string[] = []
  for (const f of gateFiles()) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    for (const m of src.matchAll(LITERAL_PATH)) {
      const p = m[1]
      if (isBuildOutput(p)) continue
      if (!existsSync(join(ROOT, p))) unresolved.push(`${f} → ${p}`)
    }
    for (const m of src.matchAll(ROOT_READ))
      if (!existsSync(join(ROOT, m[1]))) unresolved.push(`${f} → ${m[1]} (root-level read)`)
  }
  assert.deepEqual(unresolved, [], 'a gate names a path that does not exist — fix the path, or assert the property instead')
})

test('the finder bites — the historical offenders are exactly what the rule flags', () => {
  // proof by the real bugs: had these still been present, the sweep above would have named them
  for (const offender of ['lean/theorems/generated.ts', 'src/test/kat.test.ts'])
    assert.equal(existsSync(join(ROOT, offender)), false, `${offender} must stay absent — it is the drifted path, not a real file`)
  assert.ok(existsSync(join(ROOT, 'src/theorems/generated.ts')), 'the real ledger path')
  assert.ok(existsSync(join(ROOT, 'src/test/crypto-primitives.test.ts')), 'the real KAT suite')
})

test('the built-site audit DISCOVERS its pages — no gate hardcodes a page of the generated site', () => {
  const offenders: string[] = []
  for (const f of gateFiles()) {
    const src = readFileSync(join(ROOT, f), 'utf8')
    for (const m of src.matchAll(/'docs\/\.vitepress\/dist\/[A-Za-z0-9_./-]*\.html'/g)) offenders.push(`${f} → ${m[0]}`)
  }
  assert.deepEqual(offenders, [], 'a hardcoded built page silently stops being audited the moment the site’s output shape changes')
})

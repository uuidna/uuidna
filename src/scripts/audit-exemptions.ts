#!/usr/bin/env node
// audit-exemptions — THE ESCAPE HATCH IS UNBOUNDED, AND THE SCANNER THAT REPORTS IT CANNOT SAY SO.
//
// harmonic-scan rule (1) forbids non-harmonic ops in the library core "ONLY in a top-level LIBRARY module that
// self-declares `// @non-harmonic: <reason>`". So the violation count is DEFINITIONALLY ZERO: declaring is what
// exempts you, and the scanner therefore reports `✓ the core is harmonic` at eighteen exemptions, and would
// report it identically at eighty. It measures compliance with a labelling convention, not harmony. The
// declaration is still worth having — a named boundary visible in review beats a silent one — but a count that
// can only ever be zero is not a measurement, and nothing in the tree bounds how many hatches exist.
//
// SO THIS BOUNDS IT, with the ratchet the tree already uses in three other places (dormant-scripts.json, the
// rosetta floor, lean/law-register.json): today's exempt modules are sealed, and a NEW exemption fails. Existing
// ones are not accused — a gate nobody can pass is a gate nobody runs — but the hatch stops being free.
//
// WHY THIS DOES NOT REIMPLEMENT THE SCANNER'S CLASSIFIER, and the reason is a mistake made writing this file.
// The first version reimplemented `isLibrary` — the regex deciding which files rule (1) applies to. Copied
// through a shell heredoc it arrived as `[\/]` instead of `[\\/]`, matching a forward slash and never a
// backslash, so on this Windows host it matched NO path separator, every file classified as library, and the
// audit reported 52 exemptions across 621 modules where the instrument reports 18 across 187. The extra 34 were
// scripts and tests whose markers are entirely legitimate and to which rule (1) never applied. The broken
// classifier produced the MORE alarming number, which is the direction a wrong instrument is most dangerous in
// and the easiest to publish unchecked.
//
// The cure is the one-derivation law: there is no second classifier. This runs harmonic-scan and reads ITS
// report, so the set of exempt modules has exactly one definition in the tree. If the scanner's output shape
// ever changes, the parse below REFUSES — it never falls back to reporting zero exemptions, because "I could
// not read the scanner" and "there are no exemptions" are the difference this whole audit is about.
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT, HERE } from './api.js'

export interface ScanReport {
  /** library modules rule (1) applies to — the denominator the scanner itself computes */
  libraryModules: number
  /** files covered by rule (2), the determinism hard-reject */
  determinismScanned: number
  /** every module carrying a `@non-harmonic:` declaration, as the scanner names them */
  exempt: string[]
}

/** parseScanReport(stdout) → the scanner's own figures. THROWS on a shape it does not recognise, and throws when
 *  the header promises N exemptions but the list yields a different number — a partial parse is the failure mode
 *  that would quietly shrink the measured hatch and make the ratchet pass for the wrong reason. */
export function parseScanReport(stdout: string): ScanReport {
  const head = /harmonic-scan — (\d+) library modules \(rule 1\) \+ (\d+) files determinism-scanned[^;]*; (\d+) NAMED non-harmonic boundary/.exec(stdout)
  if (!head) throw new Error('audit-exemptions: harmonic-scan\'s report header did not parse. The scanner\'s output shape changed, or it did not run — either way this must REFUSE, never report zero exemptions.')
  const exempt = [...stdout.matchAll(/^\s*·\s+(\S+)\s+\(/gm)].map((m) => m[1].replace(/\\/g, '/'))
  const promised = Number(head[3])
  if (exempt.length !== promised) {
    throw new Error(`audit-exemptions: the header promises ${promised} exempt modules and the list yields ${exempt.length}. A partial parse would understate the hatch and pass the ratchet for the wrong reason.`)
  }
  return { libraryModules: Number(head[1]), determinismScanned: Number(head[2]), exempt: exempt.sort() }
}

/** run the scanner and read its report. The scanner exits 0 when the core is harmonic; a nonzero exit means a
 *  REAL rule violation, which is the scanner's business and not this audit's — it is surfaced, not swallowed. */
export function readScan(scriptDir = HERE): ScanReport {
  let stdout: string
  try {
    stdout = execFileSync(process.execPath, [join(scriptDir, 'harmonic-scan.js')], { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' })
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string }
    const out = String(err.stdout ?? '')
    if (!out) throw new Error(`audit-exemptions: harmonic-scan produced no output at all — ${String(err.stderr || 'no stderr')}`)
    stdout = out                                   // it ran and FAILED a real rule; its report is still the truth
  }
  return parseScanReport(stdout)
}

export interface Baseline { count: number; exempt: string[]; libraryModules: number; why: string }

/** THE RATCHET — a module that newly declares itself exempt FAILS; one that stopped is reported so the seal can
 *  tighten. Identical in shape to lean/law-register.json and lean/dormant-scripts.json. */
export function ratchet(now: ScanReport, base: Baseline | null): { ok: boolean; added: string[]; removed: string[]; reason: string } {
  if (!base) return { ok: false, added: [], removed: [], reason: 'no sealed baseline — run once with --seal, then the hatch may only close' }
  const sealed = new Set(base.exempt)
  const added = now.exempt.filter((m) => !sealed.has(m))
  const removed = base.exempt.filter((m) => !now.exempt.includes(m))
  if (added.length) return { ok: false, added, removed, reason: `${added.length} module(s) newly claim the non-harmonic exemption` }
  return { ok: true, added, removed, reason: removed.length ? `${removed.length} exemption(s) surrendered — reseal to tighten` : 'unchanged' }
}

/** the share of the library core running under an exemption, in per-mille — integer, no float intrinsic */
export const permille = (part: number, whole: number): number => (whole === 0 ? 0 : (part * 1000 - ((part * 1000) % whole)) / whole)

const BASELINE = join(ROOT, 'lean', 'exemptions.json')
const isMain = process.argv[1]?.endsWith('audit-exemptions.js') ?? false
if (isMain) main()

function main(): void {
  const seal = process.argv.includes('--seal')
  let scan: ScanReport
  try {
    scan = readScan()
  } catch (e) {
    console.error(`✗ audit-exemptions — ${(e as Error).message}`)
    process.exit(1)
  }

  const share = permille(scan.exempt.length, scan.libraryModules)
  console.log(`audit-exemptions — ${scan.exempt.length} of ${scan.libraryModules} library modules run under a declared non-harmonic exemption (${share}‰)`)
  console.log(`    rule (2) determinism covers ${scan.determinismScanned} files with NO exemption anywhere — that is the rule that cannot be opted out of`)
  console.log('    rule (1) reports ✓ at any number of declarations, because declaring is what exempts; this audit is the bound the scanner cannot provide')

  const base: Baseline | null = existsSync(BASELINE) ? (JSON.parse(readFileSync(BASELINE, 'utf8')) as Baseline) : null

  if (seal) {
    const out: Baseline = {
      count: scan.exempt.length,
      exempt: scan.exempt,
      libraryModules: scan.libraryModules,
      why: 'Library modules carrying `// @non-harmonic:`. harmonic-scan rule (1) exempts whatever declares itself, so its violation count is definitionally zero and cannot bound this set. Sealed here as a baseline that MAY ONLY SHRINK: a NEW exemption fails, surrendering one tightens the seal. The existing entries are not accused — several are load-bearing boundaries — but the hatch is no longer free.',
    }
    writeFileSync(BASELINE, JSON.stringify(out, null, 1) + '\n')
    console.log(`✓ sealed ${out.count} exempt modules to lean/exemptions.json — from here the hatch may only close`)
    return
  }

  const r = ratchet(scan, base)
  if (!r.ok) {
    console.error(`✗ audit-exemptions — ${r.reason}:`)
    for (const a of r.added) console.error(`    ${a}`)
    console.error('  FIX move the work to src/os or src/drivers (the declared non-determinism boundary, which rule (1) does not')
    console.error('      reach at all), or keep the exemption and reseal with --seal so the new hatch is recorded rather than free.')
    process.exit(1)
  }
  if (r.removed.length) console.log(`✓ audit-exemptions — ${r.removed.length} surrendered: ${r.removed.join(', ')} — reseal to tighten.`)
  else console.log('✓ audit-exemptions — the hatch has not widened.')
}

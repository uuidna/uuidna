#!/usr/bin/env node
// audit-law-register — THE LAW REGISTER IS A SAMPLE PRESENTED AS THE LAW, AND NOTHING SAID SO.
//
// src/laws.ts exists for a stated reason: "uuidna's standing invariants, IN uuidna (not in an agent's private
// notes) and each DEMONSTRATED, not asserted". It holds FIVE. Measured 2026-08-25, the tree enforces at least
// forty-four: 36 guard finders, 3 eslint law rules, 2 harmonic-scan rules, 3 git hooks — plus the laws written
// only as prose in file headers (MAY ONLY SHRINK, may only rise, ONE WRITER, the dormancy law, the thin-wrapper
// law, use-versus-mention, the two-handle law), every one of which is enforced and NONE of which appears in the
// register. So `allHold: true` means "these five hold" and reads as "uuidna's laws all hold".
//
// AND THE TEST CANNOT SEE IT. laws.test.ts asserts `r.laws.length >= 5`. A FLOOR on a hand-authored list detects
// deletion below five and can never detect that thirty-nine are missing; every other assertion in that test
// ranges over the laws that ARE listed. So the completeness of the register is enforced by nothing, while the
// `>= 5` gives the appearance that something checks it. That is this tree's recurring defect one level up: an
// instrument that cannot distinguish a complete register from a curated sample, reporting the sample as the whole.
//
// WHAT THIS DOES. It enumerates the enforcement surface from the SOURCES THAT DEFINE IT — guard's FINDERS array,
// the laws lint config's rule keys, harmonic-scan's two rule declarations, the hooks directory — and asks, for
// each, whether any registered law names it in `enforcedBy`. What is enforced but unregistered is listed.
//
// IT IS A RATCHET, NOT A CLIFF. Failing outright on today's gap would fail every run from now until someone
// writes thirty-nine laws, which is a gate nobody can pass and therefore a gate nobody runs — this tree already
// learned that with lint:strict. So the gap is SEALED as a baseline that MAY ONLY SHRINK, the same law
// dormant-scripts.json and the rosetta floor already keep: a NEW unregistered enforcer fails, and registering
// one tightens the baseline for good. The unknown becomes bounded and can only improve.
//
// THE PROPERTY THIS FILE MUST HOLD ABOUT ITSELF, because it is the whole point: A PARSER THAT READ NOTHING MUST
// NOT REPORT "NO ENFORCEMENT". Every source below is required to yield at least one arm, and a source that
// cannot be read or that parses to nothing REFUSES the run. Absence is never a clean result here — that is the
// exact defect the audit exists to name, and an auditor holding it would be the last place to allow it.
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { laws } from '../laws.js'

/** One thing that can refuse a change: where it is enforced, and what it is called there. */
export interface Enforcer {
  /** the arm's own name, as its defining source spells it */
  name: string
  /** which instrument runs it */
  instrument: string
}

/** THE PARSE, per source. Each returns the arms that source DEFINES — never a guess, and never an empty list
 *  treated as an answer (the caller refuses on empty). Anchored on the defining construct rather than on a bare
 *  filename mention, so a comment naming a finder cannot inflate the surface. */
export const parseGuardFinders = (src: string): string[] =>
  [...src.matchAll(/^\s*\{\s*name:\s*'([a-z-]+)'\s*,\s*run:/gm)].map((m) => m[1])

export const parseLintRules = (src: string): string[] =>
  [...new Set([...src.matchAll(/'uuidna\/([a-z-]+)'\s*:/g)].map((m) => m[1]))]

/** harmonic-scan declares its two rules in prose numbered (1) and (2); they have no machine-readable names, so
 *  they are named HERE and that naming is itself the finding — a rule with no name cannot be registered. */
export const parseScanRules = (src: string): string[] => {
  const found: string[] = []
  if (/NON-HARMONIC OPS/.test(src)) found.push('non-harmonic-ops')
  if (/DETERMINISM hard-reject/.test(src)) found.push('determinism-hard-reject')
  return found
}

export interface Surface { enforcers: Enforcer[]; bySource: Record<string, number> }

/** readSurface() → every enforcer this tree runs, from the sources that define them. REFUSES rather than
 *  under-reports: a source that is missing, unreadable, or that parses to zero arms throws by name. */
export function readSurface(root = ROOT): Surface {
  const read = (rel: string): string => {
    const p = join(root, rel)
    if (!existsSync(p)) throw new Error(`law-register: ${rel} is missing — the enforcement surface cannot be read, so it must not be reported as empty`)
    return readFileSync(p, 'utf8')
  }
  const require1 = (arms: string[], rel: string, what: string): string[] => {
    if (!arms.length) throw new Error(`law-register: parsed ZERO ${what} from ${rel}. A parser that read nothing must not report "no enforcement" — fix the parse or the file, never the report.`)
    return arms
  }

  const enforcers: Enforcer[] = []
  const bySource: Record<string, number> = {}
  const add = (names: string[], instrument: string): void => {
    for (const name of names) enforcers.push({ name, instrument })
    bySource[instrument] = names.length
  }

  add(require1(parseGuardFinders(read('src/scripts/guard.ts')), 'src/scripts/guard.ts', 'guard finders'), 'guard')
  add(require1(parseLintRules(read('eslint.laws.config.js')), 'eslint.laws.config.js', 'lint rules'), 'eslint-laws')
  add(require1(parseScanRules(read('src/scripts/harmonic-scan.ts')), 'src/scripts/harmonic-scan.ts', 'scan rules'), 'harmonic-scan')

  const hooksDir = join(root, 'hooks')
  if (!existsSync(hooksDir)) throw new Error('law-register: hooks/ is missing — refusing to report zero hooks')
  add(require1(readdirSync(hooksDir).filter((f) => !f.includes('.')), 'hooks/', 'git hooks'), 'hooks')

  return { enforcers, bySource }
}

/** An enforcer is REGISTERED when some law names it in `enforcedBy`. Word-boundary matched so `state` does not
 *  register itself against the word "statement" in a law's prose — a substring match here would silently
 *  register arms nobody wrote a law for, which is the flattering direction. */
export const isRegistered = (name: string, enforcedBy: readonly string[]): boolean =>
  enforcedBy.some((e) => new RegExp(`(^|[^a-z-])${name}([^a-z-]|$)`, 'i').test(e))

export interface RegisterAudit {
  enforced: number
  registered: number
  unregistered: string[]
  bySource: Record<string, number>
  lawCount: number
}

export function auditRegister(surface: Surface, enforcedBy: readonly string[], lawCount: number): RegisterAudit {
  const unregistered = surface.enforcers.filter((e) => !isRegistered(e.name, enforcedBy)).map((e) => `${e.instrument}:${e.name}`)
  return {
    enforced: surface.enforcers.length,
    registered: surface.enforcers.length - unregistered.length,
    unregistered: unregistered.sort(),
    bySource: surface.bySource,
    lawCount,
  }
}

export interface Baseline { count: number; unregistered: string[]; why: string }

/** THE RATCHET. A gap that grew, or a name that was not in the sealed set, FAILS. A gap that shrank is reported
 *  and the caller is told to reseal — the baseline may only shrink, exactly as dormant-scripts.json and the
 *  rosetta floor already work. */
export function ratchet(now: RegisterAudit, base: Baseline | null): { ok: boolean; grew: string[]; shrank: string[]; reason: string } {
  if (!base) return { ok: false, grew: [], shrank: [], reason: 'no sealed baseline — run with --seal once to record today\'s gap, then it may only shrink' }
  const sealed = new Set(base.unregistered)
  const grew = now.unregistered.filter((u) => !sealed.has(u))
  const shrank = base.unregistered.filter((u) => !now.unregistered.includes(u))
  if (grew.length) return { ok: false, grew, shrank, reason: `${grew.length} enforcer(s) newly enforced with NO registered law` }
  return { ok: true, grew, shrank, reason: shrank.length ? `${shrank.length} newly registered — reseal to tighten the ratchet` : 'unchanged' }
}

// ── the run ──────────────────────────────────────────────────────────────────────────────────────────────────
// GUARDED, the one-writer.ts idiom, and it is not ceremony: everything above is exported for the tests, and a
// module whose top level runs a CLI would execute that CLI on import — including `process.exit(1)` on a failing
// audit, which would kill the test runner mid-suite and report as a crash rather than as a failed assertion. An
// auditor that can abort the process that is examining it is not testable, and an untested auditor is exactly
// the decorative gate this file was written to replace.
const BASELINE = join(ROOT, 'lean', 'law-register.json')
const isMain = process.argv[1]?.endsWith('audit-law-register.js') ?? false
if (isMain) main()

function main(): void {
const seal = process.argv.includes('--seal')

let surface: Surface
try {
  surface = readSurface()
} catch (e) {
  console.error(`✗ audit-law-register — ${(e as Error).message}`)
  process.exit(1)
}

const L = laws()
const audit = auditRegister(surface, L.laws.map((l) => l.enforcedBy), L.laws.length)
const base: Baseline | null = existsSync(BASELINE) ? (JSON.parse(readFileSync(BASELINE, 'utf8')) as Baseline) : null

console.log(`audit-law-register — ${audit.enforced} enforcers across ${Object.keys(audit.bySource).length} instruments; ${audit.lawCount} laws registered in src/laws.ts`)
for (const [src, n] of Object.entries(audit.bySource)) console.log(`    ${src.padEnd(14)} ${n}`)
console.log(`    REGISTERED     ${audit.registered}/${audit.enforced}`)
console.log(`    unregistered   ${audit.unregistered.length} — enforced by this tree, named by no law`)

if (seal) {
  const out: Baseline = {
    count: audit.unregistered.length,
    unregistered: audit.unregistered,
    why: 'Enforcers this tree RUNS for which src/laws.ts states no law. Sealed as a baseline that MAY ONLY SHRINK: a newly enforced arm with no registered law fails this audit, and registering one tightens the seal for good. The gap is not a defect to be hidden — it is the measured distance between what uuidna enforces and what uuidna says it enforces.',
  }
  writeFileSync(BASELINE, JSON.stringify(out, null, 1) + '\n')
  console.log(`✓ sealed ${out.count} unregistered enforcers to lean/law-register.json — from here it may only shrink`)
  process.exit(0)
}

const r = ratchet(audit, base)
if (!r.ok) {
  console.error(`✗ audit-law-register — ${r.reason}:`)
  for (const g of r.grew) console.error(`    ${g}`)
  console.error('  FIX state the law in src/laws.ts with this arm named in `enforcedBy`, or reseal deliberately with --seal.')
  process.exit(1)
}
if (r.shrank.length) {
  console.log(`✓ audit-law-register — ${r.shrank.length} enforcer(s) newly registered: ${r.shrank.join(', ')}`)
  console.log('  reseal with `--seal` to tighten the ratchet.')
} else {
  console.log('✓ audit-law-register — the gap has not grown; every enforcer is either registered or sealed in the baseline.')
}
}

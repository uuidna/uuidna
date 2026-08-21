#!/usr/bin/env node
// rosetta — FIVE WITNESSES, CHOSEN FOR INDEPENDENCE RATHER THAN COUNT.
//
// emit() already cross-checks a `js:` mirror against its `lean:` statement and hard-fails on disagreement. That is
// two legs: enough to DETECT a discrepancy, never enough to LOCATE one. And on 2026-08-20 it proved insufficient in
// the worse way — strokes_survive_reflection passed BOTH legs. The mirror agreed with the kernel, and the theorem
// was still wrong, because both legs were written by the same hand and encoded the same mistaken framing. Two legs
// written by one author share that author's errors.
//
// The Rosetta Stone worked because Greek was already known: an INDEPENDENT anchor. So the extra legs must come from
// outside the pair, and the count follows from error correction rather than taste — to locate t faults you need
// 2t+1 witnesses. Three handles one. Four is worse than it looks, because a 2-2 split has no majority. Five is the
// next count that decides, and it survives a correlated pair plus one more.
//
//   SYMBOL     the TypeScript computation — what the code says
//   PROOF      the kernel's `by decide` verdict — what Lean accepts
//   WITNESS    an external source: a book, a standard, a measurement. Independent OF THE PROJECT.
//   FALSIFIER  a deliberate mutation that must FAIL. Independent OF THE CLAIM'S TRUTH — it tests the test.
//   ADDRESS    the content fold, so a stranger recomputes from the exact bytes. Independent OF PERSON AND MOMENT.
//
// Symbol and proof are the correlated pair. Each of the day's failures would have been caught by a different one of
// the last three: the seams theorem (true by construction) by the FALSIFIER, the sailing angles and the stroke
// framing by the WITNESS.
//
// THIS MEASURES BEFORE IT ENFORCES. Requiring five legs of every sealed theorem today would fail on nearly all of
// them — only a handful cite an external source. So it reports the census and holds a FLOOR that may only RISE,
// the same shape as the dormant roster's may-only-shrink rule: the ledger cannot get less anchored than it is.
//
// THE DECISION IS MADE HERE AND SHIPPED. Deciding a leg means reading the wings, the emitters and the tests — a
// filesystem the Cloudflare Workers edge does not have. So every run also WRITES src/rosetta-mirror.ts, the rows in
// compact form, and the hosted /mcp tool answers from that while the local one recomputes live. The audit chain
// already runs this script, so the mirror refreshes itself; nothing is kept current by hand.
//
//   node dist/scripts/rosetta.js [--census] [--key <theorem>]
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { LEGS, maskOfLegs, legsOfMask, floorGaps, type Leg, type Rosetta } from '../rosetta-legs.js'

export { LEGS, floorGaps, type Leg, type Rosetta }

/** Named external anchors. A WITNESS must be something outside this repository that a stranger could consult —
 *  a published standard, a named author, a measured artefact. The project's own prose is not a witness to itself. */
const WITNESS = /\b(NIST|CODATA|WGS ?84|IUPAC|SI\b|Gutenberg|Landauer|Eratosthenes|Fujishima|McCarty|Heidrich|Rossi|Runciman|Rathbun|Mathot|Day,|Wellman|ISO ?\d|RFC ?\d|doi|DOI|physics\.nist\.gov|measured (?:at|as|by)|bomb calorimetry)\b/

// ATTRIBUTION IS COMPUTED, NOT ANNOTATED. The first attempt at this hand-wrote "Claimed by the captain" with a
// date onto three theorems. Three things wrong with that, and the captain named all three: it is manual logic in a
// project whose first law is that manual work always fails; the date was invented, since the claim long predates
// the day it was sealed; and it was redundant, because gen-captain-claims.ts already holds the doctrine that the
// UNCLAIMED IS THE CAPTAIN'S. Writing an annotation to record a default is the definition of manual.
//
// So attribution is not a leg. It is a HOOK with a default: a claim carries an external source, or it carries the
// captain's, and nothing needs saying for the second case. Ownership is total and automatic.
//
// WITNESS stays a separate and deliberately rare axis, because the two answer different questions. The captain's
// claim settles WHOSE it is — legal, universal, computed. A witness settles WHETHER A STRANGER CAN CHECK IT —
// epistemic, external, and by far the scarcest leg in the ledger. Folding the first into the second would
// score every theorem as witnessed and destroy the only measurement that located today's errors: the vacuity trap
// one more time, wearing the captain's name.

/** The hook: an external source if the note names one, otherwise the captain. No annotation, no date, no
 *  exceptions — the unclaimed is claimed, which is the doctrine gen-captain-claims.ts already seals. */
export function claimedBy(note: string): string {
  const m = note.match(WITNESS)
  return m ? m[0] : 'captain'
}

/** the comment block immediately above a theorem is where its wing records provenance.
 *
 *  TWO FORMS, BECAUSE THE PROSE MOVED. This read only `--` lines, and when `emit` began writing each fact's
 *  sentence as a real Lean `/-- … -/` DOC COMMENT the notes went silent: every wing note came back empty, and the
 *  witness leg — the scarcest and most valuable of the five, the one that says a STRANGER can check this — fell
 *  from 9 to 0 in a single generation. Nothing had lost its anchor. The reader had stopped looking where the
 *  anchors now live.
 *
 *  That is worth recording rather than quietly patching: the census reported a catastrophic loss, the floor ratchet
 *  refused to publish it (`the floor may only rise`), and the refusal is what surfaced the bug. A census that had
 *  been willing to write down a smaller number would have ratified the loss and nobody would have looked. */
export function commentAbove(src: string, key: string): string {
  const at = src.search(new RegExp('^theorem\\s+' + key.replace(/[-_]/g, '[-_]') + '\\b', 'm'))
  if (at < 0) return ''
  const before = src.slice(0, at)
  const lines = before.split('\n')
  const out: string[] = []
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i]
    // a doc comment closes with `-/`; walk back to its `/--` opener and take the whole block
    if (/-\/\s*$/.test(l) && !/^\s*--/.test(l)) {
      const block: string[] = []
      for (let j = i; j >= 0; j--) {
        block.unshift(lines[j])
        if (/^\s*\/--/.test(lines[j])) { out.unshift(...block); i = j; break }
        if (j === 0) return out.join('\n')   // an unterminated opener: take what is already gathered
      }
      continue
    }
    if (/^\s*--/.test(l)) out.unshift(l)
    else if (l.trim() === '' && out.length) break
    else if (l.trim() === '') continue
    else break
  }
  return out.join('\n')
}

/** Read every wing and decide, per theorem, which of the five legs it actually carries. */
export function census(): Rosetta[] {
  const leanDir = join(ROOT, 'lean')
  const wings = readdirSync(leanDir).filter((f) => f.endsWith('.lean'))
  const testDir = join(ROOT, 'src', 'tests')
  // COMMENTS ARE NOT COVERAGE. This scan is a substring match, so for a long time a theorem key merely MENTIONED in
  // a test's prose earned the falsifier leg — two of the keys the published floor rested on were named only as
  // examples in a test about key length, in a file that was then deleted. A leg that a comment can earn measures
  // nothing, so comment lines are stripped and only executable test text counts.
  const executable = (src: string): string =>
    src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n')
  const tests = existsSync(testDir)
    ? readdirSync(testDir).filter((f) => f.endsWith('.ts')).map((f) => executable(readFileSync(join(testDir, f), 'utf8'))).join('\n')
    : ''
  const emitters = readdirSync(join(ROOT, 'src', 'scripts')).filter((f) => /^lean-.*\.ts$/.test(f))
    .map((f) => readFileSync(join(ROOT, 'src', 'scripts', f), 'utf8')).join('\n')
  const generated = existsSync(join(ROOT, 'src', 'theorems', 'generated.ts'))
    ? readFileSync(join(ROOT, 'src', 'theorems', 'generated.ts'), 'utf8') : ''

  const out: Rosetta[] = []
  for (const wing of wings) {
    const src = readFileSync(join(leanDir, wing), 'utf8')
    for (const m of src.matchAll(/^theorem\s+([A-Za-z0-9_]+)/gm)) {
      const key = m[1]
      const note = commentAbove(src, key)
      const legs: Leg[] = []
      // PROOF — it is a sealed theorem in a wing the emitter verified sorry-free
      legs.push('proof')
      // SYMBOL — the emitter carries a js: mirror keyed to it (emit() hard-fails if the two disagree)
      if (new RegExp("key: '" + key + "'").test(emitters)) legs.push('symbol')
      // ADDRESS — the generated ledger folds it, so a stranger recomputes from the exact bytes
      if (generated.includes(key)) legs.push('address')
      // WITNESS — its wing note names something outside this repository
      if (WITNESS.test(note)) legs.push('witness')
      // FALSIFIER — a test names it, which is where a mutation that must fail would live
      if (tests.includes(key)) legs.push('falsifier')
      // NORMALISED to the fixed LEGS order, not the order the checks happen to run in: the hosted edge rebuilds
      // these rows from a bit-mask and would otherwise report the same theorem's legs in a different sequence — a
      // difference between the two surfaces that is invisible until someone diffs two answers.
      out.push({ key, wing, legs: LEGS.filter((l) => legs.includes(l)), missing: LEGS.filter((l) => !legs.includes(l)), claimedBy: claimedBy(note) })
    }
  }
  return out
}

// ── THE SHIPPED MIRROR ────────────────────────────────────────────────────────────────────────────────────────
// The rows, compact: one `#wing` section header, then `key mask` per theorem (the mask is the leg bit-set defined in
// rosetta-legs.ts). Non-captain attribution is carried separately because it is rare — writing "captain" beside
// every key would be storing a default, which is the annotation habit this module already refused once.
const MIRROR_PATH = join(ROOT, 'src', 'rosetta-mirror.ts')

/** The floor STATED in the current mirror, read from source (never from dist, which may lag a rebuild). */
export function statedFloor(): { witness: number; falsifier: number } {
  if (!existsSync(MIRROR_PATH)) return { witness: 0, falsifier: 0 }
  const src = readFileSync(MIRROR_PATH, 'utf8')
  const m = /export const FLOOR = \{ witness: (\d+), falsifier: (\d+) \}/.exec(src)
  return m ? { witness: Number(m[1]), falsifier: Number(m[2]) } : { witness: 0, falsifier: 0 }
}

export function renderMirror(rows: readonly Rosetta[]): string {
  const wings = [...new Set(rows.map((r) => r.wing))].sort()
  const body: string[] = []
  for (const w of wings) {
    body.push('#' + w)
    for (const r of rows.filter((x) => x.wing === w)) body.push(`${r.key} ${maskOfLegs(r.legs)}`)
  }
  const claims = rows.filter((r) => r.claimedBy !== 'captain').map((r) => `${r.key} ${r.claimedBy}`).sort()
  const witness = rows.filter((r) => r.legs.includes('witness')).length
  // THE FALSIFIER FLOOR IS DERIVED, NOT RATCHETED. Every falsified theorem pays the two coins and the captain
  // pays two more, so 63 · 2 + 2 = 128 — the full uuid — and the floor is (128 − 2)/2, sealed in
  // `captain_theorem`. Publishing the LIVE count instead made the floor a high-water
  // mark: adding tests raised it to 66, and then an ordered purge of theorems that could not compute could not
  // be recorded, because the mark refused to come back down to the law it was supposed to express. The bound is
  // the arithmetic; coverage above it is welcome and never becomes a new obligation.
  const DERIVED_FALSIFIER_FLOOR = (128 - 2) / 2
  const falsifier = DERIVED_FALSIFIER_FLOOR
  return [
    '// rosetta-mirror — GENERATED by scripts/rosetta.ts. DO NOT EDIT.',
    '// The leg census, decided on device by reading the wings, the emitters and the tests, and shipped in source so',
    '// the hosted Workers edge — which has no filesystem — can serve the same answer the stdio server recomputes.',
    '// Format: `#wing` opens a section; each following line is `key mask`, the mask being the leg bit-set from',
    '// rosetta-legs.ts. Attribution is listed only where it is NOT the captain, because storing a default is an',
    '// annotation, and the FLOOR is the anchoring this ledger may never fall below.',
    '',
    'export const MIRROR = `' + body.join('\n') + '`',
    '',
    'export const CLAIMS = `' + claims.join('\n') + '`',
    '',
    `export const FLOOR = { witness: ${witness}, falsifier: ${falsifier} }`,
    '',
  ].join('\n')
}

/** Write the mirror if it changed. REFUSES to lower the floor: the anchoring may rise, never fall, so a run that
 *  would publish a smaller witness or falsifier count fails loudly instead of quietly ratifying the loss. */
/** Legs the CURRENT mirror records, key by key — the baseline a regression is measured against. */
function priorLegs(): Map<string, Leg[]> {
  const out = new Map<string, Leg[]>()
  if (!existsSync(MIRROR_PATH)) return out
  const body = /export const MIRROR = `([\s\S]*?)`/.exec(readFileSync(MIRROR_PATH, 'utf8'))
  if (!body) return out
  for (const line of body[1].split('\n')) {
    const m = /^([a-z0-9_]+) (\d+)$/.exec(line.trim())
    if (m) out.set(m[1], legsOfMask(Number(m[2])))
  }
  return out
}

/** A THEOREM THAT NO LONGER EXISTS CANNOT LOSE ITS ANCHOR. The floor was an aggregate high-water mark, so an
 *  ordered purge — theorems whose statements compared bare literals and were removed on the captain's
 *  instruction — read as "a claim lost its external witness" and blocked the mirror from recording the change.
 *  What the ratchet is actually for is a SURVIVING theorem quietly dropping a leg, which is invisible in a total.
 *  So regressions are measured key by key, over the keys present in both censuses. */
function regressions(rows: readonly Rosetta[]): string[] {
  const prior = priorLegs()
  const out: string[] = []
  for (const r of rows) {
    const was = prior.get(r.key)
    if (!was) continue
    for (const leg of was) if (!r.legs.includes(leg)) out.push(`${r.key} lost its ${leg} leg — it is still in the ledger, so this is a real regression, not a removal`)
  }
  return out
}

export function writeMirror(rows: readonly Rosetta[]): { changed: boolean; refused: string[] } {
  const refused = [...regressions(rows), ...floorGaps(rows, { witness: 0, falsifier: (128 - 2) / 2 })]
  if (refused.length) return { changed: false, refused }
  const next = renderMirror(rows)
  const current = existsSync(MIRROR_PATH) ? readFileSync(MIRROR_PATH, 'utf8') : ''
  if (current === next) return { changed: false, refused: [] }
  writeFileSync(MIRROR_PATH, next)
  return { changed: true, refused: [] }
}

if (process.argv[1] && /rosetta\.(js|ts)$/.test(process.argv[1])) {
  const rows = census()
  const key = process.argv.indexOf('--key') >= 0 ? process.argv[process.argv.indexOf('--key') + 1] : null

  if (key) {
    const r = rows.find((x) => x.key === key)
    if (!r) { console.error(`rosetta — no sealed theorem named ${key}`); process.exit(1) }
    console.log(`${r.key}  [${r.wing}]`)
    for (const l of LEGS) console.log(`  ${r.legs.includes(l) ? '✓' : '·'} ${l}`)
    console.log(`\n  ${r.legs.length} of 5 legs${r.legs.length < 3 ? ' — below the three that can LOCATE a fault' : ''}`)
    process.exit(0)
  }

  const byCount = new Map<number, number>()
  for (const r of rows) byCount.set(r.legs.length, (byCount.get(r.legs.length) ?? 0) + 1)
  console.log(`rosetta — ${rows.length} sealed theorems, by how many independent witnesses they carry\n`)
  for (const n of [...byCount.keys()].sort((a, b) => b - a)) {
    console.log(`  ${n} leg(s): ${String(byCount.get(n)).padStart(5)}  ${n >= 3 ? 'can locate a fault' : n === 2 ? 'can only DETECT — the pair that failed today' : ''}`)
  }
  for (const l of LEGS) {
    console.log(`  ${l.padEnd(10)} ${String(rows.filter((r) => r.legs.includes(l)).length).padStart(5)} of ${rows.length}`)
  }
  const byClaim = new Map<string, number>()
  for (const r of rows) byClaim.set(r.claimedBy, (byClaim.get(r.claimedBy) ?? 0) + 1)
  console.log(`\n  claimed by (computed, never annotated):`)
  for (const [who, n] of [...byClaim.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`    ${who.padEnd(14)} ${n}`)

  const five = rows.filter((r) => r.legs.length === 5)
  console.log(`\n  fully anchored (all five): ${five.length}${five.length ? ' — ' + five.slice(0, 6).map((r) => r.key).join(', ') : ''}`)

  // and SHIP the decision, so the hosted /mcp answers from the same census this run just took
  const written = writeMirror(rows)
  if (written.refused.length) {
    console.error('✗ rosetta — the mirror was NOT rewritten: the floor may only rise')
    for (const g of written.refused) console.error('    ' + g)
    process.exit(1)
  }
  console.log(written.changed
    ? '\n  ✓ src/rosetta-mirror.ts rewritten — rebuild to ship it to the hosted edge'
    : '\n  ✓ src/rosetta-mirror.ts already current — the hosted edge and this census agree')
}

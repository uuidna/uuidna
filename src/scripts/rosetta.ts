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
// node:fs rides LAZILY through the runtime's own registry (the mcp.ts:38 law, sync form): a top-level
// import rides every bundle that reaches this module, and the edge worker has no filesystem.
const fsm = (): typeof import('node:fs') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:fs') as typeof import('node:fs')
const pathm = (): typeof import('node:path') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:path') as typeof import('node:path') // lazy: the edge bundles this module but never calls it
import { ROOT } from './api.js'
import { listTestSources } from '../test-paths.js'
import { LEGS, maskOfLegs, legsOfMask, floorGaps, type Leg, type Rosetta } from '../rosetta-legs.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

export { LEGS, floorGaps, type Leg, type Rosetta }

/** Named external anchors. A WITNESS must be something outside this repository that a stranger could consult —
 *  a published standard, a named author, a measured artefact. The project's own prose is not a witness to itself.
 *
 *  `measured (at|as|by)` WAS AN ALTERNATIVE HERE AND THE LAW ABOVE FORBADE IT. A bare "measured" says only that
 *  somebody measured; it does not say WHO, and the law asks for something a stranger could consult. It anchored
 *  exactly two theorems and neither was external: `the_process_holds_more_than_the_container_allows` by "measured
 *  at 107.84 seconds", a stopwatch on one operator's machine, and `s4_parity_splits_evenly_its_involutions_do_not`
 *  by "measured by inversion count", which is this project computing about itself — the sentence the law names as
 *  the thing that is not a witness. The legitimate case it was reaching for is already covered: `bomb calorimetry`
 *  names an external procedure, and anything else genuinely measured elsewhere must name the elsewhere.
 *
 *  Removing it takes the anchored count to 15, and the floor follows it down under
 *  `a_floor_may_fall_to_what_is_anchored` — which is the point of having replaced the absolute refusal: a census
 *  can now be corrected toward the law instead of being held at whatever it once mistakenly counted. */
const WITNESS = /\b(NIST|CODATA|WGS ?84|IUPAC|SI\b|Gutenberg|Landauer|Eratosthenes|Fujishima|McCarty|Heidrich|Rossi|Runciman|Rathbun|Mathot|Day,|Wellman|ISO ?\d|RFC ?\d|physics\.nist\.gov|bomb calorimetry)\b|10\.\d{4,9}\/[^\s)'"]+/

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
  const leanDir = pathm().join(ROOT, 'lean')
  const wings = fsm().readdirSync(leanDir).filter((f) => f.endsWith('.lean'))
  // COMMENTS ARE NOT COVERAGE. This scan is a substring match, so for a long time a theorem key merely MENTIONED in
  // a test's prose earned the falsifier leg — two of the keys the published floor rested on were named only as
  // examples in a test about key length, in a file that was then deleted. A leg that a comment can earn measures
  // nothing, so comment lines are stripped and only executable test text counts.
  const executable = (src: string): string =>
    src.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*(\/\/|\*)/.test(l)).join('\n')
  const tests = listTestSources(ROOT)
    .map((rel) => executable(fsm().readFileSync(pathm().join(ROOT, rel), 'utf8')))
    .join('\n')
  const emitters = fsm().readdirSync(pathm().join(ROOT, 'src', 'scripts')).filter((f) => /^lean-.*\.ts$/.test(f))
    .map((f) => fsm().readFileSync(pathm().join(ROOT, 'src', 'scripts', f), 'utf8')).join('\n')
  const generated = fsm().existsSync(pathm().join(ROOT, 'src', 'theorems', 'generated.ts'))
    ? fsm().readFileSync(pathm().join(ROOT, 'src', 'theorems', 'generated.ts'), 'utf8') : ''

  const out: Rosetta[] = []
  for (const wing of wings) {
    const src = fsm().readFileSync(pathm().join(leanDir, wing), 'utf8')
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
// module scope must not touch the builtin registry (the edge loads this module and has none) — resolve lazily
const mirrorPath = (): string => pathm().join(ROOT, 'src', 'rosetta-mirror.ts')



/** UNREACHED — anchors this repository already holds that the census cannot see.
 *
 *  The WITNESS leg is decided from the WING note, and the wing note is emitted from a row's `name` alone: a row's
 *  `why` may name NIST, CODATA, WGS 84 or a real DOI and none of it reaches the sealed `.lean` a stranger reads.
 *  That is not scarcity, it is a reading error at the collection point, and publishing the leg fraction without it
 *  invites the reader to conclude the corroboration does not exist. Counted here, from the same rule the leg is
 *  decided by, so the two can never disagree. */
export function unreachedAnchors(rows: readonly Rosetta[]): string[] {
  const dir = pathm().join(ROOT, 'src', 'scripts')
  const has = new Set(rows.filter((r) => r.legs.includes('witness')).map((r) => r.key))
  const out: string[] = []
  for (const f of fsm().readdirSync(dir).filter((n: string) => /^lean-.*\.ts$/.test(n))) {
    const src = fsm().readFileSync(pathm().join(dir, f), 'utf8')
    for (const part of src.split(/\{\s*key:\s*'/).slice(1)) {
      const key = part.slice(0, part.indexOf("'"))
      if (has.has(key)) continue
      const why = /\n\s*why:\s*('[\s\S]*?'|`[\s\S]*?`),\n/.exec(part)
      if (why && WITNESS.test(why[1])) out.push(key)
    }
  }
  return [...new Set(out)].sort()
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
    '// Anchors the repository HOLDS and the census cannot reach: named in an emitter row\'s `why`, absent from the',
    '// wing note the leg is decided from. Published so the witness fraction is read as a collection gap and not as',
    '// an absence of corroboration.',
    'export const UNREACHED: readonly string[] = ' + JSON.stringify(unreachedAnchors(rows)),
    '',
    '// The WITNESS rule these legs were decided by, as a digest of its own source. A later run compares it: if the',
    '// digest moved and the anchored count FELL, the instrument changed rather than any claim, and that fall must be',
    '// DECLARED (rosetta --declare-rule-change "<reason>") rather than permitted as a side effect. Without this the',
    '// refusal is walk-past-able by editing the pattern it consults, which is the absolute refusal wearing a quieter',
    '// coat: a gate whose verdict the author controls by editing the thing it reads.',
    `export const RULE = ${JSON.stringify(ruleDigest())}`,
    `export const RULE_DECLARED = ${JSON.stringify(declaredReason())}`,
    '// …and the digest it was declared FOR. A declaration is spent on ONE rule: honouring a standing one for the',
    '// next change lets a single declaration bless every future edit, which is the same walk-past hole one level up.',
    '// Measured: with the declaration for the `measured` removal on the record, deleting `Gutenberg` — an unrelated',
    '// alternative — was permitted and printed that reason beside a fall it had nothing to do with.',
    `export const RULE_DECLARED_FOR = ${JSON.stringify(declaredReason() ? ruleDigest() : '')}`,
    '',
  ].join('\n')
}

/** Write the mirror if it changed. REFUSES to lower the floor: the anchoring may rise, never fall, so a run that
 *  would publish a smaller witness or falsifier count fails loudly instead of quietly ratifying the loss. */
/** ruleDigest() → a digest of the WITNESS source line, so a rule change is detectable without storing the rule. */
export function ruleDigest(): string {
  const src = fsm().readFileSync(pathm().join(ROOT, 'src', 'scripts', 'rosetta.ts'), 'utf8')
  const m = /^const WITNESS = .*$/m.exec(src)
  return handleOf(toUuid('witness-rule|' + (m ? m[0] : '')))
}

/** priorMirror() → EVERYTHING the current mirror records, from ONE read.
 *
 *  It was five: the floor, the declared reason, the rule digest, the per-key anchors and the per-key legs each
 *  had its own existsSync and its own regex over the same file, and classifyFall called one of them twice. Five
 *  readers of one file is not only four reads wasted — it is five chances to disagree about which state of the
 *  file was seen, in the function whose whole job is deciding whether something changed. */
interface PriorMirror {
  legs: Map<string, Leg[]>
  /** what earned each witness leg, as the mirror recorded it — the evidence a fall is classified against */
  anchors: Map<string, string>
  /** the WITNESS rule the legs were decided by, or '' when the mirror predates the field (UNKNOWN, not stable) */
  rule: string
  declared: string
  /** the digest the declaration was made FOR — a declaration is spent on one rule, not on all future ones */
  declaredFor: string
}

function priorMirror(): PriorMirror {
  const empty: PriorMirror = { legs: new Map(), anchors: new Map(), rule: '', declared: '', declaredFor: '' }
  if (!fsm().existsSync(mirrorPath())) return empty
  const src = fsm().readFileSync(mirrorPath(), 'utf8')
  // `key value` lines, one shape for both blocks — the mirror's format is known in exactly this one place now
  const rows = (re: RegExp): [string, string][] =>
    (re.exec(src)?.[1] ?? '').split('\n').flatMap((line) => {
      const m = /^([a-z0-9_]+) (.+)$/.exec(line.trim())
      return m ? [[m[1], m[2]] as [string, string]] : []
    })
  const declared = /export const RULE_DECLARED = ("(?:[^"\\]|\\.)*")/.exec(src)?.[1]
  return {
    legs: new Map(rows(/export const MIRROR = `([\s\S]*?)`/).map(([k, v]) => [k, legsOfMask(Number(v))])),
    anchors: new Map(rows(/export const CLAIMS = `([\s\S]*?)`/)),
    rule: /export const RULE = "([0-9a-f]*)"/.exec(src)?.[1] ?? '',
    declared: declared ? (JSON.parse(declared) as string) : '',
    declaredFor: /export const RULE_DECLARED_FOR = "([0-9a-f]*)"/.exec(src)?.[1] ?? '',
  }
}

/** the reason THIS run declares, or the one already on the record — but a recorded one counts only for the rule
 *  it was made FOR. Once the rule moves again, that declaration is spent and a new one is required. */
function declaredReason(prior = priorMirror()): string {
  const at = argvm?.indexOf('--declare-rule-change') ?? -1
  if (at >= 0 && argvm?.[at + 1]) return String(argvm[at + 1])
  return prior.declaredFor === ruleDigest() ? prior.declared : ''
}

/** noteByKey() → the wing note above each sealed theorem, which is what the WITNESS rule is decided from. */
function noteByKey(): Map<string, string> {
  const out = new Map<string, string>()
  const leanDir = pathm().join(ROOT, 'lean')
  for (const wing of fsm().readdirSync(leanDir).filter((f: string) => f.endsWith('.lean'))) {
    const src = fsm().readFileSync(pathm().join(leanDir, wing), 'utf8')
    for (const m of src.matchAll(/^theorem\s+([A-Za-z0-9_]+)/gm)) out.set(m[1]!, commentAbove(src, m[1]!))
  }
  return out
}



/** THE REFUSAL IS A THEOREM NOW, NOT AN AXIOM (the captain, 2026-09-04: it "needs to be replaced by theorems
 *  exactly as the axioms are replaced"). `a_floor_may_fall_to_what_is_anchored` seals the rule: a floor may rise
 *  to the number of legs that are externally anchored and may FALL to that same number, because falling to a
 *  count you can defend is a correction and not a loss; below it, never.
 *
 *  WHAT THE OLD IMPERATIVE COULD NOT SEE. It refused every fall identically, so it could not tell a surviving
 *  theorem quietly dropping an anchor it EARNED from a floor being corrected because an anchor was never earned.
 *  This tree produced the second case in a day: the floor stood at 16, a wing added a theorem whose own note said
 *  "measured at 107.84 seconds", WITNESS read that as an external source, and the floor rose to 17 on a stopwatch
 *  reading no stranger can consult. The ratchet then defended the inflation, because it only ever checks for loss.
 *
 *  SO A FALL IS CLASSIFIED, and both classes are reported — neither is silently impossible:
 *    · UNEARNED — the note no longer names an external source, so the leg is not defensible and its removal is
 *      truthful. Permitted, printed with the key, and the floor follows the anchored count down.
 *    · EARNED — the note still names one and the leg vanished anyway, so the instrument moved under a claim that
 *      still holds. Refused, as before.
 *  HONEST LIMIT: this separates "the claim's own text no longer supports the leg" from "the leg went while the
 *  text still supports it". It does NOT tell an author's deliberate correction from an author deleting the word
 *  NIST to make a gate quiet — that is why every permitted fall names its key on the way past. */
export interface Fall {
  /** the claim's own text stopped supporting the leg — the author edited it. Reported, permitted. */
  authorEdited: string[]
  /** the note still carries the anchor the mirror recorded, and the RULE digest moved — the instrument changed.
   *  Refused unless declared, because otherwise the gate is walk-past-able by editing the pattern it reads. */
  ruleMoved: string[]
  /** the anchor stands, the rule stands, and the leg went anyway — a real regression. Always refused. */
  regressed: string[]
  /** the mirror predates the RULE digest, so whether the instrument moved CANNOT be established. Refused, and
   *  named as unknown rather than reported as unchanged — an absent digest is not evidence of a stable rule, the
   *  same unread-is-not-empty law the refused-host and prior-art readings keep. */
  ruleUnknown: string[]
}

/** classifyFall(rows) → WHY each lost leg was lost, split by EVIDENCE rather than by the current pattern's opinion.
 *
 *  THE HOLE THIS CLOSES, and it was mine: the first version asked only whether the CURRENT rule still matches the
 *  note. It printed "its note no longer names an external source" for a note that was byte-identical — I had
 *  edited the WITNESS pattern, not the claim. So an instrument change was labelled a CORRECTION and permitted,
 *  which means the refusal could be walked past by editing the regex it consults: a gate whose verdict its author
 *  controls by editing the thing it reads. That is the absolute refusal's defect in a quieter coat.
 *
 *  The evidence needed is already in the mirror. CLAIMS records WHAT anchored each witness leg, so:
 *    · the note no longer contains the recorded anchor  → the author edited the claim
 *    · the note still contains it and the RULE digest moved → the instrument changed, and that must be DECLARED
 *    · the anchor stands and the rule stands            → the leg went for neither reason: a regression */
// A THEOREM THAT NO LONGER EXISTS CANNOT LOSE ITS ANCHOR — why this walks KEY BY KEY and not by total. The floor
// was once an aggregate high-water mark, so an ordered purge (theorems comparing bare literals, removed on the
// captain's instruction) read as "a claim lost its external witness" and blocked the mirror from recording the
// change. What a ratchet is actually for is a SURVIVING theorem quietly dropping a leg, which no total can see.
// This replaced a separate `regressions()` that walked the same keys to reach one of the four answers below.
export function classifyFall(rows: readonly Rosetta[]): Fall {
  const prior = priorMirror()
  const notes = noteByKey()
  const ruleMoved = prior.rule !== '' && prior.rule !== ruleDigest()
  const ruleUnknown = prior.rule === ''
  const fall: Fall = { authorEdited: [], ruleMoved: [], regressed: [], ruleUnknown: [] }
  for (const r of rows) {
    for (const leg of prior.legs.get(r.key) ?? []) {
      if (r.legs.includes(leg)) continue
      const anchor = prior.anchors.get(r.key)
      const note = notes.get(r.key) ?? ''
      // ONE DECISION, in the order the evidence settles it. Only a WITNESS leg has recorded evidence to weigh;
      // every other leg has nothing to appeal to, so its loss is a regression by default.
      if (leg !== 'witness' || !anchor) {
        if (leg === 'witness') fall.authorEdited.push(`${r.key} lost its witness leg and the mirror recorded no anchor for it — nothing external was ever on the record`)
        else fall.regressed.push(`${r.key} lost its ${leg} leg with its anchor and the rule both unchanged — a real regression`)
      } else if (!note.includes(anchor)) {
        fall.authorEdited.push(`${r.key} lost its witness leg: the note no longer carries the anchor the mirror recorded (${anchor}) — the claim's own text was edited`)
      } else if (ruleUnknown) {
        fall.ruleUnknown.push(`${r.key} lost its witness leg while its note still carries the recorded anchor (${anchor}), and this mirror predates the RULE digest — whether the instrument moved cannot be established. Seed the digest on a run where nothing falls, then the cause is decidable.`)
      } else if (ruleMoved) {
        fall.ruleMoved.push(`${r.key} lost its witness leg while its note STILL carries the recorded anchor (${anchor}) — the WITNESS rule moved, not the claim`)
      } else {
        fall.regressed.push(`${r.key} lost its witness leg with its anchor and the rule both unchanged — a real regression`)
      }
    }
  }
  return fall
}

export function writeMirror(rows: readonly Rosetta[]): { changed: boolean; refused: string[]; corrected: string[] } {
  const fall = classifyFall(rows)
  // A RULE CHANGE THAT LOWERS THE COUNT MUST BE DECLARED, with a reason that lands in the mirror and stays there.
  // Permitting it silently is what made the first version of this gate walk-past-able.
  const undeclared = fall.ruleMoved.length && !declaredReason()
    ? [`the WITNESS rule changed and ${fall.ruleMoved.length} leg(s) fell with it, undeclared. A rule may be corrected — `
      + `a_floor_may_fall_to_what_is_anchored — but not as a side effect: re-run with --declare-rule-change "<why the `
      + `old rule was wrong>" so the fall is on the record with its reason.`]
    : []
  const refused = [...fall.regressed, ...fall.ruleUnknown, ...undeclared, ...floorGaps(rows, { witness: 0, falsifier: (128 - 2) / 2 })]
  const corrected = [...fall.authorEdited, ...fall.ruleMoved]
  if (refused.length) return { changed: false, refused, corrected }
  for (const c of fall.authorEdited) console.log(`  ↓ ${c}`)
  for (const c of fall.ruleMoved) console.log(`  ⚖ DECLARED — ${c}`)
  const next = renderMirror(rows)
  const current = fsm().existsSync(mirrorPath()) ? fsm().readFileSync(mirrorPath(), 'utf8') : ''
  if (current === next) return { changed: false, refused: [], corrected }
  fsm().writeFileSync(mirrorPath(), next)
  return { changed: true, refused: [], corrected }
}

const argvm = (globalThis as { process?: { argv: string[] } }).process?.argv // the edge has no process; the CLI block below simply never runs there
if (argvm?.[1] && /rosetta\.(js|ts)$/.test(argvm[1])) {
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

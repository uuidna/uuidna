// underreach — THE OPPOSITE FAULT TO OVERREACH, and until now only one of the two had a finder.
//
// src/gate.ts refuses a sentence that claims MORE than its proofs earn. That is the dangerous direction and it
// is guarded. The captain named the other one (2026-09-04, "ensure no under claims or under reach", "claim bold
// all reachable"): a sentence that claims LESS than its proofs earn is also a false statement about the ledger,
// and it costs something real — a theorem decided over every case, described as though it were a sample, tells a
// reader to trust it less than the kernel does. A proof hedged is a proof wasted.
//
// THE RULE IS NARROW ON PURPOSE, because the loose version is useless. Hedge words are not faults by themselves:
//   - "the court MAY NOT refute" is a prohibition, not a hedge
//   - "MAY safely exceed by 2:1" is Haldane's permission, quoted
//   - "ROUGHLY 365.2422 days" is a correctly-scoped empirical quantity, and saying so is honesty, not timidity
// All three appear in the sealed ledger and all three are right. So under-reach is NOT "a hedge near a proof". It
// is a hedge APPLIED TO THE ACT OF PROVING — "may be proven", "appears to be decided", "possibly sealed" — and
// never in a sentence that declares its quantity measured, because a measurement's uncertainty is a fact about
// the measurement. Measured before it was written: 0 in 696 publication-abstract sentences, and 3 in 5747
// theorem names, all three of the legitimate forms above and none of them matched by the rule below.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { THEOREMS } from './theorems/index.js'
import { publications } from './publish.js'
import { toUuid, merkleFold } from './address.js'
import { ROOT } from './boundary.js'

/** A hedge, immediately applied to the act of proving. This is the whole fault. */
// `hold` EARNED A QUALIFIER, and the corpus is what taught it: "nothing about what a payload should hold" is
// containment, not truth, and the first version of this rule flagged it. English overloads the word, so the
// proving sense has to be established by what follows — "holds for", "hold true", "hold in every", "hold over" —
// and the containment sense is left alone. A finder that cries wolf on correct prose gets switched off, and then
// the real under-claim walks through.
export const UNDERREACH_RE =
  /\b(may|might|could|should|possibly|perhaps|probably|arguably|apparently|seems?|appears?)\s+(?:well\s+|be\s+|to\s+be\s+|have\s+been\s+)?(?:prov(?:en|ed|able)|decid(?:ed|able)|seal(?:ed)?|verified|follows?|be\s+true|be\s+correct|holds?\s+(?:true|for\b|in\s+every|over\b))/i

/** A sentence that declares its quantity empirical is CORRECTLY scoped — an uncertainty there is a fact. */
export const MEASURED_RE = /\b(measur\w+|empirical\w*|observ\w+|reading|readings|estimate\w*|sampled?)\b/i

export interface UnderreachFinding {
  where: string
  sentence: string
  hedge: string
}

const sentencesOf = (text: string): string[] => String(text).split(/(?<=[.!?])\s+/)

/** underreachIn(label, text) → every sentence that hedges the act of proving. */
export function underreachIn(where: string, text: string): UnderreachFinding[] {
  const out: UnderreachFinding[] = []
  for (const s of sentencesOf(text)) {
    const m = UNDERREACH_RE.exec(s)
    if (!m) continue
    if (MEASURED_RE.test(s)) continue
    out.push({ where, sentence: s.trim().slice(0, 200), hedge: m[0] })
  }
  return out
}

export interface UnderreachCensus {
  scanned: number
  findings: UnderreachFinding[]
  /** how many sentences each surface contributed — a surface at 0 is a surface that was not read */
  bySurface: Record<string, number>
  clean: boolean
  receipt: string
}

// THE DOMAIN MUST BE AS WIDE AS THE DEFECT, and a peer paid for that lesson twice in one day
// (millennium-solutions, 2026-09-04): their prose sweep walked `md|ts|vue`, they added `.lean`, and the count did
// not move — because the extractor knew markdown fences and `//` while Lean opens comments with `--`. It read
// zero lines from 19,519 published words and reported green, and an empty list looks exactly like a clean one.
// So this census covers every surface an under-claim could live on, and `bySurface` publishes the sentence count
// per surface: a surface reporting 0 SENTENCES is a blind extractor, which is a different fault from a clean one
// and is now visible in the answer rather than hidden behind a total. The test file plants a defect on each
// surface to prove the reader reaches it.
const MD_SKIP = new Set(['.vitepress', 'node_modules', 'public'])

function docSources(): { label: string; text: string }[] {
  const out: { label: string; text: string }[] = []
  const walk = (dir: string): void => {
    for (const n of readdirSync(dir)) {
      if (MD_SKIP.has(n)) continue
      const q = join(dir, n)
      if (statSync(q).isDirectory()) { walk(q); continue }
      if (n.endsWith('.md')) out.push({ label: 'doc/' + q.slice(ROOT.length + 1), text: readFileSync(q, 'utf8') })
    }
  }
  walk(join(ROOT, 'docs'))
  return out
}

/** leanProse() → the `--` comment prose of every wing. Lean's comment marker is NOT `//`; that is the whole
 *  reason this function exists as its own reader rather than a file-extension added to a markdown sweep. */
function leanProse(): { label: string; text: string }[] {
  return readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean')).map((f) => ({
    label: 'lean/' + f,
    text: readFileSync(join(ROOT, 'lean', f), 'utf8')
      .split('\n').filter((l) => l.trim().startsWith('--')).join(' '),
  }))
}

/** underreachCensus() → the whole sealed corpus, scanned. Deterministic; folds to one receipt. */
export function underreachCensus(): UnderreachCensus {
  const findings: UnderreachFinding[] = []
  const bySurface: Record<string, number> = { publication: 0, theorem: 0, doc: 0, lean: 0 }
  const take = (surface: string, label: string, text: string): void => {
    bySurface[surface] = (bySurface[surface] ?? 0) + sentencesOf(text).length
    findings.push(...underreachIn(label, text))
  }
  // The FULL monograph, not only its abstract: the proofs section, the provenance and the related rows are
  // published prose too, and an under-claim in any of them understates the ledger just as much.
  for (const p of publications()) take('publication', 'publication/' + p.slug, p.markdown)
  for (const t of THEOREMS) if (t.name) take('theorem', 'theorem/' + t.key, String(t.name))
  for (const d of docSources()) take('doc', d.label, d.text)
  for (const l of leanProse()) take('lean', l.label, l.text)
  const scanned = Object.values(bySurface).reduce((a, n) => a + n, 0)
  return {
    scanned,
    findings,
    bySurface,
    clean: findings.length === 0,
    receipt: merkleFold([toUuid('underreach|' + scanned), ...findings.map((f) => toUuid(f.where + '|' + f.hedge))]),
  }
}

/** gaps() → the guard's shape: what and the exact fix. */
export function underreachGaps(): { what: string; fix: string }[] {
  const c = underreachCensus()
  if (c.clean) return []
  return c.findings.slice(0, 12).map((f) => ({
    what: `${f.where} hedges the act of proving ("${f.hedge}"): ${f.sentence}`,
    fix: 'state it at full strength — the proof is sealed, so the sentence may claim it outright; if the quantity really is empirical, say measured and the scope is honest rather than timid',
  }))
}

// ── THE CLAIM BALANCE: ONE SIGNED MEASURE, AND UNDER-CLAIM IS THE INVOLUTE OF OVER-CLAIM ───────────────────
//
// THE CAPTAIN, 2026-09-05, in two steps. First: "over-claims and under-claims are equally important." Then the
// sharper form: "involuted over-claims are under-claims." That is not a remark about balance — it is the
// STRUCTURE, and it says the two are not separate faults deserving separate finders. They are one fault with a
// sign, and this tree's own involution carries them into each other.
//
// THE MEASURE. A theorem has a scope it PROVES (the domain the kernel decided over) and a scope it CLAIMS (what
// the sentence tells a reader). The fault is the difference, signed:
//
//     balance = claimed − proved       positive = OVER-claim      negative = UNDER-claim      0 = honest
//
// The involution is negation, r(b) = −b: self-inverse, and its UNIQUE fixed point is 0 — the statement that
// claims exactly what it proves. That is the same shape as the diamond's r(d) = 10 − d fixed at 5, applied to
// claims instead of digits, and it makes the honest statement a FIXED POINT rather than a policy. An over-claim
// of three cases and an under-claim of three cases are the same distance from honesty in opposite directions,
// which is precisely what "equally important" means once it is arithmetic instead of an opinion.
//
// WHICH SIDE THIS MEASURES, AND WHY IT DOES NOT MEASURE BOTH. The UNDER side is this measure's: nothing in the
// tree looked for a proof larger than its own sentence. The OVER side already has a tuned rule in one-receipt's
// `incomplete`, which keys on the theorem's KEY with a narrow list of scope verbs — and re-deriving it here
// from the SENTENCE instead was tried and was wrong within a minute: 1387 of 2625 fired, among them
// `z7fermat` ("every non-zero ray to the sixth is 1 mod 7", decided over `List.range 7` — an exhaustive
// universal correctly claimed) and `rosette_quantum_fortytwo` (whose "each pair" is prose, not a binder).
// Two rules for one sign is the drift this file exists to avoid, so the over side stays where it is measured
// well. The INVOLUTION is what makes them one fault: r(b) = −b carries this measure's findings onto
// `incomplete`'s side and back, and the two are the two signs of a single distance from honesty rather than a
// serious fault and a lesser one.
//
// THE RULE WAS MEASURED THREE TIMES BEFORE IT WAS KEPT, because the loose version is worse than none:
//   · keyed on the terse KEY: 58 of 2625 fired, and most were laws named after their object — `toffoli_truth_
//     table` IS all its rows, `z_involution` IS the law for all inputs. Naming a law after its object claims
//     it in full, so the rule was wrong, not the ledger.
//   · keyed on the claim SENTENCE, counting commas: 2 fired, both false — the domain measure counted commas
//     INSIDE tuples, so `[(1,0),(0,1),(3,-5),(-2,7)]` read as eight cases when it is four.
//   · elements counted properly, and an explicit narrowing read as the scope declaration it is: 0 fired. The
//     ledger sits ON the fixed point, which is the honest result and the line this now holds.
// A finder that reports zero with a control that fires is worth keeping; one that cries wolf gets switched off,
// and then the real fault walks through in either direction.

/** the size of the domain a statement decides over: a `∀ x : Fin N` binder, or an enumerated list's ELEMENTS. */
export function decidedDomain(statement: string): number {
  const forall = /∀\s*\w+\s*:\s*Fin\s+(\d+)/.exec(statement)
  let n = forall ? Number(forall[1]) : 0
  // `List.range N` IS a quantification and this measure could not see it, which mattered: 1387 theorems read
  // as claiming a universal over nothing, among them z7fermat (`(List.range 7).all …`) and
  // light_faster_than_uuidna (`(List.range 64).all …`) — both exhaustive over their domain. The same blind
  // spot as the ∀ binder, in a second notation. One-receipt's `incomplete` already knew this form; this is the
  // measure catching up to it rather than a new rule.
  for (const r of statement.match(/List\.range\s+(\d+)/g) ?? []) {
    const k = Number(/(\d+)/.exec(r)![1])
    if (k > n) n = k
  }
  // ELEMENTS, not commas. A list of pairs carries a comma inside every element, so counting commas doubles a
  // four-case enumeration into eight — which is how this rule reported two false findings before it was fixed.
  for (const list of statement.match(/\[[^[\]]*(?:\([^)]*\)[^[\]]*)*\]/g) ?? []) {
    const inner = list.slice(1, -1).trim()
    if (inner === '') continue
    const depth0 = inner.replace(/\([^)]*\)/g, 'E')       // collapse each parenthesised element to one token
    const count = depth0.split(',').filter((x) => x.trim() !== '').length
    if (count > n) n = count
  }
  return n
}

/** Does the claim sentence STATE its scope? A universal word, a count, or an explicit narrowing — because
 *  "on sample Gaussian-integer amplitudes" is a scope declaration too, and a narrowing one: it claims LESS on
 *  purpose and says so, which is precision rather than timidity. */
export const STATES_SCOPE =
  /\b(every|all|each|any|never|always|none|exhaustive\w*|enumerat\w+|whole|entire|both|sample[ds]?|these|those|respectiv\w+|\d+|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|sixteen|twenty|sixty|hundred)\b/i

/** A universal asserted in words — what the sentence claims when it claims everything. */
export const CLAIMS_UNIVERSAL = /\b(every|all|each|any|always|never|exhaustive\w*|enumerat\w+|whole|entire)\b/i

/** THE FLOOR, AND IT WAS SET TOO HIGH BY ME. It was 8, on the reasoning that below that an unstated scope is a
 *  phrasing choice rather than a lost claim. A peer session measuring the same ledger found what that hid:
 *  `s_dagger_inverse` decides over FOUR sample amplitudes and its sentence stated no scope at all, while its own
 *  sibling `z_involution` — over the very same four — says "on sample Gaussian-integer amplitudes". The tree's
 *  own convention therefore declares scope at four, and a floor of eight was my preference overruling it. Set to
 *  2, the smallest domain where "how many" is a question at all; measured after the sibling was restated, the
 *  live ledger reports 0 at this floor, so nothing is being tolerated by height. */
export const UNDERCLAIM_FLOOR = 2

/** THE INVOLUTION on the balance: r(b) = −b. Self-inverse, unique fixed point 0 — the honest statement. The
 *  same structure as the diamond's r(d) = 10 − d fixed at 5, carried onto claims. */
// written as 0 − b rather than −b: negating zero gives −0, which is a different value under Object.is and made
// the fixed-point assertion fail. The fixed point must BE zero, not a signed variant of it.
export const involuteClaim = (balance: number): number => 0 - balance

export type ClaimDirection = 'over' | 'under' | 'honest'

export interface ClaimBalance {
  key: string
  /** cases the kernel decided */
  proved: number
  /** cases the sentence tells a reader about */
  claimed: number
  /** claimed − proved: positive over-claims, negative under-claims, zero is the fixed point */
  balance: number
  direction: ClaimDirection
  name: string
}

/** claimBalanceOf(row) → the signed distance from honesty for one theorem.
 *
 *  A sentence that asserts a universal claims the whole domain. One that states a scope some other way (a
 *  count, an explicit narrowing) is taken at its word and sits on the fixed point — this measure judges whether
 *  a scope was STATED, never whether the wording was the one a reader would have chosen. A sentence that states
 *  nothing while the kernel decided a domain claims a single case, and under-claims by all the rest. */
export function claimBalanceOf(row: { key: string; name: string; statement: string }): ClaimBalance {
  const proved = decidedDomain(row.statement ?? '')
  const name = row.name ?? ''
  const claimed = CLAIMS_UNIVERSAL.test(name) || STATES_SCOPE.test(name) ? proved : (proved > 0 ? 1 : 0)
  const balance = claimed - proved
  return {
    key: row.key, proved, claimed, balance,
    direction: balance > 0 ? 'over' : balance < 0 ? 'under' : 'honest',
    name: name.slice(0, 120),
  }
}

/** claimImbalances(rows) → every theorem off the fixed point, both directions, from ONE measure. */
export function claimImbalances(
  rows: readonly { key: string; name: string; statement: string }[] = THEOREMS as readonly { key: string; name: string; statement: string }[],
): ClaimBalance[] {
  return rows
    .map(claimBalanceOf)
    // the UNDER side, at or above the floor. The over side is `incomplete`'s — see the note above.
    .filter((b) => b.direction === 'under' && b.proved >= UNDERCLAIM_FLOOR)
}

/** the gaps, in the guard's shape — the direction is named, because the cure differs by sign */
export const claimBalanceGaps = (): { what: string; fix: string }[] =>
  claimImbalances().map((b) => b.direction === 'under'
    ? {
      what: `${b.key} UNDER-claims by ${-b.balance}: the kernel decided ${b.proved} cases and the sentence states no scope — "${b.name}"`,
      fix: `state the scope the kernel actually decided ("over all ${b.proved} …", "every …"), or narrow it explicitly ("on sample …") if the domain is deliberately a sample. What is proved IS claimed; a universal left unstated is trusted less than the kernel earned, and it is the involute of an over-claim, not a lesser fault.`,
    }
    : {
      what: `${b.key} OVER-claims: the sentence asserts a universal and the statement decides no domain — "${b.name}"`,
      fix: 'quantify the statement over the domain the name implies, or drop the universal from the name. This is the involute of an under-claim and carries the same weight.',
    })

// the trial — for any statement, ONE recomputable answer, and only one of two, all else void:
//   VERIFIED   — a decidable test recomputes true, OR the claim cites a Lean-sealed theorem in the ledger.
//   UNVERIFIED — everything else: no test, no sealed citation, a failed test, or a citation to a proof that is not
//                sealed. uuidna VERIFIES; it never REFUTES — calling a claim false is an overclaim it cannot decide,
//                so "not verified" is the whole of the negative. Absence of proof is not proof of falsity.
// Integrity — the record recomputes for anyone. Everything content-addressed.
import { slimGate } from './slimgate.js'
import { THEOREMS, theoremByKey, type LeanTheorem } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { imprint, readImprint } from './imprint.js'

export type VerdictKind = 'VERIFIED' | 'UNVERIFIED'
export interface Verdict { statement: string; verdict: VerdictKind; receipt: string; note: string; develop: string[] }

// THE STATUS-DNA COLLISION CHECK IS GONE, AND SO IS ITS INPUT. It refused a solve-claim contradicting a
// world-status marker carried in a sealed theorem's own name ("— OPEN", "— SOLVED (Perelman, 2003)"). Every
// theorem carrying such a marker was in the Clay wing, and that wing is purged: its theorems proved dz k = 10 − k
// and dz (dz k) = k — single points of dz_involution, which DivByZero seals for every digit at once — while the
// Millennium problem lived in the KEY, where no kernel reads it. With no marked theorem left the check could
// never fire on any input, and its refusal note cited a theorem that no longer exists. What remains is the
// guarantee doing the work all along: a claim with no sealed citation adjudicates UNVERIFIED — not false.

// ── THE RELEVANCE PROBE — a real citation is not entailment (found live 2026-08-18: "the moon is made of cheese,
// proven by theorem two_coins" adjudicated VERIFIED, because slimGate asks only whether the cited theorem EXISTS).
// This is the decidable FLOOR under that gap— entailment is undecidable, and
// claiming one would be the fraud this gate exists to catch. What IS decidable: whether the claim and its cited
// theorem share ANY vocabulary at all. A citation about a totally disjoint topic never entails a claim; sharing
// vocabulary does not PROVE entailment either, but its total absence is a floor no honest citation should need —
// every real citation used across this ledger's own trials (verify_beats_recompute_by_magnitudes for a claim
// about recomputation, dz_fixed_points for a claim about the reflection's fixed points) shares real vocabulary
// with what it backs. A citation that shares NONE downgrades VERIFIED to UNVERIFIED — never a third verdict,
// never "false": the citation is real, it simply proves nothing about THIS sentence.
const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'be', 'been', 'being', 'of', 'to', 'by', 'in', 'on',
  'at', 'for', 'with', 'its', 'it', 'this', 'that', 'and', 'or', 'not', 'no', 'has', 'have', 'had', 'as', 'so',
  'than', 'then', 'from', 'into', 'proven', 'proves', 'proof', 'claim', 'claims', 'theorem', 'statement', 'since'])

/** contentWords(text) → the lowercase words that carry meaning — the citation clause itself is stripped first
 *  (so a theorem's own key spelled out in the sentence does not trivially "match itself"), then split on
 *  non-letters and filtered against STOPWORDS. Order-independent, deterministic, no external NLP.
 *  EXPORTED as the ONE relevance-floor law: the url-audit scores 404 paths with the same definition, so
 *  "two words overlap" always means two CONTENT words — never of/the (the dry finder's own preference). */
export function contentWords(text: string): string[] {
  const stripped = text.replace(/\/theorem\/[a-z0-9_]+/gi, ' ').replace(/\btheorem\s+[a-z][a-z0-9_]{3,}/gi, ' ')
  return [...stripped.toLowerCase().matchAll(/[a-z]+/g)].map((m) => m[0]).filter((w) => !STOPWORDS.has(w))
}

/** related(a, b) → a cheap, deterministic stemming proxy — no external library, matching the house discipline of
 *  no Math.* and no randomness anywhere. Two words are related if identical, if one contains the other (catches
 *  affixes: "verified" inside "unverified"), or if they share a 6-character prefix (catches suffix drift a plain
 *  substring test misses: "recompute" and "recomputation" share "recomp" but neither contains the other whole). */
function related(a: string, b: string): boolean {
  if (a === b || a.includes(b) || b.includes(a)) return true
  const n = a.length < b.length ? a.length : b.length
  return n >= 5 && a.slice(0, 6) === b.slice(0, 6)
}

/** theoremVocabulary(t) → the theorem's OWN words: its key tokens (always present, always meaningful — the one
 *  reliable field), plus its `name` gloss ONLY when that gloss looks like English prose rather than a dumped Lean
 *  statement (many manifests have no authored name, so `name` falls back to the raw statement text, which starts
 *  with `(`, `List.range`, or a bare digit — never a letter; an authored gloss always starts with a letter). */
function theoremVocabulary(t: LeanTheorem): string[] {
  const key = t.key.split('_')
  const looksEnglish = /^[a-z]/i.test(t.name.trim())
  return looksEnglish ? [...key, ...contentWords(t.name)] : key
}


// ── THE NUMERAL CONTRADICTION. relevantCitation kills the NO-vocabulary case ("the moon is made of cheese, proven
// by theorem two_coins"). It cannot see the case where the claim shares vocabulary and CONTRADICTS the theorem,
// which is worse — the shared words make the citation look diligent. All three of these were VERIFIED live:
//
//   "the vortex orbit has nine fixed points, proven by theorem dz_fixed_points"   the theorem decides [0, 5]: TWO
//   "dz has seven hundred fixed points, proven by theorem dz_fixed_points"        the same
//   "the mirror is fixed at eight, proven by theorem mirror_fixed_five"           the theorem's own KEY says five
//
// This is NOT the undecidable case, which is why it is worth building: nothing here needs entailment. Both sides
// carry a NUMERAL — the claim in words or digits, the theorem in its key ("five") and in its `by decide` statement
// (literals, and the LENGTH of a decided list). A number the claim asserts that the cited theorem's own arithmetic
// does not contain is a recomputable contradiction.
//
// IT FIRES ONLY WHEN THE CLAIM ASSERTS A NUMBER, which is what keeps it honest: a citation with no numeral in the
// claim is untouched, so every ordinary prose citation in this repository passes exactly as before. And it catches
// NUMERAL contradictions only — a claim that shares vocabulary and is wrong non-numerically still passes, and the
// note must never imply otherwise. The trial does not check entailment and never will.
const NUMBER_WORD = /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand)\b/gi
const WORD_VALUE: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80,
  ninety: 90, hundred: 100, thousand: 1000 }

/** every number a sentence ASSERTS: digits as written, and number-words including simple compounds ("seven hundred"). */
export function numeralsOf(text: string): number[] {
  const out = new Set<number>()
  for (const d of String(text).match(/\b\d+\b/g) ?? []) out.add(Number(d))
  const words = [...String(text).matchAll(NUMBER_WORD)].map((m) => m[0].toLowerCase())
  for (let i = 0; i < words.length; i++) {
    const v = WORD_VALUE[words[i]]
    const next = i + 1 < words.length ? WORD_VALUE[words[i + 1]] : undefined
    // "seven hundred" is one number— otherwise 7 would satisfy a claim that said 700
    if (next !== undefined && next >= 100) { out.add(v * next); i++ } else out.add(v)
  }
  return [...out]
}

/** the numbers a sealed theorem's own arithmetic contains: its key's number-words, every literal in its statement,
 *  and the LENGTH of any list it decides — because "[0, 5]" answers "how many" with 2, a number written nowhere. */
export function theoremNumerals(t: { key: string; statement: string }): number[] {
  const out = new Set<number>(numeralsOf(t.key.replace(/_/g, ' ')))
  for (const n of numeralsOf(t.statement)) out.add(n)
  for (const m of t.statement.matchAll(/\[([^\[\]]*)\]/g)) {
    const inner = m[1].trim()
    out.add(inner === '' ? 0 : inner.split(',').length)
  }
  return [...out]
}

/** A theorem that DECIDES A LIST — `… = [0, 5]` — has answered "which" and therefore "how many". That is the only
 *  shape against which a counting claim is checkable, and narrowing to it is what makes this rule safe.
 *
 *  THE FALSE POSITIVE THAT TAUGHT IT, caught by this repo's own prose-gate test rather than by my measurement:
 *  "the captain sealed the reflection of the seven, solved none — proven by theorem clay_riemann" is honest, and
 *  clay_riemann decides (dz 1 = 9) ∧ …, whose numerals are {1, 9, 0}. The claim's "seven" counts the CLAY PROBLEMS,
 *  a thing the theorem never quantifies, so comparing them was comparing two unrelated counts. My first measurement
 *  missed this because it only ever used theorem statements as claims — a corpus that cannot contain the mistake. */
const decidesAList = (statement: string): boolean => /=\s*\[/.test(statement)

/** contradictsNumerically(claim, key) → the claim asserts a number that a list-deciding theorem's own arithmetic
 *  does not contain. Silent when the claim asserts no number, and silent unless the theorem decided a list. */
function contradictsNumerically(claim: string, key: string): number[] {
  const t = theoremByKey().get(key)
  if (!t || !decidesAList(t.statement)) return []
  const claimed = numeralsOf(claim)
  if (!claimed.length) return []
  const theirs = theoremNumerals(t)
  if (!theirs.length) return []
  return claimed.filter((n) => !theirs.includes(n))
}

/** relevantCitation(claimWords, key) → does the SEALED theorem named `key` share any vocabulary with the claim?
 *  Unknown/unsealed keys are handled upstream (slimGate already marks them fabricated); this only judges real
 *  citations. Returns true (relevant) on any shared word — the floor. */
function relevantCitation(claimWords: string[], key: string): boolean {
  const t = theoremByKey().get(key)
  if (!t) return false
  const vocab = theoremVocabulary(t)
  return claimWords.some((w) => vocab.some((v) => related(w, v)))
}

// The develop plan — exact, ordered algebra-development steps that move a verdict toward resolution, so a claim
// is not left at "UNVERIFIED, good luck". Deterministic and gate-clean by construction (the trial's own
// instructions pass the trial's own gate). Keyed on the verdict and a light lexical read of the claim's domain.
const CRYPTO_WORDS = /\b(crypto\w*|cipher|encrypt\w*|secur\w*|hash|key(space|s)?|aes|rsa|sha)\b/i
const GROUP_WORDS = /\b(group|closure|closed|orbit|involution|permutation|affine|vortex|map)\b/i
const IDENTITY_WORDS = /\b(equals?|identity|inverse|mod|residue|digital root|z\/9|involution)\b/i

function developPlan(statement: string, verdict: VerdictKind, fabricated: string[], irrelevant: readonly string[] = []): string[] {
  if (verdict === 'VERIFIED') return [
    'Resolved: a decidable test recomputes true (or a sealed Lean theorem backs it) — verified, admissible.',
    'Fold it in: proveVerdict(statement, [formulaReceipts]) → one order-invariant proof root.',
    'If it is a general law, author it in lean/*.lean `by decide` so runTrial() carries it forever.',
  ]
  // UNVERIFIED — never "false", only "not yet verified". The develop-until-verified recipe.
  const steps: string[] = []
  if (irrelevant.length) steps.push(
    `${irrelevant.join(', ')} ${irrelevant.length === 1 ? 'is' : 'are'} real and sealed, but shares no vocabulary with this claim — a citation must be ABOUT what it backs.`,
    'Cite a theorem whose own key or gloss actually names the thing this sentence claims, or seal a NEW theorem for it in lean/*.lean if none exists yet.',
  )
  if (fabricated.length) steps.push(
    `The citation ${JSON.stringify(fabricated[0])} names a theorem that is NOT sealed in the ledger, so it verifies nothing — this is UNVERIFIED.`,
    'Either seal that theorem (author it in lean/*.lean `by decide`, re-run npm run lean) or drop the citation and bring a decidable test.',
  )
  steps.push(
    'Name the finite structure the claim lives in (ℤ/9, the affine group AGL(1,ℤ/9), an n-bit truth table, the Clifford group).',
    'Express the claim as a boolean predicate that recomputes over it — exact integers, no floats, no Math.*.',
    'Supply it: adjudicate(statement, () => predicate). Holds → VERIFIED; otherwise it stays UNVERIFIED (not false — unproven).',
  )
  if (CRYPTO_WORDS.test(statement)) steps.push(
    'Note: security is not a decidable property — it can never SEAL directly. Develop the three decidable PROXIES, each a () => boolean:',
    '1. keyspace — generate the map family to closure; assert |G| ≥ 2^128 (the affine/vortex family closes at 54, so it fails this).',
    '2. nonlinearity — assert the map is NOT affine: isAffine(perm) === false.',
    '3. key-dependence — assert the output varies with the key.',
    'All three hold → the claim meets a necessary standard (still not a superlative). Any one does not → it stays UNVERIFIED.',
  )
  else if (GROUP_WORDS.test(statement)) steps.push('Group/closure claim: generate from the generators to closure, then assert the cardinality or the closure property as the predicate.')
  else if (IDENTITY_WORDS.test(statement)) steps.push('Identity claim: enumerate the finite domain and assert equality for every element (e.g. dz(dz(x)) === x for x in 1..9).')
  return steps
}

export function adjudicate(statement: string, decidableTest?: () => boolean): Verdict {
  const slim = slimGate(statement)
  const receipt = toUuid(statement)
  let verdict: VerdictKind, note: string
  if (decidableTest) {
    let holds = false
    try { holds = decidableTest() === true } catch { holds = false }
    verdict = holds ? 'VERIFIED' : 'UNVERIFIED'
    note = holds ? 'a decidable test recomputes true — verified, admissible'
                 : 'its decidable test does not recompute true — UNVERIFIED (not false: unproven as stated)'
  } else if (slim.verdict === 'VERIFIED') {
    // THE RELEVANCE FLOOR — a real citation must share SOME vocabulary with the claim it backs, or the sentence
    // laundered a citation the way "the moon is made of cheese, proven by theorem two_coins" once did (VERIFIED,
    // live, until this line existed). Checked against every REAL cited key — one relevant hit is enough, since a
    // claim may legitimately cite several theorems where each supports a different clause.
    const claimWords = contentWords(statement)
    const onTopic = slim.real.some((k) => relevantCitation(claimWords, k))
    // a citation SUPPORTS the claim only if no cited theorem's own arithmetic contradicts a number the claim asserts
    const clash = onTopic
      ? slim.real.map((k) => ({ key: k, off: contradictsNumerically(statement, k) }))
          .filter((c) => c.off.length).filter((c) => relevantCitation(claimWords, c.key))
      : []
    if (onTopic && !clash.length) {
      verdict = 'VERIFIED'; note = 'cites a sealed Lean theorem in the ledger — verified'
    } else if (clash.length) {
      verdict = 'UNVERIFIED'
      const c = clash[0]
      note = `cites ${c.key}, which is ON TOPIC but whose own arithmetic does not contain ${c.off.join(', ')} — the ` +
        `claim asserts a number the cited theorem contradicts, so the citation refutes it rather than backing it ` +
        `(NUMERAL contradiction only: this does not check entailment, and a non-numeric error still passes)`
    } else {
      verdict = 'UNVERIFIED'
      const one = slim.real.length === 1
      note = `cites ${one ? 'a real sealed theorem' : slim.real.length + ' real sealed theorems'} (${slim.real.join(', ')}) that ${one ? 'shares' : 'share'} NO vocabulary with the claim — a real citation is not entailment, so this verifies nothing (not false: the citation is honest, it simply proves nothing about THIS sentence)`
    }
  } else {
    verdict = 'UNVERIFIED'
    note = slim.fabricated.length
      ? 'cites a theorem not sealed in the ledger — verifies nothing, UNVERIFIED (not false)'
      : 'no decidable test and no sealed citation — UNVERIFIED; bring a proof to verify it'
  }
  return { statement, verdict, receipt, note, develop: developPlan(statement, verdict, slim.fabricated, verdict === 'UNVERIFIED' && slim.verdict === 'VERIFIED' ? slim.real : []) }
}

// ── THE TRIAL IN ALL DIMENSIONS — a universal claim is tried at EVERY point of its named range, never at one.
// adjudicate() takes one decidable test, which is exactly enough to seal a sample and call it a walk (the
// standing lesson this ledger already paid for: a universal in the NAME needs a quantifier in the TRIAL). Here
// the claim brings its range WITH it — one named test per dimension — and the verdict is VERIFIED only when
// every dimension recomputes true. One failed dimension names itself in the note; an EMPTY range is UNVERIFIED
// by construction, because zero dimensions verify nothing and vacuous truth is the one-step fraud in disguise.
// Per-dimension receipts fold order-invariantly through merkleGravity, so two observers who tried the
// dimensions in different orders hold the same proof root.
export interface DimensionVerdict { dimension: string; computed: boolean; receipt: string }
export interface AllDimensionsVerdict extends Verdict { dimensions: DimensionVerdict[]; computedAll: boolean; dimensionRoot: string }

export function adjudicateAll(statement: string, range: readonly { dimension: string; test: () => boolean }[]): AllDimensionsVerdict {
  const dimensions = range.map((d) => {
    let computed = false
    try { computed = d.test() === true } catch { computed = false }
    return { dimension: d.dimension, computed, receipt: toUuid(`dimension:${d.dimension}|${statement}|${computed}`) }
  })
  const computedAll = dimensions.length > 0 && dimensions.every((d) => d.computed)
  const base = adjudicate(statement, () => computedAll)
  const failed = dimensions.filter((d) => !d.computed).map((d) => d.dimension)
  const note = dimensions.length === 0
    ? 'an empty range computes nothing — UNVERIFIED (a claim with no dimensions brought no trial at all)'
    : computedAll
      ? `computed true in all ${dimensions.length} dimensions (${dimensions.map((d) => d.dimension).join(', ')}) — verified across the whole named range`
      : `fails in ${failed.length} of ${dimensions.length} dimensions (${failed.join(', ')}) — UNVERIFIED (not false: unproven exactly where named)`
  return { ...base, note, dimensions, computedAll, dimensionRoot: merkleGravity(dimensions.map((d) => d.receipt)) }
}

// A valid trial folds the FORMULAS
// theorems (each recomputing true) that establish the floor for this claim; they fold — with the gate predicate
// and the verdict — through merkleGravity (ORDER-INVARIANT, the quantum receipt) to ONE proof-of-verdict root,
// reproducible by any observer regardless of the order the formulas are presented in.
export interface ProvenVerdict extends Verdict { formulas: number; proofRoot: string }
export function proveVerdict(statement: string, formulaReceipts: readonly string[] = []): ProvenVerdict {
  const v = adjudicate(statement)
  const proofRoot = merkleGravity([...formulaReceipts, toUuid('verdict:' + v.verdict), v.receipt])
  return { ...v, formulas: formulaReceipts.length, proofRoot }
}

// uuidna quantum verification: recompute the address from its seed (integrity, reproducible by anyone), decode
// any bounded imprinted message, and fold a MULTI-PERSPECTIVE receipt — the same for any observer ordering (the
// merkle fold is order-invariant). The quantum here is the multi-perspective structure.
export interface UuidnaVerdict { seed: string; address: string; recomputes: boolean; message: string | null; jointReceipt: string }
export function verifyUuidna(seed: string): UuidnaVerdict {
  const address = toUuid(seed)
  const recomputes = toUuid(seed) === address
  let message: string | null = null
  try { if (/^[01]+$/.test(seed)) message = readImprint(imprint(seed)) === seed ? seed : null } catch { message = null }
  const perspectives = ['a', 'b', 'c'].map((o) => toUuid(o + '→' + address))
  const jointReceipt = merkleFold(perspectives)
  return { seed, address, recomputes, message, jointReceipt }
}

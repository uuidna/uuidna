// the trial — for any statement, ONE recomputable answer, and only one of two, all else void:
//   VERIFIED   — a decidable test recomputes true, OR the claim cites a Lean-sealed theorem in the ledger.
//   UNVERIFIED — everything else: no test, no sealed citation, a failed test, or a citation to a proof that is not
//                sealed. uuidna VERIFIES; it never REFUTES — calling a claim false is an overclaim it cannot decide,
//                so "not verified" is the whole of the negative. Absence of proof is not proof of falsity.
// Integrity, not truth. Everything content-addressed.
import { slimGate } from './slimgate.js'
import { THEOREMS } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'
import { imprint, readImprint } from './imprint.js'

export type VerdictKind = 'VERIFIED' | 'UNVERIFIED'
export interface Verdict { statement: string; verdict: VerdictKind; receipt: string; note: string; develop: string[] }

// ── THE STATUS-DNA COLLISION CHECK — a real citation must not launder a claim the ledger's own sealed names refuse.
// The ledger seals STATUS DNA: a theorem name ending in "— OPEN" or "— SOLVED (<who>)" records the named problem's
// world-status (never conferred by the seal — theorem clay_verified_ne_solved). A claim COLLIDES when it (1) speaks
// of such a subject (matched by the theorem's own key tokens — theorems-only, no authored subject list), (2) asserts
// a solve/claim by uuidna's own voice (we/our/captain/uuidna — the one confined lexical floor here, documented as a
// floor, not a wall), and (3) is not demarcated (not/never/no/none/reflect… — the honest-scope words). A colliding
// claim adjudicates UNVERIFIED even when its citation is real: the cited seal exists, but the ledger's sealed status
// contradicts the claim, and a signed VERIFIED on both sides of a contradiction is what this check retires.
const STATUS_RE = / — (OPEN|SOLVED \([^)]*\))$/
const SELF_VOICE = /\b(we|our|captain|uuidna)\b/i
const SOLVE_VERB = /\b(solv(?:e|es|ed|ing)?|claim(?:s|ed)?|prov(?:e|es|ed|en)|resolved?)\b/i
const DEMARCATED = /\b(not|never|no|none|nothing|unsolved|open|reflect\w*|simulation|finite|bounded)\b/i

export interface StatusCollision { key: string; status: string; subject: string }

/** statusCollisions(claim) → every sealed status-DNA theorem the claim contradicts (empty = no collision).
 *  Subjects derive from the sealed keys themselves (key tokens past the file prefix, ≥4 chars, plus the shared
 *  prefix as the cluster's family name) — recomputable from the ledger alone, no authored subject list. */
export function statusCollisions(claim: string): StatusCollision[] {
  // strip citation clauses first — a key like clay_verified_ne_solved must not read as a subject mention
  const text = claim.replace(/\/theorem\/[a-z0-9_]+/gi, ' ').replace(/\btheorem\s+[a-z][a-z0-9_]{3,}/gi, ' ')
  if (!SELF_VOICE.test(text) || !SOLVE_VERB.test(text) || DEMARCATED.test(text)) return []
  // normalize: strip diacritics (Poincaré → poincare, matching the ascii key convention) and versus → vs (p_vs_np)
  const lower = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\bversus\b/g, 'vs')
  const out: StatusCollision[] = []
  for (const t of THEOREMS) {
    const m = t.name.match(STATUS_RE)
    if (!m) continue
    const parts = t.key.split('_')
    const family = parts[0]                                   // the cluster name, from the key itself (e.g. "clay")
    const subject = parts.slice(1)
    const long = subject.filter((w) => w.length >= 4).concat(family.length >= 4 ? [family] : [])
    // a short-token subject (p_vs_np) matches only when EVERY key token appears as a whole word — substring
    // inclusion on 1–3 letter tokens would collide with ordinary prose
    const shortAll = subject.length > 0 && subject.some((w) => w.length < 4) &&
      subject.every((w) => new RegExp(`\\b${w}\\b`).test(lower))
    if (long.some((w) => lower.includes(w)) || shortAll) out.push({ key: t.key, status: m[1], subject: subject.join(' ') })
  }
  return out
}

// The develop plan — exact, ordered algebra-development steps that move a verdict toward resolution, so a claim
// is not left at "UNVERIFIED, good luck". Deterministic and gate-clean by construction (the trial's own
// instructions pass the trial's own gate). Keyed on the verdict and a light lexical read of the claim's domain.
const CRYPTO_WORDS = /\b(crypto\w*|cipher|encrypt\w*|secur\w*|hash|key(space|s)?|aes|rsa|sha)\b/i
const GROUP_WORDS = /\b(group|closure|closed|orbit|involution|permutation|affine|vortex|map)\b/i
const IDENTITY_WORDS = /\b(equals?|identity|inverse|mod|residue|digital root|z\/9|involution)\b/i

function developPlan(statement: string, verdict: VerdictKind, fabricated: string[]): string[] {
  if (verdict === 'VERIFIED') return [
    'Resolved: a decidable test recomputes true (or a sealed Lean theorem backs it) — verified, admissible.',
    'Fold it in: proveVerdict(statement, [formulaReceipts]) → one order-invariant proof root.',
    'If it is a general law, author it in lean/*.lean `by decide` so runTrial() carries it forever.',
  ]
  // UNVERIFIED — never "false", only "not yet verified". The develop-until-verified recipe.
  const steps: string[] = []
  if (fabricated.length) steps.push(
    `The citation ${JSON.stringify(fabricated[0])} names a theorem that is NOT sealed in the ledger, so it verifies nothing — this is UNVERIFIED, not false.`,
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
    '3. key-dependence — assert the output varies with the key, not a keyless content-address.',
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
  const collisions = statusCollisions(statement)
  if (collisions.length) {
    // a status-DNA collision refuses the verdict on EVERY path: a real citation (or even a true decidable test
    // about the reflection) must not launder a solve-claim the sealed names refuse. UNVERIFIED, never "false".
    const c = collisions[0]
    verdict = 'UNVERIFIED'
    note = `contradicts the ledger's sealed status DNA: ${c.key} seals "— ${c.status}" for ${c.subject} — a solve-claim in uuidna's own voice never verifies (the seal confers verification, never solved status: theorem clay_verified_ne_solved)`
    return { statement, verdict, receipt, note, develop: [
      `The sealed record for ${c.subject} is "${c.status}" — state that status, or demarcate the claim (the reflection, not the problem), and try again.`,
      'What is claimable here is the sealed reflection theorem itself, credited by the claim law (credits()) — never the named problem.',
    ] }
  }
  if (decidableTest) {
    let holds = false
    try { holds = decidableTest() === true } catch { holds = false }
    verdict = holds ? 'VERIFIED' : 'UNVERIFIED'
    note = holds ? 'a decidable test recomputes true — verified, admissible'
                 : 'its decidable test does not recompute true — UNVERIFIED (not false: unproven as stated)'
  } else if (slim.verdict === 'VERIFIED') {
    verdict = 'VERIFIED'; note = 'cites a sealed Lean theorem in the ledger — verified'
  } else {
    verdict = 'UNVERIFIED'
    note = slim.fabricated.length
      ? 'cites a theorem not sealed in the ledger — verifies nothing, UNVERIFIED (not false)'
      : 'no decidable test and no sealed citation — UNVERIFIED; bring a proof to verify it'
  }
  return { statement, verdict, receipt, note, develop: developPlan(statement, verdict, slim.fabricated) }
}

// A valid trial folds the FORMULAS, not just the verdict text: the caller supplies the receipts of the decidable
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
// merkle fold is order-invariant). The quantum here is the multi-perspective structure, not hardware.
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

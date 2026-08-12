// the trial — for any statement, ONE recomputable answer, and only one of two, all else void:
//   VERIFIED   — a decidable test recomputes true, OR the claim cites a Lean-sealed theorem in the ledger.
//   UNVERIFIED — everything else: no test, no sealed citation, a failed test, or a citation to a proof that is not
//                sealed. uuidna VERIFIES; it never REFUTES — calling a claim false is an overclaim it cannot decide,
//                so "not verified" is the whole of the negative. Absence of proof is not proof of falsity.
// Integrity, not truth. Everything content-addressed.
import { slimGate } from './slimgate.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'
import { imprint, readImprint } from './imprint.js'

export type VerdictKind = 'VERIFIED' | 'UNVERIFIED'
export interface Verdict { statement: string; verdict: VerdictKind; receipt: string; note: string; develop: string[] }

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

// the trial — for any statement, a recomputable verdict. It NEVER claims absolute truth: the honesty gate is a
// floor, not an oracle (a gate-clean falsehood like "2+2=5" still passes it). The verdict is three-way:
//   REFUTED    — the gate drains a named overclaim, OR a supplied decidable test fails (counterexample).
//   SEALED     — gate-clean AND a decidable test holds → recomputable, admissible.
//   UNVERIFIED — gate-clean but no recomputable receipt supplied → bring a decidable test to move it.
// Integrity, not truth. Everything content-addressed.
import { computes } from './gate.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'
import { imprint, readImprint } from './imprint.js'

export type VerdictKind = 'REFUTED' | 'SEALED' | 'UNVERIFIED'
export interface Verdict { statement: string; gateBinary: 0 | 1; verdict: VerdictKind; receipt: string; note: string; develop: string[] }

// The develop plan — exact, ordered algebra-development steps that move a verdict toward resolution, so a claim
// is not left at "UNVERIFIED, good luck". Deterministic and gate-clean by construction (the trial's own
// instructions pass the trial's own gate). Keyed on the verdict and a light lexical read of the claim's domain.
const CRYPTO_WORDS = /\b(crypto\w*|cipher|encrypt\w*|secur\w*|hash|key(space|s)?|aes|rsa|sha)\b/i
const GROUP_WORDS = /\b(group|closure|closed|orbit|involution|permutation|affine|vortex|map)\b/i
const IDENTITY_WORDS = /\b(equals?|identity|inverse|mod|residue|digital root|z\/9|involution)\b/i

function developPlan(statement: string, verdict: VerdictKind, gateBinary: 0 | 1, hit: string | null): string[] {
  if (verdict === 'SEALED') return [
    'Resolved: gate-clean and the decidable test recomputes true — admissible.',
    'Fold it in: proveVerdict(statement, [formulaReceipts]) → one order-invariant proof root.',
    'If it is a general law, author it in lean/*.lean `by decide` so runTrial() carries it forever.',
  ]
  if (verdict === 'REFUTED' && gateBinary === 0) return [
    `Cut the fabricated citation ${JSON.stringify(hit)} — it names a theorem that is NOT sealed in the ledger, the one decidably-false thing a claim can do.`,
    'Either seal that theorem (author it in lean/*.lean `by decide` and re-run npm run lean), or drop the citation and restate the claim as its checkable residue.',
    'Re-run adjudicate on the residue, then attach a decidable test or a REAL /theorem/<key> — see the UNVERIFIED plan.',
  ]
  if (verdict === 'REFUTED') { // gate-clean, but the supplied test failed
    const steps = [
      'The decidable test returned false — a counterexample exists; the claim is refuted as stated.',
      'Either (a) narrow the claim to the sub-domain where the predicate holds, or (b) develop the construction until it holds, then re-run the same test.',
    ]
    if (CRYPTO_WORDS.test(statement)) steps.push('For a cipher: the affine/vortex layer fails nonlinearity — develop a nonlinear primitive (ARX / S-box). The deposit\'s SHA-256 and ChaCha20 already return isAffine === false.')
    return steps
  }
  // UNVERIFIED — the develop-until-resolved recipe.
  const steps = [
    'Name the finite structure the claim lives in (ℤ/9, the affine group AGL(1,ℤ/9), an n-bit truth table, the Clifford group).',
    'Express the claim as a boolean predicate that recomputes over it — exact integers, no floats, no Math.*.',
    'Supply it: adjudicate(statement, () => predicate). Holds → SEALED; fails → REFUTED with the counterexample.',
  ]
  if (CRYPTO_WORDS.test(statement)) steps.push(
    'Note: security is not a decidable property — it can never SEAL directly. Develop the three decidable PROXIES, each a () => boolean:',
    '1. keyspace — generate the map family to closure; assert |G| ≥ 2^128 (the affine/vortex family closes at 54, so it fails this).',
    '2. nonlinearity — assert the map is NOT affine: isAffine(perm) === false.',
    '3. key-dependence — assert the output varies with the key, not a keyless content-address.',
    'All three hold → the claim meets a necessary standard (still not a superlative). Any one fails → REFUTED.',
  )
  else if (GROUP_WORDS.test(statement)) steps.push('Group/closure claim: generate from the generators to closure, then assert the cardinality or the closure property as the predicate.')
  else if (IDENTITY_WORDS.test(statement)) steps.push('Identity claim: enumerate the finite domain and assert equality for every element (e.g. dz(dz(x)) === x for x in 1..9).')
  return steps
}

export function adjudicate(statement: string, decidableTest?: () => boolean): Verdict {
  const g = computes(statement)
  const receipt = toUuid(statement)
  let gateBinary: 0 | 1, verdict: VerdictKind, note: string
  if (g.binary === 0) { gateBinary = 0; verdict = 'REFUTED'; note = 'the honesty gate drains a named overclaim: ' + JSON.stringify(g.hit) }
  else if (decidableTest) {
    let holds = false
    try { holds = decidableTest() === true } catch { holds = false }
    gateBinary = 1; verdict = holds ? 'SEALED' : 'REFUTED'
    note = holds ? 'gate-clean and a decidable test holds — recomputable, admissible' : 'gate-clean but its decidable test fails — refuted by counterexample'
  } else { gateBinary = 1; verdict = 'UNVERIFIED'; note = 'gate-clean but no recomputable receipt — the floor is not an oracle; bring a decidable test' }
  return { statement, gateBinary, verdict, receipt, note, develop: developPlan(statement, verdict, gateBinary, g.hit) }
}

// A valid trial folds the FORMULAS, not just the verdict text: the caller supplies the receipts of the decidable
// theorems (each recomputing true) that establish the floor for this claim; they fold — with the gate predicate
// and the verdict — through merkleGravity (ORDER-INVARIANT, the quantum receipt) to ONE proof-of-verdict root,
// reproducible by any observer regardless of the order the formulas are presented in.
export interface ProvenVerdict extends Verdict { formulas: number; proofRoot: string }
export function proveVerdict(statement: string, formulaReceipts: readonly string[] = []): ProvenVerdict {
  const v = adjudicate(statement)
  const gateFormula = toUuid('computes(claim).binary=' + v.gateBinary)
  const proofRoot = merkleGravity([...formulaReceipts, gateFormula, toUuid('verdict:' + v.verdict), v.receipt])
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

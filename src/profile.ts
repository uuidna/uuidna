// profile — THE QUANTUM PROFILE: uuidna's own content-addressed self-profile, composed from what it already proves
// and folded to ONE receipt anyone recomputes. Not a new claim — a PORTRAIT assembled from sealed, recomputable
// parts: the identity (its name's content-address + the quantum AURA that address folds to), the proofs (theorem
// count, verified, kernel-only witness, trial receipt), the QUANTUM-CRYPTO posture (symmetric-only — no Shor target,
// Grover only halves to a ~128-bit floor — with the post-quantum floor theorems that back it), the two captain coins,
// the integrity fingerprint (FNV + SHA-256 + tamper cost), and the rights (© + licence). Every field carries its own
// receipt, and the profile folds them order-invariantly to one profileReceipt: the same profile for every observer.
// HONEST SCOPE: integrity, not truth — a recomputable SELF-DESCRIPTION, decorated by its own aura; it composes sealed
// facts, it asserts nothing new. The aura is ART (a defined arithmetic from the address to a hue), not physics.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { theorems, runTrial } from './theorems/index.js'
import { quantumAura } from './aura.js'
import { axiomWitness } from './axiom-witness.js'
import { securityAudit, DEFENCE_THEOREMS } from './security-audit.js'
import { quantumAnalytics } from './analytics.js'
import { coins } from './captain/billing.js'
import { captainRights } from './captain/rights.js'

// the post-quantum floor the symmetric-only posture rests on — each a sealed `by decide` fact. Shor has no asymmetric
// target (symmetric-only); Grover is a quadratic speedup only (2^n·2^n = 2^(2n)), halving the exponent to a ~128-bit
// floor. These are drawn from the ledger, so the posture claim is BACKED by proofs, not asserted.
const POST_QUANTUM_FLOOR = ['grover_quadratic_bound', 'each_key_bit_doubles', 'birthday_halves_the_exponent'] as const

export interface QuantumProfile {
  handle: string                 // the profile's own 8-char handle (the head of its receipt)
  identity: { name: string; address: string; aura: { ray: number; hue: number; hsl: string; rgb: string } }
  proofs: { theorems: number; verified: number; kernelOnly: boolean; receipt: string }
  quantumCrypto: { posture: string; symmetricOnly: boolean; floorTheorems: string[]; floorSealed: boolean; coins: number }
  integrity: { fnv: string; sha256: string; tamperCost: string }
  rights: { copyright: string; license: string; licenseUrl: string }
  receipt: string                // all field receipts folded order-invariantly to one — the same for every observer
  honest: string
}

const HONEST =
  'The quantum profile: uuidna\'s recomputable self-portrait, composed from sealed facts (identity + aura, proofs + ' +
  'kernel-only witness, the symmetric-only quantum-crypto posture and the post-quantum floor theorems that back it, ' +
  'the two coins, the integrity fingerprint, the rights) and folded to ONE receipt — the same profile for every ' +
  'observer, no privileged view. It COMPOSES what is already proven; it asserts nothing new. The aura is ART, not ' +
  'physics. Integrity, not truth.'

/** quantumProfile() → uuidna's content-addressed self-profile, every field recomputable and folded to one receipt.
 *  Composes the identity/aura, the proofs + kernel-only witness, the quantum-crypto posture + floor theorems, the
 *  coins, the integrity fingerprint and the rights. Deterministic; the same profile for every observer. */
export function quantumProfile(): QuantumProfile {
  const T = theorems()
  const self = toUuid('uuidna')
  const aura = quantumAura(self)
  const trial = runTrial()
  const witness = axiomWitness()
  const audit = securityAudit()
  const analytics = quantumAnalytics()
  const rights = captainRights()
  const sealed = (k: string): boolean => T.some((t) => t.key === k)
  const floorSealed = POST_QUANTUM_FLOOR.every(sealed)
  // the symmetric-only posture: it is quantum-appropriate iff the security audit passes AND the post-quantum floor is sealed.
  const symmetricOnly = audit.passed && floorSealed

  const fieldReceipts = [
    toUuid('identity|' + self + '|' + aura.hsl),
    trial.receipt,
    toUuid('witness|' + witness.holds + '|' + witness.axiomFree + '/' + witness.ledger),
    audit.receipt,
    toUuid('quantum-crypto|' + symmetricOnly + '|' + POST_QUANTUM_FLOOR.join(',') + '|coins=' + coins()),
    toUuid('integrity|' + analytics.integrity.fnvReceipt + '|' + analytics.integrity.sha256),
    rights.receipt,
  ]
  const receipt = merkleGravity(fieldReceipts)

  return {
    handle: receipt.slice(0, 8),
    identity: { name: 'uuidna', address: self, aura: { ray: aura.ray, hue: aura.hue, hsl: aura.hsl, rgb: aura.rgb } },
    proofs: { theorems: trial.count, verified: trial.verified, kernelOnly: witness.holds, receipt: trial.receipt },
    quantumCrypto: {
      posture: 'SYMMETRIC-ONLY (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256): no RSA/ECC, so Shor has no asymmetric ' +
        'target; Grover is a quadratic speedup only, halving the exponent to a ~128-bit floor. Backed by the sealed ' +
        'post-quantum floor theorems, not asserted.',
      symmetricOnly, floorTheorems: [...POST_QUANTUM_FLOOR], floorSealed, coins: coins(),
    },
    integrity: { fnv: analytics.integrity.fnvReceipt, sha256: analytics.integrity.sha256, tamperCost: analytics.integrity.tamperCost },
    rights: { copyright: rights.copyright, license: rights.licenseName, licenseUrl: rights.licenseUrl },
    receipt,
    honest: HONEST,
  }
}

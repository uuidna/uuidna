// crypt-suites — full hybrid PQC profile: ML-KEM-768, X25519, ML-DSA-65, SLH-DSA (pure TS / nobles).
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { KEY_BITS, GROVER_FLOOR_BITS, ITER } from './crypt.js'

export type AsymmetricSlot = 'ML-KEM-768' | 'X25519' | 'ML-DSA-65' | 'SLH-DSA'

export interface SuiteSymmetric {
  aead: 'ChaCha20-Poly1305'
  kdf: 'PBKDF2-SHA256' | 'HKDF-SHA256'
  hash: 'SHA-256'
  keyBits: number
  groverFloorBits: number
  pbkdf2Iter?: number
}

export interface SuiteAsymmetric {
  kem: { id: 'ML-KEM-768'; present: boolean }
  classicalKem: { id: 'X25519'; present: boolean }
  signature: { id: 'ML-DSA-65'; present: boolean }
  optionalSignature?: { id: 'SLH-DSA'; present: boolean }
}

export interface CryptoSuite {
  id: string
  version: number
  present: boolean
  symmetric: SuiteSymmetric
  asymmetric: SuiteAsymmetric | null
}

export const SYMMETRIC_SUITE_ID = 'uuidna-symmetric-v3'
export const HYBRID_SUITE_ID = 'uuidna-hybrid-mlkem768-x25519-v1'

const SYMMETRIC: CryptoSuite = {
  id: SYMMETRIC_SUITE_ID,
  version: 3,
  present: true,
  symmetric: {
    aead: 'ChaCha20-Poly1305',
    kdf: 'PBKDF2-SHA256',
    hash: 'SHA-256',
    keyBits: KEY_BITS,
    groverFloorBits: GROVER_FLOOR_BITS,
    pbkdf2Iter: ITER,
  },
  asymmetric: null,
}

const HYBRID: CryptoSuite = {
  id: HYBRID_SUITE_ID,
  version: 1,
  present: true,
  symmetric: {
    aead: 'ChaCha20-Poly1305',
    kdf: 'HKDF-SHA256',
    hash: 'SHA-256',
    keyBits: KEY_BITS,
    groverFloorBits: GROVER_FLOOR_BITS,
  },
  asymmetric: {
    kem: { id: 'ML-KEM-768', present: true },
    classicalKem: { id: 'X25519', present: true },
    signature: { id: 'ML-DSA-65', present: true },
    optionalSignature: { id: 'SLH-DSA', present: true },
  },
}

const REGISTRY = new Map<string, CryptoSuite>([
  [SYMMETRIC_SUITE_ID, SYMMETRIC],
  [HYBRID_SUITE_ID, HYBRID],
])

/** cryptSuites() → every registered suite and which asymmetric slots are still absent. */
export function cryptSuites(): { suites: CryptoSuite[]; receipt: string } {
  const suites = [...REGISTRY.values()]
  const receipt = merkleGravity(suites.map((s) => toUuid(s.id + '|' + s.present + '|' + (s.asymmetric ? 'hybrid' : 'symmetric'))))
  return { suites, receipt }
}

/** suiteById(id) → one suite or undefined. */
export function suiteById(id: string): CryptoSuite | undefined {
  return REGISTRY.get(id)
}

/** suitePolicy(id) → refuse downgrade to classical-only when hybrid is required. */
export function suitePolicy(required: string, offered: string): { allowed: boolean; reason: string } {
  if (required === offered) return { allowed: true, reason: 'exact match' }
  if (required === HYBRID_SUITE_ID && offered === SYMMETRIC_SUITE_ID)
    return { allowed: false, reason: 'hybrid required — classical-only downgrade refused' }
  return { allowed: false, reason: `unknown suite transition ${offered} → ${required}` }
}

/** missingAsymmetricSlots() → slots the hybrid profile names but does not yet implement. */
export function missingAsymmetricSlots(): AsymmetricSlot[] {
  const h = REGISTRY.get(HYBRID_SUITE_ID)?.asymmetric
  if (!h) return []
  const out: AsymmetricSlot[] = []
  if (!h.kem.present) out.push('ML-KEM-768')
  if (!h.classicalKem.present) out.push('X25519')
  if (!h.signature.present) out.push('ML-DSA-65')
  if (h.optionalSignature && !h.optionalSignature.present) out.push('SLH-DSA')
  return out
}

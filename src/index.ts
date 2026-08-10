// uuidna — content-addressed identity, honest by construction.
//
//   mint (integrity — every value has a reproducible address) · mind (every claim drains its own overreach
//   before it holds) · a holographic merkle proof (verify the whole from a tiny part, in O(log N)) · a
//   reversible imprint codec · a client-side harness that reeducates overclaims · a measured billing model.
//
// A content-address proves INTEGRITY, not truth. It settles 0/7. Licensed CC BY-NC 4.0 · Tsvetan Rouschev.

export {
  toUuid, strictUuidna, merge, coin64, merkleFold, digitalRoot,
  gcd, gcdBigInt, isPrime, modpow,
  TRINITY, BASE, A432_STEP, digits, units, triad, vortexOrbit,
} from './address.js'

export {
  CAPACITY, imprint, readImprint, roundTrips,
  imprintChain, readImprintChain, imprintTextChain, readImprintTextChain,
} from './imprint.js'

export { merkleRoot, merkleProof, verifyProof } from './merkle.js'

export { computes, RED, RED_INTL, OVERREACH, PREDICT } from './gate.js'

// gravity — decidable contractions (a set of addresses falls to one root; an integer to ℤ/9). merkleGravity is
// ORDER-INVARIANT: the quantum receipt, the same for any observer ordering. NOT physics, nothing faster than light.
export { merkleGravity, doubleTorusGravity, doubleTorusField, fall, fixedPoints, seats } from './gravity.js'

// the diamond involution r(d)=10−d and its lift to a list (involute): self-inverse, closed, no islands, one centre.
export { diamond, DIAMOND_FIXED, involute, involutionFixed } from './diamond.js'

// the trial — a recomputable three-way verdict (REFUTED/SEALED/UNVERIFIED); proveVerdict folds the formula
// receipts through the order-invariant gravity to one proof-of-verdict root. Integrity, not truth. 0/7.
export { adjudicate, proveVerdict, verifyUuidna, type Verdict, type VerdictKind, type ProvenVerdict, type UuidnaVerdict } from './adjudicate.js'

export {
  type Harnessed, DIMENSIONS,
  harness, opaque, harnessGain, harness7, reeducate,
} from './harness.js'

export { coins, billUuidna, type UuidnaUsage } from './billing.js'

export { renderTheorem, renderList, renderHero, type TheoremView, type RenderOpts } from './render.js'

// crypt — full PURE-TS encryption: ChaCha20-Poly1305 (RFC 8439) core + PBKDF2-SHA256 KDF + uuidna 7d-fold
// envelope. No native WebCrypto — nothing but latest TypeScript, KAT-verified against the standards' vectors.
export { encrypt, decrypt, verifyEnvelope, ITER, type Sealed } from './crypt.js'
export { sha256, hmacSha256, pbkdf2Sha256 } from './sha256.js'
export { aeadEncrypt, aeadDecrypt, chachaBlock, chacha20, poly1305 } from './chacha.js'

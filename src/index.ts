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

export {
  type Harnessed, DIMENSIONS,
  harness, opaque, harnessGain, harness7, reeducate,
} from './harness.js'

export { coins, billUuidna, type UuidnaUsage } from './billing.js'

export { renderTheorem, renderList, type TheoremView } from './render.js'

// crypt — REAL encryption, layered: AES-256-GCM core (secrecy) + uuidna 7d-fold envelope (integrity/routing).
export { encrypt, decrypt, verifyEnvelope, type Sealed } from './crypt.js'

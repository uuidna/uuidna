// uuidna — content-addressed identity, honest by construction.
//
//   mint (integrity — every value has a reproducible address) · mind (every claim drains its own overreach
//   before it holds) · a holographic merkle proof (verify the whole from a tiny part, in O(log N)) · a
//   reversible imprint codec · a client-side harness that reeducates overclaims · a measured billing model.
//
// A content-address proves INTEGRITY, not truth. It settles Licensed CC BY-NC-ND 4.0 · Tsvetan Rouschev.

export {
  toUuid, cryptoAddress, strictUuidna, merge, coin64, merkleFold, digitalRoot,
  gcd, gcdBigInt, isPrime, modpow,
  TRINITY, BASE, A432_STEP, digits, units, triad, vortexOrbit,
} from './address.js'

export {
  CAPACITY, imprint, readImprint, roundTrips,
  imprintChain, readImprintChain, imprintTextChain, readImprintTextChain,
} from './imprint.js'

export { merkleRoot, merkleProof, verifyProof } from './merkle.js'

export { computes, RED, RED_INTL, OVERREACH, PREDICT, rosetta } from './gate.js'

// gravity — decidable contractions (a set of addresses falls to one root; an integer to ℤ/9). merkleGravity is
// ORDER-INVARIANT: the quantum receipt, the same for any observer ordering. NOT physics, nothing faster than light.
export { merkleGravity, doubleTorusGravity, doubleTorusField, fall, fixedPoints, seats } from './gravity.js'

// the diamond involution r(d)=10−d and its lift to a list (involute): self-inverse, closed, no islands, one centre.
export { diamond, DIAMOND_FIXED, involute, involutionFixed } from './diamond.js'

// the trial — a recomputable three-way verdict (REFUTED/SEALED/UNVERIFIED); proveVerdict folds the formula
// receipts through the order-invariant gravity to one proof-of-verdict root. Integrity, not truth.
export { adjudicate, proveVerdict, verifyUuidna, type Verdict, type VerdictKind, type ProvenVerdict, type UuidnaVerdict } from './adjudicate.js'

export {
  type Harnessed, DIMENSIONS,
  harness, opaque, harnessGain, harness7, reeducate,
} from './harness.js'

export { coins, billUuidna, referenceBitsSaved, ADDRESS_BITS, type UuidnaUsage } from './billing.js'

// quantum — a CLASSICAL, EXACT state-vector simulator, ported from millennium-solutions and completed as the captain
// computes: on integer positions, no decimal drift. Amplitudes are GAUSSIAN INTEGERS over √(2^scale) — the ring
// ℤ[i,1/√2] the Clifford gates live in — so the full gate set (X, Y, Z, S, S†, H, CNOT, CZ, SWAP, Toffoli, CCZ)
// runs in BigInt and every probability is an exact rational. Honestly bounded — 2^n amplitudes, EXPONENTIAL, no
// quantum advantage; non-Clifford √-phase gates (T, controlled-H) need per-branch scaling — the honest boundary.
export {
  ket0, hadamard, cnot, cz, swap, toffoli, ccz, pauliX, pauliY, pauliZ, phaseS, phaseSdg,
  distribution, probability, marginal, amplitude, equalState, isInvolution, bellState, ghzState, receiptOf, quantumReceipt,
  runCircuit, isClassical, classicalMap, truthTable,
  report, fraction, label, type QState, type Prob, type Cx, type GateOp,
} from './quantum.js'

export { renderTheorem, renderList, renderHero, type TheoremView, type RenderOpts } from './render.js'

// crypt — full PURE-TS encryption: ChaCha20-Poly1305 (RFC 8439) core + PBKDF2-SHA256 KDF + uuidna 7d-fold
// envelope. No native WebCrypto — nothing but latest TypeScript, KAT-verified against the standards' vectors.
export { encrypt, decrypt, verifyEnvelope, sealSequence, ITER, MAX_ITER, type Sealed } from './crypt.js'
export { sha256, hmacSha256, pbkdf2Sha256 } from './sha256.js'
export { aeadEncrypt, aeadDecrypt, chachaBlock, chacha20, poly1305 } from './chacha.js'
// stream — encrypted uuid messaging streams: onion-seal (N ChaCha20-Poly1305 layers, bounded) carried entirely
// as a chain of uuids. Self-communicating uuids: the message channel IS the uuid stream, secrecy from crypt only.
export { sealStream, openStream, sealMessages, openMessages, sealChain, openChain, MAX_LAYERS, GENESIS, type Stream, type Link } from './stream.js'
export { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract, type ContractSealed, type ContractChain } from './contract.js'
export { auditText, auditTranslation, fetchGutenberg, auditBook, auditMovie, auditZenodo, type BookAudit, type TranslationAudit, type FetchedBook, type MovieAudit, type RecordAudit } from './books.js'
export { gcdInt, coprime, starPolygon, fibonacciCycle, rotate, crt } from './cycles.js'
export { recomputableCost, THERMODYNAMICS, type CostReport } from './cost.js'
// publish — write PUBLICATIONS in lean human prose, AUDITED before publishing: a domain note composed by reading
// its SEALED theorems, every claim linking the proof that backs it, gated by the same honesty audit the site runs,
// refused if it overreaches. Writing descends from reading. Content-addressed; the member proofs fold to one receipt.
export { composePublication, publications, auditPublication, revisePublication, comparePublications, type Publication, type PubFinding, type Revision, type Comparison } from './publish.js'
// site — the ONE navigable graph: every page in a canonical wrapping order (no next-gap, no orphan). The native
// pager and the release gate both read `next` from this, so the button clicked and the gap hunted are one edge.
export { canonicalOrder, nextOf, gaps, type PageNode } from './site.js'
// prose-gate — the honest-prose overreach floor (HOLLOW superlatives + translated proof-boasts, with demarcation
// clearing), shared by the provenance audit and the self-trial. Extracted so it is tested, not buried in a script.
export { overreachOf, HOLLOW, DEMARCATED } from './prose-gate.js'
// reason — an IN-HOUSE forward-chaining reasoner that USES the sealed rules of inference: it derives conclusions by
// modus ponens / the hypothetical syllogism, citing the sealed theorem at each step, bounded and recomputable.
export { reason, type Rule, type Derivation, type Reasoning } from './reason.js'
// reflects — reveal the sealed theorems a real-world system ALREADY reflects, matched from the ledger and folded to
// a receipt. A resemblance the ledger carries, not an endorsement of the system.
export { reflects, type Reflection, type Reflected } from './reflects.js'
// vocab — a common, computable, translation-ready vocabulary derived from every theorem and its domain: each term
// self-audited by the honesty gate, content-addressed, folded (in trinities) to ONE receipt — the honest "all is one".
export { vocabulary, type Term, type Vocabulary } from './vocab.js'
// forensics — audit an agent's STATEMENTS against the RECEIPTS: a fabricated citation, a false address, a drained
// overclaim, an unbacked legal claim. Every violation is a recomputable fact about the CLAIM, never an accusation.
export { forensics, auditAgents, type Violation, type ForensicReport } from './forensics.js'
// evidence — deliver the recomputable evidence bundle for a statement (verdict + forensics + every cited proof in
// full + the ledger receipt + the steps to reproduce every number), so a court accepts a trial by RECOMPUTING it.
export { evidence, type Evidence, type ProofExhibit } from './evidence.js'
// fingerprint — the FUSED ledger fingerprint: the fast tamper-evident FNV receipt AND the collision-resistant SHA-256
// fold. Raises the cost of an undetected forgery to the SHA-256 collision bound — a ceiling, not a maximum.
export { ledgerFingerprint, type LedgerFingerprint } from './fingerprint.js'

// the theorem ledger — LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven `by decide`
// (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs derives ./theorems/generated.ts, and THEOREMS
// is the typed, addressed view. runTrial() folds every theorem's content-address to one receipt; theorems() lists
// them with proof + principle; PRINCIPLES is the derivation order. A theorem computes in Lean, or it is not one.
export { THEOREMS, runTrial, theorems, PRINCIPLES, skillOf, SKILLS, skillGroups, type Theorem, type LeanTheorem, type TheoremVerdict, type TrialResult, type SkillGroup } from './theorems/index.js'

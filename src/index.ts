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

export { computes } from './gate.js'

// gravity — decidable contractions (a set of addresses falls to one root; an integer to ℤ/9). merkleGravity is
// ORDER-INVARIANT: the quantum receipt, the same for any observer ordering. NOT physics, nothing faster than light.
export { merkleGravity, doubleTorusGravity, doubleTorusField, fall, fixedPoints, seats } from './gravity.js'

// the diamond involution r(d)=10−d and its lift to a list (involute): self-inverse, closed, no islands, one centre.
export { diamond, DIAMOND_FIXED, involute, involutionFixed } from './diamond.js'

// the trial — a recomputable three-way verdict (REFUTED/SEALED/UNVERIFIED); proveVerdict folds the formula
// receipts through the order-invariant gravity to one proof-of-verdict root. Integrity, not truth.
export { adjudicate, proveVerdict, verifyUuidna, type Verdict, type VerdictKind, type ProvenVerdict, type UuidnaVerdict } from './adjudicate.js'
export { corroborate, approve, firewall, entangle, researchEvidence, corroborateWithResearch, type ResearchEvidence, type Corroboration, type FirewallResult, type Entanglement } from './corroborate.js'
export { domainWave, type DomainWave } from './domain-wave.js'
// research — deep research pressed/decompressed with the reversible imprint codec, bound to the entangled algebra,
// with NOVELTY as content-address uniqueness. Does NOT extract MEANING (provenance + structure only; meaning is null).
export { deepResearch, type DeepResearch } from './research.js'

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
// editor — the SERIALIZER CONTRACT of a content-addressed document (a Lexical-shaped node tree), the fold lean/Editor
// proves ORDER-SENSITIVE (a document is a SEQUENCE, not a set), change-sensitive and bounded-injective. serialize →
// merkleRoot over the leaves → the document handle; editing is re-addressing. payloadFoldHook is the PayloadCMS hook
// shape (dependency-free) that stamps the address on save — the one fold a Payload plugin and a VitePress plugin share.
export { serialize, documentAddress, documentHandle, reAddress, payloadFoldHook, type DocNode, type EditorState, type DocFold, type PayloadHookArgs } from './editor.js'

// crypt — full PURE-TS encryption: ChaCha20-Poly1305 (RFC 8439) core + PBKDF2-SHA256 KDF + uuidna 7d-fold
// envelope. No native WebCrypto — nothing but latest TypeScript, KAT-verified against the standards' vectors.
export { encrypt, decrypt, verifyEnvelope, sealSequence, ITER, MAX_ITER, type Sealed } from './crypt.js'
export { sha256, hmacSha256, pbkdf2Sha256 } from './sha256.js'
export { aeadEncrypt, aeadDecrypt, chachaBlock, chacha20, poly1305 } from './chacha.js'
// stream — encrypted uuid messaging streams: onion-seal (N ChaCha20-Poly1305 layers, bounded) carried entirely
// as a chain of uuids. Self-communicating uuids: the message channel IS the uuid stream, secrecy from crypt only.
export { sealStream, openStream, sealMessages, openMessages, sealChain, openChain, MAX_LAYERS, GENESIS, type Stream, type Link } from './stream.js'
export { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract, type ContractSealed, type ContractChain } from './contract.js'
export { auditText, auditTranslation, fetchGutenberg, auditBook, auditMovie, auditZenodo, auditStandard, extractDecidable, composeBookArticle, bookArticle, type BookAudit, type TranslationAudit, type FetchedBook, type MovieAudit, type RecordAudit, type StandardAudit, type ExtractedFact } from './books.js'
export { gcdInt, coprime, starPolygon, fibonacciCycle, rotate, crt } from './cycles.js'
export { recomputableCost, THERMODYNAMICS, type CostReport } from './cost.js'
export { securityAudit, KNOWN_DEV_DEPS, DEFENCE_THEOREMS, type SecurityCheck, type SecurityAuditReport } from './security-audit.js'
// verify-statement — the FAST verification path: a statement byte-identical to a sealed theorem VERIFIES in O(1)
// (a content-address lookup), returning the sealing theorem. The framework verifies a THEOREM, not only a citation.
export { verifyStatement, type StatementVerdict } from './verify-statement.js'
// publish — write PUBLICATIONS in lean human prose, AUDITED before publishing: a domain note composed by reading
// its SEALED theorems, every claim linking the proof that backs it, gated by the same honesty audit the site runs,
// refused if it overreaches. Writing descends from reading. Content-addressed; the member proofs fold to one receipt.
export { composePublication, publications, coverage, auditPublication, revisePublication, comparePublications, type Publication, type PubFinding, type Revision, type Comparison, type Coverage } from './publish.js'
// reporter — the REPORTER'S METHOD (Report.lean) reflected live: a report of a proven discovery publishes only when
// AUDITED (honesty gate clears) AND CORROBORATED (≥2 sources). Does NOT verify world events; reports proven discoveries.
export { fileReport, type FiledReport } from './reporter.js'
// site — the ONE navigable graph: every page in a canonical wrapping order (no next-gap, no orphan). The native
// pager and the release gate both read `next` from this, so the button clicked and the gap hunted are one edge.
export { canonicalOrder, nextOf, gaps, type PageNode } from './site.js'
// prose-gate — folded to the theorems (the lexical floor is gone): overreachOf drains only a fabricated theorem
// citation, and reveals everything else. Shared by the provenance audit and the self-trial. See gate.ts for the trial.
export { overreachOf } from './prose-gate.js'
// slimgate — the gate of all gates: ONLY theorems, no lexicon. A claim is judged solely by whether the theorems it
// cites are sealed in the ledger. Delete every word-list and this gate still stands, because it stands on the proofs.
export { slimGate, type SlimVerdict } from './slimgate.js'
// reactor — the involutionary refusion reactor: snapshot() folds a chosen set of sealed theorems across domains into
// one superposition uuid (first segment the identity handle); reactor() recycles REFUTED/UNVERIFIED claims back with
// their develop plan (nothing is waste — refusal starts the next fusion). Recomputable. Integrity, not truth.
export { snapshot, reactor, type Snapshot, type Viewpoint, type ReactorRun, type ReactorCell } from './reactor.js'
// reason — an IN-HOUSE forward-chaining reasoner that USES the sealed rules of inference: it derives conclusions by
// modus ponens / the hypothetical syllogism, citing the sealed theorem at each step, bounded and recomputable.
export { reason, type Rule, type Derivation, type Reasoning } from './reason.js'
// reflects — reveal the sealed theorems a real-world system ALREADY reflects, matched from the ledger and folded to
// a receipt. A resemblance the ledger carries, not an endorsement of the system.
export { reflects, type Reflection, type Reflected } from './reflects.js'
// legal — the recomputable legal FACT BASE (licence, attribution, ledger receipt, compliance stance, standards
// cited), NOT a legal audit or opinion: the inputs counsel starts from, delivered in chat, the ruling left to humans.
export { legalFacts, type LegalFacts } from './legal.js'
// license — the recomputable LICENCE RECORD: bind a licensee, the CC-BY-NC-ND-4.0 terms, and the two-coins bill into
// one content-addressed, verifiable artifact. NOT a signed agreement or legal advice — a fingerprint of what and how
// much; non-commercial is free and needs no licence, commercial is billed the two conserved coins.
export { license, verifyLicense, type License } from './license.js'
// priorart — an IN-HOUSE defensive-publication record: what/who/integrity/terms, recomputable and self-contained; the
// WHEN (priority-dating) it names as an external anchor, never faked. You cannot notarise your own document.
export { priorArt, type PriorArt, type PriorArtExhibit } from './priorart.js'
// anchor — the external WHEN, verified in-house: fold a NIST Randomness Beacon pulse (signed, timestamped, archived)
// into a record's address for a re-verifiable NOT-BEFORE bound — the rigorous "Schumann resonance at the time".
export { beaconAnchor, type Anchor } from './anchor.js'
// constants — verify uuidna's physics against NIST's authoritative CODATA values, content-addressed. A physical
// constant uuidna uses is rechecked against the external authority, not self-asserted.
export { nistConstant, type NistConstant } from './constants.js'
// cve — fingerprint a CVE's PUBLIC NVD advisory metadata (id, description, CVSS, dates), content-addressed, for the
// security reflection. Public metadata only, never an exploit; NVD publishes, uuidna fingerprints.
export { auditCve, type CveAudit } from './cve.js'
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
// quantum/os — uuidnaOS is NOT an OS you boot and does NOT run/port Alpine's binaries (uuidna never executes). It is a
// content-addressed PROVENANCE MANIFEST of an EXACT Alpine release: pin the version + arch + PUBLISHED rootfs digest,
// and VERIFY your actual bytes with uuidna's own pure-TS SHA-256. Port the INTEGRITY, never the runtime. fetchAlpineLatest
// is the upstream-automation network call at the os/ boundary (the one place non-determinism is honest, not hidden).
export { alpineRelease, verifyAlpineRootfs, fetchAlpineLatest, type AlpineRelease, type RootfsCheck } from './quantum/os/alpine.js'
// quantum/drivers — the DEVICE-DRIVER boundary: a content-addressed manifest of the exact Alpine netboot bundle (kernel
// + modloop = the kernel modules, the drivers). Pin version + arch + published SHA-256, verify the bytes with uuidna's
// own pure-TS SHA-256, track upstream via fetchDriverLatest. uuidna never loads or runs a module — port the INTEGRITY.
export { driverBundle, verifyDriverBundle, fetchDriverLatest, type DriverBundle, type DriverCheck } from './quantum/drivers/driver.js'

// the theorem ledger — LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven `by decide`
// (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs derives ./theorems/generated.ts, and THEOREMS
// is the typed, addressed view. runTrial() folds every theorem's content-address to one receipt; theorems() lists
// them with proof + principle; PRINCIPLES is the derivation order. A theorem computes in Lean, or it is not one.
export { THEOREMS, runTrial, theorems, PRINCIPLES, skillOf, SKILLS, skillGroups, rosettaIndex, reviewDomains, type Theorem, type LeanTheorem, type TheoremVerdict, type TrialResult, type SkillGroup, type RosettaRay, type DomainReview } from './theorems/index.js'

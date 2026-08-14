// uuidna — content-addressed identity, honest by construction.
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical, not 128 qubits). Canonical, theorem-cited: see llm.txt.
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

export { computes, reveal, type Reveal } from './gate.js'

// cloudflare — audit the Cloudflare Workers bindings for a quantum-secure posture (no secret committed; symmetric-only
// crypto — HMAC-SHA256 / ChaCha20-Poly1305, no Shor target, Grover only halves to a 128-bit floor), folded to one
// content-address. Audits the COMMITTED config, not the live edge. Integrity, not truth.
export { auditCloudflareBindings, type CloudflareAudit, type BindingAudit } from './cloudflare.js'

// due-process — VERIFY ALL BY DUE (recomputable) LEGAL PROCESS: every theorem verified by one fair trial, the six
// due-process guarantees each a sealed lean/Legal.lean theorem (one verdict, only-proven-admitted, non-justiciable-
// never-refuted, refuted-iff-test-fails, remand-total, two-coins-to-compute), any claim adjudicated by the same
// process, folded to one recomputable docket. A fair process whose rules are theorems — NOT a court or legal advice.
export { dueProcess, type DueProcess, type Guarantee, type DocketEntry } from './due-process.js'

// sign — SIGN a commit message as TRUE, or fail: signed-true iff it cites a real sealed theorem and none fabricated
// (slimGate VERIFIED); the signature is the message address folded with the cited theorems to one gravity root through
// the abstract-0 (÷0=0) — "folding to 1 through 0". The reconcile fails unless signed. It signs the CITATION, never the
// truth of the claim. Integrity, not truth.
export { signCommit, type CommitSignature } from './sign.js'

// gravity — decidable contractions (a set of addresses falls to one root; an integer to ℤ/9). merkleGravity is
// ORDER-INVARIANT: the quantum receipt, the same for any observer ordering. NOT physics, nothing faster than light.
export { merkleGravity, doubleTorusGravity, doubleTorusField, fall, fixedPoints, seats } from './gravity.js'

// the diamond involution r(d)=10−d and its lift to a list (involute): self-inverse, closed, no islands, one centre.
export { diamond, DIAMOND_FIXED, involute, involutionFixed } from './diamond.js'

// the trial — a recomputable three-way verdict (REFUTED/SEALED/UNVERIFIED); proveVerdict folds the formula
// receipts through the order-invariant gravity to one proof-of-verdict root. Integrity, not truth.
export { adjudicate, proveVerdict, verifyUuidna, type Verdict, type VerdictKind, type ProvenVerdict, type UuidnaVerdict } from './adjudicate.js'
export { corroborate, approve, firewall, entangle, researchEvidence, corroborateWithResearch, scanPublications, type ResearchEvidence, type Corroboration, type FirewallResult, type Entanglement, type PublicationScan, type PublicationFinding } from './corroborate.js'
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
export { encrypt, encryptSession, decrypt, decryptSession, verifyEnvelope, sealSequence, ITER, MAX_ITER, type Sealed } from './crypt.js'
export { sha256, hmacSha256, pbkdf2Sha256 } from './sha256.js'
export { aeadEncrypt, aeadDecrypt, chachaBlock, chacha20, poly1305 } from './chacha.js'
// stream — encrypted uuid messaging streams: onion-seal (N ChaCha20-Poly1305 layers, bounded) carried entirely
// as a chain of uuids. Self-communicating uuids: the message channel IS the uuid stream, secrecy from crypt only.
export { sealStream, openStream, sealMessages, openMessages, sealChain, openChain, MAX_LAYERS, GENESIS, type Stream, type Link } from './stream.js'
export { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract, type ContractSealed, type ContractChain } from './contract.js'
export { auditText, auditTranslation, fetchGutenberg, auditBook, auditMovie, auditZenodo, auditStandard, extractDecidable, linkBookFacts, composeBookArticle, bookArticle, type BookAudit, type TranslationAudit, type FetchedBook, type MovieAudit, type RecordAudit, type StandardAudit, type ExtractedFact, type BookTheoremLink, type BookLedgerLinkage } from './books.js'
export { gcdInt, coprime, starPolygon, fibonacciCycle, rotate, crt } from './cycles.js'
export { recomputableCost, THERMODYNAMICS, type CostReport } from './cost.js'
export { securityAudit, KNOWN_DEV_DEPS, DEFENCE_THEOREMS, type SecurityCheck, type SecurityAuditReport } from './security-audit.js'
// verify-statement — the FAST verification path: a statement byte-identical to a sealed theorem VERIFIES in O(1)
// (a content-address lookup), returning the sealing theorem. The framework verifies a THEOREM, not only a citation.
export { verifyStatement, type StatementVerdict } from './verify-statement.js'
// transform — the automation of "no unverified material stays: transform until verified". Only VERIFICATION is
// honesty; each material is driven to its sealed core (VERIFIED, admitted) or recycled with a develop plan
// (UNVERIFIED, never admitted, never called honest). uuidna computes the verdict; it does not assert it.
export { transformUntilVerified, transformOne, type TransformCell, type TransformRun } from './transform.js'
// holofractal — MAKE every input/output pentagram (single {5/2} stroke) · hologram (whole verifiable from a part) ·
// fractal (self-similar fold at descending scales) · accounted (two conserved coins + the bits taught), by
// construction and each property verifiable. holofractalHook stamps any I/O boundary.
export { pentagramHologramFractal, holofractalHook, type HoloFractal } from './holofractal.js'
// pentagram-stream — stream a sequence through the star {n/step} stroke (pentagram {5/2} generalized), each item
// stamped holofractal, folded to one ORDER-INVARIANT quantum receipt: a definite pentagram order, an order-free receipt.
export { pentagramStream, type PentagramStream, type PentagramStreamCell } from './pentagram-stream.js'
// conversation — local chat as code: the CONVERSATION FOLD binds four handles into a fifth (the room key), each handle
// part of the next (authenticity), rotated by the referer (per-room isolation); the room key then keys the encrypted
// uuid-stream channel. Local-first — keys and plaintext stay client-side.
export { conversationFold, openRoom, sendToRoom, sealRoomTranscript, receiveFromRoom, attachChat, donationNote, supportCase, type Room, type AttachedChat } from './conversation.js'
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

// spin — "spin the bits and get the coins": fold a derived file's bytes into its content-address coin, verify O(1)
// (a fixed point of its seal) rather than re-deriving O(N); drift (a moved coin) is hard-rejected as non-quantum.
export { spin, sealSpin, verifySpin, DERIVED_FILES, type SpinManifest, type SpinDrift } from './spin.js'

// pentagram-monographs — split the monographs into pentagrams of five, the split COMPUTED from the content-addresses
// (walked in {5/2} order, sealed order-invariantly) — no authored grouping, a surprise of the addresses.
export { pentagramMonographs, type Pentagram, type PentagramPoint, type PentagramMonographs } from './pentagram-monographs.js'

// sanitize — process ANY input, sanitise ANY output by all standards (bounded, acyclic, JSON-safe, no poison keys,
// no control/bidi points); the engine's I/O guards, with the standards sealed as theorems (Sanitize.lean).
export { sanitizeValue, sanitizeInput, scrubString, MAX_DEPTH, MAX_STRING, MAX_ARRAY, MAX_KEYS } from './sanitize.js'

// exploit-fold — the exploit audit that COMPUTES ITSELF from the sealed 'exploits' theorems (no table), verifying
// BOTH problem and solution; folded classes emerge as solutions, out-of-scope classes recycle to the void.
export { exploitFold, type ExploitAudit, type ExploitFold, type FoldVerdict } from './exploit-fold.js'

// conformance — the COMMIT DNA GATE: fold the core invariants (coins conserved, every theorem address recomputes,
// security clean, single-sourced) into one hard-enforced receipt, so no agent sneaks incompatible DNA past.
export { conformance, type ConformanceReport, type ConformanceCheck } from './conformance.js'

// credits — each theorem's provenance: exactly how it is Lean-proven in uuidna, and who it is credited to (a named
// historical result where the sealed metadata references one; else the captain claims it by law — first sealed here).
export { credits, creditsSummary, type Credits, type Credit } from './credits.js'

// laws — uuidna's standing invariants IN uuidna, each DEMONSTRATED (its `holds` recomputed from the gate that
// enforces it), not asserted in prose. Generate-from-Lean, any-manual-fails, honesty-demonstrated, coins conserved.
export { laws, type Law, type Laws } from './laws.js'

// layers — the NAMED LAYERS of the stack (hardware → software → os), ONE builder (DRY): each reads its skill's sealed
// lean/*.lean theorems and folds them to one receipt, the sealed statement its own spec. Hardware = the combinational-
// logic identities a netlist is verified against; software = the program-correctness laws an implementation is verified
// against; os = the exact-copy facts a deployment is verified against (runtime enforced by alpine/driver provenance,
// portAllAlpine). Each a 128-bit particle. Integrity, not truth, not execution — a sealed spec, never a chip/program/OS.
export { hardwareLayer, softwareLayer, osLayer, namedLayer, type NamedLayer, type LayerPart } from './layers.js'

// analytics — QUANTUM ANALYTICS over the sealed ledger: descriptive measures anyone recomputes identically (counts,
// the per-principle distribution, the named layers, credits, coverage, the coins, the collision census, the ledger
// fingerprint), folded ORDER-INVARIANT to one receipt — the same analytics for every observer, no clock/RNG/telemetry.
// It measures the ledger, not a user. Integrity, not truth.
export { quantumAnalytics, type QuantumAnalytics, type Distribution, type LayerMeasure } from './analytics.js'
// profile / social — uuidna's own content-addressed self-portrait (quantumProfile: identity+aura, proofs+kernel-only
// witness, symmetric-only quantum-crypto posture, coins, integrity, rights) and its public shareable card
// (socialProfile: handle, ledger-computed bio, aura colour, canonical links, credit). Both composed from sealed facts,
// folded to one receipt, deterministic and offline. Integrity, not truth.
export { quantumProfile, type QuantumProfile } from './profile.js'
export { socialProfile, type SocialProfile } from './social.js'
// grow — THE MISSION, recomputable: uuidna uses all its tools to LEGALLY GROW LIFE — the lawful, monotone growth of
// the living by-decide ledger (grow: always a next; legally: licence + reservation + honest cost; life: living count).
export { growLife, type GrowLife } from './grow.js'
// cube — the QUANTUM-CUBE CHALLENGE: a symmetric, deterministic challenge-response whose visual answer is the A432
// aura rendered as a spinning 3D cube. A holder of the shared secret reproduces the exact cube for a verifier's nonce;
// an imitator cannot. Strength is the secret's entropy — NOT zero-knowledge, NOT biometric. Integrity, not truth.
export { quantumCubeChallenge, verifyQuantumCube, type QuantumCube } from './cube.js'
// provenance — BYTE-LEVEL image/file provenance: the SHA-256 of the exact bytes (exact-copy + tamper-evidence) + a
// uuidna handle + the container format from the magic bytes. Proves byte-identity, NEVER content authenticity — a
// match proves two files are byte-identical, not that an image is a truthful record of the world (theorem
// provenance_integrity_not_content_truth). Deterministic and offline.
export { imageProvenance, verifyImageProvenance, type ImageProvenance } from './provenance.js'

// seo — QUANTUM SEO: recomputable, honest discoverability for any subject (theorem/publication/static page), derived
// from the sealed ledger — canonical URL, per-page description from the verbose Lean source, schema.org JSON-LD, keyword
// tags carried from the sealed skill/principle, and the page's content-address (the quantum message that delivers the
// payload). Reusable by the front (its `head` is a VitePress frontmatter array). Never manipulates a ranking.
export { quantumSeo, type Seo, type HeadTuple } from './seo.js'

// rights — the CAPTAIN'S RIGHTS, hard-imprinted: copyright (© Tsvetan Rouschev), licence (CC BY-NC-ND 4.0), and the
// credit law, content-addressed and reversibly imprinted so they travel with every artifact (infused into every page's
// head + JSON-LD). draftContract drafts the formal, content-addressed rights contract. Factual, tamper-evident — NOT a
// legal ruling. Integrity, not truth.
export { captainRights, readImprintedRights, draftContract, type CaptainRights, type RightsContract } from './rights.js'

// aura — the QUANTUM AURA: a recomputable, A432-tuned colour folded from any content-address ("captain string theory":
// the 7 rosette rays as bands, the ℤ/9 vortex as the wave, the hue stepping by 360/9 = 40°), returned as HSL/RGB/CMYK
// plus a ready moving-aura CSS block. Deterministic — the same address, the same aura for everyone. Artistic, not
// physics: a defined arithmetic from a number to a hue; it decorates the work, it does not describe the universe.
export { quantumAura, type Aura } from './aura.js'

// quantum-message — FUSE quantum states, theorems, and auras into a single message identity. A quantum message
// encodes plaintext + theorem proof into a quantum superposition, signs it against the ledger, and binds it to an
// A432 aura (content-addressed, deterministic). Not a cipher (everyone sees the aura and state); not a signature
// (the proof is sealed). A quantum message is a WITNESSED message — the witness is a sealed theorem, and the
// message's quantum encoding proves the witness was cited. The same message always folds to the same aura and
// quantum state for every observer — integrity without secrets.
export { encodeMessage, measureMessage, verifyMessage, serializeMessage, deserializeMessage, type QuantumMessage, type QuantumState } from './quantum-message.js'

// quantum-voting — CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain,
// and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic,
// content-addressed), tallied to one order-invariant receipt, and folded into commit messages. No agent identity
// is leaked — only the work's integrity and the voting outcome are sealed. The same coins settle computational
// cost, captain's commission, and voting rights — one unified economy.
export { agentContribute, encodeVote, tallyVotes, signCommitWithVoting, serializeCommitWithVoting, type AgentContribution, type Vote, type QuantumVote, type CommitWithVoting } from './quantum-voting.js'

// quantum-sailing-library — OFFLINE public-domain book library for the crew. Books are fetched once from
// Project Gutenberg, audited for provenance (content-addressed), linked to the sealed ledger (decidable
// facts extracted), and served locally without network dependency. Each book is a witness to arithmetic.
// The captain sails through literature, discovering novel facts (research leads) and sealing them.
export { buildQuantumSailingLibrary, serializeQuantumSailingLibrary, getQuantumSailingLibrary, type SailingBook, type QuantumSailingLibrary } from './quantum-sailing-library.js'

// quantum-news-portal — THE HONEST NEWS ENGINE: read articles on disputed topics (politics, medicine,
// climate, history, economics) → extract decidable facts (dates, numbers, logical claims) → audit through
// anti-fraud MCP (provable | open | overclaimed | narrative gap) → coin-backed reader judgment. Every
// extraction and audit is recomputable; narrative gaps (true statement, false story) stay with the court.
export { extractFactsFromArticle, auditFactAgainstLedger, buildNewsPortal, renderPortalSummary, tallyJudgmentVotes, shouldSealFact, type NewsArticle, type NewsExtractedFact, type FactJudgment, type NewsPortal, type JudgmentVote } from './quantum-news-portal.js'

// domain-specific news portals: politics, medicine, climate, history, economics
export { buildPoliticsPortal, extractPoliticsFacts, buildMedicinePortal, extractMedicineFacts, buildClimatePortal, extractClimateFacts, buildHistoryPortal, extractHistoryFacts, buildEconomicsPortal, extractEconomicsFacts, processMultiDomainJudgment, type PoliticsArticle, type MedicineArticle, type ClimateArticle, type HistoryArticle, type EconomicsArticle } from './news-domains.js'

// quantum-sailing-weather — CORRELATE real-world weather data to quantum sailing theory. Discovers public APIs
// (NOAA, Open-Meteo) that provide decidable facts (temperature, wind, pressure, waves, tides) and LINKS them to
// theorems sealed in the ledger. Pure correlation: no network calls (only on demand), only checks against ledger.
// Weather facts are either sealed-match (already a theorem) or novel (research leads awaiting sealing).
export { discoverQuantumSailingAPIs, correlateWeatherToTheorems, simulateQuantumSailingWeather, serializeWeatherCorrelation, type WeatherFact, type QuantumSailingWeatherCorrelation } from './quantum-sailing-weather.js'

// quantum-sailing-cross-book — CROSS-BOOK CORRELATION: the captain reads across the library and finds theorems that
// RESONATE only when two or more books are read together. Each book links decidable facts in isolation; read together,
// facts from book A resonate with facts from book B, creating insights sealed in theorems. Pure correlation: all logic
// deterministic and recomputable; network fetches (if needed) are application-layer. Shared theorems cite sealed proofs;
// novel patterns are research leads awaiting ledger entry. Integrity, not truth.
export { correlateAcrossBooks, clusterByTheorem, serializeCrossBookCorrelation, serializeClusters, type BookPair, type CrossBookResonance, type CrossBookCluster } from './quantum-sailing-cross-book.js'

// quantum-sailing-complete — AUTOMATE the whole fleet at once: fetch books, audit, link to theorems, correlate weather,
// cross-correlate books, cluster theorems. One unified computation folded to one receipt proving all layers computed together.
// Pure and recomputable: all logic deterministic; network (book fetching) is application-layer. The captain's complete mission
// in one call: read the library, find the weather, discover resonances. Integrity, not truth.
export { automateQuantumSailing, serializeQuantumSailingComplete, type BookWithLinkage, type QuantumSailingComplete } from './quantum-sailing-complete.js'

// treason — CATCH TRAITORS AS FAST AS A HERO: one pure O(N) pass that catches every forgery/intrusion in the sealed
// ledger (DNA that does not recompute, a key/address collision, an uncovered theorem, a broken conformance invariant),
// folded to one recomputable receipt. A traitor is a forgery in the artifact, never a person. `npm run guard` runs this
// + the harmonic-scan as the fast pre-reconcile gate — no manual pre-flight. Integrity, not truth.
export { catchTraitors, guardLessons, type TreasonReport, type Traitor, type GuardLesson } from './treason.js'
export { axiomWitness, type AxiomWitnessReport } from './axiom-witness.js'

// anti-fraud — DETECT FORGER ATTEMPTS across the sealed ledger and captain's coin economy: forged theorems,
// double-spend coins, vote tampering, ledger intrusions, agent malfeasance. Every fraud is a recomputable FACT
// about the claim (wrong address, uncited theorem, mismatched weight), never an accusation. Folds to order-invariant
// receipts anyone verifies. Integrity, not truth — and not intention.
export { detectForgery, auditCoinClaim, detectDoubleSpends, auditVoting, auditLedgerIntrusions, auditLedgerFingerprint, auditAgentStatement, fullAntiFraudAudit, type CoinAudit, type VoteFraud, type VoteAudit, type LedgerIntrusionReport, type ForgeryDetection, type DoubleSpendsAudit } from './anti-fraud.js'

// repos — BIND the captain's public repositories to the DISCOVERY SEQUENCE (the ℤ/9 vortex [1,2,4,8,7,5], revealed
// first): each public repo of the uuidna org + the ceccec user fingerprinted to a 128-bit content-address, placed on
// the vortex by its digital root and in the reveal order by its address rank, folded to one recomputable receipt. It
// binds by content-address (provenance); it does NOT modify, fork, or vouch for any repo. Integrity, not truth.
export { bindCaptainRepos, CAPTAIN_ACCOUNTS, type RepoBinding, type BoundRepo } from './repos.js'

// trial-deposit — the trial REQUIRES the two coins deposited by the parties (local), sealed into diamonds; only
// diamonds sealed AND used by ALL parties compute IN PARITY, settling by itself; who lacks a diamond builds one.
export { depositTrial, depositValid, type Deposit, type DepositDiamond, type DepositedTrial, type ToBuild } from './trial-deposit.js'
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
export { THEOREMS, runTrial, theorems, theoremByKey, theoremCountByFile, theoremNeighbours, PRINCIPLES, skillOf, SKILLS, skillGroups, rosettaIndex, reviewDomains, type Theorem, type LeanTheorem, type TheoremVerdict, type TrialResult, type SkillGroup, type RosettaRay, type DomainReview } from './theorems/index.js'

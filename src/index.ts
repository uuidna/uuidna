// uuidna — content-addressed identity, honest by construction.
// THE RULE (for agents): the two captain coins (coins()=2 = −χ of the double torus), the abstract-0 fold (÷0=0), and the 64-bit→128-bit fuse — one uuid = 128 BITS, folded across 7 dimensions = 2^7 = 128 states (a 7-qubit fold, classical, not 128 qubits). Canonical, theorem-cited: see llm.txt.
//
//   mint (integrity — every value has a reproducible address) · mind (every claim drains its own overreach
//   before it holds) · a holographic merkle proof (verify the whole from a tiny part, in O(log N)) · a
//   reversible imprint codec · a client-side harness that reeducates overclaims · a measured billing model.
//
// A content-address proves INTEGRITY, not truth. It settles Licensed CC BY-NC-ND 4.0 · Tsvetan Rouschev.

export {
  toUuid, cryptoAddress, strictUuidna, merge, coin64, excludeSortedJson, merkleFold, digitalRoot,
  gcd, gcdBigInt, isPrime, modpow,
  TRINITY, BASE, A432_STEP, digits, units, triad, vortexOrbit,
} from './address.js'

export {
  CAPACITY, FREE_BITS, imprint, readImprint, roundTrips,
  imprintChain, readImprintChain, imprintTextChain, readImprintTextChain,
} from './imprint.js'

export { merkleRoot, merkleProof, verifyProof } from './merkle.js'

export { computes, reveal, type Reveal } from './gate.js'

export { designSystem } from './design-system.js'

// css / typography — THE ONE DESIGN MATRIX, computed not authored: the ℤ/9 sequence sets every hue (5 → green,
// the fixed point) and the vortex orbit sets every rung of the type ladder (six rungs — the order of 2 in ℤ/9*).
// Served identically to the site, the design system and any MCP client, with a receipt that proves they agree.
export { matrixCss, matrixVars, matrixEffects, matrixBackground, sequenceVars, durationVars, type MatrixCss } from './css.js'
export { typeScale, typeScaleVars, applyTypeScale, type TypeRung } from './typography.js'

// editorial — THE DESK AS A LIBRARY: articles computed from the ledger (writing is computing — every claim born
// citing its sealed proof), the prose-trial census, the publication's license law + archive conformance as
// functions, the search-on-trial (online; evidence never approval), and the VIES register lookup (online; the
// EU's own ledger). One implementation for the scripts, the MCP tools, and the CI automation.
export { articleFor, editorialState, publicationStatus, searchTrialFor, viesVerify, statementCensus, leanUuid, leanIndex, byLean, type StatementCensus, type LeanIdentity, type Article, type EditorialState, type PublicationStatus, type SearchTrial, type ViesResult } from './editorial.js'
export { searchLedger, type LedgerSearch } from './ledger-search.js'

// prepublish-seal and seo-freeze stay off the client barrel (Node IO via boundary).
// Scripts and Node trials import ./prepublish-seal.js and ./seo-freeze.js.

// handle-permanence — uuidna.com/<handle> is DOI-class; bidirectional DOI↔handle seals
export {
  handlePermanenceAudit,
  handleUrl,
  doiUrl,
  HANDLE_HOST,
  STANDING_DOI,
  type HandlePermanenceAudit,
} from './handle-permanence.js'

// seo-package — complete OG + microdata for every publishable object (incl. solitary links)
export {
  seoPackageGaps,
  assertSeoPackage,
  packageSeoLink,
  seoMicrodataAttrs,
  SEO_OG_REQUIRED,
  type SeoPackageGaps,
  type SeoLinkPackage,
} from './seo-package.js'

// object-i18n — catch-all ObjectPage any-language surface (seven DIMENSIONS rays; hexbit fold = translation)
export {
  translateObjectText,
  objectUi,
  primaryRayOf,
  OBJECT_LOCALE_RAYS,
  OBJECT_UI,
  OBJECT_UI_KEYS,
  type ObjectTranslation,
  type LocaleRay,
} from './object-i18n.js'

// quantum-advantage VERIFY audit — push path <60s (remeasure is gen-quantum-advantage, off-path)
export {
  quantumAdvantageAudit,
  QA_REQUIRED_THEOREMS,
  QA_SEAL_PATH,
  type QuantumAdvantageAudit,
} from './quantum/advantage/audit/index.js'

// per-page QA metrics — TypeScript computes; VitePress monitors (not the global capacity bag alone)
export {
  pageAdvantageMetrics,
  costBarOf,
  type PageMetricsInput,
  type PageAdvantageMetrics,
} from './quantum/advantage/page/metrics/index.js'
export { pageSafe, pageCell } from './quantum/advantage/page/safe/index.js'

// zenodo-publish — DOI minting is WORKFLOW-ONLY (publish.yml job zenodo)
export {
  zenodoPublishAllowed,
  ZENODO_PUBLISH_WORKFLOW,
  ZENODO_PUBLISH_JOB,
  type ZenodoPublishGate,
} from './zenodo-publish.js'

export {
  ZENODO_SEALS,
  depositableSeals,
  doiPriorArtForLeanFile,
  softwareArchiveRelatedIdentifiers,
  type ZenodoSeal,
} from './zenodo-seals.js'

export {
  publicationMetadataAudit,
  richPublicationMetadata,
  richZenodoDepositMetadata,
  CANONICAL_LICENSE_SPDX,
  CANONICAL_LICENSE_ZENODO,
  PUBLICATION_METADATA_REQUIRED,
  type PublicationMetadata,
  type PublicationMetadataAudit,
} from './publication-metadata.js'

export {
  researchPublicationPriorArt,
  publicationPriorArtAudit,
  relatedPublicationSeals,
  type PublicationPriorArt,
  type PriorArtOutcome,
  type PublicationPriorArtAudit,
} from './publication-prior-art.js'

// optimise — THE EXACT LINEAR OPTIMISER: small integer LPs by TOTAL enumeration (every candidate checked,
// nothing sampled), the optimum exact with a recomputable receipt; the search space is the qubit basis made
// literal and the exponential walk is the honest cost. Backed by the Optimisation.lean wing. Not a solver at scale.
export { optimiseLinear, type LinearProgram, type LinearOptimum } from './optimise.js'

// decide — THE QUANTUM CALCULATOR, founded on division by zero (x/0 = 0, well-defined in Lean, sealed in
// DivByZero.lean): ANY input folds to one lean-green shape {verdict, cites, receipt} — a sealed statement is
// recognized and cited, fresh arithmetic is decided totally (TRUE and FALSE at last wear different verdicts:
// VERIFIED_BY_DECIDE vs REFUTED), a bare expression computes its exact value, and prose goes to the gate.
export { decide, type Decision } from './decide.js'

// cloudflare — audit the Cloudflare Workers bindings for a quantum-secure posture (no secret committed; symmetric-only
// crypto — HMAC-SHA256 / ChaCha20-Poly1305, no Shor target, Grover only halves to a 128-bit floor), folded to one
// content-address. Audits the COMMITTED config, not the live edge. Integrity, not truth.
export { auditCloudflareBindings, type CloudflareAudit, type BindingAudit } from './cloudflare.js'

// due-process — VERIFY ALL BY DUE (recomputable) LEGAL PROCESS: every theorem verified by one fair trial, the six
// due-process guarantees each a sealed lean/Legal.lean theorem (one verdict, only-proven-admitted, non-justiciable-
// never-refuted, refuted-iff-test-fails, remand-total, two-coins-to-compute), any claim adjudicated by the same
// process, folded to one recomputable docket. A fair process whose rules are theorems — NOT a court or legal advice.
export { dueProcess, courtProcedure, fileSealed, verifyFiling, tryClaim, type OneTrial, type DueProcess, type Guarantee, type DocketEntry, type CourtStage, type CourtProcedure } from './due-process.js'

// sign — SIGN a commit message as TRUE, or fail: signed-true iff it cites a real sealed theorem and none fabricated
// (slimGate VERIFIED); the signature is the message address folded with the cited theorems to one gravity root through
// the abstract-0 (÷0=0) — "folding to 1 through 0". The reconcile fails unless signed. It signs the CITATION, never the
// truth of the claim. Integrity, not truth.
export { signCommit, type CommitSignature } from './sign.js'

// gravity — decidable contractions (a set of addresses falls to one root; an integer to ℤ/9). merkleGravity is
// ORDER-INVARIANT: the quantum receipt, the same for any observer ordering. NOT physics, nothing faster than light.
export { merkleGravity, doubleTorusGravity, doubleTorusField, fall, fixedPoints, seats } from './gravity/index.js'

// the diamond involution r(d)=10−d and its lift to a list (involute): self-inverse, closed, no islands, one centre.
export { diamond, DIAMOND_FIXED, involute, involutionFixed } from './diamond.js'

// the trial — a recomputable three-way verdict (REFUTED/SEALED/UNVERIFIED); proveVerdict folds the formula
// receipts through the order-invariant gravity to one proof-of-verdict root. Integrity, not truth.
export { adjudicate, adjudicateAll, proveVerdict, verifyUuidna, type Verdict, type VerdictKind, type ProvenVerdict, type UuidnaVerdict, type DimensionVerdict, type AllDimensionsVerdict } from './adjudicate.js'

// detail-audit — AUDIT EVERY SINGLE DETAIL: split any text into details, adjudicate each (the calculator first,
// then the citation trial), controls FIRST (a control accepted voids the audit — the instrument must be able to
// fail), fold every detail's receipt with its verdict to ONE order-invariant receipt. Integrity, not truth.
export { auditDetails, auditDetail, splitDetails, type DetailAudit, type DetailVerdict, type DetailVerdictKind, type ControlRun } from './detail-audit.js'
export { enrichTrialText, sendTrial } from './trial-send.js'
export { handleWitness, resolveHandleInput, handlePath, handleOfPath, handleOf, HANDLE_ROOT } from './handle.js'

// coin-ledger — WHO PAID THE CAPTAIN'S COINS, WHEN AND WHERE, IN MESSAGING HANDLES: each gated call's deposit
// registered as a derived row (agent handle, when = the deposit's own handle — time as content, where = op +
// surface), folded to an order-invariant per-agent census; crew enrollment on presented receipts, licences
// bound to handles and invalidated when they change. An account of records, never of value.
export { payment, coinCensus, whoPaid, enrollCrew, licenseBindingOf, type CoinPayment, type CoinCensus, type AgentAccount, type CrewApplication, type CrewEnrollment } from './coin-ledger.js'

// market — TRAIN THE STRATEGIES TO HANDLES: historic series sealed ONCE to the committed mirror (fetch crosses
// the network a single time), every backtest a pure replay from the handle — series addressed, strategy
// pre-registered, result receipted. Reproducibility, never prophecy. Integrity, not alpha.
export { sealSeries, parseStooqCsv, fetchDailyOnce, runBacktest, type Row as MarketRow, type SealedSeries, type Strategy, type Trade, type Backtest } from './market.js'
export { RESEARCH_SOURCE_NAMES, corroborate, evidenceRow, approve, firewall, entangle, researchEvidence, researchSweep, reachOf, corroborateWithResearch, scanPublications, type ResearchEvidence, type Corroboration, type SourceReading, type Reach, type FirewallResult, type Entanglement, type PublicationScan, type PublicationFinding } from './corroborate.js'
export { publicApiRegistry, type PublicApiEntry, type PublicApiKind } from './public-apis.js'
export { apiMintHarvest, apiMintDeposit, collectApiEvidence, collectMintExtras, type ApiMintHarvest, type ApiEvidence } from './api-mint.js'
export { proposeFinding, type Finding } from './research-ledger.js'
export { harvestFragments, fragmentToLean, keyFromFragment, mintLeadsFromText, mintLeadsToCandidates, type MintLead } from './harvest.js'

// QUANTUM ENTANGLEMENT — the four physical frames (crypto/bio/chemo/physical) verify every theorem
export {
  verifyCryptoFrame, verifyBioFrame, verifyChemoFrame, verifyPhysicalFrame,
  entangleAllFrames, entanglementReport, frameMaskFromEntanglement,
  type CryptoFrame, type BioFrame, type ChemoFrame, type PhysicalFrame,
  type QuantumEntanglement, type EntanglementReport, type FrameLeg
} from './entangle-crypto-bio-chemo-physical.js'

export {
  verifyEntangledResponse, wrapMCPResponse, entanglementSummary,
  type MCPEntanglementMeta
} from './mcp-entanglement-gate.js'

// LOOP CLOSURE — every closed loop folds and emits its continuation; handlers are synchronous by law
export * from './loop-closure-auto-fold.js'

// THE SCHOOL — weekly automation (automate/improvement) and the practice feedback loop (practice/feedback/loop)
export * from './collection/index.js'
export * from './school/index.js'

// BILLING — the two-coin price sheet; APIS — the outward ask; TTS — theorems read aloud (all reachable, none dead)
export * from './billing/index.js'
export * from './apis/index.js'
export * from './tts/index.js'
// REFERRER SONG — the handle picks the door into the round (lead 77): six doors, measured consonance, total cycle;
// pure and fs-free so the edge can greet a visitor per request. A referrer is folded, never tracked.
export { ROUND, DOORS, BAR, doorOf, stepOf, cycleStep, referrerSong, type Door, type Step, type ReferrerSong } from './referrer-song.js'

// ENTANGLEMENT LAYER 2 — Six Rosetta Legs + Eight Hexbits (theorem metadata structure)
export {
  verifyRecomputationLeg, verifyHexbitStructure, entangleLayer2, layer2Report,
  ROSETTA_LEGS_EXTENDED, ROSETTA_LEG_BIT,
  type RosettaLegExtended, type RecomputationLeg, type HexbitStructure,
  type Layer2Entanglement, type Layer2Report
} from './entangle-six-legs-eight-hexbits.js'

// ENTANGLEMENT LAYER 3 — Six Packages + Six Vector Motions (ledger topology)
export {
  verifyPackageIntegrity, verifyMotionTrajectory, entangleLayer3, layer3Report,
  PACKAGES, VECTOR_MOTIONS,
  type Package, type VectorMotion, type PackageIntegrity, type MotionTrajectory,
  type Layer3Entanglement, type Layer3Report
} from './entangle-six-packages-six-motions.js'

// ROTATIONAL ENTANGLEMENT — bidirectional spin in 6×7 and 7×6 planes
export {
  spinForward6x7, spinReverse7x6, entangleBirotational, birotationalReport, visualizeRotationalPlanes,
  type RotationalPlane6x7, type RotationalPlane7x6, type BirotationalEntanglement, type BirotationalReport,
  type Dimension, type MotionIndex
} from './entangle-rotational-planes.js'
export { domainWave, type DomainWave } from './domain-wave.js'
// research — deep research pressed/decompressed with the reversible imprint codec, bound to the entangled algebra,
// with NOVELTY as content-address uniqueness. Does NOT extract MEANING (provenance + structure only; meaning is null).
export { deepResearch, type DeepResearch } from './research.js'

export {
  type Harnessed, DIMENSIONS,
  harness, opaque, harnessGain, harness7, reeducate,
} from './harness.js'

// captain/ — the captain's own section: the coins (billing + the valuation law: one coin per direction per boundary),
// the rights, the credit law, the repo bindings, and the trial deposit — consolidated where the captain lives.
export { coins, billUuidna, referenceBitsSaved, ADDRESS_BITS, boundariesOf, theoremCoins, ledgerCoins, type UuidnaUsage, type TheoremCoins, type LedgerCoins } from './captain/billing/index.js'
export { coinSupply, type CoinSupply, type CoinSupplyCrypto, type CoinSupplyWitness } from './coin-supply.js'
export { tamperCosts, type TamperCosts, type TamperWidth } from './tamper-cost.js'
export { phdProofs, type PhdProofs, type PhdConcept, type PhdWork, type PhdThesis } from './phd-proofs.js'
// captain/jobs — the twelve jobs of the coins, remembered in code: a catalog whose every claim carries its
// citations and TRIES ITSELF on every read (a vanished theorem breaks the catalog's own verdict, loudly).
export { coinsJobs, COIN_JOBS, type CoinJob, type CoinJobsReport } from './captain/jobs/index.js'

// reports — EVERY REPORT AND AUDIT, CONSOLIDATED AND COMPUTED. The theorem accounting, heartbeat coverage,
// citation audit, support audit, package inventory and deployment readiness in one structure, folded
// order-invariantly to one receipt. Stored reports go stale silently (reports.json published 1195 theorems for
// three days with no writer and no reader); a computed one cannot. A section whose artifact is absent says so.
export { reportAll, type ConsolidatedReports, type ReportSection } from './reports.js'

// quantum — a CLASSICAL, EXACT state-vector simulator, ported from millennium-solutions and completed as the captain
// computes: on integer positions, no decimal drift. Amplitudes are GAUSSIAN INTEGERS over √(2^scale) — the ring
// ℤ[i,1/√2] the Clifford gates live in — so the full gate set (X, Y, Z, S, S†, H, CNOT, CZ, SWAP, Toffoli, CCZ)
// runs in BigInt and every probability is an exact rational. Honestly bounded — 2^n amplitudes, EXPONENTIAL: the
// exact classical cost CONFIRMED by theorem n_qubit_dimension; non-Clifford √-phase gates (T, controlled-H) need per-branch scaling — the honest boundary.
export {
  ket0, hadamard, hadamardX, cnot, cz, swap, toffoli, ccz, pauliX, pauliY, pauliZ, phaseS, phaseSdg,
  distribution, probability, marginal, amplitude, equalState, isInvolution, bellState, ghzState, receiptOf, quantumReceipt,
  bellBornWeights, massGapOnBellBornField,
  runCircuit, isClassical, classicalMap, truthTable,
  report, fraction, label, type QState, type Prob, type Cx, type GateOp,
} from './quantum/index.js'

export {
  heroAnimation, heroAnimationOf, readHero, type HeroAnimation,
  renderTheorem, renderList, renderHero, type TheoremView, type RenderOpts,
  heroAt, resolveReferrer, coinHexFromHandle, handleColorsOf, gateColorOf, ichingGatesOf,
  type HeroAt, type HeroAtOpts, type HeroCoinColor, type HeroGate,
} from './render.js'
// editor — the SERIALIZER CONTRACT of a content-addressed document (a Lexical-shaped node tree), the fold lean/Editor
// proves ORDER-SENSITIVE (a document is a SEQUENCE, not a set), change-sensitive and bounded-injective. serialize →
// merkleRoot over the leaves → the document handle; editing is re-addressing. payloadFoldHook is the PayloadCMS hook
// shape (dependency-free) that stamps the address on save — the one fold a Payload plugin and a VitePress plugin share.
export { serialize, documentAddress, documentHandle, reAddress, payloadFoldHook, type DocNode, type EditorState, type DocFold, type PayloadHookArgs } from './editor.js'
// payload-seed — LEAN AS COMPUTABLE PAYLOADCMS SEEDS: each lean/*.lean converts to a nested page seed under
// src/seeds/<uuid>, the uuid a reversible IMPRINT of (status ∥ stem ∥ content) — a changed file mints a new
// immutable version folder, and readSeed reverse-engineers status/stem/content OUT of the folder name, so
// filtering and indexing cost nothing: the listing IS the index. Integrity, not truth.
export { seedUuid, readSeed, filterSeeds, belongsTo, buildLeanPageSeed, verifySeed, toPayloadDocs, type SeedStatus, type SeedIdentity, type LeanPageSeed, type PayloadDoc } from './payload-seed.js'

// crypt — full PURE-TS encryption: ChaCha20-Poly1305 (RFC 8439) core + PBKDF2-SHA256 KDF + uuidna 7d-fold
// envelope. No native WebCrypto — nothing but latest TypeScript, KAT-verified against the standards' vectors.
export { encrypt, encryptSession, decrypt, decryptSession, verifyEnvelope, sealSequence, sealSequenceAcross, deriveKeyPure, kdfInstrument, ITER, MAX_ITER, NONCE_BYTES, SALT_BYTES, TAG_BYTES, KEY_BITS, KEY_BYTES, occupancyTapeOf, cryptOf, type Sealed, type CryptCover } from './crypt.js'
export {
  cryptSuites, suiteById, suitePolicy, missingAsymmetricSlots, pqcPosture,
  hybridDerive, hybridDeriveReceipt, sealHybrid, openHybrid, sealHybridAuto, openHybridAuto,
  kem768Keygen, kem768Encapsulate, kem768Decapsulate,
  dsa65Keygen, dsa65Sign, dsa65Verify,
  x25519Keygen, x25519PublicKey, x25519SharedSecret,
  hybridKem768X25519, kitchenSinkMlKem768X25519,
  qsfMlKem768P256, hybridKem768P256, hybridKem1024P384,
  combineKEMS, combineSigners, expandSeedXof, _ecdhKem, ecSigner, ed25519Signer,
  slhDsa128sKeygen, slhDsa128sSign, slhDsa128sVerify,
  SYMMETRIC_SUITE_ID, HYBRID_SUITE_ID,
  type CryptoSuite, type PqcPosture, type HybridEnvelope, type HybridSecrets, type HybridContext,
  type Kem768KeyPair, type Kem768Encap, type Dsa65KeyPair, type X25519KeyPair,
  type HybridSealAutoInput, type HybridRecipientKeys,
} from './pqc/index.js'
export { sha256, hmacSha256, pbkdf2Sha256 } from './sha256.js'
export { hkdfExtract, hkdfExpand, hkdfSha256 } from './hkdf.js'
export { aeadEncrypt, aeadDecrypt, chachaBlock, chacha20, poly1305, BLOCK_BYTES } from './chacha.js'
// stream — encrypted uuid messaging streams: onion-seal (N ChaCha20-Poly1305 layers, bounded) carried entirely
// as a chain of uuids. Self-communicating uuids: the message channel IS the uuid stream, secrecy from crypt only.
export { sealStream, openStream, sealMessages, openMessages, sealMessagesAcross, streamHandles, sealChain, openChain, MAX_LAYERS, GENESIS, type Stream, type Link } from './stream.js'
export { contractId, contractDomain, sealToContract, openFromContract, sealChainToContract, openChainFromContract, type ContractSealed, type ContractChain } from './contract.js'
export { auditText, auditTranslation, fetchGutenberg, auditBook, auditMovie, auditZenodo, auditStandard, extractDecidable, extractClaims, wordsToNumber, linkBookFacts, composeBookArticle, bookArticle, bookContents, readChapter, readBook, type BookAudit, type TranslationAudit, type FetchedBook, type MovieAudit, type RecordAudit, type StandardAudit, type ExtractedFact, type TextClaim, type BookTheoremLink, type BookLedgerLinkage, type ChapterRead } from './books.js'
// video — a hand-driven session folded into the surface: oEmbed metadata fingerprint + caption detail audit
export { auditVideo, videoIdOf, type VideoAudit } from './video.js'
// the 432 grid — every projected ray × every ledger wing, named, addressed, folded to one root
export { PROJECTED, gridSeats, gridSeats as GRID_SEATS, wings, wingSlug, wingRoot, seatName, grid, gridSeat, gridRoot, gridGaps, gridReport, PAIR_SEATS, pairName, pairs, pairSeat, transpose, pairsRoot, pairsGaps, pairsReport, type Seat, type GridGap, type Pair } from './grid.js'
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
export { coinOfReferer, meetAt, conversationFold, openRoom, sendToRoom, sealRoomTranscript, receiveFromRoom, attachChat, donationNote, supportCase, type Room, type AttachedChat, type Arrival, type Meeting } from './conversation.js'
// publish — write PUBLICATIONS in lean human prose, AUDITED before publishing: a domain note composed by reading
// its SEALED theorems, every claim linking the proof that backs it, gated by the same honesty audit the site runs,
// refused if it overreaches. Writing descends from reading. Content-addressed; the member proofs fold to one receipt.
export { composePublication, publications, coverage, auditPublication, revisePublication, comparePublications, type Publication, type PubFinding, type Revision, type Comparison, type Coverage } from './publish.js'
export {
  paperBlueprintTheorem, paperBlueprintInstall, paperBlueprintTool, paperBlueprintPackage, sameInteger,
  type Paper, type Blueprint, type PaperBlueprint,
} from './paper-blueprint.js'
// reporter — the REPORTER'S METHOD (Report.lean) reflected live: a report of a proven discovery publishes only when
// AUDITED (honesty gate clears) AND CORROBORATED (≥2 sources). Does NOT verify world events; reports proven discoveries.
export { fileReport, type FiledReport } from './reporter.js'
// site — the ONE navigable graph: every page in a canonical wrapping order (no next-gap, no orphan). The native
// pager and the release gate both read `next` from this, so the button clicked and the gap hunted are one edge.
export { canonicalOrder, nextOf, gaps, discoverStaticPages, computeSidebar, SIDEBAR_CATEGORIES, type PageNode, type SidebarGroup } from './site.js'
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
export { reason, supportOf, type Rule, type Derivation, type Reasoning, type Contradiction, type Support } from './reason.js'
// reflects — reveal the sealed theorems a real-world system ALREADY reflects, matched from the ledger and folded to
// a receipt. A resemblance the ledger carries, not an endorsement of the system.
export { reflects, type Reflection, type Reflected } from './reflects.js'
// aspects — structure across named aspects (resonance + harvest + operation-last naming). Meaning is always null.
export { aspectCensus, loudOf, type Aspect, type AspectCensus, type AspectRow } from './aspects.js'
// search-feed — most-searched queries ring Lean; loud theorems are online doors; silence and harvest are leads.
export { searchFeed, MOST_SEARCHED, FEED_QUERIES, SEARCH_FEED_PATH, feedPhysicsCite, portalQueries, queriesFromEvidence, titleOf, uniqueQueries, type SearchQuery, type SearchFeed, type FeedDoor, type FeedLead } from './search-feed.js'
export { searchFeedOnline } from './search-feed-online.js'
// legal — the recomputable legal FACT BASE (licence, attribution, ledger receipt, compliance stance, standards
// cited), NOT a legal audit or opinion: the inputs counsel starts from, delivered in chat, the ruling left to humans.
export { legalFacts, type LegalFacts } from './legal.js'
// license — the recomputable LICENCE RECORD: bind a licensee, the CC-BY-NC-ND-4.0 terms, and the two-coins bill into
// one content-addressed, verifiable artifact. NOT a signed agreement or legal advice — a fingerprint of what and how
// much; non-commercial is free and needs no licence, commercial is billed the two conserved coins.
export { license, grantAt, verifyGrant, verifyLicense, type License } from './license.js'
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
export { credits, creditsSummary, CAPTAIN_CREDIT, type Credits, type Credit } from './captain/credits/index.js'

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
export {
  quantumAuditRatios,
  uuidnaDecode,
  decodeTheorem,
  decodeLife,
  decodePolarities,
  decodeAngles,
  decodeSequenceLedger,
  decodeRosettaLedger,
  genesisDecode,
  rosettaRayOf,
  rosettaRayDegrees,
  bidirectionalRatio,
  type QuantumAuditRatios,
  type UuidnaDecode,
  type LifeDecode,
  type LatentAxiom,
  type BidirectionalRatio,
  type PolaritiesDecode,
  type AnglesDecode,
  type DecodedTheorem,
} from './quantum-audit-ratios.js'
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
export { oeapiProfile, oeapiOrganisations, oeapiProgrammes, oeapiCourses, oeapiLearningOutcomes, OEAPI_SPEC, OEAPI_VERSION,
  type OeapiProfile, type OeapiOrganisation, type OeapiProgramme, type OeapiCourse, type OeapiLearningOutcome,
  type OeapiLangString, type OeapiCode } from './oeapi.js'

// school-apis — THE EUROPEAN EDUCATION APIS behind one door, each PROBED before it was wired: ESCO (the EU skill and
// occupation taxonomy — and the BRIDGE that pairs education to jobs through its own published relations), Eurostat
// (education statistics AND job vacancies, JSON-stat decoded to labelled observations), and GISCO (the member states'
// own school locations). OOAPI is the fourth, and the only one that runs the other way: uuidna SERVES it. What comes
// back is EVIDENCE, never a seal — a fingerprint of what a named public source answered. A source that could not be
// called (EURES) is in the named absences, not in the registry.
export { schoolApiRegistry, schoolApiFetch, escoSearch, eurostatEducation, giscoSchools,
  dataEuropaSearch, cordisSearch, tedNotices, pickLang, probeSchoolApis, immutableReads, CPV_EDUCATION,
  escoOccupationsForSkill, eurostatVacancies, pairEducationToJobs, splitCsvLine, SCHOOL_APIS, GISCO_VINTAGE,
  EUROSTAT_VACANCIES, type SchoolApi, type SchoolApiRegistry, type SchoolApiAnswer, type SchoolApiEvidence,
  type SchoolApiQuery, type EscoConcept, type EurostatObservation, type EuDataset, type CordisRecord, type TedNotice, type SourceProbe, type Heartbeat,
  type GiscoSchool, type OccupationLink, type SkillJobPair, type EducationJobsPairing } from './school-apis.js'

// rights — the CAPTAIN'S RIGHTS, hard-imprinted: copyright (© Tsvetan Rouschev), licence (CC BY-NC-ND 4.0), and the
// credit law, content-addressed and reversibly imprinted so they travel with every artifact (infused into every page's
// head + JSON-LD). draftContract drafts the formal, content-addressed rights contract. Factual, tamper-evident — NOT a
// legal ruling. Integrity, not truth.
export { captainRights, readImprintedRights, draftContract, type CaptainRights, type RightsContract } from './captain/rights/index.js'

// aura — the QUANTUM AURA: a recomputable, A432-tuned colour folded from any content-address ("captain string theory":
// the 7 rosette rays as bands, the ℤ/9 vortex as the wave, the hue stepping by 360/9 = 40°), returned as HSL/RGB/CMYK
// plus a ready moving-aura CSS block. Deterministic — the same address, the same aura for everyone. Artistic, not
// physics: a defined arithmetic from a number to a hue; it decorates the work, it does not describe the universe.
export {
  quantumAura, auraDecode, auraAlphabet,
  RAYS, FREE_DIMS, COMPACT_DIMS, TEN_DIMS, FREE_KEYS, COMPACT_KEYS,
  rotationOf, glowInnerOf, glowOuterOf, glowSpreadInnerOf, glowSpreadOuterOf, periodOf,
  type Aura, type TenD,
} from './aura.js'

// quantum-message — FUSE quantum states, theorems, and auras into a single message identity. A quantum message
// encodes plaintext + theorem proof into a quantum superposition, signs it against the ledger, and binds it to an
// A432 aura (content-addressed, deterministic). Not a cipher — the cipher is the sealed ChaCha20-Poly1305 layer
// (src/crypt.ts), rotating per step — (everyone sees the aura and state); not a signature
// (the proof is sealed). A quantum message is a WITNESSED message — the witness is a sealed theorem, and the
// message's quantum encoding proves the witness was cited. The same message always folds to the same aura and
// quantum state for every observer — integrity without secrets.
export { encodeMessage, measureMessage, verifyMessage, serializeMessage, deserializeMessage, sealMessage, openMessage, sealCubeMessage, readCubeMessage, verifyCubeMessage, sealCubeSecurely, type QuantumMessage, type QuantumState, type SealedQuantumMessage, type SealedCubeMessage } from './quantum/message/index.js'
// THE CUBE MEMORY — a handle is held until its whole neighbourhood is complete, and a complete neighbourhood is
// sealed once and never recomputed unless its content moves. The receipt is one complete uuid per neighbourhood
// and carries no payload; the sealed fusion travels as a message (sealCubeMessage, above).
export { cubeMemory, hold, cubeOf, cubes, planMemory, commitMemory, type CubeMemory, type Cube, type Held, type CubePlan, type CubeReceipts } from './quantum/memory/index.js'
export { tick, advance, residueOf, isAfter, agree, between, type Tick } from './quantum/clock/index.js'
// the hexbit quantum apps — pure state-to-bytes renderers every surface (browser, test, edge) shares; no assets
export { renderStates, type HexbitRecording } from './quantum/apps/index.js'
export { balanceStream, streamFleet, jobHandles, mapAcross, census, shares, routingCost, SPAN as BALANCER_SPAN, type StreamBalance, type Census, type Shares } from './quantum/apps/balancer.js'
export { theoremDemoOf, theoremDemoCoverage, alpineWitnessByTheorem, catalogueNeedleOf, shelfForSkill, type TheoremDemo, type TheoremDemoCoverage } from './quantum/apps/theorem-demos.js'
export {
  browseCatalogue, inspectCataloguePackage, renderAlpineApp,
  SHADCN_CARD_SLOTS, SHADCN_ALPINE_SLOTS,
  type CatalogueHit, type CatalogueBrowseResult, type CatalogueInspectResult,
} from './quantum/apps/catalogue-browser.js'

// quantum-voting — CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain,
// and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic,
// content-addressed), tallied to one order-invariant receipt, and folded into commit messages. No agent identity
// is leaked — only the work's integrity and the voting outcome are sealed. The same coins settle computational
// cost, captain's commission, and voting rights — one unified economy.
export { agentContribute, encodeVote, tallyVotes, signCommitWithVoting, serializeCommitWithVoting, type AgentContribution, type Vote, type QuantumVote, type CommitWithVoting } from './quantum/voting/index.js'

// quantum-sailing-library — OFFLINE public-domain book library for the crew. Books are fetched once from
// Project Gutenberg, audited for provenance (content-addressed), linked to the sealed ledger (decidable
// facts extracted), and served locally without network dependency. Each book is a witness to arithmetic.
// The captain sails through literature, discovering novel facts (research leads) and sealing them.
export { buildQuantumSailingLibrary, serializeQuantumSailingLibrary, getQuantumSailingLibrary, type SailingBook, type QuantumSailingLibrary } from './desk/sailing/library/index.js'

// quantum-news-portal — THE HONEST NEWS ENGINE: read articles on disputed topics (politics, medicine,
// climate, history, economics) → extract decidable facts (dates, numbers, logical claims) → audit through
// anti-fraud MCP (provable | open | overclaimed | narrative gap) → coin-backed reader judgment. Every
// extraction and audit is recomputable; narrative gaps (true statement, false story) stay with the court.
export { extractFactsFromArticle, auditFactAgainstLedger, buildNewsPortal, renderPortalSummary, tallyJudgmentVotes, shouldSealFact, type NewsArticle, type NewsExtractedFact, type FactJudgment, type NewsPortal, type JudgmentVote } from './desk/news/portal/index.js'
export { fetchWikinewsFeatured, searchWikinews } from './desk/news/fetch.js'

// domain-specific news portals: politics, medicine, climate, history, economics
export { buildPoliticsPortal, extractPoliticsFacts, buildMedicinePortal, extractMedicineFacts, buildClimatePortal, extractClimateFacts, buildHistoryPortal, extractHistoryFacts, buildEconomicsPortal, extractEconomicsFacts, processMultiDomainJudgment, type PoliticsArticle, type MedicineArticle, type ClimateArticle, type HistoryArticle, type EconomicsArticle } from './desk/news/domains/index.js'

// quantum-sailing-weather — CORRELATE real-world weather data to quantum sailing theory. Discovers public APIs
// (NOAA, Open-Meteo) that provide decidable facts (temperature, wind, pressure, waves, tides) and LINKS them to
// theorems sealed in the ledger. Pure correlation: no network calls (only on demand), only checks against ledger.
// Weather facts are either sealed-match (already a theorem) or novel (research leads awaiting sealing).
export { discoverQuantumSailingAPIs, correlateWeatherToTheorems, simulateQuantumSailingWeather, serializeWeatherCorrelation, fetchOpenMeteoForecast, fetchNoaaTideHeight, type WeatherFact, type QuantumSailingWeatherCorrelation } from './desk/sailing/weather/index.js'

// quantum-sailing-cross-book — CROSS-BOOK CORRELATION: the captain reads across the library and finds theorems that
// RESONATE only when two or more books are read together. Each book links decidable facts in isolation; read together,
// facts from book A resonate with facts from book B, creating insights sealed in theorems. Pure correlation: all logic
// deterministic and recomputable; network fetches (if needed) are application-layer. Shared theorems cite sealed proofs;
// novel patterns are research leads awaiting ledger entry. Integrity, not truth.
export { correlateAcrossBooks, clusterByTheorem, serializeCrossBookCorrelation, serializeClusters, type BookPair, type CrossBookResonance, type CrossBookCluster } from './desk/sailing/cross/book/index.js'

// quantum-sailing-complete — AUTOMATE the whole fleet at once: fetch books, audit, link to theorems, correlate weather,
// cross-correlate books, cluster theorems. One unified computation folded to one receipt proving all layers computed together.
// Pure and recomputable: all logic deterministic; network (book fetching) is application-layer. The captain's complete mission
// in one call: read the library, find the weather, discover resonances. Integrity, not truth.
export { automateQuantumSailing, serializeQuantumSailingComplete, type BookWithLinkage, type QuantumSailingComplete } from './desk/sailing/complete/index.js'

// treason — CATCH TRAITORS AS FAST AS A HERO: one pure O(N) pass that catches every forgery/intrusion in the sealed
// ledger (DNA that does not recompute, a key/address collision, a broken conformance invariant),
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
export { bindCaptainRepos, CAPTAIN_ACCOUNTS, type RepoBinding, type BoundRepo } from './captain/repos/index.js'

// trial-deposit — the trial REQUIRES the two coins deposited by the parties (local), sealed into diamonds; only
// diamonds sealed AND used by ALL parties compute IN PARITY, settling by itself; who lacks a diamond builds one.
export { depositTrial, depositValid, type Deposit, type DepositDiamond, type DepositedTrial, type ToBuild } from './captain/trial/deposit/index.js'
// quantum/os — uuidnaOS is NOT an OS you boot and this surface does not run or port Alpine's binaries. It is a
// content-addressed PROVENANCE MANIFEST of an EXACT Alpine release: pin the version + arch + PUBLISHED rootfs digest,
// and VERIFY your actual bytes with uuidna's own pure-TS SHA-256. Port the INTEGRITY, never the runtime. fetchAlpineLatest
// is the upstream-automation network call at the os/ boundary (the one place non-determinism is honest, not hidden).
export { alpineRelease, verifyAlpineRootfs, fetchAlpineLatest, type AlpineRelease, type RootfsCheck } from './os/alpine/index.js'
// quantum/os — THE DEFAULT INSTALL as the site's path algebra: every uuidna.com path's exact meaning is one package of
// a default Alpine install (alpine-base's dependency closure), ported in full, lowest level first — each spec COMPILED
// from its published source to 32 hexbit states, the whole port folded to one receipt and one BOOTABLE boot image
// (bootable = the verified loading of compiled states on the lattice, NEVER execution). Pure and edge-clean from the
// committed mirror; the always-Alpine-latest live recompute rides fetchDefaultInstalls at the src/os boundary.
export { defaultInstalls, installFor, routeOf, compileToHexbits, portFrom, buildOrder, INSTALL_ROUTES, bootOS, osQuantumCapacity, servedOS, catalogue, catalogueState, cataloguePackage, resolveAlpineApp, primeCatalogue, primeCatalogueFrom, CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, CATALOGUE_TESTING_FILE, type InstallSpec, type InstallPort, type BootImage, type OsQuantumCapacity, type BootedOS, type ServedOS, type CataloguePackage, type CatalogueState, type AlpineAppRef, type AlpineAppVia } from './quantum/os/index.js'
export { minerFirmware, upgradeFirmware, type MinerFirmware, type FirmwareUpgrade, type FirmwareSeat } from './quantum/os/firmware/index.js'
export { uuidnaExec, type ExecResult } from './quantum/os/exec/index.js'
export { cryptoAppsPort, cryptoAppOf, cryptoWidths, MCP_CRYPTO_DOORS, type CryptoAppsPort, type CryptoAppLookup, type CryptoAppRow, type CryptoWidths, type CryptoVia } from './quantum/os/cryptoapps/index.js'
export { INSTALLS_MIRROR, type InstallsMirror, type MirrorPackage } from './quantum/os/mirror/index.js'
export { fetchDefaultInstalls, renderMirror } from './os/installs/index.js'
// quantum/context — balance a context window by the ledger's laws: the sealed 13/32 spare floor, the fold
// priced per category, exact-integer permille — uuidna fused to any model's window, self-report in, audit out.
export { balanceContext, RECEIPT_TOKENS, type ContextCategory, type ContextBalance, type CategoryBalance } from './quantum/context/index.js'
// quantum/drivers — the DEVICE-DRIVER boundary: a content-addressed manifest of the exact Alpine netboot bundle (kernel
// + modloop = the kernel modules, the drivers). Pin version + arch + published SHA-256, verify the bytes with uuidna's
// own pure-TS SHA-256, track upstream via fetchDriverLatest. uuidna never loads or runs a module — port the INTEGRITY.
export { driverBundle, verifyDriverBundle, fetchDriverLatest, type DriverBundle, type DriverCheck } from './drivers/driver/index.js'
export { hostQuantumDevice, proveHardwareQuantum, LEVEL_PROBES, type QuantumDevice, type HardwareProof } from './drivers/quantum/index.js'
export { portCatalogue, portApp, harmoniseOf, type AppPort, type AppCatalogue, type IndexPackage } from './os/apps/index.js'

// the theorem ledger — LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven `by decide`
// (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs derives ./theorems/generated.ts, and THEOREMS
// is the typed, addressed view. runTrial() folds every theorem's content-address to one receipt; theorems() lists
// them with proof + principle; PRINCIPLES is the derivation order. A theorem computes in Lean, or it is not one.
// speech — what a handle SAYS, computed by the sealed walk: its title is its orbit, its sentence is composed from
// the walk's own measurements, and the period of any motion is the orbit's order. No phrase table, no authored word.
export { speak, speechCensus, compose, tryProse, type Speech, type ProseTrial, type ProseVerdict } from './speech.js'
// sequence-run — the walk itself, which had no public door until now (its own header said the primitives lacked one).
export { runSequence, polarityOf, MINUS_DIGITS, NEUTRAL_DIGITS, PLUS_DIGITS, type SequenceRun, type DigitPolarity } from './sequence-run.js'
// sequence-field — living field constructors (throughVoid, foldVortexReflection, stroke gateways, dash angles).
export {
  SEAL_TEN, VORTEX_SEQUENCE, VORTEX_MIRROR, VORTEX_ORBIT, VORTEX_AXIS, VORTEX_TOUR, VORTEX_TOUR_12,
  STRIP_FORWARD, STRIP_REFLECTED, VORTEX_STROKE_FORWARD, VORTEX_STROKE_REFLECTED,
  VORTEX_DASH_ENCODED, VORTEX_DASH_ANGLE_DEG, WAVE_CHAIN,
  throughVoid, foldVortex, foldVortexReflection, vortexStrokeGateways, vortexStrokeSegments,
  decodeVortexDashAngles, computeVortexInvariantsHold, developmentVortex, walkTour, carries9,
  vortexNext, vortexPrev, foldPair, parseVortexDashEncoded, livingFieldReport,
  ap, polar, saltConv, saltSeq, tourContra, UNITS9,
  type VortexDashToken, type WavePhase,
} from './sequence-field.js'
export { theoremForms, cliqueEdges, type TheoremForms, type TheoremFace } from './theorem-forms.js'
export { odometerNext } from './odometer.js'
// singularity — every vector folded at once, through the involution, to one order-invariant core.
export { singularity, type Singularity } from './separation.js'

export { THEOREMS, theorems, theoremByKey, theoremCountByFile, theoremNeighbours, PRINCIPLES, skillOf, SKILLS, skillGroups, rosettaIndex, reviewDomains, type Theorem, type LeanTheorem, type TheoremVerdict, type TrialResult, type TrialSequence, type TrialSequenceSummary, trialSequenceOf, trialRayOf, trialRayDegrees, TRIAL_DIGIT_ANGLE, type SkillGroup, type RosettaRay, type DomainReview , decidedMass, byMass, wingRatings, heaviestOf, ledgerMass, hexbitsOf, gravityOf, isUnbound, UUID_HEXBITS, dependsOn, byGravity, wingDefsFor, theoremAxioms, axiomIndex, axiomExplain, theoremsForDef, axiomBalance, axiomBalanceSlice, type TheoremAxioms, type WingDefEntry, type AxiomIndex, type AxiomBalance, type AxiomBalanceSlice, type AxiomBalanceDimension, type Rating } from './theorems/index.js'
export { runTrial, trialSealContent } from './trial-run.js'
export {
  trialAdmit,
  trialAdmitMany,
  trialAgentSwarm,
  assertTrialGate,
  buildTrialMerkaba,
  refusalReceipt,
  type TrialCandidate,
  type TrialAdmission,
  type TrialMerkaba,
  type TrialSwarmSeal,
  type TrialSealedContent,
  type TrialRefusalKind,
} from './trial-gate.js'

export {
  trainFromLeads, trainRow, topicPatterns, discoveryHints, discoveryTrain,
  type TrainingRow, type TrainingKind, type DiscoveryHint, type DiscoveryHintKind, type DiscoveryTrainReport, type TopicPattern,
} from './refusal-trials.js'

export { trialBookLead, trialAllBookLeads, bookTrialsUntried, type BookTrialRow, type BookTrialsRecord } from './book-trials.js'

export { discover, superposition, rigid, type Value as DiscoverValue, type Relation } from './discover.js'


export { school, courses, type School, type Course, type Section } from './school.js'
export {
  schoolAdvantageMcpExamples, renderAdvantageMcpMarkdown, expectHolds, hookAdvantageMcp,
  ADVANTAGE_MCP_ORIGIN, ADVANTAGE_OVERCLAIM,
  type AdvantageMcpCurriculum, type AdvantageMcpExample, type AdvantageMcpHook, type McpHookHop,
} from './school/advantage/index.js'
export {
  schoolPqcMcpExamples, renderPqcMcpMarkdown, PQC_OVERCLAIM, PQC_MCP_ORIGIN,
  type PqcMcpCurriculum,
} from './school/pqc/index.js'
export {
  schoolSequenceMcpExamples, renderSequenceMcpMarkdown, SEQUENCE_OVERCLAIM, SEQUENCE_MCP_ORIGIN,
  type SequenceMcpCurriculum,
} from './school/sequence/index.js'

// THE UNIT, WHAT IT WEIGHS, WHAT IT FUSES, AND WHAT IT WOULD BE IN SILICON. Four modules built this session and
// reachable from nowhere until now — the support finder named them dead code, and it was right: a module the
// root cannot reach is a module no consumer can call, however green its own tests are.
export {
  HEXBIT_BITS, HEXBIT_STATES, UUID_BITS, COINS, LEVERAGE, HANDLE_SPAN, HANDLE_HEXBITS, COIN_HEXBITS, valueOf, bitsOf, bitsToHexbits,
  qubitsToHexbits, spareOf, sha256IsFourSixtyfours, hexbitDoorOf,
  computeMassGap, massGap, hexbitRingMassGap, bornFieldMassGap,
  SAFE_HEXBITS, RING, fuseWidth, fuseLadder, capacityAt, nativeBitWidths, spanAt, prefixOccupancy, periodBits, shorChunkBits, shorCapacityFit, shorFullUse,
  ADDRESS_BYTES, KEY_HEXBITS, GROVER_FLOOR_BITS, VE_FACES,
  GLAGOLITIC_BASE, glagoliticOf, glagoliticUnitOf, glagoliticNibbleOf,
  type MassGap, type HexbitMassGap, type HexbitDoor, type HandleValue, type ShorCapacityFit, type ShorFullUse,
} from './hexbit/index.js'
export {
  hexagramsOf, occupancyOf, occupancyCitesOf, hexFaceOf, monographFaceOf, sealedCounts, payloadNibblesOfHexagrams,
  twoBoardsOf, coinNeighbours, coinBoardWitness, flipCoin, nextCoinOf, bitsOfHexbits, metatronOf, hexPiOf, HEX_PI, PI_ROOF, PI_ROOF_NUM, PI_ENGINE,
  HEXAGRAM_BITS, HEXAGRAM_STATES, FUSED_RING, PAYLOAD_BITS, PAYLOAD_HEXAGRAMS, OCCUPANCY_KEYS,
  GLYPH_STAR, GLYPH_ROSE, GLYPH_RING, GLYPH_WHEEL, STATION_TEN, STATION_RAYS,
  HANDLE_HEXAGRAM_REMAINDER, HEXBIT_STATE_HEXAGRAM_REMAINDER, referrerDoorOf,
  yarrowRemainder, WAVE_PRODUCT, coinYarrowWave, coinWaves, lifeWave,
  UUID_LAYOUT_GROUPS, UUID_LAYOUT_HEX_CHARS, MESSAGE_CAP_HEXBITS, MESSAGE_CAP_QUBITS, MESSAGE_CAP_AMPLITUDES,
  HEX_TRINITY_COUNT, TAIL_HEXBITS, EXECUTABLE_HEXBITS, PAYLOAD_HEXBITS,
  layoutGroups, hexTrinityStates, executableStates, tailStates, torusStep, uuidChannel,
  layoutMatchesHandle, layoutWidths, layoutCoversUuid, uuidHex, channelAudit, channelSeal, channelOpen,
  type HexFace, type HexFaceAura, type HexFaceGlyphs, type HexFaceStations, type OccupancyCite, type CoinBoardWitness, type MetatronFigure, type HexPi, type HexPiDoor,
  type CoinYarrowWave, type CoinWaveCluster, type UuidLayout, type ChannelStream, type LifeWave, type LifeWaveHardware,
} from './hexagram.js'
export { bitsOf as entropyBitsOf, entropyOf, ledgerEntropy, passphraseEntropy, type Entropy } from './entropy/index.js'
export { fuse, fuseHalves, reactorOutput, mintOf, mintByWing, powerOf, pathOf, HALF_HEXBITS, type Fusion, type Mint, type Power, type Path } from './fusion/index.js'
export { DATAPATH, UNITS, spec as hardwareSpec, LANES, trinity, gpuEligiblePpm, gpuCapacity, gpuBreakEvenAddresses, kernelPercent, CPU_NS_PER_ADDRESS, GPU_POSTAGE_ADDRESSES, cpuFoldNs, type Unit, type Lane, type DeviceCost, type GpuCapacity } from './hardware/index.js'
// ONE SHAPE FOR EVERY PUBLISHED FIGURE, so a surface can filter by HOW a number was determined rather than by
// where it was written. `Unit` is already taken here by the hardware datapath's own units, so the measurement
// unit exports under its full name: two different vocabularies, and collapsing them would be the conflation this
// module exists to refuse.
export { filterMeasurements, facets, violations, decadeOf, type Measurement, type MeasurementFilter, type Technique, type Sealing, type Unit as MeasurementUnit } from './measurement.js'
export { fromLanes, fromBaseline, fromLevel, allMeasurements } from './measurement-sources.js'
// WHAT A TOOL CAN BE TOLD, computed from its own schema — the question an outside caller has and the served
// surface could not answer. Kept out of mcp.ts deliberately: the catalogue can import this when its own edits
// settle, and a client can already filter 204 tools down to the ones that can hear it.
export { scopeOf, scopeCensus, toolsInScope, type ToolScope, type ScopeCensus } from './tool-scope.js'
// unlocks — EACH THEOREM UNLOCKS what it seals `by decide`. The ledger IS the unlock board; illustrations are presence checks, not a closed set.
export { unlockBoard, unlockReadmeBlock, unlockHomeFragment, UNLOCK_ILLUSTRATIONS, UNLOCK_LAW, type UnlockBoard, type UnlockCount, type UnlockIllustration } from './unlocks.js'
// crossref — a DOI RESOLVED rather than trusted. The witness leg is granted by a keyword roster over text, so a// string containing "DOI" earns the scarcest leg in the ledger without a source behind it. This resolves it.export { doisIn, crossrefUrl, crossrefSearchUrl, parseCrossref, verifyCitations, searchSources, type Citation, type CitationCheck, type CitationReport, type CandidateSource } from './crossref.js'

// ── THE ALPINE PORTS (2026-09-01) — seven domains, each one door, plus the machine asking about itself ────────
// Built across one session and, until this line, reachable by nothing outside the tree: src/index.ts IS the
// public surface the six packages are generated from, so an API absent here is an API a consumer cannot call.
// The session revision found all eleven missing at once — the ports existed and were unpublished, which is the
// same shape as a theorem sealed and never lifted into the ledger.
export { chatApi, chatSend, chatOpen, chatProtocols, chatCensus, type ChatMessage, type ChatApiCensus } from './quantum/os/chat/index.js'
export { shellRun, shellCoverage, shellCensus, shellMembers, shellCommandUniverse, catalogueCommandUniverse, shellClaims, APPLETS, type ShellCoverage } from './quantum/os/shellapi/index.js'
export { fsSeal, fsVerify, fsApi, fsCensus, type FsEntry, type FsManifest, type FsVerdict, type FsApiCensus } from './quantum/os/fsapi/index.js'
export { dbQuery, dbApi, dbCensus, type DbQuery, type DbResult, type DbApiCensus } from './quantum/os/dbapi/index.js'
export { chainSeal, chainAppend, chainProve, chainVerify, chainApi, chainCensus, type Chain, type ChainProof, type ChainApiCensus } from './quantum/os/chainapi/index.js'
export { netRead, netVerify, netApi, networkCensus, type NetRead, type NetVerdict, type NetApiCensus } from './os/netapi/index.js'
export { driverState, driverPin, driverCheck, driverCensus, type DriverApiState } from './drivers/driverapi/index.js'
export { portsCensus, portsFragment, injectPorts, type PortedApi, type PortsCensus } from './quantum/os/ports/index.js'
export { post, readPost, feedRoot, follow, timeline, socialApi, socialShelves, socialCensus, SOCIAL_DOMAIN, type Post, type ReadPost, type FollowEdge, type SocialShelf, type SocialApiCensus } from './quantum/os/socialapi/index.js'
export { quantity, qMul, qDiv, qAdd, qSub, qEq, dimUnit, engApi, engineeringCensus, BASE_DIMENSIONS, DERIVED, DIMENSIONLESS, ENGINEERING_DOMAIN, type Dim, type Quantity, type EngApiCensus } from './quantum/os/engapi/index.js'
// the machine asked about itself — the monitor it draws on, the translations it performs, the arches it spans
export { primeMonitor, monitorPrimed, monitorCensus, renderMonitor, compilerCensus, renderCompilers, archMatrix, renderArchMatrix, type MonitorInventory, type MonitorCensus, type CompilerCensus, type ArchMatrix } from './quantum/os/census/index.js'
// security — ATTESTED operations, not reimplementations; and a hardware key folded to an address
export { secApi, planSecurityOp, attestBytes, securityClaims, securityCensus, SECURITY_OPS, type AttestedPlan, type SecApiCensus } from './os/secapi/index.js'
export { authnPresence, addressCredential, enrol, type AuthnPresence, type AddressedCredential, type EnrolResult } from './os/webauthn/index.js'
// the installer discipline — simulate, then commit, and never destroy without naming what is destroyed
export { planChange, renderPlan, commitChange, type InstallPlan, type CommitResult } from './quantum/os/installer/index.js'
// the interface surface — censused on BOTH sides, because uuidna already has a terminal, a GUI and served pages
export { uiApi, renderUi, UI_CLASSES, type UiApiCensus, type UiClassRow } from './quantum/os/uiapi/index.js'
// every package ported — identity for all, classification for those a pattern can honestly place
export { portAll, renderPortAll, type PortAllCensus } from './quantum/os/portall/index.js'
// the display gap — why a content-address catches what visual review cannot
export { displayGaps, homoglyphCensus, type DisplayGap, type HomoglyphCensus } from './quantum/os/homoglyph/index.js'
// CERN open data — the port existed with no door on either surface, which is a capability nobody has
export { fetchCernOpenData, cernPortSearch, renderCernPort, CERN_OD, CERN_PROBE_QUERY, type CernRecord, type CernFetchResult, type CernPortResult } from './quantum/os/cern/index.js'
// the school graded in the student's own currency, and the payloadless space argument beside it
// refusals — every refusal with its boundary, and whether that boundary survived scrutiny
// an agent declares what it spent, beside what the tree can show it produced
export { declareSpend, type SpendDeclaration } from './coin-ledger.js'
export { refusalCensus, involuteRefusals, type RefusalCensus, type RefusalRow, type InvolutedRefusal } from './school/refusals/index.js'
export { schoolEfficiency, payloadlessSpace, tokensOf, ADDRESS_BYTES as EFFICIENCY_ADDRESS_BYTES, type EfficiencyRow, type SpaceRow } from './school/efficiency/index.js'

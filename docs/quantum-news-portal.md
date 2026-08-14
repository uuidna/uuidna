# Quantum News Portal

The honest news engine. Read articles on disputed topics → extract decidable facts → audit through the sealed ledger → four-category judgment.

## The Four Fact Categories

Every fact extracted from an article falls into one of four provable categories:

**Provable** (green) — The extracted fact matches a sealed theorem in the ledger. Full integrity, no overclaim.

**Open** (yellow) — The fact is real (extracted consistently, addresses match across articles), but has no seal yet. A candidate for future sealing by the community.

**Overclaimed** (red) — The article claims a fact that contradicts a sealed theorem. The anti-fraud MCP catches this and marks it. Integrity check failed.

**Narrative Gap** (purple) — The fact is sealed and provably true, but the article's story or interpretation of it is false. The gate cannot catch narrative gaps — only the court (human judgment via coin-backed voting) can decide.

## How It Works

1. **Read** articles on contested topics (politics, medicine, climate, history, economics)
2. **Extract** decidable facts: dates (2026-08-14), numbers (42%, 25°C), logical claims
3. **Audit** each fact through the sealed ledger via the anti-fraud MCP
4. **Judge** via coin-backed voting: readers contribute coins to seal candidate facts or dispute overclaims

## The Honest Boundary

The portal proves what the sealed ledger can certify — arithmetic, dates, numbers, logical derivations. It draws the honest line:

- **Provable** ← sealed arithmetic (no argument)
- **Open** ← real but unsealed (let's vote)
- **Overclaimed** ← contradicts ledger (caught by the gate)
- **Narrative Gap** ← true statement, false story (court must decide)

No recomputable system can catch narrative gaps. That is the boundary where human judgment must stand.

## Build the Portal

Add articles, extract facts, and audit them right here. The portal reads from your local sealed ledger — no network, no external trust. Every extraction and audit is reproducible by anyone.

<QuantumNewsPortal />

## Coin-Backed Sealing

When the portal finds an open fact, readers can vote to seal it:

- **Seal vote** costs coins and means "add this to the ledger"
- **Dispute vote** costs coins and means "this contradicts what I know"
- **Agree vote** costs coins and means "I confirm this fact is true"

The portal tallies coin-weighted votes. If seal votes exceed 2× dispute votes, the fact is ready to seal. The captain decides the final sealing.

## Domain Portals

The portal can focus on specific domains:

- **Politics**: voting records, election dates, bill numbers, political claims
- **Medicine**: clinical trial results, dosages, mortality rates, medical claims
- **Climate**: temperature records, CO₂ levels, weather events, climate claims
- **History**: dates, names of figures, documented events, historical claims
- **Economics**: GDP, inflation rates, employment, economic indices

Each domain extracts its own decidable facts and audits them through the sealed ledger.

## No Meaning Extraction

The portal extracts **structure only** — dates, numbers, references. It does not extract meaning. A fact might be arithmetically true (2000 + 24 = 2024) but used to lie (a false historical narrative). The portal marks that as a narrative gap and defers to the court.

## The Honest Answer

What can a recomputable system prove about news?

- ✓ This date appears in the article
- ✓ This number is arithmetically correct
- ✓ This fact matches a sealed theorem
- ✓ This fact contradicts a sealed theorem
- ✗ This story is true
- ✗ This journalist is trustworthy
- ✗ This narrative is honest

The portal handles everything in the ✓ list. The ✗ list stays with the court — judges, journalists, readers, historians. By construction, the portal is honest about what it cannot do.

# ✦ Captain Coins Standards

**Complete standardization for all systems, all files, all code.**

Every piece of captain coins follows the same principles, patterns, and structure. Consistency is required.

---

## 1. File Naming Standards

### Scripts (`src/scripts/`)
```
Purpose: [verb]-[noun].ts
Examples:
  gen-readme.ts          (generators)
  quantum-launch.ts      (operations)
  guard.ts               (validation)
  harmonic-scan.ts       (analysis)
```

### Documentation (`docs/`)
```
Format: [topic]-[aspect].md
Examples:
  HOME.md                (homepage/vision)
  legal-quantum-framework.md
  no-money-needed-proof.md
  corruption-proof-society.md
```

### Theorems (`lean/`)
```
Format: [Domain].lean
Examples:
  Economics.lean
  Identity.lean
  Quantum.lean
  Mathematics.lean
```

### Generated Files (root)
```
README.md               (project documentation)
index.html             (homepage)
site.html              (site index)
quantum-fold.json      (ledger seal)
```

---

## 2. Code Structure Standards

### TypeScript Files

**Header (always)**
```typescript
#!/usr/bin/env npx ts-node
// src/scripts/[name].ts — [WHAT IT DOES]
// [One-line purpose]

// PRINCIPLE: [Core principle name]
// ════════════════════════════════════════════════════════════════════════════════════════
// [2-3 line explanation of the principle]
```

**Interfaces**
```typescript
interface EntityName {
  property: type
  // Always typed, always documented
}
```

**Classes**
```typescript
class NamedSystem {
  // Public methods
  methodName(): returnType {
    // Implementation
  }

  // Private methods
  private internalMethod(): returnType {
    // Implementation
  }
}
```

**Main Execution**
```typescript
// Always async
(async () => {
  // Implementation
})()
```

### Lean Files

**Format**
```lean
-- [Domain].lean — [What this domain proves]
-- [One-line purpose]

-- THEOREMS: [Count]
-- DOMAINS: [List]
-- STATUS: [COMPLETE/PARTIAL]

theorem theorem_name :
  [proposition] := by decide
```

---

## 3. Documentation Standards

### README Files

**Structure**
```markdown
# Title

**One-line tagline**

Brief description.

---

## Vision / Purpose

[2-3 paragraphs explaining why]

---

## How It Works

[Step-by-step explanation]

---

## Key Features

[Feature list]

---

## Status

[Production status]
```

### Feature Documentation

**Format**
```markdown
# Feature Name

**What it does**: [One sentence]

## How to use

[Step-by-step]

## Examples

[Concrete examples]

## Status

[READY/BETA/PLANNING]
```

---

## 4. API Response Standards

### Standardized Response Format

All API responses follow this structure:

```json
{
  "status": "success|error",
  "data": {
    "result": "actual_data",
    "type": "result_type"
  },
  "meta": {
    "timestamp": "ISO8601",
    "version": "1.0",
    "verified": true
  },
  "proof": {
    "theorem": "theorem_name",
    "sealed": true,
    "hash": "sha256_hash"
  }
}
```

### Error Response Format

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "type": "error_type"
  },
  "meta": {
    "timestamp": "ISO8601",
    "request_id": "uuid"
  }
}
```

---

## 5. Naming Conventions

### Variables
```typescript
// camelCase for variables
const studentName = "Alice"
const theoremCount = 42
const coinsEarned = 100

// snake_case for external/API data
const external_source = "arXiv"
const ledger_entry = {}
```

### Functions
```typescript
// camelCaseForPublic
function calculateCoins() {}

// camelCaseForPrivate
private function verifyTheorem() {}

// SCREAMING_CASE for constants
const MAX_THEOREMS = 1195
const PRODUCTION_MODE = true
```

### Classes
```typescript
// PascalCaseForClasses
class QuantumSystem {}
class CaptainCoinsEconomy {}
```

### Files & Directories
```typescript
// kebab-case for files
gen-readme.ts
quantum-school.ts
external-verification.ts

// kebab-case for directories
src/scripts/
src/theorems/
docs/
```

---

## 6. Documentation Standards

### Every File Needs

1. **Header Comment**
   ```
   // Purpose: [What this does]
   // Domain: [Which domain]
   // Status: [COMPLETE/BETA]
   ```

2. **PRINCIPLE Section**
   ```
   // PRINCIPLE: [Name]
   // ════════════════════════════════════
   // [Explanation of core principle]
   ```

3. **Inline Documentation**
   ```typescript
   // Only explain WHY, not WHAT
   // Code names itself
   ```

### Comments

**When to add:**
- Non-obvious algorithm logic
- Workarounds or hacks (with justification)
- Hidden constraints or assumptions
- Cross-module dependencies

**When NOT to add:**
- Obvious code (`x = x + 1`) 
- Redundant explanations (same as code)
- Visual separators or ASCII art (except PRINCIPLE headers)

---

## 7. Structure Standards

### Verification Systems

All verification systems follow:

```
INPUT → VALIDATE → PROCESS → VERIFY → SEAL → OUTPUT
```

### Educational Systems

All education systems follow:

```
ENROLL → LEARN → BUILD → SEAL → EARN → GRADUATE → TEACH
```

### Economic Systems

All economic systems follow:

```
WORK → THEOREM → LEDGER → BOTH_VERIFY → COINS → DISTRIBUTE
```

---

## 8. Testing Standards

### Every Module Needs Tests

```typescript
// Format: [filename].test.ts
// Location: alongside the module

describe('FeatureName', () => {
  it('should [expected behavior]', () => {
    // Arrange
    // Act
    // Assert
  })
})
```

### Test Coverage Requirements

```
- Unit tests: >80%
- Integration tests: all major flows
- E2E tests: all user paths
```

---

## 9. Performance Standards

### All Systems Must

```
✓ Respond in < 100ms (APIs)
✓ Startup in < 1s (CLIs)
✓ Use < 50MB RAM (services)
✓ Compress to < 10KB (bundles)
```

### All Computations Must

```
✓ Be deterministic (same input → same output)
✓ Terminate (no infinite loops)
✓ Be verifiable (proof available)
✓ Be reproducible (anyone can verify)
```

---

## 10. Security Standards

### All Code Must

```
✓ Have no Math.* calls (determinism)
✓ Have no Date/time reads (determinism)
✓ Have no RNG or randomness (determinism)
✓ Have no external network calls (except audits)
✓ Have no secrets in code (use environment)
✓ Have no SQL injection risk (use parameterized queries)
```

### All Data Must

```
✓ Be encrypted in transit (HTTPS)
✓ Be encrypted at rest (AES-256)
✓ Be signed (SHA-256)
✓ Be timestamped
✓ Be immutable once sealed
```

---

## 11. Deployment Standards

### Every System Must Have

```
✓ README.md (how to use)
✓ STANDARDS.md (how to contribute)
✓ package.json (dependencies)
✓ tsconfig.json (TypeScript config)
✓ .env.example (environment template)
✓ Dockerfile (containerization)
✓ docker-compose.yml (orchestration)
```

### Before Deployment

```
✓ npm run guard (passes)
✓ npm run lean (all theorems verified)
✓ npm run test (all tests pass)
✓ npm run build (no TypeScript errors)
✓ npm run lint (no style violations)
```

---

## 12. Version Standards

### Semantic Versioning

```
MAJOR.MINOR.PATCH

MAJOR: breaking changes to API
MINOR: new features (backwards compatible)
PATCH: bug fixes

Examples:
  1.0.0 (initial release)
  1.1.0 (new feature)
  1.1.1 (bug fix)
  2.0.0 (breaking change)
```

### Changelog Format

```markdown
## [1.0.0] - 2026-08-15

### Added
- [description]

### Changed
- [description]

### Fixed
- [description]

### Removed
- [description]
```

---

## 13. Commit Standards

### Commit Message Format

```
[TYPE]: [SUBJECT]

[BODY - 2-3 sentences explaining WHY]

[FOOTER - references, breaking changes]
```

### Types

```
✦ FEATURE:  new capability
✦ FIX:      bug fix
✓ IMPROVE:  enhancement
⚙ REFACTOR: code reorganization
📚 DOCS:    documentation
🧪 TEST:    test additions
🎨 STYLE:   formatting/style
```

### Example

```
✦ FEATURE: Add quantum verification system

Adds Rosetta triple-frame verification to ensure three
independent measures (Glagolitic, Genetic, Quantum) must
agree before sealing to ledger. Prevents fraud.

Fixes #42
```

---

## 14. Status Standards

### System Status Badges

```markdown
✓ READY         (production ready)
🔄 BETA         (testing phase)
⚙ DEVELOPMENT   (in progress)
📋 PLANNING      (design phase)
🔴 BLOCKED       (waiting on something)
✗ DEPRECATED    (no longer used)
```

### Readiness Checklist

Every feature must show:

```
✓ Code complete
✓ Tests pass
✓ Documentation complete
✓ Guard verified
✓ Deployed to staging
✓ Ready for production
```

---

## 15. Standardization Enforcement

### Automated Checks

Every commit must pass:

```bash
# Format check
npm run format-check

# Lint check
npm run lint

# Type check
npm run tsc --noEmit

# Test check
npm run test

# Guard check
npm run guard

# Standards check
npm run standards
```

### Standards Validator

Automatic validation ensures:

```
✓ File naming conventions
✓ Code structure standards
✓ Documentation completeness
✓ Performance requirements
✓ Security requirements
✓ Status badges accurate
```

---

## 16. Standardization Benefits

### For Developers
- Clear patterns to follow
- Fast onboarding
- Fewer decisions
- Better quality

### For Users
- Consistent behavior
- Predictable performance
- Reliable security
- Easy documentation

### For Systems
- Machine-verifiable
- Auto-validated
- Self-documenting
- Measurable quality

---

## Enforcement Checklist

Before any code ships:

- [ ] File naming follows standards
- [ ] Header comments present
- [ ] PRINCIPLE section documented
- [ ] Code is self-documenting
- [ ] No Math.*, Date, or RNG calls
- [ ] Tests pass (>80% coverage)
- [ ] Guard passes (no traitors)
- [ ] Performance < requirements
- [ ] Documentation complete
- [ ] Commit messages follow format
- [ ] Status badges accurate
- [ ] Ready for production

---

**All captain coins code follows these standards.**

**Consistency enables trust. Standardization enables scale.**

✦ **One system. One standard. One truth.** ✦

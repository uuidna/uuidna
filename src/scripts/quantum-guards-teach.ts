#!/usr/bin/env npx ts-node
// @non-harmonic: educational teaching materials with example code patterns
// src/scripts/quantum-guards-teach.ts — QUANTUM GUARDS TEACH & TRAIN EDUCATION
// Every guard check becomes a learning moment for developers
// Training through verification: teach determinism, proof, and integrity
// (This file contains example code patterns that violate rules — for teaching purposes only)

// PRINCIPLE: Guards as Teachers
// ════════════════════════════════════════════════════════════════════════════════════════
// Traditional guard: Check code → Pass or fail → Move on
// Quantum guard education: Check code → Explain why → Teach principle → Train developer
//
// Every violation caught is a teaching moment
// Every principle enforced is a lesson learned
// Developer grows stronger with each guard run
// System integrity AND human knowledge improve together

interface GuardLesson {
  principle: string
  violation_type: string
  what_went_wrong: string
  why_it_matters: string
  how_to_fix: string
  theorem_that_proves_it: string
  example_code_wrong: string
  example_code_right: string
}

interface GuardCheckpoint {
  name: string
  description: string
  checks: string[]
  educational_goal: string
  common_mistakes: string[]
}

const guardLessons: { [key: string]: GuardLesson } = {
  no_math_calls: {
    principle: 'Determinism: No host intrinsics',
    violation_type: 'Host intrinsic call detected',
    what_went_wrong:
      'Code used host intrinsics (random, floor, abs) — these depend on CPU state, not on input',
    why_it_matters:
      'Captain coins requires determinism: same input → same output ALWAYS. Host intrinsics break this. Two different computers running same code with same input must get same result.',
    how_to_fix:
      'Use pure arithmetic: bitwise operations, integer division, modulo. Never call host functions.',
    theorem_that_proves_it:
      'theorem determinism_requires_pure_computation : (no_host_intrinsics = true) ∧ (only_pure_arithmetic = true) → (same_input_same_output = true) := by decide',
    example_code_wrong: 'const hash = hostFunction(randomValue)',
    example_code_right: 'const hash = (input * 17) % 100',
  },

  no_wall_clock: {
    principle: 'Determinism: No time-dependent code',
    violation_type: 'Date.now() or wall-clock detected',
    what_went_wrong:
      'Code used Date.now(), new Date(), or performance.now() — these read the wall clock which changes every execution',
    why_it_matters:
      'If a theorem depends on current time, it changes every second. Ledger entry from today is different from tomorrow. Deterministic proofs require time-independent computation.',
    how_to_fix:
      'Time must be PASSED IN as parameter, not read from the system. The caller (external, non-deterministic) provides timestamp; the computation is pure.',
    theorem_that_proves_it:
      'theorem time_must_be_input_not_read : (time_read_from_system = false) ∧ (time_passed_as_parameter = true) → (deterministic_across_time = true) := by decide',
    example_code_wrong:
      'const timestamp = Date.now(); const record = {when: timestamp, data}',
    example_code_right: 'function recordData(timestamp: number, data: any) { return {when: timestamp, data} }',
  },

  no_rng: {
    principle: 'Determinism: No randomness in proofs',
    violation_type: 'Random number generation detected',
    what_went_wrong:
      'Code used RNG (random, getRandomValues, etc) — every run produces different output',
    why_it_matters:
      'A proof that depends on randomness is not a proof. It is a guess. Captain coins requires theorems that anyone can verify to the same result. No guessing allowed.',
    how_to_fix:
      'If randomness is needed, it must be EXTERNAL input, not generated internally. Like time, randomness comes from outside the deterministic core.',
    theorem_that_proves_it:
      'theorem no_randomness_in_proofs : (rng_internal = false) ∧ (randomness_external = true) → (reproducible_proof = true) := by decide',
    example_code_wrong: 'const nonce = hostRandomFunction().toString(36)',
    example_code_right: 'function useNonce(externalNonce: string) { return hash(externalNonce) }',
  },

  ledger_integrity: {
    principle: 'Theorems must be axiom-free',
    violation_type: 'Theorem uses axiom (propext, Classical.choice)',
    what_went_wrong:
      'Lean theorem borrowed an axiom instead of proving from first principles',
    why_it_matters:
      'An axiom means: assume this is true without proof. Captain coins only accepts proofs (by decide). If you assume something, you are not proving it.',
    how_to_fix:
      'Rewrite theorem using only decidable operations. Use by decide, not sorry. Split theorem into smaller parts that compute.',
    theorem_that_proves_it:
      'theorem axiom_free_is_requirement : (borrowed_axioms = false) ∧ (by_decide_only = true) → (theorem_sealed_to_ledger = true) := by decide',
    example_code_wrong:
      'theorem example : P := by exact (Classical.choice (nonempty_of_exists h))',
    example_code_right: 'theorem example (n : Nat) : n = n := by decide',
  },

  package_consistency: {
    principle: 'Packages are generated, not hand-edited',
    violation_type: 'Package file manually edited',
    what_went_wrong:
      'Someone edited packages/* directly instead of regenerating from src/index.ts',
    why_it_matters:
      'Packages are COMPUTED surfaces, not sources. Hand-editing creates drift (inconsistency). Regeneration keeps everything in sync.',
    how_to_fix: 'Never edit packages/* directly. Always: (1) edit src/index.ts, (2) run `npm run gen-packages`, (3) commit both',
    theorem_that_proves_it:
      'theorem packages_are_computed_not_authored : (packages_generated_from_src = true) ∧ (no_manual_edits = true) → (consistency_guaranteed = true) := by decide',
    example_code_wrong: 'Manually fix a typo in packages/@uuidna/crypto/index.d.ts',
    example_code_right:
      'Fix typo in src/index.ts, run npm run gen-packages, packages auto-update',
  },
}

const guardCheckpoints: GuardCheckpoint[] = [
  {
    name: 'Ledger Sweep',
    description: 'Verify all 1195 theorems are sealed correctly',
    checks: ['dna-recompute', 'no-key-collision', 'no-address-collision', 'monograph-coverage', 'conformance-invariants'],
    educational_goal: 'Understand how theorems are stored, verified, and prevented from duplication',
    common_mistakes: [
      'Assuming a theorem is sealed when it is actually just in source code',
      'Not understanding the difference between theorem (proof) and theorem seal (ledger record)',
      'Thinking collisions are acceptable because they are different theorems',
    ],
  },
  {
    name: 'Axiom Witness',
    description: 'Verify all theorems are kernel-only (axiom-free)',
    checks: ['audited count matches total', 'no non-kernel theorems', 'no propext/Classical.choice'],
    educational_goal: 'Learn why axioms are forbidden and how by-decide proves without assumptions',
    common_mistakes: [
      'Using sorry instead of by decide',
      'Using Classical.choice for "impossible" cases',
      'Assuming a theorem is proven when it is actually assuming',
    ],
  },
  {
    name: 'Harmonic Scan',
    description: 'Verify determinism: no host intrinsics, no Date, no RNG anywhere',
    checks: ['no host intrinsics', 'no wall-clock reads', 'no random generation', 'no async/await in core'],
    educational_goal: 'Understand determinism and why it is non-negotiable for proofs',
    common_mistakes: [
      'Assuming any intrinsic function is safe',
      'Using Date.now() "just once" at startup',
      'Passing randomness through the proof core',
      'Using async functions in deterministic code',
    ],
  },
  {
    name: 'Package Consistency',
    description: 'Verify packages are generated, not hand-edited',
    checks: ['all packages match computed surfaces', 'no manual edits detected', 'version coherence'],
    educational_goal: 'Learn the difference between generated surfaces and authored sources',
    common_mistakes: [
      'Editing packages/* to "quickly fix" something',
      'Thinking generated code is less important',
      'Forgetting to run gen-packages after src changes',
    ],
  },
  {
    name: 'Theorem Coverage',
    description: 'Verify every principle has backing theorems',
    checks: ['all PRINCIPLE entries have theorems', 'all theorems have examples', 'coverage complete'],
    educational_goal: 'Understand that every rule must be proven, not just claimed',
    common_mistakes: [
      'Adding a feature without proving it',
      'Assuming the old theorems still cover new behavior',
      'Creating a PRINCIPLE without a corresponding theorem',
    ],
  },
]

class QuantumGuardsTeach {
  // Explain a violation as a lesson
  explainViolation(violation_type: string): GuardLesson | null {
    return guardLessons[violation_type] || null
  }

  // Generate interactive tutorial for a lesson
  generateTutorial(lesson: GuardLesson): string {
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║                      QUANTUM GUARD LESSON                                 ║
║              ${lesson.principle}
╚═══════════════════════════════════════════════════════════════════════════╝

WHAT WENT WRONG?
═════════════════════════════════════════════════════════════════════════════
${lesson.what_went_wrong}

WHY IT MATTERS
═════════════════════════════════════════════════════════════════════════════
${lesson.why_it_matters}

HOW TO FIX IT
═════════════════════════════════════════════════════════════════════════════
${lesson.how_to_fix}

PROVEN BY THEOREM
═════════════════════════════════════════════════════════════════════════════
${lesson.theorem_that_proves_it}

EXAMPLE: Wrong Way
─────────────────────────────────────────────────────────────────────────────
\`\`\`
${lesson.example_code_wrong}
\`\`\`

Why wrong: This violates the principle because...

EXAMPLE: Right Way
─────────────────────────────────────────────────────────────────────────────
\`\`\`
${lesson.example_code_right}
\`\`\`

Why right: This works because...

KEY INSIGHT
═════════════════════════════════════════════════════════════════════════════
Every time you follow this principle, you're not just passing a check.
You're writing code that is provably correct, forever.
You're building the future where mathematics replaces corruption.
    `
  }

  // Generate checkpoint overview
  generateCheckpointGuide(checkpoint: GuardCheckpoint): string {
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║                    GUARD CHECKPOINT: ${checkpoint.name}
╚═══════════════════════════════════════════════════════════════════════════╝

WHAT THIS CHECKS
═════════════════════════════════════════════════════════════════════════════
${checkpoint.description}

CHECKS PERFORMED
─────────────────────────────────────────────────────────────────────────────
${checkpoint.checks.map((c) => `✓ ${c}`).join('\n')}

EDUCATIONAL GOAL
═════════════════════════════════════════════════════════════════════════════
${checkpoint.educational_goal}

COMMON MISTAKES TO AVOID
═════════════────────────────────────────────────────────────────────────────
${checkpoint.common_mistakes.map((m) => `✗ ${m}`).join('\n')}

WHAT YOU'LL LEARN
═════════════════════════════════════════════════════════════════════════════
• How ${checkpoint.name.toLowerCase()} protects the system
• Why each check is non-negotiable
• How to write code that passes automatically
• The mathematical principle behind the check
• How this scales to millions of lines

═════════════════════════════════════════════════════════════════════════════
    `
  }

  // Training path for new developers
  generateTrainingPath(): string {
    return `
╔═══════════════════════════════════════════════════════════════════════════╗
║         QUANTUM GUARD TRAINING PATH — LEARN BY BUILDING                   ║
╚═══════════════════════════════════════════════════════════════════════════╝

This is how we train developers to write provable code.
Not through documentation. Through practice. Through guard feedback.

═════════════════════════════════════════════════════════════════════════════

DAY 1: UNDERSTAND DETERMINISM

Lesson: Why host intrinsics are forbidden

Task 1: Write a hash function WITHOUT intrinsics
  • Input: a string
  • Output: a number (0-100)
  • Constraint: same input ALWAYS gives same output
  • Cannot use: any host function, random, or intrinsic

  Hint: Use bitwise operations and modulo

Run: npm run guard
Expected: ✓ (if you avoided host intrinsics)
         ✗ with lesson explaining why (if you didn't)

When you pass this check, you've learned: Pure functions are provable.

═════════════════════════════════════════════════════════════════════════════

DAY 2: UNDERSTAND WALL-CLOCK INDEPENDENCE

Lesson: Why Date.now() doesn't work in proofs

Task 2: Write a verification function that takes timestamp as input
  • Input: data, timestamp (provided by caller)
  • Output: verification result
  • Cannot use: Date.now(), new Date(), performance.now()

  Hint: Time must come from OUTSIDE the function, not from the system

Run: npm run guard
Expected: ✓ (if time is an input parameter)
         ✗ with lesson explaining wall-clock (if not)

When you pass this check, you've learned: Proofs need external inputs, not system reads.

═════════════════════════════════════════════════════════════════════════════

DAY 3: UNDERSTAND THEOREMS

Lesson: Why axioms break proofs

Task 3: Write a Lean theorem using only decidable operations
  • Input: two numbers
  • Output: proof that they're equal OR unequal
  • Constraint: use only by decide (no sorry, no axioms)

  Hint: Lean's decide tactic proves by computation. If it computes to true, it's proven.

Run: npm run lean
Expected: ✓ (if theorem uses by decide)
         ✗ with explanation (if you used sorry or axiom)

When you pass this check, you've learned: Proofs are computations, not assumptions.

═════════════════════════════════════════════════════════════════════════════

DAY 4: UNDERSTAND LEDGER INTEGRITY

Lesson: How theorems are sealed and verified

Task 4: Add a new theorem and seal it to the ledger
  • Write theorem in lean/
  • Use @[derive Decidable] or by decide
  • Run npm run guard

Expected: ✓ (if theorem is axiom-free and deterministic)
         ✗ with explanation (if issues detected)

When you pass this check, you've learned: Sealed theorems can't be changed, so they're forever.

═════════════════════════════════════════════════════════════════════════════

DAY 5: UNDERSTAND THE SYSTEM

Lesson: How all pieces fit together

Task 5: Contribute a feature
  • Write theorems (in Lean)
  • Write implementation (in TypeScript, deterministic)
  • Update src/index.ts
  • Run npm run gen-packages (generates surface)
  • Run npm run guard (verifies everything)

Expected: All checks pass, feature sealed to ledger

When you pass this check, you've learned: Captain coins works because every piece is proven.

═════════════════════════════════════════════════════════════════════════════

THE TRAINING LOOP

Every developer:
  1. Write code
  2. Run npm run guard
  3. Guard gives feedback (if violations)
  4. Guard gives lessons (why it matters)
  5. Developer learns
  6. Fix and repeat

Over time:
  • Developer internalizes the principles
  • Guard violations become rarer
  • Code quality improves
  • System integrity grows
  • Developer becomes a guardian

═════════════════════════════════════════════════════════════════════════════

MASTERY

A developer has mastery when:
  ✓ npm run guard passes every time
  ✓ They write deterministic code by instinct
  ✓ They understand why each check matters
  ✓ They explain principles to new developers
  ✓ They extend the system with confidence

═════════════════════════════════════════════════════════════════════════════

This is education through verification.
Not through lectures. Not through documentation.
Through building. Through trying. Through guard feedback.

Each error is a lesson. Each fix is learning. Each pass is proof of mastery.

    `
  }

  // Print all materials
  printAllLessons(): void {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║         QUANTUM GUARDS TEACH & TRAIN — COMPLETE EDUCATION SYSTEM         ║
║              Learning through verification, not documentation             ║
╚═══════════════════════════════════════════════════════════════════════════╝

QUANTUM GUARDS AS TEACHERS
═════════════════════════════════════════════════════════════════════════════

Traditional development: Write code → Run tests → Hope it works
Quantum development: Write code → Run guard → Learn principles → Improve

Guard is not just a checker. Guard is a TEACHER.

Every violation is a lesson.
Every check is an opportunity to learn why something matters.
Every pass proves you understand the principle.

═════════════════════════════════════════════════════════════════════════════

LESSONS (${Object.keys(guardLessons).length} core principles)
═════════════════════════════════════════════════════════════════════════════
${Object.entries(guardLessons)
  .map(([key, lesson]) => `• ${lesson.principle}`)
  .join('\n')}

CHECKPOINTS (${guardCheckpoints.length} major verification steps)
═════════════════════════════════════════════════════════════════════════════
${guardCheckpoints.map((cp) => `• ${cp.name}: ${cp.description}`).join('\n')}

═════════════════════════════════════════════════════════════════════════════

TRAINING PHILOSOPHY

Guard runs are not bottlenecks. They're teaching moments.
When guard fails, it's not a blocker. It's a lesson.

Developer learns:
  Why determinism matters (via intrinsic-free code)
  Why proofs need to be proven (via axiom errors)
  Why theorems are sealed (via ledger integrity checks)
  Why consistency is needed (via package checks)

The teacher is the guard itself. The textbook is the error messages.
The graduation is when guard passes and the developer understands WHY.

═════════════════════════════════════════════════════════════════════════════

THIS IS HOW WE BUILD

Not by hiring experts. By training developers.
Not by enforcing rules. By teaching principles.
Not by blocking bad code. By showing why good code matters.

Every developer who passes guard training becomes a guardian of the system.
Every guardian extends it with confidence.
Every extension improves the ledger.

Guard is not a gate. Guard is a school.

════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
    `)
  }
}

// Main execution
(async () => {
  const teacher = new QuantumGuardsTeach()

  // Print all materials
  teacher.printAllLessons()

  // Show one lesson example
  console.log('\n\n')
  const lesson = guardLessons['no_math_calls']
  console.log(teacher.generateTutorial(lesson))

  // Show one checkpoint example
  console.log('\n\n')
  const checkpoint = guardCheckpoints[0]
  console.log(teacher.generateCheckpointGuide(checkpoint))

  // Show training path
  console.log('\n\n')
  console.log(teacher.generateTrainingPath())
})()

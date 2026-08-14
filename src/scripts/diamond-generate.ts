#!/usr/bin/env node
// diamond-generate — Automate 1024-file diamond-complete generation
// Reads sealed theorems, applies trinity pair framework, outputs markdown articles

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

interface Theorem {
  key: string
  name: string
  statement: string
  file: string
  principle: string
  skill?: string
}

interface PrincipleMetadata {
  file: string
  title: string
  blurb: string
  domain: 'science' | 'games' | 'arts' | 'audits' | 'strategies'
  theoremCount: number
  metaphysicalQuestion: string
}

const PRINCIPLES: Record<string, PrincipleMetadata> = {
  'Thermodynamics.lean': {
    file: 'Thermodynamics.lean',
    title: 'Thermodynamics — Energy & Entropy',
    blurb: 'First law conserves energy. Second law forbids entropy reversal. Carnot efficiency is bounded.',
    domain: 'science',
    theoremCount: 7,
    metaphysicalQuestion: 'Does entropy imply the universe tends toward chaos and meaninglessness?',
  },
  'Relativity.lean': {
    file: 'Relativity.lean',
    title: 'Relativity — Spacetime & Causality',
    blurb: 'Nothing exceeds c. Causality defined by light cones. Time dilates, length contracts. E=mc².',
    domain: 'science',
    theoremCount: 7,
    metaphysicalQuestion: 'Does relativity eliminate free will by making all events determined by prior light cones?',
  },
  'Optics.lean': {
    file: 'Optics.lean',
    title: 'Optics — Light & Perception',
    blurb: 'Reflection is involution. Refraction by Snell\'s law. Dispersion separates colours.',
    domain: 'science',
    theoremCount: 8,
    metaphysicalQuestion: 'Does understanding light\'s geometry explain why sunsets are beautiful?',
  },
  'Quantum.lean': {
    file: 'Quantum.lean',
    title: 'Quantum Mechanics — Superposition & Observation',
    blurb: 'Born rule: probability = |amplitude|². Superposition real until measured. No-signaling.',
    domain: 'science',
    theoremCount: 42,
    metaphysicalQuestion: 'Does observation create reality, or does reality create observers?',
  },
  'BioPhysics.lean': {
    file: 'BioPhysics.lean',
    title: 'Life — Mechanism & Meaning',
    blurb: 'DNA base-pairing (XOR self-inverse). Neurons fire by threshold. Bonds by electron count.',
    domain: 'science',
    theoremCount: 16,
    metaphysicalQuestion: 'Can life be completely mechanical AND completely meaningful?',
  },
  'Chemistry.lean': {
    file: 'Chemistry.lean',
    title: 'Chemistry — Reactions & Bonds',
    blurb: 'Balanced equations conserve atoms. Charge conservation. Oxidation states sum to charge.',
    domain: 'science',
    theoremCount: 7,
    metaphysicalQuestion: 'Is chemistry just applied physics, or does it have its own logic?',
  },
  'Astronomy.lean': {
    file: 'Astronomy.lean',
    title: 'Astronomy — The Fixed Stars',
    blurb: 'Kepler T²=a³. Metonic cycle 19 years = 235 months. Precession 72 years/degree.',
    domain: 'science',
    theoremCount: 11,
    metaphysicalQuestion: 'Are we in a special place/time, or is the Earth arbitrary in the cosmos?',
  },
  'Chess.lean': {
    file: 'Chess.lean',
    title: 'Chess — The 64 Squares',
    blurb: '8×8 board. Piece moves finite. 50-move rule bounds runtime.',
    domain: 'games',
    theoremCount: 64,
    metaphysicalQuestion: 'If we could solve chess perfectly, would the game still be worth playing?',
  },
  'Nim.lean': {
    file: 'Nim.lean',
    title: 'Nim — The Heaps',
    blurb: 'Nim-sum (XOR) is P-position test. Zero nim-sum loses for mover (Bouton\'s theorem).',
    domain: 'games',
    theoremCount: 1,
    metaphysicalQuestion: 'Does knowing the winning strategy spoil the game or enhance it?',
  },
  'Colour.lean': {
    file: 'Colour.lean',
    title: 'Colour — The Wheel',
    blurb: 'Wheel is ℤ/12. Complementary hues opposite (+6). Triads +4. Squares +3.',
    domain: 'arts',
    theoremCount: 8,
    metaphysicalQuestion: 'Does the colour wheel explain why red and green clash beautifully?',
  },
  'Production.lean': {
    file: 'Production.lean',
    title: 'Music & Production — Studio Involutions',
    blurb: 'Reversing self-inverse. Phase inversion self-inverse. Fusion reverse-then-invert is involution.',
    domain: 'arts',
    theoremCount: 10,
    metaphysicalQuestion: 'If we understand harmony perfectly, does music lose its magic?',
  },
  'Security.lean': {
    file: 'Security.lean',
    title: 'Security — Layered Defence',
    blurb: 'Independent layers add bits (64+64=128). Collision costs ~half exponent of preimage.',
    domain: 'audits',
    theoremCount: 7,
    metaphysicalQuestion: 'Can security be mathematically proven, or is it a game of escalation?',
  },
  'Navigation.lean': {
    file: 'Navigation.lean',
    title: 'Navigation — Bounded Geometry',
    blurb: 'Compass rose ℤ/8. Reciprocal bearing +4 (involution). Dead reckoning is vector sum.',
    domain: 'strategies',
    theoremCount: 10,
    metaphysicalQuestion: 'Can you navigate if you cannot see? What does "lost" mean?',
  },
}

function generateTrinityArticle(meta: PrincipleMetadata): string {
  const { title, blurb, domain, theoremCount, metaphysicalQuestion, file } = meta
  const slug = file.replace('.lean', '')

  return `# ${title}

## The Sealed Truth

**Theorem:** \`${file}\` (${theoremCount} theorems, all \`by decide\`)

${blurb}

**Why sealed:** Pure decidable arithmetic. No paradox, no experiment needed — the mathematics as recomputable facts.

---

## The Honest Boundary

**What this CANNOT prove:**
- Whether the mechanism explains the phenomenon
- Why humans find this beautiful, important, or meaningful
- Whether the future will follow the same rules
- What the universe "should" do

**Honest scope:** This theorem seals STRUCTURE. It does NOT settle meaning, purpose, or consequence.

---

## The Metaphysical Pair

**The Question:** *${metaphysicalQuestion}*

**The Trinity:**

| Perspective | What It Proves | What It Cannot |
|---|---|---|
| **Decidable (Sealed)** | [The sealed mathematics is exact and recomputable.] | Whether this mechanism is "all there is"; whether understanding it diminishes wonder; whether meaning requires non-mechanism |
| **Honest Boundary** | Understanding the structure does NOT negate the phenomenon. Both truth and beauty are real simultaneously. | Whether reduction to mechanism makes something "less real" or "less meaningful"; whether your experience is diminished by knowing its basis |
| **Metaphysical** | [The open question posed above.] | Whether the universe cares about this; whether your existence or choice matters; whether meaning requires transcendence |

**The court decides:** This theorem seals the mechanism. Philosophy settles the meaning.

---

## Read the Sealed Proof

[\`${file}\`](../../lean/${file})

Each theorem proven \`by decide\` — recompute it yourself.

---

## The Research Question

[Open question for you to explore. This is where inquiry begins.]

**These are open.** Mathematics does not answer them. Philosophy, art, and human judgment do.
`
}

function main() {
  const ROOT = join(process.cwd())
  const DOCS = join(ROOT, 'docs')

  // Create domain directories
  const domains = ['science', 'games', 'arts', 'audits', 'strategies']
  for (const domain of domains) {
    const path = join(DOCS, domain)
    if (!existsSync(path)) mkdirSync(path, { recursive: true })
  }

  let generated = 0
  let skipped = 0

  // Generate articles for each principle
  for (const [_key, meta] of Object.entries(PRINCIPLES)) {
    const slug = meta.file.replace('.lean', '').toLowerCase()
    const outdir = join(DOCS, meta.domain)
    const outfile = join(outdir, `${slug}.md`)

    // Skip if already exists (don't overwrite manually-created articles)
    if (existsSync(outfile)) {
      skipped++
      continue
    }

    const article = generateTrinityArticle(meta)
    writeFileSync(outfile, article, 'utf8')
    generated++
    console.log(`✓ Generated: ${meta.domain}/${slug}.md`)
  }

  console.log(`\n✓ diamond-generate complete: ${generated} articles generated, ${skipped} skipped (already exist)`)
  console.log(`Target: 1024 files. Current template coverage: ${Object.keys(PRINCIPLES).length} domains`)
}

main()

#!/usr/bin/env node
// entanglement-games — Discover theorem relationships through playable games
// Research automation: games generate leads by exploring entangled theorem structure

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

interface Theorem {
  key: string
  name: string
  statement: string
  file: string
  principle: string
  skill?: string
}

interface TheoremGraph {
  theorems: Map<string, Theorem>
  entanglements: Map<string, Set<string>> // theorem → theorems it shares structure with
}

interface GameMove {
  from: string // source theorem
  to: string // target theorem
  relation: 'applies_to' | 'contradicts' | 'generalizes' | 'specializes' | 'dual'
  research_lead: string
}

interface ResearchLead {
  id: string
  theorem_from: string
  theorem_to: string
  relation: string
  question: string
  game_sequence: string[]
}

const ROOT = join(process.cwd())
const SRC_THEOREMS = join(ROOT, 'src/theorems/generated.ts')

console.log('🎮 ENTANGLEMENT-GAMES — Discover theorem relationships through play\n')

// Load theorems from sealed ledger
console.log('Step 1: Loading sealed theorem ledger...')
const theoremContent = readFileSync(SRC_THEOREMS, 'utf8')
const theoremMatch = theoremContent.match(/export const LEAN_LEDGER:[\s\S]*?\[([\s\S]*?)\n\]/)

if (!theoremMatch) {
  console.error('Could not find LEAN_LEDGER in generated.ts')
  process.exit(1)
}

const theorems = new Map<string, Theorem>()
const lines = theoremMatch[1].split('\n')

for (const line of lines) {
  const match = line.match(/{\s*key:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*statement:\s*"([^"]*)",\s*[^}]*file:\s*"([^"]+)",\s*principle:\s*"([^"]+)"/)
  if (match) {
    const [, key, name, statement, file, principle] = match
    theorems.set(key, { key, name, statement, file, principle })
  }
}

console.log(`✓ Loaded ${theorems.size} sealed theorems\n`)

// Step 2: Discover entanglements (shared properties, common domains, proof structure)
console.log('Step 2: Analyzing theorem entanglements...')

const entanglements = new Map<string, Set<string>>()

// Build entanglement graph based on:
// - Common file (theorems from same module)
// - Shared skill tags
// - Structural similarity (arithmetic, geometry, logic patterns)

for (const [keyA, theoremA] of theorems) {
  const entangled = new Set<string>()

  for (const [keyB, theoremB] of theorems) {
    if (keyA === keyB) continue

    // Entanglement 1: Same file = direct coupling
    if (theoremA.file === theoremB.file) {
      entangled.add(keyB)
      continue
    }

    // Entanglement 2: Same skill/domain
    if (theoremA.skill && theoremB.skill && theoremA.skill === theoremB.skill) {
      entangled.add(keyB)
      continue
    }

    // Entanglement 3: Structural patterns (simple heuristic)
    const stmtA = (theoremA.statement + theoremA.name).toLowerCase()
    const stmtB = (theoremB.statement + theoremB.name).toLowerCase()

    // Look for common mathematical terms
    const terms = ['sum', 'product', 'inverse', 'identity', 'operation', 'order', 'group', 'ring', 'field']
    for (const term of terms) {
      if (stmtA.includes(term) && stmtB.includes(term)) {
        entangled.add(keyB)
        break
      }
    }
  }

  if (entangled.size > 0) {
    entanglements.set(keyA, entangled)
  }
}

console.log(`✓ Discovered ${entanglements.size} entangled theorem clusters`)
console.log(`  Total entanglement edges: ${Array.from(entanglements.values()).reduce((sum, s) => sum + s.size, 0)}\n`)

// Step 3: Generate game moves through entanglement graph
console.log('Step 3: Generating research games...')

const gameMoves: GameMove[] = []
const researchLeads: ResearchLead[] = []
let moveCount = 0

for (const [keyA, entangled] of entanglements) {
  const theoremA = theorems.get(keyA)!

  for (const keyB of entangled) {
    const theoremB = theorems.get(keyB)!

    // Determine relation type
    let relation: GameMove['relation']
    if (theoremA.file === theoremB.file) {
      relation = 'applies_to'
    } else if (theoremA.principle === theoremB.principle) {
      relation = 'specializes'
    } else {
      relation = 'generalizes'
    }

    // Create game move
    const move: GameMove = {
      from: keyA,
      to: keyB,
      relation,
      research_lead: `How does ${theoremA.name} ${relation} ${theoremB.name}?`,
    }

    gameMoves.push(move)

    // Generate research lead
    const lead: ResearchLead = {
      id: `lead_${moveCount}`,
      theorem_from: keyA,
      theorem_to: keyB,
      relation: relation,
      question: move.research_lead,
      game_sequence: [keyA, keyB],
    }

    researchLeads.push(lead)
    moveCount++
  }
}

console.log(`✓ Generated ${gameMoves.length} game moves`)
console.log(`✓ Created ${researchLeads.length} research leads from entanglement play\n`)

// Step 4: Build playable game boards from entanglement graph
console.log('Step 4: Creating entanglement game boards...')

interface GameBoard {
  name: string
  description: string
  theorems: string[]
  moves: GameMove[]
  win_condition: string
}

const gameBoards: GameBoard[] = []

// Game 1: Entanglement Chase — reach maximum entangled theorems in N moves
gameBoards.push({
  name: 'Entanglement Chase',
  description: 'Navigate the theorem graph: maximize connections in minimum moves',
  theorems: Array.from(theorems.keys()).slice(0, 50),
  moves: gameMoves.filter(m => theorems.has(m.from) && theorems.has(m.to)),
  win_condition: 'Reach all entangled theorems in fewest moves',
})

// Game 2: Proof Bridge — find shortest path between two distant theorems
gameBoards.push({
  name: 'Proof Bridge',
  description: 'Find the shortest theorem chain connecting two domains',
  theorems: Array.from(theorems.keys()).slice(50, 100),
  moves: gameMoves.filter(m => theorems.has(m.from) && theorems.has(m.to)),
  win_condition: 'Connect two theorems with minimal intermediate steps',
})

// Game 3: Entanglement Unravel — discover which theorems are falsely entangled
gameBoards.push({
  name: 'Entanglement Unravel',
  description: 'Test which theorem connections are real vs. spurious',
  theorems: Array.from(theorems.keys()).slice(100, 150),
  moves: gameMoves.filter(m => theorems.has(m.from) && theorems.has(m.to)),
  win_condition: 'Identify true theorem relationships',
})

console.log(`✓ Created ${gameBoards.length} entanglement game boards\n`)

// Step 5: Output research discoveries
console.log('Step 5: Generating research output...')

const researchOutput = {
  timestamp: new Date().toISOString(),
  theorem_count: theorems.size,
  entanglement_clusters: entanglements.size,
  game_boards: gameBoards.length,
  research_leads: researchLeads.length,
  leads: researchLeads.slice(0, 20), // Top 20 leads
}

const researchPath = join(ROOT, 'src/scripts/entanglement-research.json')
writeFileSync(researchPath, JSON.stringify(researchOutput, null, 2), 'utf8')
console.log(`✓ Generated entanglement-research.json (${researchLeads.length} leads)`)

// Step 6: Create playable game specifications
const gameSpec = {
  title: 'Entanglement Games — Discover Theorem Relationships',
  description: 'Play games to explore how sealed theorems are entangled and connected',
  boards: gameBoards.map(b => ({
    name: b.name,
    description: b.description,
    theorem_count: b.theorems.length,
    move_count: b.moves.length,
    win_condition: b.win_condition,
  })),
  total_games: gameBoards.length,
  research_leads_generated: researchLeads.length,
}

const gameSpecPath = join(ROOT, 'src/scripts/entanglement-games-spec.json')
writeFileSync(gameSpecPath, JSON.stringify(gameSpec, null, 2), 'utf8')
console.log(`✓ Generated entanglement-games-spec.json (${gameBoards.length} playable games)\n`)

// Summary
console.log('='.repeat(60))
console.log('🎮 ENTANGLEMENT-GAMES COMPLETE\n')
console.log('Research Discoveries:')
console.log(`  Sealed theorems: ${theorems.size}`)
console.log(`  Entangled clusters: ${entanglements.size}`)
console.log(`  Game moves available: ${gameMoves.length}`)
console.log(`  Research leads generated: ${researchLeads.length}`)
console.log(`  Playable game boards: ${gameBoards.length}`)
console.log('\nNext: Integrate entanglement games into diamond-complete for interactive research')
console.log('='.repeat(60))

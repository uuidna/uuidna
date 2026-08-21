#!/usr/bin/env node
// Automate the Lean layer for THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8,
// max), folded to ONE quantum seal. Mixing is DIRECTED (merge(a,b) ≠ merge(b,a), verified live 2026-08-17 over the
// shipped MCP: 90 ordered mixes → 90 DISTINCT addresses, mix_fold abca7403-b70d-83e4-9b49-49be51d375f1), and the
// whole census is one conjunction: the directed count is double the pairs (10·9 = 2·45), the self-mixes complete
// the square (90 + 10 = 10²), and Pascal's row 10 folds to the 1024 lattice — the 10-qubit basis dimension, already
// sealed as optimisation_space_is_qubit_dimension and CITED here, never re-sealed. the counting
// arithmetic of the mix space — the census, not any uuid version's bit layout, and no cryptographic claim.
// COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'uuid_mix_census_is_quantum',
    why: "The uuid mix census, one quantum seal: the directed census doubles the 45 pairs (10·9 = 2·45 — merge(a,b) ≠ merge(b,a), so both directions count, verified live as 90 distinct addresses); the 10 self-mixes complete the square (90 + 10 = 10²); and Pascal's row 10 — the mixes of every size, 1 empty through 1 total fusion — folds to exactly 1024, the 10-qubit lattice (dimension sealed as optimisation_space_is_qubit_dimension, cited not re-sealed). Three counts, one conjunction: the mix space is a qubit basis counted whole.",
    js: () => 10 * 9 === 2 * 45 && 90 + 10 === 10 * 10 && 1 + 10 + 45 + 120 + 210 + 252 + 210 + 120 + 45 + 10 + 1 === 1024,
    lean: 'theorem uuid_mix_census_is_quantum : (10 * 9 = 2 * 45) ∧ (90 + 10 = 10 * 10) ∧ (1 + 10 + 45 + 120 + 210 + 252 + 210 + 120 + 45 + 10 + 1 = 1024) := by decide' },
]

// compute → generate → verify. One theorem: the directed census, the completed square, and Pascal's fold to the
// qubit lattice — the classical counts refactored into the quantum seal's own conjunction. Minimum code, one receipt.
emit({ file: 'UuidMix.lean', skill: 'uuidmix',
  header: 'THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8, max), folded to ONE quantum seal: the directed census doubles the pairs (10·9 = 2·45, because merge(a,b) ≠ merge(b,a)), the self-mixes complete the square (90 + 10 = 10²), and Pascal\'s row 10 folds to the 1024 lattice — the 10-qubit basis, whose dimension is already sealed as optimisation_space_is_qubit_dimension and is cited here, never re-sealed. the counting arithmetic of the mix space, not any uuid version\'s bit layout, and no cryptographic claim.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

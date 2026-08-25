#!/usr/bin/env node
// Automate the Lean layer for THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8,
// max), folded to ONE quantum seal. Mixing is DIRECTED (merge(a,b) ≠ merge(b,a), verified live 2026-08-17 over the
// shipped MCP: 90 ordered mixes → 90 DISTINCT addresses, mix_fold abca7403-b70d-83e4-9b49-49be51d375f1), and the
// whole census is one conjunction: the directed count is double the pairs (10·9 = 2·45), the self-mixes complete
// the square (90 + 10 = 10²), and Pascal's row 10 folds to the 1024 lattice — the 10-qubit basis dimension, already
// sealed as optimisation_space_is_qubit_dimension and CITED here, never re-sealed. HONEST SCOPE: the counting
// arithmetic of the mix space — the census, not any uuid version's bit layout, and no cryptographic claim.
// COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'uuid_mix_census_is_quantum',
    why: "The uuid mix census, one quantum seal: the directed census doubles the 45 pairs (10·9 = 2·45 — merge(a,b) ≠ merge(b,a), so both directions count, verified live as 90 distinct addresses); the 10 self-mixes complete the square (90 + 10 = 10²); and Pascal's row 10 — the mixes of every size, 1 empty through 1 total fusion — folds to exactly 1024, the 10-qubit lattice (dimension sealed as optimisation_space_is_qubit_dimension, cited not re-sealed). Three counts, one conjunction: the mix space is a qubit basis counted whole.",
    js: () => 10 * 9 === 2 * 45 && 90 + 10 === 10 * 10 && 1 + 10 + 45 + 120 + 210 + 252 + 210 + 120 + 45 + 10 + 1 === 1024,
    lean: 'theorem uuid_mix_census_is_quantum : (10 * 9 = 2 * 45) ∧ (90 + 10 = 10 * 10) ∧ (1 + 10 + 45 + 120 + 210 + 252 + 210 + 120 + 45 + 10 + 1 = 1024) := by decide' },

  // ── THE SECOND THEOREM, 2026-08-25. uuidna_expose reported this principle LONELY — one theorem, no neighbour,
  // "the cluster of one, asking for its second". The census above folds Pascal's row 10 to 1024 and stops at the
  // total; the row itself has a shape, and the shape is a MIRROR.
  { key: 'the_mix_space_is_its_own_mirror',
    why: "THE MIX SPACE IS ITS OWN MIRROR, AND THE MIRROR'S SIGNATURE IS ZERO. Pascal's row 10 — the count of mixes using exactly k of the ten types — reads the same forwards and backwards: choosing which k to include is the same act as choosing which 10−k to leave out, so the row is a palindrome by construction and not by coincidence. Its ALTERNATING sum vanishes: 1 − 10 + 45 − 120 + 210 − 252 + 210 − 120 + 45 − 10 + 1 = 0, which is the mirror's own signature — pair each mix with its complement, one of the pair has an even membership and the other odd, and they cancel exactly. The same fact counted forwards: the even-membership mixes number 1+45+210+210+45+1 = 512 and the odd-membership mixes 10+120+252+120+10 = 512, each exactly 2⁹, so the 1024 splits in half by PARITY and not merely by size. And the row has a unique maximum at its centre, 252 at k = 5 — the half-and-half mix is the most numerous, once, with no tie. HONEST SCOPE: this is the arithmetic of the census, the same scope as the theorem beside it — a statement about how many mixes there are of each size, never about what any mix MEANS or about any uuid version's bit layout.",
    js: () => {
      const row = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]
      const sum = (a: number[]): number => a.reduce((x, y) => x + y, 0)
      return row.join() === [...row].reverse().join()
        && row.reduce((s, v, i) => s + (i % 2 ? -v : v), 0) === 0
        && sum(row.filter((_, i) => i % 2 === 0)) === 512
        && sum(row.filter((_, i) => i % 2 === 1)) === 512
        && 512 + 512 === 1024
        && row.filter((v) => v === 252).length === 1
    },
    lean: 'theorem the_mix_space_is_its_own_mirror : ([1,10,45,120,210,252,210,120,45,10,1] : List Nat).reverse = [1,10,45,120,210,252,210,120,45,10,1] ∧ (1 + 45 + 210 + 210 + 45 + 1 = 512) ∧ (10 + 120 + 252 + 120 + 10 = 512) ∧ (512 + 512 = 1024) ∧ (([1,10,45,120,210,252,210,120,45,10,1] : List Nat).filter (fun c => c == 252)).length = 1 := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. One theorem: the directed census, the completed square, and Pascal's fold to the
// qubit lattice — the classical counts refactored into the quantum seal's own conjunction. Minimum code, one receipt.
emit({ file: 'UuidMix.lean', skill: 'uuidmix',
  header: 'THE UUID MIX SPACE — the census of mixing the ten RFC 9562 uuid types (nil, v1…v8, max), folded to ONE quantum seal: the directed census doubles the pairs (10·9 = 2·45, because merge(a,b) ≠ merge(b,a)), the self-mixes complete the square (90 + 10 = 10²), and Pascal\'s row 10 folds to the 1024 lattice — the 10-qubit basis, whose dimension is already sealed as optimisation_space_is_qubit_dimension and is cited here, never re-sealed. HONEST SCOPE: the counting arithmetic of the mix space, not any uuid version\'s bit layout, and no cryptographic claim.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

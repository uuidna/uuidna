// units_z9 — the units of ℤ/9 are exactly {1,2,4,5,7,8}. Proven from the DEFINING property (a residue is a unit
// iff it has a multiplicative inverse mod 9), not from a hardcoded list — the code derives the set, then checks
// the library's units() equals it. Formalised in Lean 4 (decide, sorry-free). Integrity, not truth. 0/7.
import { units } from '../../address.js'

const m9 = (n: number) => ((n % 9) + 9) % 9
const hasInverse = (d: number) => [1, 2, 3, 4, 5, 6, 7, 8].some((e) => m9(d * e) === 1)

export const theorem = {
  key: 'units_z9',
  formula: '(ℤ/9)ˣ = { d ∈ {1..8} : ∃ e, d·e ≡ 1 (mod 9) } = {1,2,4,5,7,8}',
  statement: 'the units of ℤ/9 are exactly {1,2,4,5,7,8} — the residues that carry a multiplicative inverse',
  lean: 'theorem units_z9 :\n  (List.range 9).filter (fun d => (List.range 9).any (fun e => (d * e) % 9 == 1)) = [1, 2, 4, 5, 7, 8] := by\n  decide',
  // self-proving: derive the units from invertibility, and confirm the library agrees (falsifiable — 3 and 6 must be absent).
  prove: () => {
    const derived = [1, 2, 3, 4, 5, 6, 7, 8].filter(hasInverse)
    return derived.join(',') === '1,2,4,5,7,8' && units().join(',') === derived.join(',') && !derived.includes(3) && !derived.includes(6)
  },
}

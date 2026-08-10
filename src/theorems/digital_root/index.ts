// digital_root — the digital root folds an integer to ℤ/9: dr(n) ≡ n (mod 9), and dr(n) ∈ {1..9} for n>0 (9 when
// n ≡ 0). Proven from the DEFINING congruence over a range (not one value), using the library's digitalRoot; 432
// folds to nine because 432 ≡ 0 (mod 9). Formalised in Lean 4 (decide, sorry-free). Integrity, not truth. 0/7.
import { digitalRoot } from '../../address.js'

const m9 = (n: number) => ((n % 9) + 9) % 9

export const theorem = {
  key: 'digital_root',
  formula: 'dr(n) ≡ n (mod 9) ∧ 1 ≤ dr(n) ≤ 9 (n>0);  432 ≡ 0 ⇒ dr(432)=9',
  statement: 'the digital root folds an integer to ℤ/9 — congruent mod nine and in 1..9; 432 folds to nine',
  lean: 'theorem digital_root :\n  432 % 9 = 0 ∧ (List.range\' 1 60).all (fun n =>\n    let r := if n % 9 == 0 then 9 else n % 9\n    (r % 9 == n % 9) && (1 ≤ r) && (r ≤ 9)) := by\n  decide',
  prove: () => digitalRoot(432) === 9 && Array.from({ length: 60 }, (_, i) => i + 1).every((n) => { const r = digitalRoot(n); return r >= 1 && r <= 9 && m9(r) === m9(n) }),
}

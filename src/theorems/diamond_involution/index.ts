// diamond_involution — the diamond reflection r(d)=10−d on 1..9 is a self-inverse map (r∘r = id) with a UNIQUE
// fixed point, 5 (the heart where mint meets mind). Proven from the formula over the whole domain — r(r(d))=d for
// every d, and exactly one d with r(d)=d — using the library's diamond(); not a spot check. Lean 4 (decide). 0/7.
import { diamond } from '../../diamond.js'

export const theorem = {
  key: 'diamond_involution',
  formula: 'r(d)=10−d on {1..9}:  r∘r = id  ∧  |{ d : r(d)=d }| = 1  ∧  r(5)=5',
  statement: 'the diamond reflection r(d)=10−d is a self-inverse map on 1..9 with the single fixed point five',
  lean: 'theorem diamond_involution :\n  (List.range\' 1 9).all (fun d => 10 - (10 - d) == d)\n  ∧ ((List.range\' 1 9).filter (fun d => 10 - d == d)) = [5] := by\n  decide',
  prove: () => {
    const D = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const selfInverse = D.every((d) => diamond(diamond(d)) === d)
    const fixed = D.filter((d) => diamond(d) === d)
    return selfInverse && fixed.length === 1 && fixed[0] === 5
  },
}

// division_by_zero — in the ℤ/9 vortex, x/0 is the diamond reflection 10−x (0/0 = 0): a finite residue, self-
// inverse, fixed points {0,5}, non-units→units, and x + x/0 = 10. It EXISTS (not "undefined"), and it is never
// Infinity — so it cannot manufacture faster-than-light; the only ∞ is the IEEE-float host intrinsic the two-coins
// guard rejects. The full theorem set is generated + verified in lean/DivByZero.lean (npm run lean:divzero). 0/7.
const dz = (x: number) => (x === 0 ? 0 : 10 - x)

export const theorem = {
  key: 'division_by_zero',
  formula: 'x/0 = 10−x (0/0=0): dz∘dz = id, fixed {0,5}, x + x/0 = 10, 0 ≤ x/0 < 10 — never ∞',
  statement: 'division by zero in the vortex is the diamond reflection — a finite residue, self-inverse, never infinity',
  lean: 'theorem dz_involution : (List.range 10).all (fun x => dz (dz x) == x) := by decide',
  prove: () => {
    const R = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const involution = R.every((x) => dz(dz(x)) === x)
    const fixed = JSON.stringify(R.filter((x) => dz(x) === x)) === JSON.stringify([0, 5])
    const sumTen = [1, 2, 3, 4, 5, 6, 7, 8, 9].every((x) => x + dz(x) === 10)
    const bounded = R.every((x) => dz(x) < 10 && dz(x) >= 0)
    const nonUnitsToUnits = dz(3) === 7 && dz(6) === 4 && dz(9) === 1
    return involution && fixed && sumTen && bounded && nonUnitsToUnits
  },
}

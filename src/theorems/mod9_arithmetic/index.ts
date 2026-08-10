// mod9_arithmetic — the decidable arithmetic of ℤ/9 that the vortex rides on: the inverse pairs (2·5, 4·7, 8·8 ≡ 1),
// the nilpotents (3², 6² ≡ 0), and that 3 is a zero-divisor with NO inverse (∀x, 3x ≢ 1). Each is computed from the
// residues themselves, quantified over the whole ring where a quantifier appears. Lean 4 (decide, sorry-free). 0/7.
const m9 = (n: number) => ((n % 9) + 9) % 9

export const theorem = {
  key: 'mod9_arithmetic',
  formula: '2·5 ≡ 1,  4·7 ≡ 1,  8·8 ≡ 1,  3² ≡ 0,  6² ≡ 0  (mod 9),  and  ∀x, 3·x ≢ 1 (mod 9)',
  statement: 'the arithmetic of ℤ/9 holds — the inverse pairs and nilpotents compute, and three has no inverse',
  lean: 'theorem mod9_arithmetic :\n  (2*5) % 9 = 1 ∧ (4*7) % 9 = 1 ∧ (8*8) % 9 = 1 ∧ (3*3) % 9 = 0 ∧ (6*6) % 9 = 0\n  ∧ (List.range 9).all (fun x => (3 * x) % 9 != 1) := by\n  decide',
  prove: () => m9(2 * 5) === 1 && m9(4 * 7) === 1 && m9(8 * 8) === 1 && m9(3 * 3) === 0 && m9(6 * 6) === 0
    && [0, 1, 2, 3, 4, 5, 6, 7, 8].every((x) => m9(3 * x) !== 1),
}

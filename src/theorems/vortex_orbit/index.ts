// vortex_orbit — the doubling circuit of ℤ/9 is 1→2→4→8→7→5. Proven by GENERATING it from the defining recurrence
// (xₙ₊₁ = 2·xₙ mod 9 from x₀=1), not by asserting a list; then confirms the library's vortexOrbit() equals it, and
// that it closes (5·2 ≡ 1). Formalised in Lean 4 (decide, sorry-free). Integrity, not truth. 0/7.
import { vortexOrbit } from '../../address.js'

const m9 = (n: number) => ((n % 9) + 9) % 9

export const theorem = {
  key: 'vortex_orbit',
  formula: 'orbit_{×2}(1) in ℤ/9 = [1, 2, 4, 8, 7, 5],  5·2 ≡ 1 (closes the loop)',
  statement: 'the doubling circuit of ℤ/9 is 1→2→4→8→7→5 — the vortex orbit of the units under times two',
  lean: 'theorem vortex_orbit :\n  [1, (1*2)%9, (2*2)%9, (4*2)%9, (8*2)%9, (7*2)%9] = [1, 2, 4, 8, 7, 5]\n  ∧ (5*2) % 9 = 1 := by\n  decide',
  prove: () => {
    const o = [1]
    for (let i = 0; i < 5; i++) o.push(m9(o[o.length - 1] * 2))
    return o.join(',') === '1,2,4,8,7,5' && vortexOrbit().join(',') === o.join(',') && m9(o[5] * 2) === 1
  },
}

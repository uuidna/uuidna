import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PERMA — A TRINITY OF THE LATTICE'S OWN COUNTS. Three faces: coins, rays, and the faces their product is. qpuClayOf
 *  already holds coins · rays = faces. Nothing here is horticulture, and nothing here is a prize. Crosses to `merkaba`,
 *  the trinity family. */

const PROOF = 'perma trinity: coins, rays, and faces = coins · rays, the identity qpuClayOf already holds; a measure crossed to merkaba, not a prize and not horticulture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'perma', dst: 'merkaba', formula, value, proof: PROOF }, holds, { name: `perma.${name}`, params })

export class PermaFormulas {
  /** First face: the lattice's coins. value x. holds when x is that count. */
  static coins(x: number): CrossFormula {
    const coins = latticeNamesOf().coins
    return p('perma-coins', 'coins(x) = x; holds when x is the lattice coins', x, nat(x) && x === coins, 'coins', [x])
  }

  /** Second face: the lattice's rays. value x. holds when x is that count. */
  static rays(x: number): CrossFormula {
    const rays = latticeNamesOf().rays
    return p('perma-rays', 'rays(x) = x; holds when x is the lattice rays', x, nat(x) && x === rays, 'rays', [x])
  }

  /** Third face: the product the lattice already names faces. value x · y. holds when x is coins, y is rays, and the product is faces. */
  static faces(x: number, y: number): CrossFormula {
    const lattice = latticeNamesOf()
    const value = x * y
    return p('perma-faces', 'faces(x, y) = x · y; holds when x is coins, y is rays, and the product is the lattice faces', value, nat(x, y) && x === lattice.coins && y === lattice.rays && value === lattice.faces, 'faces', [x, y])
  }
}

for (const name of ['coins', 'faces', 'rays'] as const)
  hexRegisterOf('perma', name, (PermaFormulas[name] as (...x: unknown[]) => unknown).bind(PermaFormulas))

/** The three faces, each recomputed on the lattice's own counts. A face that does not hold stays a lead. */
export const permaTrinityOf = () => {
  const lattice = latticeNamesOf()
  const coins = PermaFormulas.coins(lattice.coins)
  const rays = PermaFormulas.rays(lattice.rays)
  const faces = PermaFormulas.faces(lattice.coins, lattice.rays)
  const readings = [
    { face: 'coins' as const, formula: 'coins(x) = x', uuid: coins.hex, value: coins.value, holds: coins.holds },
    { face: 'rays' as const, formula: 'rays(x) = x', uuid: rays.hex, value: rays.value, holds: rays.holds },
    { face: 'faces' as const, formula: 'faces(x, y) = x · y', uuid: faces.hex, value: faces.value, holds: faces.holds },
  ]
  return { kind: 'perma-trinity' as const, family: 'perma' as const, readings, holds: readings.every((r) => r.holds === true) }
}

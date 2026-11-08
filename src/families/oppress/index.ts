import { facesOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OPPRESS — the lattice face count. A count. It names no person. */

const PROOF = 'lattice face count; a measure crossed to lattice'
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'oppress', dst: 'lattice', formula, value, proof: PROOF }, holds, { name: `oppress.${name}`, params })

export class OppressFormulas {
  /** The face count the lattice already computed. value faces. */
  static oppress(): CrossFormula {
    const faces = facesOf()
    const count = faces.faces
    return c('oppress-oppress', 'oppress() = faces', count, faces.holds && Number.isSafeInteger(count) && count >= 0, 'oppress', [])
  }
}

hexRegisterOf('oppress', 'oppress', (OppressFormulas.oppress as (...x: unknown[]) => unknown).bind(OppressFormulas))

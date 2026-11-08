import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LANDUSE — PLANNING A PARCEL AS ARITHMETIC. How land is allotted is numbers: the residential share of a site, how much is
 *  paved over, the mix of zones, the land left to develop, the parcels a tract divides into, the area a setback takes, the
 *  buildable fraction of a lot, and the open space kept back. Crosses to `geography` — land use is geography made a plan. A measure. */

const PROOF = 'landuse arithmetic (residential share, impervious cover, zoning mix, developable land, parcel count, setback area, buildable ratio, open-space ratio); a parcel planned as numbers; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'landuse', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `landuse.${name}`, params })

export class LanduseFormulas {
  /** BUILDABLE RATIO: the buildable area of a lot as a percentage. value ⌊buildable · 100 / lot⌋. */
  static buildableratio(buildable: number, lot: number): CrossFormula { return c('landuse-buildableratio', 'buildableratio(buildable, lot) = ⌊buildable · 100 / lot⌋', lot > 0 ? Math.floor((buildable * 100) / lot) : 0, nat(buildable, lot) && lot > 0 && buildable <= lot, 'buildableratio', [buildable, lot]) }
  /** DEVELOPABLE LAND: the total less what is protected. value max(0, total − protected). */
  static developable(total: number, protected_: number): CrossFormula { return c('landuse-developable', 'developable(total, protected) = max(0, total − protected)', Math.max(0, total - protected_), nat(total, protected_), 'developable', [total, protected_]) }
  /** IMPERVIOUS COVER: paved area as a percentage of the site. value ⌊paved · 100 / total⌋. */
  static impervious(paved: number, total: number): CrossFormula { return c('landuse-impervious', 'impervious(paved, total) = ⌊paved · 100 / total⌋', total > 0 ? Math.floor((paved * 100) / total) : 0, nat(paved, total) && total > 0 && paved <= total, 'impervious', [paved, total]) }
  /** OPEN-SPACE RATIO: open land as a percentage of the site. value ⌊open · 100 / total⌋. */
  static openspaceratio(open: number, total: number): CrossFormula { return c('landuse-openspaceratio', 'openspaceratio(open, total) = ⌊open · 100 / total⌋', total > 0 ? Math.floor((open * 100) / total) : 0, nat(open, total) && total > 0 && open <= total, 'openspaceratio', [open, total]) }
  /** PARCEL COUNT: the parcels a tract divides into at a parcel size. value ⌊area / parcelsize⌋. */
  static parcelcount(area: number, parcelsize: number): CrossFormula { return c('landuse-parcelcount', 'parcelcount(area, parcelsize) = ⌊area / parcelsize⌋', parcelsize > 0 ? Math.floor(area / parcelsize) : 0, nat(area, parcelsize) && parcelsize > 0, 'parcelcount', [area, parcelsize]) }
  /** RESIDENTIAL SHARE: residential land as a percentage of the site. value ⌊residential · 100 / total⌋. */
  static residentialshare(residential: number, total: number): CrossFormula { return c('landuse-residentialshare', 'residentialshare(residential, total) = ⌊residential · 100 / total⌋', total > 0 ? Math.floor((residential * 100) / total) : 0, nat(residential, total) && total > 0 && residential <= total, 'residentialshare', [residential, total]) }
  /** SETBACK AREA: a frontage held back by a setback depth. value frontage · setback. */
  static setbackarea(frontage: number, setback: number): CrossFormula { return c('landuse-setbackarea', 'setbackarea(frontage, setback) = frontage · setback', frontage * setback, nat(frontage, setback), 'setbackarea', [frontage, setback]) }
  /** ZONING MIX: the parcels per zone across a plan. value ⌊parcels / zones⌋. */
  static zoningmix(parcels: number, zones: number): CrossFormula { return c('landuse-zoningmix', 'zoningmix(parcels, zones) = ⌊parcels / zones⌋', zones > 0 ? Math.floor(parcels / zones) : 0, nat(parcels, zones) && zones > 0, 'zoningmix', [parcels, zones]) }
}

for (const name of ['buildableratio', 'developable', 'impervious', 'openspaceratio', 'parcelcount', 'residentialshare', 'setbackarea', 'zoningmix'] as const)
  hexRegisterOf('landuse', name, (LanduseFormulas[name] as (...x: unknown[]) => unknown).bind(LanduseFormulas))

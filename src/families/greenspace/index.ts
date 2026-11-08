import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GREENSPACE — URBAN NATURE, AS ARITHMETIC (chosen by the public-API registry, not by hand). A city's green is numbers:
 *  the square metres of park per resident, the share of ground under tree canopy, the share of people within a short walk
 *  of a park, species density, the degrees of cooling shade gives, the stormwater soil soaks up, the visitors a space holds,
 *  and how linked its habitats are. Crosses to `geography` — greenspace is the land geography maps. A measure. */

const PROOF = 'greenspace arithmetic (park per capita, canopy cover, park access, biodiversity density, cooling effect, stormwater, recreation capacity, connectivity); a public-API measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'greenspace', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `greenspace.${name}`, params })

export class GreenspaceFormulas {
  /** PARK PER CAPITA: square metres of greenspace each resident gets. value ⌊area / population⌋. */
  static percapita(area: number, population: number): CrossFormula { return c('greenspace-percapita', 'percapita(area, population) = ⌊area / population⌋', population > 0 ? Math.floor(area / population) : 0, nat(area, population) && population > 0, 'percapita', [area, population]) }
  /** CANOPY COVER as a percentage of ground. value ⌊canopy · 100 / total⌋. */
  static canopycover(canopy: number, total: number): CrossFormula { return c('greenspace-canopycover', 'canopycover(canopy, total) = ⌊canopy · 100 / total⌋', total > 0 ? Math.floor((canopy * 100) / total) : 0, nat(canopy, total) && total > 0 && canopy <= total, 'canopycover', [canopy, total]) }
  /** PARK ACCESS: the share of residents within a short walk of a park. value ⌊served · 100 / total⌋. */
  static parkaccess(served: number, total: number): CrossFormula { return c('greenspace-parkaccess', 'parkaccess(served, total) = ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0 && served <= total, 'parkaccess', [served, total]) }
  /** BIODIVERSITY: species per thousand units of area. value ⌊species · 1000 / area⌋. */
  static biodiversity(species: number, area: number): CrossFormula { return c('greenspace-biodiversity', 'biodiversity(species, area) = ⌊species · 1000 / area⌋', area > 0 ? Math.floor((species * 1000) / area) : 0, nat(species, area) && area > 0, 'biodiversity', [species, area]) }
  /** COOLING EFFECT: degrees of cooling canopy gives, summed. value canopy · degrees. */
  static coolingeffect(canopy: number, degrees: number): CrossFormula { return c('greenspace-coolingeffect', 'coolingeffect(canopy, degrees) = canopy · degrees', canopy * degrees, nat(canopy, degrees), 'coolingeffect', [canopy, degrees]) }
  /** STORMWATER: litres of runoff the soil soaks up at a rate per unit area. value area · rate. */
  static stormwater(area: number, rate: number): CrossFormula { return c('greenspace-stormwater', 'stormwater(area, rate) = area · rate', area * rate, nat(area, rate), 'stormwater', [area, rate]) }
  /** RECREATION CAPACITY: the visitors a space holds at an area each. value ⌊area / perVisitor⌋. */
  static recreationcapacity(area: number, perVisitor: number): CrossFormula { return c('greenspace-recreationcapacity', 'recreationcapacity(area, perVisitor) = ⌊area / perVisitor⌋', perVisitor > 0 ? Math.floor(area / perVisitor) : 0, nat(area, perVisitor) && perVisitor > 0, 'recreationcapacity', [area, perVisitor]) }
  /** CONNECTIVITY: habitat links as a share of the nodes they could join. value ⌊links · 100 / nodes⌋. */
  static connectivity(links: number, nodes: number): CrossFormula { return c('greenspace-connectivity', 'connectivity(links, nodes) = ⌊links · 100 / nodes⌋', nodes > 0 ? Math.floor((links * 100) / nodes) : 0, nat(links, nodes) && nodes > 0, 'connectivity', [links, nodes]) }
}

for (const name of ['biodiversity', 'canopycover', 'connectivity', 'coolingeffect', 'parkaccess', 'percapita', 'recreationcapacity', 'stormwater'] as const)
  hexRegisterOf('greenspace', name, (GreenspaceFormulas[name] as (...x: unknown[]) => unknown).bind(GreenspaceFormulas))

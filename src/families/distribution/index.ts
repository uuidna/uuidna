import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DISTRIBUTION — MOVING GOODS TO THE EDGE, AS ARITHMETIC (chosen by the network registry, not by hand). A distribution
 *  network is numbers: the hubs a set of regions needs, the spoke links they carry, the coverage reached, point density,
 *  the drop size per stop, route capacity, echelon volume, and whether reach meets its target. Crosses to `logistics` —
 *  distribution is what logistics plans and moves. A measure. */

const PROOF = 'distribution arithmetic (hubs, spokes, coverage, density, drop size, routes, echelon, reach); the registry\'s edge-delivery domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'distribution', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `distribution.${name}`, params })

export class DistributionFormulas {
  /** HUBS: the hubs a set of regions needs at a per-hub capacity. value ⌈regions / perHub⌉. */
  static hubs(regions: number, perHub: number): CrossFormula { return c('distribution-hubs', 'hubs(regions, perHub) = ⌈regions / perHub⌉', perHub > 0 ? Math.ceil(regions / perHub) : 0, nat(regions, perHub) && perHub > 0, 'hubs', [regions, perHub]) }
  /** SPOKES: the spoke links hubs carry at nodes each. value hubs · nodes. */
  static spokes(hubs: number, nodes: number): CrossFormula { return c('distribution-spokes', 'spokes(hubs, nodes) = hubs · nodes', hubs * nodes, nat(hubs, nodes), 'spokes', [hubs, nodes]) }
  /** COVERAGE as a percentage. value ⌊served · 100 / total⌋. */
  static coverage(served: number, total: number): CrossFormula { return c('distribution-coverage', 'coverage(served, total) = ⌊served · 100 / total⌋', total > 0 ? Math.floor((served * 100) / total) : 0, nat(served, total) && total > 0 && served <= total, 'coverage', [served, total]) }
  /** DENSITY: points over the area they cover. value ⌊points / area⌋. */
  static density(points: number, area: number): CrossFormula { return c('distribution-density', 'density(points, area) = ⌊points / area⌋', area > 0 ? Math.floor(points / area) : 0, nat(points, area) && area > 0, 'density', [points, area]) }
  /** DROP SIZE: units over the stops they serve. value ⌊units / stops⌋. */
  static dropsize(units: number, stops: number): CrossFormula { return c('distribution-dropsize', 'dropsize(units, stops) = ⌊units / stops⌋', stops > 0 ? Math.floor(units / stops) : 0, nat(units, stops) && stops > 0, 'dropsize', [units, stops]) }
  /** ROUTES: trucks at a per-truck capacity. value trucks · perTruck. */
  static routes(trucks: number, perTruck: number): CrossFormula { return c('distribution-routes', 'routes(trucks, perTruck) = trucks · perTruck', trucks * perTruck, nat(trucks, perTruck), 'routes', [trucks, perTruck]) }
  /** ECHELON: volume (units) at a rate per thousand. value ⌊volume · rate / 1000⌋. */
  static echelon(volume: number, rate: number): CrossFormula { return c('distribution-echelon', 'echelon(volume, rate) = ⌊volume · rate / 1000⌋', Math.floor((volume * rate) / 1000), nat(volume, rate), 'echelon', [volume, rate]) }
  /** REACH: 1 when measured coverage meets the target. value [coverage ≥ target]. */
  static reach(coverage: number, target: number): CrossFormula { return c('distribution-reach', 'reach(coverage, target) = [coverage ≥ target]', coverage >= target ? 1 : 0, nat(coverage, target) && coverage <= 100 && target <= 100, 'reach', [coverage, target]) }
}

for (const name of ['coverage', 'density', 'dropsize', 'echelon', 'hubs', 'reach', 'routes', 'spokes'] as const)
  hexRegisterOf('distribution', name, (DistributionFormulas[name] as (...x: unknown[]) => unknown).bind(DistributionFormulas))

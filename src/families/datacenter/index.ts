import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DATACENTER — THE FACILITY, AS ARITHMETIC. A datacenter is numbers by the book: PUE as total facility power over IT
 *  power, the racks a server count fills, IT density across the racks, the cooling overhead PUE implies, redundant units,
 *  rack-unit capacity, power draw, availability from uptime, carbon from energy, and water usage effectiveness.
 *  Deterministic integer identities, standard facility and Uptime-Institute arithmetic (PUE, WUE, availability). Crosses
 *  to `hardware`. A measure, not advice. */

const PROOF = 'Datacenter arithmetic by the book (PUE×100 = ⌊totalW · 100 / itW⌋, racks = ⌈servers / per-rack⌉, density = rackW · racks, cooling overhead = ⌊itW · (puePct − 100) / 100⌋, redundancy = units − needed, capacity = racks · per-rack-U, power = racks · per-rack-kW, availability = ⌊upMin · 100 / totalMin⌋, carbon = kWh · grams-per-kWh, WUE = itKwh · litres-per-kWh); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const d = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'datacenter', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `datacenter.${name}`, params })

export class DatacenterFormulas {
  /** PUE — power usage effectiveness ×100: total facility power over IT power (150 = 1.50). value ⌊totalW · 100 / itW⌋; holds itW > 0. */
  static pue(totalW: number, itW: number): CrossFormula { return d('datacenter-pue', 'pue(totalW, itW) = ⌊totalW · 100 / itW⌋ (PUE×100)', itW > 0 ? Math.floor((totalW * 100) / itW) : 0, nat(totalW, itW) && itW > 0, 'pue', [totalW, itW]) }
  /** RACKS — the racks a server count fills, rounded up. value ⌈servers / perRack⌉; holds perRack > 0. */
  static racks(servers: number, perRack: number): CrossFormula { return d('datacenter-racks', 'racks(servers, perRack) = ⌈servers / perRack⌉', perRack > 0 ? Math.ceil(servers / perRack) : 0, nat(servers, perRack) && perRack > 0, 'racks', [servers, perRack]) }
  /** DENSITY — the total IT watts: per-rack watts across the racks. value rackW · racks. */
  static density(rackW: number, racks: number): CrossFormula { return d('datacenter-density', 'density(rackW, racks) = rackW · racks (total IT watts)', rackW * racks, nat(rackW, racks), 'density', [rackW, racks]) }
  /** COOLINGLOAD — the overhead watts PUE implies above the IT load. value ⌊itW · (puePct − 100) / 100⌋; holds puePct ≥ 100. */
  static coolingload(itW: number, puePct: number): CrossFormula { return d('datacenter-coolingload', 'coolingload(itW, puePct) = ⌊itW · (puePct − 100) / 100⌋ (overhead watts)', puePct >= 100 ? Math.floor((itW * (puePct - 100)) / 100) : 0, nat(itW, puePct) && puePct >= 100, 'coolingload', [itW, puePct]) }
  /** REDUNDANCY — the spare units above what is needed. value units − needed; holds needed ≤ units. */
  static redundancy(units: number, needed: number): CrossFormula { return d('datacenter-redundancy', 'redundancy(units, needed) = units − needed', units - needed, nat(units, needed) && needed <= units, 'redundancy', [units, needed]) }
  /** CAPACITY — the rack units available: racks times the U each holds. value racks · perRackU. */
  static capacity(racks: number, perRackU: number): CrossFormula { return d('datacenter-capacity', 'capacity(racks, perRackU) = racks · perRackU (rack units)', racks * perRackU, nat(racks, perRackU), 'capacity', [racks, perRackU]) }
  /** POWER — the facility power draw: racks times the kW each pulls. value racks · perRackKw. */
  static power(racks: number, perRackKw: number): CrossFormula { return d('datacenter-power', 'power(racks, perRackKw) = racks · perRackKw', racks * perRackKw, nat(racks, perRackKw), 'power', [racks, perRackKw]) }
  /** AVAILABILITY — uptime as a percentage of the total minutes. value ⌊upMin · 100 / totalMin⌋; holds totalMin > 0, upMin ≤ totalMin. */
  static availability(upMin: number, totalMin: number): CrossFormula { return d('datacenter-availability', 'availability(upMin, totalMin) = ⌊upMin · 100 / totalMin⌋', totalMin > 0 ? Math.floor((upMin * 100) / totalMin) : 0, nat(upMin, totalMin) && totalMin > 0 && upMin <= totalMin, 'availability', [upMin, totalMin]) }
  /** CARBON — the grams of CO₂ from the energy drawn: kWh times grams-per-kWh. value kwh · gramsPerKwh. */
  static carbon(kwh: number, gramsPerKwh: number): CrossFormula { return d('datacenter-carbon', 'carbon(kwh, gramsPerKwh) = kwh · gramsPerKwh', kwh * gramsPerKwh, nat(kwh, gramsPerKwh), 'carbon', [kwh, gramsPerKwh]) }
  /** WATERUSAGE — water usage effectiveness: litres drawn per IT kWh across the energy. value itKwh · lPerKwh. */
  static waterusage(itKwh: number, lPerKwh: number): CrossFormula { return d('datacenter-waterusage', 'waterusage(itKwh, lPerKwh) = itKwh · lPerKwh (WUE)', itKwh * lPerKwh, nat(itKwh, lPerKwh), 'waterusage', [itKwh, lPerKwh]) }
}

for (const name of ['availability', 'capacity', 'carbon', 'coolingload', 'density', 'power', 'pue', 'racks', 'redundancy', 'waterusage'] as const)
  hexRegisterOf('datacenter', name, (DatacenterFormulas[name] as (...x: unknown[]) => unknown).bind(DatacenterFormulas))

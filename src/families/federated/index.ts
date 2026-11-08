import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FEDERATED — federated learning as exact combinatorics, not a fabricated coverage number. Model exchanges over rounds
 *  and clients, local updates, FedAvg parameters, the shard each client holds, the secure-aggregation quorum, the
 *  non-empty client cohorts, the stragglers a round drops, and the gradients one round aggregates. Each an exact integer
 *  at a hex address; develops the federated lead. */

const PROOF = 'federated counts: exchanges = rounds·clients; updates = clients·epochs; params = layers·perLayer; shards = samples/clients; quorum = ⌊clients/2⌋ + 1; cohorts = 2^clients − 1 (A000225); straggle = max(0, clients − waited); aggregated = clients·params'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'federated', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `federated.${name}`, params })

export class FederatedFormulas {
  /** Model exchanges over `rounds` rounds with `clients` clients: rounds · clients. */
  static exchanges(rounds: number, clients: number): CrossFormula { return f('federated-exchanges', 'exchanges(rounds, clients) = rounds · clients', rounds * clients, nat(rounds, clients), 'exchanges', [rounds, clients]) }
  /** Local updates across `clients` clients of `epochs` each per round: clients · epochs. */
  static updates(clients: number, epochs: number): CrossFormula { return f('federated-updates', 'updates(clients, epochs) = clients · epochs', clients * epochs, nat(clients, epochs), 'updates', [clients, epochs]) }
  /** Model parameters FedAvg averages: `layers` × `perLayer`. */
  static params(layers: number, perLayer: number): CrossFormula { return f('federated-params', 'params(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'params', [layers, perLayer]) }
  /** The shard each client holds of `samples` across `clients`: samples / clients. */
  static shards(samples: number, clients: number): CrossFormula { return f('federated-shards', 'shards(samples, clients) = samples / clients', div(samples, clients), nat(samples, clients) && clients > 0, 'shards', [samples, clients]) }
  /** The secure-aggregation quorum of `clients`: ⌊clients/2⌋ + 1. */
  static quorum(clients: number): CrossFormula { return f('federated-quorum', 'quorum(clients) = ⌊clients/2⌋ + 1', Math.floor(clients / 2) + 1, nat(clients), 'quorum', [clients]) }
  /** The non-empty client cohorts of `clients`: 2^clients − 1 (clients ≤ 30). */
  static cohorts(clients: number): CrossFormula { return f('federated-cohorts', 'cohorts(clients) = 2^clients − 1', clients <= 30 ? 2 ** clients - 1 : 0, nat(clients) && clients <= 30, 'cohorts', [clients]) }
  /** The stragglers a round drops when `waited` of `clients` reported: max(0, clients − waited). */
  static straggle(clients: number, waited: number): CrossFormula { return f('federated-straggle', 'straggle(clients, waited) = max(0, clients − waited)', Math.max(0, clients - waited), nat(clients, waited), 'straggle', [clients, waited]) }
  /** The gradients one FedAvg round aggregates from `clients` of `params` each: clients · params. */
  static aggregated(clients: number, params: number): CrossFormula { return f('federated-aggregated', 'aggregated(clients, params) = clients · params', clients * params, nat(clients, params), 'aggregated', [clients, params]) }
}

for (const name of ['aggregated', 'cohorts', 'exchanges', 'params', 'quorum', 'shards', 'straggle', 'updates'] as const)
  hexRegisterOf('federated', name, (FederatedFormulas[name] as (...x: unknown[]) => unknown).bind(FederatedFormulas))

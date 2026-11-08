import { hexRegisterOf, hexFamiliesOf } from '../../quantum/processing/unit/index.js'
import { DOORS } from '../../mcp/discovery.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAYLOAD IN QUANTUM CONFIGS — the lattice imagines a Payload CMS collection from a family. A QPU family is a collection:
 *  each of its formulas is a number field, the write is content-addressed and receipted (the court hooks, courtReceipt +
 *  uuidField), and access is the author's standing. `imagine` returns the whole collection config, `fields` counts the
 *  fields, `collections` counts the collections the lattice would define, `coverage` scores how much of the Payload API
 *  surface is used. Computed from the live hex registry, so the config never drifts from the unit. Crosses to `cross`. */

const PROOF = 'Payload CMS config imagined from the quantum lattice: a family → a collection (its formulas → number fields), the court hooks (courtReceipt + uuidField), standing access; and a coverage score of the Payload API surface used'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'payload', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `payload.${name}`, params })

/** The families the lattice can turn into collections: every registered family that is not a door, sorted. */
const collectionsOf = (): string[] => [...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x) && !x.startsWith('Qpu.')).sort()

export class PayloadFormulas {
  /** IMAGINE the Payload collection config for the i-th family: its formulas as number fields, the court hooks and access.
   *  value is the field count; the reading is the collection config, ready for payload.config. */
  static imagine(i: number): CrossFormula {
    const name = collectionsOf()[i]
    const fs = name ? hexFamiliesOf().get(name) ?? [] : []
    const fields = fs.map((x) => ({ name: x.name, type: 'number', admin: { description: `${x.arity} input${x.arity === 1 ? '' : 's'}${x.live ? ', live' : ''}` } }))
    const collection = name
      ? {
          slug: name,
          admin: { useAsTitle: 'uuid', group: 'QPU' },
          access: { read: 'standing', update: 'standing' },
          hooks: { beforeChange: ['courtReceipt()'] },
          fields: [...fields, { name: 'uuid', type: 'text', index: true, admin: { readOnly: true, position: 'sidebar' } }],
        }
      : undefined
    return p('payload-imagine', 'imagine(i) = the Payload collection the i-th family becomes (formulas → number fields, court hooks, standing access)', fields.length, name !== undefined && fields.length > 0, 'imagine', [i], { family: name, collection })
  }
  /** FIELDS: how many Payload fields the i-th family's collection has (one per formula). */
  static fields(i: number): CrossFormula { const name = collectionsOf()[i]; const n = name ? (hexFamiliesOf().get(name) ?? []).length : 0; return p('payload-fields', 'fields(i) = |formulas of the i-th family| (one number field each)', n, name !== undefined && n > 0, 'fields', [i], { family: name }) }
  /** COLLECTIONS: how many Payload collections the lattice would define — one per family. */
  static collections(): CrossFormula { const c = collectionsOf().length; return p('payload-collections', 'collections() = |families| (one collection each)', c, c > 0, 'collections', [], { collections: collectionsOf() }) }
  /** COVERAGE of the Payload API surface as a percentage: the features the unit uses over the features available. The
   *  surface is collections, fields, hooks, access, blocks, globals, versions, localization, plugins, jobs, endpoints. */
  static coverage(used: number, surface: number): CrossFormula { return p('payload-coverage', 'coverage(used, surface) = ⌊used · 100 / surface⌋', surface > 0 ? Math.floor((used * 100) / surface) : 0, nat(used, surface) && surface > 0 && used <= surface, 'coverage', [used, surface]) }
}

for (const name of ['collections', 'coverage', 'fields', 'imagine'] as const)
  hexRegisterOf('payload', name, (PayloadFormulas[name] as (...x: unknown[]) => unknown).bind(PayloadFormulas))

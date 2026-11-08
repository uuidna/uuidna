import { facesOf, hexFamiliesOf, hexFamilyCapOf, hexRegisterOf, hexRegisteredSizeOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RULES ARE FORMULAS. What governs the unit's own shape is computed, not written down: a family holds at most a
 *  nibble of formulas (fifteen; the sixteenth value is no formula), a sweep is a slice of faces per call, every
 *  family registered is served whole. Each rule is a formula with a value and a receipt, and the one that counts
 *  what breaks a rule holds only at zero. The file-level rules (the Worker config's only limit is the one-request
 *  CPU ceiling, a sweep is split into slices, the bundler's sideEffects equal the registry, the registry equals the
 *  registering modules) are the scripts suite rules.test.mjs, discovered by glob and run by the one workflow. */

const PROOF = 'the hex UUID: one nibble per formula, three sections of four; the lattice: faces per slice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const families = () => [...hexFamiliesOf().keys()].sort()
/** A family's index in the sorted registry the rules count by (nibbles(i), free(i), compositions(i)): a name resolves to
 *  the index it has now, so a caller that addresses a family never holds an integer a new family shifts. */
export const ruleIndexOf = (name: string): number => { const i = families().indexOf(name); if (i < 0) throw new Error(`rule: no family ${name}`); return i }
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rule', dst: 'lattice', formula, value, proof: PROOF, ...extra }, holds, { name: `rule.${name}`, params })

export class RuleFormulas {
  /** The cap: fifteen formulas per family, one nibble. */
  static cap(): CrossFormula { return f('rule-cap', 'cap = 16 − 1', hexFamilyCapOf(), true, 'cap', []) }
  /** The slice: faces per call of any sweep. */
  static slice(): CrossFormula { return f('rule-slice', 'slice = faces', facesOf().faces, true, 'slice', []) }
  /** How many families are registered. */
  static families(): CrossFormula { return f('rule-families', 'families = |registry|', families().length, families().length > 0, 'families', [], { families: families() }) }
  /** The formulas the i-th family (sorted) serves. */
  static nibbles(i: number): CrossFormula { const name = families()[i]; return f('rule-nibbles', 'nibbles(i) = |formulas served by family i|', name ? hexFamiliesOf().get(name)!.length : 0, name !== undefined, 'nibbles', [i], { family: name }) }
  /** What the i-th family registered beyond what it serves: truncated by the cap; holds only at zero. */
  static truncated(i: number): CrossFormula { const name = families()[i]; const over = name ? Math.max(0, hexRegisteredSizeOf(name) - hexFamiliesOf().get(name)!.length) : 0; return f('rule-truncated', 'truncated(i) = registered − served', over, name !== undefined && over === 0, 'truncated', [i], { family: name }) }
  /** How many families are past the cap: holds only at zero. */
  static over(): CrossFormula { const list = families().filter((name) => hexRegisteredSizeOf(name) > hexFamilyCapOf()); return f('rule-over', 'over = |{ f : registered(f) > cap }|', list.length, list.length === 0, 'over', [], { over: list }) }
  /** The room left in the i-th family: cap − served. */
  static free(i: number): CrossFormula { const name = families()[i]; return f('rule-free', 'free(i) = cap − nibbles(i)', name ? hexFamilyCapOf() - hexFamiliesOf().get(name)!.length : 0, name !== undefined, 'free', [i], { family: name }) }
  /** The two-step compositions a family of n formulas offers: n². */
  static compositions(i: number): CrossFormula { const name = families()[i]; const k = name ? hexFamiliesOf().get(name)!.length : 0; return f('rule-compositions', 'compositions(i) = n²', k * k, name !== undefined, 'compositions', [i], { family: name }) }
  /** Every formula of every family, the addressable whole. */
  static formulas(): CrossFormula { const total = [...hexFamiliesOf().values()].reduce((s, fs) => s + fs.length, 0); return f('rule-formulas', 'formulas = Σ nibbles(i)', total, total > 0, 'formulas', []) }
  /** One word per family (the naming rule, until now a convention no formula held): a registered family's name is one
   *  lowercase word, no separator. Holds only at zero. The Lean families (Qpu.X) and the door families qpu/crypto are
   *  not registered here, so they are not counted. */
  static named(): CrossFormula { const bad = families().filter((name) => hexRegisteredSizeOf(name) > 0 && !/^[a-z]+$/.test(name)); return f('rule-named', 'named = |{ registered f : name is not one lowercase word }|', bad.length, bad.length === 0, 'named', [], { bad }) }
}

for (const name of ['cap', 'compositions', 'families', 'formulas', 'free', 'named', 'nibbles', 'over', 'slice', 'truncated'] as const)
  hexRegisterOf('rule', name, (RuleFormulas[name] as (...x: unknown[]) => unknown).bind(RuleFormulas))

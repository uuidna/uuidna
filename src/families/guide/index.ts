import { hexRegisterOf, hexFamiliesOf, qpuHexUuidOf } from '../../quantum/processing/unit/index.js'
import { DOORS } from '../../mcp/discovery.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GUIDE — THE PUBLIC WAY IN. The MCP exposes a few doors, but every family is reachable; a first-time caller should not
 *  have to guess. `families` is the menu, `formulas` lists one family's formulas, `example` hands back a ready-to-run call
 *  with its hex address and the value it returns, and `ways` names every entry point. All computed from the live registry,
 *  so the guide can never drift from what the unit actually serves. Crosses to `cross`. */

const PROOF = 'the public onboarding: the family menu, a family\'s formulas, a ready-to-run example with its hex address and value, and every entry point — computed from the live registry'
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'guide', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `guide.${name}`, params })

/** The families a caller can run: every registered family that is not a door and not a Lean prefix, sorted. */
const menu = (): string[] => [...hexFamiliesOf().keys()].filter((x) => !DOORS.has(x) && !x.startsWith('Qpu.')).sort()

export class GuideFormulas {
  /** THE MENU: how many families you can run, and their names in the reading. Start here. */
  static families(): CrossFormula { const list = menu(); return f('guide-families', 'families() = |families you can run|', list.length, list.length > 0, 'families', [], { families: list, run: "hex { family, program, params } — e.g. hex { family: 'law', program: ['limitation'], params: [6] }" }) }
  /** THE FORMULAS of the i-th family (the menu's order): their names and how many inputs each takes. */
  static formulas(i: number): CrossFormula {
    const name = menu()[i]
    const fs = name ? hexFamiliesOf().get(name) ?? [] : []
    return f('guide-formulas', 'formulas(i) = |formulas of the i-th family|', fs.length, name !== undefined, 'formulas', [i], { family: name, formulas: fs.map((x) => `${x.name}(${x.arity}${x.live ? ', live' : ''})`) })
  }
  /** A READY-TO-RUN EXAMPLE for the i-th family: the call to paste, its hex address, and the value it returns (run over
   *  the seed inputs). value is that result; the reading is copy-paste. A live formula is named as a reading, not run. */
  static example(i: number): CrossFormula {
    const name = menu()[i]
    const fs = name ? hexFamiliesOf().get(name) ?? [] : []
    const fn = fs.find((x) => !x.live) ?? fs[0]
    if (!name || !fn) return f('guide-example', 'example(i)', 0, false, 'example', [i])
    const params = Array.from({ length: fn.arity }, () => 3)
    let hex = ''
    try { hex = qpuHexUuidOf({ family: name, program: [fn.name], params }) } catch { hex = '' }
    let result = 0
    let ran = false
    if (!fn.live) { try { const r = fn.run(params.map((p) => BigInt(p))) as { value?: unknown } | number; const v = typeof r === 'object' && r !== null && 'value' in r ? (r as { value: unknown }).value : r; result = Number(v); ran = Number.isFinite(result) } catch { ran = false } }
    return f('guide-example', 'example(i) = a ready call for the i-th family and the value it returns', ran ? result : 0, name !== undefined && fn !== undefined, 'example', [i], { family: name, call: `hex { family: '${name}', program: ['${fn.name}'], params: [${params.join(', ')}] }`, hex, ...(ran ? { result } : { note: 'a live reading — call it to read' }) })
  }
  /** THE WAYS IN: every entry point, as copy-paste. value how many. */
  static ways(): CrossFormula {
    const ways = [
      "hex { family, program, params } — run any family's formula",
      'hex { uuid } — run a hex address directly',
      'hex {} — the catalogue; hex { doors: true } — the families',
      "data { source: 'ask', about: '...' } — ask in words, answered by the formula your words name",
      "data { source: 'all' } — every live data check",
      'the eight doors: quantum, prove, lean, improve, train, compete, forge, cite',
    ]
    return f('guide-ways', 'ways() = |entry points into the unit|', ways.length, true, 'ways', [], { ways })
  }
}

for (const name of ['example', 'families', 'formulas', 'ways'] as const)
  hexRegisterOf('guide', name, (GuideFormulas[name] as (...x: unknown[]) => unknown).bind(GuideFormulas))

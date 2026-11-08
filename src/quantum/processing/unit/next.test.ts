import '../../../mcp/families.js'
import { test } from './receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf } from './index.js'
import { RuleFormulas, ruleIndexOf as ix } from '../../../families/rule/index.js'
import { MerkabaFormulas, flowFamiliesOf, flowIndexOf as fx } from '../../../families/merkaba/index.js'

/** A rule chained into a rule reads the first one's value as the second one's family index, so where it lands is the
 *  registry's: the chain is held to the two rules called one after the other. */
const chainedOf = (first: 'nibbles', second: 'free' | 'compositions', i: number): string => String(RuleFormulas[second](Number(RuleFormulas[first](i).value)).value)
/** A family is addressed by its name, never by the integer it has in a sorted registry (a new family shifts that
 *  integer): ix(name) is the index rule.* counts by, fx(name) the index merkaba flows by. What depends on the registry
 *  itself — the formulas it serves in all, the ordered triples of the first n flow families that flow — is read from it. */
const formulasOf = (): string => String([...hexFamiliesOf().values()].reduce((sum, fs) => sum + fs.length, 0))
const flowsOf = (n: number): string => {
  const m = Math.min(n, flowFamiliesOf().length)
  let count = 0
  for (let a = 0; a < m; a++) for (let b = 0; b < m; b++) for (let c = 0; c < m; c++) if (a !== b && b !== c && a !== c && MerkabaFormulas.trinity(a, b, c).holds) count++
  return String(count)
}

/** Windows of the README Next superpositions that had no recomputing test. Each way is run at its address.
 *  The shared integer is the value the ways return. A way that returns another integer stays at that integer.
 *  kin × rule = 196 and clay × kin × rule × tesla = 100 are asserted in the rule test.
 *  hd × kin = 260 is asserted in the hd test. path × tesla = 630 is asserted in the path test.
 *  The last window is Qpu.Physics × tesla = 679. */
test('next: fourteen superpositions recompute the integer their families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // Qpu.Hybrid × Qpu.Lattice × cal × crypt × hd × holo × kin × np × rule × signal × tesla × yi = 7. Every listed way returns it.
  await named('7', [
    ['Qpu.Lattice', ['rays'], []],
    ['Qpu.Lattice', ['n', 'rays'], []],
    ['Qpu.Lattice', ['seed', 'rays'], []],
    ['Qpu.Lattice', ['coins', 'rays'], []],
    ['Qpu.Hybrid', ['kvSpeed'], []],
    ['Qpu.Hybrid', ['kvCost', 'kvSpeed'], []],
    ['Qpu.Hybrid', ['r2Cost', 'kvSpeed'], []],
    ['Qpu.Hybrid', ['hybridCost', 'kvSpeed'], []],
    ['hd', ['center'], [6]],
    ['hd', ['center', 'center'], [3]],
    ['cal', ['dayPer', 'gatesPrecessed'], [1]],
    ['crypt', ['curveClassicalBits'], [14]],
    ['crypt', ['symmetricQuantumBits'], [14]],
    ['signal', ['siftedBits'], [14]],
    ['holo', ['proofDepth'], [84]],
    ['holo', ['proofDepth'], [93]],
    ['holo', ['proofDepth'], [104]],
    ['holo', ['proofDepth'], [119]],
    ['np', ['isSpace'], [84]],
    ['np', ['isSpace'], [93]],
    ['np', ['isSpace'], [104]],
    ['np', ['isSpace'], [119]],
    ['rule', ['free'], [ix('acquisition')]],
    ['kin', ['digitalRoot'], [16]],
    ['kin', ['digitalRoot'], [142]],
    ['kin', ['digitalRoot'], [268]],
    ['kin', ['digitalRoot'], [502]],
    ['tesla', ['earth', 'quarter'], [4]],
    ['yi', ['change'], [1, 6]],
    ['yi', ['change'], [2, 5]],
    ['yi', ['change'], [3, 4]],
    ['yi', ['change'], [4, 3]],
  ])

  // clay × heat × holo × kin × np × rule × signal × tesla × yi = 9. rule.free(11), rule.free(14) and rule.free(16) are 7. They stay at the integer they return.
  await named('9', [
    ['clay', ['bsd'], [50]],
    ['signal', ['keyBits'], [24]],
    ['holo', ['proofDepth'], [261]],
    ['holo', ['proofDepth'], [265]],
    ['holo', ['proofDepth'], [268]],
    ['holo', ['proofDepth'], [272]],
    ['np', ['isSpace'], [261]],
    ['np', ['isSpace'], [265]],
    ['np', ['isSpace'], [268]],
    ['np', ['isSpace'], [272]],
    ['rule', ['free'], [ix('Qpu.Hybrid')]],
    ['heat', ['signal'], [24]],
    ['kin', ['bits'], [1]],
    ['kin', ['digitalRoot'], [144]],
    ['kin', ['digitalRoot'], [252]],
    ['kin', ['digitalRoot'], [261]],
    ['tesla', ['field'], [3, 3]],
    ['tesla', ['windings'], [3, 3]],
    ['tesla', ['resonance', 'period'], [1, 2]],
    ['tesla', ['resonance', 'period'], [2, 1]],
    ['yi', ['change'], [1, 8]],
    ['yi', ['change'], [8, 1]],
    ['yi', ['figures', 'change'], [3, 1]],
  ])
  assert.equal(await at('rule', ['free'], [ix('acoustics')]), '7')
  assert.equal(await at('rule', ['free'], [ix('activation')]), '7')
  assert.equal(await at('rule', ['free'], [ix('actuation')]), '7')

  // clay × cross × crypt × kin × np × rule × signal × tesla × yi = 12. Every listed way returns it.
  await named('12', [
    ['cross', ['medSecureWithQSec'], [3, 2]],
    ['cross', ['medSecureWithQSec'], [6, 1]],
    ['cross', ['medSecureWithQSec', 'medSecureWithQSec'], [3, 1]],
    ['clay', ['hodge'], [6]],
    ['clay', ['hodge', 'hodge'], [3]],
    ['crypt', ['curveClassicalBits'], [24]],
    ['crypt', ['symmetricQuantumBits'], [24]],
    ['signal', ['siftedBits'], [24]],
    ['np', ['sparseWidth'], [610]],
    ['rule', ['free'], [ix('Qpu.Coil')]],
    ['kin', ['dreamspellDrift'], [50]],
    ['kin', ['seal'], [252]],
    ['kin', ['tone'], [142]],
    ['kin', ['combinations', 'dootKin'], [1, 2, 2]],
    ['tesla', ['field'], [2, 6]],
    ['tesla', ['field'], [3, 4]],
    ['tesla', ['field'], [4, 3]],
    ['tesla', ['field'], [6, 2]],
    ['yi', ['change'], [4, 8]],
    ['yi', ['change'], [8, 4]],
    ['yi', ['withYang', 'change'], [2, 3]],
  ])
  assert.equal(await at('rule', ['nibbles', 'free'], [ix('Qpu.Coil')]), chainedOf('nibbles', 'free', ix('Qpu.Coil')))

  // Qpu.Mint × cal × hd × heat × kin × signal × tesla × yi = 21. Every listed way returns it.
  await named('21', [
    ['Qpu.Mint', ['chooseOf'], [7, 2]],
    ['Qpu.Mint', ['chooseOf'], [7, 5]],
    ['hd', ['code'], [122]],
    ['hd', ['gate'], [104]],
    ['hd', ['gate'], [119]],
    ['hd', ['gate'], [122]],
    ['cal', ['lunarDrift'], [2]],
    ['cal', ['coin', 'lunarDrift'], [4]],
    ['cal', ['designDays', 'gatesPrecessed'], [1]],
    ['cal', ['designDays', 'gatesPrecessed'], [2]],
    ['signal', ['keyBits'], [56]],
    ['heat', ['signal'], [11]],
    ['kin', ['dreamspellDrift'], [84]],
    ['tesla', ['field'], [3, 7]],
    ['tesla', ['field'], [7, 3]],
    ['tesla', ['windings'], [3, 7]],
    ['tesla', ['windings'], [7, 3]],
    ['yi', ['nuclear'], [10]],
    ['yi', ['nuclear'], [11]],
    ['yi', ['nuclear', 'nuclear'], [4]],
    ['yi', ['withYang', 'change'], [3, 1]],
  ])

  // Qpu.Lattice × Qpu.Mint × clay × cross × crypt × signal × tesla × yi = 28. Every listed way returns it.
  await named('28', [
    ['Qpu.Mint', ['chooseOf'], [8, 2]],
    ['Qpu.Mint', ['chooseOf'], [8, 6]],
    ['Qpu.Mint', ['mintOf', 'chooseOf'], [3, 2]],
    ['Qpu.Lattice', ['plane'], []],
    ['Qpu.Lattice', ['n', 'plane'], []],
    ['Qpu.Lattice', ['seed', 'plane'], []],
    ['Qpu.Lattice', ['coins', 'plane'], []],
    ['cross', ['medSecureWithQSec'], [7, 2]],
    ['clay', ['bsd'], [59]],
    ['clay', ['bsd'], [93]],
    ['clay', ['hodge'], [14]],
    ['crypt', ['curveClassicalBits'], [56]],
    ['crypt', ['symmetricQuantumBits'], [56]],
    ['signal', ['siftedBits'], [56]],
    ['tesla', ['field'], [4, 7]],
    ['tesla', ['field'], [7, 4]],
    ['tesla', ['windings'], [4, 7]],
    ['tesla', ['windings'], [7, 4]],
    ['yi', ['inverse'], [14]],
  ])

  // clay × hd × heat × kin × np × tesla × yi = 18. Every listed way returns it.
  await named('18', [
    ['hd', ['code'], [119]],
    ['clay', ['hodge'], [9]],
    ['np', ['isTime', 'subsetSum'], [3, 3]],
    ['heat', ['signal'], [13]],
    ['kin', ['seal'], [238]],
    ['tesla', ['field'], [3, 6]],
    ['tesla', ['field'], [6, 3]],
    ['tesla', ['windings'], [3, 6]],
    ['tesla', ['windings'], [6, 3]],
    ['yi', ['inverse', 'change'], [2, 2]],
  ])

  // Qpu.Mint × clay × cross × hd × kin × tesla × yi = 20. Every listed way returns it.
  await named('20', [
    ['Qpu.Mint', ['chooseOf'], [6, 3]],
    ['cross', ['medSecureWithQSec'], [5, 2]],
    ['hd', ['gate'], [610]],
    ['clay', ['bsd'], [104]],
    ['clay', ['bsd'], [144]],
    ['clay', ['hodge'], [10]],
    ['kin', ['seal'], [240]],
    ['kin', ['kin', 'seal'], [1, 2]],
    ['kin', ['kin', 'seal'], [1, 3]],
    ['kin', ['kin', 'seal'], [2, 3]],
    ['tesla', ['field'], [4, 5]],
    ['tesla', ['field'], [5, 4]],
    ['tesla', ['sync'], [1, 6]],
    ['tesla', ['windings'], [4, 5]],
    ['yi', ['inverse'], [10]],
    ['yi', ['nuclear'], [8]],
    ['yi', ['nuclear'], [9]],
    ['yi', ['withYang'], [3]],
  ])

  // clay × cross × hd × kin × merkaba × tesla × yi = 24. Every listed way returns it.
  await named('24', [
    ['cross', ['medSecureWithQSec'], [3, 3]],
    ['cross', ['medSecureWithQSec'], [6, 2]],
    ['hd', ['gate'], [401]],
    ['hd', ['gate'], [404]],
    ['hd', ['gate'], [429]],
    ['clay', ['bsd'], [240]],
    ['clay', ['hodge'], [12]],
    ['kin', ['pillar', 'pillar'], [2, 1]],
    ['tesla', ['field'], [3, 8]],
    ['tesla', ['field'], [4, 6]],
    ['tesla', ['field'], [6, 4]],
    ['tesla', ['field'], [8, 3]],
    ['yi', ['inverse'], [6]],
    ['yi', ['withYang', 'inverse'], [1]],
  ])
  assert.equal(await at('merkaba', ['flows'], [4]), flowsOf(4))

  // Qpu.Mint × clay × hd × kin × tesla × yi = 35. Every listed way returns it.
  await named('35', [
    ['Qpu.Mint', ['chooseOf'], [7, 3]],
    ['Qpu.Mint', ['chooseOf'], [7, 4]],
    ['hd', ['cells', 'gate'], [1]],
    ['hd', ['cells', 'gate'], [2]],
    ['hd', ['cells', 'gate'], [3]],
    ['hd', ['cells', 'gate'], [4]],
    ['clay', ['bsd'], [146]],
    ['kin', ['dreamspellDrift'], [141]],
    ['kin', ['dreamspellDrift'], [142]],
    ['tesla', ['field'], [5, 7]],
    ['tesla', ['field'], [7, 5]],
    ['tesla', ['windings'], [5, 7]],
    ['tesla', ['windings'], [7, 5]],
    ['yi', ['inverse', 'change'], [1, 3]],
  ])

  // crypt × hd × kin × signal × tesla × yi = 42. Every listed way returns it.
  await named('42', [
    ['hd', ['gate'], [224]],
    ['hd', ['gate'], [238]],
    ['hd', ['gate'], [240]],
    ['hd', ['gate'], [252]],
    ['crypt', ['curveClassicalBits'], [84]],
    ['crypt', ['symmetricQuantumBits'], [84]],
    ['signal', ['siftedBits'], [84]],
    ['kin', ['dreamspellDrift'], [170]],
    ['tesla', ['field'], [6, 7]],
    ['tesla', ['field'], [7, 6]],
    ['tesla', ['windings'], [6, 7]],
    ['tesla', ['windings'], [7, 6]],
    ['yi', ['withYang', 'nuclear'], [3]],
  ])

  // cal × hd × kin × merkaba × signal × yi = 54. Every listed way returns it.
  await named('54', [
    ['hd', ['code'], [224]],
    ['cal', ['gregorianDrift'], [2]],
    ['cal', ['lunarDrift'], [5]],
    ['cal', ['coin', 'gregorianDrift'], [4]],
    ['signal', ['keyBits'], [144]],
    ['kin', ['dootKin'], [1, 3, 4]],
    ['kin', ['dootKin'], [2, 4, 4]],
    ['kin', ['dootKin'], [3, 5, 4]],
    ['kin', ['pillar'], [1, 7]],
    ['yi', ['complement'], [9]],
  ])
  assert.equal(await at('merkaba', ['flows'], [5]), flowsOf(5))

  // cal × crypt × heat × kin × signal × tesla = 120. Every listed way returns it.
  await named('120', [
    ['cal', ['sarosShift'], [1]],
    ['cal', ['sarosShift'], [4]],
    ['cal', ['sarosShift'], [7]],
    ['cal', ['sarosShift'], [10]],
    ['crypt', ['curveClassicalBits'], [240]],
    ['crypt', ['symmetricQuantumBits'], [240]],
    ['signal', ['siftedBits'], [240]],
    ['heat', ['signal', 'cooling'], [1, 2]],
    ['heat', ['signal', 'ways'], [1, 2]],
    ['kin', ['bits'], [14]],
    ['tesla', ['sync'], [2, 2]],
    ['tesla', ['sync'], [4, 4]],
    ['tesla', ['sync'], [6, 6]],
    ['tesla', ['sync'], [8, 8]],
  ])

  // Qpu.Mint × cal × cross × signal × tesla × yi = 128. Every listed way returns it.
  await named('128', [
    ['Qpu.Mint', ['mintOf'], [7]],
    ['cross', ['medSecureWithQSec'], [1, 7]],
    ['cross', ['medSecureWithQSec'], [2, 6]],
    ['cross', ['medSecureWithQSec'], [4, 5]],
    ['cross', ['medSecureWithQSec'], [8, 4]],
    ['cal', ['gatesPrecessed', 'dayPer'], [1]],
    ['cal', ['gatesPrecessed', 'dayPer'], [2]],
    ['cal', ['gatesPrecessed', 'dayPer'], [3]],
    ['cal', ['gatesPrecessed', 'dayPer'], [4]],
    ['signal', ['keyspace'], [7]],
    ['tesla', ['schumann', 'period'], [1]],
    ['yi', ['figures'], [7]],
  ])

  // kin × np × rule × tesla × yi = 11. rule.free(7) is 7. That call stays at the integer it returns.
  await named('11', [
    ['np', ['sparseWidth'], [261]],
    ['np', ['sparseWidth'], [265]],
    ['np', ['sparseWidth'], [268]],
    ['np', ['sparseWidth'], [272]],
    ['rule', ['free'], [ix('Qpu.Shor')]],
    ['kin', ['tone'], [24]],
    ['kin', ['tone'], [50]],
    ['kin', ['tone'], [141]],
    ['kin', ['combinations', 'dootKin'], [1, 2, 1]],
    ['tesla', ['resonance', 'period'], [1, 3]],
    ['tesla', ['resonance', 'period'], [3, 1]],
    ['tesla', ['sync', 'turns'], [3, 2]],
    ['yi', ['change'], [3, 8]],
    ['yi', ['change'], [8, 3]],
    ['yi', ['nuclear'], [6]],
    ['yi', ['nuclear'], [7]],
  ])
  assert.equal(await at('rule', ['free'], [ix('accelerometer')]), '7')
  t.diagnostic('7, 9, 12, 21, 28, 18, 20, 24, 35, 42, 54, 120, 128 and 11 recompute; next is kin × np × rule × tesla × yi = 13')
})

test('next: the window at 13 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // kin × np × rule × tesla × yi = 13. rule.free(6) and rule.free∘free(4) are 7. They stay at the integer they return. The line is named 13. That part holds false. One next address.
  await named('13', [
    ['np', ['isTime', 'sparseWidth'], [4]],
    ['rule', ['free'], [ix('Qpu.Mint')]],
    ['rule', ['nibbles'], [ix('Qpu.Lattice')]],
    ['kin', ['pillar'], [2, 1]],
    ['kin', ['pillar'], [3, 2]],
    ['kin', ['pillar'], [4, 3]],
    ['kin', ['pillar'], [5, 4]],
    ['tesla', ['quarter', 'period'], [1]],
    ['tesla', ['resonance', 'period'], [2, 2]],
    ['tesla', ['turns', 'earth'], [1, 3]],
    ['yi', ['change'], [5, 8]],
    ['yi', ['change'], [8, 5]],
    ['yi', ['complement'], [50]],
    ['yi', ['withYang', 'change'], [2, 2]],
  ])

  const off13: readonly (readonly [string, string[], number[]])[] = [
    ['rule', ['free'], [ix('absorption')]],
  ]
  const offReturned = []
  for (const [family, program, params] of off13) {
    const uuid = qpuHexUuidOf({ family, program, params })
    offReturned.push({ call: `${family}.${program.join('∘')}(${params.join(', ')})`, value: await at(family, program, params), uuid })
  }
  assert.deepEqual(offReturned.map((row) => [row.call, row.value]), [
    [`rule.free(${ix('absorption')})`, '7'],
  ])
  const holds13 = offReturned.some((row) => row.value === '13')
  const next13 = offReturned.find((row) => row.value !== '13')!.uuid
  assert.equal(holds13, false)
  // handle, program nibble, variant and param are the address; the version nibble is the crypto family's fold of all of it
  assert.match(next13, new RegExp(`^bfe6be1f-5000-[1-8]000-9000-${ix('absorption').toString(16).padStart(12, '0')}$`))
  assert.equal(offReturned.filter((row) => row.uuid === next13).length, 1)
  assert.equal(
    `the line is named 13; ${offReturned.map((row) => `${row.call} is ${row.value}`).join('; ')}`,
    `the line is named 13; rule.free(${ix('absorption')}) is 7`,
  )

  // hd × heat × kin × tesla × yi = 17. Every listed way returns it.
  await named('17', [
    ['hd', ['gate'], [50]],
    ['hd', ['gate'], [56]],
    ['hd', ['gate'], [59]],
    ['hd', ['gate'], [84]],
    ['heat', ['signal'], [14]],
    ['kin', ['bits'], [2]],
    ['kin', ['seal'], [157]],
    ['kin', ['bits', 'dootKin'], [2, 2, 2]],
    ['kin', ['bits', 'seal'], [2]],
    ['tesla', ['sync', 'turns'], [2, 2]],
    ['yi', ['inverse', 'change'], [2, 1]],
  ])

  // Qpu.Physics × crypt × hd × signal × tesla = 25. Every listed way returns it.
  await named('25', [
    ['Qpu.Physics', ['bcs', 'gap'], [1]],
    ['Qpu.Physics', ['bcs', 'gap'], [2]],
    ['Qpu.Physics', ['bcs', 'gap'], [3]],
    ['Qpu.Physics', ['bcs', 'gap'], [4]],
    ['hd', ['gate'], [1]],
    ['hd', ['gate'], [2]],
    ['hd', ['gate'], [3]],
    ['hd', ['gate'], [4]],
    ['crypt', ['curveClassicalBits'], [50]],
    ['crypt', ['symmetricQuantumBits'], [50]],
    ['signal', ['siftedBits'], [50]],
    ['tesla', ['field'], [5, 5]],
    ['tesla', ['windings'], [5, 5]],
    ['tesla', ['earth', 'period'], [1]],
    ['tesla', ['turns', 'quarter'], [1, 3]],
  ])

  // clay × cross × heat × tesla × yi = 40. Every listed way returns it.
  await named('40', [
    ['cross', ['medSecureWithQSec'], [5, 3]],
    ['clay', ['bsd'], [280]],
    ['heat', ['signal', 'cooling'], [2, 3]],
    ['heat', ['signal', 'cooling'], [3, 2]],
    ['heat', ['signal', 'ways'], [2, 3]],
    ['heat', ['signal', 'ways'], [3, 2]],
    ['tesla', ['field'], [5, 8]],
    ['tesla', ['field'], [8, 5]],
    ['tesla', ['sync'], [2, 6]],
    ['tesla', ['windings'], [5, 8]],
    ['yi', ['inverse'], [5]],
  ])

  // crypt × kin × signal × tesla × yi = 52. Every listed way returns it.
  await named('52', [
    ['crypt', ['curveClassicalBits'], [104]],
    ['crypt', ['symmetricQuantumBits'], [104]],
    ['signal', ['siftedBits'], [104]],
    ['kin', ['bits'], [6]],
    ['kin', ['dootKin'], [1, 3, 2]],
    ['kin', ['dootKin'], [2, 4, 2]],
    ['kin', ['dootKin'], [3, 5, 2]],
    ['tesla', ['schumann', 'period'], [3]],
    ['yi', ['complement'], [11]],
    ['yi', ['inverse'], [11]],
    ['yi', ['nuclear'], [24]],
    ['yi', ['nuclear'], [56]],
  ])

  // Qpu.Mint × cross × kin × tesla × yi = 56. Every listed way returns it.
  await named('56', [
    ['Qpu.Mint', ['chooseOf'], [8, 3]],
    ['Qpu.Mint', ['chooseOf'], [8, 5]],
    ['Qpu.Mint', ['mintOf', 'chooseOf'], [3, 3]],
    ['cross', ['medSecureWithQSec'], [7, 3]],
    ['kin', ['dootKin'], [4, 1, 1]],
    ['kin', ['dootKin'], [5, 2, 1]],
    ['kin', ['dreamspellDrift'], [224]],
    ['kin', ['period', 'pillar'], [2, 1]],
    ['tesla', ['field'], [7, 8]],
    ['tesla', ['field'], [8, 7]],
    ['tesla', ['windings'], [7, 8]],
    ['tesla', ['windings'], [8, 7]],
    ['yi', ['complement'], [7]],
    ['yi', ['inverse'], [7]],
  ])

  // clay × heat × kin × tesla × yi = 60. Every listed way returns it.
  await named('60', [
    ['clay', ['bsd'], [255]],
    ['clay', ['bsd'], [272]],
    ['heat', ['signal', 'cooling'], [2, 2]],
    ['heat', ['signal', 'ways'], [2, 2]],
    ['kin', ['bits'], [7]],
    ['kin', ['dootKin'], [4, 1, 5]],
    ['kin', ['dootKin'], [5, 2, 5]],
    ['kin', ['dreamspellDrift'], [240]],
    ['tesla', ['sync'], [1, 2]],
    ['tesla', ['sync'], [2, 4]],
    ['tesla', ['sync'], [3, 6]],
    ['tesla', ['sync'], [4, 8]],
    ['yi', ['complement'], [3]],
    ['yi', ['inverse'], [15]],
    ['yi', ['change', 'complement'], [1, 2]],
    ['yi', ['change', 'complement'], [2, 1]],
  ])

  // cal × crypt × heat × kin × signal = 119. Every listed way returns it.
  await named('119', [
    ['cal', ['lunarDrift'], [11]],
    ['crypt', ['curveClassicalBits'], [238]],
    ['crypt', ['symmetricQuantumBits'], [238]],
    ['signal', ['siftedBits'], [238]],
    ['heat', ['signal'], [2]],
    ['heat', ['cooling', 'signal'], [2, 1]],
    ['heat', ['cooling', 'signal'], [3, 2]],
    ['heat', ['signal', 'coherence'], [1, 1]],
    ['kin', ['pillar'], [1, 2]],
    ['kin', ['pillar'], [2, 3]],
    ['kin', ['pillar'], [3, 4]],
    ['kin', ['pillar'], [4, 5]],
  ])

  // heat × kin × tesla × yi = 19. Every listed way returns it.
  await named('19', [
    ['heat', ['signal'], [12]],
    ['heat', ['signal', 'coherence'], [3, 3]],
    ['kin', ['seal'], [59]],
    ['kin', ['seal'], [119]],
    ['kin', ['pillar', 'seal'], [1, 2]],
    ['kin', ['pillar', 'seal'], [2, 3]],
    ['tesla', ['resonance', 'period'], [3, 3]],
    ['yi', ['inverse'], [50]],
    ['yi', ['inverse', 'change'], [2, 3]],
  ])

  // hd × heat × kin × yi = 23. Every listed way returns it.
  await named('23', [
    ['hd', ['gate'], [502]],
    ['heat', ['signal'], [10]],
    ['kin', ['dreamspellDrift'], [93]],
    ['kin', ['pillar', 'pillar'], [3, 2]],
    ['yi', ['withYang', 'change'], [3, 3]],
  ])

  // clay × hd × heat × kin = 26. Every listed way returns it.
  await named('26', [
    ['hd', ['code'], [127]],
    ['clay', ['hodge'], [13]],
    ['heat', ['signal'], [9]],
    ['heat', ['signal', 'coherence'], [3, 2]],
    ['kin', ['bits'], [3]],
    ['kin', ['dreamspellDrift'], [104]],
    ['kin', ['pillar'], [3, 1]],
    ['kin', ['pillar'], [4, 2]],
  ])

  // clay × kin × tesla × yi = 30. Every listed way returns it.
  await named('30', [
    ['clay', ['bsd'], [170]],
    ['clay', ['hodge'], [15]],
    ['kin', ['dreamspellDrift'], [122]],
    ['kin', ['period', 'pillar'], [2, 3]],
    ['tesla', ['field'], [5, 6]],
    ['tesla', ['field'], [6, 5]],
    ['tesla', ['sync'], [1, 4]],
    ['tesla', ['sync'], [2, 8]],
    ['yi', ['nuclear'], [12]],
    ['yi', ['nuclear'], [13]],
  ])

  // clay × heat × kin × yi = 34. Every listed way returns it.
  await named('34', [
    ['clay', ['bsd'], [142]],
    ['heat', ['signal'], [7]],
    ['kin', ['bits'], [4]],
    ['kin', ['digitalRoot', 'bits'], [4]],
    ['kin', ['seal', 'bits'], [4]],
    ['kin', ['tone', 'bits'], [4]],
    ['yi', ['inverse', 'change'], [1, 2]],
  ])

  // heat × kin × signal × yi = 39. Every listed way returns it.
  await named('39', [
    ['signal', ['keyBits'], [104]],
    ['heat', ['signal'], [6]],
    ['heat', ['signal', 'coherence'], [2, 2]],
    ['heat', ['signal', 'coherence'], [3, 1]],
    ['kin', ['dreamspellDrift'], [157]],
    ['kin', ['pillar'], [4, 1]],
    ['kin', ['pillar'], [5, 2]],
    ['kin', ['pillar'], [6, 3]],
    ['yi', ['complement'], [24]],
  ])
  t.diagnostic('13, 17, 25, 40, 52, 56, 60, 119, 19, 23, 26, 30, 34 and 39 recompute; rule.free(6) and rule.free∘free(4) are 7; next is cal × kin × tesla × yi = 50')
})

test('next: the window at 50 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // cal × kin × tesla × yi = 50. Every listed way returns it.
  await named('50', [
    ['cal', ['precession'], [1]],
    ['cal', ['coin', 'precession'], [1]],
    ['cal', ['coin', 'precession'], [2]],
    ['cal', ['coin', 'precession'], [3]],
    ['kin', ['bits', 'pillar'], [2, 3]],
    ['kin', ['combinations', 'pillar'], [2, 2]],
    ['tesla', ['earth', 'period'], [2]],
    ['tesla', ['turns', 'quarter'], [2, 3]],
    ['yi', ['complement'], [13]],
    ['yi', ['inverse', 'change'], [3, 2]],
  ])

  // crypt × kin × signal × yi = 61. Every listed way returns it.
  await named('61', [
    ['crypt', ['curveClassicalBits'], [122]],
    ['crypt', ['symmetricQuantumBits'], [122]],
    ['signal', ['siftedBits'], [122]],
    ['kin', ['bits', 'dootKin'], [1, 1, 1]],
    ['kin', ['bits', 'pillar'], [3, 1]],
    ['kin', ['pillar', 'pillar'], [3, 1]],
    ['yi', ['complement'], [2]],
    ['yi', ['change', 'complement'], [1, 3]],
    ['yi', ['change', 'complement'], [3, 1]],
    ['yi', ['complement', 'change'], [1, 3]],
  ])

  // heat × kin × signal × tesla = 111. Every listed way returns it.
  await named('111', [
    ['signal', ['keyBits'], [296]],
    ['heat', ['temperature', 'cooling'], [1, 3]],
    ['heat', ['temperature', 'ways'], [1, 3]],
    ['kin', ['period', 'pillar'], [1, 1]],
    ['tesla', ['earth'], [362]],
  ])

  // Qpu.Mint × cross × signal × yi = 256. Every listed way returns it.
  await named('256', [
    ['Qpu.Mint', ['mintOf'], [8]],
    ['Qpu.Mint', ['mintOf', 'mintOf'], [3]],
    ['cross', ['medSecureWithQSec'], [1, 8]],
    ['cross', ['medSecureWithQSec'], [2, 7]],
    ['cross', ['medSecureWithQSec'], [4, 6]],
    ['cross', ['medSecureWithQSec'], [8, 5]],
    ['signal', ['keyspace'], [8]],
    ['signal', ['keyspace', 'keyspace'], [3]],
    ['yi', ['figures'], [8]],
    ['yi', ['figures', 'figures'], [3]],
    ['yi', ['inverse', 'figures'], [4]],
  ])

  // Qpu.Mint × cross × signal × yi = 512. Every listed way returns it.
  await named('512', [
    ['Qpu.Mint', ['mintOf'], [9]],
    ['cross', ['medSecureWithQSec'], [2, 8]],
    ['cross', ['medSecureWithQSec'], [4, 7]],
    ['cross', ['medSecureWithQSec'], [8, 6]],
    ['signal', ['keyspace'], [9]],
    ['yi', ['figures'], [9]],
  ])

  // Qpu.Mint × cross × signal × yi = 2048. Every listed way returns it.
  await named('2048', [
    ['Qpu.Mint', ['mintOf'], [11]],
    ['cross', ['medSecureWithQSec'], [8, 8]],
    ['signal', ['keyspace'], [11]],
    ['yi', ['figures'], [11]],
  ])

  // Qpu.Mint × np × signal × yi = 32768. Every listed way returns it.
  await named('32768', [
    ['Qpu.Mint', ['mintOf'], [15]],
    ['signal', ['keyspace'], [15]],
    ['np', ['isTime'], [8]],
    ['yi', ['figures'], [15]],
    ['yi', ['withYang', 'figures'], [2]],
    ['yi', ['withYang', 'figures'], [4]],
  ])

  // Qpu.Mint × kin × signal × yi = 65536. Every listed way returns it.
  await named('65536', [
    ['Qpu.Mint', ['mintOf'], [16]],
    ['Qpu.Mint', ['mintOf', 'mintOf'], [4]],
    ['signal', ['keyspace'], [16]],
    ['signal', ['keyspace', 'keyspace'], [4]],
    ['kin', ['combinations', 'dreamspellDrift'], [3]],
    ['yi', ['figures'], [16]],
    ['yi', ['figures', 'figures'], [4]],
    ['yi', ['inverse', 'figures'], [2]],
  ])

  // heat × kin × yi = 47. Every listed way returns it.
  await named('47', [
    ['heat', ['signal'], [5]],
    ['kin', ['bits', 'pillar'], [3, 3]],
    ['yi', ['complement'], [16]],
    ['yi', ['complement', 'inverse'], [2]],
    ['yi', ['figures', 'complement'], [4]],
    ['yi', ['inverse', 'complement'], [2]],
  ])

  // hd × kin × yi = 51. Every listed way returns it.
  await named('51', [
    ['hd', ['gate'], [157]],
    ['hd', ['gate'], [170]],
    ['hd', ['gate'], [183]],
    ['kin', ['dootKin'], [1, 3, 1]],
    ['kin', ['dootKin'], [2, 4, 1]],
    ['kin', ['dootKin'], [3, 5, 1]],
    ['kin', ['crossed', 'dootKin'], [1, 2, 1]],
    ['yi', ['complement'], [12]],
    ['yi', ['inverse', 'change'], [3, 3]],
  ])

  // clay × kin × yi = 58. Every listed way returns it.
  await named('58', [
    ['clay', ['bsd'], [183]],
    ['kin', ['dootKin'], [4, 1, 3]],
    ['kin', ['dootKin'], [5, 2, 3]],
    ['kin', ['dootKin', 'pillar'], [1, 2, 1]],
    ['yi', ['complement'], [5]],
  ])

  // heat × kin × yi = 59. Every listed way returns it.
  await named('59', [
    ['heat', ['signal'], [4]],
    ['heat', ['signal', 'coherence'], [1, 3]],
    ['heat', ['signal', 'coherence'], [2, 1]],
    ['kin', ['dootKin'], [4, 1, 4]],
    ['kin', ['dootKin'], [5, 2, 4]],
    ['kin', ['dreamspellDrift'], [238]],
    ['yi', ['complement'], [4]],
    ['yi', ['figures', 'complement'], [2]],
    ['yi', ['lower', 'complement'], [4]],
  ])

  // clay × kin × yi = 62. Every listed way returns it.
  await named('62', [
    ['clay', ['bsd'], [127]],
    ['kin', ['bits', 'dootKin'], [1, 1, 2]],
    ['yi', ['complement'], [1]],
    ['yi', ['change', 'complement'], [2, 3]],
    ['yi', ['change', 'complement'], [3, 2]],
    ['yi', ['complement', 'change'], [2, 3]],
  ])

  // crypt × kin × signal = 71. Every listed way returns it.
  await named('71', [
    ['crypt', ['curveClassicalBits'], [142]],
    ['crypt', ['symmetricQuantumBits'], [142]],
    ['signal', ['siftedBits'], [142]],
    ['kin', ['dootKin', 'pillar'], [1, 2, 2]],
  ])
  t.diagnostic('50, 61, 111, 256, 512, 2048, 32768, 65536, 47, 51, 58, 59, 62 and 71 recompute; next is clay × crypt × signal = 72')
})

test('next: the window at 72 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // clay × crypt × signal = 72. Every listed way returns it.
  await named('72', [
    ['clay', ['bsd'], [440]],
    ['crypt', ['curveClassicalBits'], [144]],
    ['crypt', ['symmetricQuantumBits'], [144]],
    ['signal', ['siftedBits'], [144]],
  ])

  // clay × crypt × signal = 73. Every listed way returns it.
  await named('73', [
    ['clay', ['bsd'], [149]],
    ['crypt', ['curveClassicalBits'], [146]],
    ['crypt', ['symmetricQuantumBits'], [146]],
    ['signal', ['siftedBits'], [146]],
  ])

  // crypt × kin × signal = 85. Every listed way returns it.
  await named('85', [
    ['crypt', ['curveClassicalBits'], [170]],
    ['crypt', ['symmetricQuantumBits'], [170]],
    ['signal', ['siftedBits'], [170]],
    ['kin', ['period', 'pillar'], [1, 3]],
  ])

  // kin × signal × tesla = 90. Every listed way returns it.
  await named('90', [
    ['signal', ['keyBits'], [240]],
    ['kin', ['dreamspellDrift'], [362]],
    ['tesla', ['sync'], [3, 4]],
    ['tesla', ['sync'], [6, 8]],
  ])

  // clay × kin × signal = 102. Every listed way returns it.
  await named('102', [
    ['clay', ['bsd'], [265]],
    ['signal', ['keyBits'], [272]],
    ['kin', ['dootKin'], [1, 5, 2]],
    ['kin', ['cycle', 'pillar'], [2, 2]],
    ['kin', ['kin', 'pillar'], [1, 2]],
  ])

  // kin × signal × tesla = 105. Every listed way returns it.
  await named('105', [
    ['signal', ['keyBits'], [280]],
    ['kin', ['dootKin'], [1, 5, 5]],
    ['tesla', ['sync'], [7, 8]],
  ])

  // crypt × kin × signal = 136. Every listed way returns it.
  await named('136', [
    ['crypt', ['curveClassicalBits'], [272]],
    ['crypt', ['symmetricQuantumBits'], [272]],
    ['signal', ['siftedBits'], [272]],
    ['kin', ['period', 'dootKin'], [2, 2, 1]],
  ])

  // crypt × signal × tesla = 140. Every listed way returns it.
  await named('140', [
    ['crypt', ['curveClassicalBits'], [280]],
    ['crypt', ['symmetricQuantumBits'], [280]],
    ['signal', ['siftedBits'], [280]],
    ['tesla', ['sync'], [7, 6]],
  ])

  // cross × kin × tesla = 160. Every listed way returns it.
  await named('160', [
    ['cross', ['medSecureWithQSec'], [5, 5]],
    ['kin', ['dootKin'], [1, 2, 5]],
    ['kin', ['dootKin'], [2, 3, 5]],
    ['kin', ['dootKin'], [3, 4, 5]],
    ['kin', ['dootKin'], [4, 5, 5]],
    ['tesla', ['sync'], [8, 6]],
  ])

  // hd × kin × tesla = 207. Every listed way returns it.
  await named('207', [
    ['hd', ['mean', 'code'], [4]],
    ['kin', ['dootKin'], [1, 4, 2]],
    ['kin', ['dootKin'], [2, 5, 2]],
    ['tesla', ['quarter'], [362]],
  ])

  // clay × kin × rule = 208. clay and kin return 208. rule.formulas(), rule.cap∘formulas(), rule.compositions∘formulas(1) and rule.compositions∘formulas(2) are 9099. They stay at the integer they return. The line is named 208. That part holds false. One next address.
  await named('208', [
    ['clay', ['hodge'], [104]],
    ['kin', ['dootKin'], [1, 4, 3]],
    ['kin', ['dootKin'], [2, 5, 3]],
  ])
  const off208: readonly (readonly [string, string[], number[]])[] = [
    ['rule', ['formulas'], []],
    ['rule', ['cap', 'formulas'], []],
    ['rule', ['compositions', 'formulas'], [1]],
    ['rule', ['compositions', 'formulas'], [2]],
  ]
  const offReturned = []
  for (const [family, program, params] of off208) {
    const uuid = qpuHexUuidOf({ family, program, params })
    offReturned.push({ call: `${family}.${program.join('∘')}(${params.join(', ')})`, value: await at(family, program, params), uuid })
  }
  assert.deepEqual(offReturned.map((row) => [row.call, row.value]), [
    ['rule.formulas()', formulasOf()],
    ['rule.cap∘formulas()', formulasOf()],
    ['rule.compositions∘formulas(1)', formulasOf()],
    ['rule.compositions∘formulas(2)', formulasOf()],
  ])
  const holds208 = offReturned.some((row) => row.value === '208')
  const next208 = offReturned.find((row) => row.value !== '208')!.uuid
  assert.equal(holds208, false)
  assert.equal(next208, 'bfe6be1f-4000-8000-8000-000000000000')
  assert.equal(offReturned.filter((row) => row.uuid === next208).length, 1)
  assert.equal(
    `the line is named 208; ${offReturned.map((row) => `${row.call} is ${row.value}`).join('; ')}`,
    `the line is named 208; rule.formulas() is ${formulasOf()}; rule.cap∘formulas() is ${formulasOf()}; rule.compositions∘formulas(1) is ${formulasOf()}; rule.compositions∘formulas(2) is ${formulasOf()}`,
  )

  // cal × heat × tesla = 250. Every listed way returns it.
  await named('250', [
    ['cal', ['metonicDrift'], [2]],
    ['cal', ['coin', 'metonicDrift'], [4]],
    ['heat', ['temperature'], [1, 4]],
    ['heat', ['temperature'], [2, 8]],
    ['heat', ['temperature', 'coherence'], [3, 3]],
    ['heat', ['temperature', 'cooling'], [1, 2]],
    ['tesla', ['slip'], [4, 3]],
    ['tesla', ['slip'], [8, 6]],
    ['tesla', ['turns'], [4, 1]],
    ['tesla', ['turns'], [8, 2]],
  ])

  // cal × crypt × signal = 251. Every listed way returns it.
  await named('251', [
    ['cal', ['precession'], [5]],
    ['crypt', ['curveClassicalBits'], [502]],
    ['crypt', ['symmetricQuantumBits'], [502]],
    ['signal', ['siftedBits'], [502]],
  ])

  // hd × kin × tesla = 721. Every listed way returns it.
  await named('721', [
    ['hd', ['mean'], [2]],
    ['hd', ['mean'], [3]],
    ['hd', ['center', 'mean'], [4]],
    ['hd', ['definition', 'mean'], [2]],
    ['kin', ['bits'], [84]],
    ['tesla', ['quarter'], [104]],
  ])
  t.diagnostic('72, 73, 85, 90, 102, 105, 136, 140, 160, 207, 208, 250, 251 and 721 recompute; rule.formulas(), rule.cap∘formulas(), rule.compositions∘formulas(1) and rule.compositions∘formulas(2) are 9099; next is cal × heat × tesla = 750')
})

test('next: the window at 750 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // cal × heat × tesla = 750. Every listed way returns it.
  await named('750', [
    ['cal', ['metonicDrift'], [6]],
    ['heat', ['temperature'], [3, 4]],
    ['heat', ['temperature'], [6, 8]],
    ['heat', ['temperature', 'cooling'], [3, 2]],
    ['heat', ['temperature', 'ways'], [3, 2]],
    ['tesla', ['slip'], [4, 1]],
    ['tesla', ['slip'], [8, 2]],
    ['tesla', ['turns'], [4, 3]],
    ['tesla', ['turns'], [8, 6]],
  ])

  // cal × clay × hd = 880. Every listed way returns it.
  await named('880', [
    ['hd', ['mean'], [401]],
    ['cal', ['gregorianDrift', 'lunarDrift'], [3]],
    ['clay', ['hodge'], [440]],
  ])

  // cal × heat × tesla = 1500. Every listed way returns it.
  await named('1500', [
    ['cal', ['metonicDrift'], [12]],
    ['heat', ['temperature'], [3, 2]],
    ['heat', ['temperature'], [6, 4]],
    ['heat', ['temperature', 'coherence'], [3, 1]],
    ['tesla', ['turns'], [2, 3]],
    ['tesla', ['turns'], [4, 6]],
  ])

  // cal × heat × tesla = 3000. Every listed way returns it.
  await named('3000', [
    ['cal', ['metonicDrift'], [24]],
    ['heat', ['temperature'], [3, 1]],
    ['heat', ['temperature'], [6, 2]],
    ['heat', ['cooling', 'temperature'], [3, 1]],
    ['heat', ['temperature', 'cooling'], [3, 1]],
    ['tesla', ['turns'], [1, 3]],
    ['tesla', ['turns'], [2, 6]],
    ['tesla', ['turns', 'field'], [3, 3]],
    ['tesla', ['turns', 'windings'], [3, 3]],
  ])

  // Qpu.Mint × signal × yi = 16384. Every listed way returns it.
  await named('16384', [
    ['Qpu.Mint', ['mintOf'], [14]],
    ['signal', ['keyspace'], [14]],
    ['yi', ['figures'], [14]],
  ])

  // kin × signal × yi = 16777216. Every listed way returns it.
  await named('16777216', [
    ['signal', ['keyspace'], [24]],
    ['kin', ['combinations'], [4]],
    ['kin', ['digitalRoot', 'combinations'], [4]],
    ['kin', ['seal', 'combinations'], [4]],
    ['kin', ['tone', 'combinations'], [4]],
    ['yi', ['figures'], [24]],
  ])

  // clay × yi = 22. Every listed way returns it.
  await named('22', [
    ['clay', ['hodge'], [11]],
    ['yi', ['withYang', 'change'], [3, 2]],
  ])

  // tesla × yi = 33. Every listed way returns it.
  await named('33', [
    ['tesla', ['sync', 'turns'], [1, 2]],
    ['yi', ['nuclear'], [50]],
    ['yi', ['inverse', 'change'], [1, 1]],
  ])

  // clay × yi = 44. Every listed way returns it.
  await named('44', [
    ['clay', ['bsd'], [141]],
    ['clay', ['bsd'], [224]],
    ['yi', ['inverse'], [13]],
  ])

  // tesla × yi = 49. Every listed way returns it.
  await named('49', [
    ['tesla', ['field'], [7, 7]],
    ['tesla', ['windings'], [7, 7]],
    ['yi', ['complement'], [14]],
    ['yi', ['inverse', 'change'], [3, 1]],
  ])

  // kin × yi = 63. Every listed way returns it.
  await named('63', [
    ['kin', ['dreamspellDrift'], [252]],
    ['kin', ['dreamspellDrift'], [255]],
    ['kin', ['bits', 'pillar'], [2, 2]],
    ['kin', ['combinations', 'pillar'], [2, 1]],
    ['yi', ['change', 'complement'], [1, 1]],
    ['yi', ['change', 'complement'], [2, 2]],
    ['yi', ['change', 'complement'], [3, 3]],
    ['yi', ['complement', 'change'], [1, 1]],
  ])

  // clay × kin = 68. Every listed way returns it.
  await named('68', [
    ['clay', ['bsd'], [296]],
    ['kin', ['dreamspellDrift'], [272]],
  ])

  // Qpu.Mint × kin = 70. Every listed way returns it.
  await named('70', [
    ['Qpu.Mint', ['chooseOf'], [8, 4]],
    ['kin', ['dreamspellDrift'], [280]],
  ])

  // clay × kin = 77. Every listed way returns it.
  await named('77', [
    ['clay', ['bsd'], [157]],
    ['kin', ['bits'], [9]],
    ['kin', ['bits', 'bits'], [1]],
    ['kin', ['period', 'dootKin'], [1, 1, 2]],
  ])
  t.diagnostic('750, 880, 1500, 3000, 16384, 16777216, 22, 33, 44, 49, 63, 68, 70 and 77 recompute; next is cal × rule = 81')
})

test('next: the window at 81 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // cal × rule = 81. Every listed way returns it.
  await named('81', [
    ['cal', ['gregorianDrift'], [3]],
    ['rule', ['compositions'], [ix('Qpu.Physics')]],
  ])
  assert.equal(await at('rule', ['nibbles', 'compositions'], [ix('merkaba')]), chainedOf('nibbles', 'compositions', ix('merkaba')))

  // clay × kin = 82. Every listed way returns it.
  await named('82', [
    ['clay', ['bsd'], [261]],
    ['kin', ['dootKin', 'pillar'], [2, 1, 2]],
  ])

  // clay × kin = 89. Every listed way returns it.
  await named('89', [
    ['clay', ['bsd'], [362]],
    ['kin', ['cycle', 'pillar'], [2, 3]],
    ['kin', ['kin', 'pillar'], [1, 3]],
    ['kin', ['kin', 'pillar'], [2, 3]],
  ])

  // cross × hd = 96. Every listed way returns it.
  await named('96', [
    ['cross', ['medSecureWithQSec'], [3, 5]],
    ['cross', ['medSecureWithQSec'], [6, 4]],
    ['hd', ['code'], [404]],
  ])

  // clay × kin = 98. Every listed way returns it.
  await named('98', [
    ['clay', ['bsd'], [404]],
    ['kin', ['period', 'pillar'], [1, 2]],
  ])

  // clay × kin = 116. Every listed way returns it.
  await named('116', [
    ['clay', ['bsd'], [429]],
    ['kin', ['combinations', 'dootKin'], [1, 1, 1]],
    ['kin', ['enneagram', 'dootKin'], [1, 2, 1]],
    ['kin', ['enneagram', 'dootKin'], [2, 2, 1]],
  ])

  // crypt × signal = 126. Every listed way returns it.
  await named('126', [
    ['crypt', ['curveClassicalBits'], [252]],
    ['crypt', ['symmetricQuantumBits'], [252]],
    ['signal', ['siftedBits'], [252]],
  ])

  // crypt × signal = 134. Every listed way returns it.
  await named('134', [
    ['crypt', ['curveClassicalBits'], [268]],
    ['crypt', ['symmetricQuantumBits'], [268]],
    ['signal', ['siftedBits'], [268]],
  ])

  // hd × tesla = 143. Every listed way returns it.
  await named('143', [
    ['hd', ['ut', 'mean'], [1, 3]],
    ['tesla', ['earth'], [280]],
    ['tesla', ['slip'], [7, 6]],
    ['tesla', ['turns'], [7, 1]],
  ])

  // crypt × signal = 148. Every listed way returns it.
  await named('148', [
    ['crypt', ['curveClassicalBits'], [296]],
    ['crypt', ['symmetricQuantumBits'], [296]],
    ['signal', ['siftedBits'], [296]],
  ])

  // kin × signal = 165. Every listed way returns it.
  await named('165', [
    ['signal', ['keyBits'], [440]],
    ['kin', ['dootKin'], [5, 1, 5]],
  ])

  // clay × tesla = 168. Every listed way returns it.
  await named('168', [
    ['clay', ['hodge'], [84]],
    ['tesla', ['earth'], [238]],
  ])

  // crypt × signal = 181. Every listed way returns it.
  await named('181', [
    ['crypt', ['curveClassicalBits'], [362]],
    ['crypt', ['symmetricQuantumBits'], [362]],
    ['signal', ['siftedBits'], [362]],
  ])

  // clay × tesla = 186. Every listed way returns it.
  await named('186', [
    ['clay', ['hodge'], [93]],
    ['tesla', ['quarter'], [404]],
  ])
  t.diagnostic('81, 82, 89, 96, 98, 116, 126, 134, 143, 148, 165, 168, 181 and 186 recompute; next is clay × merkaba = 199')
})

test('next: the window at 199 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // clay × merkaba = 199. clay.bsd(401) returns 199. merkaba.flows(7) is 54. It stays at the integer it returns. The line is named 199. That part holds false. One next address.
  await named('199', [
    ['clay', ['bsd'], [401]],
  ])
  const off199: readonly (readonly [string, string[], number[]])[] = [
    ['merkaba', ['flows'], [7]],
  ]
  const offReturned = []
  for (const [family, program, params] of off199) {
    const uuid = qpuHexUuidOf({ family, program, params })
    offReturned.push({ call: `${family}.${program.join('∘')}(${params.join(', ')})`, value: await at(family, program, params), uuid })
  }
  assert.deepEqual(offReturned.map((row) => [row.call, row.value]), [
    ['merkaba.flows(7)', flowsOf(7)],
  ])
  const holds199 = offReturned.some((row) => row.value === '199')
  const next199 = offReturned.find((row) => row.value !== '199')!.uuid
  assert.equal(holds199, false)
  assert.equal(next199, '89c984c4-3000-3000-9000-000000000007')
  assert.equal(offReturned.filter((row) => row.uuid === next199).length, 1)
  assert.equal(
    `the line is named 199; ${offReturned.map((row) => `${row.call} is ${row.value}`).join('; ')}`,
    `the line is named 199; merkaba.flows(7) is ${flowsOf(7)}`,
  )

  // crypt × signal = 202. Every listed way returns it.
  await named('202', [
    ['crypt', ['curveClassicalBits'], [404]],
    ['crypt', ['symmetricQuantumBits'], [404]],
    ['signal', ['siftedBits'], [404]],
  ])

  // hd × kin = 206. Every listed way returns it.
  await named('206', [
    ['hd', ['mean', 'code'], [2]],
    ['hd', ['mean', 'code'], [3]],
    ['kin', ['bits'], [24]],
    ['kin', ['dootKin'], [1, 4, 1]],
    ['kin', ['dootKin'], [2, 5, 1]],
  ])

  // crypt × signal = 220. Every listed way returns it.
  await named('220', [
    ['crypt', ['curveClassicalBits'], [440]],
    ['crypt', ['symmetricQuantumBits'], [440]],
    ['signal', ['siftedBits'], [440]],
  ])

  // heat × kin = 222. Every listed way returns it.
  await named('222', [
    ['heat', ['temperature', 'cooling'], [2, 3]],
    ['heat', ['temperature', 'ways'], [2, 3]],
    ['kin', ['enneagram', 'dootKin'], [1, 1, 2]],
    ['kin', ['enneagram', 'dootKin'], [2, 1, 2]],
    ['kin', ['pillar', 'dootKin'], [2, 1, 2]],
  ])

  // cal × np = 243. Every listed way returns it.
  await named('243', [
    ['cal', ['gregorianDrift'], [9]],
    ['np', ['isTime'], [3]],
    ['np', ['isSpace', 'isTime'], [4]],
    ['np', ['subsetSum', 'isTime'], [3, 1]],
    ['np', ['subsetSum', 'isTime'], [3, 3]],
  ])

  // clay × tesla = 282. Every listed way returns it.
  await named('282', [
    ['clay', ['hodge'], [141]],
    ['tesla', ['earth'], [142]],
  ])

  // clay × tesla = 284. Every listed way returns it.
  await named('284', [
    ['clay', ['hodge'], [142]],
    ['tesla', ['earth'], [141]],
  ])

  // clay × kin = 292. Every listed way returns it.
  await named('292', [
    ['clay', ['hodge'], [146]],
    ['kin', ['bits', 'bits'], [4]],
  ])

  // crypt × signal = 305. Every listed way returns it.
  await named('305', [
    ['crypt', ['curveClassicalBits'], [610]],
    ['crypt', ['symmetricQuantumBits'], [610]],
    ['signal', ['siftedBits'], [610]],
  ])

  // heat × tesla = 333. Every listed way returns it.
  await named('333', [
    ['heat', ['temperature'], [1, 3]],
    ['heat', ['temperature'], [2, 6]],
    ['heat', ['cooling', 'temperature'], [1, 3]],
    ['heat', ['cooling', 'temperature'], [2, 3]],
    ['tesla', ['slip'], [3, 2]],
    ['tesla', ['slip'], [6, 4]],
    ['tesla', ['turns'], [3, 1]],
    ['tesla', ['turns'], [6, 2]],
  ])

  // heat × tesla = 334. Every listed way returns it.
  await named('334', [
    ['heat', ['temperature', 'cooling'], [3, 3]],
    ['heat', ['temperature', 'ways'], [3, 3]],
    ['tesla', ['sync', 'earth'], [2, 2]],
  ])

  // clay × cross = 448. Every listed way returns it.
  await named('448', [
    ['cross', ['medSecureWithQSec'], [7, 6]],
    ['clay', ['hodge'], [224]],
  ])

  // clay × tesla = 480. Every listed way returns it.
  await named('480', [
    ['clay', ['hodge'], [240]],
    ['tesla', ['sync'], [8, 2]],
  ])
  t.diagnostic('199, 202, 206, 220, 222, 243, 282, 284, 292, 305, 333, 334, 448 and 480 recompute; merkaba.flows(7) is 54; next is Qpu.Physics × tesla = 679')
})

test('next: the window at 679 recomputes the integer its families return', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const named = async (integer: string, ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    assert.equal(values[0], integer)
    return values[0]!
  }
  // Qpu.Physics × tesla = 679. Every listed way returns it.
  await named('679', [
    ['Qpu.Physics', ['niobium', 'gap'], [1]],
    ['Qpu.Physics', ['niobium', 'gap'], [2]],
    ['Qpu.Physics', ['niobium', 'gap'], [3]],
    ['Qpu.Physics', ['niobium', 'gap'], [4]],
    ['tesla', ['earth'], [59]],
  ])

  // clay × hd = 724. Every listed way returns it.
  await named('724', [
    ['hd', ['mean'], [9]],
    ['hd', ['mean'], [10]],
    ['hd', ['mean'], [11]],
    ['clay', ['hodge'], [362]],
  ])

  // cal × hd = 754. Every listed way returns it.
  await named('754', [
    ['hd', ['mean'], [84]],
    ['cal', ['precession'], [15]],
  ])

  // cross × hd = 768. Every listed way returns it.
  await named('768', [
    ['cross', ['medSecureWithQSec'], [3, 8]],
    ['cross', ['medSecureWithQSec'], [6, 7]],
    ['hd', ['cells'], []],
    ['hd', ['mean'], [119]],
    ['hd', ['cells', 'cells'], []],
    ['hd', ['center', 'cells'], [1]],
  ])

  // clay × tesla = 802. Every listed way returns it.
  await named('802', [
    ['clay', ['hodge'], [401]],
    ['tesla', ['earth'], [50]],
  ])

  // hd × tesla = 822. Every listed way returns it.
  await named('822', [
    ['hd', ['mean'], [255]],
    ['tesla', ['quarter', 'resonance'], [2, 1]],
  ])

  // hd × tesla = 892. Every listed way returns it.
  await named('892', [
    ['hd', ['mean'], [429]],
    ['tesla', ['quarter'], [84]],
  ])

  // cross × hd = 896. Every listed way returns it.
  await named('896', [
    ['cross', ['medSecureWithQSec'], [7, 7]],
    ['hd', ['mean'], [440]],
  ])

  // cal × hd = 2162. Every listed way returns it.
  await named('2162', [
    ['hd', ['ut'], [3, 1]],
    ['hd', ['ut'], [4, 2]],
    ['hd', ['ut'], [5, 3]],
    ['hd', ['ut'], [6, 4]],
    ['cal', ['lunarDrift', 'precession'], [4]],
  ])

  // hd × kin = 2163. Every listed way returns it.
  await named('2163', [
    ['hd', ['ut'], [4, 1]],
    ['hd', ['ut'], [5, 2]],
    ['hd', ['ut'], [6, 3]],
    ['hd', ['ut'], [7, 4]],
    ['kin', ['bits'], [252]],
  ])

  // np × tesla = 100000. Every listed way returns it.
  await named('100000', [
    ['np', ['isTime'], [10]],
    ['tesla', ['period'], [10]],
  ])

  // np × yi = 1048576. Every listed way returns it.
  await named('1048576', [
    ['np', ['isTime'], [16]],
    ['yi', ['withYang', 'figures'], [3]],
  ])

  // Qpu.Physics × merkaba = 662607015. The physics ways and merkaba.mirror(4, 1, 2), merkaba.mirror(4, 1, 3) and merkaba.mirror(4, 2, 1) return 662607015. merkaba.mirror(4, 1, 5) is 0. Its run does not hold. The line is named 662607015. That part holds false. One next address.
  await named('662607015', [
    ['Qpu.Physics', ['planck'], []],
    ['Qpu.Physics', ['planck', 'planck'], []],
    ['Qpu.Physics', ['boltzmann', 'planck'], []],
    ['Qpu.Physics', ['transmon', 'planck'], []],
    ['merkaba', ['mirror'], [fx('Qpu.Physics'), fx('Qpu.Hybrid'), fx('Qpu.Lattice')]],
    ['merkaba', ['mirror'], [fx('Qpu.Physics'), fx('Qpu.Hybrid'), fx('Qpu.Mint')]],
    ['merkaba', ['mirror'], [fx('Qpu.Physics'), fx('Qpu.Lattice'), fx('Qpu.Hybrid')]],
  ])
  const flow662 = [fx('Qpu.Physics'), fx('Qpu.Hybrid'), fx('Qpu.Shor')]
  const off662: readonly (readonly [string, string[], number[]])[] = [
    ['merkaba', ['mirror'], flow662],
  ]
  const offReturned = []
  for (const [family, program, params] of off662) {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, false, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    offReturned.push({ call: `${family}.${program.join('∘')}(${params.join(', ')})`, value: String(run.value), uuid })
  }
  assert.deepEqual(offReturned.map((row) => [row.call, row.value]), [
    [`merkaba.mirror(${flow662.join(', ')})`, '0'],
  ])
  const holds662 = offReturned.some((row) => row.value === '662607015')
  const next662 = offReturned.find((row) => row.value !== '662607015')!.uuid
  assert.equal(holds662, false)
  assert.match(next662, new RegExp(`^89c984c4-5000-[1-8]000-b000-${flow662.map((x) => x.toString(16).padStart(4, '0')).join('')}$`))
  assert.equal(offReturned.filter((row) => row.uuid === next662).length, 1)
  assert.equal(
    `the line is named 662607015; ${offReturned.map((row) => `${row.call} is ${row.value}`).join('; ')}`,
    `the line is named 662607015; merkaba.mirror(${flow662.join(', ')}) is 0`,
  )

  // np × signal = 1125899906842624. Every listed way returns it.
  await named('1125899906842624', [
    ['signal', ['keyspace'], [50]],
    ['np', ['isTime', 'isTime'], [4]],
  ])
  t.diagnostic('679, 724, 754, 768, 802, 822, 892, 896, 2162, 2163, 100000, 1048576, 662607015 and 1125899906842624 recompute; merkaba.mirror(4, 1, 5) is 0')
})

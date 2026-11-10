import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import '../../mcp/families.js'
import { RuleFormulas, ruleIndexOf as ix } from './index.js'
import { flowIndexOf as fx } from '../merkaba/index.js'

/** THE RULES, RUN. Each rule is a formula; the ones that count what breaks a rule must be zero. */
test('rule: no family is past its nibble, none is truncated, and every rule runs as a hex program', async (t) => {
  assert.equal(RuleFormulas.cap().value, 15)
  assert.equal(RuleFormulas.slice().value, 14)
  const n = Number(RuleFormulas.families().value)
  assert.ok(n >= 20, `${n} families`)
  const over = RuleFormulas.over()
  assert.equal(over.value, 0, `families past the cap: ${JSON.stringify((over as unknown as { over: string[] }).over)}`)
  assert.equal(over.holds, true)
  for (let i = 0; i < n; i++) {
    const tr = RuleFormulas.truncated(i)
    assert.equal(tr.value, 0, `family ${i} (${(tr as unknown as { family: string }).family}) is served whole`)
    assert.ok(Number(RuleFormulas.nibbles(i).value) + Number(RuleFormulas.free(i).value) === 15)
  }
  const total = Number(RuleFormulas.formulas().value)
  assert.equal(total, [...hexFamiliesOf().values()].reduce((s, fs) => s + fs.length, 0))
  // the rules at their addresses
  for (const [name, params] of [['over', []], ['cap', []], ['truncated', [0]]] as [string, number[]][]) {
    const uuid = qpuHexUuidOf({ family: 'rule', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `rule.${name} holds at ${uuid}`)
    uuidReceiptOf(`rule ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`${n} families, ${total} formulas, none truncated`)
})

/** A superposition the discovery named, recomputed at each way's address. The shared integer is whatever the unit
 *  returns; the ways agree with each other. compositions(i) is called so the missing formula is driven. */
test('rule: compositions agrees with the superpositions that still meet', async (t) => {
  const at = async (family: string, program: string[], params: number[]) => {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown; holds?: boolean }
    assert.equal(run.holds, true, `${family}.${program.join('∘')}(${params.join(', ')}) at ${uuid}`)
    return String(run.value)
  }
  const agree = async (ways: readonly (readonly [string, string[], number[]])[]) => {
    const values = []
    for (const [family, program, params] of ways) values.push(await at(family, program, params))
    assert.equal(new Set(values).size, 1, values.join(' ≠ '))
    return values[0]!
  }
  const sixtyFour = await agree([
    ['Qpu.Mint', ['mintOf'], [6]],
    ['cross', ['medSecureWithQSec'], [1, 6]],
    ['cross', ['medSecureWithQSec'], [2, 5]],
    ['cross', ['medSecureWithQSec'], [4, 4]],
    ['cross', ['medSecureWithQSec'], [8, 3]],
    ['clay', ['bsd'], [268]],
    ['signal', ['keyspace'], [6]],
    ['rule', ['compositions'], [ix('acquisition')]],
    ['kin', ['combinations'], [1]],
    ['kin', ['crossed', 'combinations'], [1, 1]],
    ['kin', ['crossed', 'combinations'], [2, 2]],
    ['kin', ['crossed', 'combinations'], [3, 3]],
    ['tesla', ['field'], [8, 8]],
    ['tesla', ['windings'], [8, 8]],
    ['yi', ['figures'], [6]],
    ['yi', ['withYang', 'figures'], [1]],
  ])
  assert.equal(String(RuleFormulas.compositions(ix('acquisition')).value), sixtyFour)
  const fifteen = await agree([
    ['Qpu.Mint', ['chooseOf'], [6, 2]],
    ['Qpu.Mint', ['chooseOf'], [6, 4]],
    ['np', ['isTime', 'subsetSum'], [3, 2]],
    ['rule', ['cap'], []],
    ['rule', ['cap', 'cap'], []],
    ['rule', ['compositions', 'cap'], [1]],
    ['rule', ['compositions', 'cap'], [2]],
    ['kin', ['seal'], [255]],
    ['kin', ['period', 'dreamspellDrift'], [3]],
    ['tesla', ['field'], [3, 5]],
    ['tesla', ['field'], [5, 3]],
    ['tesla', ['sync'], [1, 8]],
    ['tesla', ['windings'], [3, 5]],
    ['yi', ['change'], [7, 8]],
    ['yi', ['change'], [8, 7]],
    ['yi', ['withYang'], [2]],
    ['yi', ['withYang'], [4]],
  ])
  const eightyOne = await agree([
    ['cal', ['gregorianDrift'], [3]],
    ['rule', ['compositions'], [ix('Qpu.Physics')]],
  ])
  assert.equal(String(RuleFormulas.compositions(ix('Qpu.Physics')).value), eightyOne)
  // nibbles∘compositions reads the formulas one family serves as the index of the next: the family it lands on is the
  // registry's, so the chain is held to the two rules called one after the other, not to an integer written down
  const fed = ix('merkaba')
  assert.equal(await at('rule', ['nibbles', 'compositions'], [fed]), String(RuleFormulas.compositions(Number(RuleFormulas.nibbles(fed).value)).value))
  t.diagnostic(`compositions meets ${sixtyFour}, ${fifteen}, ${eightyOne}`)
})

/** Eight README lines still meet the integer they name, called through every family that returns it.
 *  kin × rule = 196 holds false. kin.combinations∘dootKin(2, 1, 1) is 196 (kin). rule.compositions(8) is 100
 *  (compositions). The lead carries one next address. */
test('rule: eight README integers still meet, and kin × rule = 196 holds false', async (t) => {
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
  }
  // Qpu.Mint × Qpu.Shor × Qpu.Lattice × cross × audit × hd × clay × crypt × signal × merkaba × holo × np × rule × heat × kin × tesla × yi = 4. merkaba.mirror(3, 1, 5) and merkaba.torus(5, 1, 3) hold false at 0. rule.compositions(6) is 64 and rule.nibbles(7) is 8. They stay at the integer they return.
  await named('4', [
    ['Qpu.Mint', ['mintOf'], [2]],
    ['Qpu.Mint', ['mintOf', 'mintOf'], [1]],
    ['Qpu.Mint', ['mintOf', 'chooseOf'], [2, 1]],
    ['Qpu.Mint', ['mintOf', 'chooseOf'], [2, 3]],
    ['Qpu.Shor', ['powMod'], [2, 2, 5]],
    ['Qpu.Shor', ['powMod'], [3, 2, 5]],
    ['Qpu.Shor', ['periodOf'], [2, 5]],
    ['Qpu.Shor', ['periodOf'], [3, 5]],
    ['Qpu.Lattice', ['hexbit'], []],
    ['Qpu.Lattice', ['n', 'hexbit'], []],
    ['Qpu.Lattice', ['seed', 'hexbit'], []],
    ['Qpu.Lattice', ['coins', 'hexbit'], []],
    ['cross', ['compressQSecSignals'], [6, 3]],
    ['cross', ['compressQSecSignals'], [8, 8]],
    ['cross', ['medSecureWithQSec'], [1, 2]],
    ['cross', ['medSecureWithQSec'], [2, 1]],
    ['audit', ['gdprIsoNistFusion'], [2, 5, 5]],
    ['audit', ['gdprIsoNistFusion'], [5, 2, 5]],
    ['audit', ['gdprIsoNistFusion'], [5, 5, 2]],
    ['audit', ['healthcareComplianceFusion'], [5, 5, 1]],
    ['hd', ['center'], [1]],
    ['hd', ['center'], [2]],
    ['hd', ['center'], [7]],
    ['hd', ['center'], [10]],
    ['clay', ['bsd'], [11]],
    ['clay', ['hodge'], [2]],
    ['clay', ['hodge', 'hodge'], [1]],
    ['clay', ['yangMills', 'hodge'], [1]],
    ['crypt', ['curveClassicalBits'], [8]],
    ['crypt', ['symmetricQuantumBits'], [8]],
    ['signal', ['keyspace'], [2]],
    ['signal', ['siftedBits'], [8]],
    ['signal', ['hops', 'keyspace'], [2, 1, 2]],
    ['signal', ['hops', 'keyspace'], [2, 2, 1]],
    ['merkaba', ['mirror'], [fx('Qpu.Mint'), fx('Qpu.Hybrid'), fx('Qpu.Lattice')]],
    ['merkaba', ['torus'], [fx('Qpu.Lattice'), fx('Qpu.Hybrid'), fx('Qpu.Mint')]],
    ['holo', ['proofDepth'], [9]],
    ['holo', ['proofDepth'], [10]],
    ['holo', ['proofDepth'], [11]],
    ['holo', ['proofDepth'], [12]],
    ['np', ['isSpace'], [8]],
    ['np', ['isSpace'], [9]],
    ['np', ['isSpace'], [10]],
    ['np', ['isSpace'], [11]],
    ['rule', ['compositions'], [ix('Qpu.Mint')]],
    ['heat', ['coherence'], [8, 1]],
    ['heat', ['cooling'], [7, 2]],
    ['heat', ['cooling'], [8, 2]],
    ['heat', ['signal'], [50]],
    ['kin', ['digitalRoot'], [13]],
    ['kin', ['digitalRoot'], [157]],
    ['kin', ['digitalRoot'], [238]],
    ['kin', ['digitalRoot'], [265]],
    ['tesla', ['field'], [2, 2]],
    ['tesla', ['windings'], [2, 2]],
    ['tesla', ['earth', 'quarter'], [2]],
    ['tesla', ['schumann', 'quarter'], [3]],
    ['yi', ['change'], [1, 5]],
    ['yi', ['change'], [2, 6]],
    ['yi', ['change'], [3, 7]],
    ['yi', ['change'], [5, 1]],
  ])
  // Qpu.Physics × hd × cal × clay × crypt × signal × holo × np × kin × tesla × yi = 5. rule.free(10), rule.free(13), rule.free∘free(3) and rule.nibbles∘free(2) are 7. They stay at the integer they return.
  await named('5', [
    ['Qpu.Physics', ['transmon'], []],
    ['Qpu.Physics', ['planck', 'transmon'], []],
    ['Qpu.Physics', ['boltzmann', 'transmon'], []],
    ['Qpu.Physics', ['transmon', 'transmon'], []],
    ['hd', ['line'], [24]],
    ['hd', ['line'], [84]],
    ['hd', ['line'], [141]],
    ['hd', ['line'], [252]],
    ['cal', ['julianDrift', 'gatesPrecessed'], [3]],
    ['clay', ['bsd'], [13]],
    ['crypt', ['curveClassicalBits'], [10]],
    ['crypt', ['symmetricQuantumBits'], [10]],
    ['signal', ['siftedBits'], [10]],
    ['holo', ['proofDepth'], [24]],
    ['np', ['isSpace'], [16]],
    ['np', ['isSpace'], [24]],
    ['np', ['sparseWidth'], [4]],
    ['np', ['sparseWidth'], [6]],
    ['kin', ['digitalRoot'], [14]],
    ['kin', ['digitalRoot'], [50]],
    ['kin', ['digitalRoot'], [59]],
    ['kin', ['digitalRoot'], [104]],
    ['tesla', ['period', 'energy'], [1, 3]],
    ['tesla', ['schumann', 'earth'], [1]],
    ['yi', ['change'], [1, 4]],
    ['yi', ['change'], [2, 7]],
    ['yi', ['change'], [3, 6]],
    ['yi', ['change'], [4, 1]],
  ])
  // Qpu.Mint × cross × hd × cal × clay × holo × np × kin × tesla × yi = 10. rule.nibbles(13), rule.free∘nibbles(3) and rule.nibbles∘nibbles(2) are 8. They stay at the integer they return.
  await named('10', [
    ['Qpu.Mint', ['chooseOf'], [5, 2]],
    ['Qpu.Mint', ['chooseOf'], [5, 3]],
    ['cross', ['medSecureWithQSec'], [5, 1]],
    ['hd', ['sun', 'gate'], [1]],
    ['hd', ['sun', 'gate'], [2]],
    ['hd', ['sun', 'gate'], [3]],
    ['hd', ['sun', 'gate'], [4]],
    ['cal', ['lunarDrift'], [1]],
    ['cal', ['coin', 'lunarDrift'], [1]],
    ['cal', ['coin', 'lunarDrift'], [2]],
    ['cal', ['coin', 'lunarDrift'], [3]],
    ['clay', ['hodge'], [5]],
    ['holo', ['proofDepth'], [610]],
    ['np', ['isSpace'], [610]],
    ['np', ['sparseWidth'], [141]],
    ['np', ['sparseWidth'], [142]],
    ['np', ['sparseWidth'], [144]],
    ['kin', ['seal'], [50]],
    ['kin', ['seal'], [170]],
    ['kin', ['tone'], [127]],
    ['tesla', ['field'], [2, 5]],
    ['tesla', ['field'], [5, 2]],
    ['tesla', ['windings'], [2, 5]],
    ['tesla', ['windings'], [5, 2]],
    ['yi', ['change'], [2, 8]],
    ['yi', ['change'], [8, 2]],
    ['yi', ['nuclear'], [4]],
    ['yi', ['nuclear'], [5]],
  ])
  // Qpu.Mint × cross × clay × signal × rule × kin × tesla × yi = 16. rule.compositions(7) is 64. They stay at the integer they return.
  await named('16', [
    ['Qpu.Mint', ['mintOf'], [4]],
    ['Qpu.Mint', ['mintOf', 'mintOf'], [2]],
    ['cross', ['medSecureWithQSec'], [1, 4]],
    ['cross', ['medSecureWithQSec'], [2, 3]],
    ['cross', ['medSecureWithQSec'], [4, 2]],
    ['cross', ['medSecureWithQSec'], [8, 1]],
    ['clay', ['hodge'], [8]],
    ['clay', ['hodge', 'hodge'], [4]],
    ['signal', ['keyspace'], [4]],
    ['signal', ['keyspace', 'keyspace'], [2]],
    ['kin', ['seal'], [56]],
    ['kin', ['bits', 'dootKin'], [2, 2, 1]],
    ['kin', ['combinations', 'dreamspellDrift'], [1]],
    ['kin', ['dootKin', 'seal'], [1, 2, 1]],
    ['tesla', ['field'], [2, 8]],
    ['tesla', ['field'], [4, 4]],
    ['tesla', ['field'], [8, 2]],
    ['tesla', ['windings'], [2, 8]],
    ['yi', ['figures'], [4]],
    ['yi', ['inverse'], [2]],
    ['yi', ['change', 'inverse'], [1, 3]],
    ['yi', ['change', 'inverse'], [3, 1]],
  ])
  // hd × cal × heat × tesla = 27. rule.families(), rule.cap∘families(), rule.compositions∘families(1) and rule.compositions∘families(2) are 1134. They stay at the integer they return.
  await named('27', [
    ['hd', ['gate'], [362]],
    ['cal', ['gregorianDrift'], [1]],
    ['cal', ['coin', 'gregorianDrift'], [1]],
    ['cal', ['coin', 'gregorianDrift'], [2]],
    ['cal', ['coin', 'gregorianDrift'], [3]],
    ['heat', ['signal', 'cooling'], [3, 3]],
    ['heat', ['signal', 'ways'], [3, 3]],
    ['tesla', ['field', 'field'], [3, 3]],
    ['tesla', ['field', 'windings'], [3, 3]],
    ['tesla', ['quarter', 'period'], [2]],
    ['tesla', ['turns', 'earth'], [2, 3]],
  ])
  // rule × kin × tesla × yi = 36. rule.compositions(9), rule.compositions(11) and rule.compositions(14) are 64. rule.compositions(1) is 36. They stay at the integer they return.
  await named('36', [
    ['rule', ['compositions'], [ix('Qpu.Hybrid')]],
    ['kin', ['dreamspellDrift'], [144]],
    ['kin', ['dreamspellDrift'], [146]],
    ['tesla', ['field'], [6, 6]],
    ['tesla', ['windings'], [6, 6]],
    ['yi', ['inverse'], [9]],
  ])
  // clay × kin × tesla = 100. rule.compositions(10), rule.compositions(13), rule.free∘compositions(3) and rule.nibbles∘compositions(2) are 64. They stay at the integer they return.
  await named('100', [
    ['clay', ['hodge'], [50]],
    ['kin', ['dreamspellDrift'], [401]],
    ['kin', ['enneagram', 'kin'], [1, 1]],
    ['kin', ['enneagram', 'kin'], [1, 2]],
    ['kin', ['enneagram', 'kin'], [1, 3]],
    ['tesla', ['earth'], [401]],
    ['tesla', ['sync'], [5, 6]],
    ['tesla', ['earth', 'period'], [4]],
  ])
  // clay × kin = 208. rule.formulas(), rule.cap∘formulas(), rule.compositions∘formulas(1) and rule.compositions∘formulas(2) are 9095. They stay at the integer they return.
  await named('208', [
    ['clay', ['hodge'], [104]],
    ['kin', ['dootKin'], [1, 4, 3]],
    ['kin', ['dootKin'], [2, 5, 3]],
  ])
  const leadWays: readonly (readonly [string, string[], number[]])[] = [
    ['rule', ['compositions'], [ix('Qpu.Lattice')]],
    ['rule', ['compositions'], [ix('Qpu.Stabilizer')]],
    ['rule', ['cap', 'compositions'], [1]],
    ['rule', ['cap', 'compositions'], [2]],
    ['kin', ['combinations', 'dootKin'], [2, 1, 1]],
  ]
  const returned = []
  for (const [family, program, params] of leadWays) {
    const uuid = qpuHexUuidOf({ family, program, params })
    const run = (await hexRunOf(uuid, undefined, undefined, { store: false })) as { value?: unknown }
    returned.push({ call: `${family}.${program.join('∘')}(${params.join(', ')})`, value: String(run.value), uuid })
  }
  const meets = new Set(returned.filter((row) => row.value === '196').map((row) => row.call.split('.')[0]))
  const holds = meets.size >= 2
  const next = returned.find((row) => row.value !== '196')!.uuid
  assert.equal(holds, false)
  // cap∘compositions hands the cap on as the family index, so the family it lands on is the registry's: derived, not written
  const landed = String(RuleFormulas.compositions(Number(RuleFormulas.cap().value)).value)
  assert.deepEqual(returned.map((row) => [row.call, row.value]), [
    [`rule.compositions(${ix('Qpu.Lattice')})`, '169'],
    [`rule.compositions(${ix('Qpu.Stabilizer')})`, '16'],
    ['rule.cap∘compositions(1)', landed],
    ['rule.cap∘compositions(2)', landed],
    ['kin.combinations∘dootKin(2, 1, 1)', '196'],
  ])
  // handle, program nibble, variant and param are the address; the version nibble is the crypto family's fold of all of it
  assert.match(next, new RegExp(`^bfe6be1f-2000-[1-8]000-9000-${ix('Qpu.Lattice').toString(16).padStart(12, '0')}$`))
  assert.equal(returned.filter((row) => row.uuid === next).length, 1)
  const kin = returned.find((row) => row.call === 'kin.combinations∘dootKin(2, 1, 1)')!
  const compositions = returned.find((row) => row.call === `rule.compositions(${ix('Qpu.Lattice')})`)!
  const sentence = `${kin.call} is ${kin.value} (${kin.call.split('.')[0]}); ${compositions.call} is ${compositions.value} (compositions)`
  assert.equal(sentence, `kin.combinations∘dootKin(2, 1, 1) is 196 (kin); rule.compositions(${ix('Qpu.Lattice')}) is 169 (compositions)`)
  t.diagnostic(`4, 5, 10, 16, 27, 36, 100 and 208 meet; 196 holds false; ${sentence}; next ${next}`)
})

// cube-memory — the memory that HOLDS a handle until its neighbourhood is whole, checked against the failure it
// exists to prevent rather than against the success it hopes for.
//
// Every assertion carries a control that must FAIL. The thing being built here decides WHEN A THEOREM IS SAFE TO
// SEAL, and that class of bug is silent in both directions: seal too early and a partial neighbourhood is written
// as if complete; hold too long and nothing is ever saved. Neither throws. So each property is paired with the
// state that must NOT satisfy it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cubeMemory, hold, cubeOf, cubes, planMemory, commitMemory } from '../quantum/memory/index.js'
import { toUuid } from '../address.js'
import { theorems } from '../index.js'

const CENSUS: [string, string[]][] = [['Ring', ['a', 'b', 'c']], ['Vortex', ['x', 'y']]]
const addr = (s: string) => toUuid(s)
const fill = (mem: ReturnType<typeof cubeMemory>, principle: string, keys: string[], salt = '') => {
  for (const k of keys) hold(mem, { key: k, principle, address: addr(principle + ':' + k + salt) })
}

test('a partial neighbourhood NEVER seals, and the last member is what seals it', () => {
  const mem = cubeMemory(CENSUS)
  fill(mem, 'Ring', ['a', 'b'])
  const partial = cubeOf(mem, 'Ring')!
  assert.equal(partial.sealed, false, 'two of three is not a neighbourhood')
  assert.deepEqual(partial.missing, ['c'], 'the memory must be able to NAME what it is waiting for')
  assert.equal(partial.handle, '', 'an incomplete cube must not carry an address — that address is the artifact this prevents')
  // the control: the SAME memory, one member later, must seal — or the test is only proving that nothing works
  fill(mem, 'Ring', ['c'])
  const whole = cubeOf(mem, 'Ring')!
  assert.equal(whole.sealed, true, 'a complete census must seal')
  assert.notEqual(whole.handle, '', 'a sealed cube carries its own handle')
  assert.deepEqual(whole.missing, [], 'nothing outstanding')
})

test('a COUNT is not a neighbourhood — the right number of the wrong keys is refused', () => {
  const mem = cubeMemory(CENSUS)
  hold(mem, { key: 'a', principle: 'Ring', address: addr('1') })
  hold(mem, { key: 'b', principle: 'Ring', address: addr('2') })
  // holding 'a' again reaches three HOLDS but two members — a count match that must not seal
  hold(mem, { key: 'a', principle: 'Ring', address: addr('3') })
  assert.equal(cubeOf(mem, 'Ring')!.sealed, false, 'three holds of two keys is not three members')
  assert.throws(() => hold(mem, { key: 'stranger', principle: 'Ring', address: addr('4') }), /not a member/,
    'a key the census does not name must be REFUSED')
  assert.throws(() => hold(mem, { key: 'a', principle: 'Nowhere', address: addr('5') }), /does not carry/,
    'an unknown neighbourhood is unknown')
})

test('the cube handle is ORDER-INVARIANT, and moves when any member moves', () => {
  const forward = cubeMemory(CENSUS); fill(forward, 'Ring', ['a', 'b', 'c'])
  const reverse = cubeMemory(CENSUS); fill(reverse, 'Ring', ['c', 'b', 'a'])
  assert.equal(cubeOf(forward, 'Ring')!.handle, cubeOf(reverse, 'Ring')!.handle, 'staging order cannot change what is sealed')
  // the control: change ONE member's content and the same three keys must fold to a different handle
  const moved = cubeMemory(CENSUS); fill(moved, 'Ring', ['a', 'b']); hold(moved, { key: 'c', principle: 'Ring', address: addr('Ring:c-changed') })
  assert.notEqual(cubeOf(moved, 'Ring')!.handle, cubeOf(forward, 'Ring')!.handle, 'a changed member must move the cube — otherwise the receipt proves nothing')
})

test('a standing receipt means NOT RECOMPUTED, and only the changed cube pays', () => {
  const first = cubeMemory(CENSUS); fill(first, 'Ring', ['a', 'b', 'c']); fill(first, 'Vortex', ['x', 'y'])
  const receipts = commitMemory(planMemory(first, {}), {})
  assert.deepEqual(Object.keys(receipts), ['Ring', 'Vortex'], 'both complete cubes are saved')
  // NO PAYLOAD, AND THE COMPLETE UUID. Member handles and sizes are recomputable from the sealed Lean, so storing
  // them would be a second copy of a derivable fact. What remains must be the full 128-bit address and not the
  // eight-hex index: the handle is a path, the address is the identity, and only one of them is safe to message.
  assert.deepEqual(Object.values(receipts).map((v) => typeof v), ['string', 'string'], 'a receipt is one value')
  assert.equal(receipts['Ring'], cubeOf(first, 'Ring')!.address, 'and it is exactly the cube fold')
  for (const [principle, v] of Object.entries(receipts)) {
    assert.match(v, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'messaging carries complete uuids')
    // the handle is that address TRUNCATED— 32 bits of the 128 that travel
    const cube = cubeOf(first, principle)!
    assert.equal(cube.handle, v.replace(/-/g, '').slice(0, 8), 'the handle is the address, cut short')
    assert.equal(v.replace(/-/g, '').length, 32, 'the receipt carries all 128 bits')
    assert.notEqual(v, cube.handle, 'a receipt holding the eight-hex index is the birthday ceiling walking in')
  }

  const second = cubeMemory(CENSUS); fill(second, 'Ring', ['a', 'b', 'c']); fill(second, 'Vortex', ['x', 'y'])
  const unchanged = planMemory(second, receipts)
  assert.deepEqual([...unchanged.fresh], ['Ring', 'Vortex'], 'identical content recomputes NOTHING')
  assert.deepEqual([...unchanged.moved], [], 'nothing moved, so nothing is re-sealed')

  // the control: move one member of ONE cube — that cube must pay and the other must not
  const third = cubeMemory(CENSUS); fill(third, 'Ring', ['a', 'b']); hold(third, { key: 'c', principle: 'Ring', address: addr('Ring:c-changed') }); fill(third, 'Vortex', ['x', 'y'])
  const changed = planMemory(third, receipts)
  assert.deepEqual([...changed.moved], ['Ring'], 'exactly the changed neighbourhood is re-sealed')
  assert.deepEqual([...changed.fresh], ['Vortex'], 'the untouched neighbourhood stays free')
})

test('a MISSING receipt is not a fresh one', () => {
  const mem = cubeMemory(CENSUS); fill(mem, 'Ring', ['a', 'b', 'c']); fill(mem, 'Vortex', ['x', 'y'])
  const plan = planMemory(mem, {})
  assert.deepEqual([...plan.fresh], [], 'absence of a receipt is not a receipt')
  assert.deepEqual([...plan.moved], ['Ring', 'Vortex'], 'an unseen cube is work')
})

test('a PARTIAL RUN neither writes a partial store nor forgets the cubes it never looked at', () => {
  const full = cubeMemory(CENSUS); fill(full, 'Ring', ['a', 'b', 'c']); fill(full, 'Vortex', ['x', 'y'])
  const prior = commitMemory(planMemory(full, {}), {})

  const partial = cubeMemory(CENSUS); fill(partial, 'Ring', ['a', 'b'])   // one wing, and not even all of it
  const plan = planMemory(partial, prior)
  assert.deepEqual(plan.held.map((c) => c.principle), ['Ring', 'Vortex'], 'both are incomplete in THIS run')
  assert.deepEqual([...plan.sealed], [], 'a partial run seals nothing')
  const after = commitMemory(plan, prior)
  assert.deepEqual(after, prior, 'incompleteness is not evidence of change — the prior receipts must survive intact')
  // the control: a COMPLETE re-run with moved content must in fact replace the receipt, or nothing is ever updated
  const redone = cubeMemory(CENSUS); fill(redone, 'Ring', ['a', 'b'], '!'); hold(redone, { key: 'c', principle: 'Ring', address: addr('Ring:c!') }); fill(redone, 'Vortex', ['x', 'y'])
  const next = commitMemory(planMemory(redone, prior), prior)
  assert.notEqual(next['Ring'], prior['Ring'], 'a re-measured cube must actually update')
  assert.equal(next['Vortex'], prior['Vortex'], 'and an unchanged one must not')
})

test('over the LIVE ledger every theorem lands in exactly one cube, and the whole ledger seals', () => {
  const live = theorems()
  const byPrinciple = new Map<string, string[]>()
  for (const t of live) byPrinciple.set(t.principle, [...(byPrinciple.get(t.principle) ?? []), t.key])
  const mem = cubeMemory(byPrinciple)
  for (const t of live) hold(mem, { key: t.key, principle: t.principle, address: t.address })

  const all = cubes(mem)
  assert.equal(all.length, byPrinciple.size, 'one cube per principle')
  assert.equal(all.filter((c) => c.sealed).length, all.length, 'the live ledger is complete, so every cube seals')
  assert.equal(all.reduce((n, c) => n + c.members.length, 0), live.length, 'the cubes partition the ledger — no theorem twice, none lost')
  assert.equal(new Set(all.map((c) => c.handle)).size, all.length, 'distinct neighbourhoods fold to distinct handles')

  // the control: drop ONE theorem from ONE wing and that wing alone must fail to seal
  const wounded = cubeMemory(byPrinciple)
  const victim = live[0]!
  for (const t of live) if (t.key !== victim.key) hold(wounded, { key: t.key, principle: t.principle, address: t.address })
  const broken = cubes(wounded).filter((c) => !c.sealed)
  assert.deepEqual(broken.map((c) => c.principle), [victim.principle], 'exactly the wounded neighbourhood is held back')
  assert.deepEqual(broken[0]!.missing, [victim.key], 'and it names the theorem it is waiting for')
})

test('a complete fusion TRAVELS — imprinted, witnessed by its own contents, and refused when incomplete', async () => {
  const { sealCubeMessage, readCubeMessage, verifyCubeMessage } = await import('../quantum/message/index.js')
  const live = theorems()
  const byPrinciple = new Map<string, string[]>()
  for (const t of live) byPrinciple.set(t.principle, [...(byPrinciple.get(t.principle) ?? []), t.key])
  const mem = cubeMemory(byPrinciple)
  for (const t of live) hold(mem, { key: t.key, principle: t.principle, address: t.address })

  const cube = cubes(mem)[0]!
  const msg = sealCubeMessage(cube)
  assert.equal(readCubeMessage(msg), cube.address, 'the carrier decodes back to the address, byte-exact')
  assert.equal(verifyCubeMessage(msg).valid, true, 'the whole fusion recomputes')
  assert.ok(cube.members.some((m) => m.key === msg.witness.theoremKey), 'the witness is one of the cube\'s OWN theorems')

  // the controls: every leg of the fusion must be able to FAIL
  assert.equal(verifyCubeMessage({ ...msg, carrier: [...msg.carrier].reverse() }).valid, false, 'a reordered carrier must break the decode')
  assert.equal(verifyCubeMessage({ ...msg, fold: msg.address }).valid, false, 'a fold that does not recompute must fail')
  assert.equal(verifyCubeMessage({ ...msg, handle: '00000000' }).valid, false, 'a handle that is not the address truncated is a second identity')

  const partial = cubeMemory([['Ring', ['a', 'b']]])
  hold(partial, { key: 'a', principle: 'Ring', address: addr('a') })
  assert.throws(() => sealCubeMessage(cubeOf(partial, 'Ring')!), /incomplete/, 'a half-neighbourhood must never be announced')
})

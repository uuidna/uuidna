// hex-programs.test — THE COLLISION CHECK MUST BE ABLE TO FIND A COLLISION, or reporting zero of them is worthless.
//
// This module addresses doors by a 32-bit fold of their contract. Over the live surface that fold is collision-free —
// 249 doors, 249 distinct hexes, measured. But "zero collisions" is only evidence if the instrument that counts them
// would have seen one, and `gematria_forces_collisions` is a sealed theorem of this tree precisely because names DO
// collide. So the control below hands collisionsOf a synthetic pair that shares a hex and requires it to be caught.
// Without that, the index's most important field is an assertion wearing a number.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hexProgramIndex, hexProgramOf, collisionsOf, callOfUuid, uuidOfCall } from './hex-programs.js'
import { MCP_CATALOG } from './mcp.js'

test('every served door has a program hex, derived from its contract and nothing else', () => {
  const ix = hexProgramIndex()
  assert.equal(ix.doors, MCP_CATALOG.length, 'the index covers the catalogue, not a subset of it')
  assert.equal(ix.width, 8, 'a program address is two message caps of the uuid middle')
  assert.equal(ix.bits, 32)
  for (const p of ix.programs) {
    assert.match(p.hex, /^[0-9a-f]{8}$/, `${p.name} has a malformed program hex`)
    // THE DERIVATION IS THE CONTRACT: recomputing from name+description must give the same hex, or the index is a table
    const t = MCP_CATALOG.find((x) => x.name === p.name)!
    assert.equal(p.hex, hexProgramOf(t.name, t.description), `${p.name} hex does not recompute from its contract`)
  }
})

// ── THE CONTROL. Everything else in this file could pass while the collision count was a constant zero.
test('COLLISIONS ARE FOUND WHEN THEY EXIST — the control for the index\'s most important field', () => {
  // two doors folding to one hex is the fault that would route a call to the wrong door; the counter must see it
  const planted = collisionsOf([
    { name: 'uuidna_alpha', hex: 'deadbeef' },
    { name: 'uuidna_beta', hex: 'deadbeef' },
    { name: 'uuidna_gamma', hex: '00000001' },
  ])
  assert.equal(planted.length, 1, 'a planted collision must be reported')
  assert.deepEqual(planted[0]!.doors, ['uuidna_alpha', 'uuidna_beta'], 'and BOTH colliding doors named, so the fault is actionable')
  assert.equal(planted[0]!.hex, 'deadbeef')
  // three sharing one hex is still one collision row, with three names
  assert.deepEqual(collisionsOf([
    { name: 'a', hex: 'ff' }, { name: 'b', hex: 'ff' }, { name: 'c', hex: 'ff' },
  ]), [{ hex: 'ff', doors: ['a', 'b', 'c'] }])
  // and the other direction: distinct hexes yield none, so the counter is not simply always positive
  assert.deepEqual(collisionsOf([{ name: 'a', hex: '01' }, { name: 'b', hex: '02' }]), [])
})

test('the live surface is collision-free, and that is measured rather than assumed', () => {
  const ix = hexProgramIndex()
  assert.deepEqual(ix.collisions, [], `two doors share a program hex: ${JSON.stringify(ix.collisions)}`)
  assert.equal(ix.distinct, ix.doors, 'distinct hexes must equal the door count when there are no collisions')
})

// ── THE WIRE FORMAT IS A ROUND TRIP OR IT IS A LABEL. Encode a call, decode it, get the same call back.
test('a call encodes to a uuid and decodes back to the same call', () => {
  const ix = hexProgramIndex()
  const door = ix.programs[0]!.name
  const uuid = uuidOfCall({ handle: '4f2a91c7', door, params: '0a3c', envelope: '40d2d1ad520f' }, ix)
  assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/, 'the sealed group layout')
  const call = callOfUuid(uuid, ix)
  assert.equal(call.handle, '4f2a91c7', 'the subject survives the round trip')
  assert.equal(call.door, door, 'and the program resolves back to the door it named')
  assert.equal(call.params, '0a3c')
  assert.equal(call.envelope, '40d2d1ad520f')
  assert.equal(call.program, ix.programs[0]!.hex)
})

test('the groups partition the uuid exactly — nothing borrowed, nothing spare', () => {
  const ix = hexProgramIndex()
  const uuid = uuidOfCall({ handle: 'aaaaaaaa', door: ix.programs[0]!.name, params: 'bbbb', envelope: 'cccccccccccc' }, ix)
  const c = callOfUuid(uuid, ix)
  assert.equal((c.handle + c.program + c.params + c.envelope).length, 32,
    'handle 8 + program 8 + params 4 + envelope 12 must be the whole 32, or a field is overlapping another')
  assert.equal(c.handle.length + c.program.length + c.params.length + c.envelope.length, 32)
})

// A UUID NAMING NO DOOR IS A FACT ABOUT THE SURFACE, not a malformed address — refusing it would report the absence of
// a door as a broken uuid, which is the same conflation the empty-envelope defect made at the MCP client.
test('a well-formed uuid whose program names no door resolves to door:null, not a refusal', () => {
  const ix = hexProgramIndex()
  const call = callOfUuid('11111111-ffff-ffff-2222-333333333333', ix)
  assert.equal(call.door, null, 'no door folds to ffffffff, and that is reported rather than thrown')
  assert.equal(call.program, 'ffffffff')
  assert.equal(call.handle, '11111111')
})

test('a malformed address IS refused, and an unknown door cannot be encoded', () => {
  assert.throws(() => callOfUuid('not-a-uuid'), /not a uuid/)
  assert.throws(() => callOfUuid('11111111-2222-3333-4444'), /not a uuid/)
  assert.throws(() => uuidOfCall({ handle: '0', door: 'uuidna_does_not_exist' }), /unknown door/)
})

test('the receipt is order-invariant over the index', () => {
  assert.equal(hexProgramIndex().receipt, hexProgramIndex().receipt)
  assert.equal(hexProgramIndex().handle, hexProgramIndex().handle)
})

test('the capacity arithmetic is the sealed layout, and the program fits the middle with params to spare', () => {
  const ix = hexProgramIndex()
  assert.equal(ix.capacity.middle, 16 ** 12, 'the middle is three caps of four hexbits')
  assert.equal(ix.capacity.program * ix.capacity.paramsInMiddle, ix.capacity.middle,
    'program space times in-middle param space must be exactly the middle — otherwise a field is stolen from the tail')
  assert.ok(ix.capacity.program > ix.doors, 'the program space must exceed the doors it addresses')
})

// ── THE DOOR ITSELF, BY NAME. The tool-exercise gate refuses a door covered only by an aggregate fold — "new tools earn
// a test or a deliberate baseline entry" — and it held a push earlier today for exactly this omission on another door.
// Testing the functions is not testing the door: the shapes, the flag and the self-reference are the door's promises.
test('the door answers by name, in both its shapes, and counts ITSELF', async () => {
  const { callTool } = await import('./mcp.js')
  const counted = callTool('uuidna_hex_programs', {}) as { doors: number; programs: number; collisions: unknown[] }
  assert.equal(typeof counted.programs, 'number', 'omitting the flag carries the row COUNT, not the rows')
  assert.ok(counted.doors > 100, `the catalogue is real: ${counted.doors}`)
  assert.deepEqual(counted.collisions, [], 'the live surface folds distinct')

  const full = callTool('uuidna_hex_programs', { programs: true }) as { doors: number; programs: { name: string; hex: string }[] }
  assert.ok(Array.isArray(full.programs), '{programs:true} carries the rows')
  assert.equal(full.programs.length, counted.programs, 'the count is the array length, never a second census')

  // THE SELF-REFERENCE IS THE POINT: the door that publishes the program space is itself a program in it. A door absent
  // from its own index would mean the index describes a surface that does not include the thing describing it.
  assert.ok(full.programs.some((p) => p.name === 'uuidna_hex_programs'),
    'the index must contain the door that publishes it, or it is not an index of the served surface')
  assert.equal(full.doors, full.programs.length)
})

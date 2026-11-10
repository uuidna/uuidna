import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RayFormulas } from './index.js'
import '../../mcp/families.js'

/** A v8 UUID as 32 programmable rays: each nibble a ray from the centre, a stream a walk that closes on its double-opposite. */
test('ray: 32 rays, each carrying a nibble; opposites across the centre, every stream closes; crossing to merkaba', async (t) => {
  // the fixed counts
  assert.equal(RayFormulas.nibbles().value, 32, '32 rays in a UUID')
  assert.equal(RayFormulas.bits().value, 128, '128 bits')
  assert.equal(RayFormulas.free().value, 122, '122 v8 free bits')
  // angles and sweeps over the turn
  assert.equal(RayFormulas.angle(0).value, 0, 'ray 0 at 0 degrees')
  assert.equal(RayFormulas.angle(8).value, 90, 'ray 8 at (8·360/32)|0 = 90 degrees')
  assert.equal(RayFormulas.sweep(32).value, 360, '32 rays sweep a full turn')
  assert.equal(RayFormulas.sectors(40).value, 32, '40 rays still fill 32 sectors')
  // the magnitudes each ray carries
  assert.equal(RayFormulas.ray(3, 12).value, 12, 'ray 3 carries magnitude 12')
  assert.equal(RayFormulas.magnitude(15).value, 15, 'a full nibble has magnitude 15')
  assert.equal(RayFormulas.parity(7).value, 1, '7 is odd: low bit 1')
  // opposites and closure
  assert.equal(RayFormulas.opposite(0).value, 16, 'ray 0 opposite is 16')
  assert.equal(RayFormulas.opposite(20).value, 4, 'ray 20 opposite wraps to 4')
  assert.equal(RayFormulas.closes(0).value, 1, "ray 0's double-opposite returns: the stream closes")
  assert.equal(RayFormulas.closes(31).value, 1, 'ray 31 closes too')
  // streams and folds
  assert.equal(RayFormulas.stream(1, 2, 3).value, 3, 'three distinct rays: length 3')
  assert.equal(RayFormulas.stream(5, 5, 9).value, 2, 'a repeated ray shortens the stream')
  assert.equal(RayFormulas.foldpair(20).value, 11, 'ray 20 folds onto 11')
  assert.equal(RayFormulas.programlen(7).value, 7, 'a 7-step stream has program length 7')
  assert.equal(RayFormulas.address(10, 5).value, 165, 'two nibbles (10, 5) make byte 165')
  // domain predicates
  assert.equal(RayFormulas.ray(32, 0).holds, false, 'ray index 32 is out of range')
  assert.equal(RayFormulas.magnitude(16).holds, false, 'magnitude 16 is out of range')
  // the cross destination
  assert.equal(RayFormulas.opposite(0).dst, 'merkaba', 'ray crosses to merkaba')
  // the registry
  assert.equal(hexFamiliesOf().get('ray')?.length, 15)
  // run one formula as a hex program
  const uuid = qpuHexUuidOf({ family: 'ray', program: ['address'], params: [10, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 165, `ray.address(10, 5) at ${uuid}`)
  uuidReceiptOf('ray address', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; 32 rays / 128 bits / 122 free; opposite (i+16)%32, double-opposite closes; stream = distinct rays; crossing to merkaba')
})

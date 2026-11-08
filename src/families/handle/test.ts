import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HandleFormulas } from './index.js'
import '../../mcp/families.js'

test('handle: a UUID is the product of four 8-hex handles handling each other — folder, index, sealed plugin; crossing to merkaba', async (t) => {
  assert.equal(HandleFormulas.hexits().value, 8, 'hex digits in a handle')
  assert.equal(HandleFormulas.bits().value, 32, 'bits in a handle')
  assert.equal(HandleFormulas.count().value, 4, 'four handles compose a UUID')
  assert.equal(HandleFormulas.nibbles().value, 32, 'hex in the composed UUID')
  assert.equal(HandleFormulas.space().value, 4294967296, 'a handle addresses 2^32')
  assert.equal(HandleFormulas.offset(0).value, 0, 'first handle at hex offset 0')
  assert.equal(HandleFormulas.offset(3).value, 24, 'fourth handle at hex offset 24')
  assert.equal(HandleFormulas.offset(4).holds, false, 'only four handles')
  assert.equal(HandleFormulas.pair(16, 16).value, 256, 'two handles handling each other')
  assert.equal(HandleFormulas.trinity(2, 3, 4).value, 24, 'three handles handling each other')
  assert.equal(HandleFormulas.compose(5).value, 120, 'P(5, 4) UUIDs from five handles')
  assert.equal(HandleFormulas.compose(3).holds, false, 'four handles needed to compose a UUID')
  assert.equal(HandleFormulas.choose(5).value, 5, 'C(5, 4) handle combinations')
  assert.equal(HandleFormulas.compression().value, 4, 'a handle is a quarter of a UUID')
  assert.equal(HandleFormulas.same(10, 10).value, 1, 'equal handles, one folder')
  assert.equal(HandleFormulas.same(10, 11).value, 0, 'different handles, different folders')
  assert.equal(HandleFormulas.index(7).value, 7, 'the folder index indexes all seven files inside')
  assert.equal(HandleFormulas.plugin().value, 1, 'each handle is a sealed plugin')
  assert.equal(HandleFormulas.tamper(32).value, 4294967296, 'forging a 32-bit seal is 2^32 work; verifying is O(1)')
  assert.equal(HandleFormulas.tamper(0).value, 1, 'a zero-bit seal is trivial')
  assert.equal(HandleFormulas.trinity(2, 3, 4).dst, 'merkaba')
  assert.equal(hexFamiliesOf().get('handle')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'handle', program: ['compose'], params: [5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 120, `handle.compose at ${uuid}`)
  uuidReceiptOf('handle compose', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; hexits 8, bits 32, count 4, nibbles 32, space 2^32, offset 0..24, pair 256, trinity 24, compose P(5,4)=120, choose C(5,4)=5, compression 4, same 1/0, index 7, plugin 1, tamper 2^32; crossing to merkaba')
})

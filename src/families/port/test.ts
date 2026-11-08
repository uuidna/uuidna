import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PortFormulas } from './index.js'

/** The porting arithmetic, checked against the known numbers: ELF's magic, a struct's C-ABI size and offsets, the
 *  data models' widths, and the endianness swap — each a hex program at its address. */
test('port: magic identification, C-ABI struct layout, data-model widths and endianness, as formulas', async (t) => {
  assert.equal(PortFormulas.magic(0x7f454c46).holds, true, 'ELF')
  assert.equal(PortFormulas.magic(0x0061736d).holds, true, 'WASM')
  assert.equal(PortFormulas.magic(0x12345678).holds, false, 'not a known magic')
  // struct { char; int; } on a 4-byte-int target: char at 0, int at 4 (3 pad), size 8
  assert.equal(PortFormulas.offset(0x14, 0).value, 0, 'char at 0')
  assert.equal(PortFormulas.offset(0x14, 1).value, 4, 'int aligned to 4')
  assert.equal(PortFormulas.layout(0x14).value, 8, 'char + int = 8 with padding')
  // struct { char; char; }: size 2, no padding
  assert.equal(PortFormulas.layout(0x11).value, 2)
  // struct { char; double; }: double aligns to 8, struct size 16
  assert.equal(PortFormulas.layout(0x18).value, 16)
  assert.equal(PortFormulas.align(1, 4).value, 4)
  assert.equal(PortFormulas.align(8, 4).value, 8, 'already aligned')
  assert.equal(PortFormulas.pad(1, 8).value, 7)
  assert.equal(PortFormulas.word(0).value, 4, 'ILP32 pointer')
  assert.equal(PortFormulas.word(1).value, 8, 'LP64 pointer')
  assert.equal(PortFormulas.long(1).value, 8, 'LP64 long is 8')
  assert.equal(PortFormulas.long(2).value, 4, 'LLP64 long is 4 — where Windows ports break')
  assert.equal(PortFormulas.swap(0x12345678, 4).value, 0x78563412, 'four bytes reversed')
  assert.equal(PortFormulas.swap(PortFormulas.swap(0x1234, 2).value, 2).value, 0x1234, 'swap is its own inverse')
  assert.equal(hexFamiliesOf().get('port')?.length, 8)
  for (const [name, params, expected] of [['layout', [0x14], 8], ['word', [1], 8], ['swap', [0x1234, 2], 0x3412]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'port', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown; holds?: boolean }
    assert.equal(Number(run.value), expected, `port.${name} at ${uuid}`)
    uuidReceiptOf(`port ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; { char; int } = 8 bytes; LP64 ptr 8, LLP64 long 4; swap is an involution')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FirmwareFormulas } from './index.js'

/** The image's arithmetic — sectors, words, pages, checksum words, boot blocks, A/B slots, packed version, OTA delta. */
test('firmware: sectors, words, pages, checksumWords, bootBlocks, slots, version, otaDelta', async (t) => {
  assert.equal(FirmwareFormulas.sectors(1024, 512).value, 2, '1024 bytes in 512-byte sectors')
  assert.equal(FirmwareFormulas.sectors(1024, 0).value, 0, 'no sector, no divide')
  assert.equal(FirmwareFormulas.words(16).value, 4, '16 bytes is four 32-bit words')
  assert.equal(FirmwareFormulas.pages(1000, 256).value, 3, 'whole 256-byte pages in 1000')
  assert.equal(FirmwareFormulas.checksumWords(16).value, 8, '16-bit words in 16 bytes')
  assert.equal(FirmwareFormulas.bootBlocks(8192, 4096).value, 2, 'two boot blocks')
  assert.equal(FirmwareFormulas.slots(1048576, 524288).value, 2, 'two A/B slots')
  assert.equal(FirmwareFormulas.version(2, 1, 0).value, 2001000, 'packed version 2.1.0')
  assert.equal(FirmwareFormulas.otaDelta(5000, 4000).value, 1000, 'update grew by 1000')
  assert.equal(FirmwareFormulas.otaDelta(100, 200).value, 0, 'update shrank, floored')
  assert.equal(FirmwareFormulas.image(32, 4096).value, 131072, '32 blocks of 4096 bytes')
  assert.equal(FirmwareFormulas.freespace(8192, 5000).value, 3192, '8192 less 5000 used')
  assert.equal(FirmwareFormulas.crc(64, 4).value, 256, '64 words of 4 bytes')
  assert.equal(FirmwareFormulas.stack(8, 256).value, 2048, '8 frames of 256 bytes')
  assert.equal(FirmwareFormulas.isr(64, 4).value, 256, '64 vectors of 4 bytes')
  assert.equal(FirmwareFormulas.watchdog(1000, 10).value, 100, '1000ms at 10ms ticks')
  assert.equal(FirmwareFormulas.flashcycles(5000, 100000).value, 5, '5000 writes of 100000 endurance')
  assert.equal(hexFamiliesOf().get('firmware')?.length, 15)
  for (const [name, params, expected] of [['sectors', [1024, 512], 2], ['version', [2, 1, 0], 2001000], ['otaDelta', [5000, 4000], 1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'firmware', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `firmware.${name} at ${uuid}`)
    uuidReceiptOf(`firmware ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; 1024/512=2 sectors, 16→4 words, version 2.1.0→2001000, OTA delta 1000')
})

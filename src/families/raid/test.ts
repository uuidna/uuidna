import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RaidFormulas } from './index.js'
import '../../mcp/families.js'

test('raid: hybrid RAID capacity, parity, tolerance, rebuild — binding filesystems and databases, crossing to storage', async (t) => {
  assert.equal(RaidFormulas.raid0capacity(4, 100).value, 400, 'striping: full capacity')
  assert.equal(RaidFormulas.raid1capacity(4, 100).value, 200, 'mirroring: half the disks')
  assert.equal(RaidFormulas.raid5capacity(5, 100).value, 400, 'single parity: one disk lost')
  assert.equal(RaidFormulas.raid6capacity(6, 100).value, 400, 'double parity: two disks lost')
  assert.equal(RaidFormulas.raid10capacity(4, 100).value, 200, 'striped mirrors: half the disks')
  assert.equal(RaidFormulas.stripewidth(5, 1).value, 4, 'data disks in a stripe')
  assert.equal(RaidFormulas.parityoverhead(5, 1).value, 1, 'parity disks')
  assert.equal(RaidFormulas.faulttolerance(2).value, 1, 'raid5 tolerates one failure')
  assert.equal(RaidFormulas.faulttolerance(3).value, 2, 'raid6 tolerates two failures')
  assert.equal(RaidFormulas.rebuildreads(5, 1).value, 3, 'surviving data disks read to rebuild')
  assert.equal(RaidFormulas.usablepercent(5, 1).value, 80, '80% usable under single parity')
  assert.equal(RaidFormulas.minimumdisks(2).value, 3, 'raid5 needs three disks')
  assert.equal(RaidFormulas.stripesize(8, 4096).value, 32768, 'bytes in a full stripe')
  assert.equal(RaidFormulas.mirrors(8).value, 4, 'four mirror pairs')
  assert.equal(RaidFormulas.fscount().value, 15, 'known filesystems bound')
  assert.equal(RaidFormulas.dbcount().value, 15, 'known databases bound')
  assert.equal(RaidFormulas.raid5capacity(5, 100).dst, 'storage')
  assert.equal(hexFamiliesOf().get('raid')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'raid', program: ['raid5capacity'], params: [5, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `raid.raid5capacity at ${uuid}`)
  uuidReceiptOf('raid raid5capacity', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; raid0 400, raid1 200, raid5 400, raid6 400, raid10 200, stripewidth 4, tolerance 1/2, rebuild 3, usable 80%, min 3, stripe 32768, mirrors 4, fs 15, db 15; crossing to storage')
})

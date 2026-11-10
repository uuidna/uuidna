import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DedupFormulas } from './index.js'
import '../../mcp/families.js'

test('dedup: content-addressed storage — fingerprint, dedup savings, reference-counted release, crossing to raid', async (t) => {
  assert.equal(DedupFormulas.fingerprint(42, 42).value, 1, 'equal content shares one block')
  assert.equal(DedupFormulas.fingerprint(42, 43).value, 0, 'different content, different blocks')
  assert.equal(DedupFormulas.deduped(9).value, 1, 'nine identical uploads, one physical copy')
  assert.equal(DedupFormulas.hit(9).value, 8, 'eight of nine uploads matched an existing block')
  assert.equal(DedupFormulas.saved(9, 100).value, 800, 'eight redundant uploads cost no storage')
  assert.equal(DedupFormulas.logical(9, 100).value, 900, 'bytes claimed before dedup')
  assert.equal(DedupFormulas.physical(1, 100).value, 100, 'one copy per distinct content')
  assert.equal(DedupFormulas.ratio(900, 100).value, 900, '9:1 dedup ratio')
  assert.equal(DedupFormulas.blocks(3).value, 3, 'three distinct contents, three blocks')
  assert.equal(DedupFormulas.chunk(10000, 4096).value, 3, 'content-defined chunks')
  assert.equal(DedupFormulas.refcount(3).value, 3, 'three live links hold the block')
  assert.equal(DedupFormulas.incref(3).value, 4, 'a new reference taken')
  assert.equal(DedupFormulas.decref(1).value, 0, 'the last reference dropped')
  assert.equal(DedupFormulas.decref(0).value, 0, 'never below zero')
  assert.equal(DedupFormulas.pinned(2).value, 1, 'pinned while referenced')
  assert.equal(DedupFormulas.released(0).value, 1, 'no links: released from the load')
  assert.equal(DedupFormulas.released(2).value, 0, 'links remain: held')
  assert.equal(DedupFormulas.releasable(0, 0).value, 1, 'unreferenced and no legal hold: releasable')
  assert.equal(DedupFormulas.releasable(0, 1).value, 0, 'a legal hold keeps it, referenced or not')
  assert.equal(DedupFormulas.released(0).dst, 'raid')
  assert.equal(hexFamiliesOf().get('dedup')?.length, 15)
  const uuid = qpuHexUuidOf({ family: 'dedup', program: ['saved'], params: [9, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `dedup.saved at ${uuid}`)
  uuidReceiptOf('dedup saved', contentUuidOf(run), { uuid })
  t.diagnostic('15 formulas; fingerprint 1/0, deduped 1, hit 8, saved 800, logical 900, physical 100, ratio 900%, blocks 3, chunk 3, refcount 3, incref 4, decref 0, pinned 1, released 1/0, releasable 1/0; crossing to raid')
})

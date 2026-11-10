import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WarehouseFormulas } from './index.js'
import '../../mcp/families.js'

test('warehouse: scanrows, partitionprune, columnsize, compressionratio, querycost, materialized, cardinality, clustering — crossing to indexing', async (t) => {
  assert.equal(WarehouseFormulas.scanrows(10000, 25).value, 2500, 'a quarter of the rows scanned')
  assert.equal(WarehouseFormulas.partitionprune(64, 50).value, 14, 'fourteen partitions left to read')
  assert.equal(WarehouseFormulas.columnsize(1000, 8).value, 8000)
  assert.equal(WarehouseFormulas.compressionratio(1000, 250).value, 4, 'four to one')
  assert.equal(WarehouseFormulas.querycost(500, 2, 100).value, 1100)
  assert.equal(WarehouseFormulas.materialized(1000, 24).value, 976)
  assert.equal(WarehouseFormulas.cardinality(250, 1000).value, 25)
  assert.equal(WarehouseFormulas.clustering(1000, 8).value, 125, 'blocks touched')
  assert.equal(WarehouseFormulas.scanrows(10000, 25).dst, 'indexing')
  assert.equal(hexFamiliesOf().get('warehouse')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'warehouse', program: ['clustering'], params: [1000, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 125, `warehouse.clustering at ${uuid}`)
  uuidReceiptOf('warehouse clustering', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; scanrows 2500, partitionprune 14, columnsize 8000, compressionratio 4, querycost 1100, materialized 976, cardinality 25, clustering 125; crossing to indexing')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BlockchainFormulas } from './index.js'
import '../../mcp/families.js'

test('blockchain: throughput, difficulty, blocktime, confirmation, fee, merkle, stake, finality — crossing to code', async (t) => {
  assert.equal(BlockchainFormulas.throughput(6000, 60).value, 100, 'transactions per second')
  assert.equal(BlockchainFormulas.difficulty(1000, 25).value, 40)
  assert.equal(BlockchainFormulas.blocktime(600, 50).value, 12, 'seconds between blocks')
  assert.equal(BlockchainFormulas.confirmation(3, 6).value, 50)
  assert.equal(BlockchainFormulas.fee(250, 8).value, 2000)
  assert.equal(BlockchainFormulas.merkle(1024).value, 1024)
  assert.equal(BlockchainFormulas.stake(30, 100).value, 30)
  assert.equal(BlockchainFormulas.finality(4, 8).value, 50)
  assert.equal(BlockchainFormulas.throughput(6000, 60).dst, 'code')
  assert.equal(hexFamiliesOf().get('blockchain')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'blockchain', program: ['throughput'], params: [6000, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `blockchain.throughput at ${uuid}`)
  uuidReceiptOf('blockchain throughput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; throughput 100, difficulty 40, blocktime 12, confirmation 50, fee 2000, merkle 1024, stake 30, finality 50; crossing to code')
})

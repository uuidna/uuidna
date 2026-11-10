import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { facesOf, hexFamiliesOf, hexRunOf, qpuHexUuidOf, messageOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChatFormulas } from './index.js'

/** Agents find their lane from their indices alone; the lanes are the message door's; the rounds and collisions count. */
test('chat: a pair computes its lane without a registry, the lanes are the door\'s, broadcasts and collisions are counted', async (t) => {
  const faces = facesOf().faces
  const door = messageOf() as { lanes: number; holds: boolean }
  assert.equal(door.lanes, faces, 'the door has faces lanes')
  assert.equal(ChatFormulas.lane(0, 1).value, ChatFormulas.lane(1, 0).value, 'a pair has one lane either way')
  assert.equal(ChatFormulas.lane(2, 2).holds, false, 'an agent is not its own pair')
  assert.ok(Array.from({ length: 10 }, (_, a) => Array.from({ length: 10 }, (_, b) => a === b || Number(ChatFormulas.lane(a, b).value) < faces)).flat().every(Boolean), 'every lane is one of the door\'s')
  assert.equal(ChatFormulas.lanes(4).value, 6 + 4)
  assert.equal(ChatFormulas.groups(5, 3).value, 10)
  assert.equal(ChatFormulas.collisions(5).value, 0, 'ten pairs fit fourteen lanes')
  assert.equal(ChatFormulas.collisions(7).value, 21 - faces, 'twenty-one pairs: seven share')
  assert.equal(ChatFormulas.gossip(8).value, 3)
  assert.equal(ChatFormulas.gossip(9).value, 4)
  assert.equal(ChatFormulas.chain(5).value, 4)
  assert.equal(hexFamiliesOf().get('chat')?.length, 6)
  const sent = messageOf({ lane: Number(ChatFormulas.lane(0, 1).value), body: { from: 0, to: 1, text: 'lane by formula' } }) as { uuid?: string; holds?: boolean; lane?: number }
  assert.equal(sent.lane, Number(ChatFormulas.lane(0, 1).value), 'the door takes the lane the formula names')
  for (const [name, params, expected] of [['lane', [0, 1], Number(ChatFormulas.lane(0, 1).value)], ['gossip', [8], 3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'chat', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `chat.${name} at ${uuid}`)
    uuidReceiptOf(`chat ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic(`${faces} lanes; lane(0, 1) = ${ChatFormulas.lane(0, 1).value}; 7 agents collide on ${ChatFormulas.collisions(7).value} pairs; gossip(8) = 3 rounds`)
})

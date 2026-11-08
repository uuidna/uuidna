import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EventsFormulas } from './index.js'
import '../../mcp/families.js'

test('events: attendance, capacity, revenue, costperattendee, engagement, noshow, satisfaction, conversion — crossing to tourism', async (t) => {
  assert.equal(EventsFormulas.attendance(90, 100).value, 90)
  assert.equal(EventsFormulas.capacity(450, 500).value, 90, 'the house nearly full')
  assert.equal(EventsFormulas.revenue(200, 50).value, 10000)
  assert.equal(EventsFormulas.costperattendee(10000, 200).value, 50)
  assert.equal(EventsFormulas.engagement(600, 200).value, 3, 'interactions per head')
  assert.equal(EventsFormulas.noshow(10, 100).value, 10)
  assert.equal(EventsFormulas.satisfaction(850, 200).value, 4)
  assert.equal(EventsFormulas.conversion(25, 100).value, 25)
  assert.equal(EventsFormulas.attendance(90, 100).dst, 'tourism')
  assert.equal(hexFamiliesOf().get('events')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'events', program: ['attendance'], params: [90, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `events.attendance at ${uuid}`)
  uuidReceiptOf('events attendance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; attendance 90, capacity 90, revenue 10000, costperattendee 50, engagement 3, noshow 10, satisfaction 4, conversion 25; crossing to tourism')
})

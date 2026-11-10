import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CalendarFormulas } from './index.js'
import '../../mcp/families.js'

test('calendar: daysinyear, leapcycle, weekcombos, monthorderings, intercalations, dayofweek, epochspan, cyclepermutations — crossing to statistics', async (t) => {
  assert.equal(CalendarFormulas.daysinyear(360, 5).value, 365)
  assert.equal(CalendarFormulas.leapcycle(100, 4).value, 25)
  assert.equal(CalendarFormulas.weekcombos(7, 2).value, 21)
  assert.equal(CalendarFormulas.monthorderings(6).value, 720)
  assert.equal(CalendarFormulas.intercalations(19, 7).value, 2)
  assert.equal(CalendarFormulas.dayofweek(365, 7).value, 1)
  assert.equal(CalendarFormulas.epochspan(2000, 1).value, 1999)
  assert.equal(CalendarFormulas.cyclepermutations(7, 3).value, 210)
  assert.equal(CalendarFormulas.daysinyear(360, 5).dst, 'statistics')
  assert.equal(hexFamiliesOf().get('calendar')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'calendar', program: ['daysinyear'], params: [360, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 365, `calendar.daysinyear at ${uuid}`)
  uuidReceiptOf('calendar daysinyear', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; daysinyear 365, leapcycle 25, weekcombos 21, monthorderings 720, intercalations 2, dayofweek 1, epochspan 1999, cyclepermutations 210; crossing to statistics')
})

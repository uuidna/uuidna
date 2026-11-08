import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { IncidenceFormulas } from './index.js'
import '../../mcp/families.js'

test('incidence: rate, cumulative, persontime, relativerisk, attributablerisk, oddsratio, riskdifference, standardized — crossing to epidemiology', async (t) => {
  assert.equal(IncidenceFormulas.rate(50, 100000).value, 50, 'fifty new cases per 100k')
  assert.equal(IncidenceFormulas.cumulative(25, 1000).value, 25)
  assert.equal(IncidenceFormulas.persontime(30, 10000).value, 30, 'thirty per 10k person-time')
  assert.equal(IncidenceFormulas.relativerisk(40, 10).value, 400, 'four times the risk')
  assert.equal(IncidenceFormulas.attributablerisk(40, 10).value, 75, 'three quarters attributable')
  assert.equal(IncidenceFormulas.oddsratio(200, 50).value, 400)
  assert.equal(IncidenceFormulas.riskdifference(40, 10).value, 30)
  assert.equal(IncidenceFormulas.standardized(120, 100).value, 120, 'twenty percent above expected')
  assert.equal(IncidenceFormulas.rate(50, 100000).dst, 'epidemiology')
  assert.equal(hexFamiliesOf().get('incidence')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'incidence', program: ['rate'], params: [50, 100000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `incidence.rate at ${uuid}`)
  uuidReceiptOf('incidence rate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rate 50, cumulative 25, persontime 30, relativerisk 400, attributablerisk 75, oddsratio 400, riskdifference 30, standardized 120; crossing to epidemiology')
})

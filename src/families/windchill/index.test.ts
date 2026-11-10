import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WindchillFormulas } from './index.js'
import '../../mcp/families.js'

test('windchill: index, apparenttemp, frostbitetime, heatindex, windfactor, exposurerisk, effectivetemp, gustadjust — crossing to meteorology', async (t) => {
  assert.equal(WindchillFormulas.index(50, 20).value, 40, 'the chill index')
  assert.equal(WindchillFormulas.apparenttemp(80, 50).value, 85)
  assert.equal(WindchillFormulas.frostbitetime(10, 15).value, 20, 'minutes to frostbite')
  assert.equal(WindchillFormulas.heatindex(90, 60).value, 95)
  assert.equal(WindchillFormulas.windfactor(20).value, 30, 'the wind\'s bite')
  assert.equal(WindchillFormulas.exposurerisk(5, 10).value, 1, 'at risk')
  assert.equal(WindchillFormulas.exposurerisk(20, 10).value, 0)
  assert.equal(WindchillFormulas.effectivetemp(50, 20, 40).value, 42)
  assert.equal(WindchillFormulas.gustadjust(20, 40).value, 30)
  assert.equal(WindchillFormulas.index(50, 20).dst, 'meteorology')
  assert.equal(hexFamiliesOf().get('windchill')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'windchill', program: ['gustadjust'], params: [20, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `windchill.gustadjust at ${uuid}`)
  uuidReceiptOf('windchill gustadjust', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; index 40, apparenttemp 85, frostbitetime 20, heatindex 95, windfactor 30, exposurerisk 1, effectivetemp 42, gustadjust 30; crossing to meteorology')
})

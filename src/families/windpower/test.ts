import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WindpowerFormulas } from './index.js'
import '../../mcp/families.js'

test('windpower: turbineoutput, sweptarea, capacityfactor, cutinspeed, ratedpower, tipspeedratio, farmoutput, availability — crossing to energy', async (t) => {
  assert.equal(WindpowerFormulas.turbineoutput(2, 1000).value, 2000)
  assert.equal(WindpowerFormulas.sweptarea(50, 50).value, 2500)
  assert.equal(WindpowerFormulas.capacityfactor(35, 100).value, 35)
  assert.equal(WindpowerFormulas.cutinspeed(3, 0).value, 3)
  assert.equal(WindpowerFormulas.ratedpower(3, 1000).value, 3000)
  assert.equal(WindpowerFormulas.tipspeedratio(70, 10).value, 7)
  assert.equal(WindpowerFormulas.farmoutput(20, 2000).value, 40000)
  assert.equal(WindpowerFormulas.availability(95, 100).value, 95)
  assert.equal(WindpowerFormulas.turbineoutput(2, 1000).dst, 'energy')
  assert.equal(hexFamiliesOf().get('windpower')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'windpower', program: ['turbineoutput'], params: [2, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2000, `windpower.turbineoutput at ${uuid}`)
  uuidReceiptOf('windpower turbineoutput', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turbineoutput 2000, sweptarea 2500, capacityfactor 35, cutinspeed 3, ratedpower 3000, tipspeedratio 7, farmoutput 40000, availability 95; crossing to energy')
})

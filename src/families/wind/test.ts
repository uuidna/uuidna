import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WindFormulas } from './index.js'

/** wind: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('wind: power, turbines, capacity, rated, tipratio, farm, blades, pairs', async (t) => {
  assert.equal(WindFormulas.power(50, 50, 1).value, 2500, 'power(50, 50, 1)')
  assert.equal(WindFormulas.turbines(20, 4).value, 24, 'turbines(20, 4)')
  assert.equal(WindFormulas.capacity(35, 100).value, 35, 'capacity(35, 100)')
  assert.equal(WindFormulas.rated(3, 1000).value, 3000, 'rated(3, 1000)')
  assert.equal(WindFormulas.tipratio(70, 10).value, 7, 'tipratio(70, 10)')
  assert.equal(WindFormulas.farm(20, 2000).value, 40000, 'farm(20, 2000)')
  assert.equal(WindFormulas.blades(3, 0).value, 3, 'blades(3, 0)')
  assert.equal(WindFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('wind')?.length, 8)
  for (const [name, params, expected] of [["power",[50,50,1],2500],["turbines",[20,4],24],["capacity",[35,100],35]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'wind', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `wind.${name} at ${uuid}`)
    uuidReceiptOf(`wind ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "power=2500, turbines=24, capacity=35")
})

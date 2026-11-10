import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TimbreFormulas } from './index.js'
import '../../mcp/families.js'

test('timbre: attacktime, brightness, formant, harmonicratio, inharmonicity, oddevenratio, rolloff, spectralcentroid — crossing to acoustics', async (t) => {
  assert.equal(TimbreFormulas.attacktime(441, 44100).value, 10, 'ten milliseconds of onset')
  assert.equal(TimbreFormulas.brightness(300, 1000).value, 30)
  assert.equal(TimbreFormulas.formant(2400, 80).value, 30, 'formant Q')
  assert.equal(TimbreFormulas.harmonicratio(800, 1000).value, 80)
  assert.equal(TimbreFormulas.inharmonicity(515, 500).value, 30, 'parts per thousand of drift')
  assert.equal(TimbreFormulas.oddevenratio(300, 200).value, 150)
  assert.equal(TimbreFormulas.rolloff(850, 1000).value, 85)
  assert.equal(TimbreFormulas.spectralcentroid(5000, 100).value, 50)
  assert.equal(TimbreFormulas.brightness(300, 1000).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('timbre')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'timbre', program: ['brightness'], params: [300, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `timbre.brightness at ${uuid}`)
  uuidReceiptOf('timbre brightness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; attacktime 10, brightness 30, formant 30, harmonicratio 80, inharmonicity 30, oddevenratio 150, rolloff 85, spectralcentroid 50; crossing to acoustics')
})

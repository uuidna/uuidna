import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OvertoneFormulas } from './index.js'
import '../../mcp/families.js'

test('overtone: harmonicfreq, harmonicnumber, partialamplitude, inharmonicity, seriessum, fundamentalfrom, spectralcentroid, harmoniccount — crossing to acoustics', async (t) => {
  assert.equal(OvertoneFormulas.harmonicfreq(440, 3).value, 1320, 'the third harmonic of A440')
  assert.equal(OvertoneFormulas.harmonicnumber(1320, 440).value, 3, 'which harmonic 1320 is')
  assert.equal(OvertoneFormulas.partialamplitude(1000, 4).value, 250)
  assert.equal(OvertoneFormulas.inharmonicity(1330, 1320).value, 10)
  assert.equal(OvertoneFormulas.seriessum(100, 4).value, 1000, 'first four harmonics summed')
  assert.equal(OvertoneFormulas.fundamentalfrom(1320, 3).value, 440, 'the fundamental read back')
  assert.equal(OvertoneFormulas.spectralcentroid(12000, 100).value, 120)
  assert.equal(OvertoneFormulas.harmoniccount(20000, 440).value, 45)
  assert.equal(OvertoneFormulas.harmonicfreq(440, 3).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('overtone')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'overtone', program: ['harmonicfreq'], params: [440, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1320, `overtone.harmonicfreq at ${uuid}`)
  uuidReceiptOf('overtone harmonicfreq', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; harmonicfreq 1320, harmonicnumber 3, partialamplitude 250, inharmonicity 10, seriessum 1000, fundamentalfrom 440, spectralcentroid 120, harmoniccount 45; crossing to acoustics')
})

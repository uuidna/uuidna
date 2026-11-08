import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SounddesignFormulas } from './index.js'
import '../../mcp/families.js'

test('sounddesign: layers, frequencybands, reverbms, mixpairs, dynamicrangedb, cuepoints, channelsubsets, loudnesslufs — crossing to acoustics', async (t) => {
  assert.equal(SounddesignFormulas.layers(12, 8).value, 20)
  assert.equal(SounddesignFormulas.frequencybands(20000, 1000).value, 20)
  assert.equal(SounddesignFormulas.reverbms(2000, 1).value, 2000)
  assert.equal(SounddesignFormulas.mixpairs(16, 2).value, 120)
  assert.equal(SounddesignFormulas.dynamicrangedb(96, 1).value, 96)
  assert.equal(SounddesignFormulas.cuepoints(40, 1).value, 40)
  assert.equal(SounddesignFormulas.channelsubsets(6).value, 64)
  assert.equal(SounddesignFormulas.loudnesslufs(23, 9).value, 14)
  assert.equal(SounddesignFormulas.layers(12, 8).dst, 'acoustics')
  assert.equal(hexFamiliesOf().get('sounddesign')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sounddesign', program: ['layers'], params: [12, 8] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `sounddesign.layers at ${uuid}`)
  uuidReceiptOf('sounddesign layers', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; layers 20, frequencybands 20, reverbms 2000, mixpairs 120, dynamicrangedb 96, cuepoints 40, channelsubsets 64, loudnesslufs 14; crossing to acoustics')
})

import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TuneFormulas } from './index.js'

/** A432 derived from the lattice starts the chain: the string harmonics, the octave fractal, the fifths that spiral —
 *  each wavelength a formula crossing the fractal, each a hex address. */
test('tune: A432 from the lattice seeds the harmonic fractal — string modes, octaves, fifths, wavelengths', async (t) => {
  assert.equal(TuneFormulas.fundamental().value, 432, 'A432 = 2^hexbit · (plane − seed), from the lattice')
  assert.equal(TuneFormulas.fundamental().holds, true)
  assert.equal(TuneFormulas.harmonic(1).value, 432, 'the first mode is the fundamental')
  assert.equal(TuneFormulas.harmonic(3).value, 1296, 'the third harmonic, 3·432')
  assert.equal(TuneFormulas.octave(1).value, 864, 'one octave up doubles')
  assert.equal(TuneFormulas.octave(4).value, 432 * 16, 'four octaves: ·16, the fractal self-similar')
  assert.equal(TuneFormulas.wavelength(432).value, Math.round(343000 / 432), 'the wave is ~794 mm long')
  assert.equal(TuneFormulas.fifth(0).value, 432, 'zero fifths is the fundamental')
  assert.equal(TuneFormulas.fifth(1).value, 648, 'a perfect fifth above 432 is 648 (3/2)')
  assert.equal(TuneFormulas.cents(3, 2).value, 702, 'a just fifth is 702 cents')
  assert.equal(TuneFormulas.cents(2, 1).value, 1200, 'an octave is 1200 cents')
  assert.equal(TuneFormulas.fractal(8).value, 4, 'eight harmonics span four octave bands')
  assert.equal(hexFamiliesOf().get('tune')?.length, 7)
  for (const [name, params, expected] of [['fundamental', [], 432], ['harmonic', [3], 1296], ['octave', [4], 6912]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'tune', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `tune.${name} at ${uuid}`)
    uuidReceiptOf(`tune ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('7 formulas; A432 = 16·27 from the lattice; harmonics n·432, octaves ·2^k, fifth 648, octave 1200 cents, fractal depth ⌊log₂ n⌋+1')
})

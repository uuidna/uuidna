import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FractalFormulas } from './index.js'
import '../../mcp/families.js'

test('fractal: boxcount, dimensionscaled, hausdorffscaled, iterationdepth, perimetergrowth, piececount, scaleratio, selfsimilarity — crossing to topology', async (t) => {
  assert.equal(FractalFormulas.boxcount(2, 3).value, 8, 'eight boxes')
  assert.equal(FractalFormulas.dimensionscaled(2, 3).value, 666)
  assert.equal(FractalFormulas.hausdorffscaled(3, 2).value, 1500)
  assert.equal(FractalFormulas.iterationdepth(2, 3).value, 15, 'nodes of a binary tree to depth three')
  assert.equal(FractalFormulas.perimetergrowth(3, 2).value, 48)
  assert.equal(FractalFormulas.piececount(3, 4).value, 81, 'Sierpinski pieces after four iterations')
  assert.equal(FractalFormulas.scaleratio(100, 4).value, 25)
  assert.equal(FractalFormulas.scaleratio(100, 0).value, 0)
  assert.equal(FractalFormulas.selfsimilarity(5, 3).value, 15)
  assert.equal(FractalFormulas.piececount(3, 4).dst, 'topology')
  assert.equal(hexFamiliesOf().get('fractal')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fractal', program: ['piececount'], params: [3, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 81, `fractal.piececount at ${uuid}`)
  uuidReceiptOf('fractal piececount', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; boxcount 8, dimensionscaled 666, hausdorffscaled 1500, iterationdepth 15, perimetergrowth 48, piececount 81, scaleratio 25, selfsimilarity 15; crossing to topology')
})

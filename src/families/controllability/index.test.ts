import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ControllabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('controllability: matrixrank, reachablestates, controllabilitymatrix, degree, inputcoupling, statedimension, gramiantrace, modescontrolled — crossing to control', async (t) => {
  assert.equal(ControllabilityFormulas.matrixrank(4, 6).value, 4, 'rank at most the smaller dimension')
  assert.equal(ControllabilityFormulas.reachablestates(8, 3).value, 5)
  assert.equal(ControllabilityFormulas.controllabilitymatrix(5, 2).value, 10, 'states · inputs columns')
  assert.equal(ControllabilityFormulas.degree(10, 3).value, 4, 'controllability index')
  assert.equal(ControllabilityFormulas.inputcoupling(3, 7).value, 21)
  assert.equal(ControllabilityFormulas.statedimension(6, 9).value, 15)
  assert.equal(ControllabilityFormulas.gramiantrace(4, 12).value, 48)
  assert.equal(ControllabilityFormulas.modescontrolled(10, 3).value, 7, 'modes the inputs reach')
  assert.equal(ControllabilityFormulas.modescontrolled(3, 5).value, 0)
  assert.equal(ControllabilityFormulas.controllabilitymatrix(5, 2).dst, 'control')
  assert.equal(hexFamiliesOf().get('controllability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'controllability', program: ['controllabilitymatrix'], params: [5, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `controllability.controllabilitymatrix at ${uuid}`)
  uuidReceiptOf('controllability controllabilitymatrix', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; matrixrank 4, reachablestates 5, controllabilitymatrix 10, degree 4, inputcoupling 21, statedimension 15, gramiantrace 48, modescontrolled 7; crossing to control')
})

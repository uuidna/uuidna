import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SurveyFormulas } from './index.js'

/** survey: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('survey: bearings, stations, arcseconds, traverse, gridcells, area, angles, combos', async (t) => {
  assert.equal(SurveyFormulas.bearings(360, 1).value, 360, 'bearings(360, 1)')
  assert.equal(SurveyFormulas.stations(12, 8).value, 20, 'stations(12, 8)')
  assert.equal(SurveyFormulas.arcseconds(60, 60).value, 3600, 'arcseconds(60, 60)')
  assert.equal(SurveyFormulas.traverse(100, 5).value, 500, 'traverse(100, 5)')
  assert.equal(SurveyFormulas.gridcells(16, 16).value, 256, 'gridcells(16, 16)')
  assert.equal(SurveyFormulas.area(100, 50).value, 5000, 'area(100, 50)')
  assert.equal(SurveyFormulas.angles(60, 60, 60).value, 180, 'angles(60, 60, 60)')
  assert.equal(SurveyFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('survey')?.length, 8)
  for (const [name, params, expected] of [["bearings",[360,1],360],["stations",[12,8],20],["arcseconds",[60,60],3600]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'survey', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `survey.${name} at ${uuid}`)
    uuidReceiptOf(`survey ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "bearings=360, stations=20, arcseconds=3600")
})

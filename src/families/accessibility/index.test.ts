import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AccessibilityFormulas } from './index.js'
import '../../mcp/families.js'

test('accessibility: contrastratio, taptarget, textscale, wcagscore, altcoverage, focusorder, aria, readinglevel — crossing to frontend', async (t) => {
  assert.equal(AccessibilityFormulas.contrastratio(95, 5).value, 1000, 'contrast 10.00 against paper')
  assert.equal(AccessibilityFormulas.taptarget(48, 44).value, 1, 'a 48px control meets the 44px minimum')
  assert.equal(AccessibilityFormulas.taptarget(40, 44).value, 0)
  assert.equal(AccessibilityFormulas.textscale(16, 150).value, 24, '16px at 150%')
  assert.equal(AccessibilityFormulas.wcagscore(45, 50).value, 90)
  assert.equal(AccessibilityFormulas.altcoverage(80, 100).value, 80)
  assert.equal(AccessibilityFormulas.focusorder(100, 12).value, 9, 'nine rows for the tab order')
  assert.equal(AccessibilityFormulas.aria(90, 120).value, 75)
  assert.equal(AccessibilityFormulas.readinglevel(1200, 100).value, 12, 'twelfth-grade passage')
  assert.equal(AccessibilityFormulas.contrastratio(95, 5).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('accessibility')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'accessibility', program: ['focusorder'], params: [100, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 9, `accessibility.focusorder at ${uuid}`)
  uuidReceiptOf('accessibility focusorder', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; contrastratio 1000, taptarget 1, textscale 24, wcagscore 90, altcoverage 80, focusorder 9, aria 75, readinglevel 12; crossing to frontend')
})

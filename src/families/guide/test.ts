import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GuideFormulas } from './index.js'
import '../../mcp/families.js'

/** The public onboarding reads the live registry: the menu, a family's formulas, a runnable example, the ways in. */
test('guide: the menu, a family listing, a runnable example, and the ways in — from the live registry', async (t) => {
  const fams = (GuideFormulas.families()) as unknown as { value: number; families: string[]; run: string }
  assert.ok(fams.value > 50 && fams.families.length === fams.value, 'the menu lists every runnable family')
  assert.match(fams.run, /hex/, 'the menu shows how to run one')

  const forms = (GuideFormulas.formulas(0)) as unknown as { value: number; family: string; formulas: string[] }
  assert.ok(forms.value > 0 && forms.formulas.length === forms.value, 'a family lists its formulas with arities')

  const ex = (GuideFormulas.example(0)) as unknown as { value: number; holds: boolean; family: string; call: string; hex: string; result?: number }
  assert.equal(ex.holds, true, 'an example is produced')
  assert.match(ex.call, /^hex \{ family: '/, 'the example is a copy-paste call')
  assert.match(ex.hex, /^[0-9a-f-]{36}$/, 'the example carries its hex address')

  const ways = (GuideFormulas.ways()) as unknown as { value: number; ways: string[] }
  assert.ok(ways.value >= 5 && ways.ways.length === ways.value, 'every entry point is named')
  assert.ok(ways.ways.some((w) => w.includes('ask')), 'the chat entry point is named')

  assert.equal((GuideFormulas.families() as unknown as { dst: string }).dst, 'cross')
  assert.equal(hexFamiliesOf().get('guide')?.length, 4)
  const uuid = qpuHexUuidOf({ family: 'guide', program: ['formulas'], params: [0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), forms.value, `guide.formulas at ${uuid}`)
  uuidReceiptOf('guide formulas', contentUuidOf(run), { uuid })
  t.diagnostic(`4 formulas; ${fams.value} families on the menu; example(0): ${ex.call}; ${ways.value} ways in`)
})

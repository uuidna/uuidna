import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LocaleFormulas } from './index.js'
import '../../mcp/families.js'

test('locale: coverage, fallback, locales, fields, words, rtl, complete, storage — crossing to payload', async (t) => {
  assert.equal(LocaleFormulas.coverage(750, 1000).value, 75)
  assert.equal(LocaleFormulas.fallback(250, 1000).value, 25)
  assert.equal(LocaleFormulas.locales(7).value, 7, 'seven locales configured')
  assert.equal(LocaleFormulas.fields(12, 40).value, 30)
  assert.equal(LocaleFormulas.words(5000, 1200).value, 3800, 'words still to translate')
  assert.equal(LocaleFormulas.words(1200, 5000).value, 0, 'never negative')
  assert.equal(LocaleFormulas.rtl(2, 8).value, 25)
  assert.equal(LocaleFormulas.complete(6, 8).value, 75)
  assert.equal(LocaleFormulas.storage(40, 7).value, 280)
  assert.equal(LocaleFormulas.coverage(750, 1000).dst, 'payload')
  assert.equal(hexFamiliesOf().get('locale')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'locale', program: ['storage'], params: [40, 7] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 280, `locale.storage at ${uuid}`)
  uuidReceiptOf('locale storage', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 75, fallback 25, locales 7, fields 30, words 3800, rtl 25, complete 75, storage 280; crossing to payload')
})

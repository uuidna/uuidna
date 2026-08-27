// page-metrics — pure compute for page-local advantage figures (no UI card embeds).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import {
  pageAdvantageMetrics,
  costBarOf,
} from '../quantum/advantage/page/metrics/index.js'
import { decadeOf } from '../measurement.js'
import { theorems } from '../theorems/index.js'
import { handleOf } from '../handle.js'

const hbPath = join(ROOT, 'lean/heartbeats.json')
const costs: Record<string, number> = existsSync(hbPath)
  ? ((JSON.parse(readFileSync(hbPath, 'utf8')) as { costs?: Record<string, number> }).costs ?? {})
  : {}

test('decadeOf is exact integer order-of-magnitude', () => {
  assert.equal(decadeOf(13), 1)
  assert.equal(decadeOf(97467), 4)
  assert.equal(decadeOf(9), 0)
  assert.equal(decadeOf(0), 0)
})

test('costBarOf scales against max without float log', () => {
  assert.equal(costBarOf(50, 100), 50)
  assert.ok(costBarOf(1, 100) >= 3)
  assert.equal(costBarOf(0, 100), 0)
})

test('two different theorems produce different page metrics', () => {
  const T = theorems()
  const ranked = T
    .map((t) => ({ t, hb: costs[t.address] ?? 0 }))
    .filter((x) => x.hb > 0)
    .sort((a, b) => b.hb - a.hb)
  assert.ok(ranked.length >= 2, 'need measured heartbeats for two theorems')
  const a = ranked[0]
  const b = ranked[ranked.length - 1]
  assert.notEqual(a.t.address, b.t.address)
  assert.notEqual(a.hb, b.hb, 'pick cost extremes so metrics cannot collide')

  const maxHb = ranked[0].hb
  const ma = pageAdvantageMetrics({
    address: a.t.address,
    key: a.t.key,
    objectKind: 'theorem',
    heartbeats: a.hb,
    maxHeartbeats: maxHb,
    depositReferrer: `https://uuidna.com/${handleOf(a.t.address)}`,
  })
  const mb = pageAdvantageMetrics({
    address: b.t.address,
    key: b.t.key,
    objectKind: 'theorem',
    heartbeats: b.hb,
    maxHeartbeats: maxHb,
    depositReferrer: `https://uuidna.com/${handleOf(b.t.address)}`,
  })

  assert.notEqual(ma.handle, mb.handle, 'handles differ')
  assert.notEqual(ma.heartbeats, mb.heartbeats, 'heartbeats differ')
  assert.notEqual(ma.pageReceipt, mb.pageReceipt, 'page receipts differ')
  assert.notEqual(ma.pageHandle, mb.pageHandle, 'page receipt handles differ')
  assert.notEqual(ma.depositReferrer, mb.depositReferrer, 'deposit referrers differ')
  assert.ok(
    ma.heartbeatDecade !== mb.heartbeatDecade || ma.costBar !== mb.costBar,
    'cost decade or relative bar must differ at extremes',
  )
})

test('static QA card HTML and QaMetrics Vue are gone from the theme/render path', () => {
  assert.ok(!existsSync(join(ROOT, 'src/quantum/advantage/card/html/index.ts')))
  assert.ok(!existsSync(join(ROOT, 'docs/.vitepress/theme/QaMetrics.vue')))
  const render = readFileSync(join(ROOT, 'src/render.ts'), 'utf8')
  assert.doesNotMatch(render, /quantumAdvantageCardHtml/)
})

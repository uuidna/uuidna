import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FunnelFormulas } from './index.js'
import '../../mcp/families.js'

test('funnel: conversion, dropoff, steprate, velocity, bottleneck, value, abandonment, throughput — crossing to analytics', async (t) => {
  assert.equal(FunnelFormulas.conversion(250, 1000).value, 25, 'a quarter convert')
  assert.equal(FunnelFormulas.dropoff(300, 1000).value, 30)
  assert.equal(FunnelFormulas.steprate(900, 1000).value, 90, 'step pass rate')
  assert.equal(FunnelFormulas.velocity(600, 30).value, 20, 'conversions per day')
  assert.equal(FunnelFormulas.bottleneck(450, 1000).value, 45)
  assert.equal(FunnelFormulas.value(10000, 50).value, 200, 'revenue per conversion')
  assert.equal(FunnelFormulas.abandonment(700, 1000).value, 70)
  assert.equal(FunnelFormulas.throughput(480, 8).value, 60, 'completed per hour')
  assert.equal(FunnelFormulas.conversion(250, 1000).dst, 'analytics')
  assert.equal(hexFamiliesOf().get('funnel')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'funnel', program: ['conversion'], params: [250, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `funnel.conversion at ${uuid}`)
  uuidReceiptOf('funnel conversion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; conversion 25, dropoff 30, steprate 90, velocity 20, bottleneck 45, value 200, abandonment 70, throughput 60; crossing to analytics')
})

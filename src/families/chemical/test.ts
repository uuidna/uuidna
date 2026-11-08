import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChemicalFormulas } from './index.js'
import '../../mcp/families.js'

test('chemical: conversion, heattransfer, masstransfer, output, pressuredrop, reflux, residence, selectivity — crossing to chemistry', async (t) => {
  assert.equal(ChemicalFormulas.conversion(80, 100).value, 80, 'four fifths of the feed reacts')
  assert.equal(ChemicalFormulas.heattransfer(50, 20).value, 1000)
  assert.equal(ChemicalFormulas.masstransfer(30, 4).value, 120)
  assert.equal(ChemicalFormulas.output(90, 100).value, 90, 'yield against the theoretical')
  assert.equal(ChemicalFormulas.pressuredrop(200, 150).value, 50)
  assert.equal(ChemicalFormulas.pressuredrop(100, 150).value, 0, 'never below zero')
  assert.equal(ChemicalFormulas.reflux(300, 100).value, 300)
  assert.equal(ChemicalFormulas.residence(1000, 50).value, 20)
  assert.equal(ChemicalFormulas.selectivity(75, 100).value, 75)
  assert.equal(ChemicalFormulas.conversion(80, 100).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('chemical')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chemical', program: ['residence'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `chemical.residence at ${uuid}`)
  uuidReceiptOf('chemical residence', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; conversion 80, heattransfer 1000, masstransfer 120, output 90, pressuredrop 50, reflux 300, residence 20, selectivity 75; crossing to chemistry')
})

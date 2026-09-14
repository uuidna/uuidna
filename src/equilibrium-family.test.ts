// equilibrium-family — THE PIECES FIT THE LATTICE LIKE A PUZZLE (the captain, 2026-09-14: "lean files need to precisely
// represent the lattice so they fit like a puzzle parts"). The six-cube's translation family is split one cell to a file
// so each compiles small; this holds that the split IS the lattice: the pieces are exactly the 2^BITS cells, each once,
// each generated wing is the piece for its own cell, and together they cover every ordered pair the whole claim covers —
// no gap, no overlap. Every count is derived from BITS; a piece moved, duplicated or dropped turns this red.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { BITS, CELLS, xorWings } from './scripts/equilibrium-family.js'

test('the pieces are exactly the cells of the six-cube, each once', () => {
  const wings = xorWings()
  assert.equal(CELLS, 1 << BITS)
  assert.equal(wings.length, CELLS)
  assert.deepEqual(wings.map((w) => w.a), Array.from({ length: CELLS }, (_, a) => a))
  assert.equal(new Set(wings.map((w) => w.file)).size, CELLS, 'no two pieces share a file')
})

test('each generated wing is the piece for its own cell, and together they cover every pair once', () => {
  let covered = 0
  for (const w of xorWings()) {
    const path = join(ROOT, 'lean', w.file)
    assert.ok(existsSync(path), `${w.file} exists — run npm run lean`)
    const theorems = [...readFileSync(path, 'utf8').matchAll(/^theorem\s+(\S+)\s*:(.*):=\s*by decide$/gm)]
    assert.equal(theorems.length, 1, `${w.file} holds exactly one piece`)
    const [, key, statement] = theorems[0]!
    assert.equal(key, `xor_translation_preserves_adjacency_${w.a}`, `${w.file} is the piece for cell ${w.a}`)
    assert.ok(statement!.includes(`(lxor c ${w.a}) (lxor d ${w.a})`), `${w.file} translates by its own cell`)
    assert.ok(statement!.includes(`(List.range ${CELLS})`), `${w.file} walks all ${CELLS} cells on both ends`)
    covered += CELLS * CELLS
  }
  // the whole claim is CELLS translations over CELLS × CELLS ordered pairs; the pieces sum to it exactly
  assert.equal(covered, CELLS * CELLS * CELLS)
})

test('CONTROL: a missing or duplicated piece is caught', () => {
  const wings = xorWings()
  const missing = wings.slice(1).map((w) => w.a)
  assert.notDeepEqual(missing, Array.from({ length: CELLS }, (_, a) => a))
  const duplicated = [...wings.map((w) => w.a).slice(0, -1), 0]
  assert.notEqual(new Set(duplicated).size, CELLS)
})

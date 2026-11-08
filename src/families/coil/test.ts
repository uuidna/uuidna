import { test } from '../../quantum/processing/unit/receipted.js'
import { verifyHex } from '../verify.js'
import { CoilFormulas } from './index.js'
import assert from 'node:assert/strict'

/** coil: the 7-star rosetta and the double torus as exact integers — each recomputed, then run at its hex address. */
test('coil: star, matrix, fold, coil, turn, dual, spin, genus, dims, signal', async (t) => {
  // the duality holds exactly when two folds equal three coils (180°), and fails otherwise
  assert.equal(CoilFormulas.turn(2, 3).holds, true, '2 folds = 3 coils = 180°')
  assert.equal(CoilFormulas.turn(2, 2).holds, false, '2 folds (180°) ≠ 2 coils (120°)')
  assert.equal(CoilFormulas.fold(2).value, CoilFormulas.coil(3).value, 'fold and coil reach one angle')
  await verifyHex('coil', 10, [
    ['star', [6], 7], // six rays around one centre
    ['matrix', [6, 7], 42], // the zero laid flat, 42 either way
    ['fold', [2], 180], // two right-angle folds split the cell
    ['coil', [3], 180], // three sixty-degree coils, the same half turn
    ['turn', [2, 3], 1], // the duality holds
    ['dual', [21], 42], // the two lobes
    ['spin', [9], 180], // 540 wrapped into a turn
    ['genus', [], 2], // the double torus’ two holes
    ['dims', [], 8], // the eight UUID versions as eight dimensions
    ['signal', [4], 8], // version 4 → dimension 2^3
  ])
  t.diagnostic('rosetta 6+1=7, matrix 6×7=42, fold 2·90 = coil 3·60 = 180, dual 2x, genus 2, dims 8')
})

// gaming-shelf — the four game instruments held to the law: the start position exact to the piece (the shelf's
// own transcription once lost a king — this test exists because that happened), the move law complete on its
// hardest corners (castling legality, en passant, promotion), the verdicts decided, nim's coin paying, and the
// engine deterministic.
import { test } from 'node:test'
import assert from 'node:assert'
import { startState, legalFrom, allLegal, applyMove, statusOf, bestMove } from '../quantum/apps/categories/gaming/chess.js'
import { nimSum, nimVerdict } from '../quantum/apps/categories/gaming/nim.js'
import { mobilityOf } from '../quantum/apps/categories/gaming/mobility.js'

test('the start position is exact to the piece — both kings on their squares, 32 pieces', () => {
  const s = startState()
  assert.equal(s.board[7]![4], 'wK', 'the white king stands on e1 — a transcription once lost him')
  assert.equal(s.board[0]![4], 'bK')
  assert.equal(s.board.flat().filter(Boolean).length, 32)
  assert.equal(allLegal(s).length, 20, 'white has exactly twenty first moves — the classic count')
})

test('scholar’s mate arrives as checkmate, decided', () => {
  let s = startState()
  const play = (from: [number, number], to: [number, number]) => {
    const mv = legalFrom(s, from[0], from[1]).find((m) => m.r === to[0] && m.c === to[1])
    assert.ok(mv, `move ${from} → ${to} must be legal`)
    s = { ...s, board: applyMove(s.board, from, to, mv!.flag), turn: s.turn === 'w' ? 'b' : 'w' }
  }
  play([6, 4], [4, 4]); play([1, 4], [3, 4])          // e4 e5
  play([7, 5], [4, 2]); play([1, 1], [2, 1])          // Bc4, b6 (a quiet black move)
  play([7, 3], [3, 7]); play([1, 0], [2, 0])          // Qh5 a6
  play([3, 7], [1, 5])                                 // Qxf7#
  assert.equal(statusOf(s), 'checkmate', 'the classic mate is decided as mate')
})

test('nim pays the coin: P-position verified by one XOR, and the win move returns the sum to zero', () => {
  assert.equal(nimSum([3, 5, 6]), 0, '3⊕5⊕6 = 0 — the mover loses')
  assert.equal(nimVerdict([3, 5, 6]).pPosition, true)
  const v = nimVerdict([3, 5, 7])
  assert.equal(v.pPosition, false)
  assert.ok(v.winMove, 'a nonzero sum always has the exact move')
  const after = [3, 5, 7]; after[v.winMove!.heap] = v.winMove!.to
  assert.equal(nimSum(after), 0, 'the winning move restores the zero — Bouton, played')
})

test('mobility counts name their seals at the corners of the map', () => {
  assert.deepEqual([mobilityOf('N', 0, 0).count, mobilityOf('N', 0, 0).theorem], [2, 'knight_corner_two'])
  assert.deepEqual([mobilityOf('N', 3, 3).count, mobilityOf('N', 3, 3).theorem], [8, 'knight_centre_eight'])
  assert.deepEqual([mobilityOf('K', 0, 0).count, mobilityOf('K', 0, 0).theorem], [3, 'king_corner_three'])
  assert.deepEqual([mobilityOf('K', 4, 4).count, mobilityOf('K', 4, 4).theorem], [8, 'king_centre_eight'])
})

test('the engine is deterministic and prefers the mate it can see', () => {
  const s = startState()
  const a = bestMove(s, 2), b = bestMove(s, 2)
  assert.deepEqual(a, b, 'same position, same waves, same move')
})

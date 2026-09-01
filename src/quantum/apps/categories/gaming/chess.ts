// categories/gaming/chess — THE COMPLETE OFFLINE CHESS, its law extracted pure (lead 79: the games move to the
// shelf; the shell keeps only reactivity and paint). Everything the Vue component proved in play is here as
// board-parameterized functions: full legal-move generation (pawn double-step, en passant, promotion, castling
// with all its conditions), check / checkmate / stalemate, and the material alpha-beta engine ("waves" = plies).
// Determinism-law clean: the shell's builtin max/min helpers became ternaries and its unbounded sentinels explicit integer bounds —
// the same values, the lattice's discipline. complete rules and a shallow material engine — real
// chess, NOT a strong engine and NOT a solved game; the engine sees material and mate, enough to let chess play
// chess. The search approximates castling/ep by the root state's rights (the shell's own documented light-AI
// simplification, now explicit in the signature).
export type Color = 'w' | 'b'
export interface Castling { wK: boolean; wQ: boolean; bK: boolean; bQ: boolean }
export interface ChessState { board: string[][]; turn: Color; castling: Castling; ep: [number, number] | null }
export interface Move { from: [number, number]; to: [number, number]; flag: string | null }
export interface Target { r: number; c: number; flag: string | null }

const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]] as const
const KING = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]] as const
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]] as const
const ORTHO = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const
const WIN = 1000000            // mate value; ±(WIN + depth) prefers the faster mate
const BOUND = 1000000000       // the explicit alpha-beta bounds where the shell said Infinity

export const startState = (): ChessState => ({
  board: [
    ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
    ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
    ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
  ],
  turn: 'w',
  castling: { wK: true, wQ: true, bK: true, bQ: true },
  ep: null,
})

const col = (p: string): string => (p ? p[0]! : '')
const typ = (p: string): string => (p ? p[1]! : '')
const inside = (r: number, c: number): boolean => r >= 0 && r < 8 && c >= 0 && c < 8

export function attacked(board: string[][], r: number, c: number, by: Color): boolean {
  for (const dc of [-1, 1]) { const pr = r + (by === 'w' ? 1 : -1), pc = c + dc; if (inside(pr, pc) && board[pr]![pc] === by + 'P') return true }
  for (const [dr, dc] of KN) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && board[nr]![nc] === by + 'N') return true }
  for (const [dr, dc] of KING) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && board[nr]![nc] === by + 'K') return true }
  for (const [dr, dc] of DIAG) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const p = board[nr]![nc]!; if (p) { if (col(p) === by && (typ(p) === 'B' || typ(p) === 'Q')) return true; break } nr += dr; nc += dc } }
  for (const [dr, dc] of ORTHO) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const p = board[nr]![nc]!; if (p) { if (col(p) === by && (typ(p) === 'R' || typ(p) === 'Q')) return true; break } nr += dr; nc += dc } }
  return false
}

export function kingPos(board: string[][], c: Color): [number, number] | null {
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) if (board[r]![f] === c + 'K') return [r, f]
  return null
}
export function inCheck(board: string[][], c: Color): boolean {
  const k = kingPos(board, c)
  return k ? attacked(board, k[0], k[1], c === 'w' ? 'b' : 'w') : false
}

export function pseudo(board: string[][], r: number, c: number, castling: Castling, ep: [number, number] | null): Target[] {
  const p = board[r]![c]!; if (!p) return []
  const me = col(p) as Color, t = typ(p), enemy: Color = me === 'w' ? 'b' : 'w'
  const out: Target[] = []
  const add = (nr: number, nc: number, flag?: string): void => { out.push({ r: nr, c: nc, flag: flag ?? null }) }
  if (t === 'P') {
    const dir = me === 'w' ? -1 : 1, home = me === 'w' ? 6 : 1, promo = me === 'w' ? 0 : 7
    if (inside(r + dir, c) && !board[r + dir]![c]) {
      add(r + dir, c, r + dir === promo ? 'promo' : undefined)
      if (r === home && !board[r + 2 * dir]![c]) add(r + 2 * dir, c, 'double')
    }
    for (const dc of [-1, 1]) {
      const nr = r + dir, nc = c + dc
      if (!inside(nr, nc)) continue
      if (board[nr]![nc] && col(board[nr]![nc]!) === enemy) add(nr, nc, nr === promo ? 'promo' : undefined)
      else if (ep && ep[0] === nr && ep[1] === nc) add(nr, nc, 'ep')
    }
  } else if (t === 'N') {
    for (const [dr, dc] of KN) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && col(board[nr]![nc]!) !== me) add(nr, nc) }
  } else if (t === 'K') {
    for (const [dr, dc] of KING) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && col(board[nr]![nc]!) !== me) add(nr, nc) }
    const rank = me === 'w' ? 7 : 0
    if (r === rank && c === 4 && !attacked(board, rank, 4, enemy)) {
      if (castling[(me + 'K') as keyof Castling] && !board[rank]![5] && !board[rank]![6] && board[rank]![7] === me + 'R' && !attacked(board, rank, 5, enemy) && !attacked(board, rank, 6, enemy)) add(rank, 6, 'castleK')
      if (castling[(me + 'Q') as keyof Castling] && !board[rank]![3] && !board[rank]![2] && !board[rank]![1] && board[rank]![0] === me + 'R' && !attacked(board, rank, 3, enemy) && !attacked(board, rank, 2, enemy)) add(rank, 2, 'castleQ')
    }
  } else {
    const dirs = t === 'B' ? DIAG : t === 'R' ? ORTHO : ([...DIAG, ...ORTHO] as const)
    for (const [dr, dc] of dirs) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const q = board[nr]![nc]!; if (!q) add(nr, nc); else { if (col(q) !== me) add(nr, nc); break } nr += dr; nc += dc } }
  }
  return out
}

export function applyMove(board: string[][], from: [number, number], to: [number, number], flag: string | null): string[][] {
  const nb = board.map((row) => row.slice())
  const r0 = from[0] | 0, c0 = from[1] | 0, r1 = to[0] | 0, c1 = to[1] | 0
  if (!inside(r0, c0) || !inside(r1, c1)) return nb
  const p = nb[r0]![c0]!, me = col(p)
  nb[r0]![c0] = ''
  if (flag === 'ep' && inside(r0, c1)) nb[r0]![c1] = ''
  nb[r1]![c1] = flag === 'promo' ? me + 'Q' : p
  if (flag === 'castleK') { nb[r1]![5] = nb[r1]![7]!; nb[r1]![7] = '' }
  if (flag === 'castleQ') { nb[r1]![3] = nb[r1]![0]!; nb[r1]![0] = '' }
  return nb
}

export function legalFrom(s: ChessState, r: number, c: number): Target[] {
  const p = s.board[r]![c]!; if (!p || col(p) !== s.turn) return []
  return pseudo(s.board, r, c, s.castling, s.ep).filter((m) => !inCheck(applyMove(s.board, [r, c], [m.r, m.c], m.flag), col(p) as Color))
}

export function allLegal(s: ChessState): Move[] {
  const out: Move[] = []
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (col(s.board[r]![c]!) === s.turn)
    for (const m of legalFrom(s, r, c)) out.push({ from: [r, c], to: [m.r, m.c], flag: m.flag })
  return out
}

/** '' | 'check' | 'checkmate' | 'stalemate' — the whole verdict of a position, decided. */
export function statusOf(s: ChessState): string {
  const chk = inCheck(s.board, s.turn), any = allLegal(s).length > 0
  return !any ? (chk ? 'checkmate' : 'stalemate') : (chk ? 'check' : '')
}

const VAL: Record<string, number> = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 }
export function evaluate(board: string[][]): number {
  let sc = 0
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) { const p = board[r]![c]!; if (p) sc += (col(p) === 'w' ? 1 : -1) * VAL[typ(p)]! }
  return sc
}

function search(board: string[][], turn: Color, depth: number, alpha: number, beta: number, castling: Castling, ep: [number, number] | null): number {
  if (depth <= 0) return evaluate(board)
  const s: ChessState = { board, turn, castling, ep }
  const moves = allLegal(s)
  if (!moves.length) return inCheck(board, turn) ? (turn === 'w' ? -WIN - depth : WIN + depth) : 0
  if (turn === 'w') {
    let v = -BOUND
    for (const m of moves) {
      const sc = search(applyMove(board, m.from, m.to, m.flag), 'b', depth - 1, alpha, beta, castling, ep)
      v = sc > v ? sc : v
      alpha = v > alpha ? v : alpha
      if (beta <= alpha) break
    }
    return v
  }
  let v = BOUND
  for (const m of moves) {
    const sc = search(applyMove(board, m.from, m.to, m.flag), 'w', depth - 1, alpha, beta, castling, ep)
    v = sc < v ? sc : v
    beta = v < beta ? v : beta
    if (beta <= alpha) break
  }
  return v
}

/** the engine's move at the given depth ("waves") — deterministic: first best in scan order. */
export function bestMove(s: ChessState, depth: number): Move | null {
  const moves = allLegal(s)
  if (!moves.length) return null
  let best: Move | null = null
  let bestScore = s.turn === 'w' ? -BOUND : BOUND
  for (const m of moves) {
    const sc = search(applyMove(s.board, m.from, m.to, m.flag), s.turn === 'w' ? 'b' : 'w', depth - 1, -BOUND, BOUND, s.castling, s.ep)
    if (s.turn === 'w' ? sc > bestScore : sc < bestScore) { bestScore = sc; best = m }
  }
  return best
}

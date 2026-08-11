<!-- Chess — a complete, correct, offline chess. Full legal-move generation (pawn double-step, en passant, promotion,
     castling with all its conditions), check / checkmate / stalemate detection, hot-seat two-player. Pure client-side
     JS — no engine dependency, works offline (the PWA caches it). Online multiplayer would need the real-time
     backend; this is the complete OFFLINE game. Nothing is sent or stored. -->
<script setup>
import { reactive, computed } from 'vue'

const GLYPH = { wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙', bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟' }
const KN = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]]
const KING = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]]
const ORTHO = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const startBoard = () => [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
]

const s = reactive({
  board: startBoard(),
  turn: 'w',
  selected: null,
  legal: [],
  castling: { wK: true, wQ: true, bK: true, bQ: true },
  ep: null,
  status: '',
  promo: null,
  last: null,
})

const col = (p) => (p ? p[0] : '')
const typ = (p) => (p ? p[1] : '')
const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8

function attacked(board, r, c, by) {
  for (const dc of [-1, 1]) { const pr = r + (by === 'w' ? 1 : -1), pc = c + dc; if (inside(pr, pc) && board[pr][pc] === by + 'P') return true }
  for (const [dr, dc] of KN) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && board[nr][nc] === by + 'N') return true }
  for (const [dr, dc] of KING) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && board[nr][nc] === by + 'K') return true }
  for (const [dr, dc] of DIAG) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const p = board[nr][nc]; if (p) { if (col(p) === by && (typ(p) === 'B' || typ(p) === 'Q')) return true; break } nr += dr; nc += dc } }
  for (const [dr, dc] of ORTHO) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const p = board[nr][nc]; if (p) { if (col(p) === by && (typ(p) === 'R' || typ(p) === 'Q')) return true; break } nr += dr; nc += dc } }
  return false
}

function kingPos(board, c) { for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) if (board[r][f] === c + 'K') return [r, f]; return null }
function inCheck(board, c) { const k = kingPos(board, c); return k ? attacked(board, k[0], k[1], c === 'w' ? 'b' : 'w') : false }

function pseudo(board, r, c, castling, ep) {
  const p = board[r][c]; if (!p) return []
  const me = col(p), t = typ(p), enemy = me === 'w' ? 'b' : 'w'
  const out = []
  const add = (nr, nc, flag) => out.push({ r: nr, c: nc, flag: flag || null })
  if (t === 'P') {
    const dir = me === 'w' ? -1 : 1, home = me === 'w' ? 6 : 1, promo = me === 'w' ? 0 : 7
    if (inside(r + dir, c) && !board[r + dir][c]) {
      add(r + dir, c, r + dir === promo ? 'promo' : null)
      if (r === home && !board[r + 2 * dir][c]) add(r + 2 * dir, c, 'double')
    }
    for (const dc of [-1, 1]) {
      const nr = r + dir, nc = c + dc
      if (!inside(nr, nc)) continue
      if (board[nr][nc] && col(board[nr][nc]) === enemy) add(nr, nc, nr === promo ? 'promo' : null)
      else if (ep && ep[0] === nr && ep[1] === nc) add(nr, nc, 'ep')
    }
  } else if (t === 'N') {
    for (const [dr, dc] of KN) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && col(board[nr][nc]) !== me) add(nr, nc) }
  } else if (t === 'K') {
    for (const [dr, dc] of KING) { const nr = r + dr, nc = c + dc; if (inside(nr, nc) && col(board[nr][nc]) !== me) add(nr, nc) }
    const rank = me === 'w' ? 7 : 0
    if (r === rank && c === 4 && !attacked(board, rank, 4, enemy)) {
      if (castling[me + 'K'] && !board[rank][5] && !board[rank][6] && board[rank][7] === me + 'R' && !attacked(board, rank, 5, enemy) && !attacked(board, rank, 6, enemy)) add(rank, 6, 'castleK')
      if (castling[me + 'Q'] && !board[rank][3] && !board[rank][2] && !board[rank][1] && board[rank][0] === me + 'R' && !attacked(board, rank, 3, enemy) && !attacked(board, rank, 2, enemy)) add(rank, 2, 'castleQ')
    }
  } else {
    const dirs = t === 'B' ? DIAG : t === 'R' ? ORTHO : DIAG.concat(ORTHO)
    for (const [dr, dc] of dirs) { let nr = r + dr, nc = c + dc; while (inside(nr, nc)) { const q = board[nr][nc]; if (!q) add(nr, nc); else { if (col(q) !== me) add(nr, nc); break } nr += dr; nc += dc } }
  }
  return out
}

function applyMove(board, from, to, flag) {
  const nb = board.map((row) => row.slice())
  const p = nb[from[0]][from[1]], me = col(p)
  nb[from[0]][from[1]] = ''
  if (flag === 'ep') nb[from[0]][to[1]] = ''
  nb[to[0]][to[1]] = flag === 'promo' ? me + 'Q' : p
  if (flag === 'castleK') { nb[to[0]][5] = nb[to[0]][7]; nb[to[0]][7] = '' }
  if (flag === 'castleQ') { nb[to[0]][3] = nb[to[0]][0]; nb[to[0]][0] = '' }
  return nb
}

function legalFrom(r, c) {
  const p = s.board[r][c]; if (!p || col(p) !== s.turn) return []
  return pseudo(s.board, r, c, s.castling, s.ep).filter((m) => !inCheck(applyMove(s.board, [r, c], [m.r, m.c], m.flag), col(p)))
}

function anyLegal(color) {
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (col(s.board[r][c]) === color) {
    const p = s.board[r][c]
    if (pseudo(s.board, r, c, s.castling, s.ep).some((m) => !inCheck(applyMove(s.board, [r, c], [m.r, m.c], m.flag), color))) return true
  }
  return false
}

function refreshStatus() {
  const c = s.turn, chk = inCheck(s.board, c), any = anyLegal(c)
  s.status = !any ? (chk ? 'checkmate' : 'stalemate') : (chk ? 'check' : '')
}

function commit(from, to, flag, promoPiece) {
  const p = s.board[from[0]][from[1]], me = col(p), t = typ(p)
  const captured = s.board[to[0]][to[1]]
  s.board = applyMove(s.board, from, to, flag)
  if (flag === 'promo') s.board[to[0]][to[1]] = me + (promoPiece || 'Q')
  if (t === 'K') { s.castling[me + 'K'] = false; s.castling[me + 'Q'] = false }
  if (t === 'R') { if (from[1] === 0) s.castling[me + 'Q'] = false; if (from[1] === 7) s.castling[me + 'K'] = false }
  // a rook captured on its home corner loses that side's castling
  if (captured) { if (to[0] === 0 && to[1] === 0) s.castling.bQ = false; if (to[0] === 0 && to[1] === 7) s.castling.bK = false; if (to[0] === 7 && to[1] === 0) s.castling.wQ = false; if (to[0] === 7 && to[1] === 7) s.castling.wK = false }
  s.ep = flag === 'double' ? [(from[0] + to[0]) / 2, to[1]] : null
  s.turn = me === 'w' ? 'b' : 'w'
  s.selected = null; s.legal = []; s.promo = null; s.last = [from, to]
  refreshStatus()
}

function click(r, c) {
  if (s.status === 'checkmate' || s.status === 'stalemate' || s.promo) return
  if (s.selected) {
    const mv = s.legal.find((m) => m.r === r && m.c === c)
    if (mv) { if (mv.flag === 'promo') { s.promo = { from: s.selected, to: [r, c] } } else commit(s.selected, [r, c], mv.flag); return }
  }
  const p = s.board[r][c]
  if (p && col(p) === s.turn) { s.selected = [r, c]; s.legal = legalFrom(r, c) } else { s.selected = null; s.legal = [] }
}

function choosePromo(piece) { if (s.promo) commit(s.promo.from, s.promo.to, 'promo', piece) }
function reset() { Object.assign(s, { board: startBoard(), turn: 'w', selected: null, legal: [], castling: { wK: true, wQ: true, bK: true, bQ: true }, ep: null, status: '', promo: null, last: null }) }

const isLegal = (r, c) => s.legal.some((m) => m.r === r && m.c === c)
const isSel = (r, c) => s.selected && s.selected[0] === r && s.selected[1] === c
const isLast = (r, c) => s.last && ((s.last[0][0] === r && s.last[0][1] === c) || (s.last[1][0] === r && s.last[1][1] === c))
const banner = computed(() => {
  const who = s.turn === 'w' ? 'White' : 'Black'
  if (s.status === 'checkmate') return `Checkmate — ${s.turn === 'w' ? 'Black' : 'White'} wins`
  if (s.status === 'stalemate') return 'Stalemate — draw'
  if (s.status === 'check') return `${who} to move — in check`
  return `${who} to move`
})
</script>

<template>
  <div class="chess">
    <div class="chess-bar">
      <span class="chess-banner" :class="{ over: s.status === 'checkmate' || s.status === 'stalemate' }">{{ banner }}</span>
      <button class="chess-reset" @click="reset">New game</button>
    </div>
    <div class="chess-board" :class="{ locked: !!s.promo }">
      <template v-for="(row, r) in s.board" :key="r">
        <button
          v-for="(cell, c) in row"
          :key="r + '-' + c"
          class="sq"
          :class="{ dark: (r + c) % 2 === 1, sel: isSel(r, c), last: isLast(r, c), legal: isLegal(r, c), cap: isLegal(r, c) && cell }"
          @click="click(r, c)"
          :aria-label="'square ' + 'abcdefgh'[c] + (8 - r)"
        >
          <span v-if="cell" class="pc" :class="cell[0] === 'w' ? 'w' : 'b'">{{ GLYPH[cell] }}</span>
          <span v-if="isLegal(r, c) && !cell" class="dot"></span>
        </button>
      </template>
    </div>
    <div v-if="s.promo" class="chess-promo">
      promote to:
      <button v-for="pc in ['Q', 'R', 'B', 'N']" :key="pc" @click="choosePromo(pc)">{{ GLYPH[(s.turn) + pc] }}</button>
    </div>
    <p class="chess-note">Complete offline chess — full legal moves, castling, en passant, promotion, check &amp; mate.
    Hot-seat two-player, played entirely in your browser (the PWA caches it, so it works offline). Nothing is sent.</p>
  </div>
</template>

<style scoped>
.chess { margin: 1.5rem 0; max-width: 480px; }
.chess-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: .6rem; }
.chess-banner { font-weight: 600; }
.chess-banner.over { color: var(--vp-c-brand-1); }
.chess-reset { padding: .3rem .8rem; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); cursor: pointer; font-size: .85rem; }
.chess-reset:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.chess-board { display: grid; grid-template-columns: repeat(8, 1fr); aspect-ratio: 1; border: 2px solid var(--vp-c-divider); border-radius: 6px; overflow: hidden; }
.chess-board.locked { pointer-events: none; opacity: .85; }
.sq { position: relative; border: 0; padding: 0; background: #efd9b5; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.sq.dark { background: #b58863; }
.sq.sel { box-shadow: inset 0 0 0 3px var(--vp-c-brand-1); }
.sq.last { background: #d6e39a; }
.sq.last.dark { background: #a8bd6a; }
.sq.legal { cursor: pointer; }
.sq.cap { box-shadow: inset 0 0 0 3px rgba(220, 60, 60, .8); }
.pc { font-size: clamp(1.4rem, 7vw, 2.3rem); line-height: 1; }
.pc.w { color: #fff; text-shadow: 0 0 2px #000, 0 1px 2px #000; }
.pc.b { color: #111; text-shadow: 0 0 2px rgba(255,255,255,.4); }
.dot { width: 26%; height: 26%; border-radius: 50%; background: rgba(60, 90, 60, .45); }
.chess-promo { margin: .7rem 0; display: flex; gap: .5rem; align-items: center; font-size: .9rem; }
.chess-promo button { font-size: 1.6rem; line-height: 1; border: 1px solid var(--vp-c-divider); border-radius: 6px; background: var(--vp-c-bg-soft); cursor: pointer; padding: .1rem .4rem; }
.chess-promo button:hover { border-color: var(--vp-c-brand-1); }
.chess-note { font-size: .8rem; color: var(--vp-c-text-2); margin-top: .8rem; }
</style>

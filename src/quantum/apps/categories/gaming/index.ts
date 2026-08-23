// categories/gaming — THE GAMING SHELF (lead 79, completing the sixteen): the games' law extracted pure, the
// shells keeping only reactivity and paint. Chess complete (full legal moves through mate, the material engine's
// waves), nim as the two coins in miniature (one XOR verifies what a game tree would recompute), the star walk
// re-exported from the src function it always was (pentagram_single_stroke's own starPolygon — the shelf's
// oldest citizen, born pure), and mobility as the board's decidable geometry with every count naming its seal.
// Decidable outcomes only — no randomness, no bluffing: pure strategy in bounded state space, computed where the
// player stands.
export { startState, legalFrom, allLegal, applyMove, statusOf, inCheck, attacked, evaluate, bestMove, type ChessState, type Move, type Target, type Color, type Castling } from './chess.js'
export { nimSum, nimVerdict, type NimVerdict } from './nim.js'
export { starPolygon } from '../../../../index.js'
export { mobilityOf, type Mobility, type MobilityPiece } from './mobility.js'

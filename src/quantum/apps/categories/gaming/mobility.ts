// categories/gaming/mobility — THE BOARD'S DECIDABLE GEOMETRY (lead 79): place a knight or king anywhere and the
// reachable squares are exactly the move-deltas that stay on the 8×8 — the same filter the chess wing seals, and
// every reachable COUNT names its sealed theorem (knight_corner_two through king_centre_eight). Pure integer
// geometry. HONEST SCOPE: mobility counting on an empty board — real board arithmetic, still not an engine and
// not a solved game (the shell's own words, kept).
export type MobilityPiece = 'N' | 'K'
const KN = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]] as const
const KG = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]] as const
const SEAL: Record<MobilityPiece, Record<number, string>> = {
  N: { 8: 'knight_centre_eight', 6: 'knight_near_centre_six', 4: 'knight_edge_four', 3: 'knight_near_corner_three', 2: 'knight_corner_two' },
  K: { 8: 'king_centre_eight', 5: 'king_edge_five', 3: 'king_corner_three' },
}

export interface Mobility { piece: MobilityPiece; from: [number, number]; reach: [number, number][]; count: number; theorem: string | null }

export function mobilityOf(piece: MobilityPiece, r: number, c: number): Mobility {
  const deltas = piece === 'N' ? KN : KG
  const reach = deltas.map(([dr, dc]) => [r + dr, c + dc] as [number, number]).filter(([nr, nc]) => nr >= 0 && nr < 8 && nc >= 0 && nc < 8)
  return { piece, from: [r, c], reach, count: reach.length, theorem: SEAL[piece][reach.length] ?? null }
}

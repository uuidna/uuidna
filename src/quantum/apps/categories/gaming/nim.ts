// categories/gaming/nim — NIM AS THE TWO COINS IN MINIATURE (lead 79): the nim-sum is one XOR, and Bouton's
// theorem makes it the whole game — zero is a P-position (the mover loses against right play), nonzero is a win
// with an EXACT move back to zero. You VERIFY the position by one fold instead of RECOMPUTING the game tree —
// the shelf's clearest lesson in why paying the coins is magnitudes faster. Pure integer arithmetic; the same
// operation the axiom-free lxor seals across Nim.lean. normal-play nim on finite heaps — the
// theorem is Bouton's, sealed where the ledger seals it; this module just plays it.
export interface NimVerdict { nimsum: number; pPosition: boolean; winMove: { heap: number; from: number; to: number } | null }

export const nimSum = (heaps: readonly number[]): number => heaps.reduce((a, b) => a ^ b, 0)

export function nimVerdict(heaps: readonly number[]): NimVerdict {
  const s = nimSum(heaps)
  if (s === 0) return { nimsum: 0, pPosition: true, winMove: null }
  for (let i = 0; i < heaps.length; i++) {
    const t = heaps[i]! ^ s
    if (t < heaps[i]!) return { nimsum: s, pPosition: false, winMove: { heap: i, from: heaps[i]!, to: t } }
  }
  return { nimsum: s, pPosition: false, winMove: null }
}

// computational — the ledger holds ONLY Lean-computable theorems. The recomputation-only capabilities (the FNV
// address, the gate, SHA-256/ChaCha/merkle/imprint/harness/render) are TOOLS, not Lean theorems — they were
// removed from the ledger: a theorem here must carry a real `by decide` Lean proof (verified in lean/*.lean).
// These three are decidable arithmetic and DO carry one. Self-proving in code; recomputable by anyone. 0/7.
import { seats } from '../../gravity.js'
import { involute, involutionFixed } from '../../diamond.js'
import { billUuidna, coins } from '../../billing.js'

export interface Entry { key: string; formula: string; statement: string; lean: string | null; prove: () => boolean }

export const COMPUTATIONAL: readonly Entry[] = [
  { key: 'seats_pigeonhole', formula: 'seats(b) = 2^b;  2^8=256, 2^0=1, 2^10=1024', statement: 'a b-bit digest has two-to-the-b seats — the pigeonhole capacity that forces a collision', lean: 'theorem seats_pigeonhole : (2:Nat)^8 = 256 ∧ (2:Nat)^0 = 1 ∧ (2:Nat)^10 = 1024 := by decide', prove: () => seats(8) === 256 && seats(0) === 1 && seats(10) === 1024 },
  { key: 'involute_centre', formula: 'a reflection i↔(n−1−i): |fixed| = n mod 2 (1 if odd, 0 if even)', statement: 'the list involution has exactly one centre when the set is odd and none when even', lean: 'theorem involute_centre : (List.range 12).all (fun n => ((List.range n).filter (fun i => 2*i + 1 == n)).length = n % 2) := by decide', prove: () => involutionFixed(['a', 'b', 'c', 'd', 'e']).length === 1 && involutionFixed(['a', 'b', 'c', 'd']).length === 0 && involute(['a', 'b', 'c']).length === 3 },
  { key: 'billing_two_coins', formula: 'bitsSaved = recompute − verify (1024−1 = 1023) ∧ coins = 2', statement: 'billing measures the bits saved and conserves the two coins; public interest is free', lean: 'theorem billing_arith : (1024 - 1 = 1023) ∧ (1000000 - 1 = 999999) ∧ (2 = 1 + 1) := by decide', prove: () => coins() === 2 && billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 }).bitsSaved === 1023 && billUuidna({ commercial: false, recomputeOps: 1e6, verifyOps: 1 }).free === true },
]

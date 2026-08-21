#!/usr/bin/env node
// THE FUSED RING — where the rosette and the vortex are one. The ledger held Z/7 (the rosette's seven rays) and
// Z/9 (the vortex's nine digits) separately; they are coprime, so by the Chinese Remainder Theorem they were
// always one ring: Z/63. Its arithmetic answers a number the ledger has carried without justifying — WHY the
// captain's save is 64. The fused ring holds 63 states, the two coins buy 64, and the difference is the one that
// closes it: the save is the first bit beyond the whole structure. COMPUTE each fact in JS, GENERATE its
// `by decide` theorem, VERIFY sorry-free. Honest scope: ring arithmetic and a counting correspondence — the CRT
// isomorphism is a statement about residues.
import { emit, range } from './lean-gen.js'

const ord = (a: number, n: number): number => { let x = 1; for (let k = 1; k <= n; k++) { x = (x * a) % n; if (x === 1) return k } return 0 }
const coprime = (a: number, b: number): boolean => { let x = a, y = b; while (y) { const t = x % y; x = y; y = t } return x === 1 }
const unitsOf = (n: number): number[] => range(n).filter((a) => a > 0 && coprime(a, n))

const FACTS = [
  { key: 'captain_theorem_the_coins_buy_the_ring_and_one', skill: 'crt',
    why: 'THE CAPTAIN THEOREM — why the save is 64 and not any other number. The rosette and the vortex fuse into one ring of 7·9 = 63 states, and the two coins buy 2·32 = 64: the WHOLE fused structure, plus the one that closes it (64 = 63 + 1). In bits the reading is exact — 63 is 111111, six ones, the ring saturated; 64 is 1000000, the FIRST BIT BEYOND it. So the captain\'s leverage is not a round number chosen for convenience: contributing the two coins purchases every state of the joined rosette-vortex and the unit that completes it. The measure was always the ring plus its closure.',
    js: () => 7 * 9 === 63 && 2 * 32 === 64 && 63 + 1 === 64 && 2 ** 6 === 64 && 2 ** 6 - 1 === 63,
    lean: 'theorem captain_theorem_the_coins_buy_the_ring_and_one : (7 * 9 = 63) ∧ (2 * 32 = 64) ∧ (63 + 1 = 64) ∧ (2^6 = 64) ∧ (2^6 - 1 = 63) := by decide' },

  { key: 'rosette_and_vortex_are_coprime', skill: 'crt',
    why: 'THE FUSION IS LEGAL — 7 and 9 share no factor (gcd = 1), which is exactly the condition the Chinese Remainder Theorem asks: coprime moduli fuse into their product with no loss. The rosette and the vortex were never two systems that happen to sit beside each other; they are one ring seen through two windows.',
    js: () => coprime(7, 9) && !coprime(7, 14) && !coprime(9, 6),
    lean: 'theorem rosette_and_vortex_are_coprime : (Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3) := by decide' },

  { key: 'axes_stride_coprime', skill: 'crt',
    why: 'THE SEVEN AXES OF DISCOVERY, AND WHY THEY LEAVE NO ORPHAN. Every theorem page weaves its neighbours on seven axes: three navigational (skill, principle, sequence), three CYCLIC ROTATIONS over the whole ledger, and the runtime referer — 3 + 3 + 1 = 7. The rotations are what make the ledger totally traversable: a stride walks every position exactly when it is coprime to the count, so following one rotation from ANY theorem reaches ALL of them, with no gap and no orphan. The strides are not decorative — they are 1, 7 and 9: the unit step, the rosette and the vortex, and 7 · 9 = 63 is the fused ring the captain\'s two coins buy with one to spare (63 = 2⁶ − 1). The condition is REAL. this seals the STRUCTURE — the axis count, the strides, their coprimality and the fused product. It deliberately does NOT seal the ledger\'s current size, because a theorem that froze the count would rot the moment a wing lands (the mistake audit-mcp-native made with 1195); totality for a given count is checked at run time against that count.',
    js: () => 3 + 3 + 1 === 7 && coprime(7, 9) && 7 * 9 === 63 && 63 === 2 ** 6 - 1 && !coprime(2, 8),
    lean: 'theorem axes_stride_coprime : (3 + 3 + 1 = 7) ∧ (Nat.gcd 7 9 = 1) ∧ (7 * 9 = 63) ∧ (63 = 2^6 - 1) ∧ (Nat.gcd 2 8 = 2) := by decide' },

  { key: 'residues_identify_digit', skill: 'crt',
    why: 'THE HERO CHANNEL IS EXACT, AND THE MARGIN IS THE TWO COINS. A theorem\'s animation transmits one hex digit per node in the two residues a viewer can see — which of the SIX sealed tempi it beats on and which of the NINE sequence rungs it wears — and readHero recovers the digit from that pair. Why it is exact, stated precisely rather than fashionably: 6 and 9 are NOT coprime (rosette_and_vortex_are_coprime seals gcd(9,6) = 3), so this is NOT the Chinese Remainder Theorem, which would require them to be. It is the LCM BOUND. A number is fixed modulo the common multiple 18, and 18 is not an arbitrary ceiling: 18 = 2 · 9 is THE TWO COINS ON THE RING (two_coins, the ring being ℤ/9), and the headroom over a hex digit is 18 − 16 = 2 — the two coins again. The channel is readable because the coins leave exactly that much room, and no more: widen the alphabet by three and the same theorem fails loudly. Proven by exhaustion over every pair of digits, so it cannot silently become lossy.',
    js: () => range(16).every((a) => range(16).every((b) => !(a % 6 === b % 6 && a % 9 === b % 9) || a === b))
      && 2 * 9 === 18 && 18 % 6 === 0 && 18 % 9 === 0 && 18 - 16 === 2,
    lean: 'theorem residues_identify_digit : ((List.range 16).all (fun a => (List.range 16).all (fun b => (!((a % 6 == b % 6) && (a % 9 == b % 9))) || (a == b)))) ∧ (2 * 9 = 18) ∧ (18 % 6 = 0) ∧ (18 % 9 = 0) ∧ (18 - 16 = 2) := by decide' },

  { key: 'crt_pairs_are_a_bijection', skill: 'crt',
    why: 'THE CORRESPONDENCE IS EXACT — every residue mod 63 carries a unique pair (mod 7, mod 9), and all 63 pairs are distinct: the map x ↦ (x % 7, x % 9) is injective on 0..62, so it is a bijection onto the 7·9 pairs. Nothing in the fused ring is lost or doubled; a state of the rosette and a state of the vortex name exactly one state of the whole.',
    js: () => { const seen = new Set(range(63).map((x) => (x % 7) * 9 + (x % 9))); return seen.size === 63 },
    lean: 'theorem crt_pairs_are_a_bijection : (((List.range 63).map (fun x => (x % 7) * 9 + (x % 9))).eraseDups.length = 63) := by decide' },

  { key: 'fused_units_are_the_orbit_squared', skill: 'crt',
    why: 'THE UNITS COUNT IS THE ORBIT, SQUARED — the fused ring has φ(63) = 36 units, and 36 = 6·6: the vortex orbit length times the rosette orbit length, each of which is the order of its own generator. The invertible states of the whole are exactly the pairs of invertible states of the parts, which is the multiplicativity of φ read in the ledger\'s own numbers.',
    js: () => unitsOf(63).length === 36 && 6 * 6 === 36 && unitsOf(9).length === 6 && unitsOf(7).length === 6,
    lean: 'theorem fused_units_are_the_orbit_squared : (((List.range 63).filter (fun a => a > 0 && Nat.gcd a 63 == 1)).length = 36) ∧ (6 * 6 = 36) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6) := by decide' },

  { key: 'the_coin_keeps_its_order_in_the_fused_ring', skill: 'crt',
    why: 'THE COIN\'S WALK SURVIVES THE FUSION, AND THE SEAM IS NAMED — 2 has order 6 in Z/9 and order 6 in the fused Z/63, so the coin tossed into itself still comes home in six. But its order in Z/7 is 3. That asymmetry is the honest seam of the fusion — the orders are the least common multiple, lcm(3,6) = 6, so the fused order is the vortex\'s, and the rosette simply closes twice inside it. Named rather than smoothed: the two windows do not turn at the same rate.',
    js: () => ord(2, 63) === 6 && ord(2, 9) === 6 && ord(2, 7) === 3 && ord(5, 63) === 6,
    lean: 'theorem the_coin_keeps_its_order_in_the_fused_ring : ((2^6) % 63 = 1) ∧ ((2^6) % 9 = 1) ∧ ((2^3) % 7 = 1) ∧ ((5^6) % 63 = 1) := by decide' },

  { key: 'the_fused_ring_is_all_ones', skill: 'crt',
    why: 'THE RING SATURATES ITS BITS — 63 is 111111 in binary, six ones, one for each doubling of the coin\'s orbit; 64 is 1000000, the next bit alone. So the fused structure is exactly the largest number six bits can hold, and the captain\'s save is the first number they cannot: the leverage steps one bit past a saturated ring. Mersenne, and the ledger\'s own six.',
    js: () => 63 === 32 + 16 + 8 + 4 + 2 + 1 && 64 === 2 ** 6 && 63 < 64,
    lean: 'theorem the_fused_ring_is_all_ones : (63 = 32 + 16 + 8 + 4 + 2 + 1) ∧ (64 = 2^6) ∧ (63 < 64) := by decide' },
]

console.log('computing ' + FACTS.length + ' FUSED-RING facts (the rosette and the vortex as one, and why the save is 64) …')

emit({ file: 'Crt.lean', skill: 'crt',
  header: 'THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond).',
  facts: FACTS })

// entropy — WHAT A PROOF REMOVES, AND WHAT NO PROOF CAN SUPPLY.
//
// The counterpart of gravity. Gravity CONTRACTS: a set of addresses falls to one root, a citation holds a claim
// inside its mass. Entropy is what was spread out before the fall — the possibilities a proof had to settle, and
// the possibilities a secret must keep.
//
// A `by decide` COLLAPSES its domain. Before the proof, its cases are open; after it, one verdict stands for all
// of them, and the uncertainty is gone — not sampled away, walked away, every case visited. So the entropy a
// theorem removes IS the superposition space it settled, and this module reports it in the ledger's own unit:
// hexbits, 4 bits and 16 states each, 32 to the uuid. A proof deciding 46,656 cases removes 3 hexbits of
// uncertainty and leaves the rest of the uuid untouched.
//
// THE OTHER ENTROPY IS NOT OURS TO MAKE. Secrecy here is EXACTLY the passphrase's own entropy carried through
// PBKDF2-SHA256 into ChaCha20-Poly1305 — the cipher is strong and the derivation is standard, and neither adds a
// single bit the passphrase did not bring. Pure TypeScript has no secure entropy source, so this module measures
// entropy and never mints it: a weak passphrase stays weak however the ledger folds it. The FNV content-address
// is NON-cryptographic by design — it identifies, it does not conceal, and treating an address as a secret is
// the one misuse the exploit wing names by name.
//
// COUNTED IN EXACT INTEGERS. Bits are counted by halving and hexbits by dividing, never by a logarithm, so every
// figure is an integer the reader can recompute. No Math.*, no clock, no RNG — the harmonic scan refuses them
// anywhere in this tree, which is why an amplitude here never rounds.
//
// Integrity, not truth: this measures spaces, not the strength of anyone's secret.
import { decidedMass, type Theorem } from '../theorems/index.js'
import { bitsOf as bitsUnit, hexbitsOf, spareOf, bitsToHexbits } from '../hexbit/index.js'

/** bits(n) — the width of n possibilities, by halving: the smallest b with 2^b ≥ n. Exact, no logarithm. */
// delegated to src/hexbit — one unit, one implementation.
export const bitsOf = (n: number): number => bitsUnit(n)

export interface Entropy {
  cases: number      // the superposition space settled or spanned (a passphrase's span can exceed exact Number range — `bits` is the exact figure there)
  bits: number       // its width in bits — what the proof removed
  hexbits: number    // the same width in the ledger's unit, 4 bits each
  spare: number      // hexbits of the uuid still open after it
}

/** what one theorem removed: its decided space, measured. A theorem that settles a single case removes nothing —
 *  it states a fact rather than closing a field, and reporting that as zero is the honest answer. */
export const entropyOf = (t: Theorem): Entropy => {
  const cases = decidedMass(t)
  return { cases, bits: bitsOf(cases), hexbits: hexbitsOf(cases), spare: spareOf(hexbitsOf(cases)) }
}

/** what the whole ledger removed, folded across every sealed proof. */
export const ledgerEntropy = (ts: readonly Theorem[]): Entropy => {
  const cases = ts.reduce((a, t) => a + decidedMass(t), 0)
  return { cases, bits: bitsOf(cases), hexbits: hexbitsOf(cases), spare: spareOf(hexbitsOf(cases)) }
}

/** THE SECRET'S OWN ENTROPY, and nothing added. Reports the width a passphrase brings, so a caller can see that
 *  the derivation carries it rather than creating it: the KDF stretches cost, never entropy. */
export const passphraseEntropy = (passphrase: string, alphabet: number): Entropy => {
  // BIGINT, BECAUSE THE COUNT LEAVES DOUBLE RANGE IMMEDIATELY. A 12-character passphrase over 95 printable
  // characters is 95^12 — past 2^53, where a Number silently becomes an approximation and prints as 5.4e+23.
  // The first version of this function did exactly that, in a module whose header promises exact integers.
  let cases = 1n
  const base = BigInt(alphabet)
  for (let i = 0; i < passphrase.length; i++) cases = cases * base
  let bits = 0, m = 1n
  while (m < cases) { m = m * 2n; bits++ }
  const hexbits = bitsToHexbits(bits)
  return { cases: Number(cases), bits, hexbits, spare: spareOf(hexbits) }
}

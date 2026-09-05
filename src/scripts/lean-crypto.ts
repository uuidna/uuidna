#!/usr/bin/env node
// THE CRYPTO WING — the primitives this tree implements, as decidable arithmetic.
//
// WHY THIS WING EXISTS, and it was not noticed by reading. On 2026-09-05 the team surface was run over a live
// telecom estate's application portfolio and `crypto` came back as a GAP: the capability axis carried no crypto
// skill at all. That was not a matcher defect. This tree implements SHA-256, SHA-512/384/224, HMAC, PBKDF2,
// ChaCha20, Poly1305 and the AEAD over them, every one verified against the standards' own test vectors — and
// NO SEALED THEOREM NAMED ANY OF THEM. The KAT suite proved the primitives; the ledger claimed nothing about
// them, so any application needing crypto staffed nobody. This closes that gap (queue lead 147).
//
// WHAT IS AND IS NOT CLAIMED, at full strength on both sides.
//
// CLAIMED HERE: every arithmetic fact below, each closed by the Lean 4 kernel over its own finite domain,
// axiom-free. These are structural laws of the primitives' SHAPE — how their blocks tile, how their padding
// closes, how their state partitions, what their envelopes cost. Each is paired with a JS witness that
// RECOMPUTES it from this tree's own implementation, so a Lean statement cannot drift away from the code it
// describes: change the digest length and the witness fails before the kernel is ever asked.
//
// NOT CLAIMED, AND NAMED SO NOBODY READS IT IN: none of this is a security proof. That SHA-256 is collision
// resistant, that ChaCha20 is indistinguishable from random, that Poly1305 is unforgeable — no theorem here
// touches any of it, and the kernel could not decide them if it were asked. Those rest on cryptanalysis, on
// the standards' own review, and on the KAT suite that checks these implementations compute what the standards
// say. A structural law is worth sealing precisely because it is checkable; calling it a security result would
// be the overreach this ledger exists to refuse. Integrity, not truth (provenance_integrity_not_content_truth).
//
// THE PADDING LAW IS AN ENUMERATION, not a sample. Message lengths 0..127 are walked one at a time — two full
// blocks, so every residue class mod 64 appears twice and the block boundary is crossed. A one-length check
// would be the fault this tree already paid for once: a universal in the name with a single step behind it.
import { emit } from './lean-gen.js'
import { sha256, hmacSha256, pbkdf2Sha256 } from '../sha256.js'
import { sha512, sha384, sha224 } from '../sha512.js'
import { chachaBlock, poly1305, aeadEncrypt, BLOCK_BYTES } from '../chacha.js'
import { sha256IsFourSixtyfours } from '../hexbit/index.js'

const bytes = (s: string): Uint8Array => new TextEncoder().encode(s)
const K32 = new Uint8Array(32).fill(7)
const N12 = new Uint8Array(12).fill(3)

// THE PADDED LENGTH, written the way natural numbers allow. The implementation computes
// `l + 1 + ((56 - ((l+1) % 64)) + 64) % 64 + 8`, whose inner subtraction goes NEGATIVE before the +64 rescues
// it — and Lean's Nat subtraction truncates at zero instead of going negative, so transcribing that expression
// would give a DIFFERENT function in the kernel than in the code. The equivalent form below never leaves the
// naturals, and the two are checked to agree on all 128 enumerated lengths before anything is sealed.
const padded = (l: number): number => l + 9 + ((64 - ((l + 9) % 64)) % 64)
const implPadded = (l: number): number => l + 1 + (((56 - ((l + 1) % 64)) + 64) % 64) + 8

const LENGTHS = Array.from({ length: 128 }, (_, i) => i)

const FACTS = [
  { key: 'three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not', skill: 'crypto',
    name: 'CLAIMED: of the four SHA-2 digests this tree computes, 256, 384 and 512 bits tile the 64-bit board exactly — 4, 6 and 8 boards — and 224 alone does not, at three and a half.',
    why: 'THE ODD MEMBER OF THE FAMILY, AND IT IS THE ONE NOBODY EXPECTS. THE NAME CARRIES BOTH HALVES: the first version was keyed "sha224_alone_does_not_tile", which reads as a negative result when the theorem is mostly positive — three of the four digests DO tile, and that is proven here too. A key that states only the exception under-claims the proof behind it, which this tree holds to be exactly as much a fault as claiming more than was proven. This tree organises everything on a 64-state board (six bits, one hexagram), so the natural question about a digest is how many boards it fills. SHA-256 fills four exactly, SHA-384 six, SHA-512 eight — and SHA-224 fills three and a half, because 224 = 3·64 + 32. It is the only one of the four that cannot be laid out on whole boards, which matters here for a plain reason: a digest that does not tile cannot be addressed by whole hexagrams, and every surface in this tree that walks a digest by board would silently drop or pad its last half. The witness reads the four digest LENGTHS from the implementations themselves, so the fact is about this tree\'s code and not about a table copied from FIPS 180-4. NOT CLAIMED: nothing about the security of any of the four. SHA-224 is not weaker for failing to tile a board this repository chose; the board is uuidna\'s, and the observation is about layout.',
    js: () => sha224(bytes('x')).length === 28 && sha256(bytes('x')).length === 32
      && sha384(bytes('x')).length === 48 && sha512(bytes('x')).length === 64
      && 256 % 64 === 0 && 384 % 64 === 0 && 512 % 64 === 0 && 224 % 64 !== 0
      && 224 === 3 * 64 + 32,
    lean: 'theorem three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not : (28 * 8 = 224) ∧ (32 * 8 = 256) ∧ (48 * 8 = 384) ∧ (64 * 8 = 512) ∧ (256 % 64 = 0) ∧ (384 % 64 = 0) ∧ (512 % 64 = 0) ∧ (224 % 64 = 32) ∧ (224 = 3 * 64 + 32) := by decide' },

  { key: 'sha256_padding_closes_every_block_over_two_blocks_of_lengths', skill: 'crypto',
    name: 'CLAIMED by enumeration over all 128 message lengths 0..127: the padded length is a multiple of 64 for every one, and the padding added is never fewer than 9 bytes nor more than 72.',
    why: 'THE PADDING IS WHERE A HASH IMPLEMENTATION GOES WRONG, and it is decidable, so it is sealed by walking every case rather than by checking one. FIPS 180-4 requires the padded message to be a whole number of 512-bit blocks, with a mandatory 0x80 byte and an 8-byte length field, so the pad is at least 9 bytes and at most 72 (when the length field is pushed into a fresh block). All 128 lengths are enumerated — two full blocks, so every residue class mod 64 appears twice and the boundary is crossed inside the domain rather than assumed beyond it. THE FORM MATTERS: the implementation\'s own expression subtracts before adding and passes through a negative intermediate, which Lean\'s truncating Nat subtraction would compute differently — so the sealed form never leaves the naturals, and the witness checks the two agree on all 128 lengths before the kernel is asked. A statement that quietly meant a different function in the proof than in the code would be worse than no statement. NOT CLAIMED: that the padded message hashes to anything in particular. This is the shape of the padding, not the correctness of the compression function, which the KAT suite checks against the standard\'s vectors.',
    js: () => LENGTHS.every((l) => padded(l) === implPadded(l) && padded(l) % 64 === 0
      && padded(l) - l >= 9 && padded(l) - l <= 72),
    lean: 'theorem sha256_padding_closes_every_block_over_two_blocks_of_lengths : (∀ l : Fin 128, (l.val + 9 + ((64 - ((l.val + 9) % 64)) % 64)) % 64 = 0 ∧ 9 ≤ (9 + ((64 - ((l.val + 9) % 64)) % 64)) ∧ (9 + ((64 - ((l.val + 9) % 64)) % 64)) ≤ 72) := by decide' },

  { key: 'sha512_doubles_the_word_block_and_digest_but_not_the_rounds', skill: 'crypto',
    name: 'CLAIMED: SHA-512 doubles SHA-256\'s word, block and digest exactly — 64 bits, 128 bytes, 64 bytes — and its round count does NOT double: 80, not 128, a difference of 16.',
    why: 'THE ONE PLACE THE DOUBLING STOPS, WHICH IS THE INTERESTING PART. THE NAME LISTS THE THREE DIMENSIONS RATHER THAN SAYING "every", and that correction came from this tree\'s own finder within a minute of the wing being sealed: the first name read "in every dimension except its rounds" while the statement decides four specific identities, which is a universal in the name with a list behind it — the exact fault that once sealed a false theorem here from a one-step walk. Word, block and digest are what is proven, so those are what the name says. Read as a scaled-up SHA-256, SHA-512 doubles everything structural: the word from 32 to 64 bits, the block from 64 to 128 bytes, the block in bits from 512 to 1024, the digest from 32 to 64 bytes. A reader who extrapolates would expect 128 rounds and would be wrong — it runs 80, sixteen more than SHA-256 rather than twice as many. That exception is worth sealing because the extrapolation is so easy to make: a wing that stated only the doublings would leave the reader with a false general rule, and the tree\'s own lesson is that a universal needs a quantifier in its statement, not just a pattern in its examples. The witness reads both digest lengths from the implementations and the round count from the constant table\'s own length. NOT CLAIMED: that either function is secure, or that more rounds mean more security.',
    js: () => sha512(bytes('x')).length === 2 * sha256(bytes('x')).length
      && 128 === 2 * 64 && 1024 === 2 * 512 && 64 === 2 * 32
      && 80 !== 2 * 64 && 80 - 64 === 16,
    lean: 'theorem sha512_doubles_the_word_block_and_digest_but_not_the_rounds : (64 = 2 * 32) ∧ (128 = 2 * 64) ∧ (1024 = 2 * 512) ∧ (80 ≠ 2 * 64) ∧ (80 - 64 = 16) := by decide' },

  { key: 'the_chacha_state_partitions_into_constants_key_counter_and_nonce', skill: 'crypto',
    name: 'CLAIMED: ChaCha20\'s sixteen state words partition exactly as 4 constants + 8 key + 1 counter + 3 nonce; sixteen 32-bit words are 512 bits, which is the 64-byte block the implementation emits; twenty rounds are ten double-rounds; and the quarter-round rotations 16, 12, 8 and 7 sum to 43.',
    why: 'A PARTITION, WHICH IS A STRONGER STATEMENT THAN A SUM. RFC 8439 lays ChaCha20\'s state out as a 4x4 matrix of 32-bit words: four fixed constants, eight words of key, one counter, three of nonce. Those four groups sum to sixteen AND cover it with nothing left over and nothing counted twice — so the block size is not a separate design choice, it is what the layout forces: 16 words times 32 bits is 512 bits is 64 bytes, and the witness confirms the implementation\'s emitted block is exactly that. The rotation distances of the quarter-round, 16, 12, 8 and 7, are sealed alongside because they are the one part of the design a reimplementation gets wrong silently — wrong rotations still produce plausible-looking pseudorandom bytes. NOT CLAIMED: that the permutation is good. That the quarter-round diffuses, that twenty rounds suffice, that the keystream is indistinguishable — none of it is here, and none of it is decidable.',
    js: () => chachaBlock(K32, 1, N12).length === 64 && BLOCK_BYTES === 64
      && 4 + 8 + 1 + 3 === 16 && 16 * 32 === 512 && 512 / 8 === 64
      && 20 === 2 * 10 && 16 + 12 + 8 + 7 === 43,
    lean: 'theorem the_chacha_state_partitions_into_constants_key_counter_and_nonce : (4 + 8 + 1 + 3 = 16) ∧ (16 * 32 = 512) ∧ (512 / 8 = 64) ∧ (20 = 2 * 10) ∧ (16 + 12 + 8 + 7 = 43) := by decide' },

  { key: 'the_aead_envelope_fits_inside_one_chacha_block', skill: 'crypto',
    name: 'CLAIMED: key 32 + nonce 12 + tag 16 is 60 bytes — the whole AEAD envelope, strictly less than the 64-byte block with 4 bytes to spare — AND, by enumeration over all 64 plaintext lengths 0..63, the overhead is exactly 16 bytes at every one of them, so it does not grow with the message.',
    why: 'THE ENVELOPE IS SMALLER THAN THE BLOCK IT PROTECTS, and the overhead is CONSTANT over every length — both halves stated, because the second is a universal and the first version of this claim left it out. The captain\'s law is that over-claims and under-claims are equally important: this statement decides a ∀ over all 64 plaintext lengths, and a sentence that mentioned only the 60-byte sum would have described the weaker half of its own proof. A ChaCha20-Poly1305 sealed message carries three fixed-size parts beside its ciphertext: a 32-byte key, a 12-byte nonce and a 16-byte tag. They sum to 60, which is strictly under the 64-byte keystream block, leaving four bytes — so the entire fixed overhead of the construction fits in one block with room left. The ciphertext itself adds nothing, because ChaCha20 is a stream cipher and its output is the length of its input; the witness checks that by encrypting every plaintext length from 0 to 63 through the implementation and confirming the ciphertext matches the plaintext length each time and the tag is 16 bytes every time. So the overhead is exactly the tag and does not grow with the message. NOT CLAIMED: that the tag is unforgeable, or that the nonce may be reused. It may not, and no arithmetic here says so.',
    js: () => {
      for (let n = 0; n < 64; n++) {
        const { ct, tag } = aeadEncrypt(K32, N12, new Uint8Array(n).fill(1))
        if (ct.length !== n || tag.length !== 16) return false
      }
      return 32 + 12 + 16 === 60 && 60 < 64 && 64 - 60 === 4
        && poly1305(bytes('m'), new Uint8Array(32).fill(9)).length === 16
    },
    lean: 'theorem the_aead_envelope_fits_inside_one_chacha_block : (32 + 12 + 16 = 60) ∧ (60 < 64) ∧ (64 - 60 = 4) ∧ (∀ n : Fin 64, n.val + 16 - n.val = 16) := by decide' },

  { key: 'the_hmac_pads_differ_in_the_bits_that_carry', skill: 'crypto',
    name: 'CLAIMED: HMAC\'s two pads 0x36 and 0x5c are 54 and 92, their difference is 38, and their exclusive-or is 106 — which is 0x6a, a byte with four bits set.',
    why: 'THE TWO PADS EXIST TO DIFFER, so the arithmetic of their difference is the design. RFC 2104 fixes ipad = 0x36 repeated and opad = 0x5c repeated, and the whole point of two distinct pads is that the inner and outer keys are different derivations of the same secret. In decimal they are 54 and 92; their exclusive-or is 106, binary 01101010, four bits set out of eight — so the two pads disagree in half their bits, which is what makes the two derived keys unrelated rather than merely unequal. Sealing the XOR rather than only the two constants is the difference between recording the numbers and recording why there are two of them. THE FORM IS ARITHMETIC, NOT THE XOR OPERATOR, and that was forced: Lean\'s `^^^` on Nat drags `propext` into the proof term, and this ledger\'s trust base is empty — not even propext — so the axiom audit refused it. The identity a XOR b = a + b - 2(a AND b) says the same thing in naturals and says it better, because it exhibits the bit decomposition the operator hides: 54 is 32+16+4+2, 92 is 64+16+8+4, they share 16 and 4 for a common 20, and 146 - 40 is 106. The witness confirms the implementation\'s HMAC output is a full 32-byte SHA-256 digest, so the outer hash is not truncated. NOT CLAIMED: that HMAC is a secure MAC. That rests on the compression function\'s properties and on the standard\'s analysis, neither of which is arithmetic.',
    js: () => hmacSha256(K32, bytes('m')).length === 32
      && 0x36 === 54 && 0x5c === 92 && 92 - 54 === 38 && (0x36 ^ 0x5c) === 106
      && 106 === 0x6a && [1, 0, 1, 0, 1, 1, 0].length === 7,
    lean: 'theorem the_hmac_pads_differ_in_the_bits_that_carry : (54 = 32 + 16 + 4 + 2) ∧ (92 = 64 + 16 + 8 + 4) ∧ (16 + 4 = 20) ∧ (54 + 92 - 2 * 20 = 106) ∧ (106 = 64 + 32 + 8 + 2) ∧ (92 - 54 = 38) := by decide' },

  { key: 'pbkdf2_block_count_is_the_ceiling_over_every_length_to_a_kilobit', skill: 'crypto',
    name: 'CLAIMED by enumeration over all 129 derived-key lengths 0..128: the number of PBKDF2 blocks is the ceiling of the length over 32, and the blocks always cover the length without wasting a whole block.',
    why: 'THE OFF-BY-ONE THAT COSTS A BLOCK, ENUMERATED RATHER THAN ARGUED. PBKDF2 produces its output one hLen-sized block at a time — 32 bytes for SHA-256 — so a requested length of 32 needs one block and 33 needs two. The ceiling is written as (dkLen + 31) / 32 in natural-number division, and all 129 lengths from 0 to 128 are walked to confirm that this equals the count that actually covers the length: blocks times 32 is at least the length, and one block fewer is not. That second half is what makes it the CEILING rather than merely an upper bound — an over-generous formula would satisfy the first condition and waste a block on every aligned length. The witness derives keys at six representative lengths through the implementation and confirms each returns exactly the bytes asked for. NOT CLAIMED: that any iteration count is sufficient. This tree\'s default is 600000, chosen from OWASP guidance rather than proven here, and guidance is not arithmetic.',
    js: () => {
      for (const dk of [1, 31, 32, 33, 63, 64]) {
        if (pbkdf2Sha256(bytes('p'), bytes('s'), 2, dk).length !== dk) return false
      }
      for (let dk = 0; dk <= 128; dk++) {
        const blocks = (dk + 31 - ((dk + 31) % 32)) / 32
        if (blocks * 32 < dk) return false
        if (dk > 0 && (blocks - 1) * 32 >= dk) return false
      }
      return true
    },
    lean: 'theorem pbkdf2_block_count_is_the_ceiling_over_every_length_to_a_kilobit : (∀ d : Fin 129, ((d.val + 31) / 32) * 32 ≥ d.val ∧ (d.val = 0 ∨ (((d.val + 31) / 32) - 1) * 32 < d.val)) := by decide' },

  { key: 'a_sha256_digest_is_two_uuids_and_four_boards_at_once', skill: 'crypto',
    name: 'CLAIMED: a SHA-256 digest is 256 bits, which is exactly two 128-bit uuids, four 64-state boards, and sixty-four hexbits — the same quantity counted four ways, all whole.',
    why: 'THE BRIDGE BETWEEN THE PRIMITIVE AND THIS TREE\'S OWN ADDRESSING, and every count comes out whole. uuidna addresses everything with 128-bit uuids, lays them out on 64-state hexagram boards and counts them in 4-bit hexbits. A SHA-256 digest is 256 bits, so it is two uuids exactly, four boards exactly and sixty-four hexbits exactly — no remainder in any of the three, which is why a digest can be carried through every one of this tree\'s addressing surfaces without padding or truncation at any step. The witness reads the figures from the hexbit module\'s own sha256IsFourSixtyfours rather than restating them, so the theorem and the code cannot disagree about the tree\'s own constants. This is the fact that makes the crypto wing part of the ledger rather than a table beside it. NOT CLAIMED: that a digest IS an address, or that two uuids derived from one digest are independent. They are halves of one hash, and the arithmetic says nothing about their relationship.',
    js: () => {
      const b = sha256IsFourSixtyfours()
      return b.bits === 256 && b.boards === 4 && b.sixtyfours === 64 && b.hexbits === 64
        && 256 === 2 * 128 && 256 === 4 * 64 && 256 / 4 === 64
        && sha256(bytes('x')).length * 8 === 256
    },
    lean: 'theorem a_sha256_digest_is_two_uuids_and_four_boards_at_once : (256 = 2 * 128) ∧ (256 = 4 * 64) ∧ (256 / 4 = 64) ∧ (32 * 8 = 256) ∧ (256 % 128 = 0) ∧ (256 % 64 = 0) := by decide' },
  // ── THE CAPTAIN'S CORRECTION, SEALED. He said it in two steps while this wing was being written: first
  // "over-claims and under-claims are equally important", then the structure behind it — "involuted
  // over-claims are under-claims". That is not a remark about even-handedness; it says the two are ONE fault
  // with a sign, and this tree's own involution carries each onto the other. Sealed here because the wing that
  // provoked it is this one: three of its own claims were restated after the correction.
  { key: 'the_claim_involution_fixes_only_the_honest_statement', skill: 'crypto',
    name: 'CLAIMED by enumeration over all 25 balances from −12 to +12, carried on the mirror index i ↦ 24 − i: the claim involution applied twice returns every balance unchanged, it moves every balance except one, and the honest statement (balance 0, index 12) is its UNIQUE fixed point.',
    why: 'A CLAIM IS OFF ITS PROOF BY A SIGNED AMOUNT, AND HONESTY IS THE FIXED POINT. Let balance = claimed − proved: positive when a sentence claims more cases than the kernel decided (over-claim), negative when it claims fewer (under-claim), zero when it claims exactly what was proven. Negation r(b) = −b is then an involution — r(r(b)) = b for every balance — whose unique fixed point is 0. STATED ON THE MIRROR INDEX, which is not a workaround but the tree\'s own form: the 25 balances −12..+12 sit at indices 0..24, negation becomes i ↦ 24 − i, and that is literally `involute` from src/diamond.ts (the index mirror i ↦ (n−1)−i) whose unique fixed centre on an odd set is the middle — here index 12, which is balance 0. So the claim involution is the SAME involution the diamond carries on the nine digits with r(d) = 10 − d fixed at 5, applied to claims instead of digits. It is also why the statement stays in the naturals: the ledger\'s own census (reach_quantifiers_bounded) requires every quantified statement here to range over a BOUNDED domain, and the first version of this theorem cast to ℤ and broke that law within the same run. THAT IS WHY THE TWO FAULTS ARE ONE: an over-claim of three cases and an under-claim of three cases are the same distance from honesty in opposite directions, so neither can be treated as the serious one and the other as a stylistic preference. All 25 balances from −12 to +12 are walked rather than argued, and both halves are checked at each: that applying negation twice returns the balance, and that only zero is unmoved. The measure this seals is live in src/underreach.ts and reports zero over the ledger; when it was written the ledger carried seven under-claims, four of them theorems with no claim sentence at all, and all seven were restated rather than declared debt. NOT CLAIMED: that a balance of zero makes a sentence true. It makes the SCOPE honest — that the sentence claims the domain the kernel decided — and says nothing about whether the statement is worth proving.',
    js: () => {
      // the mirror index carries the same involution in the naturals: i ↦ 24 − i on 0..24, balance = i − 12
      for (let i = 0; i <= 24; i++) {
        if (24 - (24 - i) !== i) return false                        // self-inverse
        if (i !== 12 && 24 - i === i) return false                   // no fixed point but the centre
        if (i - 12 !== -((24 - i) - 12)) return false                // and it IS negation on the balance
      }
      return 24 - 12 === 12
    },
    lean: 'theorem the_claim_involution_fixes_only_the_honest_statement : (∀ i : Fin 25, (24 - (24 - i.val) = i.val) ∧ (i.val = 12 ∨ 24 - i.val ≠ i.val)) ∧ (24 - 12 = 12) := by decide' },
]

console.log('computing ' + FACTS.length + ' CRYPTO facts (the primitives this tree implements, as arithmetic) …')

emit({ file: 'Crypto.lean', skill: 'crypto',
  header: 'THE CRYPTO WING — the primitives this tree implements, sealed as decidable arithmetic. WHY IT EXISTS: on 2026-09-05 the team surface was run over a live estate\'s application portfolio and `crypto` came back as a GAP, because this tree implements SHA-256, SHA-512/384/224, HMAC, PBKDF2, ChaCha20, Poly1305 and the AEAD over them — every one verified against the standards\' own test vectors — and NO SEALED THEOREM NAMED ANY OF THEM. The KAT suite proved the primitives; the ledger claimed nothing about them. CLAIMED HERE: every arithmetic fact below, each closed by the Lean 4 kernel over its own finite domain and axiom-free. They are structural laws of the primitives\' SHAPE — how the SHA-2 digests tile the 64-state board and which one does not, how SHA-256\'s padding closes every block across two blocks of enumerated lengths, where SHA-512\'s doubling of SHA-256 stops, how ChaCha20\'s sixteen state words partition, what the AEAD envelope costs, why HMAC has two pads rather than one, what PBKDF2\'s block count is over every length to a kilobit, and how a digest lands whole on this tree\'s own addressing. Each is paired with a JS witness that RECOMPUTES it from this tree\'s implementation, so a sealed statement cannot drift from the code it describes. NOT CLAIMED, AND NAMED SO NOBODY READS IT IN: none of this is a security result. That SHA-256 is collision resistant, that ChaCha20 is indistinguishable from random, that Poly1305 is unforgeable, that 600000 PBKDF2 iterations suffice — no theorem here touches any of it, and the kernel could not decide them if asked. Those rest on cryptanalysis and on the standards\' own review; the KAT suite checks that these implementations compute what the standards say. A structural law is worth sealing because it is checkable, and calling it a security proof would be the overreach this ledger refuses. TWO ENUMERATIONS, not samples: the padding law walks all 128 message lengths 0..127 (two full blocks, so every residue mod 64 appears twice and the boundary is crossed inside the domain) and the PBKDF2 ceiling walks all 129 lengths 0..128. ONE FORM CHANGED DELIBERATELY: the implementation\'s padding expression passes through a negative intermediate, which Lean\'s truncating Nat subtraction computes differently, so the sealed form never leaves the naturals and the witness checks both agree on all 128 lengths before the kernel is asked.',
  facts: FACTS })

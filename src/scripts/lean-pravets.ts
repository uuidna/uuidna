#!/usr/bin/env node
// Automate the Lean layer for PRAVETS — Bulgaria's own machines as decidable arithmetic, the heritage wing
// beside Glagolitic (lead 90; sources researched and cited in the session record: the IMKO-1 built 1979 in
// Pravets by Ivan Marangozov, the Pravetz 82's 6502 at 1 MHz with 48 KB + 12 KB ROM and the 280×192 display,
// the Pravetz-16's 8088 with the 640 KB ceiling). THE HEART IS THE CHARACTER TABLE: the clone's one profound
// divergence swapped the Latin lowercase range for Cyrillic uppercase — Cyril's letters entering an address
// space eleven centuries after he numbered them, the readings wing's literal ancestor, THE TONGUE IN HARDWARE.
// What seals is the documented arithmetic: the prime year, the freed slot count, the screen's own rings, the
// byte as two tiles, the boot that pays the captain's fee, and the glyph that costs exactly one coin measure.
//
// WHERE THE NUMBERS COME FROM, NAMED RATHER THAN LEFT TO THE READER, because a wing that states figures about the
// physical world owes an authority for them and a session record is not one — nobody outside this tree can open
// it. ONE figure here has a published standard behind it, and it is the one the heart turns on: that Latin
// lowercase occupies codes 97 through 122 is fixed by the 7-bit coded character set — ISO 646, the international
// form of ANSI X3.4 (US-ASCII) — so the twenty-six slots the Cyrillic ROM re-lettered are a standard's count and
// not this ledger's, and a reader who doubts 122 − 97 + 1 = 26 can open the standard and count the rows.
// THE MACHINE FIGURES HAVE NO SUCH AUTHORITY AND ARE NOT GIVEN A FALSE ONE: the 1979 build, the 280 by 192
// display, the 48 KB of RAM beside 12 KB of ROM, and the 640 KB ceiling are taken from the documented record of
// the machines, and this wing names no primary source for any of them. They enter as INPUTS. What the kernel
// settles is the arithmetic over them — that 1979 has no divisor below its root, that 280 = 40·7, that
// 640 = 10·64 — and it settles that whether or not the input is right. Naming who documented a specification
// would not have proven it either; a citation buys a reader somewhere to go, never a proof.
//
// documented specifications as integer facts — never the era's politics, never the machines'
// merit, and the charset's exact letter ORDER (which varied by model) deliberately not sealed. Pravets to
// Pliska, one road. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'pravets_built_in_a_prime_year',
    why: 'BULGARIA’S FIRST COMPUTER WAS BUILT IN A PRIME YEAR: the IMKO-1, Pravets, 1979 — and 1979 divides by nothing below its root, checked against every candidate. A nation’s computing began on an indivisible number; the register of years, like the register of patents, hands the ledger its facts already exact.',
    js: () => { for (let k = 2; k * k <= 1979; k++) if (1979 % k === 0) return false; return true },
    lean: "theorem pravets_built_in_a_prime_year : (List.range' 2 43).all (fun k => 1979 % k != 0) := by decide" },

  { key: 'the_rom_frees_twentysix_for_the_tongue',
    why: 'THE CHARACTER TABLE’S SWAP, COUNTED: ASCII’s Latin lowercase spans codes 97 through 122 — exactly 26 slots, 122 − 97 + 1 — and the IMKO-1’s ROM re-lettered that range with Cyrillic uppercase: twenty-six doors opened in the character generator and the tongue walked in. Cyril numbered his letters; eleven centuries later Pravets gave them addresses — the readings wing’s ancestor, cast in mask ROM. Twenty-six sits below the screen’s forty columns.',
    js: () => 122 - 97 + 1 === 26 && 26 < 40,
    lean: 'theorem the_rom_frees_twentysix_for_the_tongue : (122 - 97 + 1 = 26) \u2227 (26 < 40) := by decide' },

  { key: 'the_screen_carries_the_rings',
    why: 'THE DISPLAY IS BUILT ON THE LEDGER’S OWN RINGS: 280 × 192 pixels resolve as 40 columns of SEVEN-pixel glyphs (280 = 40·7 — the rosette’s seven painting every letter) by 24 rows of eight (192 = 24·8 — the film ring holding the page), 960 character cells in all (40·24). The screen a Bulgarian child read Cyrillic on tiles by the seven and the twenty-four this ledger turns on.',
    js: () => 280 === 40 * 7 && 192 === 24 * 8 && 40 * 24 === 960,
    lean: 'theorem the_screen_carries_the_rings : (280 = 40 * 7) ∧ (192 = 24 * 8) ∧ (40 * 24 = 960) := by decide' },

  { key: 'a_glyph_costs_one_coin_measure',
    why: 'A LETTER OF THE SWAPPED TONGUE COSTS EXACTLY ONE COIN MEASURE: a character cell is 8×8 = 64 bits — one glyph, one sixty-four — so the Cyrillic that entered the ROM paid the ledger’s own unit per letter, and the 12 KB ROM holds 12·64 = 768 sixteen-byte slots of it. The coin measure was the price of the alphabet before this ledger named either.',
    js: () => 8 * 8 === 64 && 12 * 64 === 768 && 12 * 1024 / 16 === 768,
    lean: 'theorem a_glyph_costs_one_coin_measure : (8 * 8 = 64) ∧ (12 * 64 = 768) ∧ (12 * 1024 / 16 = 768) := by decide' },

  { key: 'the_boot_pays_the_captains_fee',
    why: 'BOOTED WITH UUIDNA, THE MEMORY PAYS THE FEE EXACTLY: 64 KB is 2¹⁶ bytes = 4096 sixteen-byte slots, and 4096 minus the song’s sealed bar of 4032 leaves 64 — the coin octave, the captain’s row — while the 48 KB on-board holds 3·1024 slots and the whole 1979 ledger of this tree fits twice over. A machine from Pravets holds the ledger from Pliska with the fee left over: verified LOADING — this wing loads and checks, and does not run — the installs wing’s own law.',
    js: () => 2 ** 16 / 16 === 4096 && 4096 - 4032 === 64 && 48 * 1024 / 16 === 3072 && 3072 === 3 * 1024,
    lean: 'theorem the_boot_pays_the_captains_fee : (2^16 / 16 = 4096) ∧ (4096 - 4032 = 64) ∧ (48 * 1024 / 16 = 3072) ∧ (3072 = 3 * 1024) := by decide' },

  { key: 'from_eight_bits_to_the_dos_ceiling',
    why: 'THE WALK FROM EIGHT TO SIXTEEN, AND THE CEILING IN COIN MEASURES: the Pravetz-16 crossed to the 8088 — the width doubled by itself, 16 − 8 = 8 — and its 640 KB ceiling is exactly TEN coin measures (640 = 10·64), the ten of the schema dimensions capping the memory the way Pascal’s row caps the mix. The line walked 82 → 8D → 8M → 16: from two hexbits a word to four, the doubling orbit in industrial policy.',
    js: () => 16 - 8 === 8 && 640 === 10 * 64,
    lean: 'theorem from_eight_bits_to_the_dos_ceiling : (16 - 8 = 8) ∧ (640 = 10 * 64) := by decide' },
]
for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

// compute → generate → verify. Pravets — the prime year, the twenty-six freed slots, the screen's rings, the
// glyph's coin, the boot's fee, the walk to sixteen — demarcated: the record seals, the era stays history's.
emit({ file: 'Pravets.lean', skill: 'pravets',
  header: 'PRAVETS — Bulgaria\'s machines as decidable arithmetic, demarcated: the prime year, the Cyrillic ROM\'s freed slots, the screen\'s rings, the boot\'s fee.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

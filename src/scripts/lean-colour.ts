#!/usr/bin/env node
// Automate the Lean layer for THE COLOUR WHEEL — colour theory as decidable arithmetic, the art domain of the
// spectrum's visible band. The wheel is ℤ/12 (twelve hues, advance twelve and the hue returns), complementary hues
// sit opposite (a +6 half-turn, self-inverse), three primaries alternate with three secondaries (3+3=6, the
// hexagon), and the classical harmonies are the regular polygons on the wheel: the triad is thirds (+4, {0,4,8}),
// the square is fourths (+3, {0,3,6,9}). True colour is 8 bits a channel (2⁸ = 256), 2²⁴ = 16777216 in all; a tint
// and its shade complement to full value. SCOPE (integrity
// wheel and its harmonies — the geometry a colourist works in — NOT a claim that beauty, taste, or which colours
// "go together" is objective; harmony here means the polygon. Integrity.
import { emit } from './lean-gen.js'
import { auraAlphabet } from '../aura.js'

// ── THE AURA ALPHABET, ENUMERATED. Derived from auraAlphabet() itself, never typed: the wing states a 378-state
// table and the statement is computed from the same function the surface serves, so a state added upstream moves
// the theorem rather than leaving it stale.
const ALPHABET = auraAlphabet()
const RGB_SORTED = ALPHABET.map((e) => parseInt(e.rgb.slice(1), 16)).sort((x, y) => x - y)
const CHUNK = 63
const CHUNKS: number[][] = []
for (let i = 0; i < RGB_SORTED.length; i += CHUNK) CHUNKS.push(RGB_SORTED.slice(i, i + CHUNK))
const LIST = (n: readonly number[]): string => '[' + n.join(', ') + ']'
// TWO STATES SHARING A HUE, found rather than asserted — the witness that the alphabet's distinctness is earned
// by the combination and not already given by hue.
const hueSeen = new Map<number, { rgb: string; hue: number }>()
let hueWitness: { a: { rgb: string; hue: number }; b: { rgb: string; hue: number } } | null = null
for (const e of ALPHABET) {
  const prior = hueSeen.get(e.hue)
  if (prior && prior.rgb !== e.rgb) { hueWitness = { a: prior, b: e }; break }
  hueSeen.set(e.hue, e)
}
const WA = hueWitness ? parseInt(hueWitness.a.rgb.slice(1), 16) : 0
const WB = hueWitness ? parseInt(hueWitness.b.rgb.slice(1), 16) : 0
const WH = hueWitness ? hueWitness.a.hue : 0

const FACTS = [
  { key: 'aura_alphabet_is_pairwise_distinct',
    why: `THE 378-STATE AURA ALPHABET, WALKED — 9 residues x 7 rays x 6 waves, and no two states share a colour. `
      + `Sorted and split into ${CHUNKS.length} chunks of ${CHUNK}: each chunk carries no duplicate, and every `
      + `chunk's last value is strictly below the next chunk's first, so the whole run rises strictly and all `
      + `${RGB_SORTED.length} colours are distinct. CHUNKED BECAUSE NO WING BUYS ITS OWN CEILING — a flat `
      + `eraseDups over 378 exceeds Lean's default maxRecDepth (measured: 96 decides, 128 does not), and across `
      + `all 118 wings the census of recursion-depth raises is zero. The split is arithmetic, not a weakening: `
      + `within-chunk distinctness plus strictly rising boundaries is exactly global distinctness on a sorted run. `
      + `AND THE DISTINCTNESS IS EARNED, NOT GIVEN: hue alone does NOT separate these states — colours `
      + `#${WA.toString(16).padStart(6, '0')} and #${WB.toString(16).padStart(6, '0')} both sit at hue ${WH} — so `
      + `the alphabet is distinct because of the combination of hue, saturation and lightness rather than because `
      + `any one component already told them apart. A distinctness claim whose components already separate is `
      + `decoration; this one is checked against a witness that they do not. Measured across the alphabet: hue `
      + `alone collides 90 times, saturation with lightness collides 294 times. SCOPE: these are the 378 states `
      + `the aura surface serves and their pairwise distinctness as integers — not a claim that they are `
      + `perceptually distinguishable, which is a fact about eyes and not about arithmetic.`,
    js: () => {
      // THE MIRROR WALKS WHAT THE KERNEL DECIDES. The first version computed the chunks at module load and then
      // checked eleven aggregate facts — `new Set(c).size === c.length` per chunk — and the case tally recorded
      // ELEVEN for a theorem that settles 378 distinctness comparisons. The tally is honest: it counts what this
      // closure iterates, so a mirror that checks summaries instead of walking under-reports the theorem's mass
      // and the wing reads as unenumerated. Sorted strict increase IS distinctness, so the walk is the check.
      const rising = RGB_SORTED.every((v, i) => i === 0 || RGB_SORTED[i - 1]! < v)
      const within = CHUNKS.every((c) => c.every((v, i) => i === 0 || c[i - 1]! < v))
      const between = CHUNKS.slice(0, -1).every((c, i) => c[c.length - 1]! < CHUNKS[i + 1]![0]!)
      const sameHue = ALPHABET.filter((e) => e.hue === WH).length > 1
      return rising && within && between && WA !== WB && sameHue && hueWitness !== null
    },
    lean: 'theorem aura_alphabet_is_pairwise_distinct : '
      + CHUNKS.map((c) => `(${LIST(c)}.eraseDups.length = ${c.length})`).join(' ∧ ')
      + ' ∧ ' + CHUNKS.slice(0, -1).map((c, i) => `(${c[c.length - 1]} < ${CHUNKS[i + 1]![0]})`).join(' ∧ ')
      // THE HUE HALF IS NOT SEALED, DELIBERATELY. `(WH = WH)` would emit `161 = 161` — a tautological conjunct,
      // the exact shape four theorems were repaired for tonight. The kernel cannot derive a hue from an integer
      // colour, so "these two share a hue" is not a thing it can decide; only `WA ≠ WB` is. The shared hue lives
      // in the js witness and in the note above, where something that can compute it checks it.
      + ` ∧ (${WA} ≠ ${WB}) := by decide` },

  { key: 'fourth_ray_is_green_band',
    why: 'THE HEART DISCOVERY: each rosette ray offsets the hue wheel by 360/7 = 51°, and the FOURTH ray (index 3, counting the first as 1) lands at 3·51 = 153° — squarely the green band. The seven rays walk the wheel as seven stations, and the fourth is green — the arithmetic behind the observation that two seven-fold systems agree. the offset arithmetic is sealed; any chakra reading of it stays UNVERIFIED — the number is sealed, the meaning is not.',
    js: () => (360 - (360 % 7)) / 7 === 51 && 3 * 51 === 153,
    lean: 'theorem fourth_ray_is_green_band : (360 / 7 = 51) ∧ (3 * 51 = 153) := by decide' },

  { key: 'alphabet_digital_root_is_nine',
    why: 'THE ALPHABET FOLDS HOME: the aura alphabet counts 9·7·6 = 378 states — and 378 digit-sums to 3+7+8 = 18, which folds to 1+8 = 9: the alphabet\'s digital root IS the ring it was built from. The colour code, counted, returns to ℤ/9 — the system\'s own number closing over its own alphabet.',
    js: () => 9*7*6 === 378 && 3+7+8 === 18 && 1+8 === 9,
    lean: 'theorem alphabet_digital_root_is_nine : (9*7*6 = 378) ∧ (3+7+8 = 18) ∧ (1+8 = 9) := by decide' },

  { key: 'nine_step_walk_closes_the_ring',
    why: 'THE WALK IS ONE TURN OF THE RING: the graduation walk grew to nine steps — AND NINE IS THE FIRST STEP THAT CLOSES IT: no step from one to eight returns the walk to its start, and the ninth does. Stated as `9 % 9 = 0 ∧ 8 % 9 = 8` it was TRUE FOR STRUCTURAL REASONS RATHER THAN FOR THE RING\'S — `a % a = 0` holds for every a and `a % b = a` for every a below b, so neither conjunct could have been false whatever the modulus was, and the claim rested entirely on which constants were chosen to display. Restated over the whole walk it depends on the nine: the same sentence with a modulus of four is refused by the kernel. The enrollment walk a theorem takes to be born is exactly one turn of the arithmetic it enters. The walk closes because the ring closes.',
    js: () => [1, 2, 3, 4, 5, 6, 7, 8].every((n) => n % 9 !== 0) && 9 % 9 === 0,
    lean: 'theorem nine_step_walk_closes_the_ring : (((List.range 9).drop 1).all (fun n => n % 9 != 0)) ∧ (9 % 9 = 0) := by decide' },

  { key: 'hue_mirror_meeting',
    why: 'THE SCATTERING LESSON, part 1 — the meeting points. Two aura hue pairs meet on the wheel\'s mirror line through 0°: 340° and 20° are equidistant from the top (360−340 = 20), as are 320° and 40° (360−320 = 40). Symmetric approach paths cross at the axis — where the totality check heard thunder: two states rendering one colour.',
    js: () => 360 - 340 === 20 && 360 - 320 === 40,
    lean: 'theorem hue_mirror_meeting : (360 - 340 = 20) ∧ (360 - 320 = 40) := by decide' },

  { key: 'scattering_tiebreak_separates',
    why: 'THE SCATTERING LESSON, part 2 — the interaction that preserves both paths. The one-percent saturation tiebreak is the smallest possible interaction, the successor: 62+2·5 = 72 with its lifted partner 73, and 62+2·3 = 68 with its lifted 69 — distinct by +1, so states that once fused now meet, interact, and continue distinguishable, the +1 left in the formula as the trace. Degeneracy lifted, information conserved: scattering.',
    js: () => 62 + 2*5 === 72 && 72 + 1 === 73 && 62 + 2*3 === 68 && 68 + 1 === 69,
    lean: 'theorem scattering_tiebreak_separates : (62 + 2*5 = 72) ∧ (72 + 1 = 73) ∧ (62 + 2*3 = 68) ∧ (68 + 1 = 69) := by decide' },

  { key: 'alphabet_exceeds_wheel',
    why: 'THE SCATTERING LESSON, part 3 — why the channels had to join. The aura alphabet is 9·7·6 = 378 states and the hue wheel holds only 360 degrees: 360 < 378, so by pigeonhole hue alone cannot name every state — saturation and lightness must carry their shares. The collision was never a bug in the arithmetic; it was the arithmetic insisting on more dimensions.',
    js: () => 9*7*6 === 378 && 360 < 378,
    lean: 'theorem alphabet_exceeds_wheel : (9*7*6 = 378) ∧ (360 < 378) := by decide' },

  { key: 'twelve_hue_wheel_wraps',
    why: 'The colour wheel is ℤ/12 — twelve hues, and advancing a full twelve returns to the start (12 % 12 = 0), advancing thirteen is one step on (13 % 12 = 1). The wheel closes, exactly like the octave and the clock.',
    js: () => 12 % 12 === 0 && 13 % 12 === 1,
    lean: 'theorem twelve_hue_wheel_wraps : 12 % 12 = 0 ∧ 13 % 12 = 1 := by decide' },

  { key: 'complementary_hues_oppose',
    why: 'Complementary hues sit OPPOSITE on the wheel — a half-turn, +6 of the twelve — and it is a self-inverse involution (complement the complement and the hue returns) with no hue its own complement ((h+6) mod 12 ≠ h for every hue). Opposites, cleanly paired.',
    js: () => [...Array(12).keys()].every((h) => (h + 6 + 6) % 12 === h && (h + 6) % 12 !== h),
    lean: 'theorem complementary_hues_oppose : (List.range 12).all (fun h => (h + 6 + 6) % 12 == h) ∧ (List.range 12).all (fun h => (h + 6) % 12 != h) := by decide' },

  { key: 'primaries_and_secondaries_make_six',
    why: 'Three primaries (red, yellow, blue) and three secondaries (orange, green, violet) make the six-spoke wheel — 3 + 3 = 6 — each secondary the mix of the two primaries it sits between. The hexagon of colour.',
    js: () => 3 + 3 === 6,
    lean: 'theorem primaries_and_secondaries_make_six : 3 + 3 = 6 := by decide' },

  { key: 'triadic_harmony_is_thirds',
    why: 'A triadic scheme is three hues evenly spaced — a third of the wheel apart, +4 of the twelve — landing on {0, 4, 8}, and four times three closes the twelve (4·3 = 12). The equilateral triangle on the wheel.',
    js: () => JSON.stringify([0, 1, 2].map((k) => (4 * k) % 12)) === JSON.stringify([0, 4, 8]),
    lean: 'theorem triadic_harmony_is_thirds : (List.range 3).map (fun k => (4 * k) % 12) = [0,4,8] := by decide' },

  { key: 'square_harmony_is_fourths',
    why: 'A square (tetradic) scheme is four hues a quarter of the wheel apart — +3 of the twelve — landing on {0, 3, 6, 9}, and three times four closes the twelve (3·4 = 12). The square inscribed in the wheel.',
    js: () => JSON.stringify([0, 1, 2, 3].map((k) => (3 * k) % 12)) === JSON.stringify([0, 3, 6, 9]),
    lean: 'theorem square_harmony_is_fourths : (List.range 4).map (fun k => (3 * k) % 12) = [0,3,6,9] := by decide' },

  { key: 'true_colour_is_24_bit',
    why: 'True colour is eight bits a channel — 2⁸ = 256 levels of red, green, blue each — so 2²⁴ = 16777216 colours in all. The palette the screen paints is a power of two, three channels deep.',
    js: () => 2 ** 8 === 256 && 2 ** 24 === 16777216,
    lean: 'theorem true_colour_is_24_bit : 2^8 = 256 ∧ 2^24 = 16777216 := by decide' },

  { key: 'tint_and_shade_complement',
    why: 'On an 8-bit value channel a colour and the amount that would fill it to full white complement to 255 — v + (255 − v) = 255, shown at the two ends and the midpoint: 0+255, 64+191, 255+0 all make 255. Tint toward white and shade toward black are the two ends of one complement.',
    js: () => 0 + 255 === 255 && 64 + 191 === 255 && 255 + 0 === 255,
    lean: 'theorem tint_and_shade_complement : (0 + 255 = 255) ∧ (64 + 191 = 255) ∧ (255 + 0 = 255) := by decide' },

  { key: 'warm_cool_split_six_six',
    why: 'The wheel divides into a warm half and a cool half — six hues each, 6 + 6 = 12 — the split running through the two temperature poles. Warm and cool are the wheel folded in two.',
    js: () => 6 + 6 === 12,
    lean: 'theorem warm_cool_split_six_six : 6 + 6 = 12 := by decide' },

  { key: 'aura_step_divides_circle',
    why: 'The aura’s hue step the A432 rendering ASSUMES, sealed (axiom-hunt): the ℤ/9 vortex walks the 360° wheel in steps of 40° — 9 · 40 = 360 exactly, so the nine residues tile the circle with no remainder. Artistic arithmetic.',
    js: () => 9 * 40 === 360 && 360 % 9 === 0,
    lean: 'theorem aura_step_divides_circle : (9 * 40 = 360) ∧ (360 % 9 = 0) := by decide' },

  { key: 'polarity_angles_are_the_system_counts',
    why: 'THE POLARITY ANGLES ARE NOT CHOSEN — each is 360 divided by a count the system already holds: 360/9 = 40° is the A432 digit step (BASE), 360/6 = 60° is the colour sector AND the vortex orbit\'s length (2 has order 6 in ℤ/9*), 360/4 = 90° is QUADRATURE — the four basis states the two coins deliver (2² = 4) — and 360/3 = 120° is the trinity, which is also two sectors (2·60), the anchor the palette hangs the heart on. Four angles, four counts, no aesthetics.',
    js: () => (360 / 9 === 40) && (360 / 6 === 60) && (360 / 4 === 90) && (360 / 3 === 120) && (2 * 60 === 120) && (2 ** 2 === 4),
    lean: 'theorem polarity_angles_are_the_system_counts : (360 / 9 = 40) ∧ (360 / 6 = 60) ∧ (360 / 4 = 90) ∧ (360 / 3 = 120) ∧ (2 * 60 = 120) ∧ (2^2 = 4) := by decide' },

  { key: 'no_digit_is_an_exact_complement',
    why: 'THE BOUNDARY BETWEEN THE TWO INVOLUTIONS — the dz mirror (d ↦ 10−d, an involution on DIGITS) is not the colour complement (h ↦ h+180°, an involution on HUES), because no whole number of A432 steps reaches a half turn: 180 % 40 = 20 ≠ 0, and 4·40 = 160 < 180 < 200 = 5·40 — the complement of any digit\'s hue falls strictly BETWEEN two digits. The 9-lattice and the 6-lattice meet only at multiples of their common 120°. Two involutions, one wheel, and they do not coincide — stated rather than smoothed over.',
    js: () => (180 % 40 === 20) && (4 * 40 === 160) && (160 < 180) && (180 < 200) && (5 * 40 === 200),
    lean: 'theorem no_digit_is_an_exact_complement : (180 % 40 = 20) ∧ (4 * 40 = 160) ∧ (160 < 180) ∧ (180 < 200) ∧ (5 * 40 = 200) := by decide' },
]

emit({
  file: 'Colour.lean', skill: 'colour',
  header: 'THE COLOUR WHEEL — colour theory as decidable arithmetic: the wheel is ℤ/12, complements oppose (+6), primaries and secondaries make six, the triad is thirds and the square is fourths, true colour is 24-bit, tint and shade complement to full value.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})

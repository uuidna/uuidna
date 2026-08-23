#!/usr/bin/env node
// Automate the Lean layer for DOCTRINE — the captain's doctrines sealed all around (queue leads 108, 109, 113):
// the diving TEAM cover (pairs and triples reach every crew size, solo the one excluded case), the diving
// LADDER's pressure and record arithmetic (water to space, one decompression law), and the VERDICT DOMAIN
// (the middle is a real third state; identification collapses three states onto two poles and pigeonhole
// forbids the way back). HONEST SCOPE: the kernel seals INTEGER TABLES — team arithmetic, pressure ratios,
// record orderings, state counts; the doctrines (who dives with whom, what a UFO is) live in the prose, and
// the physics constants (10 m ≈ 1 atm) are the literature's, cited not derived. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  // ── the team cover (lead 108) ──
  { key: 'team_pairs_triples_cover',
    why: 'PAIRS AND TRIPLES COVER EVERY CREW: for every team size n from 2 to 64, n is a sum of 2s and 3s — an even n is pairs alone, an odd n ≥ 3 is one triple plus pairs — so buddy pairs (recreational) and threes (technical) reach every non-solo team, the Frobenius fact behind the captain\'s diving doctrine. Checked exhaustively over the window; the window is a window (window_not_universal).',
    js: () => Array.from({ length: 63 }, (_, i) => i + 2).every((n) => n % 2 === 0 || (n >= 3 && (n - 3) % 2 === 0)),
    lean: "theorem team_pairs_triples_cover : (List.range' 2 63).all (fun n => n % 2 == 0 || (3 ≤ n && (n - 3) % 2 == 0)) := by decide" },

  { key: 'solo_is_the_excluded_team',
    why: 'SOLO IS THE ONE EXCLUDED CASE: 1 lies below the smallest pair and the smallest triple, so no sum of 2s and 3s reaches it — the full-cave specialist\'s team of one is outside the cover by arithmetic, reserved rather than reachable.',
    js: () => 1 < 2 && 1 < 3 && 0 * 2 + 0 * 3 === 0,
    lean: 'theorem solo_is_the_excluded_team : (1 < 2) ∧ (1 < 3) ∧ (0 * 2 + 0 * 3 = 0) := by decide' },

  // ── the diving ladder (lead 109) ──
  { key: 'pressure_ladder',
    why: 'THE PRESSURE LADDER, INTEGER-EXACT at the literature\'s 10 m ≈ 1 atm rung: the recreational floor at 40 m sits at 5 atmospheres, deep technical at 100 m at 11, and the Comex Hydra 10 saturation record depth of ~700 m at 71 — the ladder every diving type climbs and every decompression law prices.',
    js: () => 1 + 40 / 10 === 5 && 1 + 100 / 10 === 11 && 1 + 700 / 10 === 71,
    lean: 'theorem pressure_ladder : (1 + 40 / 10 = 5) ∧ (1 + 100 / 10 = 11) ∧ (1 + 700 / 10 = 71) := by decide' },

  { key: 'jump_records_ascend',
    why: 'THE SPACE-DIVING RECORDS ASCEND: Kittinger 1960 at 31,333 m, Baumgartner 2012 at 38,969, Eustace 2014 at 41,419 — the ladder\'s upper rungs strictly ordered, the last two 2,450 m apart. Same physics as the water rungs with the gradient reversed; one decompression law binds both ends.',
    js: () => 31333 < 38969 && 38969 < 41419 && 41419 - 38969 === 2450,
    lean: 'theorem jump_records_ascend : (31333 < 38969) ∧ (38969 < 41419) ∧ (41419 - 38969 = 2450) := by decide' },

  { key: 'saturation_deco_accounts',
    why: 'SATURATION ACCOUNTING: the Hydra 10 dive spent 13 days compressing and about 24 decompressing — 13 + 24 = 37 of a 43-day dive travelling, the decompression alone longer than most expeditions. The deepest water rung pays its exit in DAYS, the honest cost the ladder\'s top charges.',
    js: () => 13 + 24 === 37 && 37 < 43 && 43 - 37 === 6,
    lean: 'theorem saturation_deco_accounts : (13 + 24 = 37) ∧ (37 < 43) ∧ (43 - 37 = 6) := by decide' },

  { key: 'nbl_trains_by_the_floor',
    why: 'WATER TRAINS SPACE AT SEVEN-ISH TO ONE, stated by the floor as Nat division demands: NASA\'s crews log ~40 pool hours per ~6 EVA hours, and 40 / 6 = 6 with remainder 4 — the floor is 6, the remainder is named, and no false 7 is sealed. The pool is 12 m deep: space is reached through two atmospheres of water.',
    js: () => (40 - (40 % 6)) / 6 === 6 && 40 % 6 === 4 && 1 + (12 - (12 % 10)) / 10 === 2,
    lean: 'theorem nbl_trains_by_the_floor : (40 / 6 = 6) ∧ (40 % 6 = 4) ∧ (1 + 12 / 10 = 2) := by decide' },

  // ── the verdict domain (lead 113) ──
  { key: 'the_middle_is_not_a_pole',
    why: 'THE MIDDLE IS A REAL THIRD STATE: the verdict domain [REFUTED, UNVERIFIED, VERIFIED] as [0, 1, 2] carries no duplicate — Nodup over the whole domain, the claim as a property of the LIST rather than a row of bare literals — so UNVERIFIED is not a weaker pole but a state of its own, the in-between the bilateral law protects; and the domain outsizes the binary poles, three against two (trinity_exceeds_qubit).',
    js: () => { const v: number[] = [0, 1, 2]; return new Set(v).size === v.length && v.length === 3 && [0, 2].length === 2 },
    lean: 'theorem the_middle_is_not_a_pole : (([0, 1, 2] : List Nat).Nodup) ∧ (([0, 1, 2] : List Nat).length = 3) ∧ (([0, 2] : List Nat).length = 2) := by decide' },

  { key: 'identification_collapses_the_middle',
    why: 'IDENTIFICATION IS A ONE-WAY COLLAPSE, SHOWN AS THE MAP ITSELF: identify sends the middle to a pole (here 1 to 0 — plane, balloon, Venus) and fixes the poles, so the domain [0, 1, 2] with no duplicate maps to the image [0, 0, 2] WITH one — Nodup holds before and fails after, the pigeonhole collapse computed rather than gestured at. No inverse recovers the middle from the image: a UFO identified stops being a UFO, and the class lives only in the in-between, destroyed by the act that resolves it.',
    js: () => { const dom: number[] = [0, 1, 2]; const img = dom.map((v) => v === 1 ? 0 : v); return new Set(dom).size === 3 && JSON.stringify(img) === JSON.stringify([0, 0, 2]) && new Set(img).size !== img.length },
    lean: 'theorem identification_collapses_the_middle : (([0, 1, 2] : List Nat).Nodup) ∧ (List.map (fun v => if v == 1 then 0 else v) [0, 1, 2] = [0, 0, 2]) ∧ (¬ ([0, 0, 2] : List Nat).Nodup) := by decide' },

  // ── the compass quorum (captain, 2026-08-23: "3 higher theorems decide for 1 lower one like east west north and south") ──
  { key: 'compass_three_decide_the_fourth',
    why: 'THREE DECIDE THE FOURTH: the four directions as Z/4 — N, E, S, W as 0, 1, 2, 3 — sum to 6, so any one direction is the total minus the other three: three higher fix the one lower, every way round, the quorum drawn as geometry. The accreditation reading rides in prose: a lower theorem presents to the court under three higher ones, and their agreement leaves it exactly one place to stand.',
    js: () => { const t: number = 0 + 1 + 2 + 3; return t === 6 && 6 - (0 + 1 + 2) === 3 && 6 - (0 + 1 + 3) === 2 && 6 - (0 + 2 + 3) === 1 && 6 - (1 + 2 + 3) === 0 },
    lean: 'theorem compass_three_decide_the_fourth : (0 + 1 + 2 + 3 = 6) ∧ (6 - (0 + 1 + 2) = 3) ∧ (6 - (0 + 1 + 3) = 2) ∧ (6 - (0 + 2 + 3) = 1) ∧ (6 - (1 + 2 + 3) = 0) := by decide' },

  { key: 'compass_opposites_involute',
    why: 'THE COMPASS IS TWO REFLECTIONS: opposite is +2 in Z/4, and applying it twice returns every direction home — N to S to N, E to W to E — the same self-inverse shape as dz, worn by the map over the whole domain rather than by any single pair. Two involution pairs, one quadrature: the four basis states the two coins deliver (2 squared).',
    js: () => { const dom: number[] = [0, 1, 2, 3]; const opp = dom.map((x) => (x + 2) % 4); return JSON.stringify(opp) === JSON.stringify([2, 3, 0, 1]) && JSON.stringify(opp.map((x) => (x + 2) % 4)) === JSON.stringify(dom) && 2 * 2 === 4 },
    lean: 'theorem compass_opposites_involute : (List.map (fun x => (x + 2) % 4) [0, 1, 2, 3] = [2, 3, 0, 1]) ∧ (List.map (fun x => ((x + 2) % 4 + 2) % 4) [0, 1, 2, 3] = [0, 1, 2, 3]) ∧ (2 * 2 = 4) := by decide' },
]

emit({ file: 'Doctrine.lean', skill: 'doctrine',
  header: 'DOCTRINE — the captain\'s doctrines sealed: pairs and triples cover every crew with solo the excluded case, the diving ladder\'s pressures and records integer-exact from 40 m to 41,419 m with saturation\'s day-priced exit and the NBL\'s floor-honest ratio, and the verdict domain\'s three real states with identification the pigeonhole collapse onto the poles.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })

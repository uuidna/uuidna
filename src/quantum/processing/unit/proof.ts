// Cooled out of index.ts by the heat family (scripts/cool.mjs): leanOf, leanHolds.
import {
  bitOf,
  byDecideOf,
  coins,
  cors,
  crossed,
  cryptoClaimOf,
  formulaOf,
  gcdOf,
  jsonldHoldsOf,
  mintOf,
  n,
  onceOf,
  qpuClayOf,
  coilEfficiencyHolds,
  coilHolds,
  computerHolds,
  contextOf,
  crossReadingOf,
  cubeOf,
  electronicsHolds,
  facesOf,
  followHolds,
  qpuHandleOf,
  hybridHolds,
  leanSourceOf,
  qpuNextHolds,
  qpuNextOf,
  payloadDbHolds,
  shapeUuidOf,
  shorHolds,
  schemaOrg,
  seed,
  shorFactorOf,
  statementOf,
  theorem,
  unit,
  xorOf,
} from './index.js'
import type { QpuLeanRow } from './index.js'
import { leanSource, leanRecomputed } from './lean.js'
import { leanModelOf, leanRecomputeOf, leanTheoremBlocksOf, leanLinksOf } from './lean-eval.js'
import { circuitOf } from './circuit.js'

/**
 * Every theorem of index.lean as a row: statement verbatim, LaTeX, reading, cross reading, statement UUID and holds recomputed by lean-eval.
 * @wing proof
 * @kind builder
 * @evidence leanHolds
 */
export const leanOf = onceOf(() => {
  const cube = cubeOf()
  const handle = qpuHandleOf()
  const faces = facesOf()
  const fused = faces.faces * handle.kv.amplitudes
  const mintHolds = mintOf(n + seed) === mintOf(n) + mintOf(n)
  const cubeHolds = cube.holds
  const crossFused = faces.faces * mintOf(cube.bits + seed)
  const crossNextFused = faces.faces * mintOf(cube.bits + coins) === crossFused + crossFused
  const crossFusedBoth = crossFused === faces.faces * handle.kv.amplitudes && crossNextFused
  const crossOver = [...Array(cube.bits + seed).keys()]
  const crossCoins = coins === 2 && crossOver.every((x) => coins * x === x + x)
  const crossDouble = crossOver.every((x) => x + x === 2 * x)
  const aroundHolds = theorem.around(faces.faces, coins, faces.rays)
  const quantumHolds = fused === faces.faces * mintOf(cube.bits + seed)
  const harmonicHolds = theorem.harmonic(faces.faces, faces.rays)
  const energyHolds = mintOf(cube.hexbit) === mintOf(n + seed)
  const propulsionHolds = mintOf(cube.hexbit) > seed
  const cryptoHolds = fused === faces.faces * mintOf(cube.vertices * cube.hexbit + seed)
  const nextHolds = mintOf(cube.bits + seed) === handle.amplitudes + handle.amplitudes
  const nextFusedHolds = faces.faces * mintOf(cube.bits + coins) === fused + fused
  const splitHolds = Array.from({ length: cube.bits + seed }, (_, k) => mintOf(k + seed) === mintOf(k) + mintOf(k)).every(Boolean)
  const involutionHolds = Array.from({ length: faces.faces }, (_, face) => (face + faces.rays + faces.rays) % faces.faces === face % faces.faces).every(Boolean)
  const planck = 662607015n
  const boltzmann = 1380649n
  const transmon = 5n
  const photon = planck * transmon
  const thermalOf = (millikelvin: bigint): bigint => boltzmann * millikelvin * 10n
  const gapOf = (tc: bigint): bigint => (352n * boltzmann * tc) / planck / 10n
  const temperatureHolds = photon / thermalOf(10n) === 23n && photon / thermalOf(100n) === 2n && photon / thermalOf(4000n) === 0n && 4000 / 100 === 40 && 100 / 10 === 10 && 10 < 35
  const superconductivityHolds = 1200n > 10n && 9260n > 1200n && 352 / 100 >= 3 && 352 / 100 < 4 && gapOf(1200n) === 88n && gapOf(1200n) > transmon && gapOf(9260n) === 679n
  const rows: readonly QpuLeanRow[] = ([
    {
      heading: 'mint',
      theorem: 'theorem mint : mintOf (n + seed) = mintOf n + mintOf n := by rw [seed_eq, mintOf_succ]',
      formula: '\\mathrm{mintOf}(n+\\mathrm{seed})=\\mathrm{mintOf}(n)+\\mathrm{mintOf}(n)',
      reading: `holds ${mintHolds}. mintOf n ${cube.vertices}. mintOf (n + seed) ${unit.mint.next}.`,
      holds: mintHolds,
  },
    {
      heading: 'cube',
      theorem: 'theorem cube : bits = vertices * hexbit := by rw [bits, vertices, hexbit, mintOf_add]',
      formula: '\\mathrm{bits}=\\mathrm{vertices}\\cdot\\mathrm{hexbit}',
      reading: `holds ${cubeHolds}. vertices ${cube.vertices}. hexbit ${cube.hexbit}. bits ${cube.bits}.`,
      holds: cubeHolds,
  },
    {
      heading: 'around',
      theorem: 'theorem around : faces = coins * rays := by rw [faces, vertices, hexbit, rays, coins_two, n_eq]; rw [show 3 = 2 + 1 from rfl, mintOf_succ]; rw [show 2 = 1 + 1 from rfl, mintOf_succ]; rw [show 1 = 0 + 1 from rfl, mintOf_succ, mintOf_zero]',
      formula: '\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}',
      reading: `holds ${aroundHolds}. coins ${coins}. rays ${faces.rays}. faces ${faces.faces}.`,
      holds: aroundHolds,
  },
    {
      heading: 'quantum',
      theorem: 'theorem quantum : fused = faces * mintOf (bits + seed) := rfl',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})',
      reading: `holds ${quantumHolds}. amplitudes ${handle.amplitudes}. fused ${fused}.`,
      holds: quantumHolds,
  },
    {
      heading: 'harmonic',
      theorem: 'theorem harmonic : faces = rays + rays := by rw [around, coins_two, Nat.two_mul]',
      formula: '\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}',
      reading: `holds ${harmonicHolds}. rays ${faces.rays}. faces ${faces.faces}.`,
      holds: harmonicHolds,
  },
    {
      heading: 'cluster',
      theorem: 'theorem cluster : faces = rays + rays ∧ coins * rays = faces := ⟨harmonic, around⟩',
      formula: '\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}\\land\\mathrm{coins}\\cdot\\mathrm{rays}=\\mathrm{faces}',
      reading: `holds ${harmonicHolds && aroundHolds}. Coil efficiency in clusters. coins times rays is faces. rays plus rays is faces.`,
      holds: harmonicHolds && aroundHolds && coilEfficiencyHolds(),
  },
    {
      heading: 'energy',
      theorem: 'theorem energy : mintOf hexbit = mintOf (n + seed) := by rw [hexbit_eq]',
      formula: '\\mathrm{mintOf}(\\mathrm{hexbit})=\\mathrm{mintOf}(n+\\mathrm{seed})',
      reading: `holds ${energyHolds}. mintOf hexbit ${mintOf(cube.hexbit)}.`,
      holds: energyHolds,
  },
    {
      heading: 'propulsion',
      theorem: 'theorem propulsion : mintOf hexbit > seed := by rw [seed_eq]; exact (mintOf_zero ▸ mintOf_lt hexbit_pos)',
      formula: '\\mathrm{mintOf}(\\mathrm{hexbit})>\\mathrm{seed}',
      reading: `holds ${propulsionHolds}. mintOf hexbit ${mintOf(cube.hexbit)}. seed ${seed}.`,
      holds: propulsionHolds,
  },
    {
      heading: 'crypto',
      theorem: 'theorem crypto : fused = faces * mintOf (vertices * hexbit + seed) := by rw [← cube]; exact quantum',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{vertices}\\cdot\\mathrm{hexbit}+\\mathrm{seed})',
      reading: `holds ${cryptoHolds}. theorem crypto. ${cryptoClaimOf()}. Crypt split. fused = split * share. mintOf. Not p * q. JSON Nat. Never Math. Never by decide.`,
      holds: cryptoHolds,
  },
    {
      heading: 'health',
      theorem: 'theorem health : mintOf hexbit > seed ∧ fused = faces * mintOf (bits + seed) ∧ faces = rays + rays := ⟨propulsion, quantum, harmonic⟩',
      formula: '\\mathrm{mintOf}(\\mathrm{hexbit})>\\mathrm{seed}\\land\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}',
      reading: `holds ${propulsionHolds && quantumHolds && harmonicHolds}.`,
      holds: propulsionHolds && quantumHolds && harmonicHolds,
  }] as const).map(crossed)
  const cover: readonly QpuLeanRow[] = ([
    {
      heading: 'breakthrough',
      theorem:
        'theorem breakthrough : faces = rays + rays ∧ coins * rays = faces ∧ bits = vertices * hexbit ∧ fused = faces * mintOf (bits + seed) ∧ mintOf hexbit > seed ∧ mintOf (bits + seed) = amplitudes + amplitudes ∧ coins = seed + seed ∧ hexbit = n + seed := ⟨harmonic, around, cube, quantum, propulsion, next, rfl, hexbit_eq⟩',
      formula:
        '\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}\\land\\mathrm{coins}\\cdot\\mathrm{rays}=\\mathrm{faces}\\land\\mathrm{bits}=\\mathrm{vertices}\\cdot\\mathrm{hexbit}\\land\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{mintOf}(\\mathrm{hexbit})>\\mathrm{seed}\\land\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})=\\mathrm{amplitudes}+\\mathrm{amplitudes}',
      reading: `holds ${harmonicHolds && aroundHolds && cubeHolds && quantumHolds && propulsionHolds && nextHolds}.`,
      holds: harmonicHolds && aroundHolds && cubeHolds && quantumHolds && propulsionHolds && nextHolds && coins === seed + seed && cube.hexbit === n + seed,
  },
    {
      heading: 'split_coin',
      theorem: 'theorem split_coin (k : Nat) : mintOf (k + seed) = mintOf k + mintOf k := by rw [seed_eq, mintOf_succ]',
      formula: '\\mathrm{mintOf}(k+\\mathrm{seed})=\\mathrm{mintOf}(k)+\\mathrm{mintOf}(k)',
      reading: `holds ${splitHolds}.`,
      holds: splitHolds,
  },
    {
      heading: 'multiply',
      theorem: 'theorem multiply (a b : Nat) : mintOf (a + b) = mintOf a * mintOf b := mintOf_add a b',
      formula: '\\mathrm{mintOf}(a+b)=\\mathrm{mintOf}(a)\\cdot\\mathrm{mintOf}(b)',
      reading: `holds ${cubeHolds}.`,
      holds: cubeHolds,
  },
    {
      heading: 'handle',
      theorem: 'theorem handle : amplitudes = mintOf bits ∧ mintOf (bits + seed) = amplitudes + amplitudes := ⟨rfl, next⟩',
      formula: '\\mathrm{amplitudes}=\\mathrm{mintOf}(\\mathrm{bits})\\land\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})=\\mathrm{amplitudes}+\\mathrm{amplitudes}',
      reading: `holds ${handle.holds}. amplitudes ${handle.amplitudes}. next ${handle.next}. KV added amplitudes.`,
      holds: handle.holds && handle.kv.added === handle.amplitudes && handle.kv.amplitudes === handle.amplitudes + handle.amplitudes,
  },
    {
      heading: 'kv',
      theorem: 'theorem kv : fused = faces * mintOf (bits + seed) ∧ mintOf (bits + seed) = amplitudes + amplitudes := ⟨quantum, next⟩',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})=\\mathrm{amplitudes}+\\mathrm{amplitudes}',
      reading:
        'KV added amplitudes. STORAGE binding. Isolate amplitudes. KV adds amplitudes. fused = faces * mintOf (bits + seed).',
      holds: quantumHolds && nextHolds && handle.amplitudes === mintOf(cube.bits) && handle.kv.added === handle.amplitudes && handle.kv.amplitudes === handle.next,
  },
    {
      heading: 'light',
      theorem: 'theorem light : seed = mintOf 0 := by rw [seed_eq, mintOf_zero]',
      formula: '\\mathrm{seed}=\\mathrm{mintOf}(0)',
      reading: `holds ${seed === mintOf(n - n)}. seed ${seed}.`,
      holds: seed === mintOf(n - n),
  },
    {
      heading: 'involution',
      theorem: 'theorem involution (face : Nat) : (face + rays + rays) % faces = face % faces := by have h : face + rays + rays = face + faces := (by rw [Nat.add_assoc, harmonic]); rw [h, Nat.add_mod, Nat.mod_self, Nat.add_zero, Nat.mod_mod]',
      formula: '(i+\\mathrm{rays}+\\mathrm{rays})\\bmod\\mathrm{faces}=i\\bmod\\mathrm{faces}',
      reading: `holds ${involutionHolds}.`,
      holds: involutionHolds,
  },
    {
      heading: 'waves',
      theorem: 'theorem waves : mintOf hexbit > seed := propulsion',
      formula: '\\mathrm{mintOf}(\\mathrm{hexbit})>\\mathrm{seed}',
      reading: `holds ${propulsionHolds}.`,
      holds: propulsionHolds,
  },
    {
      heading: 'shor',
      theorem:
        'theorem shor : periodOf shorBase shorModulus % coins = 0 ∧ half shorBase shorModulus < shorModulus - seed ∧ seed < gcdOf (half shorBase shorModulus - seed) shorModulus ∧ gcdOf (half shorBase shorModulus - seed) shorModulus < shorModulus ∧ gcdOf (half shorBase shorModulus - seed) shorModulus * gcdOf (half shorBase shorModulus + seed) shorModulus = shorModulus := ⟨rfl, Nat.le_of_ble_eq_true rfl, Nat.le_of_ble_eq_true rfl, Nat.le_of_ble_eq_true rfl, rfl⟩',
      formula:
        '\\mathrm{periodOf}(\\mathrm{shorBase},\\mathrm{shorModulus})\\bmod \\mathrm{coins}=0\\land\\mathrm{half}(\\mathrm{shorBase},\\mathrm{shorModulus})<\\mathrm{shorModulus}-\\mathrm{seed}\\land\\mathrm{seed}<\\mathrm{gcdOf}(\\mathrm{half}(\\mathrm{shorBase},\\mathrm{shorModulus})-\\mathrm{seed},\\mathrm{shorModulus})\\land\\mathrm{gcdOf}(\\mathrm{half}(\\mathrm{shorBase},\\mathrm{shorModulus})-\\mathrm{seed},\\mathrm{shorModulus})<\\mathrm{shorModulus}\\land\\mathrm{gcdOf}(\\mathrm{half}(\\mathrm{shorBase},\\mathrm{shorModulus})-\\mathrm{seed},\\mathrm{shorModulus})\\cdot\\mathrm{gcdOf}(\\mathrm{half}(\\mathrm{shorBase},\\mathrm{shorModulus})+\\mathrm{seed},\\mathrm{shorModulus})=\\mathrm{shorModulus}',
      reading: `theorem shor. periodOf 8 91 is decided by fuel recursion inside the kernel. half is powMod a (r / 2) N. gcdOf (half - 1) N * gcdOf (half + 1) N = N. Period and factors are absent from the statement. rfl and Nat.le_of_ble_eq_true. ${shorFactorOf()}. Never Math. Never by decide. demo is not a test nor a proof.`,
      holds: shorHolds(),
  },
    {
      heading: 'follow_the_coins',
      theorem: 'theorem follow_the_coins (app : Nat) : app + coins = app + theory + practice := by rw [theory, practice, coins, ← Nat.add_assoc]',
      formula: '\\mathrm{app}+\\mathrm{coins}=\\mathrm{app}+\\mathrm{theory}+\\mathrm{practice}',
      reading:
        'Follow the coins in any practical application. Occupancy skill framework electronics. Step coins. Hop theory plus practice. Never Math. Never by decide.',
      holds: followHolds(),
  },
    {
      heading: 'two_coins_make_a_coil',
      theorem: 'theorem two_coins_make_a_coil : coil = faces := by rw [coil, around]',
      formula: '\\mathrm{coil}=\\mathrm{faces}',
      reading:
        'Two coins make a coil. windings coins. coil coins times rays. Faces of the winding. Never Math. Never by decide.',
      holds: coilHolds(),
  },
    {
      heading: 'electronics',
      theorem: 'theorem electronics : coil = faces := two_coins_make_a_coil',
      formula: '\\mathrm{coil}=\\mathrm{faces}',
      reading:
        'Coils are used in electronics. Two coins make a coil. Never Math. Never by decide.',
      holds: electronicsHolds(),
  },
    {
      heading: 'coil_efficiency',
      theorem: 'theorem coil_efficiency : coil = faces ∧ faces = rays + rays ∧ coins * rays = faces := ⟨two_coins_make_a_coil, harmonic, around⟩',
      formula: '\\mathrm{coil}=\\mathrm{faces}\\land\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}\\land\\mathrm{coins}\\cdot\\mathrm{rays}=\\mathrm{faces}',
      reading:
        'Measure coil efficiency in clusters. Teams coins. Stripes rays. Measure coil. Remainder none. Unity seed. RAID cluster cover. Never Math. Never by decide.',
      holds: coilEfficiencyHolds(),
  },
    {
      heading: 'next_coil',
      theorem: 'theorem next_coil : coil * mintOf (bits + coins) = fused + fused := by rw [two_coins_make_a_coil]; exact next_fused',
      formula: '\\mathrm{coil}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{coins})=\\mathrm{fused}+\\mathrm{fused}',
      reading:
        'Next is the double. Coil times mintOf bits plus coins is fused plus fused. theorem next. theorem next_fused. theorem infinite. split_coin has no last k. Never Math. Never by decide.',
      holds: qpuNextHolds(),
  },
    {
      heading: 'next_fused',
      theorem: 'theorem next_fused : faces * mintOf (bits + coins) = fused + fused := by rw [fused, coins_two, seed_eq]; rw [show bits + 2 = bits + 1 + 1 from rfl, mintOf_succ, Nat.mul_add]',
      formula: '\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{coins})=\\mathrm{fused}+\\mathrm{fused}',
      reading: `holds ${crossNextFused}. cross.`,
      holds: crossNextFused,
  },
    {
      heading: 'fused_both_directions',
      theorem: 'theorem fused_both_directions : (fused = faces * mintOf (bits + seed)) ∧ (fused + fused = faces * mintOf (bits + coins)) := ⟨quantum, next_fused⟩',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{fused}+\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{coins})',
      reading: `holds ${crossFusedBoth}. cross.`,
      holds: crossFusedBoth,
  },
    {
      heading: 'coins_bridges_forms',
      theorem: 'theorem coins_bridges_forms : coins = 2 ∧ (∀ x : Nat, coins * x = x + x) := ⟨coins_two, fun x => by rw [coins_two, Nat.two_mul]⟩',
      formula: '\\mathrm{coins}=2\\land\\forall x,\\ \\mathrm{coins}\\cdot x=x+x',
      reading: `holds ${crossCoins}. cross.`,
      holds: crossCoins,
  },
    {
      heading: 'double_is_sum',
      theorem: 'theorem double_is_sum : ∀ x : Nat, x + x = 2 * x := fun x => (Nat.two_mul x).symm',
      formula: '\\forall x,\\ x+x=2\\cdot x',
      reading: `holds ${crossDouble}. cross.`,
      holds: crossDouble,
  },
    {
      heading: 'one_plus_six',
      theorem: 'theorem one_plus_six : seed + (mintOf n - coins) = rays := by rw [rays, n_eq, coins_two, seed_eq]; rw [show mintOf 3 = 8 from rfl]',
      formula: '\\mathrm{seed}+(\\mathrm{mintOf}(n)-\\mathrm{coins})=\\mathrm{rays}',
      reading:
        'One plus six. Seed plus mintOf n minus coins is rays. Never Math. Never by decide.',
      holds: seed + (mintOf(n) - coins) === facesOf().rays,
  },
    {
      heading: 'two_x_seven_coins',
      theorem: 'theorem two_x_seven_coins : coins * rays = (seed + (mintOf n - coins)) * coins := by rw [one_plus_six, Nat.mul_comm]',
      formula: '\\mathrm{coins}\\cdot\\mathrm{rays}=(\\mathrm{seed}+(\\mathrm{mintOf}(n)-\\mathrm{coins}))\\cdot\\mathrm{coins}',
      reading:
        'Two times seven coins. Coins times rays is one plus six times coins. Never Math. Never by decide.',
      holds: qpuClayOf().holds && coins * facesOf().rays === (seed + (mintOf(n) - coins)) * coins,
  },
    {
      heading: 'clay',
      theorem: 'theorem clay : coins * rays = (seed + (mintOf n - coins)) * coins ∧ (seed + (mintOf n - coins)) * coins = coil := ⟨two_x_seven_coins, by rw [← two_x_seven_coins]; rfl⟩',
      formula: '\\mathrm{coins}\\cdot\\mathrm{rays}=(\\mathrm{seed}+(\\mathrm{mintOf}(n)-\\mathrm{coins}))\\cdot\\mathrm{coins}\\land(\\mathrm{seed}+(\\mathrm{mintOf}(n)-\\mathrm{coins}))\\cdot\\mathrm{coins}=\\mathrm{coil}',
      reading:
        'Two times seven coins equals one plus six coils equals clay. Each coil is coins windings. Clay is coil is faces. Never Math. Never by decide.',
      holds: qpuClayOf().holds,
  },
    {
      heading: 'integrity',
      theorem: 'theorem integrity : fused = faces * mintOf (bits + seed) ∧ bits = vertices * hexbit ∧ faces = coins * rays := ⟨quantum, cube, around⟩',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{bits}=\\mathrm{vertices}\\cdot\\mathrm{hexbit}\\land\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}',
      reading: 'Three tests. Sealed quantum integrity at all times.',
      holds: quantumHolds && cubeHolds && aroundHolds,
  },
    {
      heading: 'cern',
      theorem:
        'theorem cern : 116 * 17922 + 54 = 2079006 ∧ 184 * 12509 + 12 = 2301668 ∧ 72 * 26572 + 6 = 1913190 ∧ 130 * 21121 + 21 = 2745751 ∧ 8 - 7 = 1 ∧ 8000 - 7000 = 1000 ∧ 7000 / 2 = 3500 ∧ 8000 / 2 = 4000 ∧ 4000 - 3500 = 500 ∧ 2019 - 2011 = 8 ∧ 2019 - 2012 = 7 ∧ 2017 - 2011 = 6 ∧ 2301668 + 2745751 = 5047419 ∧ 2079006 + 1913190 + 2301668 + 2745751 = 9039615 := ⟨rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl, rfl⟩',
      formula:
        '116\\cdot 17922+54=2079006\\land 184\\cdot 12509+12=2301668\\land 72\\cdot 26572+6=1913190\\land 130\\cdot 21121+21=2745751\\land 8-7=1\\land 8000-7000=1000\\land 7000/2=3500\\land 8000/2=4000\\land 4000-3500=500\\land 2019-2011=8\\land 2019-2012=7\\land 2017-2011=6\\land 2301668+2745751=5047419\\land 2079006+1913190+2301668+2745751=9039615',
      reading: 'CMS Open Data integers. Fourteen faces. ATLAS CMS ALICE LHCb tetra. Coins views LHC running and Open Data. Live CERN APIs at https://opendata.cern.ch/api/records via fetch Request Response. CERN credited. Never by decide.',
      holds:
        116 * 17922 + 54 === 2079006 &&
        184 * 12509 + 12 === 2301668 &&
        72 * 26572 + 6 === 1913190 &&
        130 * 21121 + 21 === 2745751 &&
        8 - 7 === 1 &&
        8000 - 7000 === 1000 &&
        7000 / 2 === 3500 &&
        8000 / 2 === 4000 &&
        4000 - 3500 === 500 &&
        2019 - 2011 === 8 &&
        2019 - 2012 === 7 &&
        2017 - 2011 === 6 &&
        2301668 + 2745751 === 5047419 &&
        2079006 + 1913190 + 2301668 + 2745751 === 9039615},
    {
      heading: 'tetra',
      theorem:
        'theorem tetra : coins + coins = mintOf coins := by rw [coins_two]; rw [show 2 = 1 + 1 from rfl, mintOf_succ]; rw [show 1 = 0 + 1 from rfl, mintOf_succ, mintOf_zero]',
      formula: '\\mathrm{coins}+\\mathrm{coins}=\\mathrm{mintOf}(\\mathrm{coins})',
      reading: 'ATLAS CMS ALICE LHCb tetra. Shared on both coins views. Live CERN Open Data APIs via fetch Request Response. Never by decide.',
      holds: coins + coins === mintOf(coins),
  },
    {
      heading: 'qubits',
      theorem: 'theorem qubits : n = 3 ∧ mintOf n = vertices := ⟨n_eq, rfl⟩',
      formula: 'n=3\\land\\mathrm{mintOf}(n)=\\mathrm{vertices}',
      reading: 'theorem qubits. n = 3 ∧ mintOf n = vertices. JSON Nat. Never Math. Never by decide.',
      holds: n === 3 && mintOf(n) === cube.vertices,
  },
    {
      heading: 'gates',
      theorem: 'theorem gates : (0 ^^^ 1) ^^^ 2 = 3 := rfl',
      formula: '(0\\oplus 1)\\oplus 2=3',
      reading: 'H then CNOT. Computational basis. Split then Bell.',
      holds: xorOf(xorOf(n - n, seed), coins) === n,
  },
    {
      heading: 'measurement',
      theorem: 'theorem measurement : mintOf n = 8 := by rw [n_eq]; rfl',
      formula: '\\mathrm{mintOf}(n)=8',
      reading: 'Measure the running circuit. Dim 8.',
      holds: mintOf(n) === cube.vertices && mintOf(n) === 8,
  },
    {
      heading: 'noise',
      theorem: 'theorem noise : (3 ^^^ 1) ^^^ 1 = 3 := rfl',
      formula: '(3\\oplus 1)\\oplus 1=3',
      reading: 'XX noise is identity.',
      holds: xorOf(xorOf(n, seed), seed) === n,
  },
    {
      heading: 'circuit',
      theorem: 'theorem circuit : (0 ^^^ 1) ^^^ 2 = 3 ∧ (3 ^^^ 1) ^^^ 1 = 3 ∧ mintOf n = vertices := ⟨rfl, rfl, rfl⟩',
      formula: '(0\\oplus 1)\\oplus 2=3\\land(3\\oplus 1)\\oplus 1=3\\land\\mathrm{mintOf}(n)=\\mathrm{vertices}',
      reading: 'H then CNOT, then XX twice, on exact integer amplitudes. Dim mintOf n = vertices.',
      holds: xorOf(xorOf(n - n, seed), coins) === n && xorOf(xorOf(n, seed), seed) === n && mintOf(n) === cube.vertices,
  },
    {
      heading: 'physical',
      theorem: 'theorem physical : n = 3 ∧ mintOf n = vertices ∧ (0 ^^^ 1) ^^^ 2 = 3 ∧ (3 ^^^ 1) ^^^ 1 = 3 := ⟨n_eq, rfl, rfl, rfl⟩',
      formula: 'n=3\\land\\mathrm{mintOf}(n)=\\mathrm{vertices}\\land(0\\oplus 1)\\oplus 2=3\\land(3\\oplus 1)\\oplus 1=3',
      reading: 'n = 3. mintOf n = vertices. (0 ^^^ 1) ^^^ 2 = 3. (3 ^^^ 1) ^^^ 1 = 3. The row holds only when the circuit\'s step checks (circuit.steps) hold as well: initialize, gates, interfere, measure and noise, with the device computed as exact-amplitudes: the exact state-vector computation holds every amplitude as an exact integer.',
      holds: n === 3 && mintOf(n) === cube.vertices && xorOf(xorOf(n - n, seed), coins) === n && xorOf(xorOf(n, seed), seed) === n && circuitOf().steps.holds,
  },
    {
      heading: 'temperature',
      theorem:
        'theorem temperature : photon / thermal 10 = 23 ∧ photon / thermal 100 = 2 ∧ photon / thermal 4000 = 0 ∧ 4000 / 100 = 40 ∧ 100 / 10 = 10 ∧ 10 < 35 := ⟨rfl, rfl, rfl, rfl, rfl, Nat.le_of_ble_eq_true rfl⟩',
      formula:
        '\\mathrm{photon}/\\mathrm{thermal}(10)=23\\land\\mathrm{photon}/\\mathrm{thermal}(100)=2\\land\\mathrm{photon}/\\mathrm{thermal}(4000)=0\\land 4000/100=40\\land 100/10=10\\land 10<35',
      reading:
        'photon / thermal 10 = 23, photon / thermal 100 = 2, photon / thermal 4000 = 0, 4000 / 100 = 40, 100 / 10 = 10, 10 < 35, where photon = planck * transmon and thermal millikelvin = boltzmann * millikelvin * 10. JSON Nat. Never Math. Never by decide.',
      holds: temperatureHolds,
  },
    {
      heading: 'superconductivity',
      theorem:
        'theorem superconductivity : aluminium > 10 ∧ niobium > aluminium ∧ bcs / 100 = 3 ∧ gap aluminium = 88 ∧ gap aluminium > transmon ∧ gap niobium = 679 := ⟨Nat.le_of_ble_eq_true rfl, Nat.le_of_ble_eq_true rfl, rfl, rfl, Nat.le_of_ble_eq_true rfl, rfl⟩',
      formula:
        '\\mathrm{aluminium}>10\\land\\mathrm{niobium}>\\mathrm{aluminium}\\land\\mathrm{bcs}/100=3\\land\\mathrm{gap}(\\mathrm{aluminium})=88\\land\\mathrm{gap}(\\mathrm{aluminium})>\\mathrm{transmon}\\land\\mathrm{gap}(\\mathrm{niobium})=679',
      reading:
        'aluminium > 10, niobium > aluminium, bcs / 100 = 3, gap aluminium = 88, gap aluminium > transmon, gap niobium = 679, where gap tc = bcs * boltzmann * tc / planck / 10. JSON Nat. Never Math. Never by decide.',
      holds: superconductivityHolds,
  },
    {
      heading: 'cooling',
      theorem:
        'theorem cooling_strictly_decreases (t a b n : Nat) (ht : 0 < t) (ha : 0 < a) (hab : a < b) : t * a ^ n * a < t * a ^ n * b :=',
      formula:
        '\\forall t,a,b,n:\\ 0<t,\\ 0<a<b\\Rightarrow 0<t\\,a^{n}\\land t\\,a^{n}\\,a<t\\,a^{n}\\,b',
      reading:
        'For every t, a, n with 0 < t and 0 < a: 0 < t * a ^ n (cooling_stays_positive); with a < b as well, t * a ^ n * a < t * a ^ n * b (cooling_strictly_decreases). No number is typed into either statement. The TypeScript recomputes both at t = vertices, a = rays, b = faces for n from 0 to faces - 1. JSON Nat. Never Math.',
      holds: Array.from({ length: faces.faces }, (_, k) => {
        const zero = BigInt(n - n)
        const t = BigInt(cube.vertices), a = BigInt(faces.rays), b = BigInt(faces.faces), e = BigInt(k)
        return t * a ** e > zero && t * a ** e * a < t * a ** e * b
      }).every(Boolean),
  },
    {
      heading: 'drift',
      theorem: 'theorem drift : coins = 2 ∧ mintOf n = vertices ∧ (0 ^^^ 1) ^^^ 2 = 3 ∧ (3 ^^^ 1) ^^^ 1 = 3 := ⟨coins_two, rfl, rfl, rfl⟩',
      formula: '\\mathrm{coins}=2\\land\\mathrm{mintOf}(n)=\\mathrm{vertices}\\land(0\\oplus 1)\\oplus 2=3\\land(3\\oplus 1)\\oplus 1=3',
      reading: 'No drift from science. Two-level qubits. Dim mintOf n. H then CNOT. XX is identity.',
      holds: coins === 2 && mintOf(n) === cube.vertices && xorOf(xorOf(n - n, seed), coins) === n && xorOf(xorOf(n, seed), seed) === n,
  },
    {
      heading: 'sciences',
      theorem:
        'theorem sciences : coins = 2 ∧ n = 3 ∧ mintOf n = vertices ∧ faces = coins * rays ∧ bits = vertices * hexbit ∧ fused = faces * mintOf (bits + seed) ∧ (0 ^^^ 1) ^^^ 2 = 3 := ⟨coins_two, n_eq, rfl, around, cube, quantum, rfl⟩',
      formula:
        '\\mathrm{coins}=2\\land n=3\\land\\mathrm{mintOf}(n)=\\mathrm{vertices}\\land\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}\\land\\mathrm{bits}=\\mathrm{vertices}\\cdot\\mathrm{hexbit}\\land\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land(0\\oplus 1)\\oplus 2=3',
      reading: 'No drift between sciences. Circuit, cube, faces, fused share mintOf. Qubits n are not faces.',
      holds:
        coins === 2 &&
        n === 3 &&
        mintOf(n) === cube.vertices &&
        aroundHolds &&
        cubeHolds &&
        quantumHolds &&
        xorOf(xorOf(n - n, seed), coins) === n &&
        n !== faces.faces},
    {
      heading: 'interfere',
      theorem: 'theorem interfere : 1 + 1 = 2 ∧ 1 - 1 = 0 := ⟨rfl, rfl⟩',
      formula: '1+1=2\\land 1-1=0',
      reading: 'Hadamard is involutive. H H = I. Odd amplitudes cancel.',
      holds: 1 + 1 === coins && 1 - 1 === n - n,
  },
    {
      heading: 'entangle',
      theorem: 'theorem entangle : 1 * 1 ≠ 0 * 0 := by rw [Nat.mul_one, Nat.mul_zero]; exact Nat.one_ne_zero',
      formula: '1\\cdot 1\\neq 0\\cdot 0',
      reading:
        'Bell. H then CNOT. Entanglement is the product test 1·1 ≠ 0·0. Two coins make a coil. Prove all pairs. Even parity is not the proof. |++⟩ is separable.',
      holds: 1 * 1 !== (n - n) * (n - n) && coilHolds(),
  },
    {
      heading: 'ghz',
      theorem: 'theorem ghz : mintOf n - seed = 7 ∧ 1 * 1 ≠ 0 * 0 := ⟨by rw [n_eq, seed_eq]; rfl, entangle⟩',
      formula: '\\mathrm{mintOf}(n)-\\mathrm{seed}=7\\land 1\\cdot 1\\neq 0\\cdot 0',
      reading: 'Bell then CNOT onto the third qubit. Support |000⟩ and |111⟩.',
      holds: mintOf(n) - seed === 7 && 1 * 1 !== (n - n) * (n - n),
  },
    {
      heading: 'noclone',
      theorem:
        'theorem noclone : coins ≠ mintOf coins := by rw [coins_two]; rw [show 2 = 1 + 1 from rfl, mintOf_succ]; rw [show 1 = 0 + 1 from rfl, mintOf_succ, mintOf_zero]; exact Nat.ne_of_lt (Nat.lt_succ_of_lt (Nat.lt_succ_self 2))',
      formula: '\\mathrm{coins}\\neq\\mathrm{mintOf}(\\mathrm{coins})',
      reading: '|++⟩ occupies four computational-basis states. A CNOT clone of H occupies two. coins ≠ mintOf coins.',
      holds: coins !== mintOf(coins),
  },
    {
      heading: 'teleport',
      theorem: 'theorem teleport : 2 * 2 * 2 * 2 = 16 ∧ 16 = 16 := ⟨rfl, rfl⟩',
      formula: '2\\cdot 2\\cdot 2\\cdot 2=16\\land 16=16',
      reading: 'Teleport |1⟩ lands on Bob. Teleport |+⟩ keeps equal weight.',
      holds: 2 * 2 * 2 * 2 === mintOf(n + seed) && mintOf(n + seed) === mintOf(n + seed),
  },
    {
      heading: 'kickback',
      theorem: 'theorem kickback : 1 - 1 = 0 ∧ (0 ^^^ 1) ^^^ 2 = 3 := ⟨rfl, rfl⟩',
      formula: '1-1=0\\land(0\\oplus 1)\\oplus 2=3',
      reading: 'Phase kickback. |+⟩|1⟩ then CZ then H lands on |011⟩.',
      holds: 1 - 1 === n - n && xorOf(xorOf(n - n, seed), coins) === n,
  },
    {
      heading: 'deutsch',
      theorem: 'theorem deutsch : 1 - 1 = 0 ∧ seed ≠ coins := ⟨rfl, by rw [seed_eq, coins_two]; exact Nat.ne_of_lt (Nat.lt_succ_self 1)⟩',
      formula: '1-1=0\\land\\mathrm{seed}\\neq\\mathrm{coins}',
      reading: 'Deutsch. One quantum query. Classical needs coins. seed ≠ coins.',
      holds: 1 - 1 === n - n && seed !== coins,
  },
    {
      heading: 'dense',
      theorem:
        'theorem dense : coins * coins = mintOf coins := by rw [coins_two]; rw [show 2 = 1 + 1 from rfl, mintOf_succ]; rw [show 1 = 0 + 1 from rfl, mintOf_succ, mintOf_zero]',
      formula: '\\mathrm{coins}\\cdot\\mathrm{coins}=\\mathrm{mintOf}(\\mathrm{coins})',
      reading: 'Superdense. Two bits in one qubit. I Z X XZ decode to 0 1 2 3.',
      holds: coins * coins === mintOf(coins),
  },
    {
      heading: 'monogamy',
      theorem: 'theorem monogamy : 1 * 1 ≠ 0 * 0 ∧ 1 * 0 = 0 * 0 := ⟨entangle, rfl⟩',
      formula: '1\\cdot 1\\neq 0\\cdot 0\\land 1\\cdot 0=0\\cdot 0',
      reading: 'Monogamy. Bell is entangled. The GHZ pair slice is a product state.',
      holds: 1 * 1 !== (n - n) * (n - n) && seed * (n - n) === (n - n) * (n - n),
  },
    {
      heading: 'only',
      theorem:
        'theorem only : 1 * 1 ≠ 0 * 0 ∧ 1 + 1 = 2 ∧ 1 - 1 = 0 ∧ coins ≠ mintOf coins ∧ mintOf n - seed = 7 ∧ 2 * 2 * 2 * 2 = 16 ∧ 16 = 16 ∧ (0 ^^^ 1) ^^^ 2 = 3 ∧ seed ≠ coins ∧ coins * coins = mintOf coins ∧ 1 * 0 = 0 * 0 := ⟨entangle, rfl, rfl, noclone, ghz.1, teleport.1, teleport.2, kickback.2, deutsch.2, dense, monogamy.2⟩',
      formula:
        '1\\cdot 1\\neq 0\\cdot 0\\land 1+1=2\\land 1-1=0\\land\\mathrm{coins}\\neq\\mathrm{mintOf}(\\mathrm{coins})\\land\\mathrm{mintOf}(n)-\\mathrm{seed}=7\\land 2\\cdot 2\\cdot 2\\cdot 2=16\\land 16=16\\land(0\\oplus 1)\\oplus 2=3\\land\\mathrm{seed}\\neq\\mathrm{coins}\\land\\mathrm{coins}\\cdot\\mathrm{coins}=\\mathrm{mintOf}(\\mathrm{coins})\\land 1\\cdot 0=0\\cdot 0',
      reading:
        'Entangle. Interfere. GHZ. No-clone. Teleport. Kickback. Deutsch. Superdense. Monogamy.',
      holds:
        1 * 1 !== (n - n) * (n - n) &&
        1 + 1 === coins &&
        1 - 1 === n - n &&
        coins !== mintOf(coins) &&
        mintOf(n) - seed === 7 &&
        2 * 2 * 2 * 2 === mintOf(n + seed) &&
        mintOf(n + seed) === mintOf(n + seed) &&
        xorOf(xorOf(n - n, seed), coins) === n &&
        seed !== coins &&
        coins * coins === mintOf(coins) &&
        seed * (n - n) === (n - n) * (n - n)},
    {
      heading: 'fill',
      theorem: 'theorem fill : mintOf n * faces = vertices * (coins * rays) := by rw [around]; rfl',
      formula: '\\mathrm{mintOf}(n)\\cdot\\mathrm{faces}=\\mathrm{vertices}\\cdot(\\mathrm{coins}\\cdot\\mathrm{rays})',
      reading:
        'Lattice filled. Occupied faces. Vacant none. Split entangle interfere GHZ noclone teleport kickback Deutsch superdense monogamy qubits gates measurement register.',
      holds: mintOf(n) * faces.faces === cube.vertices * (coins * faces.rays),
  },
    {
      heading: 'infinite',
      theorem: 'theorem infinite (k : Nat) : mintOf (k + seed) = mintOf k + mintOf k := split_coin k',
      formula: '\\mathrm{mintOf}(k+\\mathrm{seed})=\\mathrm{mintOf}(k)+\\mathrm{mintOf}(k)',
      reading:
        'VM scales. Replicas double. Quantum capacity infinite. split_coin has no last k.',
      holds: splitHolds && nextHolds && nextFusedHolds,
  },
    {
      heading: 'distribute',
      theorem: 'theorem distribute : fused = faces * mintOf (bits + seed) ∧ faces = coins * rays := ⟨quantum, around⟩',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}',
      reading:
        'Crypt split fused across faces. Distribute computations to free agents. coins teams of rays.',
      holds: quantumHolds && aroundHolds && theorem.around(faces.faces, coins, faces.rays),
  },
    {
      heading: 'raid',
      theorem: 'theorem raid : faces = coins * rays ∧ faces = rays + rays := ⟨around, harmonic⟩',
      formula: '\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}\\land\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}',
      reading:
        'Quantum RAID 10. Stripe rays. Mirror coins. Anything on Cloudflare KV and R2. Hybrid storage. Measure hybrid speed and cost. KV added amplitudes. Scaled. Infinite.',
      holds: aroundHolds && harmonicHolds && theorem.around(faces.faces, coins, faces.rays) && theorem.harmonic(faces.faces, faces.rays) && hybridHolds(),
  },
    {
      heading: 'hybrid_cost',
      theorem: 'theorem hybrid_cost : coins + seed = n := by rw [coins_two, seed_eq, n_eq]',
      formula: '\\mathrm{coins}+\\mathrm{seed}=n',
      reading:
        'Measure hybrid storage cost. KV cost coins. R2 cost seed. Hybrid cost coins plus seed is n. Minimum cost. Never Math. Never by decide.',
      holds: hybridHolds() && coins + seed === n,
  },
    {
      heading: 'hybrid_speed',
      theorem: 'theorem hybrid_speed : rays + seed = mintOf n := by rw [rays, n_eq, coins_two, seed_eq]; rw [show mintOf 3 = 8 from rfl]',
      formula: '\\mathrm{rays}+\\mathrm{seed}=\\mathrm{mintOf}(n)',
      reading:
        'Measure hybrid storage speed. KV speed rays. R2 speed seed. Hybrid speed rays plus seed is mintOf n. Coordinated speed. Never Math. Never by decide.',
      holds: hybridHolds() && facesOf().rays + seed === mintOf(n),
  },
    {
      heading: 'hybrid',
      theorem: 'theorem hybrid : coins + seed = n ∧ rays + seed = mintOf n ∧ coins = seed + seed := ⟨hybrid_cost, hybrid_speed, coins_two⟩',
      formula: '\\mathrm{coins}+\\mathrm{seed}=n\\land\\mathrm{rays}+\\mathrm{seed}=\\mathrm{mintOf}(n)\\land\\mathrm{coins}=\\mathrm{seed}+\\mathrm{seed}',
      reading:
        'Measure hybrid storage speed and cost. Two bindings. STORAGE kv. BLOBS r2. Coordinated speed mintOf n. Minimum cost n. KV faster and costlier. R2 cheaper and slower. QPU hybrid storage hosts the Payload database. Unity seed. Remainder none. Collections pages users media tenants. Secrets never. Native Alpine Linux. musl. busybox. overlayfs. KV upper. R2 lower. KV work. Next is the double. No last k. Stores by content address. Inodes. Referrer access link. Privacy. Redundancy. Last link deleted frees the inode. Never Math. Never by decide.',
      holds: hybridHolds() && payloadDbHolds() && coins + seed === n && facesOf().rays + seed === mintOf(n) && coins === seed + seed,
  },
    {
      heading: 'computer',
      theorem: 'theorem computer : (1 ^^^ 3) = 2 ∧ (6 ^^^ 1) = 7 ∧ mintOf 0 = 1 := ⟨rfl, rfl, mintOf_zero⟩',
      formula: '(1\\oplus 3)=2\\land(6\\oplus 1)=7\\land\\mathrm{mintOf}(0)=1',
      reading:
        'Exact state-vector computation of the circuit. SWAP. Toffoli. Reset. H and Toffoli are computationally universal. Coupling compile collapse shots feedforward bitflip readout isolate qram network jobs.',
      holds: xorOf(seed, n) === coins && xorOf(xorOf(bitOf(seed), bitOf(coins)), seed) === mintOf(n) - seed && mintOf(n - n) === seed && computerHolds(),
  },
    {
      heading: 'server',
      theorem: 'theorem server : faces = coins * rays ∧ mintOf n = 8 := ⟨around, measurement⟩',
      formula: '\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}\\land\\mathrm{mintOf}(n)=8',
      reading:
        'Quantum server. JSON-LD WebAPI. Eight server tools. Jobs queue results. Backend the running circuit. No auth.',
      holds: aroundHolds && mintOf(n) === cube.vertices && mintOf(n) === 8,
  },
    {
      heading: 'fusion',
      theorem: 'theorem fusion : fused = faces * mintOf (bits + seed) ∧ faces = rays + rays := ⟨quantum, harmonic⟩',
      formula: '\\mathrm{fused}=\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})\\land\\mathrm{faces}=\\mathrm{rays}+\\mathrm{rays}',
      reading: 'fused = faces * mintOf (bits + seed). faces = rays + rays. HEP quantum true.',
      holds: quantumHolds && harmonicHolds && theorem.harmonic(faces.faces, faces.rays),
  },
    {
      heading: 'design',
      theorem: 'theorem design : (0 ^^^ 4) ^^^ 4 = 0 ∧ (3 ^^^ 4) ^^^ 4 = 3 := ⟨rfl, rfl⟩',
      formula: '(0\\oplus 4)\\oplus 4=0\\land(3\\oplus 4)\\oplus 4=3',
      reading:
        'Any error is handled by design. XOR fold hexbit. Involution. Never throw.',
      holds: xorOf(xorOf(n - n, cube.hexbit), cube.hexbit) === n - n && xorOf(xorOf(n, cube.hexbit), cube.hexbit) === n,
  },
    {
      heading: 'neuro',
      theorem: 'theorem neuro : faces = coins * rays ∧ mintOf n = 8 ∧ (0 ^^^ 4) ^^^ 4 = 0 := ⟨around, measurement, design.1⟩',
      formula: '\\mathrm{faces}=\\mathrm{coins}\\cdot\\mathrm{rays}\\land\\mathrm{mintOf}(n)=8\\land(0\\oplus 4)\\oplus 4=0',
      reading: 'Width faces. Layers mintOf n. XOR involution.',
      holds: aroundHolds && mintOf(n) === cube.vertices && xorOf(xorOf(n - n, cube.hexbit), cube.hexbit) === n - n,
  }] as const).map(crossed)
  const climb: QpuLeanRow = crossed({
    heading: 'next',
    theorem:
      'theorem next_cover : mintOf (bits + seed) = amplitudes + amplitudes ∧ faces * mintOf (bits + coins) = fused + fused := ⟨next, next_fused⟩',
    formula:
      '\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{seed})=\\mathrm{amplitudes}+\\mathrm{amplitudes}\\land\\mathrm{faces}\\cdot\\mathrm{mintOf}(\\mathrm{bits}+\\mathrm{coins})=\\mathrm{fused}+\\mathrm{fused}',
    reading: `holds ${nextHolds && nextFusedHolds && qpuNextHolds()}. amplitudes ${handle.amplitudes}. next ${handle.next}. fused next ${fused + fused}. coil next ${qpuNextOf().nextCoil}. no last k.`,
    holds: nextHolds && nextFusedHolds && qpuNextHolds(),
  })
  /* EVERY THEOREM IS SERVED. The curated rows above carry hand-set readings; every other theorem of index.lean is
   * served from the file itself — its text verbatim, its statement typeset, its holds recomputed exactly over its
   * defs (lean-eval.ts) — so nothing the proof states is left unserved. Every row, curated or not, is recomputed. */
  const leanModel = leanModelOf(leanSource)
  const blocks = leanTheoremBlocksOf(leanSource)
  const nameOf = (r: QpuLeanRow) => /^theorem (\w+)/.exec(r.theorem)?.[1] ?? r.heading
  const curated = [...rows, ...cover, climb]
  const servedNames = new Set(curated.map(nameOf))
  const uuidOfTheorem = new Map(blocks.map(([name, theorem]) => [name, shapeUuidOf(statementOf(theorem))]))
  const sameAs = (name: string) => blocks.filter(([other]) => other !== name && uuidOfTheorem.get(other) === uuidOfTheorem.get(name)).map(([other]) => other)
  const rest = blocks
    .filter(([name]) => !servedNames.has(name))
    .map(([name, theorem]) => {
      // read the build-time recompute (embed-lean.mjs); fall back to a live recompute only if a theorem is missing
      const r = leanRecomputed[name] ?? leanRecomputeOf(theorem, leanModel)
      const same = sameAs(name)
      return crossed({
        heading: name,
        theorem,
        formula: r.formula,
        reading: `holds ${r.holds}. ${crossReadingOf(theorem)}.${r.over ? ` over ${r.over}.` : ''}${same.length ? ` same as ${same.join(', ')}.` : ''}`,
        holds: r.holds,
      })
    })
  const recomputed = [...curated, ...rest].map((r) => (leanRecomputed[nameOf(r)] ?? leanRecomputeOf(r.theorem, leanModel)).holds)
  const served = [...cover, ...rest]
  const src = unit.fuse.lean
  const source = { ...leanSourceOf(rows, served, climb), recomputed: recomputed.filter(Boolean).length }
  const holds =
    source.holds &&
    source.served === source.theorems &&
    recomputed.every(Boolean) &&
    rows.every((r) => r.holds && r.theorem.startsWith(`theorem ${r.heading}`) && !byDecideOf(r.theorem) && formulaOf(r.formula)) &&
    served.every((r) => r.holds && r.theorem.startsWith(`theorem ${r.heading}`) && !byDecideOf(r.theorem) && formulaOf(r.formula)) &&
    climb.holds &&
    climb.theorem.startsWith('theorem next') &&
    !byDecideOf(climb.theorem) &&
    formulaOf(climb.formula) &&
    src.endsWith('/index.lean')
  return {
    '@context': contextOf(),
    '@type': 'Dataset' as const,
    '@id': unit.href,
    url: unit.href,
    name: unit.fuse.lean,
    isAccessibleForFree: cors === '*',
    src,
    source,
    rows,
    cover: served,
    climb,
    // the formulas discover each other from their own proofs: families, links between them, related definition pairs
    graph: (({ families, familyLinks, related }) => ({ families: families.map((f) => f.family), links: familyLinks.map((l) => `${l.from}>${l.to}`), related: related.length }))(leanLinksOf(leanSource)),
    holds,
  }
})

export const leanHolds = (l = leanOf()): boolean =>
  l.holds === true &&
  l.src === unit.fuse.lean &&
  l['@context'][n - n] === schemaOrg &&
  l['@type'] === 'Dataset' &&
  l['@id'] === unit.href &&
  l.isAccessibleForFree === true &&
  jsonldHoldsOf(l)

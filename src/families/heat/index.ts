import { leanSource } from '../../quantum/processing/unit/lean.js'
import { facesOf, hexFamiliesOf, hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { leanCallOf, leanModelOf } from '../../quantum/processing/unit/lean-eval.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'
import { flowFamiliesOf } from '../merkaba/index.js'
import { chooseOf, mintOf, latticeNamesOf, tenOf } from '../../quantum/processing/unit/index.js'
const L = { ...latticeNamesOf(), mintOf, chooseOf, tenOf }

/** Code quality by temperature and time, as Qpu.Physics measures a qubit. A file is hot when it keeps changing: its
 *  temperature in millikelvin is commits per thousand days (one commit a day is 1000 mK). Its signal is the unit's
 *  `photon / thermal T` (theorem temperature: 23 at 10 mK, 2 at 100 mK, 0 at 4000 mK, where noise drowns the signal). Its
 *  coherence time is how many days it holds between fixes. Cooling is splitting: a file split k ways carries T / k each
 *  (theorem cooling_stays_positive). The constants are the Lean source's own. Registered as the hex family `heat`. */
const leanNat = (name: string): number => Number(new RegExp(`def ${name} : Nat := (\\d+)`).exec(leanSource)?.[1] ?? NaN)
const PLANCK = leanNat('planck')
const BOLTZMANN = leanNat('boltzmann')
const TRANSMON = leanNat('transmon')
const photon = PLANCK * TRANSMON
const thermal = (millikelvin: number) => BOLTZMANN * millikelvin * L.tenOf(L.seed)
const PROOF = 'src/quantum/processing/unit/index.lean §Qpu.Physics (theorem temperature, cooling_stays_positive)'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const LEAN = leanModelOf('')
/** Deepest heat mark: every sealed heat CrossFormula carries `kind: 'heat'` so a reactor matches the field, not prose. */
const HEAT = 'heat' as const
const heatCross = (
  id: string,
  dst: string,
  formula: string,
  value: number,
  holds: boolean,
  name: string,
  params: number[],
  extra: Record<string, unknown> = {},
): CrossFormula =>
  crossFormulaOf({ kind: HEAT, id, src: HEAT, dst, formula, value, proof: PROOF, ...extra }, holds, { name: `heat.${name}`, params })

export class HeatFormulas {
  /** Identity: millikelvin stamped as identifiable heat — kind, hex name heat.identity, value = mK. */
  static identity(millikelvin: number): CrossFormula {
    return heatCross('heat-identity', 'physics', 'identity(mK) = mK · kind heat', millikelvin, nat(millikelvin), 'identity', [millikelvin], { identity: HEAT })
  }

  /** Temperature: commits over days as millikelvin, ⌊1000 · commits / days⌋. */
  static temperature(commits: number, days: number): CrossFormula {
    const mK = Math.floor((L.tenOf(L.n) * commits) / Math.max(days, L.seed))
    return heatCross('heat-temperature', 'physics', 'T = ⌊1000 · commits / days⌋ mK', mK, nat(commits, days), 'temperature', [commits, days])
  }

  /** Signal: ⌊photon / thermal T⌋, the unit's own ratio; 0 means the noise drowns what the file delivers. */
  static signal(millikelvin: number): CrossFormula {
    const value = millikelvin === 0 ? photon : Math.floor(photon / thermal(millikelvin))
    return heatCross('heat-signal', 'physics', 'S = ⌊h·f / k_B·T⌋ (photon / thermal T)', value, nat(millikelvin), 'signal', [millikelvin])
  }

  /** Coherence: days held per fix, ⌊days / (fixes + 1)⌋; every fix is a decoherence event. */
  static coherence(days: number, fixes: number): CrossFormula {
    return heatCross('heat-coherence', 'physics', 'T₂ = ⌊days / (fixes + 1)⌋', Math.floor(days / (fixes + 1)), nat(days, fixes), 'coherence', [days, fixes])
  }

  /** Quality: the signal at the file's temperature held over its coherence time, S(T) · T₂. Zero when hot. */
  static quality(commits: number, days: number, fixes: number): CrossFormula {
    const s = HeatFormulas.signal(HeatFormulas.temperature(commits, days).value).value
    const t2 = HeatFormulas.coherence(days, fixes).value
    return heatCross('heat-quality', 'physics', 'Q = S(T) · T₂', s * t2, nat(commits, days, fixes), 'quality', [commits, days, fixes])
  }

  /** Cooling: a file split k ways carries ⌈T / k⌉ each, and stays positive while T does. */
  static cooling(millikelvin: number, ways: number): CrossFormula {
    return heatCross('heat-cooling', 'physics', 'T′ = ⌈T / k⌉', Math.ceil(millikelvin / Math.max(ways, 1)), nat(millikelvin, ways) && ways > 0, 'cooling', [millikelvin, ways])
  }

  /** The split that cools a file to a target: the least k with ⌈T / k⌉ ≤ target. */
  static ways(millikelvin: number, target: number): CrossFormula {
    return heatCross('heat-ways', 'physics', 'k = ⌈T / target⌉', Math.max(1, Math.ceil(millikelvin / Math.max(target, 1))), nat(millikelvin, target) && target > 0, 'ways', [millikelvin, target])
  }

  /** Erasure: the j-th formula of the f-th flow family (merkaba.develop's address) run on its first n inputs must erase
   *  Σ c·log₂ c bits over its outputs' multiplicities — Landauer's least for that batch. Zero exactly when the formula
   *  is reversible on it: a reversible computation erases nothing, an irreversible one cannot hide that it does. */
  static erasure(f: number, j: number, n: number): CrossFormula {
    const family = flowFamiliesOf()[f], formula = family ? hexFamiliesOf().get(family)?.[j] : undefined
    const counts = new Map<string, number>()
    let runs = 0
    for (let i = 0; formula && i < n; i++) {
      try {
        const r = formula.run(Array.from({ length: formula.arity }, () => BigInt(i))) as unknown
        const out = String(typeof r === 'object' && r !== null && 'value' in r ? (r as { value: unknown }).value : r)
        counts.set(out, (counts.get(out) ?? 0) + 1)
        runs++
      } catch { /* an input the formula does not take */ }
    }
    const bits = [...counts.values()].reduce((s, c) => s + c * Math.log2(c), 0)
    return heatCross('heat-erasure', 'physics', `erasure(${family}.${formula?.name}, n) = Σ c·log₂ c over its outputs on the first n inputs`, bits, nat(f, j, n) && runs === n, 'erasure', [f, j, n], { proof: 'Landauer: a map that merges c inputs into one output erases log₂ c bits each' })
  }

  /** Landauer: erasing `bits` at a core temperature T costs at least bits · k_B · T · ln 2 — in 10⁻³² J at T in mK, with
   *  the Lean source's boltzmann (k_B in 10⁻²⁹ J/K). The unit reads no sensor: T is the device reading the caller saved. */
  static landauer(bits: number, millikelvin: number): CrossFormula {
    return heatCross('heat-landauer', 'physics', 'E ≥ bits · k_B · T · ln 2 (10⁻³² J, T in mK)', Math.floor(bits * BOLTZMANN * millikelvin * Math.LN2), nat(bits, millikelvin), 'landauer', [bits, millikelvin], { proof: 'Landauer 1961; k_B from index.lean def boltzmann' })
  }

  /** SLOW IS A WRAP: an address that answers slowly wraps a computation instead of reaching a value. A speed claim is not a
   *  theorem, and no clock is read here: the statement "slow" is never established, so it is false with its reason stated.
   *  `next` is the following formula's [f, j], so `--all` walks every formula of the ring. */
  static async slow(f: number, j: number): Promise<CrossFormula> {
    const ring = flowFamiliesOf(), family = ring[f], formula = family ? hexFamiliesOf().get(family)?.[j] : undefined
    const after = family && j + 1 < (hexFamiliesOf().get(family) ?? []).length ? [f, j + 1] : f + 1 < ring.length ? [f + 1, 0] : undefined
    if (!formula) return heatCross('heat-slow', 'physics', 'slow(f, j): a formula is registered at (f, j)', 0, false, 'slow', [f, j], { proof: 'the registry', ...(after ? { next: after } : {}) })
    return heatCross('heat-slow', 'physics', `slow(${family}.${formula.name}) = a speed claim: not a theorem, no clock is read, so not established`, 0, false, 'slow', [f, j], { proof: 'no theorem: a wall-clock speed bound is not a proof', ...(after ? { next: after } : {}) })
  }

  /** One job of a split: 2ᵏ mod p by squaring — independent of every other prime, so any node or agent computes it at
   *  its own address and receipts it; two nodes answering the same job differently is a violation, exactly. */
  static residue(k: number, p: number): CrossFormula {
    const value = nat(k, p) && p > 1 ? Number(leanCallOf(LEAN, 'powMod', [2n, BigInt(k), BigInt(p)])) : 0
    return heatCross('heat-residue', 'crypto', 'r = 2ᵏ mod p', value, nat(k, p) && p > 1, 'residue', [k, p], { proof: 'powMod by squaring (lean-eval), agreeing with index.lean def powMod' })
  }

  /** The split of an astronomical value into coordinated decentralised jobs: 2ᵏ never materialised, only its residues
   *  modulo the first `primes` primes, one heat.residue job each, joined by the Chinese remainder theorem. The residues
   *  refute any claimed value exactly (one prime that disagrees) and recover it only when Πp exceeds 2ᵏ (`exact`).
   *  Value how many jobs; `jobs` the first faces of them (a job whose params pass the hex section is called by name). */
  static split(k: number, primes: number): CrossFormula {
    const ps: number[] = []
    for (let x = 2; ps.length < primes; x++) if (ps.every((p) => x % p !== 0)) ps.push(x)
    const jobs = ps.slice(0, facesOf().faces).map((p) => ({ p, residue: HeatFormulas.residue(k, p).value, call: { name: 'heat.residue', params: [k, p] } }))
    const extra = { bits: k + 1, exact: ps.reduce((s, p) => s + Math.log2(p), 0) > k, jobs, proof: 'CRT: residues modulo coprime p determine a value below Πp' }
    return heatCross('heat-split', 'crypto', '2ᵏ ↦ (2ᵏ mod p)ₚ, one job per prime, joined by the Chinese remainder theorem', ps.length, nat(k, primes) && primes > 0, 'split', [k, primes], extra)
  }
}

for (const name of ['coherence', 'cooling', 'erasure', 'identity', 'landauer', 'quality', 'residue', 'signal', 'slow', 'split', 'temperature', 'ways'] as const)
  hexRegisterOf('heat', name, (HeatFormulas[name] as (...x: unknown[]) => unknown).bind(HeatFormulas))

/** One file as git measures it. */
export type HeatReading = { file: string; commits: number; days: number; fixes: number; lines: number; age: number; since: number }

/** Cold threshold: where photon / thermal T reaches 1 — T* = ⌊photon / (k_B · 10)⌋ mK. Named so reactor can cool to it. */
export const heatThresholdOf = (): number => Math.floor(photon / (BOLTZMANN * L.tenOf(L.seed)))

/** Every file's heat from its readings, hottest first: temperature, signal, coherence, quality, and the split that would
 *  bring it to the signal's threshold (the coldest temperature at which the signal is still 1). */
export const heatOf = (readings: HeatReading[]) => {
  const threshold = heatThresholdOf()
  const rows = readings
    .map((r) => {
      const t = HeatFormulas.temperature(r.commits, r.days)
      const s = HeatFormulas.signal(t.value)
      const c = HeatFormulas.coherence(r.days, r.fixes)
      const q = HeatFormulas.quality(r.commits, r.days, r.fixes)
      const k = HeatFormulas.ways(t.value, threshold)
      const id = HeatFormulas.identity(t.value)
      return { ...r, kind: HEAT as typeof HEAT, temperature: t.value, signal: s.value, coherence: c.value, quality: q.value, ways: k.value, hot: s.value === 0, hex: id.hex ?? q.hex, identity: id.hex, receipt: q.receipt }
    })
    .sort((a, b) => b.temperature - a.temperature || b.lines - a.lines)
  return { kind: HEAT as typeof HEAT, threshold, files: rows.length, hot: rows.filter((r) => r.hot).length, rows, holds: rows.every((r) => Number.isFinite(r.quality)) }
}

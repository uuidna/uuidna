import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GAMING — PLAY AS ARITHMETIC (chosen by the registry, not by hand). Running a game is numbers: frames per second,
 *  score from points at a multiplier, win rate, kill/death ratio, the experience curve, damage after defense,
 *  round-trip latency, and shot accuracy. Crosses to `code` — gaming is what the code runs. A measure. */

const PROOF = 'gaming arithmetic (framerate, score, winrate, kill/death, experience curve, damage, latency, accuracy); play as a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gaming', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `gaming.${name}`, params })

export class GamingFormulas {
  /** ACCURACY as a percentage: hits over shots. value ⌊hits · 100 / shots⌋. */
  static accuracy(hits: number, shots: number): CrossFormula { return c('gaming-accuracy', 'accuracy(hits, shots) = ⌊hits · 100 / shots⌋', shots > 0 ? Math.floor((hits * 100) / shots) : 0, nat(hits, shots) && shots > 0 && hits <= shots, 'accuracy', [hits, shots]) }
  /** DAMAGE: attack past defense, never below zero. value max(0, attack − defense). */
  static damage(attack: number, defense: number): CrossFormula { return c('gaming-damage', 'damage(attack, defense) = max(0, attack − defense)', Math.max(0, attack - defense), nat(attack, defense), 'damage', [attack, defense]) }
  /** FRAMERATE: frames over seconds. value ⌊frames / seconds⌋. */
  static framerate(frames: number, seconds: number): CrossFormula { return c('gaming-framerate', 'framerate(frames, seconds) = ⌊frames / seconds⌋', seconds > 0 ? Math.floor(frames / seconds) : 0, nat(frames, seconds) && seconds > 0, 'framerate', [frames, seconds]) }
  /** KILL/DEATH ratio, ×100: kills over deaths. value ⌊kills · 100 / deaths⌋. */
  static kd(kills: number, deaths: number): CrossFormula { return c('gaming-kd', 'kd(kills, deaths) = ⌊kills · 100 / deaths⌋', deaths > 0 ? Math.floor((kills * 100) / deaths) : 0, nat(kills, deaths) && deaths > 0, 'kd', [kills, deaths]) }
  /** LATENCY: the round-trip time, as measured. value roundtrip. */
  static latency(roundtrip: number): CrossFormula { return c('gaming-latency', 'latency(roundtrip) = roundtrip', roundtrip, nat(roundtrip), 'latency', [roundtrip]) }
  /** SCORE: points at a multiplier. value points · multiplier. */
  static score(points: number, multiplier: number): CrossFormula { return c('gaming-score', 'score(points, multiplier) = points · multiplier', points * multiplier, nat(points, multiplier), 'score', [points, multiplier]) }
  /** WIN RATE as a percentage: wins over games. value ⌊wins · 100 / games⌋. */
  static winrate(wins: number, games: number): CrossFormula { return c('gaming-winrate', 'winrate(wins, games) = ⌊wins · 100 / games⌋', games > 0 ? Math.floor((wins * 100) / games) : 0, nat(wins, games) && games > 0 && wins <= games, 'winrate', [wins, games]) }
  /** EXPERIENCE curve: a quadratic in level at a base. value level² · base. */
  static xp(level: number, base: number): CrossFormula { return c('gaming-xp', 'xp(level, base) = level² · base', level * level * base, nat(level, base), 'xp', [level, base]) }
}

for (const name of ['accuracy', 'damage', 'framerate', 'kd', 'latency', 'score', 'winrate', 'xp'] as const)
  hexRegisterOf('gaming', name, (GamingFormulas[name] as (...x: unknown[]) => unknown).bind(GamingFormulas))

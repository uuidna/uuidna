import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACTUARIAL — RISK AS ARITHMETIC (chosen by the registry, not by hand). Insurance is numbers: mortality per mille,
 *  the loss ratio, reserves held, the annuity, the premium at a load, life expectancy, the discount to present value,
 *  and the solvency margin. Crosses to `accounting` — risk is what the books reserve against. A measure. */

const PROOF = 'actuarial arithmetic (mortality, loss ratio, reserve, annuity, premium, life expectancy, discount, solvency); risk priced for the books; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'actuarial', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `actuarial.${name}`, params })

export class ActuarialFormulas {
  /** MORTALITY: deaths over exposed, per mille. value ⌊deaths · 1000 / exposed⌋. */
  static mortality(deaths: number, exposed: number): CrossFormula { return c('actuarial-mortality', 'mortality(deaths, exposed) = ⌊deaths · 1000 / exposed⌋', exposed > 0 ? Math.floor((deaths * 1000) / exposed) : 0, nat(deaths, exposed) && exposed > 0 && deaths <= exposed, 'mortality', [deaths, exposed]) }
  /** LOSS RATIO: claims over premiums, as a percentage. value ⌊claims · 100 / premiums⌋. */
  static lossratio(claims: number, premiums: number): CrossFormula { return c('actuarial-lossratio', 'lossratio(claims, premiums) = ⌊claims · 100 / premiums⌋', premiums > 0 ? Math.floor((claims * 100) / premiums) : 0, nat(claims, premiums) && premiums > 0, 'lossratio', [claims, premiums]) }
  /** RESERVE: claims scaled by a development factor. value claims · factor. */
  static reserve(claims: number, factor: number): CrossFormula { return c('actuarial-reserve', 'reserve(claims, factor) = claims · factor', claims * factor, nat(claims, factor), 'reserve', [claims, factor]) }
  /** ANNUITY: a level payment over periods. value payment · periods. */
  static annuity(payment: number, periods: number): CrossFormula { return c('actuarial-annuity', 'annuity(payment, periods) = payment · periods', payment * periods, nat(payment, periods), 'annuity', [payment, periods]) }
  /** PREMIUM: risk at a percentage load. value ⌊risk · (100 + load) / 100⌋. */
  static premium(risk: number, load: number): CrossFormula { return c('actuarial-premium', 'premium(risk, load) = ⌊risk · (100 + load) / 100⌋', Math.floor((risk * (100 + load)) / 100), nat(risk, load), 'premium', [risk, load]) }
  /** LIFE EXPECTANCY: the years, held. value years. */
  static lifeexpectancy(years: number): CrossFormula { return c('actuarial-lifeexpectancy', 'lifeexpectancy(years) = years', years, nat(years), 'lifeexpectancy', [years]) }
  /** DISCOUNT: a future amount to present value at a rate. value ⌊future · 100 / (100 + rate)⌋. */
  static discount(future: number, rate: number): CrossFormula { return c('actuarial-discount', 'discount(future, rate) = ⌊future · 100 / (100 + rate)⌋', (100 + rate) > 0 ? Math.floor((future * 100) / (100 + rate)) : 0, nat(future, rate), 'discount', [future, rate]) }
  /** SOLVENCY: assets over liabilities, as a percentage. value ⌊assets · 100 / liabilities⌋. */
  static solvency(assets: number, liabilities: number): CrossFormula { return c('actuarial-solvency', 'solvency(assets, liabilities) = ⌊assets · 100 / liabilities⌋', liabilities > 0 ? Math.floor((assets * 100) / liabilities) : 0, nat(assets, liabilities) && liabilities > 0, 'solvency', [assets, liabilities]) }
  /** EXPECTED CLAIMS: frequency times severity. value freq · severity. */
  static expectedclaims(freq: number, severity: number): CrossFormula { return c('actuarial-expectedclaims', 'expectedclaims(freq, severity) = freq · severity', freq * severity, nat(freq, severity), 'expectedclaims', [freq, severity]) }
  /** LOSS RATIO (losses over premiums): a percentage. value ⌊losses·100/premiums⌋. */
  static lossratio2(losses: number, premiums: number): CrossFormula { return c('actuarial-lossratio2', 'lossratio(losses, premiums) = ⌊losses·100/premiums⌋', premiums > 0 ? Math.floor((losses * 100) / premiums) : 0, nat(losses, premiums) && premiums > 0, 'lossratio2', [losses, premiums]) }
  /** RESERVE (incurred net of paid). value max(0, incurred − paid). */
  static reserve2(incurred: number, paid: number): CrossFormula { return c('actuarial-reserve2', 'reserve(incurred, paid) = max(0, incurred − paid)', Math.max(0, incurred - paid), nat(incurred, paid), 'reserve2', [incurred, paid]) }
  /** EXPOSURE: policies times years. value policies · years. */
  static exposure(policies: number, years: number): CrossFormula { return c('actuarial-exposure', 'exposure(policies, years) = policies · years', policies * years, nat(policies, years), 'exposure', [policies, years]) }
  /** PURE PREMIUM: losses over exposure. value ⌊losses/exposure⌋. */
  static purepremium(losses: number, exposure: number): CrossFormula { return c('actuarial-purepremium', 'purepremium(losses, exposure) = ⌊losses/exposure⌋', exposure > 0 ? Math.floor(losses / exposure) : 0, nat(losses, exposure) && exposure > 0, 'purepremium', [losses, exposure]) }
  /** COMBINED RATIO: losses plus expenses over premium, as a percentage. value ⌊(losses+expenses)·100/premium⌋. */
  static combinedratio(losses: number, expenses: number, premium: number): CrossFormula { return c('actuarial-combinedratio', 'combinedratio(losses, expenses, premium) = ⌊(losses+expenses)·100/premium⌋', premium > 0 ? Math.floor(((losses + expenses) * 100) / premium) : 0, nat(losses, expenses, premium) && premium > 0, 'combinedratio', [losses, expenses, premium]) }
  /** SURVIVAL: lives net of deaths. value max(0, lives − deaths). */
  static survival(lives: number, deaths: number): CrossFormula { return c('actuarial-survival', 'survival(lives, deaths) = max(0, lives − deaths)', Math.max(0, lives - deaths), nat(lives, deaths), 'survival', [lives, deaths]) }
}

for (const name of ['annuity', 'combinedratio', 'discount', 'expectedclaims', 'exposure', 'lifeexpectancy', 'lossratio', 'lossratio2', 'mortality', 'premium', 'purepremium', 'reserve', 'reserve2', 'solvency', 'survival'] as const)
  hexRegisterOf('actuarial', name, (ActuarialFormulas[name] as (...x: unknown[]) => unknown).bind(ActuarialFormulas))

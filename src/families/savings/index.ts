import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SAVINGS — PERSONAL SAVING AS ARITHMETIC. What a saver tracks is numbers: simple interest earned, the balance it grows
 *  to, the future value of a starting balance plus recurring deposits, the total deposited, the effective annual yield,
 *  the months to reach a goal, the emergency fund to hold, the implied rate. Crosses to `banking` — savings is what a bank
 *  holds and pays on. A measure. */

const PROOF = 'savings arithmetic (simple interest, balance growth, future value, deposits, APY, goal months, emergency fund, implied rate); personal saving as a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'savings', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `savings.${name}`, params })

export class SavingsFormulas {
  /** SIMPLE INTEREST earned on a principal at a yearly rate (percent) over years. value ⌊principal · rate · years / 100⌋. */
  static interest(principal: number, rate: number, years: number): CrossFormula { return c('savings-interest', 'interest(principal, rate, years) = ⌊principal · rate · years / 100⌋', Math.floor((principal * rate * years) / 100), nat(principal, rate, years), 'interest', [principal, rate, years]) }
  /** SIMPLE GROWTH: the balance a principal grows to under simple interest. value principal + ⌊principal · rate · years / 100⌋. */
  static simplegrowth(principal: number, rate: number, years: number): CrossFormula { return c('savings-simplegrowth', 'simplegrowth(principal, rate, years) = principal + ⌊principal · rate · years / 100⌋', principal + Math.floor((principal * rate * years) / 100), nat(principal, rate, years), 'simplegrowth', [principal, rate, years]) }
  /** FUTURE VALUE: a starting balance plus a monthly deposit over months. value principal + monthly · months. */
  static futurevalue(principal: number, monthly: number, months: number): CrossFormula { return c('savings-futurevalue', 'futurevalue(principal, monthly, months) = principal + monthly · months', principal + monthly * months, nat(principal, monthly, months), 'futurevalue', [principal, monthly, months]) }
  /** DEPOSIT: the total put aside saving a fixed amount each month. value monthly · months. */
  static deposit(monthly: number, months: number): CrossFormula { return c('savings-deposit', 'deposit(monthly, months) = monthly · months', monthly * months, nat(monthly, months), 'deposit', [monthly, months]) }
  /** APY: the effective annual yield (percent) of a nominal rate compounded semiannually. value rate + ⌊rate² / 400⌋. */
  static apy(rate: number): CrossFormula { return c('savings-apy', 'apy(rate) = rate + ⌊rate² / 400⌋', rate + Math.floor((rate * rate) / 400), nat(rate), 'apy', [rate]) }
  /** GOAL MONTHS: the months to reach a goal saving a fixed amount each month. value ⌈goal / monthly⌉. */
  static goalmonths(goal: number, monthly: number): CrossFormula { return c('savings-goalmonths', 'goalmonths(goal, monthly) = ⌈goal / monthly⌉', monthly > 0 ? Math.ceil(goal / monthly) : 0, nat(goal, monthly) && monthly > 0, 'goalmonths', [goal, monthly]) }
  /** EMERGENCY FUND: the fund to hold for a number of months of expenses. value expenses · months. */
  static emergencyfund(expenses: number, months: number): CrossFormula { return c('savings-emergencyfund', 'emergencyfund(expenses, months) = expenses · months', expenses * months, nat(expenses, months), 'emergencyfund', [expenses, months]) }
  /** IMPLIED RATE: the annual rate (percent) implied by the interest earned on a principal. value ⌊interest · 100 / principal⌋. */
  static rate(interest: number, principal: number): CrossFormula { return c('savings-rate', 'rate(interest, principal) = ⌊interest · 100 / principal⌋', principal > 0 ? Math.floor((interest * 100) / principal) : 0, nat(interest, principal) && principal > 0, 'rate', [interest, principal]) }
}

for (const name of ['apy', 'deposit', 'emergencyfund', 'futurevalue', 'goalmonths', 'interest', 'rate', 'simplegrowth'] as const)
  hexRegisterOf('savings', name, (SavingsFormulas[name] as (...x: unknown[]) => unknown).bind(SavingsFormulas))

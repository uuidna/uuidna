import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DIPLOMACY — THE STATECRAFT OF AGREEMENT, AS ARITHMETIC. Negotiation is numbers: the share of parties that agreed,
 *  bargaining leverage, the share of signatories that ratified, the tension of incidents over a period, the share of a
 *  bloc allied, the share of trade sanctioned, concessions given against gained, and resolutions per summit session.
 *  Crosses to `sociology` — diplomacy is the group behaviour of states. A measure. */

const PROOF = 'diplomacy arithmetic (consensus, leverage, treaty ratification, tension, alliance, sanction, concession, summit); statecraft as a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'diplomacy', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `diplomacy.${name}`, params })

export class DiplomacyFormulas {
  /** CONSENSUS: the share of parties that agreed, as a percentage. value ⌊agreed · 100 / parties⌋. */
  static consensus(agreed: number, parties: number): CrossFormula { return c('diplomacy-consensus', 'consensus(agreed, parties) = ⌊agreed · 100 / parties⌋', parties > 0 ? Math.floor((agreed * 100) / parties) : 0, nat(agreed, parties) && parties > 0 && agreed <= parties, 'consensus', [agreed, parties]) }
  /** LEVERAGE: assets over demands. value ⌊assets / demands⌋. */
  static leverage(assets: number, demands: number): CrossFormula { return c('diplomacy-leverage', 'leverage(assets, demands) = ⌊assets / demands⌋', demands > 0 ? Math.floor(assets / demands) : 0, nat(assets, demands) && demands > 0, 'leverage', [assets, demands]) }
  /** TREATY: the share of signatories that ratified, as a percentage. value ⌊ratified · 100 / signatories⌋. */
  static treaty(ratified: number, signatories: number): CrossFormula { return c('diplomacy-treaty', 'treaty(ratified, signatories) = ⌊ratified · 100 / signatories⌋', signatories > 0 ? Math.floor((ratified * 100) / signatories) : 0, nat(ratified, signatories) && signatories > 0 && ratified <= signatories, 'treaty', [ratified, signatories]) }
  /** TENSION: incidents over a period. value ⌊incidents / period⌋. */
  static tension(incidents: number, period: number): CrossFormula { return c('diplomacy-tension', 'tension(incidents, period) = ⌊incidents / period⌋', period > 0 ? Math.floor(incidents / period) : 0, nat(incidents, period) && period > 0, 'tension', [incidents, period]) }
  /** ALLIANCE: the share of a bloc allied, as a percentage. value ⌊members · 100 / bloc⌋. */
  static alliance(members: number, bloc: number): CrossFormula { return c('diplomacy-alliance', 'alliance(members, bloc) = ⌊members · 100 / bloc⌋', bloc > 0 ? Math.floor((members * 100) / bloc) : 0, nat(members, bloc) && bloc > 0 && members <= bloc, 'alliance', [members, bloc]) }
  /** SANCTION: the share of trade sanctioned, as a percentage. value ⌊restricted · 100 / trade⌋. */
  static sanction(restricted: number, trade: number): CrossFormula { return c('diplomacy-sanction', 'sanction(restricted, trade) = ⌊restricted · 100 / trade⌋', trade > 0 ? Math.floor((restricted * 100) / trade) : 0, nat(restricted, trade) && trade > 0 && restricted <= trade, 'sanction', [restricted, trade]) }
  /** CONCESSION: given against gained, as a percentage. value ⌊given · 100 / gained⌋. */
  static concession(given: number, gained: number): CrossFormula { return c('diplomacy-concession', 'concession(given, gained) = ⌊given · 100 / gained⌋', gained > 0 ? Math.floor((given * 100) / gained) : 0, nat(given, gained) && gained > 0, 'concession', [given, gained]) }
  /** SUMMIT: resolutions over sessions. value ⌊resolutions / sessions⌋. */
  static summit(resolutions: number, sessions: number): CrossFormula { return c('diplomacy-summit', 'summit(resolutions, sessions) = ⌊resolutions / sessions⌋', sessions > 0 ? Math.floor(resolutions / sessions) : 0, nat(resolutions, sessions) && sessions > 0, 'summit', [resolutions, sessions]) }
}

for (const name of ['alliance', 'concession', 'consensus', 'leverage', 'sanction', 'summit', 'tension', 'treaty'] as const)
  hexRegisterOf('diplomacy', name, (DiplomacyFormulas[name] as (...x: unknown[]) => unknown).bind(DiplomacyFormulas))

import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GOVERNANCE — THE RULE OF A BODY, AS ARITHMETIC. Deciding together is numbers: whether a meeting has quorum, whether a
 *  vote carries a majority, how open the decisions are, how answerable the answers are, how many seats a people holds, how
 *  long a term runs, how closely rules are met, and how many of the eligible turned out. Crosses to `law` — governance is
 *  what law governs. A measure. */

const PROOF = 'governance arithmetic (quorum, majority, transparency, accountability, representation, term, compliance, turnout); the rule of a body as numbers; a measure crossed to law'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'governance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `governance.${name}`, params })

export class GovernanceFormulas {
  /** QUORUM: those present as a percentage of the members. value ⌊present · 100 / members⌋. */
  static quorum(present: number, members: number): CrossFormula { return c('governance-quorum', 'quorum(present, members) = ⌊present · 100 / members⌋', members > 0 ? Math.floor((present * 100) / members) : 0, nat(present, members) && members > 0 && present <= members, 'quorum', [present, members]) }
  /** MAJORITY: the votes for as a percentage of the total. value ⌊votes · 100 / total⌋. */
  static majority(votes: number, total: number): CrossFormula { return c('governance-majority', 'majority(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0, nat(votes, total) && total > 0 && votes <= total, 'majority', [votes, total]) }
  /** TRANSPARENCY: the decisions disclosed as a percentage of all. value ⌊disclosed · 100 / decisions⌋. */
  static transparency(disclosed: number, decisions: number): CrossFormula { return c('governance-transparency', 'transparency(disclosed, decisions) = ⌊disclosed · 100 / decisions⌋', decisions > 0 ? Math.floor((disclosed * 100) / decisions) : 0, nat(disclosed, decisions) && decisions > 0 && disclosed <= decisions, 'transparency', [disclosed, decisions]) }
  /** ACCOUNTABILITY: the inquiries answered as a percentage of all. value ⌊answered · 100 / inquiries⌋. */
  static accountability(answered: number, inquiries: number): CrossFormula { return c('governance-accountability', 'accountability(answered, inquiries) = ⌊answered · 100 / inquiries⌋', inquiries > 0 ? Math.floor((answered * 100) / inquiries) : 0, nat(answered, inquiries) && inquiries > 0 && answered <= inquiries, 'accountability', [answered, inquiries]) }
  /** REPRESENTATION: the seats a people holds per million of its population. value ⌊seats · 1000000 / population⌋. */
  static representation(seats: number, population: number): CrossFormula { return c('governance-representation', 'representation(seats, population) = ⌊seats · 1000000 / population⌋', population > 0 ? Math.floor((seats * 1000000) / population) : 0, nat(seats, population) && population > 0, 'representation', [seats, population]) }
  /** TERM: the office-years of those elected. value elected · years. */
  static term(elected: number, years: number): CrossFormula { return c('governance-term', 'term(elected, years) = elected · years', elected * years, nat(elected, years), 'term', [elected, years]) }
  /** COMPLIANCE: the regulations complied with as a percentage of all. value ⌊compliant · 100 / regulations⌋. */
  static compliance(compliant: number, regulations: number): CrossFormula { return c('governance-compliance', 'compliance(compliant, regulations) = ⌊compliant · 100 / regulations⌋', regulations > 0 ? Math.floor((compliant * 100) / regulations) : 0, nat(compliant, regulations) && regulations > 0 && compliant <= regulations, 'compliance', [compliant, regulations]) }
  /** TURNOUT: those who voted as a percentage of the eligible. value ⌊voted · 100 / eligible⌋. */
  static turnout(voted: number, eligible: number): CrossFormula { return c('governance-turnout', 'turnout(voted, eligible) = ⌊voted · 100 / eligible⌋', eligible > 0 ? Math.floor((voted * 100) / eligible) : 0, nat(voted, eligible) && eligible > 0 && voted <= eligible, 'turnout', [voted, eligible]) }
}

for (const name of ['accountability', 'compliance', 'majority', 'quorum', 'representation', 'term', 'transparency', 'turnout'] as const)
  hexRegisterOf('governance', name, (GovernanceFormulas[name] as (...x: unknown[]) => unknown).bind(GovernanceFormulas))

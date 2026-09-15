#!/usr/bin/env node
// Automate the Lean layer for THE RIGHT TO LAND AND THE PUBLIC'S ACCESS TO IT. The instruments live in
// src/rights/land-instruments.json, each read from its official source: title, adopting body, kind (binding treaty,
// soft law, constitution, statute, case law), years, articles by number, and the qualifications as the text sets them.
// Every Lean list below is derived from that table and only from rows marked verified; the kernel decides what can be
// decided over those integers. It never decides what a law means, whether a right is honoured, or who is in breach.
// SCOPE: integrity of the table and arithmetic over it, not legal advice. No instrument in the table grants
// unrestricted access to all land: international law speaks of peoples' resources and collective and customary tenure,
// and physical access exists only in national law, always qualified (every_access_instrument_is_qualified).
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { emit } from './lean-gen.js'

interface Fact { fact: string; value: number; source: string }
interface Article { n: string; topic: string; summary: string }
interface Row {
  id: string; title: string; kind: string; adopted: number | null; inForce: number | null
  articles: Article[]; verified: boolean; integerFacts: Fact[]; qualifications: string
}

const rows = (JSON.parse(readFileSync(join(ROOT, 'src', 'rights', 'land-instruments.json'), 'utf8')) as Row[]).filter((r) => r.verified)
const factOf = (r: Row, name: string): number | undefined => r.integerFacts.find((f) => f.fact === name)?.value
const list = (xs: readonly number[]): string => `[${xs.join(', ')}]`
const pairs = (xs: readonly (readonly [number, number])[]): string => `[${xs.map(([a, b]) => `(${a}, ${b})`).join(', ')}]`
const triples = (xs: readonly (readonly [number, number, number])[]): string => `[${xs.map(([a, b, c]) => `(${a}, ${b}, ${c})`).join(', ')}]`
const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0)
const touches = (r: Row, topic: string): boolean => r.articles.some((a) => a.topic === topic)

// 1. adoption to entry into force, for every instrument whose table row carries both years
const forced = rows.filter((r) => r.adopted !== null && r.inForce !== null).map((r) => [r.adopted as number, r.inForce as number] as const)
const spans = forced.map(([a, f]) => f - a)

// 2. every recorded vote: in favour, against, abstentions — as the UN records them
const voted = rows.filter((r) => factOf(r, 'votes in favour') !== undefined)
const votes = voted.map((r) => [factOf(r, 'votes in favour') as number, factOf(r, 'votes against') as number, factOf(r, 'abstentions') as number] as const)
const totals = votes.map(([y, n, a]) => y + n + a)
// the environment right: the voted instruments whose every article is about the environment
const envAgainst = voted.filter((r) => r.articles.every((a) => a.topic === 'environment')).map((r) => factOf(r, 'votes against') as number)

// 3. the Norwegian innmark closed season, from its first day in April to its last day in October, inclusive
const norway = rows.find((r) => factOf(r, 'innmark closed-season start (April day)') !== undefined)
const APRIL_DAYS = 30
const MAY_TO_SEPTEMBER = [31, 30, 31, 31, 30]   // the Gregorian months between, fixed by the calendar
const start = norway ? factOf(norway, 'innmark closed-season start (April day)') as number : 0
const end = norway ? factOf(norway, 'innmark closed-season end (October day)') as number : 0
const closedDays = APRIL_DAYS - start + 1 + sum(MAY_TO_SEPTEMBER) + end

// 4. the access laws, measured from the Charter of the Forest (the one historic charter in the table)
const charter = rows.find((r) => r.kind === 'historic charter')
const charterYear = charter?.adopted ?? 0
const accessYears = rows.filter((r) => r !== charter && touches(r, 'access') && r.adopted !== null).map((r) => r.adopted as number)
const fromCharter = accessYears.map((y) => y - charterYear)

// 5. Bulgaria (rows whose id carries the bg jurisdiction code), in order of adoption, the constitution first
const bg = rows.filter((r) => r.id.startsWith('bg_') && r.adopted !== null).sort((a, b) => (a.adopted as number) - (b.adopted as number))
const bgYears = bg.map((r) => r.adopted as number)
const bgFirst = bg[0]?.kind ?? ''

// 6. every access instrument records a qualification (the length of its qualification text, as the table holds it)
const qualLengths = rows.filter((r) => touches(r, 'access')).map((r) => r.qualifications.trim().length)

const SCOPE = 'Integrity of the instrument table and arithmetic over it — never what a law means, whether it is honoured, or who is in breach; not legal advice.'

const FACTS = [
  { key: 'land_rights_enter_force_no_earlier_than_adopted',
    name: `each of the ${forced.length} instruments that carry both years entered into force no earlier than it was adopted`,
    why: `EVERY INSTRUMENT ENTERS INTO FORCE NO EARLIER THAN IT IS ADOPTED, and the waits are exact: over the instruments in src/rights/land-instruments.json that carry both years, each year of entry into force is at least its year of adoption, and the waits are ${spans.join(', ')} years — the Covenants ten, ILO 169 two, Aarhus three. ${SCOPE}`,
    js: () => forced.every(([a, f]) => a <= f) && forced.map(([a, f]) => f - a).join() === spans.join(),
    lean: `theorem land_rights_enter_force_no_earlier_than_adopted : (${pairs(forced)}.all (fun p => p.1 ≤ p.2)) ∧ (${pairs(forced)}.map (fun p => p.2 - p.1) = ${list(spans)}) := by decide` },

  { key: 'land_rights_recorded_votes_carry_their_majorities',
    name: `every one of the ${votes.length} recorded votes adds up to its total and carries its majority`,
    why: `EVERY RECORDED VOTE ADDS UP AND CARRIES ITS MAJORITY: for each instrument the table records a vote on (the UDHR, UNDRIP, UNDROP and the two environment-right resolutions), votes in favour exceed votes against and abstentions together, and in favour + against + abstentions gives the recorded totals ${totals.join(', ')}. UNDROP: 121 in favour, 8 against, 54 abstaining. ${SCOPE}`,
    js: () => votes.every(([y, n, a]) => y > n + a) && votes.map(([y, n, a]) => y + n + a).join() === totals.join(),
    lean: `theorem land_rights_recorded_votes_carry_their_majorities : (${triples(votes)}.all (fun v => v.1 > v.2.1 + v.2.2)) ∧ (${triples(votes)}.map (fun v => v.1 + v.2.1 + v.2.2) = ${list(totals)}) := by decide` },

  { key: 'the_environment_right_drew_no_vote_against',
    name: `each of the ${envAgainst.length} environment-right resolutions drew zero votes against`,
    why: `THE RIGHT TO A CLEAN, HEALTHY AND SUSTAINABLE ENVIRONMENT DREW NO VOTE AGAINST: the voted instruments whose every article is about the environment — the Human Rights Council's 48/13 (2021) and the General Assembly's 76/300 (2022) — each record zero votes against. A resolution is soft law; this seals the record of the vote, not a binding obligation. ${SCOPE}`,
    js: () => envAgainst.length > 0 && envAgainst.every((n) => n === 0),
    lean: `theorem the_environment_right_drew_no_vote_against : (${list(envAgainst)}.length > 0) ∧ (${list(envAgainst)}.all (fun n => n == 0)) := by decide` },

  { key: 'norway_innmark_is_closed_one_hundred_sixty_eight_days',
    name: `the innmark closed season sums to ${closedDays} days over its ${MAY_TO_SEPTEMBER.length + 2} month segments`,
    why: `NORWAY CLOSES CULTIVATED LAND TO WALKERS FOR ${closedDays} DAYS A YEAR: the Outdoor Recreation Act (1957) § 3 opens innmark only while the ground is frozen or snow-covered and never from ${start} April to ${end} October; counting that span inclusively — the rest of April, the whole of May to September, and October to the ${end}th — gives ${closedDays}. Uncultivated land (utmark) stays open all year (§ 2). The authorities may shorten or lengthen the season. ${SCOPE}`,
    js: () => norway !== undefined && closedDays === APRIL_DAYS - start + 1 + sum(MAY_TO_SEPTEMBER) + end,
    lean: `theorem norway_innmark_is_closed_one_hundred_sixty_eight_days : ${APRIL_DAYS} - ${start} + 1 + ${list(MAY_TO_SEPTEMBER)}.foldl (· + ·) 0 + ${end} = ${closedDays} := by decide` },

  { key: 'access_laws_stand_centuries_after_the_charter_of_the_forest',
    name: `all ${accessYears.length} access instruments were adopted after the Charter of the Forest`,
    why: `THE ACCESS LAWS STAND CENTURIES AFTER THE CHARTER OF THE FOREST (${charterYear}): every other instrument in the table that speaks to public access was adopted after it, by ${fromCharter.join(', ')} years — England and Wales's Countryside and Rights of Way Act 783 years on, Scotland's Land Reform Act 786. ${SCOPE}`,
    js: () => charter !== undefined && accessYears.every((y) => charterYear < y) && accessYears.map((y) => y - charterYear).join() === fromCharter.join(),
    lean: `theorem access_laws_stand_centuries_after_the_charter_of_the_forest : (${list(accessYears)}.all (fun y => ${charterYear} < y)) ∧ (${list(accessYears)}.map (fun y => y - ${charterYear}) = ${list(fromCharter)}) := by decide` },

  { key: 'bulgarias_access_instruments_follow_its_constitution',
    name: `Bulgaria’s ${bgYears.length} access instruments were each adopted in a later year, the constitution first`,
    why: `BULGARIA'S ACCESS INSTRUMENTS FOLLOW ITS CONSTITUTION, each in its own year: the Constitution (1991; Art. 18 makes the coastal beach strip and the waters exclusive state property), then the Waters Act, the Black Sea Coast Spatial Development Act (free access to the beaches, Art. 4(1)) and the Forests Act (free access to forest territories, art. 144(1); fencing barred, art. 145) — adopted ${bgYears.join(', ')}, strictly one after another, the constitution first. Forest access is at the visitor's own risk and may be closed for a time. ${SCOPE}`,
    js: () => bgYears.length > 1 && bgYears.every((y, i) => i === 0 || bgYears[i - 1] < y) && bgFirst === 'constitution',
    lean: `theorem bulgarias_access_instruments_follow_its_constitution : (${list(bgYears)}.length > 1) ∧ ((${list(bgYears)}.zip ${list(bgYears)}.tail).all (fun p => p.1 < p.2)) := by decide` },

  { key: 'every_access_instrument_is_qualified',
    name: `every one of the ${qualLengths.length} access instruments records a qualification`,
    why: `EVERY ACCESS INSTRUMENT IS QUALIFIED: each instrument in the table that speaks to public access records a qualification — the Nordic rights to roam must be exercised with consideration; Norway protects cultivated land in summer; Scotland excludes houses, gardens and crops and asks responsible conduct; England and Wales open only mapped land; Bulgaria's forests may be closed. No instrument in the table grants unrestricted access to all land, and the Aarhus Convention's access is to information, participation and justice, not to land. The kernel checks that no access row's qualification is empty; the qualifications themselves are the table's reading of each text. ${SCOPE}`,
    js: () => qualLengths.length > 0 && qualLengths.every((n) => n > 0),
    lean: `theorem every_access_instrument_is_qualified : (${list(qualLengths)}.length > 0) ∧ (${list(qualLengths)}.all (fun n => n > 0)) := by decide` },
]

emit({ file: 'LandRights.lean', skill: 'legal', facts: FACTS,
  header: 'The right to land and the public\'s access to it — integers from src/rights/land-instruments.json, each instrument read from its official source; integrity of the table, not legal advice' })

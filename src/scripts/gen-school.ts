#!/usr/bin/env node
// scripts/gen-school — THE PRACTICES, GENERATED FROM THE COMPUTATION. A practice that quotes a number a human typed
// is a practice that goes stale: the seventh was authored saying "ninety monographs" when the ledger holds 70, and
// priced its waste at "208ms" — a wall-clock figure that moves with the host, the cache and the run. Both defects
// are the same defect, and neither is catchable by reading.
//
// So the numbers are COMPUTED HERE and the prose is assembled around them, exactly as a theorem's `name` is written
// around the value its `js` mirror computes. A figure that moves now moves the file, the drain stages it, and the
// git-diff arm of the gate fails until someone re-derives — which is what "generated, not authored" buys.
//
// SCOPE: only the numbered practice block between the markers is generated. The lessons around it are authored
// prose about events (a scattering, a colour), and history keeps its own numbers. Integrity.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { citersOf } from '../citations/index.js'
import { theorems, PRINCIPLES, coins, renderAdvantageMcpMarkdown } from '../index.js'
import { hexbitsOf, bitsOf } from '../hexbit/index.js'
import { schoolLeads, leadsCensus, renderSchoolLeads, type LeadsRecord } from '../school/leads/index.js'
import { ROOT } from './api.js'
import { portsCensus } from '../quantum/os/ports/index.js'
import { allDomainCensuses } from '../quantum/os/domains/index.js'
import { schoolEfficiency, payloadlessSpace } from '../school/efficiency/index.js'

const leadsRecord = ((): LeadsRecord => {
  try {
    return JSON.parse(readFileSync(join(ROOT, 'lean', 'leads.json'), 'utf8')) as LeadsRecord
  } catch { return {} }
})()
const leadsRoster = schoolLeads(leadsRecord)
const leadsFig = leadsCensus(leadsRoster)

const T = theorems() as { file: string }[]
// THE FIGURES — every one recomputed from the live ledger, never carried in the prose.
const monographs = (PRINCIPLES as [string, string, string][]).filter(([f]) => T.some((t) => t.file === f)).length
const theoremCount = T.length   // the film's length, but a COUNT — naming it `auras` promised a derivation it never did
// THE REDUNDANCY IS THE MONOGRAPHS ALONE. The auras were briefly counted here too and that was wrong: an aura is
// only an aura if it is DERIVED from the algebra, so folding addresses in its place computes no aura at all while
// keeping the name. The law holds where the derived value carries no meaning of its own; the aura is where it stops.
const redundant = monographs
const fig = {
  monographs, auras: theoremCount, redundant,
  hexbits: hexbitsOf(redundant),
  bits: bitsOf(redundant),
  ledgerHexbits: hexbitsOf(theoremCount),
  coins: coins(),
}

const cite = (k: string): string => `[\`${k}\`](/theorem/${k})`

const PRACTICES: string[] = [
  `1. **Fold the finder** — a finding fixed by hand recurs; folded into a check it never does. *Practice:* run
   \`one-receipt dry\`, then re-declare \`ROOT\` anywhere and read the objection's exact fix.`,
  `2. **One stroke** — piecewise verification re-pays the gate each visit; the wave pays once
   (${cite('pentagram_single_stroke')}). *Practice:* \`one-receipt wave "…"\`.`,
  `3. **The gate objects in both directions** — an unearned boundary marker is refused as firmly as a missing one;
   overclaiming honesty is still overclaiming (${cite('exactly_one_flag')}). *Practice:* mark
   a pure module \`@non-harmonic\` and let the scan teach you.`,
  `4. **Never edit mid-gate** — a torn tree fails honestly; the schedule is part of the correctness. *Practice:*
   find the TS1005 in a reconcile log and name the race.`,
  `5. **Ask the theorems first** — the pentagram chain sat sealed before the question was asked. *Practice:* query
   the ledger before asserting anything.`,
  `6. **Minimum bytes, max coins** — one session deleted ~67,000 lines while the coins held at ${fig.coins} per superposition
   (${cite('two_coins')}) and the checks grew. *Practice:* measure with \`uuidna_ledger_costs\`, then
   find a fold of your own.`,
  `7. **Seal the input, never its pure function — and know where that stops** — a digest of f(x) moves exactly when
   a digest of x moves, so sealing both seals one fact twice and the second seal is pure cost
   (${cite('verify_beats_recompute_by_magnitudes')}). One fold composed **${fig.monographs}** monographs to
   fingerprint what their (principle, theorem set) already fixed — **${fig.hexbits} hexbit** of pure restatement
   (${cite('hexbit_is_four_qubits')}), priced in the unit and not in milliseconds, because a wall-clock figure moves
   with the host and a practice carrying a number that moves goes stale.
   **The boundary:** the same reasoning was turned on the ${fig.auras}-frame aura film and it was wrong. The aura IS
   a pure function of the address, so the digests do move together — but folding addresses computes no aura, and the
   leaf keeps the name. An aura is only an aura if it is DERIVED from the algebra: ray from ℤ/7, wave from the ℤ/9
   vortex orbit, hue by the A432 step (${cite('z7rays_seven')}). A value named for a computation must be computed by
   it, which is the law ${cite('hexbit_is_four_qubits')} enforces for the unit and nothing enforced for the film.
   *Practice:* run \`UUIDNA_METER=1 npm run x -- guard\`, find a leaf whose subject is already sealed upstream, then
   ask the harder question — does its name still describe what it computes?`,
  `8. **Discuss the open at school** — every lead enrolls on this page (${leadsFig.held} held · ${leadsFig.refuted} refuted · ${leadsFig.refused} refused this generation, [the leads roster](/school#leads)). Held doors also sit in [open questions](/open-questions); a refutation is a measurement, a refusal a boundary. Local labs (\`labOf\`) recompute only the sealed half. Silence never refutes (${cite('silence_never_refutes')}).
   *Practice:* open a held door, name a finite structure, deposit the two coins
   (${cite('two_coins')}). A student's answer is a deposit, not a comment.`,
  `9. **Quantum advantage is a worked MCP call** — the usable-column gap and the classical 2ⁿ cost are
   ${cite('usable_gap_is_two_to_eighty')} and ${cite('n_qubit_dimension')}, served as tools/call on
   https://uuidna.com/mcp — \`uuidna_decide\` for 2ⁿ, \`uuidna_quantum\` for the state vector (not one tool per theorem).
   *Practice:* run the examples on this page, or \`uuidna_quantum { "circuit": "bell" }\`.`,
]

// ── THE WINGS, COMPUTED ────────────────────────────────────────────────────────────────────────────────────────
// THE FINDING THAT MADE IT (2026-08-21): the school reached a fifth of the sealed wings, and the largest wings in
// the ledger were among the invisible — reachable by proof, absent from the curriculum. A curriculum that names
// only what someone remembered to write about drifts from the ledger it teaches. So the index is DERIVED: every
// wing the ledger carries, its skill, its size (theoremCountByFile), and one sealed key to open it. Authoring a
// lesson per wing would be the wrong fix; making every wing reachable is the right one, and it cannot go stale.
const byWing = new Map<string, { key: string; skill: string; n: number }>()
for (const t of theorems() as { file: string; key: string; skill: string }[]) {
  const e = byWing.get(t.file)
  if (e) { e.n++; if (t.key < e.key) e.key = t.key }
  else byWing.set(t.file, { key: t.key, skill: t.skill, n: 1 })
}
const titleOf = new Map((PRINCIPLES as [string, string, string][]).map(([f, title]) => [f, title]))
const wingRows = [...byWing.entries()]
  .sort((a, b) => b[1].n - a[1].n || a[0].localeCompare(b[0]))
  .map(([file, e]) => `| ${titleOf.get(file) ?? file} | \`${file}\` | ${e.skill} | ${e.n} | ${cite(e.key)} |`)

// ── THE CLAY LESSONS, FROM THE LEDGER'S OWN WORDS ─────────────────────────────────────────────────────────────
// The seven Millennium Problems (claymath.org/millennium-problems) each have ONE sealed, decidable fact in Clay.lean
// that touches their structure — a counting argument, a bound, an Euler characteristic. The lesson body is the
// THEOREM'S OWN TEXT, quoted from the ledger and never paraphrased here, because each theorem already states what it
// decides AND what it does not touch ("the mass gap is a statement about the quantum field theory and is not touched
// by counting its algebra's structure constants"). Paraphrase would insert judgement where the seal already speaks,
// and the trial adjudicates any claim made about it.
const CLAY: [string, string][] = [
  ['P vs NP', 'two_bit_conjunctions_are_four_of_sixteen'],
  ['The Riemann Hypothesis', 'mertens_squared_under_n_on_the_first_twenty'],
  ['Birch and Swinnerton-Dyer', 'hasse_bound_holds_at_four_primes'],
  ['The Poincaré Conjecture', 'four_simplex_boundary_euler_is_zero'],
  ['Yang–Mills and the Mass Gap', 'levi_civita_nonzero_on_six_of_twentyseven'],
  ['Navier–Stokes', 'closed_grid_differences_sum_to_zero'],
  ['The Hodge Conjecture', 'torus_betti_alternates_to_zero'],
]
const byKey = new Map((theorems() as { key: string; name: string }[]).map((t) => [t.key, t.name]))
for (const [, k] of CLAY) if (!byKey.has(k)) { console.error(`✗ gen-school — Clay lesson cites ${k}, which the ledger does not seal`); process.exit(1) }
// NO STANDING QUOTED. A standing theorem was drafted here and the check refused it: the key is not in this
// ledger (it went with the Clay wing purge, a1f4c519) though the hosted edge still serves it at an older size. A
// lesson may cite only what THIS ledger seals, so the seven theorems speak for themselves — each already states
// what it decides and what it leaves untouched, which is the whole of what is provable here.

// ── THE PREREQUISITES, DERIVED FROM CITATION ──────────────────────────────────────────────────────────────────
// A stall at practice names its own prerequisite, and the ledger already carries the relation: when one sealed
// name cites another sealed key (fold_weak_hash carries "cites seats_pigeonhole" in its own text), the cited key
// is the walk to take first. A hand-picked table of stalls went stale the day it was authored — four rows chosen
// from one practice batch, frozen in prose. So the relation is SCANNED from the names, never picked: every
// snake_case token in a sealed name that is itself a sealed key is a citation, and the in-degree ranks the
// foundations. A theorem sealed tomorrow that cites dz_table appears here tomorrow; no row can linger or hide.
// THE SCAN NOW LIVES IN src/citations, because a second surface needed the same relation and the choice was
// to copy this regex or to share it. A copied rule is two rules the moment either is edited — and the rule
// itself is unchanged: every snake_case token in a sealed name that is itself a sealed key is a citation.
// ONE ROW OF THIS TABLE MOVED with the extraction, and it moved to the RIGHT value: `citers.slice(0, 3).sort()`
// displays three citers alphabetically but SELECTS them by whichever three were encountered first, so the
// sample depended on ledger iteration order. The shared scan sorts its edges, so the three are now the
// alphabetically first three — determined by the data instead of by the walk. window_not_universal's third
// citer changed from tet_semitone_no_rational_at_the_window to team_pairs_triples_cover accordingly.
const prereqIndex = citersOf()
const prereqRows = [...prereqIndex.entries()]
  .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
  .map(([k, citers]) => `| ${cite(k)} | ${citers.length} | ${citers.slice(0, 3).sort().map(cite).join(', ')} |`)

const PREREQ_START = '<!-- prereqs: GENERATED by scripts/gen-school — the citation graph, scanned from the names, never picked -->'
const PREREQ_END = '<!-- /prereqs -->'
const prereqBlock = [
  PREREQ_START,
  '## The prerequisite lesson — a failed theorem names its own prerequisite',
  '',
  'When practice stalls on a theorem, the gap is almost never the theorem itself — it is a sealed walk the student',
  'skipped. The fix is never to invent a bridging theorem (a restatement is not a unity,',
  cite('unity_census_is_plural_and_needs_two') + '); it is to **reorder the walk** so the sealed prerequisite comes',
  'first. And the prerequisite relation is not curated: it is scanned from the ledger itself — every sealed name',
  `that cites another sealed key IS a citation edge, ${prereqIndex.size} prerequisites over ${[...prereqIndex.values()].reduce((n, c) => n + c.length, 0)} edges at this`,
  'generation, ranked by how many theorems rest on each. Walk the most-cited first; each row lists up to its first',
  'three citers alphabetically, and the count carries the rest.',
  '',
  '| Walk this first | Cited by | Among its citers |',
  '| --- | ---: | --- |',
  ...prereqRows,
  PREREQ_END,
].join('\n')

const CLAY_START = '<!-- clay: GENERATED by scripts/gen-school — each lesson is its theorem\'s own sealed text -->'
const CLAY_END = '<!-- /clay -->'
const clayBlock = [
  CLAY_START,
  '## The Clay lessons — one decidable fact per Millennium Problem',
  '',
  'The seven [Millennium Problems](https://www.claymath.org/millennium-problems/) are open. What this ledger seals is',
  'one **decidable** fact per problem — a count, a bound, an invariant — walked exhaustively and proven `by decide`,',
  'axiom-free. Every lesson below is the theorem\'s own text, quoted from the ledger rather than retold, and each one',
  'names what it decides and what it leaves untouched. Nothing here decides a Millennium Problem, and no theorem in',
  'this ledger claims to — what is sealed is the arithmetic each problem is counted by.',
  '',
  '**Prior art (initial clay σ-involution):** [DOI 10.5281/zenodo.21781603](https://doi.org/10.5281/zenodo.21781603)',
  '([Zenodo record](https://zenodo.org/records/21781603) — *All Seven Clay Millennium Problems Sealed via Universal σ-Involution*).',
  'Credit law: that DOI is first; the captain comes next. Live clay surface: [uuidna.com/articles/clay](https://uuidna.com/articles/clay).',
  '',
  ...CLAY.flatMap(([title, key]) => [
    `### ${title}`,
    '',
    byKey.get(key)!,
    '',
    `Sealed as ${cite(key)}, \`by decide\`, axiom-free.`,
    '',
  ]),
  CLAY_END,
].join('\n')

const WINGS_START = '<!-- wings: GENERATED by scripts/gen-school — every sealed wing, so none is invisible -->'
const WINGS_END = '<!-- /wings -->'
const wingsBlock = [
  WINGS_START,
  `## The wings — all ${byWing.size}, computed from the ledger`,
  '',
  `Every wing the ledger seals, largest first: ${theorems().length} theorems across ${byWing.size} wings and ${new Set([...byWing.values()].map((e) => e.skill)).size} skills.`,
  'This table is derived at generation — a wing sealed today appears here today, and one that is renamed cannot linger.',
  'Open any of them by its key; the skill column is the axis `uuidna_skill` serves.',
  '',
  '| Wing | File | Skill | Theorems | Open |',
  '| --- | --- | --- | ---: | --- |',
  ...wingRows,
  WINGS_END,
].join('\n')

// ── THE PORT WING (the captain, 2026-09-01: "reorganise school from scratch to cover all") ───────────────────
//
// The school taught the LEDGER — its wings, the Clay lessons, the leads — and taught nothing about the PORT,
// which by now is the larger half of what the tree holds: every Alpine domain censused, and several of them
// carrying an API of uuidna's own. A curriculum that covers the proofs and omits the thing the proofs are about
// is not a small gap; it is the school teaching half the tree while claiming to be the tree.
//
// It is computed, like every other block here. The domain table comes from allDomainCensuses and the API table
// from portsCensus, so a domain added tomorrow enrolls tomorrow and one that is renamed cannot linger — the same
// property the wings table has and for the same reason. NOTHING in this section is a number anyone typed.
//
// AND THE SMALL DOMAINS STAY. bio and chemistry come back in single digits, which looks like a failed pattern until you
// check the alternative: the loose version of those patterns matched `ovmf` and `dmidecode` (both contain BIOS)
// and `btrbk` and `newsboat` (both say "atomic"). A bigger number was available and it would have been made of
// homonyms. The honest count of a small shelf is the small number, and a school that hid it would be teaching
// the ambition rather than the catalogue.
const PORT_START = '<!-- port: GENERATED by scripts/gen-school — every domain and every ported API -->'
const PORT_END = '<!-- /port -->'
const ports = portsCensus()
const censuses = [...allDomainCensuses()].sort((a, b) => b.packages - a.packages)
const portBlock = [
  PORT_START,
  `## The port — ${censuses.length} domains, ${ports.totals.domains} of them carrying an API`,
  '',
  `Alpine publishes; uuidna counts and, where it has something of its own to offer, answers. ${censuses.length} domains`,
  `are censused from the committed mirror and ${ports.totals.domains} carry one API each — ${ports.totals.packages} packages behind those seven doors.`,
  'Membership is a PATTERN over Alpine\'s own name and description: a measurement with known failures, not a verdict.',
  'The arithmetic over the counts is sealed `by decide`; the classification underneath it never is, and no sum promotes',
  'a match into a fact.',
  '',
  '| Domain | Packages | Origins | One API of uuidna\'s own |',
  '| --- | ---: | ---: | --- |',
  ...censuses.map((c) => {
    const port = ports.ports.find((p) => p.domain === c.domain)
    return `| \`${c.domain}\` | ${c.packages} | ${c.origins} | ${port ? port.offers : '— census only' } |`
  }),
  '',
  `Ported API receipt \`${ports.receipt}\`. Package counts are per domain and the domains OVERLAP — a chat bridge is`,
  'also network, a font is also media — so the column does not sum to the catalogue and is not meant to.',
  PORT_END,
].join('\n')

// ── AND THE SCHOOL IS GRADED IN THE STUDENT'S OWN CURRENCY (the captain: "how efficient the school is is seen
// by the token usage of each agent"). Every row is a question an agent opens a session with, priced two ways:
// what it costs to READ the answer out of the tree, and what the sealed door returns. The ratio is not a boast
// about the door — it is the size of the mistake available to anyone who does not know the door exists, which is
// the only thing a school is for.
const EFF_START = '<!-- efficiency: GENERATED by scripts/gen-school — the school graded in agent tokens -->'
const EFF_END = '<!-- /efficiency -->'
const eff = schoolEfficiency()
const effBlock = [
  EFF_START,
  '## The efficiency lesson — the school is graded in your tokens',
  '',
  'Model tokens are legitimate at the FRONTIER: sealing something new. Everything already sealed must answer at',
  'O(1) through the ledger, a script or a receipt — so the measure of this school is how few tokens an agent',
  'spends to learn what the tree already knows. Each row prices one opening question both ways.',
  '',
  '| Question | Read (tokens) | Sealed call | Ratio | The door |',
  '| --- | ---: | ---: | ---: | --- |',
  ...eff.rows.map((r) => `| ${r.question} | ${r.readTokens.toLocaleString('en-US')} | ${r.callTokens} | ${r.ratio.toLocaleString('en-US')}× | \`${r.door}\` |`),
  '',
  `Median ratio **${eff.median.toLocaleString('en-US')}×**. Tokens are estimated at four bytes each — an approximation, and`,
  'applied identically to both sides, so the RATIO survives it even where the absolute figure would not.',
  'A high number is not a good score. It is the cost of not knowing the door, and every one of those tokens is spent',
  're-deriving something the tree already sealed.',
  '',
  '### Space — the message carries the address, not the payload',
  '',
  'A uuid is 16 bytes and it is 16 bytes whatever it names, so what a message costs stops depending on the size of',
  'what it is about. That is what makes capacity portable between machines: the address travels, and the payload is',
  'fetched only if someone actually wants it.',
  '',
  '| The message is about | Payload (bytes) | Address (bytes) | Not sent |',
  '| --- | ---: | ---: | ---: |',
  ...payloadlessSpace().rows.map((r) => `| ${r.carries} | ${r.payloadBytes.toLocaleString('en-US')} | ${r.addressBytes} | ${r.ratio.toLocaleString('en-US')}× |`),
  '',
  'This is NOT compression. Nothing is made smaller — the bytes are simply not sent, and stay fetchable at request',
  'time, still resolving to exactly what the address named. Time is the third axis and is measured at the',
  '`os/timing` boundary, where a wall clock is honest; putting it in this table would break the law the rest of',
  'this page keeps.',
  EFF_END,
].join('\n')

const START = '<!-- practices: GENERATED by scripts/gen-school — every figure recomputed from the ledger -->'
const END = '<!-- /practices -->'
const path = join(ROOT, 'docs', 'school.md')
const md = readFileSync(path, 'utf8')
const block = START + '\n' + PRACTICES.join('\n') + '\n' + END

// the wings table is appended once and regenerated in place thereafter
const wi = md.indexOf(WINGS_START), wj = md.indexOf(WINGS_END)
const withWingsPre = wi >= 0 && wj > wi
  ? md.slice(0, wi) + wingsBlock + md.slice(wj + WINGS_END.length)
  : md.trimEnd() + '\n\n' + wingsBlock + '\n'
const ci = withWingsPre.indexOf(CLAY_START), cj = withWingsPre.indexOf(CLAY_END)
const withClay = ci >= 0 && cj > ci
  ? withWingsPre.slice(0, ci) + clayBlock + withWingsPre.slice(cj + CLAY_END.length)
  : withWingsPre.trimEnd() + '\n\n' + clayBlock + '\n'
const pi = withClay.indexOf(PREREQ_START), pj = withClay.indexOf(PREREQ_END)
if (pi < 0 || pj <= pi) { console.error('✗ gen-school — the prereq markers are gone from school.md; restore the marker pair, do not guess'); process.exit(1) }
const withWings = withClay.slice(0, pi) + prereqBlock + withClay.slice(pj + PREREQ_END.length)

const i = withWings.indexOf(START), j = withWings.indexOf(END)
let out: string
if (i >= 0 && j > i) out = withWings.slice(0, i) + block + withWings.slice(j + END.length)
else {
  // first run: replace the authored list in place, anchored on its first and last lines
  const first = withWings.indexOf('1. **Fold the finder**')
  const last = withWings.indexOf('## The scattering lesson')
  if (first < 0 || last < 0 || last < first) { console.error('✗ gen-school — the practice block anchors are gone; fix the anchors, do not guess'); process.exit(1) }
  out = withWings.slice(0, first) + block + '\n\n' + withWings.slice(last)
}
const ADV_START = '<!-- advantage-mcp: GENERATED by scripts/gen-school — curl and expect from constructors -->'
const ADV_END = '<!-- /advantage-mcp -->'
const advBlock = ADV_START + '\n' + renderAdvantageMcpMarkdown() + '\n' + ADV_END
const ai = out.indexOf(ADV_START), aj = out.indexOf(ADV_END)
if (ai < 0 || aj <= ai) { console.error('✗ gen-school — the advantage-mcp markers are gone from school.md; restore the marker pair, do not guess'); process.exit(1) }
out = out.slice(0, ai) + advBlock + out.slice(aj + ADV_END.length)

const ei = out.indexOf(EFF_START), ej = out.indexOf(EFF_END)
out = ei >= 0 && ej > ei
  ? out.slice(0, ei) + effBlock + out.slice(ej + EFF_END.length)
  : out.trimEnd() + '\n\n' + effBlock + '\n'

const oi = out.indexOf(PORT_START), oj = out.indexOf(PORT_END)
out = oi >= 0 && oj > oi
  ? out.slice(0, oi) + portBlock + out.slice(oj + PORT_END.length)
  : out.trimEnd() + '\n\n' + portBlock + '\n'

const LEADS_START = '<!-- leads: GENERATED by scripts/gen-school — every lead from the record, so none is invisible -->'
const LEADS_END = '<!-- /leads -->'
const leadsBlock = renderSchoolLeads(leadsRoster)
const li = out.indexOf(LEADS_START), lj = out.indexOf(LEADS_END)
out = li >= 0 && lj > li
  ? out.slice(0, li) + leadsBlock + out.slice(lj + LEADS_END.length)
  : out.trimEnd() + '\n\n' + leadsBlock + '\n'

writeFileSync(path, out)
console.log(`✓ gen-school — ${PRACTICES.length} practices + ${byWing.size} wings + ${censuses.length} port domains (${ports.totals.domains} with an API) + ${CLAY.length} Clay lessons + efficiency median ${eff.median}x + ${leadsFig.of} leads (${leadsFig.held} held · ${leadsFig.refuted} refuted · ${leadsFig.refused} refused); figures: ${fig.monographs} monographs + ${fig.auras} auras = ${fig.redundant} (${fig.hexbits} hexbits, ${fig.bits} bits)`)

// @non-harmonic: fans out to every wired public API, harvests decidable arithmetic, and queues FREE-MINT theorem
// candidates — decide() at zero marginal cost (theorem minting_is_free_and_forging_is_not), the kernel seals, two
// coins follow. HONEST: corroboration supplies ore; only `by decide` mints; deposit is queueing, never approval.
import { researchSweep } from './quantum/os/research/index.js'
import { unansweredMath } from './research-sources.js'
import { escoSearch, eurostatEducation, dataEuropaSearch, giscoSchools, cordisSearch, tedNotices } from './quantum/os/school/index.js'
import { fetchOpenMeteoForecast, fetchNoaaTideHeight } from './quantum/os/weather/index.js'
import { fetchWikinewsFeatured } from './quantum/os/news/index.js'
import { extractFactsFromArticle, type NewsArticle } from './desk/news/portal/index.js'
import { merkleGravity } from './gravity/index.js'
import { toUuid } from './address.js'
import { hexbitDoorOf } from './hexbit/index.js'
import { mintLeadsFromText, mintLeadsToCandidates, type MintLead } from './harvest.js'
import { depositCandidates, type DepositResult, type WaveCandidate } from './wave-deposit.js'

export interface ApiEvidence { source: string; address: string; text: string; handle: string; door: string }

const apiRow = (source: string, address: string, text: string): ApiEvidence =>
  ({ source, address, text, ...hexbitDoorOf(address) })

const HONEST =
  'Every wired public API is asked; decidable fragments are judged by decide() at zero cost; TRUE-and-unsealed ' +
  'fragments become FREE-MINT candidates queued for the kernel — evidence never auto-seals, only `by decide` mints ' +
  'the two coins (theorem minting_is_free_and_forging_is_not). Integrity, not truth.'

/** collectMintExtras(query) → EU education, weather, and news — the mint extras beyond the research sweep.
 *  Never auto-seals; evidence only. collectApiEvidence concatenates the sweep with this list. */
export async function collectMintExtras(query: string): Promise<ApiEvidence[]> {
  const out: ApiEvidence[] = []
  const esco = await escoSearch(query, 'skill', 8)
  if (!esco.declined)
    out.push(apiRow('esco', esco.receipt, esco.results.map((r) => JSON.stringify(r)).join('\n')))

  const edu = await eurostatEducation('educ_uoe_enrt01', { geo: 'BG', time: '2022' }, 8)
  if (!edu.declined)
    out.push(apiRow('eurostat', edu.receipt, edu.results.map((r) => JSON.stringify(r)).join('\n')))

  const cat = await dataEuropaSearch(query, 8)
  if (!cat.declined)
    out.push(apiRow('data-europa', cat.receipt, cat.results.map((r) => JSON.stringify(r)).join('\n')))

  const cordis = await cordisSearch(query, 8)
  if (!cordis.declined)
    out.push(apiRow('cordis', cordis.receipt, cordis.results.map((r) => JSON.stringify(r)).join('\n')))

  const gisco = await giscoSchools('BG', query, 8)
  if (!gisco.declined)
    out.push(apiRow('gisco', gisco.receipt, gisco.results.map((r) => JSON.stringify(r)).join('\n')))

  const ted = await tedNotices(undefined, 8)
  if (!ted.declined)
    out.push(apiRow('ted', ted.receipt, ted.results.map((r) => JSON.stringify(r)).join('\n')))

  try {
    const meteo = await fetchOpenMeteoForecast(42.6977, 23.3219)
    out.push(apiRow('open-meteo-forecast', toUuid(meteo.map((f) => `${f.measurement}:${f.value}`).join('|')),
      meteo.map((f) => `${f.measurement} ${f.value} ${f.unit}`).join('\n')))
  } catch { /* named silence — weather optional */ }

  try {
    const tide = await fetchNoaaTideHeight('9414290')
    out.push(apiRow('noaa-tides', toUuid(tide.map((f) => `${f.measurement}:${f.value}`).join('|')),
      tide.map((f) => `${f.measurement} ${f.value} ${f.unit}`).join('\n')))
  } catch { /* optional */ }

  try {
    const articles = await fetchWikinewsFeatured(8)
    for (const a of articles) {
      const facts = extractFactsFromArticle(a as NewsArticle)
      out.push(apiRow('en.wikinews.org', toUuid(a.title + a.date), [a.title, a.body, ...facts.map((f) => f.text)].join('\n')))
    }
  } catch { /* optional */ }

  for (const row of await unansweredMath())
    out.push(apiRow(row.source, row.address, row.note))

  return out
}

/** collectApiEvidence(query) → bytes from research, EU education, weather, and news portals as searchable text. */
export async function collectApiEvidence(query: string): Promise<ApiEvidence[]> {
  const out: ApiEvidence[] = []
  const sweep = await researchSweep(query)
  for (const r of sweep)
    for (const e of r.evidence)
      out.push(apiRow(e.source, e.address, e.note))
  out.push(...await collectMintExtras(query))
  return out
}

export interface ApiMintHarvest {
  query: string
  evidence: number
  sources: string[]
  mintable: MintLead[]
  candidates: WaveCandidate[]
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** apiMintHarvest(query) → FREE-MINT leads from every API the repo wires. Network-bound. */
export async function apiMintHarvest(query: string): Promise<ApiMintHarvest> {
  const evidence = await collectApiEvidence(query)
  const seen = new Set<string>()
  const mintable: MintLead[] = []
  for (const e of evidence)
    for (const lead of mintLeadsFromText(e.source, e.address, e.text))
      if (!seen.has(lead.key)) { seen.add(lead.key); mintable.push(lead) }

  const candidates = mintLeadsToCandidates(mintable)
  const receipt = merkleGravity([query, ...mintable.map((m) => m.receipt)])
  return {
    query,
    evidence: evidence.length,
    sources: [...new Set(evidence.map((e) => e.source))].sort(),
    mintable,
    candidates,
    receipt,
    ...hexbitDoorOf(receipt),
    honest: HONEST,
  }
}

/** apiMintDeposit(query, queuePath) → harvest and queue every lawful candidate for the resident wave. Host-side. */
export async function apiMintDeposit(query: string, queuePath: string): Promise<ApiMintHarvest & { deposit: DepositResult }> {
  const h = await apiMintHarvest(query)
  const deposit = depositCandidates(h.candidates, queuePath)
  return { ...h, deposit }
}

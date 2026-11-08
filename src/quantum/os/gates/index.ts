// gates — THE RESEARCH GATES AND THE EXPERIMENT ENVIRONMENT, DECLARED ONCE AND CONTENT-ADDRESSED. Pure, edge-clean.
//
// The captain, 2026-11-08: "create the environment for any experiment including gates to online research apis like
// google and other search engines with ai capabilities to find iso certified results". Two things are declared here
// and nothing is fetched: (1) every online research gate the tree may ask — what it is, where it answers, what it
// returns, and whether it answers keyless or only behind a key the OWNER sets (an agent never types a credential:
// .claude/lessons.md § Owner decisions); (2) the research install profile — the Alpine packages an experiment host
// needs, ported from the committed catalogue as uuidna identities exactly as every other package is (portApp), never
// executed. "ISO certified" is graded, not asserted: a gate is a STANDARDS gate when the body that publishes it grades
// `standard` under the same classifier that grades a credit (gradeOf: SI, CODATA, NIST, IUPAC, WGS 84, ISO n, RFC n),
// and `identifier` when it serves DOIs. A search engine grades `named`, whatever its AI does — it finds; it certifies
// nothing. The live probe of these gates is a script (scripts/research-gates), because asking the network is the named
// non-harmonic boundary and this module stays recomputable.
import { toUuid } from '../../../address.js'
import { hexbitDoorOf, type HexbitDoor } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { gradeOf, type Grade } from '../../../external-fact.js'
import { cataloguePackage, catalogueState } from '../catalogue/index.js'
import { INSTALLS_MIRROR } from '../mirror/index.js'
import { portApp, type AppPort } from '../../../os/apps/index.js'

export type GateKind =
  | 'search-ai'   // a web search engine answering with a model's synthesis or ranking
  | 'search'      // a web search engine answering with results only
  | 'scholarly'   // a literature index: works, authors, DOIs
  | 'standards'   // a standards body's own machine-readable publication
  | 'data'        // a research data portal with records and DOIs

export type GateShape = 'json' | 'text' | 'xml' | 'zip' | 'html'

export interface ResearchGate {
  id: string
  host: string
  /** the base every request to this gate is built from */
  base: string
  kind: GateKind
  shape: GateShape
  /** `owner-key`: the environment variable the OWNER sets; an agent reads its presence, never its value */
  access: 'keyless' | 'mailto-polite' | 'budgeted' | 'owner-key' | 'served-not-fetched'
  key?: readonly string[]
  /** the publishing body, as a credit would name it — graded by gradeOf, so ISO/NIST/RFC grade `standard` */
  body: string
  /** the gate serves DOIs for its records */
  doi: boolean
  /** a query the probe may send without a key; absent for keyed and served-only gates */
  probe?: string
  honest: string
}

/** gradeOfGate(g) → how checkable what the gate returns is, by the credit classifier: `identifier` for a DOI
 *  server, `standard` for a standards body, `named` for everything else — a search engine included. */
export const gradeOfGate = (g: ResearchGate): Grade => (g.doi ? 'identifier' : gradeOf(g.body))

/** a gate is STANDARDS-GRADED when its publisher grades `standard` or it serves identifiers — "ISO certified" in the
 *  only sense this tree can decide: the result is checkable at a body that certifies, not asserted by a finder */
export const standardsGraded = (g: ResearchGate): boolean => gradeOfGate(g) !== 'named'

export const RESEARCH_GATES: readonly ResearchGate[] = [
  // ── search engines with AI capabilities — every one behind a key the owner sets ──────────────────────────────
  { id: 'google-programmable-search', host: 'www.googleapis.com', base: 'https://www.googleapis.com/customsearch/v1',
    kind: 'search', shape: 'json', access: 'owner-key', key: ['GOOGLE_CSE_KEY', 'GOOGLE_CSE_CX'], body: 'Google', doi: false,
    honest: 'Google Programmable Search JSON API: web results for a query over a search engine the owner configures (cx). Ranking, not certification.' },
  { id: 'google-gemini-grounded', host: 'generativelanguage.googleapis.com', base: 'https://generativelanguage.googleapis.com/v1beta/models',
    kind: 'search-ai', shape: 'json', access: 'owner-key', key: ['GEMINI_API_KEY'], body: 'Google', doi: false,
    honest: 'Gemini with Google Search grounding: a model answer with grounding metadata (URIs). A synthesis, graded named — every cited URI is re-asked at its own gate.' },
  { id: 'brave-search', host: 'api.search.brave.com', base: 'https://api.search.brave.com/res/v1/web/search',
    kind: 'search-ai', shape: 'json', access: 'owner-key', key: ['BRAVE_SEARCH_API_KEY'], body: 'Brave', doi: false,
    honest: 'Brave Search API: web results with optional AI summariser. Results, not certification.' },
  { id: 'perplexity-sonar', host: 'api.perplexity.ai', base: 'https://api.perplexity.ai/chat/completions',
    kind: 'search-ai', shape: 'json', access: 'owner-key', key: ['PERPLEXITY_API_KEY'], body: 'Perplexity', doi: false,
    honest: 'Perplexity Sonar: a model answer with citations. The citations are re-asked; the answer is prose.' },
  { id: 'tavily-search', host: 'api.tavily.com', base: 'https://api.tavily.com/search',
    kind: 'search-ai', shape: 'json', access: 'owner-key', key: ['TAVILY_API_KEY'], body: 'Tavily', doi: false,
    honest: 'Tavily: search built for agents, results plus an optional answer. Results, not certification.' },
  { id: 'exa-search', host: 'api.exa.ai', base: 'https://api.exa.ai/search',
    kind: 'search-ai', shape: 'json', access: 'owner-key', key: ['EXA_API_KEY'], body: 'Exa', doi: false,
    honest: 'Exa: neural web search with page contents. Results, not certification.' },
  // ── keyless web search ─────────────────────────────────────────────────────────────────────────────────────
  { id: 'duckduckgo-instant', host: 'api.duckduckgo.com', base: 'https://api.duckduckgo.com/',
    kind: 'search', shape: 'json', access: 'keyless', body: 'DuckDuckGo', doi: false, probe: 'ISO 8601',
    honest: 'DuckDuckGo Instant Answer API: abstracts and related topics for a query, no web results. Keyless.' },
  { id: 'wikipedia-search', host: 'en.wikipedia.org', base: 'https://en.wikipedia.org/w/api.php',
    kind: 'search', shape: 'json', access: 'keyless', body: 'Wikipedia', doi: false, probe: 'ISO 8601',
    honest: 'MediaWiki search over English Wikipedia: titles and snippets. An encyclopedia, graded named.' },
  // ── scholarly indexes, keyless or polite ──────────────────────────────────────────────────────────────────
  { id: 'crossref-works', host: 'api.crossref.org', base: 'https://api.crossref.org/works',
    kind: 'scholarly', shape: 'json', access: 'mailto-polite', body: 'Crossref', doi: true, probe: 'quantum teleportation',
    honest: 'Crossref works: DOI metadata for the literature. Every hit is an identifier a stranger can fetch.' },
  { id: 'openalex-works', host: 'api.openalex.org', base: 'https://api.openalex.org/works',
    kind: 'scholarly', shape: 'json', access: 'budgeted', body: 'OpenAlex', doi: true, probe: 'post-quantum cryptography',
    honest: 'OpenAlex works: open scholarly graph with DOIs. Metered in a daily allowance, not rate-limited (measured 2026-09-04).' },
  { id: 'semantic-scholar-search', host: 'api.semanticscholar.org', base: 'https://api.semanticscholar.org/graph/v1/paper/search',
    kind: 'scholarly', shape: 'json', access: 'keyless', body: 'Semantic Scholar', doi: true, probe: 'no-signaling theorem',
    honest: 'Semantic Scholar paper search: titles, years, external ids including DOIs. Keyless at a low rate.' },
  { id: 'arxiv-query', host: 'export.arxiv.org', base: 'https://export.arxiv.org/api/query',
    kind: 'scholarly', shape: 'xml', access: 'keyless', body: 'arXiv', doi: true, probe: 'quantum channel capacity',
    honest: 'arXiv API: Atom feed of preprints; DOIs where the version of record has one. Preprints are not refereed.' },
  { id: 'zenodo-records', host: 'zenodo.org', base: 'https://zenodo.org/api/records',
    kind: 'data', shape: 'json', access: 'keyless', body: 'Zenodo', doi: true, probe: 'uuidna',
    honest: 'Zenodo records: deposited research outputs with DOIs — where this ledger itself is minted.' },
  // ── standards bodies' microdata — the only gates that grade `standard` ─────────────────────────────────────
  { id: 'nist-codata-constants', host: 'physics.nist.gov', base: 'https://physics.nist.gov/cuu/Constants/Table/allascii.txt',
    kind: 'standards', shape: 'text', access: 'keyless', body: 'NIST CODATA', doi: false, probe: '',
    honest: 'NIST CODATA 2022 fundamental constants, fixed-width text: Quantity, Value, Uncertainty, Unit. codata-cross matches ledger integers to it.' },
  { id: 'nist-csrc-glossary', host: 'csrc.nist.gov', base: 'https://csrc.nist.gov/csrc/media/glossary/glossary-export.zip',
    kind: 'standards', shape: 'zip', access: 'keyless', body: 'NIST CSRC', doi: false,
    honest: 'NIST CSRC glossary export, JSON in a zip, updated daily: the terms NIST publications define (CRQC, quantum-vulnerable algorithm, PQC).' },
  { id: 'nist-acvp-vectors', host: 'raw.githubusercontent.com', base: 'https://raw.githubusercontent.com/usnistgov/ACVP-Server/master/gen-val/json-files',
    kind: 'standards', shape: 'json', access: 'keyless', body: 'NIST ACVP', doi: false, probe: 'ML-KEM-keyGen-FIPS203/prompt.json',
    honest: 'NIST ACVP test vectors: ML-KEM-512/768/1024 and ML-DSA key generation, encapsulation and signing cases — the vectors a FIPS 203/204 implementation is validated against.' },
  { id: 'nist-nvd-cves', host: 'services.nvd.nist.gov', base: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    kind: 'standards', shape: 'json', access: 'keyless', body: 'NIST NVD', doi: false, probe: 'CVE-2014-0160',
    honest: 'NIST National Vulnerability Database: CVE metadata with CVSS v3.1 and v2 metrics. The cve door content-addresses one advisory.' },
  { id: 'nist-randomness-beacon', host: 'beacon.nist.gov', base: 'https://beacon.nist.gov/beacon/2.0/pulse/last',
    kind: 'standards', shape: 'json', access: 'keyless', body: 'NIST Beacon', doi: false, probe: '',
    honest: 'NIST randomness beacon 2.0: a signed 512-bit pulse every 60 s. A public timestamped value, never a secret.' },
  { id: 'iso-obp', host: 'www.iso.org', base: 'https://www.iso.org/obp/ui',
    kind: 'standards', shape: 'html', access: 'served-not-fetched', body: 'ISO 1', doi: false,
    honest: 'ISO Online Browsing Platform: the standards\' own terms and definitions, served as HTML behind a browser session — no public API, so it is cited, never fetched.' },
  { id: 'cern-open-data', host: 'opendata.cern.ch', base: 'https://opendata.cern.ch/api/records/',
    kind: 'data', shape: 'json', access: 'keyless', body: 'CERN Open Data', doi: true, probe: 'CMS',
    honest: 'CERN Open Data API: records with recid, title, DOI, files and distribution counts. The four CMS records the ledger seals re-verify here (9039615 events, 502 files).' },
]

export interface GateRow extends ResearchGate, HexbitDoor { grade: Grade; standards: boolean; address: string }

export interface GatesRegistry extends HexbitDoor {
  definition: 'uuidnaOS·gates·research'
  count: number
  byKind: Record<GateKind, number>
  byAccess: Record<ResearchGate['access'], number>
  /** gates whose result is checkable at a certifying body or by DOI */
  standardsGraded: number
  /** the environment variables the owner must set before a keyed gate answers; none is read here */
  ownerKeys: string[]
  gates: GateRow[]
  receipt: string
  honest: string
}

const GATES_HONEST =
  'The research gates, declared and content-addressed: what each online source is, where it answers, in what shape, ' +
  'and whether keyless or behind a key only the owner sets. Nothing is fetched here. A gate is standards-graded when ' +
  'its publisher grades `standard` under the credit classifier or it serves DOIs — search engines, with or without ' +
  'AI, grade named: they find, they certify nothing. Integrity, not truth.'

const tally = <K extends string>(keys: readonly K[], of: (g: ResearchGate) => K): Record<K, number> => {
  const out = Object.fromEntries(keys.map((k) => [k, 0])) as Record<K, number>
  for (const g of RESEARCH_GATES) out[of(g)] += 1
  return out
}

let GATES: GatesRegistry | null = null
/** researchGates() → the declared gates, graded and folded to one receipt; O(1) after the first read. */
export function researchGates(): GatesRegistry {
  if (GATES) return GATES
  const gates: GateRow[] = RESEARCH_GATES.map((g) => {
    const address = toUuid(`gate|${g.id}|${g.host}|${g.base}|${g.kind}|${g.shape}|${g.access}|${(g.key ?? []).join(',')}`)
    return { ...g, grade: gradeOfGate(g), standards: standardsGraded(g), address, ...hexbitDoorOf(address) }
  })
  const receipt = merkleGravity(gates.map((g) => g.address))
  GATES = {
    definition: 'uuidnaOS·gates·research',
    count: gates.length,
    byKind: tally(['search-ai', 'search', 'scholarly', 'standards', 'data'] as const, (g) => g.kind),
    byAccess: tally(['keyless', 'mailto-polite', 'budgeted', 'owner-key', 'served-not-fetched'] as const, (g) => g.access),
    standardsGraded: gates.filter((g) => g.standards).length,
    ownerKeys: [...new Set(gates.flatMap((g) => g.key ?? []))].sort(),
    gates,
    receipt,
    ...hexbitDoorOf(receipt),
    honest: GATES_HONEST,
  }
  return GATES
}

/** gatesHolds() → every id and host distinct, every keyed gate names its key, only bodies the classifier grades
 *  `standard` or DOI servers count as standards-graded, and the fold recomputes. */
export const gatesHolds = (r = researchGates()): boolean =>
  new Set(r.gates.map((g) => g.id)).size === r.count &&
  r.gates.every((g) => g.access !== 'owner-key' || (g.key !== undefined && g.key.length > 0)) &&
  r.gates.every((g) => g.access === 'owner-key' || g.key === undefined) &&
  r.gates.every((g) => g.standards === (g.grade !== 'named')) &&
  r.gates.filter((g) => g.kind === 'search-ai' || g.kind === 'search').every((g) => !g.standards) &&
  r.receipt === merkleGravity(r.gates.map((g) => g.address))

// ── the experiment environment: the install profile, ported from the committed catalogue ─────────────────────────

/** the packages an experiment host asks for — each ported as an identity from the committed Alpine catalogue, so the
 *  profile is a sealed set of published releases, never an execution. The browser OS boots the same catalogue. */
export const RESEARCH_PROFILE = [
  'ca-certificates', 'curl', 'jq', 'git', 'openssl', 'w3m', 'lynx', 'python3', 'py3-requests', 'nodejs', 'npm', 'wget',
] as const

export interface ResearchEnvironment extends HexbitDoor {
  definition: 'uuidnaOS·environment·research'
  profile: 'research'
  branch: string
  arch: string
  asked: number
  ported: number
  packages: AppPort[]
  /** names the committed catalogue does not carry, named rather than dropped */
  absent: string[]
  /** false where this surface holds no catalogue (the edge): nothing is ported, nothing is claimed */
  measured: boolean
  gates: string
  receipt: string
  honest: string
}

const ENV_HONEST =
  'The research environment: the Alpine packages an experiment host needs, each ported from the committed catalogue ' +
  'as a content-addressed identity of the published release (name, version, arch, checksum) and the gates it may ask. ' +
  'Provenance, not execution — uuidnaOS seals what an install is verified against; it installs nothing.'

let ENV: ResearchEnvironment | null = null
/** researchEnvironment() → the research install profile as identities, plus the gates receipt they ask through. */
export function researchEnvironment(): ResearchEnvironment {
  if (ENV) return ENV
  const measured = catalogueState().present
  const packages: AppPort[] = []
  const absent: string[] = []
  for (const name of RESEARCH_PROFILE) {
    const p = measured ? cataloguePackage(name) : null
    if (p) packages.push(portApp(p, p.repo, INSTALLS_MIRROR.branch, INSTALLS_MIRROR.arch))
    else absent.push(name)
  }
  const gates = researchGates().receipt
  const receipt = toUuid(`environment|research|${packages.map((p) => p.address).join('|')}|${absent.join(',')}|${gates}`)
  ENV = {
    definition: 'uuidnaOS·environment·research', profile: 'research',
    branch: INSTALLS_MIRROR.branch, arch: INSTALLS_MIRROR.arch,
    asked: RESEARCH_PROFILE.length, ported: packages.length, packages, absent, measured, gates, receipt, ...hexbitDoorOf(receipt), honest: ENV_HONEST,
  }
  return ENV
}

/** environmentHolds() → asked = ported + absent, every port carries an address, and an unmeasured surface ports nothing. */
export const environmentHolds = (e = researchEnvironment()): boolean =>
  e.asked === e.ported + e.absent.length &&
  e.packages.every((p) => typeof p.address === 'string' && p.address.length > 0) &&
  (e.measured || e.ported === 0) &&
  e.gates === researchGates().receipt

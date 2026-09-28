// life-apis — THE MEDICAL, SCIENTIFIC AND HERBAL SOURCES, DECLARED WITH THE QUERY THAT CHECKS EACH ONE.
//
// The captain, 2026-09-28: "add all medical and scientific apis including herbal datasets to complete human
// application of all aspects of harmonic life".
//
// WHAT THIS IS, AND THE BOUNDARY COMES FIRST BECAUSE THE SUBJECT DEMANDS IT. These are public record sources. This
// ledger may seal ARITHMETIC ABOUT WHAT A SOURCE PUBLISHED — the pattern lean/Cern.lean already uses, quoting four CMS
// datasets' integers exactly, under their DOIs, and deciding relations between them. It may never seal a therapeutic
// claim, a dose, an indication, a contraindication or any statement about what a substance does in a person. Nothing
// downstream of this file is medical advice, and no arrangement of sealed arithmetic becomes advice by being sealed.
// A plant's phytochemical record is a fact about a database; what it means for a body is a question for a clinician,
// and this repository's own rule already covers it — UNVERIFIED means "not decidable here", never "false" and never
// "safe".
//
// EVERY SOURCE CARRIES ITS OWN PROBE, which is the school registry's rule and the reason this file can be trusted at
// all: a source is not addable without saying how to check it, enforced by construction in life-apis.test.ts, which
// fails the build for any row lacking a probe. A declaration here is NOT a claim that the endpoint
// answers. The probe run is the evidence, and a declared source that does not answer becomes an open lead rather than a
// silent absence — the same discipline src/api-leads.ts applies to every other API, where `null` is unread and never
// clean.
//
// WHY A SEPARATE REGISTRY FROM SchoolApi. The school's `kind` union is education-shaped (taxonomy, statistics,
// geography, procurement) and these are not; widening it would make one union mean two things. The field names are
// deliberately identical so one probe walker can read both.
//
// ACCESS IS STATED HONESTLY, INCLUDING WHERE IT IS NOT FREE. Several of the best herbal and natural-product corpora
// require a key or an academic licence (Kew's Medicinal Plant Names Services, Tropicos, HMDB's bulk downloads, USDA
// FoodData Central). They are declared with `access` saying so rather than omitted, because a reader looking for
// medicinal plant nomenclature should learn that the door exists and what it costs, not that nothing exists.

export type LifeApiKind =
  | 'literature'
  | 'clinical'
  | 'regulatory'
  | 'pharmacology'
  | 'chemistry'
  | 'genomics'
  | 'botany'
  | 'ethnobotany'
  | 'nutrition'
  | 'environment'
  | 'ontology'

export interface LifeApiQuery { [param: string]: string | number }

export interface LifeApi {
  id: string
  name: string
  base: string
  kind: LifeApiKind
  serves: string[]
  format: string
  /** free and keyless, or exactly what it costs — never left vague */
  access: string
  /**
   * The path segment the probe appends to `base`, when the endpoint is path-shaped rather than query-shaped.
   *
   * ADDED AFTER THE FIRST PROBE RUN REFUTED SEVENTEEN OF TWENTY-TWO DECLARATIONS. Every probe was built as base plus
   * query parameters, which is right for OLS, Wikidata and WHO and wrong for most of the rest: openFDA wants
   * /drug/label.json, GBIF wants /species/search, PubChem wants the whole query in the path. The 404s were a finding
   * about these declarations, not about those services.
   */
  path?: string
  /**
   * The body to POST, for an endpoint that does not answer a GET.
   *
   * ADDED BECAUSE GraphQL DOES NOT ANSWER A QUERY STRING. Open Targets returned HTTP 500 to the declared GET probe: its
   * endpoint takes a POST with a JSON body, and a query parameter named `query` is not that. A declaration that can only
   * describe GET is unable to reach a GraphQL source BY CONSTRUCTION — a query document is a body, and a GET
 * carries none — so the shape was missing rather than the source unreachable.
   */
  post?: Record<string, unknown>
  /** the known-good query that proves this source still answers. No source without one. */
  probe: LifeApiQuery
  /** what the source does NOT say, which for a medical record is the load-bearing half */
  honest: string
}

export const LIFE_APIS: readonly LifeApi[] = [
  // ── literature and trials ──────────────────────────────────────────────────────────────────────────────────────
  { id: 'europepmc', name: 'Europe PMC — biomedical and life-science literature', kind: 'literature',
    base: 'https://www.ebi.ac.uk/europepmc/webservices/rest',
    path: '/search',
    probe: { query: 'curcumin AND OPEN_ACCESS:y', format: 'json', pageSize: 3 },
    serves: ['abstracts', 'full-text where open', 'citations', 'MeSH terms', 'grant links'],
    format: 'JSON', access: 'public, no key',
    honest: 'A LITERATURE INDEX. That a paper claims an effect is a fact about the paper, never about the effect. ' +
      'Europe PMC indexes retracted articles too, with the retraction noted — so a hit is not an endorsement and a ' +
      'count of hits is not evidence of anything but publishing activity.' },

  { id: 'clinicaltrials', name: 'ClinicalTrials.gov — registered interventional and observational studies', kind: 'clinical',
    base: 'https://clinicaltrials.gov/api/v2',
    path: '/studies',
    probe: { 'query.term': 'Curcuma longa', pageSize: 3, format: 'json' },
    serves: ['registered protocols', 'phase', 'status', 'enrolment', 'outcome measures', 'results where posted'],
    format: 'JSON', access: 'public, no key',
    honest: 'A REGISTRY OF INTENT, not of findings. Most records are protocols; many never post results, and ' +
      'registration says nothing about whether a study was completed, was sound, or found anything. A terminated ' +
      'trial and a successful one look alike until the results section exists.' },

  // ── regulatory record ─────────────────────────────────────────────────────────────────────────────────────────
  { id: 'openfda', name: 'openFDA — labels, adverse event reports, recalls, devices', kind: 'regulatory',
    base: 'https://api.fda.gov',
    path: '/drug/label.json',
    probe: { search: 'openfda.generic_name:"aspirin"', limit: 3 },
    serves: ['drug labels (SPL)', 'FAERS adverse event reports', 'enforcement and recalls', 'device records', 'NDC directory'],
    format: 'JSON', access: 'public, no key (rate-limited; a key raises the limit)',
    honest: 'FAERS IS SPONTANEOUS REPORTING AND CANNOT SHOW CAUSATION. A report means somebody reported it: no ' +
      'denominator, no control, duplicates, and reporting driven by news coverage. Counting FAERS rows to compare two ' +
      'substances is one of the best-known ways to produce a confident false result, and openFDA says so itself.' },

  { id: 'dailymed', name: 'DailyMed — the official FDA drug label archive (NLM)', kind: 'regulatory',
    base: 'https://dailymed.nlm.nih.gov/dailymed/services/v2',
    path: '/spls.json',
    probe: { drug_name: 'aspirin', pagesize: 3 },
    serves: ['current prescribing information', 'SPL history', 'packaging', 'NDC codes'],
    format: 'JSON / XML (SPL)', access: 'public, no key',
    honest: 'THE LABEL AS APPROVED, which is a regulatory document and not a summary of the evidence. It records what ' +
      'the sponsor may say, including where that is more conservative or more permissive than current literature.' },

  { id: 'rxnav', name: 'RxNav / RxNorm — normalised drug nomenclature and interactions (NLM)', kind: 'pharmacology',
    base: 'https://rxnav.nlm.nih.gov/REST',
    path: '/rxcui.json',
    probe: { name: 'ibuprofen' },
    serves: ['RxNorm concepts', 'ingredient and brand mapping', 'ATC classes', 'dose forms'],
    format: 'JSON / XML', access: 'public, no key',
    honest: 'A NOMENCLATURE. It makes two names comparable; it does not say a drug is appropriate, and NLM retired ' +
      'the interaction API precisely because a normalised name is not clinical judgement.' },

  // ── chemistry ─────────────────────────────────────────────────────────────────────────────────────────────────
  { id: 'pubchem', name: 'PubChem — compounds, substances and bioassays (NCBI)', kind: 'chemistry',
    base: 'https://pubchem.ncbi.nlm.nih.gov/rest/pug',
    // THE QUERY MOVED FROM THE PATH INTO THE PROBE, and it is the same request either way. PUG REST accepts a name
    // lookup as a path segment OR as a URL parameter, and only the second form declares the query where every other
    // row declares it — so the finder that requires a known-good query per source could not see this one's. Verified
    // 2026-09-28: 200, CID 969516, C21H20O6, 368.4 g/mol.
    path: '/compound/name/property/MolecularFormula,MolecularWeight/JSON',
    probe: { name: 'curcumin' },
    serves: ['structures', 'identifiers (CID, InChI, SMILES)', 'computed properties', 'bioassay results', 'cross-references'],
    format: 'JSON / CSV / SDF', access: 'public, no key',
    honest: 'DEPOSITED DATA OF MIXED PROVENANCE. Properties may be computed rather than measured, and a bioassay hit ' +
      'is one assay in one system — an in-vitro activity at a concentration no body reaches is still recorded as ' +
      'activity. The number is exact; its relevance is not in the database.' },

  { id: 'chembl', name: 'ChEMBL — curated bioactivity of drug-like molecules (EMBL-EBI)', kind: 'pharmacology',
    base: 'https://www.ebi.ac.uk/chembl/api/data',
    path: '/molecule',
    probe: { format: 'json', limit: 3, pref_name__icontains: 'quercetin' },
    serves: ['activities (IC50, Ki, EC50)', 'targets', 'assays', 'mechanisms', 'drug indications'],
    format: 'JSON / XML', access: 'public, no key (CC BY-SA 3.0)',
    honest: 'CURATED FROM THE LITERATURE, so it inherits publication bias: what was measured and reported, not what ' +
      'is true of the molecule. Activities across assays are not directly comparable, which is why ChEMBL keeps the ' +
      'assay description attached to every value.' },

  { id: 'unichem', name: 'UniChem — compound identifier cross-references (EMBL-EBI)', kind: 'chemistry',
    // THE DOCUMENTED v1 API DECLARES ITS QUERY AS A BODY, and that is why this row moved off the legacy path form.
    // Both answer: the legacy /inchikey/<key> returns 200, and so does v1 /compounds. The difference is that the
    // legacy form hides the query inside the path, out of reach of the finder that requires every source to declare a
    // known-good query never reads it BY CONSTRUCTION, since a path segment is not a declared field, while the body states it. Verified 2026-09-28: 200, and the compound comes
    // back as C21H20O6 — the SAME formula PubChem's own probe returns for curcumin, which is two independent
    // chemistry sources agreeing on one molecular formula rather than one source agreeing with itself.
    base: 'https://www.ebi.ac.uk/unichem/api/v1',
    path: '/compounds',
    post: { type: 'inchikey', compound: 'VFLDPWHFBUODDF-FCXRPNKRSA-N' },
    probe: {},
    serves: ['InChIKey to source-database identifier mapping across 40+ chemistry resources'],
    format: 'JSON', access: 'public, no key',
    honest: 'A MAPPING ONLY. It resolves whether two databases mean the same structure; it holds no property, no ' +
      'activity and no opinion about the compound.' },

  { id: 'ols', name: 'EBI OLS — ontology lookup (ChEBI, MeSH, DOID, SNOMED subsets)', kind: 'ontology',
    base: 'https://www.ebi.ac.uk/ols4/api',
    probe: { q: 'flavonoid', ontology: 'chebi', rows: 3 },
    serves: ['term lookup', 'hierarchies', 'synonyms', 'cross-ontology mapping'],
    format: 'JSON', access: 'public, no key',
    honest: 'NAMES AND THEIR RELATIONS. An ontology fixes what a term means so two datasets can be joined without ' +
      'guessing; it asserts nothing empirical.' },

  // ── genomics and targets ──────────────────────────────────────────────────────────────────────────────────────
  { id: 'uniprot', name: 'UniProt — protein sequence and functional annotation', kind: 'genomics',
    base: 'https://rest.uniprot.org',
    path: '/uniprotkb/search',
    probe: { query: 'gene:PTGS2 AND organism_id:9606', format: 'json', size: 3 },
    serves: ['sequences', 'domains', 'post-translational modifications', 'variants', 'literature-backed function'],
    format: 'JSON / TSV / FASTA', access: 'public, no key (CC BY 4.0)',
    honest: 'ANNOTATION WITH EVIDENCE CODES, and the codes matter: much of it is inferred by similarity rather than ' +
      'experimentally shown. Reading an inferred annotation as a measured fact is the standard misuse.' },

  { id: 'ensembl', name: 'Ensembl — genomes, variation and comparative genomics', kind: 'genomics',
    base: 'https://rest.ensembl.org',
    path: '/lookup/symbol/homo_sapiens/PTGS2',
    probe: { 'content-type': 'application/json' },
    serves: ['genes', 'transcripts', 'variants', 'regulatory features', 'orthologues'],
    format: 'JSON', access: 'public, no key',
    honest: 'COORDINATES AND MODELS ON A REFERENCE ASSEMBLY. A gene model is a current best annotation that changes ' +
      'between releases, so a position is only meaningful with its assembly and release stated.' },

  { id: 'opentargets', name: 'Open Targets Platform — target–disease association evidence', kind: 'pharmacology',
    base: 'https://api.platform.opentargets.org/api/v4/graphql',
    post: { query: '{ search(queryString: "curcumin", entityNames: ["drug"]) { total } }' },
    probe: {},
    serves: ['target–disease associations', 'evidence by datatype', 'tractability', 'known drugs'],
    format: 'GraphQL / JSON', access: 'public, no key (CC0)',
    honest: 'AN ASSOCIATION SCORE IS A SUMMARY OF EVIDENCE STRENGTH, not a probability that a target treats a ' +
      'disease. Open Targets is explicit that the score ranks hypotheses for further work.' },

  // ── botany, and the herbal corpora the captain named ──────────────────────────────────────────────────────────
  { id: 'gbif', name: 'GBIF — global biodiversity occurrence and taxonomic backbone', kind: 'botany',
    base: 'https://api.gbif.org/v1',
    path: '/species/search',
    probe: { q: 'Curcuma longa', limit: 3 },
    serves: ['accepted names and synonyms', 'occurrence records', 'distributions', 'dataset provenance'],
    format: 'JSON', access: 'public, no key (records vary by licence)',
    honest: 'OCCURRENCE IS OBSERVATION EFFORT, not abundance. GBIF density maps where botanists went; absence from a ' +
      'region is usually absence of recording. Identifications are as good as the recorder and are frequently revised.' },

  { id: 'wfo', name: 'World Flora Online — the consensus plant name backbone', kind: 'botany',
    base: 'https://list.worldfloraonline.org',
    path: '/matching_rest.php',
    probe: { input_string: 'Hypericum perforatum' },
    serves: ['accepted plant names', 'synonymy', 'nomenclatural status', 'authorship'],
    format: 'JSON / DwC-A', access: 'public, no key (CC BY 4.0) — but UNREACHABLE FROM NODE: measured 2026-09-28, the '
      + 'host serves an incomplete certificate chain and fetch fails with UNABLE_TO_VERIFY_LEAF_SIGNATURE, while curl '
      + 'accepts it. The path and parameter here are correct and verified to answer 200; the obstacle is their TLS. '
      + 'Disabling certificate verification would trade every request this process makes for one connector, so it is '
      + 'left unreachable and recorded.',
    honest: 'NOMENCLATURE IS THE PREREQUISITE AND NOT THE SUBJECT. Herbal literature is full of ambiguous common ' +
      'names, and two studies of "St John\'s wort" may not be studying one taxon. WFO fixes which plant is meant; it ' +
      'says nothing about its chemistry or use.' },

  { id: 'powo', name: 'Plants of the World Online — Kew\'s taxonomic and distribution monograph', kind: 'botany',
    base: 'https://powo.science.kew.org/api/2',
    probe: { q: 'Hypericum perforatum', perPage: 3 },
    serves: ['accepted taxonomy', 'native and introduced ranges', 'descriptions', 'images'],
    format: 'JSON', access: 'REFUSED TO THIS CLIENT — measured 2026-09-28: HTTP 403 to an identified probe, so Kew '
      + 'gates the endpoint however it is documented. Access needs arranging with Kew, not a different header.',
    honest: 'A MONOGRAPHIC TREATMENT, so it is an expert view that other treatments may contradict. Distribution is ' +
      'at region level and is not a statement about where a plant may be collected or grown.' },

  { id: 'duke-phytochem', name: 'Dr. Duke\'s Phytochemical and Ethnobotanical Databases (USDA ARS)', kind: 'ethnobotany',
    base: 'https://phytochem.nal.usda.gov/api',
    probe: { q: 'Curcuma longa' },
    serves: ['plant–chemical occurrence', 'chemical activities as reported', 'ethnobotanical uses by culture', 'source citations'],
    format: 'JSON (surface not formally documented)', access: 'NO PUBLIC JSON SURFACE FOUND — measured 2026-09-28: 404 '
      + 'at the documented host for every path tried. The database is public through its web interface; an API is not '
      + 'evidenced, and this row stays declared so the gap is on the record rather than forgotten.',
    honest: 'THE CANONICAL HERBAL CORPUS, AND THE EASIEST TO MISREAD IN THIS WHOLE FILE. An "activity" row records ' +
      'that a source reported an activity for a chemical — frequently in vitro, frequently at concentrations no diet ' +
      'or preparation reaches, sometimes from a single old citation. An ethnobotanical use records that a people used ' +
      'a plant that way, which is anthropology and not pharmacology. Chaining plant to chemical to activity to ' +
      'indication produces a confident sentence with no evidence behind any of its joints, and that chain is exactly ' +
      'what this database is most often used to build. It is declared here to be READ, never to be concluded from.' },

  { id: 'lotus', name: 'LOTUS — natural products with taxonomic provenance (via Wikidata)', kind: 'ethnobotany',
    base: 'https://query.wikidata.org/sparql',
    probe: { query: 'SELECT ?c WHERE { ?c wdt:P703 wd:Q42562 } LIMIT 3', format: 'json' },
    serves: ['structure–organism pairs', 'referenced occurrences', 'curation provenance'],
    format: 'SPARQL / JSON', access: 'public, no key (CC0); Wikidata asks for a User-Agent',
    honest: 'A REFERENCED PAIRING of a structure with an organism it was reported from. It carries the reference, ' +
      'which is its strength, and inherits Wikidata\'s openness to error, which is its cost.' },

  { id: 'coconut', name: 'COCONUT — the open COlleCtion of Open NatUral producTs', kind: 'chemistry',
    base: 'https://coconut.naturalproducts.net/api',
    probe: { q: 'quercetin', limit: 3 },
    serves: ['aggregated natural product structures', 'source databases', 'computed descriptors'],
    format: 'JSON', access: 'KEY REQUIRED — measured 2026-09-28: /api/molecules answers 401 and /api/v1/molecules 404, '
      + 'so the surface is gated. The DATA is CC BY 4.0; the ACCESS is not open, and my declaration of "public, no key" '
      + 'was refuted by its own probe.',
    honest: 'AN AGGREGATION, so duplicates and disagreements between its source databases survive into it. A ' +
      'structure being present means some collection listed it, not that it was isolated and characterised.' },

  { id: 'mpns', name: 'Kew Medicinal Plant Names Services — medicinal plant nomenclature', kind: 'ethnobotany',
    base: 'https://mpns.science.kew.org/mpns-data',
    probe: { name: 'Hypericum perforatum' },
    serves: ['pharmaceutical and trade names', 'scientific name resolution for medicinal plants', 'pharmacopoeia links'],
    format: 'JSON', access: 'REGISTRATION REQUIRED — free for non-commercial use, key issued by Kew',
    honest: 'THE AUTHORITY ON WHICH PLANT A DRUG NAME MEANS, and this repository holds no key for it. Declared so ' +
      'that the door is known to exist and its cost is on the record; the probe will report it unreachable until a ' +
      'key exists, and an unreachable declared source is an open lead rather than a silent gap.' },

  // ── nutrition and environment ─────────────────────────────────────────────────────────────────────────────────
  { id: 'usda-fdc', name: 'USDA FoodData Central — food composition', kind: 'nutrition',
    base: 'https://api.nal.usda.gov/fdc/v1',
    probe: { query: 'turmeric', pageSize: 3 },
    serves: ['nutrient profiles', 'branded and foundation foods', 'analytical provenance'],
    format: 'JSON', access: 'KEY REQUIRED — free, issued by api.data.gov',
    honest: 'COMPOSITION OF SAMPLES, with real variation between them. A single value is a central estimate for ' +
      'analysed samples and not a property of the food as bought.' },

  { id: 'who-gho', name: 'WHO Global Health Observatory — health indicators by country and year', kind: 'clinical',
    base: 'https://ghoapi.azureedge.net/api',
    probe: { indicator: 'WHOSIS_000001' },
    serves: ['life expectancy', 'mortality', 'risk factors', 'health system indicators'],
    format: 'OData / JSON', access: 'public, no key',
    honest: 'COUNTRY AGGREGATES, frequently modelled rather than measured, with wide uncertainty that the API ' +
      'reports separately from the point estimate. A country figure says nothing about a person in it.' },

  { id: 'openaq', name: 'OpenAQ — aggregated ground-level air quality measurements', kind: 'environment',
    base: 'https://api.openaq.org/v3',
    probe: { limit: 3, parameter: 'pm25' },
    serves: ['PM2.5, PM10, NO2, O3, SO2, CO', 'station metadata', 'raw and averaged values'],
    format: 'JSON', access: 'public; a free key is now required for v3',
    honest: 'STATION READINGS, not exposure. A station measures where it stands, with instruments of varying class ' +
      'and uptime; treating a city average as what a body breathed is the standard overreach.' },

  { id: 'open-meteo', name: 'Open-Meteo — weather, air quality and climate reanalysis', kind: 'environment',
    base: 'https://api.open-meteo.com/v1',
    path: '/forecast',
    probe: { latitude: 42.7, longitude: 23.3, hourly: 'temperature_2m', forecast_days: 1 },
    serves: ['forecast', 'historical reanalysis', 'air quality', 'solar radiation'],
    format: 'JSON', access: 'public, no key for non-commercial use',
    honest: 'MODEL OUTPUT ON A GRID, interpolated to the point asked for. It is not a measurement at that point, and ' +
      'the difference matters most in exactly the complex terrain where people ask for it.' },
] as const

/** the kinds present, computed — so a reader sees the coverage without a second list to maintain */
export const LIFE_API_KINDS = (): LifeApiKind[] =>
  [...new Set(LIFE_APIS.map((a) => a.kind))].sort()

/** sources unprobeable until a credential exists — an owner act to obtain, never a silent omission */
export const LIFE_APIS_NEEDING_A_KEY = (): LifeApi[] =>
  LIFE_APIS.filter((a) => /KEY REQUIRED|REGISTRATION REQUIRED|free key is now required/.test(a.access))

// quantum/os/npm — THE NPM DOOR FOR uuidnaOS. exec.ts imports ./index; this file imports both and is never imported by them.
export * from '../index.js'
export { uuidnaExec, type ExecResult } from '../exec/index.js'
export {
  runCourt, runCourtSync, runCourtCli, parseCourtPlan, needJobs,
  dailyNeedJobs, publishNeedJobs, agentProbeJobs, hexBootJob, courtJobs, playbookJobs,
  runOsCourt, runOsCourtSync,
  type CourtResult, type NeedFail, type NeedPlan, type GateCheckResult, type GateCheckFail,
} from '../court/index.js'
export {
  quantumAlpinePackageNames, testQuantumAlpinePackage, testQuantumAlpineCoverage,
  renderQuantumAlpineCoverage,
  type QuantumAlpineCoverage, type QuantumAlpineRow, type PlaybookExecHit,
} from '../alpine/index.js'
export {
  LETS_ENCRYPT_DIRECTORY, ACME_CLIENT_PACKAGES, ACME_EDGE_PACKAGES,
  acmeDomainLabels, planLetsEncryptIssuance, testAcmePort, renderAcmePort, renderAcmeIssuance,
  type AcmeClient, type AcmeDomainLabel, type AcmeIssuancePlan, type AcmePortCoverage, type AppTheoremBehind,
} from '../acme/index.js'
export {
  CERN_OD, CERN_PROBE_QUERY, fetchCernOpenData, cernPortSearch, renderCernPort,
  type CernRecord, type CernFetchResult, type CernPortResult,
} from '../cern/index.js'
export {
  fetchData, immutableText, clearOsFetchCache, isHtmlResponse,
  type DataKind, type Fetched,
} from '../fetch/index.js'
export {
  SCHOOL_APIS, schoolApiRegistry, schoolApiFetch, probeSchoolApis, pairEducationToJobs,
  escoSearch, escoSearchUrl, escoWholeName, eurostatEducation, giscoSchools, dataEuropaSearch,
  cordisSearch, cernOpenDataSearch, tedNotices, immutableReads, splitCsvLine, pickLang,
  CPV_EDUCATION, GISCO_VINTAGE, EUROSTAT_VACANCIES,
  type SchoolApi, type SchoolApiAnswer, type SchoolApiEvidence, type SchoolApiQuery,
  type SchoolApiRegistry, type Heartbeat, type SourceProbe,
} from '../school/index.js'
export {
  extendedResearchSources, EXTENDED_RESEARCH_SOURCE_NAMES, EXTENDED_RESEARCH_PROBES,
  CORE_RESEARCH_SOURCE_NAMES, coreResearchSources,
  unansweredMath, UNANSWERED_MATH_URL,
  researchSweep, researchEvidence, RESEARCH_SOURCE_NAMES,
  type ExtendedResearchSource, type ResearchSource,
} from '../research/index.js'
export {
  publicApiRegistry,
  type PublicApiEntry, type PublicApiKind,
} from '../public/index.js'
export {
  fetchOpenMeteoForecast, fetchNoaaTideHeight, NOAA_PROBE_DATE,
  discoverQuantumSailingAPIs, correlateWeatherToTheorems, simulateQuantumSailingWeather, serializeWeatherCorrelation,
  type WeatherFact, type QuantumSailingWeatherCorrelation,
} from '../weather/index.js'
export {
  fetchWikinewsFeatured, searchWikinews,
  type NewsArticleStub,
} from '../news/index.js'
export {
  deepColourFromAddress, channelLayout,
  TRINITY_HEX_CHARS, WORDS_HEX_CHARS, CHANNEL_BITS, WORDS_BITS, TAIL_BITS, DEEP_COLOUR_STATES,
  HEX_TRINITY_COUNT, TAIL_HEXBITS, EXECUTABLE_HEXBITS, UUID_LAYOUT_GROUPS,
  type DeepColour,
} from '../channel/index.js'
export {
  appTheoremBehind, appTheoremClaims, foldAppTheorems,
  PORT_THEOREM, CRYPTO_THEOREM,
  type AppTheoremFold, type TheoremClaim,
} from '../apptheorem/index.js'

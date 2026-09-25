// @non-harmonic: asks npm and Zenodo whether the release exists — fetch IS the reading here, and that is the whole
// point of the module: a release is a state of two public services, so no amount of reading this filesystem can see
// it. The boundary is the one thing this file is FOR, and it is named here rather than left for a scanner to find.
// release-live — IS THE RELEASE ACTUALLY THERE?
//
// Every other gate in this tree reads the repository. That is the whole point of them, and it is also their one
// blind spot, named in src/zenodo-seals.ts where it cost the corpus its archive citation: "NOTHING ON THIS
// FILESYSTEM COULD SEE IT. Every gate here reads the repository; the fact that contradicted this line lived only
// in the public record." A release is not a file; it is a state of two public services. So this module asks THEM.
//
// MEASURED 2026-09-25, WHICH IS WHY IT EXISTS: package.json said 0.3.1, npm's latest tag said 0.3.0, Zenodo's
// newest versioned record in the chain said 0.3.0, and no tag v0.3.1 existed locally or on the remote. A version
// had been bumped and the release never cut, and not one gate in the tree could tell — because not one of them
// looks outward. The failure is silent by construction: bumping a version is a file edit, and publishing is not.
//
// UNREAD IS NOT LIVE. The phrasing is deliberately the same as mint-gate's "UNREAD IS NOT AGREEMENT", because it
// is the same error with the same shape: a check that cannot reach its subject — the declared network boundary at the
// head of this file is where that happens — has learned nothing, and reporting
// "nothing found wrong" is then a lie about what was looked at. A network that declines makes `live` FALSE, with
// the check marked `unread` so the reason is never confused with a refutation. This is the vacuous-success class —
// a gate whose green means only that it never ran — and it is the one a release verifier is most exposed to,
// since the network is the very thing it depends on.
//
// PURE VERDICT, INJECTED FACTS. evaluateRelease() takes facts and returns the verdict with no I/O, so every check
// can be shown to FAIL on demand in the test rather than asserted to work. releaseLive() is the thin gatherer.
import { toUuid, merkleFold } from './address.js'

export interface LiveCheck {
  name: string
  /** true only when the check was both ANSWERED and satisfied */
  ok: boolean
  /** true when the subject could not be read at all — never conflated with a refutation */
  unread: boolean
  /**
   * true when the check is not yet ASKABLE, because what it checks has not been attempted.
   *
   * THIS EXISTS TO BREAK A DEADLOCK, and the deadlock was real. publish.yml runs leads-gate BEFORE it publishes
   * ("No publication over an open lead"), and src/api-leads.ts turns every failed outward check into a lead. So a
   * report saying "0.3.1 is not on npm" would have blocked the one act that puts 0.3.1 on npm — for ever, and with
   * a perfectly true statement. A version absent from the registry means two completely different things depending
   * on one fact: whether the tag was cut. Untagged, it is work in progress and nobody claimed otherwise. Tagged, a
   * release was attempted and did not land, which is precisely what must hold the next one.
   *
   * `pending` is NOT `ok` — `live` stays false, because the release genuinely is not live — and it is not `unread`
   * either, since nothing failed to answer. It is "not yet", and it opens no lead.
   */
  pending: boolean
  measured: string
  why: string
}

export interface NpmDist {
  tarball: string
  shasum: string
  integrity: string
  fileCount: number
  unpackedSize: number
  attestations: { url?: string; provenance?: { predicateType?: string } } | null
}

/** A Zenodo record in the chain, as the public API serves it. */
export interface ZenodoVersion { id: string; version: string; files: number; bytes: number; doi: string }

export interface ReleaseFacts {
  /** the version this tree claims to be */
  version: string
  /** whether a tag for this version exists — the one fact that separates "not cut yet" from "cut and lost" */
  tagged: boolean
  npm: { read: boolean; reason: string; latest: string; versions: readonly string[]; dist: NpmDist | null }
  /** the attestation bundle, fetched from dist.attestations.url — its presence in metadata is not its existence */
  attestation: { read: boolean; reason: string; predicateTypes: readonly string[] }
  /** digests RECOMPUTED from the bytes the registry served, never re-read from the metadata that claims them */
  tarball: { read: boolean; reason: string; bytes: number; sha512: string; sha1: string }
  zenodo: { read: boolean; reason: string; versions: readonly ZenodoVersion[] }
  /** doi.org, followed — a Zenodo record can exist before DataCite has registered its DOI */
  doi: { read: boolean; reason: string; status: number; landedOn: string }
}

export interface ReleaseLive {
  version: string
  npmLatest: string
  zenodoLatest: string
  checks: LiveCheck[]
  passed: number
  unread: number
  /** checks not yet askable because the tag was never cut — "not yet", never a finding */
  pending: number
  failed: LiveCheck[]
  /** every check answered AND satisfied. Unread counts against it. */
  live: boolean
  gaps: { what: string; fix: string }[]
  receipt: string
}

/** Compare two dotted numeric versions. Used only to pick the newest, never to decide a check. */
export const versionRank = (v: string): number[] => v.split('.').map((p) => Number.parseInt(p, 10) || 0)

export function newerVersion(a: string, b: string): string {
  const [x, y] = [versionRank(a), versionRank(b)]
  // THE LONGER OF TWO LENGTHS IS A COMPARISON, NOT A LIBRARY CALL. Math.* is a tree-wide hard reject with no
  // exemption anywhere, and the reason is not style: Math is float arithmetic, and a version rank is integers. The
  // ternary is the same value and stays in ℤ.
  const span = x.length > y.length ? x.length : y.length
  for (let i = 0; i < span; i += 1) {
    const d = (x[i] ?? 0) - (y[i] ?? 0)
    if (d !== 0) return d > 0 ? a : b
  }
  return a
}

/**
 * THE CONCEPT CHAIN HOLDS MORE THAN ONE WORK, which src/zenodo-seals.ts records and the captain has left standing
 * as a Zenodo-side decision. Measured on the live chain 21787143: nineteen records, seventeen of them uuidna
 * releases carrying a `version`, and two foreign works (the Clay proofs and the ℤ/9 Vortex Framework) carrying
 * none. Selecting on "has a version" is therefore not a convenience — it is what keeps another author's paper
 * from being read as this release. A foreign work that ever does carry a version would be selected, so the check
 * that matters is the one on the EXACT version, not on the newest.
 */
export const zenodoReleases = (versions: readonly ZenodoVersion[]): ZenodoVersion[] =>
  versions.filter((v) => /^\d+\.\d+\.\d+$/.test(v.version))

export function evaluateRelease(f: ReleaseFacts): ReleaseLive {
  // A ROW MUST ALWAYS SAY WHAT IT SAW, and a blank reason cannot — by construction, since an empty string carries no
  // measurement and reads identically whether the check passed, declined, or was never asked. The first live run
  // printed exactly that for one check and the guard test
  // then found two more: when every subject answered and none had a complaint, `reason || reason` is the empty
  // string, and the honest measurement in that case is that the registry simply has no dist for this version.
  const why = (...reasons: string[]): string =>
    reasons.find((r) => r.trim().length > 0) ?? `the registry carries no dist for ${f.version}`

  const checks: LiveCheck[] = []
  const add = (name: string, ok: boolean, unread: boolean, measured: string, why: string, pending = false): void => {
    checks.push({ name, ok: ok && !unread && !pending, unread: unread && !pending, pending, measured, why })
  }
  // The four checks that ask "did this version arrive?" are the cut-sensitive ones: before the tag exists, the
  // answer is no and that is not a finding. Everything else — digests, provenance, whether a record carries a file —
  // asks about what IS published and stays askable either way.
  const notCut = !f.tagged
  const cut = (m: string): string => notCut ? `${m} — and no tag v${f.version} exists, so the release has not been cut` : m

  // AND THE CONSEQUENCES OF PENDING ARE PENDING TOO. The first run of this reported six checks as UNREAD — no
  // tarball to fetch, no dist to size, no attestation to pull, no DOI to resolve — and every one of those was a
  // lie about what happened: the registry answered perfectly, and said the version is not there. There is nothing
  // to fetch because the release was never cut, which is "not yet", not "the network went quiet". `unread` has to
  // keep meaning exactly one thing, or it stops being the guard the rest of this file leans on.
  const uncutAndAbsent = notCut && f.npm.read && !f.npm.versions.includes(f.version)

  const rels = zenodoReleases(f.zenodo.versions)
  const zenodoLatest = rels.length > 0 ? rels.map((r) => r.version).reduce(newerVersion) : ''
  const mine = rels.find((r) => r.version === f.version)
  const d = f.npm.dist

  // ─── npm ───────────────────────────────────────────────────────────────────────────────────────────────────
  add('npm-version-published', f.npm.versions.includes(f.version), !f.npm.read,
    f.npm.read ? cut(`${f.npm.versions.length} versions published, latest ${f.npm.latest || '(none)'}`) : f.npm.reason,
    'the version this tree calls itself must exist on the registry, or the tree is describing a release nobody can install',
    notCut)

  add('npm-latest-is-the-release', f.npm.latest === f.version, !f.npm.read,
    f.npm.read ? cut(`latest=${f.npm.latest || '(none)'} · tree=${f.version}`) : f.npm.reason,
    'a published version that is not `latest` installs for nobody who types the package name; a bumped version that '
    + 'was never cut leaves latest behind, which is exactly the state this check was written to catch',
    notCut)

  add('npm-tarball-serves', f.tarball.bytes > 0, !f.tarball.read,
    f.tarball.read ? `${f.tarball.bytes} bytes served` : f.tarball.reason,
    'registry metadata can name a tarball the CDN does not serve; only fetching it proves an install would work', uncutAndAbsent)

  // THE DIGEST IS RECOMPUTED, NOT COMPARED TO ITSELF. Reading dist.integrity and reporting that it matches
  // dist.integrity is the purest form of the vacuous check: it cannot fail BY CONSTRUCTION, since a value equals
  // itself whatever the registry served. These two compare bytes to claim instead.
  add('npm-bytes-match-integrity', d !== null && f.tarball.sha512 === d.integrity, !f.tarball.read || !f.npm.read,
    f.tarball.read && d ? `served sha512 ${f.tarball.sha512.slice(0, 26)}… vs claimed ${d.integrity.slice(0, 26)}…` : why(f.tarball.reason, f.npm.reason),
    'the bytes a consumer receives must be the bytes the registry signed, recomputed here from what was served', uncutAndAbsent)

  add('npm-shasum-matches', d !== null && f.tarball.sha1 === d.shasum, !f.tarball.read || !f.npm.read,
    f.tarball.read && d ? `served sha1 ${f.tarball.sha1.slice(0, 12)}… vs claimed ${d.shasum.slice(0, 12)}…` : why(f.tarball.reason, f.npm.reason),
    'the legacy digest is what older clients verify, and a release complete for new clients only is not complete', uncutAndAbsent)

  add('npm-tarball-complete', d !== null && d.fileCount > 0 && d.unpackedSize > f.tarball.bytes, !f.npm.read || !f.tarball.read,
    d ? `${d.fileCount} files, ${d.unpackedSize} unpacked from ${f.tarball.bytes} compressed` : why(f.npm.reason),
    'an empty or unexpanding tarball publishes successfully and installs nothing; unpacked must exceed compressed', uncutAndAbsent)

  // THE URL IS NOT THE BUNDLE. dist.attestations is metadata npm writes; whether the bundle is actually retrievable
  // is a separate fact, and provenance that cannot be fetched — a host fact, since retrieving the bundle crosses the
  // network boundary this file declares — cannot be checked by anyone downstream either.
  add('npm-provenance-attested', f.attestation.predicateTypes.some((t) => t.includes('slsa.dev/provenance')), !f.attestation.read,
    f.attestation.read ? `predicates: ${f.attestation.predicateTypes.join(', ') || '(none)'}` : f.attestation.reason,
    'the publish claims a signed Sigstore provenance chain; an attestation URL that serves nothing makes that claim unverifiable', uncutAndAbsent)

  // ─── zenodo ────────────────────────────────────────────────────────────────────────────────────────────────
  add('zenodo-version-deposited', mine !== undefined, !f.zenodo.read,
    f.zenodo.read ? cut(`${rels.length} versioned records in the chain, newest ${zenodoLatest || '(none)'}`) : f.zenodo.reason,
    'the archive is where the release is permanent; a release absent from it is citable by nobody, and the deposit '
    + 'job can be skipped or fail long after npm has already accepted the publish',
    notCut)

  add('zenodo-record-carries-a-file', mine !== undefined && mine.files > 0 && mine.bytes > 0, !f.zenodo.read,
    f.zenodo.read ? (mine ? `record ${mine.id}: ${mine.files} file(s), ${mine.bytes} bytes` : cut('no record for this version')) : f.zenodo.reason,
    'a published Zenodo record with no file is a landing page, not an archive — and it publishes just as successfully',
    notCut && mine === undefined)

  add('zenodo-doi-resolves', f.doi.status === 200 && f.doi.landedOn.includes('zenodo.org'), !f.doi.read,
    f.doi.read ? `doi.org → ${f.doi.status} ${f.doi.landedOn}` : f.doi.reason,
    'DataCite registration lags the deposit, so a record can exist while its DOI resolves nowhere; a citation that '
    + '404s is worse than no citation because it looks like one', uncutAndAbsent)

  // ─── the two must agree ────────────────────────────────────────────────────────────────────────────────────
  add('npm-and-zenodo-agree', f.npm.latest !== '' && f.npm.latest === zenodoLatest, !f.npm.read || !f.zenodo.read,
    `npm ${f.npm.latest || '(none)'} · zenodo ${zenodoLatest || '(none)'}`,
    'the code a reader installs and the record they cite must be the same release; the two publish independently, '
    + 'so they drift apart silently whenever one of the two halves of a release fails')

  const failed = checks.filter((c) => !c.ok)
  const unread = checks.filter((c) => c.unread).length
  const pending = checks.filter((c) => c.pending).length
  // A PENDING CHECK OPENS NO GAP. It is not a finding that an uncut release is not on the registry.
  const gaps = failed.filter((c) => !c.pending).map((c) => ({
    what: `${c.name}: ${c.measured}`,
    fix: c.unread
      ? `the subject could not be read, so nothing was learned — re-run with network access; unread is not live`
      : `${c.why}`,
  }))

  return {
    version: f.version,
    npmLatest: f.npm.latest,
    zenodoLatest,
    checks,
    passed: checks.length - failed.length,
    unread,
    pending,
    failed,
    live: failed.length === 0,
    gaps,
    receipt: merkleFold([
      toUuid(`release-live|${f.version}|${f.tagged ? 'tagged' : 'untagged'}|${checks.length}`),
      ...checks.map((c) => toUuid(`${c.name}|${c.ok ? '1' : '0'}|${c.unread ? 'u' : c.pending ? 'p' : 'r'}|${c.measured}`)),
    ]),
  }
}

// ─── the gatherer ────────────────────────────────────────────────────────────────────────────────────────────
// EDGE-SAFE ON PURPOSE. Digests come from crypto.subtle and bodies from global fetch, both of which exist in Node
// and at the Workers edge, so the same verifier can answer from a laptop, from CI, and from https://uuidna.com/mcp.
// node:crypto would have made this file unimportable at the edge, which is where the release is actually consumed.

export const NPM_REGISTRY = 'https://registry.npmjs.org'
export const ZENODO_RECORDS = 'https://zenodo.org/api/records'
/** Zenodo refuses an unauthenticated page larger than this, by its own error message. Measured, not chosen. */
export const ZENODO_PAGE = 25

const hex = (b: ArrayBuffer): string => [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('')
const b64 = (b: ArrayBuffer): string => {
  const bytes = new Uint8Array(b)
  let s = ''
  for (const x of bytes) s += String.fromCharCode(x)
  return typeof btoa === 'function' ? btoa(s) : Buffer.from(bytes).toString('base64')
}

/** A declined read names its reason. `null` body and a reason is the shape every gatherer below reports. */
const getJson = async (url: string): Promise<{ ok: boolean; reason: string; body: unknown }> => {
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'uuidna-release-live/1', accept: 'application/json' } })
    if (res.status !== 200) return { ok: false, reason: `${url} answered ${res.status}`, body: null }
    return { ok: true, reason: '', body: await res.json() }
  } catch (e) { return { ok: false, reason: `${url} unreachable: ${(e as Error).message}`, body: null } }
}

const asDist = (v: unknown): NpmDist | null => {
  const dist = (v as { dist?: Record<string, unknown> } | undefined)?.dist
  if (!dist) return null
  return {
    tarball: String(dist.tarball ?? ''),
    shasum: String(dist.shasum ?? ''),
    integrity: String(dist.integrity ?? ''),
    fileCount: Number(dist.fileCount ?? 0),
    unpackedSize: Number(dist.unpackedSize ?? 0),
    attestations: (dist.attestations as NpmDist['attestations']) ?? null,
  }
}

/**
 * releaseFacts(version, pkg, tagged) → what the public services hold.
 *
 * `tagged` is INJECTED rather than read here, and defaults to false. Reading git would need node:child_process,
 * which would make this module unimportable at the Workers edge — the whole reason the digests come from
 * crypto.subtle. The default is the conservative one: with no tag asserted, the cut-sensitive checks report
 * `pending` and open no lead, so a caller that cannot answer the question — because the boundary declined, not
 * because the answer was no — never manufactures a finding from it.
 */
export async function releaseFacts(version: string, pkg = '@uuidna/uuidna', tagged = false): Promise<ReleaseFacts> {
  const none = { read: false, reason: 'not attempted — the registry did not answer', predicateTypes: [] as string[] }
  const noTar = { read: false, reason: 'not attempted — no tarball url', bytes: 0, sha512: '', sha1: '' }

  // npm packument. The scoped name is encoded once; %2f is what the registry expects and what npm itself writes.
  const reg = await getJson(`${NPM_REGISTRY}/${pkg.replace('/', '%2f')}`)
  const packument = reg.body as { 'dist-tags'?: Record<string, string>; versions?: Record<string, unknown> } | null
  const versions = packument?.versions ? Object.keys(packument.versions) : []
  const latest = packument?.['dist-tags']?.latest ?? ''
  const dist = packument?.versions ? asDist(packument.versions[version]) : null
  const npm = { read: reg.ok, reason: reg.reason, latest, versions, dist }

  // The tarball, and its digests recomputed from the bytes that arrived.
  let tarball = noTar
  if (dist && dist.tarball) {
    try {
      const res = await fetch(dist.tarball, { headers: { 'user-agent': 'uuidna-release-live/1' } })
      if (res.status !== 200) tarball = { ...noTar, reason: `${dist.tarball} answered ${res.status}` }
      else {
        const buf = await res.arrayBuffer()
        tarball = {
          read: true, reason: '', bytes: buf.byteLength,
          sha512: `sha512-${b64(await crypto.subtle.digest('SHA-512', buf))}`,
          sha1: hex(await crypto.subtle.digest('SHA-1', buf)),
        }
      }
    } catch (e) { tarball = { ...noTar, reason: `tarball unreachable: ${(e as Error).message}` } }
  }

  // The attestation BUNDLE, not the metadata that names it.
  let attestation = none
  const attUrl = dist?.attestations?.url
  if (attUrl) {
    const a = await getJson(attUrl)
    const bundles = (a.body as { attestations?: { predicateType?: string }[] } | null)?.attestations ?? []
    attestation = { read: a.ok, reason: a.reason, predicateTypes: bundles.map((x) => String(x.predicateType ?? '')) }
  }

  // Zenodo: the whole concept chain, public and unauthenticated — the reader's view, not the depositor's.
  //
  // PAGINATED, AND THE PAGE SIZE IS NOT A PREFERENCE. Zenodo answers 400 to an unauthenticated size above 25
  // ("Please use authenticated requests to increase the limit to 100"), which this verifier learned by asking for
  // 50 and being refused — and it reported UNREAD rather than pass, which is the one behaviour that made the
  // mistake cheap. Lowering the number to 25 would have been the smaller fix and the wrong one: the chain already
  // holds nineteen records, so at twenty-six a check of an OLDER release would find it absent from page one and
  // report a deposit that exists as missing. `sort=newest` puts the current release on the first page, which is
  // exactly why that bug would have stayed invisible until someone verified an old version. So every page is read.
  const seal = { conceptId: '21787143' }
  const hits: unknown[] = []
  let z = { ok: false, reason: 'not attempted', body: null as unknown }
  for (let page = 1; page <= 20; page += 1) {
    z = await getJson(`${ZENODO_RECORDS}?q=conceptrecid:${seal.conceptId}&all_versions=true&size=${ZENODO_PAGE}&page=${page}&sort=newest`)
    if (!z.ok) break
    const got = (z.body as { hits?: { hits?: unknown[]; total?: number } } | null)?.hits
    const rows = got?.hits ?? []
    hits.push(...rows)
    // stop on a short page or once the reported total is in hand; never on a guess about how many there are
    if (rows.length < ZENODO_PAGE || hits.length >= Number(got?.total ?? 0)) break
  }
  const zversions: ZenodoVersion[] = hits.map((h) => {
    const r = h as { id?: unknown; doi?: unknown; metadata?: { version?: unknown }; files?: { size?: unknown }[] }
    const files = r.files ?? []
    return {
      id: String(r.id ?? ''),
      version: String(r.metadata?.version ?? ''),
      files: files.length,
      bytes: files.reduce((n, x) => n + Number(x.size ?? 0), 0),
      doi: String(r.doi ?? ''),
    }
  })
  const zenodo = { read: z.ok, reason: z.reason, versions: zversions }

  // doi.org for THIS release's record, followed to where it lands.
  let doi = { read: false, reason: 'no Zenodo record for this version — nothing to resolve', status: 0, landedOn: '' }
  const mine = zenodoReleases(zversions).find((v) => v.version === version)
  if (mine?.doi) {
    try {
      const res = await fetch(`https://doi.org/${mine.doi}`, { redirect: 'follow', headers: { 'user-agent': 'uuidna-release-live/1' } })
      doi = { read: true, reason: '', status: res.status, landedOn: res.url }
    } catch (e) { doi = { read: false, reason: `doi.org unreachable: ${(e as Error).message}`, status: 0, landedOn: '' } }
  }

  return { version, tagged, npm, attestation, tarball, zenodo, doi }
}

/** releaseLive(version) → the verdict, gathered then evaluated. */
export const releaseLive = async (version: string, pkg = '@uuidna/uuidna', tagged = false): Promise<ReleaseLive> =>
  evaluateRelease(await releaseFacts(version, pkg, tagged))

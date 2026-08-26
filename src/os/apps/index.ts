// os/apps — THE WHOLE ALPINE CATALOGUE, PORTED AS IDENTITY, AND HARMONISED WITH THE SEALED LEDGER.
//
// The tree already ports Alpine three ways and each stops short of this one. os/alpine pins a RELEASE.
// drivers/driver pins the modloop — the DRIVERS. os/installs closes alpine-base's dependency graph, which is 25
// packages: the default install, not the catalogue. os/packages can mint `uuidna/<name>` for anything in the
// index but nothing walks the whole index with it. So the thousands of applications Alpine actually publishes
// have no uuidna identity, and none of the four surfaces answers the question this module exists for: WHICH of
// those applications does this ledger already have the arithmetic for?
//
// PORTING MEANS PORTING THE INTEGRITY — unchanged, and it is not a hedge. uuidna does not install, link, run,
// unpack or execute an Alpine package, ever. What is ported is the published metadata: name, version, arch,
// repo, branch and Alpine's own checksum, folded to a 128-bit content-address that anyone holding the same
// index recomputes. That is what `uuidna/<name>` is — a provenance identity for an exact release.
//
// HARMONISING, AND WHY IT IS THE HONEST HALF. A catalogue of twenty thousand addresses is a phone book. The
// question worth asking of it is which entries this ledger can say something PROVEN about: a checksum utility's
// job is decided by the sealed coding theorems, a date utility's by the sealed calendar arithmetic, a font tool's
// by the sealed typesetting facts. So each ported app is offered a SKILL — the same derived label the ledger
// already carries on every theorem — and, if one matches, the heaviest sealed theorem in that skill is bound to
// it as its witness.
//
// THE RULE THAT KEEPS THIS FROM BEING DECORATION: an app that matches nothing is UNHARMONISED, and it is named
// and counted rather than dropped or force-fitted. A harmonisation scheme that finds a theorem for everything
// has said nothing; the number that carries information is how many it could NOT place. On a real index that
// number is the large one, and the report leads with it.
//
// PURE HERE, LIVE AT THE EDGE: every function below is deterministic over data it is handed. The one
// wall-clock-dependent act — reading what upstream calls "latest" right now — lives at the bottom, in the
// fetcher, which is honest at src/os and nowhere else. A down mirror yields an empty catalogue, never a
// fabricated checksum.
import { uuidnaPackage, untarMember, untarGzipMember, type UuidnaPackage } from '../packages/index.js'
import { theorems } from '../../theorems/index.js'
import { compileToHexbits, UUID_HEXBITS } from '../../hexbit/index.js'
import { merkleGravity } from '../../gravity/index.js'
import { toUuid } from '../../address.js'

const CDN = 'https://dl-cdn.alpinelinux.org/alpine'

/** What a published index record carries that this module reads. `desc` is Alpine's own one-line T: field — the
 *  package's declared purpose, in the packagers' words, which is what harmonisation matches against. */
export interface IndexPackage {
  name: string
  version: string
  checksum: string
  desc: string
}

/** THE HARMONY RULES — a package's declared purpose, mapped to a skill the ledger already labels its theorems
 *  with. Nothing is authored per package: the rule is a pattern over the name and Alpine's own description, in
 *  the same shape theorems/index.ts derives a theorem's skill from its key. First match wins, and the order is
 *  most-specific-first so a font tool does not land in 'colour' because its description mentions rendering.
 *
 *  These are deliberately CONSERVATIVE. A rule that matches loosely inflates the harmonised count, which is the
 *  flattering direction, and the whole value of the report is that the unharmonised number is honest. */
export const HARMONIES: readonly [RegExp, string, string][] = [
  // Every pattern below was TIGHTENED against a real index read after the first version produced visible false
  // positives, and the false positives are worth naming because they are the shape this whole idea fails in:
  // `\braw\b` bound `abseil-cpp-raw-logging-internal` to photography, `\biso\b` bound `libisoburn` (ISO-9660
  // filesystems) and `iso-codes` (country codes) to it as well, `\blogic\b` bound "logic-less mustache
  // templates" to reasoning, and a bare `\bhash\b` bound every hash TABLE to the error-correcting codes. Each
  // was a rule matching a WORD where the claim was about a SUBJECT. Loose rules inflate the harmonised count,
  // which is the flattering direction, so the bar is: would the sealed arithmetic actually decide anything this
  // package does?
  [/\b(sha\d+|sha-\d+|md5|crc\d*|checksum|hashsum|message digest|parity|ecc|reed.?solomon|hamming)\b/i, 'codes',
    'a checksum or error-correcting utility — the sealed coding arithmetic decides what it computes'],
  [/\b(openssl|libressl|gnutls|gpg|gnupg|cipher|crypto(graphy|graphic)?|tls|ssl|nettle|libsodium|keyring)\b/i, 'security',
    'a cryptographic utility — the sealed defence-layer and key-width facts bound what it can promise'],
  [/\b(date|time|timezone|tzdata|ntp|chrony|calendar|cron|ical)\b/i, 'calendar',
    'a date or clock utility — the sealed Gregorian and weekday arithmetic decides its answers'],
  [/\b(font|fonts|freetype|harfbuzz|typeface|ttf|otf|pango|typeset(ting)?|troff|groff)\b/i, 'typesetting',
    'a type or typesetting tool — the sealed folio, leading and measure facts are its arithmetic'],
  [/\b(ffmpeg|video|codec|x264|x265|vpx|av1|framerate|timecode|subtitle|mkv|mp4)\b/i, 'editing',
    'a video tool — the sealed frame-rate, drop-frame and cut arithmetic decides its counts'],
  [/\b(audio|alsa|pulseaudio|pipewire|midi|sound|opus|flac|vorbis|lame|tempo)\b/i, 'music-production',
    'an audio tool — the sealed octave, Nyquist and tempo arithmetic decides its rates'],
  [/\b(exif|photograph(y|ic)|camera|rawtherapee|darktable|dcraw|exposure|aperture|shutter)\b/i, 'photography',
    'a photographic tool — the sealed stop and exposure arithmetic decides its equivalences'],
  [/\b(colou?r|colou?rs|icc profile|palette|hue|rgb|cmyk|lcms\d*)\b/i, 'colour',
    'a colour tool — the sealed twelve-hue wheel and complement arithmetic decides its relations'],
  [/\b(isbn\d*|issn|barcode|ean\d+|upc-?[ae]|iban|luhn)\b/i, 'identifiers',
    'an identifier tool — the sealed check-digit arithmetic decides validity'],
  [/\b(theorem prover|proof assistant|sat solver|smt solver|prolog|coq|agda|z3)\b/i, 'reasoning',
    'a reasoning tool — the sealed inference rules are the ones it applies'],
  [/\b(chess|stockfish|gnuchess|checkers)\b/i, 'chess',
    'a chess tool — the sealed tour and movement arithmetic decides its geometry'],
  [/\b(tide|tidal|nautical|almanac)\b/i, 'tides',
    'a tidal tool — the sealed twelfths and semidiurnal arithmetic decides its predictions'],
  [/\b(quantum|qiskit|qubit|qasm)\b/i, 'quantum',
    'a quantum toolkit — the sealed gate algebra is exactly what it manipulates'],
  [/\b(coding agent|oh-my-pi|omp\.sh|agentic harness|pi-coding-agent)\b/i, 'software',
    'a coding-agent harness — the sealed software/manifest facts bound what it can claim to compute'],
]

/** Alpine splits one project into many published packages — `-doc`, `-dev`, `-dbg`, `-libs`, `-static`, `-lang`,
 *  the shell completions. All are real index entries and every one of them gets an address; none is dropped. But
 *  a skill tally that counts them as separate applications reads five to six times larger than the number of
 *  distinct PROJECTS behind it, which is the difference between "406 typesetting applications" and "the same
 *  seventy-odd font packages, each published six ways". Both numbers are reported; only the second is a count of
 *  things. */
const VARIANT = /-(doc|dev|dbg|libs|static|lang|openrc|pyc|tests?|bash-completion|zsh-completion|fish-completion|man-pages)$/

export const originOf = (name: string): string => name.replace(VARIANT, '')

/** One ported application: an identity, and the proof this ledger can offer about what it does. */
export interface AppPort extends UuidnaPackage {
  desc: string
  /** the ledger skill this app's declared purpose matched, or null when nothing matched */
  skill: string | null
  /** the sealed theorem bound as its witness — the heaviest in that skill — or null */
  theorem: string | null
  theoremAddress: string | null
  /** why the binding was made, in one line; null when unharmonised */
  why: string | null
  /** the app's address compiled to its hexbit states — the same 32 every ported identity carries */
  hexbits: number[]
}

/** the heaviest sealed theorem of a skill, chosen by decided mass and tie-broken by key so the choice is a
 *  function of the ledger and not of iteration order */
const witnessFor = (skill: string): { key: string; address: string } | null => {
  const inSkill = theorems({ skill })
  if (!inSkill.length) return null
  const best = [...inSkill].sort((a, b) => (b.cases ?? 1) - (a.cases ?? 1) || (a.key < b.key ? -1 : 1))[0]
  return { key: best.key, address: best.address }
}

/** harmoniseOf(name, desc) → the skill this app's declared purpose falls under, or null. Pure, first match
 *  wins. Matching on BOTH the name and Alpine's own description is deliberate: a name alone is too terse
 *  ('cal', 'sox') and a description alone drifts with packaging prose. */
export function harmoniseOf(name: string, desc: string): { skill: string; why: string } | null {
  const subject = `${name} ${desc}`
  for (const [pattern, skill, why] of HARMONIES) if (pattern.test(subject)) return { skill, why }
  return null
}

/** portApp(pkg, repo, branch, arch) → the app as a uuidna identity, harmonised if the ledger has arithmetic for
 *  it. A package whose matched skill holds no sealed theorem comes back UNHARMONISED rather than bound to
 *  nothing — the binding is to a proof or it is not a binding. */
export function portApp(p: IndexPackage, repo: string, branch: string, arch: string): AppPort {
  const base = uuidnaPackage({ name: p.name, version: p.version, arch, repo, branch, checksum: p.checksum })
  const h = harmoniseOf(p.name, p.desc)
  const w = h ? witnessFor(h.skill) : null
  return {
    ...base,
    desc: p.desc,
    skill: w ? (h as { skill: string }).skill : null,
    theorem: w ? w.key : null,
    theoremAddress: w ? w.address : null,
    why: w && h ? h.why : null,
    hexbits: compileToHexbits(base.address),
  }
}

export interface SkillTally {
  skill: string
  theorem: string
  /** published packages bound to this skill — every subpackage variant counted */
  apps: number
  /** DISTINCT projects behind them, once -doc/-dev/-dbg/-libs/-static are folded away. The smaller, truer number. */
  origins: number
  fold: string
}

export interface AppCatalogue {
  branch: string
  repos: string[]
  arch: string
  /** every application in the published index that was ported — the whole catalogue, not a selection */
  count: number
  /** distinct projects behind those packages, subpackage variants folded away — the count of THINGS */
  origins: number
  harmonised: number
  harmonisedOrigins: number
  unharmonised: number
  /** per skill, how many apps bound to it and the fold of their addresses */
  bySkill: SkillTally[]
  /** THE PROOF OF THE SET: the order-invariant fold of every ported address. A twenty-thousand-row derived file
   *  is not reviewable and would not be read; this root is what a reader recomputes from the same index to show
   *  they hold exactly the same catalogue. */
  root: string
  /** a bounded, deterministic sample so a reader can see the shape without the file carrying the whole index */
  sample: AppPort[]
  hexbitsPerApp: number
  honest: string
}

const HONEST =
  'PROVENANCE, NEVER EXECUTION. Every entry is Alpine\'s own published metadata — name, version, arch, repo, ' +
  'branch, and Alpine\'s own checksum — folded to a content-address anyone with the same index recomputes. ' +
  'uuidna does not install, link, unpack, boot or run any of these packages, and holds none of their bytes. ' +
  'HARMONISED means the ledger has sealed arithmetic for what the app declares it does, and the heaviest ' +
  'theorem of that skill is bound to it as a witness; it does NOT mean the app was verified, tested, or proven ' +
  'correct — nothing here inspects an app\'s code. UNHARMONISED is the honest majority and is counted, not ' +
  'hidden: a scheme that found a theorem for everything would have said nothing.'

/** SAMPLE_SIZE apps are carried in full, chosen by address order so the sample is a function of the catalogue
 *  rather than of whoever ran the generator. */
const SAMPLE_SIZE = 24

/** portCatalogue(packages, …) → the whole published catalogue as uuidna identities, harmonised where the ledger
 *  has the arithmetic. Deterministic: the same index in, the same root and the same sample out. */
export function portCatalogue(
  packages: readonly IndexPackage[],
  repos: readonly string[],
  branch = 'latest-stable',
  arch = 'x86_64',
  repoOf: (p: IndexPackage) => string = () => repos[0] ?? 'main',
): AppCatalogue {
  const ports = packages.map((p) => portApp(p, repoOf(p), branch, arch))
  const harmonised = ports.filter((p) => p.theorem !== null)

  const tallies = new Map<string, AppPort[]>()
  for (const p of harmonised) {
    const list = tallies.get(p.skill as string) ?? []
    list.push(p)
    tallies.set(p.skill as string, list)
  }
  const bySkill: SkillTally[] = [...tallies.entries()]
    .map(([skill, apps]) => ({
      skill,
      theorem: apps[0].theorem as string,
      apps: apps.length,
      origins: new Set(apps.map((a) => originOf(a.name))).size,
      fold: merkleGravity(apps.map((a) => a.address)),
    }))
    .sort((a, b) => b.origins - a.origins || (a.skill < b.skill ? -1 : 1))

  return {
    branch,
    repos: [...repos],
    arch,
    count: ports.length,
    origins: new Set(ports.map((p) => originOf(p.name))).size,
    harmonised: harmonised.length,
    harmonisedOrigins: new Set(harmonised.map((p) => originOf(p.name))).size,
    unharmonised: ports.length - harmonised.length,
    bySkill,
    root: merkleGravity(ports.map((p) => p.address)),
    sample: [...ports].sort((a, b) => (a.address < b.address ? -1 : 1)).slice(0, SAMPLE_SIZE),
    hexbitsPerApp: UUID_HEXBITS,
    honest: HONEST,
  }
}

/** the address of a catalogue as a whole — its root, its counts and the world it was read from */
export const catalogueAddress = (c: AppCatalogue): string =>
  toUuid(`alpine-apps|${c.branch}|${c.repos.join('+')}|${c.arch}|${c.count}|${c.harmonised}|${c.root}`)

// ── THE LIVE READ — non-deterministic by design, and honest only here ────────────────────────────────────────

const parseIndex = (apkindex: string): IndexPackage[] =>
  apkindex.split('\n\n').filter((r) => r.includes('P:')).map((r) => {
    const g = (k: string) => (r.match(new RegExp(`^${k}:(.+)$`, 'm')) || [])[1] ?? ''
    return { name: g('P'), version: g('V'), checksum: g('C'), desc: g('T') }
  }).filter((p) => p.name && p.version && p.checksum)
// THE GZIP MEMBER SEARCH MOVED DOWN A LAYER, and the move is the finding rather than a tidy-up. It was defined
// HERE, and os/packages and os/installs — which import from this module and so could not import it back without
// a cycle — each kept their own whole-buffer decode and returned an empty catalogue for every live index. The
// cure existed in the tree and was unreachable from the two places that needed it. It now lives beside
// untarMember in os/packages, where every layer can reach it; re-exported here so existing callers are unmoved.
export { untarGzipMember } from '../packages/index.js'

/** fetchRepoIndex(repo, branch, arch) → every package Alpine publishes in one repository, right now. Network +
 *  the platform's own gunzip + the pure-TS untar os/packages already owns; the document is DATA and is parsed,
 *  never run. Best-effort and honest: a down mirror or a shape drift yields [], never a fabricated checksum. */
export async function fetchRepoIndex(repo = 'main', branch = 'latest-stable', arch = 'x86_64'): Promise<IndexPackage[]> {
  try {
    const gz = new Uint8Array(await (await fetch(`${CDN}/${branch}/${repo}/${arch}/APKINDEX.tar.gz`)).arrayBuffer())
    return parseIndex(await untarGzipMember(gz, 'APKINDEX'))
  } catch {
    return []
  }
}

/** fetchCatalogue(repos, branch, arch) → the published catalogue across repositories, ported and harmonised.
 *  Returns null when EVERY repository came back empty, so a caller can tell "the mirror is down" from "Alpine
 *  publishes nothing" — the two must never render the same, and an empty catalogue must never be sealed as a
 *  result. */
export async function fetchCatalogue(
  repos: readonly string[] = ['main', 'community'],
  branch = 'latest-stable',
  arch = 'x86_64',
): Promise<AppCatalogue | null> {
  const owner = new Map<string, string>()
  const all: IndexPackage[] = []
  for (const repo of repos) {
    const packages = await fetchRepoIndex(repo, branch, arch)
    for (const p of packages) if (!owner.has(p.name)) { owner.set(p.name, repo); all.push(p) }
  }
  if (!all.length) return null
  return portCatalogue(all, repos, branch, arch, (p) => owner.get(p.name) ?? repos[0] ?? 'main')
}

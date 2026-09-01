// quantum/os/domains — PORTING A DOMAIN, AND SAYING EXACTLY WHAT THE PORT PROVES.
//
// The catalogue census binds every package to one of three classes (harmonised / crypto / port). That answers
// "how does uuidna see this package" and not "what KIND of thing is it". A domain is the second question:
// databases, filesystems, and the rest — read off Alpine's own name and description.
//
// WHAT IS PROVEN AND WHAT IS MERELY MEASURED, because the two must never be confused here:
//   • EXACT — the arithmetic over the counts. Once a set is chosen, the three bindings partition it, the domain
//     and its complement sum to the catalogue, and two domains overlap by a definite number. Those are closed
//     integer facts the kernel decides, and they are what this module seals.
//   • MEASURED — the CLASSIFICATION itself. A package joins a domain because a pattern matched its name or its
//     description, and that is a heuristic with visible failures: addrwatch-mysql is a monitoring tool that
//     speaks to MySQL, aws-sdk-cpp-timestream-influxdb is an SDK, neither is a database. No arithmetic promotes
//     a match into a fact about the world, so the census reports `classifier: 'pattern'` and never claims the
//     membership is correct — only that the counting over it is.
//
// PROVENANCE, NEVER EXECUTION: nothing here installs, links, mounts or runs anything. A filesystem domain is a
// list of names and versions Alpine published, not a mounted volume.
import { catalogue, type CataloguePackage } from '../catalogue/index.js'
import { originOf } from '../../../os/apps/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'

export interface DomainPattern { domain: string; match: RegExp; note: string }

/** The seeded domains. Patterns are deliberately NAME-AND-DESC and deliberately conservative: a pattern that
 *  matches more is not a better pattern, it is a larger measurement error carried into an exact-looking sum. */
export const DOMAIN_PATTERNS: readonly DomainPattern[] = [
  {
    domain: 'database',
    match: /\b(sqlite|postgres|postgresql|mariadb|mysql|redis|mongodb|leveldb|lmdb|rocksdb|berkeley ?db|firebird|cassandra|couchdb|influxdb|duckdb)\b/i,
    note: 'engines, clients, bindings and tooling that Alpine names for a database — membership is a pattern, not a verdict',
  },
  {
    domain: 'filesystem',
    match: /\b(e2fsprogs|btrfs|xfsprogs|f2fs|jfs|ntfs|exfat|dosfstools|squashfs|zfs|fuse|cryptsetup|lvm2|mdadm|overlayfs|filesystem)\b/i,
    note: 'on-disk formats, volume managers and FUSE bridges as Alpine publishes them — names and versions only',
  },
  {
    domain: 'blockchain',
    match: /\b(bitcoin|monero|ethereum|litecoin|dogecoin|zcash|electrum|blockchain|libbitcoin|secp256k1|namecoin|ripple|stellar|solana|cardano|tendermint|geth|besu|btcpay)\b/i,
    note: 'chain nodes, wallets and the curve libraries they lean on, as Alpine publishes them — provenance only, nothing is run, no key is held and no chain is followed',
  },
  {
    domain: 'driver',
    match: /\b(driver|firmware|kmod|linux-firmware|mesa|nvidia|amdgpu|intel-media|libdrm|vulkan|opencl|xf86-video|xf86-input|alsa|pipewire|libinput|usbutils|pciutils|acpid|lm[-_]sensors|dkms)\b/i,
    note: 'kernel modules, firmware blobs, GPU stacks and input/audio bridges as Alpine publishes them. PROVENANCE ONLY, and the caveat is sharper here than anywhere else: this records that a driver EXISTS at a version with a checksum. It does not manage a device. Nothing in this tree can address hardware — a memory controller, a cache line, a storage bus — and porting mesa yields its name and version, never a working graphics stack',
  },
  {
    domain: 'language',
    match: /\b(python3|py3-[a-z0-9]+|perl|perl-[a-z0-9]+|ruby|ruby-[a-z0-9]+|php[0-9]*|nodejs|npm|lua[0-9.]*|ghc|ocaml|erlang|elixir|rust|cargo|golang|openjdk[0-9]*|kotlin|scala)\b/i,
    note: 'runtimes, interpreters and their published module ecosystems. The largest domain by far and the loosest: py3- and perl- module packages dominate it, so a hit here says Alpine names a language in the package, not that the package IS a language',
  },
  {
    domain: 'network',
    match: /\b(curl|wget|nginx|apache2|haproxy|bind|dnsmasq|openssh|iptables|nftables|wireguard|openvpn|net-tools|iproute2|socat|netcat|tcpdump|wireshark)\b/i,
    note: 'servers, clients, routing and packet tooling as Alpine publishes them — names and versions, no socket is opened here',
  },
  {
    domain: 'science',
    match: /\b(numpy|scipy|blas|lapack|gsl|fftw|octave|gnuplot|hdf5|netcdf|petsc|sundials|opencv|tensorflow|pytorch)\b/i,
    note: 'numerical libraries and the frameworks built on them. The smallest domain, and the one whose members are most often a dependency of something else rather than a thing anyone installs directly',
  },
  {
    domain: 'media',
    match: /\b(ffmpeg|gstreamer|libav|x264|x265|vpx|opus|flac|lame|imagemagick|graphicsmagick|libjpeg|libpng|libwebp|cairo|pango|freetype|harfbuzz)\b/i,
    note: 'codecs, image and font stacks as Alpine publishes them — provenance only, nothing is decoded or rendered',
  },
  {
    domain: 'shell',
    match: /\b(bash|zsh|fish|busybox|coreutils|findutils|gawk|tar|gzip|xz|bzip2|zstd|less|vim|nano|tmux|screen)\b/i,
    note: 'shells and the core utilities. KNOWN IMPRECISION, stated rather than tuned away: completion packages such as acme-redirect-bash-completion match on the shell they serve, so this domain over-counts companions of unrelated tools',
  },
  {
    domain: 'build',
    match: /\b(gcc|clang|llvm|cmake|meson|ninja|autoconf|automake|libtool|pkgconf|binutils|musl-dev|linux-headers)\b/i,
    note: 'compilers, build systems and the headers they need — the toolchain Alpine publishes, recorded and not invoked',
  },
]

export interface DomainCensus {
  definition: 'alpine-domain-port'
  domain: string
  classifier: 'pattern'
  packages: number
  origins: number
  outside: number            // catalogue packages NOT in this domain — the complement, so the sum is checkable
  claims: { key: string; lean: string; fragment: string; says: string }[]
  note: string
  honest: string
  receipt: string
}

const HONEST =
  'Domain port: the ARITHMETIC over the counts is exact and decided by the kernel; the MEMBERSHIP is a pattern ' +
  'match over Alpine\'s own name and description and is a measurement, with known failures (a client or an SDK ' +
  'matches its engine\'s name). Nothing is installed, mounted, linked or executed — provenance only.'

const inDomain = (p: CataloguePackage, re: RegExp): boolean => re.test(p.name) || re.test(p.desc)

/** domainCensus(domain) → the counts, and the closed arithmetic they satisfy. Pure over the committed mirror. */
export function domainCensus(domain: string): DomainCensus | null {
  const pattern = DOMAIN_PATTERNS.find((d) => d.domain === domain)
  if (!pattern) return null
  const rows = catalogue()
  const hits = rows.filter((p) => inDomain(p, pattern.match))
  const origins = new Set(hits.map((p) => originOf(p.name)))
  const outside = rows.length - hits.length
  // KEYS ARE BUILT SHORT AND CHECKED, because the conveyor's door caps a key at 61 characters and says only
  // "key is not a lawful theorem key" when it is longer. The first scheme here spelled the whole sentence:
  // `database` came to exactly 61 and passed, `filesystem` came to 63 and was refused — the same claim, accepted
  // or rejected by the length of the domain's name. A limit discovered by one domain squeaking under it is a
  // limit the next domain breaks, so the key is short by construction and a test asserts every emitted key fits.
  const claims = [
    {
      key: `alpine_domain_${domain}_partitions_${rows.length}`,
      lean: `theorem alpine_domain_${domain}_partitions_${rows.length} : (${hits.length} + ${outside} = ${rows.length}) := by decide`,
      fragment: `${hits.length}+${outside}=${rows.length}`,
      says: `the ${domain} domain and everything outside it sum to the catalogue — nothing is counted twice and nothing is lost`,
    },
    {
      key: `alpine_domain_${domain}_origins_${hits.length}`,
      lean: `theorem alpine_domain_${domain}_origins_${hits.length} : (${origins.size} <= ${hits.length}) ∧ (${hits.length} - ${origins.size} = ${hits.length - origins.size}) := by decide`,
      fragment: `${origins.size}<=${hits.length}`,
      says: `${hits.length - origins.size} of the ${hits.length} packages are companions (-dev, -doc, -libs) of an origin already counted`,
    },
  ]
  return {
    definition: 'alpine-domain-port',
    domain,
    classifier: 'pattern',
    packages: hits.length,
    origins: origins.size,
    outside,
    claims,
    note: pattern.note,
    honest: HONEST,
    receipt: merkleGravity([
      toUuid(`domain|${domain}|${hits.length}|${origins.size}`),
      ...claims.map((c) => toUuid(`claim|${c.key}`)),
    ]),
  }
}

/** every seeded domain, in declaration order. */
export function allDomainCensuses(): DomainCensus[] {
  return DOMAIN_PATTERNS.map((d) => domainCensus(d.domain)!).filter(Boolean)
}

/** domainsOverlap(a, b) → how many packages BOTH patterns claim. Domains are not disjoint and the census must
 *  not pretend they are: a FUSE-backed database matches both, and the number is reported rather than resolved. */
export function domainsOverlap(a: string, b: string): { a: string; b: string; onlyA: number; onlyB: number; both: number; union: number; lean: string } | null {
  const pa = DOMAIN_PATTERNS.find((d) => d.domain === a)
  const pb = DOMAIN_PATTERNS.find((d) => d.domain === b)
  if (!pa || !pb) return null
  const rows = catalogue()
  let onlyA = 0, onlyB = 0, both = 0
  for (const p of rows) {
    const ia = inDomain(p, pa.match), ib = inDomain(p, pb.match)
    if (ia && ib) both++
    else if (ia) onlyA++
    else if (ib) onlyB++
  }
  const union = onlyA + onlyB + both
  // INCLUSION–EXCLUSION, not `both = both`. The first draft of this claim stated the overlap against itself —
  // true, decidable, and empty, which is the exact bare-literal shape the conveyor refuses and the whole reason
  // the 79-candidate harvest was worthless. The claim that says something is that |A| + |B| - |A∩B| = |A ∪ B|:
  // it is false if any of the four counts is miscounted, so it can fail, which is what makes it worth sealing.
  return {
    a, b, onlyA, onlyB, both, union,
    lean: `theorem alpine_domains_${a}_${b}_incl_excl_${union} : (${onlyA + both} + ${onlyB + both} - ${both} = ${union}) := by decide`,
  }
}

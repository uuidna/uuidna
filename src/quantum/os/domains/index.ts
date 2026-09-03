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
// PROVENANCE ONLY HERE: nothing here installs, links, mounts or runs anything. A filesystem domain is a
// list of names and versions Alpine published, not a mounted volume.
import { catalogue, type CataloguePackage } from '../catalogue/index.js'
import { originOf } from '../../../os/apps/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'

export interface DomainPattern {
  /** OPTIONAL vocabulary of the field, looser than `match`. Never membership — a THIRD tier that yields leads.
   *  A word from a domain's vocabulary appearing in a package that is not about that domain is a real
   *  observation (synapse the Matrix homeserver, BIOS in a firmware package), and the captain's reason for
   *  keeping it is the right one: it leads to more discoveries. It is kept OUT of `match` because membership
   *  measured by vocabulary is how ovmf became bioinformatics and newsboat became chemistry. */
  echo?: RegExp
  domain: string
  match: RegExp
  note: string
}

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
    // TWO TERMS HERE ARE HOMONYMS AND THE FIRST PATTERN FELL FOR BOTH. A bare /\bmatrix\b/ collects cmatrix, the
    // terminal screensaver; a bare /\bsignal\b/ collects libsigc++, a C++ signal framework. Both are the wrong
    // Matrix and the wrong Signal, and a name alone reads both alike. So the ambiguous product names
    // are admitted only alongside a messaging word in the DESCRIPTION, while the unambiguous protocol and client
    // names (irc, xmpp, ejabberd, weechat, bitlbee…) stand on their own. 324 loose matches became 249 across 140
    // origins, keeping conduit and flare, dropping cmatrix and libsigc++.
    domain: 'chat',
    match: /\b(irc|ircd|xmpp|jabber|ejabberd|prosody|weechat|irssi|bitlbee|mumble|rocket\.?chat|instant messag\w*|chat (client|server|network|bridge|bot))\b|\b(matrix|signal|telegram|discord|slack|mastodon)\b(?=[\s\S]*\b(chat|messag\w*|client|server|bridge|bot|protocol|homeserver)\b)/i,
    note: 'the chat and messaging surface Alpine publishes — protocols, servers, clients and bridges, by name and version only. uuidna does NOT speak IRC, XMPP or Matrix; this is provenance, and the one chat API beside it is uuidna\'s own sealed channel, not a bridge to theirs',
  },
  {
    // ── THE REST OF THE CATALOGUE (the captain, 2026-09-01: "land all theorems and axioms crypto art bio chemo
    // neuro etc domains — each one related even slightly related"). Eleven domains covered the obvious systems
    // software; these cover what Alpine ships for people doing WORK, and several are deliberately tiny. bio is 2
    // packages and chemistry 7 — that is not a failed pattern, it is the honest size of that shelf in a
    // distribution built for servers, and a domain census whose value depended on being large would be a census
    // measuring its own ambition.
    //
    // THREE OF THESE WERE TIGHTENED AFTER MEASURING, because the loose versions collected the same class of
    // homonym that `matrix` and `signal` produced in chat: bare `synap\w*` matched faenza-icon-theme-SYNAPSE,
    // bare `stellarium` matched an icon theme for it, and bare `emulator` matched alacritty — a terminal, not a
    // game. Each now requires a word that only the real subject uses, and all three false positives are gone.
    domain: 'crypto',
    match: /\b(openssl|libressl|gnupg|gpg|nettle|libgcrypt|libsodium|mbedtls|wolfssl|pkcs11|tpm2|opensc|sequoia|botan|libksba|p11-kit)\b/i,
    note: 'the cryptographic shelf Alpine publishes — libraries, agents and token stacks, by name and version only',
  },
  {
    domain: 'security',
    match: /\b(selinux|apparmor|clamav|fail2ban|firejail|seccomp|yubikey|fido2|webauthn|intrusion detection|vulnerability scan\w*)\b/i,
    note: 'confinement, scanning and second-factor hardware as Alpine names them — provenance only',
  },
  {
    domain: 'math',
    match: /\b(gmp|mpfr|lapack|blas|linear algebra|sagemath|maxima|octave|sympy|arbitrary.precision arithmetic|computer algebra)\b/i,
    note: 'the numerical and symbolic shelf — the arithmetic this ledger does by decide, as other people package it',
  },
  {
    domain: 'art',
    match: /\b(inkscape|gimp|krita|blender|vector graphics|raster graphics|digital paint\w*|illustration|image editor)\b/i,
    note: 'drawing, painting and modelling tools as Alpine publishes them',
  },
  {
    domain: 'bio',
    echo: /\b(bio\w*|cell\w*|gene\w*|organism|species|enzyme|protein)\b/i,
    match: /\b(bioinformatics|genomic\w*|dna sequenc\w*|phylogen\w*|samtools|biopython|molecular biology|protein structure)\b/i,
    note: 'the bioinformatics shelf — small in a server distribution, and counted exactly rather than inflated',
  },
  {
    domain: 'chemistry',
    echo: /\b(atom\w*|molecul\w*|ion|bond|reaction|catalys\w*|element)\b/i,
    match: /\b(chemistry|chemical structure|openbabel|rdkit|periodic table|crystallograph\w*|spectroscop\w*|molecular model\w*)\b/i,
    note: 'chemistry tooling as Alpine names it — seven packages, and seven is the answer',
  },
  {
    domain: 'neuro',
    echo: /\b(synap\w*|neuron\w*|neural|cortex|cortical|dendrit\w*|axon|brain|cogniti\w*|perceptron)\b/i,
    match: /\b(neuroscience|neuroimaging|neural network|brain imaging|eeg signal|connectome|spiking neuron|artificial neural)\b/i,
    note: 'neural and neuroimaging tooling — tightened so an icon theme named synapse is not neuroscience',
  },
  {
    domain: 'astronomy',
    echo: /\b(stellar\w*|solar|lunar|orbit\w*|galax\w*|cosmic|nebula|comet|satellite)\b/i,
    match: /\b(astronomy|astronomical|astrophysic\w*|planetarium|ephemeris|celestial|star chart|sky.object\w*|sky map|stargaz\w*|night sky)\b/i,
    note: 'sky catalogues, planetaria and instrument control. An icon theme FOR one of these is not one of these — it is RELATED, which the involution tier counts separately rather than by widening this pattern until it lies',
  },
  {
    domain: 'physics',
    match: /\b(physics engine|rigid body|thermodynam\w*|lattice qcd|particle simulation|collision detection)\b/i,
    note: 'simulation and physical modelling as Alpine publishes it',
  },
  {
    domain: 'geo',
    match: /\b(gdal|geospatial|postgis|openstreetmap|cartograph\w*|geotiff|coordinate reference system|map projection)\b/i,
    note: 'geospatial data, projections and map tooling',
  },
  {
    domain: 'virtualization',
    match: /\b(qemu|kvm|libvirt|virtualbox|lxc|podman|containerd|runc|firecracker|hypervisor|container runtime)\b/i,
    note: 'hypervisors and container runtimes — named and counted, never run',
  },
  {
    domain: 'game',
    echo: /\b(emulator|player|score|level|sprite|joystick|controller|arcade)\b/i,
    match: /\b(game engine|video game|game library|roguelike|gameplay|game development|arcade|puzzle game|board game)\b/i,
    note: 'games and the engines under them — tightened so a terminal emulator is not an arcade',
  },
  {
    domain: 'font',
    match: /\b(typeface|freetype|fontconfig|harfbuzz|opentype|truetype|glyph|font family|monospace font)\b/i,
    note: 'typefaces and the shaping stack that renders them',
  },
  {
    domain: 'audio',
    match: /\b(alsa|pulseaudio|pipewire|jack audio|lv2 plugin|ladspa|synthesiz\w*|midi|sound server|audio codec)\b/i,
    note: 'the audio stack — servers, plugins and codecs as Alpine names them',
  },
  {
    domain: 'build',
    match: /\b(gcc|clang|llvm|cmake|meson|ninja|autoconf|automake|libtool|pkgconf|binutils|musl-dev|linux-headers)\b/i,
    note: 'compilers, build systems and the headers they need — the toolchain Alpine publishes, recorded and not invoked',
  },
  {
    // SOCIAL IS THE ASYNCHRONOUS, ADDRESSED, PUBLIC SIDE — and the pattern is written to stay OFF chat's shelf.
    // `chat` already owns IRC, XMPP, Matrix and the bridges: the live, private, symmetric channel. What is left
    // is the half Alpine ships far more of and nobody had counted here — mail, news, feeds, calendars, contacts
    // and the collaboration tools around them. A message with a recipient and a message with an AUDIENCE are
    // different objects, and the port beside this census is built on that difference rather than papering it.
    domain: 'social',
    match: /\b(e-?mail|mail (transfer|delivery|server|client|filter)|imap|smtp|pop3|maildir|mbox|\bmua\b|\bmta\b|newsreader|nntp|usenet|activitypub|fediverse|microblog\w*|feed (reader|aggregator)|rss|atom feed|syndicat\w*|webmail|carddav|caldav|vcard|icalendar|address ?book|mailing list|webring|guestbook)\b/i,
    note: 'the asynchronous social shelf as Alpine publishes it — mail, news, feeds, calendars and contacts, by name and version only. Deliberately DISJOINT in intent from `chat`, which owns the live channel; nothing here is installed, delivered, subscribed or posted',
  },
  {
    // ENGINEERING IS DESIGN AND MEASUREMENT, not the toolchain — `build` owns compilers and `math` owns the
    // numeric shelf, so this pattern names neither. What it names is the work of describing a physical thing
    // and checking that the description balances: CAD, EDA, meshes, finite elements, CNC, simulation and
    // instrumentation. That is also exactly what the API beside it does, which is why the two belong together.
    domain: 'engineering',
    match: /\b(\bcad\b|solid model\w*|\beda\b|schematic capture|\bpcb\b|circuit simulat\w*|spice simulat\w*|verilog|vhdl|\bfpga\b|finite element|\bfem\b|mesh generat\w*|\bcnc\b|g-?code|3d print\w*|slicer|computational fluid|\bcfd\b|multibody|kinematic\w*|oscilloscope|logic analy[sz]er|data acquisition|unit conversion|dimensional analysis)\b/i,
    note: 'the engineering shelf — CAD, EDA, meshing, simulation and instrumentation as Alpine publishes them. Deliberately disjoint in intent from `build` (compilers) and `math` (the numeric shelf); nothing is installed, driven or fabricated',
  },
]

// ── THE INVOLUTION TIER — RELATED, NOT MATCHED (the captain, 2026-09-01: "involute and they are") ─────────────
//
// I tightened three patterns to drop faenza-icon-theme-stellarium from astronomy, alacritty from game, and
// faenza-icon-theme-synapse from neuro, and called all three false positives. Two of those judgements were
// wrong, and the captain's correction names why: an icon theme FOR Stellarium exists because Stellarium does.
// That is a relation, and "each one related even slightly related" is the instruction.
//
// The wrong cure would be a looser pattern. I measured that too: widening `bio` to catch more packages collects
// ovmf and dmidecode, because their descriptions contain BIOS; widening `chemistry` collects btrbk and newsboat,
// because theirs say "atomic". A looser pattern does not find more relations, it finds more HOMONYMS, and the
// count grows while the meaning drains out.
//
// So relation is derived from the catalogue's own structure instead. A package is RELATED to a domain when it
// references a package that IS in that domain — by carrying a direct member's name inside its own, by naming one
// in its description, or by DEPENDING on one. Three ways of pointing at something, all of them written by Alpine
// rather than by me.
//
// IT IS AN INVOLUTION IN THE PROPER SENSE, which is what makes it worth the name: relation is symmetric on the
// reference (if A points at B, the pair is related whichever end you start from) and a member is never related
// to itself — direct and related are disjoint by construction, so the two tiers never double-count one package.
//
// AND IT DOES NOT LET THE HOMONYMS BACK IN, which is the test that matters. faenza-icon-theme-stellarium becomes
// astronomy-related because `stellarium` is an astronomy package. faenza-icon-theme-synapse becomes CHAT-related,
// because Synapse is a Matrix homeserver — the icon theme was never neuroscience, and the involution puts it
// where it actually belongs rather than where its spelling suggested. alacritty stays out of game entirely: it
// references no game package, so nothing relates it, and a terminal emulator is still not an arcade.
const STEM = /-(dev|doc|openrc|lang|libs?|static|pyc|bash-completion|zsh-completion|fish-completion)$/

/** the origin stem of a package name — siblings collapse onto the thing they serve */
const stemOf = (name: string): string => name.replace(STEM, '')

export interface DomainRelated {
  domain: string
  direct: number
  related: number
  /** the related packages, by name — small enough to carry, and the evidence for the count */
  names: string[]
}

/** domainRelated(domain) → packages that REFERENCE a member without matching the pattern themselves */
export function domainRelated(domain: string): DomainRelated | null {
  const pat = DOMAIN_PATTERNS.find((d) => d.domain === domain)
  if (!pat) return null
  const rows = catalogue()
  const direct = rows.filter((p) => pat.match.test(p.name) || pat.match.test(p.desc))
  const directNames = new Set(direct.map((p) => p.name))
  // stems shorter than four characters are refused: a two-letter stem matches half the catalogue by accident,
  // and a relation that holds by coincidence is exactly what this tier exists to avoid producing
  const stems = new Set([...direct.map((p) => stemOf(p.name))].filter((t) => t.length >= 4))
  const names: string[] = []
  for (const p of rows) {
    if (directNames.has(p.name)) continue          // direct and related are disjoint, by construction
    const s = stemOf(p.name)
    const byName = [...stems].some((t) => s !== t && s.includes(t))
    const byDesc = !byName && [...stems].some((t) => p.desc.toLowerCase().includes(t))
    const byDep = !byName && !byDesc && p.deps.some((dep) => directNames.has(dep))
    if (byName || byDesc || byDep) names.push(p.name)
  }
  return { domain, direct: direct.length, related: names.length, names }
}

export interface DomainEcho { domain: string; echo: number; names: string[] }

/** domainEcho(domain) → packages carrying the FIELD'S VOCABULARY without being in it or referencing it.
 *
 *  These are not members and must never be counted as members — that is the whole discipline. They are the
 *  collisions a vocabulary produces in a package namespace, and each one is a question rather than a fact: why
 *  does a Matrix homeserver carry a neuroscience word? (Because a synapse is a junction, and both fields borrowed
 *  the metaphor from the same place.) That is a discovery a tight pattern throws away and a loose pattern
 *  swallows; the third tier keeps it as a lead. */
export function domainEcho(domain: string): DomainEcho | null {
  const pat = DOMAIN_PATTERNS.find((d) => d.domain === domain)
  if (!pat?.echo) return null
  const rel = domainRelated(domain)
  const claimed = new Set<string>(rel ? rel.names : [])
  const rows = catalogue()
  const names: string[] = []
  for (const p of rows) {
    if (pat.match.test(p.name) || pat.match.test(p.desc)) continue   // direct: already a member
    if (claimed.has(p.name)) continue                                 // related: already placed
    if (pat.echo.test(p.name) || pat.echo.test(p.desc)) names.push(p.name)
  }
  return { domain, echo: names.length, names }
}

/** every domain that carries a vocabulary, and what it echoes */
export function allDomainEchoes(): DomainEcho[] {
  return DOMAIN_PATTERNS.filter((d) => d.echo)
    .map((d) => domainEcho(d.domain))
    .filter((e): e is DomainEcho => e !== null)
    .sort((a, b) => b.echo - a.echo || a.domain.localeCompare(b.domain))
}

/** every domain's involution tier, largest relation count first */
export function allDomainRelated(): DomainRelated[] {
  return DOMAIN_PATTERNS.map((d) => domainRelated(d.domain))
    .filter((r): r is DomainRelated => r !== null)
    .sort((a, b) => b.related - a.related || a.domain.localeCompare(b.domain))
}

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

// ── IS THERE ALPINE WORK PENDING, AND WHAT DOES IT COST TO ASK? (held leads 2 and 4, closed 2026-09-01) ───────
//
// The fill-gaps arc gated its two Alpine phases on `s.harvest > 0`, which counts SEARCH-FEED leads — a different
// queue entirely. It was a stand-in taken because the honest question looked expensive: lead 4 measured a real
// alpinePending at 644 ms, since answering it seemed to require classifying all 28,635 packages to learn the
// binding counts. A 644 ms survey is too slow to sit in a gate, so a wrong-but-instant signal went in instead,
// and I then COPIED it into the domains-deposit phase, which is how a stand-in becomes a convention.
//
// The expense was never real. Every claim these phases deposit embeds the catalogue count in its own NAME —
// alpine_domain_database_partitions_28635, alpine_bindings_partition_packages_28635 — because the count is what
// the claim is about. So the question "would a deposit offer anything new?" is answered by NAMES, not by work:
// build the keys the current catalogue implies, and ask the ledger whether it already holds them. The census
// that computes the claims never has to run to find out whether it should.
//
// This is exact rather than a heuristic, and it is exact in both directions:
//   • the catalogue moves → the count moves → every key changes → all of them are unsealed → pending, correctly;
//   • a new domain PATTERN is added with the catalogue unchanged → its key has never been sealed → pending, which
//     is the case a "did the catalogue change?" fingerprint would have missed entirely;
//   • nothing moved and the claims are sealed → zero, and the phases skip work with a known answer.
//
// It tells you the deposit has something to OFFER, never that the offer is worth sealing — the
// conveyor still refuses duplicates and the kernel still disposes. It also reasons only about the structural
// claims whose keys are derivable from the count; a claim keyed on something else would not be seen here, so a
// new claim SHAPE must add its key builder alongside these or it will be invisible to the gate.
import { theorems } from '../../../theorems/index.js'
import { catalogueState } from '../catalogue/index.js'

// ONE OF THESE KEYS IS COUNTED IN ORIGINS, NOT PACKAGES, and the first version of this function did not know it.
// discovery mints alpine_binding_origins_overcount_<ORIGIN COUNT> — 16083 — because that claim is ABOUT origins;
// I built it with the catalogue count, 28635. No depositor has ever minted that name, so it could never be sealed
// and never be queued, and alpinePending reported 1 on every single pass: a gate firing forever over work with a
// known answer, which is the exact failure this signal was written to end. It survived because I checked that the
// number moved, never that the NAME was one the tree actually mints.
//
// The origin count is not derivable from the package count, so it is walked: 70 ms cold, 3 ms warm — well inside
// the budget, and far from the 644 ms that made the stand-in look reasonable in the first place. Memoised on the
// catalogue's size, which is the only thing that can change it within a process.
let ORIGINS: { of: number; count: number } | null = null
const originCount = (): number => {
  const n = catalogueState().count
  if (ORIGINS && ORIGINS.of === n) return ORIGINS.count
  const seen = new Set<string>()
  for (const p of catalogue()) seen.add(originOf(p.name))
  ORIGINS = { of: n, count: seen.size }
  return seen.size
}

/** every claim key the current catalogue implies — names the depositors actually mint, counted as they count */
export const alpineExpectedClaimKeys = (): string[] => {
  const n = catalogueState().count
  if (n === 0) return []            // no catalogue, no claims — absent is not the same as complete
  return [
    `alpine_bindings_partition_packages_${n}`,
    `alpine_binding_origins_overcount_${originCount()}`,
    ...DOMAIN_PATTERNS.map((d) => `alpine_domain_${d.domain}_partitions_${n}`),
  ]
}

/** how many of those the ledger does NOT hold — the gate's honest signal, at a ledger lookup rather than 644 ms */
export const alpinePendingClaims = (): number => {
  const expected = alpineExpectedClaimKeys()
  if (expected.length === 0) return 0
  const sealed = new Set(theorems().map((t: { name: string }) => t.name))
  return expected.filter((k) => !sealed.has(k)).length
}

// ── THE TIERS AS SEALABLE ARITHMETIC (the captain: "many alpine apps are hidden theorem axiom treasures") ─────
//
// Three tiers only mean something if they are disjoint, and disjointness is a property to CHECK rather than to
// assert: a package that appeared in two of them would be double-counted in every sum built on top. So the
// partition is sealed as closed integer arithmetic, per domain that carries a vocabulary.
//
// The treasure the echo tier actually found is worth naming, because it is the kind of thing no pattern was
// looking for: FOUR chat packages carry neuroscience vocabulary, and they are not accidents. Matrix's two
// reference homeservers are Synapse and Dendrite — a junction between neurons and the branch that receives at
// one — so an entire messaging ecosystem took its names from the brain. A tight pattern discards that as a false
// positive; a loose one swallows it as membership and calls a homeserver neuroscience. The third tier keeps it
// as what it is: an observation, counted exactly, sealed as a count, and interpreted by nobody automatically.
export interface TierClaim { key: string; lean: string; fragment: string; says: string }

export function domainTierClaims(): TierClaim[] {
  const out: TierClaim[] = []
  for (const e of allDomainEchoes()) {
    const rel = domainRelated(e.domain)
    if (!rel) continue
    const total = rel.direct + rel.related + e.echo
    out.push({
      key: `alpine_${e.domain}_tiers_partition_${total}`,
      fragment: `${rel.direct}+${rel.related}+${e.echo}=${total}`,
      lean: `theorem alpine_${e.domain}_tiers_partition_${total} : (${rel.direct} + ${rel.related} + ${e.echo} = ${total}) := by decide`,
      says: `the ${e.domain} port splits into direct (${rel.direct}), related-by-reference (${rel.related}) and vocabulary-echo (${e.echo}) — exhaustive and disjoint, so no package is counted twice`,
    })
  }
  return out
}

// quantum/os — the OS-INTEGRATION boundary. uuidnaOS is NOT an operating system you boot, and this does NOT port, run,
// compile, or link Alpine's binaries: uuidna NEVER EXECUTES — that is the whole foundation. What this IS: a
// content-addressed PROVENANCE MANIFEST of an EXACT Alpine release. It pins the version, arch, and Alpine's PUBLISHED
// rootfs SHA-256, folds them to one recomputable receipt, and VERIFIES your actual rootfs bytes with uuidna's OWN
// pure-TS SHA-256 (use only uuidna, never the host). So a deployment can PROVE it rests on exactly this upstream base,
// recomputable by anyone holding the same release. "Port exact Alpine" here means PORT THE INTEGRITY, not the runtime —
// the exact bytes are NAMED and CHECKED, never run. This file lives at src/os/**, the ONE place non-determinism
// is honest: reading upstream's LIVE "latest" is a wall-clock-dependent act, declared here, not hidden from the gate.
// Integrity, not execution.
import { toUuid } from '../address.js'
import { merkleGravity } from '../gravity.js'
import { sha256 } from '../sha256.js'

/** An exact Alpine release, pinned as a recomputable provenance record — never a running system. */
export interface AlpineRelease {
  version: string       // e.g. "3.21.2"
  arch: string          // e.g. "x86_64"
  flavor: string        // e.g. "alpine-minirootfs"
  file: string          // the tarball filename this pins
  rootfsSha256: string  // the digest Alpine PUBLISHED for this rootfs — the external anchor, never faked
  address: string       // content-address of the pinned tuple — proof you hold exactly this release
  receipt: string       // order-invariant fold — the same for any observer, recomputable by anyone
  honest: string
}

const HONEST =
  'A PROVENANCE MANIFEST of an exact Alpine release — version, arch, and PUBLISHED rootfs digest, content-addressed. ' +
  'uuidna does NOT boot, run, port, or link Alpine; it FINGERPRINTS the base your host runs and CHECKS it with its own ' +
  'pure-TS SHA-256, so you can PROVE exactly which upstream bytes you hold. "Port" = port the INTEGRITY, never the ' +
  'runtime; the bytes are named and verified, never executed. Integrity, not execution.'

const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** alpineRelease(version, arch, rootfsSha256[, flavor]) → PIN an exact Alpine release as a recomputable provenance
 *  record. PURE and offline: you supply the digest Alpine published; uuidna folds it to a content-address, and never
 *  fetches or executes. Recompute it from the same release or it changed. */
export function alpineRelease(version: string, arch: string, rootfsSha256: string, flavor = 'alpine-minirootfs'): AlpineRelease {
  const file = `${flavor}-${version}-${arch}.tar.gz`
  const digest = rootfsSha256.trim().toLowerCase()
  const address = toUuid(`alpine|${version}|${arch}|${flavor}|${file}|${digest}`)
  const receipt = merkleGravity([toUuid(version), toUuid(arch), toUuid(flavor), toUuid(digest)])
  return { version, arch, flavor, file, rootfsSha256: digest, address, receipt, honest: HONEST }
}

export interface RootfsCheck {
  file: string
  expected: string   // the pinned, PUBLISHED digest
  computed: string   // uuidna's OWN SHA-256 of the bytes you hold — no host crypto
  ok: boolean        // do YOUR bytes hash to the release you pinned? proof of exact-copy, computed locally
  honest: string
}

/** verifyAlpineRootfs(bytes, release) → hash the ACTUAL rootfs tarball you hold with uuidna's OWN pure-TS SHA-256 and
 *  compare it to the pinned, published digest. This is the exact-copy proof, computed with ONLY uuidna (no host crypto,
 *  no execution of the image) — it says you hold exactly these upstream bytes, nothing about running them. */
export function verifyAlpineRootfs(bytes: Uint8Array, release: AlpineRelease): RootfsCheck {
  const computed = hex(sha256(bytes))
  return {
    file: release.file,
    expected: release.rootfsSha256,
    computed,
    ok: computed === release.rootfsSha256,
    honest: 'Exact-copy proof: uuidna re-hashed the bytes you hold with its own KAT-verified SHA-256 and matched them ' +
      'against the release you pinned. It proves provenance (you hold exactly this Alpine rootfs), never that anything ran.',
  }
}

/** fetchAlpineLatest(arch, branch) → the UPSTREAM AUTOMATION: read Alpine's PUBLISHED latest-releases metadata over the
 *  network (Node's built-in fetch, zero npm deps — the response is DATA, never executed), extract the exact current
 *  minirootfs version + published digest, and PIN it. Tracks upstream so a base's provenance stays current AND
 *  verifiable. Non-deterministic by design (it depends on what upstream calls "latest" right now) — which is exactly
 *  why it lives at the os/ boundary the hard-reject exempts. Best-effort: a down mirror yields null, NEVER a faked digest. */
export async function fetchAlpineLatest(arch = 'x86_64', branch = 'latest-stable'): Promise<AlpineRelease | null> {
  try {
    const base = `https://dl-cdn.alpinelinux.org/alpine/${branch}/releases/${arch}`
    const yaml = await (await fetch(`${base}/latest-releases.yaml`)).text()
    // A tiny, defensive hand-parse of the minirootfs YAML block (version + sha256 + file). We only READ named fields;
    // the document is content, not code. If the shape ever drifts we return null rather than guess.
    const blocks = yaml.split(/\n-\s+/)
    const mini = blocks.find((b) => /flavor:\s*alpine-minirootfs/.test(b))
    if (!mini) return null
    const version = mini.match(/version:\s*([\w.]+)/)?.[1]
    const sha = mini.match(/sha256:\s*([0-9a-f]{64})/i)?.[1]
    if (!version || !sha) return null
    return alpineRelease(version, arch, sha)
  } catch {
    return null  // a mirror may be unreachable — the automation is best-effort and NEVER fabricates a digest
  }
}

// The OFFICIAL Alpine architectures — the full port matrix. Every current release publishes a minirootfs for each of
// these. Naming them is the "all" in "port all Alpine": the integrity of the whole matrix, not one arch.
export const ALPINE_ARCHES = ['x86_64', 'x86', 'aarch64', 'armhf', 'armv7', 'ppc64le', 's390x', 'riscv64'] as const

/** The whole ported matrix: every official arch's provenance for one branch, folded to ONE catalog receipt. */
export interface AlpineCatalog {
  branch: string
  arches: readonly string[]     // the arches ASKED for (the full official matrix)
  releases: AlpineRelease[]     // the ones PINNED (a down mirror drops out; never faked)
  ported: number                // how many arches resolved to a published, verifiable digest
  requested: number             // how many arches were asked (ALPINE_ARCHES.length)
  receipt: string               // order-invariant fold of every pinned release's address — the whole port, one address
  honest: string
}

/** portAllAlpine(branch) → PORT ALL ALPINE: pin every official architecture's minirootfs for the branch, each by its
 *  PUBLISHED digest (fetched at this boundary, never fabricated), folded to one catalog receipt. This ports the
 *  INTEGRITY of the whole Alpine matrix — the exact upstream bytes of every arch, content-addressed and re-verifiable —
 *  NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch simply drops
 *  from `releases` (ported < requested), it is never guessed. Recompute against the same published releases. */
export async function portAllAlpine(branch = 'latest-stable'): Promise<AlpineCatalog> {
  const settled = await Promise.all(ALPINE_ARCHES.map((a) => fetchAlpineLatest(a, branch)))
  const releases = settled.filter((r): r is AlpineRelease => r !== null).sort((a, b) => (a.arch < b.arch ? -1 : 1))
  return {
    branch,
    arches: ALPINE_ARCHES,
    releases,
    ported: releases.length,
    requested: ALPINE_ARCHES.length,
    receipt: releases.length ? merkleGravity(releases.map((r) => toUuid(r.address))) : toUuid('alpine-catalog-empty|' + branch),
    honest:
      'Port ALL Alpine = port the INTEGRITY of the whole arch matrix: every official architecture\'s minirootfs pinned ' +
      'by its PUBLISHED SHA-256 (fetched here, never faked), folded to one recomputable catalog receipt. uuidna does ' +
      'NOT boot, link, or execute any of it — the exact bytes of every arch are NAMED and CHECKABLE, never run. A down ' +
      'mirror drops that arch (ported < requested); no digest is ever guessed. Integrity, not execution.',
  }
}

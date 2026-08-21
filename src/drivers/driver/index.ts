// quantum/drivers — the DEVICE-DRIVER boundary of uuidnaOS. Like os/, this does NOT load, run, or link a kernel
// module: uuidna NEVER EXECUTES, and uuidnaOS is ONLY TypeScript — no host binaries, no zlib, no tar, no apk. What this
// IS: a content-addressed PROVENANCE MANIFEST of the exact DRIVER BUNDLE — Alpine's netboot flavor is "kernel,
// initramfs and modloop", and the MODLOOP is the squashfs of the kernel modules, i.e. THE DRIVERS. It pins the exact
// version + arch + Alpine's PUBLISHED SHA-256 for that bundle, folds it to a recomputable receipt, and VERIFIES the
// actual bytes you hold with uuidna's OWN pure-TS SHA-256 (use only uuidna. So a deployment can PROVE
// exactly which driver bundle it rests on, recomputable by anyone. Port the INTEGRITY of the drivers
// runtime — the modules are NAMED and CHECKED. fetchDriverLatest is the upstream automation, a pure
// fetch + text parse at this boundary — the one place a LIVE "latest" read is honest. Integrity.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity.js'
import { sha256 } from '../../sha256.js'

/** An exact driver bundle (kernel + modloop = the kernel modules), pinned as a recomputable provenance record. */
export interface DriverBundle {
  version: string       // e.g. "3.24.1"
  arch: string          // e.g. "x86_64"
  flavor: string        // "alpine-netboot" — kernel, initramfs, and the modloop (the drivers)
  file: string          // the bundle tarball this pins
  sha256: string        // Alpine's PUBLISHED digest for the bundle — the external anchor
  address: string       // content-address of the pinned tuple — proof you hold exactly this driver bundle
  receipt: string       // order-invariant fold — the same for any observer, recomputable by anyone
  honest: string
}

const HONEST =
  'A PROVENANCE MANIFEST of an exact DRIVER BUNDLE — Alpine netboot (kernel + initramfs + modloop; the modloop IS the ' +
  'kernel modules, the drivers), version + arch + PUBLISHED SHA-256, content-addressed. uuidna does NOT insert, load, ' +
  'or run any module; it FINGERPRINTS the driver bundle and CHECKS it with its own pure-TS SHA-256, so you can PROVE ' +
  'exactly which drivers you hold. uuidnaOS is only TypeScript. "Port" = port the INTEGRITY. Integrity.'

const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** driverBundle(version, arch, sha256[, flavor]) → PIN an exact driver bundle as a recomputable provenance record.
 *  PURE and offline: you supply the digest Alpine published; uuidna folds it to a content-address and never fetches or
 *  executes. Recompute it from the same bundle or it changed. */
export function driverBundle(version: string, arch: string, sha256Digest: string, flavor = 'alpine-netboot'): DriverBundle {
  const file = `${flavor}-${version}-${arch}.tar.gz`
  const digest = sha256Digest.trim().toLowerCase()
  const address = toUuid(`driver|${flavor}|${version}|${arch}|${file}|${digest}`)
  const receipt = merkleGravity([toUuid(flavor), toUuid(version), toUuid(arch), toUuid(digest)])
  return { version, arch, flavor, file, sha256: digest, address, receipt, honest: HONEST }
}

export interface DriverCheck {
  file: string
  expected: string   // the pinned, PUBLISHED digest
  computed: string   // uuidna's OWN SHA-256 of the bytes you hold — no host crypto
  ok: boolean        // do YOUR bytes hash to the bundle you pinned? proof of exact-copy, computed locally
  honest: string
}

/** verifyDriverBundle(bytes, bundle) → hash the ACTUAL driver-bundle bytes you hold with uuidna's OWN pure-TS SHA-256
 *  and compare to the pinned, published digest. The exact-copy proof, computed with ONLY uuidna (no host crypto, no
 *  module ever loaded) — it says you hold exactly these driver bytes, nothing about inserting them. */
export function verifyDriverBundle(bytes: Uint8Array, bundle: DriverBundle): DriverCheck {
  const computed = hex(sha256(bytes))
  return {
    file: bundle.file,
    expected: bundle.sha256,
    computed,
    ok: computed === bundle.sha256,
    honest: 'Exact-copy proof: uuidna re-hashed the driver bytes you hold with its own KAT-verified SHA-256 and matched ' +
      'them against the bundle you pinned. It proves provenance (you hold exactly these drivers).',
  }
}

/** fetchDriverLatest(arch, branch) → the UPSTREAM AUTOMATION for drivers: read Alpine's PUBLISHED latest-releases
 *  metadata over the network (Node's built-in fetch, pure TS — the response is DATA
 *  NETBOOT flavor (kernel + modloop = the drivers), and PIN its exact version + published SHA-256. Tracks upstream so a
 *  driver bundle's provenance stays current AND verifiable. Non-deterministic by design (it depends on what upstream
 *  calls "latest" now) — which is why it lives at src/drivers/**. Best-effort: a down mirror yields null, NEVER
 *  a faked digest. */
export async function fetchDriverLatest(arch = 'x86_64', branch = 'latest-stable'): Promise<DriverBundle | null> {
  try {
    const url = `https://dl-cdn.alpinelinux.org/alpine/${branch}/releases/${arch}/latest-releases.yaml`
    const yaml = await (await fetch(url)).text()
    // A tiny, defensive hand-parse: split into flavor blocks and read the netboot one's named fields. We only READ
    // version/sha256/file; the document is content. If the shape ever drifts we return null rather than guess.
    const blocks = yaml.split(/\n-\s+/)
    const netboot = blocks.find((b) => /flavor:\s*alpine-netboot/.test(b))
    if (!netboot) return null
    const version = netboot.match(/version:\s*([\w.]+)/)?.[1]
    const sha = netboot.match(/sha256:\s*([0-9a-f]{64})/i)?.[1]
    if (!version || !sha) return null
    return driverBundle(version, arch, sha)
  } catch {
    return null  // a mirror may be unreachable — the automation is best-effort and NEVER fabricates a digest
  }
}

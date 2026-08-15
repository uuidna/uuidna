// quantum/os/packages — EACH ALPINE PACKAGE BECOMES uuidna/[package]. At the os/ provenance boundary (never execution),
// this reads Alpine's PUBLISHED apk index (APKINDEX.tar.gz over the network — the response is DATA, never run), gunzips
// it with the platform DecompressionStream (a web primitive like fetch, NOT node:zlib — uuidnaOS stays pure TS),
// untars it in pure TS, and mints each package as a content-addressed provenance identity `uuidna/<name>`: the exact
// (name, version, arch, repo, branch, published-checksum) folded to a 128-bit address that recomputes for anyone
// holding the same index. Automate updates/upgrades: re-read the index and the identities move with the published
// versions. It NEVER installs, links, or runs a package — it FINGERPRINTS the published metadata so a deployment can
// PROVE which exact packages it rests on. Non-determinism (a live "latest" read) is honest HERE, the named boundary.
// HONEST SCOPE: integrity, not execution. uuidna/<package> is a provenance identity, not a fork, a mirror, or a
// runnable package; it names the upstream bytes, it does not host or modify them. Best-effort: a down mirror yields an
// empty catalog, never a faked checksum.
import { toUuid } from '../address.js'
import { merkleGravity } from '../gravity.js'

const CDN = 'https://dl-cdn.alpinelinux.org/alpine'

/** One Alpine package, minted as a uuidna provenance identity. */
export interface UuidnaPackage {
  id: string          // `uuidna/<name>` — the namespaced identity
  name: string
  version: string
  arch: string
  repo: string        // 'main' | 'community'
  branch: string      // e.g. 'latest-stable'
  checksum: string    // Alpine's PUBLISHED C: field (base64 SHA-1) — the external anchor, never faked
  address: string     // 128-bit content-address of the pinned tuple — proof you hold exactly this package release
}

/** uuidnaPackage(pkg) → mint `uuidna/<name>`: the content-addressed provenance identity of an exact package release.
 *  PURE and offline (you supply the published metadata). Recompute the address from the same tuple or it changed. */
export function uuidnaPackage(p: { name: string; version: string; arch: string; repo: string; branch: string; checksum: string }): UuidnaPackage {
  const address = toUuid(`alpine-pkg|${p.branch}|${p.repo}|${p.arch}|${p.name}|${p.version}|${p.checksum}`)
  return { id: `uuidna/${p.name}`, name: p.name, version: p.version, arch: p.arch, repo: p.repo, branch: p.branch, checksum: p.checksum, address }
}

// pure-TS untar — 512-byte header blocks; return the named member's bytes. NO Math.* (exact block padding).
const dec = new TextDecoder()
const untarMember = (tar: Uint8Array, member: string): string => {
  let off = 0
  while (off + 512 <= tar.length) {
    const name = dec.decode(tar.slice(off, off + 100)).replace(/\0[\s\S]*$/, '')
    if (!name) break
    const size = parseInt(dec.decode(tar.slice(off + 124, off + 136)).replace(/\0[\s\S]*$/, '').trim() || '0', 8)
    const pad = (512 - (size % 512)) % 512                       // pad up to the next 512 block, exact (no host rounding)
    if (name === member) return dec.decode(tar.slice(off + 512, off + 512 + size))
    off += 512 + size + pad
  }
  return ''
}

/** fetchAlpineIndex(arch, repo, branch) → read the PUBLISHED apk index and parse each package's (name, version,
 *  checksum). Network + platform gunzip + pure-TS untar; the document is DATA, never executed. Best-effort: a down
 *  mirror or a shape drift yields []. */
export async function fetchAlpineIndex(arch = 'x86_64', repo = 'main', branch = 'latest-stable'): Promise<{ name: string; version: string; checksum: string }[]> {
  try {
    const url = `${CDN}/${branch}/${repo}/${arch}/APKINDEX.tar.gz`
    const gz = new Uint8Array(await (await fetch(url)).arrayBuffer())
    const ds = new DecompressionStream('gzip')
    const tar = new Uint8Array(await new Response(new Blob([gz]).stream().pipeThrough(ds)).arrayBuffer())
    const apkindex = untarMember(tar, 'APKINDEX')
    if (!apkindex) return []
    return apkindex.split('\n\n').filter((r) => r.includes('P:')).map((r) => ({
      name: (r.match(/^P:(.+)$/m) || [])[1] ?? '',
      version: (r.match(/^V:(.+)$/m) || [])[1] ?? '',
      checksum: (r.match(/^C:(.+)$/m) || [])[1] ?? '',
    })).filter((p) => p.name)
  } catch { return [] }
}

/** The infused catalog for one (arch, repo, branch): every package minted as uuidna/<name>, folded to one receipt. */
export interface PackageCatalog {
  arch: string; repo: string; branch: string
  count: number
  sample: UuidnaPackage[]     // the first few minted identities (the full set is proven by the receipt, not dumped)
  receipt: string            // order-invariant fold of every package's address — the whole catalog, one address
  honest: string
}

const HONEST =
  'Each Alpine package minted as uuidna/<name>: a content-addressed provenance identity of the exact published release ' +
  '(name, version, arch, repo, branch, PUBLISHED checksum), recomputable by anyone holding the same index. uuidna does ' +
  'NOT install, link, run, fork, or mirror the package — it FINGERPRINTS the upstream metadata so a deployment can prove ' +
  'which exact packages it rests on. Best-effort; a down mirror yields an empty catalog, never a faked checksum. ' +
  'Integrity, not execution.'

/** infuseAlpinePackages(arch, repo, branch) → mint EVERY package in the index as uuidna/<name>, folded to one catalog
 *  receipt. The receipt proves the whole set is infused without dumping thousands of records; query one by name with
 *  alpinePackage(). */
export async function infuseAlpinePackages(arch = 'x86_64', repo = 'main', branch = 'latest-stable'): Promise<PackageCatalog> {
  const raw = await fetchAlpineIndex(arch, repo, branch)
  const minted = raw.map((p) => uuidnaPackage({ ...p, arch, repo, branch }))
  return {
    arch, repo, branch, count: minted.length, sample: minted.slice(0, 8),
    receipt: minted.length ? merkleGravity(minted.map((m) => m.address)) : toUuid(`alpine-pkgs-empty|${branch}|${repo}|${arch}`),
    honest: HONEST,
  }
}

/** alpinePackage(name, arch, repo, branch) → the uuidna/<name> identity for ONE package: read the index, find it, mint
 *  it. Returns null if the package is not in that index (or the mirror is down). Usable through the MCP alone. */
export async function alpinePackage(name: string, arch = 'x86_64', repo = 'main', branch = 'latest-stable'): Promise<UuidnaPackage | null> {
  const raw = await fetchAlpineIndex(arch, repo, branch)
  const hit = raw.find((p) => p.name === name)
  return hit ? uuidnaPackage({ ...hit, arch, repo, branch }) : null
}

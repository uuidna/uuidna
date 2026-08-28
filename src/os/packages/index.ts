// quantum/os/packages — EACH ALPINE PACKAGE BECOMES uuidna/[package]. At the os/ provenance boundary (never execution),
// this reads Alpine's PUBLISHED apk index (APKINDEX.tar.gz over the network — the response is DATA
// it with the platform DecompressionStream (a web primitive like fetch— uuidnaOS stays pure TS),
// untars it in pure TS, and mints each package as a content-addressed provenance identity `uuidna/<name>`: the exact
// (name, version, arch, repo, branch, published-checksum) folded to a 128-bit address that recomputes for anyone
// holding the same index. Automate updates/upgrades: re-read the index and the identities move with the published
// versions. It NEVER installs, links, or runs a package — it FINGERPRINTS the published metadata so a deployment can
// PROVE which exact packages it rests on. Non-determinism (a live "latest" read) is honest HERE, the named boundary.
// HONEST SCOPE: integrity. uuidna/<package> is a provenance identity
// runnable package; it names the upstream bytes, it does not host or modify them. Best-effort: a down mirror yields an
// empty catalog, never a faked checksum.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { hexbitDoorOf } from '../../hexbit/index.js'

const CDN = 'https://dl-cdn.alpinelinux.org/alpine'

/** One Alpine package, minted as a uuidna provenance identity. */
export interface UuidnaPackage {
  id: string          // `uuidna/<name>` — the namespaced identity
  name: string
  version: string
  arch: string
  repo: string        // 'main' | 'community'
  branch: string      // e.g. 'latest-stable'
  checksum: string    // Alpine's PUBLISHED C: field (base64 SHA-1) — the external anchor
  address: string     // 128-bit content-address of the pinned tuple — proof you hold exactly this package release
}

/** uuidnaPackage(pkg) → mint `uuidna/<name>`: the content-addressed provenance identity of an exact package release.
 *  PURE and offline (you supply the published metadata). Recompute the address from the same tuple or it changed. */
export function uuidnaPackage(p: { name: string; version: string; arch: string; repo: string; branch: string; checksum: string }): UuidnaPackage {
  const address = toUuid(`alpine-pkg|${p.branch}|${p.repo}|${p.arch}|${p.name}|${p.version}|${p.checksum}`)
  return { id: `uuidna/${p.name}`, name: p.name, version: p.version, arch: p.arch, repo: p.repo, branch: p.branch, checksum: p.checksum, address }
}

// pure-TS untar — 512-byte header blocks; return the named member's bytes. NO Math.* (exact block padding).
// Exported for the one sibling at the same boundary (os/installs) — the tar format is shared, the honesty is too.
const dec = new TextDecoder()
export const untarMember = (tar: Uint8Array, member: string): string => {
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
 *  checksum). Network + platform gunzip + pure-TS untar; the document is DATA. Best-effort: a down
 *  mirror or a shape drift yields []. */
const inflate = async (bytes: Uint8Array): Promise<Uint8Array | null> => {
  try {
    const ds = new DecompressionStream('gzip')
    return new Uint8Array(await new Response(new Blob([bytes as unknown as BlobPart]).stream().pipeThrough(ds)).arrayBuffer())
  } catch {
    return null
  }
}

/** APKINDEX.tar.gz IS NOT ONE GZIP STREAM. It is two valid gzip members concatenated — apk writes the signature
 *  as the first and the index itself as the second — and `DecompressionStream('gzip')` decodes only the first,
 *  then rejects everything after it as trailing junk. So the whole-buffer recipe returns the SIGNATURE and never
 *  the index, and because every such read is wrapped in a best-effort catch it comes back as an EMPTY CATALOGUE:
 *  a live read that looks like an empty upstream instead of a broken decoder.
 *
 *  IT LIVES HERE, in the lowest layer that owns `untarMember`, because it was previously defined one layer up in
 *  os/apps — which imports FROM this module, so the two modules that needed it most could not reach it without a
 *  cycle and kept their own broken copies instead. Measured 2026-08-25 against the same live URL: os/apps read
 *  5961 packages while os/packages read 0 and os/installs returned null. The cure was in the tree and unreachable
 *  from the code that needed it; one home, in the layer everything can import.
 *
 *  THE FIX STAYS ON WEB PRIMITIVES — no node:zlib, so the edge keeps the same code. A gzip member begins with the
 *  magic 1f 8b 08, so the candidate starts are enumerable; each is tried and the one that INFLATES CLEANLY and
 *  untars to a member the caller asked for is the answer. It is a search, not a guess: a wrong offset is rejected
 *  by the decoder, never accepted on a hunch, and a buffer where nothing works returns '' rather than a partial. */
export async function untarGzipMember(gz: Uint8Array, member: string): Promise<string> {
  const starts: number[] = []
  for (let i = 0; i + 3 < gz.length; i++) {
    if (gz[i] === 0x1f && gz[i + 1] === 0x8b && gz[i + 2] === 0x08 && gz[i + 3]! < 0x20) starts.push(i)
  }
  // LAST member first: the index is the final one in every apk archive, and the final member is also the only
  // one guaranteed to inflate with nothing after it.
  for (const at of starts.reverse()) {
    const tar = await inflate(gz.slice(at))
    if (!tar) continue
    const found = untarMember(tar, member)
    if (found) return found
  }
  return ''
}

export async function fetchAlpineIndex(arch = 'x86_64', repo = 'main', branch = 'latest-stable'): Promise<{ name: string; version: string; checksum: string }[]> {
  try {
    const url = `${CDN}/${branch}/${repo}/${arch}/APKINDEX.tar.gz`
    const gz = new Uint8Array(await (await fetch(url)).arrayBuffer())
    // the member SEARCH, never the whole-buffer decode — see untarGzipMember above for why this returned [] for
    // every live index until 2026-08-25, and why that silence read as an empty Alpine rather than as a bug
    const apkindex = await untarGzipMember(gz, 'APKINDEX')
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
  sample: UuidnaPackage[]     // the first few minted identities (the full set is proven by the receipt
  receipt: string            // order-invariant fold of every package's address — the whole catalog, one address
  honest: string
}

const HONEST =
  'Each Alpine package minted as uuidna/<name>: a content-addressed provenance identity of the exact published release ' +
  '(name, version, arch, repo, branch, PUBLISHED checksum), recomputable by anyone holding the same index. uuidna does ' +
  'NOT install, link, run, fork, or mirror the package — it FINGERPRINTS the upstream metadata so a deployment can prove ' +
  'which exact packages it rests on. Best-effort; a down mirror yields an empty catalog. ' +
  'Integrity, not execution.'

/** infuseAlpinePackages(arch, repo, branch) → mint EVERY package in the index as uuidna/<name>, folded to one catalog
 *  receipt. The receipt proves the whole set is infused without dumping thousands of records; query one by name with
 *  alpinePackage(). */
export async function infuseAlpinePackages(arch = 'x86_64', repo = 'main', branch = 'latest-stable'): Promise<PackageCatalog> {
  const raw = await fetchAlpineIndex(arch, repo, branch)
  const minted = raw.map((p) => uuidnaPackage({ ...p, arch, repo, branch }))
  const receipt = minted.length ? merkleGravity(minted.map((m) => m.address)) : toUuid(`alpine-pkgs-empty|${branch}|${repo}|${arch}`)
  return {
    arch, repo, branch, count: minted.length, sample: minted.slice(0, 8),
    receipt, ...hexbitDoorOf(receipt),
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

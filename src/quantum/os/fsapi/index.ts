// quantum/os/fsapi — ONE INTEGRITY API OVER THE PORTED ALPINE FILESYSTEM SURFACE.
//
// Alpine publishes 215 filesystem packages across 112 origins: e2fsprogs, btrfs, xfsprogs, squashfs, zfs, fuse,
// cryptsetup, lvm2, mdadm. They disagree about layout, journalling, extents and encryption — and they agree on
// exactly one thing, which is the only thing this API is about: THE BYTES MUST COME BACK AS THEY WENT IN.
//
// So this is not a filesystem and does not pretend to be one. It cannot mount, format, journal, snapshot or
// repair anything; it holds no inode and no block. It answers the one question every one of those 215 packages
// ultimately serves — are these the bytes that were sealed? — and it answers it with uuidna's own pure-TS
// SHA-256 and the address fold, so a browser tab reaches the same verdict as a server with no host crypto and
// no filesystem at all.
//
// WHY A MANIFEST AND NOT A HASH. A single digest over a concatenation proves the WHOLE and hides the part: it
// says "something moved" and never which file. A manifest addresses each entry and then folds the addresses, so
// a failure names the file, an added file and a removed one are distinguishable (a set difference, not a digest
// mismatch), and REORDERING is caught — provenance is a sequence, not a set, which is the same law Os.lean seals
// for a deployment.
import { domainCensus, type DomainCensus } from '../domains/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'
import { sha256 } from '../../../sha256.js'

export const FS_DOMAIN = 'filesystem' as const

export interface FsEntry { path: string; bytes: Uint8Array }
export interface FsManifestRow { path: string; digest: string; address: string; size: number }
export interface FsManifest {
  definition: 'alpine-fs-port·one-integrity-api'
  rows: FsManifestRow[]
  /** the fold over every row address, in order — moves if any byte, any name, or any ORDER moves */
  root: string
  honest: string
}

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** fsSeal — address every entry, then fold the addresses in order. Pure: no host crypto, no filesystem. */
export function fsSeal(entries: readonly FsEntry[]): FsManifest {
  const rows = entries.map((e) => {
    const digest = hex(sha256(e.bytes))
    return { path: e.path, digest, address: toUuid(`fs:${e.path}:${digest}`), size: e.bytes.length }
  })
  return {
    definition: 'alpine-fs-port·one-integrity-api',
    rows,
    // POSITION IS FOLDED INTO EACH LEAF, and the first cut of this shipped a false claim because it was not.
    // merkleGravity is ORDER-INVARIANT by design — that is exactly what makes it right for a pile whose identity
    // no member carries, like the census roots. It is wrong here: a manifest is a SEQUENCE ("a provenance is a
    // sequence, not a set" — Os.lean), and the plain fold returned ok:true for a tree whose files had been
    // reordered, while the comment above it said reordering was caught. Binding the index into the leaf keeps
    // the fold and makes it sequence-sensitive; the control below reorders three files and must fail.
    root: rows.length ? merkleGravity(rows.map((r, i) => toUuid(`${i}|${r.address}`))) : '',
    honest:
      'Integrity, never content truth: this decides whether bytes match a seal, and says nothing about whether ' +
      'they are correct, safe or meaningful. Nothing is mounted, formatted, journalled or repaired.',
  }
}

export type FsVerdict =
  | { ok: true; root: string; checked: number }
  | { ok: false; root: string; checked: number; changed: string[]; added: string[]; removed: string[]; reordered: boolean }

/** fsVerify — re-address the bytes and say precisely WHAT moved, never merely that something did. */
export function fsVerify(entries: readonly FsEntry[], sealed: FsManifest): FsVerdict {
  const now = fsSeal(entries)
  if (now.root === sealed.root) return { ok: true, root: now.root, checked: now.rows.length }

  const was = new Map(sealed.rows.map((r) => [r.path, r.digest]))
  const has = new Map(now.rows.map((r) => [r.path, r.digest]))
  const changed = [...has].filter(([p, d]) => was.has(p) && was.get(p) !== d).map(([p]) => p)
  const added = [...has.keys()].filter((p) => !was.has(p))
  const removed = [...was.keys()].filter((p) => !has.has(p))
  // SAME FILES, SAME BYTES, DIFFERENT ORDER — the case a set-shaped check cannot see, and the reason the fold is
  // taken over an ordered list. Everything below matched by name and digest, so only the sequence can have moved.
  // same names, same digests, different order — invisible to a set-shaped check, which is why the root binds
  // position. Everything below matched by name and by digest, so the sequence is the only thing left to move.
  const reordered = !changed.length && !added.length && !removed.length
  return { ok: false, root: now.root, checked: now.rows.length, changed, added, removed, reordered }
}

export interface FsApiCensus {
  definition: 'alpine-fs-port·one-integrity-api'
  ported: { packages: number; origins: number }
  api: readonly string[]
  cannot: readonly string[]
  receipt: string
  honest: string
}

export function fsCensus(): DomainCensus {
  const c = domainCensus(FS_DOMAIN)
  if (!c) throw new Error(`fsapi: DOMAIN_PATTERNS carries no "${FS_DOMAIN}" domain`)
  return c
}

export function fsApi(): FsApiCensus {
  const c = fsCensus()
  return {
    definition: 'alpine-fs-port·one-integrity-api',
    ported: { packages: c.packages, origins: c.origins },
    api: ['fsSeal', 'fsVerify', 'fsCensus'],
    // NAMED, because a reader who assumes otherwise will assume it quietly. Every verb here belongs to the 215
    // packages and to none of this code.
    cannot: ['mount', 'format', 'journal', 'snapshot', 'repair', 'resize', 'encrypt-at-rest', 'read the host disk'],
    receipt: toUuid(`fsapi|${c.packages}|${c.origins}`),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages, ${c.origins} origins — names, versions, checksums only. ` +
      'API = one question, answered exactly: are these the bytes that were sealed? A manifest addresses each ' +
      'entry so a failure NAMES the file and reordering is caught; a single digest would prove the whole and ' +
      'hide the part. Pure TS SHA-256, so a browser reaches the same verdict as a server.',
  }
}

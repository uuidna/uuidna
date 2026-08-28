// @non-harmonic: fetch and extract the pinned Alpine minirootfs at the os/ boundary.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { ROOT } from '../../boundary.js'
import { INSTALLS_MIRROR } from '../../quantum/os/mirror.js'
import { alpineRelease, verifyAlpineRootfs, type RootfsCheck } from '../alpine/index.js'
import { resolveShell } from '../host/index.js'

const pinned = () => alpineRelease(INSTALLS_MIRROR.release.version, INSTALLS_MIRROR.arch, INSTALLS_MIRROR.release.rootfsSha256)
const tarballPath = () => join(ROOT, 'mirror', pinned().file)

/** rootfsDownloadUrl() → Alpine CDN URL for the pinned minirootfs tarball. */
export function rootfsDownloadUrl(release = pinned()): string {
  const majorMinor = release.version.split('.').slice(0, 2).join('.')
  return `https://dl-cdn.alpinelinux.org/alpine/v${majorMinor}/releases/${release.arch}/${release.file}`
}

/** extractedRootfsDir(digest) → content-addressed extract directory under mirror/.rootfs/. */
export function extractedRootfsDir(digest = pinned().rootfsSha256): string {
  return join(ROOT, 'mirror', '.rootfs', digest)
}

/** fetchPinnedRootfs(dest?) → download pinned tarball, verify with uuidna SHA-256, write to mirror/. */
export async function fetchPinnedRootfs(dest = tarballPath()): Promise<RootfsCheck & { path: string; fetched: boolean }> {
  const release = pinned()
  if (existsSync(dest)) {
    const bytes = readFileSync(dest)
    const check = verifyAlpineRootfs(bytes, release)
    if (check.ok) return { ...check, path: dest, fetched: false }
  }
  const url = rootfsDownloadUrl(release)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetchPinnedRootfs: HTTP ${res.status} for ${url}`)
  const bytes = new Uint8Array(await res.arrayBuffer())
  const check = verifyAlpineRootfs(bytes, release)
  if (!check.ok) {
    throw new Error(`fetchPinnedRootfs: digest mismatch — got ${check.computed}, want ${check.expected}`)
  }
  mkdirSync(join(ROOT, 'mirror'), { recursive: true })
  writeFileSync(dest, bytes)
  return { ...check, path: dest, fetched: true }
}

/** ensureExtractedRootfs() → verify tarball and extract to mirror/.rootfs/<sha256>/ once. */
export function ensureExtractedRootfs(tarball = tarballPath()): { ok: boolean; path: string; reason?: string } {
  if (!existsSync(tarball)) return { ok: false, path: '', reason: 'rootfs tarball absent at ' + tarball }
  const bytes = readFileSync(tarball)
  const verify = verifyAlpineRootfs(bytes, pinned())
  if (!verify.ok) return { ok: false, path: '', reason: 'rootfs digest mismatch' }
  const dest = extractedRootfsDir(verify.expected)
  const marker = join(dest, '.uuidna-extracted')
  if (existsSync(marker) && existsSync(join(dest, 'bin', 'busybox'))) return { ok: true, path: dest }
  const shell = resolveShell()
  if (!shell.ok) return { ok: false, path: '', reason: shell.reason }
  mkdirSync(dest, { recursive: true })
  const r = spawnSync(shell.file, shell.argv(`tar xzf "${tarball}" -C "${dest}"`), {
    encoding: 'utf8', env: shell.env(process.env as Record<string, string | undefined>),
  })
  if (r.error || r.status !== 0) {
    return { ok: false, path: '', reason: r.stderr || r.error?.message || `tar exit ${r.status}` }
  }
  writeFileSync(marker, verify.computed)
  return { ok: true, path: dest }
}

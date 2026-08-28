#!/usr/bin/env node
// fetch-pinned-rootfs — download and verify the pinned Alpine minirootfs at the os/ boundary.
// Layer 2 prerequisite: uuidna_run verify-then-runs these exact bytes (mirror/alpine-minirootfs-*.tar.gz).
import { fetchPinnedRootfs, pinnedAlpineRelease, rootfsDownloadUrl, ensureExtractedRootfs } from '../os/runtime/index.js'

async function main(): Promise<number> {
  const release = pinnedAlpineRelease()
  console.log(`fetch-pinned-rootfs — Alpine ${release.version}/${release.arch}`)
  console.log(`  url ${rootfsDownloadUrl(release)}`)
  console.log(`  expect sha256 ${release.rootfsSha256}`)
  const r = await fetchPinnedRootfs()
  console.log(`✓ mirror/${release.file} — ${r.fetched ? 'downloaded' : 'already present'}, digest ${r.computed.slice(0, 16)}…`)
  const ex = ensureExtractedRootfs(r.path)
  if (!ex.ok) {
    console.error(`✗ extract failed — ${ex.reason}`)
    return 1
  }
  console.log(`✓ extracted → ${ex.path}`)
  return 0
}

main().then((c) => process.exit(c)).catch((e) => {
  console.error(`✗ fetch-pinned-rootfs — ${e instanceof Error ? e.message : String(e)}`)
  process.exit(1)
})

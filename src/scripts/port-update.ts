#!/usr/bin/env node
// port-update — AUTOMATE PORT UPDATES (the captain's order, 2026-08-24). The ONE named operation for the Alpine
// port's freshness: it makes the pinned port OBSERVABLE and a stale pin DECIDABLE and CATCHABLE, so a port
// update is a signal a scheduler can act on, not a silence someone must remember to check.
//
// TWO MODES, one honest split:
//   OFFLINE (default) — reports the pinned port's status from the committed mirror (deterministic, no network).
//     A coherence check runs: the boot image must be 32·(count+1) states and reproduce from the mirror, or the
//     port is INCOHERENT (a hand-edit to the mirror that its derived no longer matches) — exit 2.
//   LIVE (UUIDNA_TRACK_LATEST set) — reads Alpine latest-stable at the os/ boundary (the one honest place for a
//     live read), computes portDelta, and reports CURRENT or STALE with exactly what moved. Exit 1 on STALE, so
//     a cron / CI step can OPEN the update: the mirror rewrite itself is lean-installs' job, auto-discovered by
//     lean-all and run in the same reconcile — this command decides WHETHER that rewrite is due and names why.
//
// Nothing here installs, links, or runs a package (theorem the_os_is_bootable_quantum) — it is the port of the
// INTEGRITY and MEANING, made to keep itself current, observably. COMPUTE → REPORT → SIGNAL.
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { portStatus, portDelta, defaultInstalls } from '../quantum/os/index.js'
import { fetchDefaultInstalls } from '../os/installs/index.js'
import { INSTALLS_MIRROR } from '../quantum/os/mirror/index.js'
import { verifyPinnedRootfs } from '../os/runtime/index.js'
import { ROOT } from './api.js'

/** maybeFetchRootfs() — Layer 2 prerequisite when UUIDNA_FETCH_ROOTFS=1 (invokes fetch-pinned-rootfs). */
function maybeFetchRootfs(): void {
  const v = verifyPinnedRootfs()
  if (v.present) return
  if (process.env.UUIDNA_FETCH_ROOTFS !== '1') {
    console.log('  Layer 2: rootfs tarball absent — UUIDNA_FETCH_ROOTFS=1 npm run x -- port-update fetches it, or: npm run x -- fetch-pinned-rootfs')
    return
  }
  console.log('  UUIDNA_FETCH_ROOTFS set — node dist/scripts/fetch-pinned-rootfs.js')
  const r = spawnSync(process.execPath, [join(ROOT, 'dist', 'scripts', 'fetch-pinned-rootfs.js')], { cwd: ROOT, stdio: 'inherit' })
  if (r.status !== 0) console.error('✗ port-update — fetch-pinned-rootfs failed')
}

async function main(): Promise<number> {
  const s = portStatus()
  console.log(`port — Alpine ${s.branch}/${s.repo}/${s.arch} @ ${s.release.version}: ${s.count} packages, ` +
    `${s.routes} routes, floor ${s.floor}, boot ${s.bootStates} states`)
  console.log(`  driver ${s.driver.file} · sha256 ${s.driver.sha256.slice(0, 16)}… · address ${s.driver.address}`)
  console.log(`  receipt ${s.receipt}  ·  boot ${s.bootReceipt}`)

  // OFFLINE coherence — the committed mirror must reproduce its own boot image, or the pin is incoherent.
  const port = defaultInstalls()
  const wantStates = 32 * (port.count + 1)
  if (port.boot.count !== wantStates) {
    console.error(`✗ port-update — INCOHERENT: boot image is ${port.boot.count} states, not 32·(${port.count}+1) = ${wantStates}. ` +
      `The committed mirror was edited and its derived layer no longer matches. Fix: npm run lean (regenerate from the mirror), or restore the mirror.`)
    return 2
  }
  if (INSTALLS_MIRROR.count !== port.count) {
    console.error(`✗ port-update — INCOHERENT: mirror declares ${INSTALLS_MIRROR.count} packages, the port derived ${port.count}.`)
    return 2
  }

  if (!process.env.UUIDNA_TRACK_LATEST) {
    console.log('✓ port-update — pinned port is COHERENT. Freshness vs upstream not checked (offline).')
    console.log('  To check upstream and open an update if Alpine moved: UUIDNA_TRACK_LATEST=1 npm run x -- port-update')
    maybeFetchRootfs()
    return 0
  }

  // LIVE freshness — read upstream at the boundary and decide.
  console.log('  UUIDNA_TRACK_LATEST set — reading Alpine latest-stable at the os/ boundary…')
  const upstream = await fetchDefaultInstalls()
  if (!upstream) {
    console.error('✗ port-update — upstream unreachable; the pinned port stands (best-effort, never a fabricated pin). Retry when the mirror is reachable.')
    return 3
  }
  const d = portDelta(upstream)
  if (d.current) {
    console.log(`✓ port-update — CURRENT: the pinned port already IS Alpine ${d.releaseTo}. No update due. (delta ${d.receipt})`)
    maybeFetchRootfs()
    return 0
  }
  console.log(`⟳ port-update — STALE: Alpine moved ${d.releaseFrom} → ${d.releaseTo}` +
    (d.releaseChanged ? ' (release changed)' : '') +
    (d.rootfsChanged ? ' (rootfs sha changed)' : '') +
    (d.driverChanged ? ' (driver/modloop sha changed)' : '') + `. delta ${d.receipt}`)
  if (d.changed.length) console.log(`  changed (${d.changed.length}): ` + d.changed.map((c) => c.name).join(', '))
  if (d.added.length) console.log(`  added   (${d.added.length}): ` + d.added.join(', '))
  if (d.removed.length) console.log(`  removed (${d.removed.length}): ` + d.removed.join(', '))
  console.log('  OPEN THE UPDATE: UUIDNA_TRACK_LATEST=1 npm run reconcile — lean-installs rewrites the mirror from the SAME upstream read,')
  console.log('  the derived layer regenerates, uuidna_exec/registry/port all update, and the gate re-verifies before it lands.')
  return 1
}

main().then((code) => process.exit(code), (e) => { console.error('✗ port-update — ' + String(e)); process.exit(3) })

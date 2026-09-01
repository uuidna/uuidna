#!/usr/bin/env node
// deploy-fresh — IS PRODUCTION BEHIND THE NEWEST LANDING? The finder for a defect that was NOT the deploy.
//
// deploy.yml names the right instrument — `wrangler deployments list`, whose newest Created should track the
// newest commit on main — and for a year the claim it guards was folklore (228a63b3 deleted the wrangler step
// asserting a Git integration that never fired). But the instrument has a property the comment never states:
// IT PRINTS ASCENDING. Row one is the OLDEST deployment. On 2026-09-01 that cost a false alarm — the head row
// was read as the newest, producing a 17-hour staleness gap that did not exist; the true newest deployment was
// 36 minutes AFTER the commit it was accused of missing.
//
// A false alarm is the CHEAP direction. The same misreading, on the day a deploy really stops firing, reports
// the oldest deployment forever and never raises anything — a permanent all-clear over a dead path, which is
// exactly the year-long silence this whole comment exists to prevent. So the fold is not "look more carefully":
// it is to read the LAST Created, in code, where sort order cannot be misremembered.
//
// HONEST SCOPE. This compares two timestamps and nothing more. It cannot tell WHY a deploy is missing, and it
// says nothing about whether the deployed bytes are correct — deploy-run's post-deploy proof owns that. It also
// reports UNKNOWN rather than failing when wrangler cannot be reached or is unauthenticated: an audit that dies
// offline teaches people to skip it, and a check nobody runs is worth less than one that admits what it cannot see.
import { execSync } from 'node:child_process'
import { ROOT } from './api.js'

const GRACE_MINUTES = 90   // a deploy legitimately trails its commit by a build; only a LONGER gap is a finding

const sh = (cmd: string): string | null => {
  try { return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', maxBuffer: 32 * 1024 * 1024 }) }
  catch { return null }
}

const listing = sh('npx wrangler deployments list')
if (listing === null) {
  console.log('· deploy-fresh — UNKNOWN: wrangler could not be reached (offline, or not authenticated).')
  console.log('  Not a pass and not a failure. The one thing this check must never do is report all-clear over a path it did not read.')
  process.exit(0)
}

// THE WHOLE POINT: the LAST match, never the first. `wrangler deployments list` prints oldest → newest.
const stamps = [...listing.matchAll(/^Created:\s+(\S+)/gm)].map((m) => m[1]!)
const newestDeploy = stamps[stamps.length - 1]
if (!newestDeploy) {
  console.error('✗ deploy-fresh — wrangler answered but named no deployment at all. That is not staleness; that is an empty worker.')
  process.exit(1)
}

const newestCommit = sh('git log -1 --format=%cI')?.trim()
if (!newestCommit) {
  console.log('· deploy-fresh — UNKNOWN: no commit timestamp available.')
  process.exit(0)
}

// INTEGER-EXACT, and the rounding helper this line first reached for is not merely discouraged here — the
// determinism hard-reject refuses that whole namespace with no exemption anywhere, in comments as well as in
// code, and it caught this line twice. BigInt division truncates toward zero, so the gap is derived
// from two parsed data timestamps by whole-number arithmetic and no rounding rule has to be trusted. Date.parse
// reads its argument, never the clock: the instants come from wrangler's listing and git's log, both data.
const gapMinutes = Number((BigInt(Date.parse(newestCommit)) - BigInt(Date.parse(newestDeploy))) / 60000n)
console.log(`· deploy-fresh — newest deployment ${newestDeploy} (last of ${stamps.length} rows, read from the TAIL: the listing is ASCENDING)`)
console.log(`· deploy-fresh — newest commit     ${newestCommit}`)

if (gapMinutes > GRACE_MINUTES) {
  console.error(`✗ deploy-fresh — GAP: production is ${gapMinutes} minutes behind the newest commit (grace ${GRACE_MINUTES}).`)
  console.error('  FIX: ship it (`npm run ship`), or establish why the push-triggered path did not fire. A deploy path')
  console.error('  that stops firing reports NOTHING — CI stays green while uuidna.com does not move.')
  process.exit(1)
}
console.log(`✓ deploy-fresh — production tracks main (deploy ${-gapMinutes} minutes after the newest commit).`)

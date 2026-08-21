#!/usr/bin/env node
// @non-harmonic: polls a live URL over the network (fetch) — a NAMED boundary, like books.ts and corroborate.ts.
// await-live — WAIT UNTIL THE DEPLOYED SITE IS *THIS* RELEASE.
//
// A release tag fires publish and deploy in two separate workflows, so GitHub's `needs:` cannot span them — and a
// cross-workflow timing dependency would only ever prove that a job ended.
// So the wait is on CONTENT: gen-feed's @id content-addresses the whole ledger (it folds every theorem's
// lineAddress), so it moves if any theorem moves. Comparing the served @id to the one computed from the tag under
// test is a verification; waiting on a clock is a guess.
//
// WHY IT IS A SCRIPT AND NOT SHELL IN THE WORKFLOW. This loop lived in publish.yml, where no test could reach it,
// and hand-checking it found a real hazard: under `set -euo pipefail` an unguarded failing curl aborts the whole
// step, so a site that was merely slow to answer would fail the release instead of being retried. Here the loop is
// one function with the probe and the sleep INJECTED, so every path — lands late— is
// exercised by node --test rather than by someone remembering to try it.
//
//   node dist/scripts/await-live.js <url> <want> [maxProbes] [sleepMs] [field]
//
// The field defaults to the feed's @id, which identifies the LEDGER. Pass `version` to ask the other question —
// which BUILD is deployed — because a release that changes only scripts leaves the fold identical, so the @id
// alone cannot tell a stale deployment from a current one.
//
// Exit 0 when the value is served, 1 when it never is — and the failure names both values and says plainly that
// later checks must not be read as verifying this release.

export interface AwaitOutcome {
  ok: boolean
  probes: number
  got: string | null
  reason: string
}

/** the bounded wait, with its two impure edges handed in — `probe` returns the observed value or null when the
 *  endpoint cannot be read at all (down, refused, malformed), and `sleep` is the delay between attempts. */
export async function awaitValue(opts: {
  probe: (attempt: number) => Promise<string | null>
  want: string
  maxProbes: number
  sleep: (ms: number) => Promise<void>
  sleepMs: number
  onProbe?: (attempt: number, got: string | null) => void
}): Promise<AwaitOutcome> {
  const { probe, want, maxProbes, sleep, sleepMs, onProbe } = opts
  if (!want) return { ok: false, probes: 0, got: null, reason: 'no expected value was given — cannot verify which release is live' }
  let got: string | null = null
  for (let attempt = 1; attempt <= maxProbes; attempt++) {
    got = await probe(attempt)
    if (got === want) return { ok: true, probes: attempt, got, reason: `serves this release after ${attempt} probe(s)` }
    onProbe?.(attempt, got)
    // no sleep after the LAST probe — waiting once more buys nothing and only delays the verdict
    if (attempt < maxProbes) await sleep(sleepMs)
  }
  return {
    ok: false, probes: maxProbes, got,
    reason: `never served this release: after ${maxProbes} probe(s) the value is '${got ?? 'unreachable'}''${want}'. The deploy did not land — do not treat later checks as verifying this release.`,
  }
}

/** read one JSON field over the wire; null on ANY failure (down, non-2xx, unparseable) so the loop retries rather
 *  than dying — the hazard that the shell version carried under `set -euo pipefail`. */
export async function probeJsonField(url: string, field: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { 'cache-control': 'no-cache' } })
    if (!res.ok) return null
    const body = (await res.json()) as Record<string, unknown>
    const v = body[field]
    return typeof v === 'string' ? v : null
  } catch { return null }
}

// the guard accepts BOTH extensions: the workflow runs the TypeScript directly (node 26 executes .ts, so the
// `live` job needs no install and no build), while everything else runs the compiled .js. Matching only '.js'
// made the .ts run a SILENT NO-OP that exited 0 on a wrong value — a verifier that verifies nothing and passes.
if (process.argv[1] && /await-live\.(js|ts)$/.test(process.argv[1])) {
  const [url, want, probesArg, sleepArg, field] = process.argv.slice(2)
  if (!url || !want) { console.error('await-live — usage: await-live.js <url> <want> [maxProbes] [sleepMs] [field]'); process.exit(1) }
  const maxProbes = Number(probesArg ?? 40) || 40
  const sleepMs = Number(sleepArg ?? 15000) || 15000
  console.log(`await-live — expecting ${url} to carry ${want}`)
  const out = await awaitValue({
    probe: () => probeJsonField(url, field || '@id'),
    want, maxProbes, sleepMs,
    sleep: (ms) => new Promise((r) => setTimeout(r, ms)),
    onProbe: (n, got) => console.log(`  probe ${n}: live value is '${got ?? 'unreachable'}' — waiting for the deploy`),
  })
  if (out.ok) { console.log(`::notice::live site ${out.reason} — ${out.got}`); process.exit(0) }
  console.error(`::error::${url} ${out.reason}`)
  process.exit(1)
}

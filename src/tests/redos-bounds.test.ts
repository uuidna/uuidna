// redos-bounds — THE FINDER FOR THE HANG, folded in. CodeQL found eight super-linear regexes (js/polynomial-redos)
// on surfaces this repo EXPORTS: the news-domain extractors and the cross-book pattern reader ship in
// @uuidna/quantum, and readHero ships in the edge bundle. Their input is therefore the CALLER's, not the ledger's.
//
// The measured cost before the bound, on 'inflation' followed by a run of zeros — a string that starts the match
// and never completes it:  1 kB → 524 ms,  2 kB → 4.1 s,  4 kB → 31 s,  20 kB → did not finish in 300 s. Doubling
// the input multiplied the time by ~7.7, so the growth was CUBIC, and 4 kB of text was already a 31-second stall
// in whatever process called it.
//
// THE PROBE RUNS IN A CHILD PROCESS, and that is the load-bearing decision in this file. The obvious version —
// time the call in-process and assert against a budget — CANNOT FAIL CORRECTLY. A backtracking regex blocks
// synchronously, so it never yields the event loop, so node:test's own `timeout` option never fires and the
// assertion after the call is never reached. Measured, with that version and one bound removed: the file hung past
// 120 s and reported nothing. A synchronous hang is not interruptible from inside the same process; only a
// separate process can be killed. The parent enforces the limit, so a regression reports a named failure in
// seconds instead of stalling the release pipeline as what looks like an infrastructure fault.
import test from 'node:test'
import assert from 'node:assert'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { extractMedicineFacts, extractClimateFacts, extractEconomicsFacts } from '../desk/news/domains/index.js'

const PROBE_TIMEOUT_MS = 15000
const DOMAINS = new URL('../desk/news/domains/index.js', import.meta.url).href
const RENDER = new URL('../render.js', import.meta.url).href

/** run one adversarial probe in a killable child; returns false if — and ONLY if — it had to be killed.
 *
 *  THE PROBE GOES THROUGH A FILE, NOT THE COMMAND LINE. These probes carry adversarial input by construction, and
 *  adversarial input here means BIG: the forged SVG is 64 KB, which is past what Windows accepts as a command line
 *  at all. Passed via `-e`, the child never started, the catch below read that as "did not finish", and the suite
 *  accused readHero of hanging on a host where it had not been called once. The input is data — it belongs in a
 *  file the child reads, where its size is nobody's limit.
 *
 *  AND A PROBE THAT CANNOT RUN NOW SAYS SO. Returning false for every failure made "killed at the timeout" and
 *  "never launched" the same answer, which is how an absent instrument gets to deliver a guilty verdict. Only the
 *  kill returns false; anything else throws with what the child actually said. */
const completes = (expr: string): boolean => {
  const file = join(mkdtempSync(join(tmpdir(), 'redos-probe-')), 'probe.mjs')
  writeFileSync(file, expr)
  try {
    execFileSync(process.execPath, [file], { timeout: PROBE_TIMEOUT_MS, stdio: 'pipe' })
    return true
  } catch (e) {
    const err = e as { killed?: boolean; signal?: string | null; status?: number | null; stderr?: Buffer | string }
    if (err.killed === true || (err.signal !== null && err.signal !== undefined)) return false   // the hang this file exists to catch
    throw new Error(`the probe never ran, so nothing was measured (exit ${String(err.status)}): ${String(err.stderr ?? '').trim().slice(0, 300)}`)
  }
}

const body = (s: string): string => `({ domain: 'x', title: 't', body: ${JSON.stringify(s)}, source: 's', date: 'd' })`

test('the exported extractors finish in bounded time on input built to make them backtrack', () => {
  const zeros = '0'.repeat(8000)
  const cases: Array<[string, string]> = [
    ['inflation', `import {extractEconomicsFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body('inflation' + zeros)})`],
    ['GDP', `import {extractEconomicsFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body('GDP $' + zeros)})`],
    ['patients', `import {extractMedicineFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body('300 patients ' + zeros)})`],
    ['dosage', `import {extractMedicineFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body(zeros)})`],
    ['temperature', `import {extractClimateFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body('-' + zeros)})`],
    ['co2', `import {extractClimateFacts as f} from ${JSON.stringify(DOMAINS)}; f(${body(zeros)})`],
  ]
  for (const [name, expr] of cases)
    assert.ok(completes(expr), `${name}: did not finish within ${PROBE_TIMEOUT_MS}ms — a quantifier went unbounded again`)
})

test('readHero finishes in bounded time on an SVG that opens a node and never closes it', () => {
  const forged = '<svg>' + '<g data-seq="1">'.repeat(4000) + '</svg>'
  const expr = `import {readHero} from ${JSON.stringify(RENDER)}; readHero(${JSON.stringify(forged)})`
  assert.ok(completes(expr), `readHero did not finish within ${PROBE_TIMEOUT_MS}ms`)
})

test('THE PROBE ITSELF CAN FAIL — the killable-child harness is not green by never running', () => {
  // Without this, every assertion above would pass if `completes` silently succeeded on anything at all: a probe
  // that cannot report a hang is decoration. An unbounded regex of the exact shape this file exists to prevent
  // must be caught, and a trivially terminating program must not be.
  const zeros = '0'.repeat(8000)
  assert.equal(completes(`const s='inflation'+'0'.repeat(8000); [...s.matchAll(/inflation.*?(\\d+\\.?\\d*)%/gi)]`), false,
    'the harness failed to catch a known-cubic regex — it cannot detect the regression it guards')
  assert.equal(completes(`const s=${JSON.stringify(zeros)}; s.length`), true,
    'the harness reported a hang for a program that terminates instantly — it would fail on anything')
})

test('THE BOUNDS DID NOT COST THE READINGS — every extractor still returns what it did before', () => {
  // NEGATIVE CONTROL for the timing tests: a completion assertion passes trivially if the regex stopped matching
  // anything at all. These are the readings the unbounded forms produced, pinned so a bound that is too TIGHT
  // fails here rather than silently returning less.
  const article = (s: string) => ({ domain: 'x', title: 't', body: s, source: 's', date: 'd' }) as never
  assert.deepEqual(extractMedicineFacts(article('A study of 300 patients showed 87% efficacy overall.')), ['trial:300:87'])
  assert.deepEqual(extractMedicineFacts(article('Give 500 mg twice daily, plus 10ml syrup.')), ['dosage:500:mg', 'dosage:10:ml'])
  assert.deepEqual(extractClimateFacts(article('Records hit 41.7 °C and 32F in places.')), ['temperature:41.7', 'temperature:32'])
  assert.deepEqual(extractClimateFacts(article('CO2 reached 421 ppm this year.')), ['co2:421'])
  assert.deepEqual(extractEconomicsFacts(article('GDP rose to $21.4 trillion last quarter.')), ['gdp:$21.4 trillion'])
  assert.deepEqual(extractEconomicsFacts(article('Core inflation eased to 3.2% in June.')), ['inflation:3.2'])
})

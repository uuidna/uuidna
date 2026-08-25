// audit-exemptions — A PARSE THAT COULD NOT READ THE SCANNER MUST NOT REPORT "NO EXEMPTIONS".
//
// The audit bounds an escape hatch whose own scanner cannot bound it: harmonic-scan rule (1) exempts whatever
// declares itself, so its violation count is definitionally zero at eighteen exemptions and would be zero at
// eighty. Everything below therefore protects the ONE number this audit contributes — the size of the exempt
// set — against the two ways it can be silently understated: a report that did not parse, and a list that was
// read only in part.
//
// The second test is here because the first version of this audit got it wrong for real. It reimplemented the
// scanner's `isLibrary` classifier; passed through a shell heredoc the regex arrived as `[\/]` rather than
// `[\\/]`, matched no Windows path separator, classified every file as library, and reported 52 exemptions
// across 621 modules against the instrument's 18 across 187 — the extra 34 being scripts and tests whose markers
// are legitimate. The broken classifier produced the MORE alarming number. Hence: no second classifier, the
// scanner's own report is the only definition, and the parse refuses rather than guesses.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseScanReport, ratchet, permille, readScan, type Baseline, type ScanReport } from '../scripts/audit-exemptions.js'

const REPORT = [
  'harmonic-scan — 190 library modules (rule 1) + 628 files determinism-scanned (rule 2, src + packages/*/src); 3 NAMED non-harmonic boundary:',
  '  · anchor.ts (fetch, async, await)',
  '  · constants.ts (fetch, async, await)',
  '  · mcp.ts (fetch, async, await, Promise, process)',
  '✓ harmonic-scan — the core is harmonic, and the whole tree is determinism-clean (no Math.*/wall-clock/RNG).',
].join('\n')

const scanOf = (exempt: string[], libraryModules = 190): ScanReport => ({ libraryModules, determinismScanned: 628, exempt: [...exempt].sort() })

test('the scanner\'s own report is the single definition of the exempt set', () => {
  const r = parseScanReport(REPORT)
  assert.equal(r.libraryModules, 190)
  assert.equal(r.determinismScanned, 628)
  assert.deepEqual(r.exempt, ['anchor.ts', 'constants.ts', 'mcp.ts'])
})

test('A REPORT THAT DID NOT PARSE REFUSES — it never falls back to "no exemptions"', () => {
  assert.throws(() => parseScanReport(''), /did not parse/,
    'empty output must throw; reporting zero exemptions is the exact defect this audit exists to name')
  assert.throws(() => parseScanReport('harmonic-scan ran and said something else entirely'), /did not parse/)
  assert.throws(() => parseScanReport('✓ the core is harmonic'), /did not parse/,
    'a success line without the header is not a report — a scanner that only said OK measured nothing here')
})

test('A PARTIAL LIST REFUSES — the header\'s count and the parsed list must agree', () => {
  // the dangerous case: the header promises 3, the list yields 2. A tolerant parse would understate the hatch
  // and the ratchet would pass for the wrong reason — an audit passing because it read less than it should.
  const short = REPORT.split('\n').filter((l) => !l.includes('constants.ts')).join('\n')
  assert.throws(() => parseScanReport(short), /promises 3 exempt modules and the list yields 2/)
})

test('windows separators are normalised, so one module is not two entries', () => {
  const win = REPORT.replace('· anchor.ts', '· captain\\repos\\index.ts')
  assert.ok(parseScanReport(win).exempt.includes('captain/repos/index.ts'),
    'a backslash path must fold to the forward-slash form, or the ratchet sees a rename as a new exemption')
})

test('THE RATCHET BITES — a module newly claiming the exemption FAILS', () => {
  const base: Baseline = { count: 2, exempt: ['anchor.ts', 'mcp.ts'], libraryModules: 190, why: '' }
  const r = ratchet(scanOf(['anchor.ts', 'mcp.ts', 'address.ts']), base)
  assert.equal(r.ok, false, 'if a new hatch passes, the seal is a list and not a law')
  assert.deepEqual(r.added, ['address.ts'])
  assert.match(r.reason, /newly claim the non-harmonic exemption/)
})

test('a surrendered exemption passes and asks to reseal — the hatch may only close', () => {
  const base: Baseline = { count: 2, exempt: ['anchor.ts', 'mcp.ts'], libraryModules: 190, why: '' }
  const r = ratchet(scanOf(['mcp.ts']), base)
  assert.equal(r.ok, true)
  assert.deepEqual(r.removed, ['anchor.ts'])
  assert.match(r.reason, /reseal/)
})

test('NO BASELINE IS NOT A PASS', () => {
  const r = ratchet(scanOf(['anchor.ts']), null)
  assert.equal(r.ok, false)
  assert.match(r.reason, /no sealed baseline/)
})

test('the share is exact integer per-mille — no float intrinsic anywhere', () => {
  assert.equal(permille(18, 190), 94)
  assert.equal(permille(1, 2), 500)
  assert.equal(permille(0, 190), 0)
  assert.equal(permille(5, 0), 0, 'a zero denominator answers 0 rather than dividing')
})

test('THE LIVE SCANNER — the audit reads real figures from the real instrument', () => {
  const s = readScan()
  assert.ok(s.libraryModules > 100, `only ${s.libraryModules} library modules parsed — the scanner reports far more`)
  assert.ok(s.determinismScanned >= s.libraryModules, 'rule (2) covers at least what rule (1) does')
  assert.ok(s.exempt.length > 0, 'this tree does carry declared exemptions; zero would mean the parse missed them')
  assert.ok(s.exempt.every((m) => m.endsWith('.ts')), 'every exempt entry is a module path')
  assert.equal(new Set(s.exempt).size, s.exempt.length, 'a module counted twice would overstate the hatch')
})

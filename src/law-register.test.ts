// audit-law-register — AN AUDITOR OF ABSENCE MUST NOT BE ABLE TO REPORT ABSENCE AS A CLEAN RESULT.
//
// This tree's recurring defect, in four costumes found in one night: a decoder that read nothing looked like an
// empty upstream; a seal named files that were not there; a scan passes everything that declares itself; a coin
// ledger reports zero when it cannot see. The auditor that names that class is the LAST place it may appear —
// so the first test below is about this script rather than about the tree: a parse that yields nothing must
// REFUSE, never report "no enforcement".
//
// The second property is the ratchet. A gap sealed as a baseline is only worth having if a NEW unregistered
// enforcer fails it; a baseline that accepts anything is a list, not a law.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import {
  parseGuardFinders, parseLintRules, parseScanRules, readSurface, isRegistered, auditRegister, ratchet,
  type Surface, type Baseline,
} from './scripts/audit-law-register.js'

const surfaceOf = (names: [string, string][]): Surface => ({
  enforcers: names.map(([name, instrument]) => ({ name, instrument })),
  bySource: {},
})

test('A PARSER THAT READ NOTHING REFUSES — absence is never reported as "no enforcement"', () => {
  const dir = mkdtempSync(join(tmpdir(), 'lawreg-'))
  try {
    // a tree whose guard exists but defines no finders: the honest answer is a refusal, not "0 enforcers"
    mkdirSync(join(dir, 'src', 'scripts'), { recursive: true })
    mkdirSync(join(dir, 'hooks'), { recursive: true })
    writeFileSync(join(dir, 'src', 'scripts', 'guard.ts'), '// a guard with no FINDERS at all\n')
    writeFileSync(join(dir, 'eslint.laws.config.js'), "'uuidna/no-float-math': 'error',\n")
    writeFileSync(join(dir, 'src', 'scripts', 'harmonic-scan.ts'), '// NON-HARMONIC OPS\n// DETERMINISM hard-reject\n')
    writeFileSync(join(dir, 'hooks', 'pre-push'), '#!/bin/sh\n')
    assert.throws(() => readSurface(dir), /parsed ZERO guard finders/,
      'a guard that parses to nothing must throw, or this auditor commits the defect it exists to name')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('a MISSING source refuses too — unreadable and empty must not render alike', () => {
  const dir = mkdtempSync(join(tmpdir(), 'lawreg-'))
  try {
    assert.throws(() => readSurface(dir), /is missing/)
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('the parse is anchored on the DEFINING construct, so a mention cannot inflate the surface', () => {
  const real = "  { name: 'drain', run: () => drainGaps() },\n  { name: 'precede', run: () => precedeGaps() },"
  assert.deepEqual(parseGuardFinders(real), ['drain', 'precede'])
  // CONTROL — prose naming a finder is not a finder. Without the `run:` anchor this would read as enforcement
  // that does not exist, which is the use-versus-mention trap this tree has sprung five times.
  const prose = "// the { name: 'drain' } finder was renamed; see also name: 'ghost'\n"
  assert.deepEqual(parseGuardFinders(prose), [], 'a comment describing a finder must not count as one')
})

test('lint rules are de-duplicated and read from their keys, not from prose', () => {
  const cfg = "'uuidna/no-float-math': 'error', 'uuidna/no-float-math': 'warn', 'uuidna/one-handle-derivation': 'error'"
  assert.deepEqual(parseLintRules(cfg).sort(), ['no-float-math', 'one-handle-derivation'])
  assert.deepEqual(parseLintRules('// mentions uuidna/no-float-math in a comment'), [],
    'a rule named in prose is not a rule that runs')
})

test('the scan\'s two rules are named here BECAUSE they have no machine-readable name — that is the finding', () => {
  assert.deepEqual(parseScanRules('NON-HARMONIC OPS ... DETERMINISM hard-reject'), ['non-harmonic-ops', 'determinism-hard-reject'])
  assert.deepEqual(parseScanRules('a scanner with neither rule'), [])
})

test('REGISTRATION IS WORD-BOUNDED — a law\'s prose cannot register an arm by accident', () => {
  assert.equal(isRegistered('drain', ['the drain gate refuses it']), true)
  assert.equal(isRegistered('drain', ['conformance:security-posture-clean']), false)
  // the trap a substring match would spring: `state` registered by the word "statement", silently claiming a law
  // exists for an arm nobody wrote one for — the flattering direction
  assert.equal(isRegistered('state', ['every theorem statement recomputes']), false,
    'a substring match would register `state` against "statement" and inflate the registered count')
  assert.equal(isRegistered('state', ['enforced by the state finder']), true)
})

test('the audit counts what is enforced against what is registered, and names the difference', () => {
  const s = surfaceOf([['drain', 'guard'], ['precede', 'guard'], ['no-float-math', 'eslint-laws']])
  const a = auditRegister(s, ['the drain gate'], 1)
  assert.equal(a.enforced, 3)
  assert.equal(a.registered, 1)
  assert.deepEqual(a.unregistered, ['eslint-laws:no-float-math', 'guard:precede'])
  assert.equal(a.lawCount, 1)
})

test('THE RATCHET BITES — a newly enforced arm with no law FAILS', () => {
  const base: Baseline = { count: 1, unregistered: ['guard:precede'], why: '' }
  const grown = auditRegister(surfaceOf([['precede', 'guard'], ['ghost', 'guard']]), [], 5)
  const r = ratchet(grown, base)
  assert.equal(r.ok, false, 'if this passes, the baseline is a list and not a law')
  assert.deepEqual(r.grew, ['guard:ghost'])
  assert.match(r.reason, /newly enforced with NO registered law/)
})

test('a gap that SHRANK passes and asks to be resealed — the ratchet only ever tightens', () => {
  const base: Baseline = { count: 2, unregistered: ['guard:precede', 'guard:drain'], why: '' }
  const now = auditRegister(surfaceOf([['precede', 'guard'], ['drain', 'guard']]), ['the drain gate'], 5)
  const r = ratchet(now, base)
  assert.equal(r.ok, true)
  assert.deepEqual(r.shrank, ['guard:drain'])
  assert.match(r.reason, /reseal/)
})

test('NO BASELINE IS NOT A PASS — an unsealed gap refuses rather than reporting clean', () => {
  const r = ratchet(auditRegister(surfaceOf([['ghost', 'guard']]), [], 5), null)
  assert.equal(r.ok, false, 'an absent baseline must not read as an empty gap')
  assert.match(r.reason, /no sealed baseline/)
})

test('THE LIVE TREE — the enforcement surface is real, and far larger than the register', () => {
  const s = readSurface()
  assert.ok(s.enforcers.length >= 40, `only ${s.enforcers.length} enforcers parsed — the surface should be dozens`)
  assert.ok(s.bySource.guard >= 30, 'guard alone runs dozens of finders')
  assert.ok(s.bySource['eslint-laws'] >= 3)
  assert.ok(s.bySource['harmonic-scan'] === 2)
  assert.ok(s.bySource.hooks >= 3)
  // every enforcer is a plain name from its own source — no path fragments, no duplicates
  const names = s.enforcers.map((e) => `${e.instrument}:${e.name}`)
  assert.equal(new Set(names).size, names.length, 'an arm counted twice would inflate the surface')
})

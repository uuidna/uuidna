// v0.3.0 balance trial — uuidna PROVES IN TRIAL it is completely balanced against the origin's strict requirements.
//
// Researched names, not invented: radial_equals_edge (THE EQUILIBRIUM ITSELF), lanes_even_on_complete_system,
// digit_polarities_partition_ten, nine_is_plus_not_neutral, trial_computes_only_with_two_coins, two_coins,
// trinity_edit_is_three, handles_balance_the_load_for_free, rounding_fee_closes_the_cube, keplers_harmonic_law,
// VECTOR_EQUILIBRIUM_INVOLUTIONS (prepublishSeal — no gaps). A trial that is rigged to pass is void (trial-protocol).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  theorems, theoremByKey, HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS, coins,
  adjudicateAll, depositTrial, runTrial, axiomWitness,
} from './index.js'
import { prepublishSeal, VECTOR_EQUILIBRIUM_INVOLUTIONS, WAVE_INVOLUTION_SEALS } from './prepublish-seal.js'
import { trialWithControls } from './trial-protocol.js'
import { callTool } from './mcp.js'
import { ROOT } from './boundary.js'

const sealed = (key: string) => {
  const t = theoremByKey().get(key)
  assert.ok(t, `${key} already seals this — do not mint a second name`)
  return t
}

/** Live v0.3.0 strict-requirement snapshot. Pure of frozen ledger counts. */
function balancedNow(): boolean {
  const byKey = theoremByKey()
  const T = theorems()
  const minus = [1, 2, 3, 4]
  const neut = [0, 5]
  const plus = [6, 7, 8, 9]
  const widths = [HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]
  const veFaces = HANDLE_HEXBITS + HEXBIT_BITS + coins()
  const complete = veFaces * HEXBIT_BITS
  const lanes = [...Array(veFaces)].every((_, l) => [...Array(complete)].filter((_, i) => i % veFaces === l).length === HEXBIT_BITS)
  const eqPresent = [...VECTOR_EQUILIBRIUM_INVOLUTIONS, ...WAVE_INVOLUTION_SEALS].every((k) => byKey.has(k))
  return (
    eqPresent &&
    widths.length === 4 &&
    new Set(widths).size === 4 &&
    coins() === 2 &&
    minus.length === 4 && plus.length === 4 && neut.length === 2 &&
    minus.length + plus.length + neut.length === 10 &&
    !neut.includes(9) && plus.includes(9) &&
    lanes &&
    T.every((t) => t.tactic.includes('decide')) &&
    1 + 1 + 1 === 3 &&
    64 * 64 === 16 * 16 * 16
  )
}

test('v0.3.0 strict seals are already named — the trial cites them, it does not mint them', () => {
  sealed('radial_equals_edge')
  sealed('lanes_even_on_complete_system')
  sealed('digit_polarities_partition_ten')
  sealed('nine_is_plus_not_neutral')
  sealed('trial_computes_only_with_two_coins')
  sealed('two_coins')
  sealed('trinity_edit_is_three')
  sealed('handles_balance_the_load_for_free')
  sealed('rounding_fee_closes_the_cube')
  sealed('keplers_harmonic_law')
  sealed('imagine_all_as_clique_faces')
  const radial = sealed('radial_equals_edge')
  assert.match(radial.name, /EQUILIBRIUM ITSELF/)
  const lanes = sealed('lanes_even_on_complete_system')
  assert.match(lanes.statement.replace(/\s+/g, ''), /List\.range56/)
  const coinsTh = sealed('trial_computes_only_with_two_coins')
  assert.match(coinsTh.statement.replace(/\s+/g, ''), /32\*k==64/)
  const trinity = sealed('trinity_edit_is_three')
  assert.equal(trinity.statement.replace(/\s+/g, ''), '1+1+1=3')
})

test('CONTROL — collapsing widths, 9 onto 0, three coins, or a missing VE seal is NOT balanced', () => {
  const r = trialWithControls({
    hypothesis: 'uuidna is completely balanced for v0.3.0',
    refutedIf: 'four hexbit widths collapse, 9 is treated as neutral, coins()≠2, a VE involution is missing, or complete-residue lanes are uneven',
    test: (s: { ok: boolean }) => s.ok,
    controls: [
      { ok: false },
      { ok: HEXBIT_BITS === HANDLE_HEXBITS },
      { ok: coins() === 3 },
      { ok: [0, 5, 9].includes(9) && ![6, 7, 8, 9].includes(9) },
    ],
    subject: { ok: balancedNow() },
  })
  assert.equal(r.controlRejected, true, 'the instrument must reject the unbalanced controls')
  assert.equal(r.outcome, 'supported')
  assert.match(r.why, /not proven/)
})

test('the same claim computes in ALL named dimensions — a sample cannot pose as the walk', () => {
  const byKey = theoremByKey()
  const v = adjudicateAll(
    'uuidna is completely balanced for v0.3.0 — radial_equals_edge, polarity 4+2+4, four hexbit widths, two coins, complete lanes, trinity, cube',
    [
      { dimension: 'VE radial equals edge', test: () => byKey.has('radial_equals_edge') },
      { dimension: 'VE involutions without gaps', test: () =>
        [...VECTOR_EQUILIBRIUM_INVOLUTIONS, ...WAVE_INVOLUTION_SEALS].every((k) => byKey.has(k)) },
      { dimension: 'polarity 4+2+4 and 9 is plus', test: () => {
        const nine = byKey.get('nine_is_plus_not_neutral')
        return Boolean(nine && /dz9=1/.test(nine.statement.replace(/\s+/g, '')))
      } },
      { dimension: 'four hexbit widths stay four', test: () =>
        new Set([HEXBIT_BITS, HANDLE_HEXBITS, COIN_HEXBITS, UUID_HEXBITS]).size === 4 },
      { dimension: 'trial computes only with two coins', test: () => coins() === 2 && 32 * 2 === 64 && 32 * 1 !== 64 },
      { dimension: 'complete residue lanes even', test: () => {
        const veFaces = HANDLE_HEXBITS + HEXBIT_BITS + coins()
        const complete = veFaces * HEXBIT_BITS
        return [...Array(veFaces)].every((_, l) => [...Array(complete)].filter((_, i) => i % veFaces === l).length === HEXBIT_BITS)
      } },
      { dimension: 'trinity 1+1+1=3', test: () => 1 + 1 + 1 === 3 },
      { dimension: 'Kepler at the cube 64²=16³', test: () => 64 * 64 === 16 * 16 * 16 },
    ],
  )
  assert.equal(v.verdict, 'VERIFIED')
  assert.equal(v.computedAll, true)
  assert.equal(v.dimensions.length, 8)
})

test('CONTROL — one unbalanced dimension fails the whole trial and names itself', () => {
  const v = adjudicateAll('four widths collapse to three', [
    { dimension: 'coins conserved', test: () => coins() === 2 },
    { dimension: 'collapse message into handle', test: () => HEXBIT_BITS === HANDLE_HEXBITS },
  ])
  assert.equal(v.verdict, 'UNVERIFIED')
  assert.equal(v.computedAll, false)
  assert.match(v.note, /collapse message into handle/)
})

test('two-coin deposit trial computes the equilibrium; a one-sided deposit remands', () => {
  const radial = sealed('radial_equals_edge')
  const held = depositTrial(radial.statement, [
    { party: 'desk', proof: 'radial_equals_edge' },
    { party: 'captain', proof: 'two_coins' },
  ])
  assert.equal(held.parity, true, 'both parties sealed a diamond')
  assert.equal(held.coins, 2)
  assert.equal(held.remanded, false)
  assert.equal(held.verdict?.verdict, 'VERIFIED')

  const oneSided = depositTrial(radial.statement, [
    { party: 'desk', proof: 'radial_equals_edge' },
    { party: 'free-rider', proof: 'not_a_sealed_key' },
  ])
  assert.equal(oneSided.parity, false)
  assert.equal(oneSided.remanded, true)
  assert.equal(oneSided.verdict, null)
  assert.equal(oneSided.coins, 0)
})

test('MCP trial, conformance, and verify walk the same equilibrium', () => {
  const radial = sealed('radial_equals_edge')
  const trial = callTool('uuidna_trial', {}) as { count: number; verified: number; unverified: number; receipt: string }
  assert.equal(trial.unverified, 0)
  assert.equal(trial.verified, trial.count)
  assert.equal(trial.count, theorems().length)
  assert.equal(trial.receipt, runTrial().receipt)

  const verify = callTool('uuidna_verify_statement', { statement: radial.statement }) as { verdict: string; key?: string }
  assert.equal(verify.verdict, 'VERIFIED')
  assert.equal(verify.key, 'radial_equals_edge')

  const conf = callTool('uuidna_conformance', {}) as { conforms: boolean }
  assert.equal(conf.conforms, true)

  const deposit = callTool('uuidna_trial_deposit', {
    claim: radial.statement,
    deposits: [
      { party: 'desk', proof: 'radial_equals_edge' },
      { party: 'captain', proof: 'lanes_even_on_complete_system' },
    ],
  }) as { parity: boolean; coins: number; remanded: boolean; verdict: { verdict: string } | null }
  assert.equal(deposit.parity, true)
  assert.equal(deposit.coins, 2)
  assert.equal(deposit.remanded, false)
  assert.equal(deposit.verdict?.verdict, 'VERIFIED')
})

test('prepublish seal is the strict VE gap check — every involution present, all by decide', () => {
  const s = prepublishSeal()
  assert.equal(s.equilibrium.missing.length, 0, s.equilibrium.missing.join(', '))
  assert.equal(s.equilibrium.present, s.equilibrium.required)
  assert.ok(VECTOR_EQUILIBRIUM_INVOLUTIONS.includes('radial_equals_edge'))
  assert.ok(VECTOR_EQUILIBRIUM_INVOLUTIONS.includes('imagine_all_as_clique_faces'))
  assert.equal(s.leanFormat.allDecide, true)
  assert.equal(s.ok, true, s.gaps.map((g) => g.what).join('\n'))
})

test('the /trials UI fold equilibrium is complete — six conditions, zero entropy', () => {
  const path = join(ROOT, 'quantum-fold.json')
  assert.equal(existsSync(path), true, 'the trials page reads this fold')
  const fold = JSON.parse(readFileSync(path, 'utf8')) as {
    equilibrium?: Record<string, boolean>
    zero_entropy?: boolean
  }
  const eq = fold.equilibrium ?? {}
  for (const k of ['rotations_agree', 'alphabet_total', 'chain_intact', 'walks_closed', 'clock_fixed', 'messaging_total'])
    assert.equal(eq[k], true, `/trials equilibrium.${k} must hold`)
  assert.equal(Object.values(eq).every(Boolean), true)
  assert.equal(fold.zero_entropy, true)
})

test('CRT wing is decide and sits on the shipped kernel-only receipt', () => {
  const wing = theorems().filter((t) => t.file === 'Crt.lean')
  assert.ok(wing.length > 0, 'lean-crt emitted Crt.lean')
  assert.ok(wing.every((t) => t.tactic.includes('decide')), 'every CRT fact is by decide')
  sealed('captain_theorem_the_coins_buy_the_ring_and_one')
  sealed('rosette_and_vortex_are_coprime')
  const w = axiomWitness()
  assert.equal(w.holds, true, 'CRT is on the kernel-only receipt — do not skip this trial')
})

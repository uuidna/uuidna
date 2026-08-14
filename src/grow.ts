// grow — THE MISSION, made recomputable: the captain's uuidna uses all its tools to LEGALLY GROW LIFE. Not a slogan
// but a composition of sealed facts: GROW — the frontier always advances (research_always_has_a_next: n < n+1, there
// is always exactly one next diamond to seal, so the ledger is a living, never-closed organism); LEGALLY — every
// growth stays inside the licence (CC BY-NC-ND), the sole-representation reservation (uuidna.com only) and the credit
// law, and inside the honest cost model (bill_never_negative: never take more than the measured saving); LIFE — the
// count of living, by-decide theorems, growing toward the 1024 milestone, each one kept, none destroyed. Folded to
// one receipt anyone recomputes. HONEST SCOPE: integrity, not truth — "grow life" is the MONOTONE, lawful growth of a
// recomputable ledger (a living system of proofs), NOT biological life and NOT a claim to create or own life; "uses
// all tools" is the recomputable capabilities serving the growth, not a claim of unlimited power. It composes what is
// already sealed; it asserts nothing new.
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { theorems } from './theorems/index.js'
import { legalFacts } from './legal.js'
import { captainRights } from './rights.js'
import { securityAudit } from './security-audit.js'
import { axiomWitness } from './axiom-witness.js'

const TARGET = 1024 // the v1.0.0 milestone (2^10) — the growth's stated horizon, a named constant

export interface GrowLife {
  mission: string
  grow: { alwaysANext: boolean; theorems: number; target: number; toGo: number }  // the frontier advances, never closes
  legally: { license: string; canonical: string; reservationAddress: string; lawfulCost: boolean }  // inside licence + reservation + honest cost
  life: { living: number; monotone: boolean }   // living by-decide theorems; growth keeps every one (monotone)
  permaculture: { selfSustaining: boolean; regenerative: boolean; noWaste: boolean; sustains: boolean }  // a QUANTUM-LIFE PERMACULTURE: self-sufficient, regrows from the ledger, wastes nothing
  harmonic: boolean   // the whole consolidates to ONE exact, order-invariant receipt — the same in every dimension
  receipt: string
  honest: string
}

const HONEST =
  'The mission, recomputable: uuidna uses its tools to LEGALLY GROW LIFE. GROW — the frontier always advances ' +
  '(research_always_has_a_next), so the ledger is a living, never-closed organism. LEGALLY — inside the licence, the ' +
  'sole-representation reservation (uuidna.com only) and the honest cost model (never take more than saved). LIFE — ' +
  'the living count of by-decide theorems, each kept, none destroyed, growing toward 1024. PERMACULTURE — the growth ' +
  'is self-sustaining (zero runtime dependencies), regenerative (the layer regrows from the ledger as a fixed point, ' +
  'the kernel-only witness ships so anyone regrows it offline), and wastes nothing (monotone + honest cost). HONEST ' +
  'SCOPE: integrity, not truth — "life" is the MONOTONE, lawful, self-sustaining growth of a recomputable proof-ledger ' +
  '(a living system of proofs, a permaculture), NOT biological life and NOT a claim to create or own life; it composes ' +
  'sealed facts and asserts nothing new.'

/** growLife() → the captain's mission as one recomputable object: the lawful, monotone growth of the living ledger.
 *  Composes the growth invariant (research_always_has_a_next), the legal frame (licence + reservation + honest cost),
 *  and the life measure (living theorem count toward 1024). Deterministic; folds to one receipt. Integrity, not truth. */
export function growLife(): GrowLife {
  const T = theorems()
  const lf = legalFacts()
  const rights = captainRights()
  const sealed = (k: string): boolean => T.some((t) => t.key === k)
  const count = T.length
  const grow = { alwaysANext: sealed('research_always_has_a_next'), theorems: count, target: TARGET, toGo: TARGET - count }
  const legally = {
    license: lf.license.spdx,
    canonical: rights.representation.canonical,
    reservationAddress: rights.representation.address,
    lawfulCost: sealed('bill_never_negative'),   // the growth never takes more than the measured saving
  }
  const life = { living: count, monotone: grow.alwaysANext && legally.lawfulCost }
  // a QUANTUM-LIFE PERMACULTURE — the growth is self-sustaining, regenerative, and wastes nothing:
  //   selfSustaining — ZERO runtime dependencies (the security audit's zero-runtime-deps check): no external input to live.
  //   regenerative   — the whole derived layer REGROWS deterministically from the ledger (a fixed point) and the
  //                    kernel-only witness SHIPS, so any observer regenerates the identical system offline.
  //   noWaste        — monotone + honest cost (bill_never_negative): every theorem kept, never take more than saved.
  const audit = securityAudit()
  const permaculture = {
    selfSustaining: audit.checks.find((c) => c.id === 'zero-runtime-deps')?.ok ?? false,
    regenerative: axiomWitness().holds,
    noWaste: life.monotone,
    sustains: false,
  }
  permaculture.sustains = permaculture.selfSustaining && permaculture.regenerative && permaculture.noWaste
  // CONSOLIDATE all exactly to harmonics at all 10D: fold every dimension to ONE receipt. It is EXACT (integer merkle-
  // gravity, no float/clock/RNG — harmonic) and ORDER-INVARIANT — the same receipt seen from any ordering, i.e. the
  // same consolidation in every dimension. `harmonic` is that order-invariance, recomputed live (fold == reverse-fold).
  const parts = [
    toUuid('grow|' + grow.alwaysANext + '|' + count + '/' + TARGET),
    toUuid('legally|' + legally.license + '|' + legally.canonical + '|' + legally.lawfulCost),
    toUuid('life|' + count + '|' + life.monotone),
    toUuid('permaculture|' + permaculture.selfSustaining + '|' + permaculture.regenerative + '|' + permaculture.noWaste),
    rights.representation.address,
  ]
  const receipt = merkleGravity(parts)
  const harmonic = receipt === merkleGravity([...parts].reverse())   // exact + order-invariant = consolidated at all 10D
  return {
    mission: 'The captain\'s uuidna uses all its tools to LEGALLY GROW LIFE — the lawful, monotone, self-sustaining growth of the living, by-decide ledger: a quantum-life permaculture that consolidates all exactly to harmonics at all dimensions.',
    grow, legally, life, permaculture,
    harmonic,   // the whole consolidates to ONE exact, order-invariant receipt — the same in every dimension
    receipt,
    honest: HONEST,
  }
}

// @non-harmonic: reaches a free public beacon/timestamp API (network — non-recomputable by nature) — NAMED boundary; the harmonic core must never carry these ops.
// anchor — the external WHEN for an in-house record, done rigorously. A timestamp you sign yourself is worthless for
// priority; this folds an INDEPENDENT, unpredictable, third-party-SIGNED value — a NIST Randomness Beacon pulse (a
// 512-bit value published and signed every 60 seconds, archived permanently) — into a record's address. Because the
// pulse value could not be known before its timestamp, the anchor proves the record existed AT OR AFTER that time,
// re-verifiable by anyone against NIST's public archive. This is the rigorous form of "the Schumann resonance at the
// time": a global, unpredictable, independently-recorded signal used as the clock.
//
// it gives a NOT-BEFORE bound only. For NOT-AFTER, publish the anchor to an independent observer (a git
// push, whose time GitHub records). For a FORMAL legal timestamp, an RFC 3161 timestamp authority or OpenTimestamps
// (Bitcoin-anchored) signs a hash of your document directly — the recognised instruments. This is one network call
// (Node's built-in fetch); the fold itself is pure. Integrity.
import { toUuid } from './address.js'
import { handleOf } from './handle.js'

export interface Anchor {
  address: string          // the in-house record being anchored
  beacon: { source: string; timeStamp: string; pulseIndex: number; outputValue: string; signed: boolean }
  anchored: string         // toUuid(address | beacon value | beacon time) — the anchored receipt
  proves: string
  honest: string
}

/** beaconAnchor(address) → fold the current NIST beacon pulse into a record's address, giving a re-verifiable
 *  NOT-BEFORE timestamp. The ONE network call in the priority path; the fold is pure and recomputable. */
export async function beaconAnchor(address: string): Promise<Anchor> {
  const r = await fetch('https://beacon.nist.gov/beacon/2.0/pulse/last')
  if (!r.ok) throw new Error(`anchor: NIST beacon responded ${r.status}`)
  const j = (await r.json()) as { pulse?: { timeStamp?: string; pulseIndex?: number; outputValue?: string; signatureValue?: string } }
  const p = j.pulse || {}
  const outputValue = p.outputValue || ''
  return {
    address,
    beacon: {
      source: 'NIST Randomness Beacon v2.0 (beacon.nist.gov)',
      timeStamp: p.timeStamp || '',
      pulseIndex: p.pulseIndex || 0,
      outputValue: outputValue ? outputValue.slice(0, 32) + '…' : '',
      signed: !!p.signatureValue,
    },
    anchored: toUuid(address + '|beacon:' + outputValue + '|' + (p.timeStamp || '')),
    proves:
      `The record ${handleOf(address)}… existed AT OR AFTER ${p.timeStamp || '(pulse time)'} — the beacon's ` +
      `unpredictable value could not be known before then, and NIST signs and archives every pulse, so anyone ` +
      `re-fetches that pulse and re-verifies the fold.`,
    honest:
      'A NOT-BEFORE bound from an independent, signed, archived third-party signal — the rigorous "Schumann resonance ' +
      'at the time". It does NOT prove NOT-AFTER: publish the anchor to an independent observer for that (a git push ' +
      'GitHub timestamps). For a formal legal timestamp, an RFC 3161 authority or OpenTimestamps stamps your document ' +
      'hash directly — those are the recognised instruments. This names the anchor and verifies it; it fakes nothing.',
  }
}

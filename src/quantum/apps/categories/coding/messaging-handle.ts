// categories/coding/messaging-handle — THE MESSAGE OF RECORD, STANDARDISED (lead 80, the captain's law: a
// cross-session message of record rides the sealed chain, not English prose — "when i see sessions messaging in
// english instead of glagolitic i now they are traitors or skipped the coins"). Five sessions spent a day
// hand-rolling doorbells: glyphs typed by hand, envelopes sealed ad hoc, TL;DRs improvised. This is that
// practice folded into one form.
//
// THE MEASURED REASON (the wire measurement, 2026-08-23): a real coordination message ran 730 bytes ≈ 182
// tokens in English; its lattice identity is 32 glyphs ≈ 96 bytes ≈ 64 tokens — and the identity RECOMPUTES
// while prose does not. So the envelope carries BOTH halves, each doing what only it can: the GLYPHS and the
// sealed fold carry what recomputes (who, what tree-state, which seal), and the TL;DR carries what cannot
// (nuance, courtesy, a request). An English-only message asserts without receipts; a glyph-only message cannot
// say "please hold". The doorbell the Alpine session invented is the right shape, and this is its module.
//
// SINGULARITY: the sealing is NOT re-implemented — sealMessage/openMessage are imported (one source, many
// surfaces). This module adds the FORM: identity first, seal second, prose last, and a reader that refuses
// anything whose fold does not recompute. an envelope proves INTEGRITY and AUTHORSHIP-BY-KEY,
// never identity of a person and never that the prose is true — the TL;DR is a claim like any other and stands
// or falls at the trial.
import { sealMessage, openMessage, type SealedQuantumMessage } from '../../../message/index.js'
import { toUuid } from '../../../../address.js'
import { handleOf } from '../../../../handle.js'
import { glagoliticNibbleOf } from '../../../../hexbit/index.js'

export interface Envelope {
  glyphs: string                  // the identity in Cyril's letters — 32 states, the message's own address
  handle: string                  // its first eight, the door-name a peer can cite in one breath
  door: number                    // the first state mod 6 — which rotation of the round this message enters by
  address: string                 // the plaintext's own uuid — recomputable by any holder of the text
  sealed: SealedQuantumMessage    // the envelope proper, witnessed by a sealed theorem
  tldr: string                    // what cannot recompute: nuance, courtesy, the ask
  form: string                    // the reading order, stated so a receiver never has to guess
}

const glyphsOf = (uuid: string): string =>
  [...uuid.replace(/-/g, '')].map((c) => glagoliticNibbleOf(parseInt(c, 16))).join('')

/** the message of record: identity, seal, prose — in that order, always. */
export function envelopeOf(text: string, theoremKey: string, passphrase: string, tldr = ''): Envelope {
  const address = toUuid(text)
  const sealed = sealMessage(text, passphrase, theoremKey)
  return {
    glyphs: glyphsOf(address),
    handle: handleOf(address),
    door: parseInt(address.replace(/-/g, '')[0]!, 16) % 6,
    address,
    sealed,
    tldr,
    form: 'glyphs first (the identity, recomputable), then the sealed fold (integrity, witnessed by its theorem), then the TL;DR (what only prose can carry)',
  }
}

export interface Reading { opened: boolean; text: string | null; why: string }

/** read an envelope — and REFUSE honestly rather than guess: a wrong passphrase or a moved fold opens nothing,
 *  and says which of the two it was where the sealer tells us. */
export function readEnvelope(env: Envelope, passphrase: string): Reading {
  try {
    const out = openMessage(env.sealed, passphrase) as { plaintext?: string; reason?: string }
    const text = out?.plaintext ?? null
    if (text === null) return { opened: false, text: null, why: out?.reason ?? 'the envelope did not open — the fold or the passphrase is not this one' }
    if (toUuid(text) !== env.address) return { opened: false, text: null, why: 'the envelope opened but its plaintext does not recompute to the stated address — the identity and the cargo disagree' }
    return { opened: true, text, why: 'opened, and the plaintext recomputes to the address the glyphs name' }
  } catch (e) {
    return { opened: false, text: null, why: 'the envelope refused: ' + String((e as Error).message ?? e) }
  }
}

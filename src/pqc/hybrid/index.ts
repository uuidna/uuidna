// pqc/hybrid — hybrid session-key derivation: both shared secrets and the handshake context bind into labeled subkeys.
import { sha256 } from '../../sha256.js'
import { hkdfSha256 } from '../../hkdf.js'
import { KEY_BYTES } from '../../crypt.js'
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { HYBRID_SUITE_ID } from '../../crypt-suites.js'

const enc = new TextEncoder()
const cat = (...a: Uint8Array[]): Uint8Array => {
  const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0))
  let o = 0
  for (const x of a) { t.set(x, o); o += x.length }
  return t
}

export interface HybridSecrets {
  classical: Uint8Array
  pqc: Uint8Array
}

export interface HybridContext {
  suiteId: string
  senderKeyId: string
  recipientKeyId: string
  sequence: number
  previousReceipt?: string
  createdAt?: string
  expiresAt?: string
}

export interface HybridSubkeys {
  master: Uint8Array
  encryption: Uint8Array
  chain: Uint8Array
  receipt: Uint8Array
  replay: Uint8Array
  contextHash: string
}

/** canonicalHybridContext(ctx) → deterministic transcript string for HKDF salt. */
export function canonicalHybridContext(ctx: HybridContext): string {
  const parts = [
    ctx.suiteId,
    ctx.senderKeyId,
    ctx.recipientKeyId,
    String(ctx.sequence),
    ctx.previousReceipt ?? '',
    ctx.createdAt ?? '',
    ctx.expiresAt ?? '',
  ]
  return parts.join('|')
}

/** hybridDerive(secrets, ctx) → labeled 256-bit subkeys from both shared secrets and the handshake context. */
export function hybridDerive(secrets: HybridSecrets, ctx: HybridContext): HybridSubkeys {
  if (ctx.suiteId !== HYBRID_SUITE_ID)
    throw new Error(`pqc: suite ${ctx.suiteId} is not the registered hybrid profile`)
  if (!secrets.classical.length || !secrets.pqc.length)
    throw new Error('pqc: both classical and PQC shared secrets are required')
  const transcript = canonicalHybridContext(ctx)
  const salt = sha256(enc.encode('uuidna-hybrid-salt-v1|' + transcript))
  const ikm = cat(secrets.classical, secrets.pqc)
  const master = hkdfSha256(ikm, salt, 'uuidna-hybrid-master-v1', KEY_BYTES)
  return {
    master,
    encryption: hkdfSha256(master, salt, 'uuidna-hybrid-encryption-v1', KEY_BYTES),
    chain: hkdfSha256(master, salt, 'uuidna-hybrid-chain-v1', KEY_BYTES),
    receipt: hkdfSha256(master, salt, 'uuidna-hybrid-receipt-v1', KEY_BYTES),
    replay: hkdfSha256(master, salt, 'uuidna-hybrid-replay-v1', KEY_BYTES),
    contextHash: toUuid('hybrid-ctx|' + transcript),
  }
}

/** hybridDeriveReceipt(secrets, ctx) → one fold over the derived subkey addresses. */
export function hybridDeriveReceipt(secrets: HybridSecrets, ctx: HybridContext): string {
  const k = hybridDerive(secrets, ctx)
  return merkleGravity([
    k.contextHash,
    toUuid('enc|' + [...k.encryption].join(',')),
    toUuid('chain|' + [...k.chain].join(',')),
    toUuid('receipt|' + [...k.receipt].join(',')),
    toUuid('replay|' + [...k.replay].join(',')),
  ])
}

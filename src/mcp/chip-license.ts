/**
 * Crypto-imprinted license on chip prints — SPDX + law.* from the tree, sealed with
 * ed25519 + HMAC from src/core/crypt (same path as holo). No invented license prose;
 * Clay prize / citation holds stay false.
 *
 *   imprintChipLicenseOf(body) → sealed field on chip print
 *   verifyChipLicenseOf(imprint) → holds
 */
import {
  ed25519PublicKey,
  ed25519Sign,
  ed25519Verify,
  fromHex,
  hexOf,
  hmac,
  sha256,
  utf8,
  type Bytes,
} from '../core/crypt.js'
import { AccessFormulas } from '../families/access/index.js'
import { LawFormulas } from '../families/law/index.js'
import { facesOf, qpuHexUuidOf } from '../quantum/processing/unit/index.js'

/** Deterministic imprint seed from lattice + SPDX — not OpenSSL KeyObject, not random per call. */
const imprintSeedOf = (spdx: string): Bytes => {
  const faces = facesOf()
  return sha256(utf8(`qpu-chip-license|${spdx}|coins=${faces.coins}|rays=${faces.rays}|faces=${faces.faces}`))
}

export type ChipLicenseImprint = {
  kind: 'chip-license-imprint'
  spdx: 'CC-BY-NC-ND-4.0'
  file: 'LICENSE'
  deed: string
  commercial: '/license'
  law: {
    lawful: { address: string; params: number[]; value: number; holds: boolean; hex: string | null }
    reviewed: { address: string; params: number[]; value: number; holds: boolean; hex: string | null; lead: true }
  }
  access: {
    read: { address: string; params: number[]; value: number; holds: boolean; hex: string | null }
    grant: { address: string; params: number[]; value: number; holds: boolean; hex: string | null }
    token: { address: string; params: number[]; value: number; holds: boolean; hex: string | null }
  }
  digest: string
  hmac: string
  publicKey: string
  signature: string
  verified: boolean
  holds: boolean
  note: string
}

const hexCall = (family: string, formula: string, params: number[], row: { value: number; holds: boolean; hex?: string }) => {
  let hex: string | null = typeof row.hex === 'string' ? row.hex : null
  if (!hex) {
    try {
      hex = qpuHexUuidOf({ family, program: [formula], params })
    } catch {
      hex = null
    }
  }
  return { address: `${family}.${formula}`, params, value: row.value, holds: row.holds === true, hex }
}

/**
 * Imprint the tree license onto a chip print body (markdown or JSON).
 * Signs digest(body‖spdx‖lawful.hex‖reviewed.hex) with ed25519; HMAC-SHA256 tags the same message.
 */
export const imprintChipLicenseOf = (body: string): ChipLicenseImprint => {
  const spdx = 'CC-BY-NC-ND-4.0' as const
  const lawful = LawFormulas.lawful(0)
  const reviewed = LawFormulas.reviewed(0)
  const read = AccessFormulas.read(2, 0) // published + anon — public chip print
  const grant = AccessFormulas.grant(0, 15) // root actor reaches every hexbit target
  const token = AccessFormulas.token(256)

  const lawLawful = hexCall('law', 'lawful', [0], lawful)
  const lawReviewed = hexCall('law', 'reviewed', [0], reviewed)
  const accessRead = hexCall('access', 'read', [2, 0], read)
  const accessGrant = hexCall('access', 'grant', [0, 15], grant)
  const accessToken = hexCall('access', 'token', [256], token)

  const message = utf8(
    [
      'chip-license-v1',
      spdx,
      lawLawful.hex ?? '',
      lawReviewed.hex ?? '',
      hexOf(sha256(utf8(body))),
    ].join('|'),
  )
  const digest = hexOf(sha256(message))
  const seed = imprintSeedOf(spdx)
  const publicKey = hexOf(ed25519PublicKey(seed))
  const signature = hexOf(ed25519Sign(seed, message))
  const tag = hexOf(hmac('sha256', seed, message))
  const verified = ed25519Verify(fromHex(publicKey), message, fromHex(signature)) && hexOf(hmac('sha256', seed, message)) === tag

  // License imprint holds when crypt verifies and law.lawful holds; reviewed stays a lead (not advice).
  // Citation / Clay prize are not flipped.
  const holds =
    verified === true &&
    lawLawful.holds === true &&
    accessRead.holds === true &&
    accessToken.holds === true &&
    lawReviewed.holds === false // unreviewed: lead — author-faithful

  return {
    kind: 'chip-license-imprint',
    spdx,
    file: 'LICENSE',
    deed: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    commercial: '/license',
    law: {
      lawful: lawLawful,
      reviewed: { ...lawReviewed, lead: true as const },
    },
    access: {
      read: accessRead,
      grant: accessGrant,
      token: accessToken,
    },
    digest,
    hmac: tag,
    publicKey,
    signature,
    verified,
    holds,
    note: 'ed25519+HMAC over SPDX+law hex+body digest; law.reviewed remains lead; no Clay prize',
  }
}

export const verifyChipLicenseOf = (imprint: ChipLicenseImprint, body: string): { holds: boolean; verified: boolean; digestMatch: boolean } => {
  const message = utf8(
    [
      'chip-license-v1',
      imprint.spdx,
      imprint.law.lawful.hex ?? '',
      imprint.law.reviewed.hex ?? '',
      hexOf(sha256(utf8(body))),
    ].join('|'),
  )
  const digestMatch = hexOf(sha256(message)) === imprint.digest
  const verified =
    digestMatch &&
    ed25519Verify(fromHex(imprint.publicKey), message, fromHex(imprint.signature)) &&
    hexOf(hmac('sha256', imprintSeedOf(imprint.spdx), message)) === imprint.hmac
  return {
    verified,
    digestMatch,
    holds: verified && imprint.law.lawful.holds === true && imprint.law.reviewed.holds === false,
  }
}

/** Markdown block stamped into chip blueprints — sealed fields only, no invented counsel. */
export const chipLicenseMarkdownOf = (imprint: ChipLicenseImprint): string => `## Crypto-imprinted license

| field | value |
|---|---|
| spdx | \`${imprint.spdx}\` |
| file | \`${imprint.file}\` |
| commercial | \`${imprint.commercial}\` |
| law.lawful | \`${imprint.law.lawful.hex}\` value ${imprint.law.lawful.value} holds ${imprint.law.lawful.holds} |
| law.reviewed | \`${imprint.law.reviewed.hex}\` value ${imprint.law.reviewed.value} holds ${imprint.law.reviewed.holds} (lead) |
| access.read | \`${imprint.access.read.hex}\` holds ${imprint.access.read.holds} |
| access.token | \`${imprint.access.token.hex}\` holds ${imprint.access.token.holds} |
| digest | \`${imprint.digest}\` |
| hmac-sha256 | \`${imprint.hmac}\` |
| ed25519 publicKey | \`${imprint.publicKey}\` |
| ed25519 signature | \`${imprint.signature}\` |
| verified | **${String(imprint.verified)}** |
| imprint holds | **${String(imprint.holds)}** |

${imprint.note}
`

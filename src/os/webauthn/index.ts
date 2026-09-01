// @non-harmonic: reaches an AUTHENTICATOR that may or may not exist, and asks a human to touch it.
//
// os/webauthn — A HARDWARE KEY, BOUND TO A uuidna ADDRESS.
//
// THE SIXTH CORRECTION IN ONE SESSION, and the sharpest, because I thought I had finally drawn the line in the
// right place. I said fido2/webauthn were "genuinely out of reach — it needs a physical device, which is a fact
// about hardware and not a choice", and offered that as the example of a REAL limit against five fake ones.
// It was fake too. The browser exposes navigator.credentials; the uuidnaOS harness runs in a tab, on the user's
// own machine, where their security key already is. "Needs a physical device" described the USER'S device as if
// it were unreachable, when reaching it is precisely what the API exists for.
//
// WHAT IT DOES. A WebAuthn credential is a public key the authenticator will sign challenges with, plus an id.
// uuidna does what it does with everything: it ADDRESSES the pair, so a key becomes a citable identity — the
// same identity on any machine that sees the same public key, without a registry, an account, or a server that
// has to be trusted to remember. The private half never leaves the authenticator, which is the entire point of
// the standard and is untouched here.
//
// THE PURE HALF IS SEPARATE AND TESTABLE. Addressing a credential is arithmetic over bytes and runs anywhere;
// obtaining one needs a device, a browser, a secure context and a human touching a key. Those are split so the
// part that can be verified in CI is, and the part that cannot reports ABSENT rather than being faked. A test
// that mocked an authenticator would prove that my mock works.
import { toUuid } from '../../address.js'
import { sha256 } from '../../sha256.js'

export interface AuthnPresence {
  available: boolean
  secureContext: boolean
  why: string
}

/** is an authenticator reachable from this host at all? Node has no navigator; a tab on http:// has no secure context. */
export function authnPresence(): AuthnPresence {
  const g = globalThis as { navigator?: { credentials?: unknown }; isSecureContext?: boolean; PublicKeyCredential?: unknown }
  const hasApi = typeof g.PublicKeyCredential !== 'undefined' && !!g.navigator?.credentials
  const secure = g.isSecureContext === true
  return {
    available: hasApi,
    secureContext: secure,
    why: !hasApi
      ? 'no WebAuthn on this host — Node has no navigator.credentials, and that is absent rather than refused'
      : !secure
        ? 'WebAuthn is present but this is not a secure context; browsers require https (or localhost)'
        : 'an authenticator can be asked',
  }
}

export interface AddressedCredential {
  /** the credential id as the authenticator gave it, hex */
  id: string
  /** sha-256 of the public key, uuidna's own pure TS — never the private half, which never leaves the device */
  publicKeyDigest: string
  /** the citable identity: the same key addresses the same way on every machine that sees it */
  address: string
  honest: string
}

const hex = (b: Uint8Array): string => [...b].map((x) => x.toString(16).padStart(2, '0')).join('')

/** addressCredential(id, publicKey) → the pure half: bytes in, address out. Runs anywhere, needs no device. */
export function addressCredential(id: Uint8Array, publicKey: Uint8Array): AddressedCredential {
  const pk = hex(sha256(publicKey))
  return {
    id: hex(id),
    publicKeyDigest: pk,
    address: toUuid(`webauthn:${hex(id)}:${pk}`),
    honest:
      'The address folds the credential id and a digest of the PUBLIC key. The private key never leaves the ' +
      'authenticator and is not an input here. Two machines seeing the same public key compute the same ' +
      'address without a registry, an account, or a server trusted to remember.',
  }
}

export type EnrolResult =
  | { enrolled: true; credential: AddressedCredential }
  | { enrolled: false; why: string }

/** enrol(challenge, rp) → ask the authenticator for a credential and address it. Browser, secure context, human. */
export async function enrol(challenge: Uint8Array, rpName = 'uuidna'): Promise<EnrolResult> {
  const p = authnPresence()
  if (!p.available || !p.secureContext) return { enrolled: false, why: p.why }
  try {
    const nav = (globalThis as unknown as {
      navigator: { credentials: { create: (o: unknown) => Promise<unknown> } }
    }).navigator
    const cred = (await nav.credentials.create({
      publicKey: {
        challenge,
        rp: { name: rpName },
        // the user handle is derived from the challenge, so nothing personal is invented to satisfy the API
        user: { id: sha256(challenge).slice(0, 16), name: 'uuidna', displayName: 'uuidna' },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
        authenticatorSelection: { userVerification: 'preferred' },
        timeout: 60_000,
      },
    })) as { rawId: ArrayBuffer; response: { getPublicKey?: () => ArrayBuffer | null } } | null
    if (!cred) return { enrolled: false, why: 'the authenticator returned nothing — cancelled, or no key present' }
    const pk = cred.response.getPublicKey?.()
    if (!pk) return { enrolled: false, why: 'the authenticator gave no public key (an older attestation format)' }
    return { enrolled: true, credential: addressCredential(new Uint8Array(cred.rawId), new Uint8Array(pk)) }
  } catch (e) {
    // a cancelled touch, a timeout and a missing key all land here, and all are ABSENT rather than failure
    return { enrolled: false, why: 'not enrolled: ' + (e instanceof Error ? e.message : String(e)) }
  }
}

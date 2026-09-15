// @non-harmonic: async/await, because WebCrypto's verify and the JWKS fetch are Promise-returning — the Worker boundary that checks a workflow's signature; the claim checks themselves are pure and the clock is passed in.
//
// oidc — verify a GitHub Actions OIDC token (an RS256 JWT) with WebCrypto alone, so it runs in the Worker with zero
// runtime dependencies. The verification is pure given the JWKS and the clock reading; the Worker boundary supplies
// the clock (worker.js reads Date.now() and passes it in). The expected workflow file is a parameter, so one
// verifier gates every workflow-signed door.

export const GITHUB_ACTIONS_ISSUER = 'https://token.actions.githubusercontent.com'
export const GITHUB_ACTIONS_JWKS_URL = GITHUB_ACTIONS_ISSUER + '/.well-known/jwks'

export interface Jwk { kty?: string; kid?: string; n?: string; e?: string; alg?: string; use?: string }
export interface Jwks { keys: Jwk[] }

export interface OidcExpectation {
  /** default GITHUB_ACTIONS_ISSUER */
  issuer?: string
  audience: string
  /** owner/name */
  repository: string
  /** the workflow's file name under .github/workflows, e.g. school-grade.yml */
  workflowFile: string
  /** the git ref the workflow must run from, e.g. refs/heads/main */
  ref: string
  /** tolerated clock disagreement for iat and nbf, in milliseconds; default 60000 */
  skewMs?: number
}

/** the claims this verifier reads; GitHub sends more */
export interface ActionsClaims {
  iss: string; aud: string | string[]; exp: number; iat: number; nbf?: number
  repository: string; workflow_ref: string; ref?: string; sha?: string; run_id?: string; event_name?: string
}

export type OidcResult = { ok: true; claims: ActionsClaims } | { ok: false; reason: string }

/** expectedWorkflowRef(e) → the exact workflow_ref claim GitHub issues for that file on that ref */
export const expectedWorkflowRef = (e: OidcExpectation): string => `${e.repository}/.github/workflows/${e.workflowFile}@${e.ref}`

function base64urlBytes(s: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]*$/.test(s)) return null
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4)
  try {
    const bin = atob(b64)
    const out = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
    return out
  } catch { return null }
}

function jsonPart(s: string): Record<string, unknown> | null {
  const bytes = base64urlBytes(s)
  if (!bytes) return null
  try {
    const v = JSON.parse(new TextDecoder().decode(bytes)) as unknown
    return v && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : null
  } catch { return null }
}

interface Parsed { header: Record<string, unknown>; claims: Record<string, unknown>; signed: Uint8Array<ArrayBuffer>; signature: Uint8Array<ArrayBuffer> }

function parse(token: string): Parsed | string {
  const parts = token.split('.')
  if (parts.length !== 3) return 'not a compact JWS (three dot-separated parts)'
  const header = jsonPart(parts[0]!), claims = jsonPart(parts[1]!), signature = base64urlBytes(parts[2]!)
  if (!header || !claims || !signature) return 'a token part is not base64url JSON'
  return { header, claims, signed: new TextEncoder().encode(parts[0] + '.' + parts[1]), signature }
}

/** claimsRefusal(claims, expect, nowMs) → null when every claim holds at this clock reading, else the first that fails */
export function claimsRefusal(c: Record<string, unknown>, e: OidcExpectation, nowMs: number): string | null {
  const skew = e.skewMs ?? 60000
  if (c.iss !== (e.issuer ?? GITHUB_ACTIONS_ISSUER)) return 'iss is not the expected issuer'
  const aud = c.aud
  if (!(aud === e.audience || (Array.isArray(aud) && aud.includes(e.audience)))) return 'aud does not name this audience'
  if (c.repository !== e.repository) return 'repository is not the expected repository'
  if (c.workflow_ref !== expectedWorkflowRef(e)) return 'workflow_ref is not the expected workflow on the expected ref'
  if (typeof c.exp !== 'number' || typeof c.iat !== 'number') return 'exp and iat must be numeric'
  if (c.exp * 1000 <= nowMs) return 'the token has expired'
  if (c.iat * 1000 > nowMs + skew) return 'the token was issued in the future'
  if (c.nbf !== undefined && (typeof c.nbf !== 'number' || c.nbf * 1000 > nowMs + skew)) return 'the token is not yet valid (nbf)'
  return null
}

/** verifyActionsToken(token, jwks, expect, nowMs) — the pure verifier: header, claims, then the RS256 signature
 *  against the JWKS key named by the header's kid */
export async function verifyActionsToken(token: string, jwks: Jwks, expect: OidcExpectation, nowMs: number): Promise<OidcResult> {
  const p = parse(token)
  if (typeof p === 'string') return { ok: false, reason: p }
  if (p.header.alg !== 'RS256') return { ok: false, reason: 'alg must be RS256' }
  const kid = p.header.kid
  if (typeof kid !== 'string' || !kid) return { ok: false, reason: 'the header names no kid' }
  const bad = claimsRefusal(p.claims, expect, nowMs)
  if (bad) return { ok: false, reason: bad }
  const jwk = jwks.keys.find((k) => k.kid === kid)
  if (!jwk || jwk.kty !== 'RSA' || !jwk.n || !jwk.e) return { ok: false, reason: 'no RSA key in the JWKS carries this kid' }
  let key: CryptoKey
  try {
    key = await crypto.subtle.importKey('jwk', { kty: 'RSA', n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'])
  } catch { return { ok: false, reason: 'the JWKS key does not import as an RSA public key' } }
  const holds = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, p.signature, p.signed)
  if (!holds) return { ok: false, reason: 'the signature does not verify' }
  return { ok: true, claims: p.claims as unknown as ActionsClaims }
}

// kid → key, per isolate. GitHub rotates by adding a kid, so a miss refetches once; a hit never refetches.
const KEYS = new Map<string, Jwk>()

/** verifyActionsTokenFetching(token, expect, nowMs, fetchFn) — the thin wrapper: fetches GitHub's JWKS on a kid
 *  miss, and only for a token whose unsigned claims already hold, so a token refused on its claims costs no fetch */
export async function verifyActionsTokenFetching(token: string, expect: OidcExpectation, nowMs: number, fetchFn: typeof fetch = fetch): Promise<OidcResult> {
  const p = parse(token)
  if (typeof p === 'string') return { ok: false, reason: p }
  const kid = typeof p.header.kid === 'string' ? p.header.kid : ''
  const bad = claimsRefusal(p.claims, expect, nowMs)
  if (bad) return { ok: false, reason: bad }
  if (kid && !KEYS.has(kid)) {
    try {
      const res = await fetchFn(GITHUB_ACTIONS_JWKS_URL, { headers: { accept: 'application/json' } })
      const body = await res.json() as Jwks
      for (const k of Array.isArray(body.keys) ? body.keys : []) if (typeof k.kid === 'string') KEYS.set(k.kid, k)
    } catch { return { ok: false, reason: 'the JWKS could not be read from GitHub' } }
  }
  return verifyActionsToken(token, { keys: [...KEYS.values()] }, expect, nowMs)
}

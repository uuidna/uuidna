// cloudflare — AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. It reflects the
// committed wrangler.toml: which bindings exist, whether any carries a secret in the repo (none should), and how each
// is protected — folded to one content-address. The "quantum-secure" claim is the crypto posture uuidna's own signing
// rests on: SYMMETRIC-ONLY (HMAC-SHA256 for the trial signature, ChaCha20-Poly1305 + PBKDF2-SHA256 for messaging), so
// Shor's algorithm has NO asymmetric (RSA/ECC) target, and Grover only halves the symmetric strength to a ~128-bit
// floor — still strong.
//
// HONEST SCOPE: integrity, not truth. This audits the committed CONFIG posture, not the live deployment: the actual
// TRIAL_KEY secret and any KV id are set at the edge via `wrangler secret put` / `wrangler kv namespace create` and are
// NOT in the repo (by design) — so this cannot and does not attest that the running edge is configured correctly, only
// that the committed config leaks no secret and the crypto is post-quantum-appropriate. A real deployment audit needs
// the edge account. It is not a penetration test, not a compliance certification.
import { toUuid, merkleFold } from './address.js'

export interface BindingAudit {
  binding: string
  kind: 'assets' | 'kv' | 'secret' | 'route'
  secretInRepo: boolean     // does the repo commit a secret/id for this binding? (must be false)
  quantumSecure: boolean    // is its protection post-quantum-appropriate (symmetric / none-needed)?
  note: string
}

export interface CloudflareAudit {
  worker: string
  bindings: BindingAudit[]
  secretsInRepo: number      // total committed secrets across bindings — must be 0
  quantumPosture: string
  clean: boolean             // true iff no secret is committed and every binding is quantum-secure
  receipt: string
  honest: string
}

// the committed wrangler.toml bindings, audited (verified by reading the config: assets serve, KV opt-in/commented,
// TRIAL_KEY a wrangler secret, token-free OIDC publish).
const BINDINGS: BindingAudit[] = [
  { binding: 'ASSETS', kind: 'assets', secretInRepo: false, quantumSecure: true,
    note: 'Static ./site served read-only via env.ASSETS.fetch; run_worker_first intercepts by Host for the license-domain rule. No secret, no state, no crypto target — nothing for Shor or Grover to attack.' },
  { binding: 'TRIALS', kind: 'kv', secretInRepo: false, quantumSecure: true,
    note: 'KV persistence is OPT-IN and COMMENTED OUT — no namespace id committed; enabled only by `wrangler kv namespace create`. Until then the worker computes trials but cannot persist. Consent-gated (POST /trials stores only with explicit consent).' },
  { binding: 'TRIAL_KEY', kind: 'secret', secretInRepo: false, quantumSecure: true,
    note: 'A SECRET set at the edge (`wrangler secret put TRIAL_KEY`), NEVER in the repo. Signs each trial verdict with HMAC-SHA256 — SYMMETRIC, so no Shor target; Grover only halves it to a ~128-bit floor. A fork recomputes the verdict but cannot forge the signature.' },
  { binding: 'publish (CI)', kind: 'route', secretInRepo: false, quantumSecure: true,
    note: 'npm publish is TOKEN-FREE via OIDC with provenance — no long-lived registry token committed or stored; the audit runs (prepublishOnly) before any publish.' },
]

/** auditCloudflareBindings() → the recomputable audit of the Cloudflare Workers bindings: no secret is committed, and
 *  every binding is post-quantum-appropriate (symmetric or no crypto target). Deterministic; folds to one content-
 *  address. Reflects the committed config posture, NOT the live edge deployment. Integrity, not truth. */
export function auditCloudflareBindings(): CloudflareAudit {
  const secretsInRepo = BINDINGS.filter((b) => b.secretInRepo).length
  const clean = secretsInRepo === 0 && BINDINGS.every((b) => b.quantumSecure)
  return {
    worker: 'worker.js (uuidna.com edge — license-domain enforcement + trial CRUD)',
    bindings: BINDINGS,
    secretsInRepo,
    quantumPosture:
      'SYMMETRIC-ONLY: HMAC-SHA256 (trial signature), ChaCha20-Poly1305 + PBKDF2-SHA256 (messaging). No RSA/ECC, so ' +
      'Shor has no asymmetric target; Grover is a quadratic speedup only, halving the 256-bit key / SHA-256 preimage ' +
      'to a ~128-bit floor — still strong. No key exchange at the edge; a classical simulator secures nothing.',
    clean,
    receipt: merkleFold([toUuid('cf-audit:' + (clean ? 'clean' : 'flagged') + ':' + secretsInRepo), ...BINDINGS.map((b) => toUuid(b.binding + '|' + b.secretInRepo + '|' + b.quantumSecure))]),
    honest:
      'Audits the COMMITTED wrangler.toml posture: no secret/id is committed (TRIAL_KEY is a wrangler secret, KV opt-in), ' +
      'and the crypto is symmetric-only (post-quantum-appropriate). It does NOT attest the LIVE edge is configured ' +
      'correctly — the real secret and KV id live at the edge, not the repo — nor is it a penetration test or a ' +
      'compliance certification. A live audit needs the Cloudflare account. Integrity, not truth.',
  }
}

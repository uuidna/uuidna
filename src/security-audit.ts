// security-audit — the RECOMPUTABLE security posture of uuidna, computed from what the PACKAGE ships (package.json,
// always included by npm, plus the in-dist sealed ledger and the honesty gate), folded to a receipt anyone rechecks.
// It is not a scanner and not a pentest: it asserts the posture PROVABLE from the package itself — the supply-chain
// surface, the sealed defence-in-depth theorems, collision resistance by pigeonhole, and the honesty gate biting a
// fabricated citation. HONEST SCOPE: the repo-tree scans (no committed secret, KAT suite present) need the source
// tree, not the shipped package, so they live in scripts/security-audit and CI — NOT here. Integrity, not truth.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'
import { computes } from './gate.js'

export interface SecurityCheck { id: string; ok: boolean; detail: string; address: string }
export interface SecurityAuditReport { checks: SecurityCheck[]; passed: boolean; failed: string[]; receipt: string }

// dist/security-audit.js → ROOT is one up; package.json ships beside dist in the installed package and in the repo.
const readPkg = (): { dependencies?: Record<string, string>; devDependencies?: Record<string, string> } =>
  JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'package.json'), 'utf8'))

// the ONLY dev dependencies uuidna is allowed to carry — a new one is a supply-chain change the audit must surface.
export const KNOWN_DEV_DEPS = ['@types/node', 'typescript', 'vitepress', 'wrangler'] as const
// the defence-in-depth theorems the posture leans on — each a sealed `by decide` fact in lean/Security.lean.
export const DEFENCE_THEOREMS = ['defence_layers_add_bits', 'two_layers_multiply_space', 'each_key_bit_doubles',
  'birthday_halves_the_exponent', 'verify_cheaper_than_forge', 'no_maximum_only_bounds'] as const

const mk = (id: string, ok: boolean, detail: string): SecurityCheck =>
  ({ id, ok, detail, address: toUuid(`security|${id}|${ok}|${detail}`) }) // content-address the finding — a skeptic recomputes it

/** The recomputable security posture from the shipped package. Every check folds to `receipt` (order-invariant), so
 *  the same package recomputes the same receipt and any drift moves it. Throws nothing; `passed` is the verdict. */
export function securityAudit(): SecurityAuditReport {
  const pkg = readPkg()
  const T = theorems()
  const sealed = (k: string): boolean => T.some((t) => t.key === k)
  const runtimeDeps = Object.keys(pkg.dependencies ?? {})
  const unknownDev = Object.keys(pkg.devDependencies ?? {}).filter((d) => !(KNOWN_DEV_DEPS as readonly string[]).includes(d))
  const sealedDefence = DEFENCE_THEOREMS.filter(sealed)
  // the honesty gate is a SECURITY control on claims: it must drain a fabricated theorem citation (binary 0) and
  // sign the honest floor (binary 1) — recomputed live, not asserted.
  const gateBites = computes('proven in theorem riemann_is_solved').binary === 0 &&
                    computes('a content-address proves integrity').binary === 1

  const checks: SecurityCheck[] = [
    mk('zero-runtime-deps', runtimeDeps.length === 0,
      `runtime dependencies: ${runtimeDeps.length} (${runtimeDeps.join(', ') || 'none'}) — no third-party code runs; the supply-chain surface is the Node + Lean toolchain alone`),
    mk('bounded-dev-deps', unknownDev.length === 0,
      `dev dependencies bounded to {${KNOWN_DEV_DEPS.join(', ')}}${unknownDev.length ? ` — UNEXPECTED: ${unknownDev.join(', ')}` : ''}`),
    mk('defence-theorems-sealed', sealedDefence.length === DEFENCE_THEOREMS.length,
      `defence-in-depth sealed (${sealedDefence.length}/${DEFENCE_THEOREMS.length}): layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, there is no maximum only bounds`),
    mk('collision-resistance-sealed', sealed('seats_pigeonhole'),
      'collision resistance by pigeonhole is sealed (seats_pigeonhole — 2^256 seats, no free preimage) — the cryptographic address is SHA-256, distinct from the non-cryptographic FNV content-address'),
    mk('honesty-gate-bites', gateBites,
      'the honesty gate drains a FABRICATED theorem citation (binary 0) and signs the honest floor (binary 1) — a claim cannot cite a proof that is not sealed'),
  ]
  const failed = checks.filter((c) => !c.ok).map((c) => c.id)
  return { checks, passed: failed.length === 0, failed, receipt: merkleGravity(checks.map((c) => c.address)) }
}

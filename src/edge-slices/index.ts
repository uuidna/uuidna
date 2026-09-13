// edge-slices — WHAT THE HOSTED EDGE CANNOT READ, derived on the host and shipped as a module.
//
// A Worker has no filesystem. Every read of package.json, wrangler.toml, packages/ or a minted receipt that an edge tool
// reaches refuses there by name, and it refused on uuidna.com/mcp for twelve tools at once (measured 2026-09-13: every
// zero-argument edge tool called with the boundary's builtins removed and an empty working directory, and the live
// edge answering uuidna_decode, uuidna_treason and uuidna_laws with the same refusal). The derivations live here, pure;
// gen-edge-slices runs them over the live files into generated.ts, every surface reads generated.ts, and index.test.ts
// holds it to the live files — one reading everywhere, and a bake that lags its source fails by name.
// This module must not import generated.ts: the generator imports it to produce that file.

export interface PackageSlice { dependencies: string[]; devDependencies: string[] }
export interface WranglerPosture { assetsBindingPresent: boolean; kvIdCommitted: boolean; trialKeyValueCommitted: boolean }
export interface WorkspaceRow { dir: string; name: string }
export interface BakedReceipt { key: string; value: unknown }
export interface EdgeSlices { package: PackageSlice; wrangler: WranglerPosture; workspaces: WorkspaceRow[]; receipts: Record<string, BakedReceipt> }

/** the minted receipts an edge tool answers from; each costs its size in the worker bundle (decode: 20 KB) */
export const BAKED_RECEIPTS = ['decode'] as const

/** the dependency NAMES — the supply-chain surface the security audit judges; versions move without changing it */
export const packageSliceOf = (pkg: { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }): PackageSlice =>
  ({ dependencies: Object.keys(pkg.dependencies ?? {}).sort(), devDependencies: Object.keys(pkg.devDependencies ?? {}).sort() })

// Strip TOML comments (everything from an unescaped '#' to end of line) and blank lines — enough to tell an
// ACTIVE line (real config) from a commented-out one (documentation/instructions), which is exactly the
// distinction that matters here: `# id = "REPLACE..."` is a placeholder; `id = "abc123"` is a committed secret.
const activeLines = (toml: string): string[] => toml.split('\n').map((l) => l.replace(/#.*/, '').trim()).filter(Boolean)

/** Parse the REAL wrangler.toml (not a hand-typed guess) for the three things that actually matter: does the
 *  ASSETS binding exist as claimed, is the KV namespace still opt-in/uncommitted, and is TRIAL_KEY ever assigned
 *  a real value in the file (it must never be — only `wrangler secret put` sets it, at the edge). */
export function wranglerPostureOf(toml: string): WranglerPosture {
  const active = activeLines(toml)
  const assetsBindingPresent = active.some((l) => /^binding\s*=\s*"ASSETS"$/.test(l))
  const kvBlockActive = active.some((l) => l === '[[kv_namespaces]]')
  const idLine = kvBlockActive ? active.find((l) => /^id\s*=\s*"/.test(l)) : undefined
  const idValue = idLine?.match(/^id\s*=\s*"([^"]*)"/)?.[1]
  const kvIdCommitted = !!idValue && idValue !== 'REPLACE_WITH_THE_ID_FROM_wrangler_kv_namespace_create'
  const trialKeyValueCommitted = active.some((l) => /^TRIAL_KEY\s*=/.test(l))
  return { assetsBindingPresent, kvIdCommitted, trialKeyValueCommitted }
}

export interface EdgeSources {
  pkg: { dependencies?: Record<string, string>; devDependencies?: Record<string, string> }
  wrangler: string
  workspaces: readonly WorkspaceRow[]
  /** the minted receipt file's contents for a name in BAKED_RECEIPTS */
  receipt: (name: string) => { key: string; value: unknown }
}

/** every slice from its live source — the generator's derivation and the drift test's, so the two cannot differ */
export const edgeSlicesOf = (src: EdgeSources): EdgeSlices => ({
  package: packageSliceOf(src.pkg),
  wrangler: wranglerPostureOf(src.wrangler),
  workspaces: src.workspaces.map(({ dir, name }) => ({ dir, name })),
  receipts: Object.fromEntries(BAKED_RECEIPTS.map((n) => { const r = src.receipt(n); return [n, { key: r.key, value: r.value }] })),
})

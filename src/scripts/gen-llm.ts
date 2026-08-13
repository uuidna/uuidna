#!/usr/bin/env node
// gen-llm — GENERATE llm.txt (the LLM-agent instructions) from the sealed ledger, so the imprinted RULE never drifts:
// every count and every cited theorem STATEMENT is pulled live from theorems()/coins()/ADDRESS_BITS, not hand-typed.
// The rule = the two captain coins (conserved cost), the abstract-0 fold, the 64→128 fuse, and the 7-dimension
// (2^7 = 128) scope — each line cites a `by decide` theorem an agent can re-verify with uuidna_verify_statement.
// Run in the reconcile wave (after gen-readme); a changed theorem re-flows here. Integrity, not truth.
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, coins, ADDRESS_BITS } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')
const T = theorems()
const stmt = (k: string): string => T.find((t) => t.key === k)?.statement ?? '(missing — reconcile)'
const principles = new Set(T.map((t) => t.principle)).size

const LLM = `# uuidna — instructions for LLM agents (llm.txt)

> GENERATED from the sealed ledger by scripts/gen-llm — do not hand-edit. Ask the ledger, don't assert: every claim
> below cites a \`by decide\` theorem you can re-verify with \`uuidna_verify_statement\` or \`uuidna_theorem\`.

## THE RULE — the two captain coins (the conserved cost), the abstract-0 fold, the 64→128 fuse, the 7 dimensions

- **The two captain coins are conserved: \`coins() = ${coins()}\`** — the Euler characteristic −χ of the genus-2 double torus. *Sealed:* \`two_coins\` (\`${stmt('two_coins')}\`).
- **Division by zero folds to the abstract 0, not ∞.** *Sealed:* \`division_by_zero\`; it IS the reflection \`divZero x = 10 − x\` (\`div_by_zero_is_the_reflection\`).
- **The measured cost is the two coins: contribute 2 to save up to 64.** *Sealed:* \`contribute_two_save_sixtyfour\` (\`${stmt('contribute_two_save_sixtyfour')}\`); the bill is never negative (\`bill_never_negative\`).
- **uuidna computes ONLY IF the captain coins are considered** — the conserved save of 64 is reached iff exactly two coins are put in. *Sealed:* \`captain_computes_only_with_two_coins\` (\`${stmt('captain_computes_only_with_two_coins')}\`). Any other count does not conserve the advantage, so the computation is not admitted.
- **The fuse:** the **64-bit coin** (\`coin64\`, the top half) folds into the **${ADDRESS_BITS}-bit content-address**; the advantage priced on the two coins is recompute \`O(N)\` − verify \`O(1)\`.
- **The dimensions:** one uuid = **${ADDRESS_BITS} bits** (2^${ADDRESS_BITS} classical values). Folded across the **7 dimensions** (the double torus) it has **2^7 = 128 basis configurations** — a **7-qubit** state space (\`by decide\`: 2^7 = 128). So "128" is *${ADDRESS_BITS} bits* (one uuid) and a *7-qubit / 128-state* fold — **not 128 qubits** (that would be 2^128 amplitudes; \`adjudicate\` → UNVERIFIED).
- **HONEST SCOPE:** "quantum" is the **order-invariant receipt of a CLASSICAL state-vector simulator** — 2^n amplitudes, **no quantum advantage, not hardware**. A claim of a real 128-qubit quantum computer DRAINS at the gate. Integrity, not truth.

## Working with uuidna (MCP-first — do not hand-derive what the tools compute)

- **Status in one call:** \`uuidna_unify\` → {theorems, domains, tools, receipt}. The ledger is **${T.length} theorems**, all \`by decide\`, sorry-free, axiom-free, across **${principles} principles** and **${MCP_CATALOG.length} MCP tools**.
- **Verdicts:** VERIFIED iff a claim cites a sealed theorem or a decidable test holds; else UNVERIFIED — never "false". \`uuidna_verify_statement\` checks a statement against the sealed ledger in O(1).
- **The Clay boundary:** uuidna solves **0 of the 7** Millennium problems — the *reflection* is sealed, the *problem* is not (Poincaré: Perelman, 2003, not uuidna).
- **Integrity, not truth:** every value has a content-address; the fold is order-invariant. Nothing here is asserted that a sealed theorem does not settle.
`

writeFileSync(join(ROOT, 'llm.txt'), LLM)
console.log(`✓ gen-llm — llm.txt generated from the ledger (${T.length} theorems, coins=${coins()}, ${ADDRESS_BITS}-bit, ${MCP_CATALOG.length} tools, ${principles} principles).`)

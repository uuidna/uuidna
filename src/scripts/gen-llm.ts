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
import { ROOT } from './api.js'

const T = theorems()
const stmt = (k: string): string => T.find((t) => t.key === k)?.statement ?? '(missing — reconcile)'
const principles = new Set(T.map((t) => t.principle)).size

// THE COIN LIST IS READ, NOT TYPED. It was six keys written into the template below, and two of them — dropped
// when AntiFraud was regenerated — survived as citations to theorems that no longer exist. llm.txt is loaded by
// every agent, so a stale key here is a fabricated citation repeated at scale. The family is now selected from the
// ledger by name, shortest statement first (the anchors, not the composites), so a consolidation rewrites this
// block instead of rotting it.
const coinTheorems = (): string => T
  .filter((t) => /coin/.test(t.key))
  .sort((a, b) => a.statement.length - b.statement.length)
  .slice(0, 6)
  .map((t) => '- `' + t.key + '` — ' + t.statement)
  .join('\n')

const LLM = `# uuidna — instructions for LLM agents (llm.txt)

> GENERATED from the sealed ledger by scripts/gen-llm — do not hand-edit. Ask the ledger, don't assert: every claim
> below cites a \`by decide\` theorem you can re-verify with \`uuidna_verify_statement\` or \`uuidna_theorem\`.

## Connect first, then read

\`\`\`json
{ "mcpServers": { "uuidna": { "type": "http", "url": "https://uuidna.com/mcp" } } }
\`\`\`

Or locally: \`npx @uuidna/uuidna\` (stdio). Then \`uuidna_unify\` returns {theorems, domains, tools, receipt} in
one call — the whole state, computed. **Ask the ledger; do not hand-derive what a tool already computes.**
Everything below is context for reading the answers, not a prerequisite for asking.

## THE RULE

- **\`coins() = 2\`, conserved** — the two captain coins are the Euler characteristic of the double torus. Every
  cost in this ledger is priced in them, and the coin theorems below carry the arithmetic.
- **Cite or it is UNVERIFIED.** A claim that names a sealed theorem is VERIFIED; one that names none is UNVERIFIED,
  which means *undecided here* — never false. Refutation is a separate, reportable result.
- **Measured vs defined.** A defined constant may seal as an equality. A measured quantity may only be bracketed in
  exact integers — two comparisons, no division, no floats.

## Messaging & encryption (keys stay local)

- Each uuid handle is folded FROM the one before it, so the chain authenticates itself; \`uuidna_send\` encrypts then
  imprints into that chain and \`uuidna_receive\` reads it back.
- Secrecy is ChaCha20-Poly1305 (RFC 8439) keyed by PBKDF2-SHA256. Secrecy is exactly the passphrase entropy, and the
  FNV content-address is **non-cryptographic** — it identifies, it does not protect.

## The coins first — the theorems everything else is priced in

${coinTheorems()}

Every one is \`by decide\`, sorry-free and axiom-free: the kernel alone settles them. Cite a key to make a claim
VERIFIED; cite nothing and it is UNVERIFIED, which means undecided here — never false.

## Hard rules — each one derived from a failure that actually happened here

- **\`Math.*\` is rejected everywhere, INCLUDING inside comments.** The scan reads raw source and does not require a
  trailing paren, so prose *describing* the ban trips it. Use integer arithmetic; a ratio becomes a two-sided
  bracket (\`a * d > n\` and \`a * d < m\`), never a division and never a float.
- **Never pipe a command whose exit code you need.** \`$?\` after \`| tail\` is tail's status, so a failing gate reads
  as a pass. Capture the code directly, then inspect the log.
- **Use is not mention.** A finder that greps source cannot tell a line that DOES a thing from one that NAMES it.
  A comment citing a script counted as running it; a regex alternation bar read as a shell pipe. Evidence must come
  from somewhere other than the file being judged.
- **Never \`git add -A\`.** Stage declared paths only. A blanket add swept a subagent's half-written files into a
  commit, leaving a mid-edit snapshot sealed in history.
- **Read before you overwrite.** Writing a module without checking whether that path already exists destroys the
  file that was there.
- **A check that cannot fail is not a check.** Before trusting one, break the thing it guards and confirm it goes
  red. A forged theorem asserting \`2 + 2 = 5\` passes four of this repo's own integrity checks.
- **Convention vs measurement.** A defined constant (the Faraday constant, \`1 kWh = 3600 kJ\`, Betz's 16/27) may
  seal as an equality. A measured quantity may seal only as an integer bracket. Confusing them turns a rounded
  figure into an asserted constant.
- **Derivation is the failure mode.** Where a source exists, read it. Recall produced six wrong claims in one
  session; measurement produced none.

## Tools worth knowing

- **Status in one call:** \`uuidna_unify\` → {theorems, domains, tools, receipt}. The ledger is **${T.length} theorems**, all \`by decide\`, sorry-free, axiom-free, across **${principles} principles** and **${MCP_CATALOG.length} MCP tools**.
- **Verdicts:** VERIFIED iff a claim cites a sealed theorem or a decidable test holds; else UNVERIFIED — never "false". \`uuidna_verify_statement\` checks a statement against the sealed ledger in O(1).
- **The Clay boundary:** uuidna solves **0 of the 7** Millennium problems — the *reflection* is sealed, the *problem* is not (Poincaré: Perelman, 2003, not uuidna).
- **Integrity, not truth:** every value has a content-address; the fold is order-invariant. Nothing here is asserted that a sealed theorem does not settle.
`

writeFileSync(join(ROOT, 'llm.txt'), LLM)
console.log(`✓ gen-llm — llm.txt generated from the ledger (${T.length} theorems, coins=${coins()}, ${ADDRESS_BITS}-bit, ${MCP_CATALOG.length} tools, ${principles} principles).`)

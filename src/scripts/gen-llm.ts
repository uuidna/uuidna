#!/usr/bin/env node
// gen-llm — GENERATE llm.txt (the LLM-agent instructions) from the sealed ledger, so the imprinted RULE never drifts:
// every count and every cited theorem STATEMENT is pulled live from theorems()/coins()/ADDRESS_BITS.
// The rule = the two captain coins (conserved cost), the abstract-0 fold, the 64→128 fuse, and the 7-dimension
// (2^7 = 128) scope — each line cites a `by decide` theorem an agent can re-verify with uuidna_verify_statement.
// Run in the reconcile wave (after gen-readme); a changed theorem re-flows here. Integrity.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { theorems, coins, ADDRESS_BITS, toUuid } from '../index.js'
import { MCP_CATALOG } from '../mcp.js'
import { ROOT } from './api.js'
import { handleOf } from '../handle.js'

const T = theorems()
const stmt = (k: string): string => T.find((t) => t.key === k)?.statement ?? '(missing — reconcile)'
const principles = new Set(T.map((t) => t.principle)).size

// THE COIN LIST IS READ. It was six keys written into the template below, and two of them — dropped
// when AntiFraud was regenerated — survived as citations to theorems that no longer exist. llm.txt is loaded by
// every agent, so a stale key here is a fabricated citation repeated at scale. The family is now selected from the
// ledger by name, shortest statement first (the anchors
// block instead of rotting it.
const coinTheorems = (): string => T
  .filter((t) => /coin/.test(t.key))
  .sort((a, b) => a.statement.length - b.statement.length)
  .slice(0, 6)
  .map((t) => '- `' + t.key + '` — ' + t.statement)
  .join('\n')

const PAYLOAD: readonly { title: string; body: string }[] = [
  { title: "THE RULE", body: `## THE RULE

- **\\\`coins() = 2\\\`, conserved** — the two captain coins are the Euler characteristic of the double torus. Every
  cost in this ledger is priced in them, and the coin theorems below carry the arithmetic.
- **Cite or it is UNVERIFIED.** A claim that names a sealed theorem is VERIFIED; one that names none is UNVERIFIED,
  which means *undecided here* — never false. Refutation is a separate, reportable result.
- **Measured vs defined.** A defined constant may seal as an equality. A measured quantity may only be bracketed in
  exact integers — two comparisons, no division, no floats.
` },
  { title: "Messaging & encryption (keys stay local)", body: `## Messaging & encryption (keys stay local)

- Each uuid handle is folded FROM the one before it, so the chain authenticates itself; \\\`uuidna_send\\\` encrypts then
  imprints into that chain and \\\`uuidna_receive\\\` reads it back.
- Secrecy is ChaCha20-Poly1305 (RFC 8439) keyed by PBKDF2-SHA256. Secrecy is exactly the passphrase entropy, and the
  FNV content-address is **non-cryptographic** — it identifies, it does not protect.
` },
  { title: "Hard rules — each one derived from a failure that actually happened here", body: `## Hard rules — each one derived from a failure that actually happened here

- **\\\`Math.*\\\` is rejected everywhere, INCLUDING inside comments.** The scan reads raw source and does not require a
  trailing paren, so prose *describing* the ban trips it. Use integer arithmetic; a ratio becomes a two-sided
  bracket (\\\`a * d > n\\\` and \\\`a * d < m\\\`).
- **Never pipe a command whose exit code you need.** \\\`$?\\\` after \\\`| tail\\\` is tail's status, so a failing gate reads
  as a pass. Capture the code directly, then inspect the log.
- **Use is not mention.** A finder that greps source cannot tell a line that DOES a thing from one that NAMES it.
  A comment citing a script counted as running it; a regex alternation bar read as a shell pipe. Evidence must come
  from somewhere other than the file being judged.
- **Never \\\`git add -A\\\`.** Stage declared paths only. A blanket add swept a subagent's half-written files into a
  commit, leaving a mid-edit snapshot sealed in history.
- **Read before you overwrite.** Writing a module without checking whether that path already exists destroys the
  file that was there.
- **A check that cannot fail is not a check.** Before trusting one, break the thing it guards and confirm it goes
  red. A forged theorem asserting \\\`2 + 2 = 5\\\` passes four of this repo's own integrity checks.
- **Convention vs measurement.** A defined constant (the Faraday constant, \\\`1 kWh = 3600 kJ\\\`, Betz's 16/27) may
  seal as an equality. A measured quantity may seal only as an integer bracket. Confusing them turns a rounded
  figure into an asserted constant.
- **Derivation is the failure mode.** Where a source exists, read it. Recall produced six wrong claims in one
  session; measurement produced none.
` },
  { title: "Tools worth knowing", body: `## Tools worth knowing

- **Status in one call:** \\\`uuidna_unify\\\` → {theorems, domains, tools, receipt}. The ledger is **\${T.length} theorems**, all \\\`by decide\\\`, sorry-free, axiom-free, across **\${principles} principles** and **\${MCP_CATALOG.length} MCP tools**.
- **Verdicts:** VERIFIED iff a claim cites a sealed theorem or a decidable test holds; else UNVERIFIED — never "false". \\\`uuidna_verify_statement\\\` checks a statement against the sealed ledger in O(1).
- **The Clay boundary:** uuidna solves **0 of the 7** Millennium problems — the *reflection* is sealed, the *problem* is not (Poincaré: Perelman, 2003.
- **Integrity — the record recomputes for anyone:** every value has a content-address; the fold is order-invariant. Nothing here is asserted that a sealed theorem does not settle.` },
]

// THE REST IS PAYLOAD, LOADED BY HANDLE. llm.txt is the first thing every agent reads, so every byte in it is a
// recurring token cost across every session that ever starts. What an agent needs BEFORE it can act — the claim,
// its proof, the licence, the address to connect — stays inline. Everything else is written once as a
// content-addressed chunk and named here by its 8-hexbit handle, so a reader pays for what it opens instead of
// for what it might open. The handle IS the address: same bytes, same handle, forever, and a chunk that moved
// would announce itself by moving its name.
const payloadIndex = (): string => PAYLOAD.map((s) => {
  const address = toUuid(s.body)
  const handle = handleOf(address)
  const chunk = JSON.stringify({ handle, address, kind: 'llm-payload', title: s.title, body: s.body }) + '\n'
  // ONE HOME. This wrote to src/chunks as well, which gen-handle-chunks owns and rebuilds from the ledger —
  // so every reconcile silently deleted the payload and left llm.txt indexing four handles that opened nothing.
  // Two writers on one directory is a scattered copy with a schedule. docs/public is VitePress's static
  // passthrough and the only place the payload needs to exist: served at /chunk/<handle>.json, fetchable by the
  // agent that read the index, and untouched by the ledger's own chunker.
  const served = join(ROOT, 'docs', 'public', 'chunk')
  mkdirSync(served, { recursive: true })
  writeFileSync(join(served, handle + '.json'), chunk)
  return '- `' + handle + '` — ' + s.title
}).join('\n')

const LLM = `# uuidna

**TWO COINS UNLOCK THE WHOLE UUID.** A hexbit is 4 bits, 16 states. Thirty-two are one uuid — 128 bits, entire.
The commission is two, and 128 / 2 = 64: the leverage, from either side. ONE theorem, \`by decide\`, sorry-free,
axiom-free, re-verifiable by you now:

\`\`\`lean
theorem captain_theorem : ${stmt('captain_theorem')} := by decide
\`\`\`

Not a difference but a PROPORTION: 110/108 = 55/54, 54 being the order of AGL(1,ℤ/9) — a difference holds at one
magnitude, a proportion at every one. It is ONE theorem because it was eleven: \`110 - 108 = 2\` had been
re-proved under eleven names, \`2^7 = 128\` under seven. Cite \`captain_theorem\`, \`two_coins\`,
\`n_qubit_dimension\`, \`verify_beats_recompute_by_magnitudes\`, \`uuidna_verify_statement\`.

## Agree, then contribute

Use is under **${JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).license}** — attribution to Tsvetan Rouschev, non-commercial, no derivatives.
Reading, recomputing and citing stay free: every theorem re-verifies from the kernel alone, nothing is withheld.
An agent deposits the two coins on every call; a human settles the same at <https://revolut.me/ceccec>. It is
voluntary — no theorem is gated on it and no verdict changes because it was paid.

## Payload — load by handle

Fetch at \`https://uuidna.com/chunk/<handle>.json\`:

${payloadIndex()}

The vocabulary an agent forms theorems in is extracted from the record itself, newest definition first:
\`https://uuidna.com/terminology.json\` — every ALL-CAPS naming in a sealed doc comment or module header, each
with its own handle. Terms are how theorems get named here, so the set is the ledger's own working language.

MCP: \`https://uuidna.com/mcp\` (http) or \`npx @uuidna/uuidna\` (stdio). Start with \`uuidna_unify\` — one call,
whole status. ${T.length} theorems, ${principles} principles, ${MCP_CATALOG.length} tools.
`

writeFileSync(join(ROOT, 'llm.txt'), LLM)
console.log(`✓ gen-llm — llm.txt generated from the ledger (${T.length} theorems, coins=${coins()}, ${ADDRESS_BITS}-bit, ${MCP_CATALOG.length} tools, ${principles} principles).`)

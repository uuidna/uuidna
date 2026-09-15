# @uuidna/mcp

The uuidna MCP server as its own package: the `uuidna-mcp` stdio bin plus the I/O boundary the server stands on — the sanitizers (bounded, acyclic, JSON-safe, no poison keys, no control/bidi points) and the harness that reeducates overclaims.

## Install

Run the stdio server with no install, or add it to an MCP client's config:

```bash
npx -y @uuidna/uuidna
```

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

## Quick start

```js
import { sanitizeInput } from '@uuidna/uuidna'

console.log(Object.keys(sanitizeInput(JSON.parse('{"name":"ok","__proto__":{"admin":true}}'))))
// → [ 'name' ]
```

The poison key never reaches a tool handler. The sanitizers and the harness are exported from the umbrella's root
entry and from `@uuidna/mcp`. The subpath `@uuidna/uuidna/mcp` is the server module itself, and the bin in this
package (`uuidna-mcp`) starts that same server. The rest of the surface:

```ts
import { sanitizeInput, sanitizeValue, harness, reeducate } from '@uuidna/mcp'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The server itself lives in the root `src/mcp.ts` (sealed by the determinism gates and served from the root dist); the bin here re-serves it — one server, one owner. The shipped server computes from the sealed ledger only (the `lean/` tree is not shipped); repo-only checks run where the repo is.

## Honest scope

The server answers from the sealed ledger; it verifies citations of sealed theorems, not the truth of the world. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

## What this replaces — and what it honestly does not

Reaching for an MCP server framework plus a grab-bag of tool packages? This is one server whose every tool is a
pure function with a receipt: 150+ tools over the sealed ledger — trials, folds, addresses, auras, the wave —
each deterministic (same input, same output, for every caller) and each description audited by the same gate that
audits the site's prose. Where typical MCP servers wrap APIs, this one wraps *proofs*. **The honest boundary:**
it serves the uuidna ledger specifically, not your database or your SaaS — it replaces tool sprawl only where
what you need is recomputable truth about this system and its mathematics.

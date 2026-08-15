# @uuidna/mcp

The uuidna MCP server as its own package: the `uuidna-mcp` stdio bin plus the I/O boundary the server stands on — the sanitizers (bounded, acyclic, JSON-safe, no poison keys, no control/bidi points) and the harness that reeducates overclaims.

```bash
npx @uuidna/mcp
```

```ts
import { sanitizeInput, sanitizeValue, harness, reeducate } from '@uuidna/mcp'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The server itself lives in the root `src/mcp.ts` (sealed by the determinism gates and served from the root dist); the bin here re-serves it — one server, one owner. The shipped server computes from the sealed ledger only (the `lean/` tree is not shipped); repo-only checks run where the repo is.

## Honest scope

The server answers from the sealed ledger; it verifies citations of sealed theorems, not the truth of the world. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

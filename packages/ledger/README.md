# @uuidna/ledger

The sealed theorem ledger and every gate that stands on it: the content-address core (`toUuid`, `merkleFold`), merkle proofs, the honesty gates (`slimGate`, `computes`, `overreachOf`), the trial (`adjudicate`, `dueProcess`, `depositTrial`), commit signing (`signCommit`), the anti-fraud and forensics audits, `conformance`, `catchTraitors`, the ledger fingerprint, `laws`, `credits`, and the billing coins.

```ts
import { THEOREMS, theorems, slimGate, adjudicate, signCommit, merkleRoot, verifyProof, coins } from '@uuidna/ledger'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. Lean is the single source: every theorem is authored in `lean/*.lean`, proven `by decide`, and derived into the ledger by the root's generators — this package re-exports the typed, addressed view and the gates that judge claims against it. A claim is judged solely by whether the theorems it cites are sealed; only a fabricated citation drains.

## Honest scope

A content-address proves INTEGRITY, not truth. The trial computes a verdict about a CLAIM's citations, never an accusation about a person. Integrity, not truth.

Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

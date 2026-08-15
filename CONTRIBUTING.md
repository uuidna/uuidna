# Contributing to uuidna

**The terms, first.** The work is licensed **CC BY-NC-ND 4.0** (canonical at
[uuidna.com/license](https://uuidna.com/license)); by contributing you agree your contribution arrives under the
same terms — inbound = outbound. Credit follows the credit law: a sealed theorem carries its author's credit
permanently; the captain claims only the unclaimed. Nothing else is signed — the receipts are the signature.

**Lean is the single source of theorems.** A theorem computes in Lean, or it is not a theorem. Everything the
package, the MCP tools and the site consume — [`src/theorems/generated.ts`](src/theorems/generated.ts),
[`lean/PRINCIPLE.md`](lean/PRINCIPLE.md), `CHANGELOG.md`, `docs/mcp.md`, the decide-step costs
`lean/heartbeats.json`, and `audit-citations.json` — is **derived** from `lean/*.lean`. Nothing is authored twice.

## Setup

```bash
npm install
npm run hooks:install   # installs the pre-push readiness gate (core.hooksPath=hooks)
npm run lean            # verify every proof sorry-free and regenerate the ledger
```

`npm run lean` needs the Lean toolchain (pinned by `lean-toolchain`); the generators shell out to `lean`.

## Adding a theorem or a domain

1. Add a generator `src/scripts/lean-<domain>.ts` (a set of decidable facts — each a JS predicate paired with its
   `by decide` Lean proposition; see any existing `lean-*.ts`), **or** a hand-written `lean/<Domain>.lean` with an
   inline `-- @skill: <capability>` above each theorem. `lean-all.ts` auto-discovers generators — no wiring needed.
2. Author the **skill** at the source (the manifest `skill` a generator emits, or the inline `-- @skill:`), never a
   TS heuristic — every theorem carries an authored skill (a test enforces it).
3. Run **one command** to bring the whole derived layer back in lockstep, commit, and push:

   ```bash
   npm run reconcile                          # default commit message
   npm run reconcile -- "Add the nim domain"  # your own message
   ```

   It runs `npm run lean` (regenerate + verify every proof), rebuilds the MCP catalog, `--sync`s the heartbeats to
   100% coverage, refreshes the citation audit, and **aborts before committing if the ledger does not reconcile**
   (`account.js`). Only then does it commit (skipped if nothing changed) and `git push origin HEAD`.

## The readiness gate

The pre-push hook runs the full gate (`npm run next`) and **blocks the push** on any denial — an overclaim the
honesty gate drains, an unsealed proof, an unreconciled account, a next-gap, or a **stale derived layer**. If the
denial is a stale derived layer (a `git diff` of the generated files after adding theorems), the fix is
`npm run reconcile`. A genuine overclaim or unsealed proof must be fixed at the source. The gate can fail — that is
what makes a pass mean something.

## Honesty

Every prose claim on the site, in the MCP descriptions, and in the code comments must **link a sealed theorem or be
demarcated** — the provenance audit checks it, and the publish gate refuses a note that cites a proof not in the
ledger. Say what computes; hold open what does not (**UNVERIFIED**, never "false"); never label a classical thing
quantum-accelerated or a non-cryptographic address secret. Integrity, not truth.

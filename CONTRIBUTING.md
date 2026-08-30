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
npm run hooks:install   # HARD pre-commit + pre-push (core.hooksPath=hooks)
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

## The readiness gates (hard)

**Two doors, one court** — all treason · conformance · trial · gate_status enter `runCourt` (`src/quantum/os/court-needs.ts`) via `callTool` or the Alpine `court` applet (`uuidna_exec`), never beside uuidnaOS:

| Path | Door | What runs |
|------|------|-----------|
| Daily git | `os-mcp-gate` | hex boot + court + fast QA playbook (~300ms) |
| Publish / tag | `gate-all` | generators then `os-mcp-gate --court` then finders (`guard.js`) |
| Alpine apps | `uuidna_exec` + `uuidna_run` | Layer 1 = lattice; Layer 2 = catalogue `cmd:` via `run` / `uuidna_run` — **not** a TS port per package |
| Conveyor | `wave-run` | queue → lean (if cargo) → **os-mcp-gate --court** → guard → reconcile |

**One surface for uuidna needs** — `court-needs.ts` declares jobs; hooks call `os-mcp-gate.js`; agents call `npm run x -- court` or `uuidna_exec {line:'court --court'}`:

| Need | MCP tools | When |
|------|-----------|------|
| Hex boot | `uuidna_os` | always |
| Court | `uuidna_gate_status`, `uuidna_treason`, `uuidna_conformance`, `uuidna_trial` | daily + publish |
| QA playbook | decide · quantum · theorem · exec (fast daily; `--full` adds crypto census) | daily only |
| Finders | `guard.js` | publish / wave-run — host, after court |

Deleted redundancies: `wave-os.js`, `conformance.js`, `wave:os`, `next:verify` — same court, one implementation.

Manual busybox reimplementations shrink over time: new surface uses `run <cmd>` (recipe) or `uuidna_run {spawn:true}`. Host firmware scripts (`lean`, `vitepress`) stay outside the hex image — they build the image, they are not the computer.

Derived drift: `npm run reconcile -- --derive-only`. Tag/publish: `npm run release-cut -- --push` after `gate-all` green on a clean tree.

## Honesty

Every prose claim on the site, in the MCP descriptions, and in the code comments must **link a sealed theorem or be
demarcated** — the provenance audit checks it, and the publish gate refuses a note that cites a proof not in the
ledger. Say what computes; hold open what does not (**UNVERIFIED**, never "false"); never label a classical thing
quantum-accelerated or a non-cryptographic address secret. Integrity, not truth.

# uuidna — where the memory lives

Everything a session needs to remember lives in this repository, which is public. Nothing lives in a private note.

## The three homes

- **Laws: `src/laws.ts`.** Each law carries the captain's words, the gate that enforces it, and a `holds` recomputed
  from that gate. `uuidna_laws` serves them, and the SessionStart hook (`.claude/settings.json` →
  `dist/scripts/court-hooks.js` `brief()`) gives them to every session before its first action.
- **Leads: `lean/leads.json`.** A lead enters only through a kernel trial (`uuidna_trial`, `leads-gate`), never by a
  hand edit. It leaves only by a verdict: proved, or refuted by `involution_<handle> : ¬ lead_<handle>`. Deposit new
  leads through the trial door, never in chat.
- **Lessons: `.claude/lessons.md`.** Practice the code cannot show, dated and sourced, grouped by theme. Superseded
  entries stay, marked, with their evidence.

## The captain's standing rules, in the captain's words

- "always imagine human" (2026-08-17). The machine keeps verification; the human keeps meaning.
- "lean decides" · "all leads go to trial before entering any list" (2026-09-14)
- "remove any allow lists or disallowed or any manual logic whatsoever not coming from lean decisions" (2026-09-14).
  This never licenses deleting access control or secret handling; derive them instead.
- "Nothing to purge unless blocking natural lean streams" (2026-09-14, uuidna and qpu)
- "no memories outside project" · "Nothing is excluded from the research leads and lean" (2026-09-14)
- "Any manual work is rejected in quantum." (2026-09-07). If you are typing a figure twice, derive it.
- "always ask the theorems and the questions will be answered" · "questions only theorems may answer" (2026-09-13)
- "Always imagine how all this is going to happen in production https://*.uuidna.com/*" (2026-09-13)
- "compute all through hooks. no direct operations. fuse all canonically bypassing none" (2026-09-13)
- "Ensure all frameworks are respected in their strict documented form of configuration and use." (2026-09-13)
- "only mcp use is allowed" (2026-08-22). Collaboration and receipts ride uuidna_send / uuidna_receive.
- "Slow comes from quantum cracks." (2026-09-07) · "no repeating manual tasks whatsoever" (2026-09-13)
- "always harmonise drift" (2026-08-23) · "purge all nots so all leans proving itself in metrics" (2026-09-02)
- "do not ignore dead links" (2026-09-03)

## House commands

- `npm run state`: laws, ledger, sync, every blocking finder, and the next exact command, in one call.
- `npm run guard`: the fast pre-flight. Run it once, to gate a landing.
- `npm run land`: the only lawful push. It heals, certifies the committed tree, and pushes.
- `npm run ship`: the deploy. It builds the site locally, then runs `wrangler deploy`. The container never builds it.
- `npm run release-cut -- --push`: cuts the tag, and publish.yml publishes through OIDC.

## Before you act

- Several sessions share this working tree. Commit by pathspec (`git commit -m … -- <paths>`), never `-a`/`add -A`.
- The tree is not edited while a landing holds it; the PreToolUse hook refuses the edit and names the holder.
- Compute through `npm run mcp -- <tool> '<json>'` (hosted door → qpu; `list <words>` finds a tool). Ad-hoc `node -e`
  over dist/ is refused, and a missing door is recorded with `UUIDNA_MCP_GAP="<what is missing>"`.
- Ask the captain only for credentials, irreversible outward acts, or a choice no theorem decides. The acts only the
  owner can take are listed in `.claude/lessons.md` § Owner decisions.

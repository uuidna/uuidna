#!/usr/bin/env node
// Generate docs/mcp.md — the MCP tool catalog, BUILT FROM THE KEYS. Every uuidna_* tool the server exposes,
// grouped into categories and skills DERIVED from the tool names (src/mcp.ts → MCP_CATALOG), so the VitePress
// site's local search and its in-page navigation cover the whole MCP surface with no hand-maintained list.
// Regenerate after adding or renaming a tool. A theorem computes in Lean; a tool recomputes — both are receipted.
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MCP_CATALOG } from '../mcp.js'
import { adjudicate, theorems, toUuid } from '../index.js'
import { gateVerdict, gateSelfTest } from '../gate-engine.js'
import { ROOT } from './api.js'
// A WORKED EXAMPLE, computed at generation time from the package the tools wrap — so the request/response shown is
// REAL and recomputable by anyone, not a hand-written mock (the honest 'production MCP example').
const EX = adjudicate('FNV-1a is cryptographic')
// THE GATE, computed at generation time from the real gate engine — the page shows people the SAME verdict the
// protocol shows machines: a real gate line (this page's own generation, judged), the eight-state table proven
// against the sealed spec, and the registry identity. Deterministic, so the committed page never drifts.
const GATE = gateSelfTest(MCP_CATALOG.map((t) => t.name))
const GRUN = gateVerdict('uuidna_gate_status', {}, GATE)
const GLINE = `gate ${GRUN.gate.clean ? 'CLEAN' : 'DRAINED'} f${GRUN.gate.input} d${GRUN.gate.output} v${GRUN.gate.honesty} · ${GRUN.gate.receipt}`

// Markdown/Vue-safe: escape < > (raw HTML) and split {{ (Vue interpolation) so descriptions render literally.
const safe = (s: string): string => s.replace(/[<>]/g, (c) => (c === '<' ? '&lt;' : '&gt;')).replace(/\{\{/g, '{ {')

// Group by category in first-seen order; collect the skills each category carries.
const order: string[] = []
const byCat = new Map<string, typeof MCP_CATALOG>()
for (const t of MCP_CATALOG) {
  if (!byCat.has(t.category)) { byCat.set(t.category, []); order.push(t.category) }
  byCat.get(t.category)!.push(t)
}

// Table-safe: escape the pipe (the cell delimiter) on top of the < > / {{ escaping safe() already does.
// THE BACKSLASH GOES FIRST, and the order is the whole correctness argument. Escaping `|` alone means a source
// backslash before a pipe produces `\` + `\|` — the reader sees an escaped backslash followed by a LIVE pipe, and
// the row splits a column early. Escaping backslashes first makes the pipe's escape the only one that can be
// consumed by something else (js/incomplete-sanitization). Reversing these two lines silently breaks the table.
const cell = (s: string): string => safe(s).replace(/\\/g, '\\\\').replace(/\|/g, '\\|')

// Render a tool's PARAMETERS from its JSON-schema input — name · type · required · description — so the page shows
// how to CALL each tool, not only what it does. A tool with no inputs says so explicitly.
const params = (schema?: { properties?: Record<string, { type?: string; description?: string }>; required?: string[] }): string => {
  const props = schema?.properties || {}
  const req = new Set(schema?.required || [])
  const keys = Object.keys(props)
  if (!keys.length) return '_No parameters._'
  const rows = keys.map((k) => `| \`${k}\` | ${props[k].type || 'any'} | ${req.has(k) ? '**yes**' : 'no'} | ${cell(props[k].description || '')} |`)
  return ['**Parameters**', '', '| param | type | required | description |', '| --- | --- | --- | --- |', ...rows].join('\n')
}

const sections = order.map((cat) => {
  const tools = byCat.get(cat)!
  const skills = [...new Set(tools.map((t) => t.skill))].join(', ')
  const rows = tools.map((t) => `### \`${t.name}\`\n\n${safe(t.description)}\n\n${params(t.inputSchema)}\n`).join('\n')
  return `## ${cat} <Badge type="tip" :text="'${tools.length}'" />\n\n*skill: ${skills}*\n\n${rows}`
}).join('\n')

// Integer sqrt without Math.* (the purity guard scans src/scripts too): is the tool count a perfect square (8×8)?
let isqrt = 0
while ((isqrt + 1) * (isqrt + 1) <= MCP_CATALOG.length) isqrt++
const GRID_LAYOUT = isqrt * isqrt === MCP_CATALOG.length ? `${isqrt}×${isqrt}` : 'in rows of 8'

// The grid EMERGES from the usability metric, not a hand-kept order: rank by fewest REQUIRED keys first, so the
// maximally-reusable (zero-arg) tools rise to the top — exactly what uuidna_mcp_benchmark measures. Top at the top.
const requiredOf = (t: (typeof MCP_CATALOG)[number]): number => (t.inputSchema?.required?.length ?? 0)
const byUsability = [...MCP_CATALOG].sort((a, b) => requiredOf(a) - requiredOf(b) || a.name.localeCompare(b.name))
const zeroArg = byUsability.filter((t) => requiredOf(t) === 0).length

const md = `---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="${MCP_CATALOG.length} keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories, skills and parameters are derived from the tool keys and their input schemas. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the ${MCP_CATALOG.length} tools below are read from the server's own tool list and
organised into ${order.length} categories and their skills, so the site search and this page's navigation stay in
lockstep with the code. Each tool lists its **parameters** (name · type · required); where a description says
"Returns …", that is the shape it yields. **This same path speaks the protocol**: a browser reading /mcp gets this
page; an MCP client GETs the JSON discovery document and POSTs JSON-RPC to the live hosted subset at
\`https://uuidna.com/mcp\` — one address, the page for people, the protocol for machines.

## The gate <Badge type="tip" text="every call judged" />

**No result leaves this surface unjudged.** Every \`tools/call\` — stdio and the hosted \`https://uuidna.com/mcp\`
alike — passes the sealed conjunction gate **cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v)**: **f** the input sanitized
unchanged, **d** the output sanitized unchanged, **v** no fabricated theorem citation. The verdict travels IN the
response (\`_meta.gate\` plus a visible gate line); one violation drains it, with the violating bits **named** — a
diagnosis, never a silent pass. This page's own generation was judged; the line below is REAL, computed when the
page was built:

\`\`\`
${GLINE}
\`\`\`

The gate proves itself against the sealed spec: the eight-state verdict table recomputes to
**[${GATE.table.join(',')}]** — the sealed table (matchesSealedSpec: **${GATE.matchesSealedSpec}**;
${GATE.cleanStates} clean state, ${GATE.drainedStates} drained), and the ${GATE.tools}-tool registry folds to its
order-invariant identity \`${GATE.registry}\` (the hosted subset serves the same gate over its own registry).
Standing on: ${GATE.cites.map((k) => `[\`${k}\`](/theorem/${k})`).join(' · ')}.

**And every call deposits immediately.** Contribute first, then take — the captain law, enforced by the protocol:
each judged call mints its deterministic **two-coin deposit** (\`_meta.deposit\` plus a visible deposit line), the
id the content-address of its own deposit statement, citing
[\`captain_commission_two_coins\`](/theorem/captain_commission_two_coins) and [\`two_coins\`](/theorem/two_coins).
An agent's very first \`tools/call\` has already contributed — there is no ungated, undeposited path.

Recompute the proof against production yourself:

\`\`\`bash
curl -s -X POST https://uuidna.com/mcp -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"uuidna_gate_status","arguments":{}}}'
\`\`\`

## The grid <Badge type="tip" :text="\`${MCP_CATALOG.length}\`" />

${MCP_CATALOG.length} tools, **ranked by usability — the reusable at the top** (fewest required keys first; the ${zeroArg} zero-arg tools lead). The order EMERGES from \`uuidna_mcp_benchmark\`, not a hand-kept list. Each links to its entry below.

<div class="mcp-grid">
${byUsability.map((t) => `<a href="#${t.name.replace(/_/g, '-')}"><code>${t.name.replace(/^uuidna_/, '')}</code></a>`).join('\n')}
</div>

## Getting started

Add the server to any MCP client — zero dependencies, launched with npx:

\`\`\`json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
\`\`\`

On connect the server sends an **instructions** summary — what uuidna is, and that nothing asks to be trusted, only
rechecked. Every \`tools/call\` returns a chained **receipt** (\`receipt · seq · referer\`, a content-address of the
command), so an agent always holds a tamper-evident record of what it ran and the whole session folds to one
recomputable tip. New here? Sign the [Contract](/captain) and learn the links first.

## Worked example — a real call

The signature capability is the **trial**: send any claim, get a recomputable verdict. Here is a real call and its
ACTUAL response — computed when this page was generated, recompute it yourself and the receipt returns.

\`\`\`json
// request
{ "method": "tools/call", "params": { "name": "uuidna_adjudicate", "arguments": { "statement": "FNV-1a is cryptographic" } } }
// response
${JSON.stringify({ verdict: EX.verdict, receipt: EX.receipt, note: EX.note, develop: EX.develop.slice(0, 2) }, null, 2)}
\`\`\`

The verdict is **${EX.verdict}** — no word-list ruled; the claim simply cites no sealed proof, so the trial holds it
open and hands back a **develop plan** (the next decidable step to move it). Two more one-liners: mint an address for
any value — \`uuidna_address { "seed": "hello" }\` → \`${toUuid('hello')}\` — or pull a whole domain —
\`uuidna_theorems { "skill": "navigation" }\` → **${theorems({ skill: 'navigation' }).length}** sealed theorems.
Every call is recomputable: same input, same receipt. That is the production contract.

${sections}
`

writeFileSync(join(ROOT, 'docs', 'mcp.md'), md)
console.log('✓ docs/mcp.md — ' + MCP_CATALOG.length + ' MCP tools in ' + order.length + ' categories (built from the keys)')

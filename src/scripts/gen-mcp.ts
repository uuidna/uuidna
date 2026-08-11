#!/usr/bin/env node
// Generate docs/mcp.md — the MCP tool catalog, BUILT FROM THE KEYS. Every uuidna_* tool the server exposes,
// grouped into categories and skills DERIVED from the tool names (src/mcp.ts → MCP_CATALOG), so the VitePress
// site's local search and its in-page navigation cover the whole MCP surface with no hand-maintained list.
// Regenerate after adding or renaming a tool. A theorem computes in Lean; a tool recomputes — both are receipted.
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { MCP_CATALOG } from '../mcp.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..')

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
const cell = (s: string): string => safe(s).replace(/\|/g, '\\|')

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
"Returns …", that is the shape it yields.

## Getting started

Add the server to any MCP client — zero dependencies, launched with npx:

\`\`\`json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
\`\`\`

On connect the server sends an **instructions** summary — what uuidna is, and that nothing asks to be trusted, only
rechecked. Every \`tools/call\` returns a chained **receipt** (\`receipt · seq · referer\`, a content-address of the
command), so an agent always holds a tamper-evident record of what it ran and the whole session folds to one
recomputable tip. New here? Sign the [Contract](/captain/config) and learn the links first.

${sections}
`

writeFileSync(join(ROOT, 'docs', 'mcp.md'), md)
console.log('✓ docs/mcp.md — ' + MCP_CATALOG.length + ' MCP tools in ' + order.length + ' categories (built from the keys)')

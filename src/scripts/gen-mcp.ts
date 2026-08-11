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

const sections = order.map((cat) => {
  const tools = byCat.get(cat)!
  const skills = [...new Set(tools.map((t) => t.skill))].join(', ')
  const rows = tools.map((t) => `### \`${t.name}\`\n\n${safe(t.description)}\n`).join('\n')
  return `## ${cat} <Badge type="tip" :text="'${tools.length}'" />\n\n*skill: ${skills}*\n\n${rows}`
}).join('\n')

const md = `---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="${MCP_CATALOG.length} keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories and skills are derived from the tool keys. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the ${MCP_CATALOG.length} tools below are read from the server's tool list and organised
into ${order.length} categories and their skills, so the site search and this page's navigation stay in lockstep with
the code. Every call returns a chained **receipt** — a content-address of the command — so an agent always holds a
tamper-evident record of what it ran. Add to a client as \`{ "command": "npx", "args": ["-y", "@uuidna/uuidna"] }\`.

${sections}
`

writeFileSync(join(ROOT, 'docs', 'mcp.md'), md)
console.log('✓ docs/mcp.md — ' + MCP_CATALOG.length + ' MCP tools in ' + order.length + ' categories (built from the keys)')

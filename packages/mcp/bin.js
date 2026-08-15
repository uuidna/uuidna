#!/usr/bin/env node
// uuidna-mcp — the stdio MCP server, re-served from the root dist (one server, one owner). The root server starts
// only when it is the MAIN module (src/mcp.ts guards on argv[1]), so this bin adopts the resolved server path as
// argv[1] before importing it — the same process, the same server, no fork of the bytes.
import { fileURLToPath } from 'node:url'
const url = import.meta.resolve('@uuidna/uuidna/mcp')
process.argv[1] = fileURLToPath(url)
await import(url)

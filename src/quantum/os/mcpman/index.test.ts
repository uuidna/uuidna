// mcp-alpine-man — EVERY honest Alpine app through ONE MCP door, tested by its man page.
//
// Denominator = man corpus (manDrivenPortCoverage). Numerator = reachable via uuidna_exec man + apk.
// Refuses 4759 wire tools (MCP ceiling). Orphans named, never padded.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG, callTool } from '../../../mcp.js'
import { mcpManDrivenCoverage, overlayMcpManDrivenCoverage, MCP_ALPINE_DOOR } from './index.js'
import { manDrivenPortCoverage } from '../catalogue/index.js'
import { UUID_HEXBITS } from '../../../hexbit/index.js'
import { wireBytes } from '../../../mcp-wire.js'

test('MCP ports Alpine apps through ONE door — not one tool per man package', () => {
  assert.ok(MCP_CATALOG.some((t) => t.name === MCP_ALPINE_DOOR), 'uuidna_exec must be served')
  assert.ok(!MCP_CATALOG.some((t) => t.name === 'uuidna_ls'), 'uuidna_ls folded — use uuidna_exec')
  const manish = MCP_CATALOG.filter((t) => /^uuidna_(busybox|openssl|apk|man)_/.test(t.name)
    || /^uuidna_[a-z0-9-]+-doc$/.test(t.name))
  assert.equal(manish.length, 0, `no per-app Alpine MCP tools; got ${manish.map((t) => t.name).join(', ')}`)
  const cov = mcpManDrivenCoverage()
  assert.equal(cov.wireDoors, 1)
  assert.equal(cov.tool, MCP_ALPINE_DOOR)
  assert.ok(cov.naiveWireIfPerApp > 4000)
  assert.ok(MCP_CATALOG.length < 500, `catalog must stay far under naive ${cov.naiveWireIfPerApp}`)
  const wire = wireBytes(MCP_CATALOG)
  assert.ok(wire < 168_130, `wire ${wire} must stay under ~168130 ceiling`)
})

test('man pages test apps through MCP uuidna_exec — full corpus N/M', () => {
  const driven = manDrivenPortCoverage()
  const cov = mcpManDrivenCoverage()
  assert.equal(cov.definition, 'mcp·uuidna_exec·man→app→hexbit')
  assert.equal(cov.total, driven.total)
  assert.equal(cov.witnessed, driven.witnessed)
  assert.ok(cov.total > 4000)
  assert.equal(cov.exposed, cov.total,
    `MCP man exposure ${cov.exposed}/${cov.total} — gaps: ${cov.missing.join(', ') || '(none)'}`)
  assert.equal(cov.missing.length, 0)
  assert.equal(cov.gaps.length, 0)
  assert.ok(typeof cov.receipt === 'string' && cov.receipt.includes('-'))
})

test('callTool uuidna_exec man carries man→app→hexbit witness', () => {
  const r = callTool('uuidna_exec', { line: 'man busybox' }) as {
    ok: boolean; applet: string
    data: {
      kind?: string; name?: string; app?: string; via?: string
      witnessOk?: boolean; hexbits?: number[]
    }
  }
  assert.equal(r.ok, true)
  assert.equal(r.applet, 'man')
  assert.equal(r.data.kind, 'man')
  assert.equal(r.data.name, 'busybox-doc')
  assert.equal(r.data.app, 'busybox')
  assert.equal(r.data.via, 'origin')
  assert.equal(r.data.witnessOk, true)
  assert.equal(r.data.hexbits?.length, UUID_HEXBITS)

  const apk = callTool('uuidna_exec', { line: 'apk info busybox' }) as {
    ok: boolean; data: { name?: string }
  }
  assert.equal(apk.ok, true)
  assert.equal(apk.data.name, 'busybox')

  const doc = callTool('uuidna_exec', { line: 'man busybox-doc' }) as {
    ok: boolean; data: { name?: string; app?: string; witnessOk?: boolean }
  }
  assert.equal(doc.ok, true)
  assert.equal(doc.data.name, 'busybox-doc')
  assert.equal(doc.data.app, 'busybox')
  assert.equal(doc.data.witnessOk, true)
})

test('dotnet-doc through MCP resolves via provides (cmd:dotnet)', () => {
  const r = callTool('uuidna_exec', { line: 'man dotnet-doc' }) as {
    ok: boolean
    data: { app?: string; via?: string; witnessOk?: boolean }
  }
  assert.equal(r.ok, true)
  assert.equal(r.data.witnessOk, true)
  assert.equal(r.data.app, 'dotnet-host')
  assert.equal(r.data.via, 'provides')
  const apk = callTool('uuidna_exec', { line: 'apk info dotnet-host' }) as {
    ok: boolean; data: { name?: string }
  }
  assert.equal(apk.ok, true)
  assert.equal(apk.data.name, 'dotnet-host')
})

test('oh-my-pi overlay reachable via uuidna_exec — separate overlay MCP meter', () => {
  const cov = overlayMcpManDrivenCoverage()
  assert.equal(cov.total, 1)
  assert.equal(cov.exposed, 1, `gaps: ${cov.missing.join(', ')}`)
  const r = callTool('uuidna_exec', { line: 'man oh-my-pi' }) as {
    ok: boolean; data: { witnessOk?: boolean; app?: string }
  }
  assert.equal(r.ok, true)
  assert.equal(r.data.witnessOk, true)
  assert.equal(r.data.app, 'oh-my-pi')
})

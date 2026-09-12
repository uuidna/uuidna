// hologram-lattice — THE FRACTAL HOLOGRAM: uuidna's MCP includes every subdomain MCP (the captain, 2026-09-12).
//
// Four hosts, one lattice. The root serves the ledger; qpu serves the circuit; lean and unreal publish. Each host's
// MCP names the others, so any door reached is the whole hologram — fractal. This module is PURE: hosts, endpoints,
// and the harness recipes are computed from the names alone, no network, so the edge serves it as it serves any
// recomputable reading. The network half — a call fanned out to one named host — lives beside it in
// hologram-fanout.ts, declared non-harmonic, allowlisted to these four hosts and nothing else.
export const HOLOGRAM_HOSTS = [
  { host: 'uuidna.com', kind: 'root', serves: 'the sealed ledger — theorems, decide, verify, receipts' },
  { host: 'qpu.uuidna.com', kind: 'qpu', serves: 'the running circuit — the state-vector simulator, Shor, the receipts, the lattice steps' },
  { host: 'lean.uuidna.com', kind: 'lean', serves: 'the Lean publishing worker — standing, theorems, axioms, the census' },
  { host: 'unreal.uuidna.com', kind: 'unreal', serves: 'the Unreal publishing worker — the hologram views' },
] as const

export type HologramHost = (typeof HOLOGRAM_HOSTS)[number]['host']

export const isHologramHost = (host: unknown): host is HologramHost =>
  typeof host === 'string' && HOLOGRAM_HOSTS.some((h) => h.host === host)

export const mcpUrlOf = (host: HologramHost): string => `https://${host}/mcp`

/** The eight harness recipes for one host — the same shapes qpu serves on initialize, computed from the host name. */
export const harnessRecipesOf = (host: HologramHost) => {
  const url = mcpUrlOf(host)
  const name = host === 'uuidna.com' ? 'uuidna' : `uuidna-${host.split('.')[0]}`
  return [
    { harness: 'Claude Code', how: `claude mcp add --transport http ${name} ${url}`, file: '.mcp.json', config: { mcpServers: { [name]: { type: 'http', url } } } },
    { harness: 'Cursor', how: 'add to .cursor/mcp.json (project) or ~/.cursor/mcp.json (global)', file: '.cursor/mcp.json', config: { mcpServers: { [name]: { url } } } },
    { harness: 'VS Code', how: 'add to .vscode/mcp.json and commit it', file: '.vscode/mcp.json', config: { servers: { [name]: { type: 'http', url } } } },
    { harness: 'OpenAI Codex CLI', how: `codex mcp add ${name} --url ${url}`, file: '~/.codex/config.toml', config: `[mcp_servers.${name}]\nurl = "${url}"` },
    { harness: 'Gemini CLI', how: 'add to ~/.gemini/settings.json', file: '~/.gemini/settings.json', config: { mcpServers: { [name]: { httpUrl: url } } } },
    { harness: 'Anthropic Messages API', how: 'header anthropic-beta: mcp-client-2025-04-04', file: 'request body', config: { mcp_servers: [{ type: 'url', url, name }] } },
    { harness: 'OpenAI Responses API', how: 'a tools entry of type mcp', file: 'request body', config: { tools: [{ type: 'mcp', server_label: name, server_url: url, require_approval: 'never' }] } },
    { harness: 'Any HTTP client', how: `POST ${url} with content-type: application/json; methods initialize, tools/list, tools/call`, file: 'none', config: { jsonrpc: '2.0', id: 1, method: 'tools/list' } },
  ] as const
}

/** The hologram: every host with its endpoint, what it serves, its recipes, and the other three it names. */
export const hologramLattice = () => {
  const hosts = HOLOGRAM_HOSTS.map((h) => ({
    host: h.host,
    kind: h.kind,
    serves: h.serves,
    mcp: mcpUrlOf(h.host),
    recipes: harnessRecipesOf(h.host),
    names: HOLOGRAM_HOSTS.filter((o) => o.host !== h.host).map((o) => o.host),
  }))
  const fractal = hosts.every((h) => h.names.length === hosts.length - 1)
  return {
    kind: 'hologram' as const,
    hosts,
    fractal,
    fanout: 'uuidna_fanout { host, method, name?, arguments? } proxies one JSON-RPC call to a named host; no other host is reachable',
    auth: 'none for reads on every host; qpu storage writes carry Authorization: Bearer QPU_WRITE_TOKEN',
    holds: hosts.length === 4 && fractal && hosts.every((h) => h.recipes.length === 8 && h.recipes.every((r) => JSON.stringify(r).includes(h.mcp))),
  }
}

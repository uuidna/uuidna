// quantum/os/agent-coverage — Alpine APIs for the WORLD, proven on uuidna.com/mcp inside uuidnaOS.
//
// MCP is one door, not one wire tool per Alpine package (that catalogue blows the token ceiling). An external
// agent has only https://uuidna.com/mcp. Every Alpine API reaches that agent as `uuidna_exec` {line:
// `apk info <app>` / `man <topic>`}. 100% is every man-corpus app answering through that hosted door.
// uuidna_run is a named stdio orphan (Layer 2), never a silent hole. The listing is learned live — this
// module names the one door constant, never a per-app uuidna_* catalogue.
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { hexbitDoorOf, UUID_HEXBITS } from '../../hexbit/index.js'
import { WORD_BYTES } from '../../mcp-wire.js'
import { rpcCall, rpcList, resultText } from '../apps/terminal.js'
import { manAppWitness, manPagePackages, type CataloguePackage } from './catalogue.js'
import { MCP_ALPINE_DOOR } from './mcp-man.js'
export { AGENT_ORIGIN, AGENT_MCP_PATH, hostedMcpUrl } from '../advantage/mcp/wire/index.js'
import { hostedMcpUrl } from '../advantage/mcp/wire/index.js'
export { MCP_ALPINE_DOOR }

export interface AlpineApiHit {
  man: string
  app: string | null
  covered: boolean
  detail: string
}

export interface AlpineAgentCoverage {
  definition: 'uuidnaOS·browser·uuidna.com/mcp·uuidna_exec'
  endpoint: string
  door: typeof MCP_ALPINE_DOOR
  doorPresent: boolean
  wireDoors: 1
  naiveWireIfPerApp: number
  listed: number
  covered: number
  missed: string[]
  hits: AlpineApiHit[]
  ok: boolean
  percent: number
  receipt: string
  hexbits: number[]
}

export type AgentRpc = (message: object) => Promise<unknown>

const execBody = (raw: unknown): {
  ok?: boolean
  data?: { name?: string; app?: string | null; witnessOk?: boolean; hexbits?: number[] }
} | null => {
  const text = resultText(raw)
  const first = text.split('\n')[0] ?? ''
  if (!first.startsWith('{')) return null
  try { return JSON.parse(first) as { ok?: boolean; data?: { name?: string; app?: string | null; witnessOk?: boolean; hexbits?: number[] } } }
  catch { return null }
}

const listedTools = (raw: unknown): string[] =>
  ((raw as { result?: { tools?: { name?: string }[] } })?.result?.tools ?? [])
    .map((t) => t.name)
    .filter((n): n is string => typeof n === 'string' && n.length > 0)

/** foldAlpineAgentCoverage — 100% iff the one door is on the hosted list and every man-corpus app answered through it. listed=0 is not coverage. */
export function foldAlpineAgentCoverage(
  endpoint: string,
  doorPresent: boolean,
  hits: readonly AlpineApiHit[],
): AlpineAgentCoverage {
  const listed = hits.length
  const covered = hits.filter((h) => h.covered).length
  const missed = hits.filter((h) => !h.covered).map((h) => h.man)
  const ok = doorPresent && listed > 0 && missed.length === 0
  const percent = listed === 0 ? 0 : (covered * 100 - (covered * 100) % listed) / listed
  const receipt = merkleGravity([
    toUuid('alpine-agent|' + endpoint),
    toUuid('door|' + MCP_ALPINE_DOOR + '|' + (doorPresent ? '1' : '0')),
    toUuid('listed|' + listed),
    toUuid('covered|' + covered),
    ...missed.slice(0, 25).map((n) => toUuid('miss|' + n)),
  ])
  return {
    definition: 'uuidnaOS·browser·uuidna.com/mcp·uuidna_exec',
    endpoint,
    door: MCP_ALPINE_DOOR,
    doorPresent,
    wireDoors: 1,
    naiveWireIfPerApp: listed,
    listed, covered,
    missed: missed.slice(0, 25),
    hits: [...hits],
    ok, percent, receipt,
    hexbits: hexbitDoorOf(receipt).hexbits,
  }
}

const coverOne = async (rpc: AgentRpc, man: CataloguePackage, id: { n: number }): Promise<AlpineApiHit> => {
  const w = manAppWitness(man)
  if (!w.ok || !w.app) return { man: man.name, app: null, covered: false, detail: w.detail }
  try {
    const manRaw = await rpc(rpcCall({ kind: 'call', name: MCP_ALPINE_DOOR, args: { line: `man ${man.name}` } }, ++id.n))
    const manBody = execBody(manRaw)
    const apkRaw = await rpc(rpcCall({ kind: 'call', name: MCP_ALPINE_DOOR, args: { line: `apk info ${w.app}` } }, ++id.n))
    const apkBody = execBody(apkRaw)
    const hex = manBody?.data?.hexbits
    const ok = manBody?.ok === true
      && manBody.data?.name === man.name
      && manBody.data?.witnessOk === true
      && manBody.data?.app === w.app
      && Array.isArray(hex) && hex.length === UUID_HEXBITS
      && apkBody?.ok === true
      && apkBody.data?.name === w.app
    return {
      man: man.name, app: w.app, covered: ok,
      detail: ok ? `${w.app} through ${MCP_ALPINE_DOOR}` : `mcp path incomplete for ${man.name} → ${w.app}`,
    }
  } catch (e) {
    return { man: man.name, app: w.app, covered: false, detail: e instanceof Error ? e.message : String(e) }
  }
}

/** walkHostedAlpineApis(rpc, mans) → the man corpus through the one hosted door. Chunks of one 64-bit word, in parallel inside the word. */
export async function walkHostedAlpineApis(
  rpc: AgentRpc,
  mans: readonly CataloguePackage[],
  opts?: { endpoint?: string; yieldEvery?: () => Promise<void>; onProgress?: (done: number, total: number) => void },
): Promise<AlpineAgentCoverage> {
  const endpoint = opts?.endpoint ?? hostedMcpUrl()
  const listedRaw = await rpc(rpcList(1))
  const doorPresent = listedTools(listedRaw).includes(MCP_ALPINE_DOOR)
  if (!doorPresent) return foldAlpineAgentCoverage(endpoint, false, mans.map((m) => ({
    man: m.name, app: null, covered: false, detail: `${MCP_ALPINE_DOOR} absent from hosted tools/list`,
  })))
  const hits: AlpineApiHit[] = []
  const id = { n: 1 }
  const chunk = WORD_BYTES
  for (let i = 0; i < mans.length; i += chunk) {
    const slice = mans.slice(i, i + chunk)
    const part = await Promise.all(slice.map((m) => coverOne(rpc, m, id)))
    hits.push(...part)
    opts?.onProgress?.(hits.length, mans.length)
    if (opts?.yieldEvery) await opts.yieldEvery()
  }
  return foldAlpineAgentCoverage(endpoint, true, hits)
}

/** alpineMansForAgent() → the man corpus the hosted door must cover (Alpine APKINDEX, not overlay). */
export const alpineMansForAgent = (): CataloguePackage[] => manPagePackages()

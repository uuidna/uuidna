// quantum/os/mcp-man — Alpine apps through ONE MCP door, tested by their man pages.
//
// Doctrine: man→app→hexbit is port completeness (manDrivenPortCoverage). Exposing that through MCP must NOT
// mint one wire tool per package (ceiling ~168130 bytes; 4759 descriptors would blow it). The honest surface is
// uuidna_exec: `man <topic>` exercises the documentation package → app witness → hexbits; `apk info <app>`
// reaches the catalogued app. This meter seals man-tested apps exposed through that door = N/M.
import { UUID_HEXBITS } from '../../hexbit/index.js'
import { toUuid } from '../../address.js'
import {
  manPagePackages, manAppWitness, manDrivenPortCoverage, overlayManDrivenPortCoverage,
  OVERLAY_REPO, type ManDrivenPortCoverage,
} from './catalogue.js'
import { uuidnaExec } from './exec.js'

export const MCP_ALPINE_DOOR = 'uuidna_exec' as const

export interface McpManDrivenCoverage {
  definition: 'mcp·uuidna_exec·man→app→hexbit'
  tool: typeof MCP_ALPINE_DOOR
  /** Wire tools that carry the whole Alpine man corpus — must stay 1, never one-per-app. */
  wireDoors: 1
  /** What a naive per-app MCP catalogue would have cost (refused). */
  naiveWireIfPerApp: number
  total: number
  /** Catalogue man→app→hexbit witnesses (same denominator as manDrivenPortCoverage). */
  witnessed: number
  /** Witnesses also reachable via uuidna_exec man + apk info (the MCP port proof). */
  exposed: number
  missing: string[]
  gaps: { man: string; why: string }[]
  byVia: ManDrivenPortCoverage['byVia']
  receipt: string
  honest: string
}

const HONEST =
  'Every honest Alpine app (man-covered corpus) is reachable through ONE MCP tool — uuidna_exec — not one wire ' +
  'descriptor per package. man <doc> exercises man→app→hexbit; apk info <app> reaches the catalogued app. ' +
  'Orphans are named, never padded. Protects the MCP wire ceiling.'

/** mcpManDrivenCoverage() → man pages test apps through the MCP exec door. N/M = exposed/total. */
export function mcpManDrivenCoverage(): McpManDrivenCoverage {
  const driven = manDrivenPortCoverage()
  const list = manPagePackages()
  let exposed = 0
  const missing: string[] = []
  const gaps: { man: string; why: string }[] = []

  for (const man of list) {
    const w = manAppWitness(man)
    if (!w.ok || !w.app) {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) gaps.push({ man: man.name, why: w.detail })
      continue
    }
    const manRun = uuidnaExec(`man ${man.name}`)
    const d = manRun.data as {
      name?: string; app?: string | null; witnessOk?: boolean; hexbits?: number[]
    } | null
    const apkRun = uuidnaExec(`apk info ${w.app}`)
    const apkName = (apkRun.data as { name?: string } | null)?.name
    const ok = manRun.ok
      && d?.name === man.name
      && d.witnessOk === true
      && d.app === w.app
      && Array.isArray(d.hexbits) && d.hexbits.length === UUID_HEXBITS
      && apkRun.ok
      && apkName === w.app
    if (ok) {
      exposed++
    } else {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) {
        const why = !manRun.ok ? `mcp man failed: ${manRun.output[0] ?? 'unknown'}`
          : d?.witnessOk !== true ? `mcp man missing witness: ${d?.app ?? 'null'}`
          : !apkRun.ok ? `mcp apk info failed for ${w.app}: ${apkRun.output[0] ?? 'unknown'}`
          : `mcp path incomplete for ${man.name} → ${w.app}`
        gaps.push({ man: man.name, why })
      }
    }
  }

  const receipt = toUuid(
    `mcp-alpine-man|${MCP_ALPINE_DOOR}|${exposed}/${list.length}|${driven.witnessed}|wireDoors:1`,
  )
  return {
    definition: 'mcp·uuidna_exec·man→app→hexbit',
    tool: MCP_ALPINE_DOOR,
    wireDoors: 1,
    naiveWireIfPerApp: list.length,
    total: list.length,
    witnessed: driven.witnessed,
    exposed,
    missing,
    gaps,
    byVia: driven.byVia,
    receipt,
    honest: HONEST,
  }
}

const OVERLAY_HONEST =
  'npm/curl overlay ports (repo=overlay) through the same uuidna_exec door — NOT Alpine APKINDEX completeness. ' +
  'man + apk info must reach oh-my-pi and peers; orphans named, never padded.'

/** overlayMcpManDrivenCoverage() → overlay man corpus through uuidna_exec; separate from Alpine MCP meter. */
export function overlayMcpManDrivenCoverage(): McpManDrivenCoverage {
  const driven = overlayManDrivenPortCoverage()
  const list = manPagePackages(OVERLAY_REPO)
  let exposed = 0
  const missing: string[] = []
  const gaps: { man: string; why: string }[] = []

  for (const man of list) {
    const w = manAppWitness(man)
    if (!w.ok || !w.app) {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) gaps.push({ man: man.name, why: w.detail })
      continue
    }
    const topic = man.name.endsWith('-doc') ? man.name.slice(0, -4)
      : man.name.endsWith('-man-pages') ? man.name.slice(0, -'-man-pages'.length) : man.name
    const manRun = uuidnaExec(`man ${topic}`)
    const d = manRun.data as {
      name?: string; app?: string | null; witnessOk?: boolean; hexbits?: number[]
    } | null
    const apkRun = uuidnaExec(`apk info ${w.app}`)
    const apkName = (apkRun.data as { name?: string } | null)?.name
    const ok = manRun.ok
      && d?.witnessOk === true
      && d.app === w.app
      && Array.isArray(d.hexbits) && d.hexbits.length === UUID_HEXBITS
      && apkRun.ok
      && apkName === w.app
    if (ok) exposed++
    else {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) {
        gaps.push({ man: man.name, why: !manRun.ok ? `mcp man failed: ${manRun.output[0] ?? 'unknown'}` : `mcp overlay path incomplete for ${man.name} → ${w.app}` })
      }
    }
  }

  const receipt = toUuid(`mcp-overlay-man|${MCP_ALPINE_DOOR}|${exposed}/${list.length}|${driven.witnessed}|wireDoors:1`)
  return {
    definition: 'mcp·uuidna_exec·man→app→hexbit',
    tool: MCP_ALPINE_DOOR,
    wireDoors: 1,
    naiveWireIfPerApp: list.length,
    total: list.length,
    witnessed: driven.witnessed,
    exposed,
    missing,
    gaps,
    byVia: driven.byVia,
    receipt,
    honest: OVERLAY_HONEST,
  }
}

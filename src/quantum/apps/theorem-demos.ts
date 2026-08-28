// theorem-demos — every sealed theorem gets a browser demo: drill (proof of work) + skill shelf + Alpine witness.
// FREE MINT meets USE: the drill records recompute attempts (minting_is_two_per_theorem); Alpine apps harmonise
// by skill (integrity, not execution). Pure — no network.
import { drillOf, type TheoremLike } from './categories/practice/drill.js'

export interface TheoremDemo {
  key: string
  skill: string
  /** always present — recompute challenge on this page */
  drill: { route: string; mount: string; label: string }
  /** skill-matched store shelf */
  shelf: { route: string; mount: string; label: string }
  /** Alpine catalogue witness count when this theorem heads its skill (0 if none) */
  alpineApps: number
  honest: string
}

const DEFAULT_SHELF = { route: '/school', mount: 'PracticeLoop', label: 'Practice drill' }

/** skill → the browser shelf that best demonstrates the skill's concepts */
const SKILL_SHELF: Record<string, { route: string; mount: string; label: string }> = {
  chess: { route: '/chess', mount: 'Chess', label: 'Chess board' },
  nim: { route: '/games', mount: 'NimPlay', label: 'Nim game' },
  installs: { route: '/os', mount: 'PortPanel', label: 'Alpine install port' },
  os: { route: '/terminal', mount: 'ExecShell', label: 'uuidnaOS shell' },
  codes: { route: '/tools', mount: 'SchoolTools', label: 'Claim trial' },
  coding: { route: '/tools', mount: 'SchoolTools', label: 'Claim trial' },
  billing: { route: '/trading', mount: 'TradingFloor', label: 'Trading desk' },
  coins: { route: '/trading', mount: 'TradingFloor', label: 'Two-coin desk' },
  trading: { route: '/trading', mount: 'TradingFloor', label: 'Trading floor' },
  books: { route: '/reading-room', mount: 'BookRoom', label: 'Book room' },
  sailing: { route: '/reading-room', mount: 'BookRoom', label: 'Sailing library' },
  song: { route: '/referrer-song', mount: 'HexbitPlayer', label: 'Hexbit player' },
  anthem: { route: '/referrer-song', mount: 'HexbitPlayer', label: 'Hexbit player' },
  'music-production': { route: '/referrer-song', mount: 'HexbitPlayer', label: 'Hexbit player' },
  hexbit: { route: '/apps', mount: 'HexbitAnimator', label: 'Hexbit animator' },
  catalogue: { route: '/catalogue', mount: 'CatalogueBrowser', label: 'Alpine catalogue' },
}

const HONEST =
  'Proof of work = recompute the sealed statement in the practice drill (recorded, order-invariant, never auto-sealed). ' +
  'Concept = the skill-matched browser shelf + harmonised Alpine packages (integrity, not execution). ' +
  'The drill presents; the student recomputes; minting follows only when the kernel seals.'

/** theoremDemoOf(key, skill[, alpineApps]) → drill + shelf routes for UI crosslinks. Pure. */
export function theoremDemoOf(key: string, skill: string, alpineApps = 0): TheoremDemo {
  const shelf = SKILL_SHELF[skill] ?? DEFAULT_SHELF
  return {
    key,
    skill,
    drill: { route: `/theorem/${key}`, mount: 'TheoremUse', label: 'In-page drill' },
    shelf,
    alpineApps,
    honest: HONEST,
  }
}

export interface TheoremDemoCoverage {
  total: number
  drillable: number
  gaps: string[]
  ok: boolean
  honest: string
}

/** theoremDemoCoverage(ledger) → every sealed theorem must drill (drillOf must not throw). Pure. */
export function theoremDemoCoverage(ledger: readonly TheoremLike[]): TheoremDemoCoverage {
  const gaps: string[] = []
  for (const t of ledger) {
    try { drillOf(t.key, ledger) }
    catch { gaps.push(t.key) }
  }
  return {
    total: ledger.length,
    drillable: ledger.length - gaps.length,
    gaps,
    ok: gaps.length === 0,
    honest: HONEST,
  }
}

/** alpineWitnessByTheorem(bySkill) → map theorem key → harmonised app count from lean/alpine-apps.json */
export function alpineWitnessByTheorem(
  bySkill: readonly { theorem?: string; apps?: number }[],
): Map<string, number> {
  const m = new Map<string, number>()
  for (const row of bySkill) {
    if (row.theorem && row.apps) m.set(row.theorem, row.apps)
  }
  return m
}

// quantum/apps/skill-shelf — THE LIVE INSTRUMENT FOR ONE CAPABILITY. Extracted so the school laboratory can
// emulate a domain without importing the practice drill (which pulls the package index and would cycle).
export const DEFAULT_SHELF = { route: '/school', mount: 'PracticeLoop', label: 'Practice drill' }

/** skill → the browser shelf that best demonstrates the skill's concepts */
export const SKILL_SHELF: Record<string, { route: string; mount: string; label: string }> = {
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
  cipher: { route: '/catalogue', mount: 'CatalogueBrowser', label: 'Alpine catalogue' },
  'crypt-salt': { route: '/catalogue', mount: 'CatalogueBrowser', label: 'Alpine catalogue' },
  security: { route: '/catalogue', mount: 'CatalogueBrowser', label: 'Alpine catalogue' },
}

/** shelfForSkill(skill) → the live instrument that emulates this capability; default is the practice drill. */
export function shelfForSkill(skill: string): { route: string; mount: string; label: string } {
  return SKILL_SHELF[skill] ?? DEFAULT_SHELF
}

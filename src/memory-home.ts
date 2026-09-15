// memory-home — the project's memory lives in the project: AGENTS.md indexes where the laws, the leads and the
// lessons live, CLAUDE.md only points at it, and the lessons are a tracked file. Pure: no filesystem, so the law
// recomputes it at the edge; the host's reading of the real tree is the guard finder's, which passes a reader in.
import type { Gap } from './scripts/landing-gaps.js'

/** the lessons: a DATED record — every figure in it names the moment it was measured, so the count finders read it
 *  as history, the way a published record keeps its numbers */
export const LESSONS = '.claude/lessons.md'

/** the files the memory home consists of, each read by the guard finder */
export const MEMORY_HOME_FILES = ['AGENTS.md', 'CLAUDE.md', LESSONS] as const

/** memoryHomeGaps(files) → one line per missing piece of the in-repo memory home; [] when it is whole. Pure. */
export function memoryHomeGaps(files: ReadonlyMap<string, string>): string[] {
  const gaps: string[] = []
  const agents = files.get('AGENTS.md')
  if (agents === undefined) gaps.push('AGENTS.md is absent — the index of the laws, the leads and the lessons')
  else for (const home of ['src/laws.ts', 'lean/leads.json', '.claude/lessons.md'])
    if (!agents.includes(home)) gaps.push(`AGENTS.md does not name ${home}`)
  // one index, not two: a CLAUDE.md that carries its own prose drifts from AGENTS.md
  if (files.get('CLAUDE.md')?.trim() !== '@AGENTS.md') gaps.push('CLAUDE.md is not exactly "@AGENTS.md"')
  if (!files.has('.claude/lessons.md')) gaps.push('.claude/lessons.md is absent')
  return gaps
}

/** memoryHomeGuardGaps(read) → the guard finder's gaps over a tree; `read` returns undefined for an absent file, and
 *  an absent file is simply not put in the map. Pure given its reader. */
export function memoryHomeGuardGaps(read: (path: string) => string | undefined): Gap[] {
  const files = new Map<string, string>()
  for (const p of MEMORY_HOME_FILES) {
    const text = read(p)
    if (text !== undefined) files.set(p, text)
  }
  return memoryHomeGaps(files).map((what) => ({ what, fix: 'restore the file from HEAD; the memory home is the project, never a private note' }))
}

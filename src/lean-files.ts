// LEAN FILES, ROUTED BY NAME. A hexbit folder is named by the first eight hex digits of the content address of the
// files it holds, and a file's own name carries its content address too. So the list of Lean files is computed from
// the directory listing alone: no file is opened to decide what belongs where. A file is read only when a caller asks
// for its text, which is the end of the route, not the start.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

export interface LeanEntry {
  /** the hexbit folder the file sits in, or null for a file at the top of the lean directory */
  folder: string | null
  /** the file's name, without its folder */
  name: string
  /** the path relative to the lean directory, used to read the file */
  path: string
}

const PAIR = /^[0-9a-f]{2}$/

/** A hexbit folder is nested four levels deep, two hex digits to a level: a hexbit `45bcb8b0` is `45/bc/b8/b0/`. */
const hexbitDirs = (dir: string, depth: number, prefix: string, out: LeanEntry[]): void => {
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f)
    if (depth < 4) {
      if (PAIR.test(f) && statSync(p).isDirectory()) hexbitDirs(p, depth + 1, prefix + f, out)
    } else if (f.endsWith('.lean') && statSync(p).isFile()) {
      out.push({ folder: prefix, name: f, path: `${prefix.match(/.{2}/g)!.join('/')}/${f}` })
    }
  }
}

/** The Lean files of a directory, sorted by path: top-level files, and the files in nested hexbit folders. Names only. */
/** The hexbit folders live under src/handle/xx/xx/xx/xx/ beside the ledger's source, so their files are listed from there. */
export const hexbitRootOf = (leanDir: string): string => join(leanDir, '..', 'src', 'handle')

export const leanEntries = (dir: string, hexRoot: string = hexbitRootOf(dir)): LeanEntry[] => {
  const out: LeanEntry[] = []
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f)
    if (f.endsWith('.lean') && statSync(p).isFile()) out.push({ folder: null, name: f, path: f })
  }
  if (existsSync(hexRoot)) {
    for (const f of readdirSync(hexRoot).sort()) {
      const p = join(hexRoot, f)
      if (PAIR.test(f) && statSync(p).isDirectory()) hexbitDirs(p, 1, f, out)
    }
  }
  return out.sort((a, b) => a.path.localeCompare(b.path))
}

/** The text of one entry. Called at the end of a route, never to decide the route. */
export const leanText = (dir: string, e: LeanEntry): string => readFileSync(join(dir, e.path), 'utf8')


/** The absolute path of a listed file: top-level files sit in the lean directory, hexbit files under src/handle. */
export const leanPath = (dir: string, rel: string): string => {
  const top = join(dir, rel)
  return existsSync(top) ? top : join(hexbitRootOf(dir), rel)
}

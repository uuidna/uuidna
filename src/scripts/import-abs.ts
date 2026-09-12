// import-abs — the ONE computed import() in the scripts layer, in a module of its own.
//
// WHY IT IS ALONE (2026-09-12). This lived in api.ts, the helper every script and most tests import for ROOT and
// run(). The test graph reads a computed import() as an invisible dependency — it may load any module, so it must
// run whenever anything is seeded — and it was right to. But the dependency belonged to the one caller that loads
// scripts by path (one-receipt.ts), and by living in api.ts it was inherited by 257 tests that never call it.
// Measured: a single moved derived json reached 272 of 402 test files. Here, it reaches only this file's importers.
const urlm = (): typeof import('node:url') => (process as unknown as { getBuiltinModule(id: string): unknown }).getBuiltinModule('node:url') as typeof import('node:url')

/** import a COMPILED module by ABSOLUTE path — always as a file URL.
 *
 *  A POSIX absolute path happens to be a usable module specifier, so `import(join(dist, 'x.js'))` reads as correct
 *  and is correct — there. On Windows the same expression hands the loader `C:\…`, which it reads as a URL with the
 *  scheme `c:` and refuses outright. The specifier form is a host fact, so it is settled once, here. */
export const importAbs = <T = Record<string, unknown>>(abs: string): Promise<T> =>
  import(urlm().pathToFileURL(abs).href) as Promise<T>

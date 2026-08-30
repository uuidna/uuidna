// host-node — Node builtins for Layer 2, reached only through process.getBuiltinModule.
// Static `from 'node:…'` here would ride the worker bundle (mcp.ts lazy-imports this folder) and wrangler
// would warn that the edge has no filesystem. Importing this module is always safe; CALLING off-Node refuses.
type Fs = typeof import('node:fs')
type Path = typeof import('node:path')
type Os = typeof import('node:os')
type Cp = typeof import('node:child_process')

const take = <T>(name: string): T => {
  const g = (process as unknown as { getBuiltinModule?: (n: string) => T }).getBuiltinModule
  if (typeof g !== 'function')
    throw new Error('os/runtime: Node builtins are host-only — uuidna_run is absent from the Workers edge')
  return g(name)
}

export const nodeFs = (): Fs => take('node:fs')
export const nodePath = (): Path => take('node:path')
export const nodeOs = (): Os => take('node:os')
export const nodeCp = (): Cp => take('node:child_process')

export const join = (...p: string[]): string => nodePath().join(...p)
export const existsSync = (p: string): boolean => nodeFs().existsSync(p)
export function readFileSync(p: string, enc: BufferEncoding): string
export function readFileSync(p: string): Buffer
export function readFileSync(p: string, enc?: BufferEncoding): string | Buffer {
  return enc ? nodeFs().readFileSync(p, enc) : nodeFs().readFileSync(p)
}
export const writeFileSync = (p: string, data: string | Uint8Array): void => { nodeFs().writeFileSync(p, data) }
export const mkdirSync = (p: string, opts?: { recursive: boolean }): void => { nodeFs().mkdirSync(p, opts) }
export const mkdtempSync = (p: string): string => nodeFs().mkdtempSync(p)
export const rmSync = (p: string, opts: { recursive: boolean; force: boolean }): void => { nodeFs().rmSync(p, opts) }
export const tmpdir = (): string => nodeOs().tmpdir()
export const spawnSync = (
  file: string,
  argv: readonly string[],
  opts?: import('node:child_process').SpawnSyncOptionsWithStringEncoding,
): import('node:child_process').SpawnSyncReturns<string> =>
  nodeCp().spawnSync(file, argv as string[], { ...opts, encoding: 'utf8' })

export const execFileAsync = (
  file: string,
  argv: readonly string[],
  opts: { env?: NodeJS.ProcessEnv; maxBuffer?: number },
): Promise<{ stdout: string; stderr: string }> =>
  new Promise((resolve, reject) => {
    nodeCp().execFile(file, argv as string[], opts, (err, stdout, stderr) => {
      if (err) {
        const e = err as NodeJS.ErrnoException & { stdout?: string; stderr?: string; code?: number }
        e.stdout = String(stdout ?? '')
        e.stderr = String(stderr ?? '')
        reject(e)
        return
      }
      resolve({ stdout: String(stdout ?? ''), stderr: String(stderr ?? '') })
    })
  })

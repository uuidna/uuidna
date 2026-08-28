// quantum/os/session — SIMULATED INSTALL + WRITABLE VFS for uuidna_exec (Layer 1).
//
// The boot closure stays sealed; session adds AVAILABLE packages and content-addressed files
// in-process. Receipts name execSessionStamp() so simulated state is never silent.
import { cataloguePackage } from './catalogue.js'
import { toUuid } from '../../address.js'

export interface SessionFile {
  path: string
  content: string
  address: string
}

let added = new Set<string>()
let files = new Map<string, SessionFile>()
let cwd = '/'

/** resetExecSession() → boot-only world (tests + fresh runs). */
export function resetExecSession(): void {
  added = new Set()
  files = new Map()
  cwd = '/'
}

/** execSessionStamp() → content-address of simulated install + vfs + cwd. */
export function execSessionStamp(): string {
  const names = [...added].sort().join(',')
  const vfs = [...files.keys()].sort().join(',')
  return toUuid('exec-session|' + names + '|' + vfs + '|' + cwd)
}

export const sessionCwd = (): string => cwd

export const setSessionCwd = (path: string): void => { cwd = path }

export const sessionAdded = (): readonly string[] => [...added].sort()

export function sessionAdd(name: string): { ok: true } | { ok: false; why: string } {
  if (!cataloguePackage(name)) return { ok: false, why: 'no such package in the pinned catalogue' }
  added.add(name)
  return { ok: true }
}

export function sessionDel(name: string): { ok: true; removed: boolean } {
  if (!added.has(name)) return { ok: true, removed: false }
  added.delete(name)
  return { ok: true, removed: true }
}

export const sessionHasPackage = (name: string): boolean => added.has(name)

export function sessionWrite(path: string, content: string): SessionFile {
  const f = { path, content, address: toUuid('vfs-file|' + path + '|' + content.length + '|' + content.slice(0, 64)) }
  files.set(path, f)
  return f
}

export const sessionRead = (path: string): SessionFile | null => files.get(path) ?? null

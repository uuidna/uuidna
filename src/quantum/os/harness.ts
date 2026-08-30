// harness — Layer 1 tests boot here; exec never bypasses the verified world.
import assert from 'node:assert/strict'
import { bootOS, servedOS, type BootedOS } from './index.js'
import { catalogueState } from './catalogue.js'
import { bootUuidnaOSInBrowser, type BrowserBootResult } from './browser-boot.js'
import {
  uuidnaExec, uuidnaLs, resetExecSession as resetExecInner,
  APPLETS, APK_VERBS, SEQUENCE_VERBS, type ExecResult,
} from './exec.js'
import { resetExecSession, execSessionStamp, sessionWrite } from './session.js'
import { runExecLine, execShellHelp, type ExecShellLine } from '../apps/exec-shell.js'

let mill: BootedOS | null = null

export function boot(): BootedOS {
  if (!mill) {
    mill = bootOS()
    assert.equal(catalogueState().present, true, catalogueState().why ?? 'catalogue absent')
  }
  return mill
}

export function reset(): void {
  resetExecSession()
  resetExecInner()
}

export function fresh(): void {
  boot()
  reset()
}

export function exec(line: string): ExecResult {
  boot()
  return uuidnaExec(line)
}

export function shell(line: string): ExecShellLine {
  boot()
  return runExecLine(line)
}

export function ls(path: string) {
  boot()
  return uuidnaLs(path)
}

export async function bootBrowser(selfTest = false): Promise<BrowserBootResult> {
  boot()
  return bootUuidnaOSInBrowser(undefined, { selfTest })
}

export {
  servedOS, catalogueState, execShellHelp, execSessionStamp, sessionWrite,
  APPLETS, APK_VERBS, SEQUENCE_VERBS,
  type ExecResult, type ExecShellLine, type BootedOS, type BrowserBootResult,
}

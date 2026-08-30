// quantum/apps/exec-shell — Layer 1 uuidnaOS shell for browser production (pure half).
//
// Runs uuidnaExec locally after catalogue prime — no MCP round-trip, no Alpine binaries.
// Session state (apk add/del) persists for the page lifetime via session.ts.
import { uuidnaExec, type ExecResult } from '../os/exec/index.js'
import { execSessionStamp } from '../os/session/index.js'

export interface ExecShellLine {
  ok: boolean
  output: string[]
  receipt: string
  hexbits: number[]
  applet: string
  session: string
}

/** runExecLine(line) → one Layer-1 command; empty line is a no-op. */
export function runExecLine(line: string): ExecShellLine {
  const trimmed = line.trim()
  if (!trimmed) {
    return { ok: true, output: [], receipt: '', hexbits: [], applet: '', session: execSessionStamp() }
  }
  const r = uuidnaExec(trimmed)
  return {
    ok: r.ok,
    output: r.output,
    receipt: r.receipt,
    hexbits: r.hexbits,
    applet: r.applet,
    session: execSessionStamp(),
  }
}

/** execShellHelp() → starter grammar for the production shell. */
export function execShellHelp(): string {
  return [
    'uuidnaOS Layer 1 — local exec (no MCP round-trip). Nothing runs Alpine binaries.',
    '',
    'Applets: ls, apk, man, driver, device, cat, which, stat, pwd, echo, du, sequence, help',
    '',
    'Examples:',
    '  ls /terminal',
    '  ls /catalogue',
    '  nginx',
    '  openssl',
    '  apk info busybox',
    '  sequence field',
    '  sequence run 9',
    '  apk search musl',
    '  man busybox',
    '  pwd',
    '',
    'Session: apk add/del persists for this tab only.',
    'Layer 2 (host docker chroot): uuidna_run — stdio/host only.',
    'Full MCP toolbox: /chat',
  ].join('\n')
}

/** formatExecResult(r) → display text for one applet run. */
export function formatExecResult(r: ExecResult): string {
  return r.output.join('\n')
}

// os/overlay — npm/curl upstream apps in uuidna's catalogue shape (repo=overlay).
//
// THIS DOOR IS COMMAND-SHAPED, and that is a real limit rather than an oversight. gen-alpine-overlay writes a
// `-doc` companion row for EVERY entry, and overlayManDrivenPortCoverage then requires each doc to witness a
// real app through manAppWitness — which resolves via a provided command. So an entry that provides no command
// produces a doc row nothing can witness, and the coverage law fails, correctly.
//
// Measured 2026-09-04 by trying it: `three` (npm three@0.185.1, MIT, 23172772 bytes unpacked) was declared here
// on the captain's instruction to port it. The port itself worked — the live npm shasum 63e9e241a17b… converted
// to Q1Y+niQaF7EB4hGWUSGgF7S02AVK4= and merged into the catalogue, giving it the address
// 0c34a304-a3d5-8ab2-9016-47f0f8754b4a — and then two coverage tests failed because a LIBRARY has no man page
// and no exec witness. Reverted rather than exempted: suppressing the doc row for library entries would be a
// conditional carve-out, and the standing instruction is that there are no exceptions.
//
// WHAT A LIBRARY PORT WOULD NEED is a door of its own: an identity and a checksum with no command, no doc
// companion, and a coverage law that asks whether the identity recomputes rather than whether a man page
// witnesses a binary. That is a design act, not a repair.
import { createHash } from 'node:crypto'

export interface OverlayAppSpec {
  name: string
  version: string
  npm: string
  npmVersion: string
  desc: string
  deps: string[]
  provides: string[]
}

export function npmShasumToQ1(hexSha1: string): string {
  const bytes = Buffer.from(hexSha1, 'hex')
  if (bytes.length !== 20) throw new Error(`overlay: npm shasum must be 20 bytes, got ${bytes.length}`)
  return `Q1${bytes.toString('base64')}`
}

export function overlayDocChecksum(app: string, version: string): string {
  const sha1 = createHash('sha1').update(`uuidna-overlay-doc|${app}|${version}`).digest()
  return `Q1${sha1.toString('base64')}`
}

export const OVERLAY_APPS: readonly OverlayAppSpec[] = [
  {
    name: 'oh-my-pi',
    version: '18.0.6-r0',
    npm: '@oh-my-pi/pi-coding-agent',
    npmVersion: '18.0.6',
    desc: 'Coding agent CLI with the IDE wired in — native Rust core, MCP/LSP/DAP (npm @oh-my-pi/pi-coding-agent; NOT apk)',
    deps: ['nodejs-current'],
    provides: ['cmd:omp=18.0.6-r0'],
  },
]

// os/overlay — npm/curl upstream apps in uuidna's catalogue shape (repo=overlay).
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

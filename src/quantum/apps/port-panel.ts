// quantum/apps/port-panel — pinned Alpine port status for browser production (pure half).
import { portStatus, type PortStatus } from '../os/index.js'

export interface PortPanelView {
  lines: string[]
  status: PortStatus
}

/** portPanelView() → offline port observability for the /os monitor. */
export function portPanelView(): PortPanelView {
  const s = portStatus()
  const lines = [
    `Alpine ${s.release.version} · ${s.branch}/${s.arch} · ${s.count} install paths`,
    `rootfs sha256 ${s.release.rootfsSha256.slice(0, 16)}…`,
    `driver ${s.driver.flavor} · ${s.driver.sha256.slice(0, 16)}… · receipt ${s.driver.receipt.slice(0, 8)}…`,
    `boot ${s.bootStates.toLocaleString('en-US')} states · port receipt ${s.receipt.slice(0, 8)}…`,
    `floor ${s.floor}`,
  ]
  return { lines, status: s }
}

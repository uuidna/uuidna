#!/usr/bin/env node
// browser-apps-usable — SEAL that every honest app surface is usable: store mounts, man→app→hexbit,
// uuidnaExec man samples (the terminal applet), default-install routes. Optional --live probes HTTP 200 on
// https://uuidna.com (or --base URL). Integrates manDrivenPortCoverage — does not replace the hexbit port work.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { BROWSER_SURFACES, browserAppsUsable, type BrowserAppsUsable } from '../quantum/apps/browser-usable.js'
import { toUuid } from '../address.js'

const live = process.argv.includes('--live')
const baseArg = process.argv.find((a) => a.startsWith('--base='))
const BASE = (baseArg?.slice('--base='.length) || 'https://uuidna.com').replace(/\/$/, '')

const loadDocs = (): Map<string, string> => {
  const m = new Map<string, string>()
  for (const s of BROWSER_SURFACES) {
    const p = join(ROOT, 'docs', `${s.doc}.md`)
    if (existsSync(p)) m.set(s.doc, readFileSync(p, 'utf8'))
  }
  return m
}

const report = browserAppsUsable(loadDocs())

type LiveHit = { route: string; status: number; ok: boolean }
const liveHits: LiveHit[] = []
if (live) {
  const routes = [...new Set(BROWSER_SURFACES.map((s) => s.route))]
  for (const route of routes) {
    try {
      const res = await fetch(`${BASE}${route}`, { method: 'GET', redirect: 'follow' })
      liveHits.push({ route, status: res.status, ok: res.status >= 200 && res.status < 400 })
    } catch (e) {
      liveHits.push({ route, status: 0, ok: false })
      console.error(`  live ${route}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }
}

const receipt = toUuid(
  `browser-apps-usable|${report.totals.mountsOk}/${report.totals.surfaces}|`
  + `${report.totals.computeOk}|${report.totals.manSamplesOk}|`
  + `${report.manDriven.witnessed}/${report.manDriven.total}|${liveHits.filter((h) => h.ok).length}`,
)

const out: BrowserAppsUsable & { receipt: string; live?: LiveHit[]; base?: string } = {
  ...report,
  receipt,
  ...(live ? { live: liveHits, base: BASE } : {}),
}

writeFileSync(join(ROOT, 'lean', 'browser-apps-usable.json'), JSON.stringify(out, null, 2) + '\n')

const liveFail = liveHits.filter((h) => !h.ok)
const ok = report.ok && liveFail.length === 0
console.log(
  `${ok ? '✓' : '✗'} browser-apps-usable — mounts ${report.totals.mountsOk}/${report.totals.surfaces} · `
  + `compute ${report.totals.computeOk}/${report.compute.length} · `
  + `man samples ${report.totals.manSamplesOk}/${report.manSamples.length} · `
  + `install ${report.totals.installOk}/${report.installRoutes.length} · `
  + `man→app ${report.manDriven.witnessed}/${report.manDriven.total}`
  + (live ? ` · live ${liveHits.length - liveFail.length}/${liveHits.length} @ ${BASE}` : '')
  + ` · receipt ${receipt}`,
)
if (report.gaps.length) {
  console.log('  gaps:')
  for (const g of report.gaps.slice(0, 25)) console.log('   ', g)
}
if (liveFail.length) {
  console.log('  live failures:')
  for (const h of liveFail) console.log(`    ${h.route} → ${h.status}`)
}
if (!ok) process.exit(1)

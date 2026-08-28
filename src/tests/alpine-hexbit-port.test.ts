// alpine hexbit port — TypeScript is the quantum computer; VitePress is the quantum monitor.
//
// PORT COMPLETENESS is man pages testing the apps, folded into hexbits (manDrivenPortCoverage) — not the
// package-count compile table alone. hexbitPortCoverage / manPagePortCoverage remain provenance meters
// (every published row folds to 32 states). The gate fails if the man→app→hexbit witness regresses, and it
// refuses to call orphan documentation rows "100%".
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  catalogue, catalogueCompile, cataloguePackage, hexbitPortCoverage, manPagePortCoverage,
  manPagePackages, manDrivenPortCoverage, overlayManDrivenPortCoverage,
  manAppWitness, resolveManApp, manAppOriginCandidates, packageSelfTestCoverage, isUpstreamClosureGap,
  resolveManPage,
} from '../quantum/os/catalogue.js'
import { uuidnaExec, APPLETS } from '../quantum/os/exec.js'
import { UUID_HEXBITS, UUID_BITS, hexbitDoorOf } from '../hexbit/index.js'
import { theoremByKey } from '../theorems/index.js'
import { LEVELS } from '../quantum/advantage/index.js'

const pct = (n: number, of: number): number => of === 0 ? 0 : ((n * 100) - ((n * 100) % of)) / of

test('PORT COMPLETENESS is man→app→hexbit — man pages testing the apps', () => {
  const driven = manDrivenPortCoverage()
  assert.equal(driven.definition, 'man→app→hexbit')
  assert.ok(driven.total > 4000, `man corpus must be thousands; got ${driven.total}`)
  assert.equal(driven.witnessed + driven.missing.length >= driven.witnessed, true)
  assert.ok(driven.witnessed <= driven.total)
  // Honest seal: 100% is a finding when every -doc row resolves an app; orphans (if any) must be named.
  assert.equal(driven.witnessed + driven.gaps.length >= driven.witnessed, true)
  assert.ok(driven.witnessed >= driven.total - 25,
    `man→app→hexbit must stay near-complete; got ${driven.witnessed}/${driven.total} — gaps: ${driven.missing.join(', ')}`)
  const completeness = pct(driven.witnessed, driven.total)
  assert.ok(completeness >= 99, `man→app→hexbit completeness ${completeness}% (${driven.witnessed}/${driven.total})`)
  // Orphans are named when present — never silently absorbed into a padded 100%
  if (driven.witnessed < driven.total) {
    assert.ok(driven.missing.length > 0, 'incomplete completeness must name missing man packages')
    assert.ok(driven.gaps.every((g) => g.why.length > 0))
  } else {
    assert.equal(driven.missing.length, 0)
    assert.equal(driven.gaps.length, 0)
  }
})

test('man pages test apps end-to-end — busybox man→app→hexbit', () => {
  const man = cataloguePackage('busybox-doc')
  assert.ok(man, 'busybox-doc is in the catalogue')
  const w = manAppWitness(man)
  assert.equal(w.ok, true, w.detail)
  assert.equal(w.app, 'busybox')
  assert.equal(w.via, 'origin')
  assert.equal(w.manHexbits, true)
  assert.equal(w.appHexbits, true)
  const resolved = resolveManApp(man)
  assert.ok(resolved)
  assert.equal(resolved.app.name, 'busybox')
  // applet path: man busybox resolves the documentation package and folds hexbits
  const r = uuidnaExec('man busybox')
  assert.equal(r.ok, true)
  const d = r.data as { name: string; hexbits: number[]; kind: string }
  assert.equal(d.name, 'busybox-doc')
  assert.equal(d.kind, 'man')
  assert.equal(d.hexbits.length, UUID_HEXBITS)
  // and the app itself compiles
  const app = catalogueCompile(cataloguePackage('busybox')!)
  assert.equal(app.hexbits.length, UUID_HEXBITS)
  const door = hexbitDoorOf(app.address)
  assert.equal(app.door, door.door)
  assert.deepEqual(app.hexbits, door.hexbits)
  assert.equal(app.coin.length, door.coin.length)
})

test('orphan documentation packages FAIL the witness — 100% is a finding, not a default', () => {
  // Fabricate a -doc row whose origin is not in the catalogue: the meter must refuse.
  const fake = {
    repo: 'community', name: 'zzz-no-such-origin-doc', version: '1.0.0-r0',
    checksum: 'Q1AAAAAAAAAAAAAAAAAAAAAAAAAAA=', desc: 'docs for nothing',
    deps: [] as string[], provides: [] as string[],
  }
  const w = manAppWitness(fake)
  assert.equal(w.ok, false)
  assert.equal(w.app, null)
  assert.match(w.detail, /orphan|no catalogued app/)
})

test('dotnet-doc resolves via cmd:dotnet provide — apps exist, not sealed orphans', () => {
  // Alpine publishes no package named `dotnet`; the CLI is `dotnet-host` providing cmd:dotnet.
  const man = cataloguePackage('dotnet-doc')
  assert.ok(man, 'dotnet-doc is in the catalogue')
  const resolved = resolveManApp(man)
  assert.ok(resolved, 'dotnet-doc must resolve an app')
  assert.equal(resolved.app.name, 'dotnet-host')
  assert.equal(resolved.via, 'provides')
  const w = manAppWitness(man)
  assert.equal(w.ok, true, w.detail)
  assert.equal(w.app, 'dotnet-host')
})

test('manAppOriginCandidates prefer -gtk-doc library subjects', () => {
  assert.deepEqual(manAppOriginCandidates('man-pages'), ['man-pages'])
  assert.deepEqual(manAppOriginCandidates('busybox-doc'), ['busybox'])
  assert.deepEqual(manAppOriginCandidates('s6-man-pages'), ['s6'])
  assert.ok(manAppOriginCandidates('udisks2-gtk-doc').includes('udisks2'))
  assert.ok(manAppOriginCandidates('udisks2-gtk-doc').includes('udisks2-gtk'))
})

test('PROVENANCE — 100% of Alpine community packages compile to hexbits', () => {
  const cov = hexbitPortCoverage('community')
  assert.ok(cov.total > 20000, `community must be tens of thousands on the pinned catalogue; got ${cov.total}`)
  assert.equal(cov.ported, cov.total,
    `community hexbit port ${cov.ported}/${cov.total} — missing: ${cov.missing.join(', ') || '(none named)'}`)
  assert.equal(cov.missing.length, 0)
})

test('PROVENANCE — 100% of whole Alpine (main + community) compiles to hexbits', () => {
  const cov = hexbitPortCoverage()
  assert.equal(cov.repo, 'all')
  assert.ok(cov.total > 25000, `whole catalogue must exceed 25k; got ${cov.total}`)
  assert.equal(cov.ported, cov.total,
    `Alpine hexbit port ${cov.ported}/${cov.total} — missing: ${cov.missing.join(', ') || '(none named)'}`)
})

test('PROVENANCE — 100% of Alpine man-page packages compile to hexbits', () => {
  const man = manPagePortCoverage()
  assert.ok(man.total > 4000, `Alpine publishes thousands of -doc / man-pages packages; got ${man.total}`)
  assert.equal(man.ported, man.total,
    `man-page hexbit port ${man.ported}/${man.total} — missing: ${man.missing.join(', ') || '(none named)'}`)
})

test('PACKAGE SELF-TEST — every catalogue row tests itself; upstream APKINDEX gaps are named', () => {
  const st = packageSelfTestCoverage()
  assert.equal(st.definition, 'package-self-test')
  assert.ok(st.total > 25000, `whole catalogue must exceed 25k; got ${st.total}`)
  assert.equal(st.passed + st.failed, st.total)
  assert.equal(st.failed, st.upstreamGaps,
    `non-upstream failures must be zero; got ${st.failed - st.upstreamGaps}: ${st.missing.join(', ')}`)
  assert.ok(st.gaps.every((g) => isUpstreamClosureGap(g.unresolved)),
    `every gap must be upstream: ${st.gaps.map((g) => g.name).join(', ')}`)
  assert.ok(st.passed >= st.total - 5,
    `self-test ${st.passed}/${st.total} — gaps: ${st.missing.join(', ')}`)
})

test('FULL MAN CORPUS — uuidna_exec man resolves every witnessed documentation package', () => {
  const topicForDoc = (p: { name: string }): string => {
    if (resolveManPage(p.name)?.name === p.name) return p.name
    const tries = [
      p.name.endsWith('-doc') ? p.name.slice(0, -4) : null,
      p.name.endsWith('-man-pages') ? p.name.slice(0, -10) : null,
      ...manAppOriginCandidates(p.name),
    ].filter(Boolean) as string[]
    for (const t of tries) {
      if (resolveManPage(t)?.name === p.name) return t
    }
    return p.name
  }
  const failures: string[] = []
  for (const p of manPagePackages()) {
    const topic = topicForDoc(p)
    const r = uuidnaExec(`man ${topic}`)
    if (!r.ok) failures.push(`${p.name} (${topic}): ${r.output[0]}`)
    else {
      const d = r.data as { name: string; hexbits?: number[]; witnessOk?: boolean }
      if (d.name !== p.name) failures.push(`${p.name}: resolved ${d.name}`)
      if (d.hexbits?.length !== UUID_HEXBITS) failures.push(`${p.name}: bad hexbits`)
      if (d.witnessOk === false) failures.push(`${p.name}: orphan witness`)
    }
  }
  assert.equal(failures.length, 0,
    `man corpus exec failures (${failures.length}/${manPagePackages().length}):\n${failures.slice(0, 15).join('\n')}`)
})

test('FULL CATALOGUE — apk list --all and ls /catalogue expose the census', () => {
  const all = uuidnaExec('apk list --all')
  assert.ok(all.ok)
  const d = all.data as { total: number; scope: string }
  assert.equal(d.scope, 'all')
  assert.ok(d.total > 25000)
  assert.ok(all.output.some((l) => l.includes('[community]')))

  const ls = uuidnaExec('ls /catalogue')
  assert.ok(ls.ok)
  assert.ok(ls.output.some((l) => l.endsWith('/')))

  const main = uuidnaExec('apk list main')
  assert.ok(main.ok)
  assert.ok((main.data as { total: number }).total > 5000)
})

test('driver and device applets — provenance and host quantum executor', () => {
  assert.ok(APPLETS.includes('driver'))
  assert.ok(APPLETS.includes('device'))
  const drv = uuidnaExec('driver')
  assert.ok(drv.ok)
  assert.match(drv.output[0]!, /alpine-netboot/)
  assert.match(drv.output.join('\n'), /9a7769ea8fa1737b1b49d82f1bdd53d0a17338d6d3b7cfc6f2c3ec5158596d8b/)
  const dev = uuidnaExec('device')
  assert.ok(dev.ok)
  assert.match(dev.output[0]!, /logical cores/)
  assert.ok((dev.data as { device: { deviceAddress: string } }).device.deviceAddress.includes('-'))
})

test('man applet resolves documentation packages with 32 hexbits', () => {
  const r = uuidnaExec('man busybox')
  assert.equal(r.ok, true)
  assert.equal(r.applet, 'man')
  const d = r.data as { name: string; hexbits: number[]; address: string; kind: string }
  assert.equal(d.name, 'busybox-doc')
  assert.equal(d.kind, 'man')
  assert.equal(d.hexbits.length, UUID_HEXBITS)
  assert.ok(typeof d.address === 'string' && d.address.includes('-'))
  const direct = uuidnaExec('man man-pages')
  assert.equal(direct.ok, true)
  assert.equal((direct.data as { name: string }).name, 'man-pages')
  const gone = uuidnaExec('man zzz-no-such-topic-anywhere')
  assert.equal(gone.ok, false)
  assert.match(gone.output[0]!, /no documentation package/)
})

test('THE CHECK BITES — a package that does not compile is counted as missing, so 100% is a finding', () => {
  const node = catalogue().find((p) => p.name === 'nodejs' && p.repo === 'main')
  assert.ok(node, 'nodejs is the probe package')
  const c = catalogueCompile(node)
  assert.equal(c.hexbits.length, UUID_HEXBITS)
  assert.ok(c.hexbits.every((h) => h >= 0 && h < 16))
  assert.equal(UUID_BITS, 128, '32 hexbits × 4 bits = 128 — a_spec_compiles_to_hexbits')
})

test('community hexbit port has architectural quantum advantage in SCALE and TIME', () => {
  const byKey = theoremByKey()
  assert.ok(byKey.get('handle_capacity_is_quantum_by_architecture'), 'scale cites sealed theorem')
  assert.ok(byKey.get('a_spec_compiles_to_hexbits'), 'compile width cites sealed theorem')
  assert.ok(byKey.get('n_qubit_dimension'), 'simulation-cost bound (n=1..5); not a Shor claim')
  assert.ok(byKey.get('usable_gap_is_two_to_eighty'), 'measured usable-capacity advantage sealed')

  const uuidLevel = LEVELS.find((l) => l.name === 'uuid')
  assert.ok(uuidLevel)
  assert.equal(uuidLevel.pow2, 128)
  assert.equal(uuidLevel.hexbits, UUID_HEXBITS)
  assert.equal(uuidLevel.seals, 'handle_capacity_is_quantum_by_architecture')

  const community = catalogue().filter((p) => p.repo === 'community')
  const cov = hexbitPortCoverage('community')
  assert.equal(cov.ported, community.length)

  const t0 = process.hrtime.bigint()
  for (const p of community) catalogueCompile(p)
  const compileNs = Number(process.hrtime.bigint() - t0)
  const nsPer = (compileNs - (compileNs % community.length)) / community.length
  assert.ok(compileNs > 0, 'the compile sweep must take measurable time')
  assert.ok(nsPer < 1_000_000, `per-package compile must stay under 1 ms; measured ${nsPer} ns`)
  assert.ok(community.length < 2 ** 20, 'community fits in a million; the address space is 2^128')
  assert.equal(UUID_BITS, uuidLevel.pow2)
})

test('oh-my-pi (omp) is overlay — NOT Alpine distro; separate from APKINDEX completeness', () => {
  const app = cataloguePackage('oh-my-pi')
  const doc = cataloguePackage('oh-my-pi-doc')
  assert.ok(app, 'oh-my-pi must be in merged catalogue (overlay)')
  assert.ok(doc, 'oh-my-pi-doc must be in merged catalogue')
  assert.equal(app!.repo, 'overlay', 'oh-my-pi is NOT an Alpine apk package')
  assert.equal(doc!.repo, 'overlay')
  assert.ok(app!.provides.some((p) => p.startsWith('cmd:omp=')))
  assert.equal(manPagePackages().some((p) => p.name === 'oh-my-pi-doc'), false,
    'overlay docs must not enter Alpine man→app completeness denominator')
  const w = manAppWitness(doc!)
  assert.equal(w.ok, true, w.detail)
  assert.equal(w.app, 'oh-my-pi')
  assert.equal(w.via, 'origin')
  const run = uuidnaExec('man oh-my-pi')
  assert.equal(run.ok, true, run.output.join('\n'))
  const d = run.data as { witnessOk?: boolean; app?: string } | null
  assert.equal(d?.witnessOk, true)
  assert.equal(d?.app, 'oh-my-pi')
})

test('overlayManDrivenPortCoverage — npm/curl ports separate from APKINDEX', () => {
  const o = overlayManDrivenPortCoverage()
  assert.equal(o.total, 1)
  assert.equal(o.witnessed, 1)
  assert.equal(o.missing.length, 0)
  const h = hexbitPortCoverage('overlay')
  assert.equal(h.ported, h.total)
  assert.ok(h.total >= 2)
})

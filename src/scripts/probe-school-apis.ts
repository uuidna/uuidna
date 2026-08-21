#!/usr/bin/env node
// @non-harmonic: calls every wired EU source over the network — a NAMED boundary, like await-live.ts and books.ts.
//
// probe-school-apis — THE HEARTBEAT FOR THE SEVEN. Every test over school-apis.ts is PURE, and every source is
// reached only through an MCP tool, so all of them run exactly when a human or an agent asks. That is the opposite
// of independence: each could begin answering 404 tomorrow and the whole suite would stay green. This asks each
// source its OWN declared known-good query and reports which answered.
//
// IT NEVER FAILS THE BUILD. A public EU API being down is not this repository's defect; the defect would be not
// noticing. So it exits 0 whatever it finds, and CI can run it for the report rather than for the verdict — pass
// --strict to get a non-zero exit when a source is dark, for a human who is asking on purpose.
import { probeSchoolApis } from '../school-apis.js'

const strict = process.argv.includes('--strict')
const h = await probeSchoolApis()
for (const p of h.probes)
  console.log(`  ${p.ok ? '✓' : '·'} ${p.id.padEnd(13)} ${String(p.rows).padStart(3)} rows  ${p.note}`)
console.log(`${h.dark.length ? '·' : '✓'} probe — ${h.answering}/${h.probed} EU sources answering; receipt ${h.receipt}`)
if (h.dark.length) console.log(`  dark: ${h.dark.map((d) => d.id).join(', ')} — reported's defect)`)
process.exit(strict && h.dark.length ? 1 : 0)

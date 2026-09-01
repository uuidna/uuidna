#!/usr/bin/env node
// context-budget — THE FINDER FOR THE COST OF BEING CONNECTED.
//
// Every other finder in this tree measures whether the ledger is honest. This one measures what the ledger COSTS to
// talk to. An MCP client sends the whole `tools/list` payload — every name, description and input schema — into the
// model's context on EVERY request of every session. That payload is therefore not documentation: it is a per-turn
// toll, paid by every agent that connects, forever. Nothing was watching it, and it had grown to 174,903 bytes
// (~48.6k tokens) across 191 tools before anyone measured it.
//
// MEASURED, the day it was folded: ONE sentence — "The boundary here is DECLARED, and a declared boundary is exactly
// what passes while an undeclared one is caught — theorem drift_is_named_or_caught." — appeared in 87 descriptions
// verbatim, 14,401 bytes of the payload, re-sent on every request. The honesty it carries is real; the 87th copy of
// it carries no information the 1st did not. That is the class this finder makes impossible to reintroduce.
//
// THREE CHECKS:
//   1) THE CEILING — the wire payload may never exceed the sealed budget in lean/mcp-context-budget.json, a number
//      that may only SHRINK (the same discipline as lean/key-entropy.json). Trimming re-seals it lower; growth fails.
//   2) THE DRY LAW, ON THE WIRE — a sentence longer than LAW_PHRASE repeated across three or more descriptions is
//      prose duplicated into every request. Short canonical law-phrases (a citation such as "Boundary declared —
//      theorem drift_is_named_or_caught.") are BELOW that bound and stay: repeating a cheap citation is honesty,
//      while repeating a paragraph is a toll. The bound is what separates the two.
//   3) THE SPLIT LAW — a tool whose description exceeds WIRE_CAP must carry its derivation in `detail` instead.
//      `detail` is rendered into docs/mcp.md by gen-mcp and is NEVER placed on the wire, so the page keeps every
//      word while the request stops paying for it.
//
// Deterministic: same catalogue → same verdict. No wall-clock, no RNG, no Math.*.
import { report, type Gap } from './api.js'
import { WIRE_CAP, LAW_PHRASE, sentences, wireBytes, sealedBudget, type WireTool } from '../mcp-wire.js'

/** Repetition at or above this many descriptions is duplication, not emphasis. */
const REPEATS = 3

export { wireBytes, sealedBudget, type WireTool }
export type Budget = import('../mcp-wire.js').WireBudget

/** contextGaps(tools) → every way the served surface is charging an agent more than it must. */
export function contextGaps(tools: readonly WireTool[]): Gap[] {
  const gaps: Gap[] = []
  const bytes = wireBytes(tools)

  // 1) THE CEILING
  const sealed = sealedBudget()
  if (!sealed) {
    gaps.push({
      what: `the MCP wire payload is ${bytes} bytes across ${tools.length} tools and NO ceiling is sealed — nothing would notice it growing`,
      fix: `write lean/mcp-context-budget.json as {"wireBytes": ${bytes}, "note": "the tools/list payload every request carries; may only shrink"}`,
    })
  } else if (sealed.perToolHundredths !== undefined && tools.length > 0) {
    // THE CAP IS A RATE. bytes/tools, integer-exact in hundredths so no float is compared and none is stored.
    // A tool added lawfully raises the allowance; a description padded raises the rate and fails. The total is
    // reported for context and is no longer the law, because the total could only ever punish capability.
    const rate = Number((BigInt(bytes) * 100n) / BigInt(tools.length))
    const ceiling = sealed.perToolHundredths
    if (rate > ceiling) {
      gaps.push({
        what: `the MCP wire costs ${(rate / 100).toFixed(2)} bytes per tool across ${tools.length} tools (${bytes} total), over the sealed rate of ${(sealed.perToolHundredths / 100).toFixed(2)} — every agent pays that on every request`,
        fix: `trim the descriptions that grew (move derivation into the tool's \`detail\`, which reaches docs/mcp.md and never the wire), or — if the surface genuinely got denser — re-seal lean/mcp-context-budget.json with the LOWER rate {"perToolHundredths": ${rate}}. The rate may only shrink; the total may grow with the tool count.`,
      })
    }
  } else if (bytes > sealed.wireBytes) {
    gaps.push({
      what: `the MCP wire payload GREW to ${bytes} bytes, over the sealed ceiling of ${sealed.wireBytes} (+${bytes - sealed.wireBytes}) — every agent pays that on every request`,
      fix: 'trim the descriptions that grew (move derivation and history into the tool\'s `detail`, which reaches docs/mcp.md and never the wire), or — if the growth is a real new capability — re-seal lean/mcp-context-budget.json deliberately',
    })
  }

  // 2) THE DRY LAW, ON THE WIRE
  const where = new Map<string, string[]>()
  for (const t of tools) for (const s of sentences(t.description)) {
    if (s.length <= LAW_PHRASE) continue
    const seen = where.get(s) ?? []
    if (!seen.includes(t.name)) { seen.push(t.name); where.set(s, seen) }
  }
  for (const [s, names] of [...where.entries()].sort((a, b) => b[1].length * b[0].length - a[1].length * a[0].length)) {
    if (names.length < REPEATS) continue
    gaps.push({
      what: `${names.length} descriptions carry the SAME ${s.length}-byte sentence (${(names.length - 1) * s.length} redundant bytes on every request): "${s.slice(0, 90)}${s.length > 90 ? '…' : ''}" — ${names.slice(0, 3).join(', ')}${names.length > 3 ? `, … (${names.length} total)` : ''}`,
      fix: `state it ONCE in the server INSTRUCTIONS (which a client sends on connect, not per request) and cut it from the descriptions, or compress it to a citation of ${LAW_PHRASE} bytes or fewer — a repeated citation is honesty, a repeated paragraph is a toll`,
    })
  }

  // 3) THE SPLIT LAW
  for (const t of tools) {
    if (t.description.length <= WIRE_CAP) continue
    gaps.push({
      what: `${t.name}'s description is ${t.description.length} bytes on the wire (cap ${WIRE_CAP}) — it is documentation billed to every request`,
      fix: `keep what an agent needs to CHOOSE and CALL it (purpose, arguments, returns, honest scope with its theorem) in \`description\`, and move the derivation and history to \`detail\` — gen-mcp renders detail into docs/mcp.md, and it never reaches the wire`,
    })
  }
  return gaps
}

// Run directly (`node dist/scripts/context-budget.js`, and in the audit chain) to see the toll and every way it is
// being overpaid. The guard runs the same contextGaps in-process; this lane is the standalone reading, so the
// number is inspectable without running the whole gate.
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const { MCP_CATALOG } = await import('../mcp.js')
  const bytes = wireBytes(MCP_CATALOG)
  const sealed = sealedBudget()
  const detailed = MCP_CATALOG.filter((t) => t.detail)
  console.log(`context-budget — the tools/list payload every request carries: ${bytes} bytes across ${MCP_CATALOG.length} tools`)
  console.log(`  ceiling ${sealed ? sealed.wireBytes : '(unsealed)'} · ${detailed.length} tool(s) keep their derivation in detail (${detailed.reduce((s, t) => s + (t.detail?.length ?? 0), 0)} bytes that never reach the wire)`)
  report('context-budget', contextGaps(MCP_CATALOG), `under the sealed ceiling, no sentence repeated across ${REPEATS} descriptions, no description over ${WIRE_CAP} bytes`)
}

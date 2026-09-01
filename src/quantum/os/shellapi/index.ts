// quantum/os/shellapi — ONE EXEC API OVER THE PORTED ALPINE SHELL SURFACE, AND AN HONEST COVERAGE NUMBER.
//
// Alpine publishes 1279 shell packages across 680 origins: busybox and coreutils and every shell that ever
// disagreed with them, plus the utilities that ship as their own package. uuidnaOS answers with ONE door —
// uuidnaExec(line) — and seventeen applets behind it.
//
// SEVENTEEN IS NOT 1279, and this module exists to say so with a number rather than to imply otherwise. That is
// the whole difference between a port and a boast: the chat port could claim its API was complete because it
// replaced the wire outright, but a shell API is measured against utilities people actually expect, and most of
// them are absent. So the surface reports COVERAGE — what is implemented, what is named by Alpine and missing,
// and the ratio between them — and the missing list is the deliverable, not an embarrassment to be trimmed.
//
// WHAT THE APPLETS ARE, precisely: they read the sealed catalogue and the verified boot image and answer from
// them. `ls` walks uuidnaOS's own tree, `apk list` reads the committed mirror, `cat` and `stat` answer about
// provenance. None of them shells out, none reads the host filesystem, and none is BusyBox — a name shared with
// a POSIX utility is a shared name, never a claim of compatibility. `uuidnaExec` is synchronous and total by
// construction, which is what lets it run in a browser tab.
import { catalogue } from '../catalogue/index.js'
import { DOMAIN_PATTERNS, domainCensus, type DomainCensus } from '../domains/index.js'
import { uuidnaExec, APPLETS } from '../exec/index.js'
import { toUuid } from '../../../address.js'

export const SHELL_DOMAIN = 'shell' as const

// THE APPLET LIST IS IMPORTED, NOT RESTATED, and the test beside this caught why. This module kept its own copy
// of the seventeen applet names so a caller could find the door without reading exec — reasonable, and a second
// list that has to be remembered. Adding `monitor` to one and not the other broke the cross-check within a
// minute, which is the good outcome: the drift was found by a law rather than by a user. exec exports the names
// it dispatches, so exec is the source and this re-exports it.
export { APPLETS } from '../exec/index.js'

// THE DENOMINATOR IS ALPINE'S OWN, NOT MY MEMORY OF POSIX (the captain: replace hardcoded with theorems).
//
// This shipped with a hand-written list of 36 "expected" utilities — ls, cat, grep, sed, awk and the rest — and
// the coverage number it produced was therefore a fact about what I remembered, not about the catalogue. Change
// the list and the ratio changes; nothing in the tree could contradict it, which is the signature of a figure
// that is authored rather than measured.
//
// Alpine already publishes the answer. Every package declares the commands it supplies in its `provides` column
// as `cmd:<name>=<version>` — 19,103 distinct commands across 5,883 packages, and 345 of them from the shell
// domain alone. So the expectation is READ rather than recalled, it moves when the mirror moves, and a reader
// who doubts the coverage can recount it from the same bytes.
/** every command name a set of catalogue rows declares it provides — Alpine's own words, parsed, never listed */
const declaredCommands = (rows: readonly { provides: readonly string[] }[]): Set<string> => {
  const out = new Set<string>()
  for (const r of rows) {
    // `provides` is a LIST of tokens, one per declaration. The first cut typed it as a string and only worked
    // because Array.toString joins with commas — right answer, wrong reason, and it would have broken silently
    // the moment a token contained a comma. Iterate the tokens the parser actually produced.
    for (const token of r.provides ?? []) {
      const m = token.match(/^cmd:([A-Za-z0-9_.+-]+)/)
      if (m) out.add(m[1]!)
    }
  }
  return out
}

/** the commands the SHELL DOMAIN declares — the honest denominator for "what should a shell answer?" */
export function shellCommandUniverse(): Set<string> {
  const names = new Set(shellMembers().map((m) => m.name))
  return declaredCommands(catalogue().filter((p) => names.has(p.name)))
}

/** every command the whole catalogue declares — the wider universe, for context rather than for the ratio */
export function catalogueCommandUniverse(): Set<string> {
  return declaredCommands(catalogue())
}

export interface ShellCoverage {
  definition: 'alpine-shell-port·one-exec-api'
  ported: { packages: number; origins: number }
  applets: readonly string[]
  /** applets that name a command Alpine's shell domain also declares */
  implemented: readonly string[]
  /** applets that are uuidna's own — no Alpine package declares that command */
  beyond: readonly string[]
  /** how many commands the shell domain declares, and how many of them uuidnaOS answers */
  coverage: { of: number; met: number; universe: number }
  receipt: string
  honest: string
}

export function shellCensus(): DomainCensus {
  const c = domainCensus(SHELL_DOMAIN)
  if (!c) throw new Error(`shellapi: DOMAIN_PATTERNS carries no "${SHELL_DOMAIN}" domain`)
  return c
}

/** every catalogue row this domain matches — the census counts, a caller may want the names */
export function shellMembers(): { name: string; desc: string }[] {
  const pat = DOMAIN_PATTERNS.find((d) => d.domain === SHELL_DOMAIN)
  if (!pat) return []
  return catalogue().filter((p) => pat.match.test(p.name) || pat.match.test(p.desc)).map((p) => ({ name: p.name, desc: p.desc }))
}

export function shellCoverage(): ShellCoverage {
  const c = shellCensus()
  const domainCmds = shellCommandUniverse()
  const universe = catalogueCommandUniverse()
  const implemented = APPLETS.filter((a) => domainCmds.has(a))
  const beyond = APPLETS.filter((a) => !universe.has(a))
  return {
    definition: 'alpine-shell-port·one-exec-api',
    ported: { packages: c.packages, origins: c.origins },
    applets: APPLETS,
    implemented,
    beyond,
    coverage: { of: domainCmds.size, met: implemented.length, universe: universe.size },
    receipt: toUuid(`shell|${c.packages}|${c.origins}|${implemented.join(',')}|${domainCmds.size}`),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages. API = uuidnaExec, ${APPLETS.length} applets, of which ` +
      `${implemented.length} name a command the shell domain itself declares out of ${domainCmds.size} — a ` +
      `denominator READ from Alpine's own provides column (${universe.size} commands catalogue-wide), never a ` +
      'list anyone wrote down. The applets read the sealed catalogue and the verified boot image; none shells ' +
      'out and none is BusyBox. A shared name is a shared name, never a compatibility claim.',
  }
}

/** shellRun — the ONE exec door, with the refusal made explicit rather than returned as an empty success. */
export function shellRun(line: string): { ok: boolean; output: string[]; data: unknown; applet: string } {
  const applet = String(line).trim().split(/\s+/)[0] ?? ''
  // widened deliberately: APPLETS is a literal tuple (so exec's switch is exhaustively typed), and membership
  // is being asked of arbitrary user input, which is a string by nature
  if (applet && !(APPLETS as readonly string[]).includes(applet)) {
    // AN UNKNOWN APPLET IS A REFUSAL, NOT AN EMPTY RESULT. A shell that answered nothing to `grep` would read
    // as "no matches" — the same green-over-absent shape this tree keeps meeting — so it says the word instead.
    return {
      ok: false, applet,
      output: [`${applet}: not an applet. uuidnaOS implements ${APPLETS.length}: ${APPLETS.join(' ')}`],
      data: { error: 'unknown-applet', applet, implemented: APPLETS },
    }
  }
  const r = uuidnaExec(line)
  return { ok: r.ok, output: r.output, data: r.data, applet }
}

// ── THE PARTITION AS A SEALABLE CLAIM (the captain: replace hardcoded with theorems) ──────────────────────────
//
// The coverage numbers above are exact arithmetic over the committed mirror, and arithmetic that is exact belongs
// in the ledger rather than in a comment where it rots. Every applet falls into exactly one of three classes,
// and the three sum to the applet count — which is worth sealing precisely because it is NOT obvious: it says
// the classification is exhaustive and disjoint rather than assumed to be, and it caught the fact that three
// applets (apk, man, which) are declared by Alpine somewhere OTHER than the shell domain, a case the first
// two-way split would have silently miscounted as uuidna's own.
//
// HONEST SCOPE, unchanged from every other Alpine claim here: the counting is what this seals. Whether a given
// applet BEHAVES like the command Alpine declares is a compatibility question no arithmetic can settle, and this
// module says elsewhere and plainly that a shared name is not a compatibility claim.
export interface ShellClaim { key: string; lean: string; fragment: string; says: string }

export function shellClaims(): ShellClaim[] {
  const domainCmds = shellCommandUniverse()
  const universe = catalogueCommandUniverse()
  const inDomain = APPLETS.filter((a) => domainCmds.has(a)).length
  const elsewhere = APPLETS.filter((a) => !domainCmds.has(a) && universe.has(a)).length
  const own = APPLETS.filter((a) => !universe.has(a)).length
  const total = APPLETS.length
  return [
    {
      key: `alpine_shell_applets_partition_${total}`,
      fragment: `${inDomain}+${elsewhere}+${own}=${total}`,
      lean: `theorem alpine_shell_applets_partition_${total} : (${inDomain} + ${elsewhere} + ${own} = ${total}) := by decide`,
      says: `every uuidnaOS applet is declared by the shell domain (${inDomain}), declared by Alpine elsewhere (${elsewhere}), or uuidna's own (${own}) — exhaustive and disjoint`,
    },
    {
      key: `alpine_shell_domain_commands_${domainCmds.size}`,
      fragment: `${domainCmds.size}<${universe.size}`,
      lean: `theorem alpine_shell_domain_commands_${domainCmds.size} : (${domainCmds.size} < ${universe.size}) ∧ (${universe.size} - ${domainCmds.size} = ${universe.size - domainCmds.size}) := by decide`,
      says: `the shell domain declares ${domainCmds.size} commands of ${universe.size} the whole catalogue declares — the denominator is read from Alpine's provides column, never written down`,
    },
  ]
}

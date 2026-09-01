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
import { uuidnaExec } from '../exec/index.js'
import { toUuid } from '../../../address.js'

export const SHELL_DOMAIN = 'shell' as const

// THE APPLETS uuidnaExec DISPATCHES, named here because a switch statement is not a surface anyone can query.
// This list is asserted against the live dispatcher by the test beside it, so it cannot drift into a claim.
export const APPLETS: readonly string[] = [
  'ls', 'apk', 'man', 'pwd', 'echo', 'which', 'cat', 'stat', 'du',
  'driver', 'device', 'sequence', 'run', 'court', 'quantum-cover', 'acme', 'help',
]

// The POSIX-ish utilities a person reasonably expects of a shell, so "missing" is measured against expectation
// rather than against the 1279 packages — most of which are libraries, docs and init scripts, not commands.
const EXPECTED_UTILITIES: readonly string[] = [
  'ls', 'cat', 'echo', 'pwd', 'which', 'stat', 'du', 'cp', 'mv', 'rm', 'mkdir', 'rmdir', 'ln',
  'grep', 'sed', 'awk', 'find', 'sort', 'uniq', 'head', 'tail', 'wc', 'cut', 'tr', 'diff',
  'tar', 'gzip', 'chmod', 'chown', 'ps', 'kill', 'df', 'date', 'sleep', 'touch', 'env',
]

export interface ShellCoverage {
  definition: 'alpine-shell-port·one-exec-api'
  ported: { packages: number; origins: number }
  applets: readonly string[]
  /** expected utilities uuidnaOS answers */
  implemented: readonly string[]
  /** expected utilities it does NOT — the deliverable, listed in full and never truncated */
  missing: readonly string[]
  /** applets beyond POSIX expectation: what uuidnaOS has that a shell does not */
  beyond: readonly string[]
  coverage: { of: number; met: number }
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
  const have = new Set(APPLETS)
  const implemented = EXPECTED_UTILITIES.filter((u) => have.has(u))
  const missing = EXPECTED_UTILITIES.filter((u) => !have.has(u))
  const beyond = APPLETS.filter((a) => !EXPECTED_UTILITIES.includes(a))
  return {
    definition: 'alpine-shell-port·one-exec-api',
    ported: { packages: c.packages, origins: c.origins },
    applets: APPLETS,
    implemented,
    missing,
    beyond,
    coverage: { of: EXPECTED_UTILITIES.length, met: implemented.length },
    receipt: toUuid(`shell|${c.packages}|${c.origins}|${implemented.join(',')}|${missing.length}`),
    honest:
      `PORT = PROVENANCE over ${c.packages} packages. API = uuidnaExec, ${APPLETS.length} applets, ` +
      `${implemented.length} of ${EXPECTED_UTILITIES.length} expected utilities — the other ${missing.length} are NOT implemented and are listed. ` +
      'The applets read the sealed catalogue and the verified boot image; none shells out, none reads the host ' +
      'filesystem, and none is BusyBox. A shared name is a shared name, never a compatibility claim.',
  }
}

/** shellRun — the ONE exec door, with the refusal made explicit rather than returned as an empty success. */
export function shellRun(line: string): { ok: boolean; output: string[]; data: unknown; applet: string } {
  const applet = String(line).trim().split(/\s+/)[0] ?? ''
  if (applet && !APPLETS.includes(applet)) {
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
